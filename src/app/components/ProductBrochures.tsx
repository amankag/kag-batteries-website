export default function ProductBrochures() {
  return (
    <section id="brochures" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-[1fr_auto] md:items-center md:px-10" data-reveal>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Take it to your counter</p>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#071a1b] md:text-6xl">Download the range and share it with your buying team.</h2>
        </div>
        <a href="/brochures/kag batteries product poster.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#071a1b] px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-800">Download product PDF <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
