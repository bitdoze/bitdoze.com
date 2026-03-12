const EXTENSION_REGEX = /\.(md|mdx|markdown)$/i;

type SluggableEntry = {
  slug?: string;
  id?: string;
  data?: Record<string, unknown> & {
    canonical?: string;
  };
};

function extractCanonical(entry: SluggableEntry): string | undefined {
  const canonical = entry?.data?.canonical;
  if (!canonical) {
    return undefined;
  }

  try {
    const url = new URL(canonical);
    return url.pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return canonical.replace(/^\/+|\/+$/g, "");
  }
}

export function getEntrySlug(entry: SluggableEntry): string {
  const canonical = extractCanonical(entry);
  const raw = canonical || entry?.slug || entry?.id || "";
  return raw.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").replace(EXTENSION_REGEX, "");
}

export function getEntryHref(entry: SluggableEntry): string {
  const slug = getEntrySlug(entry);
  return `/${slug ? `${slug}/` : ""}`;
}
