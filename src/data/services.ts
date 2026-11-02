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
  /** FAQs of services with a hand-built page (no `page`), shared with the page and the site assistant */
  faqs?: Faq[];
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
    portfolio: '/our-work',
  },
  {
    slug: 'amazon-listing-optimization',
    title: 'Amazon Listing Optimization',
    text: 'Listing images, A+ Content, video and copy rebuilt from your data to raise conversion rate.',
    href: '/services/amazon-listing-optimization',
    tags: ['Listing images', 'A+ Content', 'Videos', 'Copy & SEO'],
    priority: 'P1',
    line: 'amazon',
    portfolio: '/our-work',
  },
  {
    slug: 'amazon-a-plus-content',
    title: 'Amazon A+ Content Design',
    text: 'Basic and Premium A+ Content built around the questions buyers still have, with product visuals, comparisons and clear storytelling.',
    href: '/services/amazon-a-plus-content',
    tags: ['A+ Content', 'Premium A+', 'Comparison charts'],
    priority: 'P1',
    line: 'amazon',
    portfolio: '/our-work',
    // Hand-built page (src/pages/services/amazon-a-plus-content.astro), so no `page` here
    faqs: [
      {
        q: 'What is Amazon A+ Content?',
        a: 'Amazon A+ Content adds enhanced images, text, and other modules to the product-description area of eligible Amazon product detail pages. It helps shoppers understand features, benefits, and product differences beyond the standard listing information.',
      },
      {
        q: 'What’s the difference between Basic and Premium A+ Content?',
        a: 'Basic A+ uses text, images, and product comparisons. Premium A+ offers additional options such as larger imagery, video, interactive hotspots, and carousels. Amazon controls Premium eligibility, and the exact creative elements depend on your project scope.',
      },
      {
        q: 'How do I know if my brand qualifies for Premium A+ Content?',
        a: 'Check your A+ Content Manager in Seller Central. Premium access is enabled by Amazon when your account meets its current eligibility requirements; we can help you discuss a suitable design scope once you know which options are available.',
      },
      {
        q: 'Can I hire Share It Studio only for A+ Content?',
        a: 'Yes. Basic or Premium A+ Content can be commissioned as a standalone service. Listing images, Brand Story, photography, video, and other Amazon creative services are optional.',
      },
      {
        q: 'How is A+ Content different from listing images and Brand Story?',
        a: 'Listing images are part of the product gallery. A+ Content explains the specific product in more depth within the product-description area. Brand Story is a separate “From the brand” section focused on the company and its wider product range.',
        link: { label: 'About Amazon Brand Story Design', href: '/services/amazon-brand-story-design' },
      },
      {
        q: 'Can A+ Content improve my Amazon conversion rate?',
        a: 'Clear, relevant A+ Content can help shoppers make a more informed decision, but it cannot guarantee higher conversion or sales. Performance also depends on traffic, price, reviews, competition, and other factors.',
      },
      {
        q: 'How much does Amazon A+ Content design cost?',
        a: 'Amazon provides the A+ publishing tool at no additional cost to eligible sellers, but professional content creation is a separate service. Our quote depends on Basic versus Premium, the number and type of modules, available assets, and any photography, video, mobile adaptations, or other production needs.',
      },
      {
        q: 'Will you upload the A+ Content to Amazon for me?',
        a: 'Upload and publishing assistance can be discussed as part of your project scope. Amazon reviews submitted content and controls final approval and display.',
      },
    ],
  },
  {
    slug: 'amazon-listing-images',
    title: 'Amazon Listing Images',
    text: 'Main images, product infographics and lifestyle visuals that show shoppers what they’re buying, how it works and what makes it different.',
    href: '/services/amazon-listing-images',
    tags: ['Hero images', 'Infographics', 'Lifestyles'],
    priority: 'P1',
    line: 'amazon',
    portfolio: '/our-work',
    // Hand-built page (src/pages/services/amazon-listing-images.astro), so no `page` here
    faqs: [
      {
        q: 'What are Amazon listing images?',
        a: 'Amazon listing images are the main and additional gallery visuals on a product detail page. They show the product, its features, size, and uses to help shoppers evaluate what they’re buying.',
      },
      {
        q: 'Can I order listing images without a full Amazon listing optimization package?',
        a: 'Yes. You can hire Share It Studio for individual main images, infographics, or a complete image-gallery refresh. A+ Content, video, and other Amazon services are optional.',
      },
      {
        q: 'What’s the difference between Amazon listing images and A+ Content?',
        a: 'Listing images appear in the product image gallery. A+ Content is a separate section of the product detail page that can explain benefits and comparisons in greater depth. You can purchase either service on its own.',
        link: { label: 'About A+ Content Design', href: '/services/amazon-a-plus-content' },
      },
      {
        q: 'Do I need professional product photography first?',
        a: 'Not always. We can work with suitable existing photos and approved assets. If your product needs new, accurate photographs, we can scope a separate shoot or a combined project.',
      },
      {
        q: 'Will the images meet Amazon’s requirements?',
        a: 'We design with the applicable Amazon image guidelines in mind. Main images generally require an accurate photograph of the product on a pure white background without added promotional text. Secondary images can communicate more detail, subject to category rules. Amazon makes the final display and acceptance decisions.',
        link: { label: 'Read our guide to Amazon image requirements', href: '/blog/amazon-images-requirements' },
      },
      {
        q: 'Will better listing images increase my Amazon sales?',
        a: 'Clearer images may help customers evaluate your product, but sales also depend on price, reviews, traffic, and other factors. We cannot guarantee a particular conversion or sales increase.',
      },
      {
        q: 'How much does Amazon listing image design cost?',
        a: 'Pricing depends on the number and type of images, the assets you already have, product variations, and whether photography or models are needed. We’ll confirm the deliverables and provide a custom quote before production.',
      },
    ],
  },
  {
    slug: 'amazon-product-photography',
    title: 'Amazon Product Photography',
    text: 'Studio, detail, lifestyle and scale photography of your real product, planned around what Amazon shoppers need to see.',
    href: '/services/amazon-product-photography',
    tags: ['Studio', 'Lifestyle', 'White background'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/our-work',
    // Hand-built page (src/pages/services/amazon-product-photography.astro), so no `page` here
    faqs: [
      {
        q: 'What is Amazon product photography?',
        a: 'Amazon product photography is the creation of photographs showing the actual product for use in its listing and related brand content. It can include studio shots, close-ups, lifestyle scenes, and images that demonstrate size or use.',
      },
      {
        q: 'How is product photography different from Amazon listing image design?',
        a: 'Photography captures the physical product. Listing image design uses photographs and other approved assets to build final gallery visuals, such as infographics and lifestyle compositions with messaging. You can hire photography without purchasing listing image design.',
        link: { label: 'About Amazon Listing Images', href: '/services/amazon-listing-images' },
      },
      {
        q: 'Do you photograph real products or use AI-generated images?',
        a: 'This service is centered on photographing the real product. If a project also calls for AI-assisted backgrounds, compositing, or other digital creative, we’ll discuss that separately and make sure the product is represented accurately. A generated product render is not presented as a real photograph.',
      },
      {
        q: 'Can you shoot on a white background for Amazon’s main image?',
        a: 'Yes, we can plan clean studio photographs for that purpose. Amazon generally requires main images to show the actual product on pure white (RGB 255, 255, 255), without added promotional text or confusing props. The requirements of your category and marketplace take precedence, and Amazon controls image acceptance and display.',
        link: { label: 'Read our guide to Amazon image requirements', href: '/blog/amazon-images-requirements' },
      },
      {
        q: 'How much does Amazon product photography cost?',
        a: 'Pricing depends on the product, number and type of shots, samples or variations, studio or lifestyle requirements, models, props, locations, retouching, and usage rights. We provide a custom quote for the work you actually need. No specific sales or conversion increase is guaranteed.',
      },
    ],
  },
  {
    slug: 'amazon-product-video-production',
    title: 'Amazon Product Video Production',
    text: 'Listing videos, Sponsored Brands videos and UGC-style content scripted from customer reviews.',
    href: '/services/amazon-product-video-production',
    tags: ['Listing videos', 'Sponsored Ads', 'UGC'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/our-work',
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
    text: 'Branded Amazon Stores with clear navigation, product collections and visuals that make your catalog easier to explore.',
    href: '/services/amazon-storefront-design',
    tags: ['Amazon Stores', 'Category pages'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/our-work',
    // Hand-built page (src/pages/services/amazon-storefront-design.astro), so no `page` here
    faqs: [
      {
        q: 'What is an Amazon Brand Store?',
        a: 'An Amazon Brand Store is a shopping destination where eligible brands present their products through a homepage and optional additional pages. It is different from an Amazon Influencer storefront, which showcases an influencer’s recommendations.',
        link: { label: 'Read our guide to Amazon Storefronts', href: '/blog/amazon-storefront' },
      },
      {
        q: 'Who can have an Amazon Storefront?',
        a: 'Eligible Brand Registry sellers and vendors can use Amazon Brand Stores. Sellers need the appropriate selling account and Store builder access; we’ll confirm your permissions before quoting.',
      },
      {
        q: 'Is creating an Amazon Brand Store free?',
        a: 'Amazon doesn’t charge a separate Store creation or maintenance fee. Our professional design, production, and any agreed publishing assistance are paid services.',
      },
      {
        q: 'How is Storefront Design different from A+ Content and Brand Story?',
        a: 'A+ Content explains one product. Brand Story introduces the brand on the product page. A Brand Store is a separate destination with navigation and product collections. Storefront Design can be purchased on its own.',
        link: { label: 'About Amazon Brand Story Design', href: '/services/amazon-brand-story-design' },
      },
      {
        q: 'Can you redesign an existing Amazon Storefront?',
        a: 'Yes. We can scope updates to your existing Store’s pages, product collections, or navigation without automatically rebuilding everything.',
      },
      {
        q: 'Will you upload the Storefront and submit it to Amazon?',
        a: 'Upload and submission support can be included if agreed in the quote. Amazon reviews submitted Stores and controls final approval and display.',
      },
      {
        q: 'Does an Amazon Storefront bring more traffic or guarantee sales?',
        a: 'A Store gives visitors from product pages, ads, or shared links a place to explore your catalog. Better design can’t guarantee more traffic or sales; PPC management isn’t included by default.',
      },
      {
        q: 'How much does Amazon Storefront Design cost?',
        a: 'Pricing depends on the number of Store pages, catalog size, assets available, and any new creative or publishing support required. You’ll receive a custom quote before production.',
      },
    ],
  },
  {
    slug: 'amazon-brand-story-design',
    title: 'Amazon Brand Story Design',
    text: 'A Brand Story carousel that introduces your brand, shows what makes it different and helps shoppers discover more of your products.',
    href: '/services/amazon-brand-story-design',
    tags: ['Brand Story', 'Cross-sell'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/our-work',
    // Hand-built page (src/pages/services/amazon-brand-story-design.astro), so no `page` here
    faqs: [
      {
        q: 'What is Amazon Brand Story?',
        a: 'Amazon Brand Story is a branded carousel that appears in the “From the brand” section of eligible product detail pages. It uses images and text to introduce your brand and can include links to other products and your Amazon Brand Store.',
      },
      {
        q: 'How is Brand Story different from A+ Content and an Amazon Storefront?',
        a: 'A+ Content explains a specific product in more depth. Brand Story introduces the company behind the product in a separate carousel. An Amazon Storefront is a dedicated place to explore your brand’s catalog. They can work together, but each serves a different purpose.',
        link: { label: 'About A+ Content Design', href: '/services/amazon-a-plus-content' },
      },
      {
        q: 'Do I need a big company history to have a Brand Story?',
        a: 'No. A useful Brand Story can focus on your identity, product philosophy, authentic values, or the products you make. We work with the facts and assets you can support — not invented claims.',
      },
      {
        q: 'Who can use Amazon Brand Story?',
        a: 'Amazon makes Brand Story available through A+ Content Manager to eligible sellers and authorized brand representatives with the required Brand Registry access. Check your Seller Central account for the content options available to your brand.',
      },
      {
        q: 'Can the same Brand Story be used across multiple products?',
        a: 'Amazon supports applying Brand Story content to multiple eligible ASINs, subject to brand ownership or permissions and Amazon review. The number of products and any upload assistance included in your project will be confirmed in the quote.',
      },
      {
        q: 'What do I need to provide to get started?',
        a: 'Your brand name and logo, existing visual guidelines, accurate brand information, approved product imagery, and the products or Store you want to feature are a good start. If assets are missing, we can discuss what needs to be created.',
      },
      {
        q: 'Will Amazon Brand Story increase my sales?',
        a: 'Brand Story can provide more brand context and help customers explore related products, but it cannot guarantee higher conversion or sales. Traffic, product relevance, price, reviews, and other factors also influence results.',
      },
      {
        q: 'How much does Amazon Brand Story design cost?',
        a: 'Pricing depends on the number and type of cards, the assets available, the creative production required, and whether photography or upload assistance is needed. We’ll confirm the scope and provide a custom quote before work begins.',
      },
    ],
  },
  {
    slug: 'amazon-listing-copywriting',
    title: 'Amazon Listing Copywriting & SEO',
    text: 'Keyword research, product titles, bullet points and backend search terms that connect how shoppers search with why your product is worth choosing.',
    href: '/services/amazon-listing-copywriting',
    tags: ['Keyword research', 'Titles & bullets', 'Backend terms'],
    priority: 'P2',
    line: 'amazon',
    portfolio: '/our-work',
    // Hand-built page (src/pages/services/amazon-listing-copywriting.astro), so no `page` here
    faqs: [
      {
        q: 'What is Amazon listing copywriting and SEO?',
        a: 'It’s writing product listing text around relevant Amazon searches and the questions shoppers need answered. It can include the product title, bullet points, and backend search terms, with the goal of making the listing easier to find and understand. This service focuses on Amazon’s product search, not Google website SEO.',
      },
      {
        q: 'Does your copywriting service include keyword research?',
        a: 'Yes. Keyword research and product analysis inform the copy we create. We prioritize relevant terms that fit your product and the way customers search instead of repeating keywords unnecessarily.',
      },
      {
        q: 'What copywriting deliverables are included?',
        a: 'Our English title-and-bullets offering includes a product title, five bullet points, keyword research, and backend search terms, subject to the agreed category and listing scope. Item Highlights, descriptions, language adaptations, and other fields can be discussed separately.',
      },
      {
        q: 'What are Amazon Item Highlights?',
        a: 'Item Highlights is a searchable field introduced alongside Amazon’s 2026 title changes. In most non-media categories, Amazon now limits the product title to 75 characters and provides up to 125 characters for Item Highlights. We can discuss how to use that space when defining your project.',
      },
      {
        q: 'What are backend search terms?',
        a: 'Backend search terms are hidden keywords entered in Amazon Seller Central. They can include relevant synonyms or alternative names that would sound unnatural in a title or bullet point. Amazon controls how these terms are used, and they must follow its current limits and content rules.',
      },
      {
        q: 'Can I hire you for copywriting without images or A+ Content?',
        a: 'Yes. Amazon Listing Copywriting & SEO is available as a standalone service. Images, A+ Content, and other creative work can be added only if your listing needs them.',
      },
      {
        q: 'Can you write Amazon listings in Spanish?',
        a: 'Spanish-language titles and bullet points are available as a separately scoped offering. We’ll confirm the marketplace, language needs, deliverables, and approval process before quoting.',
      },
      {
        q: 'Will new copy improve my Amazon rankings or sales?',
        a: 'Relevant, clear copy may help shoppers find and evaluate your product, but rankings and sales depend on many factors, including competition, pricing, traffic, reviews, and catalog information. We don’t guarantee a specific result.',
      },
      {
        q: 'How much does Amazon listing copywriting cost?',
        a: 'Pricing depends on the number of ASINs, product variations, language, research needs, and fields included. We’ll confirm your deliverables and provide a quote before writing begins.',
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
