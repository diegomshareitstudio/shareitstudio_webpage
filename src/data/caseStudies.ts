import type { ImageMetadata } from 'astro';
import superNinjaImage from '../assets/case-studies/super-ninja/Fruit Flies (US) Hero Image_2.png';
import paper2eatImage from '../assets/case-studies/paper2eat/Paper2Eat Hero Image_4.jpg';
import huggleHealersImage from '../assets/case-studies/huggle-healers/frames/frame-02.jpg';
import yungprimeImage from '../assets/case-studies/yungprime/YungPrime Black Slip-Resistant Work Shoes Hero Image_1 (1).jpg';
import pinkMiracleImage from '../assets/case-studies/pink-miracle/Pink Miracle Hero Image_2_1.jpg';
import greatnessNowImage from '../assets/case-studies/greatness-now/Hero Image - Ring Toss Hook Game_01.jpg';

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
  stats: Stat[];
  /** Real client visual; cards fall back to a placeholder without it */
  image?: { src: ImageMetadata; alt: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'huggle-healers',
    focus: 'A 15-second Amazon Sponsored TV commercial built from real buyer questions about a weighted plush.',
    client: 'Huggle Healers',
    niche: 'Weighted stuffed animals',
    summary:
      'A research-led 15-second Sponsored TV commercial. Three campaigns reported 117,606 completed views in the first two weeks.',
    stats: [
      { value: '117,606', label: 'Completed video views' },
      { value: '118,131', label: 'Viewable impressions' },
      { value: '99.6%', label: 'Completions ÷ viewable impressions' },
    ],
    image: {
      src: huggleHealersImage,
      alt: 'A child hugging a Huggle Healers weighted plush, with the on-screen QR code',
    },
  },
  {
    slug: 'greatness-now',
    focus: 'Redesigned listing images that show how a wooden ring toss game is played, assembled and shared.',
    client: 'Greatness Now',
    niche: 'Ring toss hook game',
    summary:
      'Redesigned listing images that show how a ring toss game is played. Reported product sales went from $238 to $5,948 across two 2024 windows, with higher ad spend.',
    stats: [
      { value: '25×', label: 'Product sales · two windows' },
      { value: '7.85%', label: 'Unit Session %, from 0.79%' },
      { value: '177', label: 'Units ordered, from 7' },
    ],
    image: {
      src: greatnessNowImage,
      alt: 'Greatness Now wooden ring toss hook game with the “Play the New Way” listing image',
    },
  },
  {
    slug: 'super-ninja',
    focus:
      'Fruit fly trap listings localized for Amazon Germany, the UK and the US, with 15+ image concepts and 10+ A/B tests.',
    client: 'Super Ninja',
    niche: 'Fruit fly traps',
    summary:
      'Fruit fly trap listings adapted for Germany, the UK and the US, with 15+ image concepts and 10+ A/B tests. German product sales grew 91.5% year over year.',
    stats: [
      { value: '+91.5%', label: 'Germany sales, Aug 2024 → Aug 2025' },
      { value: '15+', label: 'Main-image concepts' },
      { value: '10+', label: 'A/B tests' },
    ],
    image: { src: superNinjaImage, alt: 'Super Ninja fruit fly trap hero image for the US Amazon listing' },
  },
  {
    slug: 'pink-miracle',
    focus: 'A refreshed Amazon listing for an established shoe cleaner, using shopper-tested creative.',
    client: 'Pink Miracle',
    niche: 'Shoe cleaner',
    summary:
      'An established, top-ranked listing refreshed with tested creative. Monthly sales went from $404K in July 2024 to $849K in January 2025.',
    stats: [
      { value: '+49.94%', label: 'Monthly sales, Jul → Aug 2024' },
      { value: '$849K', label: 'Monthly sales, Jan 2025' },
      { value: '+48.45%', label: 'Units sold, Jul 2024 → Jan 2025' },
    ],
    image: { src: pinkMiracleImage, alt: 'Pink Miracle shoe cleaner main listing image' },
  },
  {
    slug: 'paper2eat',
    focus:
      'Listing, A+ Content, video and Storefront connected into one shopping experience, plus Spanish localization.',
    client: 'Paper2eat',
    niche: 'Edible frosting sheets',
    summary:
      'Listing images, A+ Content, video, Storefront and Spanish-language assets connected into one shopping experience. $1.33M in sales in six months.',
    stats: [
      { value: '$1.33M', label: 'Amazon sales · Jan–Jun 2026' },
      { value: '+25.3%', label: 'Monthly sales, Jan → Jun' },
      { value: '+39.9%', label: 'May peak vs. January' },
    ],
    image: {
      src: paper2eatImage,
      alt: 'Paper2eat edible frosting sheets hero image from the Amazon listing',
    },
  },
  {
    slug: 'yungprime',
    focus: 'A unified listing, A+ Content, Brand Story and Storefront for a slip-resistant work shoe brand.',
    client: 'YUNGPRIME',
    niche: 'Slip-resistant work shoes',
    summary:
      'A unified listing, A+ Content, Brand Story and Storefront that grew organic sales while ad spend went down.',
    stats: [
      { value: '+28.3%', label: 'Organic sales, May → June 2026' },
      { value: '+14.1%', label: 'Total sales (as reported)' },
      { value: '2.81×', label: 'ROAS' },
    ],
    image: {
      src: yungprimeImage,
      alt: 'YUNGPRIME black slip-resistant work shoes main listing image',
    },
  },
];

export const caseStudyHref = (c: CaseStudy) => `/case-studies/${c.slug}`;

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)!;
