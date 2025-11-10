import config from './config.json';

// Site configuration
export const siteConfig = {
  // Site details
  name: "Bit Doze Website",
  description: "Providing valuable resources and tutorials for web developers and tech enthusiasts.",
  url: "https://bitdoze.com",
  
  // Pagination settings
  postsPerPage: 10, // Number of posts per page
  
  // SEO settings
  noindex: {
    tags: true, // Set to true to add noindex meta tag to tag pages
    categories: false, // Set to true to add noindex meta tag to category pages
    authors: false, // Set to true to add noindex meta tag to author pages
  },
  
  // Default social image
  defaultImage: "/images/default-og.jpg",
};

// View Transitions configuration
export const viewTransitionsConfig = {
  enabled: config.viewTransitions?.enabled ?? true,
  animations: {
    postImages: config.viewTransitions?.animations?.postImages ?? 'fade',
    postTitles: config.viewTransitions?.animations?.postTitles ?? 'fade',
    youtubeVideos: config.viewTransitions?.animations?.youtubeVideos ?? 'fade',
    resourceCards: config.viewTransitions?.animations?.resourceCards ?? 'slide',
    homeHero: config.viewTransitions?.animations?.homeHero ?? 'fade',
    homeSectionHeadings: config.viewTransitions?.animations?.homeSectionHeadings ?? 'fade',
    homeCards: config.viewTransitions?.animations?.homeCards ?? 'slide',
  },
  duration: config.viewTransitions?.duration ?? '0.3s',
  fallback: config.viewTransitions?.fallback ?? 'instant',
};
