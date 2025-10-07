export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(
      `${process.env.DEPLOYED_URL}/about?spotify_error=${encodeURIComponent(
        error
      )}`
    );
  }

  if (!code) {
    return res.redirect(
      `${process.env.DEPLOYED_URL}/about?spotify_error=no_code`
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(
      `${process.env.DEPLOYED_URL}/api/spotify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "callback", code }),
      }
    );

    if (tokenResponse.ok) {
      res.redirect(`${process.env.DEPLOYED_URL}/about?spotify_success=true`);
    } else {
      res.redirect(
        `${process.env.DEPLOYED_URL}/about?spotify_error=token_exchange_failed`
      );
    }
  } catch (error) {
    console.error("Callback error:", error);
    res.redirect(
      `${process.env.DEPLOYED_URL}/about?spotify_error=callback_error`
    );
  }
}
