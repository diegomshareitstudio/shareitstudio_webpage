/**
 * AI FAQ assistant: everything both runtimes share.
 * - Production (HostArmada, static hosting with PHP): src/pages/api/ask.php.ts turns these values into api/ask.php.
 * - Development (`npm run dev`): the dev-server middleware in astro.config.mjs calls `handleQuestion` directly.
 * Keep the two in step by changing things here, never in the generated PHP.
 */
import { SYSTEM_PROMPT } from '../data/companyKnowledge';
import { faqs, type Faq } from '../data/faqs';
import { services } from '../data/services';

export { SYSTEM_PROMPT };

export const MODEL = 'claude-haiku-5-5'; // more capable, pricier: 'claude-opus-5-5'
export const MAX_TOKENS = 1000;
export const MAX_QUESTION_LENGTH = 500;
/** Questions allowed per visitor (IP) per minute */
export const RATE_LIMIT = 5;

export const MESSAGES = {
  rateLimited: 'Too many questions. Please wait a minute.',
  invalid: 'Invalid request.',
  empty: 'Please write a question.',
  tooLong: `Please keep your question under ${MAX_QUESTION_LENGTH} characters.`,
  refusal: 'I can’t help with that one. Book a call and our team will gladly talk it through.',
  noAnswer: 'I couldn’t put together an answer. Please book a call with our team.',
  busy: 'The assistant is busy. Try again shortly.',
  failed: 'Something went wrong. Please try again.',
  mockFallback: 'I don’t have that information. Book a call and our team will answer it.',
};

/** Every published FAQ: what the test mode (no API key) answers from */
export const FAQ_POOL: Faq[] = [...faqs, ...services.flatMap((s) => s.page?.faqs ?? s.faqs ?? [])].map(({ q, a }) => ({
  q,
  a,
}));

const words = (text: string) => new Set(text.toLowerCase().match(/[a-z0-9áéíóúñ]{4,}/g) ?? []);

/** Test mode: picks the FAQ that shares the most words with the question. No API call, no cost. */
export const mockAnswer = (question: string) => {
  const asked = words(question);
  let best = { score: 0, a: '' };
  for (const f of FAQ_POOL) {
    const score = [...words(`${f.q} ${f.a}`)].filter((w) => asked.has(w)).length;
    if (score > best.score) best = { score, a: f.a };
  }
  return `[Test mode, no AI] ${best.score >= 2 ? best.a : MESSAGES.mockFallback}`;
};

/* ---------- Development server only (production uses api/ask.php) ---------- */

const hits = new Map<string, number[]>();
const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
};

type Reply = { status: number; body: { answer?: string; error?: string } };

/** Same checks and answers as api/ask.php, for `npm run dev`. */
export async function handleQuestion(
  rawBody: string,
  ip: string,
  options: { apiKey?: string; mock?: boolean },
): Promise<Reply> {
  if (isRateLimited(ip)) return { status: 429, body: { error: MESSAGES.rateLimited } };

  let question = '';
  try {
    const parsed = JSON.parse(rawBody);
    question = typeof parsed?.question === 'string' ? parsed.question.trim() : '';
  } catch {
    return { status: 400, body: { error: MESSAGES.invalid } };
  }
  if (!question) return { status: 400, body: { error: MESSAGES.empty } };
  if (question.length > MAX_QUESTION_LENGTH) return { status: 400, body: { error: MESSAGES.tooLong } };

  if (!options.apiKey || options.mock) return { status: 200, body: { answer: mockAnswer(question) } };

  // Loaded only when a real question reaches the dev server
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: options.apiKey });
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      output_config: { effort: 'low' },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: question }],
    });
    if (response.stop_reason === 'refusal') return { status: 200, body: { answer: MESSAGES.refusal } };
    const answer = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    return { status: 200, body: { answer: answer || MESSAGES.noAnswer } };
  } catch (error) {
    console.error('[assistant]', error);
    if (error instanceof Anthropic.RateLimitError) return { status: 503, body: { error: MESSAGES.busy } };
    return { status: 500, body: { error: MESSAGES.failed } };
  }
}
