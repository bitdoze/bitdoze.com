# WordPress Post Migration Tracking

Migration of 23 WordPress posts from `src/content/posts/tomigrate/` to `src/content/posts/` as `.mdx` files.

All posts dated `2026-02-26`, using images from `src/assets/images/wordpress/`.

## Status: ✅ Complete — 23/23 posts migrated

---

## Post List

| # | Source file | Migrated file | Status | Notes |
|---|-------------|---------------|--------|-------|
| 1 | arm-vs-x86-vps-server-benchmarks.md | arm-vs-x86-vps-server-benchmarks.mdx | ✅ Done | 3 images, YouTube embed, updated pricing |
| 2 | best-free-wordpress-backup-plugins.md | best-free-wordpress-backup-plugins.mdx | ✅ Done | 2 images, YouTube embed, updated plugin stats |
| 3 | best-web-scraping-plugins-for-wordpress.md | best-web-scraping-plugins-for-wordpress.mdx | ✅ Done | 2 images, 4 YouTube embeds, Notice widget for legal warning |
| 4 | best-woocommerce-barcode-and-qr-code-plugins.md | best-woocommerce-barcode-and-qr-code-plugins.mdx | ✅ Done | 5 images, YouTube embed, updated pricing |
| 5 | breakdance-builder-review.md | breakdance-builder-review.mdx | ✅ Done | 6 images, YouTube embed, 2026 pricing verified at breakdance.com |
| 6 | breakdance-kinsta-static-site.md | breakdance-kinsta-static-site.mdx | ✅ Done | Cover image, YouTube embed |
| 7 | choose-domain-name.md | choose-domain-name.mdx | ✅ Done | 1 image, YouTube embed |
| 8 | cloudpanel-varnish-cache.md | cloudpanel-varnish-cache.mdx | ✅ Done | 1 image, YouTube embed |
| 9 | create-a-sticky-block-in-gutenberg.md | create-a-sticky-block-in-gutenberg.mdx | ✅ Done | 2 images, YouTube embed |
| 10 | deindexed-in-bing-and-duckduckgo-now-what.md | deindexed-in-bing-and-duckduckgo-now-what.mdx | ✅ Done | 5 images, YouTube embed |
| 11 | digitalocean-vs-vultr-vs-hetzner.md | digitalocean-vs-vultr-vs-hetzner.mdx | ✅ Done | 9 images, comparison table, YouTube embed |
| 12 | export-wordpress-post-urls-titles.md | export-wordpress-post-urls-titles.mdx | ✅ Done | 5 images, SQL updated to modern syntax |
| 13 | hetzner-oracle-arm-performance.md | hetzner-oracle-arm-performance.mdx | ✅ Done | 5 images, YouTube embed |
| 14 | how-to-setup-smtp-relay-email-on-zeptomail.md | how-to-setup-smtp-relay-email-on-zeptomail.mdx | ✅ Done | Cover image, YouTube embed |
| 15 | install-uptime-kuma.md | install-uptime-kuma.mdx | ✅ Done | 5 images, YouTube embed, Docker Compose v2 updated |
| 16 | install-wordpress-on-ubuntu-arm.md | install-wordpress-on-ubuntu-arm.mdx | ✅ Done | 5 images, YouTube embed, updated CloudPanel install commands |
| 17 | safely-update-cloudpanel.md | safely-update-cloudpanel.mdx | ✅ Done | 4 images, YouTube embed |
| 18 | secure-cloudpanel.md | secure-cloudpanel.mdx | ✅ Done | 6 images, YouTube embed |
| 19 | secure-wordpress-2fa.md | secure-wordpress-2fa.mdx | ✅ Done | 1 image, YouTube embed |
| 20 | send-emails-in-wordpress-zoho-smtp-fluentsmtp.md | send-emails-in-wordpress-zoho-smtp-fluentsmtp.mdx | ✅ Done | 1 image, YouTube embed |
| 21 | speed-up-wordpress-with-cloudflare-varnish-and-redis.md | speed-up-wordpress-with-cloudflare-varnish-and-redis.mdx | ✅ Done | 1 image, YouTube embed |
| 22 | surecart-review.md | surecart-review.mdx | ✅ Done | 6 images, YouTube embed, 2026 pricing updated |
| 23 | upload-vcard-vcf-files-to-wordpress.md | upload-vcard-vcf-files-to-wordpress.mdx | ✅ Done | 1 image, YouTube embed |

---

## Migration process applied to each post

1. **Content reviewed and updated** — outdated pricing, commands, and tool versions refreshed. Online lookups done where needed (Breakdance, SureCart, Uptime Kuma, etc.)
2. **Images loaded from** `src/assets/images/wordpress/` — no new images created
3. **YouTube embeds** added using `<YouTubeEmbed>` widget where original had video links
4. **Widgets used** — `Notice` widget for legal/security warnings, `YouTubeEmbed` throughout
5. **Humanizer applied** — removed em dashes, promotional language, inline-header lists, generic conclusions; added first-person voice and specific details
6. **Old wpdoze.com links** updated to `bitdoze.com/go/PROVIDER/` affiliate format
7. **File extension** changed from `.md` to `.mdx`
8. **Date** set to `2026-02-26T00:00:00Z` on all posts
9. **Tags** capped at 3 per post

---

## Next step

Run `bun run build:ci` to verify all migrated posts build without errors.
