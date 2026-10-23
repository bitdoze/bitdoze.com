# Amazon Affiliate Content Plan 2027 — bitdoze.com

_Prepared 2026-10-23. Covers Nov 2026 → Dec 2027. Builds on `docs/to-do-affiliate-artices.md` (Sep 2026), whose Tier 1–2 articles are live._

---

## 0. TL;DR

1. **Roundups work, reviews don't.** "Best X for <homelab job>" guides turn **15–31%** of visitors into Amazon clickers. Single-product reviews and monitor content get **0–5%**. Everything below is a roundup or a comparison.
2. **25 new articles, all on keywords bitdoze can realistically rank for.** The cut-off is Ubersuggest SD ≤ 30 for primary keywords (bitdoze's current top-3 rankings all sit at SD 20–29), checked against live Google US SERPs. 39 of the 75 SERPs checked are dominated by Reddit, forums and YouTube, with at most one big editorial site.
3. **Start with these 9 (Tier 1), in this order:** Mac mini for OpenClaw, Mini PC for Plex/Jellyfin, Home Assistant hardware, Rack-mount/LiFePO4 UPS, 10-inch mini rack, Hard drives for NAS, GPU for local LLMs, DGX Spark alternatives (Strix Halo), OCuLink eGPU docks. Publish the first 7 (plus a gift guide) by Nov 22 to catch Black Friday through Christmas.
4. **The biggest revenue lever isn't content.** **65% of real affiliate clickers are outside the US** (DE 11%, FR 6%, NL 6%, UK 5%, CA 4%...), but every `/go/` link points to amazon.com. Geo-routing `/go/` (or Amazon OneLink) is worth more than any single article.
5. **About 28% of real clickers come from engines built on Bing's index** (DuckDuckGo 21%, Bing 6%, plus ~1% Ecosia/Qwant). Turn on IndexNow (Cloudflare Crawler Hints) and submit sitemaps in Bing Webmaster Tools.
6. **Hardware boxes on high-traffic software posts pay off.** `docker-containers-home-server` is the #2 source of affiliate clickers (127/month) from one small "No hardware yet?" block. Repeat it on the OpenClaw, Hermes, LLM and Portainer posts.
7. **Amazon prices are inflated right now** (RTX 5090 top-reviewed listing $7,968; 12TB NAS drives $450–690; WD Red SN700 1TB $460). Don't hardcode prices. Lead with $/TB and $/GB-of-VRAM tables, stamp a "price checked" date, and refresh monthly.

---

## 1. Data and method

| Source | Scope | What it gave us |
|---|---|---|
| Google Search Console (`sc-domain:bitdoze.com`, via composio) | 2026-07-23 → 10-21 (90d) + 09-22 → 10-21 (30d); 25k query rows plus 14.8k hardware-intent query×page rows | Page positions, striking-distance queries, existing demand per cluster |
| Plausible (self-hosted `an3.bitdoze.com`, Stats API v2) | 2026-09-21 (the `/go/` launch) → 10-22 | `affiliate_click` by product, by `article` prop, country, source; page visitors, time on page, scroll |
| Ubersuggest (composio custom toolkit) | US / English, ~170 seed keywords, 4,700+ keywords returned | Volume, SD (SEO difficulty), CPC, intent |
| SERP checks | Google US via Bright Data + TinyFish, 75 queries, 2026-10-23 | Who ranks in the top 8 (big editorial vs forum/UGC) |
| Amazon US | Bright Data Amazon product-search scraper, 120 products + 12 category scans, 2026-10-23 | ASIN, price, rating, rating count, availability (108 found / 12 not found) |

**What "not that hard" means for bitdoze:**

- Of the 500 US keywords Ubersuggest returns for bitdoze.com, 94 rank top-10. 88 of those have SD ≤ 39, and all 8 top-3 rankings are at SD 20–29. So: **primary keyword SD ≤ 30, secondary SD ≤ 35, nothing above 35 unless the live SERP is weak.**
- SERP verdicts: **EASY** = at most 1 big editorial/retail result (RTINGS, Tom's Hardware, PCMag, TechRadar, Amazon, Best Buy...) and at least 3 forum/UGC results (Reddit, forums, Facebook, YouTube) in the top 8. **HARD** = 4 or more big editorial/retail results. Everything else is **MID**.
- Ubersuggest volumes are US-only and directional. Plan around clusters, not single keywords.
- **Traffic multiplier:** Plausible visitors on affiliate pages were **4.7×** their Google clicks over the same 30 days (range 2.8×–18×). DuckDuckGo, Bing, direct and AI referrals add a lot on top of Google. Budget ~3× when estimating.

Raw exports from this session lived in `/tmp/affplan/` (temporary). Re-pull with the same composio tools before major decisions.

---

## 2. What the data says right now

### 2.1 Affiliate clicks by article (Plausible, Sep 21 → Oct 22, bot-filtered)

Attribution uses the `article` prop that `/go/[product].astro` records from the referrer, filtered to visits with a real entry page (see §6.4 on bots). Totals: **632 clickers, 961 clicks**.

| Article | Visitors | Clickers | Clicks | Clicker rate |
|---|---:|---:|---:|---:|
| best-tb5-nvme-enclosures | 319 | 100 | 164 | **31.3%** |
| best-mini-pc-proxmox | 132 | 33 | 47 | **25.0%** |
| black-friday-home-server-deals | 44 | 9 | 15 | 20.5% |
| best-ups-for-home-server | 103 | 21 | 24 | 20.4% |
| best-mini-pc-local-llm | 207 | 40 | 51 | 19.3% |
| best-mini-pc-home-server | 714 | 136 | 243 | 19.0% |
| best-tb5-dock-macbook-pro | 64 | 12 | 14 | 18.8% |
| best-2-5-10gbe-switch-homelab | 81 | 14 | 20 | 17.3% |
| vps-price-increases | 135 | 22 | 41 | 16.3% |
| best-thunderbolt-5-docks-guide | 377 | 56 | 88 | 14.9% |
| best-nas-homelab-docker-proxmox | 200 | 19 | 24 | 9.5% |
| docker-containers-home-server (hardware block) | 3,423 | 127 | 175 | 3.7% |
| best-32-inch-oled-monitors-guide | 140 | 3 | 3 | 2.1% |
| setup-samba-linux | 254 | 4 | 4 | 1.6% |
| asus-thunderbolt-5-dock-dc510-review | 76 | 1 | 1 | 1.3% |
| portainer-alternatives | 1,668 | 5 | 5 | 0.3% |
| sound-blaster-gs5-review / ivanky-fusiondock-ultra-review | 64 / 16 | 0 | 0 | 0% |

### 2.2 What people click (real clickers per product, Sep 21 → Oct 22)

| # | Product (`/go/` slug) | Clickers | Main source page |
|---:|---|---:|---|
| 1 | gmktec-n150 | 167 | docker-containers-home-server (82), best-mini-pc-home-server (72) |
| 2 | ugreen-dxp4800-plus | 60 | docker-containers-home-server (50) |
| 3 | owc-express-1m2-80g | 53 | best-tb5-nvme-enclosures (52) |
| 4 | cyberpower-cp1500pfclcd | 44 | docker-containers-home-server (28), best-ups (12) |
| 5 | beelink-ser9-pro | 29 | best-mini-pc-home-server |
| 6 | gmktec-m5-ultra | 28 | best-mini-pc-home-server (8), vps-price-increases (4), setup-samba-linux (4) |
| 7 | gmktec-evo-x2-128gb | 27 | best-mini-pc-local-llm (19) |
| 8 | ivanky-fusiondock-ultra | 23 | best-thunderbolt-5-docks-guide (22) |
| 9 | gmktec-m6-ultra | 22 | best-mini-pc-home-server |
| 10 | terramaster-d1-ssd-pro | 21 | best-tb5-nvme-enclosures |

Before the `/go/` migration (Jul 1 → Sep 20), outbound `amzn.to` clicks showed the same leaders: N150 116, Beelink SER9 Pro 50, OWC 11-port TB5 dock 50, Kensington SD5000T5 49, Minisforum AI X1 Pro 45.

**Takeaway:** cheap, low-risk home-server hardware (N150 mini PCs, a UPS, a 4-bay NAS) and Thunderbolt 5 storage drive the clicks. The next articles should sit next to these.

### 2.3 Google: where the affiliate pages stand (GSC, 90 days)

| Page | Clicks | Impressions | Avg pos | Note |
|---|---:|---:|---:|---|
| best-thunderbolt-5-docks-guide | 160 | 13,982 | 8.0 | "best thunderbolt 5 dock" 1,146 impr @ 6.6 |
| best-mini-pc-home-server | 116 | 25,422 | 12.4 | CTR 0.5%; "mini server" 740 impr @ 24, "home servers" 545 @ 10, "mini server pc" 288 @ 35 |
| best-mini-pc-local-llm | 73 | 3,246 | 7.3 | "prebuilt pc for ollama" @ 12.8, "best pc for ollama" @ 13 |
| best-tb5-nvme-enclosures | 69 | 3,081 | 7.9 | "ssd enclosure" 63 @ 11.5, "nvme enclosure" 53 @ 10.9 |
| best-nas-homelab-docker-proxmox | 43 | 2,245 | 8.3 | "best nas" 156 @ 7.5, "best nas devices for homelabs" 246 @ 10.7 |
| best-mini-pc-proxmox | 27 | 1,087 | 8.8 | "best mini pc for proxmox" 113 @ 10 |
| best-ups-for-home-server | 11 | 1,966 | 9.6 | "best ups systems for homelabs" 141 @ 10.7 |
| best-32-inch-oled-monitors-guide | 22 | 6,804 | 12.8 | head terms @ 23–32, low conversion |

Signals already pointing at new spokes (impressions arriving on hub pages):
- **Plex/Jellyfin:** "best mini pc for jellyfin" @ 10, "best mini pc for plex server 2025" @ 16, "best mini pc for plex" @ 23. Ubersuggest has bitdoze at #19 for "best mini pc for plex server".
- **Home Assistant:** "best mini pc for home assistant" @ 17 (#28 in Ubersuggest).
- **TB5:** "caldigit ts5 alternative" 133 impr @ 7.0. bitdoze is already #5 on the live SERP.
- **AI audience:** OpenClaw/Hermes/OpenCode/Pi posts carry the site's biggest query volume (e.g. "opencode vs pi" 10.7k impr), but those readers currently see no hardware link.

### 2.4 Geography and search engines of real clickers

| Country | Share of clickers | | Source | Share of clickers |
|---|---:|---|---|---:|
| United States | 35.3% | | Direct / none | 35.6% |
| Germany | 11.0% | | Google | 28.2% |
| France | 6.3% | | DuckDuckGo | 20.9% |
| Netherlands | 5.8% | | Bing | 5.6% |
| United Kingdom | 5.4% | | Brave | 2.9% |
| Canada | 4.0% | | Gemini / ChatGPT | 1.4% / 1.0% |
| Australia, Belgium, Spain | 3.0% each | | YouTube | 1.4% |
| Italy, Poland | 2.4% each | | Qwant / Kagi / Ecosia | ~1.7% |

### 2.5 Rules that follow from this

1. Write **"best X for <job>"** roundups and **X vs Y vs Z** comparisons. No standalone single-product reviews.
2. Stay inside the **home-server, homelab and local-AI** orbit. Dev-desk gear (keyboards, monitors) is Tier 2–3 because monitor content converts at 2%.
3. Every new article gets a **comparison table above the fold** and **2–4 `/go/` products**. The best performers have a clear "if you only buy one" pick.
4. **Cheap SKUs convert.** The #1 product is a ~$150–350 N150 box. Mix cheap converters (Zigbee dongles, TB5 cables, mini UPS) with high-AOV picks (UPS, GPUs, Strix Halo).
5. Link every spoke **from its hub with exact-match anchors**, and cut the duplicated section on the hub to a summary so the two pages don't compete.

---

## 3. Opportunity map (scored)

Scoring is 1–5 on each axis:
- **Demand** = summed US volume of the article's listed keywords (≥5k → 5, 2.5–5k → 4, 1.5–2.5k → 3, 1–1.5k → 2).
- **Ease** = SERP verdict + SD.
- **Fit** = existing GSC signal / adjacency to a page converting ≥15%.
- **Money** = Amazon availability, rating depth, basket size.

| ID | Article | Listed kw volume /mo | Primary keyword (vol / SD) | SERP | D | E | F | M | Score | Tier |
|---|---|---:|---|---|---:|---:|---:|---:|---:|---|
| A4 | Best Rack Mount UPS for Homelab & NAS (1U/2U + LiFePO4) — done 2026-10-23 | 5,030 | rack mount ups (2,900 / 21) | EASY | 5 | 5 | 5 | 5 | **20** | 1 |
| A2 | Best Mini PC for Plex & Jellyfin — done 2026-10-23 | 1,860 | mini pc for plex server (480 / 17) + jellyfin (480 / 20) | EASY | 3 | 5 | 5 | 5 | **18** | 1 |
| A5 | Best 10-inch Mini Rack for a Homelab — done 2026-10-23 | 7,450 | mini rack (1,600 / 17) | EASY/MID | 5 | 4 | 4 | 5 | **18** | 1 |
| A6 | Best Hard Drives for NAS (IronWolf vs WD Red vs Exos) | 9,490 | best hard drives for nas (1,600 / 29) | EASY | 5 | 4 | 5 | 4 | **18** | 1 |
| A1 | Best Mac mini for OpenClaw & AI Agents — done 2026-10-23 | 2,340 | mac mini for openclaw (720 / 22) | EASY | 3 | 5 | 5 | 4 | **17** | 1 |
| A3 | Best Mini PC & Hardware for Home Assistant — done 2026-10-23 | 1,690 | home assistant hardware (720 / 28) | EASY | 3 | 5 | 5 | 4 | **17** | 1 |
| A7 | Best GPU for Local LLMs (VRAM per dollar) | 1,690 | best gpu for local llm (170 / 16); best gpu for ai (1,000 / 28) | EASY | 3 | 5 | 5 | 4 | **17** | 1 |
| A8 | DGX Spark Alternatives: Strix Halo Mini PCs Compared | 3,340 | strix halo mini pc (1,000 / 25) | EASY/MID | 4 | 4 | 5 | 4 | **17** | 1 |
| A9 | OCuLink eGPU Docks + Mini PCs with OCuLink | 6,130 | oculink egpu (1,300 / 22) | EASY/MID | 5 | 4 | 4 | 4 | **17** | 1 |
| B1 | Best Thunderbolt 5 Cables (tested) | 8,740 | thunderbolt 5 cable (5,400 / 34, stretch) | MID | 5 | 3 | 5 | 3 | 16 | 2 |
| B2 | Best IP KVM: Comet vs JetKVM vs NanoKVM vs PiKVM | 3,020 | ip kvm switch (1,900 / 26) | EASY | 4 | 4 | 4 | 4 | 16 | 2 |
| B3 | Best Mac mini Dock with SSD Enclosure | 5,110 | mac mini dock (1,600 / 22) | MID | 5 | 3 | 4 | 4 | 16 | 2 |
| B4 | Best DAS / JBOD Enclosure (mini PC + DAS vs NAS) | 1,600 | jbod enclosure (880 / 22) | EASY/MID | 3 | 4 | 5 | 4 | 16 | 2 |
| B5 | Best Zigbee Coordinator & Thread Border Router for HA | 2,740 | zigbee coordinator (720 / 26) | EASY | 4 | 5 | 4 | 3 | 16 | 2 |
| B7 | Best NAS Case for a DIY NAS (+ boards) | 6,580 | nas case (2,900 / 28) | MID | 5 | 3 | 4 | 3 | 15 | 2 |
| B9 | Best Travel Router for Remote Work (WireGuard/Tailscale) | 17,020 | best travel router (1,300 / 31) | EASY | 5 | 3 | 3 | 4 | 15 | 2 |
| B6 | Best Mini UPS for Router & Modem | 2,350 | ups for router (720 / 29) | EASY/MID | 3 | 4 | 4 | 3 | 14 | 2 |
| B8 | Best Mini PC for OPNsense / pfSense | 1,670 | opnsense hardware (720 / 28) | EASY | 3 | 5 | 4 | 2 | 14 | 2 |
| B10 | Best Keyboard for Programming | 2,440 | good keyboard for programming (1,300 / 27) | EASY | 3 | 4 | 3 | 4 | 14 | 2 |
| B11 | Best PoE Switch for IP Cameras (Frigate) | 5,040 | poe switch for ip camera (1,300 / 17) | MID | 5 | 3 | 3 | 3 | 14 | 2 |
| B12 | Best SSD for NAS (cache vs all-flash) | 6,780 | ssd for nas (4,400 / 29) | EASY/MID | 5 | 3 | 4 | 2 | 14 | 2 |
| C1 | Raspberry Pi 5 NAS Build | 1,320 | raspberry pi 5 nas (720 / 24) | MID | 2 | 3 | 3 | 3 | 11 | 3 |
| C2 | Best 5K Monitor for Mac (Studio Display alternatives) | 3,470 | 5k monitor for mac (880 / 28) | MID | 4 | 2 | 2 | 3 | 11 | 3 |
| C3 | Best Monitor Light Bar | 1,390 | best monitor light bar (590 / 27) | MID | 2 | 3 | 2 | 3 | 10 | 3 |
| S1 | Seasonal: Gifts for Programmers & Homelabbers | 730 | gifts for programmers (590 / 28) | — | 1 | 3 | 3 | 4 | seasonal | Nov |

Full SERP evidence is in Appendix A. Ready-to-paste `/go/` entries are in Appendix C.

---

## 4. Article briefs

**Conventions for every brief:**
- Frontmatter per AGENTS.md: exactly one category, 1–3 tags.
- SVG cover rendered to WebP.
- `Notice type="warning" title="Affiliate Disclosure"` above the first affiliate link.
- `AmazonProduct` / `Button` links go through `/go/<slug>/` only.
- Write a 40–60-word direct answer under the H1, a comparison table above the fold, and a "who should buy" line per pick.
- Prices only as "as of <date>" or "check current price".
- Product data below was checked on amazon.com on 2026-10-23. Re-check on the day you publish.

### Tier 1 — publish Oct 27 → Dec 20, 2026

#### A1. Best Mac mini for OpenClaw (and other AI agents)

> **Status:** DONE 2026-10-23 — `src/content/posts/best-mac-mini-for-openclaw.mdx`, WebP cover, `/go/` slugs wired, inbound links added. Note: `gmktec-n150` dropped (wrong listing), `beelink-mini-s13` used.

- **Slug:** `best-mac-mini-for-openclaw` · **Category:** `ai` · **Tags:** `openclaw`, `mac-mini`, `local-llm`
- **Why first:** bitdoze has 46 English posts about OpenClaw and its biggest audience is AI-agent readers, who currently have no hardware path. This SERP has **zero big editorial sites** (a course landing page, Reddit, YouTube, Medium, a UGREEN blog, getopenclaw.ai).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| mac mini for openclaw | 720 | 22 | $4.79 |
| best mac mini for openclaw | 260 | 28 | $1.26 |
| which mac mini for openclaw | 170 | 23 | $0.00 |
| why mac mini for openclaw | 140 | 27 | $0.00 |
| openclaw hardware requirements | 210 | 23 | $5.57 |
| mac mini for ai | 390 | 28 | $0.68 |
| mac mini for ai agents | 140 | 29 | $1.15 |
| best mac mini for ai | 70 | 28 | $1.29 |
| best local llm hardware | 170 | 27 | $7.24 |
| best mini pc for openclaw | 70 | 19 | $0.00 |

- **Angle:** "Which Mac mini do you actually need?" split by workload: (a) cloud models only (any Mac mini, or a $150–350 N150 box is enough), (b) local 8–14B models (24–32GB unified memory), (c) 30B+ local models (M5 Pro / Strix Halo / Mac Studio). Answer "why a Mac mini" honestly: idle power, macOS-only integrations (iMessage, Shortcuts), always-on reliability. Then give the cheaper x86 alternative.
- **Must cover:** RAM tiers vs model sizes (link `openclaw-ollama-local-models`), idle watts and yearly cost, headless setup, keeping it online (UPS → A4/B6), storage expansion (→ B3).
- **Products:** existing slugs `mac-mini-m4` (B0DLBTPDCS, 16GB/256GB), `mac-mini-m6`, `mac-studio-m5-max`, `gmktec-n150`, `gmktec-evo-x2-128gb`, `beelink-ser9-pro`. Accessories: `ugreen-revodok-mac-mini-dock` (B0GQ4DN6MH, $54.99, 4.3★/146), `apc-be425m` (B01HDC236Q, $62.50, 4.5★/114).
- **To verify:** the site says the Mac mini M6 ($899) replaced the M4 on Aug 25, 2026 and the M5 Pro starts at $1,699 (`best-mini-pc-home-server`). Check what Amazon actually stocks (leftover M4 stock may be the value pick) and add `/go/` slugs for the M6 configs you recommend.
- **Internal links:** add a "Hardware for always-on agents" box to the top OpenClaw/Hermes posts (`openclaw-ollama-local-models`, `best-openclaw-dashboards`, `openclaw-alternatives`, `best-opensource-models-for-openclaw`, `hermes-agent-setup-guide`, `best-hermes-dashboards`) and link back from this article.

#### A2. Best Mini PC for Plex & Jellyfin (2026)

> **Status:** DONE 2026-10-23 — `src/content/posts/best-mini-pc-plex-jellyfin.mdx`, WebP cover, `/go/` slugs wired, inbound links added. Note: `gmktec-n150` dropped (wrong listing), `beelink-mini-s13` used.

- **Slug:** `best-mini-pc-plex-jellyfin` · **Category:** `self-hosting` · **Tags:** `plex`, `jellyfin`, `mini-pc`
- **SERP:** EASY. Reddit, HowToGeek, a vendor blog (alliwava), Facebook, lon.tv, ResetEra, Tom's forum. The Jellyfin SERP is Reddit, jellywatch, XDA, tildes, YouTube.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| mini pc for plex server | 480 | 17 | $0.76 |
| mini pc for jellyfin server | 480 | 20 | $0.55 |
| mini pc for plex | 210 | 18 | $0.87 |
| best mini pc for plex | 210 | 29 | $1.28 |
| best mini pc for plex server | 170 | 16 | $1.04 |
| mini pc for jellyfin | 70 | 22 | $0.62 |
| mini pc for plex media server | 70 | 16 | $0.00 |
| best mini pc for jellyfin | 50 | 20 | $0.70 |
| best mini pc for jellyfin server | 40 | 20 | $0.89 |
| best mini pc for plex 4k transcoding | 40 | 18 | $1.06 |
| intel n100 mini pc for plex | 40 | 8 | $0.00 |

- **Angle:** "Transcodes per watt." Intel Quick Sync (N150 / Core Ultra) vs AMD for Plex and Jellyfin, with how many simultaneous 4K→1080p HEVC transcodes each tier handles, idle watts, and where storage lives (internal, USB DAS, or NAS share).
- **Must cover:** Plex Pass requirement for hardware transcoding, Jellyfin QSV/VAAPI setup snippet, tone mapping, AV1, 2.5GbE, storage options (link A6 and B4), and the Docker compose from `self-host-jellyfin`. Re-check whether Plex AMD hardware transcoding is still caveated in 2026.
- **Products:** existing `gmktec-n150` (the site's #1 clicked product), `beelink-eq14`, `gmktec-k15` (Core Ultra), `asus-nuc-15-pro-tall`, `minisforum-ms-01-i9-32gb`. New: `beelink-mini-s13-pro` (B08K73CKNL, $349, 4.5★/658), `asus-nuc-14-essential-n150` (B0H7HNJZ2P, $529, 4.6★/20, expensive for an N150, so use it as a "brand-name" option only).
- **Not on Amazon (skip):** GMKtec NucBox G3 Plus, Beelink SEi14, Minisforum UH125 Pro.
- **Cannibalization:** after publishing, cut the hub's Plex section to a two-line summary that links here with the anchor "best mini PC for Plex and Jellyfin".

#### A3. Best Mini PC & Hardware for Home Assistant (2026)

> **Status:** DONE 2026-10-23 — `src/content/posts/best-home-assistant-hardware.mdx`, WebP cover, `/go/` slugs wired, inbound links added.

- **Slug:** `best-home-assistant-hardware` · **Category:** `self-hosting` · **Tags:** `home-assistant`, `mini-pc`, `zigbee`
- **SERP:** EASY. Reddit, community.home-assistant.io, jrattechworks, XDA, Facebook, promptquorum, computingforgeeks. computingforgeeks published a batch of homelab hardware guides on Oct 10, 2026 (also #1 for "best ups for nas"), so move fast here.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| home assistant hardware | 720 | 28 | $1.82 |
| mini pc for home assistant | 480 | 22 | $0.81 |
| best mini pc for home assistant | 260 | 25 | $1.51 |
| best home assistant hardware | 90 | 30 | $3.62 |
| home assistant hardware requirements | 90 | 33 | $0.00 |
| beelink mini pc for home assistant | 50 | 20 | $0.00 |

- **Angle:** Home Assistant Green vs N150 mini PC (HAOS bare-metal or a Proxmox VM) vs Raspberry Pi 5. The decision hinges on Frigate, voice (local Whisper/Piper), and how many add-ons you run. Keep the Sep 2026 corrections: Coral TPU is dead for new Frigate builds (use Hailo or Intel iGPU + OpenVINO), and Home Assistant Yellow is discontinued.
- **Products:** `home-assistant-green` (B0CXVKSG19, $219, 4.3★/915; Amazon is about 2× the $99 official price, so say so and also link the official store), `gmktec-n150`, `beelink-eq14`, `beelink-mini-s13-pro`, `rpi-ai-hat-plus` (B0DLKBL8D9, 3.8★/11, weak listing, mention only), plus a radio from B5 (`sonoff-dongle-plus-mg24`, B0FMJD288B, $35.90, 4.7★/725).
- **Not on Amazon:** Home Assistant Connect ZBT-2. Link the official store with no commission.
- **Links:** to B5 (Zigbee/Thread), A2, `best-mini-pc-proxmox`, and the energy-plug section (B5).

#### A4. Best Rack Mount UPS for Homelab & NAS (1U/2U + LiFePO4)

> **Status:** DONE 2026-10-23 — `src/content/posts/best-rack-mount-ups-homelab.mdx`, WebP cover, `/go/` slugs wired, inbound links added. Note: Tripp Lite SMART500RT1U demoted to mention (PWM sine, not pure sine).

- **Slug:** `best-rack-mount-ups-homelab` · **Category:** `self-hosting` · **Tags:** `ups`, `homelab`, `nas`
- **Why it scores highest:** high volume at low SD (rack mount ups 2,900 / SD 21, CPC $3.11), an all-forum SERP (Reddit ×2, Ubiquiti community ×2, ServeTheHome forums, rackmountsolutions, refurbups, YouTube), and big baskets ($220–$900). The existing UPS guide already converts at 20.4%.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| rack mount ups | 2,900 | 21 | $3.11 |
| ups for nas | 480 | 20 | $1.18 |
| lifepo4 ups | 880 | 19 | $2.85 |
| 1u rack mount ups | 210 | 24 | $1.67 |
| best rack mount ups | 140 | 21 | $1.50 |
| best ups for network rack | 140 | 23 | $1.55 |
| 2u rack mount ups | 110 | 22 | $2.64 |
| best ups for nas | 70 | 19 | $1.15 |
| rack mount ups with network | 70 | 19 | $1.72 |
| best lifepo4 ups | 30 | 20 | $3.14 |

- **Angle:** 1U vs 2U, runtime at real homelab loads (60/120/250W), pure sine vs simulated sine for active-PFC PSUs, NUT/USB/SNMP shutdown for TrueNAS, Synology, Proxmox and UniFi, and lead-acid vs LiFePO4 (cost per year of battery life).
- **Products:** `cyberpower-or500lcdrm1u` (B000XJJN60, $219.95, 4.5★/846), `cyberpower-or700lcdrm1u` (B000XJLLKG, $329.95, 4.4★/419), existing `cyberpower-cp1500pfcrm2u`, `cyberpower-cp500pfcrm1u` (B0DCLRZYZW, $269.95, 4.4★/33, sine 1U), `tripp-lite-smart500rt1u` (B0002CUA6K, $221.40, 4.3★/172), `tripp-lite-smart1500lcd` (B000DZRY9C, $287.96, 4.0★/17), `apc-smt1500rm2uc` (B0762MQK6H, $909.89, 4.2★/123), `goldenmate-1000va-lifepo4` (B0GL1T6Z4H, $229.48, 4.5★/89), existing `ecoflow-delta-3`.
- **Avoid:** Eaton 5P1500R (2.1★ from 2 ratings at $914). Also the Ubiquiti "950W UPS" listing (third-party only, model unclear).
- **Cannibalization:** move the detailed rackmount section out of `best-ups-for-home-server`, keep a summary there, and link both ways. That page currently ranks #3 for "best rackmount ups" on tiny volume.

#### A5. Best 10-inch Mini Rack for a Homelab (2026)

> **Status:** DONE 2026-10-23 — `src/content/posts/best-10-inch-mini-rack.mdx`, WebP cover, `/go/` slugs wired, inbound links added. Note: T0 Plus listed at $71.99 (plan had $79.99).

- **Slug:** `best-10-inch-mini-rack` · **Category:** `self-hosting` · **Tags:** `homelab`, `mini-rack`, `networking`
- **SERP:** "10 inch rack homelab" has no big editorial site (virtualizationhowto, Reddit, Jeff Geerling, MakerWorld, loganmarchione, YouTube, ZimaSpace). "mini rack homelab" is MID (Amazon, Reddit, Jeff Geerling, Ars Technica).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| mini rack | 1,600 | 17 | $1.75 |
| 10 inch rack | 880 | 26 | $0.97 |
| server mini rack | 1,900 | 30 | $2.23 |
| mini rack mount | 1,600 | 25 | $1.36 |
| homelab mini rack | 140 | 28 | $2.53 |
| mini rack for home lab | 110 | 25 | $1.30 |
| tool less mini rack | 260 | 23 | $0.88 |
| deskpi mini rack | 170 | 25 | $0.51 |
| 10 inch rack ups | 140 | 27 | $1.04 |
| 10 inch rack nas | 140 | 25 | $2.15 |
| 10 inch rack pdu | 140 | 28 | $0.65 |
| small server rack for home | 320 | 32 | $2.19 |
| best server rack for home lab | 50 | 19 | $1.53 |

- **Angle:** "Build a 10-inch rack that's actually useful." Rack picks plus a full parts cart: shelves, a 12-port patch panel, a 2.5GbE switch that fits, a mini PC on a shelf, power, cable management. Show a 4U/8U/12U build with total cost. Multi-item carts make this the best basket in the plan.
- **Products:** `geeekpi-rackmate-t2-12u` (B0FYNM62F7, $149.99, 4.8★/235), `geeekpi-rackmate-t1-8u` (B0FBFDZD4C, $119.99, 4.6★/322), `geeekpi-rackmate-t0-plus-4u` (B0DPGZPTPP, $79.99, 4.7★/232), `tecmojo-10in-9u-rack` (B0FX1VDY8T, $119.90, 4.5★/161), `tecmojo-10in-4u-rack` (B0FM7SWXWP, $59.90, 4.5★/187), `geeekpi-10in-patch-panel-12` (B0D5XPNHHF, $15.99, 4.7★/251), `geeekpi-10in-1u-shelf` (B0D5XGSPXD, $18.99, 4.7★/146), existing `tp-link-tl-sg105s-m2` / `ugreen-2-5gbe-switch`.
- **Note:** the Ubiquiti UniFi Toolless Mini Rack listing (B0H91T4W28, $357.43) has 0 ratings. Link store.ui.com instead or skip the buy button.
- **Still to source when writing:** a 10-inch PDU, 10-inch UPS options, Pi/mini-PC rack mounts.

#### A6. Best Hard Drives for NAS (2026): IronWolf vs WD Red Plus vs Exos vs N300

- **Slug:** `best-hard-drives-for-nas` · **Category:** `self-hosting` · **Tags:** `nas`, `hard-drives`, `homelab`
- **SERP:** EASY/MID. NASCompares, SpaceRex forum, Newegg, Reddit, WD, SynoForum, orangehardwares. "seagate ironwolf vs wd red" and "best hard drive for plex server" are fully forum-driven.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| hard drives for nas | 3,600 | 33 | $1.60 |
| best hard drives for nas | 1,600 | 29 | $1.61 |
| cheap nas drives | 1,300 | 29 | $1.07 |
| nas drives comparison | 480 | 16 | $1.38 |
| cmr vs smr | 1,000 | 20 | $0.00 |
| cmr vs smr for nas | 110 | 23 | $0.00 |
| seagate ironwolf vs wd red | 260 | 22 | $1.55 |
| ironwolf vs wd red | 140 | 24 | $3.13 |
| seagate ironwolf vs wd red plus | 90 | 19 | $6.59 |
| cheap hard drives for nas | 140 | 23 | $1.15 |
| best nas drives | 720 | 35 | $1.49 |
| best hard drive for plex server | 50 | 21 | $2.68 |

- **Hook (prices are high, so lead with $/TB):**

| Drive | Amazon price (Oct 23) | $/TB | Rating |
|---|---:|---:|---|
| Seagate Exos X24 24TB | $798.99 | $33.3 | 4.3★/29 |
| Seagate IronWolf 12TB | $449.99 | $37.5 | 4.5★/131 |
| WD Red Plus 12TB | $509.99 | $42.5 | 3.9★/404 |
| Seagate IronWolf Pro 20TB | $879.99 | $44.0 | 3.9★/337 |
| WD Red Pro 20TB | $902.33 | $45.1 | 3.9★/23 |
| Toshiba N300 12TB | $689.88 | $57.5 | 4.4★/64 |

- **Must cover:** CMR vs SMR (avoid SMR in RAID/ZFS), noise and power (Exos is loud, which matters in a living-room NAS), warranty years, the drive count vs RAID level calculator, and buying from different batches. Recertified drives are cheaper but mostly sold outside Amazon, so be honest about that.
- **Data caveat:** the IronWolf 12TB listing (B084ZTSMWF) has a Dutch title, so confirm it's a US-sold listing before linking.
- **Links:** from `best-nas-homelab-docker-proxmox` (the UGREEN DXP4800 Plus is the #2 clicked product, and buyers need drives), A2, B4, B7.

#### A7. Best GPU for Local LLMs in 2026 (VRAM per dollar)

- **Slug:** `best-gpu-for-local-llm` · **Category:** `ai` · **Tags:** `local-llm`, `ollama`, `gpu`
- **SERP:** EASY. Reddit r/LocalLLaMA, hostrunway, llmconfigurator, Medium, spheron, techenclave, fluence, Level1 forum. No big editorial site in the top 8.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| best gpu for ai | 1,000 | 28 | $2.45 |
| best gpu for local llm | 170 | 16 | $0.99 |
| gpu for local llm | 140 | 20 | $5.43 |
| nvidia gpu for local llm | 90 | 12 | $2.92 |
| best gpu for ollama | 40 | 19 | $0.00 |
| gpu for ollama | 40 | 25 | $0.48 |
| best gpu for ai image generation | 40 | 20 | $8.57 |
| best local llm hardware | 170 | 27 | $7.24 |

- **Hook (prices are far above MSRP, so rank by $/GB of VRAM):**

| GPU (most-reviewed listing) | Amazon price (Oct 23) | VRAM | $/GB VRAM | Rating |
|---|---:|---:|---:|---|
| RTX 5060 Ti 16GB | $765.99 | 16GB | $48 | 4.6★/431 |
| Intel Arc B580 12GB | $599.00 | 12GB | $50 | 4.4★/34 |
| RX 9070 XT 16GB | $829.99 | 16GB | $52 | 4.6★/496 |
| Radeon AI PRO R9700 32GB | $2,095.27 | 32GB | $65 | 4.4★/62 |
| RTX 3090 24GB | $1,929.99 | 24GB | $80 | 4.4★/110 |
| RTX 5070 Ti 16GB | $1,299.99 | 16GB | $81 | 4.6★/170 |
| RTX 5080 16GB | $2,389.95 | 16GB | $149 | 4.7★/292 |
| RTX 5090 32GB | $7,968.00 | 32GB | $249 | 4.4★/270 |

- **Angle:** what fits in 12/16/24/32GB (model + context), tokens/s expectations (label estimates as estimates), CUDA vs ROCm vs Vulkan/llama.cpp in 2026, multi-GPU, and **when not to buy a GPU** (Strix Halo 128GB / Mac Studio → A8). Intel Arc Pro B60 24GB had no buy-box price; mention it only.
- **Links:** from `best-mini-pc-local-llm`, `ollama-docker-install`, `best-open-source-llms-claude-alternative` (759 visitors/mo, no hardware link today), `openclaw-ollama-local-models`.

#### A8. DGX Spark Alternatives: Strix Halo Mini PCs Compared

- **Slug:** `dgx-spark-alternatives-strix-halo` · **Category:** `ai` · **Tags:** `local-llm`, `strix-halo`, `mini-pc`
- **SERP:** "dgx spark alternative" is EASY (betterclaw, Reddit, NVIDIA forums, Medium, centralcomputer, YouTube, spheron, LinkedIn). "best strix halo mini pc" is MID (Reddit, STH forums, Best Buy, YouTube, notebookcheck, Tom's).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| strix halo mini pc | 1,000 | 25 | $1.10 |
| ai mini pc | 720 | 30 | $1.71 |
| amd strix halo mini pc | 480 | 31 | $1.22 |
| dgx spark alternative | 260 | 24 | $4.76 |
| nvidia dgx spark alternative | 210 | 26 | $5.03 |
| home ai server | 210 | 28 | $4.71 |
| best ai mini pc | 140 | 27 | $2.20 |
| best home ai server | 110 | 26 | $1.40 |
| evo x2 ai mini pc | 90 | 23 | $1.81 |
| strix halo mini pc 128gb | 90 | 19 | $2.18 |
| best strix halo mini pc | 30 | 26 | $2.59 |

- **Angle:** a spec and price table of every Ryzen AI Max+ 395 box (cooling, ports, 10GbE, BIOS VRAM allocation, idle watts) vs DGX Spark vs Mac Studio, plus who should buy which. GSC already shows "minisforum ms-s1 max vs gmktec evo-x2" queries.
- **Products:** existing `gmktec-evo-x2-128gb` (#7 clicked product), `minisforum-ms-s1-max-128`, `beelink-gtr9-pro`, `nvidia-dgx-spark`, `mac-studio-m5-max`. New: `bosgame-m5-128gb` (B0H97V3LL5, $3,599, 4.3★/636), `hp-z2-mini-g1a` (B0H48VDG2V, $1,899.99, 3 ratings; check the configuration). The NIMO listing has 4 ratings, so mention it only. Corsair AI Workstation 300 and Framework Desktop aren't on Amazon.
- **Cannibalization:** this is a comparison piece. `best-mini-pc-local-llm` stays the "best" roundup. Cross-link with distinct anchors.

#### A9. OCuLink eGPU Docks (and the Mini PCs That Have OCuLink)

- **Slug:** `best-oculink-egpu-dock` · **Category:** `gadgets` (matches the TB5 dock/enclosure guides; link to the `ai` pieces A7/A8 for the local-LLM angle) · **Tags:** `egpu`, `oculink`, `mini-pc`
- **SERP:** "best mini pc with oculink" is EASY (Reddit, Minisforum store, YouTube, Amazon, Facebook, AOOSTAR). "oculink egpu dock" and "best egpu enclosure" are MID (egpu.io, gagadget, Sonnet, LaptopMag 2021, Amazon).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| oculink egpu | 1,300 | 22 | $0.48 |
| oculink egpu dock | 320 | 28 | $0.48 |
| oculink dock | 320 | 22 | $0.58 |
| mini pc with oculink | 320 | 24 | $0.98 |
| mini pc with oculink port | 170 | 24 | $0.75 |
| oculink egpu enclosure | 140 | 25 | $0.30 |
| best mini pc with oculink | 50 | 29 | $1.32 |
| thunderbolt 5 egpu enclosure | 110 | 31 | $0.72 |
| best egpu enclosure | 110 | 33 | $0.78 |
| egpu enclosure for laptop | 390 | 27 | $0.13 |
| egpu enclosure | 2,900 | 30 | $0.58 |

- **Angle:** OCuLink (PCIe 4.0 x4, ~64Gbps) vs TB5/USB4 v2 (80Gbps) vs TB4. Bandwidth loss in games vs LLM inference (once a model is loaded, link speed barely matters), hot-plug caveats, PSU sizing.
- **Products:** `minisforum-deg1` (B0DNJPGTHZ, $109, 4.3★/140), `minisforum-deg2` (B0GDY4HZBH, $247, 4.3★/140), `aoostar-ag02` (B0DXTLTLF5, $229, 4.1★/116), `razer-core-x-v2` (B0FFQFDZWX, $349.99, 4.1★/92), `sonnet-breakaway-box-850-t5` (B0FX86P6T8, $599.99, 4.6★/16), `minisforum-um890-pro` (B0D9YJLZP6, $989, 4.2★/402). Confirm OCuLink on the existing `minisforum-ai-x1-pro` / `gmktec-k11` before listing them.

### Tier 2 — Jan → Jun 2027

| ID | Article / slug idea | Category · tags | Keywords (vol / SD) | SERP notes | Products (Amazon, Oct 23) |
|---|---|---|---|---|---|
| **B1** | Best Thunderbolt 5 Cables (we tested them) · `best-thunderbolt-5-cables` | `gadgets` · thunderbolt-5, cables, macbook | thunderbolt 5 cable 5,400/34 (stretch), best thunderbolt 5 cable 260/37, thunderbolt 5 cable for macbook 210/20, intel certified thunderbolt 5 cable 90/19, long 90/23, longest 70/24, max length 30/18, backwards compatible 30/21; brand terms: anker prime 1,900/24, owc 480/23, cable matters 140/18 | MID: CalDigit, Reddit, YouTube, Macworld, Best Buy, Cable Matters, AppleInsider forum. **Moat:** measured throughput with the docks and enclosures you already own | anker-prime-tb5-cable B0DXZCXK2C $37.99 4.7★/683 · cable-matters-tb5-cable B0D7WHLFWX $35 4.6★/389 · owc-tb5-cable-1m B0DH7PFRD1 $34.99 4.5★/414 · apple-tb5-pro-cable B0FH5PWC69 $69 4.4★/145 · caldigit-tb5-cable-1-5m B0HJRP6DRK $79.99 4.5★/108 · belkin B0DT4KVNHQ $39.99 · ugreen B0DNG739TK $34.95 4.9★/77 · silkland-usb4-80g B0FB3YXRBF $24.93 4.6★/554 |
| **B2** | Best IP KVM for Homelab: GL.iNet Comet vs JetKVM vs NanoKVM vs PiKVM · `best-ip-kvm-homelab` | `self-hosting` · ip-kvm, homelab, remote-access | ip kvm switch 1,900/26, kvm over ip switch 320/20, remote kvm over ip 110/29, kvm over ip raspberry pi 90/31, jetkvm vs pikvm 70/31, pikvm vs jetkvm 50/20, pikvm alternative 70/29, best kvm over ip 50/20, pikvm v4 mini 260/28 | EASY: Jeff Geerling, Reddit ×2, STH forums, Facebook, YouTube, pikvm.org. Tailscale built into Comet is the self-hosting hook | glinet-comet-gl-rm1 B0F21SQ4S8 $99.99 4.4★/862 · glinet-comet-poe B0FDQJ1V7J $115.99 4.6★/406 · glinet-comet-pro B0G1BS7WWK $179.99 4.5★/442 · glinet-comet-x (4-port) B0H5QCG2P7 $279.99 4.9★/10 · jetkvm B0FY63H6NH $142.39 4.4★/96 · sipeed-nanokvm B0DHVY1CJS $75.99 3.8★/41 · pikvm-v4-mini B0CV93FNLF $309.95 4.3★/38 |
| **B3** | Best Mac mini Dock with SSD Enclosure (M4/M5/M6) · `best-mac-mini-dock` | `gadgets` · mac-mini, docks, ssd | mac mini dock 1,600/22, external ssd for mac mini 1,600/31, external ssd for mac mini m4 590/31, mac mini stand 590/29, best mac mini dock 210/30, ugreen mac mini dock 170/22, m4 mac mini dock 140/35, mac mini dock with storage 70/35 | "best mac mini dock" MID (Tom's Guide, Best Buy, Reddit, YouTube). "external ssd for mac mini m4" EASY. Avoid the head "best mac mini accessories" (HARD) | ugreen-revodok-mac-mini-dock B0GQ4DN6MH $54.99 4.3★/146 · ugreen-mac-mini-dock-dp B0GQ42B4WQ $62.99 4.5★/67 · ivanky-mac-mini-dock-13in1 B0GX68Q8Q4 $56.98 4.3★/344 · tobenone-mac-mini-dock B0GC9S23R1 $69.99 4.3★/350 · hagibis B0DP8ZX7K8 $54.99 4.0★/96 · satechi B0DV6WJ88D $99.99 (13 ratings) · samsung-t9-2tb B0CHFS9K14 $449.50 · crucial-x10-pro-2tb B0C9WGS6MC $365.72 · existing owc-envoy-ultra-2tb, raycue-80gbps-enclosure |
| **B4** | Best DAS / JBOD Enclosure for a Homelab (and when it beats a NAS) · `best-das-enclosure-homelab` | `self-hosting` · das, storage, homelab | jbod enclosure 880/22, das enclosure 480/29, best das enclosure 70/22, 4 bay das enclosure 50/26, best jbod enclosure 30/30, thunderbolt das enclosure 30/22 | "best jbod enclosure" EASY. "best das enclosure" MID (NASCompares, Reddit, cloudzat). **Unique angle:** mini PC + USB DAS + MergerFS/SnapRAID vs a NAS, for Docker users | terramaster-d4-320 B0CTTL9R7Z $170.99 4.2★/393 · terramaster-d2-320 B0C8GCZP5K $116.99 4.3★/124 · qnap-tr-004 B07K4RC7X9 $219 4.1★/655 · sabrent-ds-sc4b B07Y3WDHLD $229.99 4.1★/32 · orico-4bay-20gbps B0GX9VF54Y $399.99 4.4★/54 · cenmate-4bay B0F2T1TVM3 $109.99 4.0★/338 |
| **B5** | Best Zigbee Coordinator & Thread Border Router for Home Assistant · `best-zigbee-coordinator-home-assistant` | `self-hosting` · zigbee, home-assistant, thread | zigbee coordinator 720/26, zigbee coordinator for home assistant 320/25, home assistant thread border router 260/24, thread border router for home assistant 210/24, home assistant connect zbt 2 110/22, best thread border router 90/18; plug section: zigbee smart plug 720/19, third reality zigbee smart plug 170/19, best zigbee smart plug 70/18 | EASY: zigbeehubs, Reddit, YouTube, Facebook ×3, HA community. **Cheap converters** (good for account health) | sonoff-dongle-plus-mg24 B0FMJD288B $35.90 4.7★/725 · sonoff-dongle-lite-mg21 B0G2LTBM1M $24.90 4.5★/474 · sonoff-dongle-max B0FMJH4DPN $42.90 4.3★/659 · sonoff-zbdongle-e B0FNLP58JS $36.99 4.7★/78 · smlight-slzb-06u B0BL6DQSB3 $72.99 4.2★/187 · smlight-slzb-mr1 B0F8Z7X2N3 $101.99 (11) · aeotec-z-stick-10-pro B0DV9RFSR9 $59.99 4.5★/182 · thirdreality-zigbee-plug-4pack B0BPY5D1KC $38.99 4.5★/856. ZBT-2: official store only |
| **B6** | Best Mini UPS for Router & Modem (keep your homelab reachable) · `best-mini-ups-router-modem` | `self-hosting` · ups, networking, homelab | ups for router 720/29, mini ups for router 390/27, ups for router and modem 390/27, ups for modem and router 390/27, small ups for router 140/27, best ups for router and modem 110/26, mini dc ups for router 110/28, 12v ups for router 50/28 | "best ups for router and modem" EASY (Level1, YouTube, Reddit, panther.ph, woyum, Quora, Facebook). "mini ups for router" is retailer-heavy | talentcell-mini-ups B07WLD32RP $64.99 4.2★/727 · apc-be425m B01HDC236Q $62.50 4.5★/114 · cyberpower-st425 B07GZR981Y $59.95 4.4★/54 · cyberpower-cp550slg B002QAUN2M $77.95 (16) · ecoflow-river-3 B0DB1S36YP $249 4.5★/912. APC BGE90M and CUZOR aren't on Amazon |
| **B7** | Best NAS Case for a DIY NAS in 2026 (+ N150/N305 boards) · `best-nas-case-diy-nas` | `self-hosting` · nas, diy-nas, homelab | nas case 2,900/28, itx nas case 720/27, best nas case 390/22, nas motherboard 720/23, nas motherboard mini itx 590/25, itx nas motherboard 480/22, home server case 260/24, 4 bay nas case 210/28, best nas motherboard 70/20, best home server case 50/20 | "best nas case" MID (wundertech, Reddit, Amazon, XDA, LTT). "best home server case" EASY. Turn it into a full parts list (case + board + drives from A6 + PSU) | jonsbo-n3 B0CMVBMVHT $159.59 4.5★/178 · jonsbo-n4 B0D1YH7D3J $119.99 4.1★/126 · jonsbo-n5 B0DG2N3PBB $249.99 4.6★/121 · jonsbo-n6 B0G2GVQSFL $175.99 4.6★/46 · darkrock-storage-master B0CQZS7KN5 $89.99 4.4★/373 · silverstone-cs382 B0CKTYSZV9 $241.39 4.2★/66. N150 NAS board B0DT9YQGZ2 has only 7 ratings. Fractal Node 304 had no price |
| **B8** | Best Mini PC for OPNsense / pfSense · `best-mini-pc-opnsense` | `self-hosting` · opnsense, firewall, networking | opnsense hardware 720/28, firewall appliance 390/34, mini pc for pfsense 140/23, firewall mini pc 140/25, best opnsense hardware 70/19, home firewall appliance 70/27, best mini pc for pfsense 40/23, protectli alternative 40/28 | EASY: Reddit, YouTube, homenetworkguy, OPNsense forum, Facebook, LTT, XDA. **Weak monetization:** Amazon firewall boxes have 2–14 ratings | protectli-vault-fw4c B0BDCZC3YX $369 4.5★/35 · existing beelink-eq14 (dual 2.5GbE), minisforum-ms-01-i9-barebone (10G SFP+). Keep the Sep 2026 rule: no buy button on untested Topton/CWWK boxes (e.g. B0GV7HK6PC, 2 ratings) |
| **B9** | Best Travel Router for Remote Work (WireGuard & Tailscale) · `best-travel-router-wireguard-tailscale` | `self-hosting` · travel-router, wireguard, tailscale | best travel router 1,300/31, travel router for hotel wifi 880/26, gl inet travel router 2,400/29, travel router for hotel 320/23, wifi 6 travel router 320/27 (head "travel router" 9,900/32 is a stretch) | EASY-ish: RTINGS #1, then Reddit ×2, Facebook, Bogleheads, NASCompares, GL.iNet, Dong Knows. **Products not yet checked on Amazon** | To check: GL.iNet Slate 7 (GL-BE3600), Beryl AX (GL-MT3000), Opal (GL-SFT1200), Mango, TP-Link TL-WR1502X, UniFi Travel Router |
| **B10** | Best Keyboard for Programming (2026) · `best-keyboard-for-programming` | `gadgets` · keyboards, developer-setup | good keyboard for programming 1,300/27, mechanical keyboard for programming 480/24, good mechanical keyboard for programming 320/29, best mechanical keyboard for programming 260/24, best mac keyboard for programming 40/29 | EASY: RTINGS #1, then Reddit, Medium, mkbguide, YouTube, Quora | keychron-v1-max B0CR16KS3F $99.99 4.4★/76 · keychron-k2-he B0DCVPGB9N $139.99 4.3★/495 · keychron-q1-max B0CR1J7SPX $229.99 4.5★/41 · logitech-mx-mechanical B09LJWWX4Y $179.99 4.4★/934 · hhkb-hybrid-type-s B082TQK2SB $295 4.4★/395 · kinesis-advantage360 B0BCHMGZMD $479 4.0★/203 · nuphy-air75-v3 B0FFFZ7R2K $139.95 3.9★/373. Skip Keychron Q11 (3.6★/11) |
| **B11** | Best PoE Switch for IP Cameras (Frigate NVR) · `best-poe-switch-ip-cameras` | `self-hosting` · poe, frigate, networking | poe switch for ip camera 1,300/17, poe switch for camera 1,000/25, poe switch for security cameras 880/20, poe switch for cameras 880/18, ip camera poe switch 720/11, managed switch 8 port poe 260/20 | MID: Reddit, NETGEAR, kijero, securitycameraking, Level1, omnitron, cctvcameraworld. VLAN isolation for cameras plus Frigate is the angle nobody covers | Existing: tp-link-tl-sg105pp-m2, yuanley-8-port-2-5g-poe, ubiquiti-flex-2-5g-poe. To check: TP-Link TL-SG1210P / TL-SG1008P, NETGEAR GS308PP, UniFi Lite 8 PoE |
| **B12** | Best SSD for NAS: NVMe Cache vs All-Flash · `best-ssd-for-nas` | `self-hosting` · nas, ssd, storage | ssd for nas 4,400/29, best ssd for nas 480/31, nvme nas 1,300/27, nvme ssd for nas 170/20, sata ssd for nas 170/22, m 2 nvme ssd for nas 90/20, hdd vs ssd for nas 90/28 | EASY/MID: Reddit, SanDisk, Tom's, lincplus, Level1, TrueNAS forums, Synology community. **Price anomaly:** WD Red SN700 1TB listed at $459.95, Samsung 990 EVO Plus 2TB at $362 with 7 ratings. Publish when SSD prices look sane, or frame it as "small cache SSD only" | Recheck at writing |

### Tier 3 — opportunistic / H2 2027

- **C1 Raspberry Pi 5 NAS Build** (`raspberry pi 5 nas` 720/24, `raspberry pi 5 nas case` 210/20, `raspberry pi 5 nvme hat` 210/29, `best raspberry pi 5 case` 90/21). Needs a real build. Products: radxa-penta-sata-hat B0DX1HQWB2 $79.99 4.3★/77, sunfounder-pironman-5-max B0F8J5HW21 $94.99 4.4★/635, argon-one-v3-m2 B0CT2MDV2D $49.99 4.4★/203, pimoroni-nvme-base-duo B0D4SGF2QT $39.09 4.3★/23. A bare Pi 5 16GB board isn't listed (kits only, ~$406).
- **C2 Best 5K Monitor for Mac / Studio Display Alternatives** (`5k monitor for mac` 880/28, `apple studio display alternative` 720/30, `32 inch 5k monitor` 720/26, `best 5k monitor` 480/28). MID SERP (RTINGS, Macworld, Best Buy) and weak Amazon listings: ASUS PA27JCV 3.6★/158; LG 27MD5KL $3,998 new ($799 renewed, B07XVLVD22); Kuycon G27P 3.0★/1; BenQ MA270S and Samsung ViewFinity S9 5K not found. Monitor content converts at ~2% here. Write only if the dev-desk cluster takes off.
- **C3 Best Monitor Light Bar** (`best monitor light bar` 590/27, `monitor light bar for eye strain` 480/20). Off-core. Better as a section in the gift guide.
- **S1 Seasonal: Gifts for Programmers & Homelabbers** (`gifts for programmers` 590/28, `best gifts for programmers` 110/31). Publish ~Nov 15 each year as a curated list of cheap SKUs from every article above: a TB5 cable, a Zigbee dongle, GL.iNet Comet, RackMate T0, a Mac mini dock, a keyboard.

---

## 5. Refreshes and retrofits (existing pages)

| # | Page | Evidence | Action |
|---|---|---|---|
| R1 | `best-mini-pc-home-server` | 25,422 impr / 90d, pos 12.4, CTR 0.5%. "mini server" 740 @ 24, "home servers" 545 @ 10, "server at home" 386 @ 10, "mini server pc" 288 @ 35, "small home server" 206 @ 23, "best mini pc for homelab" 158 @ 12 | Add a "mini server" framing (H2 + FAQ) and the phrases "mini server PC" / "small home server". Turn the Plex, HA and Proxmox sections into short summaries linking to A2/A3/`best-mini-pc-proxmox`. Test a meta title with "Mini Server". It's already the top clicker page (136 clickers/month) |
| R2 | `best-nas-homelab-docker-proxmox` | 9.5% clicker rate (lowest roundup). "best nas" 156 impr @ 7.5 | Add a "Drives to buy with it" block (A6) and "Or skip the NAS" (B4/A2). Add FAQ. Re-check UGREEN pricing |
| R3 | `best-ups-for-home-server` | 20.4% clicker rate. Rackmount content overlaps A4 | Move rackmount detail to A4. Add a "UPS for NAS" H2 (ups for nas 480/20) linking to A4, and a router/modem line linking to B6 |
| R4 | `best-thunderbolt-5-docks-guide` | "caldigit ts5 alternative" 133 impr @ 7.0 (bitdoze is #5 on the live SERP). "best thunderbolt 5 hub" 42 @ 9.9 | Add H2 "CalDigit TS5 alternatives (cheaper)" with a short table. Add a TB5 hubs section. Link B1 for cables |
| R5 | `best-mini-pc-local-llm` | "prebuilt pc for ollama" @ 12.8, "best pc for ollama" @ 13 | Add a "Need CUDA? Build a GPU box" section linking to A7. Link A8 for the full Strix Halo comparison |
| R6 | `black-friday-home-server-deals` (+ ES) | Converts at 20.5% of visitors (bot-filtered), the third-best rate on the site | Add a "Black Friday mini PC deals" H2 (590/32, MID SERP), update weekly to Cyber Monday (Nov 30), then flip to a "Prime Day homelab deals" page for July 2027 (confirm the date when Amazon announces it) |
| R7 | Hardware boxes on software posts | `docker-containers-home-server` gets 127 clickers/month from one block. `portainer-alternatives` 1,668 visitors → 5 clickers; `best-open-source-llms-claude-alternative` 759 → 0; `best-hermes-dashboards` 565 → 0; `setup-samba-linux` 254 → 4 | Add one contextual box per post (not a wall). Portainer → mini PC + DAS. LLM / OpenClaw / Hermes → A1 + A7. Samba/NFS → A6 + B4. `self-host-jellyfin` → A2. `ollama-docker-install` → A7 |
| R8 | Year flip | GSC has year-modified demand: "best thunderbolt 5 dock 2026" 302, "best mini pc for home server 2026" 174 | Around Dec 15, 2026 switch all roundup titles and descriptions to 2027 with a real update (prices, availability) |
| R9 | Low converters | OLED guide 2.1%, DC510 review 1.3%, GS5 0% | No new work. Keep them indexed. Don't spend refresh time here |

---

## 6. Ops and monetization levers

### 6.1 Geo-route `/go/` links (highest impact)

- **Problem:** 64.7% of real clickers are outside the US. Every `/go/` URL is `amazon.com/...tag=bido08-20`, so a German or UK reader who buys on their local Amazon most likely earns nothing.
- **Size of the prize:** countries with their own Amazon store add up to ~49% of clickers: DE 11.0, FR 6.3, NL 5.8, UK 5.4, CA 4.0, AU 3.0, BE 3.0, ES 3.0, IT 2.4, PL 2.4, plus AT 1.7 (served by .de) and SE 1.2.
- **Options:**
  1. **Amazon OneLink.** Join the UK/DE/FR/IT/ES/CA (and NL/BE/PL/SE/AU if offered) programs and link them in Associates Central. Check which marketplaces OneLink supports today and whether it works with the JS redirect on `/go/` pages.
  2. **First-party geo-routing.** Add optional per-market URLs to `src/data/affiliate-links.json` (e.g. `"urls": {"de": "...", "uk": "..."}`). Pick the market from `request.cf.country` in a Pages Function (`functions/_middleware.js` already runs on every request) or pass it to the static page. Fall back to a local-store search URL with the local tag when there's no ASIN mapping. Keep the Plausible event and add a `market` prop.
- **Order:** DE + UK + FR + CA first (26.7% of clickers), then ES/IT/NL.
- Re-check each program's terms on geo-redirection before shipping.

### 6.2 Bing / DuckDuckGo

About 28% of real clickers arrive from engines built on Bing's index (DDG 20.9%, Bing 5.6%, Qwant/Ecosia ~1%). Brave (2.9%) runs its own index. No IndexNow integration exists in the repo.
- Enable **Cloudflare Crawler Hints** (sends IndexNow on content changes), or add an IndexNow ping to the deploy.
- Submit `sitemap-en.xml` in Bing Webmaster Tools and check that the new affiliate pages are indexed there.

### 6.3 Article-level hardware boxes

See R7. Rule: one box per software post, placed after the reader has the solution, listing 1–3 products tied to that exact workload. That's what made the Docker post the #2 affiliate source.

### 6.4 Reporting hygiene (Plausible)

- About 40% of raw `affiliate_click` visitors have **no entry page**. These are direct hits on `/go/` URLs, concentrated in Singapore (212 raw → 16 real) and China, so treat them as bots.
- Report with `event:props:article` (it works) plus the filter `visit:entry_page contains "/"`.
- Save a monthly query set: clickers by article, by product, by country, and by source.

### 6.5 Prices and compliance

- Amazon prices on GPUs, HDDs and SSDs are far above MSRP right now. Never hardcode prices. Use "as of <date>", compute $/TB and $/GB tables at each refresh, and set a monthly price check on A6/A7/A8/B3/B12.
- Keep the Sep 2026 checklist: disclosure above the first link, no masking of the destination (the `/go/` page shows "Continue to Amazon"), no affiliate links in email.

### 6.6 Account health

Cheap-SKU articles (B1 cables, B5 dongles/plugs, B6 mini UPS) add frequent small orders, which protects against the 180-day no-sale rule as the catalog grows.

### 6.7 Spanish versions

Only after 6.1 ships, so ES readers land on amazon.es. Start with A2, A3, A5 and the existing ES hero pages.

### 6.8 New `/go/` slugs

101 verified entries are in Appendix C. Paste them into `src/data/affiliate-links.json` as each article ships, not all at once. Run `scripts/validate-affiliate-links.mjs` afterwards.

---

## 7. Calendar

**Realistic cadence:** 2 articles + 1 retrofit per week through Dec 20, then 1 article + 1 refresh per week. The Sep 21 batch shows new pages from this domain get impressions within 2–4 weeks (`best-tb5-nvme-enclosures`: 2,103 impressions and 58 clicks in its first 30 days), so anything live by ~Nov 22 can catch Black Friday (Nov 27) → Christmas demand.

| Week of | Articles | Retrofit / ops |
|---|---|---|
| Oct 26 | **A1** Mac mini for OpenClaw · **A2** Mini PC for Plex & Jellyfin | Hardware boxes on 6 OpenClaw/Hermes posts (R7) · start geo-routing spike (6.1) |
| Nov 2 | **A3** Home Assistant hardware · **A4** Rack mount UPS | R3 UPS split · enable Crawler Hints / Bing WMT (6.2) |
| Nov 9 | **A5** 10-inch mini rack · **A6** Hard drives for NAS | R2 NAS refresh · R6 BF page: mini PC deals H2 |
| Nov 16 | **A7** GPU for local LLMs · **S1** Gift guide | R5 local-LLM refresh |
| Nov 23 (BF) | **A8** DGX Spark alternatives | BF/CM daily-ish deal updates (EN + ES) |
| Nov 30 (CM) | **A9** OCuLink eGPU | R4 TB5 guide: TS5 alternatives + hubs |
| Dec 7 | **B5** Zigbee coordinator & Thread · **B1** TB5 cables | R1 home-server hub refresh |
| Dec 14 | **B2** IP KVM | **R8 year flip to 2027** on all roundups |
| Jan 2027 | **B3** Mac mini dock · **B4** DAS/JBOD · **B6** Mini UPS router | Ship geo-routing for DE/UK/FR/CA · monthly price refresh A6/A7 |
| Feb 2027 | **B7** NAS case / DIY NAS · **B8** OPNsense | ES versions of A2/A3/A5 (if 6.1 is live) |
| Mar 2027 | **B10** Keyboard for programming · **B9** Travel router | Q1 review: kill or double down per §9 |
| Apr–May 2027 | **B11** PoE switch for cameras · **B12** SSD for NAS (if prices normal) | Refresh Tier 1 (prices, new models) |
| Jun 2027 | **C1** Pi 5 NAS | Prime Day deals page prep |
| Jul 2027 | Prime Day homelab deals (date TBA by Amazon) | Refresh all roundups for Prime Day |
| Aug–Sep 2027 | C2/C3 only if the dev-desk cluster performs; otherwise second-wave homelab topics (10GbE adapters, NAS for Plex, mini PC for Kubernetes) | **Black Friday 2027 page live by Oct 1** |
| Oct–Nov 2027 | S1 gift guide refresh (Nov 15) | Prime Big Deal Days (Oct, TBA) + BF/CM 2027 updates |

---

## 8. What not to write (and why)

| Keyword / idea | Data | Why skip |
|---|---|---|
| best monitor for mac mini | 2,900 / SD 34 | HARD: RTINGS, Macworld, Wired, TechRadar, Best Buy |
| best mac mini accessories | 170 / SD 29 | HARD: 9to5Mac, TechRadar, Best Buy, Amazon. Target "mac mini dock" (B3) instead |
| best thunderbolt 4 dock | 590 / SD 39 | HARD: PCWorld, Tom's, NYT/Wirecutter, Windows Central |
| best n100 mini pc, best n150 mini pc, n150 mini pc | 40 / 25, 40 / 25, 1,000 / 34 | HARD/MID: XDA, TechRadar, Jeff Geerling, retailers. Win the job-based versions (A2/A3) |
| best fanless mini pc | 50 / SD 30 | HARD: PCMag, TechRadar, Tom's Guide |
| best kvm switch for 2 computers | kvm switch two computers 2,400 / 19 | HARD: PCMag + retailers despite the low SD. The IP-KVM angle (B2) is open |
| wifi 7 router, split keyboard, vertical mouse, portable monitor for laptop | 60.5k / 39, 12.1k / 49, 18.1k / 39, 22.2k / 45 | SD too high and off-niche |
| external hard drive for backup, nas for home | 27.1k / 60, 5.4k / 69 | SD far above bitdoze's range |
| home assistant green, gmktec evo-x2, beelink ser9 (brand heads) | 14.8k / 43, 3.6k / 50, 1.3k / 46 | Navigational, SD too high. Cover them inside roundups |
| More single-product reviews | DC510 1.3%, GS5 0%, iVANKY 0% clicker rate | Roundups convert 5–10× better on this site |

---

## 9. KPIs and monthly loop

**Per new article:**
- Indexed (GSC URL inspection) within 7 days.
- 60 days: ≥ 200 impressions/week and primary keyword ≤ position 15.
- 120 days: ≤ position 8.
- Clicker rate ≥ 15% (current roundup median ≈ 19%).

**Site targets** (bot-filtered Plausible clickers, baseline 632 in Sep 21 → Oct 22):

| Month | Target clickers / month |
|---|---:|
| Dec 2026 (BF/CM + 9 new pages) | 1,000 |
| Mar 2027 | 1,300 |
| Jul 2027 (Prime Day) | 1,800 |
| Nov 2027 (BF/CM) | 2,500 |

**Monthly loop (first Monday):**
1. Plausible: clickers by article, product, country and source (filters from §6.4).
2. GSC: for each affiliate page, new queries at positions 8–20 become an H2/FAQ to add. Pages with >500 impressions and CTR <1% get a title test.
3. Amazon Associates: export earnings by tracking ID/product. **Earnings data was not available for this plan.** Add EPC (earnings per click) per article and re-rank the backlog by EPC × clickers.
4. Price check: A6/A7/A8/B3/B12 tables.
5. The top-clicked product that has no dedicated guide becomes the next article idea.

---

## Appendix A — SERP checks (Google US, 2026-10-23)

| Query (Google US) | Big editorial/retail in top 8 | Forum/UGC in top 8 | Verdict | Top 5 results |
|---|---:|---:|---|---|
| best gpu for local llm | 0 | 3 | EASY | reddit.com, hostrunway.com, llmconfigurator.com, julsimon.medium.com, spheron.network |
| best hard drive for plex server | 0 | 6 | EASY | reddit.com, facebook.com, thediskguide.com, youtube.com, avsforum.com |
| best hard drives for nas | 1 | 3 | EASY | nascompares.com, forums.spacerex.co, newegg.com, reddit.com, westerndigital.com |
| best home assistant hardware | 0 | 4 | EASY | reddit.com, community.home-assistant.io, influxdata.com, facebook.com, youtube.com |
| best home server case | 1 | 5 | EASY | reddit.com, diymediaserver.com, youtube.com, forum.level1techs.com, amazon.com |
| best ip kvm | 0 | 5 | EASY | jeffgeerling.com, reddit.com, reddit.com, forums.servethehome.com, facebook.com |
| best jbod enclosure | 1 | 6 | EASY | reddit.com, amazon.com, facebook.com, youtube.com, forum.level1techs.com |
| best keyboard for programming | 1 | 5 | EASY | rtings.com, reddit.com, m1cola.medium.com, mkbguide.com, youtube.com |
| best lifepo4 ups | 1 | 5 | EASY | reddit.com, facebook.com, community.spiceworks.com, goldenmateenergy.com, falconups.com |
| best mac mini for openclaw | 0 | 5 | EASY | pages.thefountaininstitute.com, reddit.com, getopenclaw.ai, reddit.com, facebook.com |
| best mechanical keyboard for programming | 0 | 4 | EASY | thatsoftwaredude.com, reddit.com, deskthority.net, youtube.com, quora.com |
| best mini pc for home assistant | 1 | 4 | EASY | reddit.com, community.home-assistant.io, jrattechworks.com, xda-developers.com, facebook.com |
| best mini pc for homelab | 1 | 4 | EASY | reddit.com, virtualizationhowto.com, reddit.com, facebook.com, butterwhat.com |
| best mini pc for opnsense | 1 | 6 | EASY | reddit.com, youtube.com, homenetworkguy.com, forum.opnsense.org, facebook.com |
| best mini pc for plex | 1 | 5 | EASY | reddit.com, youtube.com, howtogeek.com, alliwava.com, facebook.com |
| best mini pc for plex server | 1 | 4 | EASY | reddit.com, howtogeek.com, alliwava.com, facebook.com, blog.lon.tv |
| best mini pc with oculink | 1 | 6 | EASY | reddit.com, store.minisforum.com, youtube.com, amazon.com, youtube.com |
| best nvme ssd for nas | 1 | 4 | EASY | reddit.com, lincplustech.com, tomshardware.com, sandisk.com, nascompares.com |
| best rack mount ups | 0 | 6 | EASY | reddit.com, reddit.com, community.ui.com, forums.servethehome.com, rackmountsolutions.net |
| best ssd for nas | 1 | 5 | EASY | reddit.com, sandisk.com, tomshardware.com, lincplustech.com, forum.level1techs.com |
| best thread border router for home assistant | 0 | 4 | EASY | community.home-assistant.io, smarthomescene.com, reddit.com, community.home-assistant.io, matteralpha.com |
| best travel router | 1 | 4 | EASY | rtings.com, reddit.com, reddit.com, facebook.com, bogleheads.org |
| best ups for nas | 0 | 5 | EASY | computingforgeeks.com, reddit.com, synology.com, qnap.com, facebook.com |
| best ups for router and modem | 0 | 5 | EASY | forum.level1techs.com, youtube.com, reddit.com, panther.ph, woyum.com |
| best zigbee coordinator | 1 | 4 | EASY | reddit.com, smarthomescene.com, community.home-assistant.io, youtube.com, gladysassistant.com |
| best zigbee coordinator for home assistant | 0 | 6 | EASY | zigbeehubs.com, zigbeehubs.com, reddit.com, youtube.com, facebook.com |
| best zigbee smart plug | 1 | 4 | EASY | reddit.com, thesmarthomejourney.com, community.home-assistant.io, amazon.com, community.hubitat.com |
| caldigit ts5 alternative | 1 | 3 | EASY | reddit.com, tomshardware.com, youtube.com, fstoppers.com, bitdoze.com |
| cmr vs smr for nas | 1 | 4 | EASY | reddit.com, buffaloamericas.com, truenas.com, terra-master.com, servethehome.com |
| dgx spark alternative | 0 | 4 | EASY | betterclaw.io, reddit.com, forums.developer.nvidia.com, medium.com, centralcomputer.com |
| external ssd for mac mini m4 | 1 | 5 | EASY | reddit.com, eshop.macsales.com, discussions.apple.com, expandmacmini.com, facebook.com |
| mac mini for openclaw | 0 | 4 | EASY | pages.thefountaininstitute.com, reddit.com, youtube.com, medium.com, us.ugreen.com |
| mini pc for jellyfin server | 1 | 4 | EASY | reddit.com, jellywatch.app, xda-developers.com, reddit.com, resetera.com |
| mini pc for pfsense | 1 | 4 | EASY | reddit.com, amazon.com, forum.netgate.com, hometechhacker.com, youtube.com |
| nvme nas | 1 | 4 | EASY | jeffgeerling.com, reddit.com, sandisk.com, youtube.com, reddit.com |
| openclaw hardware requirements | 1 | 3 | EASY | reddit.com, sfailabs.com, gist.github.com, acemagic.com, knolli.ai |
| seagate ironwolf vs wd red | 0 | 6 | EASY | reddit.com, nascompares.com, youtube.com, synoforum.com, facebook.com |
| thunderbolt 5 hub | 1 | 3 | EASY | owc.com, caldigit.com, reddit.com, eshop.macsales.com, youtube.com |
| zigbee coordinator for home assistant | 1 | 5 | EASY | home-assistant.io, reddit.com, amazon.com, community.home-assistant.io, youtube.com |
| 10 inch rack homelab | 0 | 2 | MID | virtualizationhowto.com, reddit.com, jeffgeerling.com, makerworld.com, loganmarchione.com |
| apple studio display alternative | 2 | 5 | MID | reddit.com, rtings.com, petapixel.com, youtube.com, 9to5mac.com |
| beelink me mini review | 2 | 0 | MID | servethehome.com, bee-link.com, liliputing.com, hothardware.com, nascompares.com |
| best 5k monitor for mac | 3 | 3 | MID | reddit.com, rtings.com, macworld.com, benq.com, bestbuy.com |
| best das enclosure | 2 | 4 | MID | nascompares.com, reddit.com, cloudzat.com, youtube.com, forums.launchbox-app.com |
| best displaylink dock for macbook air | 3 | 1 | MID | reddit.com, pcworld.com, discussions.apple.com, officegadgetslab.com, amazon.com |
| best egpu enclosure | 2 | 2 | MID | reddit.com, egpu.io, gagadget.com, youtube.com, sonnetstore.com |
| best egpu for mini pc | 3 | 1 | MID | amazon.com, reddit.com, egpu.io, tomsguide.com, newegg.com |
| best mac mini dock | 2 | 5 | MID | reddit.com, tomsguide.com, youtube.com, bestbuy.com, facebook.com |
| best monitor for programming | 2 | 2 | MID | rtings.com, reddit.com, benq.com, youtube.com, lenovo.com |
| best monitor light bar | 1 | 1 | MID | dygma.com, btod.com, benq.com, reddit.com, minimaldesksetups.com |
| best n100 mini pc | 3 | 2 | MID | reddit.com, jeffgeerling.com, blog.alexellis.io, amazon.com, youtube.com |
| best nas case | 2 | 4 | MID | wundertech.net, reddit.com, amazon.com, xda-developers.com, linustechtips.com |
| best nas motherboard | 2 | 4 | MID | lincplustech.com, reddit.com, nascompares.com, newegg.com, forums.lawrencesystems.com |
| best nvme enclosure | 2 | 4 | MID | tomshardware.com, reddit.com, gamingpcbuilder.com, youtube.com, bestbuy.com |
| best poe switch for security cameras | 0 | 2 | MID | reddit.com, netgear.com, kijero.com, securitycameraking.com, forum.level1techs.com |
| best strix halo mini pc | 2 | 5 | MID | reddit.com, reddit.com, forums.servethehome.com, bestbuy.com, youtube.com |
| best thunderbolt 5 cable | 2 | 4 | MID | us.caldigit.com, reddit.com, youtube.com, macworld.com, bestbuy.com |
| best ups for network rack | 2 | 5 | MID | reddit.com, amazon.com, nytimes.com, facebook.com, rackmountsolutions.net |
| best vertical monitor for programming | 3 | 3 | MID | rtings.com, reddit.com, benq.com, techradar.com, us.ktcplay.com |
| black friday mini pc deals | 3 | 3 | MID | geekompc.com, reddit.com, techradar.com, bestbuy.com, youtube.com |
| jetkvm vs pikvm | 0 | 2 | MID | reddit.com, jeffgeerling.com, news.ycombinator.com, fixoryhq.com, computingforgeeks.com |
| jonsbo n4 review | 2 | 1 | MID | nascompares.com, reddit.com, jonsbo.com, amazon.com, nascompares.com |
| mini rack homelab | 2 | 3 | MID | amazon.com, reddit.com, jeffgeerling.com, reddit.com, arstechnica.com |
| mini ups for router | 2 | 3 | MID | amazon.com, reddit.com, bestbuy.com, youtube.com, ebay.com |
| oculink egpu dock | 2 | 3 | MID | amazon.com, store.minisforum.com, reddit.com, aoostar.com, amazon.com |
| raspberry pi 5 nas | 2 | 3 | MID | raspberrypi.com, reddit.com, amazon.com, forums.raspberrypi.com, seeedstudio.com |
| thunderbolt 10gbe adapter | 1 | 2 | MID | owc.com, us.caldigit.com, reddit.com, sonnetstore.com, amazon.com |
| thunderbolt 5 cable for macbook | 2 | 5 | MID | apple.com, amazon.com, reddit.com, reddit.com, forums.macrumors.com |
| usb c hub for macbook pro | 3 | 2 | MID | hypershop.com, ezq.com, amazon.com, reddit.com, macworld.com |
| best fanless mini pc | 4 | 1 | HARD | reddit.com, pcmag.com, minipc-review.com, amazon.com, techradar.com |
| best kvm switch for 2 computers | 4 | 2 | HARD | reddit.com, pcmag.com, amazon.com, avaccess.com, newegg.com |
| best mac mini accessories | 4 | 2 | HARD | reddit.com, naumanahmad86.medium.com, 9to5mac.com, apple.com, techradar.com |
| best monitor for mac mini | 5 | 2 | HARD | rtings.com, reddit.com, macworld.com, ifeeltech.com, wired.com |
| best n150 mini pc | 5 | 2 | HARD | reddit.com, xda-developers.com, techradar.com, amazon.com, hagensieker.com |
| best thunderbolt 4 dock | 4 | 4 | HARD | pcworld.com, tomshardware.com, reddit.com, nytimes.com, windowscentral.com |

---

## Appendix B — Amazon availability notes (2026-10-23)

- **Not on amazon.com** (don't plan buy buttons): Home Assistant Connect ZBT-2, GMKtec NucBox G3 Plus, Beelink SEi14, Minisforum UH125 Pro, APC Back-UPS Connect BGE90M, CUZOR mini UPS, Mediasonic ProBox HF7-SU31C, iKOOLCORE R2 Max, Qotom 4-port 2.5GbE, Corsair AI Workstation 300, BenQ MA270S, Samsung ViewFinity S9 27" 5K.
- **No buy-box price:** Fractal Design Node 304, Dell U3224KB, Intel Arc Pro B60 24GB.
- **Third-party only / unclear:** ASRock N100DC-ITX ($634.40, 0 ratings), Ubiquiti "950W UPS" listing (model unclear).
- **Thin or weak ratings** (mention, don't headline): Eaton 5P1500R 2.1★/2, Kuycon G27P 3.0★/1, Keychron Q11 3.6★/11, Raspberry Pi AI HAT+ 3.8★/11, Sipeed NanoKVM 3.8★/41, plus N150 firewall box, N150 NAS board, HP Z2 Mini G1a, NIMO, BliKVM v4, Satechi Mac mini hub (all <20 ratings).
- **Brand notes:** DeskPi RackMate models sell under the GeeekPi brand on Amazon (T1 = "GeeekPi 8U", T2 = "GeeekPi 12U", T0 Plus = "GeeekPi 4U"). Most-reviewed SLZB-06 variant is the SLZB-06U.
- **Price anomalies:** RTX 5090 $7,968, RTX 3090 $1,930, LG 27MD5KL $3,998 new ($799 renewed), Home Assistant Green $219 (official ~$99), WD Red SN700 1TB $459.95, LaCie Rugged SSD Pro5 only the 4TB ($1,999.99).

---

## Appendix C — Proposed `/go/` slugs (verified ASINs, tag `bido08-20`)

Paste per article into `src/data/affiliate-links.json` when the article ships. None of these slugs or ASINs exist in the JSON today. Re-check availability before publishing.

```json
{
  "beelink-mini-s13-pro": { "name": "Beelink Mini S13 Pro (N150, 16GB/500GB)", "url": "https://www.amazon.com/dp/B08K73CKNL?tag=bido08-20" },
  "asus-nuc-14-essential-n150": { "name": "ASUS NUC 14 Essential (N150)", "url": "https://www.amazon.com/dp/B0H7HNJZ2P?tag=bido08-20" },
  "home-assistant-green": { "name": "Home Assistant Green", "url": "https://www.amazon.com/dp/B0CXVKSG19?tag=bido08-20" },
  "rpi-ai-hat-plus": { "name": "Raspberry Pi AI HAT+ (Hailo-8L, 13 TOPS)", "url": "https://www.amazon.com/dp/B0DLKBL8D9?tag=bido08-20" },
  "cyberpower-or500lcdrm1u": { "name": "CyberPower OR500LCDRM1U (500VA 1U)", "url": "https://www.amazon.com/dp/B000XJJN60?tag=bido08-20" },
  "cyberpower-or700lcdrm1u": { "name": "CyberPower OR700LCDRM1U (700VA 1U)", "url": "https://www.amazon.com/dp/B000XJLLKG?tag=bido08-20" },
  "cyberpower-cp500pfcrm1u": { "name": "CyberPower CP500PFCRM1U (500VA 1U sinewave)", "url": "https://www.amazon.com/dp/B0DCLRZYZW?tag=bido08-20" },
  "tripp-lite-smart500rt1u": { "name": "Tripp Lite SMART500RT1U (500VA 1U)", "url": "https://www.amazon.com/dp/B0002CUA6K?tag=bido08-20" },
  "tripp-lite-smart1500lcd": { "name": "Tripp Lite SMART1500LCD (1500VA 2U)", "url": "https://www.amazon.com/dp/B000DZRY9C?tag=bido08-20" },
  "apc-smt1500rm2uc": { "name": "APC Smart-UPS SMT1500RM2UC (1500VA 2U)", "url": "https://www.amazon.com/dp/B0762MQK6H?tag=bido08-20" },
  "goldenmate-1000va-lifepo4": { "name": "GOLDENMATE 1000VA/800W LiFePO4 UPS", "url": "https://www.amazon.com/dp/B0GL1T6Z4H?tag=bido08-20" },
  "geeekpi-rackmate-t2-12u": { "name": "GeeekPi DeskPi RackMate T2 (12U, 10-inch)", "url": "https://www.amazon.com/dp/B0FYNM62F7?tag=bido08-20" },
  "geeekpi-rackmate-t1-8u": { "name": "GeeekPi DeskPi RackMate T1 (8U, 10-inch)", "url": "https://www.amazon.com/dp/B0FBFDZD4C?tag=bido08-20" },
  "geeekpi-rackmate-t0-plus-4u": { "name": "GeeekPi DeskPi RackMate T0 Plus (4U, 10-inch)", "url": "https://www.amazon.com/dp/B0DPGZPTPP?tag=bido08-20" },
  "tecmojo-10in-9u-rack": { "name": "Tecmojo 10-inch 9U mini rack", "url": "https://www.amazon.com/dp/B0FX1VDY8T?tag=bido08-20" },
  "tecmojo-10in-4u-rack": { "name": "Tecmojo 10-inch 4U mini rack", "url": "https://www.amazon.com/dp/B0FM7SWXWP?tag=bido08-20" },
  "geeekpi-10in-patch-panel-12": { "name": "GeeekPi 10-inch 12-port CAT6 patch panel (0.5U)", "url": "https://www.amazon.com/dp/B0D5XPNHHF?tag=bido08-20" },
  "geeekpi-10in-1u-shelf": { "name": "GeeekPi 10-inch 1U rack shelf", "url": "https://www.amazon.com/dp/B0D5XGSPXD?tag=bido08-20" },
  "seagate-ironwolf-12tb": { "name": "Seagate IronWolf 12TB", "url": "https://www.amazon.com/dp/B084ZTSMWF?tag=bido08-20" },
  "seagate-ironwolf-pro-20tb": { "name": "Seagate IronWolf Pro 20TB", "url": "https://www.amazon.com/dp/B0B94MF4LP?tag=bido08-20" },
  "wd-red-plus-12tb": { "name": "WD Red Plus 12TB", "url": "https://www.amazon.com/dp/B0F4R6SNJG?tag=bido08-20" },
  "wd-red-pro-20tb": { "name": "WD Red Pro 20TB", "url": "https://www.amazon.com/dp/B0DYQH22PW?tag=bido08-20" },
  "seagate-exos-x24-24tb": { "name": "Seagate Exos X24 24TB", "url": "https://www.amazon.com/dp/B0DNNKNKS4?tag=bido08-20" },
  "toshiba-n300-12tb": { "name": "Toshiba N300 12TB", "url": "https://www.amazon.com/dp/B0CYQJRJB5?tag=bido08-20" },
  "rtx-5060-ti-16gb": { "name": "GeForce RTX 5060 Ti 16GB (ASUS Dual)", "url": "https://www.amazon.com/dp/B0F7WB6LSH?tag=bido08-20" },
  "rtx-5070-ti": { "name": "GeForce RTX 5070 Ti 16GB (PNY Epic-X)", "url": "https://www.amazon.com/dp/B0DXL8NFLF?tag=bido08-20" },
  "rtx-5080": { "name": "GeForce RTX 5080 16GB (ASUS TUF)", "url": "https://www.amazon.com/dp/B0DQSMMCSH?tag=bido08-20" },
  "rtx-5090": { "name": "GeForce RTX 5090 32GB (ASUS ROG Astral)", "url": "https://www.amazon.com/dp/B0DS2WQZ2M?tag=bido08-20" },
  "rx-9070-xt": { "name": "Radeon RX 9070 XT 16GB (ASUS Prime)", "url": "https://www.amazon.com/dp/B0DRRMZDH6?tag=bido08-20" },
  "radeon-ai-pro-r9700": { "name": "Radeon AI PRO R9700 32GB (ASRock Creator)", "url": "https://www.amazon.com/dp/B0G1WZMKW6?tag=bido08-20" },
  "intel-arc-b580": { "name": "Intel Arc B580 12GB (Limited Edition)", "url": "https://www.amazon.com/dp/B0DVS6MSP9?tag=bido08-20" },
  "rtx-3090-24gb": { "name": "GeForce RTX 3090 24GB (EVGA FTW3 Ultra)", "url": "https://www.amazon.com/dp/B0916ZWZ9S?tag=bido08-20" },
  "bosgame-m5-128gb": { "name": "Bosgame M5 (Ryzen AI Max+ 395, 128GB)", "url": "https://www.amazon.com/dp/B0H97V3LL5?tag=bido08-20" },
  "hp-z2-mini-g1a": { "name": "HP Z2 Mini G1a (Ryzen AI Max PRO)", "url": "https://www.amazon.com/dp/B0H48VDG2V?tag=bido08-20" },
  "minisforum-deg1": { "name": "MINISFORUM DEG1 OCuLink eGPU dock", "url": "https://www.amazon.com/dp/B0DNJPGTHZ?tag=bido08-20" },
  "minisforum-deg2": { "name": "MINISFORUM DEG2 USB4 v2/OCuLink eGPU dock", "url": "https://www.amazon.com/dp/B0GDY4HZBH?tag=bido08-20" },
  "aoostar-ag02": { "name": "AOOSTAR AG02 OCuLink eGPU dock (800W PSU)", "url": "https://www.amazon.com/dp/B0DXTLTLF5?tag=bido08-20" },
  "razer-core-x-v2": { "name": "Razer Core X V2 (Thunderbolt 5 eGPU)", "url": "https://www.amazon.com/dp/B0FFQFDZWX?tag=bido08-20" },
  "sonnet-breakaway-box-850-t5": { "name": "Sonnet Breakaway Box 850 T5", "url": "https://www.amazon.com/dp/B0FX86P6T8?tag=bido08-20" },
  "minisforum-um890-pro": { "name": "MINISFORUM UM890 Pro (Ryzen 9 8945HS, OCuLink)", "url": "https://www.amazon.com/dp/B0D9YJLZP6?tag=bido08-20" },
  "anker-prime-tb5-cable": { "name": "Anker Prime Thunderbolt 5 cable (1m, 240W)", "url": "https://www.amazon.com/dp/B0DXZCXK2C?tag=bido08-20" },
  "cable-matters-tb5-cable": { "name": "Cable Matters Thunderbolt 5 cable (Intel certified)", "url": "https://www.amazon.com/dp/B0D7WHLFWX?tag=bido08-20" },
  "owc-tb5-cable-1m": { "name": "OWC Thunderbolt 5 cable (1m)", "url": "https://www.amazon.com/dp/B0DH7PFRD1?tag=bido08-20" },
  "apple-tb5-pro-cable": { "name": "Apple Thunderbolt 5 (USB-C) Pro Cable (1m)", "url": "https://www.amazon.com/dp/B0FH5PWC69?tag=bido08-20" },
  "caldigit-tb5-cable-1-5m": { "name": "CalDigit Thunderbolt 5 Braided Pro cable (1.5m)", "url": "https://www.amazon.com/dp/B0HJRP6DRK?tag=bido08-20" },
  "belkin-tb5-cable": { "name": "Belkin Thunderbolt 5 cable (1m)", "url": "https://www.amazon.com/dp/B0DT4KVNHQ?tag=bido08-20" },
  "ugreen-tb5-cable": { "name": "UGREEN Thunderbolt 5 cable (80Gbps, 240W)", "url": "https://www.amazon.com/dp/B0DNG739TK?tag=bido08-20" },
  "silkland-usb4-80g-cable": { "name": "Silkland USB4 80Gbps cable (5ft)", "url": "https://www.amazon.com/dp/B0FB3YXRBF?tag=bido08-20" },
  "glinet-comet-gl-rm1": { "name": "GL.iNet Comet GL-RM1 IP KVM", "url": "https://www.amazon.com/dp/B0F21SQ4S8?tag=bido08-20" },
  "glinet-comet-poe": { "name": "GL.iNet Comet PoE GL-RM1PE IP KVM", "url": "https://www.amazon.com/dp/B0FDQJ1V7J?tag=bido08-20" },
  "glinet-comet-pro": { "name": "GL.iNet Comet Pro GL-RM10 IP KVM", "url": "https://www.amazon.com/dp/B0G1BS7WWK?tag=bido08-20" },
  "glinet-comet-x": { "name": "GL.iNet Comet X GL-RM4PE (4-port IP KVM)", "url": "https://www.amazon.com/dp/B0H5QCG2P7?tag=bido08-20" },
  "jetkvm": { "name": "JetKVM IP KVM", "url": "https://www.amazon.com/dp/B0FY63H6NH?tag=bido08-20" },
  "sipeed-nanokvm": { "name": "Sipeed NanoKVM", "url": "https://www.amazon.com/dp/B0DHVY1CJS?tag=bido08-20" },
  "pikvm-v4-mini": { "name": "PiKVM V4 Mini", "url": "https://www.amazon.com/dp/B0CV93FNLF?tag=bido08-20" },
  "ugreen-revodok-mac-mini-dock": { "name": "UGREEN Mac mini Dock & Stand with NVMe enclosure", "url": "https://www.amazon.com/dp/B0GQ4DN6MH?tag=bido08-20" },
  "ugreen-mac-mini-dock-dp": { "name": "UGREEN Mac mini Dock (DP 4K@144Hz, NVMe)", "url": "https://www.amazon.com/dp/B0GQ42B4WQ?tag=bido08-20" },
  "ivanky-mac-mini-dock-13in1": { "name": "iVANKY 13-in-1 Mac mini Dock", "url": "https://www.amazon.com/dp/B0GX68Q8Q4?tag=bido08-20" },
  "tobenone-mac-mini-dock": { "name": "TobenONE 13-in-1 Mac mini Dock (NVMe)", "url": "https://www.amazon.com/dp/B0GC9S23R1?tag=bido08-20" },
  "hagibis-mac-mini-stand-hub": { "name": "Hagibis Mac mini Stand & Hub (SSD enclosure)", "url": "https://www.amazon.com/dp/B0DP8ZX7K8?tag=bido08-20" },
  "satechi-mac-mini-stand-hub": { "name": "Satechi Mac mini Stand & Hub (NVMe enclosure)", "url": "https://www.amazon.com/dp/B0DV6WJ88D?tag=bido08-20" },
  "samsung-t9-2tb": { "name": "Samsung T9 Portable SSD 2TB", "url": "https://www.amazon.com/dp/B0CHFS9K14?tag=bido08-20" },
  "crucial-x10-pro-2tb": { "name": "Crucial X10 Pro 2TB", "url": "https://www.amazon.com/dp/B0C9WGS6MC?tag=bido08-20" },
  "terramaster-d4-320": { "name": "TerraMaster D4-320 (4-bay USB-C DAS)", "url": "https://www.amazon.com/dp/B0CTTL9R7Z?tag=bido08-20" },
  "terramaster-d2-320": { "name": "TerraMaster D2-320 (2-bay USB-C DAS)", "url": "https://www.amazon.com/dp/B0C8GCZP5K?tag=bido08-20" },
  "qnap-tr-004": { "name": "QNAP TR-004 (4-bay USB-C DAS)", "url": "https://www.amazon.com/dp/B07K4RC7X9?tag=bido08-20" },
  "sabrent-ds-sc4b": { "name": "Sabrent DS-SC4B (4-bay USB-C 10Gbps)", "url": "https://www.amazon.com/dp/B07Y3WDHLD?tag=bido08-20" },
  "orico-4bay-20gbps": { "name": "ORICO 4-bay 20Gbps RAID enclosure", "url": "https://www.amazon.com/dp/B0GX9VF54Y?tag=bido08-20" },
  "cenmate-4bay": { "name": "CENMATE 4-bay enclosure (USB 3.0 + eSATA)", "url": "https://www.amazon.com/dp/B0F2T1TVM3?tag=bido08-20" },
  "sonoff-dongle-plus-mg24": { "name": "SONOFF Zigbee 3.0 USB Dongle Plus MG24", "url": "https://www.amazon.com/dp/B0FMJD288B?tag=bido08-20" },
  "sonoff-dongle-lite-mg21": { "name": "SONOFF Zigbee & Thread Dongle Lite (MG21)", "url": "https://www.amazon.com/dp/B0G2LTBM1M?tag=bido08-20" },
  "sonoff-dongle-max": { "name": "SONOFF Zigbee/Thread PoE Dongle Max", "url": "https://www.amazon.com/dp/B0FMJH4DPN?tag=bido08-20" },
  "sonoff-zbdongle-e": { "name": "SONOFF ZBDongle-E (Plus-E)", "url": "https://www.amazon.com/dp/B0FNLP58JS?tag=bido08-20" },
  "smlight-slzb-06u": { "name": "SMLIGHT SLZB-06U (Zigbee to Ethernet/USB/WiFi, PoE)", "url": "https://www.amazon.com/dp/B0BL6DQSB3?tag=bido08-20" },
  "smlight-slzb-mr1": { "name": "SMLIGHT SLZB-MR1 (multi-radio)", "url": "https://www.amazon.com/dp/B0F8Z7X2N3?tag=bido08-20" },
  "aeotec-z-stick-10-pro": { "name": "Aeotec Z-Stick 10 Pro (Zigbee + Z-Wave 800)", "url": "https://www.amazon.com/dp/B0DV9RFSR9?tag=bido08-20" },
  "thirdreality-zigbee-plug-4pack": { "name": "THIRDREALITY Zigbee Smart Plug 4-pack (energy monitoring)", "url": "https://www.amazon.com/dp/B0BPY5D1KC?tag=bido08-20" },
  "thirdreality-zigbee-plug-gen3-4pack": { "name": "THIRDREALITY Smart Plug Gen3 4-pack (power meter)", "url": "https://www.amazon.com/dp/B0GHQT8TQ8?tag=bido08-20" },
  "talentcell-mini-ups": { "name": "TalentCell mini DC UPS (12V/9V/5V, 97Wh)", "url": "https://www.amazon.com/dp/B07WLD32RP?tag=bido08-20" },
  "apc-be425m": { "name": "APC Back-UPS BE425M (425VA)", "url": "https://www.amazon.com/dp/B01HDC236Q?tag=bido08-20" },
  "cyberpower-st425": { "name": "CyberPower ST425 standby UPS", "url": "https://www.amazon.com/dp/B07GZR981Y?tag=bido08-20" },
  "cyberpower-cp550slg": { "name": "CyberPower CP550SLG standby UPS", "url": "https://www.amazon.com/dp/B002QAUN2M?tag=bido08-20" },
  "ecoflow-river-3": { "name": "EcoFlow RIVER 3 (245Wh, UPS mode)", "url": "https://www.amazon.com/dp/B0DB1S36YP?tag=bido08-20" },
  "jonsbo-n3": { "name": "JONSBO N3 (8-bay Mini-ITX NAS case)", "url": "https://www.amazon.com/dp/B0CMVBMVHT?tag=bido08-20" },
  "jonsbo-n4": { "name": "JONSBO N4 (6+2-bay NAS case)", "url": "https://www.amazon.com/dp/B0D1YH7D3J?tag=bido08-20" },
  "jonsbo-n5": { "name": "JONSBO N5 (12-bay E-ATX NAS case)", "url": "https://www.amazon.com/dp/B0DG2N3PBB?tag=bido08-20" },
  "jonsbo-n6": { "name": "JONSBO N6 (Micro-ATX NAS case)", "url": "https://www.amazon.com/dp/B0G2GVQSFL?tag=bido08-20" },
  "darkrock-storage-master": { "name": "DARKROCK Classico Storage Master (ATX NAS case)", "url": "https://www.amazon.com/dp/B0CQZS7KN5?tag=bido08-20" },
  "silverstone-cs382": { "name": "SilverStone CS382 (8-bay hot-swap)", "url": "https://www.amazon.com/dp/B0CKTYSZV9?tag=bido08-20" },
  "protectli-vault-fw4c": { "name": "Protectli Vault FW4C (4-port)", "url": "https://www.amazon.com/dp/B0BDCZC3YX?tag=bido08-20" },
  "keychron-v1-max": { "name": "Keychron V1 Max", "url": "https://www.amazon.com/dp/B0CR16KS3F?tag=bido08-20" },
  "keychron-k2-he": { "name": "Keychron K2 HE", "url": "https://www.amazon.com/dp/B0DCVPGB9N?tag=bido08-20" },
  "keychron-q1-max": { "name": "Keychron Q1 Max", "url": "https://www.amazon.com/dp/B0CR1J7SPX?tag=bido08-20" },
  "logitech-mx-mechanical": { "name": "Logitech MX Mechanical", "url": "https://www.amazon.com/dp/B09LJWWX4Y?tag=bido08-20" },
  "hhkb-hybrid-type-s": { "name": "HHKB Professional Hybrid Type-S", "url": "https://www.amazon.com/dp/B082TQK2SB?tag=bido08-20" },
  "kinesis-advantage360": { "name": "Kinesis Advantage360", "url": "https://www.amazon.com/dp/B0BCHMGZMD?tag=bido08-20" },
  "nuphy-air75-v3": { "name": "NuPhy Air75 V3", "url": "https://www.amazon.com/dp/B0FFFZ7R2K?tag=bido08-20" },
  "radxa-penta-sata-hat": { "name": "Radxa Penta SATA HAT", "url": "https://www.amazon.com/dp/B0DX1HQWB2?tag=bido08-20" },
  "sunfounder-pironman-5-max": { "name": "SunFounder Pironman 5 Max (dual NVMe)", "url": "https://www.amazon.com/dp/B0F8J5HW21?tag=bido08-20" },
  "argon-one-v3-m2": { "name": "Argon ONE V3 M.2 NVMe case", "url": "https://www.amazon.com/dp/B0CT2MDV2D?tag=bido08-20" },
  "pimoroni-nvme-base-duo": { "name": "Pimoroni NVMe Base Duo", "url": "https://www.amazon.com/dp/B0D4SGF2QT?tag=bido08-20" }
}
```
