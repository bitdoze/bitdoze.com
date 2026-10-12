/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /**
     * Publish date of the post currently being rendered. Set in
     * `src/pages/[...slug].astro` so widgets deep inside MDX content (e.g.
     * YouTubeEmbed) can use it as the VideoObject `uploadDate` fallback.
     */
    postPublishDate?: Date;
  }
}
