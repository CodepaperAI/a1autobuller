/**
 * Builds the themed HTML email for a contact/booking submission.
 * Inline styles only — email clients ignore <style> and external CSS.
 * Colors mirror the site: cobalt/sapphire brand on a dark slate header.
 */
export function buildContactEmail({ name, email, message, phone }) {
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

  const row = (label, value) => `
    <tr>
      <td style="padding:14px 24px;border-bottom:1px solid ${border};">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${textMuted};">${label}</p>
        <p style="margin:0;font-size:15px;color:#ffffff;">${value || "—"}</p>
      </td>
    </tr>`;

  return `
  <div style="margin:0;padding:24px;background:#f4f5f7;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:${dark};border-radius:16px;overflow:hidden;border:1px solid ${border};">
      <tr>
        <td style="background:${dark};padding:28px 24px;border-bottom:1px solid ${border};">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:40px;height:40px;background:${brand};border-radius:10px;text-align:center;vertical-align:middle;font-weight:900;color:#fff;font-size:15px;">A1</td>
              <td style="padding-left:12px;font-size:18px;font-weight:800;color:#fff;">Buller <span style="color:${brand};">Auto</span></td>
            </tr>
          </table>
          <p style="margin:18px 0 0;font-size:20px;font-weight:800;color:#fff;">New website enquiry</p>
          <p style="margin:6px 0 0;font-size:14px;color:${textMuted};">Someone just submitted the contact form.</p>
        </td>
      </tr>

      <tr><td style="background:${slate};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Name", safe(name))}
          ${row("Email", safe(email))}
          ${phone ? row("Phone", safe(phone)) : ""}
          <tr>
            <td style="padding:14px 24px;">
              <p style="margin:0 0 4px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${textMuted};">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#fff;white-space:pre-wrap;">${safe(message)}</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <tr>
        <td style="background:${dark};padding:18px 24px;border-top:1px solid ${border};text-align:center;">
          <p style="margin:0;font-size:12px;color:${textMuted};">A1 Buller Auto · 7055 Buller Ave, Burnaby, BC · Sent from a1bullerautocollision.ca</p>
        </td>
      </tr>
    </table>
  </div>`;
}