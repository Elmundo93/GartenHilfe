import Link from "next/link";
import { getKontaktInfo } from "@/lib/content";

export async function Footer() {
  const info = await getKontaktInfo();
  const PHONE = info.telefon || process.env.BUSINESS_PHONE || "+49 000 0000000";
  return (
    <footer className="mt-12 border-t bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Gartenhilfe</div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Ihr regionaler Gartenservice im Raum Braunschweig – zuverlässig, fair und mit dem richtigen Gerät für jeden Einsatz.
          </p>
          <div className="mt-4">
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg hover:underline"
            >
              {PHONE}
            </a>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{info.erreichbarkeit || "Mo–Fr 8–18 Uhr"}</div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-gray-900 dark:text-white mb-3">Navigation</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/leistungen" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Leistungen</Link></li>
            <li><Link href="/#einsatzgebiet" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Einsatzgebiet</Link></li>
            <li><Link href="/ueber-uns" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Über uns</Link></li>
            <li><Link href="/kontakt" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-gray-900 dark:text-white mb-3">Leistungen</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/leistungen/rasenmaeher-service" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Rasenmähservice</Link></li>
            <li><Link href="/leistungen/hecken-und-strauchschnitt" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Hecken- & Strauchschnitt</Link></li>
            <li><Link href="/leistungen/unkrautentfernung" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Unkrautentfernung</Link></li>
            <li><Link href="/leistungen/pflanz-und-erdarbeiten" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pflanz- & Erdarbeiten</Link></li>
            <li><Link href="/leistungen/gartenreinigung" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Gartenreinigung</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Gartenhilfe – Alle Rechte vorbehalten.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/impressum" className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
