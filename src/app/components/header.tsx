"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DEALER_WHATSAPP } from "@/data/products";
import { useOverHero } from "./useOverHero";
import { useLanguage, type Language } from "./LanguageContext";

const navLinks: Record<Language, [string, string][]> = {
  en: [
    ["Our Story", "/#about"],
    ["Catalogue", "/products"],
    ["Why Us", "/#why-us"],
    ["Factory Tour", "/#factory-visit"],
    ["Become a Dealer", "/#become-dealer"],
    ["Reviews", "/#reviews"],
    ["Contact", "/#contact"],
  ],
  hi: [
    ["हमारी कहानी", "/#about"],
    ["कैटलॉग", "/products"],
    ["हमारी खासियत", "/#why-us"],
    ["फैक्ट्री टूर", "/#factory-visit"],
    ["डीलर बनें", "/#become-dealer"],
    ["समीक्षाएं", "/#reviews"],
    ["संपर्क करें", "/#contact"],
  ],
};

function LanguageToggle({ light }: { light: boolean }) {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "हिंदी में देखें" : "View in English"}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-bold transition-colors duration-200 ${
        light
          ? "border-[#11120f]/15 text-[#11120f]/70 hover:bg-[#11120f]/5"
          : "border-white/20 text-emerald-50/80 hover:bg-white/10"
      }`}
    >
      <span className={language === "en" ? "opacity-100" : "opacity-40"}>EN</span>
      <span className="opacity-25">/</span>
      <span className={language === "hi" ? "opacity-100" : "opacity-40"}>हिं</span>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHero = useOverHero();
  const pathname = usePathname();
  const { language } = useLanguage();
  const links = navLinks[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overHero;

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-200 ${
        light ? "border-[#cec9bd] bg-[#f4f1e9]/95" : "border-white/10 bg-[#071a1b]/95"
      } ${scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.18)]" : ""}`}
    >
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3.5 md:px-10">
        <Link href="/" onClick={handleLogoClick} aria-label="KAG Batteries — back to top" className="flex items-center">
          <div className={`relative h-10 w-10 transition-[filter] duration-200 ${light ? "" : "invert"}`}>
            <Image src="/kag-logo.png" alt="KAG Batteries" fill priority className="object-contain" />
          </div>
        </Link>

        <p
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity duration-200 md:block ${
            light ? "text-[#11120f]/70 opacity-100" : "opacity-0"
          }`}
        >
          {language === "en" ? "Rechargeable Torches · Indore" : "रिचार्जेबल टॉर्च · इंदौर"}
        </p>

        {light ? (
          <div className="flex items-center gap-2">
            <LanguageToggle light={light} />
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#11120f]/15 text-[#11120f] transition-colors duration-200 hover:bg-[#11120f]/5"
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <>
            <nav className="hidden items-center gap-5 text-[13px] font-medium text-emerald-50/80 lg:flex">
              {links.map(([label, href]) => (
                <Link key={href} href={href} className="whitespace-nowrap transition hover:text-white">
                  {label}
                </Link>
              ))}
              <LanguageToggle light={light} />
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#d9f36b] px-4 py-2 text-xs font-bold text-[#071a1b] transition hover:bg-white"
              >
                {language === "en" ? "Open a dealer line" : "डीलर लाइन खोलें"}
                <span aria-hidden="true">↗</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageToggle light={light} />
              <a
                href={`https://wa.me/${DEALER_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#20b85a] active:scale-95"
              >
                <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" fill="currentColor">
                  <path d="M16.04 4C9.94 4 4.98 8.96 4.98 15.06c0 2.4.78 4.63 2.1 6.45L6 28l6.64-2c1.74.96 3.73 1.51 5.8 1.51 6.1 0 11.06-4.96 11.06-11.06C29.5 8.96 22.14 4 16.04 4zm5.87 15.75c-.25.7-1.45 1.33-2.02 1.39-.52.05-1.17.07-1.89-.12-.44-.11-1-.33-1.73-.65-3.05-1.32-5.03-4.4-5.18-4.61-.15-.21-1.24-1.65-1.24-3.15 0-1.49.79-2.22 1.07-2.52.28-.3.61-.38.81-.38h.58c.19 0 .45-.07.71.54.27.65.92 2.25.99 2.41.08.16.13.35.03.56-.09.21-.14.34-.28.52-.15.17-.31.39-.44.52-.15.15-.31.31-.13.62.19.31.83 1.37 1.78 2.22 1.23 1.1 2.27 1.45 2.6 1.61.34.16.54.14.74-.09.2-.22.85-.99 1.08-1.33.23-.34.46-.28.77-.17.31.11 2.01.95 2.36 1.12.35.17.58.25.67.39.08.14.08.8-.17 1.5z" />
                </svg>
              </a>
              <button
                onClick={() => setOpen((o) => !o)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-emerald-50 transition hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {open ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {open && (
        <div
          className={`border-t transition-colors duration-200 ${
            light ? "border-[#cec9bd] bg-[#f4f1e9]" : "border-white/10 bg-[#071a1b]"
          }`}
        >
          <nav
            className={`mx-auto grid max-w-[1440px] gap-1 px-5 py-5 text-base transition-colors duration-200 md:px-10 ${
              light ? "text-[#11120f]" : "text-emerald-50"
            }`}
          >
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={light ? "border-b border-[#cec9bd] py-3" : "border-b border-white/10 py-3"}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${DEALER_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 justify-center rounded-full bg-[#d9f36b] px-4 py-3 text-sm font-bold text-[#071a1b]"
              >
                {language === "en" ? "Message the sales team" : "सेल्स टीम को मैसेज करें"}
              </a>
              <LanguageToggle light={light} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
