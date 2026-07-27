"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FactoryVisitSection.module.css";
import { useScrollProgress } from "./useScrollProgress";

type GalleryImage = { src: string; alt: string; caption: string };

const chapters = [
  ["01", "INDORE · THE FACTORY"],
  ["02", "THE PEOPLE BEHIND IT"],
  ["03", "PRODUCTION IN MOTION"],
  ["04", "PACKED TO GO"],
] as const;

const productionImages: GalleryImage[] = [
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
];

const finalImages: GalleryImage[] = [
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
];

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => {
  const x = clamp(n);
  return x * x * (3 - 2 * x);
};

export default function FactoryVisitSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [selected, setSelected] = useState<GalleryImage | null>(null);

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
          <span>INSIDE KAG BATTERIES</span>
          <p>REAL PEOPLE. REAL PRODUCTION.</p>
          <b>{chapters[active][0]} / 04</b>
        </div>

        <nav className={styles.tabs} aria-label="Factory visit chapters">
          {chapters.map(([number, label], index) => (
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
                <p>01 — INDORE, MADHYA PRADESH</p>
                <h1>
                  COME INSIDE.
                  <br />
                  <em>SEE HOW TORCHES ARE MADE.</em>
                </h1>
                <span>One factory. Real machines. Real people. Nothing staged.</span>
              </div>
              <div className={styles.scrollEntry}>
                SCROLL TO STEP INSIDE <i />
              </div>
            </section>
          )}

          {active === 1 && (
            <section className={styles.founders}>
              <div className={styles.chapterCopy}>
                <p>02 — THE PEOPLE BEHIND IT</p>
                <h1>
                  IT STARTED WITH
                  <br />
                  <em>A SIMPLE PROMISE.</em>
                </h1>
                <span>
                  Build a torch a farmer can afford—and never let it fail them in a dark field. Our founders
                  made that promise to rural India, and this factory keeps it every day.
                </span>
              </div>
              <div className={styles.founderMedia}>
                <button
                  type="button"
                  className={styles.founderPhoto}
                  onClick={() =>
                    setSelected({
                      src: "/images/Founder_pic.jpg",
                      alt: "The two founders of KAG Batteries seated together",
                      caption: "KAG Batteries founders",
                    })
                  }
                >
                  <Image
                    src="/images/Founder_pic.jpg"
                    alt="The two founders of KAG Batteries seated together"
                    fill
                    sizes="(max-width: 760px) 100vw, 55vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span>
                    KAG BATTERIES · THE FOUNDERS <b>↗</b>
                  </span>
                </button>
                <div className={styles.founderStatement}>
                  {["TWO FOUNDERS.", "ONE FACTORY.", "A TEAM THAT KEEPS MOVING FORWARD."].map((line, index) => (
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
                <p>03 — THE FACTORY FLOOR</p>
                <h1>
                  WHERE EVERY TORCH
                  <br />
                  <em>TAKES SHAPE.</em>
                </h1>
                <span>From moulded components to careful hands-on assembly.</span>
              </div>
              <div className={styles.photoDeck}>
                {productionImages.map((image, index) => {
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
                <p>04 — READY TO LEAVE INDORE</p>
                <h1>
                  MADE. CHECKED.
                  <br />
                  <em>PACKED TO GO.</em>
                </h1>
                <span>
                  From the production floor to a growing network of dealers and retailers across Madhya Pradesh,
                  Maharashtra and beyond.
                </span>
                <Link href="/products">
                  Explore the complete range <b>↗</b>
                </Link>
              </div>
              <div className={styles.proofWall}>
                {finalImages.map((image, index) => (
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
          <button type="button" onClick={() => setSelected(null)} aria-label="Close">
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
