"use client";

import styles from "./TestimonialsSection.module.css";
import { useScrollProgress } from "./useScrollProgress";

const reviews = [
  {
    name: "Ramesh Patil",
    role: "Hardware Store Owner",
    place: "Nashik, Maharashtra",
    quote:
      "KAG torches we are selling since many years. Quality is genuine, customers never come back with complaint. This is why we trust only KAG.",
  },
  {
    name: "Sunita Deshmukh",
    role: "Electrical Distributor",
    place: "Pune, Maharashtra",
    quote:
      "Best part is delivery on time, every time. Whatever quantity we order, KAG team manages it without any tension. Very professional people.",
  },
  {
    name: "Rajendra Yadav",
    role: "Wholesale Dealer",
    place: "Indore, Madhya Pradesh",
    quote:
      "Direct from factory, so pricing is always fair. My customers ask for KAG by name now—that itself shows the trust we have built together.",
  },
  {
    name: "Anil Kumar Sharma",
    role: "Retail Shop Owner",
    place: "Bhopal, Madhya Pradesh",
    quote:
      "In villages also, power cut is common problem. KAG torch is first choice for farmers here—battery backup is superb and price is right for them.",
  },
  {
    name: "Farida Sheikh",
    role: "General Store Owner",
    place: "Aurangabad, Maharashtra",
    quote:
      "Whenever I message on WhatsApp, reply comes fast, no waiting. Small shop like mine, they treat us with same respect as big dealer. That means a lot.",
  },
];

export default function TestimonialsSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();

  const raw = progress * reviews.length;
  const active = Math.min(reviews.length - 1, Math.floor(raw));

  const goTo = (index: number) => {
    const node = ref.current;
    if (!node) return;
    const top = window.scrollY + node.getBoundingClientRect().top;
    const travel = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((index + 0.08) / reviews.length), behavior: "smooth" });
  };

  return (
    <section
      id="reviews"
      ref={ref}
      className={styles.track}
      style={{ height: `${reviews.length * 68}vh` }}
      aria-label="What dealers and shop owners say about KAG"
    >
      <div className={styles.stage}>
        <div className={styles.topline}>
          <span>FROM THE COUNTER</span>
          <b>
            {String(active + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
          </b>
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <p>REAL DEALERS. REAL WORDS.</p>
            <h2>
              Made to be <em>recommended.</em>
            </h2>
            <span className={styles.headingBody}>
              From Indore to the counters of Maharashtra and Madhya Pradesh—what the people who sell KAG every day
              have to say.
            </span>

            <div className={styles.dots}>
              {reviews.map((review, index) => (
                <button
                  type="button"
                  key={review.name}
                  className={index === active ? styles.isActive : index < active ? styles.isPassed : ""}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${review.name}'s review`}
                />
              ))}
            </div>
          </div>

          <div className={styles.cards}>
          {reviews.map((review, index) => {
            const pos = raw - index;
            // Hold each card at full opacity for most of its dwell time and
            // only blend during a short window at the edge, so consecutive
            // cards never both sit at a legibility-killing half-opacity.
            const fade = Math.min(1, Math.max(0, (Math.abs(pos) - 0.62) / 0.38));
            const isCurrent = index === active;

            return (
              <figure
                key={review.name}
                className={styles.card}
                style={{ "--pos": pos, "--fade": fade } as React.CSSProperties}
                aria-hidden={!isCurrent}
              >
                <span className={styles.quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <div className={styles.stars} aria-hidden="true">
                  {"★★★★★"}
                </div>
                <blockquote>{review.quote}</blockquote>
                <figcaption>
                  <span className={styles.avatar} aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <b>{review.name}</b>
                    <small>
                      {review.role} · {review.place}
                    </small>
                  </span>
                </figcaption>
              </figure>
            );
          })}
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <i style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
