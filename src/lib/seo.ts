import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://gartenhilfe-bs.de"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
};

export const organizationData = {
  name: "Gartenhilfe",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://gartenhilfe-bs.de",
  address: {
    addressLocality: "Hordorf",
    addressRegion: "Niedersachsen",
    addressCountry: "DE",
  },
};

export const seoKeywords = {
  primary: [
    "Gartenservice",
    "Rasenmähen",
    "Heckenschnitt",
    "Gartenreinigung",
    "Unkrautentfernung",
    "Gartenpflege",
    "Pflanzarbeiten",
  ],
  locations: [
    "Hordorf",
    "Lehre",
    "Braunschweig",
    "Raum Braunschweig",
    "Niedersachsen",
  ],
};
