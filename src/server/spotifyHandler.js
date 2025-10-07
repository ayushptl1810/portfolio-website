import dotenv from "dotenv";
dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const DEPLOYED_URL = process.env.DEPLOYED_URL || "https://ayush.info";

// In-memory storage for demo purposes (use Redis/database in production)
const tokenStore = new Map();

export default async function spotifyHandler(req, res) {
  try {
    const { action, code, refresh_token } = req.body;

    switch (action) {
      case "authorize":
        return handleAuthorization(req, res);

      case "callback":
        return handleCallback(req, res, code);

      case "refresh":
        return handleRefresh(req, res, refresh_token);

      case "get_playback":
        return handleGetPlayback(req, res);

      case "get_recent":
        return handleGetRecent(req, res);

      default:
        return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Spotify handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleAuthorization(req, res) {
  const state = generateRandomString(16);
  const scope = "user-read-currently-playing user-read-recently-played";

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.append("client_id", SPOTIFY_CLIENT_ID);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("redirect_uri", `${DEPLOYED_URL}/callback`);
  authUrl.searchParams.append("scope", scope);
  authUrl.searchParams.append("state", state);

  return res.json({ authUrl: authUrl.toString(), state });
}

async function handleCallback(req, res, code) {
  if (!code) {
    return res.status(400).json({ error: "Authorization code required" });
  }

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: SPOTIFY_CLIENT_ID,
          client_secret: SPOTIFY_CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${DEPLOYED_URL}/callback`,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(400).json({
        error: tokenData.error_description || "Token exchange failed",
      });
    }

    // Store tokens (in production, use secure storage)
    const userId = "default_user"; // In production, use actual user ID
    tokenStore.set(userId, {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: Date.now() + tokenData.expires_in * 1000,
    });

    console.log("Tokens stored successfully:", {
      userId,
      tokenStoreSize: tokenStore.size,
      expiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
    });

    return res.json({ success: true, message: "Authorization successful" });
  } catch (error) {
    console.error("Token exchange error:", error);
    return res.status(500).json({ error: "Token exchange failed" });
  }
}

async function handleRefresh(req, res, refreshToken) {
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token required" });
  }

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: SPOTIFY_CLIENT_ID,
          client_secret: SPOTIFY_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res
        .status(400)
        .json({ error: tokenData.error_description || "Token refresh failed" });
    }

    // Update stored tokens
    const userId = "default_user";
    const existingTokens = tokenStore.get(userId);
    tokenStore.set(userId, {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || existingTokens?.refresh_token,
      expires_at: Date.now() + tokenData.expires_in * 1000,
    });

    return res.json({
      access_token: tokenData.access_token,
      expires_in: tokenData.expires_in,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return res.status(500).json({ error: "Token refresh failed" });
  }
}

async function handleGetPlayback(req, res) {
  const userId = "default_user";
  const tokens = tokenStore.get(userId);

  console.log("GetPlayback - Token check:", {
    hasTokens: !!tokens,
    tokenStoreSize: tokenStore.size,
    userId,
  });

  if (!tokens) {
    console.log("GetPlayback - No tokens found, returning 401");
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Check if token needs refresh
  if (Date.now() >= tokens.expires_at) {
    try {
      const refreshResponse = await fetch(`${DEPLOYED_URL}/api/spotify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "refresh",
          refresh_token: tokens.refresh_token,
        }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        tokens.access_token = refreshData.access_token;
        tokens.expires_at = Date.now() + refreshData.expires_in * 1000;
        tokenStore.set(userId, tokens);
      } else {
        return res.status(401).json({ error: "Token refresh failed" });
      }
    } catch (error) {
      return res.status(401).json({ error: "Token refresh failed" });
    }
  }

  try {
    const playbackResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (playbackResponse.status === 204) {
      return res.json({
        isPlaying: false,
        message: "No track currently playing",
      });
    }

    const playbackData = await playbackResponse.json();

    if (!playbackResponse.ok) {
      return res.status(playbackResponse.status).json({
        error: playbackData.error?.message || "Failed to fetch playback data",
      });
    }

    return res.json({
      isPlaying: playbackData.is_playing,
      track: {
        name: playbackData.item?.name,
        artist: playbackData.item?.artists?.[0]?.name,
        album: playbackData.item?.album?.name,
        image: playbackData.item?.album?.images?.[0]?.url,
        duration: playbackData.item?.duration_ms,
        progress: playbackData.progress_ms,
        external_url: playbackData.item?.external_urls?.spotify,
      },
    });
  } catch (error) {
    console.error("Playback fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch playback data" });
  }
}

async function handleGetRecent(req, res) {
  const userId = "default_user";
  const tokens = tokenStore.get(userId);

  if (!tokens) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Check if token needs refresh
  if (Date.now() >= tokens.expires_at) {
    try {
      const refreshResponse = await fetch(`${DEPLOYED_URL}/api/spotify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "refresh",
          refresh_token: tokens.refresh_token,
        }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        tokens.access_token = refreshData.access_token;
        tokens.expires_at = Date.now() + refreshData.expires_in * 1000;
        tokenStore.set(userId, tokens);
      } else {
        return res.status(401).json({ error: "Token refresh failed" });
      }
    } catch (error) {
      return res.status(401).json({ error: "Token refresh failed" });
    }
  }

  try {
    const recentResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const recentData = await recentResponse.json();

    if (!recentResponse.ok) {
      return res.status(recentResponse.status).json({
        error: recentData.error?.message || "Failed to fetch recent tracks",
      });
    }

    const tracks =
      recentData.items?.map((item) => ({
        name: item.track?.name,
        artist: item.track?.artists?.[0]?.name,
        album: item.track?.album?.name,
        image: item.track?.album?.images?.[0]?.url,
        played_at: item.played_at,
        external_url: item.track?.external_urls?.spotify,
      })) || [];

    return res.json({ tracks });
  } catch (error) {
    console.error("Recent tracks fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch recent tracks" });
  }
}

function generateRandomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
