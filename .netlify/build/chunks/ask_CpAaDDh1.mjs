import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
//#region src/config/site.ts
/**
* Site-wide identity: one source of truth for <head>, JSON-LD and the footer.
* The domain comes from `site` in astro.config.mjs.
*/
var SITE = {
	name: "Share It Studio",
	url: "https://shareitstudio2.com".replace(/\/$/, ""),
	language: "en",
	locale: "en_US",
	/** Fallbacks for pages that don't set their own */
	title: "Amazon Listing Optimization & Social Media Management | Share It Studio",
	description: "Ecommerce creative & growth studio: Amazon listing optimization for Amazon brands and done-for-you social media management for ecommerce brands.",
	email: "hello@shareitstudio.com",
	phone: {
		display: "+1 904-414-4173",
		tel: "+19044144173"
	},
	location: "Miami, Florida",
	/** Approved Calendly event URL. Leave empty until validated: the contact page hides the booking button without it. */
	bookingUrl: "",
	sameAs: ["https://linkedin.com/company/shareitstudio"]
};
//#endregion
//#region src/data/faqs.ts
/** Site-wide FAQs (/faqs). The first six are the commercial ones shown on the homepage. */
var faqs = [
	{
		q: "Can I hire Share It Studio for A+ Content only?",
		a: "Yes. A+ Content Design is available as a standalone service, or as part of a full Amazon Listing Optimization project together with listing images, video and copy."
	},
	{
		q: "How does custom Amazon Listing Optimization pricing work?",
		a: "Amazon Listing Optimization is quoted per project. The price depends on the number of ASINs and the deliverables included (listing images, A+ modules, photography, video and copy). We share a proposal after a free call."
	},
	{
		q: "Do you provide social media management for ecommerce brands outside Amazon?",
		a: "Yes. Our social media management plans work for any e-commerce brand, whether you sell on Amazon, on your own store or both."
	},
	{
		q: "What is included in your social media management plans?",
		a: "We have four monthly plans, from $999/mo (20 posts) to $3,499/mo (80+ posts). They include strategy, scripting, content production, editing, publishing and monthly reporting; higher plans add ads management, filming and weekly tracking."
	},
	{
		q: "How long does an Amazon content project typically take?",
		a: "It depends on the scope and whether photography or video is needed. We confirm the timeline in the proposal, before the project starts."
	},
	{
		q: "Can Share It Studio work alongside my existing Amazon PPC agency?",
		a: "Yes. We focus on the listing content and creative; your PPC agency keeps managing campaigns. A listing that converts better makes the same ad spend go further."
	},
	{
		q: "What services do you offer specifically for Amazon sellers?",
		a: "We offer a range of services including visual content creation (Listing Images, A+ Content, Brand Story, Sponsored Ads Videos, Amazon Posts, Storefront, etc.) and written content optimization (Titles, Bullet Points, Description and Backend Keywords)."
	},
	{
		q: "How can you improve the visual content of my Amazon product listings?",
		a: "We take the visual content of your Amazon listings to a whole other level by creating high-quality and data-driven images and videos that engage and attract customers."
	},
	{
		q: "Can you create product videos or video advertisements for Amazon listings?",
		a: "Of course! Our team will work closely with you to create compelling video content that highlights the key features, benefits, and unique selling points of your products. We'll make sure your videos are engaging, informative, and optimized for maximum impact on Amazon."
	},
	{
		q: "Can you provide examples of your past work for Amazon sellers?",
		a: "Absolutely! You can look in our portfolio. There you will find examples of our work."
	},
	{
		q: "Will I have access to performance reports and analytics?",
		a: "Absolutely! Transparency is a core value of our agency. You will receive a performance report and analytics that detail the results of our marketing efforts."
	},
	{
		q: "Is your marketing approach compliant with Amazon’s terms of service?",
		a: "Yes, our marketing strategies strictly adhere to Amazon’s terms of service and policies."
	},
	{
		q: "Do you have experience working with Amazon's search algorithm and ranking factors?",
		a: "Yes, we stay up-to-date with the latest changes to ensure your listings are optimized for maximum visibility."
	},
	{
		q: "Can you optimize my Amazon listings for keywords and search terms?",
		a: "We can definitely help you with that! Our team conducts thorough keyword research and implements strategies to improve your product's discoverability."
	},
	{
		q: "What information do you need from me to create effective content for my Amazon listings?",
		a: "To create content that resonates with your audience, we require information such as your product specifications, brand assets, and any existing marketing materials you may have."
	},
	{
		q: "Can you create Amazon storefronts or brand stores?",
		a: "Sure! We collaborate closely with our clients to design and develop customized storefronts that showcase their brand and products. We ensure that the visual and written content aligns with their brand identity and engages customers effectively."
	},
	{
		q: "How do I get started with your agency’s services?",
		a: "Getting started is easy! Simply book a marketing consultation with us and one of our Amazon marketing specialists will jump on a call with you. During the consultation, we’ll discuss your specific needs and goals, and tailor a customized marketing strategy to meet your requirements."
	}
];
//#endregion
//#region src/data/services.ts
/** Every service Share It Studio offers. Order = priority on the site. */
var services = [
	{
		slug: "social-media-management",
		title: "Social Media Management",
		text: "Done-for-you monthly social media for e-commerce brands: strategy, scripting, production, editing, publishing and reporting.",
		href: "/services/social-media-management",
		tags: [
			"4 monthly plans",
			"Reels & TikToks",
			"From $999/mo"
		],
		priority: "P1",
		line: "social",
		portfolio: "/portfolio/social-media"
	},
	{
		slug: "amazon-listing-optimization",
		title: "Amazon Listing Optimization",
		text: "Listing images, A+ Content, video and copy rebuilt from your data to raise conversion rate.",
		href: "/services/amazon-listing-optimization",
		tags: [
			"Listing images",
			"A+ Content",
			"Videos",
			"Copy & SEO"
		],
		priority: "P1",
		line: "amazon",
		portfolio: "/portfolio"
	},
	{
		slug: "amazon-a-plus-content",
		title: "Amazon A+ Content Design",
		text: "Basic and Premium A+ Content that answers objections and cross-sells below the fold.",
		href: "/services/amazon-a-plus-content",
		tags: [
			"A+ Content",
			"Premium A+",
			"Comparison charts"
		],
		priority: "P1",
		line: "amazon",
		portfolio: "/portfolio/a-plus-content",
		page: {
			metaTitle: "Amazon A+ Content Design Services | Share It Studio",
			description: "Amazon A+ Content and Premium A+ Content design for brands: modules planned from your reviews and competitors to answer objections and cross-sell your catalog.",
			eyebrow: "Amazon A+ Content design",
			heroTitle: "A+ Content that keeps selling below the fold",
			highlight: "below the fold",
			subtitle: "We design Basic and Premium A+ Content modules that explain your product, answer buyers’ doubts and guide them to the rest of your catalog.",
			problemTitle: "Generic A+ Content wastes your best space",
			problemText: "Shoppers who scroll past the images are still deciding. If your A+ Content repeats the bullet points or looks like every competitor, it doesn’t move them. We plan every module around the questions buyers ask in reviews.",
			points: [
				"Review mining & competitor A+ audit",
				"Module-by-module content plan",
				"Basic and Premium A+ layouts",
				"Built to Amazon’s A+ guidelines"
			],
			deliverables: [
				{
					title: "Basic A+ Content",
					text: "Standard image and text modules designed as one narrative."
				},
				{
					title: "Premium A+ Content",
					text: "Full-width, video, carousel and hotspot modules for eligible brands."
				},
				{
					title: "Comparison charts",
					text: "Cross-sell modules that move shoppers to the right product in your catalog."
				}
			],
			faqs: [
				{
					q: "Can I hire Share It Studio for A+ Content only?",
					a: "Yes. A+ Content can be a standalone project, or part of a full listing optimization."
				},
				{
					q: "What is the difference between Basic and Premium A+ Content?",
					a: "Basic A+ uses standard image and text modules. Premium A+ adds larger, interactive modules such as video, carousels and hotspots."
				},
				{
					q: "Will my A+ Content be approved by Amazon?",
					a: "We design to Amazon’s A+ guidelines and avoid the most common rejection reasons, such as unsupported claims and pricing references."
				}
			]
		}
	},
	{
		slug: "amazon-listing-images",
		title: "Amazon Listing Images",
		text: "Main image, infographics and lifestyles planned as one sequence that answers buyers’ questions.",
		href: "/services/amazon-listing-images",
		tags: [
			"Hero images",
			"Infographics",
			"Lifestyles"
		],
		priority: "P1",
		line: "amazon",
		portfolio: "/portfolio/hero-images",
		page: {
			metaTitle: "Amazon Listing Images Design Services | Share It Studio",
			description: "Amazon listing images designed to convert: compliant main images, infographics and lifestyle images planned from your reviews, competitors and sales data.",
			eyebrow: "Amazon listing images",
			heroTitle: "Listing images that win the click and the sale",
			highlight: "the click and the sale",
			subtitle: "A main image, infographics and lifestyle images planned as one sequence — each one answering a question that stops shoppers from buying.",
			problemTitle: "Shoppers decide from your images",
			problemText: "Most shoppers skim the image gallery instead of reading bullets. If your images don’t show size, quality and use clearly, they leave. We plan the full image stack from your data before anything is designed.",
			points: [
				"Competitor image audit",
				"Image-by-image content plan",
				"Compliant main image",
				"Designed for mobile thumbnails"
			],
			deliverables: [
				{
					title: "Hero image",
					text: "A compliant main image designed to stand out in search results."
				},
				{
					title: "Infographics",
					text: "Features turned into benefits shoppers understand in seconds."
				},
				{
					title: "Lifestyle images",
					text: "Scenes planned around your buyer persona, by photography or 3D."
				}
			],
			faqs: [{
				q: "How many images do you design per listing?",
				a: "Usually a full stack of 7 to 9 images, but the scope is defined after reviewing your listing."
			}, {
				q: "Do you use real photography or 3D?",
				a: "We choose per image: real photography where trust and detail matter most, 3D or AI-assisted work where it is just as accurate."
			}]
		}
	},
	{
		slug: "amazon-product-photography",
		title: "Amazon Product Photography",
		text: "Studio and lifestyle product photography shot for Amazon’s image requirements.",
		href: "/services/amazon-product-photography",
		tags: [
			"Studio",
			"Lifestyle",
			"White background"
		],
		priority: "P2",
		line: "amazon",
		portfolio: "/portfolio/lifestyle-photography",
		page: {
			metaTitle: "Amazon Product Photography Services | Share It Studio",
			description: "Amazon product photography: white-background, detail and lifestyle shots planned for your listing images and A+ Content.",
			eyebrow: "Amazon product photography",
			heroTitle: "Product photography shot for Amazon",
			highlight: "for Amazon",
			subtitle: "White-background, detail and lifestyle photography planned around the images and A+ modules your listing actually needs.",
			problemTitle: "Good photos start with a shot list",
			problemText: "Generic product shoots leave gaps in the listing. We plan every shot from the image sequence and A+ Content, so each photo has a job.",
			points: [
				"Shot list from your content plan",
				"White-background compliant shots",
				"Lifestyle scenes for your buyer persona",
				"Retouching included"
			],
			deliverables: [
				{
					title: "White-background photos",
					text: "Main image and angle shots that meet Amazon’s requirements."
				},
				{
					title: "Detail shots",
					text: "Close-ups of materials, textures and features."
				},
				{
					title: "Lifestyle photography",
					text: "Your product in use, in the setting your customer imagines."
				}
			],
			faqs: [{
				q: "Do I need to send you my product?",
				a: "Yes, for photography we need physical samples. We share shipping details when the project starts."
			}]
		}
	},
	{
		slug: "amazon-product-video-production",
		title: "Amazon Product Video Production",
		text: "Listing videos, Sponsored Brands videos and UGC-style content scripted from customer reviews.",
		href: "/services/amazon-product-video-production",
		tags: [
			"Listing videos",
			"Sponsored Ads",
			"UGC"
		],
		priority: "P2",
		line: "amazon",
		portfolio: "/portfolio/video-production",
		page: {
			metaTitle: "Amazon Product Video Production | Share It Studio",
			description: "Amazon product video production: listing videos, Sponsored Brands video ads and UGC-style videos scripted from customer reviews.",
			eyebrow: "Amazon product video production",
			heroTitle: "Product videos that show what photos can’t",
			highlight: "what photos can’t",
			subtitle: "Listing videos, Sponsored Brands video ads and UGC-style content — scripted from real customer questions and edited for sound-off viewing.",
			problemTitle: "Shoppers want to see it working",
			problemText: "Size, texture and how a product works are hard to show in a still image. A short, well-scripted video answers those questions in seconds.",
			points: [
				"Scripts based on review mining",
				"Filming and editing in-house",
				"Captions for sound-off viewing",
				"Cuts for listing and ads"
			],
			deliverables: [
				{
					title: "Listing videos",
					text: "Product demos and how-to videos for the image gallery."
				},
				{
					title: "Sponsored Brands videos",
					text: "15–30 second spots built to Amazon video ad specs."
				},
				{
					title: "UGC-style videos",
					text: "Creator content that builds trust on Amazon and social."
				}
			],
			faqs: [{
				q: "Can you make videos for my PPC campaigns?",
				a: "Yes. We deliver Sponsored Brands video cuts that your PPC team or agency can run and test."
			}]
		}
	},
	{
		slug: "amazon-storefront-design",
		title: "Amazon Storefront Design",
		text: "Amazon Store design with clear navigation and no competitor ads.",
		href: "/services/amazon-storefront-design",
		tags: ["Amazon Stores", "Category pages"],
		priority: "P2",
		line: "amazon",
		portfolio: "/portfolio/other-services",
		page: {
			metaTitle: "Amazon Storefront Design Services | Share It Studio",
			description: "Amazon Storefront design: a branded, multi-page Amazon Store with clear navigation and no competitor ads.",
			eyebrow: "Amazon Storefront design",
			heroTitle: "An Amazon Store that sells your whole catalog",
			highlight: "your whole catalog",
			subtitle: "A branded, multi-page Storefront with clear navigation — and no competitor ads.",
			problemTitle: "Your Storefront is a landing page",
			problemText: "Brand Story links and Sponsored Brands ads send shoppers to your Store. If it’s hard to navigate, they leave. We design the structure, banners and tiles around how your customers shop.",
			points: [
				"Page structure and navigation",
				"Banners and tiles",
				"Category and campaign pages",
				"Ready for Sponsored Brands traffic"
			],
			deliverables: [
				{
					title: "Store structure",
					text: "Pages and categories planned around how customers shop."
				},
				{
					title: "Banners & tiles",
					text: "Designs that keep your brand consistent across the Store."
				},
				{
					title: "Campaign pages",
					text: "Seasonal and promotion pages for ads and launches."
				}
			],
			faqs: [{
				q: "Do I need Brand Registry for a Storefront?",
				a: "Yes. Amazon Stores are available to brands enrolled in Amazon Brand Registry."
			}]
		}
	},
	{
		slug: "amazon-brand-story-design",
		title: "Amazon Brand Story Design",
		text: "A catalog-wide Brand Story carousel that introduces your brand and cross-sells.",
		href: "/services/amazon-brand-story-design",
		tags: ["Brand Story", "Cross-sell"],
		priority: "P2",
		line: "amazon",
		portfolio: "/portfolio/other-services",
		page: {
			metaTitle: "Amazon Brand Story Design | Share It Studio",
			description: "Amazon Brand Story design: a catalog-wide carousel that introduces your brand, shows your product range and sends shoppers to your Storefront.",
			eyebrow: "Amazon Brand Story design",
			heroTitle: "A Brand Story on every product you sell",
			highlight: "every product",
			subtitle: "One carousel, shown across your catalog, that tells shoppers who you are and moves them to the rest of your products.",
			problemTitle: "Shoppers buy from brands they trust",
			problemText: "The Brand Story appears on every ASIN. Designed well, it builds trust and sends shoppers to your Storefront instead of a competitor.",
			points: [
				"Brand message and structure",
				"Carousel card design",
				"Links to Store and products",
				"Consistent with your A+ Content"
			],
			deliverables: [{
				title: "Brand Story carousel",
				text: "Mission, values and product range cards."
			}, {
				title: "Store links",
				text: "Cards that send shoppers to your Storefront and best sellers."
			}],
			faqs: [{
				q: "Is the Brand Story the same as A+ Content?",
				a: "No. The Brand Story is a separate carousel shown across your catalog; A+ Content is specific to each product."
			}]
		}
	},
	{
		slug: "amazon-listing-copywriting",
		title: "Amazon Listing Copywriting & SEO",
		text: "Keyword research, titles, bullet points, descriptions and backend search terms.",
		href: "/services/amazon-listing-copywriting",
		tags: [
			"Keyword research",
			"Titles & bullets",
			"Backend terms"
		],
		priority: "P2",
		line: "amazon",
		portfolio: "/portfolio",
		page: {
			metaTitle: "Amazon Listing Copywriting & SEO | Share It Studio",
			description: "Amazon listing copywriting and SEO: keyword research, titles, bullet points, descriptions and backend search terms written to rank and convert.",
			eyebrow: "Amazon listing copywriting & SEO",
			heroTitle: "Listing copy written to rank and convert",
			highlight: "rank and convert",
			subtitle: "Keyword research, titles, bullet points and backend search terms — written for the algorithm and for the shopper.",
			problemTitle: "Keywords bring traffic, copy closes the sale",
			problemText: "A listing stuffed with keywords can rank and still not sell. We research the terms that matter and write copy that answers what buyers need to know.",
			points: [
				"Keyword research",
				"Title and bullet points",
				"Description and backend terms",
				"Aligned with your images"
			],
			deliverables: [
				{
					title: "Keyword research",
					text: "Search terms prioritized by relevance and volume."
				},
				{
					title: "Title & bullet points",
					text: "Clear, benefit-led copy within Amazon’s limits."
				},
				{
					title: "Backend search terms",
					text: "Indexing for the terms that don’t fit in visible copy."
				}
			],
			faqs: [{
				q: "Can you work alongside my existing Amazon PPC agency?",
				a: "Yes. We handle listing content and copy; your PPC agency keeps managing campaigns."
			}]
		}
	}
];
//#endregion
//#region src/data/socialPackages.ts
var socialPackages = [
	{
		id: "light",
		tier: "Starter",
		name: "Light",
		posts: "20 posts / month",
		price: 999,
		features: [
			"Strategy & Research",
			"Scripting",
			"Repurposing Content",
			"Basic AI Enhanced Content",
			"Editing",
			"Uploading & Posting",
			"Monthly Reports"
		],
		schedule: [
			["Reel"],
			["Carousel"],
			["Carousel"],
			[],
			["Story"],
			["Reel"],
			[]
		]
	},
	{
		id: "grow",
		tier: "Growth",
		name: "Grow",
		posts: "40+ posts / month",
		price: 2499,
		features: [
			"Strategy & Research",
			"Avatar Creation*",
			"Scripting",
			"Repurposing Content",
			"AI Enhanced Content",
			"Editing",
			"Uploading & Posting",
			"Basic Product Integration",
			"Monthly Reports",
			"Ads Management"
		],
		note: "* Avatar created with an extra fee",
		schedule: [
			["Reel", "Story"],
			["Story"],
			["Story"],
			["Reel", "Story"],
			["Story", "Carousel"],
			["Reel", "Story"],
			["Story"]
		]
	},
	{
		id: "scale",
		tier: "Most popular",
		name: "Scale",
		posts: "60+ posts / month",
		price: 2999,
		featured: true,
		features: [
			"Strategy & Research",
			"Avatar Creation",
			"Scripting",
			"Repurposing Content",
			"AI Enhanced Content",
			"Basic Filming Real Content",
			"Editing",
			"Uploading & Posting",
			"Sales Focused Product Integration",
			"Monthly Reports",
			"Ads Management"
		],
		schedule: [
			[
				"Reel",
				"Story",
				"Carousel"
			],
			["Reel", "Story"],
			[
				"Reel",
				"Story",
				"Carousel"
			],
			["Reel", "Story"],
			["Story", "Carousel"],
			["Story", "Carousel"],
			["Reel", "Story"]
		]
	},
	{
		id: "dominate",
		tier: "Premium",
		name: "Dominate",
		posts: "80+ posts / month",
		price: 3499,
		features: [
			"Strategy & Deep Research",
			"Avatar Creation",
			"Repurposing Content",
			"AI Enhanced Content",
			"Filming Real Content",
			"Editing",
			"Uploading & Posting",
			"Sales Focused Product Integration",
			"Weekly Performance Tracking",
			"Ads Management",
			"Conversion Testing (Trends)"
		],
		schedule: [
			[
				"Reel",
				"Story",
				"Carousel"
			],
			[
				"Reel",
				"Story",
				"Reel"
			],
			[
				"Reel",
				"Story",
				"Carousel"
			],
			[
				"Reel",
				"Story",
				"Reel"
			],
			[
				"Reel",
				"Story",
				"Carousel"
			],
			[
				"Reel",
				"Story",
				"Reel"
			],
			[
				"Reel",
				"Story",
				"Carousel"
			]
		]
	}
];
var formatPrice = (n) => `$${n.toLocaleString("en-US")}`;
`${`
- Share It Studio is an ecommerce creative and growth studio based in ${SITE.location}.
- Two service lines: Amazon listing optimization (images, A+ Content, video, copy) and done-for-you social media management for ecommerce brands.
- We create content and creative. We are not Amazon and we don't run account operations.
- Amazon listing work is quoted per project, after a call. Do not give prices for it.
- We don't guarantee sales lifts or ranking increases.
- Next step for anyone interested: book a call at ${SITE.url}/book-a-call. General contact: ${SITE.email}, ${SITE.phone.display}.
`.trim()}${services.map((s) => `- ${s.title} (${SITE.url}${s.href}): ${s.text}`).join("\n")}${socialPackages.map((p) => `- ${p.name} (${p.tier}): ${formatPrice(p.price)}/mo, ${p.posts}. Includes: ${p.features.join(", ")}.${p.note ? ` ${p.note}` : ""}`).join("\n")}${[...faqs, ...services.flatMap((s) => s.page?.faqs ?? [])].map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`;
//#endregion
//#region src/pages/api/ask.ts
var ask_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAX_QUESTION_LENGTH = 500;
var words = (text) => new Set(text.toLowerCase().match(/[a-z0-9áéíóúñ]{4,}/g) ?? []);
/** Picks the stored FAQ that shares the most words with the question. Only for local testing. */
var mockAnswer = (question) => {
	const asked = words(question);
	const pool = [...faqs, ...services.flatMap((s) => s.page?.faqs ?? [])];
	let best = {
		score: 0,
		a: ""
	};
	for (const f of pool) {
		const score = [...words(`${f.q} ${f.a}`)].filter((w) => asked.has(w)).length;
		if (score > best.score) best = {
			score,
			a: f.a
		};
	}
	return `[Test mode, no AI] ${best.score >= 2 ? best.a : "I don’t have that information. Book a call and our team will answer it."}`;
};
/** Minimal per-IP limit: 5 questions per minute. In-memory, so per server instance. */
var hits = /* @__PURE__ */ new Map();
var isRateLimited = (ip) => {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < 6e4);
	recent.push(now);
	hits.set(ip, recent);
	return recent.length > 5;
};
var json = (body, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: { "Content-Type": "application/json" }
});
var POST = async ({ request, clientAddress }) => {
	if (isRateLimited(clientAddress)) return json({ error: "Too many questions. Please wait a minute." }, 429);
	let question = "";
	try {
		const body = await request.json();
		question = typeof body?.question === "string" ? body.question.trim() : "";
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	if (!question) return json({ error: "Please write a question." }, 400);
	if (question.length > MAX_QUESTION_LENGTH) return json({ error: `Please keep your question under ${MAX_QUESTION_LENGTH} characters.` }, 400);
	return json({ answer: mockAnswer(question) });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/ask@_@ts
var page = () => ask_exports;
//#endregion
export { page };
