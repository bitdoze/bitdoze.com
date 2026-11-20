// Carrd Black Friday promo scope — decided at the call site so the promo
// script only ships on posts that can show it. The sale runs Nov 27–30; the
// promo stops rendering Dec 2 (cached builds self-remove client-side via
// data-promo-end on the rendered aside).
export const CARRD_PROMO_END = new Date("2026-12-02T00:00:00Z");

export function shouldShowCarrdPromo(tags: string[] = [], categories: string[] = []): boolean {
  return (
    new Date() < CARRD_PROMO_END &&
    (tags.includes("carrd") || categories.includes("web-development"))
  );
}

// Site-wide Black Friday homelab deals promo — same sale window as Carrd.
// Renders on every post except the deals articles themselves (all locales)
// and posts where the more specific Carrd promo already shows.
export const BF_PROMO_END = new Date("2026-12-02T00:00:00Z");

const BF_PROMO_EXCLUDED_KEYS = new Set([
  "black-friday-home-server-deals",
  "carrd-black-friday-2026",
]);

export function shouldShowBFDealsPromo(
  translationKey = "",
  carrdPromoShowing = false
): boolean {
  return (
    new Date() < BF_PROMO_END &&
    !carrdPromoShowing &&
    !BF_PROMO_EXCLUDED_KEYS.has(translationKey)
  );
}
