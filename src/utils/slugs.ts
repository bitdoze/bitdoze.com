import type { SupportedLocale } from "@utils/i18n";

const DIACRITICS_REGEX = /[\u0300-\u036f]/g;
const NON_WORD_REGEX = /[^a-z0-9]+/g;

export function toTaxonomySlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(NON_WORD_REGEX, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getUniqueTaxonomyValues(values: string[]): string[] {
  const seen = new Set<string>();

  return values.filter((value) => {
    const slug = toTaxonomySlug(value);

    if (!slug || seen.has(slug)) {
      return false;
    }

    seen.add(slug);
    return true;
  });
}

export function absoluteUrl(path: string, base: string | URL | undefined): string {
  return new URL(path, base || "http://localhost").toString();
}

export function buildArchivePath(
  type: "tags" | "categories" | "authors",
  slug: string,
  locale: SupportedLocale,
): string {
  const localePrefix = locale === "es" ? "/es" : "";
  return `${localePrefix}/${type}/${slug}/`;
}

export function buildArchivePagePath(
  type: "blog" | "tags" | "categories" | "authors",
  locale: SupportedLocale,
  page: number | string,
  slug?: string,
): string {
  const localePrefix = locale === "es" ? "/es" : "";
  const pageSegment = `page/${page}/`;

  if (type === "blog") {
    return `${localePrefix}/blog/${pageSegment}`;
  }

  if (!slug) {
    throw new Error(`Archive slug is required for ${type} pagination paths.`);
  }

  return `${localePrefix}/${type}/${slug}/${pageSegment}`;
}
