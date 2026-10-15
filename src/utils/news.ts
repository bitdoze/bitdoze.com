import { getCollection } from "astro:content";

// The news section is a rolling window: only the newest N digests exist
// site-wide (hub, digest pages, RSS, sitemap). Older .mdx files are pruned
// from the collection; the slice here enforces the limit even if files linger.
export const NEWS_DIGEST_LIMIT = 10;

export async function getLatestDigests(limit = NEWS_DIGEST_LIMIT) {
  const digests = (await getCollection("news", ({ data }) => !data.draft)).sort(
    (a, b) => new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime()
  );
  return digests.slice(0, limit);
}
