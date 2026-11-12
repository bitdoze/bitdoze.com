import type { CollectionEntry } from "astro:content";
import { getEntrySlug } from "@utils/content";

export const DEFAULT_LOCALE = "en";
export const SECONDARY_LOCALE = "es";
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, SECONDARY_LOCALE] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function getLocaleFromPathname(pathname: string): SupportedLocale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function getLocaleFromSlug(slug: string): SupportedLocale {
  return slug === "es" || slug.startsWith("es/") ? "es" : "en";
}

export function stripLocalePrefix(slug: string): string {
  return slug.replace(/^es\//, "");
}

export function isPostIdInLocale(id: string, locale: SupportedLocale): boolean {
  const isSpanish = id === "es" || id.startsWith("es/");
  return locale === "es" ? isSpanish : !isSpanish;
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
  return locale === "es" ? "/es/" : "/";
}
