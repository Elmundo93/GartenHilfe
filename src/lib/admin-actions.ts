"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { ImpressumContent, KontaktInfo, Service } from "@/lib/content";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

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
  const parsed = ImpressumSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.message };
  try {
    const p = path.join(CONTENT_DIR, "impressum", "content.json");
    await fs.writeFile(p, JSON.stringify(parsed.data, null, 2), "utf8");
    return { ok: true };
  } catch (err) {
    console.error("saveImpressum error:", err);
    return { ok: false, error: "Datei konnte nicht gespeichert werden." };
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
  const parsed = KontaktSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.message };
  try {
    const p = path.join(CONTENT_DIR, "kontakt", "info.json");
    await fs.writeFile(p, JSON.stringify(parsed.data, null, 2), "utf8");
    return { ok: true };
  } catch (err) {
    console.error("saveKontaktInfo error:", err);
    return { ok: false, error: "Datei konnte nicht gespeichert werden." };
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
  const parsed = ServiceEditSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.message };
  try {
    const payload = { slug, ...parsed.data };
    const p = path.join(CONTENT_DIR, "services", `${slug}.json`);
    await fs.writeFile(p, JSON.stringify(payload, null, 2), "utf8");
    return { ok: true };
  } catch (err) {
    console.error("saveService error:", err);
    return { ok: false, error: "Datei konnte nicht gespeichert werden." };
  }
}
