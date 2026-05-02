import { readContentFile, readContentDir } from "@/lib/storage";

export type ImpressumContent = {
  firmenname: string;
  inhaberName: string;
  strasse: string;
  plz: string;
  ort: string;
  telefon: string;
  email: string;
  ustIdNr: string;
};

export type KontaktInfo = {
  telefon: string;
  email: string;
  website: string;
  erreichbarkeit: string;
};

export type Service = {
  slug: "rasenmaeher-service" | "hecken-und-strauchschnitt" | "unkrautentfernung" | "pflanz-und-erdarbeiten" | "gartenreinigung";
  title: string;
  intro: string;
  benefits: string[];
  content?: string;
  categories?: {
    title: string;
    items: string[];
  }[];
  note?: string;
  steps?: { title: string; text: string }[];
  faqs?: { q: string; a: string }[];
  heroImage?: string;
};

export type AboutUsContent = {
  title: string;
  hero: {
    headline: string;
    intro: string;
  };
  mainContent: {
    section1: string;
    section2: string;
    section3: string;
  };
  stats: {
    number: string;
    label: string;
  }[];
  services: string[];
};

export async function getAllServices(): Promise<Service[]> {
  const raws = await readContentDir("services");
  return raws
    .map((raw) => {
      try {
        return JSON.parse(raw) as Service;
      } catch {
        return null;
      }
    })
    .filter((s): s is Service => s !== null)
    .sort((a, b) => a.title.localeCompare(b.title, "de"));
}

export async function getService(slug: Service["slug"]): Promise<Service | null> {
  const all = await getAllServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getImpressumContent(): Promise<ImpressumContent> {
  const defaults: ImpressumContent = {
    firmenname: "Gartenhilfe",
    inhaberName: "",
    strasse: "",
    plz: "",
    ort: "Hordorf",
    telefon: "",
    email: "",
    ustIdNr: "",
  };
  return readContentFile("impressum/content.json", defaults);
}

export async function getKontaktInfo(): Promise<KontaktInfo> {
  const defaults: KontaktInfo = {
    telefon: "",
    email: "",
    website: "",
    erreichbarkeit: "Mo–Fr 8–18 Uhr",
  };
  return readContentFile("kontakt/info.json", defaults);
}

export async function getAboutUsContent(): Promise<AboutUsContent | null> {
  const raws = await readContentDir("about-us");
  if (raws.length === 0) return null;
  try {
    return JSON.parse(raws[0]) as AboutUsContent;
  } catch {
    return null;
  }
}
