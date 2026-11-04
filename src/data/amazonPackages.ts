/**
 * Amazon listing rates and breakdowns, by production style.
 * Prices come from the rates sheet (green rows); the "includes" lists come from the services breakdown sheet,
 * where the "Photoshopped" entries are the Fully AI tier.
 * Where the breakdown sheet has a single list for a service (premium A+, mobile A+, videos), the same list is shown
 * for every tier that offers it.
 */

export type Tier = 'ai' | 'hybrid' | 'organic';

/** A price in dollars, 'na' when the tier does not offer the service, 'nr' when we do not recommend it for that tier */
export type Price = number | 'na' | 'nr';

export interface TierInfo {
  id: Tier;
  name: string;
  tagline: string;
  detail: string;
}

export const tiers: TierInfo[] = [
  {
    id: 'ai',
    name: 'Fully AI',
    tagline: 'Artificial intelligence, human assisted',
    detail: 'Fully AI made, no organic photoshoot.',
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    tagline: 'Artificial intelligence, human managed',
    detail: 'Basic organic photoshoot, AI enhanced.',
  },
  {
    id: 'organic',
    name: 'Organic',
    tagline: 'Human made, AI enhanced',
    detail: 'Full organic photoshoot.',
  },
];

export interface PackageService {
  id: string;
  /** Tab the service is listed under */
  tab: string;
  group: string;
  name: string;
  summary: string;
  prices: Record<Tier, Price>;
  /** What the service includes, per tier */
  includes: Record<Tier, string[]>;
  /** Shown under the breakdown */
  note?: string;
}

const all = (list: string[]): Record<Tier, string[]> => ({ ai: list, hybrid: list, organic: list });

/** The image line of the premium A+ lists changes with the production style */
const premiumImages: Record<Tier, string> = {
  ai: 'AI-generated images',
  hybrid: 'Hybrid images (basic organic photoshoot, AI enhanced)',
  organic: 'Organic images',
};
const premium = (lines: string[]): Record<Tier, string[]> => ({
  ai: ['Benchmark Analysis & Strategy', ...lines, premiumImages.ai, 'Graphic Design', 'Copywriting'],
  hybrid: ['Benchmark Analysis & Strategy', ...lines, premiumImages.hybrid, 'Graphic Design', 'Copywriting'],
  organic: ['Benchmark Analysis & Strategy', ...lines, premiumImages.organic, 'Graphic Design', 'Copywriting'],
});

const mobile = (lines: string[]) => all([...lines, 'Graphic Design']);

// Video building blocks (from the breakdown sheet)
const lifestyleVideo = (clips: string, edit: string, extra: string[] = []) =>
  all([
    'Lifestyle video example (full portfolio)',
    'Video benchmark analysis & commercial strategy',
    'In-house model management',
    'Screenplay script / shot list',
    'Prop management',
    'Equipment rental',
    clips,
    'Model',
    'Interior location rental',
    'Assistant',
    'Operational expenses',
    edit,
    'Music',
    'Text titles (up to 3)',
    ...extra,
  ]);

const ugcVideo = (edit: string) =>
  all([
    'Video benchmark analysis & commercial strategy',
    'Model',
    'Interior location',
    'Assistant',
    'Operational expenses',
    edit,
    'Upload to “Videos for this product” (Amazon Influencer Video)',
    'Sample video',
  ]);

const editApplies = [
  'Hero images',
  'Infographics',
  'Lifestyle images',
  'Basic A+ Content',
  'Premium A+ Content',
  'Brand Story',
];

const noBreakdown = all(['Detailed breakdown for this service is not published yet. Ask us on a call.']);

export const packageServices: PackageService[] = [
  // ---- Listing photos
  {
    id: 'photos',
    tab: 'Images',
    group: 'Listing photos',
    name: 'Listing photos',
    summary: 'Hero, lifestyle and infographic images for your listing.',
    prices: { ai: 345, hybrid: 997, organic: 1297 },
    includes: {
      ai: [
        'Benchmark analysis & photo strategy',
        'Art direction',
        'Proposal',
        '3 hero main images',
        '4 photoshopped lifestyle images',
        '3 infographic photos',
        'Infographic design',
        'Copywriting for infographics',
        'Focus group PickFu testing (max 3): basic, 50 US-based respondents',
        'Focus group management',
        'Studio location rental',
        'Photographer',
        'Assistant',
        'Equipment rental',
        'Basic props',
        'Prop management',
        'Operational expenses',
      ],
      hybrid: [
        'Benchmark analysis & photo strategy',
        'Art direction',
        'Proposal',
        '3 hero main images',
        '4 photoshopped lifestyle images',
        '3 infographic photos',
        'Infographic design',
        'Copywriting for infographics',
        'Focus group PickFu testing',
        'Focus group management',
        'Hand model',
        'In-house model management',
        'Studio location rental',
        'Photographer',
        'Assistant',
        'Equipment rental',
        'Basic props',
        'Prop management',
        'Operational expenses',
      ],
      organic: [
        'Benchmark analysis & photo strategy',
        'Art direction',
        'Proposal',
        '5 organic hero main images',
        '4 organic lifestyle images',
        '4 organic infographic photos',
        'Infographic design',
        'Copywriting for infographics',
        'Focus group PickFu testing (max 5): basic, 50 US-based respondents',
        'Focus group management',
        'In-house regular model',
        'In-house model management',
        'Studio & interior location rental',
        'Photographer',
        'Equipment rental',
        'Assistant',
        'Props',
        'Prop management',
        'Operational expenses',
      ],
    },
  },

  // ---- A+ Content
  {
    id: 'aplus-basic',
    tab: 'A+ Content',
    group: 'A+ Content',
    name: 'Basic A+',
    summary: '5 modules.',
    prices: { ai: 379, hybrid: 379, organic: 797 },
    includes: all([
      'Benchmark analysis & strategy',
      '5 modules',
      '5 photoshopped images',
      'Graphic design',
      'Copywriting',
    ]),
  },
  {
    id: 'aplus-standard',
    tab: 'A+ Content',
    group: 'A+ Content',
    name: 'Premium A+ Standard',
    summary: '6 standard modules and 1 with hotspots.',
    prices: { ai: 1000, hybrid: 1797, organic: 1997 },
    includes: premium(['6 standard modules', '1 module with hotspots']),
  },
  {
    id: 'aplus-medium',
    tab: 'A+ Content',
    group: 'A+ Content',
    name: 'Premium A+ Medium',
    summary: 'Adds a 5-image carousel.',
    prices: { ai: 'na', hybrid: 1700, organic: 2247 },
    includes: premium(['5 standard modules', '1 carousel module with 5 images', '1 module with hotspots']),
  },
  {
    id: 'aplus-video',
    tab: 'A+ Content',
    group: 'A+ Content',
    name: 'Premium A+ Video',
    summary: 'Adds a video module.',
    prices: { ai: 'na', hybrid: 2000, organic: 2497 },
    includes: premium([
      '4 standard modules',
      '1 carousel module with 5 images',
      '1 video module',
      '1 module with hotspots',
    ]),
  },
  {
    id: 'aplus-full',
    tab: 'A+ Content',
    group: 'A+ Content',
    name: 'Premium A+ Fully Interactive',
    summary: 'Carousel, video, comparison table and FAQ.',
    prices: { ai: 'na', hybrid: 3000, organic: 3497 },
    includes: premium([
      '2 standard modules',
      '1 premium regime carousel module with 5 images',
      '1 video module with thumbnail & CTA',
      '1 premium comparison table (1 or 3)',
      '1 FAQ module',
      '1 premium module with hotspots',
    ]),
  },

  // ---- Mobile A+ Content
  {
    id: 'm-basic',
    tab: 'A+ Content',
    group: 'Mobile A+ Content',
    name: 'Mobile A+ Basic',
    summary: 'Mobile version of Basic A+.',
    prices: { ai: 150, hybrid: 150, organic: 150 },
    includes: all(['A+ Content: 5 modules', '5 photoshopped images', 'Graphic design']),
  },
  {
    id: 'm-standard',
    tab: 'A+ Content',
    group: 'Mobile A+ Content',
    name: 'Mobile A+ Premium Standard',
    summary: 'Mobile version of Premium A+ Standard.',
    prices: { ai: 150, hybrid: 150, organic: 150 },
    includes: mobile(['Premium A+ Content: 6 standard modules', '1 module with hotspots']),
  },
  {
    id: 'm-medium',
    tab: 'A+ Content',
    group: 'Mobile A+ Content',
    name: 'Mobile A+ Premium Medium',
    summary: 'Mobile version of Premium A+ Medium.',
    prices: { ai: 150, hybrid: 150, organic: 150 },
    includes: mobile([
      'Premium A+ Content: 5 standard modules',
      '1 carousel module with 5 images',
      '1 module with hotspots',
    ]),
  },
  {
    id: 'm-video',
    tab: 'A+ Content',
    group: 'Mobile A+ Content',
    name: 'Mobile A+ Premium Video',
    summary: 'Mobile version of Premium A+ Video.',
    prices: { ai: 150, hybrid: 150, organic: 150 },
    includes: mobile([
      'Premium A+ Content: 4 standard modules',
      '1 carousel module with 5 images',
      '1 video module',
      '1 module with hotspots',
    ]),
  },
  {
    id: 'm-full',
    tab: 'A+ Content',
    group: 'Mobile A+ Content',
    name: 'Mobile A+ Premium Full',
    summary: 'Mobile version of Fully Interactive A+.',
    prices: { ai: 150, hybrid: 150, organic: 150 },
    includes: mobile([
      'Premium A+ Content: 2 standard modules',
      '1 premium regime carousel module with 5 images',
      '1 video module with thumbnail & CTA',
      '1 premium comparison table (1 or 3)',
      '1 FAQ module',
      '1 premium module with hotspots',
    ]),
  },

  // ---- Video
  {
    id: 'product-video',
    tab: 'Video',
    group: 'Video',
    name: 'Product video',
    summary: '20–30 second product demo.',
    prices: { ai: 389, hybrid: 389, organic: 1100 },
    includes: all([
      'Product demo video commercial example (full portfolio)',
      'Video benchmark analysis & commercial strategy',
      'In-house model management',
      'Screenplay script / shot list',
      'Prop management',
      'Equipment rental',
      '3–5 video clips',
      'Studio rental',
      'Assistant',
      'Operational expenses',
      '20–30 second edit',
      'Music',
      'Text titles (up to 3)',
      'Vertical video',
    ]),
  },
  {
    id: 'listing-video',
    tab: 'Video',
    group: 'Video',
    name: 'Listing video',
    summary: 'Video for your product detail page.',
    prices: { ai: 689, hybrid: 689, organic: 2197 },
    includes: noBreakdown,
  },
  {
    id: 'ppc-video',
    tab: 'Video',
    group: 'Video',
    name: 'PPC video',
    summary: 'Video built for ads.',
    prices: { ai: 689, hybrid: 689, organic: 2197 },
    includes: noBreakdown,
  },
  {
    id: 'instructional',
    tab: 'Video',
    group: 'Video',
    name: 'Instructional video',
    summary: 'Shows how the product is used.',
    prices: { ai: 'nr', hybrid: 1000, organic: 1857 },
    includes: lifestyleVideo('17 video clips', '30–45 second edit', ['Vertical video']),
  },
  {
    id: 'ugc-listing',
    tab: 'Video',
    group: 'Video',
    name: 'UGC video: product description (listing)',
    summary: 'Creator-style video for the listing.',
    prices: { ai: 'nr', hybrid: 689, organic: 689 },
    includes: ugcVideo('20–60 second edit'),
  },
  {
    id: 'ugc-ppc',
    tab: 'Video',
    group: 'Video',
    name: 'UGC video: product in use (PPC)',
    summary: 'Creator-style video for ads.',
    prices: { ai: 'nr', hybrid: 789, organic: 789 },
    includes: ugcVideo('15–30 second edit'),
  },
  {
    id: 'ppc-pro',
    tab: 'Video',
    group: 'Video',
    name: 'PPC video: professional',
    summary: 'Lifestyle and product video edits for ads.',
    prices: { ai: 1647, hybrid: 1647, organic: 1647 },
    includes: all([
      'Lifestyle / product video edits (full portfolio)',
      'Video benchmark analysis & commercial strategy',
      'In-house model management',
      'Screenplay script / shot list',
      'Prop management',
      'Equipment rental',
      '7 video clips',
      'Regular model',
      'Studio rental',
      'Assistant',
      'Operational expenses',
      '20–30 second edit',
      'Music',
      'Text titles (up to 3)',
    ]),
  },
  {
    id: 'keyword-ad',
    tab: 'Video',
    group: 'Video',
    name: 'Keyword targeted Sponsored Ad video',
    summary: '30–45 second Sponsored Ad.',
    prices: { ai: 2197, hybrid: 2197, organic: 2197 },
    includes: lifestyleVideo('5 video clips', '30–45 second Sponsored Ad edit'),
  },
  {
    id: 'vertical-ad',
    tab: 'Video',
    group: 'Video',
    name: 'Vertical edit Sponsored Ad video',
    summary: 'Vertical cut of a keyword targeted ad.',
    prices: { ai: 873, hybrid: 873, organic: 873 },
    includes: lifestyleVideo('5 vertical video clips', '30–45 second Sponsored Ad edit'),
    note: 'Vertical ads cannot run without a horizontal video or a Storefront.',
  },
  {
    id: 'lifestyle-listing',
    tab: 'Video',
    group: 'Video',
    name: 'Lifestyle listing video',
    summary: '30–45 seconds, shot for the listing.',
    prices: { ai: 2197, hybrid: 2197, organic: 2197 },
    includes: lifestyleVideo('17 video clips', '30–45 second edit', ['Vertical video']),
  },
  {
    id: 'sda',
    tab: 'Video',
    group: 'Video',
    name: 'Sponsored Display video (SDA)',
    summary: 'Video for Sponsored Display ads.',
    prices: { ai: 2197, hybrid: 2197, organic: 2197 },
    includes: lifestyleVideo('5 video clips', '30–45 second Sponsored Ad edit'),
  },

  // ---- Image edits
  {
    id: 'colorization',
    tab: 'Images',
    group: 'Image edits',
    name: 'Colorization',
    summary: 'Recolor existing assets.',
    prices: { ai: 20, hybrid: 20, organic: 35 },
    includes: all(editApplies),
    note: 'Applies to the assets listed.',
  },
  {
    id: 'product-swap',
    tab: 'Images',
    group: 'Image edits',
    name: 'Product swap',
    summary: 'Swap the product in existing assets.',
    prices: { ai: 20, hybrid: 20, organic: 35 },
    includes: all(editApplies),
    note: 'Applies to the assets listed.',
  },
  {
    id: 'product-overimpose',
    tab: 'Images',
    group: 'Image edits',
    name: 'Product overimpose',
    summary: 'Place the product over existing assets.',
    prices: { ai: 20, hybrid: 20, organic: 35 },
    includes: all(editApplies),
    note: 'Applies to the assets listed.',
  },
];

export const packageTabs = [...new Set(packageServices.map((s) => s.tab))];
