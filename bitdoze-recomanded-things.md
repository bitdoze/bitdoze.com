# BitDoze Improvements Status

## ✅ Completed
- Adopted the Astro 5 Content Layer API with `glob()` loaders and migrated render calls to the new `render(entry)` helper.[^1]
- Normalised slug generation through the new helper utilities in `src/utils/content.ts` and updated downstream components.
- Extracted YouTube feed parsing into `src/utils/server/youtube.ts` with caching and reuse across pages.
- Streamlined `Layout.astro` theme handling, replaced `<ViewTransitions />` with `<ClientRouter />`, added a skip link, and respected `prefers-reduced-motion`.[^1][^2]
- Hardened header dropdown scripts to initialise once, added ARIA attributes, and avoided repeated listener binding.[^3]
- Bundled Fuse.js locally and lazy-loaded it on demand within `src/pages/search.astro`.
- Deferred heavier widgets (`YouTubeVideos`, `RelatedPosts`) with `server:defer` placeholders to improve perceived performance.[^4]
- Enabled cached external fetches for the YouTube feed to mitigate transient network issues.
- Added `@astrojs/check`, a dedicated `npm run check` script, and pinned `sharp` to guarantee the default image service.[^6]

## 🔄 Still Recommended
- Evaluate `experimental.liveContentCollections` if sections like Resources must refresh without rebuilds.[^5]
- Centralise remaining client utilities (e.g. markdown helpers, accordion logic) under a browser utilities module for reuse.
- Address legacy TypeScript diagnostics surfaced by `astro check` (accordion/tabs scripts, old pagination utilities) to unblock a clean CI run.

## References

[^1]: [Astro Docs – Upgrade to v5](https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/upgrade-to/v5.mdx)
[^2]: [Astro Docs – View Transitions](https://docs.astro.build/en/guides/view-transitions/#_top)
[^3]: [Astro Docs – View Transitions Router API](https://docs.astro.build/en/reference/modules/astro-transitions/#imports-from-astrotransitionsclient)
[^4]: [Astro Docs – Server Islands](https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/server-islands.mdx)
[^5]: [Astro Docs – Live Content Collections](https://docs.astro.build/en/reference/experimental-flags/live-content-collections/#_top)
[^6]: [Astro Docs – Images & Sharp](https://docs.astro.build/en/guides/images/#)
