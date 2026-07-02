import type { SupportedLocale } from "@utils/i18n";

/**
 * Centralized UI string dictionary.
 * Replaces scattered per-component translation maps.
 */
export const translations = {
  en: {
    // Header / nav
    search: "Search",
    searchAria: "Search",
    openMenu: "Open main menu",
    switchLang: "Espanol",

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

    // Blog
    latestArticles: "Latest Articles",
    viewAll: "View All",
    exploreContent: "Explore Content",
    browseByCategory: "Browse posts by topic",
    meetCreators: "Meet our content creators",
    findByTopics: "Find content by specific topics",
  },
  es: {
    // Header / nav
    search: "Buscar",
    searchAria: "Buscar",
    openMenu: "Abrir menu principal",
    switchLang: "English",

    // Common labels
    home: "Inicio",
    blog: "Blog",
    categories: "Categorias",
    tags: "Etiquetas",
    authors: "Autores",
    about: "Acerca de",
    resources: "Recursos",
    contact: "Contacto",
    services: "Servicios",
    advertise: "Publicidad",
    series: "Series",
    pages: "Paginas",
    privacyPolicy: "Politica de privacidad",

    // Post
    relatedPosts: "Articulos relacionados",
    onThisPage: "En esta pagina",
    tableOfContents: "Tabla de contenidos",
    expandToc: "Expandir tabla de contenidos",
    collapseToc: "Colapsar tabla de contenidos",
    showToc: "Mostrar tabla de contenidos",
    hideToc: "Ocultar tabla de contenidos",
    toggleToc: "Alternar tabla de contenidos",
    related: "Relacionados",
    minRead: "min de lectura",

    // Search
    noResults: "No se encontraron resultados. Prueba otro termino.",
    searchArticles: "Buscar articulos",

    // Blog
    latestArticles: "Articulos recientes",
    viewAll: "Ver todos",
    exploreContent: "Explorar contenido",
    browseByCategory: "Explora articulos por tema",
    meetCreators: "Conoce a nuestros creadores",
    findByTopics: "Encuentra contenido por temas especificos",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: SupportedLocale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
