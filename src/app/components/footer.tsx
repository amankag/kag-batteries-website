"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, type Language } from "./LanguageContext";

const exploreLinks: Record<Language, [string, string][]> = {
  en: [
    ["Catalogue", "/products"],
    ["Our Story", "/#about"],
    ["Why Us", "/#why-us"],
    ["Factory Tour", "/#factory-visit"],
  ],
  hi: [
    ["कैटलॉग", "/products"],
    ["हमारी कहानी", "/#about"],
    ["हमारी खासियत", "/#why-us"],
    ["फैक्ट्री टूर", "/#factory-visit"],
  ],
};

const workLinks: Record<Language, [string, string, boolean?][]> = {
  en: [
    ["Become a Dealer", "/#become-dealer"],
    ["Dealer inquiry", "/inquiry"],
    ["Reviews", "/#reviews"],
    ["Product PDF", "/brochures/kag batteries product poster.pdf", true],
  ],
  hi: [
    ["डीलर बनें", "/#become-dealer"],
    ["डीलर पूछताछ", "/inquiry"],
    ["समीक्षाएं", "/#reviews"],
    ["प्रोडक्ट PDF", "/brochures/kag batteries product poster.pdf", true],
  ],
};

const copy = {
  en: {
    tagline: "Long-range rechargeable torches made in Indore for people, shops and distribution partners across India.",
    explore: "Explore",
    work: "Work with us",
    sales: "Reach sales",
    address: "B-3, AKVN Industrial Area, Indore",
    rights: "All rights reserved.",
    tail: "Made for long nights.",
  },
  hi: {
    tagline: "इंदौर में बनी लॉन्ग-रेंज रिचार्जेबल टॉर्च — घर, दुकान और देश भर के डिस्ट्रिब्यूशन पार्टनर्स के लिए।",
    explore: "एक्सप्लोर करें",
    work: "हमारे साथ काम करें",
    sales: "सेल्स से संपर्क करें",
    address: "बी-3, एकेवीएन इंडस्ट्रियल एरिया, इंदौर",
    rights: "सर्वाधिकार सुरक्षित।",
    tail: "लंबी रातों के लिए बनाया गया।",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <footer className="bg-[#071a1b] py-10 text-white md:py-14">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-7 border-b border-white/15 pb-8 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8 md:pb-10">
          <div>
            <Link href="/" className="flex items-center gap-3"><span className="relative h-9 w-9 overflow-hidden rounded-xl bg-white"><Image src="/logo.png" alt="KAG Batteries" fill className="object-contain p-1" /></span><span className="font-display text-lg font-semibold tracking-[-0.02em]">KAG Batteries</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-50/60">{t.tagline}</p>
          </div>

          <div className="grid grid-cols-3 gap-5 md:contents">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">{t.explore}</p><div className="grid gap-2 text-xs text-emerald-50/70 md:text-sm">{exploreLinks[language].map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">{t.work}</p><div className="grid gap-2 text-xs text-emerald-50/70 md:text-sm">{workLinks[language].map(([label, href, external]) => external ? <a key={href} href={href} target="_blank" rel="noreferrer" className="hover:text-white">{label}</a> : <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">{t.sales}</p><div className="grid gap-2 text-xs text-emerald-50/70 md:text-sm"><a href="tel:+919826918636" className="hover:text-white">+91 98269 18636</a><a href="mailto:info@kagbatteries.in" className="hover:text-white">info@kagbatteries.in</a><p className="leading-5">{t.address}</p></div></div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-4 text-xs text-emerald-50/45 md:flex-row"><p>© {new Date().getFullYear()} KAG Batteries. {t.rights}</p><p>{t.tail}</p></div>
      </div>
    </footer>
  );
}
