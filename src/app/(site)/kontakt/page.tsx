import { Section } from "@/components/ui/Section";
import { SimpleContactForm } from "@/components/contact/SimpleContactForm";
import { getKontaktInfo } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt zu Gartenhilfe – Gartenservice im Raum Braunschweig. Rufen Sie uns an, schreiben Sie uns oder speichern Sie unseren Kontakt direkt auf Ihrem Smartphone.",
  keywords: [
    "Gartenhilfe Kontakt",
    "Gartenservice anfragen",
    "Gartenhelfer Braunschweig",
    "Rasenmähen anfragen",
  ],
  alternates: { canonical: "/kontakt" },
};

export default async function ContactPage() {
  const info = await getKontaktInfo();
  const PHONE = info.telefon || process.env.BUSINESS_PHONE || "+49 000 0000000";
  const EMAIL = info.email || process.env.BUSINESS_EMAIL || "Kevin@gartenhilfe.net";
  const ERREICHBARKEIT = info.erreichbarkeit || "Mo–Fr 8–18 Uhr";
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sprechen Sie uns an</h1>
          <p className="text-xl text-emerald-100 leading-relaxed">
            Kein kompliziertes Formular, kein langes Warten. Ein kurzer Anruf oder eine Nachricht reicht – wir melden uns schnell bei Ihnen.
          </p>
        </div>
      </section>

      {/* Direkte Kontaktwege */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Telefon */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Anrufen</h2>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{PHONE}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{ERREICHBARKEIT}</p>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors text-center"
            >
              Jetzt anrufen
            </a>
          </div>

          {/* E-Mail */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">E-Mail schreiben</h2>
            <p className="text-base font-medium text-emerald-600 dark:text-emerald-400 mb-2 break-all">{EMAIL}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Antwort innerhalb von 24 h</p>
            <a
              href={`mailto:${EMAIL}`}
              className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors text-center"
            >
              E-Mail schreiben
            </a>
          </div>

          {/* vCard */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Kontakt speichern</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
              Fügen Sie uns direkt zu Ihren Kontakten hinzu – für die nächste Anfrage schnell zur Hand.
            </p>
            <p className="text-xs text-gray-400 mb-6">Funktioniert auf iPhone & Android</p>
            <a
              href="/api/kontakt/vcard"
              download="gartenhilfe-kontakt.vcf"
              className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors text-center"
            >
              Kontakt speichern
            </a>
          </div>
        </div>

        {/* Formular */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="bg-emerald-600 px-8 py-5">
              <h2 className="text-xl font-semibold text-white">Oder schreiben Sie uns direkt</h2>
              <p className="text-emerald-100 text-sm mt-1">Wir melden uns so schnell wie möglich bei Ihnen.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800">
              <SimpleContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
