// Site configuration
export const siteConfig = {
  // Site details
  name: "BitDoze",
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
