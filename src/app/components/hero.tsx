"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[calc(100svh-74px)] overflow-hidden bg-[#071a1b] text-white">
      <div className="absolute inset-0 -z-20">
        <Image src="/hero-bg.jpg" alt="KAG Batteries manufacturing facility in Indore" fill priority className="object-cover object-center opacity-60" sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_62%_42%,rgba(217,243,107,0.18),transparent_28%),linear-gradient(90deg,rgba(7,26,27,0.98)_0%,rgba(7,26,27,0.8)_48%,rgba(7,26,27,0.28)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-[#071a1b] to-transparent" />

      <div className="mx-auto grid min-h-[calc(100svh-74px)] max-w-[1440px] items-center gap-12 px-5 py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)] md:px-10 md:py-28">
        <div className="relative z-10 max-w-6xl">
          <p data-hero-line className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#d9f36b]">Manufactured in Indore since 1997</p>
          <h1 data-hero-line className="font-display max-w-6xl text-[clamp(3.25rem,7vw,7.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
            Light that keeps working <span className="inline-block align-[0.05em] text-[#d9f36b]">after dark.</span>
          </h1>
          <p data-hero-line className="mt-9 max-w-xl text-base leading-7 text-emerald-50/75 md:text-lg">
            KAG builds long-range rechargeable torches for farms, homes, shops and security teams. Reliable power, direct from the factory floor.
          </p>
          <div data-hero-line className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/products" className="inline-flex items-center gap-3 rounded-full bg-[#d9f36b] px-6 py-3.5 text-sm font-bold text-[#071a1b] transition hover:bg-white">
              Explore the catalogue <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/inquiry" className="inline-flex items-center gap-3 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#071a1b]">
              Talk to sales <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div data-hero-line className="mt-14 flex items-center gap-5 text-xs uppercase tracking-[0.17em] text-emerald-50/55">
            <span className="h-px w-12 bg-[#d9f36b]" />
            Built for long nights and hard use
          </div>
        </div>

        <div data-hero-line className="relative hidden min-h-[500px] md:block">
          <div className="absolute right-0 top-1/2 h-[430px] w-[min(34vw,500px)] -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/20 bg-black/20 shadow-2xl shadow-black/30">
            <Image src="/factory-1.jpg" alt="KAG Batteries factory production" fill className="object-cover opacity-80 mix-blend-luminosity" sizes="500px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a1b] via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-5">
              <p className="max-w-[190px] text-sm leading-5 text-white/80">From component selection to final dispatch, every batch is made to earn repeat orders.</p>
              <span className="font-display text-5xl font-semibold text-[#d9f36b]">25<span className="text-2xl">+</span></span>
            </div>
          </div>
          <div className="absolute -bottom-4 left-0 h-44 w-44 overflow-hidden rounded-[1.5rem] border-8 border-[#071a1b] bg-[#f2f0ea] shadow-xl">
            <Image src="/product-images/51d42876-58d1-4e6d-a7c6-c2d1bea7933a.png" alt="KAG KB-555 rechargeable torch" fill className="object-contain p-2 mix-blend-multiply" sizes="176px" />
          </div>
        </div>
      </div>
    </section>
  );
}
