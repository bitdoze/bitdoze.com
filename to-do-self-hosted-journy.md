# To-Do: Self-Hosted Journey — Missing Articles

_Tracker for the gaps found while building `/self-hosted/` (`src/pages/self-hosted.astro`, data in `src/data/self-hosted-journey.ts`) — 2026-09-22._

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

**When an article ships:** add its slug to the matching stage in `src/data/self-hosted-journey.ts` (with a `tag:` like `"Start here"`), and remove it from `plannedGuides` in the same file — the roadmap section on the page updates itself.

---

## Priority order (biggest journey gaps first)

### Foundation stage

- [ ] **1. `install-proxmox-home-lab`** — "How to Install Proxmox VE on a Mini PC (2026)"
  - _Why:_ We sell Proxmox hardware (`best-mini-pc-proxmox`) but have zero Proxmox install content — biggest hole in the journey. High search demand, every homelab guide assumes it.
  - _Cover:_ ISO → USB (Ventoy/balenaEtcher), BIOS toggles (VT-x/IOMMU, secure-boot caveat), ext4 vs ZFS single-disk, static IP, web UI first login, `pve-no-subscription` repo + updates, one LXC + one VM walkthrough, iGPU passthrough pointer.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `proxmox`, `virtualization`, `homelab`.
  - _Internal links:_ best-mini-pc-proxmox, best-nas-homelab-docker-proxmox, install-docker-ubuntu-arm.

- [ ] **2. `install-ubuntu-server-guide`** — "Install Ubuntu Server 24.04 LTS for a Home Server"
  - _Why:_ The non-Proxmox path — most of our Docker guides assume "a box with Ubuntu + SSH" and there's no canonical starting article.
  - _Cover:_ flashing + guided install, LVM partitioning, enabling OpenSSH during setup, DHCP reservation vs static IP, `unattended-upgrades`, first-login checklist. Ends by handing off to `install-docker-ubuntu-arm` (rename/retitle that one to cover x86 too — ARM guide is 90% the same steps).
  - _Frontmatter:_ `categories: ["linux"]`, tags `ubuntu`, `home-server`, `linux`.

### Docker stage

- [ ] **3. `docker-compose-beginners-guide`** — "Docker Compose for Beginners: Anatomy of a Compose File"
  - _Why:_ Readers hit `docker-commands` first but Compose is what every app guide actually ships. Bridges stage 04 → 06.
  - _Cover:_ services/image/ports/volumes/environment/restart line-by-line, `up -d`/`down`/`logs -f`/`pull`, named volumes vs bind mounts, a real mini app (e.g. Uptime Kuma) end to end. Link docker-env-vars, docker-compose-secrets, updating-container-docker-compose.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `docker`, `docker-compose`.

### Access stage

- [ ] **4. `cloudflare-tunnel-home-lab`** — "Cloudflare Tunnel for a Home Lab: Expose Services Without Open Ports"
  - _Why:_ The single biggest remote-access keyword and our only coverage is buried inside app guides (cloudreve, streamlit, langflow). Also the CGNAT escape hatch the journey references.
  - _Cover:_ `cloudflared` via Docker + dashboard tunnels, public hostnames per app, Zero Trust access policies for admin UIs, limits (no Plex/Jellyfin streaming per ToS — say it plainly), vs Pangolin (link pangolin-cloudflare-tunnels-alternative) and vs Traefik+ports.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `cloudflare`, `tunnel`, `reverse-proxy`.

- [ ] **5. `nginx-proxy-manager-install`** — "Nginx Proxy Manager: The Beginner-Friendly Reverse Proxy"
  - _Why:_ Traefik scares newcomers; NPM is the tool Reddit recommends to them. Captures the "nginx proxy manager" keyword and gives stage 07 a gentler on-ramp.
  - _Cover:_ Docker install, proxy hosts UI, Let's Encrypt + wildcard via DNS challenge, access lists, custom locations; honest "when to outgrow it → Traefik" (link traefik-proxy-docker).
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `nginx`, `reverse-proxy`, `ssl`.

- [ ] **6. `wireguard-vpn-home-server`** — "WireGuard VPN on Your Home Server (wg-easy)"
  - _Why:_ Mesh VPNs are covered (netbird/headscale/tailscale) but plain WireGuard — the classic "VPN into my house" answer — is missing.
  - _Cover:_ wg-easy container (web UI for peers/QR codes) + raw `wg0.conf` path, port forward UDP 51820, phone/laptop peers, split-tunnel vs full-tunnel, when Tailscale is easier (link netbird-vs-headscale-vs-tailscale).
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `wireguard`, `vpn`.

- [ ] **7. `cloudflare-dns-home-lab-setup`** — "Point a Domain at Your Home Lab (Cloudflare DNS + DDNS)"
  - _Why:_ Between `choose-domain-name` and Traefik there's a real step nobody covers: DNS records, proxied vs DNS-only, dynamic IPs.
  - _Cover:_ A/AAAA + CNAME layout for `*.lab.example.com`, Cloudflare proxy trade-offs, `cloudflare-ddns`/DDClient container for dynamic IPs, local DNS rewrites in AdGuard Home so hairpin NAT isn't needed. Hands off to traefik-wildcard-certificate.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `dns`, `cloudflare`, `ddns`.

### Apps stage

- [ ] **8. `vaultwarden-docker-install`** — "Self-Host Vaultwarden: Your Own Bitwarden Server"
  - _Why:_ The #1 self-hosted app people install; complete absence on site.
  - _Cover:_ Docker Compose, why HTTPS is mandatory (Web Crypto), `ADMIN_TOKEN`, invite/user setup, mobile + browser extension config, sqlite backup note, fail2ban/CrowdSec pointer (link crowdsec-secure-server).
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `vaultwarden`, `password-manager`, `docker`.

- [ ] **9. `immich-docker-install`** — "Self-Host Immich: Replace Google Photos"
  - _Why:_ Top-3 homelab app; `why-need-home-server` already name-drops it.
  - _Cover:_ official compose (server + ML + postgres + redis), external library mounts, mobile auto-backup, hardware ML notes, update cadence warning (fast-moving, pin versions → link updating-container-docker-compose).
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `immich`, `photos`, `docker`.

- [ ] **10. `nextcloud-docker-install`** — "Self-Host Nextcloud with Docker (AIO vs Compose)"
  - _Why:_ The flagship "private cloud" app; we cover filebrowser/cloudreve but not the big one.
  - _Cover:_ AIO vs manual compose trade-off, postgres + redis, `trusted_domains`, reverse-proxy headers + `overwriteprotocol`, cron container, onlyoffice/collabora pointer.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `nextcloud`, `docker`, `cloud-storage`.

- [ ] **11. `jellyfin-media-server-setup`** — "Self-Host Jellyfin: Your Own Netflix"
  - _Why:_ `why-need-home-server` argues with Plex's price hikes — the guide that cashes that argument doesn't exist.
  - _Cover:_ Docker install, Intel QSV/N100 hardware transcoding (`/dev/dri` passthrough), library layout, clients (TV/phone/web), remote access done safely (VPN-first, link headscale/netbird comparison), quick vs-Plex framing.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `jellyfin`, `media-server`, `docker`.

- [ ] **12. `home-assistant-docker-install`** — "Self-Host Home Assistant with Docker"
  - _Why:_ Smart-home is the other gateway drug into self-hosting; zero coverage.
  - _Cover:_ Container vs HAOS honestly (no add-ons in container — use `network_mode: host`, USB/Zigbee dongle passthrough), compose file, companion apps, where it fits next to a Docker host (link docker-containers-home-server).
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `home-assistant`, `smart-home`, `docker`.

- [ ] **13. `homepage-dashboard-homelab`** — "Homepage Dashboard: A Start Page for Your Homelab"
  - _Why:_ "homelab dashboard" is a classic keyword; a dashboard is the natural "front door" once apps exist — the stage-06 capstone.
  - _Cover:_ gethomepage compose install, `services.yml`/`widgets.yml`, Docker socket read-only integration for auto-discovery, Homepage vs Homarr vs Dashy in a short table.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `dashboard`, `docker`, `homelab`.

### Security stage

- [ ] **14. `authentik-sso-self-hosted`** — "Authentik SSO: One Login for Every Self-Hosted App"
  - _Why:_ Stage 08 currently ends at basic-auth; SSO is the real answer and a big keyword.
  - _Cover:_ Docker Compose (server + worker + postgres + redis), OIDC provider setup for one app (e.g. Dockge or Docmost — both have guides), Traefik forward-auth middleware (link traefik-proxy-docker + traefik-basic-authentication as the stopgap), recovery/admin notes.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `authentik`, `sso`, `oidc`.

### Backups stage

- [ ] **15. `homelab-backup-strategy-3-2-1`** — "The 3-2-1 Backup Strategy for a Home Lab"
  - _Why:_ Stage 10 has tools but no strategy piece telling you _what_ to point them at.
  - _Cover:_ What actually matters (compose files, volumes, `/etc`, photos db), restic vs kopia vs pluton/zerobyte (link all three), off-site targets priced (link bunny-storage-vs-s3-vs-backblaze), the restore-drill habit, exclusion lists, "RAID is not backup" note.
  - _Frontmatter:_ `categories: ["self-hosting"]`, tags `backups`, `restic`, `homelab`.

---

## Backlog (nice-to-have, lower priority)

- [ ] **`proxmox-post-install-setup`** — post-install hardening/tuning (repos, ZFS ARC, backups to NFS, VLANs). Pair with #1.
- [ ] **`proxmox-lxc-vs-vm`** — when to use LXC vs VM vs Docker-on-VM for a homelab. Pair with #1.
- [ ] **`pi-hole-vs-adguard-home`** — DNS sinkhole comparison + install; extends block-ads-malware-dns-protection.
- [ ] **`ddns-dynamic-ip-home-server`** — standalone DDNS guide (may fold into #7).
- [ ] **`traefik-crowdsec-bouncer`** — CrowdSec Traefik bouncer middleware; extends crowdsec-secure-server.
- [ ] **`docker-socket-proxy-security`** — why you don't mount `docker.sock` raw (tecnativa socket proxy); referenced by arcane/dockhand guides.
- [ ] **`home-lab-power-cost`** — "What a home server costs to run" — watt math, N150 vs desktop vs VPS cost crossover. Stage 01/02 supporting piece.
- [ ] **`vps-vs-home-server`** — head-to-head: cost/year, privacy, CGNAT, latency; funnels stage-01 readers into either lane.

## Also worth doing (not new articles)

- [ ] **Retitle/expand `install-docker-ubuntu-arm`** → general "Install Docker on Ubuntu" — the current title undersells it (steps are the same on x86); it's the stage-03 Docker install link.
- [ ] **`/es/self-hosted/`** — Spanish version of the journey page; ES post coverage is thinner (~64 posts), so the data file needs an `es` variant or graceful slug-fallback before building it.
- [ ] **Series-ify the journey** — posts schema already supports `series: [name, position]`; once the missing foundation/access guides exist, mark stages 03–07's core reads as a `"Self-Hosted Journey"` series so SeriesNav appears inside each article.
