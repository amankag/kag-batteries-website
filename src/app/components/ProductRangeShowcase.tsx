"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { initialProducts, type Product } from "@/data/products";
import styles from "./ProductRangeShowcase.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useLanguage, type Language } from "./LanguageContext";

/**
 * The four flagship models shown as scroll-driven scenes. Rotate these as
 * new models get clean product-images/new/ cutouts — everything else
 * (numbering, tabs, images, fallback copy) follows automatically.
 */
const FEATURED_SLUGS = ["tiger-model-kb-81", "champion-model", "venus-model-kb-68", "power-house-roxy"];

/** Extra models shown alongside the featured four in the Full Range radial. */
const FULL_RANGE_EXTRA_SLUGS = ["kisan-sainik-model-kb-80", "jio-model-kb-88"];

/** Six evenly-spaced positions around the Full Range circle, matching FEATURED_SLUGS + FULL_RANGE_EXTRA_SLUGS. */
const RADIAL_POSITIONS = ["posTop", "posUpperRight", "posLowerRight", "posBottom", "posLowerLeft", "posUpperLeft"] as const;

interface SceneCopy {
  kicker: string;
  headline: string;
  chips: string[];
}

/** Hand-tuned copy for the current featured four. */
const SCENE_COPY: Record<Language, Record<string, SceneCopy>> = {
  en: {
    "tiger-model-kb-81": {
      kicker: "TIGER SERIES · LONG-RANGE",
      headline: "Heavy-duty light, built to keep going.",
      chips: ["Farms", "Security", "Power cuts"],
    },
    "champion-model": {
      kicker: "CHAMPION SERIES · EVERYDAY CARRY",
      headline: "Compact power, every day.",
      chips: ["Home", "Shops", "Daily use"],
    },
    "venus-model-kb-68": {
      kicker: "VENUS SERIES · 3X BATTERY LIFE",
      headline: "Light that goes the distance.",
      chips: ["Farms", "Outdoor", "Long backup"],
    },
    "power-house-roxy": {
      kicker: "POWER HOUSE · HIGH-POWER LED",
      headline: "Serious brightness, built tough.",
      chips: ["Security", "Outdoor", "Heavy-duty"],
    },
  },
  hi: {
    "tiger-model-kb-81": {
      kicker: "टाइगर सीरीज़ · लॉन्ग-रेंज",
      headline: "हैवी-ड्यूटी लाइट, जो लगातार चलती रहे।",
      chips: ["खेत", "सुरक्षा", "बिजली कटौती"],
    },
    "champion-model": {
      kicker: "चैंपियन सीरीज़ · रोज़ के काम के लिए",
      headline: "छोटी सी, पर दमदार—रोज़ के काम के लिए।",
      chips: ["घर", "दुकान", "रोज़ का काम"],
    },
    "venus-model-kb-68": {
      kicker: "वीनस सीरीज़ · 3 गुना बैटरी बैकअप",
      headline: "रोशनी ऐसी जो बहुत दूर तक जाए।",
      chips: ["खेत", "बाहर का काम", "लंबा बैकअप"],
    },
    "power-house-roxy": {
      kicker: "पावर हाउस · हाई-पावर एलईडी",
      headline: "तेज़ रोशनी, मज़बूत बनावट।",
      chips: ["सुरक्षा", "बाहर का काम", "भारी काम के लिए"],
    },
  },
};

/** Any newly-rotated-in slug without hand-tuned copy yet still renders sensibly. */
function getSceneCopy(product: Product, language: Language): SceneCopy {
  return (
    SCENE_COPY[language][product.slug] ?? {
      kicker: `${product.name.toUpperCase()} · ${product.category === "lithium-ion" ? "LITHIUM-ION" : "LEAD ACID"}`,
      headline: product.tagline,
      chips: product.highlights.slice(0, 3),
    }
  );
}

interface ProductScene {
  id: string;
  type: "product";
  tabLabel: string;
  product: Product;
}

interface FullRangeScene {
  id: string;
  type: "fullRange";
  tabLabel: string;
}

type Scene = ProductScene | FullRangeScene;

const fullRangeTabLabel: Record<Language, string> = { en: "Full Range", hi: "पूरी रेंज" };

const featuredProducts = FEATURED_SLUGS.map((slug) => initialProducts.find((p) => p.slug === slug)).filter(
  (p): p is Product => Boolean(p)
);

function buildScenes(language: Language): Scene[] {
  return [
    ...featuredProducts.map((product, index) => ({
      id: String(index + 1).padStart(2, "0"),
      type: "product" as const,
      tabLabel: product.name.split(/[–-]/)[0].trim(),
      product,
    })),
    {
      id: String(featuredProducts.length + 1).padStart(2, "0"),
      type: "fullRange" as const,
      tabLabel: fullRangeTabLabel[language],
    },
  ];
}

const fullRangeProducts = [...featuredProducts, ...FULL_RANGE_EXTRA_SLUGS.map((slug) => initialProducts.find((p) => p.slug === slug))].filter(
  (p): p is Product => Boolean(p)
);

const rangeLabel: Record<Language, string> = { en: "THE RANGE", hi: "रेंज" };
// "Explore {Product}" personifies the product in English; Hindi doesn't do
// that, so this reads as an info-style CTA instead ("X ki jaankari len").
const exploreCta: Record<Language, (label: string) => string> = {
  en: (label) => `Explore ${label}`,
  hi: (label) => `${label} की जानकारी लें`,
};
const fullRangeHeadline: Record<Language, string> = { en: "THE WHOLE RANGE. ONE PLACE.", hi: "पूरी रेंज. एक ही जगह." };
const fullRangeCtaText: Record<Language, string> = { en: "Explore the full catalogue", hi: "पूरा कैटलॉग देखें" };

export default function ProductRangeShowcase() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const { language } = useLanguage();
  const scenes = buildScenes(language);
  const activeIndex = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const isFullRangeActive = activeIndex === scenes.length - 1;

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const strip = tabsRef.current;
    const tab = tabRefs.current[activeIndex];

    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;

    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  const goToScene = (index: number) => {
    const section = ref.current;
    if (!section) return;

    const travel = section.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / scenes.length;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop + targetProgress * Math.max(1, travel),
      behavior: "smooth",
    });
  };

  return (
    <section id="products" ref={ref} className={styles.section} aria-label="KAG product range">
      <div className={styles.stage}>
        <div className={`${styles.rangeHead} ${isFullRangeActive ? styles.rangeHeadDark : ""}`}>
          <span>{rangeLabel[language]}</span>

          <div className={styles.productTabs} ref={tabsRef}>
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                className={index === activeIndex ? styles.isActive : ""}
                onClick={() => goToScene(index)}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
              >
                {scene.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {scenes.map((scene, index) => {
          if (scene.type !== "product") return null;
          const isActive = index === activeIndex;
          const copy = getSceneCopy(scene.product, language);

          return (
            <div key={scene.id}>
              <div className={`${styles.productCopy} ${isActive ? styles.isActive : ""}`} aria-hidden={!isActive}>
                <p className={styles.productKicker}>
                  <span className={styles.productKickerIndex}>{scene.id} — </span>
                  <span>{copy.kicker}</span>
                </p>
                <h2>{copy.headline}</h2>
                <Link href={`/products/${scene.product.slug}`} tabIndex={isActive ? 0 : -1}>
                  {exploreCta[language](scene.tabLabel)} <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className={`${styles.productZone} ${isActive ? styles.isActive : ""}`} aria-hidden={!isActive}>
                {scene.product.image && (
                  <Image
                    src={scene.product.image}
                    alt={isActive ? scene.product.name : ""}
                    fill
                    className={styles.productZoneImage}
                    sizes="(max-width: 760px) 80vw, 38vw"
                  />
                )}
              </div>

              <div className={`${styles.madeFor} ${isActive ? styles.isActive : ""}`} aria-hidden={!isActive}>
                {copy.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          );
        })}

        <div className={`${styles.fullRange} ${isFullRangeActive ? styles.isActive : ""}`} aria-hidden={!isFullRangeActive}>
          <div className={styles.fullRangeCopy}>
            <h2>{fullRangeHeadline[language]}</h2>
            <Link href="/products" className={styles.fullRangeCta} tabIndex={isFullRangeActive ? 0 : -1}>
              {fullRangeCtaText[language]} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.radial}>
            <div aria-hidden="true" className={styles.radialGlow} />
            {fullRangeProducts.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className={`${styles.rangeProduct} ${styles[RADIAL_POSITIONS[index]]}`}
                tabIndex={isFullRangeActive ? 0 : -1}
              >
                {product.image && <Image src={product.image} alt={product.name} width={200} height={250} />}
                <span>{product.name.split(/[–-]/)[0].trim()}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
