"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import styles from "./WhyUsSection.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useCountUp } from "./useCountUp";
import { useLanguage, type Language } from "./LanguageContext";

const DISTRIBUTOR_COUNT = 120;
const RETAILER_COUNT = 300;

type Chapter = {
  number: string;
  label: string;
  title: React.ReactNode;
  summary: string;
};

const chapters: Record<Language, Chapter[]> = {
  en: [
    {
      number: "01",
      label: "TRUST, REFINED",
      title: (
        <>
          <span className={styles.headlineLock}>WE LISTEN.</span>
          <br />
          <span className={styles.headlineLock}>WE IMPROVE.</span>
          <br />
          <em className={styles.headlineLock}>WE REPEAT.</em>
        </>
      ),
      summary:
        "Dealers tell us what sells. Users tell us what lasts. Every batch of torches comes out a little better than the one before.",
    },
    {
      number: "02",
      label: "BUILT RIGHT FOR INDIA",
      title: (
        <>
          <span className={styles.headlineLock}>PREMIUM INSIDE.</span>
          <br />
          <em className={styles.headlineLock}>TOUGH OUTSIDE.</em>
        </>
      ),
      summary:
        "Pure copper wiring, dependable batteries and a tough plastic body—chosen for farms, homes, shops and security work across Madhya Pradesh, Maharashtra and beyond.",
    },
    {
      number: "03",
      label: "TESTED HERE. TRUSTED EVERYWHERE",
      title: (
        <>
          THREE CHECKS.
          <br />
          {DISTRIBUTOR_COUNT}+ DISTRIBUTORS.
          <br />
          <em>STILL GROWING.</em>
        </>
      ),
      summary: `Checked three times before it ships—then carried by ${DISTRIBUTOR_COUNT}+ distributors and ${RETAILER_COUNT}+ retailers across MP, Maharashtra and beyond.`,
    },
  ],
  hi: [
    {
      number: "01",
      label: "भरोसा, हर बार निखरा",
      title: (
        <>
          <span className={styles.headlineLock}>हम सुनते हैं।</span>
          <br />
          <span className={styles.headlineLock}>हम सुधारते हैं।</span>
          <br />
          <em className={styles.headlineLock}>हम दोहराते हैं।</em>
        </>
      ),
      summary:
        "डीलर बताते हैं क्या बिकता है। ग्राहक बताते हैं क्या टिकता है। हर नई खेप पिछली से थोड़ी बेहतर होती है।",
    },
    {
      number: "02",
      label: "भारत के लिए सही बना",
      title: (
        <>
          <span className={styles.headlineLock}>अंदर से प्रीमियम।</span>
          <br />
          <em className={styles.headlineLock}>बाहर से मज़बूत।</em>
        </>
      ),
      summary:
        "शुद्ध कॉपर वायरिंग, भरोसेमंद बैटरी और मज़बूत प्लास्टिक बॉडी—मध्य प्रदेश, महाराष्ट्र और उससे आगे तक, खेत, घर, दुकान और सुरक्षा के काम के लिए चुनी गई।",
    },
    {
      number: "03",
      label: "यहां जांचा। हर जगह भरोसा।",
      title: (
        <>
          तीन बार जांच।
          <br />
          {DISTRIBUTOR_COUNT}+ डिस्ट्रिब्यूटर्स।
          <br />
          <em>बढ़ना जारी।</em>
        </>
      ),
      summary: `भेजने से पहले तीन बार जांचा जाता है—फिर मध्य प्रदेश, महाराष्ट्र और उससे आगे तक ${DISTRIBUTOR_COUNT}+ डिस्ट्रिब्यूटर्स और ${RETAILER_COUNT}+ रिटेलर्स तक पहुंचता है।`,
    },
  ],
};

const materialCards: Record<Language, [string, string, string][]> = {
  en: [
    ["01", "Pure copper wiring", "Carries power reliably"],
    ["02", "Dependable batteries", "Chosen for long working hours"],
    ["03", "Tough plastic body", "Made for rough daily handling"],
  ],
  hi: [
    ["01", "शुद्ध कॉपर वायरिंग", "भरोसे के साथ पावर पहुंचाए"],
    ["02", "भरोसेमंद बैटरी", "लंबे काम के घंटों के लिए चुनी गई"],
    ["03", "मज़बूत प्लास्टिक बॉडी", "रोज़ के सख्त इस्तेमाल के लिए बनी"],
  ],
};

const demandCards: Record<Language, [string, string][]> = {
  en: [
    ["FARMS", "Field checks"],
    ["HOMES", "Power backup"],
    ["SHOPS", "Long work hours"],
    ["SECURITY", "Night rounds"],
  ],
  hi: [
    ["खेत", "फील्ड जांच"],
    ["घर", "पावर बैकअप"],
    ["दुकान", "लंबे काम के घंटे"],
    ["सुरक्षा", "रात की गश्त"],
  ],
};

const loopFrames: Record<Language, [string, string][]> = {
  en: [
    ["STEP 01", "LISTEN"],
    ["STEP 02", "IMPROVE"],
    ["STEP 03", "REFINE"],
    ["STEP 04", "TEST"],
    ["ONE LOOP", "EVERY BATCH"],
  ],
  hi: [
    ["चरण 01", "सुनना"],
    ["चरण 02", "सुधार"],
    ["चरण 03", "निखार"],
    ["चरण 04", "जांच"],
    ["एक लूप", "हर खेप में"],
  ],
};

const testGates: Record<Language, [string, string, string][]> = {
  en: [
    ["01", "Material quality", "Wiring, battery and body checked"],
    ["02", "Repeated charging", "Checked through charge and use cycles"],
    ["03", "Final working check", "Light output, switch and finish checked"],
  ],
  hi: [
    ["01", "मटीरियल क्वालिटी", "वायरिंग, बैटरी और बॉडी की जांच"],
    ["02", "बार-बार चार्जिंग", "चार्ज और उपयोग के कई राउंड में जांचा"],
    ["03", "फाइनल वर्किंग चेक", "रोशनी, स्विच और फिनिश की जांच"],
  ],
};

const visualCopy = {
  en: {
    orbitLabels: ["LISTEN", "IMPROVE", "REFINE", "TEST"],
    loopTag: "THE KAG LOOP",
    yearsTop: { small: "HEARD IN", strong: "THE FIELD", span: "DEALERS & USERS" },
    yearsBottom: { small: "FIXED ON", strong: "THE FLOOR", span: "NEXT BATCH" },
    inspectionHead: "WHAT GOES INSIDE A KAG TORCH",
    inspectionSub: "NO CHEAP SHORTCUTS",
    checkedBadge: "CHECKED",
    demandsEyebrow: "ONE RANGE. MANY NEEDS.",
    demandsHeadline: (
      <>
        MADE FOR THE WAY
        <br />
        INDIA ACTUALLY WORKS
      </>
    ),
    testsHeader: "EVERY TORCH MUST PASS",
    distributorsLabel: "DISTRIBUTORS",
    retailersLabel: "RETAILERS",
    networkCaption: ["MADE IN INDORE", "MP, MAHARASHTRA & BEYOND"],
    exploreRange: "Explore the range",
  },
  hi: {
    orbitLabels: ["सुनना", "सुधार", "निखार", "जांच"],
    loopTag: "काग लूप",
    yearsTop: { small: "सुना", strong: "हर सुझाव", span: "डीलर और ग्राहक से" },
    yearsBottom: { small: "सुधारा", strong: "फ्लोर पर", span: "अगली खेप में" },
    inspectionHead: "काग टॉर्च के अंदर क्या है",
    inspectionSub: "कोई सस्ता शॉर्टकट नहीं",
    checkedBadge: "जांचा गया",
    demandsEyebrow: "एक रेंज. कई ज़रूरतें.",
    demandsHeadline: <>भारत की ज़रूरत के हिसाब से बना।</>,
    testsHeader: "हर टॉर्च की जांच ज़रूरी",
    distributorsLabel: "डिस्ट्रिब्यूटर्स",
    retailersLabel: "रिटेलर्स",
    networkCaption: ["इंदौर में बना", "MP, महाराष्ट्र और उससे आगे"],
    exploreRange: "पूरी रेंज देखें",
  },
};

const toplineCopy: Record<Language, { eyebrow: string; sub: string }> = {
  en: { eyebrow: "WHY US", sub: "PROOF, NOT PROMISES." },
  hi: { eyebrow: "हम क्यों", sub: "सिर्फ़ वादे नहीं." },
};

const footWords: Record<Language, string[]> = {
  en: ["HEAR", "IMPROVE", "REFINE", "TEST"],
  hi: ["सुनना", "सुधार", "निखार", "जांच"],
};

function ChapterVisual({ active, language }: { active: number; language: Language }) {
  const distributorCount = useCountUp(active === 2, DISTRIBUTOR_COUNT);
  const retailerCount = useCountUp(active === 2, RETAILER_COUNT);
  const [demandIndex, setDemandIndex] = useState(0);
  const [loopIndex, setLoopIndex] = useState(0);
  const v = visualCopy[language];
  const demands = demandCards[language];
  const loops = loopFrames[language];

  useEffect(() => {
    if (active !== 1) return;
    const id = setInterval(() => setDemandIndex((i) => (i + 1) % demands.length), 1700);
    return () => clearInterval(id);
  }, [active, demands.length]);

  useEffect(() => {
    if (active !== 0) return;
    const id = setInterval(() => setLoopIndex((i) => (i + 1) % loops.length), 1500);
    return () => clearInterval(id);
  }, [active, loops.length]);

  if (active === 0) {
    return (
      <div className={styles.legacyVisual}>
        <div className={styles.legacyOrbitWrap}>
          <div className={styles.legacyOrbit} aria-hidden="true">
            <i /><i /><i /><i />
          </div>
          <div className={styles.legacyOrbitLabels} aria-hidden="true">
            {v.orbitLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className={styles.legacyCenter}>
            <span>{v.loopTag}</span>
            <div key={loops[loopIndex][1]} className={styles.centerFrame}>
              <b>{loops[loopIndex][0]}</b>
              <strong>{loops[loopIndex][1]}</strong>
            </div>
          </div>
        </div>
        <div className={styles.legacyYears}>
          <div><small>{v.yearsTop.small}</small><strong>{v.yearsTop.strong}</strong><span>{v.yearsTop.span}</span></div>
          <i />
          <div><small>{v.yearsBottom.small}</small><strong>{v.yearsBottom.strong}</strong><span>{v.yearsBottom.span}</span></div>
        </div>
      </div>
    );
  }

  if (active === 1) {
    return (
      <div className={styles.buildVisual}>
        <div className={styles.inspectionHead}>
          <span>{v.inspectionHead}</span>
          <b>{v.inspectionSub}</b>
        </div>
        <div className={styles.inspectionGlow} aria-hidden="true" />
        <div className={styles.buildMaterials}>
          {materialCards[language].map(([number, name, note], index) => (
            <article key={number} style={{ "--order": index } as React.CSSProperties}>
              <strong>{number}</strong>
              <div><h3>{name}</h3><p>{note}</p></div>
              <span>{v.checkedBadge}</span>
            </article>
          ))}
        </div>
        <div className={styles.buildDemands}>
          <div>
            <span>{v.demandsEyebrow}</span>
            <b>{v.demandsHeadline}</b>
          </div>
          <div className={styles.demandRotator}>
            <div key={demands[demandIndex][0]} className={styles.demandCard}>
              <strong>{demands[demandIndex][0]}</strong>
              <small>{demands[demandIndex][1]}</small>
            </div>
            <div className={styles.demandDots} aria-hidden="true">
              {demands.map(([name], index) => (
                <i key={name} className={index === demandIndex ? styles.isOn : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trustVisual}>
      <div className={styles.trustTests}>
        <span>{v.testsHeader}</span>
        {testGates[language].map(([number, title, note], index) => (
          <article key={number} style={{ "--order": index } as React.CSSProperties}>
            <b>{number}</b>
            <div><h3>{title}</h3><p>{note}</p></div>
            <span aria-label="Passed"><Check size="1em" strokeWidth={3} /></span>
          </article>
        ))}
      </div>
      <div className={styles.trustNetwork}>
        <div className={styles.networkCount}>
          <div>
            <strong>{distributorCount}+</strong>
            <span>{v.distributorsLabel}</span>
          </div>
          <div>
            <strong>{retailerCount}+</strong>
            <span>{v.retailersLabel}</span>
          </div>
        </div>
        <div className={styles.networkField} aria-hidden="true">
          {Array.from({ length: 35 }).map((_, index) => (
            <i key={index} style={{ "--node": index } as React.CSSProperties} />
          ))}
        </div>
        <div className={styles.networkCaption}>
          <span>{v.networkCaption[0]}</span><i /><span>{v.networkCaption[1]}</span>
        </div>
        <Link href="/products">
          {v.exploreRange} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}

export default function WhyUsSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const { language } = useLanguage();
  const currentChapters = chapters[language];
  const topline = toplineCopy[language];
  const foot = footWords[language];

  const active = Math.min(currentChapters.length - 1, Math.floor(progress * currentChapters.length));
  const local = progress * currentChapters.length - active;
  const chapter = currentChapters[active];

  const goToChapter = (index: number) => {
    const section = ref.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((index + 0.08) / currentChapters.length), behavior: "smooth" });
  };

  return (
    <section
      id="why-us"
      ref={ref}
      className={styles.section}
      aria-label="Why us — trust, materials and testing behind every KAG torch"
    >
      <div className={`${styles.stage} ${styles[`scene${active + 1}`]}`}>
        <div className={styles.topline}>
          <span>{topline.eyebrow}</span>
          <p>{topline.sub}</p>
          <b>{chapter.number} / 03</b>
        </div>

        <div className={styles.beam} aria-hidden="true">
          <i style={{ width: `${(active + local + 0.08) * (100 / currentChapters.length)}%` }} />
          {currentChapters.map((item, index) => (
            <button
              key={item.number}
              type="button"
              className={index === active ? styles.isActive : index < active ? styles.isPassed : ""}
              onClick={() => goToChapter(index)}
              aria-label={`Go to chapter ${item.number}: ${item.label}`}
            >
              <span>{item.number}</span>
            </button>
          ))}
        </div>

        <section className={styles.copy} key={`copy-${active}`}>
          <p>{chapter.label}</p>
          <h1>{chapter.title}</h1>
          <div>{chapter.summary}</div>
        </section>

        <section className={styles.visual} key={`visual-${active}`} aria-label={`${chapter.label} visual`}>
          <ChapterVisual active={active} language={language} />
        </section>

        <div className={styles.foot}>
          <span>{foot[0]}</span><i /><span>{foot[1]}</span><i /><span>{foot[2]}</span><i /><span>{foot[3]}</span>
        </div>

        <div className={styles.progressBar} aria-hidden="true">
          <i style={{ width: `${(active + local) * (100 / currentChapters.length)}%` }} />
        </div>
      </div>
    </section>
  );
}
