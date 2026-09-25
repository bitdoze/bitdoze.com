import { getEntrySlug } from "@utils/content";
import { getPostLocale, getPostTranslationKey, type SupportedLocale } from "@utils/i18n";
import { getAllPublishedPosts } from "@utils/postsCache";
import { localizeInternalPath, normalizePath } from "@utils/localeRoutes";
import { toTaxonomySlug } from "@utils/slugs";
import { services } from "@config/services";
import { siteConfig } from "@config/site";

export type TranslationMap = Map<string, Partial<Record<SupportedLocale, string>>>;

/** slug (no leading/trailing slash) → map of locale → slug */
export type SlugLocaleMap = Map<string, SupportedLocale>;

let mapPromise: Promise<{
  byKey: TranslationMap;
  slugToKey: Map<string, string>;
}> | null = null;

async function buildMaps() {
  const posts = await getAllPublishedPosts();
  const byKey: TranslationMap = new Map();
  const slugToKey = new Map<string, string>();

  for (const post of posts) {
    const slug = getEntrySlug(post);
    const locale = getPostLocale(post);
    const key = getPostTranslationKey(post);

    slugToKey.set(slug, key);

    const entry = byKey.get(key) ?? {};
    entry[locale] = slug;
    byKey.set(key, entry);
  }

  return { byKey, slugToKey };
}

/**
 * Cached translation index for the build process.
 * Avoids re-scanning the full posts collection on every page that needs language switching.
 */
export function getTranslationMaps() {
  if (!mapPromise) {
    mapPromise = buildMaps();
  }
  return mapPromise;
}

// Static pages that exist in BOTH locales (path relative to locale root).
const SHARED_STATIC_PAGES = [
  "about",
  "advertise",
  "authors",
  "blog",
  "categories",
  "contact",
  "privacy",
  "resources",
  "search",
  "series",
  "services",
  "tags",
  "terms",
];

let pathsPromise: Promise<Record<SupportedLocale, Set<string>>> | null = null;

/**
 * Every concrete archive page that actually gets built per locale —
 * taxonomy routes only exist for values present in that locale's posts,
 * and pagination only up to the real page count.
 */
async function buildLocalePaths() {
  const posts = await getAllPublishedPosts();
  const perPage = siteConfig.postsPerPage || 10;

  const paths: Record<SupportedLocale, Set<string>> = {
    en: new Set(["/"]),
    es: new Set(["/es/"]),
  };
  const counts: Record<SupportedLocale, Map<string, number>> = {
    en: new Map(),
    es: new Map(),
  };

  for (const locale of ["en", "es"] as const) {
    const prefix = locale === "es" ? "/es" : "";
    for (const page of SHARED_STATIC_PAGES) {
      paths[locale].add(`${prefix}/${page}/`);
    }
    for (const service of services) {
      paths[locale].add(`${prefix}/services/${service.slug[locale]}/`);
    }
    counts[locale].set(`${prefix}/blog/`, 0);
  }

  const bump = (locale: SupportedLocale, path: string) => {
    const map = counts[locale];
    map.set(path, (map.get(path) ?? 0) + 1);
  };

  for (const post of posts) {
    const locale = getPostLocale(post);
    const prefix = locale === "es" ? "/es" : "";
    bump(locale, `${prefix}/blog/`);
    for (const category of post.data.categories ?? []) {
      bump(locale, `${prefix}/categories/${toTaxonomySlug(category)}/`);
    }
    for (const tag of post.data.tags ?? []) {
      bump(locale, `${prefix}/tags/${toTaxonomySlug(tag)}/`);
    }
    for (const author of post.data.authors ?? []) {
      bump(locale, `${prefix}/authors/${toTaxonomySlug(author)}/`);
    }
  }

  for (const locale of ["en", "es"] as const) {
    for (const [path, count] of counts[locale]) {
      paths[locale].add(path);
      const pages = Math.ceil(count / perPage);
      for (let page = 2; page <= pages; page++) {
        paths[locale].add(`${path}page/${page}/`);
      }
    }
  }

  return paths;
}

function getLocalePaths() {
  if (!pathsPromise) {
    pathsPromise = buildLocalePaths();
  }
  return pathsPromise;
}

/**
 * Check whether a concrete path is emitted by `getStaticPaths` for a locale.
 * Used to pair archive pages (categories/tags/authors) with hreflang only
 * when the counterpart actually gets built.
 */
export async function localePathExists(path: string, locale: SupportedLocale): Promise<boolean> {
  const validPaths = await getLocalePaths();
  return validPaths[locale].has(normalizePath(path));
}

/**
 * Resolve the alternate-locale path for a given pathname.
 * Returns null for posts that have no translation in the target locale
 * (caller should fall back to locale home or hide the switcher).
 */
export async function resolveLanguageSwitchPath(
  pathname: string,
  targetLocale: SupportedLocale
): Promise<{ path: string; hasTranslation: boolean }> {
  const { byKey, slugToKey } = await getTranslationMaps();
  const normalized = pathname.replace(/\/+$/, "") || "/";
  // Strip leading slash for slug match; posts live at /slug/
  const maybeSlug = normalized.replace(/^\//, "");

  const key = slugToKey.get(maybeSlug);
  if (key) {
    const locales = byKey.get(key);
    const translatedSlug = locales?.[targetLocale];
    if (translatedSlug) {
      return { path: `/${translatedSlug}/`, hasTranslation: true };
    }
    // Post exists but no translation
    return {
      path: targetLocale === "es" ? "/es/" : "/",
      hasTranslation: false,
    };
  }

  // Not a post page — localize the path, then verify the target page actually
  // gets built (taxonomy/pagination pages only exist when the locale has posts
  // for them). Fall back to the locale home otherwise.
  const candidate = localizeInternalPath(normalized, targetLocale);
  const validPaths = await getLocalePaths();
  if (validPaths[targetLocale].has(normalizePath(candidate))) {
    return { path: candidate, hasTranslation: true };
  }
  return {
    path: targetLocale === "es" ? "/es/" : "/",
    hasTranslation: false,
  };
}
