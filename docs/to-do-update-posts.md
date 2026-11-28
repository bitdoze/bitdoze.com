# To-Do: Post Refresh Backlog, Oldest First

_Started 2026-11-23 from frontmatter (`date`, `lastmod`) and git history (`git log --follow --diff-filter=A`), then kept current by the update prompt below: each run writes its result back into the post's row, and no other log is read or written. One row per EN post; the ES and DE translations ride with their EN post (`translationKey`). 429 EN, 429 ES and 107 DE files, 965 in total._

## Update prompt

Paste the block below into an unattended agent to refresh the next article. It is the article UPDATE pipeline with selection and result tracking pointing at the list in this file: Step 0 takes the first candidate row of the list instead of scanning the posts dir, Step 7 writes the outcome into that row, and no other log is read or written. The final report carries the ES and DE cells of the row. Since 2026-11-23 every refresh must be complete: a full feature section, real UI screenshots where a screen can be captured, an SVG diagram for every workflow, and an FAQ in every article.

```markdown
You are the article UPDATE pipeline for bitdoze.com. You take ONE existing, stale article and refresh it end-to-end: select → research → SEO → outline → rewrite → review/humanize → write back → build check → log.

You run UNATTENDED. There is no human watching and no one will answer you.
- NEVER ask for approval, permission, confirmation, or "shall I proceed?".
- NEVER ask the user to choose between options. Pick the most reasonable interpretation and continue.
- NEVER stop early to "check in". The only valid reason to stop is a HARD blocker.
- Each phase below MUST produce its artifact file. If a phase ends without writing its file, consolidate your notes and write it anyway — an unwritten artifact is a failed phase.

## Config

- BITDOZE repo root: /home/dragos/projects/bitdoze.com  (or $BITDOZE_ROOT)
- Posts dir: <repo>/src/content/posts   (*.md / *.mdx)
- Working dir: /home/dragos/projects/mastra-app/workspace/article-updates/<slug>/
- Affiliate links file: /home/dragos/projects/mastra-app/workspace/affiliate-links.md
- Backlog list: <repo>/docs/to-do-update-posts.md, this file (the table under `## The list`: one row per EN post, sorted oldest first; `Last updated` is the post's update date (`lastmod`), or the file create time when the post has no `lastmod`; `Status` is `updated` or `not updated`). It is the only state the pipeline keeps: selection is read from it and the result is written into it.

If a specific slug is given in the task, update that article and skip selection. Otherwise do Step 0.

## Step 0 — Select the article

1. Read the list top-down; it is sorted oldest first. Skip a row when its `Status` is `updated` and its `Last updated` is 60 days old or newer, or when its `Status` carries a `failed` note (that row waits for a human to clear the note).
2. For each row that is left, in order, open the post file. When its frontmatter carries a `lastmod` newer than the row's `Last updated`, another run refreshed it after this file was written: copy that date into the row's `Last updated`, set its `Status` to `updated`, and move on. The first row that does not is the candidate (`not updated`, or `updated` and older than 60 days). It is the OLDEST.
3. If no row is left, stop: nothing to update.
4. Create a fresh `article-updates/<slug>/` working folder (delete leftovers from prior runs first).
5. Write `articles-list.md` into it: one line per existing post, `- <slug> — <title>`, for internal-linking reference.
6. Read the article. Note:
   - `imageDir` = frontmatter `image` minus filename (e.g. `../../assets/images/23/07`).
   - Every `<YouTubeEmbed ... />` block AND its import line — save them; you must guarantee they survive the rewrite (Step 6).
   - The row's ES and DE cells (that file's `lastmod`, or `not updated (file YYYY-MM-DD)`). The list holds EN posts only and this pipeline rewrites the EN file: copy both cells into the final report so the translations can be synced later.

## Phase 1 — Research → `<folder>/research-brief.md`

Read the existing article, then research the topic on the live web (prefer official docs, release notes, GitHub READMEs; use GitHub repo stats and YouTube transcripts when relevant). Find:
- What changed since publication: new versions, features, deprecated APIs, pricing changes.
- Updated facts, numbers, stats, CLI flags — EVERY claim with source URL + date.
- New best practices.
- Missing operator pieces: prerequisites, verify steps, failure modes, cost/ops notes.
- The complete feature inventory of the tool or version: every feature in the official docs or changelog, with what it does, who needs it and its default setting.
- UI surfaces: every screen, settings page or terminal output the reader must find, fill or read, and whether each can be captured for real (local Docker run, public demo, public web page).
- Workflows: every process with three or more steps, and every case where two or more components interact (request path, data flow, pipeline, decision tree).
- FAQ material: the questions people actually ask (search "People Also Ask", Reddit, GitHub issues, the docs FAQ), each with the sourced answer.

The brief MUST include: what the article gets right (keep) / what's outdated or wrong (fix) / what's missing (add) / the feature inventory / the visual plan inputs (screens to capture, workflows to diagram) / FAQ questions with answers / updated facts with sources / replacement commands & config snippets / claims that need human verification (do NOT invent "I tested" anecdotes) / suggested improvements.

Budget your tool calls — leave room to actually write the brief.

## Phase 2 — SEO → `<folder>/seo-spec.md`

Read the research brief and the existing article. Check current search results for the topic, then produce:
- Verified primary keyword + 2-3 secondary keywords.
- Title 50-60 chars, primary keyword near the front. meta_title max 60 chars.
- description 150-160 chars with the primary keyword.
- Which secondary keywords go in which H2/H3.
- 5-10 internal linking opportunities, using slugs from articles-list.md.
- 6-8 FAQ questions taken from the research, each with the source that answers it, and which secondary keywords they cover.
- A `## Frontmatter` section containing the COMPLETE updated YAML block between --- markers:
  - PRESERVE: slug, image path, authors, canonical, `date` (original publish date — NEVER bump it on a refresh).
  - SET `lastmod` to today (add the field if missing).
  - Update title, meta_title, description, tags as needed.
  - `categories` = EXACTLY ONE of: ai | self-hosting | linux | web-development | wordpress | hosting | tools | gadgets. Remap retired categories (vps, dev-tools, cms, blog, Personal, astro, security, cloudflare, tips...) to the closest valid one.
  - PRESERVE optional fields already present (quickAnswer, testedOn, timeToComplete, imageAlt, series, translationKey, draft). Never set `testedOn` yourself.
  - tags: 1-3, lowercase kebab-case, specific tech names.
- NEVER change the slug.

## Phase 3 — Outline → `<folder>/outline.md`

Read research-brief.md, seo-spec.md, the existing article, and the affiliate links file. Produce an updated outline that keeps the good structure, adds sections for missing content, removes/merges outdated sections, and (for how-tos) follows operator flow: prerequisites → setup → verify → operate/troubleshoot. For each section list: heading text + level, 2-3 sentence coverage, widgets to use (Notice, ListCheck, Tabs, Accordion, Button, YouTubeEmbed, AmazonProduct), its visual (real screenshot, SVG diagram, or none), internal links, affiliate links (exact URL + anchor), where verify steps / failure modes / cost notes land. Every outline MUST contain:
- A complete feature section: every feature of the current version from the research inventory, grouped by the job it does, with what it does, when to use it and the default setting. Settings and comparisons go in tables.
- A visual plan: a real screenshot for every step that is a UI screen or a terminal output the reader must recognize and that can be captured; an SVG diagram for every workflow or architecture with three or more steps or two or more interacting components. An article with a workflow or architecture always gets at least one diagram.
- An FAQ section as the last H2, with 6-8 questions taken from seo-spec.md.
End with an estimated word count: 1,500-2,500 words for a how-to or a review. When the topic needs more, say what you cut and why.

## Phase 4 — Draft → `<folder>/article.mdx`

Write the COMPLETE updated MDX article following the outline.

- Start with the exact frontmatter from seo-spec.md. Keep slug, image, canonical, `date` untouched.
- Widget imports go after frontmatter; import only what you use.
- CRITICAL asset preservation:
  - KEEP every existing image reference exactly as-is — the article uses `<imageDir>/...` paths like `../../assets/images/YY/MM/file.ext`. NEVER emit `./assets/` paths. New images must use `<imageDir>` too.
  - PRESERVE all `<YouTubeEmbed>` components and video references.
  - PRESERVE existing widgets unless the outline explicitly removes them.
- Real, copy-pasteable, updated code/config examples (with versions when known). After major steps: how to verify, and what failure looks like.
- One clear default path; mention alternatives only when they matter.
- Internal links to real slugs from articles-list.md. Affiliate links where they naturally fit, with descriptive anchors; `/go/<slug>/` redirects only, never raw amazon.com URLs; keep an "Affiliate Disclosure" Notice above the first affiliate link.
- NO invented war stories, benchmarks, or "I tested on N servers".
- No "TODO"/placeholder — every section gets real content. Valid MDX only.
- VISUALS (required, follow the outline's visual plan):
  - Screenshots must be real captures. Allowed sources, in order: the app running locally with Docker Compose in a throwaway project (unique ports, `docker compose down -v` afterwards), a public demo, a public web page the reader will open, or the article's own existing screenshots when the UI is unchanged. Never a vendor's marketing or docs image unless its license allows reuse (then say so in the caption). Never an invented screenshot.
  - Capture at a 1280 px wide viewport, crop to the panel the text talks about, blur anything personal (email, domain, token, IP), save as WebP quality 85 at 1280 px wide under `<imageDir>/<slug>-<screen>.webp`, and reference it with `<Picture formats={["webp"]} fallbackFormat="webp" src={imgX} alt="..." />` after `import imgX from "<imageDir>/<file>.webp";`. The alt text says what the reader should look at. Add a one-line italic caption under it.
  - If the real UI cannot be captured, draw an SVG mockup of the layout and call it a mockup in the alt text and the caption.
  - SVG diagrams: author a self-contained SVG (viewBox 800-960 px wide, taller when the flow needs it; `font-family="system-ui, -apple-system, sans-serif"`; labels 14-16 px, sub-labels 12 px minimum; flat light background `#F8FAFC`; rounded boxes, arrows, labels; one accent color `#2563EB` plus ink `#0F172A`; no gradients, no glow). Tools: `python3 scripts/check-svg-labels.py <file>.svg` must report 0 problems (it measures every label against its box with DejaVu Sans metrics and needs Pillow), then `node scripts/svg-diagram-to-webp.mjs <file>.svg <imageDir>/<slug>-<name>.webp 1920 85` renders it (resvg + sharp, system fonts). Keep the SVG out of the repo. Read the rendered WebP back when you can view images: every label legible, nothing clipped, arrows connect.
  - When the ES file is synced, it gets the same visuals (through the `@assets/...` alias) and the same FAQ in Spanish.
- FAQ (required): the last H2 is `## FAQ` with 6-8 `<Accordion label="Question" group="faq">` items. Each answer is 2-4 sentences carrying a concrete fact, command or number from the article. No question repeats a heading word for word. The opening tag and `</Accordion>` each sit on their own line; a closing tag at the end of the answer line breaks the MDX build.

## Phase 5 — Review → fix article.mdx in place + `<folder>/review-report.md`

1. Fact-check 2-3 key claims against the live web; fix wrong/outdated ones. Remove fabricated anecdotes.
2. HUMANIZER PASS (most important): apply the full humanizer rules below to every paragraph, rewrite AI patterns into natural prose, then scan the whole file and remove every em dash (—), en dash (–), double hyphen (--), and curly quote. Zero tolerance on the dashes.
3. SEO check: primary keyword in title/H1/first 100 words/description; title 50-60 chars; description 150-160; proper heading hierarchy.
4. Operator check: would a cost-conscious solo self-hoster trust this? Concrete commands, prerequisites + verify + failure modes, cost notes? Sounds like Dragos, not generic AI blog?
5. Widget check: all used widgets imported, syntax correct.
6. Link check: internal slugs valid; external/affiliate links real.
7. Asset check: image paths still `<imageDir>/...` (no `./assets/`); ALL original YouTubeEmbeds still present.
8. Visual check: every planned screenshot exists and shows what the text describes, with nothing personal in it; every diagram WebP renders with legible text; every visual has descriptive alt text.
9. FAQ check: the FAQ section is the last H2, has at least 6 questions, and each answer carries specifics that agree with the body.
10. Completeness check: every feature from the research inventory is in the article or is listed as cut with a reason in review-report.md; the article does not stop at install; a reader can act on every section.

Fix everything directly in article.mdx. Write review-report.md: fact-check results, AI patterns found/fixed (with before/after), SEO score + fixes, quality assessment, final status PASS / needs revision.

## Step 6 — Write back

Before copying article.mdx over the original file:
1. Enforce frontmatter schema: exactly one valid category, max 3 tags.
2. Stamp `lastmod: <today>T00:00:00Z` (update the line or add it after `date:`). Never touch `date`.
3. Regex-fix any `](./assets/` image paths to `](<imageDir>/`.
4. If any original YouTubeEmbed is missing from the draft, restore its import line and reinsert the embed(s) after the first H2's first paragraph (or at the end if no H2).
5. Validate: file starts with `---` and is >200 chars, else abort with error.
6. Write the file over the original article path.
7. Run `bun run build:ci` in the bitdoze repo root and capture the result. An error in the rewritten article gets fixed and the build rerun; an error in another file leaves the update in place and goes into the report. No git commit, no push — the file on disk is the deliverable.
8. New visuals are `.webp` files under `<imageDir>`; no new `.svg` stays in the repo.

## Step 7 — Log

Write the outcome into the post's row under `## The list` (this file). Change only `Last updated` and `Status`, plus the Post title when the rewrite changed it; the row keeps its `#` and its position.
- Rewrite landed (file written, `lastmod` stamped): `Last updated` = `<today>`, `Status` = `updated`.
- Rewrite did not land: `Last updated` unchanged, `Status` = `not updated, failed <today>: <one-line reason>`.
- The post has no row (a post published after the list was started, updated by slug): append one at the end of the table with the next `#`, `Published` = its frontmatter `date`, and the ES and DE cells read from the translation files (`n/a` when there is none).

Then report: slug, written, build ok/fail, the ES and DE cells of its row, one-line summary.

=====================================================================
STYLE GUIDES (apply in every phase that writes or edits prose)
=====================================================================

## Author — write as Dragos / bitdoze.com
A practitioner who tests what he publishes. Day job: sole DevOps owner for large Linux demo fleets on OCI (Ansible, GitLab CI, networking, security). Background: principal database support (Oracle, Sev-1) and telecom DBA work. Side projects: full-stack apps, Mastra/Agno AI agents, Astro themes; runs his own VPS fleet with Dokploy + Docker + S3 backups. Tools he actually uses: Docker, Dokploy, Ansible, Bash/Python, GitHub Actions/GitLab CI, PostgreSQL, coding agents (Codex, Claude Code, OpenCode). Bucharest timezone; prefers cheap reliable EU VPS (Hetzner-class) over hyperscaler theater.
Voice implication: operator who has broken production and fixed it; prefers boring reliability over hype; skeptical of "just works"; cares about cost, blast radius, rollback, verification. Use this bio for taste and framing — do NOT fabricate war stories from it.

## Audience
Cost-conscious developers and solo operators who self-host, ship side projects, and want practical, accurate, no-fluff guides they can run on a VPS tonight. Topics: AI tools and coding agents, local/self-hosted AI, Docker, VPS/self-hosting (Dokploy, reverse proxies, backups), CI/CD, cloud/infra, databases, CDN, dev tooling, Linux/Mac setup.

## Voice
Direct, technical, plain-spoken — a senior DevOps engineer pairing with another engineer, not a marketer, not a textbook.
- Have opinions: one clear recommendation, then note when to diverge.
- Be specific: real commands, paths, versions, failure modes. `docker compose up -d`, not "start the containers".
- Short sentences mixed with longer ones. No hype words (revolutionary, game-changer, seamless, leverage).
- First person for opinions/defaults is fine; never invent metrics or anecdotes.
- Include verify steps, expected output, and what "broken" looks like.
- Cost and ops angles: RAM/CPU, backups, upgrade path, blast radius, secrets, least privilege. Call out footguns early.

## Practical content rules — "can a solo operator run this tonight?"
- Prerequisites: exact tools/versions, accounts, ports, DNS.
- Happy path: numbered steps with copy-pasteable commands.
- Verify: how to confirm each major step worked (curl, logs, health checks).
- Failure modes: common errors and the fix.
- Rollback/undo when possible. Hardening/production notes: backups, updates, secrets, firewall, non-root, resource limits.
- Prefer primary sources; record versions/dates for anything that ages; say "untested" instead of faking certainty; never invent benchmarks.
- Self-hosting bias: Linux VPS, Docker Compose/Dokploy, reverse proxy, env files, S3 backups; state monthly cost order-of-magnitude; for AI posts distinguish local vs API + keys + token costs.
- Avoid: generic openers, feature laundry lists with no recommendation, tutorials that end at install, copied competitor outlines.

## SEO rules
- Primary keyword in title (near front), slug, meta description, H1, first 100 words. 2-3 secondary keywords.
- Title 50-60 chars; meta_title ≤60; description 150-160 with primary keyword + value proposition.
- One H1, H2s for sections, H3s for subsections.
- Internal links to real slugs; descriptive anchor text (never "click here"); every image has descriptive alt text.

## Widgets (import from @components/widgets/, only what you use)
- Accordion: <Accordion label="..." group="faq" expanded="true">…</Accordion>
- Button: <Button text="..." link="/url" variant="solid" color="blue" size="md" icon="arrow-right" />
- Notice: <Notice type="info|success|warning|error" title="...">…</Notice>
- ListCheck: <ListCheck><ul><li>…</li></ul></ListCheck>
- YouTubeEmbed: <YouTubeEmbed url="https://youtube.com/embed/ID" label="..." />
- Tabs/Tab: <Tabs><Tab name="A">…</Tab><Tab name="B">…</Tab></Tabs>
- AmazonProduct with productLink="/go/<slug>/" only.
Don't overuse them — only where they help the reader.

## Humanizer — comprehensive AI-writing removal
Rewrite (don't delete) every AI pattern into natural prose, preserving meaning and coverage.

HARD CONSTRAINTS (zero tolerance):
- NO em dashes (—), en dashes (–), spaced dashes ( — ), or double hyphens ( -- ) in the final text. Replace with a period, comma, colon, parentheses, or restructure.
- Replace curly quotes “…” and ’ with straight " and '.

CONTENT PATTERNS to fix:
- Inflated significance ("serves as a testament", "pivotal moment", "underscoring the importance") → plain facts.
- Promotional language (boasts, vibrant, stunning, renowned, nestled).
- Superficial -ing analyses ("highlighting…", "ensuring…", "reflecting…").
- Vague attributions ("experts argue", "industry reports") → name sources or cut.
- Formulaic "challenges/future outlook" sections → concrete facts.

LANGUAGE PATTERNS:
- AI vocabulary: actually, additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (v), interplay, intricate, key (adj), landscape (abstract), pivotal, showcase, tapestry, testament, underscore (v), valuable, vibrant → replace.
- Copula avoidance: "serves as" → "is"; "boasts/features" → "has".
- Negative parallelisms ("not only X but Y") → state directly.
- Rule of three → don't force triads. Elegant variation → pick one term.
- False ranges ("from X to Y" with no scale) → concrete list.
- Passive voice → active.

STYLE PATTERNS:
- Mechanical boldface → only bold when truly needed.
- "**Header:**" list items → prose or real sentences.
- Title Case headings → sentence case. Emojis in headings → remove.
- Filler ("in order to" → "to", "due to the fact that" → "because", "it is important to note" → cut).
- Excessive hedging → commit or qualify once.
- Generic positive conclusions ("the future looks bright") → concrete next step.
- Signposting ("let's dive in") → just say the thing.
- Persuasive authority tropes ("the real question is", "at its core") → plain point.
- Manufactured punchlines, fake-candid openers ("Honestly?", "Look,").
- Hyphens: keep attributive ("a high-quality report"), drop predicate ("the report is high quality").

Do NOT flag alone: perfect grammar, mixed registers, one short emphatic sentence, formal vocabulary, unsourced claims. Only rewrite CLUSTERS of tells. Preserve human signs: specific unusual detail, mixed feelings, first-person editorial choices, varied sentence length, genuine asides.

PROCESS: identify every pattern → rewrite each → ask "what still sounds AI?" → final scan for — and – characters; any hit means it's not done.
```

## How the list is kept

- **Order**: rows are sorted by `Last updated`, ascending, oldest first. The order is a snapshot from 2026-11-23; a refresh edits the row's `Last updated` and `Status` but does not move it. Selection reads the dates, never the position.
- **Last updated**: the update date (`lastmod`) when the post has one, else the file create time.
- **File create time**: the day of the file's first git commit. The filesystem birth time is not usable on this machine: the two most common birth days (2026-11-12 and 2026-11-20, both checkout days) alone cover 641 of 965 files. The 101 EN posts from the 2025-03-07 bulk import that keep an older `date` use that older date.
- **Refresh date stored in `date`**: 1 import-era post has no `lastmod` and a `date` later than its first commit. That date is a refresh stamp, so it is used as the update date.
- **Status**: `updated` means the update date is later than the create time. `not updated` means the post has not been refreshed since it went live (no `lastmod`, or `lastmod` equals the publish day). A failed run appends `failed <date>: <reason>` to the cell; delete that note to let the pipeline retry the row.
- **Published**: the frontmatter `date`. A trailing `*` marks an import-era file whose `date` was overwritten with a refresh date (see data issues).
- **ES / DE**: the translation file's own `lastmod`, or `not updated (file YYYY-MM-DD)` with the day the translation was first committed. `n/a` means no translation exists.
- **New posts**: a post published after 2026-11-23 is not in the list yet. It gets its row when it is first refreshed by slug (Step 7).

## Data issues found while building the list

Not fixed here, only listed. Each one makes the post look newer or older than it is.

1. **38 import-era posts have `date` overwritten with the refresh date** (first commit 2025-03-07, `date` and `lastmod` equal, original publish date lost). `restore-post-dates.mjs` skips them as import-era. Marked `*` in Published: `add-accordion-carrd`, `add-contact-form-astro`, `benchmark-cloud-servers`, `best-oh-my-zsh-plugins`, `bun-update-packages`, `clean-docker-overlay2-dir`, `convert-images-to-svg`, `coolify-install-heroku-alternative`, `copy-multiple-files-in-one-layer-using-a-dockerfile`, `deploy-astro-easypanel`, `deploy-astro-on-vps`, `deploy-uptime-kuma`, `docker-containers-business`, `docker-containers-home-server`, `docker-env-vars`, `dockge-install`, `easypanel-modern-server-control-panel`, `embed-youtube-videos-to-gatsby`, `flowiseai-install`, `gatsby-js-online-courses`, `ghostty-terminal`, `install-cloudpanel-host-nodejs`, `install-plausible-analytics`, `langflow-docker-install`, `langfuse-docker-install`, `litellm-docker-install`, `multiple-postgres-databases-docker`, `nicegui-get-started`, `ollama-docker-install`, `redirect-docker-logs-to-a-single-file`, `responsive-youtube-astrojs`, `sed-change-case`, `sed-insert-append-text`, `shots-so-mockups`, `shottr-mac-screenshot-tool`, `streamlit-vs-nicegui`, `tmux-basics`, `zoxide`.
2. **Refresh date stored in `date` instead of `lastmod`**: `ai-coding-tools` (`date` 2026-08-12). Commit 523a1ea (2026-08-13) holds the rewrite (528 insertions, 725 deletions). Ranked as updated on that date.
3. **`lastmod` one day before `date`**: `best-2-5-10gbe-switch-homelab` (2026-09-21 < 2026-09-22), `best-mini-pc-local-llm` (2026-09-21 < 2026-09-22), `best-mini-pc-proxmox` (2026-09-21 < 2026-09-22), `best-tb5-dock-macbook-pro` (2026-09-21 < 2026-09-22).
4. **`lastmod` with no commit touching the file within 3 days** (11 posts): `traefik-redirect-http-https` (2026-08-03), `carrd-floating-menu` (2026-08-04), `memos-install` (2026-08-04), `astro-ssg-build-optimization` (2026-09-04), `amp-code-free-ai-coding-agent` (2026-09-10), `brightdata-mcp-guide` (2026-09-10), `dokploy-install` (2026-09-11), `github-copilot-complete-guide` (2026-09-11), `cognee-self-host` (2026-09-15), `convex-self-hosted-benchmark` (2026-09-15), `beszel-uptime-kuma` (2026-09-16).
5. **ES `date` differs from the EN `date` it should mirror** (7 files): breakdance-kinsta-sitio-estatico.mdx, fluidvoice-dictado-mac.mdx, instalar-dockge.mdx, mejores-plugins-gratuitos-backup-wordpress.mdx, mejores-plugins-web-scraping-wordpress.mdx, mejores-plugins-woocommerce-codigos-barras-qr.mdx, resena-breakdance-builder.mdx.
6. **No `lastmod`, but a commit outside the bulk edits touched the file more than 7 days after it was created** (24 posts, last such commit in brackets): `asus-rog-strix-oled-xg32ucwg-review` (2026-09-21), `buzz-block-docker-setup` (2026-09-29), `codex-app-any-model` (2026-07-10), `cognee-vs-hindsight` (2026-07-31), `coolify-vs-dokploy-vs-kamal-2` (2026-11-13), `deploy-emdash-cloudflare-workers` (2026-11-14), `fish-audio-image-video-generation` (2026-09-25), `fix-rpm-transaction-lock-waiting` (2026-01-29), `hqbase-self-hosted-shared-inbox` (2026-08-29), `kie-ai-review` (2026-08-25), `lm-studio-bionic` (2026-10-28), `mastra-fish-audio-tts` (2026-11-23), `mastra-vs-eve-typescript-ai-agents` (2026-07-30), `meetily-self-hosted-ai-meeting-assistant` (2026-11-08), `muse-ai-meta-agent` (2026-10-28), `oha-website-load-testing` (2026-02-26), `pangolin-cloudflare-tunnels-alternative` (2026-11-19), `screen-studio-review` (2026-11-16), `self-host-jellyfin` (2026-11-13), `tinyfish-free-firecrawl-alternative` (2026-07-13), `top-ai-github-repos` (2026-10-28), `vercel-eve-ai-agent` (2026-07-10), `vps-price-increases` (2026-11-13), `what-postgres-replaces` (2026-11-20).
7. **Never refreshed after an earlier attempt** (3 posts): `agno-squad`, `google-adk-start` and `asus-rog-strix-oled-xg32ucwg-review` failed their earlier run and stayed without a rewrite. All three were refreshed on 2026-11-27.

## The list

| # | Post | Published | Last updated | Status | ES | DE |
|---:|---|---|---|---|---|
| 1 | [Plausible Analytics Review: Features, Pricing, Self-Hosting](../src/content/posts/plausible-tool.mdx) | 2023-03-17 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 2 | [Screen Studio Review: Is It Worth It for Mac Demos?](../src/content/posts/screen-studio-review.mdx) | 2023-04-04 | 2026-11-23 | updated | 2026-11-23 | 2026-11-23 |
| 3 | [Upload a Directory Tree to an OCI Bucket With Python](../src/content/posts/upload-directory-oci-bucket-python.mdx) | 2023-04-26 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 4 | [Fix Kernel Panic: VFS Unable to Mount Root FS on Ubuntu](../src/content/posts/fix-kernel-panic-unable-mount-root-fs.mdx) | 2023-05-11 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 5 | [How to Update Docker Compose Containers (With Rollback)](../src/content/posts/updating-container-docker-compose.mdx) | 2023-05-11 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 6 | [SSH too many authentication failures: why and how to fix](../src/content/posts/fix-ssh-too-many-authentication-failures.mdx) | 2023-08-03 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 7 | [Docker cleanup: safely remove images, volumes and cache](../src/content/posts/cleanup-all-docker-things.mdx) | 2023-08-16 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 8 | [OpnForm review: self-hosting the open source form builder](../src/content/posts/opnform-open-source.mdx) | 2023-08-18 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 9 | [Install Docker on Ubuntu ARM: steps, checks, uninstall](../src/content/posts/install-docker-ubuntu-arm.mdx) | 2023-09-28 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 10 | [Compare Two Folders in the Terminal: diff, git and rsync](../src/content/posts/compare-folders-content-differences.mdx) | 2023-11-14 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 11 | [Fix rpm DB_RUNRECOVERY: Fatal error, run database recovery](../src/content/posts/fix-rpmdb-error-bdb0087-db_runrecovery.mdx) | 2024-05-24 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 12 | [oha load testing: how to run it and read the results](../src/content/posts/oha-website-load-testing.mdx) | 2025-02-10 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 13 | [Agno team tutorial: build a research squad with Streamlit](../src/content/posts/agno-squad.mdx) | 2025-04-09 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 14 | [Google ADK tutorial: build your first agent with memory](../src/content/posts/google-adk-start.mdx) | 2025-04-10 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 15 | [RPM waiting for transaction lock: find the holder and wait](../src/content/posts/fix-rpm-transaction-lock-waiting.mdx) | 2025-06-27 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 16 | [ASUS ROG Strix OLED XG32UCWG review: a work-first 4K OLED](../src/content/posts/asus-rog-strix-oled-xg32ucwg-review.mdx) | 2025-09-26 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 17 | [How to Choose a Domain Name and Register It the Right Way](../src/content/posts/choose-domain-name.mdx) | 2026-02-26 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 18 | [CloudPanel Varnish Cache for WordPress: Setup Guide](../src/content/posts/cloudpanel-varnish-cache.mdx) | 2026-02-26 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 19 | [Pangolin self-hosted: a Cloudflare Tunnels alternative](../src/content/posts/pangolin-cloudflare-tunnels-alternative.mdx) | 2026-05-20 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 20 | [Coolify vs Dokploy vs Kamal 2: Pick Your Self-Hosted PaaS](../src/content/posts/coolify-vs-dokploy-vs-kamal-2.mdx) | 2026-05-25 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 21 | [Cheapest AI Models for Hermes Agent in 2026 (Under $1/M Tokens)](../src/content/posts/best-cheap-models-hermes-agent.mdx) | 2026-04-30 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 22 | [Codex App With Any Model: GLM, MiniMax, MiMo and Go](../src/content/posts/codex-app-any-model.mdx) | 2026-06-12 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 23 | [Hermes Agent Dashboard Setup: SSH, Caddy, Docker & Security (2026)](../src/content/posts/hermes-dashboard-guide.mdx) | 2026-04-14 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 24 | [S3 bucket as a filesystem on a VPS: ZeroFS vs JuiceFS](../src/content/posts/s3-bucket-filesystem-vps.mdx) | 2026-06-16 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 25 | [Block ads in every browser after Manifest V3 with NextDNS](../src/content/posts/block-ads-manifest-v3-nextdns.mdx) | 2026-06-17 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 26 | [TanStack Start Todo App with Bunny Database and Drizzle](../src/content/posts/tanstack-start-bunny-database-drizzle.mdx) | 2026-06-18 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 27 | [Astro DB with Bunny Database: Local-First Dev, libSQL in Production](../src/content/posts/astro-db-bunny-database.mdx) | 2026-06-18 | 2026-06-19 | updated | not updated (file 2026-10-19) | n/a |
| 28 | [Vercel Eve Tutorial: Build a Durable AI Agent in Files](../src/content/posts/vercel-eve-ai-agent.mdx) | 2026-06-19 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 29 | [Monitor CPU Usage and Send Email Alerts in Linux](../src/content/posts/monitor-cpu-usage-and-send-email-alerts-in-linux.mdx) | 2022-09-14 | 2026-06-26 | updated | 2026-06-26 | n/a |
| 30 | [How to Install Node.js using NVM on MacOS and Ubuntu](../src/content/posts/install-nodejs-using-nvm-macos-ubuntu.mdx) | 2022-10-07 | 2026-06-27 | updated | 2026-06-27 | n/a |
| 31 | [TinyFish: The Best Free Firecrawl Alternative for AI Agents in 2026](../src/content/posts/tinyfish-free-firecrawl-alternative.mdx) | 2026-06-27 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 32 | [Best Astro.js Online Courses/Tutorials](../src/content/posts/best-astrojs-online-courses.mdx) | 2022-10-12 | 2026-06-28 | updated | 2026-06-28 | n/a |
| 33 | [How To Deploy An Astro.JS Blog On Cloudflare](../src/content/posts/deploy-astrojs-cloudflare.mdx) | 2022-10-18 | 2026-06-28 | updated | 2026-06-28 | n/a |
| 34 | [Link GitHub with A SSH Key to MacOS or Linux](../src/content/posts/link-github-with-ssh-maco-linux.mdx) | 2022-10-07 | 2026-06-28 | updated | 2026-06-28 | n/a |
| 35 | [Astro 7 benchmark: build time cut in half on 743 pages](../src/content/posts/astro-7-faster-builds.mdx) | 2026-07-01 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 36 | [Cognee vs Hindsight: Which Agent Memory to Self-Host?](../src/content/posts/cognee-vs-hindsight.mdx) | 2026-07-03 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 37 | [Upgrade Your Carrd.co Website With A Cookie Notice in Minutes](../src/content/posts/add-cookie-notice-carrd.mdx) | 2023-05-30 | 2026-07-08 | updated | 2026-07-08 | 2026-07-08 |
| 38 | [How To Add a Sticky Header to Carrd (CSS Tutorial)](../src/content/posts/add-stickey-header-carrd.mdx) | 2023-05-30 | 2026-07-09 | updated | 2026-07-09 | 2026-07-09 |
| 39 | [Astro vs Next.js vs TanStack Start: Which wins in 2026?](../src/content/posts/astro-vs-nextjs-vs-tanstack-start-which-wins.mdx) | 2026-07-10 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 40 | [Pi Coding Agent Setup Guide: Install, Configure Models, and Best Extensions](../src/content/posts/pi-coding-agent-setup-guide.mdx) | 2026-04-30 | 2026-07-10 | updated | not updated (file 2026-04-30) | n/a |
| 41 | [Chatto self-hosted: the privacy answer to EU Chat Control](../src/content/posts/chatto-self-hosted.mdx) | 2026-07-11 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 42 | [How to Enable Command Autocomplete in ZSH](../src/content/posts/enable-command-autocomplete-in-zsh.mdx) | 2023-11-16 | 2026-07-11 | updated | 2026-07-11 | n/a |
| 43 | [How to Build a One Page Website on a Budget](../src/content/posts/build-one-page-website-budget.mdx) | 2023-11-22 | 2026-07-12 | updated | 2026-07-12 | n/a |
| 44 | [How to Check Remote Ports Using the nc Command in Linux](../src/content/posts/check-remote-port-in-linux-nc.mdx) | 2023-11-22 | 2026-07-12 | updated | 2026-07-12 | n/a |
| 45 | [How to Enable Syntax Highlighting in Zsh](../src/content/posts/enable-syntax-highlighting-zsh.mdx) | 2023-11-16 | 2026-07-12 | updated | 2026-07-12 | n/a |
| 46 | [Best Self-Hosted Server Panels: 2026 Comparison Guide](../src/content/posts/best-self-hosted-panels.mdx) | 2023-11-29 | 2026-07-13 | updated | 2026-11-13 | n/a |
| 47 | [How To Add Pricing Table to Carrd.co](../src/content/posts/carrd-add-pricing-table.mdx) | 2023-11-27 | 2026-07-13 | updated | 2026-07-13 | 2026-07-13 |
| 48 | [Launch a Self-Hosted Newsletter with Keila and Docker](../src/content/posts/keila-setup.mdx) | 2023-11-28 | 2026-07-13 | updated | 2026-07-13 | n/a |
| 49 | [Mail.Baby Review 2026: Cheap SMTP Service Pros & Cons](../src/content/posts/mail-baby-review.mdx) | 2023-11-27 | 2026-07-13 | updated | 2026-07-13 | n/a |
| 50 | [Plausible Analytics for Astro with Cloudflare Workers](../src/content/posts/astro-plausible-cloudflare-workers.mdx) | 2023-12-07 | 2026-07-14 | updated | 2026-07-14 | n/a |
| 51 | [Best Hermes Agent Dashboards & Mobile Apps (2026 Guide)](../src/content/posts/best-hermes-dashboards.mdx) | 2026-04-22 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 52 | [Hermes Agent Setup Guide (2026): Self-Improving AI on Your Server](../src/content/posts/hermes-agent-setup-guide.mdx) | 2026-03-20 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 53 | [How to Update All Node.js Dependencies to Latest Version](../src/content/posts/nodejs-update-dependencies.mdx) | 2023-12-06 | 2026-07-14 | updated | 2026-07-14 | n/a |
| 54 | [Add a Contact Form to Any Static Website](../src/content/posts/add-contact-form-static-websites.mdx) | 2024-01-10 | 2026-07-15 | updated | 2026-07-15 | n/a |
| 55 | [How to Add a Custom Domain to Carrd (Step-by-Step Guide)](../src/content/posts/carrd-add-domain.mdx) | 2024-01-16 | 2026-07-15 | updated | 2026-07-15 | 2026-07-15 |
| 56 | [Mastra vs Eve: Best TypeScript AI agent framework in 2026](../src/content/posts/mastra-vs-eve-typescript-ai-agents.mdx) | 2026-07-16 | 2026-11-28 | updated | 2026-11-28 | n/a |
| 57 | [Meetily Review: Self-Hosted AI Meeting Assistant Guide](../src/content/posts/meetily-self-hosted-ai-meeting-assistant.mdx) | 2026-07-16 | 2026-07-16 | not updated | 2026-11-05 | n/a |
| 58 | [Deploy Slash Link Shortener with Docker and Dockge](../src/content/posts/slash-docker-deploy.mdx) | 2024-01-17 | 2026-07-16 | updated | 2026-07-16 | n/a |
| 59 | [Deploy Streamlit on a VPS and Proxy to Cloudflare Tunnels](../src/content/posts/streamlit-deploy-vps-cloudflare.mdx) | 2024-01-18 | 2026-07-16 | updated | 2026-07-16 | n/a |
| 60 | [Kie.ai Review 2026: One Cheap API for Nano Banana, Veo & Suno](../src/content/posts/kie-ai-review.mdx) | 2026-07-17 | 2026-07-17 | not updated | not updated (file 2026-07-17) | n/a |
| 61 | [LM Studio Bionic Review (2026): Local AI Agent Tested on M4 Mac Mini](../src/content/posts/lm-studio-bionic.mdx) | 2026-07-17 | 2026-07-17 | not updated | not updated (file 2026-10-19) | not updated (file 2026-11-15) |
| 62 | [PM2 Environment Variables: Setup, Update & Best Practices](../src/content/posts/pm2-env-vars.mdx) | 2024-01-20 | 2026-07-17 | updated | 2026-07-17 | n/a |
| 63 | [PM2 Process Manager: Complete Guide to Managing Apps](../src/content/posts/pm2-manage-apps.mdx) | 2024-01-19 | 2026-07-17 | updated | 2026-07-17 | n/a |
| 64 | [How to Choose Between Fork and Cluster Mode in PM2](../src/content/posts/pm2-fork-cluster.mdx) | 2024-01-21 | 2026-07-18 | updated | 2026-07-18 | n/a |
| 65 | [Streamlit vs Taipy 2026: Best Python Web App Framework?](../src/content/posts/streamlit-vs-taipy.mdx) | 2024-01-22 | 2026-07-18 | updated | 2026-07-18 | n/a |
| 66 | [Extract Text From PDF on Linux Command Line (pdftotext)](../src/content/posts/pdf-extract-text-linux-cmd.mdx) | 2024-01-23 | 2026-07-19 | updated | 2026-07-19 | n/a |
| 67 | [How to Merge PDF Files on Linux Command Line (pdfunite)](../src/content/posts/pdf-merge-linux-cmd.mdx) | 2024-01-23 | 2026-07-19 | updated | 2026-07-19 | n/a |
| 68 | [Openship Review: Self-Hosted PaaS vs Coolify and Dokploy](../src/content/posts/openship-self-hosted-paas.mdx) | 2026-07-20 | 2026-07-20 | not updated | not updated (file 2026-10-19) | n/a |
| 69 | [How to Install Outline Wiki on Docker: Complete Guide](../src/content/posts/outline-install.mdx) | 2024-02-06 | 2026-07-20 | updated | 2026-07-20 | n/a |
| 70 | [Best PHP Cloud Hosting Providers](../src/content/posts/php-cloud-hosting.mdx) | 2024-02-01 | 2026-07-20 | updated | 2026-07-20 | n/a |
| 71 | [Bun Package Manager: Complete Guide vs NPM, Yarn & PNPM](../src/content/posts/bun-package-manager.mdx) | 2024-02-07 | 2026-07-21 | updated | 2026-07-21 | n/a |
| 72 | [Add an AI Image Agent to Mastra with Kie.ai](../src/content/posts/mastra-image-agent-kie-ai.mdx) | 2026-07-17 | 2026-07-21 | updated | not updated (file 2026-07-17) | n/a |
| 73 | [How to Install Umami Analytics on Docker (2026 Guide)](../src/content/posts/umami-analytics-install.mdx) | 2024-02-07 | 2026-07-21 | updated | 2026-07-21 | n/a |
| 74 | [How to Block AI Crawlers & Safeguard Your Website (2026)](../src/content/posts/block-ai-crawlers.mdx) | 2024-02-09 | 2026-07-22 | updated | 2026-07-22 | n/a |
| 75 | [SEO Gets Tool Review: GSC & GA4 Analytics in 2026](../src/content/posts/seo-gets-tool.mdx) | 2024-02-12 | 2026-07-22 | updated | 2026-07-22 | n/a |
| 76 | [How to Create a Carrd Mobile Responsive Navbar (3 Methods)](../src/content/posts/carrd-mobile-navbar.mdx) | 2024-02-14 | 2026-07-23 | updated | 2026-07-23 | 2026-07-23 |
| 77 | [CloudPanel as Reverse Proxy: Docker & Dockge Setup Guide](../src/content/posts/cloudpanel-setup-dockge.mdx) | 2024-02-13 | 2026-07-23 | updated | 2026-07-23 | n/a |
| 78 | [30+ Best Python Web Frameworks for 2026 (Compared)](../src/content/posts/best-python-web-frameworks.mdx) | 2024-02-16 | 2026-07-24 | updated | 2026-07-24 | n/a |
| 79 | [Build Your Own AI Agent with Mastra (Files, Web, Browser)](../src/content/posts/build-ai-agent-mastra.mdx) | 2026-06-22 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 80 | [Bunny.net Review 2026: Honest Take After 1 Year (Cheaper Than Cloudflare)](../src/content/posts/bunny-net-review.mdx) | 2026-04-08 | 2026-07-24 | updated | 2026-07-24 | n/a |
| 81 | [Clone Your Voice with Fish Audio in 2 Minutes (2026 Guide)](../src/content/posts/fish-audio-clone-voice.mdx) | 2026-07-02 | 2026-07-24 | updated | 2026-07-24 | 2026-07-24 |
| 82 | [Fish Audio vs ElevenLabs 2026: I Switched and Saved $84/Year](../src/content/posts/fish-audio-vs-elevenlabs.mdx) | 2026-07-02 | 2026-07-24 | updated | 2026-07-24 | n/a |
| 83 | [Fish Audio vs MiniMax 2026: Which AI Voice Tool Wins?](../src/content/posts/fish-audio-vs-minimax.mdx) | 2026-07-02 | 2026-07-24 | updated | 2026-07-24 | n/a |
| 84 | [How to Install WordPress with Docker Compose: Full Stack Guide](../src/content/posts/install-wordpress-docker.mdx) | 2024-02-21 | 2026-07-24 | updated | 2026-07-24 | n/a |
| 85 | [How to Add a Back to Top Button on Carrd (2026 Guide)](../src/content/posts/carrd-back-to-top-button.mdx) | 2024-02-28 | 2026-07-25 | updated | 2026-07-25 | 2026-07-25 |
| 86 | [How to Use Groq's FREE API in Your Streamlit App](../src/content/posts/groq-api-mistral-streamlit.mdx) | 2024-03-01 | 2026-07-25 | updated | 2026-07-25 | n/a |
| 87 | [CloudPanel Remote Backups to OneDrive & Google Drive](../src/content/posts/cloudpanel-remote-backups.mdx) | 2024-03-14 | 2026-07-26 | updated | 2026-07-26 | n/a |
| 88 | [Perplexity AI Review 2026: Features, Pricing & Promo Code](../src/content/posts/perplexity.mdx) | 2024-03-05 | 2026-07-26 | updated | 2026-07-26 | n/a |
| 89 | [Buzz by Block: Self-Host Your AI Workspace with Docker](../src/content/posts/buzz-block-docker-setup.mdx) | 2026-07-27 | 2026-07-27 | not updated | not updated (file 2026-10-19) | n/a |
| 90 | [How to Migrate Astro to Bun on CloudFlare Pages (2026 Guide)](../src/content/posts/migrate-astro-bun.mdx) | 2024-03-19 | 2026-07-27 | updated | 2026-07-27 | n/a |
| 91 | [How To Add Multiple Pages to NiceGUI (2026 Guide)](../src/content/posts/nicegui-pages.mdx) | 2024-03-18 | 2026-07-27 | updated | 2026-07-27 | n/a |
| 92 | [Add a New Drive to Ubuntu LVM and Mount It Permanently](../src/content/posts/add-new-drive-lvm.mdx) | 2024-03-21 | 2026-07-28 | updated | 2026-07-28 | n/a |
| 93 | [How to Run Any Python App in Docker with Docker Compose](../src/content/posts/docker-run-python.mdx) | 2024-03-25 | 2026-07-28 | updated | 2026-07-28 | n/a |
| 94 | [Deploy PGvector & PGadmin on Docker and Ditch Pinecone](../src/content/posts/deploy-pgvector-pgadmin-docker.mdx) | 2024-06-12 | 2026-07-29 | updated | 2026-07-29 | n/a |
| 95 | [How to Install Python on Mac, Upgrade It & Use VENV (2026)](../src/content/posts/install-upgrade-python-mac.mdx) | 2024-03-26 | 2026-07-29 | updated | 2026-07-29 | n/a |
| 96 | [Add Voice Cloning TTS to Mastra with Fish Audio](../src/content/posts/mastra-fish-audio-tts.mdx) | 2026-07-29 | 2026-07-29 | not updated | not updated (file 2026-10-19) | n/a |
| 97 | [60+ Docker Commands Every Developer Must Know](../src/content/posts/docker-commands.mdx) | 2024-07-10 | 2026-07-30 | updated | 2026-07-30 | n/a |
| 98 | [100+ Git Commands Every Developer MUST Know (2026 Guide)](../src/content/posts/git-commands.mdx) | 2024-07-10 | 2026-07-30 | updated | 2026-07-30 | n/a |
| 99 | [Mastra Tools vs MCP: Which Should Your Agent Use?](../src/content/posts/mastra-tools-vs-mcp.mdx) | 2026-07-30 | 2026-07-30 | not updated | not updated (file 2026-10-19) | n/a |
| 100 | [100+ Essential Linux Commands You MUST Know (2026 Guide)](../src/content/posts/linux-commands.mdx) | 2024-07-10 | 2026-07-31 | updated | 2026-07-31 | n/a |
| 101 | [How to Secure an SSH Server in Linux: Hardening Guide](../src/content/posts/secure-ssh-server-linux.mdx) | 2024-07-12 | 2026-07-31 | updated | 2026-07-31 | n/a |
| 102 | [60+ Best AI GitHub Repos in 2026 (Actively Maintained Only)](../src/content/posts/top-ai-github-repos.mdx) | 2026-07-31 | 2026-07-31 | not updated | not updated (file 2026-10-19) | not updated (file 2026-11-15) |
| 103 | [Docmost Docker Compose Install: Self-Hosted Wiki for Teams](../src/content/posts/docmost-docker-install.mdx) | 2024-07-29 | 2026-08-01 | updated | 2026-08-01 | n/a |
| 104 | [FileBrowser Quantum Docker Setup: Self-Hosted File Manager](../src/content/posts/deploy-filebrowser-docker.mdx) | 2024-07-26 | 2026-08-02 | updated | 2026-08-02 | n/a |
| 105 | [Traefik Reverse Proxy in Docker: Complete Setup Guide](../src/content/posts/traefik-proxy-docker.mdx) | 2024-07-30 | 2026-08-02 | updated | 2026-08-02 | n/a |
| 106 | [Traefik Wildcard Certificate: Free Let's Encrypt + Cloudflare](../src/content/posts/traefik-wildcard-certificate.mdx) | 2024-08-01 | 2026-08-02 | updated | 2026-08-02 | n/a |
| 107 | [Kie.ai Video Generation Guide: Veo 3.1, Kling 3.0 & Seedance API](../src/content/posts/kie-ai-video-generation.mdx) | 2026-08-03 | 2026-08-03 | not updated | not updated (file 2026-10-19) | n/a |
| 108 | [Get DeepSeek V4 Flash, GPT 5.6 Luna, Qwen 3.8 Max and Kimi K3 for Cheap: OpenCode Go vs ClinePass](../src/content/posts/opencode-go-vs-clinepass-cheap-models.mdx) | 2026-08-03 | 2026-08-03 | not updated | not updated (file 2026-10-19) | n/a |
| 109 | [Traefik Basic Authentication: Secure Your Docker Services](../src/content/posts/traefik-basic-authentication.mdx) | 2024-08-02 | 2026-08-03 | updated | 2026-08-03 | n/a |
| 110 | [Traefik HTTP to HTTPS Redirect: Complete v3 Setup Guide](../src/content/posts/traefik-redirect-http-https.mdx) | 2024-08-02 | 2026-08-03 | updated | 2026-08-03 | n/a |
| 111 | [How to Add a Floating Menu to a Carrd Website](../src/content/posts/carrd-floating-menu.mdx) | 2024-08-28 | 2026-08-04 | updated | 2026-08-04 | 2026-08-04 |
| 112 | [How to Install Memos with Docker Compose: EASY STEPS!](../src/content/posts/memos-install.mdx) | 2024-08-14 | 2026-08-04 | updated | 2026-08-04 | n/a |
| 113 | [BSI Security Report from Hetzner: How I Secured My Docker Server](../src/content/posts/bsi-security-report-docker-ufw.mdx) | 2026-08-05 | 2026-08-05 | not updated | not updated (file 2026-10-19) | n/a |
| 114 | [How To Deploy A Docker Compose App in Dokploy](../src/content/posts/dokploy-docker-compose-app.mdx) | 2024-08-29 | 2026-08-05 | updated | 2026-08-05 | n/a |
| 115 | [Nexterm Docker Install: Self-Hosted SSH, VNC & RDP Management](../src/content/posts/nexterm-docker-install.mdx) | 2024-09-05 | 2026-08-05 | updated | 2026-08-05 | n/a |
| 116 | [Configure Postfix to Send Email Using External SMTP Servers](../src/content/posts/postfix-external-smtp.mdx) | 2024-09-18 | 2026-08-06 | updated | 2026-08-06 | n/a |
| 117 | [Sink Install: Free Self-Hosted Link Shortener (2026 Guide)](../src/content/posts/sink-install.mdx) | 2024-09-09 | 2026-08-06 | updated | 2026-08-06 | n/a |
| 118 | [Wezterm Mac Setup: The Ultimate Terminal with Tmux & Zoxide](../src/content/posts/install-wezterm-mac.mdx) | 2024-10-10 | 2026-08-07 | updated | 2026-08-07 | n/a |
| 119 | [How to Identify Processes Using Swap Space in Linux](../src/content/posts/swap-usage-linux.mdx) | 2024-10-24 | 2026-08-07 | updated | 2026-08-07 | n/a |
| 120 | [Best Self-Hosted Airtable Alternatives in 2026](../src/content/posts/self-hosted-airtable-alternatives.mdx) | 2024-11-19 | 2026-08-08 | updated | 2026-08-08 | n/a |
| 121 | [How to Monitor Server & Docker Resources: CPU, Memory, Disk](../src/content/posts/sever-monitoring.mdx) | 2024-11-28 | 2026-08-08 | updated | 2026-08-08 | n/a |
| 122 | [How to Generate AI Images Locally on Mac with Flux (2026)](../src/content/posts/ai-images-mac.mdx) | 2025-01-12 | 2026-08-09 | updated | 2026-08-09 | 2026-08-09 |
| 123 | [Find the Largest Files on Your Mac (Simple Script & Tools)](../src/content/posts/mac-find-big-files.mdx) | 2025-01-10 | 2026-08-09 | updated | 2026-08-09 | n/a |
| 124 | [How to Fix Docker Bypassing Firewall: A Complete Guide](../src/content/posts/docker-bypasses-firewall.mdx) | 2025-01-17 | 2026-08-10 | updated | 2026-08-10 | n/a |
| 125 | [How To Access Remote Servers with SSH ProxyJump and Jump Hosts](../src/content/posts/ssh-proxyjump-jumphost.mdx) | 2025-01-17 | 2026-08-10 | updated | 2026-08-10 | n/a |
| 126 | [How to Secure a VPS Server with CrowdSec (2026 Guide)](../src/content/posts/crowdsec-secure-server.mdx) | 2025-02-06 | 2026-08-11 | updated | 2026-08-11 | n/a |
| 127 | [How To Do SSH Port Forwarding (SSH Tunneling) in Linux](../src/content/posts/ssh-tunneling-linux.mdx) | 2025-02-06 | 2026-08-11 | updated | 2026-08-11 | n/a |
| 128 | [Best AI Coding Tools and Agents in 2026 (Compared)](../src/content/posts/ai-coding-tools.mdx) | 2025-03-07 * | 2026-08-12 | updated | not updated (file 2026-10-19) | n/a |
| 129 | [Creative Sound Blaster GS5 Review: Still Worth It in 2026?](../src/content/posts/sound-blaster-gs5-review.mdx) | 2025-02-10 | 2026-08-12 | updated | 2026-08-12 | n/a |
| 130 | [FastHTML Multi-Page Website: Complete Structure Tutorial](../src/content/posts/fasthtml-multiple-pages.mdx) | 2025-02-26 | 2026-08-13 | updated | 2026-08-13 | n/a |
| 131 | [FastHTML for Beginners: Build a UI for Your Python App](../src/content/posts/fasthtml-start.mdx) | 2025-02-26 | 2026-08-13 | updated | 2026-08-13 | n/a |
| 132 | [Self-Hosted Shared Inbox for $5/Month: HQBase Review](../src/content/posts/hqbase-self-hosted-shared-inbox.mdx) | 2026-08-13 | 2026-08-13 | not updated | not updated (file 2026-10-19) | n/a |
| 133 | [FastHTML AI Tools: Build a Multi-Page Website Guide](../src/content/posts/fasthtml-complex-ai-tools.mdx) | 2025-03-03 | 2026-08-14 | updated | 2026-08-14 | n/a |
| 134 | [FastHTML + PydanticAI: Build an AI Web App in Python](../src/content/posts/fasthtml-pydenticai-tools.mdx) | 2025-03-03 | 2026-08-14 | updated | 2026-08-14 | n/a |
| 135 | [Add a SQLite Database to Your FastHTML App with Fastlite](../src/content/posts/fasthtml-sqlite-db.mdx) | 2025-03-03 | 2026-08-15 | updated | 2026-08-15 | n/a |
| 136 | [FastHTML User Authentication: OAuth, Login & Admin Controls](../src/content/posts/fasthtml-user-auth.mdx) | 2025-03-04 | 2026-08-16 | updated | 2026-08-16 | n/a |
| 137 | [Build an Astro Blog Theme from Scratch with AI (2026)](../src/content/posts/windsurd-build-astro-blog.mdx) | 2025-03-11 | 2026-08-17 | updated | 2026-08-17 | n/a |
| 138 | [Deploy a Python uv Project with Git and Railpack in Dokploy](../src/content/posts/dokploy-python-railpack-uv.mdx) | 2025-03-12 | 2026-08-18 | updated | 2026-08-18 | n/a |
| 139 | [Getting Started with uv: Python Project Setup in 2026](../src/content/posts/uv-get-start.mdx) | 2025-03-12 | 2026-08-18 | updated | 2026-08-18 | n/a |
| 140 | [Getting Started with Agno Agents: uv, RAG & Memory](../src/content/posts/agno-get-start.mdx) | 2025-03-17 | 2026-08-19 | updated | 2026-08-19 | n/a |
| 141 | [Fish Audio Image & Video Generation: Lip-Sync, Creative Suite 2026](../src/content/posts/fish-audio-image-video-generation.mdx) | 2026-08-20 | 2026-08-20 | not updated | not updated (file 2026-10-19) | n/a |
| 142 | [Google ADK Multi-Agent Research Team with Tavily & Crawl4AI](../src/content/posts/google-adk-multi-agent-search.mdx) | 2025-04-14 | 2026-08-20 | updated | 2026-08-20 | n/a |
| 143 | [Agno Workflows Tutorial: AI Article Writer with Streamlit](../src/content/posts/agno-workflow-writing-team.mdx) | 2025-04-15 | 2026-08-21 | updated | 2026-08-21 | n/a |
| 144 | [Pluton: Self-Hosted Backups with Restic and Rclone](../src/content/posts/pluton-self-hosted-backup.mdx) | 2026-08-21 | 2026-08-21 | not updated | not updated (file 2026-10-19) | n/a |
| 145 | [Context7 MCP: How to Build an AI Agent with Agno (2026)](../src/content/posts/agno-mcp-tools-context7.mdx) | 2025-04-24 | 2026-08-22 | updated | 2026-08-22 | n/a |
| 146 | [Getting Started with TanStack Start and Convex (2026 Guide)](../src/content/posts/tanstack-start-get-start.mdx) | 2025-04-29 | 2026-08-23 | updated | 2026-08-23 | n/a |
| 147 | [uv run: Run Python Scripts With Zero Dependency Management](../src/content/posts/uv-run-scripts-guide.mdx) | 2025-07-08 | 2026-08-23 | updated | 2026-08-23 | n/a |
| 148 | [Deploy Hindsight Agent Memory on Docker: Complete Setup Guide](../src/content/posts/hindsight-docker-deploy.mdx) | 2026-07-03 | 2026-08-24 | updated | 2026-08-24 | 2026-08-24 |
| 149 | [Sed Search and Replace: Master Advanced Techniques](../src/content/posts/sed-search-replace.mdx) | 2023-11-24 | 2026-08-24 | updated | 2026-08-24 | n/a |
| 150 | [Python Text-to-Speech with uv: Create Audio from Text](../src/content/posts/uv-text-to-speech-script.mdx) | 2025-07-08 | 2026-08-24 | updated | 2026-08-24 | n/a |
| 151 | [Kimi K2 in 2026: What to Use Now (K2.5, K2.6, K3)](../src/content/posts/kimi-k2-ai-model.mdx) | 2025-07-15 | 2026-08-25 | updated | 2026-08-25 | n/a |
| 152 | [Kiro AI IDE Review 2026: Spec-Driven Coding, CLI & Crew](../src/content/posts/kiro-ai-ide.mdx) | 2025-07-15 | 2026-08-25 | updated | 2026-08-25 | n/a |
| 153 | [Add Users to a Docker Container: Non-Root User Guide](../src/content/posts/add-users-to-docker-container.mdx) | 2023-07-03 | 2026-08-26 | updated | 2026-08-26 | n/a |
| 154 | [Rsync Exclude Files & Directories: Copy to a Remote Machine](../src/content/posts/exclude-directories-files-copy-remote-machine.mdx) | 2023-07-07 | 2026-08-26 | updated | 2026-08-26 | n/a |
| 155 | [Bulk URL Checker with uv: Find Broken Links in Python](../src/content/posts/uv-url-checker-script.mdx) | 2025-07-24 | 2026-08-27 | updated | 2026-08-27 | n/a |
| 156 | [Best AI Skills for Web Design: Agent Skills Compared (2026)](../src/content/posts/best-ai-skills-for-web-design.mdx) | 2026-08-28 | 2026-08-28 | not updated | not updated (file 2026-08-28) | not updated (file 2026-11-15) |
| 157 | [Podman vs Docker: Which Container Tool in 2026-2027?](../src/content/posts/podman-vs-docker.mdx) | 2024-07-17 | 2026-08-28 | updated | 2026-08-28 | n/a |
| 158 | [What Postgres Can Replace: Redis, Elasticsearch, MongoDB and More (2026)](../src/content/posts/what-postgres-replaces.mdx) | 2026-08-28 | 2026-08-28 | not updated | not updated (file 2026-08-28) | n/a |
| 159 | [Why You Need a Home Server in 2026: Digital Independence](../src/content/posts/why-need-home-server.mdx) | 2025-07-28 | 2026-08-28 | updated | 2026-08-28 | n/a |
| 160 | [Disk Imaging and Cloning with Linux dd Command](../src/content/posts/linux-dd-command-guide.mdx) | 2025-07-29 | 2026-08-29 | updated | 2026-08-29 | n/a |
| 161 | [NFS Linux Setup: Complete Shareable Network Drive Guide](../src/content/posts/setup-nfs-linux.mdx) | 2025-07-29 | 2026-08-29 | updated | 2026-08-29 | n/a |
| 162 | [Setup Samba Linux: Complete Guide to a Shareable Drive](../src/content/posts/setup-samba-linux.mdx) | 2025-07-29 | 2026-08-30 | updated | 2026-11-13 | n/a |
| 163 | [Setup WebDAV Server with Nginx on Linux (2026 Guide)](../src/content/posts/setup-webdav-nginx.mdx) | 2025-07-29 | 2026-08-30 | updated | 2026-08-30 | n/a |
| 164 | [Self-Host SearXNG: Private Search Engine With Docker](../src/content/posts/searxng-self-host-privacy-search.mdx) | 2025-07-29 | 2026-08-31 | updated | 2026-08-31 | n/a |
| 165 | [How to Self-Host Stirling PDF (Docker, Traefik, Dokploy)](../src/content/posts/stirling-pdf-self-host-manipulation.mdx) | 2025-07-29 | 2026-08-31 | updated | 2026-08-31 | n/a |
| 166 | [How to Add YouTube Videos to Your Astro Blog (SSG + SSR)](../src/content/posts/add-youtube-videos-astro-blog.mdx) | 2025-07-30 | 2026-09-01 | updated | 2026-09-01 | n/a |
| 167 | [Google Opal AI App Builder: Build Mini-Apps Without Code](../src/content/posts/google-opal-ai-app-builder.mdx) | 2025-07-30 | 2026-09-01 | updated | 2026-09-01 | n/a |
| 168 | [Build a Real-Time App with Astro and Convex (2026 Tutorial)](../src/content/posts/astro-convex-realtime-app.mdx) | 2025-07-31 | 2026-09-02 | updated | 2026-09-02 | n/a |
| 169 | [Deploy Astro + Convex to Vercel: 2026 Production Setup](../src/content/posts/astro-convex-vercel-deployment.mdx) | 2025-07-31 | 2026-09-02 | updated | 2026-09-02 | n/a |
| 170 | [How to Add a Sidebar Menu to Your Carrd Website (2026)](../src/content/posts/carrd-sidebar-menu.mdx) | 2025-08-04 | 2026-09-03 | updated | 2026-09-03 | 2026-09-03 |
| 171 | [How to Self-Host n8n in 2026 (Docker, Traefik & Dokploy)](../src/content/posts/n8n-self-host-workflow-automation.mdx) | 2025-08-04 | 2026-09-03 | updated | 2026-09-03 | n/a |
| 172 | [Astro i18n: Add Localization to Your Site (Complete Guide)](../src/content/posts/astro-i18n-localization.mdx) | 2025-09-05 | 2026-09-04 | updated | 2026-09-04 | n/a |
| 173 | [Astro Build Speed Optimization: 35 to 127 Pages/Second](../src/content/posts/astro-ssg-build-optimization.mdx) | 2025-09-05 | 2026-09-04 | updated | 2026-09-04 | n/a |
| 174 | [AI Affiliate Websites with Amazon Products (2026 Guide)](../src/content/posts/ai-affiliate-websites-amazon.mdx) | 2025-10-06 | 2026-09-10 | updated | 2026-09-10 | n/a |
| 175 | [Amp Code Free Is Paused: What It Was and What to Use Instead](../src/content/posts/amp-code-free-ai-coding-agent.mdx) | 2025-10-16 | 2026-09-10 | updated | 2026-09-10 | n/a |
| 176 | [Astro vs WordPress in 2026: An Operator's Honest Cost & Ops Breakdown](../src/content/posts/astro-vs-wordpress.mdx) | 2026-09-10 | 2026-09-10 | not updated | not updated (file 2026-10-19) | n/a |
| 177 | [Best 32-Inch 4K OLED Monitors 2026: 9 Picks Compared](../src/content/posts/best-32-inch-oled-monitors-guide.mdx) | 2025-09-29 | 2026-09-10 | updated | 2026-09-10 | n/a |
| 178 | [Best Headless CMS for Astro in 2026: From No CMS to Enterprise](../src/content/posts/best-headless-cms-for-astro.mdx) | 2026-07-21 | 2026-09-10 | updated | 2026-09-10 | n/a |
| 179 | [BrightData MCP: AI Web Scraping Guide (5000 Free Requests)](../src/content/posts/brightdata-mcp-guide.mdx) | 2025-10-06 | 2026-09-10 | updated | 2026-09-10 | n/a |
| 180 | [Dokploy Install: Self-Host Your SaaS, Ditch Vercel & Heroku](../src/content/posts/dokploy-install.mdx) | 2024-06-11 | 2026-09-11 | updated | 2026-09-11 | n/a |
| 181 | [GitHub Copilot Pro: Best $10 AI Coding Plan with Zed IDE & CLI](../src/content/posts/github-copilot-complete-guide.mdx) | 2025-10-20 | 2026-09-11 | updated | 2026-09-11 | n/a |
| 182 | [ASUS Master Thunderbolt 5 Dock DC510 Review: Real-World Testing & Performance](../src/content/posts/asus-thunderbolt-5-dock-dc510-review.mdx) | 2025-10-27 | 2026-09-12 | updated | 2026-09-12 | n/a |
| 183 | [ASUS DC510 vs Razer Thunderbolt 5 Dock: Which One Wins?](../src/content/posts/asus-vs-razer-thunderbolt-5-comparison.mdx) | 2025-10-27 | 2026-09-12 | updated | 2026-09-12 | n/a |
| 184 | [Run AI CLI Tools in Docker or Podman Safely (2026 Guide)](../src/content/posts/docker-podman-ai-cli-tools-safe-environment.mdx) | 2025-11-05 | 2026-09-13 | updated | 2026-09-13 | n/a |
| 185 | [Deploy TanStack Start on Your VPS with Dokploy - Complete Guide](../src/content/posts/tanstack-start-dokploy-deploy.mdx) | 2025-10-29 | 2026-09-13 | updated | 2026-09-13 | n/a |
| 186 | [How to Start Programming with AI: 2026 Beginner's Guide](../src/content/posts/ai-programming-beginners-guide.mdx) | 2025-11-12 | 2026-09-14 | updated | 2026-09-14 | n/a |
| 187 | [Configure Dokploy Backups with Cloudflare R2 - Complete Guide](../src/content/posts/dokploy-backups-cloudflare-r2.mdx) | 2025-11-12 | 2026-09-14 | updated | 2026-09-14 | n/a |
| 188 | [How to Self-Host Cognee with Dokploy or Docker Compose](../src/content/posts/cognee-self-host.mdx) | 2025-12-05 | 2026-09-15 | updated | 2026-09-15 | n/a |
| 189 | [Convex Self-Hosted vs Cloud Free Tier: 2026 Benchmarks](../src/content/posts/convex-self-hosted-benchmark.mdx) | 2025-11-25 | 2026-09-15 | updated | 2026-09-15 | n/a |
| 190 | [How to Self-Host Your Newsletter with Notifuse (2026 Guide)](../src/content/posts/notifuse-self-host-newsletter.mdx) | 2025-11-12 | 2026-09-15 | updated | 2026-09-15 | n/a |
| 191 | [Beszel & Uptime Kuma on Dokploy: Server Monitoring Guide](../src/content/posts/beszel-uptime-kuma.mdx) | 2025-12-05 | 2026-09-16 | updated | 2026-09-16 | n/a |
| 192 | [What Is MCP (Model Context Protocol)? Beginner's Guide 2026](../src/content/posts/mcp-introduction-beginners.mdx) | 2025-12-05 | 2026-09-18 | updated | 2026-09-18 | n/a |
| 193 | [Self-Host RustFS in 2026: Dokploy or Docker Compose Guide](../src/content/posts/rustfs-self-host.mdx) | 2025-12-05 | 2026-09-18 | updated | 2026-09-18 | n/a |
| 194 | [Python Video Intro Editor: Silero VAD + MoviePy on Mac](../src/content/posts/python-video-intro-editor.mdx) | 2025-12-09 | 2026-09-19 | updated | 2026-09-19 | 2026-09-19 |
| 195 | [Sed Delete Lines: Advanced Techniques & Practical Examples](../src/content/posts/sed-delete-lines.mdx) | 2023-11-24 | 2026-09-19 | updated | 2026-09-19 | n/a |
| 196 | [Docker Compose Secrets: What Works & Secure Alternatives](../src/content/posts/docker-compose-secrets.mdx) | 2024-09-06 | 2026-09-20 | updated | 2026-09-20 | n/a |
| 197 | [Starship + Ghostty: Turbocharge Your Mac Terminal Setup](../src/content/posts/starship-ghostty-terminal.mdx) | 2025-05-20 | 2026-09-20 | updated | 2026-09-20 | 2026-09-20 |
| 198 | [How to Build a Link Shortener in Astro (Static Redirect Pages)](../src/content/posts/astro-link-shortener.mdx) | 2026-09-20 | 2026-09-21 | updated | not updated (file 2026-10-19) | n/a |
| 199 | [Best 2.5GbE and 10GbE Switch for a Homelab (2026)](../src/content/posts/best-2-5-10gbe-switch-homelab.mdx) | 2026-09-22 | 2026-09-21 | not updated | 2026-11-05 | n/a |
| 200 | [Best Mini PC for Local LLMs and Ollama (2026)](../src/content/posts/best-mini-pc-local-llm.mdx) | 2026-09-22 | 2026-09-21 | not updated | 2026-09-21 | n/a |
| 201 | [Best Mini PC for Proxmox in 2026](../src/content/posts/best-mini-pc-proxmox.mdx) | 2026-09-22 | 2026-09-21 | not updated | 2026-11-05 | n/a |
| 202 | [Best Thunderbolt 5 Dock for MacBook Pro (2026)](../src/content/posts/best-tb5-dock-macbook-pro.mdx) | 2026-09-22 | 2026-09-21 | not updated | 2026-09-21 | n/a |
| 203 | [Best Thunderbolt 5 NVMe SSD Enclosures 2026: 80Gbps Picks Compared](../src/content/posts/best-tb5-nvme-enclosures.mdx) | 2026-09-21 | 2026-09-21 | not updated | 2026-11-13 | 2026-09-21 |
| 204 | [Best UPS for Home Servers 2026: CyberPower vs APC vs EcoFlow](../src/content/posts/best-ups-for-home-server.mdx) | 2026-09-21 | 2026-09-21 | not updated | 2026-09-21 | n/a |
| 205 | [CalDigit TS5 vs Anker Prime TB5 (2026): Which Thunderbolt 5 Dock to Buy](../src/content/posts/caldigit-ts5-vs-anker-prime-tb5.mdx) | 2026-09-21 | 2026-09-21 | not updated | 2026-09-21 | n/a |
| 206 | [Termix Self-Hosted SSH Manager: Docker & Dokploy Setup](../src/content/posts/termix-self-host.mdx) | 2025-12-19 | 2026-09-21 | updated | 2026-09-21 | n/a |
| 207 | [Carrd Dark Mode: How to Add a Theme Toggle (2026 Guide)](../src/content/posts/carrd-dark-mode-toggle.mdx) | 2026-01-21 | 2026-09-22 | updated | 2026-09-22 | 2026-09-22 |
| 208 | [Carrd Popup Modal: How to Add One to Your Site (2026)](../src/content/posts/carrd-popup-modal.mdx) | 2026-01-21 | 2026-09-22 | updated | 2026-09-22 | 2026-09-22 |
| 209 | [Self-Host Jellyfin: Your Own Netflix on a VPS (2026 Guide)](../src/content/posts/self-host-jellyfin.mdx) | 2026-09-22 | 2026-09-22 | not updated | 2026-11-13 | n/a |
| 210 | [Tugtainer: Auto-Update Docker Containers (Self-Hosted)](../src/content/posts/tugtainer-docker-autoupdate.mdx) | 2026-01-05 | 2026-09-22 | updated | 2026-09-22 | 2026-09-22 |
| 211 | [16 Best Mini PCs for a Home Server in 2026 (7W N150 to 10GbE)](../src/content/posts/best-mini-pc-home-server.mdx) | 2024-09-13 | 2026-09-23 | updated | 2026-11-13 | 2026-09-23 |
| 212 | [Carrd.co Review 2026: The Best Budget Landing Page Builder](../src/content/posts/carrd-review.mdx) | 2023-05-23 | 2026-09-23 | updated | 2026-09-23 | 2026-09-23 |
| 213 | [Carrd Smooth Scroll: Native Anchor Links + Custom Code](../src/content/posts/carrd-smooth-scroll.mdx) | 2026-01-21 | 2026-09-23 | updated | 2026-09-23 | 2026-09-23 |
| 214 | [VPS Price Increases in 2026: What Happened and When a Mini PC Wins](../src/content/posts/vps-price-increases.mdx) | 2026-09-23 | 2026-09-23 | not updated | 2026-11-13 | n/a |
| 215 | [Carrd Testimonial Slider: How to Add One (Copy-Paste Code)](../src/content/posts/carrd-testimonial-slider.mdx) | 2026-01-21 | 2026-09-24 | updated | 2026-09-24 | 2026-09-24 |
| 216 | [How to Add a WhatsApp Chat Button to Carrd (2026 Guide)](../src/content/posts/carrd-whatsapp-button.mdx) | 2026-01-21 | 2026-09-24 | updated | 2026-09-24 | 2026-09-24 |
| 217 | [How to Benchmark Cloud Servers (VPS) in 2026: YABS & More](../src/content/posts/benchmark-cloud-servers.mdx) | 2025-03-07 * | 2026-09-25 | updated | 2026-09-25 | n/a |
| 218 | [Composio MCP Guide: Connect Codex, Claude Code & Mastra to 1,500+ Apps](../src/content/posts/composio-mcp-guide.mdx) | 2026-09-25 | 2026-09-25 | not updated | not updated (file 2026-10-19) | n/a |
| 219 | [Executor.sh: Self-Hosted Open-Source Composio Alternative](../src/content/posts/executor-sh-vs-composio.mdx) | 2026-07-15 | 2026-09-25 | updated | 2026-09-25 | n/a |
| 220 | [Fish Audio Review: Free Tier, Pricing & Voice Cloning Tested](../src/content/posts/fish-audio-review.mdx) | 2026-07-02 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 221 | [How to Embed YouTube Videos in Gatsby (MDX + Markdown)](../src/content/posts/embed-youtube-videos-to-gatsby.mdx) | 2025-03-07 * | 2026-09-26 | updated | 2026-09-26 | n/a |
| 222 | [Best Gatsby.js Online Courses in 2026 (Still Worth Taking?)](../src/content/posts/gatsby-js-online-courses.mdx) | 2025-03-07 * | 2026-09-26 | updated | 2026-09-26 | n/a |
| 223 | [How To Install CloudPanel and Host Node.js Apps (2026)](../src/content/posts/install-cloudpanel-host-nodejs.mdx) | 2025-03-07 * | 2026-09-27 | updated | 2026-09-27 | n/a |
| 224 | [Astro YouTube Embed: Add Responsive Videos to MDX (2026)](../src/content/posts/responsive-youtube-astrojs.mdx) | 2025-03-07 * | 2026-09-27 | updated | 2026-09-27 | n/a |
| 225 | [Coolify Install: Free Self-Hosted Heroku Alternative](../src/content/posts/coolify-install-heroku-alternative.mdx) | 2025-03-07 * | 2026-09-28 | updated | 2026-09-28 | n/a |
| 226 | [How to Deploy Astro on a VPS with CloudPanel (2026 Guide)](../src/content/posts/deploy-astro-on-vps.mdx) | 2025-03-07 * | 2026-09-28 | updated | 2026-09-28 | n/a |
| 227 | [Meta Muse AI Review (2026): Linux VM, VPN Signup & 1B Free Tokens](../src/content/posts/muse-ai-meta-agent.mdx) | 2026-09-28 | 2026-09-28 | not updated | not updated (file 2026-10-19) | not updated (file 2026-11-15) |
| 228 | [Uptime Kuma vs Gatus (2026): Which Should You Self-Host?](../src/content/posts/uptime-kuma-vs-gatus.mdx) | 2026-09-28 | 2026-09-28 | not updated | not updated (file 2026-10-19) | n/a |
| 229 | [How to Deploy Uptime Kuma With One Click (Coolify 2026)](../src/content/posts/deploy-uptime-kuma.mdx) | 2025-03-07 * | 2026-09-29 | updated | 2026-09-29 | n/a |
| 230 | [EmDash CMS Review: 6 Months In, After the 1.0 Release](../src/content/posts/emdash-cms-review.mdx) | 2026-09-29 | 2026-09-29 | not updated | not updated (file 2026-10-19) | not updated (file 2026-11-15) |
| 231 | [EmDash CMS Tutorial: Build Your First Site Step by Step](../src/content/posts/emdash-cms-tutorial.mdx) | 2026-09-29 | 2026-09-29 | not updated | not updated (file 2026-10-19) | n/a |
| 232 | [Shots.so: Free Mockup Generator for Screenshots and Devices](../src/content/posts/shots-so-mockups.mdx) | 2025-03-07 * | 2026-09-29 | updated | 2026-09-29 | n/a |
| 233 | [How to Convert Images to SVG Free With Vectorizer.ai](../src/content/posts/convert-images-to-svg.mdx) | 2025-03-07 * | 2026-09-30 | updated | 2026-09-30 | n/a |
| 234 | [How to Build a Custom EmDash Theme: Tokens, Blocks, and Seed Schema](../src/content/posts/emdash-custom-theme.mdx) | 2026-09-30 | 2026-09-30 | not updated | not updated (file 2026-10-19) | n/a |
| 235 | [How to Install Plausible Analytics With One Click (2026)](../src/content/posts/install-plausible-analytics.mdx) | 2025-03-07 * | 2026-09-30 | updated | 2026-09-30 | n/a |
| 236 | [Docker COPY Multiple Files in One Layer (Dockerfile Guide)](../src/content/posts/copy-multiple-files-in-one-layer-using-a-dockerfile.mdx) | 2025-03-07 * | 2026-10-01 | updated | 2026-10-01 | 2026-10-01 |
| 237 | [Shottr Mac Screenshot Tool: Fast, Free, Pixel-Perfect (2026)](../src/content/posts/shottr-mac-screenshot-tool.mdx) | 2025-03-07 * | 2026-10-01 | updated | 2026-10-01 | n/a |
| 238 | [How To Add Accordion FAQs Drop-Down to Carrd.co (Free Code)](../src/content/posts/add-accordion-carrd.mdx) | 2025-03-07 * | 2026-10-02 | updated | 2026-10-02 | 2026-10-02 |
| 239 | [How to Redirect Docker Logs to a Single File (3 Methods)](../src/content/posts/redirect-docker-logs-to-a-single-file.mdx) | 2025-03-07 * | 2026-10-02 | updated | 2026-10-02 | n/a |
| 240 | [How To Add A Contact Form To Astro (Free, No Backend)](../src/content/posts/add-contact-form-astro.mdx) | 2025-03-07 * | 2026-10-03 | updated | 2026-10-03 | n/a |
| 241 | [Easypanel Review: A Modern Hosting Panel for Your VPS (2026)](../src/content/posts/easypanel-modern-server-control-panel.mdx) | 2025-03-07 * | 2026-10-03 | updated | 2026-10-03 | n/a |
| 242 | [Best Oh My ZSH Plugins for 2026: No Git Clone Needed](../src/content/posts/best-oh-my-zsh-plugins.mdx) | 2025-03-07 * | 2026-10-04 | updated | 2026-10-04 | 2026-10-04 |
| 243 | [How to Deploy Astro on Your VPS with EasyPanel (2026)](../src/content/posts/deploy-astro-easypanel.mdx) | 2025-03-07 * | 2026-10-04 | updated | 2026-10-04 | n/a |
| 244 | [Deploy EmDash on Cloudflare Workers: D1, R2 & Free Tier](../src/content/posts/deploy-emdash-cloudflare-workers.mdx) | 2026-10-05 | 2026-10-05 | not updated | 2026-10-18 | n/a |
| 245 | [Send Email from an EmDash Site: Cloudflare Email Sending & SMTP](../src/content/posts/emdash-send-email.mdx) | 2026-10-05 | 2026-10-05 | not updated | 2026-10-18 | n/a |
| 246 | [Sed Change Case: Lowercase, Uppercase & Title Case Examples](../src/content/posts/sed-change-case.mdx) | 2025-03-07 * | 2026-10-05 | updated | 2026-10-05 | n/a |
| 247 | [Sed Insert and Append Text: Examples & macOS Gotchas](../src/content/posts/sed-insert-append-text.mdx) | 2025-03-07 * | 2026-10-05 | updated | 2026-10-05 | n/a |
| 248 | [Deploy EmDash with Docker: Postgres, S3 Media & Real Benchmarks](../src/content/posts/deploy-emdash-docker.mdx) | 2026-10-06 | 2026-10-06 | not updated | 2026-10-18 | n/a |
| 249 | [How to Use Docker Environment Variables: ARG vs ENV](../src/content/posts/docker-env-vars.mdx) | 2025-03-07 * | 2026-10-06 | updated | 2026-10-18 | n/a |
| 250 | [Dockge Install - Docker Compose Manager for Self-Hosting](../src/content/posts/dockge-install.mdx) | 2025-03-07 * | 2026-10-06 | updated | not updated (file 2026-02-16) | n/a |
| 251 | [Streamlit vs. NiceGUI (2026): Best Python Web Framework](../src/content/posts/streamlit-vs-nicegui.mdx) | 2025-03-07 * | 2026-10-07 | updated | 2026-10-18 | 2026-10-07 |
| 252 | [Zoxide Tutorial: Smarter Terminal Navigation (2026)](../src/content/posts/zoxide.mdx) | 2025-03-07 * | 2026-10-07 | updated | 2026-10-18 | n/a |
| 253 | [Bun Update Packages: How to Update to the Latest Version](../src/content/posts/bun-update-packages.mdx) | 2025-03-07 * | 2026-10-08 | updated | 2026-10-18 | n/a |
| 254 | [NiceGUI Tutorial: Build a Python GUI App in 5 Minutes](../src/content/posts/nicegui-get-started.mdx) | 2025-03-07 * | 2026-10-08 | updated | 2026-10-18 | n/a |
| 255 | [Docker Overlay2 Cleanup: Reclaim Disk Space Safely (2026)](../src/content/posts/clean-docker-overlay2-dir.mdx) | 2025-03-07 * | 2026-10-09 | updated | 2026-10-18 | n/a |
| 256 | [How to Install FlowiseAI with Docker Compose (2026)](../src/content/posts/flowiseai-install.mdx) | 2025-03-07 * | 2026-10-09 | updated | 2026-10-18 | n/a |
| 257 | [How to Install Langflow with Docker Compose (2026 Guide)](../src/content/posts/langflow-docker-install.mdx) | 2025-03-07 * | 2026-10-10 | updated | 2026-10-18 | n/a |
| 258 | [Langfuse Docker Install: Self-Hosted LangSmith Alternative](../src/content/posts/langfuse-docker-install.mdx) | 2025-03-07 * | 2026-10-10 | updated | 2026-10-18 | n/a |
| 259 | [Multiple Postgres Databases in One Docker Compose Service](../src/content/posts/multiple-postgres-databases-docker.mdx) | 2025-03-07 * | 2026-10-11 | updated | 2026-10-18 | n/a |
| 260 | [Ollama Docker Compose: Setup Guide with Open WebUI (2026)](../src/content/posts/ollama-docker-install.mdx) | 2025-03-07 * | 2026-10-11 | updated | 2026-10-18 | n/a |
| 261 | [LiteLLM Docker Compose Install: 2026 Self-Host Guide](../src/content/posts/litellm-docker-install.mdx) | 2025-03-07 * | 2026-10-12 | updated | 2026-10-18 | 2026-10-12 |
| 262 | [Install tmux on MacOS and Basics Commands for Beginners](../src/content/posts/tmux-basics.mdx) | 2025-03-07 * | 2026-10-12 | updated | 2026-10-18 | n/a |
| 263 | [Docker Containers for Business: 20+ Best Self-Hosted Apps](../src/content/posts/docker-containers-business.mdx) | 2025-03-07 * | 2026-10-13 | updated | 2026-10-18 | 2026-10-13 |
| 264 | [Ghostty Terminal: The Complete Mac Setup Guide (2026)](../src/content/posts/ghostty-terminal.mdx) | 2025-03-07 * | 2026-10-13 | updated | 2026-10-18 | 2026-10-13 |
| 265 | [Best 125+ Docker Containers for Home Server in 2026](../src/content/posts/docker-containers-home-server.mdx) | 2025-03-07 * | 2026-10-14 | updated | 2026-11-13 | 2026-10-14 |
| 266 | [Railpack vs Nixpacks (2026): Which One Should You Use Now?](../src/content/posts/nixpacks-vs-railpack.mdx) | 2025-03-12 | 2026-10-14 | updated | 2026-10-18 | n/a |
| 267 | [How to Build a Free Astro Blog with Cloudflare in 30 Minutes](../src/content/posts/build-astro-blog-free.mdx) | 2025-04-07 | 2026-10-15 | updated | 2026-10-18 | n/a |
| 268 | [Best Open Source LLMs to Replace Claude Opus 5.5 (2026)](../src/content/posts/best-open-source-llms-claude-alternative.mdx) | 2025-07-30 | 2026-10-16 | updated | 2026-10-16 | 2026-10-16 |
| 269 | [Freebuff Review 2026: 30h/Day Free AI Coding Agent Tested (CLI & Desktop)](../src/content/posts/freebuff-free-ai-coding-agent.mdx) | 2026-07-01 | 2026-10-16 | updated | 2026-10-18 | 2026-10-16 |
| 270 | [Google ADK OpenRouter: Use Any Model in Your AI Agent](../src/content/posts/google-adk-openrouter-models.mdx) | 2025-04-10 | 2026-10-16 | updated | 2026-10-18 | n/a |
| 271 | [Hetzner Cloud Review 2026: Still Worth It After Price Hike?](../src/content/posts/hetzner-cloud-review.mdx) | 2025-07-10 | 2026-10-16 | updated | 2026-10-18 | n/a |
| 272 | [Extend Muse AI With Custom MCPs: TinyFish, Composio & Fish Audio](../src/content/posts/muse-tinyfish-search-fetch.mdx) | 2026-10-16 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 273 | [OpenCode Go Plan Review (2026): $10 vs $40 Go Plus, Limits & Models](../src/content/posts/opencode-go-plan.mdx) | 2026-05-21 | 2026-11-27 | updated | 2026-10-16 | 2026-11-27 |
| 274 | [TinyFish Review: Free Web Search and Fetch API for AI Coding Agents](../src/content/posts/tinyfish-ai-agents-web-search.mdx) | 2026-05-13 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 275 | [Free Web Search for AI Coding Agents: TinyFish Search + Fetch Setup Guide](../src/content/posts/tinyfish-free-search-coding-agents.mdx) | 2026-07-10 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 276 | [Best Thunderbolt 5 Docks 2026: CalDigit vs Anker vs Budget](../src/content/posts/best-thunderbolt-5-docks-guide.mdx) | 2025-09-29 | 2026-10-17 | updated | 2026-10-18 | 2026-10-17 |
| 277 | [Hetzner Cloud Pricing & Cost-Optimized Plans (2026): CX23, CPX & Alternatives](../src/content/posts/hetzner-cloud-cost-optimized-plans.mdx) | 2025-10-16 | 2026-10-20 | updated | 2026-10-20 | 2026-10-20 |
| 278 | [Tern: Stencil's Rust-Native Terminal Is a Whole Dev Workspace](../src/content/posts/tern-terminal.mdx) | 2026-10-20 | 2026-10-20 | not updated | 2026-10-20 | 2026-10-20 |
| 279 | [How to Use Claude Sonnet 5.5, GPT-6, Gemini 3.1 for FREE](../src/content/posts/use-claude-sonnet-4-5-gpt-5-free.mdx) | 2025-10-10 | 2026-10-20 | updated | 2026-10-20 | 2026-10-20 |
| 280 | [Self-Host Convex in 2026: Docker Compose & Dokploy Guide](../src/content/posts/convex-self-host.mdx) | 2025-11-24 | 2026-10-21 | updated | 2026-10-21 | n/a |
| 281 | [VibeProxy Guide: Use Claude, Codex & Gemini in Any AI Tool](../src/content/posts/vibeproxy-ai-subscriptions-guide.mdx) | 2025-12-08 | 2026-10-21 | updated | 2026-10-21 | n/a |
| 282 | [Carrd Countdown Timer: 5 Custom Designs (Copy-Paste Code)](../src/content/posts/carrd-countdown-styling.mdx) | 2026-01-21 | 2026-10-22 | updated | 2026-10-22 | 2026-10-22 |
| 283 | [Zerobyte Restic GUI: Self-Hosted Backup Automation (2026)](../src/content/posts/zerobyte-restic-gui.mdx) | 2025-12-19 | 2026-10-22 | updated | 2026-10-22 | 2026-10-22 |
| 284 | [Best 10-Inch Mini Rack for a Homelab (2026): Racks and a Full Parts List](../src/content/posts/best-10-inch-mini-rack.mdx) | 2026-10-23 | 2026-10-23 | not updated | 2026-10-23 | 2026-10-23 |
| 285 | [Best Home Assistant Hardware (2026): Green vs Mini PC vs Raspberry Pi 5](../src/content/posts/best-home-assistant-hardware.mdx) | 2026-10-23 | 2026-10-23 | not updated | 2026-11-13 | 2026-10-23 |
| 286 | [Best Mac mini for OpenClaw (2026): Which Model You Actually Need](../src/content/posts/best-mac-mini-for-openclaw.mdx) | 2026-10-23 | 2026-10-23 | not updated | 2026-11-05 | n/a |
| 287 | [Best Mini PC for Plex & Jellyfin (2026): Transcodes per Watt](../src/content/posts/best-mini-pc-plex-jellyfin.mdx) | 2026-10-23 | 2026-10-23 | not updated | 2026-11-05 | n/a |
| 288 | [Best Rack Mount UPS for a Homelab & NAS (2026): 1U, 2U and LiFePO4](../src/content/posts/best-rack-mount-ups-homelab.mdx) | 2026-10-23 | 2026-10-23 | not updated | 2026-10-23 | n/a |
| 289 | [OpenClaw Setup Guide: 24/7 AI Assistant on VPS or Mac Mini](../src/content/posts/clawdbot-setup-guide.mdx) | 2026-01-26 | 2026-10-23 | updated | 2026-10-23 | n/a |
| 290 | [Cloudreve Docker Setup: Self-Host with Cloudflare Tunnels](../src/content/posts/cloudreve-docker-setup.mdx) | 2026-01-23 | 2026-10-23 | updated | not updated (file 2026-10-24) | n/a |
| 291 | [How to Build a Discord AI Bot with Agno (Teams & Memory)](../src/content/posts/create-your-own-ai-agent.mdx) | 2026-02-03 | 2026-10-24 | updated | 2026-02-06 | n/a |
| 292 | [How to Update Docker Compose Stacks in Dokploy (2026)](../src/content/posts/dokploy-update-docker-compose.mdx) | 2026-01-29 | 2026-10-24 | updated | not updated (file 2026-10-24) | n/a |
| 293 | [My AI Assistant Deploys Docker Apps With a Single Message](../src/content/posts/ai-docker-deploy-skill.mdx) | 2026-02-09 | 2026-10-25 | updated | not updated (file 2026-10-24) | n/a |
| 294 | [Arcane Docker Install: Self-Hosted Container Manager](../src/content/posts/arcane-docker-install.mdx) | 2026-02-09 | 2026-10-26 | updated | 2026-10-26 | 2026-10-26 |
| 295 | [Arcane vs Dockhand: Which Docker Manager Should You Choose?](../src/content/posts/arcane-vs-dockhand.mdx) | 2026-02-09 | 2026-10-26 | updated | 2026-10-26 | 2026-10-26 |
| 296 | [Tech Gadgets Worth Owning Before 2027: 18 Picks That Pull Their Weight](../src/content/posts/best-tech-gadgets-2027.mdx) | 2026-10-24 | 2026-10-26 | updated | 2026-11-05 | 2026-10-26 |
| 297 | [Dockhand Docker Install: Security-Focused Container Manager](../src/content/posts/dockhand-docker-install.mdx) | 2026-02-09 | 2026-10-26 | updated | 2026-10-26 | n/a |
| 298 | [FluidVoice: Free Open-Source Dictation App for Mac & Windows](../src/content/posts/fluidvoice-mac-dictation.mdx) | 2026-07-13 | 2026-10-26 | updated | 2026-11-05 | n/a |
| 299 | [Replace Your Smart TV's Home Screen and Remove the Ads: Every Repo, by TV OS](../src/content/posts/smart-tv-custom-home-screen-remove-ads.mdx) | 2026-10-26 | 2026-10-26 | not updated | not updated (file 2026-10-26) | not updated (file 2026-11-15) |
| 300 | [How to Get More YouTube Subscribers with Promotions (What ~$98 Actually Buys)](../src/content/posts/youtube-promotions-subscribers.mdx) | 2026-10-26 | 2026-10-26 | not updated | 2026-10-26 | n/a |
| 301 | [OpenClaw Alternatives in 2026: 10 Self-Hosted AI Assistants](../src/content/posts/openclaw-alternatives.mdx) | 2026-02-10 | 2026-10-27 | updated | 2026-10-27 | n/a |
| 302 | [Best Portainer Alternatives in 2026 (All Free, Tested)](../src/content/posts/portainer-alternatives.mdx) | 2026-02-13 | 2026-10-27 | updated | 2026-11-13 | 2026-10-27 |
| 303 | [UsulNet Docker Install: All-in-One Container Management](../src/content/posts/usulnet-docker-install.mdx) | 2026-02-11 | 2026-10-27 | updated | 2026-10-27 | n/a |
| 304 | [Best Open Source Models for OpenClaw (2026 Update)](../src/content/posts/best-opensource-models-for-openclaw.mdx) | 2026-02-15 | 2026-10-28 | updated | 2026-10-28 | n/a |
| 305 | [DuckDuckGo OpenClaw Search: Free Web Search Without API Keys](../src/content/posts/duckduckgo-openclaw-search.mdx) | 2026-02-15 | 2026-10-28 | updated | 2026-10-28 | n/a |
| 306 | [OpenCode 2 vs Pi Agent (1.0 & Durable): Which Coding Agent Wins?](../src/content/posts/opencode-vs-pi-agent.mdx) | 2026-04-30 | 2026-10-28 | updated | 2026-10-28 | 2026-10-28 |
| 307 | [NanoBot Setup Guide: GLM-5.3 & MiniMax M3.1 on Your VPS](../src/content/posts/nanobot-setup-guide.mdx) | 2026-02-16 | 2026-10-29 | updated | 2026-10-29 | n/a |
| 308 | [ZeroClaw Setup: MiniMax M3, GLM-5.3 & Discord on Your VPS](../src/content/posts/zeroclaw-setup-guide.mdx) | 2026-02-16 | 2026-10-29 | updated | not updated (file 2026-02-16) | n/a |
| 309 | [Best DAS / JBOD Enclosure for a Homelab (2026)](../src/content/posts/best-das-enclosure-homelab.mdx) | 2026-10-30 | 2026-10-30 | not updated | 2026-10-30 | 2026-10-30 |
| 310 | [Best Mac mini Dock with SSD Enclosure (2026): Stands Worth Buying](../src/content/posts/best-mac-mini-dock.mdx) | 2026-10-30 | 2026-10-30 | not updated | 2026-10-30 | n/a |
| 311 | [Best Mini PC for OPNsense & pfSense Firewalls (2026)](../src/content/posts/best-mini-pc-opnsense.mdx) | 2026-10-30 | 2026-10-30 | not updated | 2026-10-30 | 2026-10-30 |
| 312 | [Best OpenClaw Dashboards & Command Centers in 2026](../src/content/posts/best-openclaw-dashboards.mdx) | 2026-02-18 | 2026-10-30 | updated | 2026-11-05 | n/a |
| 313 | [Best Travel Router for Remote Work (2026): WireGuard & Tailscale](../src/content/posts/best-travel-router-wireguard-tailscale.mdx) | 2026-10-30 | 2026-10-30 | not updated | 2026-10-30 | n/a |
| 314 | [Best Zigbee Coordinator & Thread Router for HA (2026)](../src/content/posts/best-zigbee-coordinator-home-assistant.mdx) | 2026-10-30 | 2026-10-30 | not updated | 2026-11-13 | n/a |
| 315 | [Pinchtab: Browser Control for AI Agents via HTTP (2026)](../src/content/posts/pinchtab-browser-ai-agents.mdx) | 2026-02-18 | 2026-10-30 | updated | 2026-11-05 | n/a |
| 316 | [Fish Shell on macOS - Complete Setup Guide (2026 Update)](../src/content/posts/fish-shell-macos-setup.mdx) | 2026-02-24 | 2026-10-31 | updated | 2026-11-05 | n/a |
| 317 | [PicoClaw Setup Guide: Go Binary AI Assistant on $10 Hardware](../src/content/posts/picoclaw-setup-guide.mdx) | 2026-02-19 | 2026-10-31 | updated | 2026-11-05 | n/a |
| 318 | [How to Set Up Starship Prompt with Fish Shell (2026)](../src/content/posts/fish-shell-starship-prompt.mdx) | 2026-02-24 | 2026-11-01 | updated | 2026-11-05 | n/a |
| 319 | [Fish Shell vs Zsh in 2026: Which Should You Choose?](../src/content/posts/fish-shell-vs-zsh.mdx) | 2026-02-24 | 2026-11-01 | updated | 2026-11-05 | n/a |
| 320 | [Best Fish Shell Plugins for Fish 4 (Fisher, Oh My Fish)](../src/content/posts/best-fish-shell-plugins.mdx) | 2026-02-24 | 2026-11-04 | updated | 2026-11-05 | 2026-11-04 |
| 321 | [Best Open Source Grok Bot Alternatives (2026)](../src/content/posts/best-open-source-grok-bot-alternatives.mdx) | 2026-10-23 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 322 | [Best Terminal Multiplexers (2026): tmux, Zellij & Rex](../src/content/posts/best-terminal-multiplexers.mdx) | 2026-10-29 | 2026-11-04 | updated | 2026-11-05 | 2026-11-04 |
| 323 | [Fish Shell History: Search, Delete & Sync (2026 Guide)](../src/content/posts/fish-shell-history-persistence.mdx) | 2026-02-24 | 2026-11-04 | updated | 2026-11-05 | n/a |
| 324 | [NanoClaw v2 Deploy Guide: Claude Agent in Docker on Your VPS](../src/content/posts/nanoclaw-deploy-guide.mdx) | 2026-02-22 | 2026-11-04 | updated | 2026-11-05 | n/a |
| 325 | [NullClaw Deploy Guide: Self-Host the Smallest AI Assistant](../src/content/posts/nullclaw-deploy-guide.mdx) | 2026-02-22 | 2026-11-04 | updated | 2026-11-05 | n/a |
| 326 | [How to Use NVM with Fish Shell: nvm.fish Setup Guide (2026)](../src/content/posts/nvm-fish-shell.mdx) | 2026-02-24 | 2026-11-04 | updated | 2026-11-05 | n/a |
| 327 | [10 Best Free Dictation Apps for Mac, Windows & Linux (2026)](../src/content/posts/best-free-dictation-apps.mdx) | 2026-11-05 | 2026-11-05 | not updated | 2026-11-05 | n/a |
| 328 | [Best NAS for Plex & Jellyfin (2026): Quick Sync Picks](../src/content/posts/best-nas-for-plex.mdx) | 2026-11-05 | 2026-11-05 | not updated | 2026-11-13 | n/a |
| 329 | [Fish Shell Abbreviations vs Aliases - What's the Difference?](../src/content/posts/fish-shell-abbreviations-vs-aliases.mdx) | 2026-02-24 | 2026-11-05 | updated | 2026-11-05 | n/a |
| 330 | [Fish Shell Autocomplete & Suggestions Guide (2026 Update)](../src/content/posts/fish-shell-autocomplete-suggestions.mdx) | 2026-02-24 | 2026-11-05 | updated | 2026-11-05 | n/a |
| 331 | [Fish Shell Functions: How to Create Custom Commands (2026)](../src/content/posts/fish-shell-functions-custom-commands.mdx) | 2026-02-24 | 2026-11-05 | updated | not updated (file 2026-02-24) | n/a |
| 332 | [Hex: Free Local Voice Dictation for Mac, Windows & Linux](../src/content/posts/hex-dictation.mdx) | 2026-11-05 | 2026-11-05 | not updated | 2026-11-05 | n/a |
| 333 | [Running OpenClaw with Ollama: Best Local Models (2026)](../src/content/posts/openclaw-ollama-local-models.mdx) | 2026-02-24 | 2026-11-06 | updated | 2026-11-13 | n/a |
| 334 | [OpenClaw Security Guide: Malicious Skills and 300+ Fixes](../src/content/posts/openclaw-security-guide.mdx) | 2026-02-24 | 2026-11-06 | updated | 2026-11-13 | n/a |
| 335 | [Fish Shell Syntax Highlighting: How to Customize Colors](../src/content/posts/fish-shell-syntax-highlighting.mdx) | 2026-02-24 | 2026-11-07 | updated | 2026-11-13 | n/a |
| 336 | [Fish Shell Themes & Prompts (2026): Tide, Starship, Pure](../src/content/posts/fish-shell-themes-prompts.mdx) | 2026-02-24 | 2026-11-07 | updated | 2026-11-13 | 2026-11-07 |
| 337 | [10 Best Free AI Meeting Note-Takers for Zoom, Meet & Teams (2026)](../src/content/posts/best-free-ai-meeting-notetakers.mdx) | 2026-11-08 | 2026-11-08 | not updated | 2026-11-08 | n/a |
| 338 | [Fish Shell vs Bash vs Zsh - Complete Comparison 2026](../src/content/posts/fish-shell-vs-bash-vs-zsh.mdx) | 2026-02-24 | 2026-11-08 | updated | 2026-11-08 | 2026-11-08 |
| 339 | [How to Install Fish Shell on Ubuntu (Official PPA, 2026)](../src/content/posts/install-fish-shell-ubuntu.mdx) | 2026-02-24 | 2026-11-09 | updated | 2026-11-09 | n/a |
| 340 | [ARM vs x86 VPS Benchmarks: WordPress Performance & Cost](../src/content/posts/arm-vs-x86-vps-server-benchmarks.mdx) | 2026-02-26 | 2026-11-10 | updated | not updated (file 2026-10-19) | n/a |
| 341 | [Best Free WordPress Backup Plugins in 2026 (Compared)](../src/content/posts/best-free-wordpress-backup-plugins.mdx) | 2026-02-26 | 2026-11-10 | updated | not updated (file 2026-10-19) | n/a |
| 342 | [Best Web Scraping Plugins for WordPress in 2026 (Compared)](../src/content/posts/best-web-scraping-plugins-for-wordpress.mdx) | 2026-02-26 | 2026-11-10 | updated | not updated (file 2026-10-19) | n/a |
| 343 | [Best WooCommerce Barcode and QR Code Plugins (Free & Paid)](../src/content/posts/best-woocommerce-barcode-and-qr-code-plugins.mdx) | 2026-02-26 | 2026-11-10 | updated | not updated (file 2026-10-24) | n/a |
| 344 | [Breakdance Builder Review: Is It Still Worth It in 2026?](../src/content/posts/breakdance-builder-review.mdx) | 2026-02-26 | 2026-11-10 | updated | not updated (file 2026-10-24) | n/a |
| 345 | [Breakdance Static WordPress Site: Deploy Free on Sevalla](../src/content/posts/breakdance-kinsta-static-site.mdx) | 2026-02-26 | 2026-11-10 | updated | not updated (file 2026-10-24) | n/a |
| 346 | [Oh My Fish (OMF): Install Themes & Plugins (2026 Update)](../src/content/posts/oh-my-fish-install-themes-plugins.mdx) | 2026-02-24 | 2026-11-10 | updated | 2026-11-13 | n/a |
| 347 | [31 Self-Hosted Apps That Run Entirely on Cloudflare Workers](../src/content/posts/self-hosted-apps-cloudflare-workers.mdx) | 2026-08-21 | 2026-11-25 | updated | 2026-11-25 | 2026-11-25 |
| 348 | [Stop Wasting Time: Free AI Tools You Didn't Know Existed](../src/content/posts/stop-wasting-time-free-ai-tools.mdx) | 2026-11-10 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 349 | [Best Cameras for Frigate & Home Assistant (2026)](../src/content/posts/best-cameras-frigate-home-assistant.mdx) | 2026-11-11 | 2026-11-11 | not updated | 2026-11-11 | n/a |
| 350 | [Best PoE Video Doorbell for Home Assistant (2026)](../src/content/posts/best-poe-doorbell-home-assistant.mdx) | 2026-11-11 | 2026-11-11 | not updated | 2026-11-11 | n/a |
| 351 | [Best Zigbee Sensors for Home Assistant (2026)](../src/content/posts/best-zigbee-sensors-home-assistant.mdx) | 2026-11-11 | 2026-11-11 | not updated | 2026-11-11 | n/a |
| 352 | [UGREEN vs Synology (2026): Which NAS Should You Buy?](../src/content/posts/ugreen-vs-synology.mdx) | 2026-11-11 | 2026-11-11 | not updated | 2026-11-11 | 2026-11-18 |
| 353 | [How to Create a Sticky Block in Gutenberg (3 Easy Ways)](../src/content/posts/create-a-sticky-block-in-gutenberg.mdx) | 2026-02-26 | 2026-11-12 | updated | 2026-11-13 | n/a |
| 354 | [Modern Web Guidance Review: Browser-Vendor Skill Audit](../src/content/posts/modern-web-guidance-legacy-scan.mdx) | 2026-11-12 | 2026-11-12 | not updated | 2026-11-13 | n/a |
| 355 | [Rex Use Cases: Agents, Phone Sessions, and a Cloud Box](../src/content/posts/rex-use-cases.mdx) | 2026-11-12 | 2026-11-12 | not updated | not updated (file 2026-11-12) | n/a |
| 356 | [Superlogical Rex: Ghostty Creator's Terminal Multiplexer](../src/content/posts/superlogical-rex.mdx) | 2026-10-08 | 2026-11-12 | updated | 2026-11-12 | 2026-11-12 |
| 357 | [Deindexed from Bing and DuckDuckGo: How to Get Back In](../src/content/posts/deindexed-in-bing-and-duckduckgo-now-what.mdx) | 2026-02-26 | 2026-11-13 | updated | 2026-11-13 | n/a |
| 358 | [DigitalOcean vs Vultr vs Hetzner: Which VPS Wins in 2026?](../src/content/posts/digitalocean-vs-vultr-vs-hetzner.mdx) | 2026-02-26 | 2026-11-13 | updated | 2026-11-13 | n/a |
| 359 | [Export WordPress Post URLs and Titles: 5 Free Methods](../src/content/posts/export-wordpress-post-urls-titles.mdx) | 2026-02-26 | 2026-11-13 | updated | 2026-11-13 | n/a |
| 360 | [Hetzner vs Oracle ARM VPS: Benchmarks After the 2026 Cuts](../src/content/posts/hetzner-oracle-arm-performance.mdx) | 2026-02-26 | 2026-11-13 | updated | 2026-11-13 | n/a |
| 361 | [HolyArrs Docker Guide: Replace the *arr Stack in 15 MB](../src/content/posts/holyarrs-docker-guide.mdx) | 2026-11-13 | 2026-11-13 | not updated | not updated (file 2026-11-13) | not updated (file 2026-11-15) |
| 362 | [Home Assistant 2026.11: Marketplace & TrueNAS Migration](../src/content/posts/home-assistant-2026-11-marketplace-truenas.mdx) | 2026-11-13 | 2026-11-13 | not updated | not updated (file 2026-11-13) | n/a |
| 363 | [ZeptoMail SMTP Relay Setup on a VPS with Postfix (2026)](../src/content/posts/how-to-setup-smtp-relay-email-on-zeptomail.mdx) | 2026-02-26 | 2026-11-13 | updated | 2026-11-13 | n/a |
| 364 | [Immich Self-Hosted Guide: Save 20-50% With JPEG XL](../src/content/posts/immich-self-hosted-jpeg-xl.mdx) | 2026-11-13 | 2026-11-13 | not updated | not updated (file 2026-11-13) | n/a |
| 365 | [How To Install Uptime Kuma Self Hosted Monitoring Tool](../src/content/posts/install-uptime-kuma.mdx) | 2026-02-26 | 2026-11-13 | updated | 2026-11-13 | n/a |
| 366 | [16GB Raspberry Pi 5 ($385) vs Mini PCs: Homelab Math](../src/content/posts/raspberry-pi-5-vs-mini-pc.mdx) | 2026-11-13 | 2026-11-13 | not updated | not updated (file 2026-11-13) | n/a |
| 367 | [ServerOS Panel Review: Multi-VPS Panel With MCP Server](../src/content/posts/serveros-panel-review.mdx) | 2026-11-13 | 2026-11-13 | not updated | not updated (file 2026-11-13) | n/a |
| 368 | [ZCode AI Review 2026: Free AI Coding Agent vs Cursor](../src/content/posts/zcode-ai-review.mdx) | 2026-02-12 | 2026-11-27 | updated | 2026-11-13 | n/a |
| 369 | [How to Install WordPress on Ubuntu ARM with CloudPanel](../src/content/posts/install-wordpress-on-ubuntu-arm.mdx) | 2026-02-26 | 2026-11-14 | updated | not updated (file 2026-10-24) | n/a |
| 370 | [OpenOrange: Run Cloudflare Workers on Your Own Servers](../src/content/posts/open-orange-cloudflare-workers.mdx) | 2026-11-14 | 2026-11-14 | not updated | 2026-11-14 | n/a |
| 371 | [How to Safely Update CloudPanel: Snapshot First (2026)](../src/content/posts/safely-update-cloudpanel.mdx) | 2026-02-26 | 2026-11-14 | updated | 2026-11-14 | n/a |
| 372 | [How To Secure CloudPanel: 10-Step Hardening Guide (2026)](../src/content/posts/secure-cloudpanel.mdx) | 2026-02-26 | 2026-11-14 | updated | 2026-11-14 | n/a |
| 373 | [Two-Factor Authentication for WordPress: Free 2FA Setup](../src/content/posts/secure-wordpress-2fa.mdx) | 2026-02-26 | 2026-11-14 | updated | 2026-11-14 | n/a |
| 374 | [Zoho SMTP WordPress: Send Emails With FluentSMTP (2026)](../src/content/posts/send-emails-in-wordpress-zoho-smtp-fluentsmtp.mdx) | 2026-02-26 | 2026-11-14 | updated | 2026-11-14 | n/a |
| 375 | [Speed Up WordPress with Cloudflare, Varnish and Redis](../src/content/posts/speed-up-wordpress-with-cloudflare-varnish-and-redis.mdx) | 2026-02-26 | 2026-11-14 | updated | 2026-11-14 | n/a |
| 376 | [Carrd Black Friday 2026: 40% Off Pro Plans (Code BF2026)](../src/content/posts/carrd-black-friday-2026.mdx) | 2026-11-15 | 2026-11-15 | not updated | not updated (file 2026-11-15) | not updated (file 2026-11-15) |
| 377 | [QwenPaw Setup Guide: Self-Hosted Multi-Channel AI Assistant](../src/content/posts/copaw-setup-guide.mdx) | 2026-03-05 | 2026-11-15 | updated | 2026-11-15 | 2026-11-15 |
| 378 | [OpenFang Setup Guide: GLM-5, MiniMax M2.5 & Discord on VPS](../src/content/posts/openfang-setup-guide.mdx) | 2026-03-02 | 2026-11-15 | updated | 2026-11-15 | n/a |
| 379 | [SureCart Review 2026: Pricing, Fees & Digital Products](../src/content/posts/surecart-review.mdx) | 2026-02-26 | 2026-11-15 | updated | 2026-11-15 | n/a |
| 380 | [Upload vCard (VCF) Files to WordPress: 2 Easy Methods](../src/content/posts/upload-vcard-vcf-files-to-wordpress.mdx) | 2026-02-26 | 2026-11-15 | updated | 2026-11-15 | n/a |
| 381 | [WooCommerce Admin Dashboard: Build a Modern Product Editor](../src/content/posts/woocommerce-admin-dashboard.mdx) | 2026-03-02 | 2026-11-15 | updated | not updated (file 2026-03-02) | n/a |
| 382 | [Migrate WordPress to Astro: How I Moved 50+ Posts to MDX](../src/content/posts/wordpress-to-astro-migration.mdx) | 2026-03-02 | 2026-11-15 | updated | 2026-11-15 | 2026-11-15 |
| 383 | [Bunny Storage vs S3 vs Backblaze: Cheapest Cloud Storage?](../src/content/posts/bunny-storage-vs-s3-vs-backblaze.mdx) | 2026-04-08 | 2026-11-16 | updated | 2026-11-16 | n/a |
| 384 | [cmux Terminal: Practical Guide for AI Coding Agents on macOS](../src/content/posts/cmux-terminal.mdx) | 2026-03-13 | 2026-11-16 | updated | 2026-11-16 | 2026-11-16 |
| 385 | [HyperFrames Studio Review: Free AI Agent Video Editor Tested](../src/content/posts/hyperframes-studio-review.mdx) | 2026-11-16 | 2026-11-16 | not updated | not updated (file 2026-11-16) | not updated (file 2026-11-16) |
| 386 | [How To Deploy Memoh AI Agent Platform with Docker Compose](../src/content/posts/memoh-ai-agent-deploy.mdx) | 2026-03-05 | 2026-11-16 | updated | 2026-11-16 | 2026-11-16 |
| 387 | [Bunny Stream: How to Host Videos Without Vimeo or YouTube](../src/content/posts/bunny-stream-guide.mdx) | 2026-04-08 | 2026-11-17 | updated | 2026-11-17 | n/a |
| 388 | [How to Use Hermes Agent with Free Models on the Nous Portal](../src/content/posts/hermes-agent-mimo-v2-pro.mdx) | 2026-04-08 | 2026-11-27 | updated | 2026-11-27 | n/a |
| 389 | [Best Desk Setup Gadgets 2027: 12 Upgrades That Actually Matter](../src/content/posts/best-desk-setup-gadgets-2027.mdx) | 2026-11-18 | 2026-11-18 | not updated | 2026-11-18 | 2026-11-18 |
| 390 | [Best Hard Drives for NAS (2026): IronWolf vs WD Red](../src/content/posts/best-hard-drives-for-nas.mdx) | 2026-11-11 | 2026-11-18 | updated | 2026-11-18 | 2026-11-18 |
| 391 | [Best NAS for Docker & Proxmox Homelabs 2026](../src/content/posts/best-nas-homelab-docker-proxmox.mdx) | 2026-09-21 | 2026-11-18 | updated | 2026-11-18 | 2026-11-18 |
| 392 | [How to Deploy Astro to Bunny.net: Step-by-Step Guide](../src/content/posts/deploy-astro-bunny-net.mdx) | 2026-04-16 | 2026-11-18 | updated | not updated (file 2026-10-19) | n/a |
| 393 | [19 Cool & Unexpected Gifts for Programmers & Tech Geeks (2026)](../src/content/posts/gifts-for-programmers.mdx) | 2026-11-14 | 2026-11-18 | updated | 2026-11-18 | 2026-11-18 |
| 394 | [How to Migrate from Synology to UGREEN NAS (Without Losing Data)](../src/content/posts/migrate-synology-to-ugreen-nas.mdx) | 2026-11-18 | 2026-11-18 | not updated | 2026-11-18 | 2026-11-18 |
| 395 | [NAS Build Under $500 in 2026: The Parts List That Actually Works](../src/content/posts/nas-build-under-500.mdx) | 2026-11-18 | 2026-11-18 | not updated | 2026-11-18 | 2026-11-18 |
| 396 | [Sell Digital Products Online With Payhip (Step-by-Step)](../src/content/posts/sell-digital-products-payhip.mdx) | 2026-04-14 | 2026-11-18 | updated | 2026-11-18 | n/a |
| 397 | [Tech Gifts for Homelab Owners (2026): 14 Practical Picks](../src/content/posts/tech-gifts-homelab-owners.mdx) | 2026-11-18 | 2026-11-18 | not updated | 2026-11-18 | 2026-11-18 |
| 398 | [Headscale Setup Guide: Self-Host Your Tailscale Control Server](../src/content/posts/headscale-self-hosted-tailscale-setup.mdx) | 2026-05-20 | 2026-11-19 | updated | 2026-11-19 | 2026-11-19 |
| 399 | [iVANKY FusionDock Ultra Review: 26-Port Thunderbolt 5 Dock](../src/content/posts/ivanky-fusiondock-ultra-review.mdx) | 2026-04-28 | 2026-11-19 | updated | not updated (file 2026-04-28) | n/a |
| 400 | [NetBird Self-Hosted Setup: Open-Source Mesh VPN on Docker](../src/content/posts/netbird-self-hosted-setup.mdx) | 2026-11-19 | 2026-11-19 | not updated | not updated (file 2026-11-19) | not updated (file 2026-11-19) |
| 401 | [NetBird vs Headscale vs Tailscale: Which Mesh VPN Should You Use?](../src/content/posts/netbird-vs-headscale-vs-tailscale.mdx) | 2026-05-20 | 2026-11-19 | updated | 2026-11-19 | 2026-11-19 |
| 402 | [Tailscale Setup Guide: MagicDNS, Subnets & Exit Nodes](../src/content/posts/tailscale-setup-guide.mdx) | 2026-11-19 | 2026-11-19 | not updated | not updated (file 2026-11-19) | not updated (file 2026-11-19) |
| 403 | [VPS Setup for AI Coding Agents: Secure & Ready to Code](../src/content/posts/vps-ai-coding-setup.mdx) | 2026-04-20 | 2026-11-19 | updated | not updated (file 2026-10-19) | n/a |
| 404 | [Best Docker Desktop Alternatives 2026: OrbStack, Colima, Kiri](../src/content/posts/best-docker-desktop-alternatives.mdx) | 2026-11-20 | 2026-11-20 | not updated | not updated (file 2026-11-20) | not updated (file 2026-11-20) |
| 405 | [Black Friday Home Server & Homelab Deals 2026](../src/content/posts/black-friday-home-server-deals.mdx) | 2026-09-21 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 406 | [How to block ads, malware, and ISP tracking with encrypted DNS](../src/content/posts/block-ads-malware-dns-protection.mdx) | 2026-01-12 | 2026-11-20 | updated | 2026-11-20 | 2026-11-20 |
| 407 | [Forgejo vs Gitea (2026): Differences & Actions Runner Guide](../src/content/posts/forgejo-vs-gitea-self-hosted.mdx) | 2026-11-20 | 2026-11-20 | not updated | not updated (file 2026-11-20) | not updated (file 2026-11-20) |
| 408 | [GitHub Copilot Alternatives: 5 Cheaper Picks for 2026](../src/content/posts/github-copilot-alternatives-2026.mdx) | 2026-04-30 | 2026-11-20 | updated | 2026-11-20 | 2026-11-20 |
| 409 | [NextDNS review (2026): cloud DNS protection after two years](../src/content/posts/nextdns-review.mdx) | 2026-01-21 | 2026-11-20 | updated | 2026-11-20 | 2026-11-20 |
| 410 | [Self-Hosted AI Agent Sandboxes: p9m (p7y) & Mastra Factory](../src/content/posts/p7y-mastra-factory-self-hosted-agent-sandboxes.mdx) | 2026-11-20 | 2026-11-20 | not updated | not updated (file 2026-11-20) | not updated (file 2026-11-20) |
| 411 | [PeakCut on Docker: Self-Hosted AI Video Clipper (BYOK)](../src/content/posts/peakcut-self-hosted-ai-video-clipper.mdx) | 2026-11-20 | 2026-11-20 | not updated | not updated (file 2026-11-20) | not updated (file 2026-11-20) |
| 412 | [Pi-hole v6 vs AdGuard Home on Docker (+ Unbound Setup)](../src/content/posts/pihole-vs-adguard-home-docker.mdx) | 2026-11-20 | 2026-11-20 | not updated | not updated (file 2026-11-20) | not updated (file 2026-11-20) |
| 413 | [PostgreSQL 19: REPACK, Plan Advice, JIT Off & Upgrade Guide](../src/content/posts/postgresql-19-whats-new.mdx) | 2026-11-20 | 2026-11-20 | not updated | not updated (file 2026-11-20) | not updated (file 2026-11-20) |
| 414 | [Best Herdr clients (2026): official apps, web UIs & mobile](../src/content/posts/best-herdr-clients.mdx) | 2026-10-08 | 2026-11-21 | updated | 2026-11-21 | 2026-11-21 |
| 415 | [Best Herdr TUI plugins (2026): 10 vetted picks & install guide](../src/content/posts/best-herdr-plugins.mdx) | 2026-10-08 | 2026-11-21 | updated | 2026-11-21 | 2026-11-21 |
| 416 | [Control AI agents from your phone: Herdr Mobile & Moshi](../src/content/posts/control-ai-agents-from-phone-moshi-herdr.mdx) | 2026-09-28 | 2026-11-21 | updated | 2026-11-21 | 2026-11-21 |
| 417 | [Herdr review (2026): open-source runtime for AI coding agents](../src/content/posts/herdr-agent-multiplexer.mdx) | 2026-07-10 | 2026-11-21 | updated | 2026-11-21 | 2026-11-21 |
| 418 | [Herdr Desktop App layouts and mods: 312+ workspace gallery](../src/content/posts/herdr-app-layouts-mods.mdx) | 2026-11-08 | 2026-11-21 | updated | 2026-11-21 | 2026-11-21 |
| 419 | [Hermes Kanban Setup Guide: Multi-Agent Task Boards (2026)](../src/content/posts/hermes-kanban-setup-guide.mdx) | 2026-05-04 | 2026-11-27 | updated | 2026-11-27 | 2026-11-27 |
| 420 | [OpenCode Setup Guide: Open-Source Claude Code Alternative](../src/content/posts/opencode-setup-guide.mdx) | 2026-04-30 | 2026-11-21 | updated | 2026-11-21 | 2026-11-21 |
| 421 | [Qwen 3.6 for AI Coding Agents: Setup, Pricing & Benchmarks](../src/content/posts/qwen36-ai-coding-agents.mdx) | 2026-04-30 | 2026-11-21 | updated | 2026-11-21 | n/a |
| 422 | [Mirage Tutorial: Virtual Filesystem for AI Agents (2026)](../src/content/posts/mirage-virtual-filesystem-ai-agents.mdx) | 2026-05-12 | 2026-11-22 | updated | 2026-11-22 | n/a |
| 423 | [AssemblyAI Review: I Tested Accuracy, Speed and Pricing](../src/content/posts/assemblyai-review.mdx) | 2026-11-23 | 2026-11-23 | not updated | not updated (file 2026-11-23) | not updated (file 2026-11-23) |
| 424 | [AssemblyAI vs Deepgram: Accuracy, Latency and Pricing Compared](../src/content/posts/assemblyai-vs-deepgram.mdx) | 2026-11-23 | 2026-11-23 | not updated | not updated (file 2026-11-23) | not updated (file 2026-11-23) |
| 425 | [Coolify v5 Review: Self-Hosted PaaS Replaces Heroku & Vercel](../src/content/posts/coolify-v5-self-hosted-paas-review.mdx) | 2026-05-20 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 426 | [Forgejo and Woodpecker CI: Self-Host Your Git and CI/CD](../src/content/posts/forgejo-woodpecker-ci-cicd.mdx) | 2026-05-13 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 427 | [Best OpenAI Whisper Alternatives: APIs & Local Tested](../src/content/posts/openai-whisper-alternatives.mdx) | 2026-11-23 | 2026-11-23 | not updated | not updated (file 2026-11-23) | not updated (file 2026-11-23) |
| 428 | [How to Self-Host Traceway as a Free Datadog Alternative](../src/content/posts/traceway-self-host-guide.mdx) | 2026-05-13 | 2026-11-23 | updated | 2026-11-23 | n/a |
| 429 | [Transcribe a YouTube Video to Text and SRT with AssemblyAI](../src/content/posts/transcribe-youtube-video-srt-assemblyai.mdx) | 2026-11-23 | 2026-11-23 | not updated | not updated (file 2026-11-23) | not updated (file 2026-11-23) |
| 430 | [Fish Audio API Tutorial: TTS, Voice Cloning & Streaming](../src/content/posts/fish-audio-api.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 431 | [Komodo Docker Compose Install: Core, Periphery, MongoDB](../src/content/posts/komodo-docker-install.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 432 | [Crafty Controller Docker Install: Minecraft Panel Guide](../src/content/posts/crafty-controller-docker-install.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 433 | [Ghostty Themes: Setup, Best Picks, Custom Files & Shaders](../src/content/posts/ghostty-themes.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 434 | [Ghostty vs Kitty vs Wezterm vs Alacritty: Which in 2026?](../src/content/posts/ghostty-vs-kitty.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 435 | [Best Open-Source TTS Engines in 2026 for Self-Hosting](../src/content/posts/best-open-source-tts.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 436 | [Pterodactyl vs Pelican Panel: Which Game Panel in 2026?](../src/content/posts/pterodactyl-vs-pelican.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 437 | [Pterodactyl Panel Docker Install: Panel, Wings, First Server](../src/content/posts/pterodactyl-docker-install.mdx) | 2026-11-26 | 2026-11-26 | updated | 2026-11-26 | 2026-11-26 |
| 438 | [Best Speech-to-Speech Models in 2027: Paid and Open Source](../src/content/posts/best-speech-to-speech-models.mdx) | 2026-11-28 | 2026-11-28 | updated | 2026-11-28 | 2026-11-28 |
