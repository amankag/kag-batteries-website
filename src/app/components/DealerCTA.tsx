import Link from "next/link";

const dealerPoints = ["Factory-direct pricing", "24–48 hour dispatch planning", "Clear MOQ and price tiers", "WhatsApp support for reorders"];

export default function DealerCTA() {
  return (
    <section id="become-dealer" className="bg-[#d9f36b] py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.05fr_.95fr] md:items-end md:gap-24">
          <div data-reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#071a1b]/60">For dealers and distributors</p>
            <h2 className="font-display max-w-3xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] text-[#071a1b] md:text-8xl">Make your next order a little easier.</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#071a1b]/70">Get the full range, current dealer pricing and a direct line to the KAG team. Tell us where you sell and what your customers ask for.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/inquiry" className="inline-flex items-center gap-3 rounded-full bg-[#071a1b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800">Start a dealer inquiry <span aria-hidden="true">↗</span></Link>
              <Link href="/products" className="inline-flex items-center gap-3 rounded-full border border-[#071a1b]/25 px-6 py-3.5 text-sm font-bold text-[#071a1b] transition hover:border-[#071a1b]">View the range <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <div className="border-t border-[#071a1b]/20" data-reveal>
            {dealerPoints.map((point, index) => (
              <div key={point} className="flex items-center justify-between gap-6 border-b border-[#071a1b]/20 py-5">
                <span className="font-display text-2xl font-semibold text-[#071a1b] md:text-3xl">{point}</span>
                <span className="text-sm text-[#071a1b]/55">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
