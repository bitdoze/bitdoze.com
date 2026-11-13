# Bitdoze.com

Practical DevOps, programming, and self-hosting guides — built with [Astro](https://astro.build) 7, Tailwind CSS v4, and MDX.

**Live site:** [https://www.bitdoze.com](https://www.bitdoze.com)

## Stack

- **Astro 7** (SSG) + **MDX** content collections
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Pagefind** client-side search
- **i18n:** English (default) + Spanish (`/es/`)
- Deployed on **Cloudflare Pages** (`public/_headers`, `public/_redirects`, `src/middleware.ts` dev parity)

## Commands

Requires Node.js 22+.

```bash
bun install
bun run dev          # http://localhost:4321
bun run build        # production build + Pagefind index
bun run build:ci     # build with larger Node heap
bun run preview      # preview dist/
bun run check        # astro check (types)
bun run lint         # eslint
bun run format       # prettier
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
public/              # Static assets, robots.txt, _headers, _redirects
scripts/             # Redirect sync, affiliate/news/canonical validators, translation index
```

## Authoring a post

1. Add MDX under `src/content/posts/` (or `posts/es/` for Spanish).
2. Required frontmatter: `title`, `description`, `date`, `image`, `authors`, `categories`, `tags` (max 3).
3. Optional: `lastmod`, `series: [name, position]`, `translationKey`, `locale`, `draft`, `imageAlt`, `quickAnswer`, `testedOn`, `timeToComplete`.
4. Cover images: author a simple 16:9 SVG under `src/assets/images/`, then convert to `.webp` via `node scripts/svg-to-webp.mjs` and reference the `.webp` in `image:`.
5. Import widgets from `@components/widgets/` when needed (Notice, Tabs, YouTubeEmbed, etc.).

## Config

App code should import from `@config/site` (`siteConfig`).  
`config.json` holds pagination, contact, and site metadata used by `site.ts`.

## SEO / agents

- Custom sitemaps: `/sitemap-en.xml`, `/sitemap-es.xml`, `/video-sitemap.xml`
- RSS: `/rss.xml`, `/es/rss.xml`, `/news/rss.xml`
- Fallback OG image: `/og-default.png` (Satori renderer in `src/utils/og-image.ts`)
- Agent discovery: `/llms.txt`, markdown alternates `/md/*`, RFC 9727 `/api-catalog`

## License

Content and site © Bitdoze. All rights reserved.
