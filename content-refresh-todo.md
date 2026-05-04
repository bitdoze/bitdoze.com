# Content Refresh Plan — May 2026

Analysis based on `www.bitdoze.com__content_decay2.csv`. 20 articles selected by recovery potential (traffic volume × decay severity × topic evergreen-ness).

**Process per article:**
1. Research current state of the topic (versions, features, pricing, changes)
2. Update the article with accurate 2026 details
3. Change the `date` in frontmatter to today's date (2026-05-04)
4. Apply humanizer skill to catch AI writing patterns
5. Build verify (`bun run build:ci`)
6. Mark done here

---

## Tier 1 — High Impact (biggest traffic recovery)

### 1. `/docker-containers-home-server`
- **Status:** Critical | **Traffic (2M):** 381 | **YoY:** -94.1% | **Queries:** -67.3%
- **Total clicks:** 33,862 — your #1 all-time article
- **What to research:** New container releases 2025-2026, updated Docker images, new AI-related containers (Ollama, LiteLLM, etc.), removed/deprecated containers
- **Why it decayed:** Content references old container versions, competitors published fresher lists
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 2. `/ghostty-terminal`
- **Status:** Warning | **Traffic (2M):** 112 | **YoY:** -83.8% | **Queries:** +33.3%
- **Total clicks:** 3,569
- **What to research:** Ghostty latest version (1.x+), new features, config changes, comparison with competing terminals
- **Why it decayed:** Ghostty had rapid development, content became outdated fast. Queries are actually UP (+33.3%) which means the topic is alive but the article doesn't match
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 3. `/copy-multiple-files-in-one-layer-using-a-dockerfile`
- **Status:** Warning | **Traffic (2M):** 75 | **YoY:** -92.3% | **Queries:** +45.2%
- **Total clicks:** 3,585
- **What to research:** Docker BuildKit improvements, new COPY syntax, multi-stage build best practices 2026
- **Why it decayed:** Queries UP (+45.2%) means the topic is hot but article lost ranking. Freshness signal is the issue
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 4. `/best-oh-my-zsh-plugins`
- **Status:** Warning | **Traffic (2M):** 35 | **YoY:** -88% | **Queries:** +53.2%
- **Total clicks:** 1,604
- **What to research:** New/popular Oh My Zsh plugins in 2026, any deprecated ones, alternatives like Oh My Posh, Starship integration
- **Why it decayed:** Queries way UP (+53.2%) — topic is thriving but article is stale
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 5. `/use-claude-sonnet-4-5-gpt-5-free`
- **Status:** Warning | **Traffic (2M):** 29 | **YoY:** 0% | **Queries:** -46.7%
- **Total clicks:** 661
- **What to research:** Current free tiers for Claude/GPT in 2026, model updates (Sonnet 4.6, GPT-5.5), new free access methods, API pricing changes
- **Why it decayed:** Model names changed, free tier access methods shifted. Queries down — people search differently now
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

## Tier 2 — Medium Impact

### 6. `/streamlit-vs-nicegui`
- **Status:** Critical | **Traffic (2M):** 24 | **YoY:** -91.9% | **Queries:** -29.2%
- **Total clicks:** 1,533
- **What to research:** Streamlit 2026 features, NiceGUI 2.x changes, new competitors (Mesop, Gradio 5, Reflex)
- **Why it decayed:** Both frameworks evolved, article doesn't cover new features
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 7. `/multiple-postgres-databases-docker`
- **Status:** Warning | **Traffic (2M):** 24 | **YoY:** -93% | **Queries:** +23.1%
- **Total clicks:** 1,520
- **What to research:** PostgreSQL 17+ features, Docker Compose v2 changes, pgvector updates, best practices for multi-DB setups
- **Why it decayed:** Queries UP (+23.1%) — topic is alive, article just needs version bumps
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 8. `/nixpacks-vs-railpack`
- **Status:** Warning | **Traffic (2M):** 19 | **YoY:** -62.7% | **Queries:** +41.7%
- **Total clicks:** 364
- **What to research:** Nixpacks latest version, Railpack updates, new buildpack alternatives, Coolify/Dokploy integration changes
- **Why it decayed:** Queries UP (+41.7%) — both tools evolved, article needs feature comparison update
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 9. `/openclaw-alternatives`
- **Status:** Warning | **Traffic (2M):** 17 | **YoY:** 0% | **Queries:** -34.1%
- **Total clicks:** 36 (recent article)
- **What to research:** New OpenClaw alternatives in 2026, status of existing ones (Hermes, CoPaw, PicoClaw, OpenFang), any new entrants
- **Why it decayed:** Queries down — search landscape shifted. Article may need new alternatives added
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

### 10. `/vibeproxy-ai-subscriptions-guide`
- **Status:** Warning | **Traffic (2M):** 17 | **YoY:** 0% | **Queries:** -8.1%
- **Total clicks:** 109
- **What to research:** VibeProxy current status, pricing changes, new AI proxy alternatives, subscription model updates
- **Why it decayed:** Niche topic, queries slightly down
- [x] Research done
- [x] Article updated
- [x] Date changed to 2026-05-04
- [x] Humanized
- [x] Build verified

## Tier 3 — AI & DevOps Tools

### 11. `/litellm-docker-install`
- **Status:** Critical | **Traffic (2M):** 16 | **YoY:** -94.6% | **Queries:** -27%
- **Total clicks:** 1,350
- **What to research:** LiteLLM latest version, new Docker setup, proxy changes, new model support, breaking config changes
- **Why it decayed:** LiteLLM had major version bumps, old setup instructions likely broken
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 12. `/google-adk-openrouter-models`
- **Status:** Critical | **Traffic (2M):** 14 | **YoY:** -89.3% | **Queries:** -6.2%
- **Total clicks:** 851
- **What to research:** Google ADK latest version, OpenRouter model changes, new ADK features, breaking API changes
- **Why it decayed:** Google ADK had breaking changes, model names shifted
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 13. `/docker-containers-business`
- **Status:** Critical | **Traffic (2M):** 12 | **YoY:** -90.2% | **Queries:** -37.5%
- **Total clicks:** 823
- **What to research:** New business-relevant containers 2026, updated versions of listed containers, new categories (AI tools, collaboration)
- **Why it decayed:** Container versions outdated, new tools emerged
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 14. `/zerobyte-restic-gui`
- **Status:** Warning | **Traffic (2M):** 11 | **YoY:** 0% | **Queries:** -38.5%
- **Total clicks:** 27
- **What to research:** ZeroByte/Restic GUI latest version, new features, alternatives
- **Why it decayed:** Queries down, niche tool
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

## Tier 4 — Linux & Misc

### 15. `/clean-docker-overlay2-dir`
- **Status:** Warning | **Traffic (2M):** 10 | **YoY:** -98.3% | **Queries:** +46.7%
- **Total clicks:** 2,250
- **What to research:** Docker 27+ cleanup commands, new `docker system prune` options, overlay2 changes
- **Why it decayed:** Queries way UP (+46.7%) — topic is hot, article just lost ranking from age
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 16. `/sed-insert-append-text`
- **Status:** Warning | **Traffic (2M):** 10 | **YoY:** -98.6% | **Queries:** +50%
- **Total clicks:** 2,462
- **What to research:** Any sed syntax updates, modern alternatives (sd, sad), new examples
- **Why it decayed:** Queries UP (+50%) — evergreen topic, just needs freshness bump
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 17. `/sed-change-case`
- **Status:** Warning | **Traffic (2M):** 7 | **YoY:** -95.5% | **Queries:** +25%
- **Total clicks:** 541
- **What to research:** sed case conversion patterns, modern alternatives, new use cases
- **Why it decayed:** Queries UP — topic alive, article stale
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 18. `/nicegui-get-started`
- **Status:** Critical | **Traffic (2M):** 6 | **YoY:** -94.1% | **Queries:** -46.2%
- **Total clicks:** 544
- **What to research:** NiceGUI 2.x latest features, new components, breaking changes from 1.x
- **Why it decayed:** NiceGUI evolved significantly, old tutorial is outdated
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 19. `/build-astro-blog-free`
- **Status:** Warning | **Traffic (2M):** 6 | **YoY:** -50% | **Queries:** -83.3%
- **Total clicks:** 98
- **What to research:** Astro 5.x changes, new free hosting options, updated deployment steps
- **Why it decayed:** Astro has changed significantly, deployment options shifted
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

### 20. `/bun-update-packages`
- **Status:** Warning | **Traffic (2M):** 5 | **YoY:** -85.7% | **Queries:** +16.3%
- **Total clicks:** 164
- **What to research:** Bun latest version, new package management features, lockfile changes
- **Why it decayed:** Queries UP — Bun is growing, article just needs version updates
- [ ] Research done
- [ ] Article updated
- [ ] Date changed to 2026-05-04
- [ ] Humanized
- [ ] Build verified

---

## Summary

| Tier | Articles | Est. Recovery |
|---|---|---|
| Tier 1 — High Impact | #1-5 | ~600+ clicks/mo |
| Tier 2 — Medium Impact | #6-10 | ~100+ clicks/mo |
| Tier 3 — AI & DevOps | #11-14 | ~50+ clicks/mo |
| Tier 4 — Linux & Misc | #15-20 | ~40+ clicks/mo |
| **Total** | **20 articles** | **~790+ clicks/mo** |

## Already Updated (skip)
- `/best-open-source-llms-claude-alternative` — updated this session with Opus 4.7, GPT-5.5, MiMo V2.5 Pro etc.
