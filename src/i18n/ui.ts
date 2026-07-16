import type { SupportedLocale } from "@utils/i18n";

/**
 * Centralized UI string dictionary.
 */
export const translations = {
  en: {
    // Header / nav
    search: "Search",
    searchAria: "Search",
    openMenu: "Open main menu",
    switchLang: "Español",
    switchToLang: "Switch to Español",

    // Common labels
    home: "Home",
    blog: "Blog",
    categories: "Categories",
    tags: "Tags",
    authors: "Authors",
    about: "About",
    resources: "Resources",
    contact: "Contact",
    services: "Services",
    advertise: "Advertise",
    series: "Series",
    pages: "Pages",
    privacyPolicy: "Privacy Policy",
    tools: "Tools",
    titleGenerator: "Title Generator",
    thumbnailIdeas: "Thumbnail Ideas",
    youtubeScript: "YouTube Script",
    aiHumanizer: "AI Humanizer",
    quickLinks: "Quick Links",
    latestPosts: "Latest Posts",

    // Post
    relatedPosts: "Related Posts",
    onThisPage: "On This Page",
    tableOfContents: "Table of Contents",
    expandToc: "Expand table of contents",
    collapseToc: "Collapse table of contents",
    showToc: "Show Table of Contents",
    hideToc: "Hide Table of Contents",
    toggleToc: "Toggle table of contents",
    related: "Related",
    minRead: "min read",

    // Search
    noResults: "No results found. Try a different search term.",
    searchArticles: "Search articles",
    searchIndexBuilding: "Search index is being built. Please try again later.",

    // Blog
    latestArticles: "Latest Articles",
    viewAll: "View All",
    exploreContent: "Explore Content",
    browseByCategory: "Browse posts by topic",
    meetCreators: "Meet our content creators",
    findByTopics: "Find content by specific topics",

    // Footer
    allRightsReserved: "All rights reserved.",
    siteTagline:
      "Practical DevOps, programming, and self-hosting guides for developers and operators.",
  },
  es: {
    // Header / nav
    search: "Buscar",
    searchAria: "Buscar",
    openMenu: "Abrir menú principal",
    switchLang: "English",
    switchToLang: "Cambiar a English",

    // Common labels
    home: "Inicio",
    blog: "Blog",
    categories: "Categorías",
    tags: "Etiquetas",
    authors: "Autores",
    about: "Acerca de",
    resources: "Recursos",
    contact: "Contacto",
    services: "Servicios",
    advertise: "Publicidad",
    series: "Series",
    pages: "Páginas",
    privacyPolicy: "Política de privacidad",
    tools: "Herramientas",
    titleGenerator: "Generador de títulos",
    thumbnailIdeas: "Ideas de miniaturas",
    youtubeScript: "Guion de YouTube",
    aiHumanizer: "Humanizador IA",
    quickLinks: "Enlaces rápidos",
    latestPosts: "Últimos artículos",

    // Post
    relatedPosts: "Artículos relacionados",
    onThisPage: "En esta página",
    tableOfContents: "Tabla de contenidos",
    expandToc: "Expandir tabla de contenidos",
    collapseToc: "Colapsar tabla de contenidos",
    showToc: "Mostrar tabla de contenidos",
    hideToc: "Ocultar tabla de contenidos",
    toggleToc: "Alternar tabla de contenidos",
    related: "Relacionados",
    minRead: "min de lectura",

    // Search
    noResults: "No se encontraron resultados. Prueba otro término.",
    searchArticles: "Buscar artículos",
    searchIndexBuilding:
      "El índice de búsqueda se está construyendo. Intenta más tarde.",

    // Blog
    latestArticles: "Artículos recientes",
    viewAll: "Ver todos",
    exploreContent: "Explorar contenido",
    browseByCategory: "Explora artículos por tema",
    meetCreators: "Conoce a nuestros creadores",
    findByTopics: "Encuentra contenido por temas específicos",

    // Footer
    allRightsReserved: "Todos los derechos reservados.",
    siteTagline:
      "Guías prácticas de DevOps, programación y self-hosting para desarrolladores y operadores.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

/** Map English menu labels (from menu.json) to translation keys */
export const menuLabelKeys: Record<string, TranslationKey> = {
  Home: "home",
  Resources: "resources",
  About: "about",
  Series: "series",
  Pages: "pages",
  Authors: "authors",
  Categories: "categories",
  Tags: "tags",
  "Privacy Policy": "privacyPolicy",
  Tools: "tools",
  "Title Generator": "titleGenerator",
  "Thumbnail Ideas": "thumbnailIdeas",
  "YouTube Script": "youtubeScript",
  "AI Humanizer": "aiHumanizer",
  Contact: "contact",
  Services: "services",
  Advertise: "advertise",
  Blog: "blog",
};

export function t(locale: SupportedLocale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

export function translateMenuLabel(
  locale: SupportedLocale,
  label: string,
): string {
  if (locale === "en") return label;
  const key = menuLabelKeys[label];
  return key ? t(locale, key) : label;
}
