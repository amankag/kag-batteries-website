"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { initialProducts } from "@/data/products";

const lithiumProducts = initialProducts.filter((p) => p.category === "lithium-ion");
const leadAcidProducts = initialProducts.filter((p) => p.category === "lead-acid");

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 bg-slate-950/95 border-b border-white/10 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Kag Batteries logo"
              fill
              priority
              className="object-contain p-1.5"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm md:text-base font-semibold text-white">Kag Batteries</p>
            <p className="text-[11px] md:text-xs text-gray-300">Premium LED Torches &amp; Batteries</p>
          </div>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-100">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/#about" className="hover:text-white transition">About</Link>
          <Link href="/products" className="hover:text-white transition">All Products</Link>

          {/* Products dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProductDropdownOpen((o) => !o)}
              className="flex items-center gap-1 hover:text-white transition py-1"
            >
              Products
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {productDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-4">
                {/* Lithium-Ion column */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2 px-1">
                    Lithium-Ion Models
                  </p>
                  <div className="space-y-0.5">
                    {lithiumProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={() => setProductDropdownOpen(false)}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-sm text-slate-200 group-hover:text-white truncate pr-2">
                          {p.name}
                        </span>
                        <span className="text-xs text-slate-400 flex-shrink-0 group-hover:text-green-400">
                          {p.pricingTiers[0].price}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Lead Acid column */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2 px-1">
                    Lead Acid Models
                  </p>
                  <div className="space-y-0.5">
                    {leadAcidProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={() => setProductDropdownOpen(false)}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-sm text-slate-200 group-hover:text-white truncate pr-2">
                          {p.name}
                        </span>
                        <span className="text-xs text-slate-400 flex-shrink-0 group-hover:text-blue-400">
                          {p.pricingTiers[0].price}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer row */}
                <div className="col-span-2 border-t border-white/10 pt-3 flex items-center justify-between">
                  <Link
                    href="/#products"
                    onClick={() => setProductDropdownOpen(false)}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    ← View all products on one page
                  </Link>
                  <Link
                    href="/inquiry"
                    onClick={() => setProductDropdownOpen(false)}
                    className="text-xs font-bold text-green-400 hover:text-green-300 transition"
                  >
                    Get dealer pricing →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/#contact" className="hover:text-white transition">Contact</Link>

          <Link
            href="/inquiry"
            className="ml-1 rounded-full bg-green-500 hover:bg-green-400 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition"
          >
            Dealer Inquiry
          </Link>
        </nav>

        {/* ── Mobile Menu Button ────────────────────────────────────────── */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-100 hover:bg-white/10 transition"
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

      {/* ── Mobile Nav ───────────────────────────────────────────────────── */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1 text-sm text-gray-100">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 px-2 rounded-lg hover:bg-white/5 transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile products section */}
            <div className="pt-2 pb-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 mb-2">
                Lithium-Ion Torches
              </p>
              {lithiumProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/5 transition"
                >
                  <span className="text-slate-200">{p.name}</span>
                  <span className="text-xs text-green-400">{p.pricingTiers[0].price}</span>
                </Link>
              ))}
            </div>

            <div className="pt-1 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 mb-2">
                Lead Acid Torches
              </p>
              {leadAcidProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/5 transition"
                >
                  <span className="text-slate-200">{p.name}</span>
                  <span className="text-xs text-blue-400">{p.pricingTiers[0].price}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/inquiry"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold text-white shadow-sm"
              >
                Dealer Inquiry
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
