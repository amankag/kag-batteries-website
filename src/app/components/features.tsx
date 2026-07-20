"use client";

import { useState } from "react";

const reasons = [
  { title: "Designed for hard use", body: "Strong bodies, focused reflectors and battery systems selected for long working hours in farms, shops and security work." },
  { title: "Straight from Indore", body: "Talk directly to the team that makes the range. That keeps product answers, pricing and support close to the source." },
  { title: "A range with a role", body: "Every model has a clear job, from compact household backup to the KB-555 long-range flagship." },
  { title: "Built for repeat orders", body: "Consistent models, clear price ladders and practical packaging help a retailer sell the same product again." },
];

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#f2f0ea] py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 md:grid-cols-[.75fr_1.25fr] md:gap-24">
          <div data-reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Why KAG</p>
            <h2 className="font-display max-w-md text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#071a1b] md:text-6xl">Practical engineering. Human support.</h2>
            <p className="mt-7 max-w-sm text-base leading-7 text-slate-600">A good torch is a small product with a big responsibility. We make the decision easier for the people who depend on it.</p>
          </div>

          <div className="space-y-0 border-t border-slate-300" data-reveal>
            {reasons.map((reason, index) => (
              <button key={reason.title} type="button" onClick={() => setActive(index)} className={`group flex w-full items-start gap-5 border-b border-slate-300 py-6 text-left transition md:py-8 ${active === index ? "text-[#071a1b]" : "text-slate-500"}`}>
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition ${active === index ? "bg-emerald-700" : "bg-slate-300 group-hover:bg-emerald-500"}`} />
                <span className="flex-1">
                  <span className="block font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{reason.title}</span>
                  <span className={`block max-w-xl overflow-hidden text-sm leading-6 transition-all duration-500 ${active === index ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>{reason.body}</span>
                </span>
                <span className={`font-display text-2xl transition ${active === index ? "rotate-45 text-emerald-700" : "text-slate-400"}`}>+</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-24 overflow-hidden border-y border-[#071a1b]/15 py-5" data-reveal>
          <div className="kag-marquee flex min-w-max items-center gap-10 text-[clamp(1.8rem,4vw,4.5rem)] font-semibold uppercase tracking-[-0.04em] text-[#071a1b]">
            <span>Long range</span><span className="text-emerald-700">•</span><span>Strong backup</span><span className="text-emerald-700">•</span><span>Factory direct</span><span className="text-emerald-700">•</span><span>Made in Indore</span><span className="text-emerald-700">•</span>
            <span>Long range</span><span className="text-emerald-700">•</span><span>Strong backup</span><span className="text-emerald-700">•</span><span>Factory direct</span><span className="text-emerald-700">•</span><span>Made in Indore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
