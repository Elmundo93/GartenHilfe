import { Section } from "@/components/ui/Section";
import { getAboutUsContent } from "@/lib/content";
import { AboutUs } from "@/components/about/AboutUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Über Gartenhilfe – Ihr regionaler Gartenservice aus Hordorf im Raum Braunschweig. Zuverlässig, fair und mit dem richtigen Gerät für jeden Einsatz.",
  keywords: [
    "Gartenhilfe über uns",
    "Gartenservice Hordorf",
    "Gartenhelfer Braunschweig",
    "Gartenservice regional",
  ],
  openGraph: {
    title: "Über Gartenhilfe – Gartenservice im Raum Braunschweig",
    description: "Ihr verlässlicher Gartenservice aus Hordorf für Hordorf, Lehre und den Raum Braunschweig.",
  },
  alternates: { canonical: "/ueber-uns" },
};

export default async function AboutPage() {
  const aboutUs = await getAboutUsContent();

  if (!aboutUs) {
    return (
      <Section>
        <div className="text-center py-12">
          <h1 className="text-3xl font-semibold mb-4">Über uns</h1>
          <p className="text-gray-600 dark:text-gray-400">Inhalte werden geladen...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <AboutUs content={aboutUs} />
    </Section>
  );
}
