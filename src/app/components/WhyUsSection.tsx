"use client";

import Link from "next/link";
import styles from "./WhyUsSection.module.css";
import { useScrollProgress } from "./useScrollProgress";
import { useCountUp } from "./useCountUp";

const YEARS_SINCE_1997 = new Date().getFullYear() - 1997;
const DISTRIBUTOR_COUNT = 120;
const RETAILER_COUNT = 300;

const chapters = [
  {
    number: "01",
    label: "TRUST, REFINED",
    title: (
      <>
        <span className={styles.headlineLock}>BETTER TORCHES.</span>
        <br />
        <span className={styles.headlineLock}>BETTER BATTERIES.</span>
        <br />
        <em className={styles.headlineLock}>SINCE 1997.</em>
      </>
    ),
    summary:
      "We listen to the people who depend on our torches every night, then improve, refine and test what comes next.",
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
    summary:
      `Every torch is checked before assembly, while charging and once again before shipping—then carried by ${DISTRIBUTOR_COUNT}+ distributors and ${RETAILER_COUNT}+ retailers across Madhya Pradesh, Maharashtra and beyond.`,
  },
];

const materialCards = [
  ["01", "Pure copper wiring", "Carries power reliably"],
  ["02", "Dependable batteries", "Chosen for long working hours"],
  ["03", "Tough plastic body", "Made for rough daily handling"],
];

const demandCards = [
  ["FARMS", "Field checks"],
  ["HOMES", "Power backup"],
  ["SHOPS", "Long work hours"],
  ["SECURITY", "Night rounds"],
];

const testGates = [
  ["01", "Material quality", "Wiring, battery and body checked"],
  ["02", "Repeated charging", "Checked through charge and use cycles"],
  ["03", "Final working check", "Light output, switch and finish checked"],
];

function ChapterVisual({ active }: { active: number }) {
  const distributorCount = useCountUp(active === 2, DISTRIBUTOR_COUNT);
  const retailerCount = useCountUp(active === 2, RETAILER_COUNT);

  if (active === 0) {
    return (
      <div className={styles.legacyVisual}>
        <div className={styles.legacyOrbit} aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <div className={styles.legacyOrbitLabels} aria-hidden="true">
          <span>LISTEN</span><span>IMPROVE</span><span>REFINE</span><span>TEST</span>
        </div>
        <div className={styles.legacyCenter}>
          <span>MORE THAN</span>
          <strong>{YEARS_SINCE_1997}</strong>
          <b>YEARS OF<br />IMPROVEMENT</b>
        </div>
        <div className={styles.legacyYears}>
          <div><small>STARTED</small><strong>1997</strong><span>INDORE</span></div>
          <i />
          <div><small>STILL</small><strong>NOW</strong><span>IMPROVING</span></div>
        </div>
      </div>
    );
  }

  if (active === 1) {
    return (
      <div className={styles.buildVisual}>
        <div className={styles.inspectionHead}>
          <span>WHAT GOES INSIDE A KAG TORCH</span>
          <b>NO CHEAP SHORTCUTS</b>
        </div>
        <div className={styles.inspectionGlow} aria-hidden="true" />
        <div className={styles.buildMaterials}>
          {materialCards.map(([number, name, note], index) => (
            <article key={number} style={{ "--order": index } as React.CSSProperties}>
              <strong>{number}</strong>
              <div><h3>{name}</h3><p>{note}</p></div>
              <span>CHECKED</span>
            </article>
          ))}
        </div>
        <div className={styles.buildDemands}>
          <div>
            <span>ONE RANGE. MANY NEEDS.</span>
            <b>MADE FOR THE WAY<br />INDIA ACTUALLY WORKS</b>
          </div>
          <ul>
            {demandCards.map(([name, use]) => (
              <li key={name}><strong>{name}</strong><small>{use}</small></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trustVisual}>
      <div className={styles.trustTests}>
        <span>EVERY TORCH MUST PASS</span>
        {testGates.map(([number, title, note], index) => (
          <article key={number} style={{ "--order": index } as React.CSSProperties}>
            <b>{number}</b>
            <div><h3>{title}</h3><p>{note}</p></div>
            <span aria-label="Passed">✓</span>
          </article>
        ))}
      </div>
      <div className={styles.trustNetwork}>
        <div className={styles.networkCount}>
          <div>
            <strong>{distributorCount}+</strong>
            <span>DISTRIBUTORS</span>
          </div>
          <div>
            <strong>{retailerCount}+</strong>
            <span>RETAILERS</span>
          </div>
        </div>
        <div className={styles.networkField} aria-hidden="true">
          {Array.from({ length: 35 }).map((_, index) => (
            <i key={index} style={{ "--node": index } as React.CSSProperties} />
          ))}
        </div>
        <div className={styles.networkCaption}>
          <span>MADE IN INDORE</span><i /><span>MP, MAHARASHTRA &amp; BEYOND</span>
        </div>
        <Link href="/products">
          Explore the range <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}

export default function WhyUsSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();

  const active = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
  const local = progress * chapters.length - active;
  const chapter = chapters[active];

  const goToChapter = (index: number) => {
    const section = ref.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((index + 0.08) / chapters.length), behavior: "smooth" });
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
          <span>WHY US</span>
          <p>PROOF, NOT PROMISES.</p>
          <b>{chapter.number} / 03</b>
        </div>

        <div className={styles.beam} aria-hidden="true">
          <i style={{ width: `${(active + local + 0.08) * (100 / chapters.length)}%` }} />
          {chapters.map((item, index) => (
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
          <p>{chapter.number} — {chapter.label}</p>
          <h1>{chapter.title}</h1>
          <div>{chapter.summary}</div>
        </section>

        <section className={styles.visual} key={`visual-${active}`} aria-label={`${chapter.label} visual`}>
          <ChapterVisual active={active} />
        </section>

        <div className={styles.foot}>
          <span>HEAR</span><i /><span>IMPROVE</span><i /><span>REFINE</span><i /><span>TEST</span>
        </div>

        <div className={styles.progressBar} aria-hidden="true">
          <i style={{ width: `${(active + local) * (100 / chapters.length)}%` }} />
        </div>
      </div>
    </section>
  );
}
