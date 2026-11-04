# Share It Studio — website

Marketing site for Share It Studio: two service lines (Amazon Listing Optimization and Social Media Management),
case studies, blog and an AI assistant that answers from the site's own content.

Built with [Astro](https://astro.build) and Tailwind CSS 4 as a fully static site, hosted on HostArmada
(Apache/LiteSpeed shared hosting) under `shareitstudio.com/v2/` while it is developed. The AI assistant is a small
PHP file (`api/ask.php`) generated on every build, because the host runs PHP but no Node server.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies (Node 22.12 or newer)   |
| `npm run dev`     | Start the dev server at `localhost:4321/v2/` |
| `npm run build`   | Build the production site into `dist/`       |
| `npm run preview` | Preview the build locally                    |
| `npm run format`  | Format the code with Prettier                |

## Environment variables (development)

Create a `.env` file in the project root (it is git-ignored). It is only read by `npm run dev`:

| Variable            | Purpose                                                                                     |
| :------------------ | :------------------------------------------------------------------------------------------ |
| `ANTHROPIC_API_KEY` | Key for the AI assistant. Without it the assistant answers from the local FAQs.             |
| `MOCK_AI`           | Set to `true` to answer from the local FAQs even when a key is set (no API calls, no cost). |

## Deploy to HostArmada

A push to `main` deploys the site to `shareitstudio.com/v2/`, which is password protected. The pipeline must:

1. Build with Node 22.12+: `npm ci` then `npm run build`.
2. Upload the **contents** of `dist/` to `public_html/v2/`, **including hidden files**: `.htaccess` and
   `_astro/.htaccess` (301 redirects, password protection, caching, compression, headers). Both are written by
   `integrations/hostarmada.mjs`; change them there, never on the server, because every deploy replaces them.
3. Set `HTACCESS_AUTH_USERFILE` (GitHub secret or variable) to the password file of the `/v2/` protection, i.e. the
   `AuthUserFile` path that cPanel "Directory Privacy" wrote, e.g. `/home/<user>/.htpasswds/public_html/v2/passwd`.
   The build copies it into `.htaccess`, so a deploy never removes the protection. In CI the build **fails** without
   it; set it to `none` when the site goes public.

AI assistant key: create `sis-assistant-config.php` in the account's home folder (one level **above**
`public_html`, so it can never be downloaded). It is never part of the repository or the deploy:

```php
<?php return ['ANTHROPIC_API_KEY' => 'sk-ant-…', 'MOCK_AI' => 'false'];
```

Without it, `api/ask.php` answers from the published FAQs (test mode). It needs PHP 7.3+ with curl and mbstring,
which HostArmada includes.

While the site lives under `/v2/`, every response carries `X-Robots-Tag: noindex`. To move it to the domain root,
change `base` in `astro.config.mjs` to `'/'` and rebuild: links, redirects and `.htaccess` rules follow it, and the
noindex header goes away.

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
├── lib/                 url.ts (base path), schema.ts (JSON-LD), assistant.ts (AI assistant), selector.ts
├── pages/               One file per route; pages/api/ask.php.ts generates the assistant's PHP file
├── scripts/             Client-side behaviour (motion, home, selector, package builder, brand diagnosis)
└── styles/              global.css plus one stylesheet per feature
astro.config.mjs         Site URL and base path, fonts, sitemap, 301 redirect map
integrations/            hostarmada.mjs (.htaccess for the host), assistant-dev-server.mjs (AI assistant in npm run dev)
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
