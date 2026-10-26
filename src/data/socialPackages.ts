export type PostType = 'Reel' | 'Story' | 'Carousel';

export interface SocialPackage {
  id: string;
  tier: string;
  name: string;
  posts: string;
  price: number;
  features: string[];
  note?: string;
  featured?: boolean;
  /** Posting cadence, Monday → Sunday */
  schedule: PostType[][];
}

export const socialPackages: SocialPackage[] = [
  {
    id: 'light',
    tier: 'Starter',
    name: 'Light',
    posts: '20 posts / month',
    price: 999,
    features: [
      'Strategy & Research',
      'Scripting',
      'Repurposing Content',
      'Basic AI Enhanced Content',
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
    features: [
      'Strategy & Research',
      'Avatar Creation*',
      'Scripting',
      'Repurposing Content',
      'AI Enhanced Content',
      'Editing',
      'Uploading & Posting',
      'Basic Product Integration',
      'Monthly Reports',
      'Ads Management',
    ],
    note: '* Avatar created with an extra fee',
    schedule: [
      ['Reel', 'Story'],
      ['Story'],
      ['Story'],
      ['Reel', 'Story'],
      ['Story', 'Carousel'],
      ['Reel', 'Story'],
      ['Story'],
    ],
  },
  {
    id: 'scale',
    tier: 'Most popular',
    name: 'Scale',
    posts: '60+ posts / month',
    price: 2999,
    featured: true,
    features: [
      'Strategy & Research',
      'Avatar Creation',
      'Scripting',
      'Repurposing Content',
      'AI Enhanced Content',
      'Basic Filming Real Content',
      'Editing',
      'Uploading & Posting',
      'Sales Focused Product Integration',
      'Monthly Reports',
      'Ads Management',
    ],
    schedule: [
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story'],
      ['Reel', 'Story', 'Carousel'],
      ['Reel', 'Story'],
      ['Story', 'Carousel'],
      ['Story', 'Carousel'],
      ['Reel', 'Story'],
    ],
  },
  {
    id: 'dominate',
    tier: 'Premium',
    name: 'Dominate',
    posts: '80+ posts / month',
    price: 3499,
    features: [
      'Strategy & Deep Research',
      'Avatar Creation',
      'Repurposing Content',
      'AI Enhanced Content',
      'Filming Real Content',
      'Editing',
      'Uploading & Posting',
      'Sales Focused Product Integration',
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
  { feature: 'Avatar creation', values: [false, '+ fee', true, true] },
  { feature: 'Real filming', values: [false, false, 'Basic', 'Full'] },
  { feature: 'Product integration', values: [false, 'Basic', 'Sales-focused', 'Sales-focused'] },
  { feature: 'Ads management', values: [false, true, true, true] },
  { feature: 'Performance reports', values: ['Monthly', 'Monthly', 'Monthly', 'Weekly'] },
  { feature: 'Conversion testing', values: [false, false, false, true] },
];

export const formatPrice = (n: number) => `$${n.toLocaleString('en-US')}`;
