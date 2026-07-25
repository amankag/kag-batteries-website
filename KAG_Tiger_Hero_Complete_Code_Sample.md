# KAG Tiger Hero — Complete React and CSS Code Sample

This file accompanies `KAG_Tiger_Hero_Claude_Instructions.md`.

Give both Markdown files to Claude together with the existing KAG website project and the transparent Tiger image. This sample is intended to accelerate implementation. Claude must inspect the existing project and adapt class names, navigation, routes and the CTA destination instead of blindly overwriting unrelated code.

Working visual reference:

https://kag-tiger-type-crush.amankag.chatgpt.site

## Expected files

```text
app/
  page.tsx
  globals.css
public/
  tiger-kb81.png
```

If the project is not Next.js/React, translate the same structure and scroll calculation into its existing framework.

## 1. React/Next.js component

Use this as the hero component or adapt it into the existing home page.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function TigerHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const travel = hero.offsetHeight - window.innerHeight;
      const nextProgress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, travel))
      );

      setProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const phase = progress < 0.28 ? 1 : progress < 0.68 ? 2 : 3;

  return (
    <section
      ref={heroRef}
      className={`tigerHero tigerHeroPhase${phase}`}
      style={{ "--tiger-progress": progress } as React.CSSProperties}
      aria-label="Tiger KB-81 product introduction"
    >
      <div className="tigerStage">
        <header className="tigerNav">
          <a href="/" className="tigerLogo" aria-label="KAG home">
            KAG<span>®</span>
          </a>

          <p>Rechargeable torches · Indore</p>

          <button
            className="tigerMenu"
            type="button"
            aria-label="Open menu"
          >
            <span />
            <span />
          </button>
        </header>

        <div className="tigerEdition" aria-hidden="true">
          <span>01</span>
          <i />
          <span>TIGER SERIES</span>
        </div>

        <div className="tigerTypeScene" aria-hidden="true">
          <div className="tigerTypeRow tigerTypeTop">
            <span className="tigerBuilt">BUILT</span>
            <span className="tigerFor">FOR</span>
          </div>

          <div className="tigerTypeRow tigerTypeBottom">
            <span className="tigerLong">LONG</span>
            <span className="tigerNights">NIGHTS.</span>
          </div>
        </div>

        <div className="tigerProductWrap">
          <div className="tigerProductShadow" aria-hidden="true" />

          <img
            className="tigerProduct"
            src="/tiger-kb81.png"
            alt="Orange KAG Tiger KB-81 rechargeable torch"
            width="1122"
            height="1402"
            draggable="false"
          />

          <div className="tigerReflectorFlare" aria-hidden="true" />
        </div>

        <div className="tigerFrontType" aria-hidden="true">
          <span>NIGHTS.</span>
        </div>

        <div className="tigerIntroCopy">
          <p>TIGER KB-81</p>

          <h1>
            Heavy-duty light,
            <br />
            built to keep going.
          </h1>

          {/* Replace #products with the real catalogue/product destination. */}
          <a href="#products">
            Explore Tiger
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="tigerInstruction" aria-hidden="true">
          <span className="tigerInstructionLine" />
          <span>
            {phase === 1
              ? "Scroll to make room"
              : phase === 2
                ? "Keep pushing"
                : "Meet Tiger"}
          </span>
        </div>

        <div className="tigerCounter" aria-hidden="true">
          0{phase} <span>/</span> 03
        </div>
      </div>
    </section>
  );
}
```

## 2. Complete hero CSS

This CSS uses namespaced selectors so it is safer to merge into an existing site.

```css
:root {
  --tiger-paper: #f4f1e9;
  --tiger-ink: #11120f;
  --tiger-orange: #ff7900;
  --tiger-line: #cec9bd;
}

.tigerHero,
.tigerHero * {
  box-sizing: border-box;
}

.tigerHero {
  height: 330vh;
  color: var(--tiger-ink);
  background: var(--tiger-paper);
}

.tigerStage {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 650px;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(
      circle at 50% 52%,
      rgba(255, 121, 0, 0.055),
      transparent 31%
    ),
    var(--tiger-paper);
}

.tigerStage::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -10;
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: multiply;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}

.tigerNav {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 clamp(22px, 4.5vw, 72px);
  border-bottom: 1px solid var(--tiger-line);
}

.tigerLogo {
  width: fit-content;
  color: var(--tiger-ink);
  font-size: clamp(27px, 3vw, 40px);
  font-weight: 900;
  letter-spacing: -0.08em;
  text-decoration: none;
}

.tigerLogo span {
  margin-left: 4px;
  color: var(--tiger-orange);
  font-size: 9px;
  vertical-align: top;
}

.tigerNav p {
  margin: 0;
  color: #69685f;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.tigerMenu {
  justify-self: end;
  width: 46px;
  height: 46px;
  display: grid;
  place-content: center;
  gap: 6px;
  padding: 0;
  border: 1px solid #9c9a91;
  border-radius: 50%;
  color: var(--tiger-ink);
  background: transparent;
  cursor: pointer;
}

.tigerMenu span {
  display: block;
  width: 16px;
  height: 1px;
  background: currentColor;
}

.tigerEdition {
  position: absolute;
  z-index: 15;
  top: 116px;
  left: clamp(22px, 4.5vw, 72px);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #77756c;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  letter-spacing: 0.16em;
}

.tigerEdition i {
  display: block;
  width: 32px;
  height: 1px;
  background: #9e9b91;
}

.tigerTypeScene {
  position: absolute;
  z-index: 1;
  inset: 19% 2.2% 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity:
    clamp(0, calc((0.92 - var(--tiger-progress)) * 5), 1);
  pointer-events: none;
  will-change: opacity;
}

.tigerTypeRow {
  display: flex;
  justify-content: center;
  white-space: nowrap;
  font-size: clamp(88px, 15.1vw, 230px);
  font-weight: 900;
  letter-spacing: -0.095em;
  line-height: 0.76;
}

.tigerTypeRow span {
  display: inline-block;
  will-change: transform;
}

.tigerBuilt {
  transform:
    translateX(calc(var(--tiger-progress) * -8vw));
}

.tigerFor {
  color: var(--tiger-orange);
  transform:
    translateX(calc(var(--tiger-progress) * 9vw));
}

.tigerLong {
  color: var(--tiger-orange);
  transform:
    translateX(calc(var(--tiger-progress) * -11vw));
}

.tigerNights {
  transform:
    translateX(calc(var(--tiger-progress) * 10vw));
}

.tigerProductWrap {
  position: absolute;
  z-index: 4;
  left: 50%;
  top: 50%;
  width: min(59vw, 820px);
  aspect-ratio: 1 / 0.88;
  transform:
    translate(
      calc(
        -50% -
        max(0px, (var(--tiger-progress) - 0.7) * 55vw)
      ),
      calc(-24% - var(--tiger-progress) * 24%)
    )
    rotate(
      calc(-8deg + var(--tiger-progress) * 8deg)
    )
    scale(
      calc(0.58 + var(--tiger-progress) * 0.49)
    );
  transform-origin: 50% 58%;
  will-change: transform;
}

.tigerProduct {
  position: absolute;
  z-index: 2;
  inset: -35% 0 auto;
  width: 100%;
  height: 155%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  filter:
    drop-shadow(
      0 24px 18px
      rgba(
        43,
        30,
        13,
        calc(0.09 + var(--tiger-progress) * 0.12)
      )
    );
}

.tigerProductShadow {
  position: absolute;
  z-index: 1;
  left: 20%;
  right: 8%;
  bottom: 9%;
  height: 10%;
  border-radius: 50%;
  opacity: calc(var(--tiger-progress) * 0.5);
  background: rgba(67, 42, 18, 0.35);
  filter: blur(20px);
  transform:
    scaleX(calc(0.45 + var(--tiger-progress) * 0.55));
}

.tigerReflectorFlare {
  position: absolute;
  z-index: 3;
  left: 2.5%;
  top: 32%;
  width: 15%;
  aspect-ratio: 1;
  border-radius: 50%;
  opacity:
    clamp(
      0,
      calc((var(--tiger-progress) - 0.42) * 2.5),
      0.8
    );
  background:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.1) 33%,
      transparent 70%
    );
  filter: blur(5px);
}

.tigerFrontType {
  position: absolute;
  z-index: 6;
  right: 2.2%;
  top: 52.5%;
  overflow: hidden;
  height: 0.78em;
  color: transparent;
  opacity:
    clamp(0, calc((0.9 - var(--tiger-progress)) * 5), 1);
  font-size: clamp(88px, 15.1vw, 230px);
  font-weight: 900;
  letter-spacing: -0.095em;
  line-height: 0.76;
  pointer-events: none;
  transform:
    translateX(calc(var(--tiger-progress) * 10vw));
  clip-path:
    polygon(0 44%, 100% 25%, 100% 88%, 0 78%);
  -webkit-text-stroke:
    1.5px
    rgba(
      17,
      18,
      15,
      calc(var(--tiger-progress) * 0.22)
    );
}

.tigerIntroCopy {
  position: absolute;
  z-index: 10;
  top: 48%;
  right: clamp(25px, 7vw, 110px);
  width: min(32vw, 430px);
  opacity:
    clamp(
      0,
      calc((var(--tiger-progress) - 0.7) * 5),
      1
    );
  transform:
    translateY(
      calc(-38% + (1 - var(--tiger-progress)) * 40px)
    );
  pointer-events: none;
}

.tigerHeroPhase3 .tigerIntroCopy {
  pointer-events: auto;
}

.tigerIntroCopy > p {
  margin: 0 0 18px;
  color: var(--tiger-orange);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.24em;
}

.tigerIntroCopy h1 {
  margin: 0;
  color: var(--tiger-ink);
  font-size: clamp(34px, 4.3vw, 66px);
  font-weight: 750;
  letter-spacing: -0.06em;
  line-height: 0.96;
}

.tigerIntroCopy a {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 46px;
  margin-top: 32px;
  padding: 16px 20px 16px 24px;
  border-radius: 999px;
  color: white;
  background: var(--tiger-ink);
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}

.tigerIntroCopy a span {
  color: var(--tiger-orange);
  font-size: 18px;
}

.tigerInstruction {
  position: absolute;
  z-index: 12;
  left: clamp(22px, 4.5vw, 72px);
  bottom: 40px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #77756c;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.tigerInstructionLine {
  position: relative;
  width: 46px;
  height: 1px;
  overflow: hidden;
  background: #c5c0b5;
}

.tigerInstructionLine::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--tiger-orange);
  animation: tigerLineSlide 1.7s ease-in-out infinite;
}

@keyframes tigerLineSlide {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

.tigerCounter {
  position: absolute;
  z-index: 12;
  right: clamp(22px, 4.5vw, 72px);
  bottom: 40px;
  color: #77756c;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
}

.tigerCounter span {
  padding: 0 7px;
  color: #b8b3a8;
}

/* Mobile */
@media (max-width: 700px) {
  .tigerHero {
    height: 300vh;
  }

  .tigerStage {
    min-height: 600px;
  }

  .tigerNav {
    height: 76px;
    grid-template-columns: 1fr 1fr;
    padding: 0 18px;
  }

  .tigerNav p {
    display: none;
  }

  .tigerMenu {
    width: 40px;
    height: 40px;
  }

  .tigerEdition {
    top: 95px;
    left: 18px;
  }

  .tigerTypeScene {
    inset: 22% 0 17%;
  }

  .tigerTypeRow {
    flex-direction: column;
    align-items: center;
    font-size: clamp(66px, 23vw, 102px);
    line-height: 0.73;
  }

  .tigerTypeTop {
    transform:
      translateY(calc(var(--tiger-progress) * -7vh));
  }

  .tigerTypeBottom {
    transform:
      translateY(calc(var(--tiger-progress) * 8vh));
  }

  .tigerBuilt {
    transform:
      translateX(calc(var(--tiger-progress) * -7vw));
  }

  .tigerFor {
    transform:
      translateX(calc(var(--tiger-progress) * 14vw));
  }

  .tigerLong {
    transform:
      translateX(calc(var(--tiger-progress) * -14vw));
  }

  .tigerNights {
    transform:
      translateX(calc(var(--tiger-progress) * 6vw));
  }

  .tigerProductWrap {
    top: 49%;
    width: 112vw;
    transform:
      translate(
        -50%,
        calc(-13% - var(--tiger-progress) * 46%)
      )
      rotate(
        calc(-9deg + var(--tiger-progress) * 9deg)
      )
      scale(
        calc(0.48 + var(--tiger-progress) * 0.36)
      );
  }

  .tigerProduct {
    inset: -39% 0 auto;
    height: 165%;
  }

  .tigerFrontType {
    display: none;
  }

  .tigerIntroCopy {
    top: auto;
    right: 20px;
    bottom: 88px;
    left: 20px;
    width: auto;
    transform:
      translateY(
        calc((1 - var(--tiger-progress)) * 30px)
      );
  }

  .tigerIntroCopy h1 {
    max-width: 350px;
    font-size: clamp(32px, 9.5vw, 44px);
    line-height: 0.98;
  }

  .tigerIntroCopy a {
    margin-top: 24px;
  }

  .tigerInstruction {
    left: 18px;
    bottom: 26px;
  }

  .tigerCounter {
    right: 18px;
    bottom: 26px;
  }
}

/* Small phones */
@media (max-width: 380px) {
  .tigerTypeRow {
    font-size: 21.5vw;
  }

  .tigerProductWrap {
    width: 118vw;
  }

  .tigerIntroCopy h1 {
    font-size: 31px;
  }

  .tigerIntroCopy a {
    padding-block: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .tigerInstructionLine::after {
    animation: none;
  }
}
```

## 3. Example page integration

Keep the project’s existing sections below the hero:

```tsx
import TigerHero from "@/components/TigerHero";

export default function HomePage() {
  return (
    <main>
      <TigerHero />

      {/* Keep the project’s real catalogue/product section. */}
      <section id="products">
        {/* Existing product catalogue */}
      </section>

      {/* Keep all other existing sections. */}
    </main>
  );
}
```

## 4. Metadata example

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KAG Tiger KB-81 — Built for Long Nights",
  description:
    "KAG Tiger KB-81 heavy-duty rechargeable torch, manufactured in Indore.",
};
```

## 5. Instructions to Claude

1. Inspect the existing website before editing.
2. Read `KAG_Tiger_Hero_Claude_Instructions.md`.
3. Use this code as an implementation reference.
4. Copy the supplied Tiger image to `public/tiger-kb81.png`, unless the project already contains it.
5. Replace only the existing first/hero section.
6. Reuse the website’s existing header destinations, real logo, menu behaviour and catalogue link.
7. Do not add a duplicate header.
8. Preserve every section below the hero.
9. Remove the old hero carousel code only after confirming it is no longer referenced.
10. Rename selectors if they conflict with existing CSS.
11. Test forward and reverse scrolling.
12. Test desktop and mobile separately.
13. Report the files changed and any old code removed.

## 6. Important adaptation notes

- The sample uses `setProgress` on each animation-frame-limited scroll update. This is acceptable for the small hero, but Claude may move the value directly to a CSS custom property if the existing project already has a performant scroll utility.
- If the website has a fixed header, subtract or account for its actual height rather than adding a second header.
- If `max()` inside the desktop transform causes a browser-compatibility issue in the project’s supported browser range, calculate the phase-three horizontal offset in JavaScript and expose it as another CSS custom property.
- The front outlined `NIGHTS.` fragment is decorative and desktop-only. It can be removed if it clashes with the existing font.
- The visual result depends on the transparent padding in the supplied image. Do not trim or change the image without rechecking all transform values.
- The menu button in the sample is visual only. Wire it to the project’s real navigation behaviour.
- Replace `#products` with the real Tiger product or catalogue destination.

## 7. Final acceptance criteria

The implementation is complete only when:

- The initial viewport shows the torch embedded in the oversized headline.
- Scrolling enlarges and straightens the torch.
- The text moves away as though displaced by the product.
- Desktop finishes with the torch left and copy right.
- Mobile finishes with the torch centred/upward and copy below it.
- Final text is readable because the oversized typography fades.
- Scrolling upward reverses the effect.
- The hero releases into the existing product section.
- No horizontal scrollbar appears.
- The menu, product link and existing later sections still work.
- No duplicate timers or scroll listeners remain.
- No new animation framework is added.

