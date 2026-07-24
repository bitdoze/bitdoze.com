#!/usr/bin/env node
/**
 * scripts/restructure-taxonomy.mjs
 *
 * Rewrites post frontmatter categories + tags to the site taxonomy.
 *
 * Usage:
 *   node scripts/restructure-taxonomy.mjs --dry-run
 *   node scripts/restructure-taxonomy.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, relative } from "path";

const ROOT = process.cwd();
const POSTS_DIR = join(ROOT, "src", "content", "posts");
const DRY_RUN = process.argv.includes("--dry-run");

const ALLOWED_CATEGORIES = new Set([
  "ai",
  "self-hosting",
  "linux",
  "web-development",
  "wordpress",
  "hosting",
  "tools",
  "gadgets",
]);

/** Direct remap when old category alone is enough */
const CATEGORY_REMAP = {
  ai: "ai",
  AI: "ai",
  gadgets: "gadgets",
  Gadgets: "gadgets",
  wordpress: "wordpress",
  woocommerce: "wordpress",
  hosting: "hosting",
  cms: "web-development",
  "web-development": "web-development",
  astro: "web-development",
  "self-hosting": "self-hosting",
  "Self-Hosting": "self-hosting",
  tools: "tools",
  tips: "tools",
  linux: "linux",
  node: "tools",
  python: "web-development",
  security: "tools",
  cloudflare: "tools",
  blog: "web-development",
  Personal: "web-development",
  "dev-tools": null, // needs keyword rules
  vps: null,
  VPS: null,
};

/** Explicit filename overrides (stem without extension) */
const OVERRIDES = {
  // AI intent
  "ai-coading-tools": "ai",
  "ai-images-mac": "ai",
  "ai-docker-deploy-skill": "ai",
  "cmux-terminal": "ai",
  "vps-ai-coding-setup": "ai",
  "ollama-docker-install": "ai",
  "litellm-docker-install": "ai",
  "langfuse-docker-install": "ai",
  "langflow-docker-install": "ai",
  "flowiseai-install": "ai",
  "lm-studio-bionic": "ai",
  "memoh-ai-agent-deploy": "ai",
  "meetily-self-hosted-ai-meeting-assistant": "ai",
  "cognee-self-host": "ai",
  "hindsight-docker-deploy": "ai",
  "executor-sh-vs-composio": "ai",
  "python-video-intro-editor": "ai",
  "uv-text-to-speech-script": "ai",
  "groq-api-mistral-streamlit": "ai",
  "perplexity": "ai",
  "mastra-image-agent-kie-ai": "ai",
  "windsurd-build-astro-blog": "ai",

  // Web development
  "best-python-web-frameworks": "web-development",
  "streamlit-vs-taipy": "web-development",
  "streamlit-vs-nicegui": "web-development",
  "streamlit-deploy-vps-cloudflare": "web-development",
  "nicegui-get-started": "web-development",
  "nicegui-pages": "web-development",
  "fasthtml-start": "web-development",
  "fasthtml-multiple-pages": "web-development",
  "fasthtml-sqlite-db": "web-development",
  "fasthtml-user-auth": "web-development",
  "fasthtml-complex-ai-tools": "web-development",
  "fasthtml-pydenticai-tools": "web-development",
  "tanstack-start-get-start": "web-development",
  "tanstack-start-bunny-database-drizzle": "web-development",
  "tanstack-start-dokploy-deploy": "web-development",
  "astro-vs-nextjs-vs-tanstack-start-which-wins": "web-development",
  "best-headless-cms-for-astro": "web-development",
  "carrd-add-domain": "web-development",
  "deploy-astro-on-vps": "web-development",
  "deploy-astro-easypanel": "web-development",
  "deploy-astrojs-cloudflare": "web-development",
  "deploy-astro-bunny-net": "web-development",
  "migrate-astro-bun": "web-development",
  "responsive-youtube-astrojs": "web-development",
  "wordpress-to-astro-migration": "web-development",
  "sell-digital-products-payhip": "web-development",
  "build-one-page-website-budget": "web-development",
  "ai-affiliate-websites-amazon": "web-development",
  "gatsby-js-online-courses": "web-development",
  "embed-youtube-videos-to-gatsby": "web-development",
  "link-github-with-ssh-maco-linux": "web-development",
  "install-nodejs-using-nvm-macos-ubuntu": "web-development",
  "add-contact-form-static-websites": "web-development",

  // WordPress
  "woocommerce-admin-dashboard": "wordpress",
  "best-woocommerce-barcode-and-qr-code-plugins": "wordpress",
  "arm-vs-x86-vps-server-benchmarks": "wordpress",
  "install-wordpress-on-ubuntu-arm": "wordpress",
  "install-wordpress-docker": "wordpress",
  "cloudpanel-varnish-cache": "wordpress",
  "speed-up-wordpress-with-cloudflare-varnish-and-redis": "wordpress",
  "breakdance-kinsta-static-site": "wordpress",

  // Hosting
  "bunny-net-review": "hosting",
  "bunny-storage-vs-s3-vs-backblaze": "hosting",
  "bunny-stream-guide": "hosting",
  "hetzner-cloud-review": "hosting",
  "hetzner-cloud-cost-optimized-plans": "hosting",
  "hetzner-oracle-arm-performance": "hosting",
  "digitalocean-vs-vultr-vs-hetzner": "hosting",
  "benchmark-cloud-servers": "hosting",
  "php-cloud-hosting": "hosting",
  "mail-baby-review": "hosting",
  "how-to-setup-smtp-relay-email-on-zeptomail": "hosting",
  "s3-bucket-filesystem-vps": "hosting",
  "upload-directory-oci-bucket-python": "hosting",
  "safely-update-cloudpanel": "hosting",
  "secure-cloudpanel": "hosting",
  "cloudpanel-remote-backups": "hosting",
  "cloudpanel-setup-dockge": "hosting",
  "install-cloudpanel-host-nodejs": "hosting",

  // Tools
  "fluidvoice-mac-dictation": "tools",
  "herdr-agent-multiplexer": "tools",
  "shottr-mac-screenshot-tool": "tools",
  "shots-so-mockups": "tools",
  "screen-studio-review": "tools",
  "convert-images-to-svg": "tools",
  "seo-gets-tool": "tools",
  "oha-website-load-testing": "tools",
  "plausible-tool": "tools",
  "choose-domain-name": "tools",
  "deindexed-in-bing-and-duckduckgo-now-what": "tools",
  "block-ai-crawlers": "tools",
  "block-ads-malware-dns-protection": "tools",
  "block-ads-manifest-v3-nextdns": "tools",
  "nextdns-review": "tools",
  "mac-find-big-files": "tools",
  "bun-package-manager": "tools",
  "bun-update-packages": "tools",
  "nodejs-update-dependencies": "tools",
  "uv-get-start": "tools",
  "uv-run-scripts-guide": "tools",
  "uv-url-checker-script": "tools",
  "pm2-env-vars": "tools",
  "pm2-fork-cluster": "tools",
  "pm2-manage-apps": "tools",
  "nixpacks-vs-railpack": "tools",
  "git-commands": "tools",
  "install-wezterm-mac": "tools",
  "install-upgrade-python-mac": "tools",

  // Linux
  "starship-ghostty-terminal": "linux",
  "ghostty-terminal": "linux",
  "tmux-basics": "linux",
  "zoxide": "linux",
  "compare-folders-content-differences": "linux",
  "exclude-directories-files-copy-remote-machine": "linux",
  "pdf-extract-text-linux-cmd": "linux",
  "pdf-merge-linux-cmd": "linux",
  "postfix-external-smtp": "linux",
  "crowdsec-secure-server": "linux",
  "secure-ssh-server-linux": "linux",
  "nvm-fish-shell": "linux",

  // Self-hosting
  "coolify-install-heroku-alternative": "self-hosting",
  "uptime-kuma-tool": "self-hosting",
  "install-uptime-kuma": "self-hosting",
  "sink-install": "self-hosting",
  "opnform-open-source": "self-hosting",
  "keila-setup": "self-hosting",
  "best-mini-pc-home-server": "self-hosting",
  "why-need-home-server": "self-hosting",
  "docker-containers-home-server": "self-hosting",
  "docker-containers-business": "self-hosting",
  "chatto-self-hosted": "self-hosting",
};

const TAG_MERGE = {
  "self-hosting": "self-hosted",
  "linux-commands": "linux",
  nodejs: "node",
  AI: "ai",
  Docker: "docker",
  Astro: "astro",
  Python: "python",
  "ai-tools": "ai-tools",
  "developer-tools": null,
  tutorials: null,
  tips: null,
  reviews: null,
  coding: null,
  development: null,
  comparison: null,
  "free-tools": null,
};

const VAGUE_TAGS = new Set([
  "tutorials",
  "tips",
  "reviews",
  "coding",
  "development",
  "comparison",
  "free-tools",
  "developer-tools",
  "others",
]);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(md|mdx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function parseFrontmatter(text) {
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  return {
    fm: text.slice(3, end).replace(/^\r?\n/, ""),
    bodyStart: end + 4, // after \n---
    raw: text,
  };
}

function getList(fm, key) {
  const inline = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (inline) {
    return inline[1]
      .split(",")
      .map((v) => v.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  const block = fm.match(new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+(?:\\n|$))+)`, "m"));
  if (block) {
    return block[1]
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^\s*-\s*/, "").trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return [];
}

function getField(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*["']?(.*?)["']?\\s*$`, "m"));
  return m ? m[1] : "";
}

function stemOf(filePath) {
  const base = filePath.split("/").pop();
  return base.replace(/\.(md|mdx)$/, "");
}

function haystack(stem, title, tags) {
  return `${stem} ${title} ${tags.join(" ")}`.toLowerCase();
}

function matchesAny(text, needles) {
  return needles.some((n) => text.includes(n));
}

function inferCategory(stem, title, oldCats, tags) {
  if (OVERRIDES[stem]) return OVERRIDES[stem];

  // ES stems often mirror EN with prefixes — strip common ones for override lookup
  const esAliases = [
    stem.replace(/^guia-/, ""),
    stem.replace(/^despliegue-/, ""),
    stem.replace(/^alternativas-/, ""),
    stem.replace(/^agente-/, ""),
    stem.replace(/^busqueda-/, ""),
    stem.replace(/^dashboard-/, ""),
    stem.replace(/-comparacion$/, ""),
    stem.replace(/-configuracion$/, ""),
    stem.replace(/^migracion-/, "wordpress-to-"),
  ];
  for (const alias of esAliases) {
    if (OVERRIDES[alias]) return OVERRIDES[alias];
  }

  const text = haystack(stem, title, tags);

  // Strong topic signals first
  if (
    matchesAny(text, [
      "openclaw",
      "hermes",
      "opencode",
      "picoclaw",
      "zeroclaw",
      "nanobot",
      "nanoclaw",
      "nullclaw",
      "copaw",
      "agno",
      "mastra",
      "mcp",
      "llm",
      "claude",
      "copilot",
      "ollama",
      "tinyfish",
      "fish-audio",
      "fish audio",
      "ai agent",
      "ai-agent",
      "coding agent",
      "kie-ai",
      "kimi",
      "qwen",
      "adk",
      "clawdbot",
      "pinchtab",
      "mirage",
      "vibeproxy",
      "freebuff",
      "amp-code",
      "zcode",
      "kiro",
      "codex",
      "meetily",
      "hindsight",
      "cognee",
      "openfang",
      "herdr",
    ])
  ) {
    return "ai";
  }

  if (
    matchesAny(text, [
      "woocommerce",
      "wordpress",
      "gutenberg",
      "breakdance",
      "surecart",
      "fluent",
    ])
  ) {
    return "wordpress";
  }

  // Avoid bare "dock"/"monitor" — they match docker / server monitoring
  if (
    matchesAny(text, [
      "oled",
      "thunderbolt",
      "sound blaster",
      "sound-blaster",
      "fusiondock",
      "ivanky",
      "thunderbolt-5-dock",
      "32-inch",
      "xg32",
    ])
  ) {
    return "gadgets";
  }

  if (
    matchesAny(text, [
      "carrd",
      "astro",
      "gatsby",
      "fasthtml",
      "tanstack",
      "nicegui",
      "streamlit",
      "convex",
      "static website",
      "static site",
      "contact form",
    ])
  ) {
    return "web-development";
  }

  if (
    matchesAny(text, [
      "hetzner",
      "digitalocean",
      "vultr",
      "bunny",
      "cdn",
      "cloudpanel",
      "oracle arm",
      "php cloud",
      "benchmark cloud",
      "hosting",
    ])
  ) {
    return "hosting";
  }

  if (
    matchesAny(text, [
      "fish-shell",
      "fish shell",
      "oh-my-fish",
      "oh my fish",
      "zsh",
      "bash",
      "tmux",
      "ssh",
      "sed",
      "swap",
      "lvm",
      "nfs",
      "samba",
      "webdav",
      "ghostty",
      "starship",
      "zoxide",
      "wezterm",
      "linux command",
      "kernel panic",
      "rpm ",
      "dd command",
      "nc command",
    ])
  ) {
    return "linux";
  }

  if (
    matchesAny(text, [
      "docker",
      "dokploy",
      "coolify",
      "traefik",
      "portainer",
      "dockge",
      "podman",
      "self-host",
      "self host",
      "homelab",
      "home-server",
      "home server",
      "uptime kuma",
      "plausible",
      "umami",
      "n8n",
      "outline",
      "memos",
      "searx",
      "stirling",
      "headscale",
      "netbird",
      "pangolin",
      "easypanel",
      "forgejo",
      "woodpecker",
      "beszel",
      "filebrowser",
      "cloudreve",
      "rustfs",
      "zerobyte",
      "termix",
      "nexterm",
      "tugtainer",
      "slash",
      "notifuse",
      "keila",
      "opnform",
      "openship",
      "arcane",
      "dockhand",
      "usulnet",
      "docmost",
      "traceway",
      "crowdsec",
      "airtable",
      "chatto",
      "kamal",
    ])
  ) {
    return "self-hosting";
  }

  if (
    matchesAny(text, [
      "screenshot",
      "mockup",
      "dictation",
      "seo",
      "mac ",
      "bun",
      "pm2",
      "uv ",
      "load testing",
      "oha",
      "perplexity",
      "nextdns",
      "domain",
      "deindexed",
    ])
  ) {
    return "tools";
  }

  // Fall back from old category remap
  for (const old of oldCats) {
    const mapped = CATEGORY_REMAP[old];
    if (mapped) return mapped;
  }

  // vps / VPS / unset → self-hosting as default (majority)
  if (oldCats.some((c) => c.toLowerCase() === "vps")) return "self-hosting";
  if (oldCats.some((c) => c === "dev-tools")) return "tools";

  return "self-hosting";
}

function toKebab(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTags(tags, category) {
  const out = [];
  const seen = new Set();

  for (const raw of tags) {
    let tag = toKebab(raw);
    if (!tag) continue;

    if (Object.prototype.hasOwnProperty.call(TAG_MERGE, raw)) {
      tag = TAG_MERGE[raw];
      if (!tag) continue;
    } else if (Object.prototype.hasOwnProperty.call(TAG_MERGE, tag)) {
      tag = TAG_MERGE[tag];
      if (!tag) continue;
    }

    if (VAGUE_TAGS.has(tag)) continue;

    if (seen.has(tag)) continue;
    seen.add(tag);
    out.push(tag);
    if (out.length >= 3) break;
  }

  // Drop category-echo tag only when at least one more specific tag remains
  if (out.length > 1) {
    const withoutEcho = out.filter((t) => t !== category);
    if (withoutEcho.length > 0) {
      out.length = 0;
      out.push(...withoutEcho.slice(0, 3));
    }
  }

  // If we dropped everything, keep first normalized originals (non-empty)
  if (out.length === 0) {
    seen.clear();
    for (const raw of tags) {
      const tag = toKebab(raw);
      if (!tag || seen.has(tag)) continue;
      out.push(tag);
      if (out.length >= 3) break;
    }
  }

  if (out.length === 0) out.push("others");
  return out;
}

function formatYamlList(key, values) {
  // Prefer inline for short lists
  const quoted = values.map((v) => JSON.stringify(v));
  return `${key}: [${quoted.join(", ")}]`;
}

function replaceListField(fm, key, values) {
  const inlineRe = new RegExp(`^${key}:\\s*\\[[^\\]]*\\]\\s*$`, "m");
  const blockRe = new RegExp(`^${key}:\\s*\\n(?:\\s+-\\s+.+(?:\\n|$))+`, "m");
  const replacement = formatYamlList(key, values);

  if (inlineRe.test(fm)) {
    return fm.replace(inlineRe, replacement);
  }
  if (blockRe.test(fm)) {
    return fm.replace(blockRe, replacement + "\n");
  }
  // Insert before authors if possible, else append
  if (/^authors:/m.test(fm)) {
    return fm.replace(/^authors:/m, `${replacement}\nauthors:`);
  }
  return `${fm.trimEnd()}\n${replacement}\n`;
}

function main() {
  const files = walk(POSTS_DIR);
  const catCounts = new Map();
  const tagCounts = new Map();
  let changed = 0;
  let unchanged = 0;
  const changes = [];

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const parsed = parseFrontmatter(text);
    if (!parsed) continue;

    let { fm } = parsed;
    const oldCats = getList(fm, "categories");
    const oldTags = getList(fm, "tags");
    const title = getField(fm, "title");
    const stem = stemOf(file);

    const category = inferCategory(stem, title, oldCats, oldTags);
    if (!ALLOWED_CATEGORIES.has(category)) {
      throw new Error(`Invalid category "${category}" for ${file}`);
    }

    const tags = normalizeTags(oldTags, category);
    const newCats = [category];

    const catsSame =
      oldCats.length === 1 && oldCats[0] === category;
    const tagsSame =
      oldTags.length === tags.length &&
      oldTags.every((t, i) => toKebab(t) === tags[i]);

    if (!catsSame || !tagsSame || oldTags.length !== tags.length) {
      fm = replaceListField(fm, "categories", newCats);
      fm = replaceListField(fm, "tags", tags);

      const next =
        "---\n" +
        fm.replace(/^\n/, "").replace(/\n*$/, "\n") +
        "---" +
        text.slice(parsed.bodyStart);

      // Normalize accidental double blank lines after frontmatter close
      const normalized = next.replace(/^---\n([\s\S]*?)\n---\r?\n+/, "---\n$1\n---\n\n");

      if (!DRY_RUN) writeFileSync(file, normalized, "utf8");
      changed++;
      changes.push({
        file: relative(ROOT, file),
        from: { categories: oldCats, tags: oldTags },
        to: { categories: newCats, tags },
      });
    } else {
      unchanged++;
    }

    catCounts.set(category, (catCounts.get(category) || 0) + 1);
    for (const t of tags) tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
  }

  console.log(DRY_RUN ? "=== DRY RUN ===" : "=== APPLIED ===");
  console.log(`Files changed: ${changed}`);
  console.log(`Files unchanged: ${unchanged}`);
  console.log("\nCategory counts:");
  for (const [k, v] of [...catCounts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${v.toString().padStart(4)}  ${k}`);
  }
  console.log(`\nUnique tags: ${tagCounts.size}`);
  console.log("Top tags:");
  for (const [k, v] of [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)) {
    console.log(`  ${v.toString().padStart(4)}  ${k}`);
  }

  if (DRY_RUN && changes.length) {
    console.log("\nSample changes (first 40):");
    for (const c of changes.slice(0, 40)) {
      console.log(
        `  ${c.file}\n    cats: ${JSON.stringify(c.from.categories)} → ${JSON.stringify(c.to.categories)}\n    tags: ${JSON.stringify(c.from.tags)} → ${JSON.stringify(c.to.tags)}`,
      );
    }
  }
}

main();
