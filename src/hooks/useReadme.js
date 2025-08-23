import { useState, useCallback, useEffect } from "react";

// Simple cache to prevent repeated API calls
const readmeCache = new Map();

// Utility function to fetch README from GitHub with retry logic
export const fetchReadme = async (owner, repoName, retryCount = 0) => {
  const cacheKey = `${owner}/${repoName}`;

  // Check cache first
  if (readmeCache.has(cacheKey)) {
    return readmeCache.get(cacheKey);
  }

  // Don't retry more than 2 times
  if (retryCount > 2) {
    return {
      content: null,
      error:
        "Failed to fetch README after multiple attempts. Please try again later.",
    };
  }

  try {
    // Try with authentication first (if token exists)
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "Mozilla/5.0 (compatible; Portfolio-Website/1.0)",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (githubToken) {
      headers["Authorization"] = `token ${githubToken}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/readme`,
      { headers }
    );

    // If the raw endpoint fails, try the regular endpoint and extract content
    if (!response.ok && response.status === 403) {
      console.log("Raw endpoint failed, trying regular endpoint...");
      const regularResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-Website",
          },
        }
      );

      if (regularResponse.ok) {
        const data = await regularResponse.json();
        // Decode base64 content
        const content = atob(data.content);
        return { content, error: null };
      } else if (regularResponse.status === 403) {
        // Try raw.githubusercontent.com as final fallback
        console.log("Trying raw.githubusercontent.com as final fallback...");
        try {
          const rawResponse = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repoName}/main/README.md`
          );

          if (rawResponse.ok) {
            const content = await rawResponse.text();
            return { content, error: null };
          }
        } catch (rawError) {
          console.log("Raw GitHub fallback also failed:", rawError);
        }

        // All endpoints failed
        if (retryCount < 2) {
          // Wait and retry with exponential backoff
          const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          console.log(`Rate limited, retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchReadme(owner, repoName, retryCount + 1);
        }

        return {
          content: null,
          error:
            "GitHub API access restricted. This may be due to rate limiting or repository access restrictions. Please try again later or view the project directly on GitHub.",
        };
      }
    }

    if (!response.ok) {
      if (response.status === 404) {
        return { content: null, error: "No README found for this repository" };
      }
      if (response.status === 429) {
        return {
          content: null,
          error:
            "GitHub API rate limit exceeded. Please try again in a few minutes.",
        };
      }
      if (response.status === 403) {
        return {
          content: null,
          error:
            "Repository may be private or access is restricted. Check the GitHub link for details.",
        };
      }
      throw new Error(
        `GitHub API error: ${response.status} - ${response.statusText}`
      );
    }

    const content = await response.text();
    const result = { content, error: null };

    // Cache successful result
    readmeCache.set(cacheKey, result);
    return result;
  } catch (error) {
    const result =
      error.name === "NetworkError" || error.message.includes("fetch")
        ? {
            content: null,
            error: "Network error. Please check your connection and try again.",
          }
        : { content: null, error: error.message };

    // Don't cache errors, allow retry
    return result;
  }
};

// Hook for using README in components
export const useReadme = (owner, repoName) => {
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentRepo, setCurrentRepo] = useState(null);

  // Use useCallback to prevent function recreation on every render
  const loadReadme = useCallback(async () => {
    // Don't load if already loading or if we've already loaded for this repo
    if (loading || !owner || !repoName) {
      return;
    }

    setLoading(true);
    setError(null);

    const result = await fetchReadme(owner, repoName);

    if (result.error) {
      setError(result.error);
    } else {
      setReadme(result.content);
    }

    setLoading(false);
    setHasLoaded(true);
  }, [owner, repoName, loading, hasLoaded]);

  // Auto-load README when owner/repoName changes
  useEffect(() => {
    const repoKey = `${owner}/${repoName}`;

    // Reset state when switching to a different repository
    if (currentRepo !== repoKey) {
      setReadme(null);
      setError(null);
      setHasLoaded(false);
      setCurrentRepo(repoKey);
    }

    // Only load if we have valid owner/repo and haven't loaded yet
    if (owner && repoName && !hasLoaded && !loading) {
      loadReadme();
    }
  }, [owner, repoName, hasLoaded, loading, loadReadme, currentRepo]);

  return { readme, loading, error, loadReadme, hasLoaded };
};
