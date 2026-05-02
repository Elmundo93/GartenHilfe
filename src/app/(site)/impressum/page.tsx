import type { Metadata } from "next";
import { getImpressumContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impressum | Gartenhilfe",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG für Gartenhilfe.",
  alternates: { canonical: "/impressum" },
  robots: { index: false },
};

export default async function ImpressumPage() {
  const d = await getImpressumContent();

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Impressum</h1>

        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Angaben gemäß § 5 TMG
          </h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-0.5">
            <p className="font-semibold text-gray-900 dark:text-white">{d.firmenname || "Gartenhilfe"}</p>
            {d.inhaberName && <p>{d.inhaberName}</p>}
            {d.strasse && <p>{d.strasse}</p>}
            {(d.plz || d.ort) && <p>{[d.plz, d.ort].filter(Boolean).join(" ")}</p>}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Kontakt</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-1">
            {d.telefon && (
              <p>
                Telefon:{" "}
                <a href={`tel:${d.telefon.replace(/\s/g, "")}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  {d.telefon}
                </a>
              </p>
            )}
            {d.email && (
              <p>
                E-Mail:{" "}
                <a href={`mailto:${d.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  {d.email}
                </a>
              </p>
            )}
          </div>
        </section>

        {d.ustIdNr && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Umsatzsteuer-ID
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
              <span className="font-medium text-gray-900 dark:text-white">{d.ustIdNr}</span>
            </p>
          </section>
        )}

        {d.inhaberName && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-0.5">
              <p>{d.inhaberName}</p>
              {d.strasse && <p>{d.strasse}</p>}
              {(d.plz || d.ort) && <p>{[d.plz, d.ort].filter(Boolean).join(" ")}</p>}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Streitschlichtung</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm leading-relaxed">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Haftung für Inhalte</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Haftung für Links</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
          </p>
        </section>
      </div>
    </div>
  );
}
