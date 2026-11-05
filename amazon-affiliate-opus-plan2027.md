# Amazon Affiliate Content Plan 2027 — bitdoze.com

_Prepared 2026-10-23, revised 2026-11-04. Covers Nov 2026 → Dec 2027. Builds on `docs/to-do-affiliate-artices.md` (Sep 2026), whose Tier 1–2 articles are live._

_Revision 2026-11-04: the 10 articles and the retrofits finished since Oct 23 are removed from the backlog (listed once in §0.1). 16 new article ideas (N1–N16) were added from fresh Ubersuggest, Google SERP and Amazon research (§1, §3, §4.4, Appendices A2 and D)._

---

## 0. TL;DR

1. **Done since Oct 23 and removed from the backlog:** A1–A5 (Oct 23) and B3, B4, B5, B8, B9 (Oct 30), plus retrofits R1–R4, the October pass of R6 and R7 on six posts. See §0.1.
2. **Still open from the original plan: 13 articles.** Tier 1: A6 hard drives for NAS, A7 GPU for local LLMs, A8 DGX Spark alternatives, A9 OCuLink eGPU. Tier 2: B1, B2, B6, B7, B10, B11, B12. Tier 3: C1–C3 and the S1 gift guide.
3. **16 new ideas; 15 have an EASY primary SERP.** Research on 2026-11-04: 138 new Ubersuggest seeds (2,710 keywords), 43 live Google US SERPs and 10 Amazon searches via Bright Data. Same bar as before: primary keyword SD ≤ 30 and at most one big editorial/retail site in the Google top 8.
4. **Best new picks:** N1 Best NAS for Plex (5,610/mo listed, primary SD 22–26), N2 Cameras for Frigate & Home Assistant (4,690), N4 Low-profile GPU for a home server (7,490), N5 UGREEN vs Synology (1,940; core terms at SD 16–18; UGREEN is the #2 clicked product), N7 Zigbee sensors (3,380; core terms at SD 16–18), N8 Home server rack (6,220), N6 PoE doorbell (5,220).
5. **Home Assistant is the fastest-moving cluster.** `best-home-assistant-hardware` collected 940 Google impressions in its first 9 days, and every HA-adjacent SERP checked (camera, doorbell, wall panel, tablet, weather station, presence, Zigbee sensors) came back EASY.
6. **Next six weeks:** A6 + N1 (Nov 9), A7 + S1 (Nov 16), A8 + N5 (Nov 23, Black Friday), N2 + A9 (Nov 30, Cyber Monday), N7 + N4 (Dec 7), N6 + B2 (Dec 14). Full calendar in §7.
7. **The ops levers are still not shipped and still outweigh any single article:** geo-routing `/go/` for the ~65% of clickers outside the US (§6.1), IndexNow + Bing Webmaster Tools (§6.2), and the `/go/` links flagged on Oct 23 as landing on the wrong listing (R14).
8. **Prices are still inflated.** ASRock Arc A310 LP is $271.65 on Amazon (roughly 2.5× launch), and Synology DS225+ drive bundles run $981–1,824 next to the $364.99 diskless unit. Keep leading with $/TB and $/GB tables, stamp a "price checked" date, and never hardcode prices.

### 0.1 Published since Oct 23 (removed from the backlog)

| ID | Article | Slug | Published | Google so far (GSC, to Nov 1) |
|---|---|---|---|---|
| A1 | Best Mac mini for OpenClaw | `best-mac-mini-for-openclaw` | Oct 23 | 2 impressions (check indexing, R11) |
| A2 | Best Mini PC for Plex & Jellyfin | `best-mini-pc-plex-jellyfin` | Oct 23 | 72 impressions |
| A3 | Best Home Assistant Hardware | `best-home-assistant-hardware` | Oct 23 | 940 impressions, 8 clicks |
| A4 | Best Rack Mount UPS for Homelab & NAS | `best-rack-mount-ups-homelab` | Oct 23 | 108 impressions, 2 clicks |
| A5 | Best 10-inch Mini Rack | `best-10-inch-mini-rack` | Oct 23 | 103 impressions, 3 clicks |
| B3 | Best Mac mini Dock with SSD Enclosure | `best-mac-mini-dock` | Oct 30 | 24 impressions, 1 click |
| B4 | Best DAS / JBOD Enclosure | `best-das-enclosure-homelab` | Oct 30 | 37 impressions, 1 click |
| B5 | Zigbee Coordinator & Thread Border Router | `best-zigbee-coordinator-home-assistant` | Oct 30 | 18 impressions |
| B8 | Best Mini PC for OPNsense / pfSense | `best-mini-pc-opnsense` | Oct 30 | 29 impressions |
| B9 | Best Travel Router (WireGuard & Tailscale) | `best-travel-router-wireguard-tailscale` | Oct 30 | 34 impressions, 2 clicks |
| N1 | Best NAS for Plex | `best-nas-for-plex` | Nov 5 | — |

Retrofits finished: R1 (home-server hub "mini server" framing), R2 (NAS "Drives to buy with it" block), R3 (UPS split and "UPS for a NAS" H2), R4 (CalDigit TS5 alternatives and TB5 hubs), R6 October pass (EN + ES), R7 hardware boxes on six posts. 47 of the 101 Appendix C slugs are now in `src/data/affiliate-links.json`. Three more belonged to finished articles and were dropped (`beelink-mini-s13-pro` shipped as `beelink-mini-s13`, same ASIN; `rpi-ai-hat-plus` and `thirdreality-zigbee-plug-gen3-4pack` went unused). The remaining 51 stay in Appendix C. `best-tech-gadgets-2027` (Oct 24) is a general gadget list, not the S1 programmer/homelab gift guide, so S1 stays open.

---

## 1. Data and method

| Source | Scope | What it gave us |
|---|---|---|
| Google Search Console (`sc-domain:bitdoze.com`, via composio) | Oct 23 pull: 2026-07-23 → 10-21 (90d) + 09-22 → 10-21 (30d). **Nov 4 pull: 2026-08-03 → 11-01, all 45,039 query×page rows** | Page positions, striking-distance queries, fit signal for new clusters, first impressions on the new pages |
| Plausible (self-hosted `an3.bitdoze.com`, Stats API v2) | 2026-09-21 (the `/go/` launch) → 10-22 | `affiliate_click` by product, by `article` prop, country, source; page visitors, time on page, scroll |
| Ubersuggest (composio custom toolkit, `CUSTOM_UBERSUGGES_MATCH_KEYWORDS`) | US / English. Oct 23: ~170 seeds, 4,700+ keywords. **Nov 4: 138 new seeds, 2,710 keywords** | Volume, SD (SEO difficulty), CPC, intent |
| SERP checks | Oct 23: Google US via Bright Data + TinyFish, 75 queries. **Nov 4: 43 queries; raw `google.com/search?gl=us` pages fetched with Bright Data `scrape_batch` and parsed for result domains** (the `search_engine` tool hides most domains behind `/goto` redirects) | Who ranks in the top 8 (big editorial/retail vs forum/UGC) |
| Amazon US | Oct 23: Bright Data Amazon product-search scraper, 120 products + 12 category scans (108 found / 12 not found). **Nov 4: 10 Amazon search pages via Bright Data** | ASIN, price, rating, rating count |

**What "not that hard" means for bitdoze:**

- Of the 500 US keywords Ubersuggest returns for bitdoze.com, 94 rank top-10. 88 of those have SD ≤ 39, and all 8 top-3 rankings are at SD 20–29. So: **primary keyword SD ≤ 30, secondary SD ≤ 35, nothing above 35 unless the live SERP is weak.**
- SERP verdicts: **EASY** = at most 1 big editorial/retail result (RTINGS, Tom's Hardware, PCMag, TechRadar, Amazon, Best Buy...) and at least 3 forum/UGC results (Reddit, forums, Facebook, YouTube) in the top 8. **HARD** = 4 or more big editorial/retail results. Everything else is **MID**.
- Ubersuggest volumes are US-only and directional. Plan around clusters, not single keywords.
- **Traffic multiplier:** Plausible visitors on affiliate pages were **4.7×** their Google clicks over the same 30 days (range 2.8×–18×). DuckDuckGo, Bing, direct and AI referrals add a lot on top of Google. Budget ~3× when estimating.

Raw exports from the Nov 4 session are in `/tmp/affplan2/` (temporary): `all_keywords.json`, `serp_results.jsonl`, `serp_raw/`, `amz/*.json`. The Oct 23 exports in `/tmp/affplan/` are gone. Re-pull with the same composio and Bright Data tools before major decisions.

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

### 2.6 Early signal from the Oct 23 / Oct 30 batch (GSC to Nov 1)

- `best-home-assistant-hardware` has **940 impressions and 8 clicks** after 9 days. That puts it on pace to beat the best previous start (`best-tb5-nvme-enclosures`: 2,103 impressions in its first 30 days). HA-adjacent spokes are the lowest-risk next articles.
- `best-rack-mount-ups-homelab` (108 impressions) and `best-10-inch-mini-rack` (103) are picking up long-tail queries at positions 8–15.
- `best-mac-mini-for-openclaw` has only **2 impressions** despite 16 inbound internal links. Check indexing before writing anything else for the OpenClaw audience (R11).
- Plausible conversion data for the new pages is too thin to judge after 1–2 weeks. Re-pull on the first Monday of December (§9) and re-rank the backlog by clicker rate.

---

## 3. Opportunity map (scored)

Scoring is 1–5 on each axis:
- **Demand** = summed US volume of the article's listed keywords (≥5k → 5, 2.5–5k → 4, 1.5–2.5k → 3, 1–1.5k → 2, <1k → 1).
- **Ease** = SERP verdict + SD.
- **Fit** = existing GSC signal / adjacency to a page converting ≥15%.
- **Money** = Amazon availability, rating depth, basket size.

Done items (A1–A5, B3, B4, B5, B8, B9) are removed. N-rows are new from the 2026-11-04 research; their keyword lists and product checks are in §4.4.

| ID | Article | Listed kw volume /mo | Primary keyword (vol / SD) | SERP | D | E | F | M | Score | Tier |
|---|---|---:|---|---|---:|---:|---:|---:|---:|---|
| N1 | Best NAS for Plex (new) | 5,610 | nas for plex server (1,000 / 26); good nas for plex (1,000 / 22) | EASY | 5 | 5 | 5 | 5 | **20** | 1 |
| A6 | Best Hard Drives for NAS (IronWolf vs WD Red vs Exos) | 9,490 | best hard drives for nas (1,600 / 29) | EASY | 5 | 4 | 5 | 4 | **18** | 1 |
| A7 | Best GPU for Local LLMs (VRAM per dollar) | 1,690 | best gpu for local llm (170 / 16); best gpu for ai (1,000 / 28) | EASY | 3 | 5 | 5 | 4 | **17** | 1 |
| A8 | DGX Spark Alternatives: Strix Halo Mini PCs Compared | 3,340 | strix halo mini pc (1,000 / 25) | EASY/MID | 4 | 4 | 5 | 4 | **17** | 1 |
| A9 | OCuLink eGPU Docks + Mini PCs with OCuLink | 6,130 | oculink egpu (1,300 / 22) | EASY/MID | 5 | 4 | 4 | 4 | **17** | 1 |
| N2 | Best Cameras for Frigate & Home Assistant (new) | 4,690 | frigate camera (880 / 25); home assistant camera (720 / 30) | EASY | 4 | 4 | 4 | 5 | **17** | 1 |
| N4 | Best Low-Profile GPU for a Home Server (new) | 7,490 | low profile gpu (2,900 / 26) | EASY | 5 | 4 | 4 | 4 | **17** | 1 |
| N5 | UGREEN vs Synology (+ Synology alternatives) (new) | 1,940 | ugreen vs synology (720 / 16) | EASY | 3 | 5 | 5 | 4 | **17** | 1 |
| N7 | Best Zigbee Sensors for Home Assistant (new) | 3,380 | zigbee motion sensor (590 / 18); zigbee door sensor (590 / 16) | EASY | 4 | 5 | 5 | 3 | **17** | 1 |
| N8 | Best Server Rack for a Home Lab (19-inch) (new) | 6,220 | home server rack (1,600 / 28) | EASY (secondary MID) | 5 | 4 | 4 | 4 | **17** | 1 |
| N6 | Best PoE Video Doorbell for Home Assistant (new) | 5,220 (2,350 of it brand-navigational) | poe doorbell (1,300 / 20) | EASY ("best poe doorbell" MID) | 4 | 4 | 4 | 4 | **16** | 1 |
| B1 | Best Thunderbolt 5 Cables (tested) | 8,740 | thunderbolt 5 cable (5,400 / 34, stretch) | MID | 5 | 3 | 5 | 3 | 16 | 2 |
| B2 | Best IP KVM: Comet vs JetKVM vs NanoKVM vs PiKVM | 3,020 | ip kvm switch (1,900 / 26) | EASY | 4 | 4 | 4 | 4 | 16 | 2 |
| N3 | Best Used & Refurbished Mini PCs for a Homelab (new) | 2,120 (+8,260 navigational model searches) | refurbished mini pc (880 / 22); used mini pc (880 / 26) | EASY | 3 | 5 | 5 | 3 | 16 | 2 |
| B7 | Best NAS Case for a DIY NAS (+ boards) | 6,580 | nas case (2,900 / 28) | MID | 5 | 3 | 4 | 3 | 15 | 2 |
| B11 | Best PoE Switch for IP Cameras (Frigate) — re-scored, pairs with N2/N6 | 5,040 | poe switch for ip camera (1,300 / 17) | MID | 5 | 3 | 4 | 3 | 15 | 2 |
| N9 | Best Rackmount PC Case for a Homelab (new) | 3,510 | rackmount pc case (1,900 / 26) | EASY ("4u server case" MID) | 4 | 4 | 3 | 4 | 15 | 2 |
| N10 | TrueNAS & Unraid Hardware Guide (CPU, board, HBA) (new) | 1,600 | truenas hardware (210 / 20); sas hba card (390 / 25) | EASY | 3 | 5 | 4 | 3 | 15 | 2 |
| N11 | Best Tablet & Wall Panel for a Home Assistant Dashboard (new) | 1,980 | home assistant tablet (320 / 22); home assistant wall panel (320 / 22) | EASY | 3 | 5 | 4 | 3 | 15 | 2 |
| B6 | Best Mini UPS for Router & Modem | 2,350 | ups for router (720 / 29) | EASY/MID | 3 | 4 | 4 | 3 | 14 | 2 |
| B10 | Best Keyboard for Programming | 2,440 | good keyboard for programming (1,300 / 27) | EASY | 3 | 4 | 3 | 4 | 14 | 2 |
| B12 | Best SSD for NAS (cache vs all-flash) | 6,780 | ssd for nas (4,400 / 29) | EASY/MID | 5 | 3 | 4 | 2 | 14 | 2 |
| N12 | Headless Mac mini Server Setup (new, how-to + product box) | 1,810 | headless mac mini (260 / 24); hdmi dummy plug (1,300 / 29) | EASY (dummy plug MID) | 3 | 4 | 5 | 2 | 14 | 2 |
| N14 | Best Weather Station for Home Assistant (new) | 510 | home assistant weather station (480 / 22) | EASY | 1 | 5 | 4 | 4 | 14 | 3 |
| N16 | Best Security Cameras Without a Subscription (new, stretch) | 17,850 | best home security camera without subscription (6,600 / 21) | MID | 5 | 2 | 3 | 4 | 14 | 3 |
| N13 | Best mmWave Presence Sensor for Home Assistant (new) | 1,060 | mmwave presence sensor (390 / 17) | EASY | 2 | 5 | 4 | 2 | 13 | 3 |
| N15 | Omada vs UniFi for a Home Network (new) | 420 | omada vs unifi (210 / 14) | EASY | 1 | 5 | 3 | 3 | 12 | 3 |
| C1 | Raspberry Pi 5 NAS Build | 1,320 | raspberry pi 5 nas (720 / 24) | MID | 2 | 3 | 3 | 3 | 11 | 3 |
| C2 | Best 5K Monitor for Mac (Studio Display alternatives) | 3,470 | 5k monitor for mac (880 / 28) | MID | 4 | 2 | 2 | 3 | 11 | 3 |
| C3 | Best Monitor Light Bar | 1,390 | best monitor light bar (590 / 27) | MID | 2 | 3 | 2 | 3 | 10 | 3 |
| S1 | Seasonal: Gifts for Programmers & Homelabbers | 730 | gifts for programmers (590 / 28) | — | 1 | 3 | 3 | 4 | seasonal | Nov |

N6 Demand is scored 4, not 5, because 2,350 of its 5,220 listed volume is brand-navigational ("reolink poe doorbell", "ring poe doorbell", "unifi poe doorbell", "eufy poe doorbell", "reolink poe doorbell camera").

Full SERP evidence is in Appendix A (A1: Oct 23, A2: Nov 4). Ready-to-paste `/go/` entries are in Appendix C (original plan) and Appendix D (new ideas).

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
- N-article product data (§4.4) is an Amazon search snapshot from 2026-11-04. Confirm the product page before adding a slug.

### 4.1 Tier 1 (original plan, still open) — publish Nov 9 → Nov 30, 2026

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

### 4.2 Tier 2 (original plan) — Dec 2026 → Jun 2027

| ID | Article / slug idea | Category · tags | Keywords (vol / SD) | SERP notes | Products (Amazon, Oct 23) |
|---|---|---|---|---|---|
| **B1** | Best Thunderbolt 5 Cables (we tested them) · `best-thunderbolt-5-cables` | `gadgets` · thunderbolt-5, cables, macbook | thunderbolt 5 cable 5,400/34 (stretch), best thunderbolt 5 cable 260/37, thunderbolt 5 cable for macbook 210/20, intel certified thunderbolt 5 cable 90/19, long 90/23, longest 70/24, max length 30/18, backwards compatible 30/21; brand terms: anker prime 1,900/24, owc 480/23, cable matters 140/18 | MID: CalDigit, Reddit, YouTube, Macworld, Best Buy, Cable Matters, AppleInsider forum. **Moat:** measured throughput with the docks and enclosures you already own | anker-prime-tb5-cable B0DXZCXK2C $37.99 4.7★/683 · cable-matters-tb5-cable B0D7WHLFWX $35 4.6★/389 · owc-tb5-cable-1m B0DH7PFRD1 $34.99 4.5★/414 · apple-tb5-pro-cable B0FH5PWC69 $69 4.4★/145 · caldigit-tb5-cable-1-5m B0HJRP6DRK $79.99 4.5★/108 · belkin B0DT4KVNHQ $39.99 · ugreen B0DNG739TK $34.95 4.9★/77 · silkland-usb4-80g B0FB3YXRBF $24.93 4.6★/554 |
| **B2** | Best IP KVM for Homelab: GL.iNet Comet vs JetKVM vs NanoKVM vs PiKVM · `best-ip-kvm-homelab` | `self-hosting` · ip-kvm, homelab, remote-access | ip kvm switch 1,900/26, kvm over ip switch 320/20, remote kvm over ip 110/29, kvm over ip raspberry pi 90/31, jetkvm vs pikvm 70/31, pikvm vs jetkvm 50/20, pikvm alternative 70/29, best kvm over ip 50/20, pikvm v4 mini 260/28 | EASY: Jeff Geerling, Reddit ×2, STH forums, Facebook, YouTube, pikvm.org. Tailscale built into Comet is the self-hosting hook | glinet-comet-gl-rm1 B0F21SQ4S8 $99.99 4.4★/862 · glinet-comet-poe B0FDQJ1V7J $115.99 4.6★/406 · glinet-comet-pro B0G1BS7WWK $179.99 4.5★/442 · glinet-comet-x (4-port) B0H5QCG2P7 $279.99 4.9★/10 · jetkvm B0FY63H6NH $142.39 4.4★/96 · sipeed-nanokvm B0DHVY1CJS $75.99 3.8★/41 · pikvm-v4-mini B0CV93FNLF $309.95 4.3★/38 |
| **B6** | Best Mini UPS for Router & Modem (keep your homelab reachable) · `best-mini-ups-router-modem` | `self-hosting` · ups, networking, homelab | ups for router 720/29, mini ups for router 390/27, ups for router and modem 390/27, ups for modem and router 390/27, small ups for router 140/27, best ups for router and modem 110/26, mini dc ups for router 110/28, 12v ups for router 50/28 | "best ups for router and modem" EASY (Level1, YouTube, Reddit, panther.ph, woyum, Quora, Facebook). "mini ups for router" is retailer-heavy | talentcell-mini-ups B07WLD32RP $64.99 4.2★/727 · apc-be425m B01HDC236Q $62.50 4.5★/114 · cyberpower-st425 B07GZR981Y $59.95 4.4★/54 · cyberpower-cp550slg B002QAUN2M $77.95 (16) · ecoflow-river-3 B0DB1S36YP $249 4.5★/912. APC BGE90M and CUZOR aren't on Amazon |
| **B7** | Best NAS Case for a DIY NAS in 2026 (+ N150/N305 boards) · `best-nas-case-diy-nas` | `self-hosting` · nas, diy-nas, homelab | nas case 2,900/28, itx nas case 720/27, best nas case 390/22, nas motherboard 720/23, nas motherboard mini itx 590/25, itx nas motherboard 480/22, home server case 260/24, 4 bay nas case 210/28, best nas motherboard 70/20, best home server case 50/20 | "best nas case" MID (wundertech, Reddit, Amazon, XDA, LTT). "best home server case" EASY. Turn it into a full parts list (case + board + drives from A6 + PSU) | jonsbo-n3 B0CMVBMVHT $159.59 4.5★/178 · jonsbo-n4 B0D1YH7D3J $119.99 4.1★/126 · jonsbo-n5 B0DG2N3PBB $249.99 4.6★/121 · jonsbo-n6 B0G2GVQSFL $175.99 4.6★/46 · darkrock-storage-master B0CQZS7KN5 $89.99 4.4★/373 · silverstone-cs382 B0CKTYSZV9 $241.39 4.2★/66. N150 NAS board B0DT9YQGZ2 has only 7 ratings. Fractal Node 304 had no price |
| **B10** | Best Keyboard for Programming (2026) · `best-keyboard-for-programming` | `gadgets` · keyboards, developer-setup | good keyboard for programming 1,300/27, mechanical keyboard for programming 480/24, good mechanical keyboard for programming 320/29, best mechanical keyboard for programming 260/24, best mac keyboard for programming 40/29 | EASY: RTINGS #1, then Reddit, Medium, mkbguide, YouTube, Quora | keychron-v1-max B0CR16KS3F $99.99 4.4★/76 · keychron-k2-he B0DCVPGB9N $139.99 4.3★/495 · keychron-q1-max B0CR1J7SPX $229.99 4.5★/41 · logitech-mx-mechanical B09LJWWX4Y $179.99 4.4★/934 · hhkb-hybrid-type-s B082TQK2SB $295 4.4★/395 · kinesis-advantage360 B0BCHMGZMD $479 4.0★/203 · nuphy-air75-v3 B0FFFZ7R2K $139.95 3.9★/373. Skip Keychron Q11 (3.6★/11) |
| **B11** | Best PoE Switch for IP Cameras (Frigate NVR) · `best-poe-switch-ip-cameras` | `self-hosting` · poe, frigate, networking | poe switch for ip camera 1,300/17, poe switch for camera 1,000/25, poe switch for security cameras 880/20, poe switch for cameras 880/18, ip camera poe switch 720/11, managed switch 8 port poe 260/20 | MID: Reddit, NETGEAR, kijero, securitycameraking, Level1, omnitron, cctvcameraworld. VLAN isolation for cameras plus Frigate is the angle nobody covers | Existing: tp-link-tl-sg105pp-m2, yuanley-8-port-2-5g-poe, ubiquiti-flex-2-5g-poe. To check: TP-Link TL-SG1210P / TL-SG1008P, NETGEAR GS308PP, UniFi Lite 8 PoE |
| **B12** | Best SSD for NAS: NVMe Cache vs All-Flash · `best-ssd-for-nas` | `self-hosting` · nas, ssd, storage | ssd for nas 4,400/29, best ssd for nas 480/31, nvme nas 1,300/27, nvme ssd for nas 170/20, sata ssd for nas 170/22, m 2 nvme ssd for nas 90/20, hdd vs ssd for nas 90/28 | EASY/MID: Reddit, SanDisk, Tom's, lincplus, Level1, TrueNAS forums, Synology community. **Price anomaly:** WD Red SN700 1TB listed at $459.95, Samsung 990 EVO Plus 2TB at $362 with 7 ratings. Publish when SSD prices look sane, or frame it as "small cache SSD only" | Recheck at writing |

### 4.3 Tier 3 (original plan) — opportunistic / H2 2027

- **C1 Raspberry Pi 5 NAS Build** (`raspberry pi 5 nas` 720/24, `raspberry pi 5 nas case` 210/20, `raspberry pi 5 nvme hat` 210/29, `best raspberry pi 5 case` 90/21). Needs a real build. Products: radxa-penta-sata-hat B0DX1HQWB2 $79.99 4.3★/77, sunfounder-pironman-5-max B0F8J5HW21 $94.99 4.4★/635, argon-one-v3-m2 B0CT2MDV2D $49.99 4.4★/203, pimoroni-nvme-base-duo B0D4SGF2QT $39.09 4.3★/23. A bare Pi 5 16GB board isn't listed (kits only, ~$406).
- **C2 Best 5K Monitor for Mac / Studio Display Alternatives** (`5k monitor for mac` 880/28, `apple studio display alternative` 720/30, `32 inch 5k monitor` 720/26, `best 5k monitor` 480/28). MID SERP (RTINGS, Macworld, Best Buy) and weak Amazon listings: ASUS PA27JCV 3.6★/158; LG 27MD5KL $3,998 new ($799 renewed, B07XVLVD22); Kuycon G27P 3.0★/1; BenQ MA270S and Samsung ViewFinity S9 5K not found. Monitor content converts at ~2% here. Write only if the dev-desk cluster takes off.
- **C3 Best Monitor Light Bar** (`best monitor light bar` 590/27, `monitor light bar for eye strain` 480/20). Off-core. Better as a section in the gift guide.
- **S1 Seasonal: Gifts for Programmers & Homelabbers** (`gifts for programmers` 590/28, `best gifts for programmers` 110/31). Publish ~Nov 15 each year as a curated list of cheap SKUs from every article above: a TB5 cable, a Zigbee dongle, GL.iNet Comet, RackMate T0, a Mac mini dock, a keyboard.

### 4.4 New opportunities (research 2026-11-04)

Keyword volumes and SD are Ubersuggest US (Nov 4). SERP verdicts use the same rule as §1 on live Google US results (Appendix A2). Amazon data is a search-page snapshot from Nov 4: confirm the exact listing (variant, seller, price) on the product page before adding a `/go/` slug. Candidate slugs are in Appendix D.

#### N1. Best NAS for Plex (2026): UGREEN vs Synology vs TerraMaster vs QNAP

- **Slug:** `best-nas-for-plex` · **Category:** `self-hosting` · **Tags:** `plex`, `nas`, `jellyfin`
- **Why first:** the highest score in the plan. It sits between two converting pages (A2 mini PC for Plex, the NAS guide whose UGREEN DXP4800 Plus is the #2 clicked product) and gives Black Friday NAS + drive baskets a home.
- **SERP:** EASY on both checks. "best nas for plex": NASCompares ×2 (posts from 2020 and 2021), Reddit, YouTube, Spiceworks community, Plex support, SynoForum, HowToGeek (the only big site). "nas for plex server": Reddit, pcguide, YouTube, Plex support, NASCompares, Plex forums, QNAP, UGREEN. The ranking guides are stale.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| nas for plex server | 1,000 | 26 | $0.53 |
| good nas for plex | 1,000 | 22 | $1.01 |
| nas for plex | 1,000 | 36 | $0.82 |
| synology nas for plex | 880 | 24 | $0.80 |
| best nas for plex | 880 | 35 | $1.62 |
| synology nas for plex server | 260 | 28 | $0.40 |
| best nas for plex server | 210 | 29 | $1.01 |
| qnap nas for plex | 110 | 21 | $0.69 |
| best synology nas for plex | 90 | 27 | $0.52 |
| ugreen nas for plex | 90 | 20 | $0.74 |
| best nas for plex 4k transcoding | 50 | 21 | $0.65 |
| best budget nas for plex | 40 | 28 | $0.68 |

- **Angle:** "Which NAS can actually transcode?" Intel Quick Sync boxes (UGREEN DXP2800 / DXP4800 Plus, TerraMaster F4-424 Pro, Synology DS225+ with its Celeron J4125) vs the ones that can't: the DS925+ uses a Ryzen V1500B with no integrated GPU (the NAS guide already says so), and the DS223j is ARM, so direct play only. Lead with a "transcodes it handles" table per box.
- **Must cover:** Plex Pass for hardware transcoding (Jellyfin as the free route), 4K HDR tone mapping on Intel iGPUs, AV1, direct play vs transcode, how many drives you need for a library (link A6), and when a mini PC + DAS beats a NAS (A2, B4).
- **Products:** existing `ugreen-dxp2800`, `ugreen-dxp4800-plus`, `ugreen-dxp6800-pro`, `terramaster-f4-424-pro`, `synology-ds925-plus` (flag: no hardware transcoding). New: `synology-ds225-plus` (B0FB7KQLR1, $364.99, 4.6★/261; avoid the drive-bundle listings at $981–1,824), `synology-ds223j` (B0C8814GKB, $209.99, 4.5★/890, direct play only).
- **Links:** from `best-mini-pc-plex-jellyfin`, `self-host-jellyfin`, `best-nas-homelab-docker-proxmox`, `black-friday-home-server-deals`; out to A6, N4 and N5.
- **Cannibalization:** the NAS guide targets "best nas" for Docker/Proxmox. Keep its Plex talk to one line that links here.

#### N2. Best Cameras for Frigate & Home Assistant (PoE, local, no subscription)

- **Slug:** `best-cameras-frigate-home-assistant` · **Category:** `self-hosting` · **Tags:** `frigate`, `home-assistant`, `poe`
- **SERP:** EASY on three checks, zero big sites in any of them. "frigate camera recommendations": HA community, Frigate docs, Facebook, YouTube, Reddit, GitHub, nocloudnest. "home assistant camera": Reddit, HA community ×3, YouTube, Facebook, cctvcamerapros, alarmgrid. "best poe camera": Reddit ×2, Reolink store, thesmarthomehookup, Facebook, YouTube, safehome, eufy. "reolink vs amcrest" is MID by the formula but has no big site either (Reddit, ipcamtalk, thesmarthomehookup, Facebook, vueville, bensoftware). The bare "frigate camera" SERP timed out twice, so only its longer variant was checked.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| frigate camera | 880 | 25 | $4.03 |
| best poe security camera system | 880 | 28 | $5.96 |
| home assistant camera | 720 | 30 | $4.82 |
| reolink home assistant | 590 | 20 | $4.30 |
| best poe camera | 480 | 27 | $4.56 |
| best poe camera system | 390 | 28 | $4.75 |
| reolink vs amcrest | 320 | 19 | $3.14 |
| best poe security camera system without subscription | 140 | 27 | $4.14 |
| best home assistant camera | 90 | 32 | $3.54 |
| frigate camera recommendations | 70 | 24 | $1.09 |
| best poe camera system for home | 50 | 26 | $3.21 |
| best poe camera for home | 50 | 25 | $3.64 |
| home assistant camera compatible | 30 | 30 | $1.10 |

- **Angle:** "Cameras that behave in Frigate." RTSP/ONVIF with a usable sub-stream (detect on the sub-stream, record the main stream), H.264 vs H.265, fixed vs varifocal lenses, why a 4MP large-sensor camera beats 8MP at night, PoE only, and cameras blocked from the internet on their own VLAN. The "no subscription" angle catches the wider camera crowd. "best poe security camera system" (880/28) was not SERP-checked; check it before using it in the title.
- **Must cover:** a Frigate camera config with go2rtc restreaming, detect vs record resolution, Reolink quirks (RTSP vs http-flv, firmware), Amcrest and Dahua-OEM (EmpireTech) as the low-maintenance picks, storage per camera per day, the box that runs Frigate (A3 for N150 + OpenVINO, N4 for a GPU) and the PoE switch (B11, or the PoE section of the 2.5GbE switch guide meanwhile).
- **Products (Amazon, Nov 4):** `reolink-rlc-810a` (B07K74GWX5, $99.99, 4.5★/1.6k), `reolink-rlc-820a` (B08135WDZW, $99.99, 4.4★/1.3k), `reolink-rlc-510a` (B08F568BH1, $62.99, 4.4★/1.4k), `reolink-rlc-520a-2pack` (B09MCSCRGV, $121.49, 4.5★/809), `reolink-duo-3-poe` (B0CM39K7CB, $229.99, 4.2★/1.1k). Still to source: Amcrest IP5M/IP8M PoE turrets, EmpireTech IPC-T54IR (check whether it sells on Amazon US), and a 4-camera PoE NVR as the no-Frigate option.
- **Links:** from A3 (Frigate section), `best-2-5-10gbe-switch-homelab` (PoE section), N6 and B11; out to A6 and N4.

#### N4. Best Low-Profile GPU for a Home Server (Plex, Jellyfin, Frigate)

- **Slug:** `best-low-profile-gpu-home-server` · **Category:** `self-hosting` · **Tags:** `gpu`, `plex`, `homelab`
- **SERP:** "best low profile gpu" EASY (tech4gamers, YouTube ×3, techpowerup, Reddit, LTT forum, Newegg). "intel arc a310 plex" EASY with seven forum/UGC results and no big site (Reddit ×2, TrueNAS forums, YouTube, GitHub, Emby, Plex forums, Unraid forums). "best gpu for plex transcoding" is MID (XDA and HowToGeek), but six of its top 8 are forums.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| low profile gpu | 2,900 | 26 | $0.38 |
| intel arc a310 | 1,900 | 28 | $0.86 |
| best low profile gpu | 590 | 29 | $0.41 |
| amd low profile gpu | 480 | 29 | $0.51 |
| sparkle intel arc a310 eco | 320 | 23 | $0.65 |
| single slot low profile gpu | 320 | 31 | $0.27 |
| intel arc a310 eco | 210 | 26 | $0.43 |
| nvidia low profile gpu | 170 | 27 | $0.29 |
| intel arc a310 low profile | 110 | 27 | $0.34 |
| best single slot low profile gpu | 110 | 27 | $1.98 |
| intel low profile gpu | 110 | 26 | $0.28 |
| best gpu for plex / best gpu for plex transcoding | 50 / 50 | 26 / 25 | $0.00 |
| gpu for plex / intel arc a310 vs a380 | 40 / 40 | 22 / 17 | $0.00 |
| gpu for jellyfin / best gpu for jellyfin / intel arc a310 plex | 30 / 30 / 30 | 19 / 28 / 18 | $0.00 |

- **Angle:** the home-server job, not gaming. Transcodes per watt and idle draw for Plex/Jellyfin (Arc A310/A380 with AV1 encode), Frigate detection on Arc through OpenVINO, and small local models (RTX 3050 6GB). Fit check by chassis: OptiPlex/ThinkCentre SFF, M720q/M920q with a riser (N3), the MS-01's half-height slot, a DIY NAS (B7).
- **Must cover:** Arc idle power and ASPM settings, Linux kernel/driver minimums, Plex vs Jellyfin support for Arc, NVENC session limits on consumer NVIDIA cards, the 75W slot-power ceiling and half-height brackets, and why an N150 or Core Ultra iGPU often makes a GPU unnecessary (link A2). Send bigger LLM builds to A7.
- **Products (Amazon, Nov 4):** `sparkle-arc-a380-elf` (B0C74RQV9K, $155.05, 4.6★/230; compact single fan but not low-profile, so check fit), `asrock-arc-a310-lp` (B0CJGP8WJJ, $271.65, 4.4★/89; about 2.5× launch price, say so), `msi-rtx-3050-lp-6g` (B0CTJZCJH1, $279.99, 4.5★/385). Still to source: Sparkle Arc A310 ECO (the most-searched variant, 320/23, missing from the snapshot), RX 6400 LP, RTX A2000 (mostly used/refurbished).
- **Links:** from A2, N1, N3, `best-mini-pc-home-server` (MS-01 section); out to A7.

#### N5. UGREEN vs Synology (2026): Which NAS Should You Buy? (+ Synology alternatives)

- **Slug:** `ugreen-vs-synology` · **Category:** `self-hosting` · **Tags:** `nas`, `ugreen`, `synology`
- **SERP:** EASY on both checks. "ugreen vs synology": Reddit, a UGREEN Facebook group, SynoForum, YouTube (WunderTech), jussiroine, wundertech.net, UGREEN's UK blog, HowToGeek (the only big site). "synology alternative": logik forum, XDA (the only big site), SynoForum, Reddit, gartner, YouTube, digitec.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| ugreen vs synology | 720 | 16 | $2.92 |
| ugreen vs synology nas | 390 | 18 | $1.72 |
| synology alternative | 390 | 17 | $3.32 |
| ugreen nas vs synology | 260 | 18 | $5.61 |
| terramaster vs ugreen | 40 | 21 | $0.88 |
| synology vs qnap vs ugreen | 40 | 19 | $0.47 |
| terramaster vs ugreen nas | 40 | 18 | $0.00 |
| best synology alternative | 30 | 31 | $4.25 |
| ugreen vs synology vs qnap | 30 | 17 | $0.00 |

- **Angle:** spec for spec at the same price (DXP2800 vs DS225+, DXP4800 Plus vs DS925+), DSM vs UGOS Pro, Docker/VM support, transcoding (link N1), drive policy (Synology's 2025 verified-drive restriction; check its current status on the day you write), support and resale. Close with a short "Synology alternatives" section: UGREEN, TerraMaster, QNAP, Asustor, DIY TrueNAS (N10) and mini PC + DAS (B4).
- **Must cover:** the DSM features people miss after switching (Synology Photos, Active Backup, Hyper Backup, QuickConnect), UGOS Pro gaps, running TrueNAS/Unraid on UGREEN hardware, idle power.
- **Products:** existing `ugreen-dxp2800`, `ugreen-dxp4800-plus`, `ugreen-dxp6800-pro`, `synology-ds925-plus`, `terramaster-f4-424-pro`. New: `synology-ds225-plus` (B0FB7KQLR1, $364.99, 4.6★/261).
- **Fit signal:** GSC already sends "terramaster vs ugreen vs synology" (16 impressions, position 8.0) and "ugreen os vs truenas" to `best-nas-homelab-docker-proxmox`. Move that intent here and link both ways with N1 and A6.

#### N6. Best PoE Video Doorbell for Home Assistant (local, no subscription)

- **Slug:** `best-poe-doorbell-home-assistant` · **Category:** `self-hosting` · **Tags:** `home-assistant`, `poe`, `frigate`
- **SERP:** "poe doorbell" EASY with no big site (linovision, Reddit ×2, HA community, YouTube, Reolink support, dowtechnologies, alarmgrid). "home assistant doorbell" EASY (Reddit, HA community ×2, YouTube, instructables, smarthomeassistant.co.uk, Facebook, HowToGeek). "best poe doorbell" is MID (TechRadar, Amazon, Security.org), so build the title around "PoE doorbell" + "Home Assistant", not "best PoE doorbell".

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| poe doorbell | 1,300 | 20 | $1.91 |
| reolink poe doorbell (brand) | 1,300 | 20 | $1.45 |
| poe doorbell camera | 880 | 20 | $1.97 |
| ring poe doorbell (brand) | 590 | 22 | $1.05 |
| reolink poe doorbell camera (brand) | 260 | 21 | $1.38 |
| home assistant doorbell | 170 | 24 | $1.63 |
| home assistant doorbell camera | 140 | 26 | $1.43 |
| reolink doorbell home assistant | 110 | 27 | $0.85 |
| unifi poe doorbell (brand) | 110 | 26 | $0.52 |
| best poe doorbell / best poe doorbell camera | 90 / 90 | 24 / 31 | $0.90 / $1.71 |
| eufy poe doorbell (brand) / poe doorbell cameras | 90 / 90 | 22 / 21 | $2.07 / $0.71 |

- **Angle:** wiring first (PoE injector vs the existing doorbell transformer, mechanical chime compatibility), then local RTSP into Frigate/HA, two-way audio in HA, on-device person/package detection vs Frigate, and a fully no-cloud setup.
- **Products (Amazon, Nov 4):** `aqara-doorbell-g400` (B0G52BVRLQ, wired/PoE, $99.99, 4.2★/458), `reolink-chime-plus` (B0GXFNC2JS, $24.99, 4.4★/54). The Reolink Video Doorbell PoE listing did not appear in the snapshot (the WiFi model shows 4.1★/3.5k), so look up the PoE ASIN when writing. Also check UniFi G4/G6 doorbells (often third-party on Amazon), Ring's PoE model (cloud-first, include only as "if you're already on Ring") and Amcrest AD410 (WiFi, popular in HA).
- **Links:** from A3, N2 and B5; out to B11 / the PoE switch section.

#### N7. Best Zigbee Sensors for Home Assistant (motion, door, temperature, leak, buttons)

- **Slug:** `best-zigbee-sensors-home-assistant` · **Category:** `self-hosting` · **Tags:** `zigbee`, `home-assistant`, `smart-home`
- **SERP:** EASY on both checks. "zigbee motion sensor": thesmartesthouse, zwaveproducts, Reddit, Facebook, Hubitat community, Amazon, YouTube, HA community. "zigbee door sensor": moeshouse, smarthomescene, Reddit, YouTube, HA community, Amazon, helpshift, SmartThings community.

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| zigbee button | 720 | 18 | $0.76 |
| zigbee motion sensor | 590 | 18 | $0.67 |
| zigbee door sensor | 590 | 16 | $0.67 |
| zigbee temperature sensor | 390 | 23 | $0.59 |
| zigbee sensors | 390 | 16 | $1.90 |
| zigbee water leak sensor | 140 | 22 | $0.59 |
| outdoor zigbee motion sensor | 110 | 20 | $0.48 |
| aqara zigbee door sensor | 110 | 18 | $0.83 |
| thirdreality zigbee motion sensor | 110 | 12 | $0.56 |
| best zigbee motion sensor / sonoff zigbee motion sensor | 50 / 50 | 20 / 19 | $0.57 / $0.23 |
| best zigbee door sensor | 40 | 20 | $2.02 |
| zigbee sensors home assistant / best zigbee temperature sensor / best zigbee button | 30 / 30 / 30 | 28 / 22 / 17 | — |

- **Angle:** one pick per sensor type, with Zigbee2MQTT/ZHA notes, battery type and real battery life, router vs end device, which brands fall off some meshes (Aqara), and a ~$100 starter kit for one room.
- **Products (Amazon, Nov 4):** `thirdreality-zigbee-motion` (B08RRRWK6B, $17.99, 3.9★/1.2k), `sonoff-snzb-03p` (B0C1GB4DVR, $16.50, 4.3★/900), `aqara-motion-p1-3pack` (B0FNWKMYHL, $49.99, 4.4★/61), `aqara-door-window-3pack` (B09TP7VMKB, $42.74, 4.3★/1.6k), `aeotec-zigbee-motion` (B095TZTGNB, $48.99, 4.6★/423). Still to source: SONOFF SNZB-02D (temperature/humidity with LCD), a leak sensor (SONOFF SNZB-05P or ThirdReality), a button (Aqara mini switch or SONOFF SNZB-01P; IKEA isn't on Amazon). Existing `thirdreality-zigbee-plug-4pack` is the mesh-router pick.
- **Why it pays:** $15–50 SKUs mean frequent small orders, which helps account health (§6.6).
- **Links:** from B5 (the coordinator guide has only one inbound post today) and A3; out to N13 and N11.

#### N8. Best Server Rack for a Home Lab (12U wall-mount, open-frame and cabinet)

- **Slug:** `best-home-server-rack` · **Category:** `self-hosting` · **Tags:** `homelab`, `server-rack`, `networking`
- **SERP:** "home server rack" EASY (sysracks, Reddit, Amazon, YouTube ×2, techly, rackmountsolutions, mtlynch.io). The secondary terms are MID but vendor-heavy, not editorial: "12u server rack" (sysracks, Amazon, Reddit, racksolutions, StarTech, Rosewill, YouTube, Navepoint), "wall mount network rack" (Reddit, racksolutions, Intellinet, Amazon, rackmountsolutions, YouTube, rackfinity, Navepoint), "home network cabinet" (rackfinity, Reddit, rackmountsolutions, YouTube, Lowe's, Amazon).

| Keyword | US vol/mo | SD | CPC |
|---|---:|---:|---:|
| home server rack | 1,600 | 28 | $4.33 |
| network cabinet (mostly navigational) | 1,300 | 24 | $3.84 |
| wall mount network rack | 880 | 24 | $2.87 |
| 12u server rack | 590 | 24 | $3.21 |
| wall mount network cabinet | 480 | 30 | $2.51 |
| home network cabinet | 320 | 29 | $1.01 |
| in wall network cabinet | 260 | 26 | $0.84 |
| network cabinet rack | 210 | 27 | $3.00 |
| network cabinet for home | 140 | 27 | $0.93 |
| home server rack setup | 110 | 25 | $2.68 |
| best server rack for home / startech 12u server rack | 90 / 90 | 22 / 20 | $3.77 / $0.96 |
| best home server rack | 70 | 22 | $4.95 |
| best server rack for home lab | 50 | 19 | $1.53 |
| 12u wall mount network rack | 30 | 23 | $1.31 |

- **Angle:** the 19-inch step up from A5. Open frame vs enclosed cabinet vs wall mount, depth (the #1 mistake: 12–18" wall cabinets don't fit servers), noise and heat in a closet, weight ratings, and a full cart: rack, shelf, patch panel, PDU, the rack UPS from A4 and a 1U switch.
- **Products (Amazon, Nov 4):** `tecmojo-12u-wall-cabinet` (B0BMDCSD8N, $169.90, 4.5★/203), `tecmojo-12u-open-frame` (B0CSJR2RZB, $89.90, 4.4★/483), `tecmojo-12u-wall-open-frame` (B0CSJRJFH2, $127.90, 4.5★/171), `rackpath-12u-wall-cabinet` (B0995K2KRQ, $169.98, 4.4★/287), `echogear-15u-open-frame` (B07YYJMCNV, $204.99, 4.7★/1.2k), `echogear-10u-open-frame` (B08P25PBSR, $174.99, 4.8★/588). Still to source: a StarTech 4-post 12U, a 1U metered PDU, brush panels.
- **Links:** from A4, A5 ("outgrowing 10-inch") and N9; out to A4.

#### N3, N9–N16 (shorter briefs)

| ID | Article / slug idea | Category · tags | Keywords (vol / SD) | SERP notes | Products (Amazon, Nov 4) |
|---|---|---|---|---|---|
| **N3** | Best Used & Refurbished Mini PCs for a Homelab (TinyMiniMicro: OptiPlex Micro vs ThinkCentre Tiny vs EliteDesk Mini) · `best-used-mini-pc-homelab` | `self-hosting` · mini-pc, homelab, refurbished | refurbished mini pc 880/22, used mini pc 880/26, used mini pc for sale 140/26, tiny mini micro 90/25, dell refurbished mini pc 70/25, best used mini pc 30/25, lenovo m720q vs m920q 30/19. Navigational model searches to catch in-page (8,260): dell optiplex micro 2,900/30, lenovo thinkcentre tiny 1,300/29, lenovo m720q 1,300/28, lenovo m920q 1,000/27, hp elitedesk mini 880/28, hp elitedesk mini 800 g3 880/27 | EASY: "used mini pc for home server" (discountcomputerdepot, virtualizationhowto, YouTube, Reddit, Amazon, Facebook, butterwhat, STH forums); "refurbished mini pc" (refurb retailers, Reddit, YouTube ×2, Amazon). "lenovo m720q" is MID and navigational (Amazon, Lenovo, eBay). **Angle:** $150–250 used boxes vs a new N150, 8th gen+ for Quick Sync, riser + NIC mods (N4), idle watts. Feeds the #1 clicker page (`best-mini-pc-home-server`) | `dell-optiplex-7060-micro-renewed` B08ZYT357P $216.97 4.1★/59 · OptiPlex 3080 Micro renewed B0FGDT5CKQ $306.99 3.7★/32 · OptiPlex 7010 Micro renewed B0D42BWWR8 $429 3.9★/20. Renewed listings have thin ratings and churn, so link 2–3 and re-check monthly. Still to source: ThinkCentre M720q/M920q and EliteDesk 800 G4/G5 renewed |
| **N9** | Best Rackmount PC Case for a Homelab (2U/4U, NAS and GPU builds) · `best-rackmount-pc-case` | `self-hosting` · server-rack, homelab, diy-nas | rackmount pc case 1,900/26, 4u server case 390/22, 4u rackmount pc case 320/22, rackmount pc case 4u 320/19, 2u rackmount pc case 170/19, rackmount pc case 2u 140/31, 1u rackmount pc case 140/22, 3u rackmount pc case 90/22, best rackmount pc case 40/24 | "rackmount pc case" EASY (Reddit, steigerdynamics, novatech, YouTube, Level1 forum, vi-control, newegg.ca). "4u server case" MID (Rosewill, Amazon, Reddit, rackmountnet, SilverStone, STH forums, ratchetwerks, eBay). Pairs with N8 and B7 | `rosewill-rsv-l4500u` B01JBG0LW0 $206.99 4.3★/137 (15× 3.5") · `rosewill-rsv-r4100u` B09BDH3SYQ $99.99 4.0★/106 · Rosewill 12-bay hot-swap B097Y25FGK $369.99 4.2★/56. Still to source: SilverStone RM43-320-RS / RM21-308. Sliger isn't on Amazon (link direct, no commission) |
| **N10** | TrueNAS & Unraid Hardware Guide: CPU, Board, HBA and RAM for a DIY NAS · `truenas-unraid-hardware-guide` | `self-hosting` · truenas, unraid, diy-nas | sas hba card 390/25, lsi hba card 210/24, truenas hardware 210/20, hba card sata 140/26, truenas hardware requirements 110/20, best cpu for home server 90/26, cpu for home server 90/22, truenas build 70/19, unraid build 70/19, unraid hardware 50/19, best truenas hardware 50/19, low power cpu for home server 30/24, truenas hardware guide 30/21, low power truenas build 30/19, unraid hardware requirements 30/17 | EASY: "truenas hardware" (truenas.com ×3, Reddit, TrueNAS forums ×2, YouTube); "hba card for truenas" (Reddit, LTT forum, Facebook, truenas.com, YouTube, TrueNAS forums ×2, Amazon). "hba card" is MID (vendor pages). Split with B7: B7 = the case, N10 = everything inside it, A6 = the drives | Not checked on Nov 4. Watch for counterfeit LSI cards from third-party sellers; prefer reviewed IT-mode 9300-8i listings (e.g. 10Gtek) and ASM1166 SATA cards for ≤6 drives |
| **N11** | Best Tablet & Wall Panel for a Home Assistant Dashboard · `best-home-assistant-wall-panel` | `self-hosting` · home-assistant, dashboards, tablets | home assistant display 390/21, home assistant wall panel 320/22, home assistant tablet 320/22, home assistant tablet dashboard 170/30, home assistant display panel 140/22, best tablet for home assistant 140/19, best tablet for home assistant dashboard 110/24, tablet for home assistant 110/20, android tablet for home assistant 50/20, best home assistant tablet 40/20, best home assistant display 40/25, plus five tails (kiosk, cheap, wall, wall mount, best wall panel) 150 | EASY: "home assistant wall panel" (HA community ×2, GitHub, YouTube ×2, Reddit, Facebook; no big site); "best tablet for home assistant" (Reddit, homeautocentral, Facebook, HA community, Medium, YouTube, portworld, evetech) | Not checked on Nov 4. Candidates: Amazon Fire HD 10 / Fire Max 11, Lenovo Tab M11, Samsung Galaxy Tab A9+, SONOFF NSPanel Pro, flush wall mounts, PoE-to-USB-C splitters (cheap converters) |
| **N12** | Headless Mac mini Server Setup (dummy plug, auto-login, Screen Sharing, power) · `headless-mac-mini-setup` | `self-hosting` · mac-mini, headless, openclaw | hdmi dummy plug 1,300/29, headless mac mini 260/24, headless mac mini setup 70/18, hdmi dummy plug 4k 70/26, 4k hdmi dummy plug 50/27, headless mac mini server 30/25, what is an hdmi dummy plug 30/24 | "headless mac mini" EASY (MPU talk forum, YouTube ×2, Apple discussions, Reddit, TidBITS forum, stealthpuppy, instructables). "hdmi dummy plug" MID (Amazon, Walmart). A setup guide with one product box, not a roundup; it serves the OpenClaw audience that A1 targets (fix A1's indexing first, R11) | Dummy plugs ($8–15; not checked on Nov 4) plus existing Mac mini, UPS and dock slugs. Low basket; the value is the funnel to A1 and B3 |
| **N13** | Best mmWave Presence Sensor for Home Assistant · `best-presence-sensor-home-assistant` | `self-hosting` · home-assistant, presence-sensor, zigbee | mmwave presence sensor 390/17, presence sensor home assistant 140/21, home assistant presence detection 140/21, aqara fp2 home assistant 140/20, aqara fp2 vs fp300 70/16, best mmwave presence sensor 40/21, plus four tails 140 | "presence sensor home assistant" EASY (HA community ×2, Reddit, YouTube, Facebook, derekseaman, Everything Smart shop, smarthomefocus). The "mmwave presence sensor" scrape returned dictionary and encyclopedia results, so re-check it | Ratings in this category are weak: Aqara FP2 B0BXWZMQJ3 $79.99 3.6★/2.5k, Aqara FP1E (Zigbee) B0D5QPH3T6 $42.99 4.0★/501, SwitchBot mmWave B0FSRJT4KW $24.99 3.5★/448, Aqara FP400 3.2★/15. Be honest about false triggers; Apollo and Everything Presence (not on Amazon) are the enthusiast picks |
| **N14** | Best Weather Station for Home Assistant (local API, no cloud) · `best-weather-station-home-assistant` | `self-hosting` · home-assistant, weather-station, smart-home | home assistant weather station 480/22, best home assistant weather station 30/19 | EASY with no big site (HA community ×3, Reddit, home-assistant.io ×2, Facebook, YouTube) | `ambient-ws-2902` B01N5TEHLI $199.99 4.4★/13.1k · Ambient WS-2000 B07GRBY9NP $299.99 4.4★/2.9k · `ecowitt-gw3001` (GW3000 gateway + WS90) B0DTPXKP8B $209.99 4.6★/23 · Ecowitt GW3000 gateway B0DN1BF1NM $59.99 4.5★/63. Ecowitt's local push is the angle |
| **N15** | Omada vs UniFi for a Home Network & Homelab · `omada-vs-unifi` | `self-hosting` · networking, unifi, omada | omada vs unifi 210/14, unifi alternative 140/23, tp link omada vs unifi 70/20 | EASY with no big site (YouTube ×2, ifeeltech, Reddit ×2, Facebook, LinkedIn, 2mtechnology) | Not checked on Nov 4. Omada access points, gateways and controllers sell on Amazon; UniFi stock there is spotty, so link store.ui.com |
| **N16** | Best Security Cameras Without a Subscription (local storage) — stretch · `security-camera-without-subscription` | `self-hosting` · security-cameras, frigate, home-assistant | security camera without subscription 8,100/36, best home security camera without subscription 6,600/21, best indoor security camera without subscription 1,300/31, best wireless security camera without subscription 720/22, best solar security camera without subscription 480/34, best home security camera without subscription wireless 480/24, wifi security camera without subscription 170/27 | MID: "best home security camera without subscription" = security.org, Reddit, goabode, safehome, hunttalk, Facebook ×2, Amazon (2 big). Consumer SERP with deep-pocket affiliates; attempt it only once N2 ranks top 10, as N2's consumer sibling | Reolink, eufy (HomeBase), Tapo, Amcrest (not checked) |

**Also considered, not briefed:** ESP32 boards for Home Assistant (esp32 home assistant 320/20, EASY; cheap boards, fold into a later ESPHome post), Home Assistant smart lock (210/20), energy monitor (260/26) and air quality sensor (260/20) (not SERP-checked; later HA spokes), 10GbE NICs and Thunderbolt 10GbE adapters (fold into the switch guide, R12), "best homelab server" (210/18, EASY; fold into the home-server hub, R13).

---

## 5. Refreshes and retrofits (still open)

R1–R4, the October pass of R6 and R7 on six posts are done and removed (§0.1). What's left:

| # | Page | Evidence | Action | When |
|---|---|---|---|---|
| R5 | `best-mini-pc-local-llm` | The "Need CUDA? Build a GPU box instead" H2 is live; A7/A8 don't exist yet | Link A7 from that H2 and A8 for the full Strix Halo comparison | As A7/A8 publish |
| R6 | `black-friday-home-server-deals` (+ ES) | Converts at 20.5% of visitors (bot-filtered), the third-best rate on the site | Weekly price refresh through Cyber Monday (Nov 30), daily-ish in BF week. Add A6, N1 and N5 as they publish. Flip to a "Prime Day homelab deals" page for July 2027 (confirm the date when Amazon announces it) | Weekly to Nov 30 |
| R7 | Hardware boxes on software posts | The six boxes are live. `setup-samba-linux` and `portainer-alternatives` still don't link to the published DAS guide (B4) | Add the B4 link to both now. Add A6/A7 links to the six boxes as those pages publish | Now + on publish |
| R8 | All roundups | GSC has year-modified demand ("best thunderbolt 5 dock 2026" 302, "best mini pc for home server 2026" 174) | Switch titles and descriptions to 2027 with a real update (prices, availability) | ~Dec 15 |
| R10 | Internal links to the Oct 30 batch | Checked Nov 4: `best-thunderbolt-5-docks-guide` doesn't link `best-mac-mini-dock`; `best-mini-pc-home-server` doesn't link `best-mini-pc-opnsense`; `best-zigbee-coordinator-home-assistant` has a single inbound post | Add exact-match anchors from those hubs, and link the Zigbee guide from the Home Assistant sections of `best-mini-pc-home-server` and `docker-containers-home-server` | Now |
| R11 | `best-mac-mini-for-openclaw` | 2 GSC impressions in 9 days vs 940 for the HA guide published the same day, despite 16 inbound links | GSC URL inspection, request indexing, check canonical/robots/sitemap entry. Hold N12 until this page shows up | Now |
| R12 | `best-2-5-10gbe-switch-homelab` | "thunderbolt 10gbe adapter" 140/19 (MID, vendor pages), "sfp network card" 90/16, "best 10gb network card" 50/20. The head "10gb network card" (1,900/24) is a HARD retail SERP | Add an H2 "The NIC side": 2.5GbE/10GbE PCIe cards, SFP+ cards and Thunderbolt 10GbE adapters. No standalone page | Jan 2027 |
| R13 | `best-mini-pc-home-server` | "best homelab server" 210/18, EASY SERP (virtualizationhowto, Reddit, YouTube ×2, LTT forum, Facebook) | Add a "best homelab server" H2 or FAQ; link N3 when it publishes | With N3 |
| R14 | `/go/` links flagged on Oct 23 | `kensington-sd5000t5` (landed on the non-EQ K35201NA), `anker-prime-tb5` (landed on the dock + cable bundle instead of B0DSVVJXK5), `minisforum-ai-x1-pro` (merged listing defaulting to the M1 Pro-125H), `ivanky-fusiondock-pro-3` ("Currently unavailable"). All four are still `amzn.to` short links in the JSON | Confirm where each lands; if unchanged, swap to `/dp/` URLs for the right listing or drop the dead one, then run `scripts/validate-affiliate-links.mjs` | Now |
| R15 | `best-thunderbolt-5-docks-guide` FAQ | MDX TODO waiting for B1 | Replace the TODO with the B1 cables link | When B1 publishes |
| ES | `mejores-nas-homelab-docker-proxmox`, `mejores-sai-servidor-casa`, `mejores-mini-pc-llm-local` | The EN R2, R3 and R5 changes aren't ported | Port them | After 6.1 ships |
| R9 | Low converters | OLED guide 2.1%, DC510 review 1.3%, GS5 0% | No new work. Keep them indexed | — |

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

Cheap-SKU articles (B1 cables, B6 mini UPS, N7 Zigbee sensors, alongside the live B5 dongles/plugs guide) add frequent small orders, which protects against the 180-day no-sale rule as the catalog grows.

### 6.7 Spanish versions

Only after 6.1 ships, so ES readers land on amazon.es. Start with A2, A3, A5 and the existing ES hero pages.

### 6.8 New `/go/` slugs

51 verified entries for open articles remain in Appendix C, and 33 candidates for the new N-articles are in Appendix D. Paste them into `src/data/affiliate-links.json` as each article ships, not all at once. Run `scripts/validate-affiliate-links.mjs` afterwards.

---

## 7. Calendar

**Realistic cadence:** 2 articles + 1 retrofit per week through Dec 20, then 1–2 articles + 1 refresh per week. New pages from this domain get impressions within days to weeks (`best-home-assistant-hardware`: 940 impressions in 9 days; `best-tb5-nvme-enclosures`: 2,103 impressions in its first 30 days), so anything live by ~Nov 22 can catch Black Friday (Nov 27) → Christmas demand.

| Week of | Articles | Retrofit / ops |
|---|---|---|
| Nov 9 | **A6** Hard drives for NAS · **N1** Best NAS for Plex | R7 + R10 link gaps · R11 indexing check · R14 `/go/` fixes · R6 weekly BF refresh |
| Nov 16 | **A7** GPU for local LLMs · **S1** Gift guide (programmers & homelabbers) | R5 (A7 link) · enable Crawler Hints / Bing WMT (6.2) |
| Nov 23 (BF) | **A8** DGX Spark alternatives · **N5** UGREEN vs Synology | BF/CM daily-ish deal updates (EN + ES); add A6, N1, N5 to the deals page |
| Nov 30 (CM) | **N2** Cameras for Frigate & Home Assistant · **A9** OCuLink eGPU | R5 (A8 link) |
| Dec 7 | **N7** Zigbee sensors · **N4** Low-profile GPU | Link N7 from B5 and A3; N4 from A2 and N1 |
| Dec 14 | **N6** PoE doorbell · **B2** IP KVM | **R8 year flip to 2027** on all roundups |
| Dec 21 → Jan 3 | **N8** Home server rack · **B1** TB5 cables | R15 (TB5 FAQ link) · start the geo-routing build (6.1) |
| Jan 2027 | **N3** Used & refurbished mini PCs · **B6** Mini UPS for router · **N11** HA wall panel | R13 · R12 NIC section · ship geo-routing for DE/UK/FR/CA · monthly price refresh A6/A7/N4 |
| Feb 2027 | **B7** NAS case · **N10** TrueNAS & Unraid hardware · **N9** Rackmount PC case | ES versions of A2/A3/A5 (if 6.1 is live) |
| Mar 2027 | **B11** PoE switch for cameras (moved up: pairs with N2/N6) · **N12** Headless Mac mini (if R11 is resolved) · **B10** Keyboard for programming | Q1 review: kill or double down per §9 |
| Apr–May 2027 | **B12** SSD for NAS (if prices are normal) · **N13** Presence sensors · **N14** Weather station | Refresh Tier 1 and N1/N2 (prices, new models) |
| Jun 2027 | **C1** Pi 5 NAS · **N15** Omada vs UniFi | Prime Day deals page prep |
| Jul 2027 | Prime Day homelab deals (date TBA by Amazon) | Refresh all roundups for Prime Day |
| Aug–Sep 2027 | **N16** Cameras without a subscription (only if N2 ranks top 10) · C2/C3 only if the dev-desk cluster performs | **Black Friday 2027 page live by Oct 1** |
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
| 10gb network card | 1,900 / SD 24 | HARD despite the SD: Amazon ×3, Walmart and eBay in the top 8. Cover NICs inside the switch guide (R12) |
| best poe doorbell, best poe doorbell camera | 90 / SD 24, 90 / SD 31 | MID: TechRadar, Amazon, Security.org. Win "poe doorbell" and "home assistant doorbell" with N6 instead |
| 2 bay nas, best 2 bay nas · 4 bay nas, best 4 bay nas | 2,400 / SD 34, 140 / SD 47 · 1,900 / SD 25, 210 / SD 32 | MID: Tom's Hardware, Newegg, Best Buy / Wired, Amazon. The existing NAS guide already covers 2- and 4-bay picks |
| lenovo m720q, dell optiplex micro, hp elitedesk mini (as standalone pages) | 1,300 / SD 28, 2,900 / SD 30, 880 / SD 28 | Navigational model searches (Amazon, Lenovo, eBay rank). Catch them inside N3 |
| hdmi dummy plug (as a roundup) | 1,300 / SD 29 | MID retail SERP (Amazon, Walmart) and a ~$10 basket. Use it inside N12 |
| e ink monitor | 3,600 / SD 40 | SD too high and off-core |
| kill a watt, kill a watt meter | 2,900 / SD 38, 3,600 / SD 34 | SD too high. Mention power meters inside the roundups that quote idle watts |
| home assistant thermostat, best home assistant thermostat | 880 / SD 37, 170 / SD 44 | SD too high |
| best camera for home assistant | 320 / SD 44 | SD too high. Win "home assistant camera" (720 / SD 30, EASY) with N2 |
| homelab server, ai workstation, mac studio dock | 1,600 / SD 41, 1,600 / SD 41, 390 / SD 41 | SD too high |
| jetson orin nano, nvidia jetson orin nano super developer kit | 6,600 / SD 44, 8,100 / SD 39 | Navigational product heads with high SD, and single-product angles convert poorly here |
| mac mini alternative | 210 / SD 44 | SD too high. A1 already covers the x86 alternative |

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

## Appendix A — SERP checks

### A1. Original checks (Google US, 2026-10-23)

Rows for queries that belonged to published articles or finished retrofits (A1–A5, B3, B4, B5, B8, B9, R1, R3, R4, R6) were removed.

| Query (Google US) | Big editorial/retail in top 8 | Forum/UGC in top 8 | Verdict | Top 5 results |
|---|---:|---:|---|---|
| best gpu for local llm | 0 | 3 | EASY | reddit.com, hostrunway.com, llmconfigurator.com, julsimon.medium.com, spheron.network |
| best hard drive for plex server | 0 | 6 | EASY | reddit.com, facebook.com, thediskguide.com, youtube.com, avsforum.com |
| best hard drives for nas | 1 | 3 | EASY | nascompares.com, forums.spacerex.co, newegg.com, reddit.com, westerndigital.com |
| best home server case | 1 | 5 | EASY | reddit.com, diymediaserver.com, youtube.com, forum.level1techs.com, amazon.com |
| best ip kvm | 0 | 5 | EASY | jeffgeerling.com, reddit.com, reddit.com, forums.servethehome.com, facebook.com |
| best keyboard for programming | 1 | 5 | EASY | rtings.com, reddit.com, m1cola.medium.com, mkbguide.com, youtube.com |
| best mechanical keyboard for programming | 0 | 4 | EASY | thatsoftwaredude.com, reddit.com, deskthority.net, youtube.com, quora.com |
| best mini pc with oculink | 1 | 6 | EASY | reddit.com, store.minisforum.com, youtube.com, amazon.com, youtube.com |
| best nvme ssd for nas | 1 | 4 | EASY | reddit.com, lincplustech.com, tomshardware.com, sandisk.com, nascompares.com |
| best ssd for nas | 1 | 5 | EASY | reddit.com, sandisk.com, tomshardware.com, lincplustech.com, forum.level1techs.com |
| best ups for router and modem | 0 | 5 | EASY | forum.level1techs.com, youtube.com, reddit.com, panther.ph, woyum.com |
| cmr vs smr for nas | 1 | 4 | EASY | reddit.com, buffaloamericas.com, truenas.com, terra-master.com, servethehome.com |
| dgx spark alternative | 0 | 4 | EASY | betterclaw.io, reddit.com, forums.developer.nvidia.com, medium.com, centralcomputer.com |
| nvme nas | 1 | 4 | EASY | jeffgeerling.com, reddit.com, sandisk.com, youtube.com, reddit.com |
| seagate ironwolf vs wd red | 0 | 6 | EASY | reddit.com, nascompares.com, youtube.com, synoforum.com, facebook.com |
| apple studio display alternative | 2 | 5 | MID | reddit.com, rtings.com, petapixel.com, youtube.com, 9to5mac.com |
| beelink me mini review | 2 | 0 | MID | servethehome.com, bee-link.com, liliputing.com, hothardware.com, nascompares.com |
| best 5k monitor for mac | 3 | 3 | MID | reddit.com, rtings.com, macworld.com, benq.com, bestbuy.com |
| best displaylink dock for macbook air | 3 | 1 | MID | reddit.com, pcworld.com, discussions.apple.com, officegadgetslab.com, amazon.com |
| best egpu enclosure | 2 | 2 | MID | reddit.com, egpu.io, gagadget.com, youtube.com, sonnetstore.com |
| best egpu for mini pc | 3 | 1 | MID | amazon.com, reddit.com, egpu.io, tomsguide.com, newegg.com |
| best monitor for programming | 2 | 2 | MID | rtings.com, reddit.com, benq.com, youtube.com, lenovo.com |
| best monitor light bar | 1 | 1 | MID | dygma.com, btod.com, benq.com, reddit.com, minimaldesksetups.com |
| best n100 mini pc | 3 | 2 | MID | reddit.com, jeffgeerling.com, blog.alexellis.io, amazon.com, youtube.com |
| best nas case | 2 | 4 | MID | wundertech.net, reddit.com, amazon.com, xda-developers.com, linustechtips.com |
| best nas motherboard | 2 | 4 | MID | lincplustech.com, reddit.com, nascompares.com, newegg.com, forums.lawrencesystems.com |
| best nvme enclosure | 2 | 4 | MID | tomshardware.com, reddit.com, gamingpcbuilder.com, youtube.com, bestbuy.com |
| best poe switch for security cameras | 0 | 2 | MID | reddit.com, netgear.com, kijero.com, securitycameraking.com, forum.level1techs.com |
| best strix halo mini pc | 2 | 5 | MID | reddit.com, reddit.com, forums.servethehome.com, bestbuy.com, youtube.com |
| best thunderbolt 5 cable | 2 | 4 | MID | us.caldigit.com, reddit.com, youtube.com, macworld.com, bestbuy.com |
| best vertical monitor for programming | 3 | 3 | MID | rtings.com, reddit.com, benq.com, techradar.com, us.ktcplay.com |
| jetkvm vs pikvm | 0 | 2 | MID | reddit.com, jeffgeerling.com, news.ycombinator.com, fixoryhq.com, computingforgeeks.com |
| jonsbo n4 review | 2 | 1 | MID | nascompares.com, reddit.com, jonsbo.com, amazon.com, nascompares.com |
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

### A2. New checks (Google US, 2026-11-04)

Same verdict rule as §1. Domains come from the raw Google result page: consecutive results from the same domain (a Reddit group, a video carousel) count as one block, and AI Overview citations, "People also ask" and social-post carousels are ignored. "Top 5" lists the first five blocks. Two queries timed out and were checked with a longer variant instead ("frigate camera" → "frigate camera recommendations", "used mini pc" → "used mini pc for home server"). "mmwave presence sensor" returned dictionary/encyclopedia results and should be re-checked.

| Query (Google US) | Big editorial/retail in top 8 | Forum/UGC in top 8 | Verdict | Top 5 results |
|---|---:|---:|---|---|
| best homelab server | 0 | 6 | EASY | virtualizationhowto.com, reddit.com, youtube.com, linustechtips.com, youtube.com |
| best low profile gpu | 1 | 5 | EASY | tech4gamers.com, youtube.com, techpowerup.com, reddit.com, youtube.com |
| best nas for plex | 1 | 4 | EASY | nascompares.com, reddit.com, youtube.com, nascompares.com, community.spiceworks.com |
| best poe camera | 0 | 4 | EASY | reddit.com, store.reolink.com, thesmarthomehookup.com, reddit.com, facebook.com |
| best tablet for home assistant | 0 | 5 | EASY | reddit.com, homeautocentral.com, facebook.com, community.home-assistant.io, medium.com |
| esp32 home assistant | 0 | 3 | EASY | youtube.com, play.google.com, fonts.google.com, reddit.com, youtube.com |
| frigate camera recommendations | 0 | 5 | EASY | community.home-assistant.io, docs.frigate.video, facebook.com, youtube.com, reddit.com |
| hba card for truenas | 1 | 6 | EASY | reddit.com, linustechtips.com, facebook.com, truenas.com, youtube.com |
| headless mac mini | 0 | 4 | EASY | talk.macpowerusers.com, youtube.com, discussions.apple.com, youtube.com, reddit.com |
| home assistant camera | 0 | 6 | EASY | reddit.com, community.home-assistant.io, youtube.com, facebook.com, videos.cctvcamerapros.com |
| home assistant doorbell | 1 | 5 | EASY | reddit.com, community.home-assistant.io, youtube.com, community.home-assistant.io, instructables.com |
| home assistant wall panel | 0 | 7 | EASY | community.home-assistant.io, github.com, youtube.com, reddit.com, youtube.com |
| home assistant weather station | 0 | 6 | EASY | community.home-assistant.io, reddit.com, home-assistant.io, community.home-assistant.io, facebook.com |
| home server rack | 1 | 3 | EASY | sysracks.com, reddit.com, amazon.com, youtube.com, techly.com |
| intel arc a310 plex | 0 | 7 | EASY | reddit.com, forums.truenas.com, reddit.com, youtube.com, github.com |
| nas for plex server | 0 | 3 | EASY | reddit.com, pcguide.com, youtube.com, support.plex.tv, nascompares.com |
| omada vs unifi | 0 | 6 | EASY | youtube.com, ifeeltech.com, reddit.com, facebook.com, youtube.com |
| poe doorbell | 0 | 4 | EASY | linovision.com, reddit.com, community.home-assistant.io, youtube.com, reddit.com |
| presence sensor home assistant | 0 | 5 | EASY | community.home-assistant.io, reddit.com, youtube.com, facebook.com, derekseaman.com |
| rackmount pc case | 0 | 3 | EASY | reddit.com, steigerdynamics.com, novatech.co.uk, youtube.com, forum.level1techs.com |
| refurbished mini pc | 1 | 3 | EASY | discountcomputerdepot.com, reddit.com, pcliquidations.com, dellrefurbished.com, youtube.com |
| synology alternative | 1 | 5 | EASY | forum.logik.tv, xda-developers.com, synoforum.com, reddit.com, gartner.com |
| truenas hardware | 0 | 4 | EASY | truenas.com, reddit.com, forums.truenas.com, truenas.com, youtube.com |
| ugreen vs synology | 1 | 4 | EASY | reddit.com, facebook.com, synoforum.com, youtube.com, jussiroine.com |
| used mini pc for home server | 1 | 4 | EASY | discountcomputerdepot.com, virtualizationhowto.com, youtube.com, reddit.com, amazon.com |
| zigbee door sensor | 1 | 4 | EASY | moeshouse.com, smarthomescene.com, reddit.com, youtube.com, community.home-assistant.io |
| zigbee motion sensor | 1 | 5 | EASY | thesmartesthouse.com, zwaveproducts.com, reddit.com, facebook.com, community.hubitat.com |
| 12u server rack | 1 | 2 | MID | sysracks.com, amazon.com, reddit.com, racksolutions.com, startech.com |
| 2 bay nas | 3 | 1 | MID | nascompares.com, broadbandbuyer.com, synology.com, tomshardware.com, reddit.com |
| 4 bay nas | 2 | 3 | MID | nascompares.com, store.qnap.com, reddit.com, youtube.com, milwaukeepc.com |
| 4u server case | 2 | 2 | MID | rosewill.com, amazon.com, reddit.com, rackmountnet.com, silverstonetek.com |
| best gpu for plex transcoding | 2 | 6 | MID | reddit.com, forums.plex.tv, xda-developers.com, forum.45homelab.com, forum.level1techs.com |
| best home security camera without subscription | 2 | 3 | MID | security.org, reddit.com, goabode.com, safehome.org, hunttalk.com |
| best poe doorbell | 3 | 3 | MID | techradar.com, reddit.com, facebook.com, youtube.com, amazon.com |
| hba card | 0 | 1 | MID | store.10gtek.com, ajfriesen.com, reddit.com, broadcom.com, supermicro.com |
| hdmi dummy plug | 2 | 4 | MID | amazon.com, reddit.com, adafruit.com, youtube.com, reddit.com |
| home network cabinet | 2 | 3 | MID | rackfinity.com, reddit.com, rackmountsolutions.net, youtube.com, lowes.com |
| lenovo m720q | 2 | 1 | MID | amazon.com, lenovo.com, pcsupport.lenovo.com, ebay.com, servethehome.com |
| mmwave presence sensor | 1 | 2 | MID (unreliable parse: dictionary/encyclopedia results) | merriam-webster.com, imdb.com, youtube.com, en.wikipedia.org, med.stanford.edu |
| reolink vs amcrest | 0 | 2 | MID | reddit.com, ipcamtalk.com, thesmarthomehookup.com, facebook.com, vueville.com |
| thunderbolt 10gbe adapter | 0 | 2 | MID | asia.caldigit.com, store.ui.com, reddit.com, youtube.com, sonnettech.com |
| wall mount network rack | 1 | 2 | MID | reddit.com, racksolutions.com, intellinetsolutions.com, amazon.com, rackmountsolutions.net |
| 10gb network card | 5 | 2 | HARD | amazon.com, reddit.com, walmart.com, ascentoptics.com, us.amazon.com |

---

## Appendix B — Amazon availability notes

**From the Oct 23 checks (notes for published articles removed):**

- **Not on amazon.com** (don't plan buy buttons): APC Back-UPS Connect BGE90M and CUZOR mini UPS (B6), Corsair AI Workstation 300 (A8), BenQ MA270S and Samsung ViewFinity S9 27" 5K (C2).
- **No buy-box price:** Fractal Design Node 304 (B7), Dell U3224KB (C2), Intel Arc Pro B60 24GB (A7).
- **Third-party only / unclear:** ASRock N100DC-ITX ($634.40, 0 ratings; B7).
- **Thin or weak ratings** (mention, don't headline): Kuycon G27P 3.0★/1, Keychron Q11 3.6★/11, Sipeed NanoKVM 3.8★/41, plus the N150 NAS board, HP Z2 Mini G1a, NIMO and BliKVM v4 (all <20 ratings).
- **Price anomalies:** RTX 5090 $7,968, RTX 3090 $1,930, LG 27MD5KL $3,998 new ($799 renewed), WD Red SN700 1TB $459.95, LaCie Rugged SSD Pro5 only the 4TB ($1,999.99).

**New on Nov 4 (Amazon search snapshots):**

- **Synology DS225+:** link the diskless listing (B0FB7KQLR1, $364.99, 4.6★/261). The same NAS is also sold as drive bundles at $981–1,824.
- **GPUs are still inflated:** ASRock Arc A310 LP $271.65 (4.4★/89). The Sparkle Arc A380 ELF ($155.05, 4.6★/230) is better value but isn't low-profile. The Sparkle Arc A310 ECO didn't appear.
- **Reolink Video Doorbell PoE** didn't appear in the search snapshot; the WiFi model did (4.1★/3.5k). Confirm the PoE ASIN before writing N6.
- **Amazon Renewed mini PCs have thin ratings:** OptiPlex 7060 Micro 4.1★/59, OptiPlex 3080 Micro 3.7★/32, OptiPlex 7010 Micro 3.9★/20 and 4.1★/6.
- **Presence sensors rate poorly across the board:** Aqara FP2 3.6★/2.5k, SwitchBot mmWave 3.5★/448, ThirdReality R2 3.2★/20, Aqara FP400 3.2★/15. The Zigbee Aqara FP1E (4.0★/501) is the best-rated.
- **Deep listings worth leading with:** Ambient Weather WS-2902 4.4★/13.1k ($199.99), Reolink RLC-810A 4.5★/1.6k ($99.99), Aqara door/window 3-pack 4.3★/1.6k ($42.74), Echogear 15U open frame 4.7★/1.2k ($204.99).

---

## Appendix C — Proposed `/go/` slugs from the original plan (verified ASINs, tag `bido08-20`)

51 entries for articles that are still open (A6–A9, B1, B2, B6, B7, B10, C1). The 47 entries that shipped with the Oct 23–30 batch, and 3 that belonged to finished articles, were removed. Paste per article when it ships, not all at once, and re-check availability first.

```json
{
  "wd-red-plus-12tb": { "name": "WD Red Plus 12TB", "url": "https://www.amazon.com/dp/B0F4R6SNJG?tag=bido08-20" },
  "wd-red-pro-20tb": { "name": "WD Red Pro 20TB", "url": "https://www.amazon.com/dp/B0DYQH22PW?tag=bido08-20" },
  "toshiba-n300-12tb": { "name": "Toshiba N300 12TB", "url": "https://www.amazon.com/dp/B0CYQJRJB5?tag=bido08-20" },
  "rtx-5070-ti": { "name": "GeForce RTX 5070 Ti 16GB (PNY Epic-X)", "url": "https://www.amazon.com/dp/B0DXL8NFLF?tag=bido08-20" },
  "rtx-5080": { "name": "GeForce RTX 5080 16GB (ASUS TUF)", "url": "https://www.amazon.com/dp/B0DQSMMCSH?tag=bido08-20" },
  "rtx-5090": { "name": "GeForce RTX 5090 32GB (ASUS ROG Astral)", "url": "https://www.amazon.com/dp/B0DS2WQZ2M?tag=bido08-20" },
  "rx-9070-xt": { "name": "Radeon RX 9070 XT 16GB (ASUS Prime)", "url": "https://www.amazon.com/dp/B0DRRMZDH6?tag=bido08-20" },
  "radeon-ai-pro-r9700": { "name": "Radeon AI PRO R9700 32GB (ASRock Creator)", "url": "https://www.amazon.com/dp/B0G1WZMKW6?tag=bido08-20" },
  "intel-arc-b580": { "name": "Intel Arc B580 12GB (Limited Edition)", "url": "https://www.amazon.com/dp/B0DVS6MSP9?tag=bido08-20" },
  "rtx-3090-24gb": { "name": "GeForce RTX 3090 24GB (EVGA FTW3 Ultra)", "url": "https://www.amazon.com/dp/B0916ZWZ9S?tag=bido08-20" },
  "bosgame-m5-128gb": { "name": "Bosgame M5 (Ryzen AI Max+ 395, 128GB)", "url": "https://www.amazon.com/dp/B0H97V3LL5?tag=bido08-20" },
  "hp-z2-mini-g1a": { "name": "HP Z2 Mini G1a (Ryzen AI Max PRO)", "url": "https://www.amazon.com/dp/B0H48VDG2V?tag=bido08-20" },
  "minisforum-deg2": { "name": "MINISFORUM DEG2 USB4 v2/OCuLink eGPU dock", "url": "https://www.amazon.com/dp/B0GDY4HZBH?tag=bido08-20" },
  "aoostar-ag02": { "name": "AOOSTAR AG02 OCuLink eGPU dock (800W PSU)", "url": "https://www.amazon.com/dp/B0DXTLTLF5?tag=bido08-20" },
  "razer-core-x-v2": { "name": "Razer Core X V2 (Thunderbolt 5 eGPU)", "url": "https://www.amazon.com/dp/B0FFQFDZWX?tag=bido08-20" },
  "sonnet-breakaway-box-850-t5": { "name": "Sonnet Breakaway Box 850 T5", "url": "https://www.amazon.com/dp/B0FX86P6T8?tag=bido08-20" },
  "minisforum-um890-pro": { "name": "MINISFORUM UM890 Pro (Ryzen 9 8945HS, OCuLink)", "url": "https://www.amazon.com/dp/B0D9YJLZP6?tag=bido08-20" },
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
  "talentcell-mini-ups": { "name": "TalentCell mini DC UPS (12V/9V/5V, 97Wh)", "url": "https://www.amazon.com/dp/B07WLD32RP?tag=bido08-20" },
  "cyberpower-st425": { "name": "CyberPower ST425 standby UPS", "url": "https://www.amazon.com/dp/B07GZR981Y?tag=bido08-20" },
  "cyberpower-cp550slg": { "name": "CyberPower CP550SLG standby UPS", "url": "https://www.amazon.com/dp/B002QAUN2M?tag=bido08-20" },
  "ecoflow-river-3": { "name": "EcoFlow RIVER 3 (245Wh, UPS mode)", "url": "https://www.amazon.com/dp/B0DB1S36YP?tag=bido08-20" },
  "jonsbo-n3": { "name": "JONSBO N3 (8-bay Mini-ITX NAS case)", "url": "https://www.amazon.com/dp/B0CMVBMVHT?tag=bido08-20" },
  "jonsbo-n4": { "name": "JONSBO N4 (6+2-bay NAS case)", "url": "https://www.amazon.com/dp/B0D1YH7D3J?tag=bido08-20" },
  "jonsbo-n5": { "name": "JONSBO N5 (12-bay E-ATX NAS case)", "url": "https://www.amazon.com/dp/B0DG2N3PBB?tag=bido08-20" },
  "jonsbo-n6": { "name": "JONSBO N6 (Micro-ATX NAS case)", "url": "https://www.amazon.com/dp/B0G2GVQSFL?tag=bido08-20" },
  "darkrock-storage-master": { "name": "DARKROCK Classico Storage Master (ATX NAS case)", "url": "https://www.amazon.com/dp/B0CQZS7KN5?tag=bido08-20" },
  "silverstone-cs382": { "name": "SilverStone CS382 (8-bay hot-swap)", "url": "https://www.amazon.com/dp/B0CKTYSZV9?tag=bido08-20" },
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

## Appendix D — Candidate `/go/` slugs for the new articles (Amazon search snapshot, 2026-11-04)

None of these slugs or ASINs exist in `src/data/affiliate-links.json` today. They come from Amazon search result pages, not product pages: before pasting, open each product page and confirm the variant, the seller (sold or fulfilled by Amazon where possible) and that it's in stock. Prices and ratings are in §4.4 and Appendix B.

```json
{
  "synology-ds225-plus": { "name": "Synology DS225+ (2-bay, diskless)", "url": "https://www.amazon.com/dp/B0FB7KQLR1?tag=bido08-20" },
  "synology-ds223j": { "name": "Synology DS223j (2-bay, diskless)", "url": "https://www.amazon.com/dp/B0C8814GKB?tag=bido08-20" },
  "reolink-rlc-810a": { "name": "REOLINK RLC-810A 4K PoE camera", "url": "https://www.amazon.com/dp/B07K74GWX5?tag=bido08-20" },
  "reolink-rlc-820a": { "name": "REOLINK RLC-820A 4K PoE dome camera", "url": "https://www.amazon.com/dp/B08135WDZW?tag=bido08-20" },
  "reolink-rlc-510a": { "name": "REOLINK RLC-510A 5MP PoE camera", "url": "https://www.amazon.com/dp/B08F568BH1?tag=bido08-20" },
  "reolink-rlc-520a-2pack": { "name": "REOLINK RLC-520A 5MP PoE dome (2-pack)", "url": "https://www.amazon.com/dp/B09MCSCRGV?tag=bido08-20" },
  "reolink-duo-3-poe": { "name": "REOLINK Duo 3 PoE (dual-lens, 180°)", "url": "https://www.amazon.com/dp/B0CM39K7CB?tag=bido08-20" },
  "sparkle-arc-a380-elf": { "name": "Sparkle Intel Arc A380 ELF 6GB", "url": "https://www.amazon.com/dp/B0C74RQV9K?tag=bido08-20" },
  "asrock-arc-a310-lp": { "name": "ASRock Intel Arc A310 Low Profile 4GB", "url": "https://www.amazon.com/dp/B0CJGP8WJJ?tag=bido08-20" },
  "msi-rtx-3050-lp-6g": { "name": "MSI GeForce RTX 3050 LP 6G OC", "url": "https://www.amazon.com/dp/B0CTJZCJH1?tag=bido08-20" },
  "aqara-doorbell-g400": { "name": "Aqara Doorbell Camera G400 (wired/PoE)", "url": "https://www.amazon.com/dp/B0G52BVRLQ?tag=bido08-20" },
  "reolink-chime-plus": { "name": "REOLINK Chime Plus", "url": "https://www.amazon.com/dp/B0GXFNC2JS?tag=bido08-20" },
  "thirdreality-zigbee-motion": { "name": "THIRDREALITY Zigbee Motion Sensor", "url": "https://www.amazon.com/dp/B08RRRWK6B?tag=bido08-20" },
  "sonoff-snzb-03p": { "name": "SONOFF SNZB-03P Zigbee Motion Sensor", "url": "https://www.amazon.com/dp/B0C1GB4DVR?tag=bido08-20" },
  "aqara-motion-p1-3pack": { "name": "Aqara Zigbee Motion Sensor P1 (3-pack)", "url": "https://www.amazon.com/dp/B0FNWKMYHL?tag=bido08-20" },
  "aqara-door-window-3pack": { "name": "Aqara Zigbee Door and Window Sensor (3-pack)", "url": "https://www.amazon.com/dp/B09TP7VMKB?tag=bido08-20" },
  "aeotec-zigbee-motion": { "name": "Aeotec Zigbee Motion Sensor", "url": "https://www.amazon.com/dp/B095TZTGNB?tag=bido08-20" },
  "tecmojo-12u-wall-cabinet": { "name": "Tecmojo 12U wall-mount server cabinet", "url": "https://www.amazon.com/dp/B0BMDCSD8N?tag=bido08-20" },
  "tecmojo-12u-open-frame": { "name": "Tecmojo 12U open-frame rack", "url": "https://www.amazon.com/dp/B0CSJR2RZB?tag=bido08-20" },
  "tecmojo-12u-wall-open-frame": { "name": "Tecmojo 12U wall-mount open-frame rack", "url": "https://www.amazon.com/dp/B0CSJRJFH2?tag=bido08-20" },
  "rackpath-12u-wall-cabinet": { "name": "RackPath 12U wall-mount network cabinet", "url": "https://www.amazon.com/dp/B0995K2KRQ?tag=bido08-20" },
  "echogear-15u-open-frame": { "name": "ECHOGEAR 15U open-frame rack", "url": "https://www.amazon.com/dp/B07YYJMCNV?tag=bido08-20" },
  "echogear-10u-open-frame": { "name": "ECHOGEAR 10U open-frame rack", "url": "https://www.amazon.com/dp/B08P25PBSR?tag=bido08-20" },
  "rosewill-rsv-l4500u": { "name": "Rosewill RSV-L4500U 4U chassis (15× 3.5\" bays)", "url": "https://www.amazon.com/dp/B01JBG0LW0?tag=bido08-20" },
  "rosewill-rsv-r4100u": { "name": "Rosewill RSV-R4100U 4U chassis", "url": "https://www.amazon.com/dp/B09BDH3SYQ?tag=bido08-20" },
  "rosewill-4u-12-hotswap": { "name": "Rosewill 4U chassis (12 hot-swap bays)", "url": "https://www.amazon.com/dp/B097Y25FGK?tag=bido08-20" },
  "dell-optiplex-7060-micro-renewed": { "name": "Dell OptiPlex 7060 Micro (Renewed, i5-8500T, 16GB, 256GB)", "url": "https://www.amazon.com/dp/B08ZYT357P?tag=bido08-20" },
  "aqara-fp2": { "name": "Aqara Presence Sensor FP2", "url": "https://www.amazon.com/dp/B0BXWZMQJ3?tag=bido08-20" },
  "aqara-fp1e": { "name": "Aqara Zigbee Presence Sensor FP1E", "url": "https://www.amazon.com/dp/B0D5QPH3T6?tag=bido08-20" },
  "ambient-ws-2902": { "name": "Ambient Weather WS-2902", "url": "https://www.amazon.com/dp/B01N5TEHLI?tag=bido08-20" },
  "ambient-ws-2000": { "name": "Ambient Weather WS-2000", "url": "https://www.amazon.com/dp/B07GRBY9NP?tag=bido08-20" },
  "ecowitt-gw3001": { "name": "ECOWITT GW3001 (GW3000 gateway + WS90 array)", "url": "https://www.amazon.com/dp/B0DTPXKP8B?tag=bido08-20" },
  "ecowitt-gw3000": { "name": "ECOWITT GW3000 gateway", "url": "https://www.amazon.com/dp/B0DN1BF1NM?tag=bido08-20" }
}
```
