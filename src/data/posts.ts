export interface Post {
  /** URL slug: /blog/{slug} */
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  /** Topic group on the /blog hub; only topics with at least one post are shown */
  topic: 'A+ Content' | 'Listing Images' | 'Storefront & Brand Content';
  /** Commercial page the article leads to */
  service: { label: string; href: string };
}

export const postHref = (p: Post) => `/blog/${p.slug}`;

const aPlus = { label: 'Amazon A+ Content Design', href: '/services/amazon-a-plus-content' };
const images = { label: 'Amazon Listing Images', href: '/services/amazon-listing-images' };

/** Order = order on /blog. The first three are featured on the homepage. */
export const posts: Post[] = [
  {
    slug: 'a-plus-content-templates',
    topic: 'A+ Content',
    title: 'Amazon A+ Content Templates',
    excerpt: 'Every A+ Content module and template explained, with layouts you can adapt to your product.',
    category: 'Amazon',
    readTime: '8 min',
    service: aPlus,
  },
  {
    slug: 'amazon-a-plus-content-examples',
    topic: 'A+ Content',
    title: 'Amazon A+ Content Examples',
    excerpt: 'Real A+ Content examples by category and what makes each one convert.',
    category: 'Amazon',
    readTime: '7 min',
    service: aPlus,
  },
  {
    slug: 'amazon-images-requirements',
    topic: 'Listing Images',
    title: 'Amazon Image Requirements',
    excerpt: 'Size, format and main image rules for Amazon product images — and how to avoid suppressed listings.',
    category: 'Amazon',
    readTime: '6 min',
    service: images,
  },
  {
    slug: 'amazon-storefront',
    topic: 'Storefront & Brand Content',
    title: 'Amazon Storefront Complete Guide',
    excerpt: 'What Amazon Stores are, every tile type explained, and how to design a Storefront that converts.',
    category: 'Amazon',
    readTime: '8 min',
    service: { label: 'Amazon Storefront Design', href: '/services/amazon-storefront-design' },
  },
  {
    slug: 'a-content-best-practices',
    topic: 'A+ Content',
    title: 'A+ Content Best Practices',
    excerpt: 'How to plan, write and design A+ Content modules that answer buyers’ questions.',
    category: 'Graphic Design',
    readTime: '6 min',
    service: aPlus,
  },
  {
    slug: 'amazon-product-images-best-practices',
    topic: 'Listing Images',
    title: 'What Is Amazon Product Photography?',
    excerpt: 'Image types, Amazon requirements and the best practices that turn product photos into sales.',
    category: 'Amazon',
    readTime: '7 min',
    service: { label: 'Amazon Product Photography', href: '/services/amazon-product-photography' },
  },
  {
    slug: 'avoid-a-content-rejected',
    topic: 'A+ Content',
    title: 'How to Avoid Getting Your Amazon A+ Content Rejected',
    excerpt: 'Amazon’s A+ guidelines and the most common reasons content gets rejected — and how to avoid them.',
    category: 'Graphic Design',
    readTime: '6 min',
    service: aPlus,
  },
  {
    slug: 'create-a-content',
    topic: 'A+ Content',
    title: 'How to Add A+ Content to Your Amazon Listing',
    excerpt: 'A step-by-step guide to creating and publishing A+ Content in Seller Central.',
    category: 'Marketing',
    readTime: '5 min',
    service: aPlus,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)!;
