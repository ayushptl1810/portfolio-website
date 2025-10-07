import { useState, useEffect } from "react";

export const useSpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoAuthTriggered, setAutoAuthTriggered] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [autoAuthDisabled, setAutoAuthDisabled] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const disabledParam = urlParams.get("disable_spotify");
      const stored = localStorage.getItem("spotifyAutoAuthDisabled");
      return disabledParam === "1" || stored === "true";
    } catch (_) {
      return false;
    }
  });

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
      const response = await fetch("/api/spotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get_playback" }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Auto-start OAuth on first load if not authenticated and no error/success flags
        const params = new URLSearchParams(window.location.search);
        const hasError = !!params.get("spotify_error");
        const hasSuccess = params.get("spotify_success") === "true";
        const onCallbackPath = window.location.pathname === "/callback";
        if (
          !autoAuthDisabled &&
          !autoAuthTriggered &&
          !hasError &&
          !hasSuccess &&
          !onCallbackPath
        ) {
          setAutoAuthTriggered(true);
          authenticate();
        }
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const authenticate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/spotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "authorize" }),
      });

      const data = await response.json();

      if (response.ok && data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError("Failed to initiate Spotify authentication");
      }
    } catch (err) {
      setError("Network error during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  const disableAutoAuth = () => {
    try {
      localStorage.setItem("spotifyAutoAuthDisabled", "true");
    } catch (_) {}
    setAutoAuthDisabled(true);
  };

  const enableAutoAuth = () => {
    try {
      localStorage.removeItem("spotifyAutoAuthDisabled");
    } catch (_) {}
    setAutoAuthDisabled(false);
  };

  return {
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    error,
    authenticate,
    setError,
    autoAuthDisabled,
    disableAutoAuth,
    enableAutoAuth,
  };
};
