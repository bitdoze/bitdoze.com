// Build-time Markdown/MDX enhancements wired in astro.config.mjs.

const LANG_LABELS = {
  plaintext: "text",
  txt: "text",
  shellscript: "bash",
  sh: "bash",
  shell: "bash",
  console: "bash",
};

/**
 * Shiki transformer: wraps each highlighted block in
 * <figure class="code-block"><figcaption class="code-block-header">lang</figcaption><pre/></figure>.
 * PostLayout's script mounts the copy button into the header.
 */
export function codeBlockHeader() {
  return {
    name: "bitdoze:code-block-header",
    root(root) {
      const pre = root.children.find((node) => node.type === "element" && node.tagName === "pre");
      if (!pre) return;

      const lang = String(this.options.lang ?? "text").toLowerCase();
      const label = LANG_LABELS[lang] ?? lang;

      root.children = [
        {
          type: "element",
          tagName: "figure",
          properties: { className: ["code-block"], dataLanguage: label },
          children: [
            {
              type: "element",
              tagName: "figcaption",
              properties: { className: ["code-block-header"], dataPagefindIgnore: "" },
              children: [
                {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["code-block-lang"] },
                  children: [{ type: "text", value: label }],
                },
              ],
            },
            pre,
          ],
        },
      ];
    },
  };
}

const COLOR_STYLE = /color\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|[\w-]+)/;

/**
 * Shiki transformer: shrink per-token inline styles.
 * - Drops `style="color:<fg>"` spans whose color is the theme's default
 *   foreground — they add bytes but no styling.
 * - Merges adjacent <span> siblings that share an identical style string.
 * Cuts ~30–50% of code-block HTML on code-heavy posts.
 */
export function trimTokenStyles() {
  const getText = (node) =>
    node.type === "text" ? node.value : (node.children ?? []).map(getText).join("");

  const styleOf = (node) =>
    node.type === "element" && typeof node.properties?.style === "string"
      ? node.properties.style.trim()
      : null;

  const visit = (node, defaultFg) => {
    if (node.type !== "element" || !Array.isArray(node.children)) return;
    for (const child of node.children) visit(child, defaultFg);

    // Strip default-foreground color styles on spans
    for (const child of node.children) {
      if (child.type !== "element" || child.tagName !== "span") continue;
      const style = child.properties?.style;
      if (typeof style !== "string") continue;
      const m = style.match(COLOR_STYLE);
      if (!m) continue;
      const color = m[1].toLowerCase();
      if (defaultFg && color === defaultFg) {
        const rest = style.replace(m[0], "").replace(/^[;\s]+|[;\s]+$/g, "");
        if (rest) child.properties.style = rest;
        else delete child.properties.style;
      }
    }

    // Merge adjacent spans with identical style attributes
    const merged = [];
    for (const child of node.children) {
      const prev = merged[merged.length - 1];
      if (
        prev &&
        prev.type === "element" &&
        child.type === "element" &&
        prev.tagName === "span" &&
        child.tagName === "span" &&
        styleOf(prev) === styleOf(child) &&
        Object.keys(prev.properties ?? {}).every((k) => k === "style") &&
        Object.keys(child.properties ?? {}).every((k) => k === "style")
      ) {
        const style = styleOf(prev);
        prev.children = [{ type: "text", value: getText(prev) + getText(child) }];
        if (style) prev.properties = { style };
        else prev.properties = {};
        continue;
      }
      merged.push(child);
    }
    node.children = merged;
  };

  return {
    name: "bitdoze:trim-token-styles",
    root(root) {
      // Resolve the theme's default foreground color
      const themes = this.options?.themes;
      const theme =
        themes && typeof themes === "object" ? Object.values(themes)[0] : this.options?.theme;
      const defaultFg =
        typeof theme === "object" && theme
          ? (
              theme.fg ??
              theme.settings?.find?.(
                (s) => !s.scope || (Array.isArray(s.scope) && s.scope.length === 0)
              )?.settings?.foreground
            )?.toLowerCase?.()
          : typeof theme === "string"
            ? undefined
            : undefined;
      visit(root, defaultFg ?? null);
    },
  };
}

const FILENAME_LIKE = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

/**
 * Satteri hast plugin: a paragraph holding only an image gets a visible caption from the alt text.
 * The caption is a <span> after the <img> (a <figcaption> can't live inside <p>), aria-hidden so
 * screen readers don't hear the alt twice. Must run before Astro's image marker, which strips alt.
 */
export const imageCaptions = {
  name: "bitdoze:image-captions",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const alt = typeof node.properties?.alt === "string" ? node.properties.alt.trim() : "";
      if (alt.length < 4 || FILENAME_LIKE.test(alt)) return;

      const parent = ctx.parent(node);
      if (!parent || parent.type !== "element" || parent.tagName !== "p") return;

      const siblings = parent.children ?? [];
      const elementCount = siblings.filter((child) => child.type === "element").length;
      const hasText = siblings.some((child) => child.type === "text" && child.value.trim() !== "");
      if (elementCount !== 1 || hasText) return;

      ctx.setProperty(parent, "className", ["img-figure"]);
      ctx.insertAfter(node, {
        type: "element",
        tagName: "span",
        properties: { className: ["img-caption"], ariaHidden: "true" },
        children: [{ type: "text", value: alt }],
      });
    },
  },
};
