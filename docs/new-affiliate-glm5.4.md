# Affiliate articles to write next: research of 2026-11-26

_Prepared for bitdoze.com on 2026-11-26. This reorders and extends the backlog in `docs/amazon-affiliate-opus-plan2027.md` (revised 2026-11-04). The 7 plan articles published since that revision are removed from the backlog. IDs keep their meaning from that plan (A, B, C = original tiers, N = ideas added on Nov 4); new ideas continue the N series from N17._

_Tooling: Search Console and Ubersuggest through Composio, Plausible through its Stats API, TinyFish MCP for web search and page fetches, Bright Data MCP for Amazon search pages and Reddit. The harness session did not expose the two MCP servers as callable tools (TinyFish was added mid-session), so every MCP call went to the same endpoints over JSON-RPC with the tools each server publishes. Raw exports are listed in Appendix D._

## 0. The short list

Write these eight first, in this order. The order is the publish order (time-sensitive demand first); the score column shows where each ranks on the four axes. Scores use the same four axes as the Nov 4 plan (Demand, Ease, Fit, Money, each 1 to 5).

| # | ID | Article | Slug | Primary keyword (US vol/mo, SD) | The evidence in one line | Score | Effort |
|---|---|---|---|---|---|---:|---|
| 1 | N17 | Best Smart Glasses 2027: Ray-Ban Meta Gen 2 vs Gen 3 vs Oakley Meta vs display glasses | `best-smart-glasses` | ray ban meta gen 2 (49,500, 22); smart glasses (246,000, 35) | Search peaks in November and December; the four gadget-page products this list spins off drew 138 clickers in 25 days; Amazon lists the Gen 2 Wayfarer at $284 for Black Friday (list $379) | 18 | 1.5 days |
| 2 | B1 | Best Thunderbolt 5 Cables (tested with the docks and enclosures on this site) | `best-thunderbolt-5-cables` | thunderbolt 5 cables (6,600, 19) | The TB5 enclosure page converts at 29%; the SERP is vendor shops and Reddit threads, no roundup; cheap SKUs; the top seller shows 8K+ bought last month | 19 | 1 day |
| 3 | N20 | UniFi Travel Router (UTR) review: vs GL.iNet Beryl AX, Beryl 7 and Slate 7 | `unifi-travel-router-review` | unifi travel router (18,100, 29) | 25K/mo brand cluster that peaks in December and January; UTR sells 300 to 400 units a month on Amazon; the travel router page converts at 21% | 18 | 1 day |
| 4 | N8 | Best Home Server Rack: 12U Wall Cabinet, Open Frame and 25U | `best-home-server-rack` | server rack (18,100, 29); home server rack (1,600, 26) | The mini-rack page converts at 29% (115 clickers in 25 days); the head SERP is vendor pages and Wikipedia, no editorial site | 19 | 1.5 days |
| 5 | B11 | Best PoE Switch and PoE Injector for IP Cameras | `best-poe-switch-for-cameras` | poe switch for ip cameras (1,300, 15) | Two EASY SERPs; five keywords at SD 7 to 20; the camera and doorbell pages both need it; TP-Link's $40 PoE switch sells 5K+ a month | 18 | 1 day |
| 6 | A7 | Best GPU for Local LLMs and Local AI Servers | `best-gpu-for-local-llm` | local ai server (1,900, 18, CPC $10.23); best gpu for ai (1,000, 27) | Zero big sites on the primary SERPs; the local LLM page has an H2 waiting for it (R5) | 18 | 1.5 days |
| 7 | B12 | Best SSD for NAS: boot and cache drives in a shortage | `best-ssd-for-nas` | ssd for nas (4,400, 29) | EASY SERP led by two NASMaster articles from 2024; closes the NAS cluster next to the hard drive guide | 17 | 1 day |
| 8 | N28 | GeeekPi RackMate vs Tecmojo: which 10-inch rack to buy | `geeekpi-vs-tecmojo-10-inch-rack` | deskpi rackmate (590, 25) | Six brand-vs-brand queries already land on the mini-rack page at positions 4 to 9 with no page of their own | 17 | half day |

Two things that are not articles still pay more than any article on this list:

1. **Geo-route `/go/` links.** 65.5% of November clickers are outside the US (1,367 clickers, Nov 1 to 25) and 0 of the 227 products in `src/data/affiliate-links.json` have a non-US URL. Countries with their own Amazon store add up to 44.3% (DE 9.6%, ES 5.6%, FR 4.8%, GB 4.7%, NL 4.5%, CA 3.6%, AU 2.7%, AT 2.0%, BE 1.9%, PL 1.9%, IT 1.6%, SE 1.5%). This is section 6.1 of the Nov 4 plan, unchanged and unshipped.
2. **Bing Webmaster Tools and IndexNow.** 16.1% of November clickers arrived from DuckDuckGo (8.2%), Brave (5.0%) or Bing (2.9%); Google sent 31.2% and direct or unattributed 48.6%. No IndexNow key or ping exists in the repo.

## 1. What changed since the Nov 4 revision

### 1.1 Published since Nov 4 (out of the backlog)

| ID | Article | Slug | Published | Google, Oct 27 to Nov 23 | Plausible, Nov 1 to 25 |
|---|---|---|---|---:|---|
| N1 | Best NAS for Plex & Jellyfin | `best-nas-for-plex` | Nov 5 | 11 clicks, 1,130 impr | 107 visitors, 15 clickers (14%) |
| A6 | Best Hard Drives for NAS | `best-hard-drives-for-nas` | Nov 11 | 3 clicks, 775 impr | 90 visitors, 8 clickers (9%) |
| N2 | Best Cameras for Frigate & Home Assistant | `best-cameras-frigate-home-assistant` | Nov 11 | 6 clicks, 547 impr | 128 visitors, 17 clickers (13%) |
| N5 | UGREEN vs Synology | `ugreen-vs-synology` | Nov 11 | 3 clicks, 426 impr | 70 visitors, 4 clickers (6%) |
| N6 | Best PoE Video Doorbell for Home Assistant | `best-poe-doorbell-home-assistant` | Nov 11 | 3 clicks, 367 impr | 63 visitors, 8 clickers (13%) |
| N7 | Best Zigbee Sensors for Home Assistant | `best-zigbee-sensors-home-assistant` | Nov 11 | 1 click, 111 impr | 61 visitors, 11 clickers (18%) |
| S1 | Gifts for Programmers | `gifts-for-programmers` | Nov 14 | 5 clicks, 255 impr | 125 visitors, 29 clickers (23%) |

Related pages shipped in the same window that are not plan items: `raspberry-pi-5-vs-mini-pc` (Nov 13), `nas-build-under-500` (Nov 18, a Jonsbo N3 build), `tech-gifts-homelab-owners` (Nov 18), `best-desk-setup-gadgets-2027` (Nov 18), `migrate-synology-to-ugreen-nas` (Nov 18).

`best-mac-mini-for-openclaw` (A1) now gets impressions (247 in 28 days, avg position 12.5), so R11 is resolved and N12 is unblocked.

### 1.2 Affiliate clicks: 2.8 times the October rate

Plausible `affiliate_click`, Nov 1 to 25, visits with a real entry page (the bot filter from section 6.4 of the Nov 4 plan): **1,367 clickers in 25 days = 54.7 a day**. The Sep 21 to Oct 22 baseline was 632 clickers in 32 days = 19.8 a day.

| Page | Visitors | Clickers | Clicker rate |
|---|---:|---:|---:|
| `best-tech-gadgets-2027` | 738 | 183 | 25% |
| `best-mini-pc-opnsense` | 380 | 127 | 33% |
| `best-10-inch-mini-rack` | 400 | 115 | 29% |
| `best-mini-pc-home-server` | 599 | 114 | 19% |
| `best-tb5-nvme-enclosures` | 295 | 86 | 29% |
| `best-home-assistant-hardware` | 345 | 76 | 22% |
| `docker-containers-home-server` | 3143 | 73 | 2% |
| `best-mini-pc-plex-jellyfin` | 207 | 60 | 29% |
| `best-das-enclosure-homelab` | 214 | 53 | 25% |
| `best-mac-mini-dock` | 135 | 35 | 26% |
| `gifts-for-programmers` | 125 | 29 | 23% |
| `best-travel-router-wireguard-tailscale` | 138 | 29 | 21% |
| `black-friday-home-server-deals` | 124 | 24 | 19% |
| `best-nas-homelab-docker-proxmox` | 135 | 21 | 16% |
| `best-zigbee-coordinator-home-assistant` | 95 | 20 | 21% |
| `best-rack-mount-ups-homelab` | 72 | 19 | 26% |
| `best-mini-pc-proxmox` | 95 | 19 | 20% |
| `best-ups-for-home-server` | 93 | 18 | 19% |
| `best-mini-pc-local-llm` | 126 | 17 | 13% |
| `best-cameras-frigate-home-assistant` | 128 | 17 | 13% |
| `best-2-5-10gbe-switch-homelab` | 86 | 17 | 20% |
| `best-nas-for-plex` | 107 | 15 | 14% |
| `best-thunderbolt-5-docks-guide` | 269 | 13 | 5% |
| `best-tb5-dock-macbook-pro` | 54 | 13 | 24% |
| `best-zigbee-sensors-home-assistant` | 61 | 11 | 18% |
| `tech-gifts-homelab-owners` | 63 | 10 | 16% |
| `best-poe-doorbell-home-assistant` | 63 | 8 | 13% |
| `best-hard-drives-for-nas` | 90 | 8 | 9% |
| `best-desk-setup-gadgets-2027` | 36 | 7 | 19% |
| `vps-price-increases` | 81 | 6 | 7% |
| **All pages (EN + ES + DE)** | | **1,367** | |

What the table says:

- **`best-tech-gadgets-2027` is now the #1 affiliate page**: 183 clickers at 25% of visitors, plus 13 on the ES copy and 6 on the DE copy. It went live on Oct 24.
- **The Oct 23 and Oct 30 batch paid off.** The OPNsense page converts at 33%, the 10-inch mini rack at 29%, the rack UPS at 26%, the DAS at 25%, the Mac mini dock at 26%.
- **Beelink owns the cheap end.** The EQ14 (191 clickers) and Mini S13 (126) are the top two products site-wide. They are linked from 11 and 12 posts, and most of those clicks come from the OPNsense (81), Home Assistant (56) and Plex (47) pages.
- **Racks sell.** Five 10-inch rack cabinets drew 192 clickers in 25 days (RackMate T1 58, T2 51, T0 Plus 31, Tecmojo 4U 29, Tecmojo 9U 23), 105 of them from the mini-rack page alone.
- **TB5 storage sells.** The enclosure picks drew 74 clickers from `best-tb5-nvme-enclosures` alone (OWC Express 1M2 59 clickers site-wide).

### 1.3 What people click

| # | Product (`/go/ slug`) | Clickers | Clicks |
|---:|---|---:|---:|
| 1 | `beelink-eq14` | 191 | 220 |
| 2 | `beelink-mini-s13` | 126 | 144 |
| 3 | `owc-express-1m2-80g` | 59 | 66 |
| 4 | `geeekpi-rackmate-t1-8u` | 58 | 67 |
| 5 | `gmktec-n150` | 57 | 60 |
| 6 | `ugreen-dxp4800-plus` | 56 | 59 |
| 7 | `protectli-vault-fw4c` | 54 | 60 |
| 8 | `geeekpi-rackmate-t2-12u` | 51 | 57 |
| 9 | `arzopa-a1-monitor` | 42 | 47 |
| 10 | `plaud-notepin-s` | 39 | 42 |
| 11 | `dji-neo` | 39 | 40 |
| 12 | `cyberpower-cp1500pfclcd` | 37 | 38 |
| 13 | `ember-mug-2` | 37 | 39 |
| 14 | `terramaster-d4-320` | 35 | 35 |
| 15 | `xreal-1s-ar-glasses` | 35 | 36 |
| 16 | `home-assistant-green` | 33 | 34 |
| 17 | `glinet-beryl-ax` | 32 | 32 |
| 18 | `minisforum-ms-01-i5-barebone` | 32 | 38 |
| 19 | `ugreen-dxp2800` | 32 | 37 |
| 20 | `geeekpi-rackmate-t0-plus-4u` | 31 | 33 |
| 21 | `protoarc-xk01` | 30 | 31 |
| 22 | `govee-smart-light-bars` | 30 | 32 |
| 23 | `rocketbook-core` | 30 | 31 |
| 24 | `tecmojo-10in-4u-rack` | 29 | 30 |
| 25 | `bambu-lab-p1s` | 27 | 30 |
| 26 | `ugreen-revodok-mac-mini-dock` | 26 | 28 |
| 27 | `xgimi-mogo-2-pro` | 26 | 26 |
| 28 | `anker-maggo-3-in-1` | 25 | 28 |
| 29 | `tecmojo-10in-9u-rack` | 23 | 23 |
| 30 | `ringconn-gen-2-air` | 22 | 22 |

### 1.4 Google

| Page | Clicks Sep 29 → Oct 26 | Clicks Oct 27 → Nov 23 | Impr. Oct 27 → Nov 23 |
|---|---:|---:|---:|
| `best-tech-gadgets-2027` | 24 | 579 | 4,753 |
| `docker-containers-home-server` | 774 | 938 | 15,958 |
| `best-thunderbolt-5-docks-guide` | 58 | 81 | 31,016 |
| `best-tb5-nvme-enclosures` | 44 | 75 | 3,323 |
| `best-10-inch-mini-rack` | 3 | 52 | 2,700 |
| `best-home-assistant-hardware` | 6 | 43 | 4,244 |
| `best-mini-pc-opnsense` | 0 | 25 | 1,626 |
| `best-travel-router-wireguard-tailscale` | 0 | 24 | 1,616 |
| `best-das-enclosure-homelab` | 0 | 38 | 1,539 |
| `best-mini-pc-home-server` | 28 | 16 | 6,161 |
| `best-mini-pc-local-llm` | 54 | 17 | 1,473 |
| `best-mini-pc-proxmox` | 25 | 8 | 643 |
| `best-nas-homelab-docker-proxmox` | 31 | 18 | 5,947 |
| `best-nas-for-plex` | 0 | 11 | 1,130 |
| `best-mac-mini-dock` | 0 | 17 | 858 |
| `best-mac-mini-for-openclaw` | 0 | 3 | 247 |
| **Whole site** | **5,153** | **8,105** | **997,949** |

- Site-wide Google clicks went from 5,153 to 8,105 between the two 28-day windows (+57%), while impressions fell. CTR rose from 0.59% to 0.81%.
- **A year in the title works when the page is early.** `best-tech-gadgets-2027` ranks at positions 2 to 4 for "gadgets 2027", "best gadgets 2027", "gadget 2027" and "2027 gadgets" and is the second page of the site by Google clicks. Ubersuggest has zero keywords containing "2027" as of today, so the tool cannot show this demand; Search Console can.
- **Three older hub pages lost Google clicks while the site grew**: `best-mini-pc-local-llm` (54 to 17), `best-mini-pc-proxmox` (25 to 8), `best-mini-pc-home-server` (28 to 16). Their Plausible numbers held up (126, 95 and 599 visitors), so non-Google sources carried them. Find the cause before A7, A8 and N3 publish (R20).
- **Impressions are no longer a demand signal on the big TB5 pages.** `best-thunderbolt-5-docks-guide` shows 31,016 impressions in 28 days at 0.26% CTR. Its top query is "what is the best thunderbolt hub" (6,729 impressions, position 4.1, 0 clicks), followed by "best thunderbolt hub 2024", "best thunderbolt hub under $200" and "best thunderbolt hub for women". These read like automated searches from AI assistants and rank trackers, not people. [inference] Budget on clicks and on Plausible visitors, not on impressions.

### 1.5 Data and method

| Source | Scope (all pulled 2026-11-26) | What it gave |
|---|---|---|
| Search Console (`sc-domain:bitdoze.com`, Composio) | 2026-08-27 to 11-23, 49,879 page × query rows; 2026-10-27 to 11-23, 28,212 rows; page totals for 09-29 to 10-26 as a comparison window | Which pages get clicks, striking-distance queries, the two-window comparison |
| Plausible (`an3.bitdoze.com`, Stats API v2, Composio) | 2026-11-01 to 11-25: `affiliate_click` by `article` prop, by `product` prop, by country, by source; visitors per page | Clickers, clicker rate, geo and source split |
| Ubersuggest (Composio, US / English) | 417 seeds, 10,346 keywords; 30 keyword overviews with 12-month trends | Volume, SD, CPC, seasonality |
| TinyFish MCP `search` | 123 live SERP checks, US | Who is in the top 8 |
| TinyFish MCP `fetch_content` | 25 URLs (23 returned content: competitor roundups, Ubiquiti, Sonnet, Meta coverage, Home Assistant, GL.iNet, Raspberry Pi docs) | Product facts, competitor depth |
| Bright Data MCP, Amazon product search | 55 keyword searches, 1,533 products | ASIN, price, rating, rating count, "bought in past month" |
| Bright Data MCP, Reddit Posts | `collect_by_url` on threads found with TinyFish (`include_domains: reddit.com`, 29 queries, 191 threads); 149 of the 191 threads returned (section 9) | Thread titles, scores, comment counts, comments |

SERP rule, unchanged from Nov 4: **EASY** = at most 1 big editorial or retail result and at least 3 forum or UGC results in the top 8; **HARD** = 4 or more big results; everything else is **MID**. Two caveats. The results come from TinyFish's search index, not a Google scrape, so check Google's top 8 on the day you write. Vendor and shop pages (Sonnet, TP-Link, fs.com) are counted separately; they are not "big editorial" but they are real competition.

## 2. Rules that follow from the new data

1. **Write sequels to pages with a clicker rate of 20% or more.** Eight pages clear that bar: OPNsense mini PC (33%), mini rack (29%), TB5 enclosures (29%), Plex mini PC (29%), rack UPS (26%), Mac mini dock (26%), tech gadgets (25%), DAS (25%). Seven of the eight short-list articles sit next to one of those pages.
2. **Use the year in roundup titles and ship before the year starts.** "Gadgets 2027" ranks in weeks. Keep R8 (flip the 2026 roundups to 2027 around Dec 15) and apply the same to N17 and N19.
3. **A SERP made of vendor pages is open.** "server rack" and "mac mini rack mount" have no editorial result in the top 8; "sfp module", "protectli vault" and "unifi travel router" have one each (an Amazon category page, or one How-To Geek post). The formula calls them MID; they are winnable with a real comparison.
4. **Cheap SKUs are the account.** TB5 cables (8K+ a month), PoE switches (5K+), microSD cards (10K+) and 1U PDUs (1.2K+) convert in volume and keep the 180-day rule away.
5. **Consumer gadgets convert on this site.** The gadgets list converts at 25%, the same as the homelab roundups. Arzopa A1 monitor (42 clickers), Plaud NotePin S (39), XREAL 1S (35) and Ray-Ban Meta Gen 2 (22) came almost entirely from one listicle. They deserve pages of their own.
6. **Google is a third of the clickers.** Search Console rankings understate what a page earns here. Check Plausible before judging any page.

Where each short-list article hangs. Link every spoke from its hub with the exact-match anchor, then cut the hub's own section on that topic to a summary.

| Hub (clicker rate, Nov 1 to 25) | New spoke | Anchor to use |
|---|---|---|
| `best-tech-gadgets-2027` (25%) | N17, N18, N19, N20 | "best smart glasses", "best AI voice recorder", "best AI gadgets", "UniFi Travel Router" |
| `best-tb5-nvme-enclosures` (29%), `best-thunderbolt-5-docks-guide` (5%), `best-tb5-dock-macbook-pro` (24%) | B1 | "best Thunderbolt 5 cables" |
| `best-10-inch-mini-rack` (29%), `best-rack-mount-ups-homelab` (26%) | N28, N8 | "GeeekPi vs Tecmojo", "best home server rack" |
| `best-mini-pc-opnsense` (33%) | N29 retrofit | "which Protectli Vault" |
| `best-travel-router-wireguard-tailscale` (21%) | N20 | "UniFi Travel Router review" |
| `best-cameras-frigate-home-assistant` (13%), `best-poe-doorbell-home-assistant` (13%), `best-2-5-10gbe-switch-homelab` (20%) | B11, N22 | "best PoE switch for IP cameras", "SFP modules explained" |
| `best-mini-pc-local-llm` (13%), `ollama-docker-install` | A7, A8, A9 | "best GPU for local LLMs", "DGX Spark alternatives", "OCuLink eGPU docks" |
| `best-nas-homelab-docker-proxmox` (16%), `best-nas-for-plex` (14%), `best-das-enclosure-homelab` (25%), `best-hard-drives-for-nas` (9%) | B12, B7, C1 | "best SSD for NAS", "best NAS case", "Raspberry Pi 5 NAS" |

## 3. Briefs for the short list

Conventions for every brief are those of section 4 of the Nov 4 plan: disclosure above the first link, `/go/<slug>/` links only, a comparison table above the fold, a 40 to 60-word answer under the H1, "who should buy" per pick, prices only as "as of <date>". Amazon figures are a search-page snapshot from 2026-11-26. Confirm variant, seller and price on the product page before adding a slug, and never copy them into the article.

### 3.1 N17. Best Smart Glasses 2027

- **Slug:** `best-smart-glasses` · **Category:** `gadgets` · **Tags:** `smart-glasses`, `ray-ban-meta`, `ai-glasses`
- **Why now:** "smart glasses" runs at 550K searches a month in November and December (Ubersuggest 12-month trend, 246K in the latest month). "ray ban meta gen 2" alone is 49,500/mo at SD 22. The gadgets page already sends 57 clickers a month to two pairs of glasses (XREAL 1S 35, Ray-Ban Meta Gen 2 22).
- **SERP:** "best smart glasses 2027" is MID (YouTube ×4, Yahoo, GadgetFee, Wareable ×2, Android Authority). "ray ban meta gen 2" is MID (ray-ban.com ×2, Meta, The Verge, Kotaku, Reddit). "smart glasses 2027" without "best" is HARD, so keep "best" in the title.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| ray ban meta smart glasses | 368,000 | 35 | $1.54 |
| smart glasses | 246,000 | 35 | $1.18 |
| ray ban meta gen 2 | 49,500 | 22 | $1.72 |
| ai powered smart glasses | 27,100 | 32 | $1.67 |
| ray ban meta smart glasses gen 2 | 22,200 | 31 | $1.87 |
| ray ban meta ai glasses gen 2 | 18,100 | 14 | $2.61 |
| smart glasses with camera | 18,100 | 30 | $0.89 |
| ray ban smart glasses | 18,100 | 32 | $1.45 |
| rayban meta ai glasses gen 2 | 8,100 | 8 | $2.03 |
| ai smart glasses | 8,100 | 30 | $0.93 |
| **Cluster total (102 keywords, SD ≤ 35)** | **921,910** | | |

Amazon snapshot:

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0FLYDJHB4` | Meta Ray-Ban (Gen 2) Wayfarer AI Glasses | $284 | 4.1 | 54 | n/a |
| `B0GQD6SF83` | Oakley Vanguard AI, Audio, Photo, Video Compatibility, Unisex, Sport Shield | $424 | 4.3 | 187 | 700+ |
| `B0FQFJT9YW` | Oakley, Vanguard AI Glasses | $424 | 4.4 | 311 | 200+ |
| `B082KBYJL7` | Oakley, HSTN AI Glasses | $299 | 4.2 | 15 | 200+ |
| `B0H86KSXC8` | RayNeo iO Smart Glasses, 33g, AI Voice Recorder, Translation, Teleprompter | $389 | 4.2 | 32 | 2+ |

- **Facts checked today:** Gen 2 launched Sept 2025 from $379 in Wayfarer, Headliner and Skyler, 12MP ultra-wide camera, 3K video, up to 8 hours (Android Central). Black Friday cut it to $284 at Amazon, the lowest of the year (CNET, Nov 25). Gen 3 launched Sept 23, 2026 from $449 with 9 hours of battery, six microphones, a programmable action button and new Aviator and Zena styles (Engadget, 9to5Google). The audio-only Ray-Ban Meta Audio starts at $349, and Meta's own-branded glasses start at $249. Display glasses: VITURE Beast (list $549), RayNeo Air 4 Pro (list $299), XREAL 1 Pro+.
- **Angle:** two jobs, two tables. Job one is camera and AI glasses (Gen 3, Gen 2, Oakley Meta Vanguard and HSTN, Ray-Ban Meta Audio). Job two is display glasses for a screen on a plane or at a desk. For this site's reader, add what the big reviews skip: privacy settings and where glasses are banned, battery at real use, prescription options, translation, and whether Gen 2 at $284 beats Gen 3 at $449.
- **Must cover:** Gen 2 vs Gen 3 differences in a table, what Meta AI does with photos and voice, storage (32GB on Gen 2), the case battery, water resistance, and which pairs are in stock on Amazon on publish day.
- **Links:** from `best-tech-gadgets-2027` (cut its glasses and XREAL sections to a summary and link with exact anchors), out to N18 and N19 when they exist.
- **Risk:** Wareable, CNET and The Verge own the news queries. Win the "2027" buying query and the model comparison, not the launch coverage.

### 3.2 B1. Best Thunderbolt 5 Cables

- **Slug:** `best-thunderbolt-5-cables` · **Category:** `gadgets` · **Tags:** `thunderbolt-5`, `cables`, `usb4`
- **Why now:** `best-tb5-nvme-enclosures` converts at 29% (86 clickers in 25 days). Every buyer of a TB5 enclosure or dock needs a second cable. The threads that rank are people asking which brand to buy: two on Reddit ("Best brand of Thunderbolt 5 cable?", 40 comments, r/Thunderbolt; "Best 2 m (or longer) Thunderbolt 5 cable?", r/UsbCHardware) and one on the MacRumors forum ("Which brand of Thunderbolt 5 cable is as good as Apple's?").
- **SERP:** "best thunderbolt 5 cable" is EASY: OWC twice (site and shop), three Reddit threads, Cable Matters, the MacRumors forum and Amazon's best-seller page. No independent roundup exists.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| thunderbolt 5 cables | 6,600 | 19 | $1.08 |
| anker prime thunderbolt 5 cable | 1,900 | 24 | $0.33 |
| apple thunderbolt 5 cable | 590 | 32 | $0.57 |
| owc thunderbolt 5 cable | 480 | 23 | $0.89 |
| thunderbolt 5 cable for macbook | 210 | 20 | $0.00 |
| best thunderbolt 5 cables | 210 | 24 | $1.03 |
| cable matters thunderbolt 5 cable | 140 | 18 | $4.39 |
| anker thunderbolt 5 cable | 140 | 21 | $0.69 |
| intel certified thunderbolt 5 cable | 90 | 19 | $1.89 |
| long thunderbolt 5 cable | 90 | 23 | $1.26 |
| **Cluster total (45 keywords, SD ≤ 35)** | **10,990** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0DXZCXK2C` | Anker Prime Thunderbolt 5 Cable, 3.3ft USB-C to USB-C Cable, 240W Charging | $35.99 | 4.7 | 739 | 80+ |
| `B0F1RVPR8T` | Anker Prime Thunderbolt 5 Cable, 1.7ft USB-C to USB-C Cable, 240W Charging | $30.38 | 4.7 | 739 | 80+ |
| `B0FH5PWC69` | Apple Thunderbolt 5 (USB-C) Pro Cable (1m) | $69 | 4.5 | 163 | 120+ |
| `B0FB3YXRBF` | Silkland USB-IF Certified USB4 for Thunderbolt 5 Cable 5FT, 80Gbps 240W 8K | $23.68 | 4.6 | 583 | 120+ |
| `B0DRP2V8RG` | Silkland 80Gbps USB 4 for Thunderbolt 5 Cable 4FT, 120Gbps Bandwidth, 240W | $22.48 | 4.6 | 13 | 4,000+ |
| `B0FQBVW19K` | Cable Matters 80Gbps USB4 Cable, Thunderbolt 5/4 Compatible, 6.6ft / 2m | $15.99 | 4.5 | 250 | 8,000+ |
| `B0CP8K1C59` | [Intel Certified] Cable Matters 80Gbps Thunderbolt 5 Cable, 3.3ft / 1m | $29.99 | 4.7 | 12 | 120+ |
| `B0F62SQ6W1` | Fitee 80Gbps USB4 Cable for Thunderbolt 5 Cable 5FT, 240W, 16K/Dual 8K | $12.79 | 4.5 | 431 | 120+ |
| `B0DP9R2LRG` | UGREEN 80Gbps USB4 Gen4 for Thunderbolt 5 Cable, 240W USB C Cable, 3.3ft | $17.09 | 4.7 | 16 | 5+ |

- **Angle:** "The cable decides your speed." Start with the table readers want: length, certification, 80Gbps or 40Gbps, 240W, price. Then the three questions from the threads: does a cheaper USB4 80Gbps cable match Apple's, how long can a passive cable be at full speed, and does a Thunderbolt 4 cable still work (yes, at 40Gbps).
- **Must cover:** Intel certification versus "USB4 Gen4" marketing, passive versus active cables, 240W charging and the 140W MacBook Pro requirement, the 120/40 asymmetric mode that only matters for displays (Wikipedia: 80Gbps symmetric, 120Gbps one way for video), which cable ships in the box with the TS5, Anker Prime and the OWC and Acasis enclosures the site already covers, and how to read the negotiated link speed on macOS and Linux. The dock guide already states the rule twice (passive to about 0.8 m at full speed, active to about 2 m at 80Gbps); check it against Intel's certification list and each cable's listing before publishing, and do not infer speed from the product title.
- **Moat:** run the same enclosure and SSD over three cables and publish the throughput table. Label anything not measured as expected, not tested.
- **Links:** from `best-tb5-nvme-enclosures`, `best-tb5-dock-macbook-pro` and `best-thunderbolt-5-docks-guide`, which states the cable rule twice and links only the Anker Prime cable (R15).
- **Slugs:** `anker-prime-tb5-cable` and `cable-matters-tb5-cable` exist. Add the Apple Pro 1m, the Cable Matters 2m USB4 and the Silkland 4FT after checking their listing pages.
- **Risk:** low basket. The job of this page is clicks and account health, not revenue per order.

### 3.3 N20. UniFi Travel Router review

- **Slug:** `unifi-travel-router-review` · **Category:** `self-hosting` · **Tags:** `unifi`, `travel-router`, `vpn`
- **Why now:** the brand cluster is 25K+/mo and peaks in December and January ("unifi travel router" ran at 33K in Dec 2025 and 40K in Jan 2026, 18K last month). The travel router page converts at 21% and GL.iNet Beryl AX alone drew 32 clickers. It has no UniFi section.
- **SERP:** "unifi travel router review" is EASY (YouTube ×2, Ubiquiti's store, Reddit ×3, Dong Knows). The head term is MID (ui.com, How-To Geek, two Ubiquiti blog posts, stores, community). "unifi travel router vs glinet" is MID with five UGC results.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| unifi travel router | 18,100 | 29 | $1.73 |
| travel router | 9,900 | 30 | $1.64 |
| ubiquiti travel router | 4,400 | 31 | $1.39 |
| ubiquiti unifi travel router | 2,900 | 26 | $0.86 |
| gl inet travel router | 2,400 | 29 | $1.48 |
| what is travel router | 1,900 | 12 | $0.41 |
| best travel router | 1,300 | 26 | $1.06 |
| travel router best | 1,300 | 28 | $1.01 |
| gl net travel router | 1,300 | 31 | $0.63 |
| tp link travel router | 1,000 | 34 | $0.99 |
| **Cluster total (81 keywords, SD ≤ 35)** | **57,750** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0GNCPWJH9` | Ubiquiti UniFi UTR wireless router Gigabit Ethernet dual-band [2.4 GHz/5 GHz]  | $99.06 | 4.1 | 31 | 400+ |
| `B0GFY85LYH` | Ubiquiti UniFi UTR Travel Router (Power Supply Not Included) Ultra Thin | $90.59 | 4.4 | 64 | 300+ |
| `B0BPSGJN7T` | GL-MT3000 Beryl AX Wi-Fi 6 Travel Router, 2.5G WAN, VPN, OpenWrt | $84.14 | 4.5 | 55 | 6+ |
| `B0GF1J99S4` | GL-MT3600BE Beryl 7 Dual-Band Wi-Fi 7 Travel Router | $90.99 | 4.2 | 691 | 7+ |
| `B0F2MR53D6` | GL-BE3600 Slate 7 Wi-Fi 7 Travel Router Touchscreen 2.5G | $127.99 | 4.4 | 16 | 1+ |
| `B0FHZGXZH7` | Roam 7 BE3600 Wi-Fi 7 Portable Travel Router Dual-Band, 2.5G Port, USB 3.0 | $83.49 | 4.3 | 453 | 6+ |
| `B0DY8K122V` | Roam 6 AX3000 Dual-Band Wi-Fi 6 Travel Router (TL-WR3002X) | $49.99 | 4.1 | 531 | 3+ |

- **Facts checked today:** UTR is $79, Wi-Fi 5 (2.4 and 5 GHz), two Gigabit RJ45 ports, USB-C power at 5W plus a second USB-C for phone tethering, a 1.14-inch status display, 89 g, 95.95 × 65 × 12.5 mm (ui.com tech specs, How-To Geek). It carries a UniFi site's identity and VPN without reconfiguration. The Long-Range model (UTR-LR) arrived Aug 28, 2026 at $99 with a folding antenna and the same hardware (Dong Knows). The UTR-LR is not on Amazon; the UTR is, at $90.59 to $99.06 through third-party sellers.
- **Angle:** "The UTR is a remote control for a UniFi site, not a pocket router." Readers who run a UniFi Cloud Gateway get value on day one. Everyone else, and that includes the WireGuard and Tailscale crowd the existing page serves, should buy a GL.iNet. One comparison table (Wi-Fi generation, VPN, power, ports, price), one verdict.
- **Must cover:** what you need before it is useful (a UniFi site and controller), Teleport versus WireGuard, the Wi-Fi 5 ceiling and why it rarely matters in a hotel, powering it from a TV or phone charger, the two Amazon listings and their sellers, and the UTR-LR.
- **Links:** from `best-travel-router-wireguard-tailscale` with the anchor "UniFi Travel Router", and from the travel router section of `best-tech-gadgets-2027`.
- **Risk:** the head term is navigational and Ubiquiti's pages own it. Target the review, comparison and setup long-tail.

### 3.4 N8. Best Home Server Rack

- **Slug:** `best-home-server-rack` · **Category:** `self-hosting` · **Tags:** `homelab`, `server-rack`, `networking`
- **Why now:** the 10-inch mini rack page converts at 29% (115 clickers in 25 days, 400 visitors) and its next question is where to go when the mini rack is full. This is the step up.
- **SERP:** "home server rack" is EASY (Reddit ×4, YouTube, Amazon, mtlynch.io, Sysracks). The head "server rack" is MID with no editorial result at all: Sysracks, Rackmount Solutions, StarTech, two rack shops, Wikipedia, RackSolutions, Vertiv. "best server rack for home lab" is MID with seven independent sites and no big one.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| it server rack | 18,100 | 23 | $6.42 |
| server rack | 18,100 | 29 | $6.42 |
| server rack ups | 2,900 | 23 | $1.85 |
| power distribution unit for server rack | 2,400 | 7 | $3.30 |
| server rack power distribution unit | 2,400 | 21 | $5.46 |
| 19 inch server rack | 1,900 | 17 | $5.73 |
| open frame server rack | 1,900 | 20 | $4.62 |
| server rack mount cabinet | 1,900 | 20 | $3.99 |
| wall mounted server rack | 1,600 | 21 | $3.01 |
| home server rack | 1,600 | 26 | $4.51 |
| **Cluster total (11 keywords, SD ≤ 35)** | **53,390** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0CSJR2RZB` | Tecmojo 12U Open Frame Network Rack for IT & AV Gear, AV Rack Floor Standing o | $76.42 | 4.5 | 495 | 1,000+ |
| `B0CY24KZD2` | TECMOJO 12U Open Frame Network Rack for IT & AV Gear, 4-Post With Casters, Mob | $109.90 | 4.2 | 213 | 100+ |
| `B0BMDCSD8N` | Tecmojo 12U Wall Mount Server Cabinet IT Network Rack Enclosure Lockable Door  | $144.42 | 4.5 | 208 | 500+ |
| `B0D93VSSKQ` | Tecmojo 12U Wall Mount Rack Cabinet, Heavy-Duty 176 Lbs High Load Capacity, 19 | $289.90 | 4.2 | 13 | 100+ |
| `B0BSB242CM` | Tecmojo 6U Wall Mount Server Cabinet IT Network Rack Enclosure Lockable Door a | $93.42 | 4.6 | 419 | 1,000+ |
| `B0C64X8J8R` | VEVOR 12U Open Frame Server Rack Network Rack 23-40 in Adjustable Depth | $85.41 | 4 | 969 | 4+ |
| `B0C8T7WHX2` | VEVOR 12U Wall Mount Network Cabinet Server Rack, with Locking Glass Door | $107.02 | 4.2 | 95 | n/a |
| `B00P1RJ9LS` | StarTech 12U 4-Post Open-Frame Rack, 22-40in, 1200lb, Mobile (4POSTRACK12U) | $249.99 | 4.7 | 2 | 22+ |
| `B00O6GNLQE` | StarTech 25U 4-Post Open Frame Server Rack, 19in, 1200lb/544kg, Mobile | $334.99 | 4.7 | 2 | 310+ |
| `B0DXKB3PH5` | 8 Outlet PDU Power Strip, 1U Rack Surge Protection, 6FT, Black, 1 | $33.99 | 4.4 | 224 | 1,200+ |
| `B00077IG3O` | CyberPower CPS1215RM Basic PDU | $63.95 | 4.8 | 738 | 100+ |
| `B09FZKHH2G` | Rapink Patch Panel 24 Port Cat6 with Inline Keystone 10G Support, Pass-Thru Co | $37.99 | 4.6 | 663 | 400+ |
| `B08FF9RBGJ` | 2 Pack of 1U Vented Cantilever Server Rack Mount Shelf 6" Deep | $24.35 | 4.6 | 822 | 19+ |

- **Angle:** the 19-inch step from `best-10-inch-mini-rack`. Three shapes (open frame, wall cabinet, floor cabinet), then one question that decides everything: depth. Then a full cart with totals for three budgets: a 12U wall cabinet, a 12U open frame and a 25U frame.
- **Must cover:** U and rack-unit math, square-hole versus tapped rails, why 12 to 18 inch wall cabinets cannot take a server chassis, weight ratings and wall anchors, heat and noise in a closet, casters, the PDU section ("power distribution unit for server rack" is 2,400/mo at SD 7; a $34 1U PDU sells 1,200+ a month), patch panels and shelves, and a PDU-versus-UPS box that links to `best-rack-mount-ups-homelab`.
- **Links:** from `best-10-inch-mini-rack` ("outgrowing 10 inches"), from `best-rack-mount-ups-homelab` and `best-mini-pc-home-server`; out to N9 (rackmount cases), N21 (Mac mini mounts) and A4.
- **Slugs:** six from Appendix C of the Nov 4 plan (`tecmojo-12u-wall-cabinet`, `tecmojo-12u-open-frame`, `tecmojo-12u-wall-open-frame`, `rackpath-12u-wall-cabinet`, `echogear-15u-open-frame`, `echogear-10u-open-frame`), plus a PDU, a patch panel and a shelf.
- **Risk:** shipping damage and dented panels are the common complaints on cheap racks. Read the one-star reviews before picking a budget cabinet.

### 3.5 B11. Best PoE Switch and Injector for IP Cameras

- **Slug:** `best-poe-switch-for-cameras` · **Category:** `self-hosting` · **Tags:** `poe`, `frigate`, `networking`
- **Why now:** the Frigate camera page (Nov 11) never names a PoE switch, and the doorbell page mentions one without a pick. Search Console already shows "best multi-gig poe switch 2026" (112 impressions, position 8.3) on the 2.5/10GbE switch guide. The plan's version of this page scored 15; with the camera keywords at SD 7 to 20 it is the easiest SERP on this list.
- **SERP:** "best poe switch for ip cameras" is EASY (Level1Techs forum, YouTube, IPCamTalk, TP-Link ×3). "poe switch for security cameras" is EASY. "poe injector for ip camera" is MID with no big site.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| poe switch | 22,200 | 20 | $1.50 |
| poe injector for ip camera | 1,900 | 14 | $1.15 |
| ip camera poe injector | 1,600 | 15 | $0.47 |
| poe switch for ip cameras | 1,300 | 15 | $3.03 |
| unmanaged poe switch | 1,300 | 23 | $0.92 |
| poe injector for ip cameras | 1,000 | 7 | $1.01 |
| poe switch for security cameras | 1,000 | 20 | $1.15 |
| poe switch for camera | 1,000 | 20 | $1.98 |
| poe switch for ip camera | 1,000 | 20 | $1.92 |
| poe switch for cameras | 880 | 18 | $2.01 |
| **Cluster total (14 keywords, SD ≤ 35)** | **34,680** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B076HZFY3F` | TP-Link TL-SG1005P, 5 Port Gigabit PoE Switch, 4 PoE+ Ports @65W, Desktop, Plu | $39.85 | 4.7 | 59 | 5,000+ |
| `B0CWJMRTWY` | TP-Link LS108GP, 8 Port PoE Gigabit Ethernet Switch | $49.99 | 4.6 | 709 | 8+ |
| `B01BW0AD1W` | TP-Link TL-SG108PE V3, 8 Port Gigabit Easy Smart Managed PoE Switch | $59.99 | 4.6 | 18 | 4+ |
| `B0C4X7VZV9` | TP-Link TL-SG116P, 16 Port Gigabit PoE Switch | $101.15 | 4.6 | 296 | 16+ |
| `B0FHK6N2H4` | UGREEN Ethernet Switch, 10-Port PoE Switch, 8 PoE+@60W + 2 Gigabit Uplink | $33.59 | 4.6 | 260 | n/a |
| `B0BWHKQ5N9` | REOLINK PoE Switch with 8 PoE and 2 Gigabit Uplink Ports RLA-PS1 | $63.74 | 4.6 | 448 | 36+ |
| `B0823HN12D` | NETGEAR 16-Port PoE Gigabit Ethernet Unmanaged Network Switch (GS316P) | $131.79 | 4.4 | 277 | 16+ |
| `B08LZZRX5N` | Omada PoE+ Injector, Up to 30W, Gigabit, UL Certified(POE160S) | $19.99 | 4.7 | 707 | 100+ |
| `B07JCB5XWF` | Omada 48V PoE Injector, Gigabit, Up to 24W(POE4824G) | $13.99 | 4.7 | 623 | n/a |
| `B07V24C4M8` | Gigabit PoE+ Injector Powerline Network Adapter IEEE 802.3af/at | $19.99 | 4.6 | 882 | 10+ |

- **Angle:** "Power the cameras, then forget them." PoE budget math first (watts per camera × cameras, with headroom), then one injector pick for one or two cameras and three switch picks for four, eight and sixteen.
- **Must cover:** 802.3af, at and bt; gigabit versus 2.5G multi-gig for 4K cameras and the uplink; managed versus unmanaged, with the camera VLAN that stops cameras from calling home; fanless noise; SFP uplink to the 10GbE core; surge protection for outdoor runs; total power draw on the UPS.
- **Links:** from `best-cameras-frigate-home-assistant`, `best-poe-doorbell-home-assistant`, and the "If something needs PoE" section of `best-2-5-10gbe-switch-homelab` (cut that section to a summary and link here, R18).
- **Slugs:** `tp-link-tl-sg105pp-m2`, `yuanley-8-port-2-5g-poe` and `ubiquiti-flex-2-5g-poe` exist. Add the TL-SG1005P, the LS108GP, the Reolink RLA-PS1 and the two Omada injectors.

### 3.6 A7. Best GPU for Local LLMs and Local AI Servers

- **Slug:** `best-gpu-for-local-llm` · **Category:** `ai` · **Tags:** `local-llm`, `gpu`, `ai-server`
- **Why now:** "local ai server" is 1,900/mo at SD 18 with a $10 CPC and its SERP is GitHub repos, Quora and Medium posts. Nobody has written the buyer's guide. "best gpu for local llm" has zero big sites in the top 8. `best-mini-pc-local-llm` has an H2 called "Need CUDA? Build a GPU box instead" with nothing to link to (R5).
- **SERP:** "local ai server" EASY, "best local ai server" EASY, "home ai server" EASY, "best gpu for local llm" MID with no big site, "best gpu for ai" MID with one.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| best local ai server | 3,600 | 35 | $5.88 |
| local ai server | 1,900 | 18 | $10.23 |
| best gpu for ai | 1,000 | 27 | $3.44 |
| 16gb vram gpu | 590 | 27 | $0.51 |
| 24gb vram gpu | 590 | 27 | $0.41 |
| 32gb vram gpu | 320 | 27 | $0.44 |
| 12gb vram gpu | 320 | 28 | $0.46 |
| home ai server | 210 | 28 | $4.71 |
| best gpu for llm | 170 | 15 | $2.82 |
| best gpu for local llm | 170 | 16 | $0.99 |
| **Cluster total (168 keywords, SD ≤ 35)** | **11,360** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0F4Y6N6PW` | NVIDIA GeForce RTX  5060 Ti 16GB OC Dual-Fan Graphics Card | $799.99 | 4.6 | 248 | 16+ |
| `B0F7WB6LSH` | Dual GeForce RTX 5060 Ti 16GB GDDR7 OC Edition Gaming Graphics Card | $824 | 4.6 | 456 | 5+ |
| `B0DS2WQZ2M` | ASUS ROG Astral GeForce RTX 5090 32GB GDDR7 OC Edition Gaming Graphics Card | $6,899.99 | 4.4 | 206 | 5+ |

- **Angle:** three builds at three budgets under the "local AI server" umbrella, ranked by $ per GB of VRAM: a single-GPU box, a Strix Halo mini PC (link A8), and a Mac. Then the VRAM tiers (12, 16, 24, 32, 48GB) with the model sizes that fit each, tokens-per-second expectations labelled as estimates, and CUDA versus ROCm versus Vulkan on llama.cpp.
- **Must cover:** PSU and case clearance, blower versus open-air coolers in a multi-GPU box, used RTX 3090 and where it is and is not sold (mostly off Amazon, say so), power draw and noise, and "when not to buy a GPU at all" (link A8). GPU prices on Amazon are far above MSRP (RTX 5090 listings from $6,900): lead with the $/GB table and a price-checked date.
- **Links:** R5 from `best-mini-pc-local-llm`; from `ollama-docker-install`, `best-open-source-llms-claude-alternative` and `openclaw-ollama-local-models`; out to A8.
- **Risk:** `best-mini-pc-local-llm` lost Google clicks in the last window (54 to 17). Fix that page first (R20) so this one links into a healthy hub.

### 3.7 B12. Best SSD for NAS

- **Slug:** `best-ssd-for-nas` · **Category:** `self-hosting` · **Tags:** `nas`, `ssd`, `storage`
- **Why now:** 12,800/mo of cluster volume and a SERP led by two NASMaster articles from 2024 and a WunderTech post from November 2024, next to three forums. `best-nas-for-plex` names an M.2 cache drive (WD Black SN850X) and no page on the site explains the choice. The Nov 4 plan parked this article because SSD prices looked wrong. They still are, and that is the article.
- **SERP:** "best ssd for nas" EASY (one big site, NASCompares), "ssd for nas" EASY, "best ssd for truenas" EASY (TrueNAS forums ×4).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| ssd for nas | 4,400 | 29 | $1.35 |
| nas ssd drive | 3,600 | 28 | $1.25 |
| nas ssd | 880 | 27 | $1.74 |
| nas ssd synology | 590 | 23 | $0.92 |
| best ssd for nas | 480 | 31 | $2.04 |
| best nas ssd | 390 | 29 | $2.14 |
| nvme ssd for nas | 170 | 20 | $4.51 |
| sata ssd for nas | 170 | 22 | $1.31 |
| nas ssd vs hdd | 170 | 22 | $0.00 |
| synology nas ssd cache | 170 | 23 | $0.00 |
| **Cluster total (96 keywords, SD ≤ 35)** | **12,800** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0BR3TXGMW` | Gigastone 1TB High Endurance SSD (2-Pack) Up to 550MB/s TLC Flash with SLC Cac | $269.99 | 4.4 | 132 | 100+ |
| `B0HDX145BF` | SANDISK 1TB NAS 600 3D NAND Internal SSD 2.5" SATA Internal SSD | $259.99 | 5 | 1 | 6+ |
| `B09TVXVMVL` | Gigastone 2TB High Endurance SSD Up to 550MB/s TLC Flash with SLC Caching 24/7 | $299.99 | 4.1 | 71 | 50+ |
| `B0BVQMH381` | Gigastone 4TB High Endurance SSD Up to 530MB/s SLC Caching 24/7 Reliable for G | $499.99 | 4 | 251 | 50+ |
| `B08QB93S6R` | Samsung SSD 870 EVO SATA III 2.5" 2TB, Read Speeds Up to 560MB/s | $489.71 | 4.8 | 457 | 77+ |

- **Angle:** "What is worth buying at November 2026 prices." Three jobs: the boot and OS drive (buy it), the read cache (buy it if the pool is HDD), the all-flash pool (wait). Lead with $/TB and the $/TB of the HDD guide next to it.
- **Must cover:** endurance (TBW and DWPD), DRAM-less drives, why consumer SSDs have no power-loss protection and what that does to ZFS sync writes, vendor compatibility lists (Synology, UGREEN), SATA versus M.2 slots per NAS model, noise and power savings, and a monthly price check on the table.
- **Links:** from the "Drives to buy with it" block on `best-nas-homelab-docker-proxmox` (add one SSD line), from `best-nas-for-plex`, `ugreen-vs-synology`, `best-hard-drives-for-nas` and `best-das-enclosure-homelab`.
- **Slugs:** none exist. The SanDisk NAS 600 listing has 1 rating; confirm the listing before linking it.

### 3.8 N28. GeeekPi RackMate vs Tecmojo: which 10-inch rack

- **Slug:** `geeekpi-vs-tecmojo-10-inch-rack` · **Category:** `self-hosting` · **Tags:** `mini-rack`, `homelab`, `deskpi`
- **Why now:** Search Console shows six brand comparisons landing on `best-10-inch-mini-rack`: "geeekpi vs deskpi" (75 impressions, position 9.0), "geeekpi vs tecmojo" (55, 4.8), "tecmojo vs geeekpi" (39, 5.2), "deskpi vs geeekpi" (25, 9.6), "tecmojo vs deskpi" (22, 4.4), "deskpi vs tecmojo" (18, 4.2). The page converts at 29% and answers none of them by name.
- **SERP:** "geeekpi vs tecmojo" is EASY (Overclockers forum, Reddit ×2, Amazon, GitHub, Facebook, and bitdoze at #6).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| mini rack | 1,900 | 26 | $1.55 |
| server mini rack | 1,900 | 30 | $2.23 |
| 10 inch rack | 880 | 22 | $1.53 |
| 10 inch server rack | 590 | 25 | $1.24 |
| deskpi rackmate | 590 | 25 | $1.33 |
| geeekpi rack | 170 | 20 | $0.44 |
| deskpi mini rack | 170 | 25 | $0.51 |
| tecmojo rack | 140 | 16 | $3.29 |
| deskpi rack | 140 | 18 | $0.61 |
| 10 inch rack nas | 140 | 25 | $2.15 |
| **Cluster total (26 keywords, SD ≤ 35)** | **7,200** | | |

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0FYNM62F7` | GeeekPi 12U Network Rack, 10 inch Mini Server Rack for Network, Servers, Audio | $125.99 | 4.7 | 253 | 400+ |
| `B0FBFDZD4C` | GeeekPi 8U Network Rack, 10 inch Mini Server Rack for Network, Servers, Audio, | $101.99 | 4.7 | 330 | 200+ |
| `B0CSCWVTQ7` | GeeekPi 8U Network Rack, 10 inch Mini Server Rack for Network, Servers, Audio, | $101.99 | 4.7 | 330 | 50+ |
| `B0FPF8CRYG` | GeeekPi 4U Server Rack, 10 inch Mini Network Rack for Network, Servers, Audio, | $67.09 | 4.6 | 247 | 100+ |
| `B0H3C2CYPG` | GeeekPi 6U Server Rack, 10 inch Mini Rack for Network, Servers, Audio, and Vid | $95.99 | 4.6 | 23 | 50+ |
| `B0F4JWMY4T` | Tecmojo 10 inch Mini Server Rack,12U Rack 10.23" Dp,for 10in Devices,White | $139.90 | 4.6 | 180 | 10+ |
| `B0F4JZ9YJW` | Tecmojo 10 inch Mini Server Rack,6U Rack 7.87" Dp,for 10in Devices,White | $59.42 | 4.5 | 221 | 10+ |
| `B0FM7SWXWP` | Tecmojo 10 inch Mini Server Rack,4U Rack 7.87" Dp,for 10in Devices,White | $50.92 | 4.5 | 221 | 10+ |
| `B0FWJWDM5L` | GeeekPi 8U Server Rack Cabinet, DeskPi RackMate T1 Plus,10 inch Network Rack f | $118.39 | 4.8 | 91 | n/a |

- **Angle:** naming first, because the listings confuse everyone: on Amazon the cabinets are sold as "GeeekPi ... DeskPi RackMate", with T0, T1 and T2 as the size tiers and TT and TL as variants, while DeskPi runs its own store and wiki for the same racks. Then the comparison that matters: steel thickness, door and side panel fit, cable entry, depth (7.87 versus 10.23 inches), what fits per U (Pi shelf, 1U shelf, patch panel, PDU, a mini PC), price per U, and the shipping-damage reports in one-star reviews.
- **Must cover:** a table of every current model with price per U, which accessories are interchangeable, the Tecmojo depth options, and a verdict per budget.
- **Links:** from `best-10-inch-mini-rack`: cut "4. The Tecmojo alternatives" to a summary and link with the six anchors above (R16). Out to N8 for the 19-inch step.
- **Risk:** the brand-specific pool is about 2,000/mo (the table adds the generic mini-rack heads the existing page already owns). Half a day, and it protects a page that already converts.

## 4. Second tier: January to February 2027

| ID | Article and slug | Category, tags | Keywords (US vol/mo, SD) | SERP | Amazon snapshot (2026-11-26) | Score |
|---|---|---|---|---|---|---:|
| A8 | DGX Spark alternatives: Strix Halo mini PCs · `dgx-spark-alternatives-strix-halo` | `ai` · local-llm, strix-halo, mini-pc | dgx spark price (3,600, 22); strix halo mini pc (1,300, 34); dgx spark alternative (720, 32); dgx spark vs mac studio (590, 26) | MID, 0 big sites on the primary | GMKtec EVO-X2 $2,199.99 (4.3, 80 ratings, 64+/mo; check the RAM variant); GMKtec X3 128GB $3,949.99; MINISFORUM MS-S1 Max $3,959; DGX Spark $6,949.99 (100+/mo) | 17 |
| N4 | Best low-profile GPU for a home server · `best-low-profile-gpu-home-server` | `self-hosting` · gpu, plex, homelab | low profile gpu (2,900, 25); low profile graphics card (1,600, 26); best low profile gpu (590, 31) | EASY | MSI RTX 3050 LP 6G $259.99 (4.5, 396, 200+/mo); MSI GT 1030 $109.99 (200+/mo); Gigabyte RTX 5060 LP $509.99 | 17 |
| A9 | OCuLink eGPU docks and the mini PCs that have OCuLink · `best-oculink-egpu-dock` | `gadgets` · egpu, oculink, mini-pc | oculink egpu (1,300, 28); egpu enclosure (2,400, 29); laptop with external gpu (12,100, 26) | MID | UGREEN LinkStation eGPU $379.99 (4.8, 7 ratings, 850+/mo); MINISFORUM DEG2 $247 (50+/mo); generic OCuLink docks $49.99 to $105.99 | 16 |
| B2 | Best IP KVM for a homelab · `best-ip-kvm-homelab` | `self-hosting` · ip-kvm, homelab, remote-access | ip kvm (6,600, 25); pikvm (6,600, 21); ip kvm switch (1,900, 25); gl inet comet (1,300, 17) | MID; "jetkvm vs pikvm" EASY | JetKVM $143.99; GL.iNet Comet Pro $143.99, Comet PoE $81.19, Comet X $279.99; PiKVM V4 Mini $309.95 (200+/mo) | 16 |
| N18 | Best AI voice recorders: Plaud NotePin, Note Pro and the alternatives · `best-ai-voice-recorder` | `ai` · ai-recorder, plaud, transcription | ai voice recorder (6,600, 30, CPC $5.12); wearable ai voice recorder (1,300, 30); best ai voice recorder (590, 32) | MID, 3 big sites | Plaud Note Pro $149.99 (4.5, 37, 112+/mo); generic AI recorders $37.99 to $119.25 (90 to 300+/mo); Bee Frontier $52.49 (4K+/mo) | 16 |
| N22 | SFP modules and DAC cables explained: what to buy for 10GbE · `sfp-modules-explained` | `self-hosting` · sfp, 10gbe, networking | sfp module (4,400, 13, CPC $4.25); sx sfp module (12,100, 18); sfp module 10g (260, 19) | MID, vendor pages only | 10Gtek SFP+ DAC $9.99 to $14.44 (300 to 500+/mo); 10Gtek 10GBase-T SFP+ $38.24 (4.3, 939 ratings, 500+/mo) | 16 |
| N3 | Best used and refurbished mini PCs for a homelab · `best-used-mini-pc-homelab` | `self-hosting` · mini-pc, homelab, refurbished | refurbished mini pc (880, 22); used mini pc (1,000, 25); lenovo m720q (1,300, 27) | MID | HP EliteDesk 800 G4 Mini $190 (400+/mo); 800 G2 $170 (200+/mo); OptiPlex 3050 $154.99 (300+/mo) | 16 |
| N19 | Best AI gadgets 2027 · `best-ai-gadgets-2027` | `gadgets` · ai-gadgets, smart-glasses, wearables | ai gadgets (590, 29); best ai gadgets (110, 29) | "best ai gadgets 2027" EASY, bitdoze already #3 | Reuse the N17 and N18 picks | 15 |
| B6 | Best mini UPS for router and modem · `best-mini-ups-router-modem` | `self-hosting` · ups, networking, homelab | mini ups (880, 29); ups for router (720, 29); ups for modem and router (390, 27) | MID | CyberPower ST425 $59.95 (425+/mo); APC BE425M $62.50 (425+/mo); TalentCell $64.99 (300+/mo) | 15 |
| N29 | Which Protectli Vault to buy · `protectli-vault-buying-guide` | `self-hosting` · opnsense, protectli, firewall | protectli vault (1,000, 30); opnsense hardware (590, 27); pfsense hardware (480, 29) | Vendor pages and one Reddit thread | Vault FW4B $449 (4.5, 452 ratings); FW4C $369 to $449; V1410 with 4× 2.5G $499 | 15 |
| N25 | Best ergonomic keyboard for programmers (replaces the B10 framing) · `best-ergonomic-keyboard-programmers` | `gadgets` · keyboards, ergonomic, developer-setup | carpal tunnel ergonomic keyboard (5,400, 17); best ergonomic keyboard (3,600, 21); split keyboard (9,900, 31) | "ergonomic keyboard for programmers" EASY; "best ergonomic keyboard" MID | Logitech Ergo K860 $108.29 (4.4, 81); Nulea split $37.99 (4.6, 205); Arteck split $42.49 (1K+/mo) | 15 |
| N9 | Best rackmount PC case for a homelab · `best-rackmount-pc-case` | `self-hosting` · server-rack, homelab, diy-nas | pc rackmount case (1,900, 21); rackmount pc case (1,600, 26); 4u server case (590, 24) | EASY | Rosewill 4U $94.99 (200+/mo); Diandian 4U shallow $82.44 (4.6, 355) | 15 |
| B7 | Best NAS case for a DIY NAS · `best-nas-case-diy-nas` | `self-hosting` · nas, diy-nas, homelab | nas case (2,900, 28); best nas case (390, 22); nas motherboard (720, 23) | MID | Jonsbo N3 $142.49 (50+/mo); N4 $109.99; N6 $158.39 (100+/mo); Dark Rock Storage Master $89.99 | 15 |
| N23 | Best microSD card for Raspberry Pi · `best-micro-sd-card-raspberry-pi` | `self-hosting` · raspberry-pi, storage, micro-sd | micro sd card for raspberry pi (5,400, 23) | MID, no big site | SanDisk High Endurance 128GB $38.99 (4.7, 783, 10K+/mo); 64GB 3-pack $33.99 (10K+/mo) | 14 |
| C1 | Raspberry Pi 5 NAS build · `raspberry-pi-5-nas` | `self-hosting` · raspberry-pi, nas, diy | raspberry pi nas (2,900, 21); raspberry pi nas storage (2,400, 28) | MID and EASY | Pironman 5-MAX $75.99 (4.5, 653, 100+/mo); Penta SATA HAT $79.99 (50+/mo) | 14 |

Notes on the second tier:

- **N29 is one hour of retrofit first.** `best-mini-pc-opnsense` is the best-converting page on the site (33%) and already has a Protectli section. Add two H2s there: "OPNsense and pfSense hardware requirements" and "Which Protectli Vault". The model queries ("protectli vault fw4b" 170/mo, "v1410" 70/mo, "vp2430" 50/mo) only justify a page if Search Console starts showing them.
- **N22 is the R12 section of the Nov 4 plan grown into a page.** The switch guide already sells the 10Gtek DAC (`10gtek-sfp-dac-1m`) in a section called "The cable that makes the SFP+ port real". Link both ways and keep the guide's section as a summary.
- **N25 replaces B10.** "best keyboard for programming" is 1,300/mo; the ergonomic cluster around it is 18,000+/mo and the ProtoArc XK01 drew 30 clickers from the gadgets page. Merge B10 into this brief.
- **N18 leans on the speech cluster.** Link it from `assemblyai-review`, `openai-whisper-alternatives` and `best-free-dictation-apps`, which get traffic and have no hardware link.
- **B7 now overlaps `nas-build-under-500`** (a Jonsbo N3 build). Keep B7 as the case roundup and link the two ways.

Keyword tables for every second-tier article are in Appendix B.

## 5. Third tier and the rest of the backlog

| ID | Article | Keywords (US vol/mo, SD) | SERP | Why it waits |
|---|---|---|---|---|
| N21 | Mac mini rack mount kits · `mac-mini-rack-mount` | mac mini rack mount (880, 20); mac mini rack (260, 20) | MID, vendor pages only (Rackmount Solutions, MK Manufacturing, Sonnet) | Amazon has it (Sonnet RackMac mini $349.99, UCTRONICS $71.99) but the ratings are thin. Half a day when the Mac mini cluster needs a third page. |
| N12 | Headless Mac mini server setup · `headless-mac-mini-setup` | hdmi dummy plug (1,300, 29); headless mac mini (260, 24) | EASY | R11 is resolved, so it can go. Low basket. |
| N11 | Best tablet and wall panel for a Home Assistant dashboard · `best-home-assistant-wall-panel` | home assistant tablet (320, 22); home assistant wall panel (320, 22) | EASY | 1,030/mo cluster. Cheap SKUs, HA cluster converts at 22%. |
| N13 | mmWave presence sensors | mmwave presence sensor (390, 17) | MID | Every candidate has a rating below 4.1 (Aqara FP2 3.6, SwitchBot 3.5, SONOFF SNZB-06P 4.0). |
| N14 | Weather station for Home Assistant | home assistant weather station (480, 24) | EASY | Navigational head ("ambient weather station" 8,100/mo). |
| N30 | Home Assistant voice hardware | home assistant voice preview edition (3,600, 20) | Official docs and community only | The official Voice Preview Edition is not on Amazon; the Third Reality dev edition is ($79.99, 3.4 stars). Fold it into the "Local voice" section of `best-home-assistant-hardware` instead. |
| N15 | Omada vs UniFi | omada vs unifi (210, 14) | EASY | 420/mo. |
| N10 | TrueNAS and Unraid hardware | sas hba card (480, 27); truenas hardware (210, 20) | Vendor docs and forums | 1,730/mo. |
| N16 | Security cameras without a subscription | best home security camera without subscription (8,100, 29) | MID | Consumer SERP with funded affiliates. Only after N2 ranks. |
| C2, C3 | 5K monitor for Mac, monitor light bar | 880/28, 590/27 | MID | Off-core and low conversion, as before. |

## 6. Do not write

| Idea | Data | Why not |
|---|---|---|
| Water leak sensors | water leak sensor (22,200/mo, SD 20, CPC $13.85) | "best water leak sensor" is HARD: Amazon, Reviewed, Wired, PCMag ×2 and the New York Times. The CPC comes from water-damage restoration ads, not from the product. The Zigbee sensors page already has a leak pick. |
| Video doorbell without a subscription | doorbell camera no subscription (4,400, 32) | HARD: Aqara, eufy, TechRadar ×2, Amazon, Consumer Reports. `best-poe-doorbell-home-assistant` covers the Home Assistant slice. |
| Gifts for nerds and geeks | gifts for nerds (1,300, 23) | MID (Gizmodo, PCMag, CNN); "gifts for geeks" is HARD (PCMag, Best Buy, How-To Geek, PC World). Two gift guides shipped on Nov 14 and Nov 18; a third splits the internal links. |
| Tech gifts under $50, best tech gifts 2027 | 320/mo | HARD: 4 to 6 big sites. |
| Best smart home gadgets 2027 | smart home gadgets (1,900, 22) | HARD (Yahoo, PopSci, T3, The Verge). `best-tech-gadgets-2027` already ranks #4 for it. |
| Best portable monitor | portable monitor (49,500, 28) | HARD on the plain query: Wired, CNET, Forbes, ZDNet, IGN, TechRadar, Best Buy. The Arzopa A1 is the #9 product by clickers, so keep it in the gadgets and desk-setup lists. |
| USB microphone for Mac mini | 1,000/mo at SD 10 | Retail SERP: Newegg ×4 and Amazon ×2. Add a microphone line to the dictation articles instead. |
| Monitor arms | computer monitor arm (22,200, 28) | MID and off-core. Covered by `best-desk-setup-gadgets-2027`. |
| 3D printers, drones, power banks, earbuds, smartwatches, dashcams | 60K to 1M/mo | Off-core. They stay as sections of the gadgets list, where they already convert. |
| Everything in section 8 of the Nov 4 plan | unchanged | Still valid. |

## 7. Fixes on existing pages (before or alongside the new articles)

| # | Page | Evidence | Action | When |
|---|---|---|---|---|
| R20 | `best-mini-pc-local-llm`, `best-mini-pc-proxmox`, `best-mini-pc-home-server` | Google clicks fell 54 to 17, 25 to 8 and 28 to 16 between the two windows while the site grew 57%; Plausible visitors held | Inspect the lost queries in Search Console (AI Overviews, a new competitor, or the year in the title). Fix before A7, A8 and N3 link in. | Now |
| R15 | `best-thunderbolt-5-docks-guide` | It answers the cable question twice ("Cable rules, in short" and the troubleshooting section) and links only `anker-prime-tb5-cable`; the TODO the Nov 4 plan mentions is gone | Add the B1 link next to both answers | When B1 ships |
| R19 | `best-tech-gadgets-2027` | 183 clickers at 25%; sections on glasses, the AI recorder and the travel router | Trim each to a summary and link to N17, N18 and N20 with exact anchors | As each ships |
| R16 | `best-10-inch-mini-rack` | Six brand comparison queries at positions 4 to 9 | Cut "4. The Tecmojo alternatives" to a summary and link N28 with those anchors | When N28 ships |
| R17 | `best-mini-pc-opnsense` | "opnsense hardware 2026" and "best opnsense hardware 2026" at positions 9 to 10; Protectli FW4C is the #7 product | Add the two H2s from N29 | Now |
| R18 | `best-2-5-10gbe-switch-homelab` | "best multi-gig poe switch 2026" (112 impr, 8.3) | Turn the PoE section into a summary plus the B11 link; name the multi-gig PoE switch | When B11 ships |
| R8 | All 2026 roundups | "gadgets 2027" ranks within weeks; year-modified demand is rising | Flip titles and descriptions to 2027 with a real price and stock check | Dec 15 |
| R14 | `/go/` links flagged on Oct 23 | `kensington-sd5000t5`, `anker-prime-tb5`, `minisforum-ai-x1-pro`, `ivanky-fusiondock-pro-3` were flagged as landing on the wrong listing | Confirm and repoint | Now |
| R21 | `best-zigbee-sensors-home-assistant` | "Best Water Leak Sensors" (r/homeassistant, 50 comments, Sept 2026) and 6 more leak threads name Zooz, YoLink, Moen, Govee and Aqara; the page has one leak pick | Add a leak-sensor section with three picks | Jan 2027 |
| ES, DE | Top converters | The ES gadgets page converts at 28% and the DE copy at 26% | Translate N17, B1, N20 and N8 after geo-routing ships | Q1 2027 |

## 8. Calendar

Cadence from the Nov 4 plan: two articles and one retrofit a week until Dec 20, then one to two articles and one refresh a week.

| Week of | Articles | Retrofit or ops |
|---|---|---|
| Dec 1 | **N17** smart glasses (before the December peak) · **B1** TB5 cables | R15 · R17 · start the geo-routing build |
| Dec 8 | **N20** UniFi Travel Router · **B11** PoE switch and injector | R19 (first two sections) · R18 |
| Dec 15 | **A7** GPU and local AI server · **N28** 10-inch rack brands (half day) | R8 year flip · R5 · R20 findings applied |
| Dec 22 | **N8** home server rack · **B12** SSD for NAS | R16 · Bing Webmaster Tools and IndexNow |
| Jan 2027 | A8 · N4 · A9 · B2 | Monthly Plausible pull on the first Monday; re-rank this list by clicker rate |
| Feb 2027 | N18 · N22 · N19 · B6 | N29 retrofit check |
| Feb to Mar 2027 | N23 · N3 · N9 · C1 · N25 · B7 | N21 and N11 if the HA and Mac mini clusters keep converting |
| Aug 2027 | `best-tech-gadgets-2028` | The 2027 page was live on Oct 24 and ranked by late November; be early next time |

Per-article targets are those of section 9 of the Nov 4 plan: indexed within 7 days, at least 200 impressions a week and the primary keyword at position 15 or better by day 60, position 8 or better by day 120, clicker rate of 15% or more.

## 9. What Reddit says

Bright Data returned **149 of the 191 threads** (title, score, comment count, top comments). 147 came with comments. 47 were posted in 2026 and 41 in 2025. Busiest subreddits: r/homelab 40, r/MiniPCs 11, r/homeassistant 11, r/SmartGlasses 6, r/Thunderbolt 5, r/PleX 4, r/minilab 3, r/Ubiquiti 3.

Threads per topic, by comment count. The last column counts threads (post plus comments) that name each brand.

Not returned when this file was written (one Bright Data batch was still running): Travel routers, microSD for Raspberry Pi, SFP+ modules.

| Topic | Threads | Comments | Most discussed threads | Brands named (threads) |
|---|---:|---:|---|---|
| TB5 cables | 8 | 222 | Best 2 m (or longer) Thunderbolt 5 cable? (r/UsbCHardware, 56 comments, 2026-08)<br>Best brand of Thunderbolt 5 cable? (r/Thunderbolt, 40 comments, 2026-01)<br>CalDigit 2m Thunderbolt 5 cable (r/Thunderbolt, 39 comments, 2026-01) | OWC 6, CalDigit 6, Cable Matters 6, Apple 4, Anker 3, Silkland 1 |
| 10-inch racks | 7 | 143 | DeskPi + Optiplex SFF = (r/homelab, 61 comments, 2026-02)<br>I'm building a 10" rack for my homelab! (r/homelab, 29 comments, 2026-08)<br>I need to buy a 10 inch rack (r/homelab, 16 comments, 2026-03) | GeeekPi 6, Tecmojo 4, DeskPi 4, RackMate 3 |
| Mac mini rack mounts | 13 | 303 | I made a rack for M4 Mac Mini (r/macmini, 66 comments, 2024-11)<br>Mac mini mini rack (r/macmini, 36 comments, 2026-04)<br>M4 Mac Mini Rack Mount to UniFi Toolless Mini Rack (r/Ubiquiti, 35 comments, 2026-04) | Sonnet 8, RackMac 8 |
| 19-inch racks | 10 | 255 | I 3D printed a 12U server rack and stuffed $3,700 of gear inside. Here's the full bu (r/homelab, 73 comments, 2026-03)<br>Where to get a rack? (r/homelab, 45 comments, 2024-08)<br>A small, power-efficient homelab that fits in a 10-inch network cabinet (r/homelab, 41 comments, 2024-01) | Tripp Lite 2, StarTech 2, Rosewill 1, NavePoint 1, APC 1 |
| PoE switches | 7 | 145 | 48 port poe switch for POE cameras (r/networking, 39 comments, 2024-12)<br>POE switch to run 3 cameras (r/reolinkcam, 26 comments, 2025-03)<br>POE switch recommendations for Omada homelab (r/TPLink_Omada, 17 comments, 2024-01) | Ubiquiti 4, TP-Link 4, Yuanley 1, Reolink 1, Netgear 1, Hikvision 1 |
| NAS SSDs | 6 | 210 | All SSD NAS, which SDD should I buy? (r/homelab, 52 comments, 2024-08)<br>Use of SSD in NAS question (r/homelab, 44 comments, 2023-06)<br>SSD nas (r/synology, 44 comments, 2023-11) | any SSD 6, Samsung 3, Crucial 3, WD 2, Synology 2, Seagate 2 |
| NAS for Plex | 7 | 215 | Best NAS(s) for Plex Server in 2025 - Budget Friendly and Premium options (r/PleX, 97 comments, 2025-07)<br>Best NAS only for a Plex backup (r/PleX, 31 comments, 2024-08)<br>Nas best for Plex server (r/synology, 25 comments, 2026-01) | Synology 7, TerraMaster 4, QNAP 4, Unraid 3, UGREEN 1, TrueNAS 1 |
| Smart glasses | 7 | 99 | Any smart glasses with a display that still feel wearable day to day? (r/SmartGlasses, 23 comments, 2026-05)<br>Ready to purchase: Need advice (r/SmartGlasses, 22 comments, 2026-07)<br>Best smart glasses with display and ring or band so you don't have to touch the glas (r/SmartGlasses, 19 comments, 2026-05) | Meta (any) 6, Rokid 5, Even Realities 5, RayNeo 2, XREAL 1, Ray-Ban Meta 1 |
| AI voice recorders | 5 | 73 | Best AI recording and transcription tool for physical meetings (r/ProductivityApps, 51 comments, 2024-12)<br>TicNote vs Plaud vs Soundcore - 2 months of daily work testing AI voice recorders (r/ProductivityApps, 10 comments, 2026-02)<br>My experience writing with a voice recorder and AI transcription tools (r/WritingWithAI, 5 comments, 2025-10) | Plaud 2, ChatGPT 2 |
| Mini PCs for a home server | 14 | 1,415 | Recommendations about mini pcs for servers? (r/homelab, 71 comments, 2023-06)<br>I'm looking for a good mini pc to use as server (r/homelab, 39 comments, 2025-04)<br>Using a Intel N150 Mini PC as a home server (r/homelab, 38 comments, 2025-05) | Beelink 14, N100/N150 13, HP/EliteDesk 7, Dell/OptiPlex 7, Lenovo 6, Topton/CWWK/Qotom 3 |
| UPS for router | 13 | 309 | Looking for a UPS to keep a router and modem running ideally 4+ hours during a power (r/batteries, 50 comments, 2023-01)<br>UPS power backup on router? (r/HomeNetworking, 49 comments, 2024-12)<br>Is there any point to go for router UPS for router when PC UPS costs about same with (r/IndianGaming, 34 comments, 2026-08) | APC 7, CyberPower 4, LiFePO4 3, Anker 3, Eaton/Tripp Lite 2, EcoFlow 1 |
| Home Assistant voice | 7 | 186 | How far has Home Assistant Voice PE come? (r/homeassistant, 91 comments, 2025-12)<br>Home Assistant Voice - preview edition ( no kidding! ) (r/homeassistant, 49 comments, 2025-09)<br>Recent opinions on Voice PE? (r/homeassistant, 18 comments, 2026-05) | Voice PE 7, Alexa 4, reSpeaker 1, Google Home/Nest 1, ESP32 1 |
| Portable monitors | 6 | 109 | Portable Monitor? (r/workfromhome, 33 comments, 2024-02)<br>Any recommendations for a small, portable monitor? (r/homelab, 28 comments, 2024-09)<br>Portable monitor recommendations? (r/remotework, 22 comments, 2026-07) | Arzopa 4, AOC 2, cocopar 1, Uperfect 1, Lenovo/ThinkVision 1, KYY 1 |
| IP KVM | 5 | 153 | How is JetKVM? (r/homelab, 44 comments, 2026-03)<br>Jetkvm vs pikvm (r/homelab, 43 comments, 2024-11)<br>Best IP KVM for homelab? (r/homelab, 32 comments, 2025-06) | PiKVM 5, JetKVM 5, NanoKVM 4, GL.iNet Comet 3 |
| OCuLink eGPU | 7 | 110 | The Minisforum ai x1 pro-370, AG02 and OcuLink (r/eGPU, 27 comments, 2026-08)<br>Oculink mini pc (r/eGPU, 20 comments, 2025-10)<br>Mini Pc - Oculink, EGPU setup help (r/MiniPCs, 16 comments, 2025-11) | Minisforum 5, AOOSTAR 5 |
| Protectli and OPNsense | 6 | 449 | Does anyone want to explain to a noob why Protectli + Pfsense is "better" than somet (r/PFSENSE, 265 comments, 2024-01)<br>Protectli Vault - Gateway Router. Worth it? (r/homelab, 119 comments, 2025-12)<br>Newbie. What am I missing about these Protectli boxes? (r/homelab, 24 comments, 2024-01) | Protectli 6, pfSense 5, OPNsense 5, Firewalla 2, Topton/CWWK 1, MikroTik 1 |
| Homelab gifts | 7 | 155 | ~$100 wedding gift for a homelab/self-hosted nerd? (r/homelab, 40 comments, 2026-04)<br>Gift for computer engineering husband (r/homelab, 37 comments, 2025-11)<br>Christmas gift for a guy into cybersecurity and homelab (r/homelab, 17 comments, 2025-11) |  |
| Ergonomic keyboards | 7 | 309 | Ergonomic keyboard recommendations for programming and not worsening shoulder to wri (r/webdev, 59 comments, 2024-10)<br>Buying a new keyboard as a student programmer (r/ErgoMechKeyboards, 28 comments, 2024-12)<br>Best options for professional/career software devs/programmers? (r/ErgoMechKeyboards, 23 comments, 2025-07) | ZSA/ErgoDox 6, Logitech 6, Kinesis 5, Corne 5, tenting 3, Lily58 3 |
| Water leak sensors | 7 | 250 | Best water leak sensor? (r/homeautomation, 59 comments, 2026-01)<br>Best Water Leak Sensors (r/homeassistant, 50 comments, 2026-09)<br>Are water leak sensors actually useful? (r/maintenance, 29 comments, 2024-06) | Zooz 5, YoLink 4, Moen 4, Govee 4, Aqara 4, Third Reality 2 |

What the threads change in the briefs above:

- **B1**: OWC, CalDigit and Cable Matters are each named in 6 of the 8 cable threads, Apple in 4, Anker in 3. Put those five in the comparison table before any budget brand.
- **N17**: r/SmartGlasses talks about display and AI-first glasses more than camera glasses (Meta 6 threads, Rokid 5, Even Realities 5, RayNeo 2). Add Even Realities G2 and Rokid to the second table.
- **N18**: the comparison threads are Plaud against Mobvoi TicNote and Soundcore Work. Include both.
- **N21**: Sonnet's RackMac is the default in 8 of 13 Mac mini threads, and the popular DIY route for an M4 mini is the UniFi Toolless Mini Rack (35 comments). That is enough for the half-day article.
- **N3**: after new N150 boxes, used OptiPlex, EliteDesk and ThinkCentre machines are the second theme (7, 7 and 6 of 14 mini PC threads). The page has an audience.
- **B6**: the recurring ask is 4 or more hours of runtime for an ONT and router (50 comments). APC leads (7 threads), then CyberPower (4); give the LiFePO4 route (3 threads) its own section.
- **N29**: "Protectli Vault, worth it?" has 119 comments (r/homelab, Dec 2025) and Firewalla is the alternative people raise. Answer the "worth it" question head on.
- **B2**: PiKVM and JetKVM are named in all 5 KVM threads, NanoKVM in 4, the GL.iNet Comet in 3. Keep the four-way comparison.
- **Leak sensors**: Zooz (5 threads), YoLink, Moen, Govee and Aqara (4 each) lead the r/homeassistant threads. Do not start a page; add a leak-sensor section to `best-zigbee-sensors-home-assistant` (R21).

## Appendix A: every SERP check (123 queries, TinyFish search, US)

Big = big editorial or retail result, UGC = forum, Reddit, YouTube, Facebook, GitHub. Verdict rule in section 1.5.

| Query | Verdict | Big | UGC | Other | Top 8 domains |
|---|---|---:|---:|---:|---|
| 10 inch rack ups | EASY | 1 | 5 | 2 | xpcc.com, reddit.com, picklog.cc, github.com, dell.com |
| best ai gadgets 2027 | EASY | 1 | 3 | 4 | gadgetfee.com, medium.com, bitdoze.com, technicalbonus.com, tech.yahoo.com, quora.com, heise.de, alidrg.substack.com |
| best keyboard for programming | EASY | 1 | 5 | 2 | rtings.com, reddit.com, quora.com, m1cola.medium.com, mkbguide.com, rkgamingstore.com |
| best local ai server | EASY | 1 | 5 | 2 | reddit.com, tweaktown.com, facebook.com, localai.io, dev.to, digitalspaceport.com |
| best low profile gpu | EASY | 0 | 3 | 5 | bottlesneckcalculator.com, eneba.com, linustechtips.com, thepcjournal.com, reddit.com, youtube.com, nvidiareview.com, microsounds.github.io |
| best mini pc for opnsense | EASY | 1 | 3 | 4 | reddit.com, buymeacoffee.com, forum.level1techs.com, firewallcompare.com, facebook.com, cloudzat.com, jrattechworks.com, amazon.com |
| best mini rack | EASY | 1 | 3 | 4 | jeffgeerling.com, beyond-power.com, bitdoze.com, heavenpc.com, reddit.com, etsy.com |
| best nas for proxmox | EASY | 1 | 6 | 1 | forum.proxmox.com, medium.com, xda-developers.com, dealectric.com, reddit.com |
| best poe switch for ip cameras | EASY | 0 | 3 | 5 | forum.level1techs.com, router-switch.com, youtube.com, ipcamtalk.com, tp-link.com, cctvcameraworld.com |
| best ssd for nas | EASY | 1 | 3 | 4 | nasmaster.com, nascompares.com, forum.level1techs.com, pcguide.com, forums.truenas.com, wundertech.net, community.synology.com |
| best ssd for truenas | EASY | 0 | 8 | 0 | forums.truenas.com, truenas.com, reddit.com |
| best tech gadgets 2027 | EASY | 1 | 3 | 4 | bitdoze.com, medium.com, gadgetwisereviews.com, youtube.com, nytimes.com, getsurrey.co.uk, gearbrain.com, facebook.com |
| best thunderbolt 5 cable | EASY | 1 | 4 | 3 | owc.com, reddit.com, eshop.macsales.com, cablematters.com, forums.macrumors.com, amazon.com |
| best thunderbolt 5 ssd enclosure | EASY | 1 | 4 | 3 | notebookcheck.net, medium.com, owc.com, youtube.com, us.ugreen.com, linustechtips.com |
| best travel router | EASY | 1 | 4 | 3 | rtings.com, pcguide.com, tp-link.com, quora.com, pctalktalk.com, reddit.com |
| carpal tunnel ergonomic keyboard | EASY | 0 | 3 | 5 | trulyergonomic.com, reddit.com, keychron.com, ergoglobal.com, geekhack.org, otfocus.com, facebook.com |
| ergonomic keyboard for programmers | EASY | 0 | 3 | 5 | ergodox-ez.com, ergonook.net, mkbguide.com, zsa.io, eevblog.com, deskcomfort.com, perixx.com, tomaszs2.medium.com |
| geeekpi vs tecmojo | EASY | 1 | 5 | 2 | forums.overclockers.co.uk, reddit.com, stuffedanimalstorage.com, amazon.com, bitdoze.com, github.com, facebook.com |
| headless mac mini | EASY | 1 | 5 | 2 | wolfpaulus.com, tech.yahoo.com, astropad.com, github.com, discussions.apple.com, talk.macpowerusers.com, reddit.com |
| home ai server | EASY | 1 | 5 | 2 | hostanywhere.io, youtube.com, digitalapplied.com, clawbox.com, medium.com, forum.45homelab.com, howtogeek.com, reddit.com |
| home assistant tablet | EASY | 1 | 5 | 2 | reddit.com, community.home-assistant.io, smarthomescene.com, xda-developers.com, the-optimization-guy.com, facebook.com |
| home assistant voice preview edition | EASY | 0 | 4 | 4 | home-assistant.io, community.home-assistant.io, youtu.be, youtube.com |
| home assistant wall panel | EASY | 0 | 6 | 2 | github.com, community.home-assistant.io, wallpanel.xyz, reddit.com, emel.tech |
| home assistant weather station | EASY | 0 | 7 | 1 | community.home-assistant.io, github.com, home-assistant.io, reddit.com |
| home server rack | EASY | 1 | 5 | 2 | reddit.com, mtlynch.io, sysracks.com, youtube.com, amazon.com |
| jetkvm vs pikvm | EASY | 0 | 5 | 3 | jeffgeerling.com, fixoryhq.com, youtube.com, reddit.com, news.ycombinator.com, asidehouse.com, facebook.com |
| local ai server | EASY | 0 | 6 | 2 | localai.io, quora.com, github.com, limcheekin.medium.com, blackscarab.ai, reddit.com |
| local ai server build | EASY | 0 | 5 | 3 | localai.io, youtube.com, limcheekin.medium.com, cognativ.com, digitalspaceport.com |
| omada vs unifi | EASY | 0 | 6 | 2 | reddit.com, youtube.com, drakos-systems.co.uk, datawiresolutions.com |
| opnsense hardware | EASY | 0 | 5 | 3 | forum.opnsense.org, docs.opnsense.org, opnsense.org, shop.opnsense.com |
| poe switch for security cameras | EASY | 0 | 4 | 4 | senseiphoto.com, lorex.com, arlingtoncctv.com, tp-link.com, youtube.com, facebook.com, cctvcameraworld.com, reddit.com |
| protectli vault review | EASY | 1 | 3 | 4 | homelabrouter.com, youtube.com, forums.servethehome.com, cybersec24.com, privacygear.nl, hackmethod.com, amazon.com |
| rackmount pc case | EASY | 1 | 5 | 2 | amazon.com, reddit.com, github.com, linustechtips.com, superlogics.com, steigerdynamics.com |
| raspberry pi nas server | EASY | 1 | 4 | 3 | magazine.raspberrypi.com, forums.raspberrypi.com, quora.com, raspberrypi.com, reddit.com, matt.olan.me, github.com, xda-developers.com |
| raspberry pi nas storage | EASY | 0 | 4 | 4 | magazine.raspberrypi.com, blog.ananthkamath.com, raspberry.tips, youtube.com, matt.olan.me, medium.com, reddit.com, github.com |
| ssd for nas | EASY | 1 | 3 | 4 | kingspectech.com, forum.level1techs.com, nascompares.com, amazon.com.au, sandisk.com, reddit.com, wundertech.net |
| thunderbolt 5 cables | EASY | 1 | 3 | 4 | belkin.com, cablematters.com, forums.macrumors.com, reddit.com, hosatech.com, owc.com, community.frame.work, dell.com |
| unifi travel router review | EASY | 0 | 5 | 3 | youtube.com, store.ui.com, reddit.com, dongknows.com, richinfante.com |
| ups for 10 inch rack | EASY | 1 | 4 | 3 | xpcc.com, eaton.com, dell.com, reddit.com, bitdoze.com |
| water leak sensor home assistant | EASY | 0 | 7 | 1 | community.home-assistant.io, home-assistant.io, reddit.com |
| 10 inch rack | MID | 3 | 2 | 3 | github.com, rack-magic.com, reddit.com, amazon.com, etsy.com, printables.com, newegg.com, micropolis.com |
| 10 inch rack shelf | MID | 2 | 0 | 6 | deskpi.com, loganmarchione.com, newegg.com, cablematters.com, navepoint.com, amazon.com.au, printables.com |
| 10 inch server rack | MID | 2 | 3 | 3 | reddit.com, deskpi.com, amazon.com, forums.servethehome.com, jeffgeerling.com, printables.com, ebay.com |
| ai gadgets 2027 | MID | 3 | 2 | 2 | economist.com, forbes.com, stuff.tv, bitdoze.com, medium.com, prnewswire.com, m.youtube.com |
| ai glasses 2027 | MID | 2 | 3 | 3 | youtube.com, xmems.com, appleinsider.com, finance.biggo.com, tech-insider.org, me.mashable.com |
| ai voice recorder | MID | 2 | 2 | 4 | audionotes.ai, youtube.com, plaud.ai, turonic.com, shop.notta.ai, apps.apple.com |
| beelink eq14 | MID | 3 | 1 | 4 | minis-pc.com, us.bee-link.com, bee-link.com, ebay.com, notebookchat.com, neowin.net, newegg.com |
| best 8 port poe switch | MID | 1 | 2 | 5 | broadbandbuyer.com, netgear.com, trendnet.com, ipcamtalk.com, tp-link.com, reddit.com, amazon.com, lowvoltagedealer.com |
| best ai voice recorder | MID | 3 | 1 | 4 | youtube.com, tovel.ai, plaud.ai, fireflies.ai, amazon.com, pcmag.com, slashgear.com |
| best dashcam | MID | 2 | 3 | 3 | nytimes.com, vortexradar.com, viofo.com, facebook.com, reddit.com, caranddriver.com, fypower.org |
| best ergonomic keyboard | MID | 2 | 0 | 6 | dygma.com, bestreviews.com, rtings.com, logitech.com, keyhero.com, vice.com, ergodirect.com, nytimes.com |
| best gpu for ai | MID | 1 | 1 | 6 | willitrunai.com, youtube.com, bigdatasupply.com, northflank.com, thundercompute.com, runpod.io, nvidia.com, newegg.com |
| best gpu for local llm | MID | 0 | 1 | 7 | techcenturion.com, devopscloud.io, aiville.com, computingforgeeks.com, nvidiareview.com, vdf.ai, itctshop.com, reddit.com |
| best gpu for local llm 2027 | MID | 1 | 2 | 5 | sabrepc.com, getrigbase.com, workflowaisuite.com, reddit.com, linustechtips.com, raceengineering.ai, xda-developers.com, computingforgeeks.com |
| best ip kvm | MID | 1 | 2 | 5 | warpkvm.com, reddit.com, byrdpilot.com, nerdtechy.com, jeffgeerling.com, xda-developers.com, itproexpert.com |
| best mac mini dock | MID | 3 | 4 | 1 | youtube.com, markellisreviews.com, medium.com, appleinsider.com, reddit.com, kotaku.com |
| best monitor arm | MID | 1 | 0 | 7 | tomsguide.com, justcreative.com, deskzen.net, btod.com, ergofixes.com, us.my-best.com, setupvault.uno, selectranker.com |
| best nas case | MID | 2 | 1 | 5 | wundertech.net, thepcgeek.com, pcguide.com, xda-developers.com, easypc.io, butterwhat.com, linustechtips.com, amazon.com |
| best portable monitor 2027 | MID | 3 | 2 | 3 | usreviews.net, cnet.com, asus.com, youtube.com, pcworld.com, travelandleisure.com, selectranker.com |
| best server rack for home lab | MID | 0 | 1 | 7 | heavenpc.com, homelabpicks.com, mtlynch.io, mercury-pc.com, sysracks.com, jeffgeerling.com, reddit.com |
| best split keyboard | MID | 0 | 2 | 6 | blog.keeb.io, makeuseof.com, ergodox-ez.com, bulsuk.com, facebook.com, reddit.com, thepcjournal.com, keeb.io |
| best strix halo mini pc | MID | 3 | 1 | 4 | localaimaster.com, homelabcompass.com, github.com, terminalbytes.com, minis-pc.com, notebookcheck.net, wccftech.com, servethehome.com |
| best travel router 2027 | MID | 2 | 2 | 4 | vultrade.com, m.youtube.com, gl-inet.com, newegg.com, youtube.com, howtogeek.com |
| deskpi rackmate t1 vs t2 | MID | 0 | 0 | 8 | deskpi.com, wiki.deskpi.com, rackify.net, bitdoze.com |
| dgx spark alternative | MID | 0 | 2 | 6 | forums.developer.nvidia.com, houtini.com, acecloud.ai, wz-it.com, betterclaw.io, hwbusters.com, podwise.ai, lucebox.com |
| dgx spark vs mac studio | MID | 0 | 2 | 6 | aimultiple.com, skorppio.com, sourceit.com.sg, reddit.com, aquanode.io, presenc.ai, spheron.network, youtube.com |
| gifts for nerds who have everything | MID | 2 | 2 | 4 | gearcouple.com, gizmodo.com, youtube.com, wtfdotheywant.com, getearlybird.io, nerdapproved.com, pcworld.com |
| home assistant green | MID | 0 | 2 | 6 | home-assistant.io, thesmarthome.blog, support.nabucasa.com, community.home-assistant.io, iotronx.com, synced.com.au |
| ip kvm switch | MID | 1 | 2 | 5 | tripplite.com, raritan.com, kvm-switches-online.com, reddit.com, quora.com, dell.com, vertiv.com |
| it server rack | MID | 1 | 0 | 7 | startech.com, rittal.com, vertiv.com, serverrackcabinets.com, server-rack-online.com, newegg.com, tripplite.eaton.com |
| mac mini rack mount | MID | 0 | 1 | 7 | rackmountsolutions.net, sonicstate.com, mk1manufacturing.com, hssl.us, sonnettech.com, reddit.com |
| micro sd card for raspberry pi | MID | 0 | 1 | 7 | sparkfun.com, pip.raspberrypi.com, thedigitalpictureframe.com, raspberrypi.stackexchange.com, raspberrypi.com, bret.dk, cytron.io |
| micro sd card for raspberry pi 5 | MID | 0 | 2 | 6 | forums.raspberrypi.com, pip.raspberrypi.com, bulkmemorycards.com, raspberrypi.com, bret.dk, raspberry.tips, shop.pimoroni.com |
| mini rack ups | MID | 2 | 2 | 3 | github.com, reddit.com, eaton.com, mini-rack.jeffgeerling.com, rackmountsolutions.net, amazon.com, dell.com |
| mini ups for router | MID | 2 | 2 | 4 | newegg.com, cuzorlabs.com, amazon.com, youtube.com, amazon.in, instructables.com, vxb.com |
| mmwave presence sensor | MID | 1 | 1 | 6 | smarthomescene.com, shop.everythingsmart.io, newegg.com, dfrobot.com, community.home-assistant.io, us.switch-bot.com, seeedstudio.com |
| nas ssd | MID | 3 | 3 | 2 | reddit.com, howtogeek.com, newegg.com, forums.truenas.com, nascompares.com, documents.sandisk.com, sandisk.com |
| oculink egpu dock | MID | 2 | 2 | 4 | oculink.net, aoostar.com, egpu.io, amazon.com, dfrobot.com, ai.ugreen.com, newegg.com, store.minisforum.com |
| open frame server rack | MID | 0 | 0 | 8 | navepoint.com, cdw.com, tripplite.com, gawtechnology.com, martinenclosures.com, racksolutions.com, help.racksolutions.com |
| plaud notepin vs plaud note | MID | 0 | 0 | 8 | flowdevs.io, plaud.ai, support.plaud.ai |
| poe injector for ip camera | MID | 1 | 1 | 6 | cctvcamerapros.com, camsecure.co.uk, tp-link.com, phihong.com, cctvcameraworld.com, amazon.com, ipcamtalk.com |
| poe injector for ip cameras | MID | 0 | 1 | 7 | camsecure.co.uk, cctvcamerapros.com, abus.com, instar.com, cctvcameraworld.com, shop.poetexas.com, reddit.com |
| poe switch | MID | 0 | 2 | 6 | trendnet.com, netgear.com, intellinetsolutions.com, reddit.com, store.ui.com, ipcamtalk.com, tp-link.com |
| portable monitor for mac | MID | 3 | 0 | 5 | asus.com, 9to5mac.com, macworld.com, newegg.com, bestbuy.com |
| power distribution unit for server rack | MID | 1 | 1 | 6 | servertech.com, eaton.com, media.startech.com, hpe.com, youtube.com, download.se.com, ebay.com |
| protectli vault | MID | 1 | 1 | 6 | protectli.com, amazon.com, reddit.com, eu.protectli.com |
| protectli vault fw4c | MID | 0 | 1 | 7 | kb.protectli.com, protectli.com, eu.protectli.com, forum.netgate.com |
| raspberry pi nas | MID | 1 | 1 | 6 | magazine.raspberrypi.com, the-diy-life.com, raspberrypi.com, github.com, matt.olan.me, howtogeek.com, raspberry.tips, jeffgeerling.com |
| ray ban meta ai glasses gen 2 | MID | 3 | 1 | 4 | ray-ban.com, meta.com, cnet.com, walmart.com, reddit.com, au.pcmag.com |
| ray ban meta gen 2 | MID | 2 | 2 | 4 | ray-ban.com, about.fb.com, team-bhp.com, theverge.com, reddit.com, kotaku.com, targetoptical.com |
| refurbished mini pc | MID | 3 | 2 | 3 | refurbished.minisforum.com, newegg.com, budgethomelab.com, pcliquidations.com, alamogeeks.com, amazon.com |
| security camera without subscription | MID | 3 | 3 | 2 | facebook.com, cnet.com, tomsguide.com, eufy.com, security.org, reddit.com |
| server rack | MID | 0 | 0 | 8 | sysracks.com, rackmountsolutions.net, startech.com, server-rack-online.com, en.wikipedia.org, racksolutions.com, vertiv.com |
| sfp module | MID | 1 | 0 | 7 | fs.com, cisco.com, en.wikipedia.org, startech.com, amazon.com, telecomhall.net |
| sfp module 10g | MID | 0 | 1 | 7 | cdw.com, fs.com, resource.fs.com, antaira.com, fibermall.com, moxa.com, reddit.com, amgsystems.com |
| sfp module types | MID | 0 | 0 | 8 | etulinktechnology.com, en.wikipedia.org, lcsc.com, cables.nyc, cloudtronics.com, cisco.com, fibermarkt.com |
| sfp+ dac cable | MID | 0 | 2 | 6 | fs.com, netgear.com, intellinetnetwork.eu, store.10gtek.com, reddit.com, forum.level1techs.com, startech.com |
| sonnet rackmac mini | MID | 1 | 0 | 7 | sonnettech.com, motionmedia.com, cdw.com, amazon.com, sonnetstore.com, amazon.com.au |
| thunderbolt 5 cable | MID | 1 | 2 | 5 | belkin.com, cablematters.com, hosatech.com, forums.macrumors.com, dell.com, reddit.com |
| thunderbolt 5 cable for macbook | MID | 1 | 2 | 5 | cablematters.com, us.ugreen.com, dell.com, belkin.com, amazon.ie, owc.com, forums.macrumors.com |
| truenas hardware | MID | 0 | 2 | 6 | truenas.com, forums.truenas.com |
| unifi travel router | MID | 1 | 2 | 5 | ui.com, howtogeek.com, blog.ui.com, eu.store.ui.com, youtube.com, store.ui.com, community.ui.com |
| unifi travel router vs beryl ax | MID | 2 | 5 | 1 | news.ycombinator.com, rtings.com, ifeeltech.com, reddit.com |
| unifi travel router vs glinet | MID | 2 | 4 | 2 | ispreview.co.uk, reddit.com, youtube.com, rtings.com, wangineer.com, nascompares.com |
| unmanaged poe switch | MID | 1 | 2 | 5 | ultrapoe.com, shop.us.dlink.com, dlink.com, lorex.com, antaira.com, reddit.com, amazon.com |
| ups for router and modem | MID | 2 | 3 | 3 | ankersolix.com, poweroutage.us, breakerguide.com, nytimes.com, ebay.com, community.ui.com, gadgetwisdom.com, reddit.com |
| wall mounted server rack | MID | 0 | 0 | 8 | navepoint.com, serverrack.com, racksolutions.com, server-rack-online.com, cdw.com, startech.com |
| 10 inch rack pdu | HARD | 5 | 2 | 1 | tupavco.com, newegg.com, github.com, ebay.com, reddit.com |
| ai voice recorder 2027 | HARD | 5 | 0 | 3 | shop.notta.ai, plaud.ai, apps.apple.com, speakwiseapp.com |
| best micro sd card | HARD | 5 | 1 | 2 | technobezz.com, reddit.com, alikgriffin.com, zdnet.com, digitalcameraworld.com, engadget.com, nytimes.com |
| best nas for home | HARD | 4 | 2 | 2 | newegg.com, geekfill.com, androidcentral.com, reddit.com, dongknows.com, wired.com |
| best portable monitor | HARD | 7 | 0 | 1 | wired.com, cnet.com, asus.com, forbes.com, zdnet.com, ign.com, bestbuy.com, techradar.com |
| best smart glasses 2027 | HARD | 4 | 3 | 1 | youtube.com, tech.yahoo.com, gadgetfee.com, wareable.com, androidauthority.com |
| best smart home gadgets 2027 | HARD | 4 | 1 | 3 | gadgetfee.com, youtube.com, bitdoze.com, tech.yahoo.com, popsci.com, t3.com, theverge.com |
| best tech gifts 2027 | HARD | 5 | 2 | 1 | rollingstone.com, tech.yahoo.com, gizmodo.com, tomsguide.com, unitycave.com, reddit.com, youtube.com |
| best water leak sensor | HARD | 6 | 2 | 0 | youtube.com, amazon.com, reviewed.com, wired.com, reddit.com, pcmag.com, nytimes.com, uk.pcmag.com |
| gifts for geeks | HARD | 5 | 0 | 3 | whatnerd.com, pcmag.com, blog.bestbuy.ca, howtogeek.com, uncommongoods.com, pcworld.com, awesomestufftobuy.com, techtarget.com |
| gifts for nerds | HARD | 4 | 0 | 4 | gizmodo.com, pcmag.com, small.gifts, gotopia.tech, esquire.com, boxlunch.com, uncommongoods.com, cnn.com |
| smart glasses 2027 | HARD | 6 | 1 | 1 | specs.com, bloomberg.com, amazon.com, reddit.com, androidauthority.com, notebookcheck.net, au.pcmag.com, tomsguide.com |
| smart watch 2027 | HARD | 4 | 2 | 2 | youtube.com, thedailycurator.web.2nt.com, notebookcheck.net, techfloe.com, reddit.com, samsung.com, digitaltrends.com, tomsguide.com |
| tech gifts under $50 | HARD | 6 | 0 | 2 | cooltechunder.com, lifehacker.com, pcmag.com, walmart.com, microcenter.com, t-mobile.com, bestbuy.com, theverge.com |
| usb microphone for mac mini | HARD | 6 | 0 | 2 | newegg.com, satwerk.com, amazon.com.be, amazon.com |
| video doorbell no subscription | HARD | 4 | 0 | 4 | us.aqara.com, aqara.com, eufy.com, techradar.com, amazon.com, consumerreports.org |

## Appendix B: keyword tables for the second tier

**A8**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| dgx spark price | 3,600 | 22 | $1.07 |
| gmktec evo x2 | 3,600 | 35 | $2.03 |
| strix halo mini pc | 1,300 | 34 | $2.32 |
| ai mini pc | 880 | 31 | $2.95 |
| dgx spark alternative | 720 | 32 | $4.06 |
| dgx spark vs mac studio | 590 | 26 | $0.95 |
| dgx spark vs 5090 | 480 | 25 | $2.47 |
| nvidia dgx spark specifications | 390 | 14 | $1.75 |
| dgx spark specification | 390 | 18 | $3.08 |
| asus dgx spark | 390 | 32 | $2.28 |
| **Cluster total (195 keywords, SD ≤ 35)** | **21,180** | | |

**N4**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| low profile gpu | 2,900 | 25 | $0.34 |
| intel arc a310 | 1,900 | 31 | $0.48 |
| low profile graphics card | 1,600 | 26 | $0.38 |
| best low profile gpu | 590 | 31 | $0.34 |
| amd low profile gpu | 480 | 29 | $0.51 |
| sparkle intel arc a310 eco | 320 | 23 | $0.65 |
| single slot low profile gpu | 320 | 31 | $0.27 |
| hdmi low profile graphics card | 260 | 26 | $0.21 |
| low profile graphics card hdmi | 210 | 25 | $0.21 |
| intel arc a310 eco | 210 | 26 | $0.43 |
| **Cluster total (81 keywords, SD ≤ 35)** | **11,900** | | |

**A9**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| egpu enclosure | 2,400 | 29 | $0.45 |
| external gpu housing | 1,900 | 26 | $0.30 |
| external gpu enclosure | 1,600 | 29 | $0.46 |
| oculink egpu | 1,300 | 28 | $0.62 |
| egpu enclosure thunderbolt 3 | 1,000 | 27 | $0.20 |
| external gpu dock | 1,000 | 32 | $0.58 |
| razer core x egpu enclosure | 590 | 32 | $0.20 |
| external gpu enclosure for laptop | 590 | 33 | $0.22 |
| egpu enclosure for laptop | 390 | 27 | $0.13 |
| mini pc with oculink | 320 | 24 | $0.98 |
| **Cluster total (78 keywords, SD ≤ 35)** | **13,740** | | |

**B2**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| pikvm | 6,600 | 21 | $1.53 |
| ip kvm | 6,600 | 25 | $1.53 |
| ip kvm switch | 1,900 | 25 | $1.54 |
| gl inet comet | 1,300 | 17 | $0.81 |
| sipeed nanokvm | 480 | 34 | $0.42 |
| glinet comet x | 390 | 27 | $0.97 |
| kvm over ip switch | 320 | 20 | $5.14 |
| jetkvm amazon | 320 | 30 | $1.06 |
| pikvm v4 plus | 320 | 34 | $1.09 |
| pikvm v4 | 320 | 34 | $0.98 |
| **Cluster total (193 keywords, SD ≤ 35)** | **26,440** | | |

**N18**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| plaud note ai voice recorder | 12,100 | 35 | $2.41 |
| ai voice recorder | 6,600 | 30 | $5.12 |
| wearable ai voice recorder | 1,300 | 30 | $8.60 |
| pocket ai voice recorder | 880 | 31 | $4.17 |
| applaud ai voice recorder | 720 | 29 | $1.40 |
| soundcore work ai voice recorder | 590 | 25 | $1.53 |
| best ai voice recorder | 590 | 32 | $6.23 |
| recolx ai voice recorder | 480 | 28 | $2.85 |
| hidock p1 ai voice recorder | 210 | 16 | $3.30 |
| plaud notepin ai voice recorder | 210 | 31 | $2.12 |
| **Cluster total (74 keywords, SD ≤ 35)** | **26,470** | | |

**N22**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| sx sfp module | 12,100 | 18 | $7.73 |
| sfp module | 4,400 | 13 | $4.25 |
| sfp module port | 4,400 | 28 | $1.56 |
| sfp module transceiver | 2,900 | 32 | $3.57 |
| sfp module fibre | 1,600 | 19 | $4.70 |
| fiber sfp module | 1,300 | 18 | $4.31 |
| sfp module means | 1,300 | 21 | $0.49 |
| what is a sfp module | 1,000 | 23 | $1.17 |
| what is the sfp module | 880 | 17 | $0.89 |
| switch sfp module | 880 | 22 | $2.80 |
| **Cluster total (64 keywords, SD ≤ 35)** | **41,610** | | |

**N19**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| ai devices | 1,000 | 30 | $4.58 |
| ai gadgets | 590 | 29 | $2.80 |
| best ai devices | 140 | 34 | $5.38 |
| best ai gadgets | 110 | 28 | $1.94 |
| ai gadgets for men | 70 | 19 | $3.17 |
| new ai gadgets | 40 | 30 | $1.71 |
| ai devices examples | 40 | 32 | $0.78 |
| fda ai devices | 20 | 15 | $0.00 |
| ai gadgets for students | 20 | 31 | $0.00 |
| ai devices for smart home | 10 | 5 | $0.00 |
| **Cluster total (75 keywords, SD ≤ 35)** | **2,150** | | |

**B6**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| mini ups | 880 | 29 | $0.54 |
| ups for router | 720 | 29 | $0.58 |
| mini ups for router | 390 | 27 | $0.39 |
| ups for modem and router | 390 | 27 | $0.76 |
| mini ups router | 390 | 27 | $0.57 |
| mini ups for wifi router | 210 | 26 | $0.49 |
| mini ups battery backup | 210 | 27 | $1.00 |
| talentcell mini ups | 170 | 13 | $0.58 |
| small ups for router | 140 | 27 | $0.71 |
| mini ups for wifi | 140 | 30 | $0.12 |
| **Cluster total (116 keywords, SD ≤ 35)** | **5,440** | | |

**N29**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| protectli vault | 1,000 | 30 | $2.48 |
| opnsense hardware | 590 | 27 | $1.30 |
| pfsense hardware | 480 | 29 | $2.48 |
| firewall appliance | 390 | 34 | $8.87 |
| protectli vault fw4b | 170 | 27 | $0.54 |
| opnsense hardware requirements | 140 | 26 | $0.00 |
| pfsense hardware recommendation | 110 | 24 | $0.94 |
| protectli vault v1410 | 70 | 17 | $2.07 |
| best opnsense hardware | 70 | 19 | $1.59 |
| best pfsense hardware | 70 | 21 | $2.22 |
| **Cluster total (93 keywords, SD ≤ 35)** | **4,380** | | |

**N25**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| split keyboard | 9,900 | 31 | $0.65 |
| carpal tunnel ergonomic keyboard | 5,400 | 17 | $0.85 |
| ergonomic keyboard and mouse | 5,400 | 25 | $1.17 |
| best ergonomic keyboard | 3,600 | 21 | $0.96 |
| ergonomic keyboard carpal tunnel | 3,600 | 27 | $1.62 |
| logitech ergo k860 split keyboard | 1,600 | 29 | $0.75 |
| logitech ergo k860 ergonomic split keyboard | 1,000 | 26 | $0.84 |
| samsung split keyboard | 1,000 | 31 | $0.00 |
| ergonomic keyboard for wrist pain | 880 | 14 | $0.66 |
| ergonomic keyboard and mouse wireless | 720 | 23 | $1.05 |
| **Cluster total (17 keywords, SD ≤ 35)** | **36,580** | | |

**N9**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| pc rackmount case | 1,900 | 21 | $1.01 |
| rackmount pc case | 1,600 | 26 | $1.44 |
| 4u server case | 590 | 24 | $1.33 |
| rackmount case | 590 | 24 | $2.42 |
| server rackmount case | 590 | 26 | $3.43 |
| rackmount case 2u | 590 | 29 | $1.06 |
| rackmount pc case 4u | 320 | 19 | $1.50 |
| 4u rackmount pc case | 320 | 22 | $0.96 |
| rackmount case 1u | 320 | 24 | $1.10 |
| atx rackmount case | 320 | 28 | $0.81 |
| **Cluster total (53 keywords, SD ≤ 35)** | **9,230** | | |

**N23**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| micro sd card for raspberry pi | 5,400 | 23 | $0.90 |
| micro sd card for raspberry pi 4 | 720 | 30 | $0.90 |
| micro sd card for raspberry pi zero | 590 | 26 | $0.00 |
| micro sd card for raspberry pi 5 | 480 | 22 | $0.66 |
| format a sd card for raspberry pi | 390 | 33 | $0.00 |
| micro sd card for raspberry pi 3 | 260 | 25 | $0.43 |
| clone sd card for raspberry pi | 210 | 27 | $0.00 |
| sd card for raspberry pi | 170 | 23 | $6.09 |
| micro sd card for raspberry pi zero w | 140 | 22 | $0.00 |
| how to format sd card for raspberry pi | 70 | 35 | $0.00 |
| **Cluster total (19 keywords, SD ≤ 35)** | **8,730** | | |

**N3**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| lenovo m720q | 1,300 | 27 | $0.72 |
| used mini pc | 1,000 | 25 | $0.50 |
| refurbished mini pc | 880 | 22 | $0.82 |
| hp elitedesk mini 800 g3 | 880 | 32 | $0.47 |
| hp elitedesk mini desktop pc | 720 | 28 | $1.76 |
| hp elitedesk mini pc | 260 | 33 | $1.74 |
| used mini pc for sale | 140 | 26 | $0.53 |
| lenovo m720q tiny | 110 | 27 | $0.61 |
| tiny mini micro | 90 | 25 | $0.25 |
| refurbished server hard drives | 90 | 30 | $2.55 |
| **Cluster total (123 keywords, SD ≤ 35)** | **6,680** | | |

**C1**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| raspberry pi nas | 2,900 | 21 | $0.69 |
| raspberry pi nas storage | 2,400 | 28 | $0.40 |
| raspberry pi nas server | 480 | 21 | $0.80 |
| raspberry pi 5 nas | 480 | 24 | $0.75 |
| raspberry pi nas case | 320 | 33 | $0.37 |
| raspberry pi 5 nas case | 210 | 20 | $0.04 |
| pi 5 nas | 140 | 23 | $0.30 |
| raspberry pi nas software | 90 | 26 | $0.00 |
| raspberry pi nas kit | 90 | 30 | $0.22 |
| raspberry pi nas hat | 70 | 35 | $0.08 |
| **Cluster total (59 keywords, SD ≤ 35)** | **8,110** | | |

**B7**

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| nas case | 2,900 | 28 | $0.66 |
| nas motherboard | 720 | 23 | $0.56 |
| itx nas case | 590 | 25 | $0.48 |
| nas motherboard mini itx | 590 | 25 | $0.45 |
| nas case micro atx | 590 | 30 | $0.36 |
| itx nas motherboard | 480 | 22 | $0.37 |
| micro atx nas case | 480 | 25 | $0.36 |
| atx nas case | 480 | 28 | $0.30 |
| best nas case | 390 | 22 | $0.57 |
| nas case 8 bay | 390 | 25 | $0.59 |
| **Cluster total (93 keywords, SD ≤ 35)** | **13,970** | | |

## Appendix C: Amazon search snapshot

Method: Bright Data "Amazon products search" scraper, one page per keyword on amazon.com, 2026-11-26. "Bought last month" is Amazon's public badge ("8K+ bought in past month"), rounded. The badge was missing for many listings and is shown as n/a. Results mix sponsored placements (flagged in the scraper's `sponsored` field) and organic hits; treat each list as "what Amazon shows for the keyword", not as a best-seller list. A few badge values came back mis-parsed (the Ray-Ban Gen 2 listing returned 12000000); those show as n/a. Confirm the variant and the seller on the product page before adding a `/go/` slug.

**A8**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0F53QXNGH` | GMKtec EVO-X2 AI Mini PC AMD Ryzen Al Max+ 395 Up to 5.1GHz, 16C/32T | $2,199.99 | 4.3 | 80 | 64+ |
| `B0H4R5RQJN` | GMKtec X3 AI Mini PC AMD Ryzen Al Max+ 395 128GB LPDDR5X 2TB PCIe 4.0 SSD | $3,949.99 | 4.4 | 123 | 16+ |
| `B0G31Z6WQ7` | MINISFORUM MS-S1 Max Mini Workstation AMD Ryzen AI Max+ 395(16C/32T) 128GB LPD | $3,959 | 4.7 | 16 | n/a |
| `B0HFR9ZKL4` | ACEMAGIC M1A PRO+ AI Mini PC, AMD Ryzen AI Max+ 395 (16C/32T, up to 5.1GHz), 1 | $3,799.99 | 4.4 | 108 | n/a |
| `B0H5RNZ43D` | AMD Ryzen  AI Halo - Personal AI Desktop Computer - Developer Platform - Linux | $4,699 | 4.5 | 16 | 100+ |
| `B0FWJ16CCH` | NVIDIA DGX Spark  - Personal AI Desktop Supercomputer - Desktop GB10 Grace Bla | $6,949.99 | 4.5 | 130 | 100+ |

**N4**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0CTJZCJH1` | msi Gaming RTX 3050 LP 6G OC Graphics Card (NVIDIA RTX 3050, 96-Bit, Boost Clo | $259.99 | 4.5 | 396 | 200+ |
| `B0F8LNS15L` | GIGABYTE GeForce RTX 5060 OC Low Profile 8G Graphics Card, by NVIDIA, 8GB 128- | $509.99 | 4.4 | 93 | n/a |
| `B0CBL3HQ68` | msi Gaming GeForce GT 1030 4GB DDR4 64-bit HDCP Support DirectX 12 DP/HDMI Sin | $109.99 | 4.4 | 460 | 200+ |
| `B09SKZSDRT` | MAXSUN AMD Radeon RX 550 4GB Low Profile Small Form Factor Video Graphics Card | $121.99 | 4.3 | 558 | 50+ |
| `B0GSK54JR5` | SOYO GeForce RTX 3050 6GB GDDR6 Low Profile Gaming Graphics Card, HDMI/DP | $329.99 | 5 | 4 | 96+ |

**A9**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0H5QHG6DW` | OCuLink eGPU Dock | $49.99 | 4.7 | 14 | 4+ |
| `B0F9FBN5P5` | PCIe 4.0 x4 64Gbps Compatible eGPU DOCK, with OCuLink SFF-8612 8311 to PCIe x1 | $76.49 | 4.4 | 93 | 100+ |
| `B0GDY4HZBH` | MINISFORUM DEG2 USB4 V2 (TBT5 Compatible) & OCuLink eGPU Dock, 80Gbps Dual-Lin | $247 | 4.3 | 147 | n/a |
| `B0H41GSRB4` | MINISFORUM DEG2 eGPU Docking Station for OCuLink and USB4 V2, (Supports TBT5), | $247 | 4.2 | 111 | 50+ |
| `B0FJ29SBQM` | UGREEN LinkStation eGPU Dock Designed with OCuLink 64Gbps & USB4 40Gbps | $379.99 | 4.8 | 7 | 850+ |

**B2**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0G1BS7WWK` | GL.iNet GL-RM10 Comet Pro Remote KVM Over Wi-Fi 6 Dual Band 4K Passthrough | $143.99 | 4.5 | 464 | 6+ |
| `B0FDQJ1V7J` | GL.iNet Comet PoE Remote KVM GL-RM1PE with Tailscale 4K Streaming | $81.19 | 4.6 | 439 | 32+ |
| `B0H5QCG2P7` | GL.iNet Comet X (GL-RM4PE) Quad-Port Remote KVM for Home Lab and IT Pro | $279.99 | 4.3 | 52 | 4+ |
| `B0FY63H6NH` | JetKVM IP KVM,Jet KVM over IP, Ethernet IPKVM,Control any Computer Remotely | $143.99 | 4.5 | 100 | 1,080+ |
| `B0GHQCSN3W` | JetKVM IP KVM, Jet KVM Over IP, Open Source IPKVM, Network KVM for Any PC | $139.99 | 4.3 | 78 | 1,080+ |
| `B0H6ZL5VVM` | GL.iNet Comet Q (GL-RMQ1) Pocket KVM, Plug & Play Remote for Laptop iPhone | $118.99 | 4.2 | 89 | 6+ |
| `B0CV93FNLF` | V4 Mini IP KVM | $309.95 | 4.4 | 42 | 200+ |

**N18**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0FYQ4Y2ZZ` | Plaud Note Pro AI Voice Recorder, Capture, Understood, Done, Black | $149.99 | 4.5 | 37 | 112+ |
| `B0DL9WQ4Z4` | Plaud NotePin S Wearable AI Voice Recorder, Capture, Understood, Done | $142.99 | 4.4 | 14 | 112+ |
| `B0HNC5PQ65` | AI Voice Recorder (2026 Upgraded), Magnetic Mini Digital Audio Recorder & Play | $79.99 | 4.9 | 287 | 300+ |
| `B0H5NRY5JD` | AI Voice Recorder, AI Note Taker, Unlimited Transcription, Lite | $46.54 | 4 | 95 | 138+ |
| `B0HKG3NH4V` | SOULOG AI Voice Recorder, Unlimited Transcription for Productivity Pros | $104.99 | 4.1 | 69 | 30+ |
| `B0HNJWJD64` | AI Voice Recorder, Transcribe & Summarize with AI Note Taker | $49.99 | 5 | 35 | 90+ |
| `B0GPS3YMYL` | Bee Frontier (all-new), Wearable Personal AI that grows with you, confidential | $52.49 | 4.1 | 267 | 4,000+ |

**N22**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B01KFBFL16` | 10Gtek 10GBase-T SFP+ to RJ-45 Transceiver, 10Gbe SFP+ Copper Ethernet CAT.6a  | $38.24 | 4.3 | 939 | 500+ |
| `B08BP55663` | 10Gtek 10GBase-SR SFP+ LC Transceiver, 10G 850nm Multimode SFP Module, up to 3 | $26.35 | 4.8 | 11 | 500+ |
| `B00U77IJ2M` | 10GTEK 1.25G SFP-T, 1000BASE-T Copper SFP, SFP to RJ45 SFP Module Transceiver  | $11.89 | 4.5 | 922 | 500+ |
| `B01M09C9NZ` | 10Gtek SFP+ DAC Twinax Cable, 10G SFP+ to SFP+ Direct Attach Copper Patch Pass | $9.99 | 4.8 | 312 | 500+ |
| `B00U8BL09Q` | 10Gtek SFP+ DAC Twinax Cable - 10GBASE-CU Passive Direct Attach Copper SFP Cab | $14.44 | 4.7 | 502 | 300+ |
| `B071KWNFP3` | Cable Matters 10Gbps DAC Twinax SFP+ Cable, 2m/6.6ft | $13.59 | 4.6 | 350 | 10+ |
| `B0FY2NL8YF` | 4-Pack 10G SFP+ to RJ45 Module, 10Gbase-T Transceiver Compatible with Cisco, U | $76.49 | 4.4 | 139 | 200+ |

**N19**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0GPS3YMYL` | Bee Frontier (all-new), Wearable Personal AI that grows with you, confidential | $52.49 | 4.1 | 267 | 4,000+ |
| `B0FYQ4Y2ZZ` | Plaud Note Pro AI Voice Recorder, Capture, Understood, Done, Black | $149.99 | 4.5 | 37 | 112+ |
| `B0HKN72WNZ` | AI Smart Glasses with Camera,4K HD Photo&EIS Video,AI Voice Assistant | $99.99 | 5 | 21 | n/a |
| `B0F1YWF96K` | LOOI Robot-Space Black-AI Desktop Companion,ChatGPT&Gemini Voice Interaction,V | $239 | 3.7 | 317 | 200+ |
| `B0DYK831XY` | Rabbit r1 AI Voice-Activated Gadget & Voice Recorder - No Subscription Fees | $139.30 | 3.6 | 102 | n/a |

**B6**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B07GZR981Y` | CyberPower ST425 Standby UPS Battery Backup and Surge Protector | $59.95 | 4.4 | 55 | 425+ |
| `B01HDC236Q` | APC UPS Battery Backup BE425M for Router and Office Electronics | $62.50 | 4.5 | 114 | 425+ |
| `B07WLD32RP` | TalentCell Mini UPS Uninterrupted Power Supply 27000mAh 97.2Wh Lithium ion Bac | $64.99 | 4.2 | 739 | 300+ |
| `B0FF9PQ528` | KP3 Mini UPS Battery Backup for WiFi Router, 0ms Uninterruptible Power Supply  | $31.34 | 4.5 | 87 | 100+ |
| `B0FCV2Q8TB` | Mini UPS for Wifi Router, USB 5V⎓3.6A DC UPS 12V⎓2A Battery Backup 9V⎓2A 10400 | $55.55 | 4.2 | 115 | n/a |
| `B0FCS21J17` | Mini DC UPS Battery Backup Uninterruptible Power Supply 18W 5V/9V/12V/15V/24V  | $25.99 | 4.3 | 119 | 100+ |

**N29**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0BDD9ZQC5` | Vault FW4C - 4 Port, Firewall Micro Appliance/Mini PC - Intel J3710, 2.5G Port | $449 | 4.6 | 142 | n/a |
| `B07G9NHRGQ` | Vault FW4B - 4 Port, Firewall Micro Appliance/Mini PC - Intel Quad Core, AES-N | $449 | 4.5 | 452 | n/a |
| `B0D8CR8LHJ` | Vault V1410-4 Port, Micro Appliance/Mini PC - N5105, 4X 2.5G NICs, 8GB LPDDR R | $499 | 4.7 | 36 | n/a |
| `B0DGBMJ43Q` | Vault V1610-6 Port, Micro Appliance/Mini PC - Intel N6005, 6X 2.5G NICs, 16GB  | $659 | 5 | 5 | n/a |
| `B07FKMJGD6` | Vault FW4B - 4 Port, Firewall Micro Appliance/Mini PC - Intel Quad Core, AES-N | $369 | 4.5 | 179 | n/a |
| `B0CWSBL2SC` | Vault Pro VP6670-6 Port, Micro Appliance/Mini PC - Intel i7, 2X 10G SFP+ & 4X  | $989 | 5 | 2 | n/a |

**N25**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B07ZWK2TQT` | Logitech Ergo K860 Wireless Ergonomic Split Keyboard with Wrist Rest | $108.29 | 4.4 | 81 | n/a |
| `B0BTNY72VD` | Logitech Wave Keys Ergonomic Wireless Keyboard with Palm Rest - Graphite | $54.99 | 4.2 | 31 | 3+ |
| `B0GZM8LRWJ` | Nulea Ergonomic Keyboard, Wireless Split Design with Cushioned Wrist Rest | $37.99 | 4.6 | 205 | 3+ |
| `B0BKKYRQ31` | Arteck Split Ergonomic Keyboard with Palm Rest, 2.4G USB Wireless Keyboard | $42.49 | 4.3 | 17 | 1,000+ |

**N9**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B09BDH3SYQ` | Rosewill 4U Server Chassis Rackmount Case / 7 x 3.5 Bays, 2 x 5.25 Devices/ AT | $94.99 | 4 | 108 | 200+ |
| `B0D9MFZ7Y9` | 4U Rack Case Shallow 12" Depth, 19" Rackmount Flight Cases Easy Installation P | $75.99 | 4.6 | 144 | 100+ |
| `B0CLR3ZKQ4` | Diandian 4U Rack Case Shallow 11" Depth, Rackmount Flight Case Shock Mount | $82.44 | 4.6 | 355 | n/a |
| `B0D296DVD8` | RackChoice 3U Rackmount Server Chassis ATX/Micro ATX/Mini-ITX (8x3.5 or 6x3.5+ | $169 | 3.5 | 34 | n/a |

**N23**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B07NY23WBG` | 128GB High Endurance Video microSDXC Card with Adapter for dash cam and home m | $38.99 | 4.7 | 783 | 10,000+ |
| `B084CJ9T2R` | 128GB MAX Endurance microSDXC Card with Adapter for Home Security Cameras and  | $48.44 | 4.7 | 73 | 1,000+ |
| `B07P4HBRMV` | 256GB High Endurance microSD Card + Adapter | $64.99 | 4.7 | 783 | 30+ |
| `B08T6QSBPJ` | 64GB Elite-X Class 10 U3 V30 A1 microSDXC Flash Memory Card 3-Pack | $33.99 | 4.6 | 199 | n/a |
| `B09XR2MTHK` | E-Series 128GB 2 PK Micro SD Card microSDXC UHS-I Flash Memory Card | $55.24 | 4.7 | 498 | n/a |

**N3**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0CHWPQNGF` | HP EliteDesk 800 G4 Mini Tiny Business PC, Intel Hexa-Core i5-8500T up to 3.5G | $190 | 3.9 | 384 | 400+ |
| `B07J2SPR49` | HP EliteDesk 800 G2 Desktop Mini Business PC, Intel Quad-Core i5-6500T up to 3 | $170 | 4.4 | 946 | 200+ |
| `B0FTSLQVW8` | Lenovo ThinkCentre M710q Tiny Desktop, Core 6th Gen, 8GB DDR4 RAM, 256GB SSD,  | $124.50 | 4.1 | 115 | 100+ |
| `B0F9GQ8R2Z` | Dell OptiPlex 3050 Micro Form Factor Desktop Computer, Intel Core i5-7500T, 8G | $154.99 | 4.3 | 62 | 300+ |
| `B0BBH9L11P` | HP ProDesk 600 G6-Mini, Intel Core i5-10500T 2.3GHz, 16GB RAM, 512GB M.2-NVMe, | $299.99 | 4.4 | 24 | 50+ |

**C1**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0F8J5HW21` | Pironman 5-MAX Raspberry Pi 5 Case Dual NVMe M.2 SSD PCIe, Mini PC NAS RAID 0/ | $75.99 | 4.5 | 653 | 100+ |
| `B0D5CTRSQK` | Pironman 5 NVMe M.2 SSD PCIe 2.0/3.0 Mini PC Case for Raspberry Pi 5 Hailo-8L, | $63.99 | 4.5 | 992 | 100+ |
| `B0DX1HQWB2` | Penta SATA HAT, 5-Port SATA Expansion Module, Storage Accessory for RPi 5 & Ra | $79.99 | 4.3 | 80 | 50+ |
| `B0CVQT445P` | Raspberry Pi 5 Essentials Starter Kit (8GB RAM) | $229.99 | 4.7 | 42 | 200+ |

**B7**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0CMVBMVHT` | JONSBO N3 Mini-ITX NAS PC Chassis, ITX Computer Case, 8HHD+1-SSDD isk Bays NAS | $142.49 | 4.5 | 185 | 50+ |
| `B0G2GVQSFL` | JONSBO N6 NAS Case, Micro ATX Pc Case,9HDD/SSD Drive Bay (hot-swap),Support 3  | $158.39 | 4.5 | 52 | 100+ |
| `B0DG2N3PBB` | JONSBO N5 NAS Pc Case, E-ATX,12HDD+4SSD Drive Bay GPU HP Host, Supports Max. 4 | $239.99 | 4.7 | 130 | 100+ |
| `B0D1YH7D3J` | JONSBO N4 Black NAS Pc Case, Walnut Wood, 8-Drive Bay/6 * 3.5 "HDD (4 hot-swap | $109.99 | 4.2 | 130 | n/a |
| `B0CQZS7KN5` | DARKROCK Classico Storage Master ATX NAS Computer Case with 4x120mm Fans | $89.99 | 4.4 | 381 | 3+ |

**N21**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0F47BF4W8` | Sonnet RackMac mini 2024+ 2U Rackmount Enclosure for 1-3 Apple Mac mini M4 | $349.99 | 5 | 5 | 2,024+ |
| `B0GX9FR2Z4` | Tecmojo 2U Rack Mount Enclosure for 3 Mac mini, 19-Inch Rackmount with Individ | $159.90 | 5 | 4 | n/a |
| `B0F2Y6YNP9` | Rackmount.IT RM-AP-T3 Rack Mount Kit for Apple Mac mini M4 Mac Minis - 1.3U, F | $122.55 |  | 0 | n/a |
| `B09YCJ3QLT` | UCTRONICS Mac mini Rack Mount with Side Brackets, 19" 1U Rackmount Supports up | $71.99 | 4.2 | 31 | n/a |
| `B0H1BQVVZR` | Mini Rack Mount for Mac mini M1 M2, 19in 1U Hinged Server Rack Shelf, for All  | $38.39 | 4.6 | 3 | n/a |

**N30**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0GQYW153Z` | Third Reality Voice/Music Assistant Dev Edition - Preloaded with Home Assistan | $79.99 | 3.4 | 38 | 200+ |
| `B0DSBBXW84` | ReSpeaker Lite Voice Assistant Kit with XIAO ESP32S3 | $59.33 |  | 0 | n/a |
| `B0CXVKSG19` | Home Assistant Green / Smart Home hub with Advanced Automation / Official Home | $219 | 4.4 | 986 | 2,000+ |

**N24**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0F3MMK1J4` | AOC 16" Portable Monitor FHD 60Hz USB-C IPS Ultra Slim Smart Cover 16T20 | $47.48 | 4.6 | 876 | 1,920+ |
| `B0FV4S4YV9` | msi Pro MP165 E6 Ultra Slim & Light Portable Monitor,15.6" FHD IPS 1080p, USB  | $64.99 | 4.6 | 229 | 2,000+ |
| `B088D8JG3L` | KYY Portable Monitor 15.6" 1080P Computer Monitor Screen Extender w/Cover | $55.99 | 4.4 | 133 | 1,080+ |
| `B095GG31KX` | InnoView Portable Monitor, 15.6 Inch FHD 1080P HDMI USB C Second External Moni | $46.99 | 4.3 | 65 | 5,000+ |
| `B0CH9WTW56` | ARZOPA 16.1'' 144Hz Portable Gaming Monitor 106% sRGB - Z1FC | $92.13 | 4.4 | 26 | 1,080+ |

**N31**

| ASIN | Product (Amazon search snapshot) | Price | Rating | Ratings | Bought last month |
|---|---|---:|---:|---:|---:|
| `B0BDF94TMV` | X-Sense Wi-Fi Water Leak Detector Kit, 120 dB, 3 Sensors + Base, SWS54 | $36.09 | 4.5 | 23 | 1,804+ |
| `B09WQPJBTQ` | Aqara Water Leak Sensor 3 Pack, Zigbee Water Leak Detector for Alarm System | $37.99 | 4.2 | 36 | n/a |
| `B0CHZ83LQD` | Tapo Smart Water Leak Detector, Requires Tapo Hub, T300 | $14.99 | 4.7 | 559 | 90+ |
| `B0G5N5X6H6` | 10 Pack Water Leak Detectors for Home,100dB Water Alarm Basement | $32.97 | 4.5 | 93 | n/a |

## Appendix D: raw exports (temporary, `/tmp/aff3/`)

| Path | Contents |
|---|---|
| `gsc/q90.jsonl`, `gsc/q28.jsonl`, `gsc/p28.jsonl`, `gsc/windows.json`, `gsc/daily.json` | Search Console rows and the two-window comparison |
| `pl/clicks.json`, `pl/pages.json`, `pl/geo_source.json` | Plausible affiliate clicks by article, by product, visitors per page, country and source |
| `ub/*.json`, `ubov/*.json` | Ubersuggest match-keyword batches and keyword overviews |
| `serp/*.json` | TinyFish SERP results |
| `fetch/` | TinyFish page fetches |
| `bd/amz_*_res.json` | Bright Data Amazon search results |
| `bd/reddit_c*_res.json`, `rsearch/` | Bright Data Reddit posts and the TinyFish thread discovery |
| `tables/` | The generated tables in this file |

Re-pull all of it before the next planning pass; `/tmp` does not survive a reboot.
