"use client";

import Image from "next/image";
import styles from "./InsideKagStory.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useCountUp } from "./useCountUp";
import { useLanguage, type Language } from "./LanguageContext";

const TORCHES_MANUFACTURED = 1_000_000;

type Scene = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  proof?: string;
  proofLabel: string;
  support?: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  imageClass: string;
  caption: string;
};

const scenes: Record<Language, Scene[]> = {
  en: [
    {
      number: "01",
      eyebrow: "THE FAMILY BEHIND THE NAME",
      title: "Our name is on every torch.",
      body: "KAG is the family behind the brand. When your own name goes on every product, quality stops being a slogan—it becomes personal. Family-run in Indore since 1997.",
      proof: "1997",
      proofLabel: "Production began in Indore",
      image: "/directors-1.jpg",
      width: 1920,
      height: 1208,
      alt: "The two founders of KAG Batteries together at the company office",
      imageClass: styles.founders,
      caption: "01 — THE FAMILY BEHIND THE NAME",
    },
    {
      number: "02",
      eyebrow: "MADE UNDER ONE ROOF",
      title: "Built with care. Tested at every stage.",
      body: "Assembly lines, charging rigs and strict final inspection under one roof—every torch proves itself before it ships.",
      proof: "27+ YEARS",
      proofLabel: "Manufacturing rechargeable torches",
      image: "/factory-2.jpg",
      width: 1920,
      height: 1080,
      alt: "KAG team manufacturing rechargeable torches inside the factory",
      imageClass: styles.factory,
      caption: "02 — MADE UNDER ONE ROOF",
    },
    {
      number: "03",
      eyebrow: "BUILT FOR WORK AFTER DARK",
      title: "Made for long nights in the field.",
      body: "Night irrigation, crop rounds, power cuts—KAG Batteries torches are built to run for hours a night, season after season, at a price that respects hard-earned money.",
      proofLabel: "Torches manufactured since 1997",
      support: "Trusted for farms, homes and work after dark.",
      image: "/kag-farmer-champion.jpg",
      width: 1448,
      height: 1086,
      alt: "Farmer inspecting crops after dark using a red KAG Champion torch",
      imageClass: styles.farmer,
      caption: "03 — BUILT FOR WORK AFTER DARK",
    },
  ],
  hi: [
    {
      number: "01",
      eyebrow: "परिवार का नाम, अपनी पहचान",
      title: "हर टॉर्च पर हमारा नाम है।",
      body: "काग हमारे परिवार का नाम है। जब अपना नाम हर प्रोडक्ट पर लगता है, तो क्वालिटी सिर्फ एक बात नहीं रह जाती—यह ज़िम्मेदारी बन जाती है। 1997 से इंदौर में परिवार द्वारा संचालित।",
      proof: "1997",
      proofLabel: "इंदौर में उत्पादन की शुरुआत",
      image: "/directors-1.jpg",
      width: 1920,
      height: 1208,
      alt: "इंदौर कार्यालय में काग बैटरीज़ के दोनों संस्थापक",
      imageClass: styles.founders,
      caption: "01 — परिवार का नाम, अपनी पहचान",
    },
    {
      number: "02",
      eyebrow: "एक ही छत के नीचे निर्माण",
      title: "देखभाल से बनाया। हर चरण में जांचा गया।",
      body: "असेंबली लाइन, चार्जिंग सेटअप और सख्त फाइनल जांच—सब एक ही छत के नीचे। भेजने से पहले हर टॉर्च खुद को साबित करती है।",
      proof: "27+ वर्ष",
      proofLabel: "रिचार्जेबल टॉर्च का निर्माण",
      image: "/factory-2.jpg",
      width: 1920,
      height: 1080,
      alt: "फैक्ट्री के अंदर रिचार्जेबल टॉर्च बनाती काग टीम",
      imageClass: styles.factory,
      caption: "02 — एक ही छत के नीचे निर्माण",
    },
    {
      number: "03",
      eyebrow: "अंधेरे के बाद के काम के लिए बना",
      title: "खेत की लंबी रातों के लिए बना।",
      body: "रात की सिंचाई, खेत का राउंड, बिजली कटौती—काग बैटरीज़ की टॉर्च हर रात घंटों चलने के लिए बनी है, हर मौसम में, ऐसी कीमत पर जो आपकी मेहनत की कमाई का सम्मान करे।",
      proofLabel: "1997 से अब तक बनाई गई टॉर्चें",
      support: "खेत, घर और रात के काम के लिए भरोसेमंद।",
      image: "/kag-farmer-champion.jpg",
      width: 1448,
      height: 1086,
      alt: "अंधेरे में लाल काग चैंपियन टॉर्च से फसल जांचता किसान",
      imageClass: styles.farmer,
      caption: "03 — अंधेरे के बाद के काम के लिए बना",
    },
  ],
};

export default function InsideKagStory() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const { language } = useLanguage();
  const currentScenes = scenes[language];
  const activeIndex = Math.min(currentScenes.length - 1, Math.floor(progress * currentScenes.length));
  const activeScene = currentScenes[activeIndex];
  const counter = useCountUp(activeIndex === 2, TORCHES_MANUFACTURED);

  return (
    <section id="about" ref={ref} className={styles.section} aria-label="Inside KAG company story">
      <div className={styles.stage}>
        <div className={styles.progress}>
          <span>{language === "en" ? "INSIDE KAG" : "काग के अंदर"}</span>

          <div className={styles.progressBars} aria-hidden="true">
            {currentScenes.map((scene, index) => (
              <i
                key={scene.number}
                className={
                  index === activeIndex ? styles.isActive : index < activeIndex ? styles.isComplete : ""
                }
              />
            ))}
          </div>

          <span>{activeScene.number} / 03</span>
        </div>

        <div className={styles.copy} aria-live="polite">
          {currentScenes.map((scene, index) => (
            <article
              key={scene.number}
              className={`${styles.copyArticle} ${index === activeIndex ? styles.isActive : ""}`}
              aria-hidden={index !== activeIndex}
            >
              <p className={styles.eyebrow}>{scene.eyebrow}</p>
              <h2>{scene.title}</h2>
              <p className={styles.body}>{scene.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.photos}>
          {currentScenes.map((scene, index) => {
            const relation = index - activeIndex;
            const stateClass = relation === 0 ? styles.isCurrent : relation < 0 ? styles.isPast : styles.isNext;

            return (
              <figure
                key={scene.number}
                className={`${styles.figure} ${stateClass} ${scene.imageClass}`}
                aria-hidden={relation !== 0}
              >
                <Image
                  src={scene.image}
                  alt={relation === 0 ? scene.alt : ""}
                  width={scene.width}
                  height={scene.height}
                  className={styles.figureImage}
                  sizes="(max-width: 760px) calc(100vw - 40px), 45vw"
                  style={{ width: "100%", height: "100%" }}
                />
                <figcaption className={styles.caption}>{scene.caption}</figcaption>
              </figure>
            );
          })}
        </div>

        <div className={styles.proof}>
          <strong className={styles.proofValue}>
            {activeIndex === 2 ? `${counter.toLocaleString("en-US")}+` : activeScene.proof}
          </strong>
          <span className={styles.proofLabel}>{activeScene.proofLabel}</span>

          {activeIndex === 2 && activeScene.support && (
            <small className={styles.proofSupport}>{activeScene.support}</small>
          )}
        </div>
      </div>
    </section>
  );
}
