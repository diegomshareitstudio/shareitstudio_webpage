/**
 * JSON-LD builders (schema.org). Layout.astro always outputs Organization, WebSite,
 * WebPage and BreadcrumbList; pages add the nodes below through its `schema` prop.
 * Every node has an @id so they reference each other inside one @graph.
 */
import { SITE } from '../config/site';
import { absoluteUrl } from './url';
import type { Faq } from '../data/faqs';

export type Schema = Record<string, unknown>;

export interface Crumb {
  name: string;
  path: string;
}

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

const ORGANIZATION_ID = `${absoluteUrl('/')}#organization`;
const WEBSITE_ID = `${absoluteUrl('/')}#website`;
const pageId = (path: string, fragment: string) => `${absoluteUrl(path)}#${fragment}`;
const organizationRef = { '@id': ORGANIZATION_ID };

/* ---------- Site-wide (added by Layout.astro on every page) ---------- */

export const organizationSchema = (): Schema => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE.name,
  url: absoluteUrl('/'),
  description: SITE.description,
  email: SITE.email,
  sameAs: SITE.sameAs,
  // TODO: add `logo` once the final logo file is in /public
});

export const websiteSchema = (): Schema => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  url: absoluteUrl('/'),
  inLanguage: SITE.language,
  publisher: organizationRef,
});

export const webPageSchema = (opts: {
  path: string;
  title: string;
  description: string;
  type?: PageType;
  image?: string;
  hasBreadcrumb: boolean;
}): Schema => ({
  '@type': opts.type ?? 'WebPage',
  '@id': pageId(opts.path, 'webpage'),
  url: absoluteUrl(opts.path),
  name: opts.title,
  description: opts.description,
  inLanguage: SITE.language,
  isPartOf: { '@id': WEBSITE_ID },
  ...(opts.image && { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(opts.image) } }),
  ...(opts.hasBreadcrumb && { breadcrumb: { '@id': pageId(opts.path, 'breadcrumb') } }),
});

/** Home is always the first item, so pass only the trail after it */
export const breadcrumbSchema = (path: string, crumbs: Crumb[]): Schema => ({
  '@type': 'BreadcrumbList',
  '@id': pageId(path, 'breadcrumb'),
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

/* ---------- Page-specific ---------- */

export const faqSchema = (path: string, faqs: Faq[]): Schema => ({
  '@type': 'FAQPage',
  '@id': pageId(path, 'faq'),
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const serviceSchema = (opts: {
  path: string;
  name: string;
  description: string;
  serviceType?: string;
  offers?: Schema[];
}): Schema => ({
  '@type': 'Service',
  '@id': pageId(opts.path, 'service'),
  name: opts.name,
  serviceType: opts.serviceType ?? opts.name,
  description: opts.description,
  url: absoluteUrl(opts.path),
  provider: organizationRef,
  areaServed: 'Worldwide',
  ...(opts.offers && { offers: opts.offers }),
});

export const articleSchema = (opts: {
  type: 'Article' | 'BlogPosting';
  path: string;
  headline: string;
  description: string;
  image?: string;
  /** Brand the case study is about */
  about?: string;
}): Schema => ({
  '@type': opts.type,
  '@id': pageId(opts.path, 'article'),
  headline: opts.headline,
  description: opts.description,
  url: absoluteUrl(opts.path),
  inLanguage: SITE.language,
  author: organizationRef,
  publisher: organizationRef,
  mainEntityOfPage: { '@id': pageId(opts.path, 'webpage') },
  ...(opts.image && { image: absoluteUrl(opts.image) }),
  ...(opts.about && { about: { '@type': 'Brand', name: opts.about } }),
});

export const itemListSchema = (path: string, name: string, items: Crumb[]): Schema => ({
  '@type': 'ItemList',
  '@id': pageId(path, 'list'),
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    url: absoluteUrl(item.path),
  })),
});

/**
 * One VideoObject per published video testimonial. Deliberately no Review/AggregateRating:
 * reviews a business shows about itself aren't eligible for review rich results.
 */
export const testimonialVideoSchema = (
  path: string,
  index: number,
  t: { name: string; company?: string; quote: string; transcript?: string },
  video: { src: string; thumbnail: string; duration: string; uploadDate: string },
): Schema => ({
  '@type': 'VideoObject',
  '@id': pageId(path, `testimonial-video-${index + 1}`),
  name: `${t.company ?? t.name} on working with ${SITE.name}`,
  description: `${t.company ? `${t.name} of ${t.company}` : t.name}: “${t.quote}”`,
  thumbnailUrl: absoluteUrl(video.thumbnail),
  contentUrl: absoluteUrl(video.src),
  uploadDate: video.uploadDate,
  duration: video.duration,
  inLanguage: SITE.language,
  ...(t.transcript && { transcript: t.transcript }),
  publisher: organizationRef,
});

export const webApplicationSchema = (opts: { path: string; name: string; description: string }): Schema => ({
  '@type': 'WebApplication',
  '@id': pageId(opts.path, 'app'),
  name: opts.name,
  description: opts.description,
  url: absoluteUrl(opts.path),
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: organizationRef,
});
