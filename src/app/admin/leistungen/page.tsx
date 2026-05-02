import Link from "next/link";
import { getAllServices } from "@/lib/content";
import { AdminShell, AdminCard } from "@/components/admin/AdminShell";

const SERVICE_ICONS: Record<string, string> = {
  "rasenmaeher-service": "🌿",
  "hecken-und-strauchschnitt": "✂️",
  "unkrautentfernung": "🪴",
  "pflanz-und-erdarbeiten": "🌱",
  "gartenreinigung": "🚜",
};

export default async function AdminLeistungenPage() {
  const services = await getAllServices();

  return (
    <AdminShell title="Leistungen">
      <AdminCard>
        <p className="text-sm text-gray-500 mb-4">
          Klicken Sie auf eine Leistung, um Titel, Beschreibung, Vorteile und FAQs zu bearbeiten.
        </p>
        <div className="divide-y divide-gray-100">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/admin/leistungen/${s.slug}`}
              className="flex items-center gap-4 py-3 hover:text-emerald-600 transition-colors group"
            >
              <span className="text-2xl">{SERVICE_ICONS[s.slug] ?? "🌿"}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 group-hover:text-emerald-600">{s.title}</p>
                <p className="text-sm text-gray-400 truncate">{s.intro}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </AdminCard>
    </AdminShell>
  );
}
