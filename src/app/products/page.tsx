import type { Metadata } from "next";
import { initialProducts } from "@/data/products";
import ProductCatalogueClient from "./ProductCatalogueClient";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "All Torch Models – KAG Batteries | LED Torch Manufacturer Indore",
  description:
    "Browse all 22 KAG Batteries catalogue entries. Lithium-Ion and Lead Acid rechargeable torches for dealers and distributors. Factory-direct pricing from Indore. Bulk orders welcome.",
  keywords:
    "KAG Batteries torch catalogue, LED torch manufacturer Indore, rechargeable torch dealer price, lithium ion torch wholesale, lead acid torch bulk order, torch distributor MP Maharashtra",
  openGraph: {
    title: "KAG Batteries – Complete Torch Catalogue",
    description:
      "22 catalogue entries across 2 technology ranges. Factory-direct pricing for dealers and distributors across MP & Maharashtra.",
    type: "website",
    siteName: "KAG Batteries",
  },
};

export default function ProductsPage() {
  const lithiumCount = initialProducts.filter((p) => p.category === "lithium-ion").length;
  const leadAcidCount = initialProducts.filter((p) => p.category === "lead-acid").length;

  return (
    <div className="min-h-screen bg-[#f2f0ea]">
      <Header />
      <main>
        <section className="bg-[#071a1b] py-24 text-white md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#d9f36b]">From the Indore factory</p>
            <h1 className="font-display max-w-6xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-8xl">A beam for every kind of night.</h1>
            <div className="mt-10 flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-3 text-sm text-emerald-50/65"><span>{initialProducts.length} models to compare</span><span>{lithiumCount} lithium-ion choices</span><span>{leadAcidCount} lead-acid workhorses</span></div>
          </div>
        </section>
        <ProductCatalogueClient products={initialProducts} />
      </main>
      <Footer />
    </div>
  );
}
