"use client";

import { useState } from "react";
import { saveService, type ServiceEditData } from "@/lib/admin-actions";
import type { Service } from "@/lib/content";
import { AdminCard, AdminField, inputCls, textareaCls } from "./AdminShell";

type Props = { slug: Service["slug"]; initial: ServiceEditData };

export function ServiceForm({ slug, initial }: Props) {
  const [data, setData] = useState<ServiceEditData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const setText =
    (key: keyof ServiceEditData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  // benefits: one per line ↔ string[]
  const benefitsText = data.benefits.join("\n");
  const setBenefits = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, benefits: e.target.value.split("\n") }));

  // faqs
  const addFaq = () =>
    setData((d) => ({ ...d, faqs: [...d.faqs, { q: "", a: "" }] }));
  const removeFaq = (i: number) =>
    setData((d) => ({ ...d, faqs: d.faqs.filter((_, idx) => idx !== i) }));
  const setFaq =
    (i: number, field: "q" | "a") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((d) => {
        const faqs = [...d.faqs];
        faqs[i] = { ...faqs[i], [field]: e.target.value };
        return { ...d, faqs };
      });

  // categories: stored as JSON string in textarea
  const [catJson, setCatJson] = useState(
    JSON.stringify(data.categories ?? [], null, 2)
  );
  const [catJsonError, setCatJsonError] = useState("");
  const handleCatJson = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCatJson(val);
    try {
      const parsed = JSON.parse(val);
      setData((d) => ({ ...d, categories: parsed }));
      setCatJsonError("");
    } catch {
      setCatJsonError("Ungültiges JSON");
    }
  };

  // steps: stored as JSON string in textarea
  const [stepsJson, setStepsJson] = useState(
    JSON.stringify(data.steps ?? [], null, 2)
  );
  const [stepsJsonError, setStepsJsonError] = useState("");
  const handleStepsJson = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setStepsJson(val);
    try {
      const parsed = JSON.parse(val);
      setData((d) => ({ ...d, steps: parsed }));
      setStepsJsonError("");
    } catch {
      setStepsJsonError("Ungültiges JSON");
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (catJsonError || stepsJsonError) return;
    setStatus("saving");
    const res = await saveService(slug, data);
    setStatus(res.ok ? "saved" : "error");
    if (res.ok) setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Basisdaten */}
      <AdminCard>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Basisdaten</p>
        <div className="space-y-4">
          <AdminField label="Titel">
            <input className={inputCls} value={data.title} onChange={setText("title")} required />
          </AdminField>
          <AdminField label="Kurzbeschreibung (intro)" hint="Erscheint auf der Karte und als Einleitung der Detailseite">
            <textarea className={textareaCls} rows={3} value={data.intro} onChange={setText("intro")} required />
          </AdminField>
          <AdminField label="Ausführliche Beschreibung" hint="Erscheint im Inhaltsbereich der Detailseite">
            <textarea className={textareaCls} rows={6} value={data.content ?? ""} onChange={setText("content")} />
          </AdminField>
          <AdminField label="Wichtiger Hinweis" hint="Optionaler Hinweiskasten am Ende der Seite">
            <textarea className={textareaCls} rows={3} value={data.note ?? ""} onChange={setText("note")} />
          </AdminField>
        </div>
      </AdminCard>

      {/* Benefits */}
      <AdminCard>
        <AdminField label="Vorteile / Highlights" hint="Ein Punkt pro Zeile – erscheinen als Aufzählung neben dem Hero-Bild">
          <textarea
            className={textareaCls}
            rows={5}
            value={benefitsText}
            onChange={setBenefits}
            placeholder={"Regelmäßige oder einmalige Termine\nGeeignet für alle Grundstücksgrößen"}
          />
        </AdminField>
      </AdminCard>

      {/* FAQs */}
      <AdminCard>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Häufige Fragen (FAQ)</p>
          <button
            type="button"
            onClick={addFaq}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            + Frage hinzufügen
          </button>
        </div>
        {data.faqs.length === 0 && (
          <p className="text-sm text-gray-400">Noch keine FAQs &ndash; klicken Sie auf &bdquo;+ Frage hinzuf&uuml;gen&ldquo;.</p>
        )}
        <div className="space-y-5">
          {data.faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-400">FAQ {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Entfernen
                </button>
              </div>
              <AdminField label="Frage">
                <input className={inputCls} value={faq.q} onChange={setFaq(i, "q")} />
              </AdminField>
              <AdminField label="Antwort">
                <textarea className={textareaCls} rows={3} value={faq.a} onChange={setFaq(i, "a")} />
              </AdminField>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Kategorien (JSON) */}
      <AdminCard>
        <AdminField
          label="Leistungskategorien"
          hint='Fortgeschrittene Bearbeitung als JSON. Format: [{"title":"Kategoriename","items":["Punkt 1","Punkt 2"]}]'
        >
          <textarea
            className={`${textareaCls} font-mono text-xs`}
            rows={8}
            value={catJson}
            onChange={handleCatJson}
          />
          {catJsonError && <p className="mt-1 text-xs text-red-600">{catJsonError}</p>}
        </AdminField>
      </AdminCard>

      {/* Schritte (JSON) */}
      <AdminCard>
        <AdminField
          label="Ablaufschritte"
          hint='Format: [{"title":"Schritt 1","text":"Beschreibung"}]'
        >
          <textarea
            className={`${textareaCls} font-mono text-xs`}
            rows={6}
            value={stepsJson}
            onChange={handleStepsJson}
          />
          {stepsJsonError && <p className="mt-1 text-xs text-red-600">{stepsJsonError}</p>}
        </AdminField>
      </AdminCard>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving" || !!catJsonError || !!stepsJsonError}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {status === "saving" ? "Speichert…" : "Speichern"}
        </button>
        {status === "saved" && <p className="text-sm text-emerald-600 font-medium">✓ Gespeichert</p>}
        {status === "error" && <p className="text-sm text-red-600">Fehler beim Speichern.</p>}
      </div>
    </form>
  );
}
