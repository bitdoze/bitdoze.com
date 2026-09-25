# To-Do: Amazon Affiliate Articles — bitdoze.com

_Working tracker built from `mastra-app/workspace/amazon-affiliate-content-plan.md` (2026-09-19), corrected and enriched with live product/SERP research done 2026-09-20._

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## 0. Corrections to the plan (verified 2026-09-20)

- **iVANKY FusionDock Ultra review ALREADY EXISTS** — `src/content/posts/ivanky-fusiondock-ultra-review.mdx` (published 2026-04-28) + ES version `src/content/posts/es/resena-ivanky-fusiondock-ultra.mdx`. The 446 impressions with "no page" means an indexing/ranking problem, not a missing article. → Task becomes: add affiliate links (the `AmazonProduct` block links to ivanky.com, not Amazon — no commission), verify indexing, resubmit to GSC.
- **Commission rates are better than planned**: Amazon US pays **2.5% on PC/PC Components** (not ~1%), 4% on "All Other", 3% Tools/Home Improvement. Accessories advantage is real but smaller (2.5%→4%, not 1%→4%). Source: official Table 1 in Associates Central — recheck before publishing rate graphics.
- **Coral TPU is dead for new Frigate builds**: driver repo archived April 2026, won't build on modern kernels, Frigate docs dropped the recommendation. Plan item 4.2 must pivot to **Hailo-8L** or **Intel iGPU + OpenVINO**. Also: Home Assistant **Yellow is discontinued** (Green $99 is current; Connect ZBT-2 $49 is the current Zigbee/Thread stick).
- **Beelink GTR9 Pro caveat**: 3.0★ on Amazon (17 ratings, ~⅓ one-star, complaints about the dual-10GbE — the exact feature it'd be recommended for). Prefer GMKtec EVO-X2, Framework Desktop, or Minisforum MS-S1 MAX as the lead in the LLM guide; mention GTR9 Pro with the caveat.
- **Prime Big Deal Days confirmed Oct 6–7, 2026** (Amazon press release, Sept 14). BF Nov 27, CM Nov 30 confirmed. The deals page should cover the Oct 6–7 event too — it's the warm-up.
- **ES gap is real**: 66 ES posts exist; neither hero guide (mini-PC, TB5 docks) has an ES version, and the ES iVANKY review has **zero Amazon links**.

## 1. Existing assets & conventions (don't reinvent)

- **Hero pages**: `best-mini-pc-home-server` (562 v/30d), `best-thunderbolt-5-docks-guide` (430 v/30d), `docker-containers-home-server` (2,989 v/30d), plus `docker-containers-business`.
- **Hardware pages live**: `asus-thunderbolt-5-dock-dc510-review`, `asus-vs-razer-thunderbolt-5-comparison`, `ivanky-fusiondock-ultra-review`, `best-32-inch-oled-monitors-guide`, `asus-rog-strix-oled-xg32ucwg-review`, `sound-blaster-gs5-review`, `ai-affiliate-websites-amazon`.
- **Link pattern in use**: `amzn.to` shortlinks inside `<Button text="Check X Price" link="..." />` + inline markdown links in tables. `AmazonProduct.astro` widget exists (built-in disclosure line). `go.bitdoze.com/*` external redirects already exist (hetzner, bunny, asus-dc510).
- **Disclosure pattern**: `<Notice type="warning" title="Affiliate Disclosure">` above first link (see TB5 guide line 16). Reuse on every affiliate page.
- **Mini-PC guide already covers**: GMKtec N150, Beelink SER9 Pro/SER10, MINISFORUM AI X1 Pro, MS-A2, EVO-X2, ASUS NUC 15 Pro, Mac mini M6 — the Local-LLM article is genuinely ~60% written.

## 2. Immediate fixes (this week, no new articles)

- [x] **Retitle `best-thunderbolt-5-docks-guide`** → "Best Thunderbolt 5 Docks 2026: CalDigit vs Anker vs Budget" (done 2026-09-21).
- [x] **Retitle `best-mini-pc-home-server`** → "Best Home Server Mini PCs 2026" (done 2026-09-21).
- [x] **Retitle `best-32-inch-oled-monitors-guide`** → "Best 32-Inch 4K OLED Monitors 2026: 9 Picks Compared" (done 2026-09-21).
- [x] **Add Proxmox section to `best-mini-pc-home-server`**: quick-picks table (MS-A2 / AI X1 Pro / N150) added at top of the virtualization section (done 2026-09-21).
- [x] **Fix iVANKY review monetization**: EN+ES now link to `/go/ivanky-fusiondock-ultra/` → Amazon `B0GBVMHJ3L` ($649.99, 4.3★). Disclosure added both languages. TODO: resubmit both to GSC for indexing (done 2026-09-21).
- [x] **Retrofit hardware blocks**: `docker-containers-home-server` got "No hardware yet?" block (GMKtec N150 + UGREEN DXP4800 Plus + CyberPower CP1500PFCLCD via /go/) + disclosure. TODO: repeat for other >200-v/30d software pages (done 2026-09-21).
- [x] **`/go/` redirect check**: all 32 `amzn.to` links migrated to `/go/<slug>/` across 7 posts; Plausible `affiliate_click` fires on every click. Missing disclosures added to 6 posts; 2 misplaced disclosures moved above first link. `go.bitdoze.com` partner redirects (Hetzner/Carrd/etc.) left as-is — different system (done 2026-09-21).

## 3. New articles — priority order

### Tier 1 (proven demand / wide-open SERPs)

- [x] **3.1 Black Friday Home Server & Homelab Deals 2026** ⏰ **MUST publish by Oct 5** (needs 6–8 wks to rank; BF = Nov 27, CM = Nov 30; cover Prime Big Deal Days Oct 6–7 as first update). Aggregates mini PCs, NAS, TB5 docks, UPS. All existing articles feed it; it feeds them back. Weekly updates through Cyber Monday.
- [x] **3.2 CalDigit TS5 vs Anker Prime TB5 comparison** — queries already hitting the site, no page. Verified specs:
  - **TS5**: $399.99, 15 ports, 4× TB5 (1 host + 3 downstream @80Gbps), 140W host PD, 2.5GbE, SD/microSD UHS-II, 240W PSU. TS5 Plus exists ($?): 20 ports, 36W downstream charging — mention.
  - **Anker Prime TB5 (A83B5)**: $399.99, 14-in-1, 2 downstream TB5, 140W host, 2.5GbE, HDMI 2.1 *or* DP 2.1 (not both), active cooling, cube 116×116×75mm / 1,086g. **Not compatible with Linux/ChromeOS/TB3-Windows** — good differentiator line.
- [x] **3.3 Best TB5/USB4 NVMe SSD enclosure** — SERP verified wide open (Reddit/forums only). Bench list: **OWC Express 1M2 80G** (~6,000 MB/s real w/ Gen4 SSD), **Acasis TB501Pro / Acasis 80Gbps** (Intel JHL9480 "Barlow Ridge"), **UGREEN 80Gbps** (fan, ~$259, 208g), **TerraMaster D1 SSD Pro**, **RayCue** (M4-mini-matching form factor), LaCie Pro5. Angle: sustained-write thermal throttle, "can it run my VM/Photos lib", dock vs direct-attach.
- [x] **3.4 Best NAS for Docker/Proxmox homelab** (narrowed angle per SERP check — don't fight PCMag on generic "best NAS"). Verified picks:
  - **UGREEN NASync DXP4800 Plus** (~$620): Pentium Gold 8505, **10GbE + 2.5GbE**, 4 SATA + 2 NVMe, HW transcoding (AV1), DDR5 to 64GB. Best hardware/$.
  - **TerraMaster F4-424 Pro** (~$499): i3-N305 8-core, DDR5 to 32GB, dual 2.5GbE. Compute/$ king; many install TrueNAS/Unraid.
  - **Synology DS925+** (~$600): software king (DSM, Active Backup free) but Ryzen V1500B, 2× 2.5GbE only, **no transcoding**. The "safe" pick.
  - **QNAP TS-464**: skip — aging silicon at premium price.
  - DIY angle: Jonsbo N4 box-out; **NAS vs mini-PC + USB-DAS** for Docker people (unique angle nobody covers).

### Tier 2 (fill the shelf)

- [x] **3.5 Best UPS for home server** — SERP verified genuinely open. (done 2026-09-21, refreshed same day: `best-ups-for-home-server.mdx`; prices and ratings verified 2026-09-21 via Bright Data Amazon MCP + tinyfish/web search.) Picks: **CyberPower CP1500PFCLCD** ($239.95, 1500VA/1000W pure sine, NUT-compatible, 4.5★/11,403, #1 category), **CyberPower CP850PFCLCD** ($169.95) budget, **APC BR1500MS2** ($299.99, 73 min @ 100W per APC), **CyberPower CP1500PFCRM2U** ($359.95, 2U rackmount value pick — new `/go/cyberpower-cp1500pfcrm2u/` slug; caveats: coil whine every 30s, mixed reliability), **APC SMC1500-2UC** ($775, third-party buybox), **EcoFlow DELTA 3** ($599, 1024Wh LiFePO4, no NUT). Must-cover: pure sine wave for active-PFC PSUs, ATX 3.0/3.1 hold-up 17ms→12ms vs 2-8ms UPS transfer, NUT `usbhid-ups` graceful-shutdown config, runtime-at-real-load table. Unavailable at check: **PR1500LCDRTXL2U** ("Currently unavailable", no restock date), **EcoFlow DELTA 2** (no active buybox, $899 third-party only).
- [x] **3.6 Best mini PC for local LLM/Ollama** (done 2026-09-21, `best-mini-pc-local-llm.mdx`). Bright Data Amazon prices that day: EVO-X2 128GB $3,499.99 (4.6/38), EVO-X2 64GB $2,199.99, MS-S1 MAX 128GB $3,799, GTR9 Pro $4,349 (4.1/289, not the old 3.0/17), DGX Spark $4,999.99. Mac Studio M5 Max $2,499 pre-order is 36GB (releases Sep 22). Framework has no Amazon listing. Speed numbers cited as ModelFit estimates (dense 70B ~5 tok/s), not a lab bench.
- [x] **3.7 Best mini PC for Proxmox** (done 2026-09-21, `best-mini-pc-proxmox.mdx`). MS-01 i9 barebone $669, configured 32GB/1TB $1,179, EQ14 $369 (16GB, not the old ~$189), MS-A2 barebone $799 with 1 left. i226-V caveat cites the Nov 2025 Proxmox forum thread. No buy button on unreviewed CWWK/Topton/Qotom boxes.
- [x] **3.8 Best 2.5/10GbE switch for homelab** (done 2026-09-21, `best-2-5-10gbe-switch-homelab.mdx`). TL-SG108S-M2 $59.99 (list $129.99, 4.8/545), SG105S-M2 $39.99, UGREEN 5x2.5G+10G SFP+ $49.99, MS308 $109.99, GigaPlus 16x2.5G+2x10G SFP+ $189.99. UniFi left as a store.ui.com note; Amazon hits that day were unreviewed.
- [x] **3.9 Best TB5 dock for MacBook Pro** (done 2026-09-21, `best-tb5-dock-macbook-pro.mdx`). Standalone page. TS5 $399.95, Anker Prime main listing $399.99 (4.1/465, not the $347 thin listing), TS5 Plus $499.99, FusionDock Ultra $649.99. 140W called out for 16-inch via Apple + ChargerLab + CalDigit's own copy.

### Tier 3 / backlog (Q4–Q1)

- [ ] **3.10 Best hardware for Home Assistant** — CORRECTED: HA Green $99 (plug-and-play), N100/N150 mini PC (~$150) via HAOS-Proxmox-VM, Pi 5 (weak for Frigate). ~~Coral TPU~~ → **Hailo-8L or Intel iGPU+OpenVINO**. ZBT-2 stick for Zigbee/Thread. Yellow discontinued.
- [ ] **3.11 $500 self-hosting starter kit** — complete build, 3 budgets ($300/$500/$1000), total-price table. One purchase decision = 5 affiliate clicks.
- [ ] **3.12 Best smart plug w/ energy monitoring** — **Tapo P110M** (Matter, energy via Matter 1.3 fw; caveat: energy sensors need internet for time sync), **Shelly PM Mini Gen3** (~€31, meter-only no relay), Shelly Plug. Pairs with power-consumption article.
- [ ] **3.13 Silent/fanless home server** — Qotom/fanless N150 boxes, quiet NAS, dB table. Near-zero competition.
- [ ] **3.14 CalDigit TS5 alternatives / cheaper-than** — alternatives-format pages (high CTR proven).
- [ ] **3.15 Gift guide for homelab nerds** — December, publish mid-Nov.
- [ ] **3.16 "What's in my rack 2026"** — personal stack tour + @webdoze video.
- [ ] **3.17 Mac mini as home server (honest take)** — counter-angle vs EVO-X2/SER10; monetize accessories even when readers buy the Mac.
- [ ] Second wave: NAS drives (IronWolf vs Exos vs WD Red Plus, SMR-vs-CMR), home-server SSDs, Pi 5 vs N150, TB5 cable reality check, <$200/$300 mini PCs, eGPU-over-TB5, KVM switches, 10" mini-rack.

## 4. Ops / infrastructure tasks

- [ ] **Methodology page** (`/methodology/`) — test-rig doc (idle/load watts, dB @30cm, sustained-write, iperf3). Competitive weapon vs vendor sites ranking for "best mini pc for home server".
- [ ] **TB5 dock database** — filterable static table: ports, PD watts, host-swap, price, verdict.
- [ ] **Mini PC database** — NIC count/speeds, RAM ceiling, idle watts, noise.
- [ ] **`/hardware/` hub** — always-current top pick per category; the "link in bio" URL.
- [ ] **Electricity cost calculator** — watts × kWh × 24/7 → monthly cost. Half-day Astro build.
- [ ] **Schema markup** — `ItemList` + `Product`/`Review` on guides with real reviews (SERP stars).
- [ ] **ES versions** of the two hero guides + new Tier-1s, with **Amazon.es links** (or geo-routing).
- [ ] **Quarterly refresh calendar** — prices/verdicts/"Updated <month>" badge per guide.

## 5. Compliance checklist (per page, non-negotiable)

- [ ] FTC + Amazon disclosure above first affiliate link (existing `Notice` pattern).
- [ ] No hardcoded Amazon prices — "check current price" or "as of <date>".
- [ ] No affiliate links in email/newsletter/PDF/ads (newsletter links to the blog page).
- [ ] `/go/` redirects fine, but don't mask that the destination is Amazon.
- [ ] Comparison table above the fold + "who should buy" line per pick + "what I'd buy" verdict + 40–60-word direct answer under H1 (AEO).
- [ ] Watch account health: 180-day no-sale closure risk — prioritize cheap-SKU converters first.

## 6. Cadence (realistic: 1 article + 1 retrofit/week)

| Wk | Article | Retrofit |
|---|---|---|
| Sep 22 | Meta rewrites + `/go/` audit + Plausible events | docker-containers hero |
| Sep 29 | **BF deals page live** + ES hero fix | Proxmox guides |
| Oct 6 | iVANKY monetization/indexing fix | self-hosting guides |
| Oct 13 | TB5 SSD enclosure | TB5 guide |
| Oct 20 | TS5 vs Anker | mini-PC guide |
| Oct 27 | NAS for Docker/Proxmox | Docker series |
| Nov 3 | Local LLM mini PC | AI/agent articles |
| Nov 10 | Proxmox mini PC | NAS/DIY articles |
| Nov 17 | TB5 dock database + methodology | — |
| Nov 24 | Gift guide + BF/CM peak push | all heroes |
| Dec 1 | Electricity calculator + UPS | power articles |
| Dec 8 | Rack tour + annual refresh | — |

**Monthly loop**: Plausible outbound-click review → top-clicked product with no review = next month's article. GSC: any affiliate page >500 impr with CTR <1% gets a title/desc test.

## 7. What NOT to write (plan §8, still valid)

- More single-product audio reviews (GS5 bounces at 21s avg).
- Generic "best monitor/keyboard" (Wirecutter/RTINGS own it, no angle).
- Pages where Amazon is incidental to an AI-tool topic.
