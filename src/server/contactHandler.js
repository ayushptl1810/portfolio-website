import { Resend } from "resend";

// Every field below is attacker-controlled and lands in the site owner's
// inbox as HTML. Escape all of it, and reject values that don't look like
// what they claim to be.
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip CR/LF so a crafted `subject` can't inject extra mail headers.
const oneLine = (s = "", max = 200) =>
  String(s).replace(/[\r\n]+/g, " ").trim().slice(0, max);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isLinkedIn = (u) => {
  try {
    const url = new URL(u);
    return (
      url.protocol === "https:" &&
      /(^|\.)linkedin\.com$/.test(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
};

export default async function contactHandler(req, res) {
  if (req.method && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const formData =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    let {
      name = "",
      email = "",
      linkedinUrl = "",
      role = "General",
      subject = "Message",
      message = "",
      replyVia = "Email",
      meta = {},
    } = formData || {};

    // Honeypot: a hidden field real users never fill. Bots do.
    if (
      formData &&
      typeof formData._gotcha === "string" &&
      formData._gotcha.trim()
    ) {
      return res
        .status(200)
        .json({ ok: true, message: "Email sent successfully" });
    }

    name = oneLine(name, 120);
    email = oneLine(email, 254);
    role = oneLine(role, 60);
    subject = oneLine(subject, 200);
    replyVia = oneLine(replyVia, 20);
    linkedinUrl = oneLine(linkedinUrl, 300);
    message = String(message || "").slice(0, 5000).trim();

    if ((!email && !linkedinUrl) || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }
    if (email && !EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email address" });
    }
    if (linkedinUrl && !isLinkedIn(linkedinUrl)) {
      return res.status(400).json({
        ok: false,
        error: "LinkedIn URL must be a https://linkedin.com link",
      });
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
        <p><strong>Role:</strong> ${esc(role)}</p>
        <p><strong>Name:</strong> ${esc(name) || "—"}</p>
        <p><strong>Email:</strong> ${esc(email) || "—"}</p>
        <p><strong>LinkedIn:</strong> ${
          linkedinUrl
            ? `<a href="${esc(linkedinUrl)}">${esc(linkedinUrl)}</a>`
            : "—"
        }</p>
        <p><strong>Reply via:</strong> ${esc(replyVia)}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${esc(message)}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="font-size:12px;color:#666;">User-Agent: ${esc(
          oneLine(meta?.ua || "", 300),
        ) || "—"}</p>
        <p style="font-size:12px;color:#666;">Timestamp: ${esc(
          oneLine(String(meta?.ts || Date.now()), 40),
        )}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Contact] ${subject}`,
      html,
      ...(email && { reply_to: email }),
    });

    if (error) {
      return res.status(500).json({ ok: false, error: "Failed to send email" });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Email sent successfully", data });
  } catch (err) {
    console.error("contactHandler error:", err?.message);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
}
