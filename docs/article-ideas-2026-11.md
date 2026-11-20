# Bitdoze Article Recommendations — November 2026

**Date:** 2026-11-20  
**Sources:** Composio Ubersuggest (US monthly volume, SEO difficulty, CPC, Google Autocomplete), TinyFish web search (`r/selfhosted`, `r/homelab`, `r/LocalLLaMA`, `r/devops`, GitHub Trending), and Bitdoze daily news digests (Nov 14–20, 2026).  
**Deduplication:** Checked against all 420 published EN posts in `src/content/posts/`. None of these articles exist on bitdoze.com yet.

---

## Publishing Queue (Recommended Order)

### Sprint 1 — Fastest Traffic + Highest ROI
- [ ] **OpenCode Zen vs OpenCode Go** (`opencode zen`: 5,400/mo, SD 16)
- [ ] **Claude Code vs OpenCode vs Codex CLI (2026)** (`codex vs claude code`: 14,800/mo, SD 7)
- [ ] **Oh My OpenCode & Best OpenCode Plugins/Skills** (`oh my opencode`: 6,600/mo, SD 34; `opencode skills`: 1,900/mo, SD 22)
- [ ] **Unsloth Studio vs LM Studio vs Ollama (+ Dynamic V3.1 Quants)** (`unsloth studio`: 2,400/mo, SD 29)
- [x] **Pi-hole vs AdGuard Home on Docker (+ Unbound Setup)** (`pihole docker`: 880/mo; `adguard vs pihole`: 720/mo, SD 24) — published `/pihole-vs-adguard-home-docker/`

### Sprint 2 — Timely Releases & Evergreen Homelab Gaps
- [ ] **n8n 1.x EOL (Dec 31, 2026) & Upgrading to 2.47+ / 3.x Safely** (urgent deadline)
- [ ] **Seerr on Docker Compose: Migrating From Overseerr / Jellyseerr** (`jellyseerr vs overseerr`: 140/mo, SD 20)
- [ ] **Gemini 4 Neon vs GPT-6.2 Sol/Astra vs Claude Opus 5.5** (fresh Nov 17–18 launches, hot Google Autocomplete)
- [ ] **PHP 8.6 Released: Partial Function Application, `Io\Poll`, Sodium & Upgrade Guide** (shipped Nov 19)
- [x] **Forgejo vs Gitea (2026) + Native Forgejo Actions Runner** (`forgejo vs gitea`: 480/mo, SD 21) — published `/forgejo-vs-gitea-self-hosted/`

### Sprint 3 — Differentiation, Affiliate Synergy & Trending GitHub
- [x] **Best Docker Desktop Alternatives 2026: OrbStack vs Colima vs Kiri vs Podman** (`colima docker`: 1,000/mo) — published `/best-docker-desktop-alternatives/`
- [ ] **Self-Host Maps for 100x Less: Protomaps (PMTiles) on Bunny.net or Cloudflare R2** (Bunny affiliate tie-in)
- [ ] **Run Claude Code With a Local LLM (Ollama / LM Studio / LiteLLM)** (`claude code local llm`: 260/mo, SD 30)
- [ ] **OpenCode Browse Setup Guide: Real Browser Automation With 2FA Handoff** (launched Nov 16)
- [ ] **Replit `datacat` vs Grafana/Loki/Tempo: OpenTelemetry on Postgres** (`self hosted monitoring tool`: 320/mo, SD 26)
- [ ] **Linkwarden v2.17 on Docker Compose** (20k+ stars, SD 5)
- [x] **p7y + Mastra Factory: Self-Hosted Docker Sandboxes & Agentic Kanban** (Mastra cluster tie-in) — published `/p7y-mastra-factory-self-hosted-agent-sandboxes/`
- [x] **PeakCut on Docker: Self-Hosted AI Video Clipper (BYOK)** (1,100+ stars in 5 days) — published `/peakcut-self-hosted-ai-video-clipper/`

### Opportunistic — Urgent Security / Fix Spikes (Publish Fast If Targeting News Traffic)
- [ ] **NGINX2Shell (CVE-2026-123633 & CVE-2026-123007): Patch & `http2 off` Mitigation** (HN 1,248 pts, CVSS 9.2)
- [ ] **Disable Windows 11 Coding Agent Telemetry (`MissionControlAggregator.dll`)** (HN 408 pts)
- [ ] **Synology DSM OAuth CVE-2026-120382 (CVSS 9.8): Patch or Disable Now** (HN 125 pts, Synology cluster)

---

## Tier 1: Proven High-Volume, Low-SD Search Winners

### 1. OpenCode Zen vs OpenCode Go: Pricing, Models & Which Plan Fits
- **Suggested slug:** `opencode-zen-vs-go`
- **Category / tags:** `ai` · `["opencode", "ai-coding", "pricing"]`
- **Ubersuggest US data:**
  - `opencode zen` — **5,400/mo**, SD **16**, CPC $9.75
  - `opencode zen pricing` — **390/mo**, SD 46, CPC $13.88
  - `opencode zen models` — **140/mo**, SD 33, CPC $17.28
  - `opencode zen vs go` — **110/mo**, SD **24**
  - `opencode zen api` — **110/mo**, SD 41
- **Angle:** Clear side-by-side pricing table, pay-as-you-go Zen vs flat-rate Go subscription, which models each exposes, and real cost break-even math for daily coding.
- **Cross-link with:** `/opencode-setup-guide/`, `/opencode-go-plan/`, `/opencode-go-vs-clinepass-cheap-models/`, `/opencode-vs-pi-agent/`.

### 2. Oh My OpenCode & Best OpenCode Plugins and Skills (2026)
- **Suggested slug:** `oh-my-opencode-plugins-skills`
- **Category / tags:** `ai` · `["opencode", "mcp", "ai-coding"]`
- **Ubersuggest US data:**
  - `oh my opencode` — **6,600/mo**, SD **34**, CPC $9.04
  - `opencode skills` — **1,900/mo**, SD **22**
  - `opencode plugins` — **1,600/mo**, SD **22**, CPC $7.81
  - `opencode mcp` — **880/mo**, SD **32**, CPC $9.48
  - `opencode config` — **880/mo**, SD 39
- **Angle:** Practical config walkthrough (`opencode.json`), installing Oh My OpenCode, top skills/plugins worth keeping, and connecting MCP servers without blowing context windows.
- **Cross-link with:** `/opencode-setup-guide/`, `/opencode-go-plan/`, `/best-ai-skills-for-web-design/`.

### 3. Claude Code vs OpenCode vs Codex CLI (2026 Benchmark & Cost Guide)
- **Suggested slug:** `claude-code-vs-opencode-vs-codex`
- **Category / tags:** `ai` · `["claude-code", "opencode", "codex"]`
- **Ubersuggest US data:**
  - `codex vs claude code` — **14,800/mo**, SD **7**, CPC $3.92
  - `claude code vs codex` — **5,400/mo**, SD 42, CPC $23.30
  - `opencode vs claude code` — **3,600/mo**, SD **37**, CPC $5.31
  - `claude code vs opencode` — **880/mo**, SD 36
- **Angle:** Use the fresh Nov 17 **FrontierHarness v1.1** data (27,280 runs across 22 harnesses × 5 models showing the best harness changes with every model and 64.5% of spend goes to failed runs), plus hands-on workflow comparison (model flexibility, local/BYOK support, subscription limits, parallel sessions).
- **Cross-link with:** `/opencode-vs-pi-agent/`, `/codex-app-any-model/`, `/herdr-agent-multiplexer/`, `/ai-coding-tools/`.

### 4. Unsloth Studio vs LM Studio vs Ollama (+ Dynamic V3.1 Quants)
- **Suggested slug:** `unsloth-studio-vs-lm-studio-ollama`
- **Category / tags:** `ai` · `["unsloth", "ollama", "local-llm"]`
- **Ubersuggest US + Autocomplete:**
  - `unsloth studio` — **2,400/mo**, SD **29**, CPC $6.77
  - `best local llm for coding` — **1,000/mo**, SD 38, CPC $7.93
  - `running local llm` — **390/mo**, SD **18**
  - Google Autocomplete: `unsloth studio vs lm studio`, `unsloth studio vs llama.cpp`, `unsloth studio vs ollama`, `where does unsloth studio save models`
- **Angle:** Cover Unsloth Dynamic V3.1 quantization (Nov 11–18, 5–10% accuracy gains at same size on Qwen3.8-27B / DeepSeek-V4.1-Flash, NVFP4), compare UX and model storage paths across Unsloth Studio, LM Studio, and Ollama, and test real tok/s locally.
- **Cross-link with:** `/lm-studio-bionic/`, `/ollama-docker-install/`, `/best-mini-pc-local-llm/`, `/best-open-source-llms-claude-alternative/`.

### 5. Pi-hole vs AdGuard Home on Docker (+ Unbound Recursive DNS)
- **Suggested slug:** `pihole-vs-adguard-home-docker`
- **Category / tags:** `self-hosting` · `["pihole", "adguard-home", "docker"]`
- **Ubersuggest US data:**
  - `pihole blocklist` — **1,300/mo**, SD 30
  - `pihole docker` — **880/mo**, SD 39
  - `adguard home vs pihole` — **720/mo**, SD **32**
  - `adguard vs pihole` — **720/mo**, SD **24**
  - `pihole unbound` — **590/mo**, SD **29**
- **Angle:** Copy-paste Docker Compose files for both (plus Unbound so you don't depend on third-party resolvers — timely with Quad9 leaving France on Nov 24), resource usage comparison, DNS-over-HTTPS/TLS out of the box (AdGuard advantage) vs ecosystem/gravity lists (Pi-hole advantage).
- **Cross-link with:** `/block-ads-malware-dns-protection/`, `/block-ads-manifest-v3-nextdns/`, `/docker-containers-home-server/`, `/docker-bypasses-firewall/`.

### 6. Forgejo vs Gitea (2026): Why Self-Hosters Are Switching + Forgejo Actions
- **Suggested slug:** `forgejo-vs-gitea-self-hosted`
- **Category / tags:** `self-hosting` · `["forgejo", "gitea", "docker"]`
- **Ubersuggest US data:**
  - `forgejo vs gitea` — **480/mo**, SD **21**, CPC $7.79
  - `gitea vs forgejo` — **390/mo**, SD **24**, CPC $6.73
  - `forgejo actions` — **210/mo**, SD **16**
  - `forgejo runner` — **210/mo**, SD 32
- **Angle:** Governance/fork history (Codeberg + 2026 selfh.st survey showing Forgejo passing Gitea), hard-fork divergence status, migration path from Gitea to Forgejo, and setting up a native Docker `forgejo-runner` for CI/CD.
- **Cross-link with:** `/forgejo-woodpecker-ci-cicd/`, `/docker-containers-home-server/`, `/dokploy-backups-cloudflare-r2/`.

### 7. Run Claude Code With a Local LLM (Ollama, LM Studio & LiteLLM)
- **Suggested slug:** `claude-code-local-llm-setup`
- **Category / tags:** `ai` · `["claude-code", "ollama", "litellm"]`
- **Ubersuggest US + Autocomplete:**
  - `claude code local llm` — **260/mo**, SD **30**, CPC $5.89
  - `self hosted ai agent` — **260/mo**, SD **17**, CPC $7.67
  - `claude code with local llm` — **210/mo**, SD 46
  - Google Autocomplete: `claude code local vs cloud`, `why run claude code locally`
- **Angle:** Step-by-step wiring via LiteLLM proxy or Anthropic-compatible local endpoints (Ollama / LM Studio / DeepSeek Messages API), honest limits on tool-calling reliability and context length (256k vs 32k), and which open coding models (Qwen3.8-27B, GLM-5.3, DeepSeek-V4.1-Flash) actually pass agent loops.
- **Cross-link with:** `/litellm-docker-install/`, `/ollama-docker-install/`, `/best-open-source-llms-claude-alternative/`, `/best-mini-pc-local-llm/`.

---

## Tier 2: Fresh Releases & News Momentum (Nov 15–20, 2026)

### 8. Gemini 4 Neon vs GPT-6.2 Sol/Astra vs Claude Opus 5.5 for Coding Agents
- **Suggested slug:** `gemini-4-neon-vs-gpt-6-2-vs-opus-5-5`
- **Category / tags:** `ai` · `["gemini", "openai", "claude"]`
- **Signals:** Gemini 4 Neon shipped Nov 18 (HN 634 pts; $3/$15 per M tokens, 95% cache discount, 127 tok/s, #1 Artificial Analysis Coding Agent Index). GPT-6.2 Astra/Sol shipped Nov 17 (HN 1,180 pts; $2/$10 Sol, $8/$40 Astra). Google Autocomplete already populates `gemini 4 neon vs opus 5.5`, `gemini 4 neon vs carbon`, `gpt 6.2 vs opus 5.5`, `gpt 6.2 vs fable 5.2`.
- **Angle:** Cost-per-task comparison, prompt caching math, speed, and which model to wire into OpenCode / Claude Code / Codex CLI.
- **Cross-link with:** `/best-cheap-models-hermes-agent/`, `/opencode-go-vs-clinepass-cheap-models/`, `/ai-coding-tools/`.

### 9. PHP 8.6 Released: Partial Function Application, `Io\Poll`, Sodium & Upgrade Guide
- **Suggested slug:** `php-8-6-whats-new-upgrade-guide`
- **Category / tags:** `web-development` · `["php", "docker", "wordpress"]`
- **Signals:** Shipped Nov 19 alongside emergency security patches (8.5.13, 8.4.28, 8.3.37 — top post on `r/devops`). Google Autocomplete: `php 8.6 vs 8.5`, `php 8.4 vs 8.6`.
- **Angle:** Test live in Docker (`php:8.6-cli-alpine`) just like the PostgreSQL 19 post — cover partial function application (`version_compare(?, '8.6', '>=')`), `Io\Poll` escaping `stream_select()`'s 1024-fd limit, `\Time\Duration`, `clamp()`, post-quantum X-Wing/ML-KEM-768 in Sodium, stricter session defaults, `mb_ereg()` deprecation, and WordPress / CloudPanel readiness.
- **Cross-link with:** `/php-cloud-hosting/`, `/safely-update-cloudpanel/`, `/postgresql-19-whats-new/`.

### 10. OpenCode Browse Guide: Give Coding Agents Your Real Browser Safely
- **Suggested slug:** `opencode-browse-setup-guide`
- **Category / tags:** `ai` · `["opencode", "mcp", "browser-automation"]`
- **Signals:** Launched Nov 16 (HN 181 pts). MCP server + Chromium extension that drives your real Chrome/Brave/Arc profile with human-in-the-loop 2FA/login handoff and per-domain allowlists. Works across OpenCode, Claude Code, Cursor, Codex, and Zed.
- **Angle:** Install walkthrough, configuring `allowed-sites` so an agent never touches banking/prod dashboards, and when to use it vs Playwright MCP.
- **Cross-link with:** `/opencode-setup-guide/`, `/brightdata-mcp-guide/`.

### 11. n8n 1.x EOL (Dec 31, 2026): Upgrading Self-Hosted n8n to 2.47+ & Preparing for 3.x
- **Suggested slug:** `n8n-upgrade-2-x-3-x-docker-migration`
- **Category / tags:** `self-hosting` · `["n8n", "docker", "automation"]`
- **Signals:** n8n patched 5 CVEs on Nov 13 (2 HIGH account takeovers), n8n 1.x hits hard EOL December 31, 2026 with **no direct 1.x → 3.x upgrade path**, and Docker-only n8n 3.x goes stable early December.
- **Angle:** Backup Postgres + encryption key, exact 1.x → 2.47.7+ step-by-step Docker Compose upgrade, breaking node/auth checks, and what changes in 3.x.
- **Cross-link with:** `/n8n-self-host-workflow-automation/`, `/postgresql-19-whats-new/`, `/dokploy-backups-cloudflare-r2/`.

### 12. Self-Host Maps for 100x Less Than Mapbox: Protomaps (PMTiles) on Bunny.net or R2
- **Suggested slug:** `protomaps-pmtiles-self-hosted-bunny-r2`
- **Category / tags:** `self-hosting` · `["protomaps", "bunny-net", "cloudflare"]`
- **Signals:** HN 243 pts (Nov 15); `protomaps pmtiles` already has volume in Ubersuggest. Real cost breakdown: 139 GB world build on Bunny.net (~$5/mo storage + ~$0.05 per 1,000 map loads vs Mapbox $5/1k).
- **Angle:** Hands-on guide: extract a regional `.pmtiles` file, upload to Bunny Storage or Cloudflare R2, configure CORS + rate limits, render with MapLibre GL JS in Astro. Strong Bunny.net affiliate fit.
- **Cross-link with:** `/bunny-storage-vs-s3-vs-backblaze/`, `/bunny-net-review/`, `/deploy-astro-bunny-net/`.

---

## Tier 3: High-Intent Self-Hosting & DevOps Tools (Reddit + GitHub Trending)

### 13. Seerr on Docker Compose: Migrating From Overseerr & Jellyseerr
- **Suggested slug:** `seerr-docker-install-migrate-jellyseerr`
- **Category / tags:** `self-hosting` · `["seerr", "jellyfin", "docker"]`
- **Signals:** `jellyseerr port` (260/mo, SD 19), `jellyseerr vs overseerr` (140/mo, SD 20), Google Autocomplete `seerr on docker`, pinned alert on `r/selfhosted` (v3.5.2 patched 3 security advisories Nov 15).
- **Angle:** Explain how Seerr unifies Overseerr and Jellyseerr, step-by-step Docker Compose setup + config migration, and security checklist for exposing it via reverse proxy or Tailscale.
- **Cross-link with:** `/self-host-jellyfin/`, `/best-mini-pc-plex-jellyfin/`, `/holyarrs-docker-guide/`, `/tailscale-setup-guide/`.

### 14. Best Docker Desktop Alternatives in 2026: OrbStack vs Colima vs Kiri vs Podman
- **Suggested slug:** `best-docker-desktop-alternatives`
- **Category / tags:** `self-hosting` · `["docker", "orbstack", "podman"]`
- **Ubersuggest US data:**
  - `colima docker` — **1,000/mo**, SD 41, CPC $14.86
  - `orbstack vs docker` — **260/mo**, SD 41
  - `podman desktop for windows` — **210/mo**
  - `colima vs docker` — **170/mo**, SD **26**
  - `orbstack vs docker desktop` — **140/mo**, SD **26**
  - `docker desktop alternative mac` — **70/mo**, SD 38
- **Angle:** Include **Kiri 0.2.1** (HN Nov 15 — single Rust daemon, 22 ms `docker run`, built-in `kiri k8s start`), benchmark startup time & RAM against OrbStack, Colima, and Podman Desktop.
- **Cross-link with:** `/podman-vs-docker/`, `/docker-commands/`, `/docker-containers-home-server/`.

### 15. Replit `datacat` & Checkmate: Lightweight Self-Hosted Monitoring Without Grafana Sprawl
- **Suggested slug:** `replit-datacat-self-hosted-monitoring-postgres`
- **Category / tags:** `self-hosting` · `["monitoring", "postgresql", "docker"]`
- **Signals:** `self hosted monitoring tool` (**320/mo, SD 26**, CPC $6.31). Replit open-sourced `datacat` on Nov 17 (Apache 2.0, OpenTelemetry metrics/logs/traces backed by PostgreSQL or ClickHouse); Checkmate v3.3 trending on `r/selfhosted`.
- **Angle:** Compare lightweight self-hosted observability stacks (Beszel/Uptime Kuma vs Checkmate vs Replit `datacat` on Postgres vs full Grafana/Loki/Tempo) and test `datacat` on Docker + Postgres 19.
- **Cross-link with:** `/beszel-uptime-kuma/`, `/sever-monitoring/`, `/what-postgres-replaces/`, `/postgresql-19-whats-new/`.

### 16. Linkwarden on Docker Compose: Self-Host a Collaborative Bookmark & Page Archive
- **Suggested slug:** `linkwarden-docker-compose-install`
- **Category / tags:** `self-hosting` · `["linkwarden", "docker", "self-hosted"]`
- **Signals:** 20,400+ GitHub stars, v2.17 just launched on `r/selfhosted`; `best self hosted bookmark manager` (SD 5).
- **Angle:** Full Docker Compose with Postgres, Meilisearch, automatic PDF/screenshot preservation, browser extension + mobile app, and off-box backups.
- **Cross-link with:** `/docker-containers-home-server/`, `/multiple-postgres-databases-docker/`, `/dokploy-backups-cloudflare-r2/`.

### 17. Self-Hosted AI Coding Sandboxes: `p7y` & Mastra Factory
- **Suggested slug:** `p7y-mastra-factory-self-hosted-agent-sandboxes`
- **Category / tags:** `ai` · `["mastra", "docker", "ai-agents"]`
- **Signals:** `p7y-dev/p7y` (Docker-in-Docker sandbox per agent with auto-sleep + URL + MCP) trending on GitHub Nov 2026; Mastra open-sourced `template-factory` Nov 18 (HN 88 pts, agentic Kanban driven from Slack).
- **Angle:** How to give autonomous coding agents isolated Docker sandboxes and automated PR workflows on your own VPS without risking your host.
- **Cross-link with:** `/build-ai-agent-mastra/`, `/mastra-tools-vs-mcp/`, `/docker-podman-ai-cli-tools-safe-environment/`, `/vps-ai-coding-setup/`.

### 18. PeakCut on Docker: Self-Hosted AI Video Clipper for Streams & Long Recordings
- **Suggested slug:** `peakcut-self-hosted-ai-video-clipper`
- **Category / tags:** `ai` · `["self-hosted", "docker", "video"]`
- **Signals:** `haziqahmedqasmi/PeakCut` passed 1,100 GitHub stars in 5 days (MIT, Python, BYOK AI clipping without uploading raw footage to SaaS like OpusClip).
- **Angle:** Install guide, Whisper/ASR quality check, API cost per hour of footage, and honest comparison against SaaS clippers.
- **Cross-link with:** `/hyperframes-studio-review/`, `/python-video-intro-editor/`.

---

## Tier 4: Quick-Win Security & Fix Posts (Fast Search Spikes)

### 19. NGINX2Shell (CVE-2026-123633 & CVE-2026-123007): Patch or Mitigate the HTTP/2 RCE
- **Suggested slug:** `nginx-http2-rce-cve-2026-123633-fix`
- **Category / tags:** `self-hosting` · `["nginx", "security", "linux"]`
- **Signals:** HN 1,248 pts (Nov 18), CVSS 9.2 unauthenticated RCE affecting NGINX back to 1.9.5 (2015), working PoCs on GitHub (`sfewer-r7/CVE-2026-123007`).
- **Angle:** Check affected version (`nginx -v` + Docker images), upgrade to 1.30.7 stable / 1.31.9 mainline, or apply the immediate `http2 off;` workaround until patched.
- **Cross-link with:** `/crowdsec-secure-server/`, `/traefik-proxy-docker/`, `/setup-webdav-nginx/`.

### 20. Windows 11 Logs Which Coding Agents You Run (`MissionControlAggregator.dll`): How to Turn It Off
- **Suggested slug:** `disable-windows-11-coding-agent-telemetry`
- **Category / tags:** `tools` · `["windows", "privacy", "ai-coding"]`
- **Signals:** HN 408 pts (Nov 16) — teardown revealed Windows 11 tracks `claude.exe`, `codex.exe`, `copilot.exe`, `cursor.exe`, `antigravity.exe` (including inside WSL) and queues them in DiagTrack uploads when optional diagnostics are on.
- **Angle:** Fast 5-minute fix via Settings, Group Policy (`AllowTelemetry`), and PowerShell verification.

### 21. Synology DSM OAuth CVE-2026-120382 (CVSS 9.8): Patch Immediately or Disable OAuth Service
- **Suggested slug:** `synology-dsm-oauth-cve-2026-120382-fix`
- **Category / tags:** `self-hosting` · `["synology", "nas", "security"]`
- **Signals:** Nov 19 Synology advisory (`Synology_SA_26_21`), HN 125 pts — unauthenticated remote file read/write on DSM 7.1–7.4 and BeeStation OS 1.5.
- **Angle:** Check if OAuth Service is installed, disable it immediately if your DSM branch isn't patched yet, verify fixed build numbers (`7.4.1-90080-2`, `7.3.2-86009-6`), and audit exposed NAS ports.
- **Cross-link with:** `/ugreen-vs-synology/`, `/migrate-synology-to-ugreen-nas/`, `/best-nas-homelab-docker-proxmox/`.
