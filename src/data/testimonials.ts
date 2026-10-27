/**
 * Client testimonials for the homepage (section 04). Videos and photos share one list.
 *
 * Adding a real testimonial:
 * - Photo: put the image in src/assets/testimonials/ and import it here (Astro optimizes it).
 * - Video: put the .mp4 (H.264, ideally under ~15 MB) and optional .vtt captions in public/testimonials/,
 *   and import a poster frame from src/assets/testimonials/. Fill in `transcript`: it is shown on the page
 *   and is what search engines can actually read from the video.
 * - Remove `placeholder: true`. Placeholders render as empty frames and never reach the JSON-LD.
 *
 * Only publish quotes the client has approved, with their name and role exactly as they agreed.
 */
import type { ImageMetadata } from 'astro';

interface TestimonialBase {
  /** Short, approved quote shown on the card */
  quote: string;
  name: string;
  /** e.g. "Founder" */
  role: string;
  company: string;
  /** Which service the testimonial is about */
  service: 'Amazon Listing Optimization' | 'Social Media Management';
  /** Optional link to the related case study */
  href?: string;
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

/** The first entry is featured large; put the strongest testimonial there. */
export const testimonials: Testimonial[] = [
  {
    type: 'video',
    placeholder: true,
    quote: 'Client quote goes here.',
    name: 'Client name',
    role: 'Role',
    company: 'Brand',
    service: 'Amazon Listing Optimization',
  },
  {
    type: 'video',
    placeholder: true,
    quote: 'Client quote goes here.',
    name: 'Client name',
    role: 'Role',
    company: 'Brand',
    service: 'Social Media Management',
  },
  {
    type: 'photo',
    placeholder: true,
    quote: 'Client quote goes here.',
    name: 'Client name',
    role: 'Role',
    company: 'Brand',
    service: 'Amazon Listing Optimization',
  },
  {
    type: 'photo',
    placeholder: true,
    quote: 'Client quote goes here.',
    name: 'Client name',
    role: 'Role',
    company: 'Brand',
    service: 'Social Media Management',
  },
  {
    type: 'video',
    placeholder: true,
    quote: 'Client quote goes here.',
    name: 'Client name',
    role: 'Role',
    company: 'Brand',
    service: 'Amazon Listing Optimization',
  },
];
