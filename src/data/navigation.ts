export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Case Studies', href: '/case-studies' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Listing Optimization', href: '/services/listing-optimization' },
      { label: 'Social Media', href: '/services/social-media' },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    children: [
      { label: 'Hero Images', href: '/portfolio/listing-images/hero-images' },
      { label: 'Infographics', href: '/portfolio/listing-images/infographics' },
      { label: 'Lifestyles', href: '/portfolio/listing-images/lifestyles' },
      { label: 'A+ Content', href: '/portfolio/a-content' },
      { label: 'Premium A+ Content', href: '/portfolio/premium-a-content' },
      { label: 'Brand Story', href: '/portfolio/brand-story' },
      { label: 'Storefront', href: '/portfolio/storefront' },
      { label: 'Branding', href: '/portfolio/branding' },
      { label: 'Listing Videos', href: '/portfolio/videos/listing-videos' },
      { label: 'Sponsored Ads Videos', href: '/portfolio/videos/sponsored-ads' },
      { label: 'UGC Videos', href: '/portfolio/videos/ugc-videos' },
      { label: 'Social Media Videos', href: '/portfolio/videos/social-media-videos' },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'CVR Calculator', href: '/cvr-calculator' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    label: 'More',
    href: '/about-us',
    children: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
      { label: 'Schedule a Call', href: '/call' },
    ],
  },
];
