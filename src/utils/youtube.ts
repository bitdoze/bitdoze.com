/**
 * YouTube Embed Utilities
 * Lightweight helpers for extracting video IDs and thumbnails
 */

const PLACEHOLDER_THUMBNAIL = "/images/youtube-placeholder.jpg";
const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed/";
const VALID_ID_PATTERN = /^[\w-]{11}$/;
const KNOWN_PREFIXES = ["www.", "m.", "music.", "gaming."];
const YOUTUBE_THUMB_BASE = "https://i3.ytimg.com/vi/";
const DEFAULT_THUMBNAIL = "hqdefault.jpg";

/**
 * Normalize YouTube hostname by removing common prefixes
 */
function normalizeHost(host: string): string {
  for (const prefix of KNOWN_PREFIXES) {
    if (host.startsWith(prefix)) {
      return host.slice(prefix.length);
    }
  }
  return host;
}

/**
 * Validate and sanitize a video ID
 */
function sanitizeVideoId(id: string | null): string | null {
  if (!id) return null;
  return VALID_ID_PATTERN.test(id) ? id : null;
}

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 * - https://youtube.com/embed/VIDEO_ID
 * - https://youtube.com/live/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function extractYoutubeVideoId(rawUrl: string): string | null {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    const host = normalizeHost(url.hostname);

    // Handle youtu.be short links
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0] ?? null;
      return sanitizeVideoId(id);
    }

    // Handle youtube.com URLs
    if (host.endsWith("youtube.com")) {
      // Check query parameter first (most common: ?v=VIDEO_ID)
      const paramsId = sanitizeVideoId(url.searchParams.get("v"));
      if (paramsId) return paramsId;

      const segments = url.pathname.split("/").filter(Boolean);
      if (!segments.length) return null;

      // Handle /embed/, /shorts/, /live/ paths
      if (segments[0] === "embed" || segments[0] === "shorts" || segments[0] === "live") {
        return sanitizeVideoId(segments[1] ?? null);
      }

      // Fallback: try last segment
      return sanitizeVideoId(segments[segments.length - 1] ?? null);
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Get the embed URL for a YouTube video with autoplay enabled
 */
export function getYoutubeEmbedUrl(rawUrl: string): string | null {
  const id = extractYoutubeVideoId(rawUrl);
  return id ? `${YOUTUBE_EMBED_BASE}${id}?autoplay=1` : null;
}

/**
 * Get the default thumbnail URL (without checking availability)
 * Useful for sync contexts where async isn't available
 */
export function getYoutubeThumbnailSync(rawUrl: string): string {
  const id = extractYoutubeVideoId(rawUrl);
  if (!id) return PLACEHOLDER_THUMBNAIL;
  return `${YOUTUBE_THUMB_BASE}${id}/${DEFAULT_THUMBNAIL}`;
}
