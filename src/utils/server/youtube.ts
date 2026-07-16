type RawVideo = {
  id: string;
  title: string;
  published: Date;
  thumbnail: string;
  url: string;
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
    return list.map((v) => ({
      id: v.id,
      title: v.title,
      published: new Date(v.published),
      thumbnail: v.thumbnail || `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
      url: v.url || `https://www.youtube.com/watch?v=${v.id}`,
    }));
  } catch {
    return [];
  }
}

async function loadChannelFeed(channelId: string): Promise<RawVideo[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { cache: "force-cache" },
    );

    if (!response.ok) {
      throw new Error(
        `YouTube feed request failed with status ${response.status}`,
      );
    }

    const xmlText = await response.text();
    const videos: RawVideo[] = [];
    const videoRegex =
      /<entry>.*?<yt:videoId>(.*?)<\/yt:videoId>.*?<title>(.*?)<\/title>.*?<published>(.*?)<\/published>.*?<\/entry>/gs;

    let match: RegExpExecArray | null;
    while ((match = videoRegex.exec(xmlText)) !== null) {
      const [, videoId, title, published] = match;
      videos.push({
        id: videoId,
        title: decodeEntities(title),
        published: new Date(published),
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
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

export async function fetchYouTubeVideos(
  channelId: string,
  limit = 6,
): Promise<RawVideo[]> {
  if (!feedCache.has(channelId)) {
    feedCache.set(channelId, loadChannelFeed(channelId));
  }

  const videos = await feedCache.get(channelId)!;
  return videos.slice(0, limit);
}

export type YouTubeVideo = Awaited<
  ReturnType<typeof fetchYouTubeVideos>
>[number];
