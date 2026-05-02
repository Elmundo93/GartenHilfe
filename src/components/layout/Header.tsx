"use client";

import Link from "next/link";
import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { name: "Rasenmähservice", href: "/leistungen/rasenmaeher-service" },
    { name: "Hecken- & Strauchschnitt", href: "/leistungen/hecken-und-strauchschnitt" },
    { name: "Unkrautentfernung & Freischneider", href: "/leistungen/unkrautentfernung" },
    { name: "Pflanz- & Erdarbeiten", href: "/leistungen/pflanz-und-erdarbeiten" },
    { name: "Gartenreinigung & Saisonpflege", href: "/leistungen/gartenreinigung" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-24 sm:px-5">
        <Link href="/" aria-label="Zur Startseite" className="relative block h-12 w-32 sm:h-16 sm:w-40">
          <Image
            src="/GartenHilfeLogo.png"
            alt="Gartenhilfe"
            width={200}
            height={200}
            className="object-contain object-left absolute top-[-50px] left-0"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base px-3 py-2 font-normal bg-transparent hover:bg-transparent">
                Leistungen
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-3">
                <div className="grid min-w-[340px] gap-1 sm:min-w-[420px] sm:grid-cols-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      className="text-sm px-3 py-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      href={service.href}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#einsatzgebiet" className="text-base px-3 py-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Einsatzgebiet
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/ueber-uns" className="text-base px-3 py-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Über uns
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild size="sm" className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                <Link href="/kontakt">Anfragen</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="h-10 min-w-10 gap-2 border-emerald-200 px-2.5 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-200 sm:px-3"
            >
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
              <span className="hidden text-sm font-medium sm:inline">{isOpen ? "Schließen" : "Menü"}</span>
              <span className="sr-only">{isOpen ? "Menü schließen" : "Menü öffnen"}</span>
            </Button>
          </SheetTrigger>
          <SheetContent id="mobile-navigation" side="right" className="w-[86vw] max-w-[360px] border-l-emerald-100 p-5 sm:w-[380px] sm:p-6 dark:border-l-emerald-900/60">
            <SheetHeader>
              <SheetTitle className="text-emerald-600">Gartenhilfe</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-base font-semibold text-gray-900 dark:text-white">Leistungen</span>
                <div className="flex flex-col gap-1 ml-4">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/#einsatzgebiet"
                className="text-base font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Einsatzgebiet
              </Link>

              <Link
                href="/ueber-uns"
                className="text-base font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Über uns
              </Link>

              <Button asChild className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                  Anfrage stellen
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
