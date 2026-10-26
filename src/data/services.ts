import type { Faq } from './faqs';

export interface Deliverable {
  title: string;
  text: string;
}

export interface ServicePageContent {
  metaTitle: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  /** Part of the hero title to mark with the yellow highlighter */
  highlight: string;
  subtitle: string;
  problemTitle: string;
  problemText: string;
  points: string[];
  deliverables: Deliverable[];
  faqs: Faq[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  /** Answer-first, one-sentence description */
  text: string;
  href: string;
  tags: string[];
  priority: 'P1' | 'P2';
  /** Which of the two service lines it belongs to */
  line: 'amazon' | 'social';
  /** Most relevant portfolio page, for "see the work" links */
  portfolio: string;
  /** Content for services rendered by /services/[slug].astro */
  page?: ServicePageContent;
}

/** Every service Share It Studio offers. Order = priority on the site. */
export const services: ServiceItem[] = [
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    text: 'Done-for-you monthly social media for e-commerce brands: strategy, scripting, production, editing, publishing and reporting.',
    href: '/services/social-media-management',
    tags: ['4 monthly plans', 'Reels & TikToks', 'From $999/mo'],
    priority: 'P1',
    line: 'social',
    portfolio: '/portfolio/social-media',
  },
  {
    slug: 'amazon-listing-optimization',
    title: 'Amazon Listing Optimization',
    text: 'Listing images, A+ Content, video and copy rebuilt from your data to raise conversion rate.',
    href: '/services/amazon-listing-optimization',
    tags: ['Listing images', 'A+ Content', 'Videos', 'Copy & SEO'],
    priority: 'P1',
    line: 'amazon',
    portfolio: '/portfolio',
  },
  {
    slug: 'amazon-a-plus-content',
    title: 'Amazon A+ Content Design',
    text: 'Basic and Premium A+ Content that answers objections and cross-sells below the fold.',
    href: '/services/amazon-a-plus-content',
    tags: ['A+ Content', 'Premium A+', 'Comparison charts'],
    priority: 'P1',
    line: 'amazon',
    portfolio: '/portfolio/a-plus-content',
    page: {
      metaTitle: 'Amazon A+ Content Design Services | Share It Studio',
      description:
        'Amazon A+ Content and Premium A+ Content design for brands: modules planned from your reviews and competitors to answer objections and cross-sell your catalog.',
      eyebrow: 'Amazon A+ Content design',
      heroTitle: 'A+ Content that keeps selling below the fold',
      highlight: 'below the fold',
      subtitle:
        'We design Basic and Premium A+ Content modules that explain your product, answer buyers’ doubts and guide them to the rest of your catalog.',
      problemTitle: 'Generic A+ Content wastes your best space',
      problemText:
        'Shoppers who scroll past the images are still deciding. If your A+ Content repeats the bullet points or looks like every competitor, it doesn’t move them. We plan every module around the questions buyers ask in reviews.',
      points: [
        'Review mining & competitor A+ audit',
        'Module-by-module content plan',
        'Basic and Premium A+ layouts',
        'Built to Amazon’s A+ guidelines',
      ],
      deliverables: [
        { title: 'Basic A+ Content', text: 'Standard image and text modules designed as one narrative.' },
        { title: 'Premium A+ Content', text: 'Full-width, video, carousel and hotspot modules for eligible brands.' },
        {
          title: 'Comparison charts',
          text: 'Cross-sell modules that move shoppers to the right product in your catalog.',
        },
      ],
      faqs: [
        {
          q: 'Can I hire Share It Studio for A+ Content only?',
          a: 'Yes. A+ Content can be a standalone project, or part of a full listing optimization.',
        },
        {
          q: 'What is the difference between Basic and Premium A+ Content?',
          a: 'Basic A+ uses standard image and text modules. Premium A+ adds larger, interactive modules such as video, carousels and hotspots.',
        },
        {
          q: 'Will my A+ Content be approved by Amazon?',
          a: 'We design to Amazon’s A+ guidelines and avoid the most common rejection reasons, such as unsupported claims and pricing references.',
        },
      ],
    },
  },
  {
    slug: 'amazon-listing-images',
    title: 'Amazon Listing Images',
    text: 'Main image, infographics and lifestyles planned as one sequence that answers buyers’ questions.',
    href: '/services/amazon-listing-images',
    tags: ['Hero images', 'Infographics', 'Lifestyles'],
    priority: 'P1',
    line: 'amazon',
    portfolio: '/portfolio/hero-images',
    page: {
      metaTitle: 'Amazon Listing Images Design Services | Share It Studio',
      description:
        'Amazon listing images designed to convert: compliant main images, infographics and lifestyle images planned from your reviews, competitors and sales data.',
      eyebrow: 'Amazon listing images',
      heroTitle: 'Listing images that win the click and the sale',
      highlight: 'the click and the sale',
      subtitle:
        'A main image, infographics and lifestyle images planned as one sequence — each one answering a question that stops shoppers from buying.',
      problemTitle: 'Shoppers decide from your images',
      problemText:
        'Most shoppers skim the image gallery instead of reading bullets. If your images don’t show size, quality and use clearly, they leave. We plan the full image stack from your data before anything is designed.',
      points: [
        'Competitor image audit',
        'Image-by-image content plan',
        'Compliant main image',
        'Designed for mobile thumbnails',
      ],
      deliverables: [
        { title: 'Hero image', text: 'A compliant main image designed to stand out in search results.' },
        { title: 'Infographics', text: 'Features turned into benefits shoppers understand in seconds.' },
        { title: 'Lifestyle images', text: 'Scenes planned around your buyer persona, by photography or 3D.' },
      ],
      faqs: [
        {
          q: 'How many images do you design per listing?',
          a: 'Usually a full stack of 7 to 9 images, but the scope is defined after reviewing your listing.',
        },
        {
          q: 'Do you use real photography or 3D?',
          a: 'We choose per image: real photography where trust and detail matter most, 3D or AI-assisted work where it is just as accurate.',
        },
      ],
    },
  },
  {
    slug: 'amazon-product-photography',
    title: 'Amazon Product Photography',
    text: 'Studio and lifestyle product photography shot for Amazon’s image requirements.',
    href: '/services/amazon-product-photography',
    tags: ['Studio', 'Lifestyle', 'White background'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/portfolio/lifestyle-photography',
    page: {
      metaTitle: 'Amazon Product Photography Services | Share It Studio',
      description:
        'Amazon product photography: white-background, detail and lifestyle shots planned for your listing images and A+ Content.',
      eyebrow: 'Amazon product photography',
      heroTitle: 'Product photography shot for Amazon',
      highlight: 'for Amazon',
      subtitle:
        'White-background, detail and lifestyle photography planned around the images and A+ modules your listing actually needs.',
      problemTitle: 'Good photos start with a shot list',
      problemText:
        'Generic product shoots leave gaps in the listing. We plan every shot from the image sequence and A+ Content, so each photo has a job.',
      points: [
        'Shot list from your content plan',
        'White-background compliant shots',
        'Lifestyle scenes for your buyer persona',
        'Retouching included',
      ],
      deliverables: [
        { title: 'White-background photos', text: 'Main image and angle shots that meet Amazon’s requirements.' },
        { title: 'Detail shots', text: 'Close-ups of materials, textures and features.' },
        { title: 'Lifestyle photography', text: 'Your product in use, in the setting your customer imagines.' },
      ],
      faqs: [
        {
          q: 'Do I need to send you my product?',
          a: 'Yes, for photography we need physical samples. We share shipping details when the project starts.',
        },
      ],
    },
  },
  {
    slug: 'amazon-product-video-production',
    title: 'Amazon Product Video Production',
    text: 'Listing videos, Sponsored Brands videos and UGC-style content scripted from customer reviews.',
    href: '/services/amazon-product-video-production',
    tags: ['Listing videos', 'Sponsored Ads', 'UGC'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/portfolio/video-production',
    page: {
      metaTitle: 'Amazon Product Video Production | Share It Studio',
      description:
        'Amazon product video production: listing videos, Sponsored Brands video ads and UGC-style videos scripted from customer reviews.',
      eyebrow: 'Amazon product video production',
      heroTitle: 'Product videos that show what photos can’t',
      highlight: 'what photos can’t',
      subtitle:
        'Listing videos, Sponsored Brands video ads and UGC-style content — scripted from real customer questions and edited for sound-off viewing.',
      problemTitle: 'Shoppers want to see it working',
      problemText:
        'Size, texture and how a product works are hard to show in a still image. A short, well-scripted video answers those questions in seconds.',
      points: [
        'Scripts based on review mining',
        'Filming and editing in-house',
        'Captions for sound-off viewing',
        'Cuts for listing and ads',
      ],
      deliverables: [
        { title: 'Listing videos', text: 'Product demos and how-to videos for the image gallery.' },
        { title: 'Sponsored Brands videos', text: '15–30 second spots built to Amazon video ad specs.' },
        { title: 'UGC-style videos', text: 'Creator content that builds trust on Amazon and social.' },
      ],
      faqs: [
        {
          q: 'Can you make videos for my PPC campaigns?',
          a: 'Yes. We deliver Sponsored Brands video cuts that your PPC team or agency can run and test.',
        },
      ],
    },
  },
  {
    slug: 'amazon-storefront-design',
    title: 'Amazon Storefront Design',
    text: 'Amazon Store design with clear navigation and no competitor ads.',
    href: '/services/amazon-storefront-design',
    tags: ['Amazon Stores', 'Category pages'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/portfolio/other-services',
    page: {
      metaTitle: 'Amazon Storefront Design Services | Share It Studio',
      description:
        'Amazon Storefront design: a branded, multi-page Amazon Store with clear navigation and no competitor ads.',
      eyebrow: 'Amazon Storefront design',
      heroTitle: 'An Amazon Store that sells your whole catalog',
      highlight: 'your whole catalog',
      subtitle: 'A branded, multi-page Storefront with clear navigation — and no competitor ads.',
      problemTitle: 'Your Storefront is a landing page',
      problemText:
        'Brand Story links and Sponsored Brands ads send shoppers to your Store. If it’s hard to navigate, they leave. We design the structure, banners and tiles around how your customers shop.',
      points: [
        'Page structure and navigation',
        'Banners and tiles',
        'Category and campaign pages',
        'Ready for Sponsored Brands traffic',
      ],
      deliverables: [
        { title: 'Store structure', text: 'Pages and categories planned around how customers shop.' },
        { title: 'Banners & tiles', text: 'Designs that keep your brand consistent across the Store.' },
        { title: 'Campaign pages', text: 'Seasonal and promotion pages for ads and launches.' },
      ],
      faqs: [
        {
          q: 'Do I need Brand Registry for a Storefront?',
          a: 'Yes. Amazon Stores are available to brands enrolled in Amazon Brand Registry.',
        },
      ],
    },
  },
  {
    slug: 'amazon-brand-story-design',
    title: 'Amazon Brand Story Design',
    text: 'A catalog-wide Brand Story carousel that introduces your brand and cross-sells.',
    href: '/services/amazon-brand-story-design',
    tags: ['Brand Story', 'Cross-sell'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/portfolio/other-services',
    page: {
      metaTitle: 'Amazon Brand Story Design | Share It Studio',
      description:
        'Amazon Brand Story design: a catalog-wide carousel that introduces your brand, shows your product range and sends shoppers to your Storefront.',
      eyebrow: 'Amazon Brand Story design',
      heroTitle: 'A Brand Story on every product you sell',
      highlight: 'every product',
      subtitle:
        'One carousel, shown across your catalog, that tells shoppers who you are and moves them to the rest of your products.',
      problemTitle: 'Shoppers buy from brands they trust',
      problemText:
        'The Brand Story appears on every ASIN. Designed well, it builds trust and sends shoppers to your Storefront instead of a competitor.',
      points: [
        'Brand message and structure',
        'Carousel card design',
        'Links to Store and products',
        'Consistent with your A+ Content',
      ],
      deliverables: [
        { title: 'Brand Story carousel', text: 'Mission, values and product range cards.' },
        { title: 'Store links', text: 'Cards that send shoppers to your Storefront and best sellers.' },
      ],
      faqs: [
        {
          q: 'Is the Brand Story the same as A+ Content?',
          a: 'No. The Brand Story is a separate carousel shown across your catalog; A+ Content is specific to each product.',
        },
      ],
    },
  },
  {
    slug: 'amazon-listing-copywriting',
    title: 'Amazon Listing Copywriting & SEO',
    text: 'Keyword research, titles, bullet points, descriptions and backend search terms.',
    href: '/services/amazon-listing-copywriting',
    tags: ['Keyword research', 'Titles & bullets', 'Backend terms'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/portfolio',
    page: {
      metaTitle: 'Amazon Listing Copywriting & SEO | Share It Studio',
      description:
        'Amazon listing copywriting and SEO: keyword research, titles, bullet points, descriptions and backend search terms written to rank and convert.',
      eyebrow: 'Amazon listing copywriting & SEO',
      heroTitle: 'Listing copy written to rank and convert',
      highlight: 'rank and convert',
      subtitle:
        'Keyword research, titles, bullet points and backend search terms — written for the algorithm and for the shopper.',
      problemTitle: 'Keywords bring traffic, copy closes the sale',
      problemText:
        'A listing stuffed with keywords can rank and still not sell. We research the terms that matter and write copy that answers what buyers need to know.',
      points: [
        'Keyword research',
        'Title and bullet points',
        'Description and backend terms',
        'Aligned with your images',
      ],
      deliverables: [
        { title: 'Keyword research', text: 'Search terms prioritized by relevance and volume.' },
        { title: 'Title & bullet points', text: 'Clear, benefit-led copy within Amazon’s limits.' },
        { title: 'Backend search terms', text: 'Indexing for the terms that don’t fit in visible copy.' },
      ],
      faqs: [
        {
          q: 'Can you work alongside my existing Amazon PPC agency?',
          a: 'Yes. We handle listing content and copy; your PPC agency keeps managing campaigns.',
        },
      ],
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
