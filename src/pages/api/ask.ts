import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '../../data/companyKnowledge';
import { faqs } from '../../data/faqs';
import { services } from '../../data/services';

/** Runs on the server on every request (needs an SSR adapter in production, see README of this feature). */
export const prerender = false;

const MODEL = 'claude-haiku-5-5'; // more capable, pricier: 'claude-opus-5-5'
const MAX_QUESTION_LENGTH = 500;

const apiKey = import.meta.env.ANTHROPIC_API_KEY;
/** Without a key (or with MOCK_AI=true) the endpoint answers from the local FAQs, no API call and no cost. */
const useMock = !apiKey || import.meta.env.MOCK_AI === 'true';
const client = useMock ? null : new Anthropic({ apiKey });

const words = (text: string) => new Set(text.toLowerCase().match(/[a-z0-9áéíóúñ]{4,}/g) ?? []);

/** Picks the stored FAQ that shares the most words with the question. Only for local testing. */
const mockAnswer = (question: string) => {
  const asked = words(question);
  const pool = [...faqs, ...services.flatMap((s) => s.page?.faqs ?? [])];
  let best = { score: 0, a: '' };
  for (const f of pool) {
    const score = [...words(`${f.q} ${f.a}`)].filter((w) => asked.has(w)).length;
    if (score > best.score) best = { score, a: f.a };
  }
  const reply = best.score >= 2 ? best.a : 'I don’t have that information. Book a call and our team will answer it.';
  return `[Test mode, no AI] ${reply}`;
};

/** Minimal per-IP limit: 5 questions per minute. In-memory, so per server instance. */
const hits = new Map<string, number[]>();
const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (isRateLimited(clientAddress)) return json({ error: 'Too many questions. Please wait a minute.' }, 429);

  let question = '';
  try {
    const body = await request.json();
    question = typeof body?.question === 'string' ? body.question.trim() : '';
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  if (!question) return json({ error: 'Please write a question.' }, 400);
  if (question.length > MAX_QUESTION_LENGTH) {
    return json({ error: `Please keep your question under ${MAX_QUESTION_LENGTH} characters.` }, 400);
  }

  if (!client) return json({ answer: mockAnswer(question) });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1000,
      output_config: { effort: 'low' },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: question }],
    });

    if (response.stop_reason === 'refusal') {
      return json({ answer: 'I can’t help with that one. Book a call and our team will gladly talk it through.' });
    }

    const answer = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    return json({ answer: answer || 'I couldn’t put together an answer. Please book a call with our team.' });
  } catch (error) {
    console.error('[api/ask]', error);
    if (error instanceof Anthropic.RateLimitError) return json({ error: 'The assistant is busy. Try again shortly.' }, 503);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
};
