/**
 * Self-Hosted Journey — the curated path behind /self-hosted/.
 *
 * Each stage lists post slugs in the order they should be read.
 * The page resolves slugs against the `posts` collection at build time
 * and fails the build on an unknown slug, so rename slugs carefully.
 *
 * `tag` is a small chip rendered on the card (e.g. "Start here").
 * `effort` is a rough time budget shown next to the stage title.
 * Planned (not-yet-written) guides live in `plannedGuides` — see
 * to-do-self-hosted-journy.md for the full briefs.
 */

export interface JourneyLink {
  /** Post slug = filename without extension (or canonical path). */
  slug: string;
  /** Small chip shown on the card, e.g. "Start here", "Alternative". */
  tag?: string;
}

export interface JourneyStage {
  /** Anchor id, used by the sticky stage nav (`#hardware` etc.). */
  id: string;
  /** Short label shown in the terminal route map. */
  mapLabel: string;
  /** Display order — rendered as the numbered node on the rail. */
  title: string;
  /** Short goal line: what the reader has after finishing the stage. */
  goal: string;
  /** Optional 1–2 sentence guidance under the goal. */
  intro?: string;
  /** Rough effort chip, e.g. "1 evening". */
  effort: string;
  /** mdi: icon name. */
  icon: string;
  /** Render after the "Journey complete" panel as an epilogue stage. */
  epilogue?: boolean;
  links: JourneyLink[];
}

export const journeyStages: JourneyStage[] = [
  {
    id: "plan",
    mapLabel: "why + where to run",
    title: "Plan your lab — why & where to run it",
    goal: "Know what you're building, what it replaces, and whether it runs on hardware at home or a cheap VPS.",
    intro:
      "Start with the why, then pick a lane: a mini PC under your desk, or a €5 VPS. Everything after this stage works the same either way.",
    effort: "30 min read",
    icon: "mdi:compass-outline",
    links: [
      { slug: "why-need-home-server", tag: "Start here" },
      { slug: "self-hosted-apps-cloudflare-workers", tag: "No hardware?" },
      { slug: "digitalocean-vs-vultr-vs-hetzner", tag: "VPS path" },
      { slug: "hetzner-cloud-review", tag: "VPS path" },
    ],
  },
  {
    id: "hardware",
    mapLabel: "mini pc · nas · ups",
    title: "Pick your hardware",
    goal: "One quiet, low-power box that runs 24/7 — plus the storage, network, and power backup around it.",
    intro:
      "A modern mini PC idles at ~10W and runs dozens of containers. Add storage when you need it, a UPS so a power blip can't corrupt a disk.",
    effort: "1 weekend to shop",
    icon: "mdi:server",
    links: [
      { slug: "best-mini-pc-home-server", tag: "Start here" },
      { slug: "best-mini-pc-proxmox", tag: "Virtualization" },
      { slug: "best-nas-homelab-docker-proxmox", tag: "Storage" },
      { slug: "best-2-5-10gbe-switch-homelab", tag: "Network" },
      { slug: "best-ups-for-home-server", tag: "Power" },
      { slug: "best-mini-pc-local-llm", tag: "AI workloads" },
      { slug: "black-friday-home-server-deals", tag: "Deals" },
    ],
  },
  {
    id: "foundation",
    mapLabel: "linux + storage",
    title: "Set up the base system",
    goal: "A clean Linux box you can SSH into, with storage laid out so it can grow later.",
    intro:
      "Ubuntu Server is the path of least resistance — every guide on this site assumes it. Lay out storage once with LVM and shares so adding disks later is boring.",
    effort: "1 evening",
    icon: "mdi:linux",
    links: [
      { slug: "linux-commands", tag: "Primer" },
      { slug: "install-docker-ubuntu-arm", tag: "Docker install" },
      { slug: "add-new-drive-lvm", tag: "Expand storage" },
      { slug: "setup-nfs-linux", tag: "File shares" },
      { slug: "setup-samba-linux", tag: "Windows shares" },
    ],
  },
  {
    id: "docker",
    mapLabel: "the runtime",
    title: "Learn Docker — the runtime for everything",
    goal: "Run any self-hosted app as a container, and actually understand what the Compose file does.",
    intro:
      "Almost every guide on this site ships a docker-compose.yml. Spend a weekend here and the rest of the journey is copy-paste.",
    effort: "1 weekend",
    icon: "mdi:docker",
    links: [
      { slug: "docker-commands", tag: "Start here" },
      { slug: "docker-env-vars", tag: "Core skill" },
      { slug: "docker-compose-secrets", tag: "Security" },
      { slug: "add-users-to-docker-container", tag: "Hardening" },
      { slug: "docker-run-python", tag: "Practice" },
      { slug: "podman-vs-docker", tag: "Optional" },
    ],
  },
  {
    id: "panel",
    mapLabel: "control center",
    title: "Choose your command center",
    goal: "A web UI that deploys, updates, and rolls back apps — so you stop living in SSH.",
    intro:
      "Dockge if you want a thin UI over Compose files; Dokploy or Coolify if you want a full Heroku-style PaaS with domains and backups built in.",
    effort: "1 evening",
    icon: "mdi:view-dashboard-outline",
    links: [
      { slug: "best-self-hosted-panels", tag: "Compare first" },
      { slug: "dockge-install", tag: "Simplest" },
      { slug: "dokploy-install", tag: "Full PaaS" },
      { slug: "coolify-install-heroku-alternative", tag: "Full PaaS" },
      { slug: "coolify-vs-dokploy-vs-kamal-2", tag: "Comparison" },
      { slug: "arcane-vs-dockhand", tag: "Docker UIs" },
      { slug: "easypanel-modern-server-control-panel", tag: "Alternative" },
      { slug: "portainer-alternatives", tag: "More options" },
    ],
  },
  {
    id: "apps",
    mapLabel: "the fun part",
    title: "Self-host your first apps",
    goal: "The fun part — replace subscriptions with your own services, one container at a time.",
    intro:
      "Start with the master list, pick two or three you'll actually use, and get them running on the LAN before you expose anything.",
    effort: "1 weekend",
    icon: "mdi:apps",
    links: [
      { slug: "docker-containers-home-server", tag: "Master list" },
      { slug: "docker-containers-business", tag: "For work" },
      { slug: "block-ads-malware-dns-protection", tag: "Whole network" },
      { slug: "deploy-filebrowser-docker", tag: "Files" },
      { slug: "cloudreve-docker-setup", tag: "Drive" },
      { slug: "searxng-self-host-privacy-search", tag: "Search" },
      { slug: "stirling-pdf-self-host-manipulation", tag: "PDF tools" },
      { slug: "memos-install", tag: "Notes" },
      { slug: "docmost-docker-install", tag: "Wiki" },
      { slug: "self-hosted-airtable-alternatives", tag: "Databases" },
      { slug: "rustfs-self-host", tag: "S3 storage" },
      { slug: "install-wordpress-docker", tag: "Sites" },
      { slug: "keila-setup", tag: "Newsletter" },
      { slug: "opnform-open-source", tag: "Forms" },
      { slug: "chatto-self-hosted", tag: "Chat" },
    ],
  },
  {
    id: "access",
    mapLabel: "reach it anywhere",
    title: "Reach your lab from anywhere",
    goal: "Every service behind a real HTTPS URL — or a private tunnel when your ISP won't open ports.",
    intro:
      "Two doors in: a reverse proxy with your own domain for public services, and a mesh VPN for everything that should stay private. On CGNAT, tunnels replace port forwarding entirely.",
    effort: "1 evening",
    icon: "mdi:earth",
    links: [
      { slug: "choose-domain-name", tag: "First" },
      { slug: "traefik-proxy-docker", tag: "Reverse proxy" },
      { slug: "traefik-wildcard-certificate", tag: "HTTPS" },
      { slug: "traefik-redirect-http-https", tag: "HTTPS" },
      { slug: "pangolin-cloudflare-tunnels-alternative", tag: "CGNAT path" },
      { slug: "netbird-vs-headscale-vs-tailscale", tag: "Private access" },
      { slug: "headscale-self-hosted-tailscale-setup", tag: "Self-hosted VPN" },
      { slug: "ssh-tunneling-linux", tag: "Quick fix" },
      { slug: "ssh-proxyjump-jumphost", tag: "Advanced" },
      { slug: "nexterm-docker-install", tag: "Web SSH" },
    ],
  },
  {
    id: "security",
    mapLabel: "lock it down",
    title: "Lock it down",
    goal: "Reachable from the internet on your terms — patched, firewalled, and hardened before bots find it.",
    intro:
      "Do this the same day you expose your first service. Docker happily bypasses UFW, and bots scan fresh IPs within minutes.",
    effort: "1 evening",
    icon: "mdi:shield-lock-outline",
    links: [
      { slug: "secure-ssh-server-linux", tag: "Start here" },
      { slug: "docker-bypasses-firewall", tag: "Must-read" },
      { slug: "crowdsec-secure-server", tag: "Intrusion prevention" },
      { slug: "bsi-security-report-docker-ufw", tag: "Real-world" },
      { slug: "traefik-basic-authentication", tag: "Extra layer" },
      { slug: "fix-ssh-too-many-authentication-failures", tag: "Troubleshoot" },
    ],
  },
  {
    id: "monitor",
    mapLabel: "watch it",
    title: "Watch what's running",
    goal: "Know within a minute when something's down — and have the graphs to see why.",
    effort: "2 hours",
    icon: "mdi:monitor-eye",
    links: [
      { slug: "install-uptime-kuma", tag: "Start here" },
      { slug: "beszel-uptime-kuma", tag: "Stack" },
      { slug: "sever-monitoring", tag: "Metrics" },
      { slug: "traceway-self-host-guide", tag: "Observability" },
      { slug: "umami-analytics-install", tag: "Site stats" },
      { slug: "install-plausible-analytics", tag: "Alternative" },
      { slug: "monitor-cpu-usage-and-send-email-alerts-in-linux", tag: "Scripting" },
    ],
  },
  {
    id: "backups",
    mapLabel: "never lose it",
    title: "Back it up — before you need it",
    goal: "A 3-2-1 setup — if the box dies tomorrow, nothing is lost and a restore takes an afternoon, not a week.",
    intro:
      "Restic-based tools do encrypted, deduplicated backups to cheap object storage. Test one restore before you call it done.",
    effort: "1 evening",
    icon: "mdi:safe",
    links: [
      { slug: "pluton-self-hosted-backup", tag: "Start here" },
      { slug: "zerobyte-restic-gui", tag: "Alternative" },
      { slug: "dokploy-backups-cloudflare-r2", tag: "Dokploy path" },
      { slug: "bunny-storage-vs-s3-vs-backblaze", tag: "Pick a target" },
      { slug: "linux-dd-command-guide", tag: "Disk images" },
      { slug: "cloudpanel-remote-backups", tag: "Panel path" },
    ],
  },
  {
    id: "maintain",
    mapLabel: "keep it healthy",
    title: "Keep it healthy",
    goal: "Ten minutes a month keeps a lab running for years — updates, disk space, and logs under control.",
    effort: "Ongoing",
    icon: "mdi:autorenew",
    links: [
      { slug: "updating-container-docker-compose", tag: "Basics" },
      { slug: "dokploy-update-docker-compose", tag: "Dokploy" },
      { slug: "tugtainer-docker-autoupdate", tag: "Automate" },
      { slug: "cleanup-all-docker-things", tag: "Cleanup" },
      { slug: "clean-docker-overlay2-dir", tag: "Disk space" },
      { slug: "redirect-docker-logs-to-a-single-file", tag: "Logs" },
      { slug: "swap-usage-linux", tag: "Memory" },
    ],
  },
  {
    id: "level-up",
    mapLabel: "ai · automation · ci",
    title: "Level up — the journey never really ends",
    goal: "Your lab is secure, monitored, and backed up. Now make it do things a VPS never could.",
    intro:
      "Automation, local AI, your own CI — the reasons people fall in love with self-hosting in the first place.",
    effort: "Forever",
    icon: "mdi:rocket-launch-outline",
    epilogue: true,
    links: [
      { slug: "n8n-self-host-workflow-automation", tag: "Automation" },
      { slug: "ollama-docker-install", tag: "Local AI" },
      { slug: "forgejo-woodpecker-ci-cicd", tag: "Git + CI/CD" },
      { slug: "litellm-docker-install", tag: "LLM gateway" },
      { slug: "what-postgres-replaces", tag: "Consolidate" },
      { slug: "multiple-postgres-databases-docker", tag: "Databases" },
      { slug: "docker-podman-ai-cli-tools-safe-environment", tag: "AI sandbox" },
      { slug: "vps-ai-coding-setup", tag: "AI agents" },
      { slug: "ai-docker-deploy-skill", tag: "AI ops" },
    ],
  },
];

/**
 * Guides referenced by the roadmap section — intentionally NOT live links.
 * Each has a full brief in to-do-self-hosted-journy.md; when one ships,
 * add its slug to the matching stage above and remove it here.
 */
export const plannedGuides: { slug: string; stage: string }[] = [
  { slug: "install-proxmox-home-lab", stage: "foundation" },
  { slug: "install-ubuntu-server-guide", stage: "foundation" },
  { slug: "docker-compose-beginners-guide", stage: "docker" },
  { slug: "cloudflare-tunnel-home-lab", stage: "access" },
  { slug: "nginx-proxy-manager-install", stage: "access" },
  { slug: "wireguard-vpn-home-server", stage: "access" },
  { slug: "cloudflare-dns-home-lab-setup", stage: "access" },
  { slug: "vaultwarden-docker-install", stage: "apps" },
  { slug: "immich-docker-install", stage: "apps" },
  { slug: "nextcloud-docker-install", stage: "apps" },
  { slug: "jellyfin-media-server-setup", stage: "apps" },
  { slug: "home-assistant-docker-install", stage: "apps" },
  { slug: "homepage-dashboard-homelab", stage: "apps" },
  { slug: "authentik-sso-self-hosted", stage: "security" },
  { slug: "homelab-backup-strategy-3-2-1", stage: "backups" },
];
