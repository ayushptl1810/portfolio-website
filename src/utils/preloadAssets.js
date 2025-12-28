import birbRiv from "../assets/birb.riv";
import rocket from "../assets/chainless_rocket.riv";

export const preloadCriticalAssets = () => {
  // Array of assets to preload
  const assets = [birbRiv, rocket];

  if ("caches" in window) {
    // Use efficient Cache API if available
    caches.open("preload-cache").then((cache) => {
      assets.forEach((url) => {
        cache.match(url).then((response) => {
          if (!response) {
            cache.add(url);
          }
        });
      });
    });
  } else {
    // Fallback to simpler Image/Fetch preloading
    assets.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "fetch";
      link.href = src;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }
};
