import { getKontaktInfo } from "@/lib/content";

export async function GET() {
  const info = await getKontaktInfo();

  const phone = info.telefon || process.env.BUSINESS_PHONE || "";
  const email = info.email || process.env.BUSINESS_EMAIL || "";
  const website = info.website || process.env.NEXT_PUBLIC_BASE_URL || "";

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Gartenhilfe",
    "ORG:Gartenhilfe",
    phone ? `TEL;TYPE=WORK,VOICE:${phone}` : "",
    email ? `EMAIL;TYPE=WORK:${email}` : "",
    website ? `URL:${website}` : "",
    "ADR;TYPE=WORK:;;Hordorf;;Niedersachsen;;DE",
    "NOTE:Ihr Gartenservice im Raum Braunschweig – Rasenmähen\\, Heckenschnitt\\, Gartenpflege",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="gartenhilfe-kontakt.vcf"',
      "Cache-Control": "no-store",
    },
  });
}
