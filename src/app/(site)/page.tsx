import Link from "next/link";
import { getAllServices } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Metadata } from "next";
import { OrganizationJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Gartenhilfe – Ihr Gartenservice im Raum Braunschweig" },
  description: "Gartenhilfe – Ihr regionaler Gartenservice im Raum Braunschweig. Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanz- und Erdarbeiten sowie Gartenreinigung. Jetzt anfragen!",
  keywords: [
    "Gartenservice Braunschweig",
    "Rasenmähen Hordorf",
    "Heckenschnitt Lehre",
    "Gartenpflege Braunschweig",
    "Gartenreinigung",
    "Unkrautentfernung",
    "Gartenhelfer",
  ],
  openGraph: {
    title: "Gartenhilfe – Ihr Gartenservice im Raum Braunschweig",
    description: "Professionelle Gartenpflege für Privatgärten in Hordorf, Lehre und dem Raum Braunschweig.",
    images: [{ url: "/mowing-the-grass-with-vehicle.jpg", width: 1200, height: 630, alt: "Gartenhilfe – Rasenmähen" }],
  },
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const services = await getAllServices();

  return (
    <>
      <OrganizationJsonLd />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mowing-the-grass-with-vehicle.jpg"
            alt="Gartenhilfe – Rasenmähservice im Raum Braunschweig"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Ihr <span className="text-emerald-400">Gartenservice</span>
                <br />
                im Raum Braunschweig
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                Rasenmähen, Heckenschnitt, Unkrautentfernung und mehr –
                <span className="text-emerald-400 font-medium"> zuverlässig, regional, fair</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-2xl mx-auto py-6">
              <div className="min-w-0 text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">Regional</div>
                <div className="text-sm text-gray-200 break-words text-pretty">Raum BS</div>
              </div>
              <div className="min-w-0 text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">Flexibel</div>
                <div className="text-sm text-gray-200 break-words text-pretty">Schnelle Terminvereinbarung</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold">
                <Link href="/leistungen">Leistungen ansehen</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-black hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold">
                <Link href="/kontakt">Anfrage stellen</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <Section subdued>
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold">Unsere Leistungen</h2>
          <div className="mt-6"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Wir übernehmen alle gängigen Gartenarbeiten mit mittelschweren Geräten – zuverlässig, ohne dass Sie selbst Hand anlegen müssen.
          </p>
          <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong className="text-emerald-600 dark:text-emerald-400">Pünktlich, sorgfältig und fair –</strong>{" "}
              wir bringen alles mit, halten was wir versprechen, und hinterlassen Ihren Garten in bestem Zustand.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Section>

      {/* Einsatzgebiet Section */}
      <div id="einsatzgebiet">
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Unser <span className="text-emerald-600 dark:text-emerald-400">Einsatzgebiet</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Wir sind im Raum Braunschweig für Sie da – schnell und unkompliziert, ohne lange Anfahrtswege.
            </p>
            <ul className="space-y-3">
              {["Hordorf", "Lehre", "Braunschweig und Umgebung", "Auf Anfrage auch weitere Orte"].map((ort) => (
                <li key={ort} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{ort}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/kontakt">Anfrage stellen</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/gardener-with-weedwacker-cutting-grass-garden.jpg", alt: "Freischneider-Einsatz" },
              { src: "/male-hands-cutting-bushes-with-big-scissors.jpg", alt: "Heckenschnitt" },
              { src: "/man-psushing-wheelbarrow-full-seedling.jpg", alt: "Pflanzarbeiten" },
              { src: "/clickerhappy-lawnmower-2786525.jpg", alt: "Rasenmähen" },
            ].map((img) => (
              <div key={img.src} className="aspect-square relative rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>
      </div>

      {/* Contact CTA */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Zu viel Arbeit im Garten?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Rufen Sie uns einfach an oder schreiben Sie uns – wir melden uns schnell zurück.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8">
              <Link href="/kontakt">Jetzt anfragen</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 bg-transparent">
              <Link href="/leistungen">Leistungen ansehen</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
