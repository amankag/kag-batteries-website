"use client";

import Image from "next/image";
import styles from "./InsideKagStory.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useCountUp } from "./useCountUp";

const TORCHES_MANUFACTURED = 1_000_000;

const scenes = [
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
