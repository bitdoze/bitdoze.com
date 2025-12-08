/**
 * YouTube Embed Utilities
 * Lightweight helpers for extracting video IDs and thumbnails
 */

const PLACEHOLDER_THUMBNAIL = "/images/youtube-placeholder.jpg";
const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed/";
const VALID_ID_PATTERN = /^[\w-]{11}$/;
const KNOWN_PREFIXES = ["www.", "m.", "music.", "gaming."];
const YOUTUBE_THUMB_BASE = "https://i3.ytimg.com/vi/";
const MAXRES_THUMBNAIL = "maxresdefault.jpg";
const DEFAULT_THUMBNAIL = "hqdefault.jpg";

const thumbnailAvailabilityCache = new Map<string, boolean>();

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
 * Check if a thumbnail URL is available via HEAD request
 * Results are cached to avoid repeated requests
 */
async function isThumbnailAvailable(url: string): Promise<boolean> {
  if (thumbnailAvailabilityCache.has(url)) {
    return thumbnailAvailabilityCache.get(url)!;
  }

  if (typeof fetch !== "function") {
    return false;
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    let available = response.ok;

    // Some servers don't support HEAD, try GET as fallback
    if (!available && response.status === 405) {
      const getResponse = await fetch(url, { method: "GET" });
      available = getResponse.ok;
    }

    thumbnailAvailabilityCache.set(url, available);
    return available;
  } catch {
    return false;
  }
}

/**
 * Get the best available thumbnail URL for a YouTube video
 * Tries maxresdefault first, falls back to hqdefault
 */
export async function getYoutubeThumbnail(rawUrl: string): Promise<string> {
  const id = extractYoutubeVideoId(rawUrl);
  if (!id) return PLACEHOLDER_THUMBNAIL;

  const baseUrl = `${YOUTUBE_THUMB_BASE}${id}`;
  const maxResUrl = `${baseUrl}/${MAXRES_THUMBNAIL}`;

  if (await isThumbnailAvailable(maxResUrl)) {
    return maxResUrl;
  }

  return `${baseUrl}/${DEFAULT_THUMBNAIL}`;
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
