import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "@config/site";
import { getEntryHref } from "@utils/content";
import { extractYoutubeVideoId, getYoutubeThumbnailSync } from "@utils/youtube";

type VideoEntry = {
  title: string;
  description: string;
  thumbnail: string;
  playerUrl: string;
  publicationDate?: string;
};

const YOUTUBE_EMBED_REGEX = /<YouTubeEmbed[\s\S]*?\/>/g;
const ATTRIBUTE_REGEX = (name: string) =>
  new RegExp(`${name}=("|')(.*?)\\1`);

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildAbsoluteUrl = (path: string, base: string | URL): string =>
  new URL(path, base).toString();

const extractVideosFromBody = (
  body: string,
  fallbackTitle: string,
  fallbackDescription: string | undefined,
  publicationDate?: Date
): VideoEntry[] => {
  const matches = body.match(YOUTUBE_EMBED_REGEX) || [];
  return matches
    .map((block) => {
      const urlMatch = block.match(ATTRIBUTE_REGEX("url"));
      const labelMatch = block.match(ATTRIBUTE_REGEX("label"));
      const rawUrl = urlMatch?.[2];
      const label = labelMatch?.[2] || fallbackTitle;
      if (!rawUrl) return null;

      const videoId = extractYoutubeVideoId(rawUrl);
      if (!videoId) return null;

      const playerUrl = `https://www.youtube.com/embed/${videoId}`;
      const thumbnail = getYoutubeThumbnailSync(rawUrl);
      const description = fallbackDescription || label;

      return {
        title: label,
        description,
        thumbnail,
        playerUrl,
        publicationDate: publicationDate?.toISOString(),
      };
    })
    .filter((entry): entry is VideoEntry => Boolean(entry));
};

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  const site = context.site || siteConfig.url;

  const urlEntries = posts
    .map((post) => {
      const body = post.body || "";
      if (!body.includes("<YouTubeEmbed")) return null;

      const videos = extractVideosFromBody(
        body,
        post.data.title,
        post.data.description,
        post.data.date
      );

      if (!videos.length) return null;

      const loc = buildAbsoluteUrl(getEntryHref(post), site);
      return { loc, videos };
    })
    .filter(Boolean) as Array<{ loc: string; videos: VideoEntry[] }>;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries
  .map(({ loc, videos }) => {
    const videoXml = videos
      .map((video) => {
        const publicationDate = video.publicationDate
          ? `<video:publication_date>${escapeXml(video.publicationDate)}</video:publication_date>`
          : "";
        return `    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeXml(video.playerUrl)}</video:player_loc>
${publicationDate ? `      ${publicationDate}` : ""}
    </video:video>`;
      })
      .join("\n");

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${videoXml}
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
