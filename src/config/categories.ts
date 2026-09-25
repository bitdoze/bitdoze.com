import type { SupportedLocale } from "@utils/i18n";

export interface CategoryMeta {
  label: string;
  intro: string;
}

/**
 * Per-category label and hub-page intro copy for both locales.
 * Keys must match the taxonomy slugs enforced by the content schema
 * (see AGENTS.md "Categories & Tags Taxonomy").
 */
export const categoryMeta: Record<string, Record<SupportedLocale, CategoryMeta>> = {
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
