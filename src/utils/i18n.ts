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

export function getPostLocale(post: any): SupportedLocale {
  if (post?.data?.locale === "es") {
    return "es";
  }

  const slug = getEntrySlug(post);
  return getLocaleFromSlug(slug);
}

export function getPostTranslationKey(post: any): string {
  const configured = post?.data?.translationKey;
  if (configured && typeof configured === "string") {
    return configured.trim();
  }

  return stripLocalePrefix(getEntrySlug(post));
}

export function getLocaleBasePath(locale: SupportedLocale): string {
  return locale === "es" ? "/es/" : "/";
}
