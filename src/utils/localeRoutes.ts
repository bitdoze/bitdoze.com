import type { SupportedLocale } from "@utils/i18n";

const EN_TO_ES_EXACT: Record<string, string> = {
  "/": "/es/",
  "/about/": "/es/about/",
  "/resources/": "/es/resources/",
  "/contact/": "/es/contact/",
  "/search/": "/es/search/",
  "/blog/": "/es/blog/",
  "/series/": "/es/series/",
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

  if (targetLocale === "es") {
    const enMatch = normalized.match(/^\/blog\/page\/(\d+)\/$/);
    if (enMatch) {
      return `/es/blog/page/${enMatch[1]}/`;
    }
    return null;
  }

  const esMatch = normalized.match(/^\/es\/blog\/page\/(\d+)\/$/);
  if (esMatch) {
    return `/blog/page/${esMatch[1]}/`;
  }

  return null;
}

export function localizeInternalPath(path: string, targetLocale: SupportedLocale): string {
  const normalized = normalizePath(path);
  const paginated = mapPaginatedPath(normalized, targetLocale);

  if (paginated) {
    return paginated;
  }

  if (targetLocale === "es") {
    return EN_TO_ES_EXACT[normalized] || normalized;
  }

  return ES_TO_EN_EXACT[normalized] || normalized;
}
