import Link from "next/link";

const TRUST_STATS = [
  { stat: "1997", label: "Est. in Indore" },
  { stat: "17+", label: "Torch models" },
  { stat: "500+", label: "Active dealers" },
  { stat: "MP + MH", label: "Distribution" },
];

const DEALER_BENEFITS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Factory-Direct Pricing",
    desc: "No middlemen. Direct from our Indore factory to your shop.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Fast Dispatch",
    desc: "Order today, dispatched within 24-48 hours from our warehouse.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality Guaranteed",
    desc: "25+ years manufacturing expertise. Every batch tested before dispatch.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "WhatsApp Support",
    desc: "Direct line to our sales team. Reorder, track, enquire — all on WhatsApp.",
  },
];

export default function DealerCTA() {
  return (
    <section id="become-dealer" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Trust stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {TRUST_STATS.map((item) => (
            <div
              key={item.stat}
              className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-3xl font-black text-white mb-1">{item.stat}</p>
              <p className="text-xs text-slate-400 font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Main CTA block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
              For Dealers & Distributors
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
              Grow Your Business with<br />
              <span className="text-green-400">KAG Batteries</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Join 500+ dealers across Madhya Pradesh and Maharashtra who trust KAG Batteries for quality, availability, and fair pricing. Our factory runs 6 days a week so you never face stockouts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 hover:bg-green-400 px-6 py-3.5 text-sm font-bold text-white transition shadow-lg shadow-green-900/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0117 21C6.68166 21 2.3457 16.5361 2.3457 11.0498C2.3457 5.54883 6.69141 1.09961 12.0264 1.09961C17.3662 1.09961 21.7119 5.54883 21.7119 11.0498C21.7119 16.5361 17.3662 21 12.0117 21ZM12.0117 2.19336C7.2793 2.19336 3.4082 6.16699 3.4082 11.0498C3.4082 15.9326 7.2793 19.9062 12.0117 19.9062C16.7441 19.9062 20.6494 15.9326 20.6494 11.0498C20.6494 6.16699 16.7441 2.19336 12.0117 2.19336ZM16.0391 14.7393C15.8633 15.2227 15.2422 15.4268 14.8145 15.3535C14.3311 15.2754 12.3086 14.7002 9.94434 12.2617C7.57031 9.81348 7.02344 7.73828 6.94043 7.24512C6.8623 6.81152 7.0625 6.18164 7.53125 5.99609C7.83887 5.86914 8.08203 5.87402 8.24219 5.89844C8.58398 5.92773 8.65723 5.94238 8.81836 6.32324C9.02344 6.80664 9.47754 7.91016 9.53125 8.02246C9.58496 8.14453 9.61426 8.28125 9.55566 8.42285C9.4873 8.56934 9.42383 8.65723 9.17969 8.91602C8.94043 9.1748 8.91602 9.22363 8.96973 9.38965C9.07715 9.71191 9.63867 10.8789 10.4541 11.7236C11.5137 12.8223 12.3926 13.0615 12.7295 13.1201C12.8906 13.1494 12.9834 13.0908 13.208 12.8418C13.4668 12.5488 13.7842 12.085 13.9111 11.9678C14.0723 11.8164 14.248 11.8311 14.4336 11.9092C14.624 11.9824 15.6592 12.4951 15.8691 12.6074C16.0889 12.7148 16.2305 12.7686 16.2939 12.876C16.3574 12.9834 16.3574 13.4717 16.0391 14.7393Z" />
                </svg>
                Become a Dealer — Inquire Now
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 hover:border-white/40 px-6 py-3.5 text-sm font-bold text-white transition"
              >
                View Full Catalogue →
              </Link>
            </div>
          </div>

          {/* Right: Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DEALER_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-3">
                  {b.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
