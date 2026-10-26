import type { ImageMetadata } from 'astro';
import superNinjaImage from '../assets/case-studies/super-ninja/super-ninja-fruit-fly-trap.png';
import paper2eatImage from '../assets/case-studies/paper2eat/paper2eat-frosting-sheets.png';

export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  niche: string;
  summary: string;
  /** One-sentence description of the work, without results (hub cards) */
  focus: string;
  /** Listed on the hub and homepage. Blueprint P23: only the four confirmed brands are listed for now. */
  listed: boolean;
  stats: Stat[];
  /** Real client visual; cards fall back to a placeholder without it */
  image?: { src: ImageMetadata; alt: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'super-ninja',
    listed: true,
    focus: 'Localized Amazon listings for Germany, the UK and the US, built from market research and A/B testing.',
    client: 'Super Ninja',
    niche: 'Fruit fly traps',
    summary: 'Localized Amazon listings for Germany, the UK and the US, built from market research and A/B testing.',
    stats: [
      { value: '+716.9%', label: 'Sales · US' },
      { value: '+310.5%', label: 'Sales · UK' },
      { value: '+91.5%', label: 'Sales · Germany' },
    ],
    image: { src: superNinjaImage, alt: 'Super Ninja fruit fly trap bottle and packaging with fresh fruit' },
  },
  {
    slug: 'rossm',
    listed: false,
    focus: 'Visual optimization and buyer persona positioning for a minimalist wallet listing.',
    client: 'ROSSM',
    niche: 'Minimalist wallets',
    summary: 'Visual optimization and buyer persona positioning to compete with the category leader.',
    stats: [
      { value: '+45.5%', label: 'Units sold' },
      { value: '+55.7%', label: 'Sessions' },
    ],
  },
  {
    slug: 'vizayo',
    listed: false,
    focus: 'A premium product video for a tabletop fire pit listing.',
    client: 'Vizayo',
    niche: 'Tabletop fire pits',
    summary: 'A premium product video that broke the 1% conversion rate ceiling.',
    stats: [
      { value: '+49%', label: 'Parent CVR' },
      { value: '+29%', label: 'Units ordered' },
    ],
  },
  {
    slug: 'pink-miracle',
    listed: true,
    focus: 'A rebuilt Amazon listing for a shoe cleaner, using tested creative.',
    client: 'Pink Miracle',
    niche: 'Shoe cleaner',
    summary: 'A #1-ranked listing rebuilt with tested creative: from $404K to $849K in monthly sales.',
    stats: [
      { value: '+51.94%', label: 'Sales in 1 month' },
      { value: '$849K', label: 'Monthly sales' },
      { value: '+48.5%', label: 'Units ordered' },
    ],
  },
  {
    slug: 'paper2eat',
    listed: true,
    focus: 'Listing, A+ Content, video and Storefront connected into one shopping experience, plus Spanish localization.',
    client: 'Paper2eat',
    niche: 'Edible frosting sheets',
    summary:
      'Listing, A+ Content, video and Storefront connected into one shopping experience, plus Spanish localization.',
    stats: [
      { value: '+25.3%', label: 'Monthly sales' },
      { value: '$1.33M', label: 'Sales in 6 months' },
      { value: '6.87×', label: 'Average ROAS' },
    ],
    image: {
      src: paper2eatImage,
      alt: 'Paper2eat 24-pack of frosting sheets with a cake decorated with a “Boy or Girl” printed sheet',
    },
  },
  {
    slug: 'yungprime',
    listed: true,
    focus: 'A unified listing, A+ Content, Brand Story and Storefront for a slip-resistant work shoe brand.',
    client: 'YUNGPRIME',
    niche: 'Slip-resistant work shoes',
    summary:
      'A unified listing, A+ Content, Brand Story and Storefront that grew organic sales while ad spend went down.',
    stats: [
      { value: '+28.3%', label: 'Organic sales' },
      { value: '+14.1%', label: 'Total sales' },
      { value: '2.81×', label: 'ROAS' },
    ],
  },
];

/** Cases shown on the hub and the homepage */
export const listedCaseStudies = caseStudies.filter((c) => c.listed);

export const caseStudyHref = (c: CaseStudy) => `/case-studies/${c.slug}`;

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)!;
