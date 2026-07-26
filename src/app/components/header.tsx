"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DEALER_WHATSAPP } from "@/data/products";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("tiger-hero");
    if (!heroEl) {
      setOverHero(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), { threshold: 0 });
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const light = overHero;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-200 ${
        light ? "border-[#cec9bd] bg-[#f4f1e9]/95" : "border-white/10 bg-[#071a1b]/95"
      } ${scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.18)]" : ""}`}
    >
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3.5 md:px-10">
        <Link href="/" aria-label="KAG Batteries home" className="flex items-center">
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
          Rechargeable Torches · Indore
        </p>

        {light ? (
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
        ) : (
          <>
            <nav className="hidden items-center gap-8 text-sm font-medium text-emerald-50/80 md:flex">
              <Link href="/#about" className="transition hover:text-white">The company</Link>
              <Link href="/products" className="transition hover:text-white">Catalogue</Link>
              <Link href="/#factory-visit" className="transition hover:text-white">Factory proof</Link>
              <Link href="/#contact" className="transition hover:text-white">Contact</Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-[#d9f36b] px-4 py-2 text-xs font-bold text-[#071a1b] transition hover:bg-white"
              >
                Open a dealer line
                <span aria-hidden="true">↗</span>
              </Link>
            </nav>

            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-emerald-50 transition hover:bg-white/10 md:hidden"
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
            {[
              ["The company", "/#about"],
              ["Catalogue", "/products"],
              ["Factory proof", "/#factory-visit"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={light ? "border-b border-[#cec9bd] py-3" : "border-b border-white/10 py-3"}
              >
                {label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${DEALER_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex justify-center rounded-full bg-[#d9f36b] px-4 py-3 text-sm font-bold text-[#071a1b]"
            >
              Message the sales team
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
