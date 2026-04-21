import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { initialProducts, DEALER_WHATSAPP } from "@/data/products";
import BulkInquiryForm from "./BulkInquiryForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getProduct(slug: string) {
  return initialProducts.find((p) => p.slug === slug);
}

// ─── Static params for all 17 products ───────────────────────────────────────
export function generateStaticParams() {
  return initialProducts.map((p) => ({ slug: p.slug }));
}

// ─── Per-product SEO metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found – KAG Batteries" };

  const title = `${product.name} – KAG Batteries | ${product.tagline}`;
  const description = `Buy ${product.name} from KAG Batteries. ${product.description.slice(0, 140)}. Bulk dealer pricing available. Manufactured in Indore since 1997.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      "KAG Batteries",
      "torch manufacturer India",
      "LED torch bulk order",
      "rechargeable torch dealer",
      "torch wholesaler Indore",
      product.category === "lithium-ion" ? "lithium ion torch" : "lead acid torch",
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "KAG Batteries",
      images: product.image
        ? [{ url: product.image, alt: product.name }]
        : [],
    },
  };
}

// ─── Spec row helper ──────────────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className="w-36 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const whatsappQuoteUrl = `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name}. Please send me the dealer pricing and availability.`
  )}`;

  // 3 related products — same category, exclude current
  const relatedProducts = initialProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  // JSON-LD Product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "KAG Batteries",
    },
    manufacturer: {
      "@type": "Organization",
      name: "KAG Batteries",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
    },
    image: product.image ? `https://kagbatteries.com${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.pricingTiers[0].price.replace(/[^0-9]/g, ""),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "KAG Batteries",
      },
    },
  };

  const isLithium = product.category === "lithium-ion";

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* ── Top nav bar ─────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 md:px-6 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/#products" className="text-slate-400 hover:text-white text-sm transition">
              Products
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 text-sm font-medium truncate">{product.name}</span>

            <div className="ml-auto">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm hidden sm:block">KAG Batteries</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* ── Product hero: two-column ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
            {/* Left: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-300">
                    <svg className="w-20 h-20 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm">Image coming soon</span>
                  </div>
                )}
              </div>

              {/* Category badge */}
              <div
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isLithium
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isLithium ? "Lithium-Ion" : "Lead Acid"}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
                KAG Batteries
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-base text-slate-500 font-medium mb-5">{product.tagline}</p>

              {/* Highlights */}
              <ul className="space-y-2 mb-8">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>

              {/* ── Pricing tiers ────────────────────────────────────────── */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden mb-6">
                <div className="bg-slate-900 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    Pricing Tiers
                  </p>
                </div>
                {product.pricingTiers.map((tier) => (
                  <div
                    key={tier.label}
                    className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 last:border-0 bg-white"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{tier.label}</p>
                      <p className="text-xs text-slate-400">{tier.moq}</p>
                    </div>
                    {tier.locked ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-200 select-none blur-[5px]">
                          {tier.price}
                        </span>
                        <a
                          href={whatsappQuoteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold transition-colors border border-green-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Unlock
                        </a>
                      </div>
                    ) : (
                      <span className="text-xl font-black text-slate-900">{tier.price}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-lg shadow-green-100"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.0117 21C6.68166 21 2.3457 16.5361 2.3457 11.0498C2.3457 5.54883 6.69141 1.09961 12.0264 1.09961C17.3662 1.09961 21.7119 5.54883 21.7119 11.0498C21.7119 16.5361 17.3662 21 12.0117 21ZM12.0117 2.19336C7.2793 2.19336 3.4082 6.16699 3.4082 11.0498C3.4082 15.9326 7.2793 19.9062 12.0117 19.9062C16.7441 19.9062 20.6494 15.9326 20.6494 11.0498C20.6494 6.16699 16.7441 2.19336 12.0117 2.19336ZM16.0391 14.7393C15.8633 15.2227 15.2422 15.4268 14.8145 15.3535C14.3311 15.2754 12.3086 14.7002 9.94434 12.2617C7.57031 9.81348 7.02344 7.73828 6.94043 7.24512C6.8623 6.81152 7.0625 6.18164 7.53125 5.99609C7.83887 5.86914 8.08203 5.87402 8.24219 5.89844C8.58398 5.92773 8.65723 5.94238 8.81836 6.32324C9.02344 6.80664 9.47754 7.91016 9.53125 8.02246C9.58496 8.14453 9.61426 8.28125 9.55566 8.42285C9.4873 8.56934 9.42383 8.65723 9.17969 8.91602C8.94043 9.1748 8.91602 9.22363 8.96973 9.38965C9.07715 9.71191 9.63867 10.8789 10.4541 11.7236C11.5137 12.8223 12.3926 13.0615 12.7295 13.1201C12.8906 13.1494 12.9834 13.0908 13.208 12.8418C13.4668 12.5488 13.7842 12.085 13.9111 11.9678C14.0723 11.8164 14.248 11.8311 14.4336 11.9092C14.624 11.9824 15.6592 12.4951 15.8691 12.6074C16.0889 12.7148 16.2305 12.7686 16.2939 12.876C16.3574 12.9834 16.3574 13.4717 16.0391 14.7393Z" />
                  </svg>
                  Quick Quote on WhatsApp
                </a>
                <a
                  href={`tel:+${DEALER_WHATSAPP}`}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 rounded-2xl text-sm transition-colors bg-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* ── Full specs table ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4">Technical Specifications</h2>
              <div>
                {product.specs.batteryType && (
                  <SpecRow label="Battery Type" value={product.specs.batteryType} />
                )}
                {product.specs.batteryCapacity && (
                  <SpecRow label="Capacity" value={product.specs.batteryCapacity} />
                )}
                {product.specs.reflector && (
                  <SpecRow label="Reflector" value={product.specs.reflector} />
                )}
                {product.specs.beamDistance && (
                  <SpecRow label="Beam Range" value={product.specs.beamDistance} />
                )}
                {product.specs.sideLight && (
                  <SpecRow label="Side Light" value={product.specs.sideLight} />
                )}
                {product.specs.switchType && (
                  <SpecRow label="Switch" value={product.specs.switchType} />
                )}
                {product.specs.body && (
                  <SpecRow label="Body" value={product.specs.body} />
                )}
                {product.specs.features && (
                  <SpecRow label="Features" value={product.specs.features} />
                )}
              </div>
            </div>

            {/* About this product */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4">About This Product</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{product.description}</p>

              {/* Manufacturing trust bar */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">25+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Years Manufacturing</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">ISI</p>
                  <p className="text-xs text-slate-500 mt-0.5">Quality Certified</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">MP+MH</p>
                  <p className="text-xs text-slate-500 mt-0.5">Active Markets</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bulk Order Inquiry form ───────────────────────────────────── */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Place a Bulk Order Inquiry</h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    For dealers, distributors, and institutional buyers. Get exclusive pricing instantly.
                  </p>
                </div>
              </div>

              <BulkInquiryForm productName={product.name} />
            </div>
          </div>
        </main>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">
                More {isLithium ? "Lithium-Ion" : "Lead Acid"} Torches
              </h2>
              <Link
                href="/#products"
                className="text-sm font-semibold text-green-600 hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                    {rp.image ? (
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {rp.specs.batteryCapacity ?? rp.category}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors mb-1">
                      {rp.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">{rp.tagline}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                      <span className="text-base font-black text-slate-900">
                        {rp.pricingTiers[0].price}
                      </span>
                      <span className="text-xs font-semibold text-green-600 group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer strip ─────────────────────────────────────────────────── */}
        <footer className="mt-16 border-t border-slate-200 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} KAG Batteries, Indore. All rights reserved.</p>
            <Link href="/#products" className="text-green-600 font-medium hover:underline">
              ← View All Products
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
