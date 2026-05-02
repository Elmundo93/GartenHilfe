"use client";

import { useState } from "react";
import { saveKontaktInfo } from "@/lib/admin-actions";
import type { KontaktInfo } from "@/lib/content";
import { AdminCard, AdminField, inputCls } from "./AdminShell";

export function KontaktForm({ initial }: { initial: KontaktInfo }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = (key: keyof KontaktInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await saveKontaktInfo(data);
    setStatus(res.ok ? "saved" : "error");
    if (res.ok) setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AdminCard>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Kontaktdaten
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Diese Daten erscheinen in der Fußzeile, auf der Kontaktseite und in der vCard-Datei, die Besucher auf ihr Smartphone laden können.
        </p>
        <div className="space-y-4">
          <AdminField label="Telefon">
            <input className={inputCls} type="tel" value={data.telefon} onChange={set("telefon")} placeholder="+49 xxx xxxxxxx" />
          </AdminField>
          <AdminField label="E-Mail">
            <input className={inputCls} type="email" value={data.email} onChange={set("email")} />
          </AdminField>
          <AdminField label="Website" hint="Mit https://, z. B. https://gartenhilfe-bs.de">
            <input className={inputCls} value={data.website} onChange={set("website")} placeholder="https://..." />
          </AdminField>
          <AdminField label="Erreichbarkeit" hint="Wird auf der Kontaktseite und im Footer angezeigt">
            <input className={inputCls} value={data.erreichbarkeit} onChange={set("erreichbarkeit")} placeholder="Mo–Fr 8–18 Uhr" />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Vorschau vCard</p>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-600 space-y-0.5">
          <p>BEGIN:VCARD</p>
          <p>VERSION:3.0</p>
          <p>FN:{data.telefon ? "Gartenhilfe" : "Gartenhilfe"}</p>
          <p>TEL:{data.telefon || "(leer)"}</p>
          <p>EMAIL:{data.email || "(leer)"}</p>
          <p>URL:{data.website || "(leer)"}</p>
          <p>END:VCARD</p>
        </div>
      </AdminCard>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
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
