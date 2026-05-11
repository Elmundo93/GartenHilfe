"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { writeContentFile } from "@/lib/storage";
import { readSmtpSettings, writeSmtpSettings, resolveSmtpConfig } from "@/lib/settings";
import { encryptSecret, isEncryptionAvailable } from "@/lib/crypto";
import { requireAdmin } from "@/lib/admin-auth";
import type { ImpressumContent, KontaktInfo, Service, DatenschutzContent } from "@/lib/content";

// ── Audit Log ──────────────────────────────────────────────────────────────────

function auditLog(action: string, details?: Record<string, unknown>): void {
  console.info(JSON.stringify({ audit: true, action, ts: new Date().toISOString(), ...details }));
}

// ── Shared ─────────────────────────────────────────────────────────────────────

function adminError(err: unknown): { ok: false; error: string } {
  return { ok: false, error: err instanceof Error ? err.message : "Nicht autorisiert." };
}

async function assertAdminResult(): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireAdmin();
    return { ok: true };
  } catch (err) {
    return adminError(err);
  }
}

// ── Impressum ──────────────────────────────────────────────────────────────────

const ImpressumSchema = z.object({
  firmenname: z.string().min(1),
  inhaberName: z.string(),
  strasse: z.string(),
  plz: z.string(),
  ort: z.string(),
  telefon: z.string(),
  email: z.string(),
  ustIdNr: z.string(),
});

export async function saveImpressum(
  data: ImpressumContent
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await assertAdminResult();
  if (!auth.ok) return auth;

  const parsed = ImpressumSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  try {
    await writeContentFile("impressum/content.json", JSON.stringify(parsed.data, null, 2));
    auditLog("saveImpressum");
    revalidatePath("/impressum");
    revalidatePath("/admin/impressum");
    return { ok: true };
  } catch (err) {
    console.error("saveImpressum error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Konnte nicht gespeichert werden." };
  }
}

// ── Kontakt/vCard ──────────────────────────────────────────────────────────────

const KontaktSchema = z.object({
  telefon: z.string(),
  email: z.string(),
  website: z.string(),
  erreichbarkeit: z.string(),
});

export async function saveKontaktInfo(
  data: KontaktInfo
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await assertAdminResult();
  if (!auth.ok) return auth;

  const parsed = KontaktSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  try {
    await writeContentFile("kontakt/info.json", JSON.stringify(parsed.data, null, 2));
    auditLog("saveKontaktInfo");
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    console.error("saveKontaktInfo error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Konnte nicht gespeichert werden." };
  }
}

// ── Services ───────────────────────────────────────────────────────────────────

const FaqSchema = z.object({ q: z.string(), a: z.string() });
const StepSchema = z.object({ title: z.string(), text: z.string() });
const CategorySchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
});

const ServiceEditSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  content: z.string().optional(),
  note: z.string().optional(),
  benefits: z.array(z.string()),
  categories: z.array(CategorySchema),
  steps: z.array(StepSchema),
  faqs: z.array(FaqSchema),
  heroImage: z.string().optional(),
});

export type ServiceEditData = z.infer<typeof ServiceEditSchema>;

export async function saveService(
  slug: Service["slug"],
  data: ServiceEditData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await assertAdminResult();
  if (!auth.ok) return auth;

  const parsed = ServiceEditSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  try {
    const payload = { slug, ...parsed.data };
    await writeContentFile(`services/${slug}.json`, JSON.stringify(payload, null, 2));
    auditLog("saveService", { slug });
    revalidatePath(`/leistungen/${slug}`);
    revalidatePath("/leistungen");
    revalidatePath(`/admin/leistungen/${slug}`);
    return { ok: true };
  } catch (err) {
    console.error("saveService error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Konnte nicht gespeichert werden." };
  }
}

// ── Datenschutz ────────────────────────────────────────────────────────────────

const DsSection = <T extends z.ZodRawShape>(extra: T) =>
  z.object({ enabled: z.boolean(), ...extra });

const DatenschutzSchema = z.object({
  letzteAktualisierung: z.string(),
  datenschutzbeauftragter: z.object({
    aktiv: z.boolean(),
    name: z.string(),
    email: z.string(),
  }),
  sections: z.object({
    hosting: DsSection({ anbieter: z.string(), standort: z.string() }),
    kontaktformular: DsSection({}),
    smtp: DsSection({ anbieter: z.string() }),
    logs: DsSection({}),
    cookies: DsSection({ details: z.string() }),
    karten: DsSection({ anbieter: z.string() }),
    betroffenenrechte: DsSection({}),
    weitergabe: DsSection({}),
    tracking: DsSection({}),
  }),
});

export type DatenschutzFormData = DatenschutzContent;

export async function saveDatenschutz(
  data: DatenschutzFormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await assertAdminResult();
  if (!auth.ok) return auth;

  const parsed = DatenschutzSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  try {
    await writeContentFile("datenschutz/content.json", JSON.stringify(parsed.data, null, 2));
    auditLog("saveDatenschutz");
    revalidatePath("/datenschutz");
    revalidatePath("/admin/datenschutz");
    return { ok: true };
  } catch (err) {
    console.error("saveDatenschutz error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Konnte nicht gespeichert werden." };
  }
}

// ── SMTP Settings ──────────────────────────────────────────────────────────────

const SmtpSettingsSchema = z.object({
  host: z.string().min(1, "Host ist erforderlich."),
  port: z.coerce.number().int().positive("Port muss eine positive Zahl sein."),
  user: z.string().min(1, "Benutzer ist erforderlich."),
  pass: z.string(),
  from: z.string().min(1, "Absenderadresse ist erforderlich."),
  fallbackTo: z.string().email("Muss eine gültige E-Mail-Adresse sein."),
  secure: z.boolean(),
});

export type SmtpSettingsFormData = z.input<typeof SmtpSettingsSchema>;

export async function saveSmtpSettings(
  data: SmtpSettingsFormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await assertAdminResult();
  if (!auth.ok) return auth;

  const parsed = SmtpSettingsSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  try {
    const existing = await readSmtpSettings();

    let encryptedPass = existing.encryptedPass;

    if (parsed.data.pass !== "") {
      if (!isEncryptionAvailable()) {
        return {
          ok: false,
          error:
            "SMTP-Verschlüsselung ist nicht konfiguriert. Bitte SMTP_SETTINGS_ENCRYPTION_KEY in den Umgebungsvariablen setzen.",
        };
      }
      encryptedPass = encryptSecret(parsed.data.pass);
    } else if (!existing.encryptedPass && !existing.pass) {
      return { ok: false, error: "Passwort ist erforderlich." };
    }

    await writeSmtpSettings({
      host: parsed.data.host,
      port: parsed.data.port,
      user: parsed.data.user,
      from: parsed.data.from,
      fallbackTo: parsed.data.fallbackTo,
      secure: parsed.data.secure,
      ...(encryptedPass ? { encryptedPass } : {}),
    });
    auditLog("saveSmtpSettings");
    return { ok: true };
  } catch (err) {
    console.error("saveSmtpSettings error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Konnte nicht gespeichert werden." };
  }
}

export async function sendTestMail(
  to: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await assertAdminResult();
  if (!auth.ok) return auth;

  const emailCheck = z.string().email().safeParse(to);
  if (!emailCheck.success) return { ok: false, error: "Ungültige E-Mail-Adresse." };

  try {
    const nodemailer = (await import("nodemailer")).default;
    const stored = await readSmtpSettings();
    const config = resolveSmtpConfig(stored);

    if (!config.host || !config.user || !config.pass) {
      return { ok: false, error: "SMTP-Konfiguration unvollständig. Bitte zuerst speichern." };
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
      requireTLS: config.port === 587,
    });

    await transporter.sendMail({
      from: config.from,
      to,
      subject: "Testmail – Gartenhilfe",
      text: "Die SMTP-Konfiguration funktioniert korrekt.",
    });

    return { ok: true };
  } catch (err) {
    console.error("sendTestMail error:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Versand fehlgeschlagen." };
  }
}
