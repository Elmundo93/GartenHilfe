"use client";

import { useState } from "react";
import { saveImpressum } from "@/lib/admin-actions";
import type { ImpressumContent } from "@/lib/content";
import { AdminCard, AdminField, inputCls } from "./AdminShell";

export function ImpressumForm({ initial }: { initial: ImpressumContent }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = (key: keyof ImpressumContent) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData((d) => ({ ...d, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await saveImpressum(data);
    setStatus(res.ok ? "saved" : "error");
    if (res.ok) setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AdminCard>
        <div className="space-y-4">
          <AdminField label="Firmenname">
            <input className={inputCls} value={data.firmenname} onChange={set("firmenname")} />
          </AdminField>
          <AdminField label="Inhaber / Inhaberin">
            <input className={inputCls} value={data.inhaberName} onChange={set("inhaberName")} placeholder="Vor- und Nachname" />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Adresse</p>
        <div className="space-y-4">
          <AdminField label="Straße und Hausnummer">
            <input className={inputCls} value={data.strasse} onChange={set("strasse")} />
          </AdminField>
          <div className="grid grid-cols-2 gap-3">
            <AdminField label="PLZ">
              <input className={inputCls} value={data.plz} onChange={set("plz")} />
            </AdminField>
            <AdminField label="Ort">
              <input className={inputCls} value={data.ort} onChange={set("ort")} />
            </AdminField>
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Kontakt</p>
        <div className="space-y-4">
          <AdminField label="Telefon">
            <input className={inputCls} type="tel" value={data.telefon} onChange={set("telefon")} placeholder="+49 xxx xxxxxxx" />
          </AdminField>
          <AdminField label="E-Mail">
            <input className={inputCls} type="email" value={data.email} onChange={set("email")} />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard>
        <AdminField label="Umsatzsteuer-ID" hint="Optional – z. B. DE123456789">
          <input className={inputCls} value={data.ustIdNr} onChange={set("ustIdNr")} placeholder="DE..." />
        </AdminField>
      </AdminCard>

      <SaveBar status={status} />
    </form>
  );
}

function SaveBar({ status }: { status: "idle" | "saving" | "saved" | "error" }) {
  return (
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
  );
}
