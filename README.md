# Share It Studio — website

Marketing site for Share It Studio: two service lines (Amazon Listing Optimization and Social Media Management),
case studies, blog and an AI assistant that answers from the site's own content.

Built with [Astro](https://astro.build), Tailwind CSS 4 and the Vercel adapter. Pages are pre-rendered, except the
assistant endpoint (`/api/ask`), which runs on the server.

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies (Node 22.12 or newer) |
| `npm run dev`     | Start the dev server at `localhost:4321`   |
| `npm run build`   | Build the production site                  |
| `npm run preview` | Preview the build locally                  |
| `npm run format`  | Format the code with Prettier              |

## Environment variables

Create a `.env` file in the project root (it is git-ignored):

| Variable            | Purpose                                                                                     |
| :------------------ | :------------------------------------------------------------------------------------------ |
| `ANTHROPIC_API_KEY` | Key for the AI assistant. Without it the assistant answers from the local FAQs.             |
| `MOCK_AI`           | Set to `true` to answer from the local FAQs even when a key is set (no API calls, no cost). |

## Project structure

```text
public/                  Files served as they are (favicon, robots.txt, testimonial videos)
src/
├── assets/              Images processed by Astro (brand, case studies, samples, testimonials)
├── components/
│   ├── forms/           Brand Diagnosis quiz
│   ├── layout/          Header and Footer
│   ├── packages/        Social media plan cards/comparison and the Amazon package builder
│   └── ui/              Reusable blocks (hero, CTA banner, FAQ list, marquees, testimonials…)
├── config/site.ts       Site identity (name, contact, booking page): one source of truth
├── data/                Content as typed data: services, FAQs, case studies, packages, blog posts…
├── layouts/             Layout (head, header, footer) and ArticleLayout (blog posts)
├── lib/                 schema.ts (JSON-LD builders) and selector.ts
├── pages/               One file per route; pages/api/ask.ts is the assistant endpoint
├── scripts/             Client-side behaviour (motion, home, selector, package builder, brand diagnosis)
└── styles/              global.css plus one stylesheet per feature
astro.config.mjs         Site URL, fonts, sitemap, Vercel adapter and 301 redirects from old URLs
```

## Conventions

- **Content lives in `src/data`**, pages only lay it out. The AI assistant reads the same files
  (`data/companyKnowledge.ts`), so a copy change updates the site and the assistant together.
- **SEO and AEO**: every page goes through `Layout.astro` (title, description, canonical, Open Graph) and adds
  JSON-LD from `lib/schema.ts`. FAQ answers are real text in the page, and `faqSchema()` mirrors only what is visible.
- **Base path**: the site is served under `shareitstudio.com/v2/` (`base` in `astro.config.mjs`; locally
  `http://localhost:4321/v2/`). Write internal paths without the base (`/services`) and render them with
  `withBase()` from `lib/url.ts`; use `absoluteUrl()` for canonical and JSON-LD URLs. Page URLs end in a slash.
- **Booking**: all booking buttons use `BOOKING_PAGE` from `config/site.ts`. Set `SITE.bookingUrl` once the Calendly
  event is approved.
- **Pending content** is marked with `TODO` comments (client permissions, approved images, legal text).
  Search for `TODO` to list what is left before launch.
- Moved or renamed URLs get a 301 entry in `astro.config.mjs`.
