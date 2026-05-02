"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SERVICES = [
  "Rasenmähservice",
  "Hecken- & Strauchschnitt",
  "Unkrautentfernung & Freischneider",
  "Pflanz- & Erdarbeiten",
  "Gartenreinigung & Saisonpflege",
];

type Status = "idle" | "submitting" | "success" | "error";

export function SimpleContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<string>(String(Date.now()));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("ts", tsRef.current);

    const res = await fetch("/api/kontakt", { method: "POST", body: data });
    const json = await res.json();

    if (json.ok) {
      setStatus("success");
      formRef.current?.reset();
    } else if (json.errors?.fieldErrors) {
      const fe = json.errors.fieldErrors as Record<string, string[]>;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v[0]])));
      setStatus("idle");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
          Nachricht gesendet!
        </h3>
        <p className="text-emerald-700 dark:text-emerald-300">
          Wir melden uns so schnell wie möglich bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name <span className="text-emerald-600">*</span>
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Ihr Name"
          required
          minLength={2}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Telefon
          </label>
          <Input
            id="telefon"
            name="telefon"
            type="tel"
            placeholder="Ihre Telefonnummer"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            E-Mail
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>
      <p className="text-xs text-gray-500 -mt-2">Bitte Telefon oder E-Mail angeben.</p>

      <div>
        <label htmlFor="leistung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Gewünschte Leistung
        </label>
        <select
          id="leistung"
          name="leistung"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Bitte wählen (optional)</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="nachricht" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={4}
          placeholder="Was kann ich für Sie tun? Beschreiben Sie gerne kurz Ihr Anliegen..."
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="datenschutz"
          name="datenschutz"
          type="checkbox"
          value="true"
          required
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="datenschutz" className="text-sm text-gray-600 dark:text-gray-400">
          Ich habe die{" "}
          <a href="/datenschutz" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zu. <span className="text-emerald-600">*</span>
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 rounded-lg px-4 py-3">
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per Telefon.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
      >
        {status === "submitting" ? "Wird gesendet..." : "Nachricht senden"}
      </Button>
    </form>
  );
}
