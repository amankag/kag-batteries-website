import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#071a1b] py-14 text-white md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3"><span className="relative h-10 w-10 overflow-hidden rounded-xl bg-white"><Image src="/logo.png" alt="KAG Batteries" fill className="object-contain p-1" /></span><span className="font-display text-xl font-semibold tracking-[-0.02em]">KAG Batteries</span></Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-emerald-50/60">Long-range rechargeable torches made in Indore for people, shops and distribution partners across India.</p>
          </div>
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">Explore</p><div className="grid gap-3 text-sm text-emerald-50/70"><Link href="/products" className="hover:text-white">Catalogue</Link><Link href="/#about" className="hover:text-white">The company</Link><Link href="/#factory-visit" className="hover:text-white">Factory proof</Link></div></div>
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">Work with us</p><div className="grid gap-3 text-sm text-emerald-50/70"><Link href="/inquiry" className="hover:text-white">Dealer inquiry</Link><Link href="/#contact" className="hover:text-white">Bulk orders</Link><a href="/brochures/kag batteries product poster.pdf" className="hover:text-white">Product PDF</a></div></div>
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">Reach sales</p><div className="grid gap-3 text-sm text-emerald-50/70"><a href="tel:+919826918636" className="hover:text-white">+91 98269 18636</a><a href="mailto:info@kagbatteries.in" className="hover:text-white">info@kagbatteries.in</a><p>B-3, AKVN Industrial Area, Indore</p></div></div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-5 text-xs text-emerald-50/45 md:flex-row"><p>© {new Date().getFullYear()} KAG Batteries. All rights reserved.</p><p>Made for long nights.</p></div>
      </div>
    </footer>
  );
}
