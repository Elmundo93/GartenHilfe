import { getAllServices } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbListJsonLd } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Gartenservice Leistungen: Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanz- und Erdarbeiten sowie saisonale Gartenreinigung im Raum Braunschweig.",
  keywords: [
    "Gartenservice Leistungen",
    "Rasenmähen Braunschweig",
    "Heckenschnitt",
    "Unkrautentfernung",
    "Gartenpflege",
    "Gartenreinigung",
  ],
  openGraph: {
    title: "Gartenhilfe Leistungen – Gartenservice im Raum Braunschweig",
    description: "Rasenmähen, Heckenschnitt, Unkrautentfernung und mehr – professionell und zuverlässig.",
  },
  alternates: { canonical: "/leistungen" },
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <BreadcrumbListJsonLd items={[
        { name: "Startseite", url: "/" },
        { name: "Leistungen", url: "/leistungen" },
      ]} />
      <Section>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Unsere <span className="text-emerald-600 dark:text-emerald-400">Leistungen</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Wir übernehmen alle gängigen Gartenarbeiten mit professionellem Gerät – zuverlässig, fair und ohne dass Sie sich selbst die Hände schmutzig machen müssen.
          </p>
          <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-xl mx-auto mb-12">
            <div className="min-w-0 text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Regional</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words text-pretty">Raum Braunschweig</div>
            </div>
            <div className="min-w-0 text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Flexibel</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words text-pretty">
                Schnelle Terminvereinbarung
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Unser Leistungsspektrum" subdued>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Von der wöchentlichen Rasenpflege bis zur saisonalen Gartenreinigung – wir bieten Ihnen alles aus einer Hand. Alle Leistungen werden mit professionellem Gerät und viel Sorgfalt ausgeführt.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Section>

      <Section title="Warum Gartenhilfe?">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Zuverlässige Termine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Wir kommen pünktlich und erledigen den Job vollständig – kein halbfertiger Garten, kein Nachtermin nötig.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Professionelles Gerät</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Wir bringen alles mit – vom Rasenmäher bis zum Freischneider. Sie müssen nichts bereitstellen.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Faire Preise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Transparente Preisgestaltung ohne versteckte Kosten. Wir erstellen Ihnen gerne ein individuelles Angebot.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="So läuft es ab" subdued>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "1", title: "Anfrage", text: "Rufen Sie an oder schreiben Sie uns kurz – wir melden uns schnell." },
            { n: "2", title: "Besichtigung", text: "Bei größeren Projekten schauen wir uns Ihren Garten kurz an." },
            { n: "3", title: "Angebot", text: "Sie erhalten ein klares Angebot ohne versteckte Kosten." },
            { n: "4", title: "Ausführung", text: "Wir kommen zum vereinbarten Termin und erledigen alles sauber." },
          ].map((step) => (
            <div key={step.n} className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-white font-bold text-xl">{step.n}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
