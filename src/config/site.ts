/**
 * Site-wide identity: one source of truth for <head>, JSON-LD and the footer.
 * The domain comes from `site` in astro.config.mjs.
 */
export const SITE = {
  name: 'Share It Studio',
  url: (import.meta.env.SITE ?? 'https://shareitstudio.com').replace(/\/$/, ''),
  language: 'en',
  locale: 'en_US',
  /** Fallbacks for pages that don't set their own */
  title: 'Amazon Listing Optimization & Social Media Management | Share It Studio',
  description:
    'Ecommerce creative & growth studio: Amazon listing optimization for Amazon brands and done-for-you social media management for ecommerce brands.',
  // TODO: replace placeholders with the real contact email and profiles
  email: 'hello@shareitstudio.com',
  // Observed on the live /contact-us page (2026-10-26); pending operational test and owner approval (blueprint P38)
  phone: { display: '+1 904-414-4173', tel: '+19044144173' },
  location: 'Miami, Florida',
  /** Approved Calendly event URL. Leave empty until validated: the contact page hides the booking button without it. */
  bookingUrl: '',
  sameAs: ['https://linkedin.com/company/shareitstudio'],
} as const;
