import { useEffect } from "react";

const SITE_URL = "https://www.ayush.info";
const DEFAULT_TITLE = "Ayush Patel | Full Stack Developer & AI Engineer";
const DEFAULT_DESCRIPTION =
  "Ayush Patel - Computer Science student at IIT Madras & DJ Sanghvi. Specialized in Full Stack Development, AI Agentic workflows, and GenAI.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.webp`;

/** Resolves a Vite-imported asset path (e.g. "/assets/foo-hash.webp") to an absolute URL. */
export const toAbsoluteAssetUrl = (path) => {
  if (!path) return undefined;
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
};

const setMetaTag = (attrName, attrValue, content) => {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * usePageSEO - updates document title plus description, canonical,
 * Open Graph, and Twitter Card tags to match the current route.
 */
export const usePageSEO = (title, description, options = {}) => {
  useEffect(() => {
    const prevTitle = document.title;
    const resolvedTitle = title ? `${title} | Ayush Patel` : DEFAULT_TITLE;
    const resolvedDescription = description || DEFAULT_DESCRIPTION;
    const resolvedImage = options.image || DEFAULT_IMAGE;
    // Static hosting redirects "/web" -> "/web/" (trailing slash) to serve
    // the prerendered directory index, but the sitemap/canonical convention
    // is no trailing slash — normalize so both agree on one canonical URL.
    const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
    const resolvedUrl = `${SITE_URL}${normalizedPath}`;

    document.title = resolvedTitle;
    setMetaTag("name", "description", resolvedDescription);
    setCanonical(resolvedUrl);

    setMetaTag("property", "og:title", resolvedTitle);
    setMetaTag("property", "og:description", resolvedDescription);
    setMetaTag("property", "og:url", resolvedUrl);
    setMetaTag("property", "og:image", resolvedImage);

    setMetaTag("property", "twitter:title", resolvedTitle);
    setMetaTag("property", "twitter:description", resolvedDescription);
    setMetaTag("property", "twitter:url", resolvedUrl);
    setMetaTag("property", "twitter:image", resolvedImage);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, options.image]);
};
