"use client";

import Image from "next/image";
import styles from "./InsideKagStory.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useCountUp } from "./useCountUp";

const TORCHES_MANUFACTURED = 1_000_000;

const scenes = [
  {
    number: "01",
    eyebrow: "THE PEOPLE BEHIND KAG",
    title: "Born in Indore.",
    body: "A family-run manufacturer building dependable rechargeable torches since 1997.",
    proof: "1997",
    proofLabel: "Production began in Indore",
    image: "/directors-1.jpg",
    width: 1920,
    height: 1208,
    alt: "The two founders of KAG Batteries together at the company office",
    imageClass: styles.founders,
    caption: "01 — THE PEOPLE BEHIND KAG",
  },
  {
    number: "02",
    eyebrow: "MADE UNDER ONE ROOF",
    title: "Built by hand. Checked by people.",
    body: "From assembly and charging to testing and packing, every torch passes through experienced hands.",
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
    title: "The field does not stop at sunset.",
    body: "KAG torches support night irrigation, crop inspections, power cuts and everyday work across rural India.",
    proofLabel: "Torches manufactured since 1997",
    support: "Trusted for farms, homes and work after dark.",
    image: "/kag-farmer-champion.jpg",
    width: 1448,
    height: 1086,
    alt: "Farmer inspecting crops after dark using a red KAG Champion torch",
    imageClass: styles.farmer,
    caption: "03 — BUILT FOR WORK AFTER DARK",
  },
];

export default function InsideKagStory() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const activeIndex = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const activeScene = scenes[activeIndex];
  const counter = useCountUp(activeIndex === 2, TORCHES_MANUFACTURED);

  return (
    <section id="about" ref={ref} className={styles.section} aria-label="Inside KAG company story">
      <div className={styles.stage}>
        <div className={styles.progress}>
          <span>INSIDE KAG</span>

          <div className={styles.progressBars} aria-hidden="true">
            {scenes.map((scene, index) => (
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
          {scenes.map((scene, index) => (
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
          {scenes.map((scene, index) => {
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
