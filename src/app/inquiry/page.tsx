import type { Metadata } from "next";
import InquiryForm from "./InquiryForm";
import Header from "../components/header";
import Footer from "../components/footer";
import { LanguageProvider } from "../components/LanguageContext";

export const metadata: Metadata = {
  title: "Dealer / Bulk Order Inquiry – KAG Batteries | Torch Manufacturer Indore",
  description:
    "Become a KAG Batteries dealer or place a bulk order. Fill in your details and we'll respond within 2 hours on WhatsApp. Manufacturer direct pricing for distributors across MP & Maharashtra.",
  keywords:
    "KAG Batteries dealer inquiry, torch distributor Indore, LED torch bulk order, rechargeable torch wholesaler MP Maharashtra",
  openGraph: {
    title: "Dealer Inquiry – KAG Batteries",
    description:
      "Join KAG Batteries' dealer network. Manufacturer-direct pricing for distributors across Madhya Pradesh & Maharashtra.",
    type: "website",
    siteName: "KAG Batteries",
  },
};

export default function InquiryPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f2f0ea]">
        <Header />
        <main>
          <section className="bg-[#071a1b] py-24 text-white md:py-32">
            <div className="mx-auto max-w-[1440px] px-5 md:px-10">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#d9f36b]">Dealer and distributor partnership</p>
              <h1 className="font-display max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-8xl">Let&apos;s put the right range in your market.</h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-emerald-50/65 md:text-lg">Share a few details about your business and territory. We will follow up with the most relevant models, pricing tiers and next steps.</p>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="mx-auto max-w-[920px] px-5 md:px-10">
              <div className="mb-10 grid grid-cols-3 gap-3 border-y border-slate-300 py-5 text-center md:text-left">
                <div><p className="font-display text-3xl font-semibold text-[#071a1b]">25+</p><p className="mt-1 text-xs text-slate-500">years of manufacturing</p></div>
                <div><p className="font-display text-3xl font-semibold text-[#071a1b]">22</p><p className="mt-1 text-xs text-slate-500">catalogue entries</p></div>
                <div><p className="font-display text-3xl font-semibold text-[#071a1b]">2 hrs</p><p className="mt-1 text-xs text-slate-500">typical response window</p></div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(7,26,27,0.08)] md:p-10">
                <div className="mb-8"><h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#071a1b]">Tell us about your business.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Required fields help us share a useful response instead of a generic catalogue.</p></div>
                <InquiryForm />
              </div>
              <p className="mt-5 text-center text-xs leading-5 text-slate-500">By submitting, you agree to be contacted by KAG Batteries, Indore. Your information is kept confidential.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
