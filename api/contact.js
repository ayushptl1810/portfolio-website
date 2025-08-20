import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const {
      name = "",
      email = "",
      linkedinUrl = "",
      role = "General",
      subject = "Message",
      message = "",
      replyVia = "Email",
      meta = {},
    } = data || {};

    // Require at least one contact: email OR LinkedIn URL, plus message
    if ((!email && !linkedinUrl) || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ ok: false, error: "Email service not configured" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 12px;">New Contact Transmission</h2>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Name:</strong> ${name || "—"}</p>
        <p><strong>Email:</strong> ${email || "—"}</p>
        <p><strong>LinkedIn:</strong> ${
          linkedinUrl ? `<a href="${linkedinUrl}">${linkedinUrl}</a>` : "—"
        }</p>
        <p><strong>Reply via:</strong> ${replyVia}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${message}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="font-size:12px;color:#666;">User-Agent: ${meta.ua || "—"}</p>
        <p style="font-size:12px;color:#666;">Timestamp: ${
          meta.ts || Date.now()
        }</p>
      </div>
    `;

    const sendArgs = {
      from: fromEmail,
      to: [toEmail],
      subject: `[Contact] ${subject}`,
      html,
    };
    if (email) sendArgs.reply_to = email;

    await resend.emails.send(sendArgs);

    return res.status(204).end();
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
}
