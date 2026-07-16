import { getEntrySlug } from "@utils/content";
import {
  getPostLocale,
  getPostTranslationKey,
  type SupportedLocale,
} from "@utils/i18n";
import { getAllPublishedPosts } from "@utils/postsCache";

export type TranslationMap = Map<
  string,
  Partial<Record<SupportedLocale, string>>
>;

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

/**
 * Resolve the alternate-locale path for a given pathname.
 * Returns null for posts that have no translation in the target locale
 * (caller should fall back to locale home or hide the switcher).
 */
export async function resolveLanguageSwitchPath(
  pathname: string,
  targetLocale: SupportedLocale,
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

  // Not a post page — let caller use path localization
  return { path: "", hasTranslation: true };
}
