// @ts-check
/**
 * Development only (`npm run dev`): answers the AI assistant at <base>api/ask.php the way the generated
 * api/ask.php does on the host, using the key in .env (ANTHROPIC_API_KEY, MOCK_AI). Logic: src/lib/assistant.ts.
 */
import { loadEnv } from 'vite';

/**
 * @param {string} base The site's base path, e.g. "/v2/"
 * @returns {import('vite').Plugin}
 */
export default function assistantDevServer(base) {
  return {
    name: 'assistant-dev-server',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '');
      // Astro may strip the base from the URL before this runs, so both forms are accepted
      const paths = [`${base}api/ask.php`, '/api/ask.php'];
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || !paths.includes((req.url ?? '').split('?')[0])) return next();
        let raw = '';
        for await (const chunk of req) raw += chunk;
        const { handleQuestion } = await server.ssrLoadModule('/src/lib/assistant.ts');
        const reply = await handleQuestion(raw, req.socket.remoteAddress ?? 'local', {
          apiKey: env.ANTHROPIC_API_KEY,
          mock: env.MOCK_AI === 'true',
        });
        res.statusCode = reply.status;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(reply.body));
      });
    },
  };
}
