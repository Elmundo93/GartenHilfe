import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://gartenhilfe-bs.de"),
  title: {
    default: "Gartenhilfe – Ihr Gartenservice im Raum Braunschweig",
    template: "%s | Gartenhilfe",
  },
  description: "Gartenhilfe: Ihr regionaler Gartenservice in Hordorf, Lehre und dem Raum Braunschweig. Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanzarbeiten und Gartenreinigung.",
  icons: { icon: "/favicon.ico" },
  keywords: [
    "Gartenservice",
    "Gartenhelfer",
    "Rasenmähen",
    "Heckenschnitt",
    "Unkrautentfernung",
    "Gartenpflege",
    "Gartenreinigung",
    "Hordorf",
    "Lehre",
    "Braunschweig",
    "Niedersachsen",
  ],
  authors: [{ name: "Gartenhilfe" }],
  creator: "Gartenhilfe",
  publisher: "Gartenhilfe",
  formatDetection: { email: false, address: false, telephone: false },
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
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Gartenhilfe",
    title: "Gartenhilfe – Ihr Gartenservice im Raum Braunschweig",
    description: "Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanzarbeiten und Gartenreinigung – zuverlässig und fair.",
    images: [
      {
        url: "/mowing-the-grass-with-vehicle.jpg",
        width: 1200,
        height: 630,
        alt: "Gartenhilfe – Rasenmähservice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gartenhilfe – Ihr Gartenservice im Raum Braunschweig",
    description: "Rasenmähen, Heckenschnitt, Unkrautentfernung und mehr – regional und zuverlässig.",
    images: ["/mowing-the-grass-with-vehicle.jpg"],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
