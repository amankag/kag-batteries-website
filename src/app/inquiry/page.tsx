import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "./InquiryForm";

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
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-slate-950 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center gap-3 px-4 md:px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="ml-auto text-white font-semibold text-sm">KAG Batteries</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Hero section */}
        <div className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase mb-4">
            Dealer & Distributor Inquiry
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            Partner with KAG Batteries
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Manufacturing premium LED torches since 1997 in Indore. Direct factory pricing for dealers and distributors across Madhya Pradesh and Maharashtra.
          </p>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { stat: "25+", label: "Years of manufacturing" },
            { stat: "17+", label: "Torch models in range" },
            { stat: "2 hrs", label: "WhatsApp response time" },
          ].map((item) => (
            <div
              key={item.stat}
              className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-black text-slate-900">{item.stat}</p>
              <p className="text-xs text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
          <div className="flex items-start gap-4 mb-7">
            <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Submit Your Inquiry</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Fill in your details and select the products you're interested in. We'll send you our dealer price list on WhatsApp within 2 hours.
              </p>
            </div>
          </div>

          <InquiryForm />
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By submitting, you agree to be contacted on WhatsApp by KAG Batteries, Indore.
          Your information is kept confidential.
        </p>
      </main>
    </div>
  );
}
