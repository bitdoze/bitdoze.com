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
      // ```lang title="docker-compose.yml" → filename shown beside the lang chip,
      // DigitalOcean-style: readers know which file the block belongs in.
      const meta = String(this.options.meta?.__raw ?? "");
      const filename = meta.match(/title="([^"]+)"/)?.[1];

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
                ...(filename
                  ? [
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["code-block-filename"] },
                        children: [{ type: "text", value: filename }],
                      },
                    ]
                  : []),
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
    // Accept root nodes too: the transformer entry is the hast root
    // ({type:"root", children:[pre]}) — requiring "element" returned early
    // and made the whole pass a no-op.
    if (!Array.isArray(node.children)) return;
    for (const child of node.children) visit(child, defaultFg);

    // Strip default-foreground color styles on spans
    for (const child of node.children) {
      if (child.type !== "element" || child.tagName !== "span") continue;
      const style = child.properties?.style;
      if (typeof style !== "string") continue;
      const m = style.match(COLOR_STYLE);
      if (!m) continue;
      const color = m[1].toLowerCase();
      // github-dark's comment gray (#6a737d on #24292e) is 3.04:1 — fails WCAG
      // AA. Rewrite it to #9ca3af (~5.9:1); a subtle tone shift, same hue.
      if (color === "#6a737d") {
        child.properties.style = style.replace(m[0], `color: #9ca3af`);
        continue;
      }
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
      // The default foreground is the `color` Shiki paints on <pre> — this works
      // whether the theme is a name ("github-dark") or an object, unlike
      // probing this.options.themes/theme (undefined for string themes).
      const pre = root.children?.find((n) => n.type === "element" && n.tagName === "pre");
      const m = COLOR_STYLE.exec(
        typeof pre?.properties?.style === "string" ? pre.properties.style : ""
      );
      visit(root, m?.[1]?.toLowerCase() ?? null);
    },
  };
}

const FILENAME_LIKE = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

/**
 * Satteri hast plugin: a paragraph holding only an image gets a visible caption from the alt text.
 * The caption is a <span> after the <img> (a <figcaption> can't live inside <p>), aria-hidden so
 * screen readers don't hear the alt twice. Must run before Astro's image marker, which strips alt.
 */
const AFFILIATE_LINK = /^\/go\/|:\/\/go\.bitdoze\.com\//;

/**
 * Satteri hast plugin: affiliate links must be declared `rel="sponsored"` for
 * search-engine compliance (Google policy). Adds it to any <a> pointing at a
 * /go/ redirect page or go.bitdoze.com, merging with rel values already present.
 */
export const affiliateLinkRel = {
  name: "bitdoze:affiliate-link-rel",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = typeof node.properties?.href === "string" ? node.properties.href : "";
      if (!AFFILIATE_LINK.test(href)) return;
      const rel = new Set(
        String(node.properties.rel ?? "")
          .split(/\s+/)
          .filter(Boolean)
      );
      rel.add("sponsored");
      rel.add("nofollow");
      ctx.setProperty(node, "rel", [...rel].join(" "));
    },
  },
};

/**
 * Satteri hast plugin: GFM task-list checkboxes render as bare disabled
 * <input>s with no label — axe `label` violation. Give each box an
 * aria-label built from the item's text so the text labels the box.
 */
export const taskListLabels = {
  name: "bitdoze:task-list-labels",
  element: {
    filter: ["input"],
    visit(node, ctx) {
      if (node.properties?.type !== "checkbox") return;
      const li = ctx.parent(node);
      if (!li || li.tagName !== "li") return;
      const text = ctx.textContent(li).trim();
      ctx.setProperty(node, "ariaLabel", text || "Task list item");
    },
  },
};

/**
 * Satteri hast plugin: wrap every <table> in a keyboard-scrollable
 * <div class="table-scroll" role="region" tabindex="0"> so overflowing tables
 * are scrollable by keyboard and get an accessible name. PostLayout's script
 * adds .is-scrollable when scrollWidth > clientWidth (mask only when needed).
 */
export const tableScrollWrapper = {
  name: "bitdoze:table-scroll",
  element: {
    filter: ["table"],
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: "element",
        tagName: "div",
        properties: {
          className: ["table-scroll"],
          role: "region",
          tabIndex: 0,
          ariaLabel: "Scrollable table",
        },
      });
    },
  },
};

/**
 * Satteri hast plugin: stamp the article-column `sizes` on every content image.
 * Astro's imageToComponent (which runs after user hastPlugins) forwards every
 * img property to the <Image> component, and getImage only fills `sizes` when
 * unset — so this wins. Without it, constrained layout emits
 * sizes="(min-width:1600px) 1600px, 100vw" from the intrinsic width, and
 * browsers fetch a ~1440px variant for a ≤752px slot.
 * Same value as PostLayout's cover image: full-width below xl, ~720-752px
 * inside the article grid at xl and up.
 */
export const articleImageSizes = {
  name: "bitdoze:article-image-sizes",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      if (node.properties?.sizes) return;
      ctx.setProperty(
        node,
        "sizes",
        "(max-width: 1280px) calc(100vw - 2rem), (max-width: 1536px) 720px, 752px"
      );
    },
  },
};

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
