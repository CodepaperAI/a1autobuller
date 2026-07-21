/**
 * Themed HTML email summarizing a booking. Separate from the contact template
 * so the two flows never get confused. Inline styles only (email clients).
 */
export function buildBookingEmail({ customer, items, total }) {
  const brand = "#2456eb";
  const dark = "#0a0b10";
  const slate = "#1a1d26";
  const border = "#2b3140";
  const textMuted = "#9aa4b2";

  const safe = (v) =>
    String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const money = (n) =>
    n == null || n === "" ? "—" : `$${Number(n).toFixed(2)}`;

  const rows = (items || [])
    .map(
      (it) => `
      <tr>
        <td style="padding:16px 24px;border-bottom:1px solid ${border};">
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ffffff;">${safe(it.serviceName)}</p>
          ${it.description ? `<p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:${textMuted};">${safe(it.description)}</p>` : ""}
          <p style="margin:0;font-size:13px;color:${textMuted};">
            <span style="color:${brand};">●</span> ${safe(it.date)} &nbsp;·&nbsp; ${safe(it.time)}
            ${it.quantity && it.quantity > 1 ? ` &nbsp;·&nbsp; Qty ${safe(it.quantity)}` : ""}
          </p>
        </td>
        <td style="padding:16px 24px;border-bottom:1px solid ${border};text-align:right;vertical-align:top;white-space:nowrap;font-size:15px;font-weight:700;color:#ffffff;">
          ${money(it.lineTotal != null ? it.lineTotal : it.priceFrom)}
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="margin:0;padding:24px;background:#f4f5f7;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:${dark};border-radius:16px;overflow:hidden;border:1px solid ${border};">
      <tr>
        <td style="padding:28px 24px;border-bottom:1px solid ${border};">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:40px;height:40px;background:${brand};border-radius:10px;text-align:center;vertical-align:middle;font-weight:900;color:#fff;font-size:15px;">A1</td>
              <td style="padding-left:12px;font-size:18px;font-weight:800;color:#fff;">Buller <span style="color:${brand};">Auto</span></td>
            </tr>
          </table>
          <p style="margin:18px 0 0;font-size:20px;font-weight:800;color:#fff;">New booking request</p>
          <p style="margin:6px 0 0;font-size:14px;color:${textMuted};">A customer just booked service(s) through the website.</p>
        </td>
      </tr>

      <!-- Customer -->
      <tr><td style="background:${slate};padding:16px 24px;border-bottom:1px solid ${border};">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${textMuted};">Customer</p>
        <p style="margin:0;font-size:15px;color:#fff;">${safe(customer?.name) || "—"}</p>
        <p style="margin:2px 0 0;font-size:13px;color:${textMuted};">
          ${safe(customer?.email) || ""}${customer?.phone ? " · " + safe(customer.phone) : ""}
        </p>
      </td></tr>

      <!-- Items -->
      <tr><td style="background:${slate};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 24px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${textMuted};">Service</td>
            <td style="padding:12px 24px;text-align:right;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${textMuted};">Price</td>
          </tr>
          ${rows}
          <tr>
            <td style="padding:18px 24px;font-size:16px;font-weight:800;color:#fff;">Estimated total</td>
            <td style="padding:18px 24px;text-align:right;font-size:18px;font-weight:800;color:${brand};">${money(total)}</td>
          </tr>
        </table>
      </td></tr>

      <tr>
        <td style="padding:16px 24px;border-top:1px solid ${border};text-align:center;">
          <p style="margin:0;font-size:12px;color:${textMuted};">Prices are estimates confirmed on inspection · A1 Buller Auto, 7055 Buller Ave, Burnaby, BC</p>
        </td>
      </tr>
    </table>
  </div>`;
}