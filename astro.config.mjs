// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

/** Old route → new sitemap route (301) */
const moved = {
  '/servicess': '/services',
  '/services/listing-optimization': '/services/amazon-listing-optimization',
  '/services/social-media': '/services/social-media-management',

  '/portfolio/a-content': '/portfolio/a-plus-content',
  '/portfolio/premium-a-content': '/portfolio/a-plus-content',
  '/portfolio/listing-images/hero-images': '/portfolio/hero-images',
  '/portfolio/listing-images/infographics': '/portfolio/amazon-infographics',
  '/portfolio/listing-images/lifestyles': '/portfolio/lifestyle-photography',
  '/portfolio/videos/listing-videos': '/portfolio/video-production',
  '/portfolio/videos/sponsored-ads': '/portfolio/video-production',
  '/portfolio/videos/ugc-videos': '/portfolio/video-production',
  '/portfolio/videos/social-media-videos': '/portfolio/social-media',
  '/portfolio/brand-story': '/portfolio/other-services',
  '/portfolio/storefront': '/portfolio/other-services',
  '/portfolio/branding': '/portfolio/other-services',

  '/blog/amazon-storefront-complete-guide': '/blog/amazon-storefront',

  '/contact': '/contact-us',
  '/call': '/contact-us',
  '/faq': '/faqs',
  '/partners': '/about-us',
};

// https://astro.build/config
export default defineConfig({
  // Required by @astrojs/sitemap to build absolute URLs
  site: 'https://shareitstudio2.com',

  redirects: Object.fromEntries(
    Object.entries(moved).map(([from, destination]) => [from, { status: 301, destination }]),
  ),

  // URLs without a trailing slash: /services, /contact-us
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },

  // Pages stay static; only routes with `prerender = false` (src/pages/api/ask.ts) run as Vercel functions
  adapter: vercel(),

  // Generated on build only: /sitemap-index.xml → /sitemap-0.xml
  integrations: [sitemap()],
});
