/**
 * Client-side course progress for /courses/ pages.
 * Visited lesson slugs are stored per-course in localStorage; the chapter
 * list hydrates checkmarks + a progress bar from it. Pure enhancement —
 * pages render fully without it.
 */

const STORAGE_KEY = "bitdoze:course-progress";

type ProgressMap = Record<string, string[]>;

function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as ProgressMap) : {};
  } catch {
    return {};
  }
}

/**
 * Marks `lessonSlug` as visited (when provided), then reflects the stored
 * progress onto the DOM: `[data-lesson-item][data-slug]` items get
 * `data-watched`, `[data-progress-label]` gets "x/y watched" text, and
 * `[data-progress-fill]` gets its width/aria values.
 */
export function initCourseProgress(courseSlug: string, lessonSlug?: string): void {
  const map = readProgress();
  const visited = new Set(map[courseSlug] ?? []);

  if (lessonSlug && !visited.has(lessonSlug)) {
    visited.add(lessonSlug);
    map[courseSlug] = [...visited];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      // Storage full/blocked — progress just won't persist.
    }
  }

  // CSS rules on [data-watched] swap the number badge for a check icon and
  // reveal [data-check] chips — JS only needs to set the attribute.
  const items = document.querySelectorAll<HTMLElement>("[data-lesson-item][data-slug]");
  items.forEach((item) => {
    const slug = item.dataset.slug ?? "";
    if (slug && visited.has(slug)) {
      item.dataset.watched = "true";
    }
  });

  const scope = items[0]?.closest("[data-course-progress]") ?? document;
  const totalAttr = scope instanceof HTMLElement ? scope.dataset.total : undefined;
  const total = totalAttr ? parseInt(totalAttr, 10) : items.length;
  const count = Math.min(visited.size, total || visited.size);

  scope
    .querySelectorAll<HTMLElement>("[data-progress-label]")
    .forEach((el) => {
      el.textContent = `${count}/${total} watched`;
    });

  scope.querySelectorAll<HTMLElement>("[data-progress-fill]").forEach((bar) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    bar.style.width = `${pct}%`;
    bar.setAttribute("aria-valuenow", String(pct));
  });
}
