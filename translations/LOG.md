# ES Translation Log

Tracks EN→ES article translation progress. Regenerate the link/title lookup with:
`node scripts/build-translation-index.mjs` → `translations/index.json` (date-sorted, newest first)

## Workflow per article

1. Pick the next `pending` entry from `index.json` (newest-first unless told otherwise).
2. Read the EN source (`enFile`), plus `index.json` for every internal link target.
3. Write `src/content/posts/es/<es-slug>.mdx`:
   - `translationKey: "<enSlug>"` (required — this is what pairs the hreflang)
   - `canonical: "https://www.bitdoze.com/es/<es-slug>/"`
   - `date`: keep EN date; `lastmod`: translation date
   - `categories`: same as EN; `tags`: same topics, Spanish lowercase-kebab is fine
   - `image`: reuse the EN image path but rewrite relative paths to the `@assets/` alias — ES files live one level deeper (`posts/es/`), so EN-style `../../assets/...` breaks the build; use `@assets/images/...` for frontmatter AND inline `![]()` images
   - Translate title/meta_title/description; keep widget imports and components unchanged (`<Button>`, `<Notice>`, `<Accordion>`, `<Tabs>/<Tab>`, `<ListCheck>`, `<YouTubeEmbed>`, `<AmazonProduct>`) — translate only their visible text props
   - Internal links: `/es/<es-slug>/` when `index.json` shows a translation exists, otherwise keep the EN `/<en-slug>/` URL (established convention)
   - Affiliate `/go/<slug>/` links and `go.bitdoze.com` URLs stay unchanged
   - Proper Spanish orthography (accents, ¿?, ¡!) per recent posts
   - Do NOT translate: code blocks, commands, file paths, config values, brand/product names
4. `bun run build:ci` (or at least `astro build` on the touched file set) before marking done.
5. Log it below: date, EN slug → ES slug, notes. Then regenerate `index.json`.

## Done in this run

| Date | EN slug | ES slug | Notes |
|---|---|---|---|
| 2026-10-18 | best-thunderbolt-5-docks-guide | mejores-docks-thunderbolt-5 | 868 lines; image paths needed `@assets/` alias (ES files are one dir deeper than EN — `../../assets` breaks the build); product headings kept verbatim so all `#anchor` links stay valid |
| 2026-10-18 | freebuff-free-ai-coding-agent | freebuff-agente-ia-gratis | Freebuff free AI coding agent article; no widget imports in EN file (widgets resolve via mdxComponents) |
| 2026-10-18 | google-adk-openrouter-models | google-adk-openrouter-modelos | ADK+OpenRouter guide; kept `series: ["Google ADK Tutorials", "2"]` verbatim; model IDs, litellm pins, env vars untranslated; ES link used for best-open-source-llms-claude-alternative |
| 2026-10-18 | hetzner-cloud-review | hetzner-cloud-resena | 1212-line review; YABS/k6 benchmark code blocks copied verbatim (terminal output stays EN); only prose paragraphs inside tabs translated; tab names kept as product names |
| 2026-10-18 | muse-tinyfish-search-fetch | muse-tinyfish-busqueda-fetch | Muse custom MCPs article; ES links used for tinyfish-ai-agents-web-search + fish-audio-review only; prompt examples inside ListCheck kept verbatim (they are literal prompts to paste into Muse) |
| 2026-10-18 | tinyfish-free-search-coding-agents | tinyfish-busqueda-web-gratis-agentes | Search+Fetch setup guide; ES links used for tinyfish review, muse MCP post, pi/hermes/openclaw/opencode guides, best-ai-skills, opencode-go-plan |
| 2026-10-18 | build-astro-blog-free | crear-blog-astro-gratis | 785-line guide; 2 inline SVG diagrams copied verbatim (images, EN labels kept); ES link only for wordpress-to-astro-migration |
| 2026-10-18 | docker-containers-home-server | contenedores-docker-servidor-casa | 660-line catalog; ~25 in-page anchor links rewritten to Spanish heading slugs (github-slugger keeps accents, strips ¿?); ES link only for what-postgres-replaces |
| 2026-10-18 | nixpacks-vs-railpack | railpack-vs-nixpacks | Railpack/Nixpacks comparison; all `RAILPACK_*`/`NIXPACKS_*` env vars, commands, and code blocks verbatim; `[Coste/ops]`/`[Verifica]`/`[Rollback]` callouts translated; all internal links stayed EN (no ES targets) |
| 2026-10-18 | docker-containers-business | contenedores-docker-empresas | 717-line business catalog; ES links for instalar-dockge, alternativas-portainer, arcane-vs-dockhand only; 26-app table + per-app resource table translated; compose/code blocks verbatim |
| 2026-10-18 | ghostty-terminal | terminal-ghostty | Ghostty setup guide; ES links for the 4 fish-shell translations only; `xterm-ghostty` TERM fix, config keys, and keybind shortcuts verbatim; OSC 7501 payload block verbatim |
| 2026-10-18 | litellm-docker-install | litellm-docker-instalacion | LiteLLM gateway guide (604 lines); batch 2 start; tags trimmed to 3 (dropped `llm`); ES links for instalar-dockge, openclaw-ollama-modelos-locales, mejores-llms, contenedores-docker-servidor-casa; all compose/env/curl blocks verbatim |
| 2026-10-18 | tmux-basics | tmux-comandos-basicos | tmux guide (sessions/windows/panes, config, plugins); all keybinds and commands verbatim; all internal links stayed EN |
| 2026-10-18 | multiple-postgres-databases-docker | multiples-bases-datos-postgres-docker | Multi-DB-per-Postgres-container guide; init scripts and SQL verbatim; ES link for instalar-dockge only |
| 2026-10-18 | ollama-docker-install | ollama-docker-instalacion | Ollama+OpenWebUI Compose behind Traefik; CPU/NVIDIA/AMD variants; ES links: dockge, openclaw-ollama, llms-compare, docker-containers, litellm |
| 2026-10-18 | langflow-docker-install | instalar-langflow-docker | Langflow 1.12.5 + Postgres + CF Tunnel; anchors slugified w/ accents; ES links: dockge, docker-containers |
| 2026-10-18 | langfuse-docker-install | instalar-langfuse-docker | Langfuse v4 six-service stack, v3->v4 upgrade, backups; ES links: litellm, dockge, docker-containers |
| 2026-10-18 | clean-docker-overlay2-dir | limpiar-docker-overlay2 | overlay2/containerd cleanup guide; all prune commands + daemon.json verbatim; ES link only for forgejo-woodpecker-ci-cicd |
| 2026-10-18 | flowiseai-install | instalar-flowise-docker | Flowise 3.1.4 frozen/EOL guide + migration + hardening; anchors slugified w/ accents; ES links: dockge, multiples-bases-postgres, ollama, langflow, docker-containers |
| 2026-10-18 | best-herdr-clients | mejores-clientes-herdr | Herdr clients comparison (TUI/web UIs/mobile/desktop); kept series ["Herdr","3"]; all install commands verbatim; all internal links EN except instalar-dockge |
| 2026-10-18 | best-herdr-plugins | mejores-plugins-herdr | Herdr plugins top-10 + vetting guide; series ["Herdr","4"]; manifest/argv/commands verbatim; ES links: mejores-clientes-herdr, instalar-dockge |
| 2026-10-18 | bun-update-packages | actualizar-paquetes-bun | 516-line guide; batch 3 start; ES link for crear-blog-astro-gratis only; all flags/commands/code verbatim |
| 2026-10-18 | nicegui-get-started | empezar-nicegui | 491-line NiceGUI 3.x tutorial; all internal links EN (no ES targets); proxy anchor rewritten to translated heading slug |
| 2026-10-18 | superlogical-rex | superlogical-rex | Rex multiplexer briefing; ES links: tmux-comandos-basicos, terminal-ghostty, mejores-clientes-herdr, mejores-plugins-herdr; Lua/CLI blocks verbatim |
| 2026-10-18 | streamlit-vs-nicegui | streamlit-vs-nicegui | Streamlit/NiceGUI comparison; Python examples + inline SVG diagrams verbatim; explanatory prose + comparison tables translated |
| 2026-10-18 | zoxide | zoxide-tutorial | zoxide shell navigation guide; shell commands/flags/vars verbatim; ES links for fish/Ghostty translations |
| 2026-10-18 | docker-env-vars | variables-entorno-docker | Docker env vars deep-dive; Dockerfile/Compose/shell/SVG blocks verbatim; all internal links EN (no ES targets) |
| 2026-10-18 | deploy-emdash-cloudflare-workers | desplegar-emdash-cloudflare-workers | EmDash on CF Workers (series 4); wrangler JSONC/bindings/commands verbatim; all internal links EN |
| 2026-10-18 | deploy-emdash-docker | desplegar-emdash-docker | EmDash Docker deploy (series 6); Dockerfile/compose/benchmarks verbatim; ES links: desplegar-emdash-cloudflare-workers, emdash-enviar-email; tags trimmed to 3 |
| 2026-10-18 | emdash-send-email | emdash-enviar-email | EmDash email (series 5); send_email binding + emdash-smtp; wrangler/npm commands verbatim; ES links: desplegar-emdash-cloudflare-workers, desplegar-emdash-docker anchors |
| 2026-10-18 | sed-change-case | sed-cambiar-mayusculas-minusculas | sed case conversion guide; all commands/code/anchors verbatim; tags trimmed to 3 (dropped `text-processing`); all internal links EN |
| 2026-10-18 | sed-insert-append-text | sed-insertar-anadir-texto | 1071-line sed insert/append guide; all sed commands/scripts verbatim; anchors rewritten to ES heading slugs; batch 4 start |
| 2026-10-18 | best-oh-my-zsh-plugins | mejores-plugins-oh-my-zsh | Oh My Zsh plugins roundup; plugin names/commands verbatim; all internal links EN |
| 2026-10-18 | deploy-astro-easypanel | desplegar-astro-easypanel | Astro on Easypanel guide; aliases @components/@assets used; ES links where targets exist |
| 2026-10-18 | add-contact-form-astro | anadir-formulario-contacto-astro | Astro contact form guide; component code blocks verbatim; anchors rewritten to ES slugs |
| 2026-10-18 | easypanel-modern-server-control-panel | easypanel-panel-servidor-moderno | Easypanel 2.36 review; CLI/MCP/API/commands verbatim; ES links: desplegar-astro-easypanel, bsi-security-report-docker-ufw |
| 2026-10-18 | add-accordion-carrd | anadir-acordeon-faq-carrd | Carrd accordion embed guide; HTML/CSS/JS blocks + inline SVGs verbatim; all internal links EN |
| 2026-10-18 | redirect-docker-logs-to-a-single-file | redirigir-logs-docker-un-solo-archivo | Docker logging 3-method guide; commands/daemon.json/compose verbatim; ES links: variables-entorno-docker, limpiar-docker-overlay2 |
| 2026-10-18 | copy-multiple-files-in-one-layer-using-a-dockerfile | copiar-varios-archivos-una-capa-dockerfile | Dockerfile COPY layer guide; all Dockerfiles/shell verbatim; ES links: variables-entorno-docker, limpiar-docker-overlay2 (subagent) |
| 2026-10-18 | shottr-mac-screenshot-tool | shottr-herramienta-capturas-mac | Shottr Mac review; shortcuts/UI labels preserved; ES links: terminal-ghostty, fish-shell-macos-configuracion (subagent) |
| 2026-10-18 | convert-images-to-svg | convertir-imagenes-a-svg | Image→SVG guide; tags trimmed to 3; anchors rewritten; ES links: crear-blog-astro-gratis, agente-imagen-mastra-kie-ai, mejores-skills-ia-diseno-web (subagent) |
| 2026-10-18 | emdash-custom-theme | emdash-tema-personalizado | EmDash series (theme); 14 code blocks verbatim; series meta preserved; no ES links applicable (subagent) |
| 2026-10-18 | install-plausible-analytics | instalar-plausible-analytics | Plausible self-host guide; compose/commands verbatim; ES link: hetzner-cloud-resena (subagent) |
| 2026-10-18 | deploy-uptime-kuma | desplegar-uptime-kuma | Uptime Kuma on Coolify; code blocks verbatim; all internal links EN (no ES targets) (subagent) |
| 2026-10-18 | emdash-cms-review | emdash-cms-resena | EmDash CMS review; ES link: montar-bucket-s3-sistema-archivos-vps; series meta preserved (subagent) |
| 2026-10-18 | shots-so-mockups | shots-mockups | Shots mockup tool review; UI labels/product names preserved; ES links: crear-blog-astro-gratis, shottr-herramienta-capturas-mac, convertir-imagenes-a-svg (subagent) |
| 2026-10-19 | deploy-astro-on-vps | desplegar-astro-en-vps | Astro on VPS with CloudPanel guide; all 19 code blocks + nginx/cron verbatim; CloudPanel UI labels kept EN; ES links: desplegar-astro-easypanel, anadir-formulario-contacto-astro, crear-blog-astro-gratis (subagent) |
| 2026-10-19 | emdash-cms-tutorial | emdash-cms-tutorial | EmDash CMS tutorial (series); code blocks verbatim; ES links: emdash-cms-resena ×3; series meta preserved (subagent) |
| 2026-10-19 | coolify-install-heroku-alternative | instalar-coolify-alternativa-heroku | Coolify install guide; commands/compose verbatim; ES links: bunny-storage-vs-s3-vs-backblaze, hetzner-cloud-resena (subagent) |
| 2026-10-19 | muse-ai-meta-agent | muse-agente-meta-ia | Muse AI agent briefing; invite codes/UI labels verbatim; ES links: guia-configuracion-openclaw, muse-tinyfish-busqueda-fetch, tinyfish-busqueda-web-agentes-ia (subagent) |
| 2026-10-19 | uptime-kuma-vs-gatus | uptime-kuma-vs-gatus | Uptime Kuma vs Gatus comparison; 16 code blocks verbatim; ES links: forgejo-woodpecker-ci-cicd, montar-bucket-s3-sistema-archivos-vps, traceway-guia-autoalojamiento (subagent) |
| 2026-10-19 | install-cloudpanel-host-nodejs | instalar-cloudpanel-alojar-nodejs | CloudPanel Node.js guide; 23 code blocks verbatim; CloudPanel UI labels EN; anchor rewritten (subagent) |
| 2026-10-19 | control-ai-agents-from-phone-moshi-herdr | controlar-agentes-ia-desde-telefono-moshi-herdr | Moshi/Herdr phone control (Herdr series); UI labels EN; ES links: guia-configuracion-opencode, guia-configuracion-pi-agent, opencode-vs-pi-agent, superlogical-rex (subagent) |
| 2026-10-19 | responsive-youtube-astrojs | youtube-responsive-astrojs | Responsive YT embeds in Astro; 8 code blocks + SVG diagram verbatim; ES links: crear-blog-astro-gratis ×2, guia-bunny-stream (subagent) |
| 2026-10-19 | embed-youtube-videos-to-gatsby | incrustar-videos-youtube-gatsby | Gatsby YT embed guide; 22 code blocks verbatim; anchor→solución-de-problemas; ES links: crear-blog-astro-gratis, migracion-wordpress-a-astro, guia-bunny-stream (subagent) |
| 2026-10-19 | gatsby-js-online-courses | cursos-online-gatsby-js | Gatsby courses roundup; course names/links verbatim; anchor rewritten; ES links: crear-blog-astro-gratis, migracion-wordpress-a-astro, nvm-fish-shell (subagent) |
| 2026-10-19 | benchmark-cloud-servers | benchmark-servidores-cloud | VPS benchmarking guide (yabs/fio); 9 code blocks verbatim; tags trimmed to 3; ES link: hetzner-cloud-resena (subagent) |
| 2026-10-19 | composio-mcp-guide | guia-composio-mcp | Composio MCP guide; 17 code blocks verbatim; ES links: mejores-skills-ia-diseno-web, mejores-llms-opensource-alternativa-claude (subagent) |
| 2026-10-19 | vps-price-increases | subidas-precios-vps | VPS price hikes explainer; AmazonProduct props translated; ES links: alternativas-portainer, contenedores-docker-servidor-casa (subagent) |
| 2026-10-19 | self-host-jellyfin | autoalojar-jellyfin | Jellyfin self-host guide; 18 code blocks verbatim; ES link: subidas-precios-vps (subagent) |
| 2026-10-19 | astro-link-shortener | acortador-enlaces-astro | Astro link shortener; 6 code blocks verbatim; all internal links EN (subagent) |
| 2026-10-19 | best-2-5-10gbe-switch-homelab | mejores-switches-2-5-10gbe-homelab | 2.5/10GbE switch roundup; AmazonProduct props translated; ES link: contenedores-docker-servidor-casa (subagent) |
| 2026-10-19 | best-mini-pc-local-llm | mejores-mini-pc-llm-local | Mini PC for local LLMs roundup; AmazonProduct props translated; ES links: mejores-llms-opensource-alternativa-claude, mejores-switches-2-5-10gbe-homelab, ollama-docker-instalacion (subagent) |
| 2026-10-19 | best-mini-pc-proxmox | mejores-mini-pc-proxmox | Proxmox mini PC roundup; 3 code blocks verbatim; AmazonProduct props translated; ES links: contenedores-docker-servidor-casa, mejores-switches-2-5-10gbe-homelab (subagent) |
| 2026-10-19 | best-nas-homelab-docker-proxmox | mejores-nas-homelab-docker-proxmox | NAS homelab roundup; AmazonProduct props translated; ES links: contenedores-docker-servidor-casa, mejores-switches-2-5-10gbe-homelab (subagent) |
| 2026-10-19 | best-tb5-dock-macbook-pro | mejores-docks-tb5-macbook-pro | TB5 dock MacBook roundup; AmazonProduct props translated; ES links: mejores-docks-thunderbolt-5, mejores-switches-2-5-10gbe-homelab, resena-ivanky-fusiondock-ultra (subagent) |
| 2026-10-19 | best-tb5-nvme-enclosures | mejores-carcasas-nvme-tb5 | TB5 NVMe enclosure roundup; specs/models verbatim; ES link: mejores-docks-thunderbolt-5 (subagent) |
| 2026-10-19 | best-ups-for-home-server | mejores-sai-servidor-casa | UPS roundup; AmazonProduct props translated; ES links: mejores-switches-2-5-10gbe-homelab, contenedores-docker-servidor-casa; fixed missing code fence in EN source (subagent) |
| 2026-10-19 | black-friday-home-server-deals | ofertas-black-friday-servidor-casa | BF homelab deals roundup; AmazonProduct props translated; ES links: mejores-docks-thunderbolt-5, resena-ivanky-fusiondock-ultra, contenedores-docker-servidor-casa (subagent) |
| 2026-10-19 | caldigit-ts5-vs-anker-prime-tb5 | caldigit-ts5-vs-anker-prime-tb5 | CalDigit vs Anker TB5 comparison; ES links: mejores-docks-thunderbolt-5, mejores-docks-tb5-macbook-pro, resena-ivanky-fusiondock-ultra (subagent) |
| 2026-10-19 | astro-vs-wordpress | astro-vs-wordpress | Astro vs WP comparison; 28 code blocks verbatim; ES links ×9: migracion-wordpress-a-astro, hetzner-cloud-resena, crear-blog-astro-gratis, subidas-precios-vps, anadir-formulario-contacto-astro, instalar-coolify-alternativa-heroku, dashboard-admin-woocommerce, desplegar-astro-en-vps (subagent) |
| 2026-10-19 | pluton-self-hosted-backup | pluton-backup-autoalojado | Pluton backup guide; yaml/env/bash/caddy blocks verbatim; internal links EN (subagent) |
| 2026-10-19 | self-hosted-apps-cloudflare-workers | apps-autoalojadas-cloudflare-workers | Self-hosted CF Workers apps roundup; ES link: contenedores-docker-servidor-casa; fixed double-slash typos in EN source (subagent) |
| 2026-10-19 | fish-audio-image-video-generation | fish-audio-generacion-imagen-video | Fish Audio image/video gen; API commands verbatim; ES links: resena-fish-audio, fish-audio-vs-elevenlabs, fish-audio-clonar-voz (subagent) |
| 2026-10-19 | hqbase-self-hosted-shared-inbox | hqbase-bandeja-compartida-autoalojada | HQBase shared inbox guide; commands verbatim; ES links: subidas-precios-vps, apps-autoalojadas-cloudflare-workers (subagent) |
| 2026-10-19 | bsi-security-report-docker-ufw | informe-seguridad-bsi-docker-ufw | BSI/Docker UFW security report; iptables/ufw/sshd blocks verbatim; all internal links EN (subagent) |
| 2026-10-19 | ai-coding-tools | herramientas-codificacion-ia | AI coding tools master guide; tags trimmed 7→3; ES links: guia-configuracion-opencode, alternativas-github-copilot-2026, mejores-llms-opensource-alternativa-claude (subagent) |
| 2026-10-19 | kie-ai-video-generation | kie-ai-generacion-video | Kie.ai video gen guide; 12 code blocks verbatim; ES links: agente-imagen-mastra-kie-ai ×4, resena-kie-ai ×2 (subagent) |
| 2026-10-19 | opencode-go-vs-clinepass-cheap-models | opencode-go-vs-clinepass-modelos-baratos | OpenCode Go vs Cline comparison; UI labels EN; ES links: opencode-go-plan, mejores-modelos-baratos-hermes-agent, guia-configuracion-opencode, alternativas-github-copilot-2026 (subagent) |
| 2026-10-19 | top-ai-github-repos | mejores-repos-github-ia | AI GitHub repos catalog; 13 anchors rewritten to ES slugs; 17 ES links applied (subagent) |
| 2026-10-19 | mastra-tools-vs-mcp | herramientas-mastra-vs-mcp | Mastra tools vs MCP; ts/bash/text blocks verbatim; all internal links EN (subagent) |
| 2026-10-19 | mastra-fish-audio-tts | mastra-fish-audio-tts | Mastra + Fish Audio TTS guide; 16 code blocks verbatim; 12 links remapped to ES (resena-fish-audio, fish-audio-clonar-voz, fish-audio-vs-elevenlabs, fish-audio-vs-minimax, agente-imagen-mastra-kie-ai, herramientas-mastra-vs-mcp) (subagent) |
| 2026-10-19 | buzz-block-docker-setup | configuracion-buzz-block-docker | BuzzBlock Docker setup; 25 code blocks verbatim; ES links: subidas-precios-vps, instalar-coolify-alternativa-heroku, guia-configuracion-hermes-agent, redirigir-logs-docker-un-solo-archivo, mejores-repos-github-ia (subagent) |
| 2026-10-19 | best-headless-cms-for-astro | mejores-cms-headless-astro | Headless CMS for Astro roundup; ES links: migracion-wordpress-a-astro, crear-blog-astro-gratis, subidas-precios-vps (subagent) |
| 2026-10-23 | carrd-countdown-styling | estilos-cuenta-regresiva-carrd | Carrd countdown timer guide; 15 code blocks verbatim; anchors remapped; ES links: anadir-acordeon-faq-carrd, instalar-plausible-analytics (subagent) |
| 2026-10-23 | convex-self-host | autoalojar-convex | Convex self-host guide (Docker Compose + Dokploy); tags trimmed 4→3; ES links: subidas-precios-vps, coolify-vs-dokploy-vs-kamal-2 (subagent) |
| 2026-10-23 | hetzner-cloud-cost-optimized-plans | hetzner-cloud-precios-2026 | Hetzner 2026 pricing explainer; @images alias kept; decimal-comma prices; ES links: subidas-precios-vps ×2, benchmark-servidores-cloud, hetzner-cloud-resena, comparativa-arm-vs-x86-vps, informe-seguridad-bsi-docker-ufw (subagent) |
| 2026-10-23 | vibeproxy-ai-subscriptions-guide | guia-vibeproxy-suscripciones-ia | VibeProxy subscriptions guide; 21 code blocks verbatim; tags trimmed 7→3; 3 anchors remapped; 10 links switched to ES slugs (subagent) |
| 2026-10-23 | zerobyte-restic-gui | zerobyte-interfaz-grafica-restic | Zerobyte v0.43 rewrite translation; 32 code blocks verbatim; 3 anchors remapped; ES links ×5 incl. subidas-precios-vps, pluton-backup-autoalojado; fixed same indented-`<Tab>` MDX parse bug as EN source (subagent) |
| 2026-10-19 | openship-self-hosted-paas | openship-paas-autoalojado | OpenShip PaaS guide; 10 code blocks verbatim; ES links: instalar-coolify-alternativa-heroku ×3, subidas-precios-vps (subagent) |
| 2026-10-19 | lm-studio-bionic | lm-studio-bionic | LM Studio Bionic setup; 10 ES links applied; UI labels kept EN with «» quotes (subagent) |
| 2026-10-19 | mastra-vs-eve-typescript-ai-agents | mastra-vs-eve-agentes-ia-typescript | Mastra vs EVE comparison; 30 code blocks verbatim; anchor re-slugged; ES links: herramientas-mastra-vs-mcp, subidas-precios-vps, guia-configuracion-hermes-agent (subagent) |
| 2026-10-19 | meetily-self-hosted-ai-meeting-assistant | meetily-asistente-reuniones-ia-autoalojado | Meetily AI meeting assistant; code blocks verbatim; ES links: guia-configuracion-hermes-agent, subidas-precios-vps (subagent) |
| 2026-10-19 | executor-sh-vs-composio | executor-sh-vs-composio | executor.sh vs Composio; 15 code blocks verbatim; ES links: guia-composio-mcp, mejores-llms-opensource-alternativa-claude, subidas-precios-vps, instalar-coolify-alternativa-heroku, guia-configuracion-hermes-agent (subagent) |
| 2026-10-19 | fluidvoice-mac-dictation | fluidvoice-dictado-mac | FluidVoice Mac dictation; ES links: freebuff-agente-ia-gratis ×2, resena-fish-audio, shottr-herramienta-capturas-mac (subagent) |
| 2026-10-19 | chatto-self-hosted | chatto-autoalojado | Chatto self-hosted chat; ES links: hetzner-cloud-resena, variables-entorno-docker, redirigir-logs-docker-un-solo-archivo, instalar-plausible-analytics, desplegar-uptime-kuma, instalar-coolify-alternativa-heroku (subagent) |
| 2026-10-19 | astro-vs-nextjs-vs-tanstack-start-which-wins | astro-vs-nextjs-vs-tanstack-start-cual-gana | Framework comparison 2026; code blocks verbatim; ES links: desplegar-astro-en-vps, instalar-coolify-alternativa-heroku (subagent) |
| 2026-10-19 | herdr-agent-multiplexer | herdr-multiplexor-agentes | Herdr agent multiplexer; 16 code blocks verbatim; anchor re-slugged; 9 ES links applied (subagent) |
| 2026-10-19 | cognee-vs-hindsight | cognee-vs-hindsight | Cognee vs Hindsight memory comparison; python blocks verbatim; ES link: mejores-repos-github-ia (subagent) |
| 2026-10-19 | hindsight-docker-deploy | desplegar-hindsight-docker | Hindsight Docker deploy; 344 code lines verbatim; 6 ES links applied incl. cognee-vs-hindsight (subagent) |
| 2026-10-19 | astro-7-faster-builds | astro-7-compilaciones-mas-rapidas | Astro 7 faster builds; code blocks verbatim; ES link: crear-blog-astro-gratis (subagent) |
| 2026-10-19 | tinyfish-free-firecrawl-alternative | tinyfish-alternativa-gratuita-firecrawl | TinyFish vs Firecrawl; curl/JSON blocks verbatim; no internal links (subagent) |
| 2026-10-19 | build-ai-agent-mastra | crear-agente-ia-mastra | Build a Mastra AI agent; 20 code blocks verbatim; 17 links remapped to ES versions (subagent) |
| 2026-10-19 | astro-db-bunny-database | astro-db-bunny-database | Astro DB + Bunny Database guide; code verbatim; ES links: resena-bunny-net ×2, crear-blog-astro-gratis ×2, bunny-storage-vs-s3-vs-backblaze, montar-bucket-s3-sistema-archivos-vps (subagent) |
| 2026-10-19 | vercel-eve-ai-agent | vercel-eve-agente-ia | Vercel EVE agent guide; 27 code blocks verbatim; ES links: mejores-llms-opensource-alternativa-claude ×2 (subagent) |
| 2026-10-19 | tanstack-start-bunny-database-drizzle | tanstack-start-bunny-database-drizzle | TanStack Start + Bunny + Drizzle; 22 code blocks verbatim; ES links: resena-bunny-net ×3, astro-db-bunny-database, montar-bucket-s3-sistema-archivos-vps, bunny-storage-vs-s3-vs-backblaze, guia-bunny-stream (subagent) |
| 2026-10-19 | block-ads-manifest-v3-nextdns | bloquear-anuncios-manifest-v3-nextdns | NextDNS vs Manifest V3 ad blocking; code verbatim; all internal links EN (subagent) |
| 2026-10-19 | codex-app-any-model | codex-app-cualquier-modelo | Codex app with any model; TOML/bash verbatim; ES links: opencode-go-plan ×4, mejores-llms-opensource-alternativa-claude ×3, mejores-modelos-baratos-hermes-agent, alternativas-github-copilot-2026 (subagent) |
| 2026-10-19 | coolify-vs-dokploy-vs-kamal-2 | coolify-vs-dokploy-vs-kamal-2 | Coolify vs Dokploy vs Kamal 2; ES links: instalar-coolify-alternativa-heroku ×3, instalar-plausible-analytics, hetzner-cloud-resena ×2 (subagent) |
| 2026-10-19 | headscale-self-hosted-tailscale-setup | headscale-tailscale-autoalojado | Headscale Tailscale setup; ES links: subidas-precios-vps, desplegar-uptime-kuma, contenedores-docker-servidor-casa (subagent) |
| 2026-10-19 | coolify-v5-self-hosted-paas-review | resena-coolify-v5-paas-autoalojado | Coolify v5 review; 11 ES links applied incl. forgejo-woodpecker-ci-cicd, railpack-vs-nixpacks, coolify-vs-dokploy-vs-kamal-2 (subagent) |
| 2026-10-19 | netbird-vs-headscale-vs-tailscale | netbird-vs-headscale-vs-tailscale | NetBird vs Headscale vs Tailscale; ES links: headscale-tailscale-autoalojado ×3, resena-coolify-v5-paas-autoalojado (subagent) |
| 2026-10-19 | pangolin-cloudflare-tunnels-alternative | pangolin-alternativa-cloudflare-tunnels | Pangolin CF Tunnels alternative; ES links: subidas-precios-vps, headscale-tailscale-autoalojado ×2, desplegar-uptime-kuma, resena-coolify-v5-paas-autoalojado (subagent) |
| 2026-10-19 | mirage-virtual-filesystem-ai-agents | mirage-sistema-archivos-virtual-agentes-ia | Mirage VFS for AI agents; 10 code blocks verbatim; 10 ES links applied (subagent) |
| 2026-10-19 | best-hermes-dashboards | mejores-paneles-hermes | Hermes dashboards roundup; 3 anchors re-slugged; ES links: guia-configuracion-hermes-agent ×3, guia-kanban-hermes ×3, mejores-modelos-baratos-hermes-agent ×2, tinyfish-busqueda-web-gratis-agentes (subagent) |
| 2026-10-19 | vps-ai-coding-setup | vps-configuracion-codificacion-ia | VPS AI coding setup; 40 code blocks verbatim; ES link: subidas-precios-vps; UI labels kept EN (subagent) |
| 2026-10-19 | deploy-astro-bunny-net | desplegar-astro-bunny-net | Astro on Bunny.net deploy; 14 code blocks verbatim; ES links: resena-bunny-net, crear-blog-astro-gratis, astro-db-bunny-database (subagent) |
| 2026-10-19 | hermes-dashboard-guide | guia-panel-hermes | Hermes dashboard guide; 29 code blocks verbatim; anchor re-slugged; ES links: guia-configuracion-hermes-agent, mejores-paneles-hermes, mejores-modelos-baratos-hermes-agent, guia-kanban-hermes (subagent) |
| 2026-10-19 | hermes-agent-mimo-v2-pro | hermes-agent-mimo-v2-pro | MiMo V2 Pro on Hermes; ES links: guia-configuracion-hermes-agent ×5, mejores-modelos-baratos-hermes-agent, mejores-paneles-hermes (subagent) |
| 2026-10-19 | cmux-terminal | terminal-cmux | cmux terminal; ES link: terminal-ghostty ×3 (subagent) |
| 2026-10-19 | arm-vs-x86-vps-server-benchmarks | comparativa-arm-vs-x86-vps | ARM vs x86 VPS benchmark; yabs block verbatim; ES link: subidas-precios-vps (subagent) |
| 2026-10-19 | best-free-wordpress-backup-plugins | mejores-plugins-gratuitos-backup-wordpress | WP backup plugins roundup; no internal links (subagent) |
| 2026-10-19 | best-web-scraping-plugins-for-wordpress | mejores-plugins-web-scraping-wordpress | WP scraping plugins roundup; no internal links (subagent) |

## Known pre-existing issues (not blocking)

- ES posts are inconsistent on accents (older ones ASCII-only) — new translations use proper Spanish.
- Some ES posts lack `canonical` — fine (falls back to `es/<file-slug>`), but new files should set it.
