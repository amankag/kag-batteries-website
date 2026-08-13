"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Product, DEALER_WHATSAPP, categoryMeta } from "@/data/products";
import ColorSwatches from "@/app/components/ColorSwatches";

type Category = "all" | Product["category"];
type ProductType = "torch" | "battery";
type ViewMode = "grid" | "list";

const CATEGORIES_BY_TYPE: Record<ProductType, Product["category"][]> = {
  torch: ["lithium-ion", "lead-acid"],
  battery: ["vrla", "liquid"],
};

interface Props {
  products: Product[];
}

export default function ProductCatalogueClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [productType, setProductType] = useState<ProductType>("torch");
  const [category, setCategory] = useState<Category>("all");
  const [view, setView] = useState<ViewMode>("grid");

  const typedProducts = useMemo(
    () => products.filter((p) => (p.productType ?? "torch") === productType),
    [products, productType]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return typedProducts.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.specs.batteryCapacity ?? "").toLowerCase().includes(q) ||
        (p.specs.beamDistance ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [typedProducts, search, category]);

  const torchCount = products.filter((p) => (p.productType ?? "torch") === "torch").length;
  const batteryCount = products.filter((p) => p.productType === "battery").length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* ── Product type toggle ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden w-fit">
          {(
            [
              { key: "torch", label: `Torches (${torchCount})` },
              { key: "battery", label: `Batteries (${batteryCount})` },
            ] as { key: ProductType; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setProductType(key);
                setCategory("all");
              }}
              className={`px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap ${
                productType === key ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Not a filter — takes you to the full-screen digital torch book.
            Named specifically (not "Catalogue Book") since the brochure
            behind it only covers torches, not the battery range. */}
        <Link
          href="/torch-book"
          className="flex items-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white whitespace-nowrap transition-colors hover:bg-slate-700"
        >
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          Torch Book
        </Link>
      </div>

      {/* ── Controls bar ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search by model name, capacity, or range..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden flex-shrink-0">
          {(
            [
              { key: "all", label: `All (${typedProducts.length})` },
              ...CATEGORIES_BY_TYPE[productType].map((key) => ({
                key,
                label: `${categoryMeta[key].label} (${typedProducts.filter((p) => p.category === key).length})`,
              })),
            ] as { key: Category; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap ${
                category === key
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden flex-shrink-0">
          <button
            onClick={() => setView("grid")}
            title="Grid view"
            className={`p-2.5 transition-colors ${
              view === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            title="List view"
            className={`p-2.5 transition-colors ${
              view === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Results count ───────────────────────────────────────────────── */}
      <p className="text-xs text-slate-400 font-medium mb-5">
        Showing {filtered.length} of {typedProducts.length} {productType === "torch" ? "torch models" : "battery models"}
        {category !== "all" && (
          <> · <span className="text-slate-600">{categoryMeta[category].fullLabel} only</span></>
        )}
        {search && <> · search: &ldquo;{search}&rdquo;</>}
      </p>

      {/* ── Grid view ───────────────────────────────────────────────────── */}
      {view === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-square bg-slate-50 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    loading="lazy"
                    className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
                {/* Category dot */}
                <div
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${categoryMeta[product.category].dot}`}
                  title={categoryMeta[product.category].fullLabel}
                />
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                  {product.specs.batteryCapacity ?? product.category}
                </p>
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                  {product.name}
                </h2>
                <div className="mt-1 mb-auto">
                  <ColorSwatches colors={product.colors} />
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                  <span className="text-sm font-black text-slate-900">
                    {product.pricingTiers[0].price}
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── List view ───────────────────────────────────────────────────── */}
      {view === "list" && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all overflow-hidden"
            >
              <div className="flex items-center gap-4 p-3 sm:p-4">
                {/* Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl bg-slate-50 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      loading="lazy"
                      className="object-contain p-1.5 mix-blend-multiply"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryMeta[product.category].pill}`}
                    >
                      {categoryMeta[product.category].label}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {product.name}
                  </h2>
                  <div className="mt-1">
                    <ColorSwatches colors={product.colors} />
                  </div>
                  <p className="text-xs text-slate-500 truncate">{product.tagline}</p>

                  {/* Inline specs */}
                  <div className="hidden sm:flex items-center gap-4 mt-2">
                    {product.specs.batteryCapacity && (
                      <span className="text-xs text-slate-600">
                        <span className="font-semibold">Cap:</span> {product.specs.batteryCapacity}
                      </span>
                    )}
                    {product.specs.beamDistance && (
                      <span className="text-xs text-slate-600">
                        <span className="font-semibold">Range:</span> {product.specs.beamDistance}
                      </span>
                    )}
                    {product.specs.reflector && (
                      <span className="text-xs text-slate-600">
                        <span className="font-semibold">Reflector:</span> {product.specs.reflector}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price + actions */}
                <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
                  <p className="text-base sm:text-lg font-black text-slate-900">
                    {product.pricingTiers[0].price}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(
                        `Hi, I'm interested in the ${product.name}. Please send me the dealer pricing.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
                      title="WhatsApp inquiry"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0117 21C6.68166 21 2.3457 16.5361 2.3457 11.0498C2.3457 5.54883 6.69141 1.09961 12.0264 1.09961C17.3662 1.09961 21.7119 5.54883 21.7119 11.0498C21.7119 16.5361 17.3662 21 12.0117 21ZM12.0117 2.19336C7.2793 2.19336 3.4082 6.16699 3.4082 11.0498C3.4082 15.9326 7.2793 19.9062 12.0117 19.9062C16.7441 19.9062 20.6494 15.9326 20.6494 11.0498C20.6494 6.16699 16.7441 2.19336 12.0117 2.19336ZM16.0391 14.7393C15.8633 15.2227 15.2422 15.4268 14.8145 15.3535C14.3311 15.2754 12.3086 14.7002 9.94434 12.2617C7.57031 9.81348 7.02344 7.73828 6.94043 7.24512C6.8623 6.81152 7.0625 6.18164 7.53125 5.99609C7.83887 5.86914 8.08203 5.87402 8.24219 5.89844C8.58398 5.92773 8.65723 5.94238 8.81836 6.32324C9.02344 6.80664 9.47754 7.91016 9.53125 8.02246C9.58496 8.14453 9.61426 8.28125 9.55566 8.42285C9.4873 8.56934 9.42383 8.65723 9.17969 8.91602C8.94043 9.1748 8.91602 9.22363 8.96973 9.38965C9.07715 9.71191 9.63867 10.8789 10.4541 11.7236C11.5137 12.8223 12.3926 13.0615 12.7295 13.1201C12.8906 13.1494 12.9834 13.0908 13.208 12.8418C13.4668 12.5488 13.7842 12.085 13.9111 11.9678C14.0723 11.8164 14.248 11.8311 14.4336 11.9092C14.624 11.9824 15.6592 12.4951 15.8691 12.6074C16.0889 12.7148 16.2305 12.7686 16.2939 12.876C16.3574 12.9834 16.3574 13.4717 16.0391 14.7393Z" />
                      </svg>
                    </a>
                    <Link
                      href={`/products/${product.slug}`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="View details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-base font-bold text-slate-700 mb-1">No models found</p>
          <p className="text-sm text-slate-400 mb-4">Try a different search or clear the filter.</p>
          <button
            onClick={() => { setSearch(""); setCategory("all"); }}
            className="text-sm font-semibold text-green-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      {filtered.length > 0 && (
        <div className="mt-12 bg-slate-900 rounded-3xl p-6 md:p-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">
            Want dealer pricing for multiple models?
          </p>
          <h3 className="text-xl md:text-2xl font-black mb-3">
            Submit a Bulk Inquiry
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-5">
            Select the models you need, tell us your monthly quantity, and we&apos;ll send you our dealer price sheet on WhatsApp within 2 hours.
          </p>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 rounded-2xl bg-green-500 hover:bg-green-400 px-6 py-3 text-sm font-bold text-white transition shadow-lg shadow-green-900/30"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.0117 21C6.68166 21 2.3457 16.5361 2.3457 11.0498C2.3457 5.54883 6.69141 1.09961 12.0264 1.09961C17.3662 1.09961 21.7119 5.54883 21.7119 11.0498C21.7119 16.5361 17.3662 21 12.0117 21ZM12.0117 2.19336C7.2793 2.19336 3.4082 6.16699 3.4082 11.0498C3.4082 15.9326 7.2793 19.9062 12.0117 19.9062C16.7441 19.9062 20.6494 15.9326 20.6494 11.0498C20.6494 6.16699 16.7441 2.19336 12.0117 2.19336ZM16.0391 14.7393C15.8633 15.2227 15.2422 15.4268 14.8145 15.3535C14.3311 15.2754 12.3086 14.7002 9.94434 12.2617C7.57031 9.81348 7.02344 7.73828 6.94043 7.24512C6.8623 6.81152 7.0625 6.18164 7.53125 5.99609C7.83887 5.86914 8.08203 5.87402 8.24219 5.89844C8.58398 5.92773 8.65723 5.94238 8.81836 6.32324C9.02344 6.80664 9.47754 7.91016 9.53125 8.02246C9.58496 8.14453 9.61426 8.28125 9.55566 8.42285C9.4873 8.56934 9.42383 8.65723 9.17969 8.91602C8.94043 9.1748 8.91602 9.22363 8.96973 9.38965C9.07715 9.71191 9.63867 10.8789 10.4541 11.7236C11.5137 12.8223 12.3926 13.0615 12.7295 13.1201C12.8906 13.1494 12.9834 13.0908 13.208 12.8418C13.4668 12.5488 13.7842 12.085 13.9111 11.9678C14.0723 11.8164 14.248 11.8311 14.4336 11.9092C14.624 11.9824 15.6592 12.4951 15.8691 12.6074C16.0889 12.7148 16.2305 12.7686 16.2939 12.876C16.3574 12.9834 16.3574 13.4717 16.0391 14.7393Z" />
            </svg>
            Get Dealer Price Sheet on WhatsApp
          </Link>
        </div>
      )}
    </div>
  );
}
