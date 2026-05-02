export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gartenhilfe",
    "description": "Gartenhilfe – Ihr regionaler Gartenservice im Raum Braunschweig. Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanz- und Erdarbeiten sowie saisonale Gartenreinigung.",
    "url": process.env.NEXT_PUBLIC_BASE_URL ?? "https://gartenhilfe-bs.de",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hordorf",
      "addressRegion": "Niedersachsen",
      "addressCountry": "DE"
    },
    "areaServed": [
      { "@type": "City", "name": "Hordorf" },
      { "@type": "City", "name": "Lehre" },
      { "@type": "City", "name": "Braunschweig" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Gartendienstleistungen",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rasenmähservice" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hecken- & Strauchschnitt" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Unkrautentfernung & Freischneider" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pflanz- & Erdarbeiten" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gartenreinigung & Saisonpflege" } }
      ]
    },
    "priceRange": "€€",
    "currenciesAccepted": "EUR"
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function BreadcrumbListJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://gartenhilfe-bs.de";
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${base}${item.url}`
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
