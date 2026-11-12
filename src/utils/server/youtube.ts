import { getYoutubeMeta } from "@utils/youtube";

type RawVideo = {
  id: string;
  title: string;
  published: Date;
  thumbnail: string;
  url: string;
  /** "14:20"-style duration, when src/data/youtube-meta.json knows it */
  duration?: string;
};

const feedCache = new Map<string, Promise<RawVideo[]>>();

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** ISO-8601 duration (PT14M20S) → "14:20" for the thumbnail badge */
function formatDuration(iso?: string): string | undefined {
  if (!iso) return undefined;
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return undefined;
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const s = Number(m[3] ?? 0);
  const totalMin = h * 60 + min;
  if (totalMin === 0 && s === 0) return undefined;
  return `${totalMin}:${String(s).padStart(2, "0")}`;
}

function withDuration(v: RawVideo): RawVideo {
  const duration = formatDuration(getYoutubeMeta(v.id).duration);
  return duration ? { ...v, duration } : v;
}

async function loadFallback(): Promise<RawVideo[]> {
  try {
    const data = await import("./youtube-fallback.json");
    const list = (data.default ?? data) as Array<{
      id: string;
      title: string;
      published: string;
      thumbnail?: string;
      url?: string;
    }>;
    return list.map((v) =>
      withDuration({
        id: v.id,
        title: v.title,
        published: new Date(v.published),
        thumbnail: v.thumbnail || `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
        url: v.url || `https://www.youtube.com/watch?v=${v.id}`,
      })
    );
  } catch {
    return [];
  }
}

async function loadChannelFeed(channelId: string): Promise<RawVideo[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      throw new Error(`YouTube feed request failed with status ${response.status}`);
    }

    const xmlText = await response.text();
    const videos: RawVideo[] = [];
    const videoRegex =
      /<entry>.*?<yt:videoId>(.*?)<\/yt:videoId>.*?<title>(.*?)<\/title>.*?<published>(.*?)<\/published>.*?<\/entry>/gs;

    let match: RegExpExecArray | null;
    while ((match = videoRegex.exec(xmlText)) !== null) {
      const [, videoId, title, published] = match;
      videos.push(
        withDuration({
          id: videoId,
          title: decodeEntities(title),
          published: new Date(published),
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        })
      );
    }

    if (videos.length === 0) {
      return loadFallback();
    }
    return videos;
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("YouTube feed unavailable, using fallback:", err);
    }
    return loadFallback();
  }
}

export async function fetchYouTubeVideos(channelId: string, limit = 6): Promise<RawVideo[]> {
  if (!feedCache.has(channelId)) {
    feedCache.set(channelId, loadChannelFeed(channelId));
  }

  const videos = await feedCache.get(channelId)!;
  return videos.slice(0, limit);
}

export type YouTubeVideo = Awaited<ReturnType<typeof fetchYouTubeVideos>>[number];
