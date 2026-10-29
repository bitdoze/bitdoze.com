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
| 2026-10-24 | best-tech-gadgets-2027 | mejores-gadgets-2027 | 13-product gadget roundup; 2 ES links (docks, headscale); fixed EN/ES 8→13 count drift (subagent) |
| 2026-10-24 | best-10-inch-mini-rack | mejor-mini-rack-10-pulgadas | 10" mini rack guide; 3 ES links (switches, proxmox, sai); 16 /go/ slugs verified (subagent) |
| 2026-10-24 | dokploy-update-docker-compose | actualizar-docker-compose-dokploy | Dokploy compose update guide; 3 ES links; 11 code blocks verbatim; TODO image comments preserved (subagent) |
| 2026-10-24 | best-home-assistant-hardware | mejor-hardware-home-assistant | HA hardware guide; 3 ES links (docker, proxmox, sai); 1 kept EN (plex-jellyfin pending) (subagent) |
| 2026-10-24 | best-mac-mini-for-openclaw | mejor-mac-mini-openclaw | Mac mini for OpenClaw guide; 13 ES links; code verbatim; kept mini-pc-home-server EN (subagent) |
| 2026-10-24 | best-mini-pc-plex-jellyfin | mejor-mini-pc-plex-jellyfin | Plex/Jellyfin mini PC guide; 7 ES links incl. disk-found HA sibling; 2 yaml blocks verbatim (subagent) |
| 2026-10-24 | best-rack-mount-ups-homelab | mejor-ups-rack-homelab | Rack UPS guide; 3 ES links incl. disk-found mini-rack sibling; SAI terminology (subagent) |
| 2026-10-24 | best-open-source-grok-bot-alternatives | mejores-alternativas-grok-bot-open-source | Grok bot alternatives; 17 ES links, 1 EN kept; 8 anchors re-slugged; 7 code blocks verbatim (subagent) |
| 2026-10-24 | cloudreve-docker-setup | instalar-cloudreve-docker | Cloudreve 4.19 Docker guide; 8 ES links, 8 EN kept; 24 code blocks verbatim; subagent build passed 1554 pages (subagent) |
| 2026-10-24 | tern-terminal | terminal-tern | Tern terminal review; 11 ES links; 18 webp refs verified; UI labels kept EN (subagent) |
| 2026-10-24 | best-woocommerce-barcode-and-qr-code-plugins | mejores-plugins-woocommerce-codigos-barras-qr | WooCommerce barcode plugins; 1 ES link (dashboard-admin); no /go/ links (subagent) |
| 2026-10-24 | breakdance-builder-review | resena-breakdance-builder | Breakdance review; imports fixed to @components; go.bitdoze.com link kept (subagent) |
| 2026-10-24 | use-claude-sonnet-4-5-gpt-5-free | usar-claude-sonnet-4-5-gpt-5-gratis | Free Claude/GPT-5 access guide; 9 ES links, 2 EN kept; 9 code blocks verbatim; tags 6→3 (subagent) |
| 2026-10-24 | breakdance-kinsta-static-site | breakdance-kinsta-sitio-estatico | Breakdance+Kinsta static site; no internal links; git block verbatim (subagent) |
| 2026-10-24 | choose-domain-name | elegir-nombre-dominio | Domain name guide; 9 external links only; YouTubeEmbed label translated (subagent) |
| 2026-10-24 | cloudpanel-varnish-cache | varnish-cache-cloudpanel | CloudPanel Varnish guide; 1 ES link (vps prices); code verbatim (subagent) |
| 2026-10-24 | create-a-sticky-block-in-gutenberg | crear-bloque-fijo-gutenberg | Gutenberg sticky block; no internal links; external only (subagent) |
| 2026-10-24 | deindexed-in-bing-and-duckduckgo-now-what | desindexado-bing-duckduckgo-que-hacer | Deindexing recovery guide; external links only; support template translated (subagent) |
| 2026-10-24 | digitalocean-vs-vultr-vs-hetzner | digitalocean-vs-vultr-vs-hetzner | VPS comparison; 1 ES link (vps prices); prices localized; benchmarks verbatim (subagent) |
| 2026-10-24 | export-wordpress-post-urls-titles | exportar-urls-titulos-wordpress | WP export URLs guide; SQL/WP-CLI verbatim; phpMyAdmin ES labels (subagent) |
| 2026-10-24 | how-to-setup-smtp-relay-email-on-zeptomail | configurar-relay-smtp-zeptomail | ZeptoMail SMTP relay; external links only; code verbatim (subagent) |
| 2026-10-24 | hetzner-oracle-arm-performance | rendimiento-arm-hetzner-oracle | ARM VPS benchmark; 1 ES link; prices localized; sibling backlink TODO noted (subagent) |
| 2026-10-24 | install-uptime-kuma | instalar-uptime-kuma | Uptime Kuma install; 1 ES link; bash/yaml/nginx verbatim; distinct from desplegar-uptime-kuma (subagent) |
| 2026-10-24 | install-wordpress-on-ubuntu-arm | instalar-wordpress-ubuntu-arm | WP on ARM Ubuntu; 2 ES links (vps prices, disk-found varnish); secure-cloudpanel kept EN (subagent) |
| 2026-10-24 | safely-update-cloudpanel | actualizar-cloudpanel-seguro | CloudPanel update guide; 1 ES link; bash verbatim; UI labels EN (subagent) |
| 2026-10-24 | secure-cloudpanel | securizar-cloudpanel | CloudPanel security; 2 ES links (vps prices, disk-found update guide); code verbatim (subagent) |
| 2026-10-24 | secure-wordpress-2fa | securizar-wordpress-2fa | WP 2FA guide; zoho-smtp link kept EN (file lands later); plugin UI labels EN (subagent) |
| 2026-10-24 | send-emails-in-wordpress-zoho-smtp-fluentsmtp | enviar-emails-wordpress-zoho-smtp-fluentsmtp | Zoho SMTP+FluentSMTP; 1 ES link; FluentSMTP UI labels EN (subagent) |
| 2026-10-24 | speed-up-wordpress-with-cloudflare-varnish-and-redis | acelerar-wordpress-cloudflare-varnish-redis | WP speed stack; 2 ES links (vps prices, disk-found varnish); prices localized (subagent) |
| 2026-10-24 | upload-vcard-vcf-files-to-wordpress | subir-vcard-vcf-wordpress | vCard upload to WP; no internal links; PHP/HTML verbatim; WP UI in es-ES (subagent) |
| 2026-10-24 | surecart-review | resena-surecart | SureCart review; no internal links; numbers localized; e-comm terms kept EN (subagent) |
| 2026-10-24 | ai-docker-deploy-skill | skill-despliegue-docker-ia | AI Docker deploy skill; 9 ES links, 5 EN kept; 13 code blocks verbatim (subagent) |
| 2026-10-24 | create-your-own-ai-agent | crear-tu-propio-agente-ia | Discord AI agent with Agno; 2 ES links, 2 EN kept; code blocks verbatim (subagent) |
| 2026-10-24 | carrd-dark-mode-toggle | alternador-modo-oscuro-carrd | Carrd dark mode deep-dive (949 lines); 1 ES link; inline SVG text translated; 11 code blocks verbatim (subagent) |
| 2026-10-24 | carrd-popup-modal | ventana-modal-emergente-carrd | Carrd popup modal (913 lines); 3 ES links incl. disk-found dark-mode; 7 code blocks verbatim (subagent) |
| 2026-10-24 | carrd-testimonial-slider | slider-testimonios-carrd | Carrd testimonial slider (1050 lines); 3 ES links; 3 anchors re-slugged; 12 code blocks verbatim (subagent) |
| 2026-10-24 | nextdns-review | resena-nextdns | NextDNS review (460 lines); 6 ES links, 3 EN kept; 6 code blocks verbatim (subagent) |
| 2026-10-24 | carrd-whatsapp-button | boton-whatsapp-carrd | Carrd WhatsApp button (843 lines); 5 ES links incl. disk-found modal/dark-mode; 15 code blocks verbatim (subagent) |
| 2026-10-24 | block-ads-malware-dns-protection | bloquear-anuncios-malware-dns | DNS ad-block guide (596 lines); 7 ES links, 6 EN kept; 11 code blocks verbatim (subagent) |
| 2026-10-24 | tugtainer-docker-autoupdate | tugtainer-autoactualizacion-docker | Tugtainer Watchtower fork (694 lines); 6 ES links; 11 code blocks verbatim; tags 4→3 (subagent) |
| 2026-10-24 | python-video-intro-editor | editor-intros-video-python | MoviePy intro editor (875 lines); 3 ES links, 7 EN kept; 25 code blocks verbatim (subagent) |
| 2026-10-24 | termix-self-host | termix-autoalojado | Termix SSH manager (595 lines); 6 ES links, 7 EN kept; 8 code blocks verbatim (subagent) |
| 2026-10-24 | beszel-uptime-kuma | beszel-uptime-kuma | Beszel+Uptime Kuma monitoring (755 lines); 5 ES links incl. disk-found instalar-uptime-kuma; 14 code blocks verbatim (subagent) |
| 2026-10-24 | mcp-introduction-beginners | introduccion-mcp-principiantes | MCP intro (512 lines); 12 ES links, 10 EN kept; 10 code blocks verbatim (subagent) |
| 2026-10-24 | carrd-smooth-scroll | desplazamiento-suave-carrd | Carrd smooth scroll (595 lines); 4 ES links incl. disk-found modal/dark-mode; 1 anchor re-slugged; 5 code blocks verbatim (subagent) |
| 2026-10-24 | rustfs-self-host | rustfs-autoalojado | RustFS S3 storage (1002 lines); 7 ES links incl. disk-found DO/beszel; 2 anchors re-slugged; 40 code blocks verbatim (subagent) |
| 2026-10-24 | cognee-self-host | cognee-autoalojado | Cognee memory engine (1392 lines); 7 ES links incl. disk-found beszel; 62 code blocks verbatim; 1 anchor re-slugged (subagent) |
| 2026-10-24 | convex-self-hosted-benchmark | benchmark-convex-autoalojado | Convex self-hosted benchmark; 8 ES links incl. 2 disk-found; 6 code blocks verbatim (subagent) |
| 2026-10-24 | dokploy-backups-cloudflare-r2 | backups-dokploy-cloudflare-r2 | Dokploy R2 backups (1102 lines); 11 ES links incl. disk-found rustfs/beszel; 42 code blocks verbatim (subagent) |
| 2026-10-24 | ai-programming-beginners-guide | guia-programacion-ia-principiantes | AI programming guide (1720 lines); 17 ES links incl. disk-found siblings; 42 code blocks verbatim (subagent) |
| 2026-10-27 | tanstack-start-dokploy-deploy | desplegar-tanstack-start-dokploy | 810 lines; 34 code blocks verbatim; 9 ES links rewritten, 4 stayed EN |\n| 2026-10-27 | docker-podman-ai-cli-tools-safe-environment | docker-podman-entorno-seguro-ia | 1686 lines; 76 code blocks verbatim; 9 ES links rewritten, 6 stayed EN |\n| 2026-10-27 | notifuse-self-host-newsletter | notifuse-newsletter-autoalojado | 777 lines; 15 code blocks verbatim; 12 ES links rewritten, 16 stayed EN |\n| 2026-10-27 | asus-vs-razer-thunderbolt-5-comparison | asus-vs-razer-thunderbolt-5-comparativa | 542 lines; 6 ES links rewritten, 4 stayed EN |\n| 2026-10-27 | github-copilot-complete-guide | guia-completa-github-copilot | 440 lines; 8 code blocks verbatim; 10 ES links rewritten, 2 stayed EN |\n| 2026-10-27 | asus-thunderbolt-5-dock-dc510-review | asus-dc510-dock-thunderbolt-5-resena | 604 lines; build passed (1675 pages); stale EN guide anchors remapped to ES heading slugs |\n| 2026-10-27 | ai-affiliate-websites-amazon | sitios-afiliados-amazon-ia | 462 lines; 9 code blocks verbatim; 6 ES links rewritten, 6 stayed EN; NOTE: stray YouTubeEmbed placeholder in EN source (renders broken on live page) |\n| 2026-10-27 | amp-code-free-ai-coding-agent | amp-code-agente-ia-gratis | 742 lines; 28 code blocks verbatim; 13 ES links rewritten, 3 stayed EN |\n| 2026-10-27 | asus-rog-strix-oled-xg32ucwg-review | resena-asus-rog-strix-oled-xg32ucwg | 333 lines; no code blocks; 1 link stayed EN (monitors guide pending) |\n| 2026-10-27 | brightdata-mcp-guide | guia-brightdata-mcp | 883 lines; 11 ES links rewritten, 5 stayed EN; 2 anchors remapped |\n| 2026-10-27 | best-32-inch-oled-monitors-guide | mejores-monitores-oled-32-pulgadas | 1006 lines exact; 6 ES links (1 on-disk ahead of index), 3 stayed EN; 6 anchors remapped |\n| 2026-10-27 | astro-ssg-build-optimization | astro-ssg-optimizacion-build | 874 lines; 17 code blocks byte-equal; 8 ES links, 9 stayed EN |\n| 2026-10-27 | carrd-sidebar-menu | menu-lateral-carrd | 816 lines exact; 494-line code block byte-equal; 4 ES links, 8 stayed EN |\n| 2026-10-27 | astro-i18n-localization | astro-i18n-localizacion | 3046 lines; 64 code blocks byte-equal; 5 ES links, 6 stayed EN |\n| 2026-10-27 | n8n-self-host-workflow-automation | automatizacion-n8n-autoalojado | 799 lines; 16 code blocks byte-equal; 5 ES links, 7 stayed EN |\n| 2026-10-27 | astro-convex-vercel-deployment | despliegue-astro-convex-vercel | 502 lines; 16 code blocks byte-equal; 7 ES links, 2 stayed EN |\n| 2026-10-27 | astro-convex-realtime-app | app-tiempo-real-astro-convex | 975 lines; 16 code blocks byte-equal; 5 ES links, 3 stayed EN |\n| 2026-10-27 | add-youtube-videos-astro-blog | anadir-videos-youtube-blog-astro | 817 lines; 20 code blocks byte-equal; 9 ES links, 1 stayed EN |\n| 2026-10-27 | google-opal-ai-app-builder | google-opal-creador-apps-ia | 382 lines; 2 code blocks byte-equal; 7 ES links, 1 stayed EN |\n| 2026-10-27 | stirling-pdf-self-host-manipulation | stirling-pdf-manipulacion-autoalojada | 795 lines; 25 code blocks byte-equal; 6 ES links, 6 stayed EN |\n| 2026-10-27 | searxng-self-host-privacy-search | searxng-busqueda-privada-autoalojada | 718 lines; 20 code blocks byte-equal; 5 ES links, 8 stayed EN; EN anchor bug noted |\n| 2026-10-27 | linux-dd-command-guide | guia-comando-dd-linux | 751 lines; 32 code blocks byte-equal; 1 ES link, 3 stayed EN |\n| 2026-10-27 | setup-nfs-linux | configurar-nfs-linux | 827 lines; 55 code blocks byte-equal; 3 ES links, 7 stayed EN |\n| 2026-10-27 | setup-webdav-nginx | configurar-webdav-nginx | 1042 lines; 48 code blocks byte-equal; 3 ES links, 8 stayed EN |\n| 2026-10-27 | setup-samba-linux | configurar-samba-linux | 1015 lines; 60 code blocks byte-equal; 6 ES links, 7 stayed EN; 2 anchors remapped |\n| 2026-10-27 | kiro-ai-ide | kiro-ide-ia | 534 lines; 10 code blocks byte-equal; 12 ES links, 0 stayed EN |\n| 2026-10-27 | uv-url-checker-script | script-uv-comprobador-url | 555 lines; 17 code blocks byte-equal; 3 ES links, 6 stayed EN |\n| 2026-10-27 | why-need-home-server | por-que-necesitas-servidor-casa | 556 lines; 11 ES links, 3 stayed EN |\n| 2026-10-27 | kimi-k2-ai-model | modelo-ia-kimi-k2 | 577 lines; 3 code blocks byte-equal; 8 ES links, 1 stayed EN |\n| 2026-10-27 | fix-rpm-transaction-lock-waiting | arreglar-bloqueo-transaccion-rpm | 82 lines; 5 code blocks byte-equal; no links |\n| 2026-10-27 | uv-text-to-speech-script | script-uv-texto-a-voz | 992 lines; 30 code blocks byte-equal; 5 ES links, 5 stayed EN |\n| 2026-10-27 | uv-run-scripts-guide | guia-uv-run-scripts | 880 lines; 48 code blocks byte-equal; 3 ES links, 5 stayed EN |\n| 2026-10-27 | tanstack-start-get-start | empezar-tanstack-start | 563 lines; 15 code blocks byte-equal; 8 ES links, 0 stayed EN |\n| 2026-10-27 | agno-mcp-tools-context7 | agno-herramientas-mcp-context7 | 374 lines; code blocks byte-equal; 5 ES links, 4 stayed EN |\n| 2026-10-27 | starship-ghostty-terminal | terminal-starship-ghostty | 642 lines; 50 code blocks byte-equal; 7 ES links, 3 stayed EN |\n| 2026-10-27 | STOPPED by user request | - | Pipeline halted at ~35/145 done; agno-workflow agent still in flight |\n| 2026-10-27 | agno-workflow-writing-team | equipo-escritura-agno-workflow | 1051 lines; 16 code blocks byte-equal; 4 ES links, 7 stayed EN; landed after main commit |\n| 2026-10-29 | superlogical-rex | superlogical-rex | sync: Tern table column + Tern/multiplexer sentences; fixed 3 stale EN links (herdr, cmux) |
| 2026-10-29 | tern-terminal | terminal-tern | sync: appended multiplexer-comparison sentence |
| 2026-10-29 | tmux-basics | tmux-comandos-basicos | sync: appended multiplexer-comparison sentence |
| 2026-10-29 | best-herdr-clients | mejores-clientes-herdr | sync: appended multiplexer-guide sentence; fixed 2 stale EN links |
| 2026-10-29 | best-herdr-plugins | mejores-plugins-herdr | sync: appended runtime/multiplexer sentence; fixed 2 stale EN links |
| 2026-10-29 | control-ai-agents-from-phone-moshi-herdr | controlar-agentes-ia-desde-telefono-moshi-herdr | sync: appended multiplexer-comparison clause; herdr link → ES |
| 2026-10-29 | herdr-agent-multiplexer | herdr-multiplexor-agentes | sync: added six-way comparison line before section break |
| 2026-10-29 | best-open-source-grok-bot-alternatives | mejores-alternativas-grok-bot-open-source | sync: moved YouTubeEmbed 1_XD92B5fWE into Rakazo section per EN |
| 2026-10-29 | duckduckgo-openclaw-search | busqueda-duckduckgo-openclaw | re-sync: full rewrite for @openclaw/duckduckgo-plugin method; 371 lines exact; 14 ES links (subagent) |
| 2026-10-29 | hetzner-cloud-cost-optimized-plans | hetzner-cloud-precios-2026 | sync: frontmatter title/meta_title/description re-translated (subagent) |
| 2026-10-29 | freebuff-free-ai-coding-agent | freebuff-agente-ia-gratis | sync: title/description + new meta_title field (subagent) |
| 2026-10-29 | opencode-go-plan | opencode-go-plan | sync: frontmatter re-translated for Go Plus framing (subagent) |
| 2026-10-29 | tinyfish-ai-agents-web-search | tinyfish-busqueda-web-agentes-ia | sync: added Muse AI MCP list item → /es/muse-tinyfish-busqueda-fetch/ (subagent) |
| 2026-10-29 | muse-ai-meta-agent | muse-agente-meta-ia | sync: frontmatter re-translated (subagent) |
| 2026-10-29 | best-2-5-10gbe-switch-homelab | mejores-switches-2-5-10gbe-homelab | sync: appended mini-rack sentence (subagent) |
| 2026-10-29 | best-mini-pc-proxmox | mejores-mini-pc-proxmox | sync: 3 added link sentences (plex-jellyfin, mini-rack, home-assistant) (subagent) |
| 2026-10-29 | best-tb5-dock-macbook-pro | mejores-docks-tb5-macbook-pro | sync: appended gadgets-roundup sentence (subagent) |
| 2026-10-29 | top-ai-github-repos | mejores-repos-github-ia | sync: frontmatter re-translated (60+ repos framing) + Grok Bot table row (subagent) |
| 2026-10-29 | lm-studio-bionic | lm-studio-bionic | sync: frontmatter re-translated (subagent) |
| 2026-10-29 | fish-audio-review | resena-fish-audio | sync: title/description + new meta_title (subagent) |
| 2026-10-29 | ivanky-fusiondock-ultra-review | resena-ivanky-fusiondock-ultra | sync: appended gadgets-roundup sentence (subagent) |
| 2026-10-29 | hermes-agent-setup-guide | guia-configuracion-hermes-agent | sync: 2 added paragraphs (mac-mini notice, grok-bot alternatives) (subagent) |
| 2026-10-29 | openclaw-ollama-local-models | openclaw-ollama-modelos-locales | sync: appended mac-mini sentence inside Apple Silicon notice (subagent) |
| 2026-10-29 | best-openclaw-dashboards | mejores-dashboards-openclaw | sync: appended mac-mini sentence (subagent) |
| 2026-10-29 | best-terminal-multiplexers | mejores-multiplexores-terminal | NEW: 581 lines; 12 code blocks byte-equal; 14 ES links incl. herdr/tmux/rex/tern/cmux siblings (subagent) |
| 2026-10-29 | nanobot-setup-guide | guia-configuracion-nanobot | re-sync: full rewrite; 1053 lines exact; 47 code blocks byte-equal; 22 ES links, 4 stayed EN (subagent) |
| 2026-10-29 | best-opensource-models-for-openclaw | mejores-modelos-opensource-openclaw | re-sync: full rewrite for GLM-5.3/MiniMax M3/Kimi K3.1; 638 lines exact; 14 ES links (subagent) |
| 2026-10-29 | arcane-docker-install | instalar-arcane | re-sync: full rewrite for Arcane 2.17 (new image, socket-proxy, OIDC, edge agents); 811 lines exact; 11 ES links, 11 stayed EN (subagent) |
| 2026-10-29 | best-ups-for-home-server | mejores-sai-servidor-casa | sync: Oct-23 price refresh, new NAS UPS section, rack-UPS links (subagent) |
| 2026-10-29 | best-thunderbolt-5-docks-guide | mejores-docks-thunderbolt-5 | sync: Oct-23 pricing, new cheaper-TS5 + TB5-hubs sections, anchors remapped (subagent) |
| 2026-10-29 | zcode-ai-review | resena-zcode-ai | sync: v3.16.3, Oct-2026 updates section, frontmatter re-translated (subagent) |
| 2026-10-29 | self-host-jellyfin | autoalojar-jellyfin | sync: N150 hardware update, affiliate notice, mini-pc links (subagent) |
| 2026-10-29 | ollama-docker-install | ollama-docker-instalacion | sync: affiliate notice, RTX 5060 Ti/EVO-X2 bullets, CUDA anchor link (subagent) |
| 2026-10-29 | best-mini-pc-local-llm | mejores-mini-pc-llm-local | sync: mac-mini link + new GPU-box/CUDA section (subagent) |
| 2026-10-29 | ai-docker-deploy-skill | skill-despliegue-docker-ia | re-sync: full rewrite; 621 lines; 16 ES links, 5 stayed EN (subagent) |
| 2026-10-29 | arcane-vs-dockhand | arcane-vs-dockhand | re-sync: full rewrite for Arcane 2.x licensing/telemetry; 415 lines; 7 ES links, 4 stayed EN (subagent) |
| 2026-10-29 | opencode-vs-pi-agent | opencode-vs-pi-agent | re-sync: full rewrite for OpenCode 2 / Pi 1.0+Durable; 265 lines; 9 ES links (subagent) |
| 2026-10-29 | portainer-alternatives | alternativas-portainer | re-sync: full rewrite; 650 lines; 13 ES links, 7 stayed EN (subagent) |
| 2026-10-29 | best-nas-homelab-docker-proxmox | mejores-nas-homelab-docker-proxmox | sync: Oct-23 pricing, drives table, DAS section, 2 FAQs (subagent) |
| 2026-10-29 | best-hermes-dashboards | mejores-paneles-hermes | sync: Scarf section, 24/7 hosting section, grok-bot link; migrated 3 stale EN links (subagent) |
| 2026-10-29 | create-your-own-ai-agent | crear-tu-propio-agente-ia | re-sync: full rewrite for Agno 2.5.10/3.x; 617 lines; 7 ES links, 4 stayed EN (subagent) |
| 2026-10-29 | dockge-install | instalar-dockge | re-sync: full rewrite (GHSA console, nightly, env vars, Portainer vs); 617 lines; 10 ES links, 12 stayed EN; canonical added (subagent) |
| 2026-10-29 | clawdbot-setup-guide | guia-configuracion-openclaw | re-sync: full rewrite for openclaw.json/plugin era; 939 lines exact; 32 code blocks byte-equal (subagent) |
| 2026-10-29 | best-open-source-llms-claude-alternative | mejores-llms-opensource-alternativa-claude | re-sync: full rewrite for Oct-16 update (Sonnet 5.5, MOPD, Z.ai); 855 lines exact (subagent) |
| 2026-10-29 | google-adk-multi-agent-search | google-adk-busqueda-multi-agente | 603 lines; 19 code blocks byte-equal; 6 ES links, 3 stayed EN (adk-start/agno-squad were in-flight) (subagent) |
| 2026-10-29 | google-adk-start | empezar-google-adk | 704 lines exact; 30 code blocks byte-equal; no internal links (subagent) |
| 2026-10-29 | dokploy-python-railpack-uv | dokploy-python-railpack-uv | 339 lines; code blocks verbatim; 5 ES links, 7 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | agno-squad | agno-squad | 1170 lines; 23 code blocks byte-equal; added YouTubeEmbed import; back-links to empezar-agno fixed (subagent) |
| 2026-10-29 | agno-get-start | empezar-agno | 577 lines; 21 code blocks byte-equal; 6 ES links; tags 7→3; cross-links swept (subagent) |
| 2026-10-29 | uv-get-start | empezar-uv | 565 lines; code blocks byte-equal; 7 ES links incl. new railpack/agno siblings, 5 stayed EN (subagent) |
| 2026-10-29 | windsurd-build-astro-blog | windsurd-crear-blog-astro | 350 lines; 11 code blocks byte-equal; 8 ES links (fixed EN /ai-coading-tools/ typo), 2 stayed EN (subagent) |
| 2026-10-29 | oha-website-load-testing | oha-pruebas-carga-web | 284 lines; 22 code fences verbatim; no internal links (subagent) |
| 2026-10-29 | fasthtml-user-auth | fasthtml-autenticacion-usuarios | 1043 lines exact; 21 code blocks byte-equal; 3 ES links, 7 stayed EN (fasthtml series in-flight); tags 6→3 (subagent) |
| 2026-10-29 | fasthtml-complex-ai-tools | fasthtml-herramientas-ia-complejas | 1286 lines; 27 code blocks byte-equal; 4 ES links, rest stayed EN (series in-flight); tags 5→3 (subagent) |
| 2026-10-29 | fasthtml-pydenticai-tools | fasthtml-herramientas-pydanticai | 963 lines; 21 code blocks byte-equal; 5 ES links; tags 5→3 (subagent) |
| 2026-10-29 | sound-blaster-gs5-review | resena-sound-blaster-gs5 | 356 lines exact; 6 ES links, 2 stayed EN; tags 5→3 (subagent) |
| 2026-10-29 | fasthtml-sqlite-db | fasthtml-sqlite-db | 801 lines; 29 code blocks byte-equal; 3 ES links incl. disk-found siblings, 7 stayed EN (subagent) |
| 2026-10-29 | fasthtml-multiple-pages | fasthtml-multiples-paginas | 719 lines; 14 code blocks byte-equal; 5 ES links incl. disk-found siblings, 7 stayed EN (subagent) |
| 2026-10-29 | ssh-tunneling-linux | tuneles-ssh-linux | 625 lines; 45 code blocks byte-equal; 6 ES links (subagent) |
| 2026-10-29 | ssh-proxyjump-jumphost | ssh-proxyjump-jumphost | 541 lines; 34 code blocks byte-equal; 1 ES link, 9 stayed EN (subagent) |
| 2026-10-29 | docker-bypasses-firewall | docker-evita-firewall | 611 lines; 29 code blocks byte-equal; 5 ES links, 7 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | crowdsec-secure-server | crowdsec-servidor-seguro | 726 lines; 118 code fences byte-equal; 6 ES links, 5 stayed EN; tags 8→3 (subagent) |
| 2026-10-29 | (link sweep) | - | /tmp/fix-es-links.mjs: rewrote stale EN internal links → /es/ across 218 ES files |
| 2026-10-29 | install-wezterm-mac | instalar-wezterm-mac | 392 lines; 20 code blocks byte-equal; 8 ES links, 2 stayed EN; tags 7→3 (subagent) |
| 2026-10-29 | mac-find-big-files | mac-encontrar-archivos-grandes | 564 lines; 21 code blocks byte-equal; 7 ES links, 4 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | sever-monitoring | monitorizar-servidor | 632 lines; 12 code blocks byte-equal; 8 ES links, 6 stayed EN; tags 5→3 (subagent) |
| 2026-10-29 | postfix-external-smtp | postfix-smtp-externo | 516 lines; 28 code blocks byte-equal; 4 ES links, 5 stayed EN; tags 5→3 (subagent) |
| 2026-10-29 | ai-images-mac | imagenes-ia-mac | 416 lines; 6 ES links, 2 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | self-hosted-airtable-alternatives | alternativas-airtable-autoalojadas | 464 lines; 8 code blocks byte-equal; 5 ES links, 6 stayed EN; tags 7→3 (subagent) |
| 2026-10-29 | nexterm-docker-install | instalar-nexterm-docker | 297 lines; 11 code blocks byte-equal; 7 ES links incl. disk-found mini-pc, 4 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | best-mini-pc-home-server | mejor-mini-pc-servidor-casa | 742 lines; AmazonProduct props translated; 16 ES links, 3 stayed EN (subagent) |
| 2026-10-29 | sink-install | instalar-sink | 387 lines; code block byte-equal; 7 ES links, 3 stayed EN; tags 5→3 (subagent) |
| 2026-10-29 | docker-compose-secrets | secretos-docker-compose | 613 lines; 24 code blocks byte-equal; 7 ES links, 4 stayed EN (subagent) |
| 2026-10-29 | dokploy-docker-compose-app | dokploy-app-docker-compose | 391 lines; 6 code blocks byte-equal; anchor remapped; 8 ES links, 5 stayed EN; tags 5→3 (subagent) |
| 2026-10-29 | traefik-redirect-http-https | traefik-redirigir-http-https | 378 lines; code blocks byte-equal; 3 ES links, 6 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | carrd-floating-menu | menu-flotante-carrd | 384 lines; 4 code blocks byte-equal; 5 ES links, 5 stayed EN; tags 7→3 (subagent) |
| 2026-10-29 | memos-install | instalar-memos | 414 lines; 12 code blocks byte-equal; 6 ES links, 11 stayed EN; tags 5→3 (subagent) |
| 2026-10-29 | docmost-docker-install | instalar-docmost-docker | 605 lines; 26 code blocks byte-equal; 7 ES links, 5 stayed EN; tags 6→3 (subagent) |
| 2026-10-29 | deploy-filebrowser-docker | desplegar-filebrowser-docker | 385 lines; 11 code blocks byte-equal; anchor remapped; 8 ES links, 3 stayed EN (subagent) |
| 2026-10-29 | traefik-proxy-docker | traefik-proxy-docker | 746 lines; 34 code blocks byte-equal; 7 ES links, 7 stayed EN (subagent) |
| 2026-10-29 | swap-usage-linux | uso-swap-linux | 528 lines; 32 code blocks byte-equal; anchor remapped; 4 ES links, 5 stayed EN; tags 4→3 (subagent) |
| 2026-10-29 | traefik-basic-authentication | traefik-autenticacion-basica | 491 lines; 25 code blocks byte-equal; 4 ES links, 5 stayed EN (subagent) |
| 2026-10-29 | traefik-wildcard-certificate | traefik-certificado-wildcard | 694 lines; 40 code blocks byte-equal; 5 ES links, 7 stayed EN (subagent) |
| 2026-10-29 | podman-vs-docker | podman-vs-docker | 629 lines; 28 code blocks byte-equal; 6 ES links, 4 stayed EN (subagent) |
