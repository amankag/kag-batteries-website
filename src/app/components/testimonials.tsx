const quotes = [
  ["A practical range for our customers", "The mix of long-range and household models makes it easier for us to recommend the right torch instead of forcing one product for every buyer.", "Retail partner, Madhya Pradesh"],
  ["A brand customers remember", "The products are easy to explain at the counter and the KAG team stays reachable when we need another batch.", "Distributor partner, Maharashtra"],
];

export default function Testimonials() {
  return (
    <section className="bg-[#f2f0ea] py-32 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-24" data-reveal>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">From the counter</p>
            <h2 className="font-display max-w-sm text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#071a1b]">Made to be recommended.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-slate-300 md:grid-cols-2">
            {quotes.map(([title, body, byline]) => (
              <figure key={title} className="bg-white p-7 md:p-10">
                <blockquote className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#071a1b]">“{title}.”</blockquote>
                <p className="mt-6 text-sm leading-6 text-slate-600">{body}</p>
                <figcaption className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">{byline}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
