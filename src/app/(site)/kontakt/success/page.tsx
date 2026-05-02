import Link from "next/link";

export default function ContactSuccess() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Vielen Dank!</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Ihre Nachricht wurde übermittelt. Wir melden uns so schnell wie möglich bei Ihnen.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
