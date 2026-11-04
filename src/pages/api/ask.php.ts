/**
 * Builds api/ask.php, the AI FAQ assistant for the production host (HostArmada: static files + PHP).
 * The company knowledge, model and messages come from lib/assistant.ts, so the PHP never drifts from the site.
 *
 * The API key is NOT in this file. On the server it is read from:
 *   1. the ANTHROPIC_API_KEY environment variable, or
 *   2. ~/sis-assistant-config.php (one level above public_html, so it can never be downloaded):
 *        <?php return ['ANTHROPIC_API_KEY' => 'sk-ant-…', 'MOCK_AI' => 'false'];
 * Without a key the assistant answers from the published FAQs (test mode), as in development.
 */
import type { APIRoute } from 'astro';
import {
  FAQ_POOL,
  MAX_QUESTION_LENGTH,
  MAX_TOKENS,
  MESSAGES,
  MODEL,
  RATE_LIMIT,
  SYSTEM_PROMPT,
} from '../../lib/assistant';

export const prerender = true;

/** A PHP nowdoc: the text is taken literally (no $variables), ended by a marker that must not appear inside it. */
const nowdoc = (marker: string, text: string) => {
  if (text.split('\n').some((line) => line.trim() === marker)) throw new Error(`"${marker}" appears in the text`);
  return `<<<'${marker}'\n${text}\n${marker}`;
};
const json = (value: unknown) => JSON.stringify(value, null, 2);

const php = `<?php
/**
 * AI FAQ assistant for the Share It Studio website.
 * GENERATED on every build by src/pages/api/ask.php.ts. Edit the source and rebuild; never edit this file.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const MODEL = ${JSON.stringify(MODEL)};
const MAX_TOKENS = ${MAX_TOKENS};
const MAX_QUESTION_LENGTH = ${MAX_QUESTION_LENGTH};
const RATE_LIMIT = ${RATE_LIMIT};

$SYSTEM_PROMPT = ${nowdoc('PROMPT', SYSTEM_PROMPT)};

$MESSAGES = json_decode(${nowdoc('JSON', json(MESSAGES))}, true);

$FAQ_POOL = json_decode(${nowdoc('JSON', json(FAQ_POOL))}, true);

function reply($body, $status = 200)
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Setting from the environment, or from ~/sis-assistant-config.php (outside public_html). */
function setting($name)
{
    $value = getenv($name);
    if ($value !== false && $value !== '') return $value;
    static $file = null;
    if ($file === null) {
        $path = dirname(rtrim($_SERVER['DOCUMENT_ROOT'] ?? __DIR__, '/')) . '/sis-assistant-config.php';
        $file = is_file($path) ? (array) include $path : [];
    }
    return (string) ($file[$name] ?? '');
}

/** At most RATE_LIMIT questions per visitor per minute, tracked in a temp file per IP. */
function rate_limited($ip)
{
    $path = sys_get_temp_dir() . '/sis-assistant-' . md5($ip) . '.json';
    $now = time();
    $recent = is_file($path) ? (array) json_decode((string) file_get_contents($path), true) : [];
    $recent = array_values(array_filter($recent, function ($t) use ($now) { return $now - (int) $t < 60; }));
    $recent[] = $now;
    file_put_contents($path, json_encode($recent), LOCK_EX);
    return count($recent) > RATE_LIMIT;
}

function words($text)
{
    preg_match_all('/[a-z0-9áéíóúñ]{4,}/u', mb_strtolower($text, 'UTF-8'), $m);
    return array_unique($m[0]);
}

/** Test mode: the published FAQ that shares the most words with the question. */
function mock_answer($question, $pool, $fallback)
{
    $asked = words($question);
    $best = ['score' => 0, 'a' => ''];
    foreach ($pool as $f) {
        $score = count(array_intersect(words($f['q'] . ' ' . $f['a']), $asked));
        if ($score > $best['score']) $best = ['score' => $score, 'a' => $f['a']];
    }
    return '[Test mode, no AI] ' . ($best['score'] >= 2 ? $best['a'] : $fallback);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(['error' => $MESSAGES['invalid']], 405);
if (rate_limited($_SERVER['REMOTE_ADDR'] ?? 'unknown')) reply(['error' => $MESSAGES['rateLimited']], 429);

$input = json_decode((string) file_get_contents('php://input'), true);
$question = is_array($input) && is_string($input['question'] ?? null) ? trim($input['question']) : null;
if ($question === null) reply(['error' => $MESSAGES['invalid']], 400);
if ($question === '') reply(['error' => $MESSAGES['empty']], 400);
if (mb_strlen($question, 'UTF-8') > MAX_QUESTION_LENGTH) reply(['error' => $MESSAGES['tooLong']], 400);

$apiKey = setting('ANTHROPIC_API_KEY');
if ($apiKey === '' || setting('MOCK_AI') === 'true') {
    reply(['answer' => mock_answer($question, $FAQ_POOL, $MESSAGES['mockFallback'])]);
}

$payload = [
    'model' => MODEL,
    'max_tokens' => MAX_TOKENS,
    'output_config' => ['effort' => 'low'],
    'system' => [['type' => 'text', 'text' => $SYSTEM_PROMPT, 'cache_control' => ['type' => 'ephemeral']]],
    'messages' => [['role' => 'user', 'content' => $question]],
];

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_HTTPHEADER => [
        'content-type: application/json',
        'anthropic-version: 2023-06-01',
        'x-api-key: ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);
$raw = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($raw === false || $status === 0) {
    error_log('[assistant] could not reach the API');
    reply(['error' => $MESSAGES['failed']], 500);
}
if ($status === 429 || $status === 529) reply(['error' => $MESSAGES['busy']], 503);
if ($status !== 200) {
    error_log('[assistant] API error ' . $status . ': ' . substr((string) $raw, 0, 500));
    reply(['error' => $MESSAGES['failed']], 500);
}

$response = json_decode((string) $raw, true);
if (($response['stop_reason'] ?? '') === 'refusal') reply(['answer' => $MESSAGES['refusal']]);

$texts = [];
foreach ($response['content'] ?? [] as $block) {
    if (($block['type'] ?? '') === 'text') $texts[] = $block['text'];
}
$answer = trim(implode("\\n", $texts));
reply(['answer' => $answer !== '' ? $answer : $MESSAGES['noAnswer']]);
`;

export const GET: APIRoute = () => new Response(php, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
