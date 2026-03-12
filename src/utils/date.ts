import type { SupportedLocale } from "@utils/i18n";

const DATE_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: "en-US",
  es: "es-ES",
};

export function formatDate(date: Date, locale: SupportedLocale = "en"): string {
  return new Intl.DateTimeFormat(DATE_LOCALE_MAP[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
