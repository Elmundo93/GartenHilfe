const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://gartenhilfe-bs.de";

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gartenhilfe",
    "description": "Gartenhilfe – Ihr regionaler Gartenservice im Raum Braunschweig. Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanz- und Erdarbeiten sowie saisonale Gartenreinigung.",
    "url": BASE_URL,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hordorf",
      "addressRegion": "Niedersachsen",
      "addressCountry": "DE",
      "postalCode": "38312"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.1167,
      "longitude": 10.6333
    },
    "areaServed": [
      { "@type": "City", "name": "Hordorf" },
      { "@type": "City", "name": "Lehre" },
      { "@type": "City", "name": "Braunschweig" },
      { "@type": "City", "name": "Wolfenbüttel" },
      { "@type": "City", "name": "Cremlingen" }
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

export function ServiceJsonLd({
  name,
  description,
  slug,
  image,
}: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": `${BASE_URL}/leistungen/${slug}`,
    ...(image ? { "image": `${BASE_URL}${image}` } : {}),
    "provider": {
      "@type": "LocalBusiness",
      "name": "Gartenhilfe",
      "url": BASE_URL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hordorf",
        "addressRegion": "Niedersachsen",
        "addressCountry": "DE"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Hordorf" },
      { "@type": "City", "name": "Lehre" },
      { "@type": "City", "name": "Braunschweig" },
      { "@type": "City", "name": "Wolfenbüttel" }
    ],
    "serviceType": "Gartenservice"
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function FAQPageJsonLd({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function BreadcrumbListJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
