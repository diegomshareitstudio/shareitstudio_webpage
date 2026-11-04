export type PostType = 'Reel' | 'Story' | 'Carousel';

export interface SocialPackage {
  id: string;
  /** Factual label above the name (no "Most popular" without validated sales data) */
  tier: string;
  name: string;
  posts: string;
  price: number;
  /** One-line promise under the price */
  tagline: string;
  /** Who the plan is for */
  forWho: string;
  forLabel?: string;
  features: string[];
  note?: string;
  /** Visually highlighted plan */
  featured?: boolean;
  /** Illustrative posting cadence, Monday → Sunday (not a contractual deliverable) */
  schedule: PostType[][];
}

// TODO: prices, volumes and scope pending confirmation by the commercial owner (copy V2, publication gates)
export const socialPackages: SocialPackage[] = [
  {
    id: 'light',
    tier: 'Starter',
    name: 'Light',
    posts: '20 posts / month',
    price: 999,
    tagline: 'Build a consistent presence.',
    forWho: 'Brands that need regular content without coordinating every post themselves.',
    features: [
      'Strategy & Research',
      'Scripting',
      'Repurposing Content',
      'Basic AI-Enhanced Content',
      'Editing',
      'Uploading & Posting',
      'Monthly Reports',
    ],
    schedule: [['Reel'], ['Carousel'], ['Carousel'], [], ['Story'], ['Reel'], []],
  },
  {
    id: 'grow',
    tier: 'Growth',
    name: 'Grow',
    posts: '40+ posts / month',
    price: 2499,
    tagline: 'Bring your products into the conversation.',
    forWho: 'Brands ready to increase publishing volume, introduce products naturally, and add ads management.',
    features: [
      'Strategy & Research',
      'Scripting',
      'Repurposing Content',
      'AI-Enhanced Content',
      'Editing',
      'Uploading & Posting',
      'Basic Product Integration',
      'Monthly Reports',
      'Ads Management',
    ],
    note: 'Avatar creation available for an extra fee.',
    schedule: [
      ['Reel', 'Story'],
      ['Story'],
      ['Story'],
      ['Reel', 'Story'],
      ['Carousel', 'Story'],
      ['Reel', 'Story'],
      ['Story'],
    ],
  },
  {
    id: 'scale',
    tier: 'More production',
    name: 'Scale',
    posts: '60+ posts / month',
    price: 2999,
    featured: true,
    tagline: 'Scale content without losing the human touch.',
    forWho: 'Brands that want more content, real footage, and creative that brings product benefits into the story.',
    features: [
      'Strategy & Research',
      'Avatar Creation',
      'Scripting',
      'Repurposing Content',
      'AI-Enhanced Content',
      'Basic Filming with Real Content',
      'Editing',
      'Uploading & Posting',
      'Sales-Focused Product Integration',
      'Monthly Reports',
      'Ads Management',
    ],
    schedule: [
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story'],
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story'],
      ['Carousel', 'Story'],
      ['Carousel', 'Story'],
      ['Reel', 'Story'],
    ],
  },
  {
    id: 'dominate',
    tier: 'Premium',
    name: 'Dominate',
    posts: '80+ posts / month',
    price: 3499,
    tagline: 'A higher-volume content operation.',
    forLabel: 'Best for',
    forWho: 'Brands that need frequent publishing, full real filming, and closer performance monitoring.',
    features: [
      'Strategy & Deep Research',
      'Avatar Creation',
      'Scripting',
      'Repurposing Content',
      'AI-Enhanced Content',
      'Filming Real Content',
      'Editing',
      'Uploading & Posting',
      'Sales-Focused Product Integration',
      'Weekly Performance Tracking',
      'Ads Management',
      'Conversion Testing (Trends)',
    ],
    schedule: [
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story', 'Reel'],
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story', 'Reel'],
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story', 'Reel'],
      ['Reel', 'Story', 'Carousel'],
    ],
  },
];

/** Comparison rows: one value per package, in the same order as socialPackages. true = included, false = not included */
export const packageComparison: { feature: string; values: (string | boolean)[] }[] = [
  { feature: 'Posts per month', values: ['20', '40+', '60+', '80+'] },
  { feature: 'Product integration', values: [false, 'Basic', 'Sales-focused', 'Sales-focused'] },
  { feature: 'Real filming', values: [false, false, 'Basic', 'Full'] },
  { feature: 'Avatar creation', values: [false, 'Extra fee', 'Included', 'Included'] },
  { feature: 'Ads management', values: [false, 'Included', 'Included', 'Included'] },
  { feature: 'Performance review', values: ['Monthly', 'Monthly', 'Monthly', 'Weekly'] },
  { feature: 'Conversion trend testing', values: [false, false, false, 'Included'] },
];

export const formatPrice = (n: number) => `$${n.toLocaleString('en-US')}`;
