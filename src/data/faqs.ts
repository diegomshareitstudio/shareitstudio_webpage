/** A question and its direct answer — shared by every FAQ block and FAQPage schema */
export interface Faq {
  q: string;
  a: string;
  /** Optional deeper link shown under the answer */
  link?: { label: string; href: string };
}

/** Site-wide FAQs (/faqs). The first six are the commercial ones shown on the homepage. */
export const faqs: Faq[] = [
  {
    q: 'Can I hire Share It Studio for A+ Content only?',
    a: 'Yes. A+ Content Design is available as a standalone service, or as part of a full Amazon Listing Optimization project together with listing images, video and copy.',
  },
  {
    q: 'How does custom Amazon Listing Optimization pricing work?',
    a: 'Amazon Listing Optimization is quoted per project. The price depends on the number of ASINs and the deliverables included (listing images, A+ modules, photography, video and copy). We share a proposal after a free call.',
  },
  {
    q: 'Do you provide social media management for ecommerce brands outside Amazon?',
    a: 'Yes. Our social media management plans work for any e-commerce brand, whether you sell on Amazon, on your own store or both.',
  },
  {
    q: 'What is included in your social media management plans?',
    a: 'We have four monthly plans, from $999/mo (20 posts) to $3,499/mo (80+ posts). They include strategy, scripting, content production, editing, publishing and monthly reporting; higher plans add ads management, filming and weekly tracking.',
  },
  {
    q: 'How long does an Amazon content project typically take?',
    a: 'It depends on the scope and whether photography or video is needed. We confirm the timeline in the proposal, before the project starts.',
  },
  {
    q: 'Can Share It Studio work alongside my existing Amazon PPC agency?',
    a: 'Yes. We focus on the listing content and creative; your PPC agency keeps managing campaigns. A listing that converts better makes the same ad spend go further.',
  },
  {
    q: 'What services do you offer specifically for Amazon sellers?',
    a: 'We offer a range of services including visual content creation (Listing Images, A+ Content, Brand Story, Sponsored Ads Videos, Amazon Posts, Storefront, etc.) and written content optimization (Titles, Bullet Points, Description and Backend Keywords).',
  },
  {
    q: 'How can you improve the visual content of my Amazon product listings?',
    a: 'We take the visual content of your Amazon listings to a whole other level by creating high-quality and data-driven images and videos that engage and attract customers.',
  },
  {
    q: 'Can you create product videos or video advertisements for Amazon listings?',
    a: "Of course! Our team will work closely with you to create compelling video content that highlights the key features, benefits, and unique selling points of your products. We'll make sure your videos are engaging, informative, and optimized for maximum impact on Amazon.",
  },
  {
    q: 'Can you provide examples of your past work for Amazon sellers?',
    a: 'Absolutely! You can look in our Our Work page. There you will find examples of our work.',
  },
  {
    q: 'Will I have access to performance reports and analytics?',
    a: 'Absolutely! Transparency is a core value of our agency. You will receive a performance report and analytics that detail the results of our marketing efforts.',
  },
  {
    q: 'Is your marketing approach compliant with Amazon’s terms of service?',
    a: 'Yes, our marketing strategies strictly adhere to Amazon’s terms of service and policies.',
  },
  {
    q: "Do you have experience working with Amazon's search algorithm and ranking factors?",
    a: 'Yes, we stay up-to-date with the latest changes to ensure your listings are optimized for maximum visibility.',
  },
  {
    q: 'Can you optimize my Amazon listings for keywords and search terms?',
    a: "We can definitely help you with that! Our team conducts thorough keyword research and implements strategies to improve your product's discoverability.",
  },
  {
    q: 'What information do you need from me to create effective content for my Amazon listings?',
    a: 'To create content that resonates with your audience, we require information such as your product specifications, brand assets, and any existing marketing materials you may have.',
  },
  {
    q: 'Can you create Amazon storefronts or brand stores?',
    a: 'Sure! We collaborate closely with our clients to design and develop customized storefronts that showcase their brand and products. We ensure that the visual and written content aligns with their brand identity and engages customers effectively.',
  },
  {
    q: 'How do I get started with your agency’s services?',
    a: 'Getting started is easy! Simply book a marketing consultation with us and one of our Amazon marketing specialists will jump on a call with you. During the consultation, we’ll discuss your specific needs and goals, and tailor a customized marketing strategy to meet your requirements.',
  },
];
