import { Resend } from "resend";
import { buildContactEmail } from "@/lib/emailTemplate";

// Allow larger bodies so base64-encoded photos/PDFs fit.
export const config = {
  api: { bodyParser: { sizeLimit: "12mb" } },
};

const MAX_ATTACH_MB = 10;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message, phone, attachments = [] } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // attachments: [{ filename, content(base64, no data: prefix), type }]
    const files = (Array.isArray(attachments) ? attachments : [])
      .filter((a) => a && a.filename && a.content)
      .slice(0, 5)
      .map((a) => ({
        filename: a.filename,
        content: a.content, // base64 string; Resend accepts this
      }));

    // Reject if total payload is too big.
    const totalBytes = files.reduce((n, f) => n + Math.ceil((f.content.length * 3) / 4), 0);
    if (totalBytes > MAX_ATTACH_MB * 1024 * 1024) {
      return res.status(413).json({ error: `Attachments exceed ${MAX_ATTACH_MB}MB.` });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
    from: `${name} (${email}) <${process.env.CONTACT_FROM_EMAIL}>`,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: buildContactEmail({ name, email, message, phone }),
      attachments: files.length ? files : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Email could not be sent." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}