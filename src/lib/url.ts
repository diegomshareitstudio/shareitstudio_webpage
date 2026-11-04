/**
 * URL helpers for a site served under a base path (`base` in astro.config.mjs, e.g. shareitstudio.com/v2/).
 * Astro adds the base to its own links (assets, sitemap, redirects) but not to the paths we write by hand,
 * so every internal link goes through `withBase`, and absolute URLs (canonical, JSON-LD) through `absoluteUrl`.
 * All paths in data files and pages are written WITHOUT the base, e.g. '/services/amazon-listing-optimization'.
 * Page URLs always end in a slash (trailingSlash: 'always'), so `withBase` adds it: /v2/services/.
 */
import { SITE } from '../config/site';

/** The base path without a trailing slash: "/v2", or "" when the site lives at the domain root. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Page paths get a trailing slash; files (.svg, .mp4, .xml…) and anything with an extension are left alone. */
const withTrailingSlash = (path: string) => {
  const [, pathname, rest] = path.match(/^([^?#]*)(.*)$/)!;
  return /\/$|\.[a-z0-9]{2,5}$/i.test(pathname) ? path : `${pathname}/${rest}`;
};

/**
 * Prefixes an internal path with the base and makes sure it ends in a slash. Anything that is not an internal path
 * (https://, mailto:, tel:, #anchor) is returned untouched, and a path that already carries the base is not
 * prefixed again, so it is safe to call twice or on any href.
 */
export const withBase = <T extends string | undefined>(path: T): T => {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) return path;
  const carriesBase = path === BASE || path.startsWith(`${BASE}/`);
  return withTrailingSlash(carriesBase ? path : `${BASE}${path}`) as T;
};

/** The reverse: "/v2/services" → "/services", "/v2/" → "/". Used to compare the current URL with site paths. */
export const stripBase = (pathname: string) => {
  if (BASE && (pathname === BASE || pathname.startsWith(`${BASE}/`))) return pathname.slice(BASE.length) || '/';
  return pathname;
};

/** Full URL with domain and base, for canonical links, Open Graph and JSON-LD. */
export const absoluteUrl = (path = '/') => new URL(withBase(path), SITE.url).href;
