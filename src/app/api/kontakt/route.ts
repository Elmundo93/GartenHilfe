import { NextResponse } from "next/server";
import { ContactSchema } from "@/lib/validators";
import { sendContactMail } from "@/lib/mail";

export const maxDuration = 30;

export async function POST(req: Request) {
  const form = await req.formData();

  const data: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") {
      data[key] = value;
    }
  }

  const tooFast = data.ts && Date.now() - Number(data.ts) < 2000;
  if ((data.hp && data.hp.length > 0) || tooFast) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await sendContactMail(parsed.data);
  } catch (err) {
    console.error("[kontakt] Mail-Versand fehlgeschlagen:", err);
    return NextResponse.json({ ok: false, error: "mail_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
