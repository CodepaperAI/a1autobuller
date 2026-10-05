import { Resend } from "resend";
import { buildBookingEmail } from "@/lib/bookingEmail";
import { getCatalogService, TIME_SLOTS } from "@/data/servicesCatalog";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function headerSafe(value, max = 120) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

/** Verify a Cloudflare Turnstile token server-side. Returns true if human. */
async function verifyTurnstile(token, ip) {
  if (!token) return false;
  try {
    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          ...(ip ? { remoteip: ip } : {}),
        }),
      }
    );
    const data = await resp.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customer = {}, items = [], turnstileToken } = req.body || {};

    const cleanCustomer = {
      name: headerSafe(customer.name),
      email: headerSafe(customer.email, 254).toLowerCase(),
      phone: headerSafe(customer.phone, 40),
    };

    if (!cleanCustomer.name || !EMAIL_RE.test(cleanCustomer.email)) {
      return res.status(400).json({ error: "A valid customer name and email are required." });
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
      return res.status(400).json({ error: "No services in the booking." });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !(process.env.BOOKING_TO_EMAIL || process.env.CONTACT_TO_EMAIL) || !process.env.TURNSTILE_SECRET_KEY) {
      return res.status(503).json({ error: "Booking service is not configured." });
    }

    // Bot check — reject anything Cloudflare doesn't confirm as human.
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
    const human = await verifyTurnstile(turnstileToken, ip);
    if (!human) {
      return res.status(403).json({ error: "Verification failed. Please try again." });
    }

    const cleanItems = items.map((item) => {
      const catalogService = getCatalogService(item?.serviceId);
      if (!catalogService || !DATE_RE.test(String(item?.date || "")) || !TIME_SLOTS.includes(item?.time)) {
        return null;
      }
      return {
        serviceId: catalogService.id,
        serviceName: catalogService.name,
        date: item.date,
        time: item.time,
        priceFrom: catalogService.priceFrom,
        lineTotal: catalogService.priceFrom,
      };
    });

    if (cleanItems.some((item) => item === null)) {
      return res.status(400).json({ error: "One or more booking items are invalid." });
    }

    // Catalog pricing is authoritative; never trust totals sent by the browser.
    const computedTotal = cleanItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.BOOKING_TO_EMAIL || process.env.CONTACT_TO_EMAIL;

    const { error } = await resend.emails.send({
      from: `${cleanCustomer.name} <${process.env.CONTACT_FROM_EMAIL}>`,
      to: [to],
      replyTo: cleanCustomer.email,
      subject: `New booking from ${cleanCustomer.name} — ${cleanItems.length} service${cleanItems.length > 1 ? "s" : ""}`,
      html: buildBookingEmail({
        customer: cleanCustomer,
        items: cleanItems,
        total: computedTotal,
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
