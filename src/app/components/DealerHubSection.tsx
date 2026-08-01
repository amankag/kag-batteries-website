"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DealerHubSection.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { DEALER_WHATSAPP } from "@/data/products";
import { useLanguage, type Language } from "./LanguageContext";

const chapters: Record<Language, readonly [string, string][]> = {
  en: [
    ["01", "BECOME A DEALER"],
    ["02", "TAKE IT TO YOUR COUNTER"],
  ],
  hi: [
    ["01", "डीलर बनें"],
    ["02", "अपने काउंटर तक ले जाएं"],
  ],
};

const copy = {
  en: {
    topline: "PARTNER WITH KAG",
    scene1: {
      eyebrow: "01 — FOR DEALERS & DISTRIBUTORS",
      title: (
        <>
          YOUR NEXT ORDER.
          <br />
          <em>MADE SIMPLE.</em>
        </>
      ),
      support: "Factory-direct pricing. Clear minimum order quantities. A team that answers on WhatsApp, not hold music.",
      ctaPrimary: "Start a dealer inquiry",
      ctaSecondary: "View the range",
      points: ["Factory-direct pricing", "24–48 hour dispatch", "Clear minimum order quantities", "Reorder on WhatsApp"],
    },
    scene2: {
      eyebrow: "02 — TAKE IT TO YOUR COUNTER",
      title: (
        <>
          PRINT IT. SHARE IT.
          <br />
          <em>SELL IT.</em>
        </>
      ),
      support: "Every model, every spec, one file—ready for your counter, your customers, or your buying team.",
      stats: ["17 models, one file", "Specs and price tiers", "Print-ready for the counter"],
      ctaPrimary: "Download product PDF",
      ctaSecondary: "Ask for it on WhatsApp",
    },
    deckAlts: ["Champion torch spec sheet", "Tiger KB-81 torch spec sheet", "Venus KB-68 torch spec sheet"],
  },
  hi: {
    topline: "काग के साथ पार्टनरशिप",
    scene1: {
      eyebrow: "01 — डीलर और डिस्ट्रिब्यूटर्स के लिए",
      title: (
        <>
          आपका अगला ऑर्डर।
          <br />
          <em>अब आसान।</em>
        </>
      ),
      support: "फैक्ट्री से सीधी कीमत। साफ़ न्यूनतम ऑर्डर मात्रा। टीम जो WhatsApp पर जवाब देती है, होल्ड म्यूज़िक नहीं।",
      ctaPrimary: "डीलर पूछताछ शुरू करें",
      ctaSecondary: "रेंज देखें",
      points: ["फैक्ट्री से सीधी कीमत", "24–48 घंटे में डिस्पैच", "साफ़ न्यूनतम ऑर्डर मात्रा", "WhatsApp पर दोबारा ऑर्डर"],
    },
    scene2: {
      eyebrow: "02 — अपने काउंटर तक ले जाएं",
      title: (
        <>
          प्रिंट करें। शेयर करें।
          <br />
          <em>बेचें।</em>
        </>
      ),
      support: "हर मॉडल, हर स्पेक, एक फ़ाइल में—आपके काउंटर, ग्राहकों या खरीद टीम के लिए तैयार।",
      stats: ["17 मॉडल, एक फ़ाइल", "स्पेक्स और प्राइस टियर", "काउंटर के लिए प्रिंट-रेडी"],
      ctaPrimary: "प्रोडक्ट PDF डाउनलोड करें",
      ctaSecondary: "WhatsApp पर मांगें",
    },
    deckAlts: ["चैंपियन टॉर्च स्पेक शीट", "टाइगर KB-81 टॉर्च स्पेक शीट", "वीनस KB-68 टॉर्च स्पेक शीट"],
  },
};

const brochureDeckImages = [
  "/product-images/pdf-champion.jpg",
  "/product-images/pdf-tiger-kb-81.jpg",
  "/product-images/pdf-venus-kb-68.jpg",
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
  const { language } = useLanguage();
  const t = copy[language];
  const currentChapters = chapters[language];
  const [frontCard, setFrontCard] = useState(0);

  const active = Math.min(1, Math.floor(progress * 2));
  const local = progress * 2 - active;

  const pointReveal = t.scene1.points.map((_, i) => (active === 0 ? smooth((local - i * 0.14) / 0.24) : 1));
  const statReveal = t.scene2.stats.map((_, i) => (active === 1 ? smooth((local - i * 0.16) / 0.26) : 1));

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
          <span>{t.topline}</span>
          <b>{currentChapters[active][0]} / 02</b>
        </div>

        <div className={styles.beam} aria-hidden="true">
          <i style={{ width: `${(active + local + 0.08) * 50}%` }} />
          {currentChapters.map((item, index) => (
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
              <p>{t.scene1.eyebrow}</p>
              <h1>{t.scene1.title}</h1>
              <span>{t.scene1.support}</span>
              <div className={styles.ctaRow}>
                <Link href="/inquiry" className={styles.ctaPrimary}>
                  {t.scene1.ctaPrimary} <b aria-hidden="true">↗</b>
                </Link>
                <Link href="/products" className={styles.ctaSecondary}>
                  {t.scene1.ctaSecondary} <b aria-hidden="true">↗</b>
                </Link>
              </div>
            </div>

            <div className={styles.pointList}>
              {t.scene1.points.map((point, index) => (
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
              <p>{t.scene2.eyebrow}</p>
              <h1>{t.scene2.title}</h1>
              <span>{t.scene2.support}</span>

              <ul className={styles.statList}>
                {t.scene2.stats.map((stat, index) => (
                  <li key={stat} style={{ "--reveal": statReveal[index] } as React.CSSProperties}>
                    {stat}
                  </li>
                ))}
              </ul>

              <div className={styles.ctaRow}>
                <a href={BROCHURE_HREF} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                  {t.scene2.ctaPrimary} <b aria-hidden="true">↓</b>
                </a>
                <a href={WHATSAPP_BROCHURE_HREF} target="_blank" rel="noreferrer" className={styles.ctaSecondary}>
                  {t.scene2.ctaSecondary} <b aria-hidden="true">↗</b>
                </a>
              </div>
            </div>

            <div className={styles.brochureDeck}>
              {brochureDeckImages.map((src, index) => {
                const order = (index - frontCard + brochureDeckImages.length) % brochureDeckImages.length;
                const angle = [0, 1, -1][order];
                return (
                  <button
                    type="button"
                    key={src}
                    className={styles.deckCard}
                    onClick={() => setFrontCard(index)}
                    aria-label={`Bring ${t.deckAlts[index]} to the front`}
                    style={{ "--o": order, "--a": angle } as React.CSSProperties}
                  >
                    <Image src={src} alt={t.deckAlts[index]} fill sizes="(max-width: 760px) 70vw, 30vw" style={{ objectFit: "cover" }} />
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
