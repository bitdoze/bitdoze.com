/**
 * Estimate reading time: prose at 220 wpm plus a flat 10 seconds per fenced
 * code block. MDX plumbing (imports, JSX, images, link URLs) is ignored.
 * @param text The MDX source to analyze
 * @returns An object with minutes, seconds and the formatted reading time string
 */
export function getReadingTime(text: string) {
  const blocks = (text.match(/```[\s\S]*?```/g) ?? []).length;

  const prose = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^\s*import\s.*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<[^>]+>/g, " ");

  const words = prose.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220 + (blocks * 10) / 60));

  return {
    minutes,
    seconds: 0,
    text: `${minutes} min`,
  };
}
