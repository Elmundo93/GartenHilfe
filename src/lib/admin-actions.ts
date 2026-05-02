"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { writeContentFile } from "@/lib/storage";
import type { ImpressumContent, KontaktInfo, Service } from "@/lib/content";

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
    await writeContentFile("impressum/content.json", JSON.stringify(parsed.data, null, 2));
    revalidatePath("/impressum");
    revalidatePath("/admin/impressum");
    return { ok: true };
  } catch (err) {
    console.error("saveImpressum error:", err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
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
    await writeContentFile("kontakt/info.json", JSON.stringify(parsed.data, null, 2));
    revalidatePath("/kontakt");
    revalidatePath("/admin/kontakt");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    console.error("saveKontaktInfo error:", err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
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
    await writeContentFile(`services/${slug}.json`, JSON.stringify(payload, null, 2));
    revalidatePath(`/leistungen/${slug}`);
    revalidatePath("/leistungen");
    revalidatePath(`/admin/leistungen/${slug}`);
    return { ok: true };
  } catch (err) {
    console.error("saveService error:", err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
