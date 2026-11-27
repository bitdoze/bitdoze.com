# New Affiliate Article Recommendations — SWE 2.1 research pass

_Research date: 2026-11-26. This is a new queue, not a copy of `amazon-affiliate-opus-plan2027.md`: everything already published is excluded, the remaining backlog is re-scored, and new Home Assistant / homelab gaps are added._

---

## 0. Executive summary

Write these first:

1. **Best Mini PC for Home Assistant** — the strongest first-party signal in this pass. The broad HA hardware page received **4,244 impressions in 28 days**, and ~**839 impressions** in its top query rows are specifically mini-PC queries at positions ~9–13. A dedicated spoke can win the click the hub is too broad to satisfy.
2. **Best PoE Switch for IP Cameras (Frigate/Home Assistant)** — fresh GSC demand (`best multi-gig poe switch 2026`: 113 impressions, pos 8.3), easy SERP, cheap reviewed Amazon products, and it completes the camera/doorbell cluster already published.
3. **Best Home Server Rack (19-inch)** — the 10-inch rack article is already at **2,700 impressions / 52 clicks in 28 days**. The step-up 19-inch query has volume, CPC, weak editorial competition, and a natural upgrade path.
4. **Best Energy-Monitoring Smart Plugs for Home Assistant** — the exact SERP is wide open (HA docs, forums, GitHub, Amazon), the products are cheap and well-rated, and it strengthens the fast-moving HA cluster.
5. **Best Thunderbolt 5 Cables** — harder keyword, but Bitdoze already owns the TB5 audience. The dock guide had **31,016 impressions in 28 days** and the enclosure guide converts well; cables are the missing low-ticket, high-frequency SKU.
6. **Best IP KVM for Homelab** — strong search demand, fresh price drops, intense Reddit interest, and perfect self-hosting fit. Needs a hands-on angle because Jeff Geerling owns the obvious SERP.
7. **Best OCuLink eGPU Dock** — good volume, weak editorial SERP, direct bridge from mini PCs to local-AI GPUs. New hardware (notably UGREEN LinkStation and MINISFORUM DEG2) makes this timely.
8. **Best Tablet & Wall Panel for a Home Assistant Dashboard** — easy SERP, active Reddit pain, low-to-mid ticket products, and a natural next HA spoke.

Fast follow / quick win: **Coral TPU alternatives for Frigate**. Frigate's current docs now say Coral is no longer recommended for new installs; competitors are only just appearing, Amazon has Hailo stock, and Bitdoze already ranks for Frigate cameras.

Big-ticket January bets: **low-profile GPU for home servers**, **GPU for local LLMs**, and **DGX Spark/Strix Halo alternatives**. They are attractive but need careful price framing because Amazon GPU prices are still bad.

---

## 1. Sources used

| Source | Date window / scope | What was used for |
|---|---|---|
| Google Search Console via Composio (`sc-domain:bitdoze.com`) | 2026-10-27 → 2026-11-23; top 2,500 query×page rows, top 500 pages, plus targeted regex/page-filter pulls | First-party demand, page momentum, cannibalization/spoke decisions |
| Ubersuggest via Composio `CUSTOM_UBERSUGGES_MATCH_KEYWORDS` | 20 seed groups, US/en, pulled 2026-11-26 | Volume, SEO difficulty, CPC, commercial intent |
| TinyFish MCP search + fetch | Live SERP checks and source fetches | SERP composition, freshness, official hardware guidance |
| Bright Data Amazon scraper | 486 Amazon search records across 20 product/keyword searches, pulled 2026-11-26 | ASINs, prices, ratings, rating depth, stock/listing quality |
| Bright Data Reddit scraper + Google social search | 5 full Reddit posts plus targeted social SERP checks | Community pain, language readers use, evidence that topics are actively discussed |
| Existing docs/current posts | `docs/to-do-affiliate-artices.md`, `docs/amazon-affiliate-opus-plan2027.md`, `src/content/posts/` | Removed already-published ideas, avoided duplicates, checked existing `/go/` slugs |

Caveats: Ubersuggest volumes are directional and US-only. Amazon prices below are a **2026-11-26 Black Friday-week snapshot** and must be re-checked on publish day. SERP verdicts use the existing bitdoze rule: EASY = few/no large editorial or retail results and visible forum/UGC results; MID = mixed niche/editorial/vendor results.

---

## 2. Current cluster evidence that shaped the queue

| Cluster/page | GSC 28d signal | Meaning |
|---|---:|---|
| `best-thunderbolt-5-docks-guide` | 31,016 impr, 81 clicks, pos 5.6 | Huge TB5 reach, but broad/low CTR. Use it as a feeder, not as proof every TB5 query is easy. |
| `best-tb5-nvme-enclosures` | 3,323 impr, 75 clicks, pos 6.8 | TB5 storage intent converts. Cables are the missing accessory spoke. |
| `best-home-assistant-hardware` | 4,244 impr, 43 clicks, pos 9.0 | HA is now a proven cluster. Mini-PC intent dominates its query mix. |
| `best-10-inch-mini-rack` | 2,700 impr, 52 clicks, pos 7.8 | Rack content works. A 19-inch step-up article is a natural expansion. |
| `best-mini-pc-local-llm` | 1,473 impr, 17 clicks, pos 8.3 | Local-AI hardware has demand, despite high ticket prices. |
| `best-nas-for-plex` | 1,130 impr, 11 clicks, pos 8.3 | New NAS/plex spokes are indexing and ranking fast. |
| `best-2-5-10gbe-switch-homelab` | 1,054 impr, 10 clicks, pos 9.7 | Networking hardware is relevant; PoE deserves its own spoke. |
| `best-cameras-frigate-home-assistant` | 547 impr, 6 clicks, pos 8.0 | Frigate/HA camera cluster is young but already visible. |
| `ugreen-vs-synology` | 426 impr, 3 clicks, pos 7.8 | NAS comparison cluster is viable. |
| `best-poe-doorbell-home-assistant` | 367 impr, 3 clicks, pos 10.0 | Another feeder into PoE switching/cameras. |

Important query detail: `best-home-assistant-hardware` top-100 query rows contain ~1,336 impressions total, of which ~839 are mini-PC-specific. Examples: `mini pc home assistant` 186 impr pos 12.8, `mini pc for home assistant` 171 pos 10.4, `home assistant mini pc` 163 pos 12.4, `best mini pc for home assistant` 145 pos 10.4.

---

## 3. Priority queue

Scoring: Demand, Ease, Fit, Money, Timing — each 1–5, total /25. This is a publishing prioritization score, not a traffic forecast.

| # | Article | Suggested slug | Primary evidence | D | E | F | M | T | Score |
|---:|---|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Best Mini PC for Home Assistant | `best-mini-pc-home-assistant` | ~839 mini-PC impr in existing HA page query rows | 4 | 4 | 5 | 4 | 5 | **22** |
| 2 | Best PoE Switch for IP Cameras | `best-poe-switch-ip-cameras` | 1,000/mo SD20 + 880/mo SD18; GSC already showing PoE queries | 5 | 5 | 5 | 3 | 4 | **22** |
| 3 | Best Home Server Rack (19-inch) | `best-home-server-rack` | 1,600/mo SD26, CPC $4.51; rack page already works | 4 | 4 | 5 | 4 | 4 | **21** |
| 4 | Best Energy-Monitoring Smart Plugs for HA | `best-energy-monitoring-smart-plugs-home-assistant` | exact SERP mostly HA docs/forums/GitHub; cheap high-rated SKUs | 3 | 5 | 5 | 4 | 4 | **21** |
| 5 | Best Thunderbolt 5 Cables | `best-thunderbolt-5-cables` | TB5 cluster already massive; 4,400/mo head term but SD43 | 5 | 3 | 5 | 4 | 4 | **21** |
| 6 | Best IP KVM for Homelab | `best-ip-kvm-homelab` | 1,900/mo SD25; Reddit 574-upvote Jeff Geerling thread | 4 | 3 | 5 | 4 | 5 | **21** |
| 7 | Best OCuLink eGPU Dock | `best-oculink-egpu-dock` | 1,300/mo SD28; new DEG2/UGREEN hardware cycle | 4 | 3 | 4 | 4 | 5 | **20** |
| 8 | Best Tablet & Wall Panel for HA Dashboard | `best-home-assistant-wall-panel` | SERP mostly HA community/Reddit; 20-upvote/73-comment active thread | 3 | 5 | 5 | 3 | 4 | **20** |
| 9 | Coral TPU Alternatives for Frigate | `coral-tpu-alternatives-frigate` | Frigate docs changed; Hailo terms 720/mo SD26 | 2 | 4 | 5 | 3 | 5 | **19** |
| 10 | Best Low-Profile GPU for a Home Server | `best-low-profile-gpu-home-server` | 2,900/mo SD25; home-server-specific angle still open | 5 | 4 | 4 | 3 | 3 | **19** |
| 11 | Best Fanless Mini PC for a Silent Home Server | `best-fanless-mini-pc-home-server` | 1,000/mo SD19, CPC $6.51; SERP mostly UGC/niche | 3 | 4 | 4 | 4 | 4 | **19** |
| 12 | Best GPU for Local LLMs | `best-gpu-for-local-llm` | high-ticket AI fit; SERP now crowded, prices ugly | 3 | 3 | 5 | 5 | 3 | **19** |
| 13 | DGX Spark Alternatives: Strix Halo Mini PCs | `dgx-spark-alternatives-strix-halo` | strong audience fit; high prices/SD make it a January bet | 3 | 3 | 5 | 5 | 3 | **19** |
| 14 | Best Mini UPS for Router & Modem | `best-mini-ups-router-modem` | cheap converter, moderate volume, seasonal power-outage relevance | 3 | 4 | 3 | 3 | 4 | **17** |
| 15 | Headless Mac mini Server Setup | `headless-mac-mini-setup` | good funnel, low basket size | 3 | 4 | 4 | 2 | 3 | **16** |
| 16 | Best SSD for NAS | `best-ssd-for-nas` | high volume but inflated SSD prices; wait for sane pricing | 5 | 3 | 4 | 2 | 2 | **16** |
| 17 | Best Used & Refurbished Mini PCs | `best-used-mini-pc-homelab` | fit is good, but Amazon Renewed listings churn and ratings are thin | 3 | 3 | 5 | 2 | 3 | **16** |

---

## 4. Detailed briefs — Tier 1

### 1. Best Mini PC for Home Assistant (HAOS, Proxmox & Frigate)

- **Slug:** `best-mini-pc-home-assistant`
- **Category/tags:** `self-hosting` · `home-assistant`, `mini-pc`, `frigate`
- **Working title:** “Best Mini PC for Home Assistant (2026): HAOS, Proxmox & Frigate Picks”

**Why now**

- First-party data is stronger than keyword-tool data here: the broad HA hardware article already receives hundreds of mini-PC impressions but sits around positions 9–13 because it is trying to answer every hardware question at once.
- Ubersuggest: `best mini pc for home assistant` 260/mo SD25; `home assistant mini pc` 170/mo SD40. The tools undercount the cluster compared with GSC.
- TinyFish SERP: no impossible Wirecutter/RTINGS-type competitor, but it is no longer empty — minilabhq, HA community threads, jrattechworks, Geekom, smarthomeassistant, littlecompute. Verdict: **MID-EASY**, winnable because Bitdoze already has topical authority and real homelab framing.
- Social: HA community threads are active; Bright Data social search surfaced multiple “what mini PC for HA?” threads.

**Angle**

Answer the exact buying question: “Which small box should run Home Assistant for the next 5 years?” Split by use case: HAOS bare metal for most people, Proxmox VM for homelabbers, Frigate/OpenVINO for cameras, fanless for bedroom/office, and when HA Green is the better no-effort answer.

**Must cover**

- HAOS bare metal vs Proxmox VM, with a recommendation tree.
- Intel N100/N150 vs older used ThinkCentre/OptiPlex vs HA Green vs Raspberry Pi.
- Quick Sync/OpenVINO for Frigate; when to add Hailo.
- RAM/storage minimums: 8GB enough for HAOS, 16GB preferred for Proxmox/Frigate, NVMe over SD/eMMC.
- Power draw and 24/7 cost.
- Correcting the current EQ14/EQ13 uncertainty (see §7).

**Products to verify before writing**

Existing slugs: `beelink-eq14`, `beelink-mini-s13`, `asus-nuc-14-essential-n150`. Needed checks: Beelink EQ13 (Frigate docs currently prefer it), GMKtec G3/N150, MeLE Quieter DL/4C for the fanless pick, HA Green direct link, Connect ZBT-2.

**Internal links**

From `best-home-assistant-hardware` with exact-match anchor “best mini PC for Home Assistant”; from `best-cameras-frigate-home-assistant`, `raspberry-pi-5-vs-mini-pc`, `best-mini-pc-home-server`, `best-mini-pc-proxmox`. Cut the hub’s mini-PC detail to a summary so the pages do not compete.

---

### 2. Best PoE Switch for IP Cameras (Frigate NVR + VLANs)

- **Slug:** `best-poe-switch-ip-cameras`
- **Category/tags:** `self-hosting` · `poe`, `frigate`, `networking`
- **Working title:** “Best PoE Switch for IP Cameras (2026): Frigate, VLANs & Power Budgets”

**Why now**

- Ubersuggest: `poe switch for ip camera` **1,000/mo SD20**; `poe switch for cameras` **880/mo SD18**; `best poe switch for ip cameras` 40/mo SD17.
- GSC already sends switch/PoE intent: `best multi-gig poe switch 2026` 113 impressions pos 8.3; 8-port 2.5G PoE variants at positions ~9–10.
- TinyFish SERP: Level1 forum, router-switch vendor FAQ, YouTube, IPCamTalk, TP-Link product pages, Amazon, Reddit. **EASY/MID**; no big editorial moat.
- Bright Data Reddit: recurring confusion around power budget, whether a separate PoE switch is needed, and VLAN isolation.

**Angle**

Not a generic networking roundup. Frame it as the switch that powers a local Frigate/Home Assistant camera network: power budget per port, total budget, fanless noise, VLAN isolation, uplink speed, and when 2.5GbE actually matters.

**Fresh Amazon snapshot (2026-11-26)**

| Product | Price | Rating | Note |
|---|---:|---:|---|
| TP-Link LS108GP 8-port PoE gigabit (`B0CWJMRTWY`) | $49.99 | 4.6★/709 | easy budget pick |
| REOLINK RLA-PS1 8×PoE + 2 uplinks (`B0BWHKQ5N9`) | $63.74 | 4.6★/448 | good camera-bundle fit |
| 10-port full-gigabit PoE+ (`B07KPLZ5Q2`) | $32.28 | 4.6★/156 | cheap, verify seller/brand |
| TP-Link TL-SG116P 16-port (`B0C4X7VZV9`) | $101.15 | 4.6★/296 | larger camera count |

Existing slugs already in `affiliate-links.json`: `tp-link-tl-sg105pp-m2`, `yuanley-8-port-2-5g-poe`, `ubiquiti-flex-2-5g-poe`.

**Internal links**

From `best-cameras-frigate-home-assistant`, `best-poe-doorbell-home-assistant`, `best-2-5-10gbe-switch-homelab`, `best-home-assistant-hardware`; out to the mini-PC/Frigate detector articles.

---

### 3. Best Home Server Rack (19-inch): Wall-Mount, Open Frame & Cabinet

- **Slug:** `best-home-server-rack`
- **Category/tags:** `self-hosting` · `homelab`, `server-rack`, `networking`
- **Working title:** “Best Home Server Rack (2026): 12U Wall-Mount, Open Frame & Cabinet Picks”

**Why now**

- Ubersuggest: `home server rack` **1,600/mo SD26**, CPC $4.51; `wall mount network rack` 880/mo SD20; `rackmount pc case` another 1,600/mo SD26 for the follow-up article.
- Bitdoze proof: `best-10-inch-mini-rack` already at 2,700 impressions/52 clicks in 28 days. Rackmount UPS queries are landing on the UPS article at positions 28–70 because no correct page exists.
- TinyFish SERP: mtlynch personal build, YouTube, Quora, niche affiliates, Sysracks/Amazon. **EASY/MID**. There is no big editorial lockout.

**Angle**

The upgrade path after a 10-inch RackMate: what happens when the UPS, switch, NAS, and servers no longer fit. Make depth the hero — most first-time buyers purchase a shallow network cabinet and then discover a server or rack UPS does not fit.

**Fresh Amazon snapshot**

| Product | Price | Rating | Use |
|---|---:|---:|---|
| Tecmojo 12U open-frame (`B0CSJR2RZB`) | $76.42 | 4.5★/495 | budget/open frame |
| Tecmojo 12U wall cabinet (`B0BMDCSD8N`) | $144.42 | 4.5★/208 | enclosed wall mount |
| VEVOR 12U adjustable-depth open frame (`B0C64X8J8R`) | $85.41 | 4.0★/969 | adjustable depth, mixed rating |
| AxcessAbles 12U rack with wheels (`B07XWFTCT9`) | $159.99 | 4.5★/563 | floor-standing AV/server crossover |

Also check StarTech/NavePoint 4-post options, shelves, blanking panels, PDU, brush panel, and the rack UPS slugs.

**Cannibalization rule**

Do not re-review 10-inch RackMate products here. One sentence: “If you only have mini PCs and a small switch, read the 10-inch mini-rack guide instead.”

---

### 4. Best Energy-Monitoring Smart Plugs for Home Assistant

- **Slug:** `best-energy-monitoring-smart-plugs-home-assistant`
- **Category/tags:** `self-hosting` · `home-assistant`, `smart-plug`, `energy`
- **Working title:** “Best Energy-Monitoring Smart Plugs for Home Assistant (2026)”

**Why now**

- Ubersuggest: broad `smart plug energy monitoring` 1,000/mo but SD40; HA-specific `home assistant smart plug` **210/mo SD22**. Use the HA-specific title, not the broad consumer title.
- TinyFish SERP for `smart plug energy monitoring home assistant`: Home Assistant docs, HA community threads, GitHub integrations, smart-wired, Amazon. **EASY** — exactly the kind of SERP bitdoze can own with a practical guide.
- Social proof: Bright Data social search surfaced current r/homeassistant threads asking for power-monitoring plugs, Matter/WiFi plugs with live usage, and safe devices to monitor.
- Cheap SKUs help affiliate account health and can attach to the electricity/homelab-power content.

**Angle**

Which plugs expose usable power/energy entities in Home Assistant locally, which require cloud, which report frequently enough for the Energy dashboard, and which are safe for heaters/servers/servers-on-a-plug (mostly: do not do that).

**Fresh Amazon snapshot**

| Product | Price | Rating | Note |
|---|---:|---:|---|
| Tapo P110M Matter 4-pack (`B0DKG52WQ4`) | $28.69 | 4.4★/764 | best-value Matter pick |
| Kasa KP125MP4 Matter 4-pack (`B0BYGMR4DX`) | $35.99 | 4.3★/23 | low rating count; verify listing |
| Tapo P115 Wi-Fi 2-pack (`B0D7FQ93QN`) | $13.98 | 4.5★/14 | very cheap, verify energy entities |
| Tapo P316M Matter power strip (`B0F5LNYTR7`) | $39.99 | 4.5★/370 | multi-outlet pick |

Must verify: whether Tapo P110M energy sensors still require internet/time sync, local vs cloud behavior, Home Assistant entity names, and Matter-over-WiFi vs Thread requirements.

---

### 5. Best Thunderbolt 5 Cables (Tested With Docks & NVMe Enclosures)

- **Slug:** `best-thunderbolt-5-cables`
- **Category/tags:** `gadgets` · `thunderbolt-5`, `cables`, `macbook`
- **Working title:** “Best Thunderbolt 5 Cables (2026): Tested for 80Gbps, 240W & Long Runs”

**Why now**

- Ubersuggest: `thunderbolt 5 cable` **4,400/mo SD43** (stretch), `best thunderbolt 5 cable` 260/mo SD37, but brand/secondary terms are easier: `anker prime thunderbolt 5 cable` 1,900/mo SD24, `owc thunderbolt 5 cable` 480/mo SD23, `thunderbolt 5 cable for macbook` 210/mo SD20.
- TinyFish SERP: OWC, Cable Matters, MacRumors, Reddit, Dell/StarTech, Amazon. Mostly vendors + UGC, not editorial. **MID but winnable** with real tests.
- Bitdoze already has the testbed and audience: TB5 docks, TB5 NVMe enclosures, MacBook dock guide. This is the obvious accessory spoke.
- Cheap accessory SKU with frequent purchase behavior.

**Moat**

Measure actual throughput with the OWC/Acasis/TerraMaster enclosures and docks already covered. Include charging wattage, length, passive vs active, Thunderbolt 3/4 backward compatibility, display support, and “which cable is in the box versus which one you should buy.”

**Fresh Amazon snapshot**

| Product | Price | Rating | Note |
|---|---:|---:|---|
| Anker Prime TB5 cable 3.3ft (`B0DXZCXK2C`) | $35.99 | 4.7★/739 | default pick |
| UGREEN 80Gbps USB4/TB5 3.3ft (`B0DP9R2LRG`) | $17.09 | 4.7★/16 | cheap, low ratings |
| Apple TB5 Pro cable 1m (`B0FH5PWC69`) | $69 | 4.5★/163 | Apple tax/control pick |
| Silkland USB4/TB5 5ft (`B0FB3YXRBF`) | $23.68 | 4.6★/583 | long-ish budget pick |

Existing slugs: `anker-prime-tb5-cable`, `cable-matters-tb5-cable`. Add/verify OWC, Apple, Silkland, UGREEN, CalDigit.

---

### 6. Best IP KVM for Homelab: Comet vs JetKVM vs PiKVM vs NanoKVM

- **Slug:** `best-ip-kvm-homelab`
- **Category/tags:** `self-hosting` · `ip-kvm`, `homelab`, `remote-access`
- **Working title:** “Best IP KVM for Homelab (2026): Comet vs JetKVM vs PiKVM”

**Why now**

- Ubersuggest: `ip kvm switch` **1,900/mo SD25**; `kvm over ip switch` 320/mo SD20; `pikvm alternative` 70/mo SD29.
- Bright Data Reddit scrape: Jeff Geerling’s “I tested every IP KVM” thread has **574 upvotes / 109 comments**; a separate “Best KVM over IP” thread has 39 upvotes / 36 comments. This is active, high-intent homelab demand.
- TinyFish SERP is harder than the old plan suggested: Jeff Geerling, Reddit, XDA, niche roundup sites. Still no RTINGS/Wirecutter-type lockout. Verdict **MID**, but bitdoze can win with a narrower self-hosted/Tailscale angle.

**Angle**

The use case is not “KVM switch.” It is “fix the server when SSH, Tailscale, or the OS is dead.” Compare latency, BIOS/UEFI access, virtual media, PoE vs Wi-Fi, multiport vs single-node, security exposure, and whether Tailscale is built in or needs another box.

**Fresh Amazon snapshot**

| Product | Price | Rating | Note |
|---|---:|---:|---|
| GL.iNet Comet PoE (`B0FDQJ1V7J`) | $81.19 | 4.6★/439 | Black Friday price; best value if stable |
| GL.iNet Comet Pro (`B0G1BS7WWK`) | $143.99 | 4.5★/464 | Wi-Fi 6 / 4K passthrough |
| JetKVM (`B0FY63H6NH`) | $143.99 | 4.5★/100 | compact favorite |
| GL.iNet Comet X 4-port (`B0H5QCG2P7`) | $279.99 | 4.3★/52 | multi-server pick |
| PiKVM V4 Mini (`B0CV93FNLF`) | $309.95 | 4.4★/42 | most capable/open, expensive |

Existing slug: `glinet-comet-kvm`. Add/verify the rest.

---

### 7. Best OCuLink eGPU Dock (and Mini PCs That Have OCuLink)

- **Slug:** `best-oculink-egpu-dock`
- **Category/tags:** `gadgets` · `egpu`, `oculink`, `mini-pc`
- **Working title:** “Best OCuLink eGPU Dock (2026): DEG2, LinkStation & Budget Docks”

**Why now**

- Ubersuggest: `oculink egpu` **1,300/mo SD28**; `oculink egpu dock` 320/mo SD28; `mini pc with oculink` 320/mo SD24.
- TinyFish SERP: egpu.io, niche review sites, ServeTheHome, Minisforum store, UGREEN product pages, Amazon. **MID/EASY**; no broad editorial dominance.
- TinyFish fetch shows the market moving beyond “bare PCB + PSU”: MINISFORUM DEG2 combines OCuLink with USB4 v2/TB5 compatibility, and UGREEN is marketing a LinkStation eGPU dock with OCuLink 64Gbps + Thunderbolt 5 + built-in 850W PSU.
- Natural bridge article: mini-PC readers, local-LLM readers, gaming/handheld readers.

**Angle**

Explain when OCuLink beats USB4/TB5 (direct PCIe, lower overhead), when it does not matter (LLM inference after the model is loaded), hot-plug/boot-order caveats, PSU sizing, and which mini PCs actually expose the port.

**Fresh Amazon snapshot**

| Product | Price | Rating | Note |
|---|---:|---:|---|
| MINISFORUM DEG2 (`B0H41GSRB4`) | $247 | 4.2★/111 | most credible mainstream pick |
| RGEEK PCIe 5.0 x4 OCuLink dock (`B0H5W4YFNH`) | $105.99 | 4.6★/17 | cheap, verify claims |
| Generic PCIe 4.0 x4 dock (`B0F9FBN5P5`) | $76.49 | 4.4★/93 | budget pick, verify seller |
| Generic OCuLink dock (`B0H3JGHBQQ`) | $76.49 | 4.6★/36 | budget alternative |

Existing slug: `minisforum-deg1`. Add/verify DEG2, AOOSTAR AG02, UGREEN LinkStation if/when an Amazon listing exists, and OCuLink-equipped mini PCs.

---

### 8. Best Tablet & Wall Panel for a Home Assistant Dashboard

- **Slug:** `best-home-assistant-wall-panel`
- **Category/tags:** `self-hosting` · `home-assistant`, `dashboards`, `tablets`
- **Working title:** “Best Tablet & Wall Panel for Home Assistant Dashboards (2026)”

**Why now**

- Ubersuggest: `home assistant tablet` 320/mo SD22; `home assistant wall panel` 320/mo SD22; `best tablet for home assistant` 140/mo SD19.
- TinyFish SERP: almost entirely HA community, Reddit, Facebook, one niche smart-home site. **EASY**.
- Bright Data Reddit scrape: “What tablet are you using for your HA wall dashboard?” — **20 upvotes / 73 comments** in Oct 2026. Readers mention laggy dashboards, always-plugged battery protection, wall mounts, Fully Kiosk/Kiosk Satellite.
- Complements the HA mini-PC article without competing with it.

**Angle**

The real problem is not the tablet; it is the always-on wall setup: charging/battery health, wake-on-motion, kiosk software, wall mount, cable/PoE path, and dashboard performance.

**Fresh Amazon snapshot**

| Product | Price | Rating | Note |
|---|---:|---:|---|
| Lenovo Idea Tab 11 (`B0FGYCJ7NJ`) | $159.99 | 4.3★/834 | best initial value pick; verify exact model/charging features |
| Lenovo Tab M11 (`B0CQMGKBK9`) | $229 | 4.4★/14 | weaker listing depth |
| Amazon Alexa Tablet 11 64GB (`B0DN7GYYV2`) | $199.99 | 4.0★/145 | new model; check kiosk/sideloading tradeoffs |
| Samsung Galaxy Tab A11+ (`B0FVXMHHRP`) | $199.99 | 4.5★/3 | promising but very thin ratings |
| Shelly Wall Display XL (`B0FPG8CNSZ`) | $279.99 | 4.2★/80 | built-in panel alternative, not a tablet |

Also source: flush wall mounts, USB-C angled cables, PoE-to-USB-C splitter, a smart plug for charge cycling (cross-link to the energy-plug article).

---

## 5. Tier 2 — fast follow and January bets

### 9. Coral TPU Alternatives for Frigate: Hailo-8/8L vs OpenVINO vs GPU

- **Slug:** `coral-tpu-alternatives-frigate` · **Category/tags:** `self-hosting` · `frigate`, `home-assistant`, `ai-accelerator`
- **Why:** Frigate docs fetched 2026-11-26 say Coral is **no longer recommended for new installations** except special low-power/hardware-limited cases. Hailo-8L inference times are ~10–11ms on default models; OpenVINO covers Intel iGPU/Arc/NPU.
- **Keywords:** `hailo 8l` 720/mo SD26; `coral tpu alternative` 50/mo SD25; `frigate ai accelerator` 40/mo SD28.
- **SERP:** niche competitors appearing in Nov 2026, but no entrenched editorial winner. Publish fast.
- **Amazon snapshot:** Hailo-8 M.2 26 TOPS `B0FBFTW5QJ` $214.99 4.3★/19; Waveshare Hailo-8 `B0D928WG5L` $219.99 4.5★/42; Pi AI HAT+ `B0DM956761` $109.99 but weak/zero ratings.
- **Angle:** “Do not buy a Coral in 2026 unless…” then decision tree: N150/OpenVINO for 1–3 cameras, Hailo-8L for small multi-camera, Hailo-8 for 6–10 cameras, GPU only if already present.
- **Urgent cross-link:** update `best-cameras-frigate-home-assistant` and `best-home-assistant-hardware` to point here.

### 10. Best Low-Profile GPU for a Home Server

- **Slug:** `best-low-profile-gpu-home-server` · **Category/tags:** `self-hosting` · `gpu`, `plex`, `homelab`
- **Keywords:** `low profile gpu` 2,900/mo SD25; `best low profile gpu` 590/mo SD31; `best gpu for local llm` only 170/mo but SD16.
- **Angle:** not gaming. Plex/Jellyfin transcodes per watt, Arc AV1 encode, OpenVINO/Frigate, slot-power and half-height bracket fit.
- **Amazon snapshot:** MSI RTX 3050 LP 6GB `B0CTJZCJH1` $259.99 4.5★/396; GIGABYTE RTX 5060 LP 8GB `B0F8LNS15L` $509.99 4.4★/93; GT 1030 `B0CBL3HQ68` $109.99 4.4★/460 but usually pointless for modern transcoding. Old plan’s Arc A310 LP was $271.65 — too expensive; be honest.
- **Caution:** many readers do not need a GPU at all. Say when N150/Core iGPU is enough and send larger AI builds to the GPU/local-LLM article.

### 11. Best Fanless Mini PC for a Silent Home Server

- **Slug:** `best-fanless-mini-pc-home-server` · **Category/tags:** `self-hosting` · `mini-pc`, `homelab`, `fanless`
- **Keywords:** `fanless mini pc` 1,000/mo SD19, CPC $6.51; `silent home server` 30/mo SD23.
- **SERP:** XDA plus Reddit, dev.to, small blogs, Amazon, Level1. **EASY/MID**.
- **Social:** r/homelab threads ask for fully fanless bedroom servers and low-power 24/7 boxes.
- **Amazon snapshot:** MeLE Quieter 4C N150 16/512 `B0DZGRLFLQ` $428.99 4.5★/350; MeLE Cyber X1 N150 `B0FMF46W8V` $428.99 4.5★/30; MeLE Quieter DL dual-2.5GbE `B0H1WT6CFP` $303.99 5★/2. Several cheaper SE-grade listings have missing ratings.
- **Angle:** silence has a cost: thermals, sustained power limits, SSD throttling, fewer NICs/storage options, and when a quiet fan curve beats fanless.

### 12. Best GPU for Local LLMs (VRAM per Dollar)

- **Slug:** `best-gpu-for-local-llm` · **Category/tags:** `ai` · `local-llm`, `ollama`, `gpu`
- **Keywords:** `best gpu for ai` 1,000/mo SD27; `best gpu for local llm` 170/mo SD16; `low profile gpu` is adjacent but separate.
- **SERP change:** now crowded with thin AI-affiliate pages. Still winnable if bitdoze is more honest and practical: VRAM tier, context size, model examples, bandwidth, power, CUDA/ROCm/Vulkan, and “do not buy at this price.”
- **Amazon snapshot:** RTX 5060 Ti 16GB $799.99–829.99; RTX 5070 Ti 16GB roughly $1,499–1,781; RTX 3090 24GB renewed/new around $1,949–2,219; Radeon AI PRO R9700 32GB $1,899–2,342. Prices remain ugly.
- **Angle:** the article should make people trust bitdoze even when it says “do not buy today.” Include local/cloud break-even and when Strix Halo/Mac Studio beats a GPU.

### 13. DGX Spark Alternatives: Strix Halo Mini PCs Compared

- **Slug:** `dgx-spark-alternatives-strix-halo` · **Category/tags:** `ai` · `local-llm`, `strix-halo`, `mini-pc`
- **Keywords:** `strix halo mini pc` 1,300/mo SD34; `dgx spark alternative` 720/mo SD32; `best mini pc for ai` 170/mo SD16.
- **Amazon snapshot:** NVIDIA DGX Spark `B0FWJ16CCH` $6,949.99 4.5★/130; GMKtec EVO-X2 `B0F53QXNGH` $2,199.99 4.3★/80; MINISFORUM MS-S1 Max `B0G31Z6WQ7` $3,959 4.7★/16; ACEMAGIC M1A PRO+ `B0HFR9ZKL4` $3,799.99 4.4★/108.
- **Angle:** not a “best mini PC” repeat. A comparison of unified memory, bandwidth, Linux/CUDA/ROCm friction, ports, 10GbE, thermals, warranty, and actual model classes each box can run.
- **Cannibalization:** keep `best-mini-pc-local-llm` as the broad roundup; this is the DGX/Strix comparison page.

---

## 6. Tier 3 — opportunistic / hold

### 14. Best Mini UPS for Router & Modem

- **Slug:** `best-mini-ups-router-modem` · **Category/tags:** `self-hosting` · `ups`, `networking`, `homelab`
- **Keywords:** `ups for router` 720/mo SD29; `mini ups for router` 390/mo SD27; `best ups for router and modem` 110/mo SD26.
- **Amazon snapshot:** CyberPower ST425 `B07GZR981Y` $59.95 4.4★/55; TalentCell 27,000mAh `B07WLD32RP` $64.99 4.2★/739; Marsriva KP3 `B0FF9PQ528` $31.34 4.5★/87; generic 18W DC UPS `B0FCS21J17` $25.99 4.3★/119.
- **Why not higher:** small basket and some listings are generic. Still a good December/power-outage quick win.

### 15. Headless Mac mini Server Setup

- **Slug:** `headless-mac-mini-setup` · **Category/tags:** `self-hosting` · `mac-mini`, `headless`, `openclaw`
- **Keywords:** `hdmi dummy plug` 1,300/mo SD29; `mac mini home server` 320/mo SD26; `headless mac mini` 260/mo SD24.
- **Angle:** setup guide with small product box, not a roundup: auto-login, Screen Sharing, power loss restart, dummy plug, remote backup, Tailscale.
- **Why not higher:** low basket size. Use it to strengthen the Mac/OpenClaw funnel.

### 16. Best SSD for NAS

- **Slug:** `best-ssd-for-nas` · **Category/tags:** `self-hosting` · `nas`, `ssd`, `storage`
- **Keywords:** `ssd for nas` 4,400/mo SD29; `best ssd for nas` 480/mo SD31; `nvme ssd for nas` 170/mo SD20.
- **Hold reason:** the previous plan found severe price anomalies. Do not publish a recommendation page until SSD listings are sane; otherwise the honest answer is “do not buy.” Recheck in January.

### 17. Best Used & Refurbished Mini PCs for a Homelab

- **Slug:** `best-used-mini-pc-homelab` · **Category/tags:** `self-hosting` · `mini-pc`, `homelab`, `refurbished`
- **Keywords:** `used mini pc` 1,000/mo SD25; `refurbished mini pc` 880/mo SD22.
- **Hold reason:** Amazon Renewed listings churn, ratings are thin, and the best deals are often eBay/local rather than Amazon. Write only if the article can be honest about that and still include 2–3 stable Amazon Renewed picks.

---

## 7. Urgent retrofits before/as these are written

1. **Verify the EQ14 problem.** Current bitdoze copy uses the Beelink EQ14 as the default HA/Proxmox small box. Frigate’s current hardware docs recommend the **Beelink EQ13** and say the **EQ14 has known compatibility issues**. Before publishing the HA mini-PC article, verify what exactly breaks (Frigate-only? OpenVINO? BIOS? NIC?) and update `best-home-assistant-hardware`, `best-mini-pc-proxmox`, and `best-mini-pc-home-server` if needed. This is a trust issue, not just SEO.
2. **Add forward links.** Add a short “PoE switch guide coming”/direct link section in `best-cameras-frigate-home-assistant` and `best-poe-doorbell-home-assistant` once the PoE article exists.
3. **Use the hubs as feeders.** Add exact-match links from `best-thunderbolt-5-docks-guide` and `best-tb5-nvme-enclosures` to the cable article; from `best-10-inch-mini-rack` to the 19-inch rack article; from `best-home-assistant-hardware` to the HA mini-PC, wall-panel, smart-plug, and Frigate-accelerator spokes.
4. **Re-check Black Friday pricing.** Several prices in this pass are marked as Black Friday deals. Do not hardcode them without “as of” language; re-check before adding `/go/` slugs.

---

## 8. Non-article multipliers to do alongside the queue

These are not new posts, but they can produce more affiliate revenue than another marginal roundup:

1. **Geo-route `/go/` links where legal and practical.** Prior plan data says many affiliate clickers are outside the US. A US-only Amazon link wastes that demand. Before changing anything, audit Amazon Associates Operating Agreement constraints and implement locale-aware redirects transparently; keep the visible destination honest on the `/go/` page.
2. **Create Spanish versions for the best hardware spokes.** ES pages already show real demand: `es/mejores-gadgets-2027` had 253 impressions/37 clicks in 28 days, `es/mejores-nas-homelab-docker-proxmox` 292/13, and `es/mejor-hardware-home-assistant` 363/13. Translate the HA mini-PC, PoE switch, and rack articles first if the EN versions prove out.
3. **Refresh the existing Black Friday/gift pages instead of writing new gift guides.** `black-friday-home-server-deals`, `tech-gifts-homelab-owners`, `gifts-for-programmers`, and `best-desk-setup-gadgets-2027` already exist and have impressions. The new-consumer-gift window is too late for a brand-new post to rank.
4. **Fix wrong or weak `/go/` destinations before adding more products.** Reuse verified slugs where they exist, and audit low-rated/renewed/marketplace listings before creating new slugs.
5. **Use IndexNow/Bing Webmaster Tools after publishing.** Google is still the main prize, but fast Bing indexing is cheap incremental distribution for buyer-intent hardware pages.
6. **Improve affiliate click reporting by cluster.** The Plausible event already exists. Add a lightweight monthly report grouping `/go/` slugs by TB5, HA, NAS/Frigate, rack/networking, mini-PC, and AI hardware so the next research pass knows which products actually convert, not just which pages rank.

---

## 9. Do not write these now

Already covered by live posts — do not duplicate them as new articles:

- `best-hard-drives-for-nas`, `best-nas-for-plex`, `ugreen-vs-synology`, `migrate-synology-to-ugreen-nas`, `nas-build-under-500`
- `best-cameras-frigate-home-assistant`, `best-poe-doorbell-home-assistant`, `best-zigbee-sensors-home-assistant`
- `best-mini-pc-home-server`, `best-mini-pc-local-llm`, `best-mini-pc-plex-jellyfin`, `best-mini-pc-proxmox`, `best-mini-pc-opnsense`
- `best-thunderbolt-5-docks-guide`, `best-tb5-nvme-enclosures`, `best-tb5-dock-macbook-pro`, `best-mac-mini-dock`
- `best-10-inch-mini-rack`, `best-rack-mount-ups-homelab`, `best-ups-for-home-server`
- `gifts-for-programmers`, `tech-gifts-homelab-owners`, `best-tech-gadgets-2027`, `best-desk-setup-gadgets-2027`, `black-friday-home-server-deals`

- **`best-nas-case-diy-nas` as a standalone article** — `nas-build-under-500` was published on 2026-11-18 and already owns the DIY parts-list intent. Refresh/expand it after GSC data accumulates instead of splitting the topic immediately.
- **TrueNAS/Unraid hardware guide right now** — useful later, but the DIY NAS article needs time; combine HBA/board advice there first unless GSC shows separate demand.
- **Best security cameras without subscription** — broad consumer SERP and overlapping the just-published Frigate camera guide. Revisit only after that page reaches top 5.
- **Best keyboard for programming / monitor light bar / 5K monitor** — off-core or historically weak conversion for this site.
- **Omada vs UniFi** — easy SERP but low volume and awkward Amazon availability for UniFi.
- **Standalone 10GbE NIC roundup** — `10g network card` volume exists (1,900/mo) but SD40. Fold NIC advice into the switch/rack content first.
- **More single-product audio/monitor reviews** — already proven weak engagement/conversion.

---

## 10. Suggested four-week publishing sequence

| Week | Primary article | Secondary/quick win | Why |
|---|---|---|---|
| Nov 27–Dec 3 | **Best Mini PC for Home Assistant** | EQ14/EQ13 correction retrofit | strongest first-party signal; urgent trust fix |
| Dec 4–Dec 10 | **Best PoE Switch for IP Cameras** | **Coral TPU alternatives** | completes Frigate/HA camera cluster while it is fresh |
| Dec 11–Dec 17 | **Best Home Server Rack** | **Energy-monitoring smart plugs** | rack demand proven; cheap HA converter balances basket |
| Dec 18–Dec 24 | **Best Thunderbolt 5 Cables** | **HA wall panel/tablet** | TB5 authority + easy HA SERP |
| January | **IP KVM** then **OCuLink eGPU** | low-profile GPU if prices cooperate | bigger hands-on pieces after the quick cluster wins |

If only two articles can be written, write **Best Mini PC for Home Assistant** and **Best PoE Switch for IP Cameras**. They have the best combination of owned demand, cluster fit, SERP openness, and monetizable products.

---

## 11. Per-article execution checklist

For every article:

- 40–60-word direct answer under H1.
- Comparison table above the fold.
- Exactly one valid category and 1–3 specific tags.
- Affiliate disclosure above the first `/go/` link.
- “Who should buy” line per pick and a decisive “what I would buy” verdict.
- Prices only with “as of 2026-11-26” or “check current price.”
- Link back to the relevant hub with exact-match but natural anchors.
- Re-check Amazon listing rating/seller before creating a `/go/` slug.
- Add negative guidance when warranted. The trust differentiator is saying “do not buy this at today’s price” when the listing is bad.
