export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/** Portfolio categories — also used for "Explore more of our work" on portfolio pages. */
export const portfolioNav: NavLink[] = [
  { label: 'A+ Content', href: '/portfolio/a-plus-content' },
  { label: 'Hero Images', href: '/portfolio/hero-images' },
  { label: 'Amazon Infographics', href: '/portfolio/amazon-infographics' },
  { label: 'Lifestyle Photography', href: '/portfolio/lifestyle-photography' },
  { label: 'Video Production', href: '/portfolio/video-production' },
  { label: 'Social Media', href: '/portfolio/social-media' },
  { label: 'Other Services', href: '/portfolio/other-services' },
];

export const mainNav: NavLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Social Media Management', href: '/services/social-media-management' },
      { label: 'Amazon Listing Optimization', href: '/services/amazon-listing-optimization' },
      { label: 'A+ Content Design', href: '/services/amazon-a-plus-content' },
      { label: 'Listing Images', href: '/services/amazon-listing-images' },
      { label: 'Product Photography', href: '/services/amazon-product-photography' },
      { label: 'Product Video Production', href: '/services/amazon-product-video-production' },
      { label: 'Storefront Design', href: '/services/amazon-storefront-design' },
      { label: 'Brand Story Design', href: '/services/amazon-brand-story-design' },
      { label: 'Listing Copywriting & SEO', href: '/services/amazon-listing-copywriting' },
    ],
  },
  {
    label: 'Our Work',
    href: '/portfolio',
    children: [
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Case Studies', href: '/case-studies' },
      ...portfolioNav,
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    children: [
      { label: 'All Resources', href: '/blog' },
      { label: 'A+ Content Templates', href: '/blog/a-plus-content-templates' },
      { label: 'A+ Content Examples', href: '/blog/amazon-a-plus-content-examples' },
      { label: 'Amazon Images Requirements', href: '/blog/amazon-images-requirements' },
      { label: 'Amazon Storefront Guide', href: '/blog/amazon-storefront' },
      { label: 'CVR Calculator', href: '/cvr-calculator' },
    ],
  },
  {
    label: 'About Us',
    href: '/about-us',
    children: [
      { label: 'About Us', href: '/about-us' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
];

export const footerNav: NavLink[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Social Media Management', href: '/services/social-media-management' },
      { label: 'Amazon Listing Optimization', href: '/services/amazon-listing-optimization' },
      { label: 'A+ Content Design', href: '/services/amazon-a-plus-content' },
      { label: 'Listing Images', href: '/services/amazon-listing-images' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    children: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'A+ Content', href: '/portfolio/a-plus-content' },
      { label: 'Video Production', href: '/portfolio/video-production' },
      { label: 'Social Media', href: '/portfolio/social-media' },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    children: [
      { label: 'Blog & Guides', href: '/blog' },
      { label: 'A+ Content Templates', href: '/blog/a-plus-content-templates' },
      { label: 'A+ Content Examples', href: '/blog/amazon-a-plus-content-examples' },
      { label: 'Amazon Images Requirements', href: '/blog/amazon-images-requirements' },
      { label: 'CVR Calculator', href: '/cvr-calculator' },
    ],
  },
  {
    label: 'Company',
    href: '/about-us',
    children: [
      { label: 'About Us', href: '/about-us' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];
