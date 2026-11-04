// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import { loadEnv } from 'vite';
import hostArmada from './integrations/hostarmada.mjs';
import assistantDevServer from './integrations/assistant-dev-server.mjs';

/** The site is served under shareitstudio.com/v2/ (also in the dev server: http://localhost:4321/v2/) */
const base = '/v2/';

/** Old route → new sitemap route (301). Paths are written without the base; it is added below. */
const moved = {
  '/servicess': '/services',
  '/services/listing-optimization': '/services/amazon-listing-optimization',
  '/services/social-media': '/services/social-media-management',

  '/portfolio': '/our-work',
  '/portfolio/a-plus-content': '/our-work',
  '/portfolio/amazon-infographics': '/our-work',
  '/portfolio/hero-images': '/our-work',
  '/portfolio/lifestyle-photography': '/our-work',
  '/portfolio/other-services': '/our-work',
  '/portfolio/social-media': '/our-work',
  '/portfolio/video-production': '/our-work',
  '/portfolio/a-content': '/our-work',
  '/portfolio/premium-a-content': '/our-work',
  '/portfolio/brand-story': '/our-work',
  '/portfolio/storefront': '/our-work',
  '/portfolio/branding': '/our-work',
  '/portfolio/listing-images/hero-images': '/our-work',
  '/portfolio/listing-images/infographics': '/our-work',
  '/portfolio/listing-images/lifestyles': '/our-work',
  '/portfolio/videos/listing-videos': '/our-work',
  '/portfolio/videos/sponsored-ads': '/our-work',
  '/portfolio/videos/ugc-videos': '/our-work',
  '/portfolio/videos/social-media-videos': '/our-work',
  '/case-studies': '/our-work',
  '/case-studies/rossm': '/our-work',
  '/case-studies/vizayo': '/our-work',

  '/blog/amazon-storefront-complete-guide': '/blog/amazon-storefront',

  '/contact': '/contact-us',
  '/call': '/contact-us',
  '/faq': '/faqs',
  '/partners': '/about-us',
};

/** Build settings from the environment (GitHub Actions secrets/variables) or a local .env file */
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };

// https://astro.build/config
export default defineConfig({
  // Required by @astrojs/sitemap to build absolute URLs
  site: 'https://shareitstudio.com',

  base,

  redirects: Object.fromEntries(
    Object.entries(moved).map(([from, destination]) => [
      from,
      { status: 301, destination: `${base.slice(0, -1)}${destination}/` },
    ]),
  ),

  // Every page URL ends in a slash: /v2/services/
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss(), assistantDevServer(base)],
    build: {
      // Lightning CSS (the default minifier) folds `animation-timeline: view()` into the `animation` shorthand,
      // which browsers reject, so every scroll-driven animation vanished from the production build.
      // esbuild keeps the declarations as written.
      cssMinify: 'esbuild',
    },
  },

  // Self-hosted fonts: no request to Google at runtime, preloaded, with size-matched fallbacks (no layout shift on swap)
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      weights: [600, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],

  // Links are fetched on hover/touch, so the next page is usually ready before the click lands
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  integrations: [
    // Generated on build only: /v2/sitemap-index.xml → /v2/sitemap-0.xml
    sitemap(),
    // .htaccess for the host: redirects, password protection, caching (see integrations/hostarmada.mjs)
    hostArmada({ base, redirects: moved, authUserFile: env.HTACCESS_AUTH_USERFILE }),
  ],
});
