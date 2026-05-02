import { z } from "zod";

export const ContactSchema = z.object({
  hp: z.string().optional(),
  ts: z.string().optional(),

  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  email: z.string().email("Ungültige E-Mail-Adresse").optional().or(z.literal("")),
  telefon: z.string().optional(),
  leistung: z.string().optional(),
  nachricht: z.string().optional(),
  datenschutz: z.literal("true"),
}).refine(
  (d) => (d.email && d.email.length > 0) || (d.telefon && d.telefon.trim().length >= 6),
  { message: "Bitte E-Mail oder Telefonnummer angeben", path: ["email"] }
);

export type ContactInput = z.infer<typeof ContactSchema>;
