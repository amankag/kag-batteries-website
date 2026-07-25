"use client";

import Image from "next/image";
import Link from "next/link";
import { initialProducts } from "@/data/products";
import RotatingHeroImage from "./RotatingHeroImage";
import FeaturedProductShowcase from "./FeaturedProductShowcase";

const HERO_ROTATION_SLUGS = [
  "kisan-sainik-model-kb-80",
  "tiger-model-kb-81",
  "jio-model-kb-88",
];

const heroProducts = HERO_ROTATION_SLUGS.map((slug) => initialProducts.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p?.image))
  .map((p) => ({
    slug: p!.slug,
    name: p!.name,
    image: p!.image!,
    benefit: p!.highlights[0] ?? p!.tagline,
  }));

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[calc(100svh-74px)] overflow-hidden bg-[#071a1b] text-white">
      <div className="absolute inset-0 -z-20">
        <Image src="/hero-bg.jpg" alt="KAG Batteries manufacturing facility in Indore" fill priority className="object-cover object-center opacity-60" sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_62%_42%,rgba(217,243,107,0.18),transparent_28%),linear-gradient(90deg,rgba(7,26,27,0.98)_0%,rgba(7,26,27,0.8)_48%,rgba(7,26,27,0.28)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-[#071a1b] to-transparent" />

      <div className="mx-auto grid min-h-[calc(100svh-74px)] max-w-[1440px] items-center gap-12 px-5 py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)] md:px-10 md:py-28">
        <div className="relative z-10 flex max-w-6xl flex-col">
          <p data-hero-line className="order-1 md:order-none mb-6 text-[13px] font-bold uppercase tracking-[0.24em] text-[#d9f36b] md:mb-8 md:text-xs md:font-semibold">Manufactured in Indore since 1997</p>
          <h1 data-hero-line className="font-display order-2 md:order-none max-w-6xl text-[clamp(3.6rem,7vw,7.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
            Light that keeps working <span className="inline-block align-[0.05em] text-[#d9f36b]">after dark.</span>
          </h1>
          <p data-hero-line className="order-3 md:order-none mt-9 hidden max-w-xl text-base leading-7 text-emerald-50/75 md:block md:text-lg">
            KAG builds long-range rechargeable torches for farms, homes, shops and security teams. Reliable power, direct from the factory floor.
          </p>
          <p data-hero-line className="order-3 md:order-none mt-4 text-base leading-6 text-emerald-50/75 md:hidden">
            Long-range rechargeable torches, direct from the factory.
          </p>
          <div data-hero-line className="order-4 mt-10 md:hidden">
            <FeaturedProductShowcase products={heroProducts} />
          </div>
          <div data-hero-line className="order-5 md:order-none mt-10 flex flex-wrap items-center gap-3">
            <Link href="/products" className="inline-flex items-center gap-3 rounded-full bg-[#d9f36b] px-6 py-3.5 text-sm font-bold text-[#071a1b] transition hover:bg-white">
              Explore the catalogue <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/inquiry" className="hidden items-center gap-3 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#071a1b] md:inline-flex">
              Talk to sales <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div data-hero-line className="order-6 md:order-none mt-14 flex items-center gap-5 text-xs uppercase tracking-[0.17em] text-emerald-50/55">
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
          <div className="absolute -bottom-4 left-0 h-44 w-44">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(217,243,107,0.35)_0%,rgba(217,243,107,0)_70%)] blur-2xl" />
            <div className="relative h-44 w-44 overflow-hidden rounded-[1.5rem] border-8 border-[#071a1b] bg-[#f2f0ea] shadow-xl">
              <RotatingHeroImage products={heroProducts} className="h-full w-full p-2" sizes="176px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
