"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DealerHubSection.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { DEALER_WHATSAPP } from "@/data/products";

const chapters = [
  ["01", "BECOME A DEALER"],
  ["02", "TAKE IT TO YOUR COUNTER"],
] as const;

const dealerPoints = [
  "Factory-direct pricing",
  "24–48 hour dispatch",
  "Clear MOQs, no surprises",
  "Reorder on WhatsApp",
];

const brochureStats = ["17 models, one file", "Specs and price tiers", "Print-ready for the counter"];

const brochureDeck = [
  { src: "/product-images/pdf-champion.jpg", alt: "Champion torch spec sheet" },
  { src: "/product-images/pdf-tiger-kb-81.jpg", alt: "Tiger KB-81 torch spec sheet" },
  { src: "/product-images/pdf-venus-kb-68.jpg", alt: "Venus KB-68 torch spec sheet" },
];

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => {
  const x = clamp(n);
  return x * x * (3 - 2 * x);
};

const BROCHURE_HREF = "/brochures/kag batteries product poster.pdf";
const WHATSAPP_BROCHURE_HREF = `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(
  "Hi KAG Batteries, please share the product brochure."
)}`;

export default function DealerHubSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [frontCard, setFrontCard] = useState(0);

  const active = Math.min(1, Math.floor(progress * 2));
  const local = progress * 2 - active;

  const pointReveal = dealerPoints.map((_, i) => (active === 0 ? smooth((local - i * 0.14) / 0.24) : 1));
  const statReveal = brochureStats.map((_, i) => (active === 1 ? smooth((local - i * 0.16) / 0.26) : 1));

  const goToChapter = (index: number) => {
    const node = ref.current;
    if (!node) return;
    const top = window.scrollY + node.getBoundingClientRect().top;
    const travel = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((index + 0.08) / 2), behavior: "smooth" });
  };

  return (
    <section id="become-dealer" ref={ref} className={styles.track} aria-label="Become a KAG dealer and get the product brochure">
      <div className={`${styles.stage} ${styles[`scene${active + 1}`]}`}>
        <div className={styles.topline}>
          <span>PARTNER WITH KAG</span>
          <b>{chapters[active][0]} / 02</b>
        </div>

        <div className={styles.beam} aria-hidden="true">
          <i style={{ width: `${(active + local + 0.08) * 50}%` }} />
          {chapters.map((item, index) => (
            <button
              type="button"
              key={item[0]}
              className={index === active ? styles.isActive : index < active ? styles.isPassed : ""}
              onClick={() => goToChapter(index)}
              aria-label={`Go to chapter ${item[0]}: ${item[1]}`}
            >
              <span>{item[0]}</span>
            </button>
          ))}
        </div>

        {active === 0 && (
          <section className={styles.scene1Content}>
            <div className={styles.copy}>
              <p>01 — FOR DEALERS &amp; DISTRIBUTORS</p>
              <h1>
                YOUR NEXT ORDER.
                <br />
                <em>MADE SIMPLE.</em>
              </h1>
              <span>Factory-direct pricing. Clear MOQs. A team that answers on WhatsApp, not hold music.</span>
              <div className={styles.ctaRow}>
                <Link href="/inquiry" className={styles.ctaPrimary}>
                  Start a dealer inquiry <b aria-hidden="true">↗</b>
                </Link>
                <Link href="/products" className={styles.ctaSecondary}>
                  View the range <b aria-hidden="true">↗</b>
                </Link>
              </div>
            </div>

            <div className={styles.pointList}>
              {dealerPoints.map((point, index) => (
                <div
                  key={point}
                  className={styles.pointRow}
                  style={{ "--reveal": pointReveal[index] } as React.CSSProperties}
                >
                  <span>{point}</span>
                  <b>0{index + 1}</b>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === 1 && (
          <section className={styles.scene2Content}>
            <div className={styles.copy}>
              <p>02 — TAKE IT TO YOUR COUNTER</p>
              <h1>
                PRINT IT. SHARE IT.
                <br />
                <em>SELL IT.</em>
              </h1>
              <span>
                Every model, every spec, one file—ready for your counter, your customers, or your buying team.
              </span>

              <ul className={styles.statList}>
                {brochureStats.map((stat, index) => (
                  <li key={stat} style={{ "--reveal": statReveal[index] } as React.CSSProperties}>
                    {stat}
                  </li>
                ))}
              </ul>

              <div className={styles.ctaRow}>
                <a href={BROCHURE_HREF} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                  Download product PDF <b aria-hidden="true">↓</b>
                </a>
                <a href={WHATSAPP_BROCHURE_HREF} target="_blank" rel="noreferrer" className={styles.ctaSecondary}>
                  Ask for it on WhatsApp <b aria-hidden="true">↗</b>
                </a>
              </div>
            </div>

            <div className={styles.brochureDeck}>
              {brochureDeck.map((item, index) => {
                const order = (index - frontCard + brochureDeck.length) % brochureDeck.length;
                const angle = [0, 1, -1][order];
                return (
                  <button
                    type="button"
                    key={item.src}
                    className={styles.deckCard}
                    onClick={() => setFrontCard(index)}
                    aria-label={`Bring ${item.alt} to the front`}
                    style={{ "--o": order, "--a": angle } as React.CSSProperties}
                  >
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 70vw, 30vw" style={{ objectFit: "cover" }} />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <div className={styles.progress} aria-hidden="true">
          <i style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
