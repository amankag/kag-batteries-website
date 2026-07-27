import Image from "next/image";
import Link from "next/link";

const exploreLinks: [string, string][] = [
  ["Catalogue", "/products"],
  ["Our Story", "/#about"],
  ["Why Us", "/#why-us"],
  ["Factory Tour", "/#factory-visit"],
];

const workLinks: [string, string, boolean?][] = [
  ["Become a Dealer", "/#become-dealer"],
  ["Dealer inquiry", "/inquiry"],
  ["Reviews", "/#reviews"],
  ["Product PDF", "/brochures/kag batteries product poster.pdf", true],
];

export default function Footer() {
  return (
    <footer className="bg-[#071a1b] py-10 text-white md:py-14">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-7 border-b border-white/15 pb-8 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-8 md:pb-10">
          <div>
            <Link href="/" className="flex items-center gap-3"><span className="relative h-9 w-9 overflow-hidden rounded-xl bg-white"><Image src="/logo.png" alt="KAG Batteries" fill className="object-contain p-1" /></span><span className="font-display text-lg font-semibold tracking-[-0.02em]">KAG Batteries</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-50/60">Long-range rechargeable torches made in Indore for people, shops and distribution partners across India.</p>
          </div>

          <div className="grid grid-cols-3 gap-5 md:contents">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">Explore</p><div className="grid gap-2 text-xs text-emerald-50/70 md:text-sm">{exploreLinks.map(([label, href]) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">Work with us</p><div className="grid gap-2 text-xs text-emerald-50/70 md:text-sm">{workLinks.map(([label, href, external]) => external ? <a key={href} href={href} target="_blank" rel="noreferrer" className="hover:text-white">{label}</a> : <Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div></div>
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#d9f36b]">Reach sales</p><div className="grid gap-2 text-xs text-emerald-50/70 md:text-sm"><a href="tel:+919826918636" className="hover:text-white">+91 98269 18636</a><a href="mailto:info@kagbatteries.in" className="hover:text-white">info@kagbatteries.in</a><p className="leading-5">B-3, AKVN Industrial Area, Indore</p></div></div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-4 text-xs text-emerald-50/45 md:flex-row"><p>© {new Date().getFullYear()} KAG Batteries. All rights reserved.</p><p>Made for long nights.</p></div>
      </div>
    </footer>
  );
}
