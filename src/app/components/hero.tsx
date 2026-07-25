"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";
import { useScrollProgress } from "./useScrollProgress";

const HEADER_HEIGHT = 74;

export default function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const phase = progress < 0.28 ? 1 : progress < 0.68 ? 2 : 3;
  const instruction = phase === 1 ? "SCROLL TO MAKE ROOM" : phase === 2 ? "KEEP PUSHING" : "MEET TIGER";
  const counter = phase === 1 ? "01 / 03" : phase === 2 ? "02 / 03" : "03 / 03";
  const infoInteractive = progress >= 0.7;

  return (
    <section
      id="tiger-hero"
      ref={ref}
      aria-label="Tiger KB-81 product introduction"
      className="relative h-[300vh] md:h-[330vh]"
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div
        className={`sticky overflow-hidden ${styles.stage}`}
        style={{ top: HEADER_HEIGHT, height: `calc(100svh - ${HEADER_HEIGHT}px)` }}
      >
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${styles.grain}`} />

        <p className="absolute left-5 top-5 z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#11120f]/70 md:left-10 md:top-8">
          01&nbsp;&nbsp;───&nbsp;&nbsp;TIGER SERIES
        </p>

        <div aria-hidden="true" className={`z-0 flex px-4 ${styles.typeGroup}`}>
          <div className={`flex w-full max-w-[1400px] flex-col items-center gap-1 md:flex-row md:items-center md:justify-center md:gap-0 ${styles.typeTop}`}>
            <span className={`${styles.word} ${styles.wordBuilt}`}>BUILT</span>
            <span className={`${styles.word} ${styles.wordFor}`}>FOR</span>
          </div>
          <div className={`flex w-full max-w-[1400px] flex-col items-center gap-1 md:flex-row md:items-center md:justify-center md:gap-0 ${styles.typeBottom}`}>
            <span className={`${styles.word} ${styles.wordLong}`}>LONG</span>
            <span className={`${styles.word} ${styles.wordNights}`}>NIGHTS.</span>
          </div>
        </div>

        <div className={`z-10 ${styles.productWrapper}`}>
          <div aria-hidden="true" className={styles.groundShadow} />
          <Image
            src="/product-images/new/tiger-kb81.png"
            alt="Orange KAG Tiger KB-81 rechargeable torch"
            width={1122}
            height={1402}
            priority
            draggable={false}
            sizes="(max-width: 700px) 112vw, 820px"
            className={`pointer-events-none select-none ${styles.productImage}`}
          />
          <div aria-hidden="true" className={styles.reflector} />
        </div>

        <div
          className={`absolute inset-x-0 bottom-24 z-30 flex flex-col items-center px-6 text-center md:inset-y-0 md:bottom-auto md:left-auto md:right-10 md:w-[38%] md:items-start md:justify-center md:text-left ${styles.productInfo}`}
          style={{ pointerEvents: infoInteractive ? "auto" : "none" }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff7900]">Tiger KB-81</p>
          <p className="mt-3 text-2xl font-bold leading-snug text-[#11120f] md:text-4xl">
            Heavy-duty light,
            <br />
            built to keep going.
          </p>
          <Link
            href="/products/tiger-model-kb-81"
            tabIndex={infoInteractive ? 0 : -1}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#11120f] px-6 py-3 text-sm font-bold text-[#f4f1e9] transition hover:bg-[#ff7900]"
          >
            Explore Tiger <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="absolute left-5 bottom-5 z-30 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#11120f]/70 md:left-10 md:bottom-8">
          <span aria-hidden="true" className={`relative block h-px w-10 bg-[#cec9bd] ${styles.scrollIndicatorTrack}`}>
            <span className={`absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-[#ff7900] ${styles.scrollIndicatorDot}`} />
          </span>
          <span aria-live="polite">{instruction}</span>
        </div>

        {/* Positioned to clear the fixed WhatsApp button (bottom-6 right-6, 56px):
            stacked above it on mobile, offset to its left on desktop. */}
        <div className="absolute right-5 bottom-28 z-30 text-[11px] font-bold tabular-nums tracking-[0.14em] text-[#11120f]/70 md:bottom-8 md:right-28">
          {counter}
        </div>
      </div>
    </section>
  );
}
