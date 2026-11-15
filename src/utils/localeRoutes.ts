import { services } from "@config/services";
import type { SupportedLocale } from "@utils/i18n";
import { buildArchivePagePath, buildArchivePath } from "@utils/slugs";

type ArchiveType = "blog" | "tags" | "categories" | "authors";
type TaxonomyArchiveType = Exclude<ArchiveType, "blog">;

/** EN paths that have a real localized counterpart (whitelist — unknown paths stay EN). */
const EXACT_EN_PATHS = new Set([
  "/",
  "/about/",
  "/resources/",
  "/contact/",
  "/search/",
  "/blog/",
  "/series/",
  "/services/",
  "/authors/",
  "/categories/",
  "/tags/",
  "/advertise/",
  "/privacy/",
  "/terms/",
  "/rss.xml",
]);

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

/** Strip a leading /es or /de prefix, returning the equivalent EN path. */
function stripLocalePrefix(path: string): string {
  const match = path.match(/^\/(es|de)(?=\/|$)/);
  if (!match) {
    return path;
  }
  return path.slice(match[0].length) || "/";
}

function mapPaginatedPath(path: string, targetLocale: SupportedLocale): string | null {
  const normalized = normalizePath(path);

  const paginatedMatch = normalized.match(
    /^\/(?:(es|de)\/)?(blog|tags|categories|authors)(?:\/([^/]+))?\/page\/(\d+)\/$/
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
  const currentLocale: SupportedLocale = (localePrefix as SupportedLocale) || "en";

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
  const archiveMatch = normalized.match(/^\/(?:(es|de)\/)?(tags|categories|authors)\/([^/]+)\/$/);

  if (!archiveMatch) {
    return null;
  }

  const [, localePrefix, archiveType, archiveSlug] = archiveMatch as [
    string,
    string | undefined,
    TaxonomyArchiveType,
    string,
  ];
  const currentLocale: SupportedLocale = (localePrefix as SupportedLocale) || "en";

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

  const enPath = stripLocalePrefix(normalized);
  if (!EXACT_EN_PATHS.has(enPath)) {
    return normalized;
  }

  return targetLocale === "en" ? enPath : `/${targetLocale}${enPath === "/" ? "/" : enPath}`;
}

function mapServicePath(path: string, targetLocale: SupportedLocale): string | null {
  // Services pages exist for EN and ES only — DE falls back to the EN path.
  const base = stripLocalePrefix(path);

  if (base === "/services/") {
    return targetLocale === "es" ? "/es/services/" : "/services/";
  }

  for (const service of services) {
    if (base === `/services/${service.slug.en}/` || base === `/services/${service.slug.es}/`) {
      return targetLocale === "es"
        ? `/es/services/${service.slug.es}/`
        : `/services/${service.slug.en}/`;
    }
  }

  return null;
}
