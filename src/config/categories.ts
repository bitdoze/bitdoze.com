import type { SupportedLocale } from "@utils/i18n";

export interface CategoryMeta {
  label: string;
  intro: string;
}

export interface CategoryEntry {
  en: CategoryMeta;
  es: CategoryMeta;
  /** Hand-picked pillar guides (EN slugs — ES twins resolved via translationKey)
   * shown as "Start here" picks on category archive page 1. */
  startHere?: string[];
}

/**
 * Per-category label and hub-page intro copy for both locales.
 * Keys must match the taxonomy slugs enforced by the content schema
 * (see AGENTS.md "Categories & Tags Taxonomy").
 */
export const categoryMeta: Record<string, CategoryEntry> = {
  ai: {
    en: {
      label: "AI",
      intro:
        "Hands-on guides for running AI tools yourself: agents, LLMs, MCP servers, coding assistants, and voice AI — tested on real hardware and VPS setups.",
    },
    es: {
      label: "IA",
      intro:
        "Guías prácticas para ejecutar herramientas de IA por tu cuenta: agentes, LLMs, servidores MCP, asistentes de código y voz con IA — probadas en hardware y VPS reales.",
    },
    startHere: ["ai-programming-beginners-guide", "opencode-setup-guide", "agno-get-start"],
  },
  "self-hosting": {
    en: {
      label: "Self-Hosting",
      intro:
        "Docker apps, control panels like Dokploy and Coolify, reverse proxies, monitoring, and home lab setups — every guide walks through a working deployment.",
    },
    es: {
      label: "Self-Hosting",
      intro:
        "Aplicaciones en Docker, paneles como Dokploy y Coolify, proxies inversos, monitorización y home labs — cada guía muestra un despliegue que funciona.",
    },
    startHere: ["dokploy-install", "coolify-install-heroku-alternative", "install-uptime-kuma"],
  },
  linux: {
    en: {
      label: "Linux",
      intro:
        "Command-line tools, shell configuration, SSH, and sysadmin workflows — copy-paste-ready commands with the flags explained.",
    },
    es: {
      label: "Linux",
      intro:
        "Herramientas de línea de comandos, configuración de shell, SSH y tareas de administración — comandos listos para copiar con cada opción explicada.",
    },
    startHere: ["best-fish-shell-plugins", "crowdsec-secure-server", "add-new-drive-lvm"],
  },
  "web-development": {
    en: {
      label: "Web Development",
      intro:
        "Astro, frameworks, static sites, and site builders — practical build guides and comparisons for shipping fast, cheap web projects.",
    },
    es: {
      label: "Desarrollo web",
      intro:
        "Astro, frameworks, sitios estáticos y constructores de sitios — guías prácticas y comparaciones para lanzar proyectos web rápidos y baratos.",
    },
    startHere: ["astro-i18n-localization", "astro-7-faster-builds", "add-contact-form-astro"],
  },
  wordpress: {
    en: {
      label: "WordPress",
      intro:
        "WordPress and WooCommerce setup, optimization, and tooling — from hosting choices to practical configuration.",
    },
    es: {
      label: "WordPress",
      intro:
        "Instalación, optimización y herramientas de WordPress y WooCommerce — desde el hosting hasta la configuración práctica.",
    },
    startHere: [
      "install-wordpress-docker",
      "speed-up-wordpress-with-cloudflare-varnish-and-redis",
      "secure-wordpress-2fa",
    ],
  },
  hosting: {
    en: {
      label: "Hosting",
      intro:
        "VPS providers, CDNs, and hosting panels reviewed and benchmarked — real pricing, real performance, no affiliate-driven hype.",
    },
    es: {
      label: "Hosting",
      intro:
        "Proveedores VPS, CDNs y paneles de hosting analizados y medidos — precios y rendimiento reales, sin exageraciones.",
    },
    startHere: ["hetzner-cloud-review", "digitalocean-vs-vultr-vs-hetzner", "dockge-install"],
  },
  tools: {
    en: {
      label: "Tools",
      intro:
        "Mac and productivity apps, SEO utilities, and package managers — focused reviews and setup guides for the tools developers actually use.",
    },
    es: {
      label: "Herramientas",
      intro:
        "Apps de productividad, utilidades SEO y gestores de paquetes — reseñas directas y guías de configuración de herramientas reales.",
    },
    startHere: ["git-commands", "bun-package-manager", "block-ads-malware-dns-protection"],
  },
  gadgets: {
    en: {
      label: "Gadgets",
      intro:
        "Monitors, docks, audio gear, and desk hardware — specs that matter, real-world testing, and honest recommendations.",
    },
    es: {
      label: "Gadgets",
      intro:
        "Monitores, docks, audio y hardware de escritorio — especificaciones relevantes, pruebas reales y recomendaciones honestas.",
    },
    startHere: [
      "best-thunderbolt-5-docks-guide",
      "best-32-inch-oled-monitors-guide",
      "best-tb5-nvme-enclosures",
    ],
  },
};

export function getCategoryMeta(slug: string, locale: SupportedLocale): CategoryMeta {
  return (
    categoryMeta[slug]?.[locale] ?? {
      label: slug,
      intro: "",
    }
  );
}

export function getCategoryStartHere(slug: string): string[] {
  return categoryMeta[slug]?.startHere ?? [];
}
