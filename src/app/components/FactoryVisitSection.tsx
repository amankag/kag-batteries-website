"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FactoryVisitSection.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useLanguage, type Language } from "./LanguageContext";

type GalleryImage = { src: string; alt: string; caption: string };

const chapters: Record<Language, readonly [string, string][]> = {
  en: [
    ["01", "INDORE · THE FACTORY"],
    ["02", "THE PEOPLE BEHIND IT"],
    ["03", "PRODUCTION IN MOTION"],
    ["04", "PACKED TO GO"],
  ],
  hi: [
    ["01", "इंदौर · फैक्ट्री"],
    ["02", "इसके पीछे के लोग"],
    ["03", "उत्पादन जारी"],
    ["04", "भेजने को तैयार"],
  ],
};

const productionImages: Record<Language, GalleryImage[]> = {
  en: [
    {
      src: "/factory-2.jpg",
      alt: "KAG Batteries factory team working across the production floor",
      caption: "A working production floor",
    },
    {
      src: "/images/Copy of IMG_5910.jpg",
      alt: "Workers inspecting components beside moulding equipment",
      caption: "Components handled and checked",
    },
    {
      src: "/images/Copy of IMG_5917.jpg",
      alt: "KAG Batteries assembly team working with battery components",
      caption: "Hands-on assembly",
    },
  ],
  hi: [
    {
      src: "/factory-2.jpg",
      alt: "प्रोडक्शन फ्लोर पर काम करती KAG बैटरीज़ की टीम",
      caption: "काम करता प्रोडक्शन फ्लोर",
    },
    {
      src: "/images/Copy of IMG_5910.jpg",
      alt: "मोल्डिंग उपकरण के पास पुर्ज़ों की जांच करते कर्मचारी",
      caption: "पुर्ज़ों की जांच और संभाल",
    },
    {
      src: "/images/Copy of IMG_5917.jpg",
      alt: "बैटरी के पुर्ज़ों के साथ काम करती KAG बैटरीज़ असेंबली टीम",
      caption: "हाथ से असेंबली",
    },
  ],
};

const finalImages: Record<Language, GalleryImage[]> = {
  en: [
    {
      src: "/images/Copy of IMG_6000.jpg",
      alt: "A worker securing a packed KAG Batteries shipment",
      caption: "Packed for dispatch",
    },
    {
      src: "/images/Copy of IMG_5876.jpg",
      alt: "Wide view of the torch manufacturing floor",
      caption: "Taking shape",
    },
    {
      src: "/images/Copy of IMG_5877.jpg",
      alt: "Components and cartons organised on the factory floor",
      caption: "Production at scale",
    },
  ],
  hi: [
    {
      src: "/images/Copy of IMG_6000.jpg",
      alt: "पैक की गई KAG बैटरीज़ की खेप बांधता एक कर्मचारी",
      caption: "भेजने के लिए पैक",
    },
    {
      src: "/images/Copy of IMG_5876.jpg",
      alt: "टॉर्च निर्माण फ्लोर का विस्तृत दृश्य",
      caption: "आकार लेते हुए",
    },
    {
      src: "/images/Copy of IMG_5877.jpg",
      alt: "फैक्ट्री फ्लोर पर व्यवस्थित पुर्ज़े और कार्टन",
      caption: "बड़े स्तर पर उत्पादन",
    },
  ],
};

const copy = {
  en: {
    meta: "INSIDE KAG BATTERIES",
    metaSub: "REAL PEOPLE. REAL PRODUCTION.",
    opening: {
      eyebrow: "01 — INDORE, MADHYA PRADESH",
      title: (
        <>
          COME INSIDE.
          <br />
          <em>SEE HOW TORCHES ARE MADE.</em>
        </>
      ),
      support: "One factory. Real machines. Real people. Made with pride in Indore.",
      scrollEntry: "SCROLL TO STEP INSIDE",
    },
    founders: {
      eyebrow: "02 — THE PEOPLE BEHIND IT",
      title: (
        <>
          IT STARTED WITH
          <br />
          <em>A SIMPLE PROMISE.</em>
        </>
      ),
      support:
        "Build a torch a farmer can afford. Our founders come from a farming family—they know those needs first-hand, and this factory still builds for them every day.",
      photoLabel: "KAG BATTERIES · THE FOUNDERS",
      statement: ["TWO FOUNDERS.", "ONE FACTORY.", "A TEAM THAT KEEPS MOVING FORWARD."],
    },
    production: {
      eyebrow: "03 — THE FACTORY FLOOR",
      title: (
        <>
          WHERE EVERY TORCH
          <br />
          <em>TAKES SHAPE.</em>
        </>
      ),
      support: "From moulded components to careful hands-on assembly.",
    },
    finale: {
      eyebrow: "04 — READY TO LEAVE INDORE",
      title: (
        <>
          MADE. CHECKED.
          <br />
          <em>PACKED TO GO.</em>
        </>
      ),
      support:
        "From the production floor to a growing network of dealers and retailers across Madhya Pradesh, Maharashtra and beyond.",
      cta: "Explore the complete range",
    },
    founderFallback: {
      src: "/images/Founder_pic.jpg",
      alt: "The two founders of KAG Batteries seated together",
      caption: "KAG Batteries founders",
    },
    founderAlt: "The two founders of KAG Batteries seated together",
    close: "Close",
  },
  hi: {
    meta: "KAG बैटरीज़ के अंदर",
    metaSub: "असली लोग. असली उत्पादन.",
    opening: {
      eyebrow: "01 — इंदौर, मध्य प्रदेश",
      title: (
        <>
          अंदर आइए।
          <br />
          <em>देखिए टॉर्च कैसे बनती है।</em>
        </>
      ),
      support: "एक फैक्ट्री। असली मशीनें। असली लोग। इंदौर में गर्व से बनाया गया।",
      scrollEntry: "अंदर जाने के लिए स्क्रॉल करें",
    },
    founders: {
      eyebrow: "02 — इसके पीछे के लोग",
      title: (
        <>
          शुरुआत हुई थी
          <br />
          <em>एक छोटे से वादे से।</em>
        </>
      ),
      support:
        "ऐसी टॉर्च बनाना जो हर किसान खरीद सके। हमारे संस्थापक खुद किसान परिवार से हैं—वे यह ज़रूरत खुद जानते हैं, और यह फैक्ट्री आज भी उन्हीं के लिए बनाती है।",
      photoLabel: "KAG बैटरीज़ · संस्थापक",
      statement: ["दो संस्थापक।", "एक फैक्ट्री।", "टीम जो लगातार आगे बढ़ती है।"],
    },
    production: {
      eyebrow: "03 — फैक्ट्री फ्लोर पर",
      title: (
        <>
          जहां हर टॉर्च
          <br />
          <em>आकार लेती है।</em>
        </>
      ),
      support: "ढले हुए पुर्ज़ों से लेकर सावधानी से हाथ से की गई असेंबली तक।",
    },
    finale: {
      eyebrow: "04 — इंदौर से रवाना होने को तैयार",
      title: (
        <>
          बना। जांचा।
          <br />
          <em>भेजने को तैयार।</em>
        </>
      ),
      support:
        "प्रोडक्शन फ्लोर से लेकर मध्य प्रदेश, महाराष्ट्र और उससे आगे तक फैले डीलर और रिटेलर नेटवर्क तक।",
      cta: "पूरी रेंज देखें",
    },
    founderFallback: {
      src: "/images/Founder_pic.jpg",
      alt: "KAG बैटरीज़ के दोनों संस्थापक साथ बैठे हुए",
      caption: "KAG बैटरीज़ के संस्थापक",
    },
    founderAlt: "KAG बैटरीज़ के दोनों संस्थापक साथ बैठे हुए",
    close: "बंद करें",
  },
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => {
  const x = clamp(n);
  return x * x * (3 - 2 * x);
};

export default function FactoryVisitSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const { language } = useLanguage();
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const t = copy[language];
  const currentChapters = chapters[language];
  const production = productionImages[language];
  const finals = finalImages[language];

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  const active = Math.min(3, Math.floor(progress * 4));
  const local = progress * 4 - active;
  const interior = active === 0 ? smooth((local - 0.16) / 0.62) : 1;
  const founderReveal =
    active === 1
      ? [smooth((local + 0.02) / 0.16), smooth((local - 0.06) / 0.18), smooth((local - 0.14) / 0.2)]
      : [0, 0, 0];
  const productionActive = Math.min(2, Math.floor(local * 3));

  const goToChapter = (index: number) => {
    const node = ref.current;
    if (!node) return;
    const top = window.scrollY + node.getBoundingClientRect().top;
    const travel = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((index + 0.06) / 4), behavior: "smooth" });
  };

  return (
    <section id="factory-visit" ref={ref} className={styles.track} aria-label="A visit inside the KAG Batteries factory">
      <div className={`${styles.stage} ${styles[`chapter${active + 1}`]}`}>
        <div className={styles.meta}>
          <span>{t.meta}</span>
          <p>{t.metaSub}</p>
          <b>{currentChapters[active][0]} / 04</b>
        </div>

        <nav className={styles.tabs} aria-label="Factory visit chapters">
          {currentChapters.map(([number, label], index) => (
            <button
              type="button"
              key={number}
              className={index === active ? styles.isActive : ""}
              onClick={() => goToChapter(index)}
            >
              <span>{number}</span>
              <small>{label}</small>
            </button>
          ))}
        </nav>

        <div className={styles.scene}>
          {active === 0 && (
            <section className={styles.opening}>
              <Image
                src="/hero-bg.jpg"
                alt="KAG Batteries factory in Indore"
                fill
                priority
                quality={92}
                sizes="(max-width: 760px) 250vw, 100vw"
                className={`${styles.openingPhoto} ${styles.exterior}`}
                style={{
                  opacity: 1 - interior,
                  transform: `scale(${1 + local * 0.085})`,
                }}
              />
              <Image
                src="/images/Copy of IMG_5876.jpg"
                alt=""
                aria-hidden="true"
                fill
                quality={92}
                sizes="(max-width: 760px) 250vw, 100vw"
                className={styles.openingPhoto}
                style={{
                  opacity: interior,
                  transform: `scale(${1.075 - interior * 0.075})`,
                }}
              />
              <div className={styles.openingScrim} aria-hidden="true" />
              <div className={styles.openingCopy} style={{ opacity: local < 0.78 ? 1 : clamp((1 - local) / 0.22) }}>
                <p>{t.opening.eyebrow}</p>
                <h1>{t.opening.title}</h1>
                <span>{t.opening.support}</span>
              </div>
              <div className={styles.scrollEntry}>
                {t.opening.scrollEntry} <i />
              </div>
            </section>
          )}

          {active === 1 && (
            <section className={styles.founders}>
              <div className={styles.chapterCopy}>
                <p>{t.founders.eyebrow}</p>
                <h1>{t.founders.title}</h1>
                <span>{t.founders.support}</span>
              </div>
              <div className={styles.founderMedia}>
                <button
                  type="button"
                  className={styles.founderPhoto}
                  onClick={() =>
                    setSelected({
                      src: t.founderFallback.src,
                      alt: t.founderFallback.alt,
                      caption: t.founderFallback.caption,
                    })
                  }
                >
                  <Image
                    src="/images/Founder_pic.jpg"
                    alt={t.founderAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 55vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span>
                    {t.founders.photoLabel} <b>↗</b>
                  </span>
                </button>
                <div className={styles.founderStatement}>
                  {t.founders.statement.map((line, index) => (
                    <strong
                      key={line}
                      className={index === 2 ? styles.teamLine : ""}
                      style={{ "--reveal": founderReveal[index] } as React.CSSProperties}
                    >
                      {line}
                    </strong>
                  ))}
                </div>
              </div>
            </section>
          )}

          {active === 2 && (
            <section className={styles.production}>
              <div className={styles.chapterCopy}>
                <p>{t.production.eyebrow}</p>
                <h1>{t.production.title}</h1>
                <span>{t.production.support}</span>
              </div>
              <div className={styles.photoDeck}>
                {production.map((image, index) => {
                  const d = index - productionActive;
                  return (
                    <button
                      type="button"
                      key={image.src}
                      className={index === productionActive ? styles.isActive : ""}
                      onClick={() => setSelected(image)}
                      style={
                        {
                          "--x": `${d * 16}%`,
                          "--y": `${d * 7}%`,
                          "--z": `${d * -90}px`,
                          "--rotate": `${d * -5}deg`,
                          "--scale": 1 - Math.min(1, Math.abs(d)) * 0.08,
                          "--opacity": 1 - Math.min(1, Math.abs(d)) * 0.52,
                        } as React.CSSProperties
                      }
                    >
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 50vw" style={{ objectFit: "cover" }} />
                      <span>
                        {image.caption}
                        <b>↗</b>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {active === 3 && (
            <section className={styles.finale}>
              <div className={styles.chapterCopy}>
                <p>{t.finale.eyebrow}</p>
                <h1>{t.finale.title}</h1>
                <span>{t.finale.support}</span>
                <Link href="/products">
                  {t.finale.cta} <b>↗</b>
                </Link>
              </div>
              <div className={styles.proofWall}>
                {finals.map((image, index) => (
                  <button
                    type="button"
                    key={image.src}
                    className={`${styles.proofPhoto} ${styles[`photo${index + 1}`]}`}
                    onClick={() => setSelected(image)}
                  >
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 45vw" style={{ objectFit: "cover" }} />
                    <span>
                      {image.caption}
                      <b>↗</b>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.progress} aria-hidden="true">
          <i style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {selected && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={selected.caption} onClick={() => setSelected(null)}>
          <button type="button" onClick={() => setSelected(null)} aria-label={t.close}>
            ×
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={selected.src} alt={selected.alt} width={1500} height={1000} style={{ width: "100%", height: "auto" }} />
            <figcaption>{selected.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
