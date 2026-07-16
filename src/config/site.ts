import config from "./config.json";
import social from "./social.json";

/** Canonical brand description used in meta, hero, footer, and schema. */
export const SITE_DESCRIPTION =
  "Practical DevOps, programming, and self-hosting guides for developers and operators.";

// Site configuration — single source of truth for app code
export const siteConfig = {
  name: "Bitdoze",
  description: SITE_DESCRIPTION,
  url: "https://www.bitdoze.com",
  author: config.metadata?.meta_author ?? "Dragos Balota",

  // Pagination
  postsPerPage: config.settings?.pagination ?? 10,

  // SEO
  noindex: {
    tags: true,
    categories: false,
    authors: false,
  },

  defaultImage: "/og-default.png",

  contact: {
    email: config.contactinfo?.email ?? "dragos@bitdoze.com",
    address: config.contactinfo?.address ?? "",
    // Only expose phone when a real number is configured (not a placeholder)
    phone: config.contactinfo?.phone && !/567\s*1234|123\s*456/.test(config.contactinfo.phone)
      ? config.contactinfo.phone
      : "",
    formAction:
      config.params?.contact_form_action && config.params.contact_form_action !== "#"
        ? config.params.contact_form_action
        : `https://formsubmit.co/${config.contactinfo?.email ?? "dragos@bitdoze.com"}`,
  },
};

/** Non-empty social profile URLs for schema sameAs, footer, etc. */
export function getSocialLinks(): { platform: string; url: string }[] {
  return Object.entries(social)
    .filter(([, url]) => typeof url === "string" && url.trim() !== "")
    .map(([platform, url]) => ({ platform, url: url as string }));
}

export function getSocialSameAs(): string[] {
  return getSocialLinks().map(({ url }) => url);
}

// View Transitions configuration
export const viewTransitionsConfig = {
  enabled: config.viewTransitions?.enabled ?? true,
  animations: {
    postImages: config.viewTransitions?.animations?.postImages ?? "fade",
    postTitles: config.viewTransitions?.animations?.postTitles ?? "fade",
    youtubeVideos: config.viewTransitions?.animations?.youtubeVideos ?? "fade",
    resourceCards: config.viewTransitions?.animations?.resourceCards ?? "slide",
    homeHero: config.viewTransitions?.animations?.homeHero ?? "fade",
    homeSectionHeadings:
      config.viewTransitions?.animations?.homeSectionHeadings ?? "fade",
    homeCards: config.viewTransitions?.animations?.homeCards ?? "slide",
  },
  duration: config.viewTransitions?.duration ?? "0.3s",
  fallback: config.viewTransitions?.fallback ?? "instant",
};
