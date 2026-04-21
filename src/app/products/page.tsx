import type { Metadata } from "next";
import Link from "next/link";
import { initialProducts } from "@/data/products";
import ProductCatalogueClient from "./ProductCatalogueClient";

export const metadata: Metadata = {
  title: "All Torch Models – KAG Batteries | LED Torch Manufacturer Indore",
  description:
    "Browse all 17 KAG Batteries torch models. Lithium-Ion and Lead Acid rechargeable torches for dealers and distributors. Factory-direct pricing from Indore. Bulk orders welcome.",
  keywords:
    "KAG Batteries torch catalogue, LED torch manufacturer Indore, rechargeable torch dealer price, lithium ion torch wholesale, lead acid torch bulk order, torch distributor MP Maharashtra",
  openGraph: {
    title: "KAG Batteries – Complete Torch Catalogue",
    description:
      "17 torch models, 2 technology ranges. Factory-direct pricing for dealers and distributors across MP & Maharashtra.",
    type: "website",
    siteName: "KAG Batteries",
  },
};

export default function ProductsPage() {
  const lithiumCount = initialProducts.filter((p) => p.category === "lithium-ion").length;
  const leadAcidCount = initialProducts.filter((p) => p.category === "lead-acid").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="bg-slate-950 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 md:px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className="text-slate-600 text-sm">/</span>
          <span className="text-slate-200 text-sm font-medium">Products</span>
          <div className="ml-auto">
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-500 hover:bg-green-400 px-4 py-1.5 text-xs font-bold text-white transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Dealer Inquiry
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">
              Manufacturer Direct
            </p>
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              Complete Torch Catalogue
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mb-6">
              Factory-direct pricing for dealers and distributors. All models in stock at our Indore facility.
            </p>

            {/* Category quick-pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                <span className="text-sm font-semibold text-green-300">
                  {lithiumCount} Lithium-Ion Models
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                <span className="text-sm font-semibold text-blue-300">
                  {leadAcidCount} Lead Acid Models
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                <span className="text-sm font-medium text-slate-300">
                  Est. 1997 · Indore, MP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Interactive catalogue (client component) ─────────────────── */}
        <ProductCatalogueClient products={initialProducts} />
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} KAG Batteries, Indore. All rights reserved.</p>
          <Link href="/inquiry" className="text-green-600 font-medium hover:underline">
            Become a Dealer →
          </Link>
        </div>
      </footer>
    </div>
  );
}
