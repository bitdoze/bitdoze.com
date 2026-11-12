import type { CollectionEntry } from "astro:content";
import { getCategoryStartHere } from "@config/categories";
import { getPostTranslationKey, type SupportedLocale } from "@utils/i18n";
import { getPostsByLocale } from "@utils/postsCache";

/**
 * Resolve a category's hand-picked "Start here" slugs (EN) into the posts for
 * `locale`. Matching is by translation key, so an EN slug finds its ES twin
 * automatically; picks with no localized post drop out.
 */
export async function getStartHerePosts(
  categorySlug: string,
  locale: SupportedLocale
): Promise<CollectionEntry<"posts">[]> {
  const keys = getCategoryStartHere(categorySlug);
  if (keys.length === 0) return [];
  const order = new Map(keys.map((key, i) => [key, i]));
  const posts = await getPostsByLocale(locale);
  return posts
    .filter((post) => order.has(getPostTranslationKey(post)))
    .sort(
      (a, b) =>
        (order.get(getPostTranslationKey(a)) ?? 99) - (order.get(getPostTranslationKey(b)) ?? 99)
    );
}
