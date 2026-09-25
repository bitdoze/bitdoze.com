# To-Do: EmDash CMS Series (Articles + YouTube)

_Plan for a Bitdoze series on [EmDash CMS](https://docs.emdashcms.com/getting-started/), the Astro-native CMS from Cloudflare. Research date: 2026-09-25 (Ubersuggest via Composio, EmDash docs, GitHub/npm, Hacker News, Reddit, existing reviews)._

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

**Series frontmatter:** every article in the core path gets `series: ["EmDash CMS", "N"]` so SeriesNav shows inside each post. Default category is `web-development`; exceptions are noted per article. Tags stay at max 3, and `emdash` is always the first one.

---

## 1. Why now (snapshot)

| Signal | Value |
|---|---|
| GitHub `emdash-cms/emdash` | 12.5k stars, 1.2k forks, 309 open issues, MIT license |
| Latest release | `emdash@0.39.1` (2026-09-23), still pre-1.0 |
| npm downloads (`emdash`) | ~115k in the last 30 days |
| Launch | 2026-04-01 ("spiritual successor to WordPress"), HN launch thread: 703 points / 504 comments |
| Production proof | Cloudflare moved its own blog to EmDash (full rollout 2026-08-12; handled 5k RPS spikes and a 28k RPS DDoS) |
| 1.0 | Cloudflare says "coming soon"; SEJ speculates Birthday Week (late September 2026). **Watch this week.** |

Timing: interest spiked at launch, the "is it production-ready?" question is still open, and 1.0 is about to land. Most existing coverage is April launch-hype or opinion pieces. Very few hands-on guides exist for Docker/VPS, plugin building, or real migrations. That gap is Bitdoze's lane: tested, copy-paste guides.

## 2. Keyword research (Ubersuggest)

> **Warning:** the bare keyword "emdash" is polluted by punctuation searches (`emdash copy paste` 22.2k, `emdash meaning` 3.6k, `how to type emdash`...). Always pair it with **CMS / Cloudflare / Astro / WordPress** in the slug, title, and H1. Write it as "EmDash CMS" in titles.

| Keyword | Volume/mo | Notes |
|---|---|---|
| emdash cloudflare | 2,400 | CPC $2.46, low difficulty |
| emdash cms | 1,900 | CPC $8.89 (high commercial value), PD 8 |
| cloudflare emdash | 1,600 | CPC $2.92 |
| wordpress alternative | 1,000 | SD 47, the broad umbrella term |
| emdash github | 880 | CPC $11.85 (partly the unrelated "Emdash" agentic IDE) |
| astro cms | 480 | SD 40 |
| emdash wordpress | 320 | |
| cloudflare emdash wordpress successor | 210 | |
| emdash plugins | 140 | |
| cloudflare cms | 140 | SD 52 |
| emdash vs wordpress | 90 | |
| emdash astro | 90 | |
| emdash cms github | 70 | |
| emdash themes | 50 | |
| cloudflare emdash cms | 50 | |
| emdash claude | 50 | |
| emdash hosting | 30 | **CPC $12.51**, PD 10: buyer intent, good for hosting links |
| emdash mcp | 30 | |
| cloudflare wordpress alternative / wordpress alternative for developers | 30 each | |

**Google autosuggest (demand not yet in volume data):** `emdash cms docker`, `emdash docker compose`, `emdash cms tutorial`, `emdash cms demo`, `emdash cms themes`, `em dash cms templates`, `emdash cms plugins`, `emdash cms forms` / `plugin forms`, `emdash exporter plugin`, `emdash plugin marketplace`, `cloudflare emdash free`, `cloudflare emdash hosting`, `em dash cms pricing`, `em dash cms ecommerce`, `emdash cms reddit`, `cloudflare emdash version 1.0 release`, `what is emdash cms`.

## 3. What people are saying (reader pain points to answer)

Each point maps to an article below. Answer these directly and honestly; that is the angle competitors miss.

1. **"You need to manage a database now."** Top r/astrojs thread (75 votes) pushes git-based CMSs instead. → #5, #13
2. **"Plugin sandboxing only works on Cloudflare = lock-in."** This was the top HN objection. In practice Node.js now has a `workerd` sandbox runner (`@emdash-cms/sandbox-workerd`). Nobody has shown this working self-hosted. → #4, #9
3. **"It's not a WordPress successor."** No WooCommerce, thin ecosystem, no PHP plugins or themes (SEJ "6 reasons", WPJohnny, HN). → #6
4. **"Migration only moves posts and pages."** Only partly true: the WXR import is basic, while the EmDash Exporter plugin also brings ACF, Yoast/Rank Math, menus, and comments. Readers want a real test. → #7
5. **"Is anyone actually using it?"** r/Wordpress thread from July 2026. Readers want real production experience, costs, and gotchas (post scheduling was buggy during Cloudflare's own migration). → #1, #14
6. **"What does it cost on Cloudflare? Can I cap spend?"** D1 round trips, the Images limit (5,000 unique transforms/month free, then a `9422` error), KV, Workers paid plan. → #3, #15
7. **"Is it vibeslop / will Cloudflare maintain it?"** Commit history and ecosystem health questions. → #1 (show the GitHub and npm numbers)
8. **Positives people liked:** TypeScript plugins as normal modules (clean CI/CD, unlike `wp-content`), MIT license, an admin that feels like WordPress, a built-in MCP server, x402 pay-per-crawl, and perfect Core Web Vitals.

---

## 4. The series (priority order)

### Tier 1: publish first (high volume, core path)

- [ ] **1. `emdash-cms-review`**: "EmDash CMS Review: Is Cloudflare's WordPress Successor Ready? (2026)"
  - _Target:_ emdash cms (1.9k), cloudflare emdash (1.6k), emdash cloudflare (2.4k), what is emdash cms, emdash cms reddit.
  - _Why:_ The hub/pillar article, and the one every other post links back to. Existing reviews are April first impressions. Bitdoze can review it after six months, with 1.0 in view.
  - _Cover:_ what it is (Astro + DB-backed admin + Live Content Collections), who it is for and not for (the docs' own "reasons to choose another approach"), architecture diagram, templates (blog, marketing, portfolio, starter, blank), plugins/sandbox, MCP, x402, deploy targets (Workers+D1+R2 vs Node+SQLite/Postgres/libSQL). Include project health (stars, releases, npm downloads, Cloudflare blog case study), a pros/cons table, and a verdict per persona (agency, Astro dev, WP refugee, blogger).
  - _Frontmatter:_ tags `emdash`, `astro`, `cloudflare`.
  - _Internal links:_ best-headless-cms-for-astro, astro-vs-wordpress, self-hosted-apps-cloudflare-workers.
  - _YouTube:_ "I Tested Cloudflare's WordPress Killer for 6 Months" (12–15 min). Admin walkthrough, editing and publishing, plugin permission prompt, MCP demo teaser. Thumbnail: "WordPress Killer?"

- [ ] **2. `emdash-cms-tutorial`**: "EmDash CMS Tutorial: Create Your First Site Step by Step"
  - _Target:_ emdash cms tutorial, emdash install, emdash cms demo.
  - _Why:_ The getting-started docs are good but short. A beginner tutorial with screenshots ranks well and feeds the video.
  - _Cover:_ Node 22.16+ check, `bun create emdash@latest` (show npm too), scaffolder choices, `/_emdash/admin` setup wizard, passkey registration, a tour of Posts/Pages/Media/Menus/Widgets, publish an edit, how `astro.config.mjs` / `src/live.config.ts` / `seed/seed.json` / `.env` (`EMDASH_ENCRYPTION_KEY`) fit together, and the first `getEmDashCollection("posts")` query. End with "next: deploy" (#3 / #4).
  - _Frontmatter:_ `series: ["EmDash CMS", "1"]`, tags `emdash`, `astro`, `bun`.
  - _YouTube:_ "EmDash CMS Tutorial for Beginners (Zero to Published in 10 Minutes)". Screen-record the whole flow in real time. Thumbnail: "EmDash in 10 Min".

- [ ] **3. `deploy-emdash-cloudflare-workers`**: "Deploy EmDash CMS to Cloudflare Workers (D1 + R2, Free Tier)"
  - _Target:_ emdash cloudflare (2.4k), cloudflare emdash free, cloudflare emdash hosting.
  - _Why:_ The highest-volume keyword, and the "default" path. Readers want real limits and costs, not just `wrangler deploy`.
  - _Cover:_ template vs existing site, the `wrangler.jsonc` bindings (`DB`, `MEDIA`, `LOADER`, cron), the Worker entry (`createScheduledHandler`, `PluginBridge`), `wrangler deploy`, custom domain route, Targeted Placement near the D1 primary, KV object cache, Workers Cache with `routeRules` (and the "logged-in editors see the cached page" gotcha), public R2 domain (never expose the `backups/` prefix), Images billing limit, Cloudflare Email Sending for magic links, secrets via `wrangler secret put`, and preview environments. Add a free vs paid Workers table.
  - _Frontmatter:_ `series: ["EmDash CMS", "2"]`, tags `emdash`, `cloudflare`, `cloudflare-workers`.
  - _Internal links:_ deploy-astrojs-cloudflare, build-astro-blog-free, astro-plausible-cloudflare-workers.
  - _YouTube:_ "Host a WordPress-Style CMS for $0 on Cloudflare". Thumbnail: "$0 CMS Hosting".

- [ ] **4. `emdash-cms-docker-self-host`**: "Self-Host EmDash CMS with Docker on a VPS (SQLite or Postgres)"
  - _Target:_ emdash cms docker, emdash docker compose, emdash hosting ($12.51 CPC).
  - _Why:_ It answers the lock-in objection directly, and nobody has a solid guide. This is Bitdoze's self-hosting strength.
  - _Cover:_ Node adapter config, the official Dockerfile plus a compose file with a named volume, `node --env-file` vs host env, SQLite WAL (no NFS/SMB), a Postgres variant (role/ownership requirements), S3/R2/Bunny media (`s3()` env vars), the **`workerd` sandbox runner on Node** (prove sandboxed plugins work off-Cloudflare), the scheduler needs an always-on process, health check, `emdash migrate --check`, and Traefik/Dokploy/Coolify deploy variants. Show a VPS sizing note.
  - _Frontmatter:_ `series: ["EmDash CMS", "3"]`, `categories: ["self-hosting"]`, tags `emdash`, `docker`, `astro`.
  - _Internal links:_ dokploy-install, dokploy-docker-compose-app, coolify-install-heroku-alternative, traefik-proxy-docker, deploy-astro-easypanel, bunny-storage-vs-s3-vs-backblaze, digitalocean-vs-vultr-vs-hetzner (hosting affiliate angle).
  - _YouTube:_ "No Cloudflare Needed: Self-Host EmDash with Docker". Thumbnail: "EmDash on Docker".

- [ ] **5. `emdash-vs-wordpress`**: "EmDash vs WordPress: Honest Comparison for 2026"
  - _Target:_ emdash vs wordpress, emdash wordpress (320), cloudflare emdash wordpress successor (210), wordpress alternative (1k), cloudflare wordpress alternative.
  - _Why:_ The comparison everyone searches for. Most existing posts are either hype or WordPress-camp dismissals. Bitdoze runs both (WP content plus an Astro migration story), so it can be fair.
  - _Cover:_ table covering stack, hosting model, cost at 10k/100k/1M visits, security model (sandboxed capabilities vs full-access PHP plugins), ecosystem size, e-commerce (none vs WooCommerce), editor UX, migration, licensing (MIT vs GPL), AI/MCP, and performance/CWV. End with "who should switch / who should stay" and the Matt Mullenweg response for context.
  - _Frontmatter:_ tags `emdash`, `wordpress`, `astro`.
  - _Internal links:_ astro-vs-wordpress, install-wordpress-docker, speed-up-wordpress-with-cloudflare-varnish-and-redis.
  - _YouTube:_ "EmDash vs WordPress: Should You Switch?" (split-screen admin comparison). Thumbnail: "EmDash vs WP".

### Tier 2: deeper guides (unique, lower competition)

- [ ] **6. `migrate-wordpress-to-emdash`**: "Migrate WordPress to EmDash CMS (Posts, Media, SEO, Redirects)"
  - _Target:_ migrate wordpress to emdash, emdash exporter plugin, emdash wordpress.
  - _Why:_ The "only posts and pages" claim is common and partly wrong. Test it on a real WP site (use the Docker WP from install-wordpress-docker with ACF + Yoast + Gutenberg + shortcodes).
  - _Cover:_ WXR vs EmDash Exporter comparison table, the application-password flow, collection/field mapping, authors → bylines, taxonomies, the media step (SHA-1 dedupe), what breaks (shortcodes, page builders, WooCommerce, scheduled posts become drafts), a redirects plan, the pre-cutover verification checklist, and porting the theme with `getEmDashEntry` + `PortableText`.
  - _Frontmatter:_ `series: ["EmDash CMS", "4"]`, tags `emdash`, `wordpress`, `migration`.
  - _Internal links:_ wordpress-to-astro-migration, es/migracion-wordpress-a-astro, export-wordpress-post-urls-titles.
  - _YouTube:_ "I Migrated a WordPress Site to EmDash: What Broke". Thumbnail: "WP → EmDash".

- [ ] **7. `add-emdash-existing-astro-site`**: "Add EmDash CMS to an Existing Astro Site"
  - _Target:_ emdash astro (90), astro emdash cms, emdash cms astro, astro cms (480).
  - _Why:_ Bitdoze's Astro audience already has sites. The key decision is SSR vs prerender and what happens to MDX content.
  - _Cover:_ install the integration, `output: "server"` vs hybrid prerender (pages stay static until rebuild), Live Content Collections vs the existing file collections side by side, `getEmDashCollection` filters/pagination/drafts/`cacheHint`, `emdash-env.d.ts` types, and when **not** to (file-based MDX blogs like Bitdoze itself).
  - _Frontmatter:_ `series: ["EmDash CMS", "5"]`, tags `emdash`, `astro`, `typescript`.
  - _Internal links:_ astro-7-faster-builds, astro-ssg-build-optimization, astro-db-bunny-database.
  - _YouTube:_ Short-to-mid (8 min): "Give Your Astro Site a WordPress-Like Admin".

- [ ] **8. `emdash-content-model-collections`**: "EmDash Content Modeling: Collections, Fields, Taxonomies and Menus"
  - _Target:_ long tail (emdash collections, field types, emdash menus, widgets).
  - _Why:_ Moves readers from "blog" to "real site". Build something concrete, like a **tools directory** or **product reviews** collection with custom fields, taxonomy, and a menu.
  - _Cover:_ collections vs content model, field types, adding fields to a live site (existing entries get no value), taxonomies, menus, widget areas, sections/blocks, page layouts, site settings, exporting the model as a seed file, `emdash types`, and schema evolution on a deployed site.
  - _Frontmatter:_ `series: ["EmDash CMS", "6"]`, tags `emdash`, `astro`, `cms`.
  - _YouTube:_ "Build a Custom Directory Site with EmDash".

- [ ] **9. `emdash-cms-plugins`**: "EmDash Plugins: How They Work + Best Plugins to Install"
  - _Target:_ emdash plugins (140), cloudflare emdash plugins, emdash plugin marketplace, emdash cms plugin forms.
  - _Why:_ Plugin security is EmDash's headline feature and the second most searched sub-topic.
  - _Cover:_ sandboxed vs native (trust boundary table), the capability/permission prompt, installing from the registry vs `astro.config.mjs`, sandbox runners on Workers vs Node (`workerd`), upgrading plugins, and a curated list from emdashcms.org (forms/email, audit log, bulk upload, visitor stats, AI Search, Cloudflare Email) with the audit verdict shown on each. Explain what "AI-reviewed / Warning" audit badges mean.
  - _Frontmatter:_ `series: ["EmDash CMS", "7"]`, tags `emdash`, `plugins`, `cloudflare-workers` (keep `security` out; it is a retired label).
  - _YouTube:_ "EmDash Plugins Can't Hack Your Site: Here's Why".

- [ ] **10. `build-emdash-plugin`**: "Build Your First EmDash Plugin in TypeScript"
  - _Target:_ emdash plugin development, emdash plugin (long tail); developer audience.
  - _Why:_ Almost no third-party tutorials exist. The best candidate for backlinks and GitHub traffic.
  - _Cover:_ choose a format, `emdash-plugin` CLI, manifest + capabilities, hooks (e.g. auto-generate excerpt or ping IndexNow on publish), storage + settings (secret settings use `EMDASH_ENCRYPTION_KEY`), API routes, Block Kit admin UI, local test, bundling/publishing to emdashcms.org, and automated releases. Publish the plugin on GitHub as a companion repo.
  - _Frontmatter:_ `series: ["EmDash CMS", "8"]`, tags `emdash`, `typescript`, `plugins`.
  - _YouTube:_ "Coding an EmDash Plugin from Scratch" (live-coding, 15–20 min).

- [ ] **11. `emdash-mcp-ai-content`**: "Manage Your EmDash Site with AI: MCP Server + Claude, Codex, ChatGPT"
  - _Target:_ emdash mcp, emdash claude, emdash ai (noisy but 8.1k).
  - _Why:_ Bitdoze's AI audience is large, and the built-in MCP server is a real differentiator.
  - _Cover:_ `/_emdash/api/mcp`, OAuth vs personal access tokens, connecting Claude custom connectors / `codex mcp add` / ChatGPT developer mode / Droid, trimming scopes on the consent page, role limits (Admin/Editor/Author/Contributor), and real prompts (draft post, alt-text all images, rebuild menu, compare draft vs live, add a field). Safety workflow: contributor-role token, drafts only, human publishes. Also cover the Docs MCP for coding agents.
  - _Frontmatter:_ `series: ["EmDash CMS", "9"]`, `categories: ["ai"]`, tags `emdash`, `mcp`, `claude`.
  - _Internal links:_ mcp-introduction-beginners, opencode-setup-guide, hermes-agent-setup-guide.
  - _YouTube:_ "My AI Agent Runs My CMS Now" (shows the agent writing and publishing a draft). Thumbnail: "AI Runs My CMS".

- [ ] **12. `emdash-themes-templates`**: "EmDash Themes and Templates: Use, Customize and Create Your Own"
  - _Target:_ emdash themes (50), em dash cms templates, emdash cms themes, emdash website builder.
  - _Cover:_ the official templates (blog / marketing / portfolio / starter / blank, plus Cloudflare variants), marketplace themes (e.g. Masthead), seed file format, building a Tailwind v4 theme, dark mode guide, and porting a WP theme (route/component mapping). EmDash is not a page builder; set that expectation up front.
  - _Frontmatter:_ `series: ["EmDash CMS", "10"]`, tags `emdash`, `astro`, `tailwind`.
  - _YouTube:_ "Every EmDash Template Compared + Make Your Own".

### Tier 3: comparison, ops, and timely

- [ ] **13. `emdash-vs-astro-cms-alternatives`**: "EmDash vs Keystatic vs TinaCMS vs Sveltia vs Payload: Best CMS for Astro?"
  - _Target:_ astro cms (480), best astro cms, headless cms astro.
  - _Why:_ Answers the "DB vs git-based" debate from r/astrojs. **Also update `best-headless-cms-for-astro`** with an EmDash section linking here.
  - _Cover:_ decision table (where content lives, who edits, hosting, cost, SSR requirement, plugins, i18n, AI/MCP), with a pick for each scenario.
  - _Frontmatter:_ tags `emdash`, `astro`, `headless-cms`.
  - _YouTube:_ "Best CMS for Astro in 2026 (I Tried 5)".

- [ ] **14. `emdash-production-checklist`**: "Running EmDash in Production: Backups, Updates, Secrets and Caching"
  - _Why:_ The "is it production-ready?" question, answered with ops detail. Great for returning readers.
  - _Cover:_ backups (SQLite backup command vs file copy, D1 time travel, automatic JSON backups in `backups/`), `EMDASH_ENCRYPTION_KEY` recovery + rotation, core migrations (`auto`/`check`/`manual`, CI), updating EmDash, schema evolution, object cache, auth hardening (passkeys, Cloudflare Access with role mapping, email setup for magic links), and site transfer. Include a printable checklist.
  - _Frontmatter:_ `series: ["EmDash CMS", "11"]`, tags `emdash`, `backups`, `cloudflare`.
  - _Internal links:_ dokploy-backups-cloudflare-r2, zerobyte-restic-gui, pluton-self-hosted-backup.

- [ ] **15. `emdash-hosting-cost`**: "How Much Does EmDash Cost to Host? Cloudflare vs VPS vs Managed"
  - _Target:_ emdash hosting ($12.51 CPC), em dash cms pricing, cloudflare emdash free.
  - _Why:_ High commercial intent and a natural spot for hosting affiliate links (Hetzner/DigitalOcean/Vultr, Railway/managed EmDash hosts).
  - _Cover:_ Workers Free vs Paid, D1/R2/KV/Images line items at three traffic levels, a $5 VPS with Docker, Postgres options, managed hosts (Railway template, dashem.io; verify current offers before publishing), and the hidden cost of ops time.
  - _Frontmatter:_ `categories: ["hosting"]`, tags `emdash`, `cloudflare`, `hetzner` (avoid `vps`; it is a retired label).
  - _YouTube:_ Fold into #3/#4 videos, or a short "EmDash hosting cost breakdown".

- [ ] **16. `emdash-1-0-whats-new`**: "EmDash 1.0 Is Here: What Changed and Should You Upgrade?" (**time-sensitive**)
  - _Target:_ cloudflare emdash version 1.0 release, emdash 1.0.
  - _Why:_ 1.0 is expected around Cloudflare Birthday Week (late September 2026). Publishing within 24–48 hours of release catches the news spike, then links into #1–#4.
  - _Cover:_ changelog highlights, breaking changes, the upgrade path from 0.x (`deployment/updating`), whether post scheduling is fixed, and an updated production-readiness verdict.
  - _Frontmatter:_ tags `emdash`, `cloudflare`, `astro`. Also mention it in that day's news digest.
  - _YouTube:_ Quick 5–6 min reaction/upgrade video, plus a Short.

## 5. Backlog (nice-to-have)

- [ ] **`emdash-x402-pay-per-crawl`**: charge AI agents per article with x402 (novel; low volume, strong differentiator and HN bait). Category `ai`.
- [ ] **`emdash-i18n-multilingual`**: multilingual EmDash site (EN + ES like Bitdoze); links astro-i18n-localization.
- [ ] **`emdash-contact-forms`**: forms plugin + email notifications (autosuggest: "emdash cms forms"); links add-contact-form-astro.
- [ ] **`emdash-cloudflare-access-sso`**: replace passkeys with Cloudflare Access / Google login for editor teams.
- [ ] **`emdash-ai-search`**: Cloudflare AI Search plugin for semantic on-site search.
- [ ] **`emdash-agency-client-sites`**: agency workflow (roles, preview deployments, handoff); emdash agency has 110/mo.
- [ ] **`emdash-bunny-cdn-storage`**: S3-compatible media on Bunny Storage + CDN for Node deployments; links bunny-storage-vs-s3-vs-backblaze.
- [ ] **Spanish versions** of #1, #2, #5 (ES audience is heavily WordPress; check ES keyword volumes first).

## 6. Existing articles to update (internal linking)

- [ ] `best-headless-cms-for-astro`: add an EmDash section and link #13 / #1.
- [ ] `astro-vs-wordpress`: add "Where EmDash fits" paragraph → #5.
- [ ] `self-hosted-apps-cloudflare-workers`: add EmDash to the list → #3.
- [ ] `wordpress-to-astro-migration`: add a "Want to keep a WordPress-style admin? Try EmDash" callout → #6.
- [ ] `mcp-introduction-beginners`: add EmDash as a real-world MCP server example → #11.

## 7. YouTube plan

**Playlist:** "EmDash CMS: From Zero to Production". Order: #1 review → #2 tutorial → #3 Cloudflare → #4 Docker → #5 vs WordPress → #6 migration → #7 existing Astro → #9 plugins → #10 build plugin → #11 MCP → #12 themes → #14 production.

**Workflow per video:**
- Record the article's steps once, as the test run. The video footage doubles as verification for the "tested" promise, and screenshots come from the same session.
- Embed each video in its article with `<YouTubeEmbed url="..." label="..." />` near the top (after the intro), and link the article in the video description.
- Keep one demo project across the series (e.g. `emdash-demo.bitdoze.com`) so episodes build on each other: create → deploy → migrate → plugins → MCP.
- Thumbnails: max 3–4 words, with an EmDash admin screenshot plus the Cloudflare/WordPress logo for contrast.

**Shorts / clips (30–60s):**
- "Plugins asking for permissions like phone apps" (capability prompt).
- "Claude just published my blog post" (MCP).
- "WordPress admin... but it's TypeScript" (side-by-side).
- "Deploying a CMS for $0" (wrangler deploy in fast-forward).
- "EmDash 1.0 in 60 seconds" (on release day).

## 8. Suggested publishing cadence

| Week | Articles | Video |
|---|---|---|
| 1 | #16 (only if 1.0 has shipped) + #1 review | Review |
| 2 | #2 tutorial + #3 Cloudflare | Tutorial, Cloudflare deploy |
| 3 | #4 Docker + #5 vs WordPress | Docker, vs WP |
| 4 | #6 migration + #7 existing Astro | Migration |
| 5 | #9 plugins + #11 MCP | Plugins, MCP |
| 6 | #10 build plugin + #12 themes | Build plugin |
| 7 | #13 Astro CMS comparison + #14 production + #15 cost | Comparison |

## 9. Sources used for research

- Docs: [Getting started](https://docs.emdashcms.com/getting-started/), [Why EmDash](https://docs.emdashcms.com/why-emdash/), [Deploy to Cloudflare](https://docs.emdashcms.com/deployment/cloudflare/), [Deploy to Node.js](https://docs.emdashcms.com/deployment/nodejs/), [Databases](https://docs.emdashcms.com/deployment/database/), [Migrate from WordPress](https://docs.emdashcms.com/migration/from-wordpress/), [AI tools / MCP](https://docs.emdashcms.com/guides/ai-tools/), [Plugins](https://docs.emdashcms.com/plugins/overview/), [full index](https://docs.emdashcms.com/llms.txt)
- Launch: [Cloudflare blog announcement](https://blog.cloudflare.com/emdash-wordpress/), [HN launch thread](https://news.ycombinator.com/item?id=47602832), [Matt Mullenweg: EmDash Feedback](https://ma.tt/2026/04/emdash-feedback/)
- Status: [SEJ: 1.0 releasing soon](https://www.searchenginejournal.com/cloudflare-says-emdash-version-1-0-is-releasing-soon/586951/), [GitHub repo](https://github.com/emdash-cms/emdash), [templates](https://github.com/emdash-cms/templates), [emdashcms.org marketplace](https://emdashcms.org/)
- Opinions: [WPJohnny review](https://wpjohnny.com/emdash-cms-review-cloudflare-vs-wordpress/), [SEJ: 6 reasons it can't compete](https://www.searchenginejournal.com/6-reasons-why-cloudflares-emdash-cant-compete-with-wordpress/), [Ben Ryan review](https://benryan.com.au/blog/cloudflare-emdash-wordpress-alternative), [Joost de Valk](https://joost.blog/emdash-cms/), [r/astrojs: "you need to manage a database"](https://www.reddit.com/r/astrojs/comments/1sbkql5/cloudflares_emdash_cms_is_exciting_but_have_you/), [r/Wordpress: is anyone using it?](https://www.reddit.com/r/Wordpress/comments/1uo9k6b/cloudflare_emdash_cms/), [r/EmDashCMS](https://www.reddit.com/r/EmDashCMS/)
