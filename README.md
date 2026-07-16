# Bitdoze.com

Practical DevOps, programming, and self-hosting guides — built with [Astro](https://astro.build) 7, Tailwind CSS v4, and MDX.

**Live site:** [https://www.bitdoze.com](https://www.bitdoze.com)

## Stack

- **Astro 7** (SSG) + **MDX** content collections
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Pagefind** client-side search
- **i18n:** English (default) + Spanish (`/es/`)
- Deployed on **Cloudflare Pages** (`functions/_middleware.js` for markdown negotiation)

## Commands

Requires Node.js 22+.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # production build + Pagefind index
npm run build:ci     # build with larger Node heap
npm run preview      # preview dist/
npm run check        # astro check (types)
npm run lint         # eslint
npm run format       # prettier
```

## Project layout

```
src/
  content/posts/     # MDX articles (es/ for Spanish)
  content/authors/   # Author profiles
  components/        # UI + widgets
  layouts/           # Layout.astro, PostLayout.astro
  config/            # site.ts, menu.json, social.json, config.json
  pages/             # Routes (mirror under es/ for Spanish UI)
  i18n/ui.ts         # Shared UI strings
public/              # Static assets, robots.txt, _headers
functions/           # Cloudflare Pages middleware
```

## Authoring a post

1. Add MDX under `src/content/posts/` (or `posts/es/` for Spanish).
2. Required frontmatter: `title`, `description`, `date`, `image`, `authors`, `categories`, `tags` (max 3).
3. Optional: `lastmod`, `series: [name, position]`, `translationKey`, `locale`, `draft`, `imageAlt`.
4. Cover images: prefer SVG under `src/assets/images/` (16:9).
5. Import widgets from `@components/widgets/` when needed (Notice, Tabs, YouTubeEmbed, etc.).

## Config

App code should import from `@config/site` (`siteConfig`).  
`config.json` holds pagination, view transitions, contact, and metadata used by `site.ts`.

## SEO / agents

- Custom sitemaps: `/sitemap-en.xml`, `/sitemap-es.xml`, `/video-sitemap.xml`
- RSS: `/rss.xml`, `/es/rss.xml`
- Dynamic OG images: `/og/[slug].png`
- Agent discovery: `/llms.txt`, markdown alternates `/md/*`, Accept negotiation on Cloudflare

## License

Content and site © Bitdoze. All rights reserved.
