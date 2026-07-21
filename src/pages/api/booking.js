import { Resend } from "resend";
import { buildBookingEmail } from "@/lib/bookingEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customer = {}, items = [], total } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No services in the booking." });
    }

    // Compute the total on the server too, so it can't be spoofed by the client.
    const computedTotal = items.reduce((sum, it) => {
      const line = it.lineTotal != null ? Number(it.lineTotal) : Number(it.priceFrom) || 0;
      return sum + (Number.isFinite(line) ? line : 0);
    }, 0);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.BOOKING_TO_EMAIL || process.env.CONTACT_TO_EMAIL;

    const { error } = await resend.emails.send({
   from: `${customer?.name } (${customer?.email}) <${process.env.CONTACT_FROM_EMAIL}>`,
      to: [to],
      replyTo: customer.email || undefined,
      subject: `New booking${customer.name ? ` from ${customer.name}` : ""} — ${items.length} service${items.length > 1 ? "s" : ""}`,
      html: buildBookingEmail({
        customer,
        items,
        total: total != null ? total : computedTotal,
      }),
    });

    if (error) {
      console.error("Resend booking error:", error);
      return res.status(502).json({ error: "Booking email could not be sent." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}