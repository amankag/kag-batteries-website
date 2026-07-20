"use client";

import Image from "next/image";
import Link from "next/link";
import { initialProducts, DEALER_WHATSAPP } from "@/data/products";

const featured = [initialProducts[0], initialProducts[1], initialProducts[2], initialProducts[3]];

function WhatsAppIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.01 2C6.49 2 2 6.49 2 12c0 1.76.46 3.41 1.27 4.88L2 22l5.28-1.23A9.96 9.96 0 0 0 12.01 22C17.52 22 22 17.51 22 12S17.52 2 12.01 2Zm0 18.2c-1.56 0-3.08-.42-4.4-1.21l-.31-.18-3.13.73.75-3.05-.2-.32A8.2 8.2 0 1 1 12.01 20.2Zm4.51-6.1c-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.3.19-.55.06-1.49-.74-2.47-1.32-3.45-2.98-.26-.45.26-.42.75-1.4.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.24 3.74 1.58.68 2.2.74 2.98.62.48-.07 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.1-.23-.16-.48-.29Z" /></svg>;
}

export default function Products() {
  return (
    <section id="products" className="bg-white py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">The range</p>
            <h2 className="font-display max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#071a1b] md:text-7xl">The right beam for every kind of night.</h2>
          </div>
          <div className="max-w-xs text-sm leading-6 text-slate-600">
            From 1,500m long-range Li-Ion torches to dependable lead-acid workhorses. Start with the range, then ask us for dealer pricing.
          </div>
        </div>

        <div className="grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[210px]" data-reveal>
          <article className="group relative overflow-hidden rounded-[1.75rem] bg-[#071a1b] md:col-span-2 md:row-span-2">
            <Image src={featured[0].image!} alt={featured[0].name} fill className="object-contain p-7 mix-blend-multiply transition duration-700 group-hover:scale-105 md:p-12" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a1b] via-[#071a1b]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-9">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#d9f36b]">Flagship long range</p>
              <h3 className="font-display text-4xl font-semibold tracking-[-0.03em]">{featured[0].name}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/65">{featured[0].specs.batteryCapacity} power, {featured[0].specs.beamDistance} reach, built for extended outdoor use.</p>
              <Link href={`/products/${featured[0].slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#d9f36b]">View model <span aria-hidden="true">↗</span></Link>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[1.75rem] bg-[#d9f36b] p-7 md:col-span-2">
            <div className="relative z-10 max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#071a1b]/60">For shops and distributors</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#071a1b]">A range that earns the next order.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#071a1b]/70">Clear MRP, factory-direct dealer tiers and models that cover everyday use through heavy-duty demand.</p>
              <Link href="/inquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#071a1b] transition hover:gap-3">Get dealer pricing <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="absolute -bottom-10 -right-4 h-44 w-44 rounded-full border-[28px] border-[#071a1b]/10 transition duration-700 group-hover:scale-125" />
          </article>

          {[featured[1], featured[2]].map((product) => (
            <article key={product.id} className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#f2f0ea] p-5 md:col-span-1">
              <div className="relative h-32 w-full md:h-28">
                {product.image ? <Image src={product.image} alt={product.name} fill className="object-contain p-1 mix-blend-multiply transition duration-700 group-hover:scale-110" sizes="180px" /> : null}
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{product.category === "lithium-ion" ? "Li-Ion" : "Lead acid"}</p>
                  <h3 className="mt-1 text-sm font-bold text-[#071a1b]">{product.name}</h3>
                </div>
                <a href={`https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(`Hi, I need dealer pricing for ${product.name}.`)}`} target="_blank" rel="noreferrer" aria-label={`Request a quote for ${product.name}`} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#071a1b] text-white transition hover:bg-emerald-700"><WhatsAppIcon /></a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6" data-reveal>
          <p className="text-sm text-slate-600">22 catalogue entries across lithium-ion and lead-acid ranges.</p>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#071a1b] transition hover:text-emerald-700">See the complete catalogue <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
