import { services } from "@config/services";
import type { SupportedLocale } from "@utils/i18n";
import { buildArchivePagePath, buildArchivePath } from "@utils/slugs";

type ArchiveType = "blog" | "tags" | "categories" | "authors";
type TaxonomyArchiveType = Exclude<ArchiveType, "blog">;

const EN_TO_ES_EXACT: Record<string, string> = {
  "/": "/es/",
  "/about/": "/es/about/",
  "/resources/": "/es/resources/",
  "/contact/": "/es/contact/",
  "/search/": "/es/search/",
  "/blog/": "/es/blog/",
  "/series/": "/es/series/",
  "/services/": "/es/services/",
  "/authors/": "/es/authors/",
  "/categories/": "/es/categories/",
  "/tags/": "/es/tags/",
  "/advertise/": "/es/advertise/",
  "/privacy/": "/es/privacy/",
  "/terms/": "/es/terms/",
  "/rss.xml": "/es/rss.xml",
};

const ES_TO_EN_EXACT = Object.fromEntries(
  Object.entries(EN_TO_ES_EXACT).map(([enPath, esPath]) => [esPath, enPath]),
) as Record<string, string>;

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function normalizePath(path: string): string {
  const [pathname] = path.split(/[?#]/, 1);

  if (!pathname || pathname === "/") {
    return "/";
  }

  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function mapPaginatedPath(path: string, targetLocale: SupportedLocale): string | null {
  const normalized = normalizePath(path);

  const paginatedMatch = normalized.match(
    /^\/(?:(es)\/)?(blog|tags|categories|authors)(?:\/([^/]+))?\/page\/(\d+)\/$/,
  );

  if (!paginatedMatch) {
    return null;
  }

  const [, localePrefix, archiveType, archiveSlug, page] = paginatedMatch as [
    string,
    string | undefined,
    ArchiveType,
    string | undefined,
    string,
  ];
  const currentLocale: SupportedLocale = localePrefix === "es" ? "es" : "en";

  if (currentLocale === targetLocale) {
    return normalized;
  }

  if (archiveType === "blog") {
    return buildArchivePagePath("blog", targetLocale, page);
  }

  if (!archiveSlug) {
    return null;
  }

  return buildArchivePagePath(archiveType, targetLocale, page, archiveSlug);
}

function mapArchivePath(path: string, targetLocale: SupportedLocale): string | null {
  const normalized = normalizePath(path);
  const archiveMatch = normalized.match(
    /^\/(?:(es)\/)?(tags|categories|authors)\/([^/]+)\/$/,
  );

  if (!archiveMatch) {
    return null;
  }

  const [, localePrefix, archiveType, archiveSlug] = archiveMatch as [
    string,
    string | undefined,
    TaxonomyArchiveType,
    string,
  ];
  const currentLocale: SupportedLocale = localePrefix === "es" ? "es" : "en";

  if (currentLocale === targetLocale) {
    return normalized;
  }

  return buildArchivePath(archiveType, archiveSlug, targetLocale);
}

export function localizeInternalPath(path: string, targetLocale: SupportedLocale): string {
  const normalized = normalizePath(path);
  const servicePath = mapServicePath(normalized, targetLocale);

  if (servicePath) {
    return servicePath;
  }

  const paginated = mapPaginatedPath(normalized, targetLocale);

  if (paginated) {
    return paginated;
  }

  const archivePath = mapArchivePath(normalized, targetLocale);
  if (archivePath) {
    return archivePath;
  }

  if (targetLocale === "es") {
    return EN_TO_ES_EXACT[normalized] || normalized;
  }

  return ES_TO_EN_EXACT[normalized] || normalized;
}

function mapServicePath(path: string, targetLocale: SupportedLocale): string | null {
  if (path === "/services/" || path === "/es/services/") {
    return targetLocale === "es" ? "/es/services/" : "/services/";
  }

  for (const service of services) {
    const enPath = `/services/${service.slug.en}/`;
    const esPath = `/es/services/${service.slug.es}/`;

    if (path === enPath || path === esPath) {
      return targetLocale === "es" ? esPath : enPath;
    }
  }

  return null;
}
