"use client";

import Image from "next/image";

const proof = [
  ["1997", "Started in Indore"],
  ["22", "Catalogue entries"],
  ["MP + MH", "Core distribution"],
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-[#f2f0ea] py-32 md:py-48">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:grid-cols-[.8fr_1.2fr] md:gap-24 md:px-10">
        <div className="md:pt-10" data-reveal>
          <p className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">A dependable light source</p>
          <h2 className="font-display max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#071a1b] md:text-7xl">
            Built around the way India actually works.
          </h2>
          <p data-word-reveal className="mt-9 max-w-lg text-lg leading-8 text-slate-700">
            For more than two decades, KAG has made lighting products for people who cannot afford a light that quits early. Dust, heat, load shedding and long working hours are part of the brief.
          </p>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-3 border-t border-slate-300 pt-6">
            {proof.map(([value, label]) => (
              <div key={value}>
                <p className="font-display text-2xl font-semibold text-[#071a1b]">{value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12" data-reveal>
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-slate-900 md:col-span-8 md:row-span-2">
            <Image data-image-reveal src="/directors-1.jpg" alt="KAG Batteries leadership at the Indore facility" fill className="object-cover" sizes="(max-width: 768px) 65vw, 45vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24 text-white">
              <p className="text-sm font-semibold">A family-run manufacturer with a factory-first mindset.</p>
            </div>
          </div>
          <div className="relative min-h-[205px] overflow-hidden rounded-[1.75rem] bg-[#d9f36b] p-6 md:col-span-4">
            <p className="font-display text-6xl font-semibold leading-none text-[#071a1b]">1L+</p>
            <p className="mt-3 max-w-[130px] text-sm leading-5 text-[#071a1b]/70">units designed for everyday Indian use.</p>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-[1.75rem] bg-slate-900 md:col-span-4 md:min-h-[205px]">
            <Image data-image-reveal src="/factory-2.jpg" alt="KAG Batteries production floor" fill className="object-cover opacity-80" sizes="(max-width: 768px) 35vw, 22vw" />
            <div className="absolute inset-0 bg-[#071a1b]/40" />
            <p className="absolute bottom-5 left-5 right-5 text-sm font-semibold text-white">The standard is simple: charge, light, repeat.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
