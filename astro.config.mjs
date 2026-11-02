// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

/** Old route → new sitemap route (301) */
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

  // Generated on build only: /sitemap-index.xml → /sitemap-0.xml
  integrations: [sitemap()],

  adapter: vercel(),
});