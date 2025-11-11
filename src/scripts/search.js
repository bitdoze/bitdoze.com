import Fuse from "fuse.js";

const SPINNER = `<div class="flex justify-center py-10">
    <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>`;

let searchData = null;
let fuse = null;

const fuseConfig = {
  keys: ["title", "description", "tags", "categories", "content"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

const readyStates = new Set(["interactive", "complete"]);

const ensureSearchData = async (searchResults, options = {}) => {
  const showSpinner = options.showSpinner ?? true;

  if (searchData && fuse) {
    return;
  }

  if (showSpinner) {
    searchResults.innerHTML = SPINNER;
  }

  const response = await fetch("/search.json", { cache: "force-cache" });
  if (!response.ok) {
    throw new Error("Failed to fetch search data");
  }

  const data = await response.json();
  searchData = data;
  fuse = new Fuse(data ?? [], fuseConfig);

  if (showSpinner) {
    searchResults.innerHTML = "";
  }
};

const buildPostUrl = (slug) => {
  if (!slug) return "/";
  const normalized = slug
    .replace(/^\/+/, "")
    .replace(/\/+/g, "/")
    .replace(/\/*$/, "");
  return `/${normalized ? `${normalized}/` : ""}`;
};

const displayResults = (results, query, searchResults, noResults, searchInfo) => {
  searchResults.innerHTML = "";

  if (!results.length) {
    searchResults.classList.add("hidden");
    noResults.classList.remove("hidden");
    searchInfo.textContent = query ? `No results found for '${query}'` : "";
    return;
  }

  searchResults.classList.remove("hidden");
  noResults.classList.add("hidden");
  searchInfo.textContent = `Found ${results.length} result${results.length === 1 ? "" : "s"} for '${query}'`;

  results.forEach(({ item: post }) => {
    const article = document.createElement("article");
    article.className =
      "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300";

    const slug = buildPostUrl(post.slug);

    let imageHtml = "";
    if (post.image?.src) {
      const { src, width, height } = post.image;
      const imgSrc = src.startsWith("/") ? src : `/${src}`;
      imageHtml = `
            <div class="aspect-video overflow-hidden">
              <img 
                src="${imgSrc}" 
                alt="${post.title}" 
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                width="${width ?? 400}"
                height="${height ?? 225}"
                loading="lazy"
              />
            </div>
          `;
    }

    const categoriesHtml = post.categories.length
      ? `
            <div class="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span>${post.categories.join(", ")}</span>
            </div>
          `
      : "";

    const tagsHtml = post.tags.length
      ? `
            <div class="flex flex-wrap gap-2 mt-3">
              ${post.tags
                .slice(0, 3)
                .map(
                  (tag) => `
                  <a href="/tags/${tag.toLowerCase()}/" class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300">
                    #${tag}
                  </a>
                `
                )
                .join("")}
            </div>
          `
      : "";

    article.innerHTML = `
          <a href="${slug}" class="block">
            ${imageHtml}
            <div class="p-4">
              <div class="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div class="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>${post.date ?? ""}</span>
                </div>
                ${categoriesHtml}
              </div>

              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                ${post.title}
              </h3>

              ${post.description
                ? `
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  ${post.description}
                </p>
              `
                : ""}

              ${tagsHtml}
            </div>
          </a>
        `;

    searchResults.appendChild(article);
  });
};

const performSearch = async (query, searchResults, noResults, searchInfo) => {
  const trimmed = query.trim();

  if (!trimmed) {
    searchResults.innerHTML = "";
    searchResults.classList.add("hidden");
    noResults.classList.add("hidden");
    searchInfo.textContent = "";
    return;
  }

  await ensureSearchData(searchResults, { showSpinner: !searchData });
  if (!fuse) {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("q", trimmed);
  const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState(null, "", newRelativePathQuery);

  const results = fuse.search(trimmed);
  displayResults(results, trimmed, searchResults, noResults, searchInfo);
};

const initSearch = () => {
  const searchInputElement = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");
  const searchInfo = document.getElementById("search-info");

  if (!searchInputElement || !searchResults || !noResults || !searchInfo) {
    return;
  }

  if (!(searchInputElement instanceof HTMLInputElement)) {
    return;
  }

  const searchInput = searchInputElement;

  if (searchInput.dataset.searchInitialized === "true") {
    return;
  }
  searchInput.dataset.searchInitialized = "true";

  let debounceTimer;

  searchInput.addEventListener("input", (event) => {
    const target = event.target;
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      void performSearch(target.value, searchResults, noResults, searchInfo);
    }, 300);
  });

  searchInput.focus();

  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("q");
  if (searchQuery) {
    searchInput.value = searchQuery;
    void performSearch(searchQuery, searchResults, noResults, searchInfo);
  }
};

if (readyStates.has(document.readyState)) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch, { once: true });
}

document.addEventListener("astro:page-load", initSearch);
document.addEventListener("astro:after-swap", () => {
  // Allow re-initialization on newly swapped pages.
  initSearch();
});
