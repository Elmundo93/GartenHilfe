import fs from "node:fs/promises";
import path from "node:path";

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

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export async function getAllServices(): Promise<Service[]> {
  try {
    const dir = path.join(CONTENT_DIR, "services");
    const files = await fs.readdir(dir);
    const items = await Promise.all(
      files
        .filter(f => f.endsWith(".json"))
        .map(async (f) => {
          try {
            const raw = await fs.readFile(path.join(dir, f), "utf8");
            return JSON.parse(raw) as Service;
          } catch (err) {
            console.error(`Error reading service file ${f}:`, err);
            return null;
          }
        })
    );
    return items.filter((item): item is Service => item !== null).sort((a, b) => a.title.localeCompare(b.title, "de"));
  } catch (err) {
    console.error("Error loading services:", err);
    return [];
  }
}

export async function getService(slug: Service["slug"]): Promise<Service | null> {
  const all = await getAllServices();
  return all.find(s => s.slug === slug) ?? null;
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
  try {
    const p = path.join(CONTENT_DIR, "impressum", "content.json");
    const raw = await fs.readFile(p, "utf8");
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export async function getKontaktInfo(): Promise<KontaktInfo> {
  const defaults: KontaktInfo = {
    telefon: "",
    email: "",
    website: "",
    erreichbarkeit: "Mo–Fr 8–18 Uhr",
  };
  try {
    const p = path.join(CONTENT_DIR, "kontakt", "info.json");
    const raw = await fs.readFile(p, "utf8");
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export async function getAboutUsContent(): Promise<AboutUsContent | null> {
  try {
    const dir = path.join(CONTENT_DIR, "about-us");
    const files = await fs.readdir(dir);
    const items = await Promise.all(files.filter(f => f.endsWith(".json")).map(async (f) => {
      const raw = await fs.readFile(path.join(dir, f), "utf8");
      return JSON.parse(raw) as AboutUsContent;
    }));
    return items[0];
  } catch {
    return null;
  }
}
