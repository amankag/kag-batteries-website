"use client";

import Image from "next/image";
import Link from "next/link";
import { useImageRotator } from "./useImageRotator";

interface ShowcaseProduct {
  slug: string;
  name: string;
  image: string;
  benefit: string;
}

export default function FeaturedProductShowcase({ products }: { products: ShowcaseProduct[] }) {
  const { index, goTo, reducedMotion, pause, resume } = useImageRotator(products.length);
  const current = products[index];
  if (!current) return null;

  return (
    <div className="w-full">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#d9f36b]">Featured Model</p>

      <div className="relative mx-auto mt-4 w-[55vw] max-w-[240px]">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(217,243,107,0.3)_0%,rgba(217,243,107,0)_70%)] blur-xl" />
        <div aria-hidden="true" className="absolute -bottom-2 left-1/2 h-4 w-[65%] -translate-x-1/2 rounded-full bg-black/40 blur-lg" />

        <Link
          href={`/products/${current.slug}`}
          aria-label={`View ${current.name}`}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onFocus={pause}
          onBlur={resume}
          className="relative block aspect-square w-full"
        >
          {products.map((p, i) => (
            <Image
              key={p.slug}
              src={p.image}
              alt={p.name}
              fill
              priority={i === 0}
              className={`object-contain drop-shadow-[0_18px_16px_rgba(0,0,0,0.45)] ${
                reducedMotion ? "" : "transition-opacity duration-[600ms] ease-in-out"
              } ${i === index ? "opacity-100" : "opacity-0"}`}
              sizes="55vw"
            />
          ))}
        </Link>
      </div>

      <div className="mt-4 min-h-[3.25rem] text-center">
        <p className="line-clamp-1 text-lg font-bold text-white">{current.name}</p>
        <p className="mt-1 line-clamp-1 text-sm text-emerald-50/70">{current.benefit}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`Show ${p.name}`}
            onClick={() => {
              goTo(i);
              pause();
              resume();
            }}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-[#d9f36b]" : "w-1.5 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
