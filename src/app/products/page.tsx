import type { Metadata } from "next";
import { initialProducts } from "@/data/products";
import ProductCatalogueClient from "./ProductCatalogueClient";
import Header from "../components/header";
import Footer from "../components/footer";
import { LanguageProvider } from "../components/LanguageContext";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Torches & Batteries – KAG Batteries | Manufacturer Indore",
  description:
    "Browse all 31 KAG Batteries catalogue entries — rechargeable LED torches plus standalone Kavery VRLA and liquid batteries. For dealers and distributors. Factory-direct pricing from Indore. Bulk orders welcome.",
  keywords:
    "KAG Batteries catalogue, LED torch manufacturer Indore, Kavery battery manufacturer, rechargeable torch dealer price, VRLA battery wholesale, lead acid torch bulk order, torch and battery distributor MP Maharashtra",
  openGraph: {
    title: "KAG Batteries – Torches & Batteries Catalogue",
    description:
      "31 catalogue entries across torches and standalone Kavery batteries. Factory-direct pricing for dealers and distributors across MP & Maharashtra.",
    type: "website",
    siteName: "KAG Batteries",
  },
};

export default function ProductsPage() {
  const torchCount = initialProducts.filter((p) => (p.productType ?? "torch") === "torch").length;
  const batteryCount = initialProducts.filter((p) => p.productType === "battery").length;

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f2f0ea]">
        <Header />
        <main>
          <section className="relative overflow-hidden bg-[#071a1b] py-12 text-white md:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className={styles.glowLime} />
              <div className={styles.glowOrange} />
            </div>
            <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d9f36b]">From the Indore factory</p>
              <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                <span className={styles.torchSweep}>Everything your shelf needs.</span> <span className="text-[#d9f36b]">One factory.</span>
              </h1>
              <div className="mt-5 flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-2 text-sm text-emerald-50/70"><span>{initialProducts.length} models to compare</span><span>{torchCount} rechargeable torches</span><span>{batteryCount} Kavery batteries</span></div>
            </div>
          </section>
          <ProductCatalogueClient products={initialProducts} />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
