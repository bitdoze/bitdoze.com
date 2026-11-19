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
