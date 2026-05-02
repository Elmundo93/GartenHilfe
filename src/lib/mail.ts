import { Resend } from "resend";

const FROM = process.env.MAIL_FROM ?? "Gartenhilfe <kontakt@gartenhilfe-bs.de>";
const RECIPIENT = process.env.MAIL_FALLBACK_TO ?? "info@gartenhilfe-bs.de";

export interface MailPayload {
  name: string;
  email?: string;
  telefon?: string;
  leistung?: string;
  nachricht?: string;
}

export async function sendContactMail(payload: MailPayload): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from:    FROM,
    to:      RECIPIENT,
    replyTo: payload.email || undefined,
    subject: `Neue Anfrage: ${payload.leistung ? payload.leistung + " – " : ""}${payload.name}`,
    html:    internalTemplate(payload),
  });

  if (payload.email) {
    await resend.emails.send({
      from:    FROM,
      to:      payload.email,
      subject: "Ihre Anfrage bei Gartenhilfe",
      html:    confirmationTemplate(payload),
    });
  }
}

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:13px;">${value}</td>
    </tr>`;
}

function internalTemplate(payload: MailPayload) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
    <div style="background:linear-gradient(135deg,#059669,#047857);padding:28px 32px;">
      <p style="margin:0;color:#a7f3d0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;">Neue Kontaktanfrage</p>
      <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;">Gartenhilfe</h1>
    </div>
    <div style="padding:28px 32px;">
      <table style="border-collapse:collapse;width:100%;">
        ${row("Name", payload.name)}
        ${row("Telefon", payload.telefon)}
        ${row("E-Mail", payload.email)}
        ${row("Leistung", payload.leistung)}
      </table>
      ${payload.nachricht ? `
        <div style="margin-top:20px;padding:16px;background:#f0fdf4;border-radius:8px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#059669;text-transform:uppercase;">Nachricht</p>
          <p style="margin:0;font-size:13px;color:#374151;white-space:pre-wrap;">${payload.nachricht}</p>
        </div>` : ""}
    </div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Diese E-Mail wurde automatisch über das Kontaktformular gesendet.</p>
    </div>
  </div>
</body>
</html>`;
}

function confirmationTemplate(payload: MailPayload) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
    <div style="background:linear-gradient(135deg,#059669,#047857);padding:28px 32px;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Vielen Dank, ${payload.name}!</h1>
      <p style="margin:6px 0 0;color:#d1fae5;font-size:14px;">Ihre Anfrage ist bei uns eingegangen – wir melden uns so schnell wie möglich.</p>
    </div>
    <div style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
        Wir haben Ihre Anfrage erhalten und werden uns zeitnah bei Ihnen melden${payload.telefon ? " – am besten telefonisch unter der von Ihnen angegebenen Nummer" : ""}.
      </p>
      <div style="background:#f0fdf4;border-left:4px solid #059669;border-radius:0 8px 8px 0;padding:16px 20px;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#059669;text-transform:uppercase;">Ihre Angaben</p>
        <table style="border-collapse:collapse;width:100%;margin-top:8px;">
          ${row("Name", payload.name)}
          ${row("Leistung", payload.leistung)}
        </table>
      </div>
    </div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Gartenhilfe · Hordorf · Raum Braunschweig</p>
    </div>
  </div>
</body>
</html>`;
}
