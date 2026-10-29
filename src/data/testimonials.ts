/**
 * Client testimonials for the homepage (section 04). Videos and photos share one list.
 *
 * Adding a real testimonial:
 * - Photo: put the image in src/assets/testimonials/ and import it here (Astro optimizes it).
 * - Video: put a web version of the .mp4 and optional .vtt captions in public/testimonials/, and a poster frame in
 *   src/assets/testimonials/posters/. Camera originals are far too heavy for the web (and GitHub rejects files over
 *   100 MB); encode them first, e.g. for a vertical video (swap to 1280:720 for horizontal):
 *     ffmpeg -i in.mp4 -vf scale=720:1280 -c:v libx264 -preset slow -crf 27 -maxrate 1500k -bufsize 3000k  *       -c:a aac -b:a 96k -movflags +faststart public/testimonials/name.mp4
 *   Fill in `transcript`: it is shown on the page and is what search engines can actually read from the video.
 * - Remove `placeholder: true`. Placeholders render as empty frames and never reach the JSON-LD.
 *
 * Only publish quotes the client has approved, with their name and role exactly as they agreed.
 */
import type { ImageMetadata } from 'astro';
import derciliaPoster from '../assets/testimonials/posters/dercilia-ventura.jpg';
import rickyPoster from '../assets/testimonials/posters/ricky-amaranto.jpg';
import amarantoLogo from '../assets/testimonials/logos/amaranto.png';
import yungprimeLogo from '../assets/testimonials/logos/yungprime.png';

interface TestimonialBase {
  /** Short, approved quote shown on the card */
  quote: string;
  name: string;
  /** e.g. "Founder" */
  role: string;
  /** Brand or company, when the client wants it named */
  company?: string;
  /** Which service the testimonial is about */
  service: 'Amazon Listing Optimization' | 'Social Media Management';
  /** Optional link to the related case study */
  href?: string;
  /** Brand logo shown beside the name (transparent PNG in src/assets/testimonials/logos/, trimmed to its edges) */
  logo?: { src: ImageMetadata; alt: string };
  /** Frame with no real media yet: rendered as an empty slot, excluded from structured data */
  placeholder?: boolean;
}

export interface PhotoTestimonial extends TestimonialBase {
  type: 'photo';
  image?: { src: ImageMetadata; alt: string };
}

export interface VideoTestimonial extends TestimonialBase {
  type: 'video';
  video?: {
    /** Path in /public, e.g. '/testimonials/acme.mp4' */
    src: string;
    poster: ImageMetadata;
    /** Path in /public to an English WebVTT file */
    captions?: string;
    /** ISO 8601 duration, e.g. 'PT1M24S' */
    duration: string;
    /** ISO date the video was published, e.g. '2026-11-03' */
    uploadDate: string;
  };
  /** Full transcript, shown in a disclosure below the video */
  transcript?: string;
}

export type Testimonial = PhotoTestimonial | VideoTestimonial;

/**
 * Every published video is featured on the homepage, in this order. Photos (and `placeholder` slots) go in the row below.
 * Quotes and transcripts were taken from the captions burned into each video; client approval still pending.
 */
export const testimonials: Testimonial[] = [
  {
    type: 'video',
    quote: 'My conversion has increased a lot since Share It Studio upgraded my listing on Amazon.',
    name: 'Dercilia Ventura',
    role: 'Amazon Seller & Private Label Brand Owner',
    service: 'Amazon Listing Optimization',
    logo: { src: yungprimeLogo, alt: 'YUNGPRIME' },
    video: {
      src: '/testimonials/dercilia-ventura.mp4',
      poster: derciliaPoster,
      duration: 'PT1M58S',
      uploadDate: '2026-10-27',
    },
    transcript:
      'Hi, my name is Dercilia Ventura. I am an Amazon seller and private label brand owner for almost three years now, and I’m here to share my experience with Share It Studio. From the very first time I contacted them for a quotation, they were quick to respond, professional, and they showed true interest in the success of my brand. What impressed me the most with Share It Studio is that they are more than photography or video production: they actually do market research, and they reflect all of this in the images, the A+ Content and much more. They manage to reflect the vision of my brand into the beautiful content that they create. They also chose the right models and handled the shooting of the video. As a result of that, I can see a better performance on my listing, because my conversion has increased a lot since Share It Studio upgraded my listing on Amazon. And that’s why I’m working with Share It Studio again in 2026 for my next product launch, and I am so positive that it will be a success, as much as it was on my previous product launch. So if you’re looking for a team, I know Share It Studio can do that. So contact them today, and your brand will succeed. Thank you. I hope I have helped some Amazon sellers out.',
  },
  {
    type: 'video',
    quote:
      'They didn’t just deliver beautiful videos and photos. They perfectly captured the elegant identity we wanted, and even added amazing details we didn’t think of.',
    name: 'Ricky',
    role: 'Founder',
    company: 'Amaranto',
    service: 'Amazon Listing Optimization',
    logo: { src: amarantoLogo, alt: 'Amaranto' },
    video: {
      src: '/testimonials/ricky-amaranto.mp4',
      poster: rickyPoster,
      duration: 'PT1M27S',
      uploadDate: '2026-10-27',
    },
    transcript:
      'Hi everyone, my name is Ricky and I’m the founder of Amaranto. We make premium recordable time capture cards. When we prepared our first Amazon launch, we needed the absolutely best visual assets, so we partnered with Share It Studio. Building a brand is never easy. Like any major creative project, we had a period of adjustment at the beginning: our brand has very strict requirements. But what impressed me the most was their incredible patience through the many open discussions. We combined our vision with their expert direction and advice, and the final result was absolutely stunning. They didn’t just deliver beautiful videos and photos; they perfectly captured the elegant identity we wanted, and even added amazing details we didn’t think of. I want to personally thank the core team for their hard work and dedication over the past years. If you are an ecommerce brand owner, I highly recommend Share It Studio. We will definitely continue working with them for our future projects. Thank you guys.',
  },
];
