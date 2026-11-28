import type { SupportedLocale } from "@utils/i18n";

const DATE_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
};

export function formatDate(date: Date, locale: SupportedLocale = "en"): string {
  return new Intl.DateTimeFormat(DATE_LOCALE_MAP[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** "Nov 12, 2026" — card meta runs in 11px mono and wraps on 3-col grids */
export function formatDateShort(date: Date, locale: SupportedLocale = "en"): string {
  return new Intl.DateTimeFormat(DATE_LOCALE_MAP[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Calendar day in UTC ("YYYY-MM-DD") for timezone-independent comparisons. */
export function toUtcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** True when `lastmod` is on a later UTC calendar day than `date`. */
export function isUpdatedDate(date?: Date, lastmod?: Date): lastmod is Date {
  return Boolean(lastmod && (!date || toUtcDay(lastmod) > toUtcDay(date)));
}
