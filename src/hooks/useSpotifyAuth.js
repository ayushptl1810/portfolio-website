import { useState, useEffect } from "react";

export const useSpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for URL parameters indicating auth success/failure
    const urlParams = new URLSearchParams(window.location.search);
    const spotifySuccess = urlParams.get("spotify_success");
    const spotifyError = urlParams.get("spotify_error");

    if (spotifySuccess === "true") {
      setIsAuthenticated(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (spotifyError) {
      setError(`Spotify authentication failed: ${spotifyError}`);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Check if we have a valid token by testing the API
      checkAuthenticationStatus();
    }
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      console.log("Checking authentication status...");
      const response = await fetch("/api/spotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get_playback" }),
      });

      console.log("Auth check response:", {
        ok: response.ok,
        status: response.status,
      });

      if (response.ok) {
        setIsAuthenticated(true);
        console.log("Authentication status: AUTHENTICATED");
      } else {
        setIsAuthenticated(false);
        console.log("Authentication status: NOT AUTHENTICATED");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsAuthenticated(false);
    }
  };

  const authenticate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Initiating Spotify authentication...");
      const response = await fetch("/api/spotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "authorize" }),
      });

      console.log("Auth response:", {
        ok: response.ok,
        status: response.status,
      });
      const data = await response.json();
      console.log("Auth data:", data);

      if (response.ok && data.authUrl) {
        console.log("Redirecting to:", data.authUrl);
        window.location.href = data.authUrl;
      } else {
        console.error("Failed to get auth URL:", data);
        setError("Failed to initiate Spotify authentication");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Network error during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    authenticate,
    setError,
  };
};
