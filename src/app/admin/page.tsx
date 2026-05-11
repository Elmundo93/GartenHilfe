import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { getImpressumContent, getDatenschutzContent } from "@/lib/content";
import { readSmtpSettings } from "@/lib/settings";

const sections = [
  {
    href: "/admin/kontakt",
    title: "Kontaktdaten & vCard",
    description: "Telefon, E-Mail, Website und Erreichbarkeit anpassen.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    href: "/admin/leistungen",
    title: "Leistungen",
    description: "Beschreibungen, Vorteile und FAQs aller 5 Gartenservices bearbeiten.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: "/admin/einstellungen",
    title: "E-Mail-Einstellungen",
    description: "SMTP-Zugangsdaten für den E-Mail-Versand konfigurieren.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/impressum",
    title: "Impressum",
    description: "Firmenname, Inhaberdaten, Adresse und Kontakt für das Impressum.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/datenschutz",
    title: "Datenschutzerklärung",
    description: "Hosting, SMTP-Anbieter und optionale Abschnitte der Datenschutzseite pflegen.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default async function AdminDashboard() {
  const [imp, ds, smtp] = await Promise.all([
    getImpressumContent(),
    getDatenschutzContent(),
    readSmtpSettings(),
  ]);

  const checks = [
    { label: "Impressum ausgefüllt", ok: !!(imp.firmenname && imp.inhaberName) },
    { label: "Datenschutz aktualisiert", ok: !!ds.letzteAktualisierung },
    { label: "SMTP konfiguriert", ok: !!(smtp.host || process.env.SMTP_HOST) && !!(smtp.encryptedPass || smtp.pass || process.env.SMTP_PASS) },
    { label: "SMTP-Passwort verschlüsselt", ok: !!(smtp.encryptedPass || process.env.SMTP_PASS) },
  ];

  const allOk = checks.every((c) => c.ok);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Gartenhilfe – Verwaltung</p>
          </div>
          <LogoutButton />
        </div>

        {/* Compliance status */}
        <div className={`mb-6 rounded-xl border px-5 py-4 ${allOk ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${allOk ? "text-emerald-700" : "text-amber-700"}`}>
            Status
          </p>
          <ul className="space-y-1.5">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm">
                {c.ok
                  ? <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  : <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                }
                <span className={c.ok ? "text-gray-700" : "text-amber-800 font-medium"}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-emerald-400 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{s.title}</p>
                <p className="text-sm text-gray-500 truncate">{s.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
