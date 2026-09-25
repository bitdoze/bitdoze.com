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
    closeMenu: "Close main menu",
    switchLang: "Español",
    switchToLang: "Switch to Español",
    noEsTranslation: "No Spanish translation — go to Spanish home",
    noEnTranslation: "No English translation — go to English home",
    skipLink: "Skip to main content",
    toggleTheme: "Toggle color scheme",
    logoAlt: "Bitdoze logo",
    logoHome: "Bitdoze home",
    followOn: "Follow on",
    opensNewTab: "opens in a new tab",

    // Common labels
    home: "Home",
    blog: "Blog",
    news: "News",
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
    lastUpdated: "Last updated",
    updated: "Updated",
    published: "Published",
    shareArticle: "Share this article",
    shareOn: "Share on",
    readGuide: "Read the guide",
    writtenBy: "Written by",

    // Code copy button (PostLayout script)
    copyCode: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    copyCodeAria: "Copy code",

    // AmazonProduct widget
    amazonCheckPrice: "Check Price on Amazon",
    amazonPriceNote: "Price & availability at Amazon.com",
    amazonKeyFeatures: "Key Features",
    amazonWhatWeLike: "What we like",
    amazonWatchOutFor: "Watch out for",
    amazonImportant: "Important Considerations",
    amazonDisclosureLabel: "Disclosure:",
    amazonDisclosure:
      "This post contains affiliate links. We may earn a commission if you purchase through these links at no additional cost to you.",
    amazonRating: "Rating",
    amazonRatingOf: "out of 5 stars",
    ratingExcellent: "Excellent",
    ratingVeryGood: "Very good",
    ratingGood: "Good",
    ratingMixed: "Mixed",

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

    // PopularTopics
    popularTopics: "Popular Topics",
    popularTopicsSub: "The stacks readers come here for",
    viewAllTagPosts: "View all {tag} posts",

    // Author box / misc
    moreGuidesFrom: "More guides from {name}",
    enlargedImage: "Enlarged image",
    close: "Close",

    // Services
    svcBackToServices: "Back to services",
    svcTalkAbout: "Talk about this service",
    svcViewScope: "View scope",
    svcBestFitFor: "Best fit for",
    svcWhatThisIncludes: "What this includes",
    svcProcess: "Process",
    svcLikelyOutcome: "Likely outcome",
    svcRelevantWork: "Relevant work",
    svcRelatedArticles: "Related articles",
    svcReadArticle: "Read article",
    svcContactHeading: "If this matches your project, reach out",
    svcContactBody:
      "The contact links are placeholders for now, but this page already defines the kind of work and fit clearly.",
    svcContact: "Contact",
    svcSeeAllServices: "See all services",
    svcFaq: "Frequently asked questions",
    svcViewService: "View service",
    svcAskAboutIt: "Ask about it",
    svcNextStep: "Next step",
    svcProofPublishedTitle: "Backed by published work",
    svcProofPublishedText:
      "These pages connect directly to real guides already published on the site.",
    svcProofTechTitle: "Technical and practical",
    svcProofTechText: "The focus is on setups, deployments, and structure you can keep operating.",
    svcProofCombTitle: "Services can be combined",
    svcProofCombText: "A project can combine Astro, VPS, Dokploy, and self-hosted app work.",

    // Archive pages (blog / tags / categories / authors / series)
    blogArchiveTitle: "Blog - {site}",
    blogArchiveDesc: "Explore our latest articles, tutorials, and insights",
    blogArchiveTitlePage: "Blog - Page {page} - {site}",
    blogArchiveDescPage: "Explore our articles, tutorials, and insights - Page {page}",
    allGuides: "All Guides",
    blogArchiveSub: "Tested DevOps tutorials, programming guides, and self-hosted tools",
    pageOf: "Page {page} of {total}",

    tagArchiveTitle: "Posts tagged with {name} - {site}",
    tagArchiveTitlePage: "Posts tagged with {name} - Page {page} - {site}",
    tagArchiveDesc: "Browse all posts tagged with {name}",
    tagArchiveDescPage: "Browse posts tagged with {name} - Page {page}",
    tagHeading: "Tag: #{name}",
    guidesWithTagOne: "{count} guide with this tag",
    guidesWithTagMany: "{count} guides with this tag",
    emptyTagArchive: "No guides found with this tag.",

    categoryArchiveTitle: "{name} Guides - {site}",
    categoryArchiveTitlePage: "{name} - Page {page} - {site}",
    categorySchemaName: "{name} guides",
    categoryArchiveDescPage: "Browse posts in the {name} category - Page {page}",
    categoryHeading: "Category: {name}",
    guidesInCategoryOne: "{count} guide in this category",
    guidesInCategoryMany: "{count} guides in this category",

    authorArchiveTitle: "Posts by {name} - {site}",
    authorArchiveTitlePage: "Posts by {name} - Page {page} - {site}",
    authorArchiveDesc: "Browse all posts written by {name}",
    authorArchiveDescPage: "Browse posts written by {name} - Page {page}",
    authorHeading: "Author: {name}",
    guidesByAuthorOne: "{count} guide by this author",
    guidesByAuthorMany: "{count} guides by this author",
    emptyAuthorArchive: "No guides found by this author.",

    emptyArchive: "No guides found.",

    tagsIndexTitle: "Tags - {site}",
    tagsIndexDesc: "Browse all tags and topics",
    tagsIndexSub: "Browse posts by tag",
    emptyTags: "No tags found.",

    categoriesIndexTitle: "Categories - {site}",
    categoriesIndexDesc: "Browse all categories of posts on our blog",
    categoriesIndexSub: "Browse posts by category",
    emptyCategories: "No categories found.",

    authorsIndexTitle: "Authors - {site}",
    authorsIndexDesc: "Meet our authors and browse their posts",
    authorsIndexSub: "Meet our content creators and browse their posts",
    emptyAuthors: "No authors found.",

    countPostOne: "post",
    countPostMany: "posts",

    seriesIndexTitle: "Article Series - {site}",
    seriesIndexDesc: "Browse our collection of article series on various topics",
    seriesIndexHeading: "Article Series",
    seriesIndexSub: "Browse our collection of multi-part article series on various topics",
    emptySeries: "No series available yet. Check back soon!",
    partOne: "part",
    partMany: "parts",

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
    closeMenu: "Cerrar menú principal",
    switchLang: "English",
    switchToLang: "Cambiar a English",
    noEsTranslation: "Sin traducción al español — ir al inicio en español",
    noEnTranslation: "Sin traducción al inglés — ir al inicio en inglés",
    skipLink: "Saltar al contenido principal",
    toggleTheme: "Cambiar esquema de color",
    logoAlt: "Logotipo de Bitdoze",
    logoHome: "Inicio de Bitdoze",
    followOn: "Seguir en",
    opensNewTab: "se abre en una pestaña nueva",

    // Common labels
    home: "Inicio",
    blog: "Blog",
    news: "Noticias",
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
    lastUpdated: "Última actualización",
    updated: "Actualizado",
    published: "Publicado",
    shareArticle: "Comparte este artículo",
    shareOn: "Compartir en",
    readGuide: "Leer la guía",
    writtenBy: "Escrito por",

    // Code copy button (PostLayout script)
    copyCode: "Copiar",
    copied: "Copiado",
    copyFailed: "Error al copiar",
    copyCodeAria: "Copiar código",

    // AmazonProduct widget
    amazonCheckPrice: "Ver precio en Amazon",
    amazonPriceNote: "Precio y disponibilidad en Amazon.com",
    amazonKeyFeatures: "Características principales",
    amazonWhatWeLike: "Lo que nos gusta",
    amazonWatchOutFor: "Ten en cuenta",
    amazonImportant: "Consideraciones importantes",
    amazonDisclosureLabel: "Divulgación:",
    amazonDisclosure:
      "Este artículo contiene enlaces de afiliado. Podemos ganar una comisión si compras a través de estos enlaces, sin coste adicional para ti.",
    amazonRating: "Valoración",
    amazonRatingOf: "sobre 5 estrellas",
    ratingExcellent: "Excelente",
    ratingVeryGood: "Muy bueno",
    ratingGood: "Bueno",
    ratingMixed: "Mixto",

    // Search
    noResults: "No se encontraron resultados. Prueba otro término.",
    searchArticles: "Buscar artículos",
    searchIndexBuilding: "El índice de búsqueda se está construyendo. Intenta más tarde.",

    // Blog
    latestArticles: "Artículos recientes",
    viewAll: "Ver todos",
    exploreContent: "Explorar contenido",
    browseByCategory: "Explora artículos por tema",
    meetCreators: "Conoce a nuestros creadores",
    findByTopics: "Encuentra contenido por temas específicos",

    // PopularTopics
    popularTopics: "Temas populares",
    popularTopicsSub: "Los temas más leídos del sitio",
    viewAllTagPosts: "Ver todos los artículos de {tag}",

    // Author box / misc
    moreGuidesFrom: "Más guías de {name}",
    enlargedImage: "Imagen ampliada",
    close: "Cerrar",

    // Services
    svcBackToServices: "Volver a servicios",
    svcTalkAbout: "Hablar sobre este servicio",
    svcViewScope: "Ver alcance",
    svcBestFitFor: "Ideal para",
    svcWhatThisIncludes: "Qué incluye",
    svcProcess: "Proceso",
    svcLikelyOutcome: "Resultado esperado",
    svcRelevantWork: "Trabajo relevante",
    svcRelatedArticles: "Artículos relacionados",
    svcReadArticle: "Leer artículo",
    svcContactHeading: "Si esto encaja con tu proyecto, escríbeme",
    svcContactBody:
      "Por ahora los enlaces de contacto siguen como placeholder, pero la página ya marca el tipo de trabajo y el encaje esperado.",
    svcContact: "Contactar",
    svcSeeAllServices: "Ver todos los servicios",
    svcFaq: "Preguntas frecuentes",
    svcViewService: "Ver servicio",
    svcAskAboutIt: "Consultar",
    svcNextStep: "Siguiente paso",
    svcProofPublishedTitle: "Basado en experiencia publicada",
    svcProofPublishedText:
      "Las páginas enlazan con guías reales del sitio, no con promesas genéricas.",
    svcProofTechTitle: "Enfoque técnico y práctico",
    svcProofTechText: "El foco está en setups, despliegues y estructura que puedas seguir usando.",
    svcProofCombTitle: "Servicios combinables",
    svcProofCombText: "Un proyecto puede mezclar Astro, VPS, Dokploy y apps self-hosted.",

    // Archive pages (blog / tags / categories / authors / series)
    blogArchiveTitle: "Blog en Español - {site}",
    blogArchiveDesc:
      "Guías prácticas de Bitdoze en español sobre programación, DevOps y herramientas.",
    blogArchiveTitlePage: "Blog en Español - Página {page} - {site}",
    blogArchiveDescPage: "Guías en español - Página {page}",
    allGuides: "Todas las guías",
    blogArchiveSub:
      "Tutoriales probados de DevOps, programación y herramientas autoalojadas en español",
    pageOf: "Página {page} de {total}",

    tagArchiveTitle: "Etiqueta {name} - {site}",
    tagArchiveTitlePage: "Etiqueta {name} - Página {page} - {site}",
    tagArchiveDesc: "Artículos con la etiqueta {name}",
    tagArchiveDescPage: "Artículos con la etiqueta {name} - Página {page}",
    tagHeading: "Etiqueta: #{name}",
    guidesWithTagOne: "{count} guía con esta etiqueta",
    guidesWithTagMany: "{count} guías con esta etiqueta",
    emptyTagArchive: "No se encontraron artículos.",

    categoryArchiveTitle: "Guías de {name} - {site}",
    categoryArchiveTitlePage: "{name} - Página {page} - {site}",
    categorySchemaName: "Guías de {name}",
    categoryArchiveDescPage: "Artículos en {name} - Página {page}",
    categoryHeading: "Categoría: {name}",
    guidesInCategoryOne: "{count} guía en esta categoría",
    guidesInCategoryMany: "{count} guías en esta categoría",

    authorArchiveTitle: "Artículos de {name} - {site}",
    authorArchiveTitlePage: "Artículos de {name} - Página {page} - {site}",
    authorArchiveDesc: "Explora los artículos escritos por {name}",
    authorArchiveDescPage: "Explora los artículos de {name} - Página {page}",
    authorHeading: "Autor: {name}",
    guidesByAuthorOne: "{count} guía de este autor",
    guidesByAuthorMany: "{count} guías de este autor",
    emptyAuthorArchive: "No se encontraron artículos.",

    emptyArchive: "No se encontraron artículos.",

    tagsIndexTitle: "Etiquetas - {site}",
    tagsIndexDesc: "Etiquetas del contenido en español",
    tagsIndexSub: "Explora artículos por etiqueta.",
    emptyTags: "No se encontraron etiquetas.",

    categoriesIndexTitle: "Categorías - {site}",
    categoriesIndexDesc: "Categorías del contenido en español",
    categoriesIndexSub: "Explora artículos por categoría.",
    emptyCategories: "No se encontraron categorías.",

    authorsIndexTitle: "Autores - {site}",
    authorsIndexDesc: "Autores de contenido en español",
    authorsIndexSub: "Explora contenido por autor.",
    emptyAuthors: "No se encontraron autores.",

    countPostOne: "artículo",
    countPostMany: "artículos",

    seriesIndexTitle: "Series en Español - {site}",
    seriesIndexDesc: "Colección de series de artículos en español",
    seriesIndexHeading: "Series de artículos",
    seriesIndexSub: "Guías por partes para aprender de forma progresiva.",
    emptySeries: "Aún no hay series en español.",
    partOne: "parte",
    partMany: "partes",

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
  News: "news",
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

/** t() with `{name}`-style placeholder substitution */
export function tf(
  locale: SupportedLocale,
  key: TranslationKey,
  vars: Record<string, string | number>
): string {
  let out = t(locale, key);
  for (const [name, value] of Object.entries(vars)) {
    out = out.replaceAll(`{${name}}`, String(value));
  }
  return out;
}

export function translateMenuLabel(locale: SupportedLocale, label: string): string {
  if (locale === "en") return label;
  const key = menuLabelKeys[label];
  return key ? t(locale, key) : label;
}
