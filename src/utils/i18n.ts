import type { CollectionEntry } from "astro:content";
import { getEntrySlug } from "@utils/content";

export const DEFAULT_LOCALE = "en";
export const SECONDARY_LOCALE = "es";
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, SECONDARY_LOCALE, "de"] as const;
export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
) as SupportedLocale[];

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/** Native language names for the language switcher. */
export const LOCALE_NATIVE_NAMES: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

const LOCALE_PREFIX_RE = /^(es|de)(?=\/|$)/;

export function getLocaleFromPathname(pathname: string): SupportedLocale {
  const match = pathname.match(/^\/(es|de)(?=\/|$)/);
  return (match?.[1] as SupportedLocale | undefined) ?? "en";
}

export function getLocaleFromSlug(slug: string): SupportedLocale {
  const match = slug.match(LOCALE_PREFIX_RE);
  return (match?.[1] as SupportedLocale | undefined) ?? "en";
}

export function stripLocalePrefix(slug: string): string {
  return slug.replace(/^(es|de)\//, "");
}

export function isPostIdInLocale(id: string, locale: SupportedLocale): boolean {
  const idLocale = getLocaleFromSlug(id);
  return idLocale === locale;
}

export function getPostLocale(post: CollectionEntry<"posts">): SupportedLocale {
  // Path is the single source of truth: the collection entry id is derived from
  // the file location, so es/ files are Spanish. (Canonical/slug are URL inputs —
  // a bad canonical must never relabel which locale archive a post belongs to.)
  return getLocaleFromSlug(post.id);
}

export function getPostTranslationKey(post: CollectionEntry<"posts">): string {
  const configured = post?.data?.translationKey;
  if (configured && typeof configured === "string") {
    return configured.trim();
  }

  return stripLocalePrefix(getEntrySlug(post));
}

export function getLocaleBasePath(locale: SupportedLocale): string {
  return locale === "en" ? "/" : `/${locale}/`;
}
