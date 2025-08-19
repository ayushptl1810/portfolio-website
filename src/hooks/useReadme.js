import { useState } from "react";

// Utility function to fetch README from GitHub
export const fetchReadme = async (owner, repoName) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3.raw",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { content: null, error: "No README found" };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    return { content, error: null };
  } catch (error) {
    return { content: null, error: error.message };
  }
};

// Hook for using README in components
export const useReadme = (owner, repoName) => {
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadReadme = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchReadme(owner, repoName);

    if (result.error) {
      setError(result.error);
    } else {
      setReadme(result.content);
    }

    setLoading(false);
  };

  return { readme, loading, error, loadReadme };
};
