# KAG Website — “Inside KAG” Scroll Story Section

## Instructions for Claude

Implement this as the section immediately after the existing hero. Do **not**
redesign or replace the hero. Match the website’s existing navigation, fonts,
colour variables and spacing where possible.

The purpose of this section is to replace the old-fashioned layout containing:

- a large paragraph on the left;
- one cropped founder photograph;
- a bright statistic box;
- a small factory card.

Build one modern, scroll-driven company story using three photographic scenes:

1. the two founders;
2. the manufacturing plant;
3. a farmer using a KAG torch.

The section must feel genuine, industrial and human—not like a collection of
generic glass cards.

---

## Final creative direction

### Concept name

**Inside KAG — From Indore to the Field**

On desktop, the section remains pinned while three scenes change as the visitor
scrolls. Copy stays on the left and a stack of large photographic cards stays
on the right.

On mobile, text appears above a large photograph. Scenes change vertically and
never squeeze text and imagery into two narrow columns.

Use a warm ivory background, dark green-black typography, KAG orange and a
small lime highlight. Glass treatment should be restricted to small image
captions. Do not place every item inside a translucent glass box.

---

## Story sequence and exact copy

### Scene 01 — Founders

**Eyebrow**

`THE PEOPLE BEHIND KAG`

**Headline**

`Born in Indore.`

**Body**

`A family-run manufacturer building dependable rechargeable lighting since 1997.`

**Proof**

`1997`

`Production began in Indore`

### Scene 02 — Manufacturing

**Eyebrow**

`MADE UNDER ONE ROOF`

**Headline**

`Built by hand. Checked by people.`

**Body**

`From assembly and charging to testing and packing, every light passes through experienced hands.`

**Proof**

`27+ YEARS`

`Manufacturing rechargeable lighting`

### Scene 03 — Farmers

**Eyebrow**

`BUILT FOR WORK AFTER DARK`

**Headline**

`The field does not stop at sunset.`

**Body**

`KAG torches support night irrigation, crop inspections, power cuts and everyday work across rural India.`

**Counter**

Use a numeric counter that animates once when Scene 03 becomes active:

`0 → 1,000,000+`

**Label**

`Lights manufactured`

**Supporting line**

`Trusted for farms, homes and work after dark.`

### Important claim rule

Before publishing, confirm the actual number with KAG.

- If KAG can verify one million or more manufactured units, use
  `1,000,000+ LIGHTS MANUFACTURED`.
- If the verified figure is one hundred thousand, change the target to
  `100,000+`.
- Do not write “one million happy farmers.” Units manufactured do not equal
  individual customers, and “happy” is not a measurable claim.
- Do not use `1L+`. Use internationally readable digits.

---

## Required image files

Claude should use the images supplied by the user and place them in the
project’s normal public/assets directory:

```text
/images/kag-founders.jpg
/images/kag-factory.jpg
/images/kag-farmer-champion.jpg
```

These filenames may be changed to match the existing project, but update the
code references consistently.

---

## Non-negotiable image rules

### Founder image

Analyse the photograph before setting its crop.

- The photograph contains **two people**.
- Both founders must remain fully visible and recognisable.
- Do not crop the standing founder from the left or the seated founder from the
  right/bottom.
- Do not use a blind `object-fit: cover` crop.
- Default to `object-fit: contain; object-position: center;`.
- Place the image over a warm neutral photo surface so any unused space looks
  deliberate.
- If the source contains unnecessary empty space, create a manually art-directed
  crop only after checking that both heads, bodies and relevant context remain
  visible.

### Manufacturing image

- Use a sharp, high-resolution photograph with workers and the production
  environment clearly visible.
- Show real assembly, testing, charging or packing activity.
- Avoid a dark overlay that hides the manufacturing detail.
- `object-fit: cover` is allowed, but faces, hands, products and the production
  line must not be cut awkwardly.
- Prefer a wide 4:3 or 3:2 photograph.

### Farmer image

- Use the final farmer photograph supplied by the user.
- It should show the farmer naturally holding the red KAG Champion torch.
- Preserve the realistic hand grip and individual fingers.
- Do not regenerate, replace or distort the product.
- Keep the farmer, field, irrigation channel, evening atmosphere and torch beam
  visible.
- Use `object-position: center` on desktop.
- On mobile, use a deliberate crop such as `object-position: 35% center` so the
  farmer and torch remain visible.

---

## Interaction specification

1. The complete section is approximately `300vh–360vh` tall.
2. Its internal stage is `position: sticky; top: 0; height: 100svh`.
3. Divide scroll progress into three scenes.
4. When a scene changes:
   - current copy moves upward by approximately 20–30 px and fades out;
   - next copy rises into place;
   - current photograph moves slightly forward and straightens;
   - previous photograph slides to the upper-left and fades;
   - next photograph remains subtly stacked behind the active photograph;
   - the progress line advances.
5. Scene 03 starts the manufacturing counter once.
6. Do not continuously animate images when the user is not scrolling.
7. Respect `prefers-reduced-motion`.

The motion should feel controlled and editorial. Avoid dramatic spinning,
constant floating, heavy parallax or large 3D rotations.

---

## Desktop layout

- Maximum content width: approximately `1440px`.
- Copy column: `36–40%`.
- Image column: `44–48%`.
- Gap between columns: at least `5vw`.
- Photo card height: approximately `62–66vh`.
- Rounded corners: `28–34px`.
- The proof/counter sits below the copy, not in a separate fluorescent box.
- Show `INSIDE KAG`, progress bars and `01 / 03` in a slim top row.

---

## Mobile layout

At `760px` and below:

- Keep one column.
- Progress row stays at the top.
- Headline and paragraph appear first.
- Large photo occupies roughly `34–40svh`.
- Proof/counter appears below the photo.
- Do not use desktop horizontal transforms.
- Do not crop out the founders, farmer or torch.
- Keep text at least `14px` and tap targets at least `44px`.
- Avoid expensive glass blur; a translucent caption with a small blur is
  sufficient.

Recommended mobile order:

```text
INSIDE KAG                         01 / 03
[progress line]

THE PEOPLE BEHIND KAG
Born in Indore.
Short supporting paragraph.

[large photo — both founders visible]

1997 | Production began in Indore
```

---

## React implementation example

Use this as an implementation reference. Adapt naming to the existing project.
Do not add another animation library only for this section.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import "./InsideKagStory.css";

const VERIFIED_LIGHTS_MANUFACTURED = 1_000_000;

const scenes = [
  {
    number: "01",
    eyebrow: "THE PEOPLE BEHIND KAG",
    title: "Born in Indore.",
    body:
      "A family-run manufacturer building dependable rechargeable lighting since 1997.",
    proof: "1997",
    proofLabel: "Production began in Indore",
    image: "/images/kag-founders.jpg",
    alt: "KAG founders together at the company",
    imageClass: "founders",
  },
  {
    number: "02",
    eyebrow: "MADE UNDER ONE ROOF",
    title: "Built by hand. Checked by people.",
    body:
      "From assembly and charging to testing and packing, every light passes through experienced hands.",
    proof: "27+ YEARS",
    proofLabel: "Manufacturing rechargeable lighting",
    image: "/images/kag-factory.jpg",
    alt: "KAG team manufacturing rechargeable lights inside the factory",
    imageClass: "factory",
  },
  {
    number: "03",
    eyebrow: "BUILT FOR WORK AFTER DARK",
    title: "The field does not stop at sunset.",
    body:
      "KAG torches support night irrigation, crop inspections, power cuts and everyday work across rural India.",
    proofLabel: "Lights manufactured",
    support: "Trusted for farms, homes and work after dark.",
    image: "/images/kag-farmer-champion.jpg",
    alt: "Farmer inspecting crops after dark using a red KAG Champion torch",
    imageClass: "farmer",
  },
];

function useCountUp(active: boolean, target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease out: fast opening, confident slow finish.
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

export default function InsideKagStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const calculate = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const next = Math.min(
        0.999,
        Math.max(0, -rect.top / Math.max(1, scrollable))
      );

      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(calculate);
    };

    calculate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = Math.min(
    scenes.length - 1,
    Math.floor(progress * scenes.length)
  );

  const activeScene = scenes[activeIndex];
  const counter = useCountUp(
    activeIndex === 2,
    VERIFIED_LIGHTS_MANUFACTURED
  );

  return (
    <section
      ref={sectionRef}
      className="insideKag"
      aria-label="Inside KAG company story"
    >
      <div className="insideKag__stage">
        <div className="insideKag__progress">
          <span>INSIDE KAG</span>

          <div className="insideKag__progressBars" aria-hidden="true">
            {scenes.map((scene, index) => (
              <i
                key={scene.number}
                className={
                  index === activeIndex
                    ? "is-active"
                    : index < activeIndex
                    ? "is-complete"
                    : ""
                }
              />
            ))}
          </div>

          <span>{activeScene.number} / 03</span>
        </div>

        <div className="insideKag__copy" aria-live="polite">
          {scenes.map((scene, index) => (
            <article
              key={scene.number}
              className={index === activeIndex ? "is-active" : ""}
              aria-hidden={index !== activeIndex}
            >
              <p className="insideKag__eyebrow">{scene.eyebrow}</p>
              <h2>{scene.title}</h2>
              <p className="insideKag__body">{scene.body}</p>
            </article>
          ))}
        </div>

        <div className="insideKag__photos">
          {scenes.map((scene, index) => {
            const relation = index - activeIndex;

            return (
              <figure
                key={scene.number}
                className={[
                  relation === 0
                    ? "is-current"
                    : relation < 0
                    ? "is-past"
                    : "is-next",
                  scene.imageClass,
                ].join(" ")}
                aria-hidden={relation !== 0}
              >
                <img src={scene.image} alt={relation === 0 ? scene.alt : ""} />
                <figcaption>
                  {scene.number} — {scene.eyebrow}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="insideKag__proof">
          <strong>
            {activeIndex === 2
              ? `${counter.toLocaleString("en-IN")}+`
              : activeScene.proof}
          </strong>
          <span>{activeScene.proofLabel}</span>

          {activeIndex === 2 && activeScene.support && (
            <small>{activeScene.support}</small>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## CSS implementation example

Replace colour values with existing site variables if they already exist.

```css
:root {
  --kag-paper: #f5f1e8;
  --kag-ink: #102522;
  --kag-orange: #ff7900;
  --kag-lime: #d9ff5c;
  --kag-line: rgba(16, 37, 34, 0.18);
}

.insideKag {
  height: 340vh;
  color: var(--kag-ink);
  background: var(--kag-paper);
}

.insideKag__stage {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 650px;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(
      circle at 76% 45%,
      rgba(217, 255, 92, 0.18),
      transparent 30%
    ),
    var(--kag-paper);
}

.insideKag__progress {
  position: absolute;
  z-index: 20;
  top: 0;
  left: clamp(24px, 4.5vw, 72px);
  right: clamp(24px, 4.5vw, 72px);
  height: 78px;
  display: grid;
  grid-template-columns: 1fr 180px 1fr;
  align-items: center;
  border-bottom: 1px solid var(--kag-line);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.2em;
}

.insideKag__progress > span:last-child {
  justify-self: end;
}

.insideKag__progressBars {
  display: flex;
  gap: 6px;
}

.insideKag__progressBars i {
  width: 100%;
  height: 3px;
  border-radius: 999px;
  background: #d1cec4;
}

.insideKag__progressBars i.is-active {
  background: var(--kag-orange);
}

.insideKag__progressBars i.is-complete {
  background: var(--kag-ink);
}

.insideKag__copy {
  position: absolute;
  z-index: 10;
  top: 24%;
  left: clamp(24px, 5.2vw, 84px);
  width: min(38vw, 560px);
}

.insideKag__copy article {
  position: absolute;
  inset: 0 auto auto 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(28px);
  transition:
    opacity 420ms ease,
    transform 620ms cubic-bezier(0.2, 0.8, 0.2, 1),
    visibility 0ms linear 620ms;
}

.insideKag__copy article.is-active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition-delay: 80ms, 80ms, 0ms;
}

.insideKag__eyebrow {
  margin: 0 0 22px;
  color: #087463;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
}

.insideKag__copy h2 {
  margin: 0;
  max-width: 580px;
  font-size: clamp(54px, 6.1vw, 94px);
  line-height: 0.9;
  letter-spacing: -0.075em;
}

.insideKag__body {
  max-width: 480px;
  margin: 28px 0 0;
  color: #52615d;
  font-size: clamp(17px, 1.3vw, 21px);
  line-height: 1.55;
}

.insideKag__photos {
  position: absolute;
  z-index: 5;
  top: 17%;
  right: clamp(24px, 5vw, 82px);
  width: min(45vw, 690px);
  height: 64%;
  perspective: 1200px;
}

.insideKag__photos figure {
  position: absolute;
  inset: 0;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 32px;
  background: #e9e4d9;
  box-shadow: 0 30px 80px rgba(18, 30, 25, 0.15);
  transform-origin: 50% 80%;
  transition:
    opacity 500ms ease,
    filter 500ms ease,
    transform 720ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.insideKag__photos figure.is-current {
  z-index: 4;
  opacity: 1;
  transform: translate(0, 0) rotate(0deg) scale(1);
}

.insideKag__photos figure.is-next {
  z-index: 2;
  opacity: 0.75;
  filter: saturate(0.75);
  transform: translate(13px, 17px) rotate(1.8deg) scale(0.965);
}

.insideKag__photos figure.is-past {
  z-index: 6;
  opacity: 0;
  transform: translate(-24%, -12%) rotate(-6deg) scale(0.93);
}

.insideKag__photos img {
  width: 100%;
  height: 100%;
  display: block;
}

/* Critical: both founders must remain visible. */
.insideKag__photos figure.founders img {
  padding: clamp(8px, 1vw, 16px);
  object-fit: contain;
  object-position: center;
  background: #ebe5d9;
}

.insideKag__photos figure.factory img {
  object-fit: cover;
  object-position: center;
}

.insideKag__photos figure.farmer img {
  object-fit: cover;
  object-position: center;
}

.insideKag__photos figcaption {
  position: absolute;
  left: 18px;
  bottom: 18px;
  width: fit-content;
  padding: 10px 13px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  color: white;
  background: rgba(9, 25, 22, 0.5);
  backdrop-filter: blur(10px);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.insideKag__proof {
  position: absolute;
  z-index: 12;
  left: clamp(24px, 5.2vw, 84px);
  bottom: 9%;
  max-width: 520px;
  display: grid;
  grid-template-columns: auto minmax(130px, 190px);
  align-items: end;
  column-gap: 18px;
}

.insideKag__proof strong {
  font-size: clamp(44px, 5.2vw, 76px);
  line-height: 0.82;
  letter-spacing: -0.07em;
  font-variant-numeric: tabular-nums;
}

.insideKag__proof > span {
  padding-left: 16px;
  border-left: 2px solid var(--kag-orange);
  color: #68736f;
  font-size: 11px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.insideKag__proof small {
  grid-column: 1 / -1;
  margin-top: 15px;
  color: #52615d;
  font-size: 12px;
}

@media (max-width: 760px) {
  .insideKag {
    height: 380vh;
  }

  .insideKag__stage {
    min-height: 620px;
  }

  .insideKag__progress {
    left: 20px;
    right: 20px;
    height: 64px;
    grid-template-columns: auto 1fr auto;
    gap: 14px;
    font-size: 8px;
  }

  .insideKag__copy {
    top: 11%;
    left: 20px;
    right: 20px;
    width: auto;
  }

  .insideKag__eyebrow {
    margin-bottom: 11px;
    font-size: 8px;
  }

  .insideKag__copy h2 {
    max-width: 95%;
    font-size: clamp(39px, 11.5vw, 54px);
    line-height: 0.93;
  }

  .insideKag__body {
    max-width: 96%;
    margin-top: 13px;
    font-size: 14px;
    line-height: 1.4;
  }

  .insideKag__photos {
    top: 42%;
    left: 20px;
    right: 20px;
    width: auto;
    height: 37%;
  }

  .insideKag__photos figure {
    border-radius: 23px;
  }

  .insideKag__photos figure.founders img {
    padding: 8px;
    object-fit: contain;
    object-position: center;
  }

  .insideKag__photos figure.factory img {
    object-position: center;
  }

  .insideKag__photos figure.farmer img {
    /* Keep the farmer and Champion torch inside the mobile crop. */
    object-position: 35% center;
  }

  .insideKag__photos figcaption {
    left: 11px;
    bottom: 11px;
    padding: 8px 10px;
    font-size: 7px;
    backdrop-filter: blur(6px);
  }

  .insideKag__proof {
    left: 20px;
    right: 20px;
    bottom: 6%;
    grid-template-columns: auto minmax(115px, 1fr);
    column-gap: 12px;
  }

  .insideKag__proof strong {
    font-size: clamp(36px, 11vw, 47px);
  }

  .insideKag__proof > span {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .insideKag__copy article,
  .insideKag__photos figure {
    transition: none;
  }
}
```

---

## Optional plain JavaScript counter

If the existing website is not React, Claude may reuse the same visual structure
and use this small counter instead:

```js
function animateCounter(element, target, duration = 1800) {
  if (!element || element.dataset.counted === "true") return;
  element.dataset.counted = "true";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = `${target.toLocaleString("en-IN")}+`;
    return;
  }

  const start = performance.now();

  function update(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.floor(target * eased);

    element.textContent = `${value.toLocaleString("en-IN")}+`;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
```

Call it only when the farmer scene first becomes active:

```js
animateCounter(
  document.querySelector("[data-lights-counter]"),
  1_000_000
);
```

---

## Performance requirements

- Use responsive images with correctly sized WebP or AVIF versions.
- Do not load three full-resolution 5–10 MB photographs.
- Suggested exported width:
  - desktop: `1400–1800px`;
  - mobile: `800–1000px`.
- Add explicit `width` and `height` attributes to prevent layout shift.
- Load the first story image normally.
- Lazy-load later images if it does not cause a visible blank frame.
- Animate only `transform` and `opacity`.
- Do not update React state directly for every raw scroll event; retain
  `requestAnimationFrame` throttling.
- Do not add Three.js, WebGL or a large animation dependency for this section.
- Use `100svh` for better mobile browser behaviour.

Example responsive image markup:

```tsx
<img
  src="/images/kag-factory-1400.webp"
  srcSet="
    /images/kag-factory-800.webp 800w,
    /images/kag-factory-1400.webp 1400w
  "
  sizes="(max-width: 760px) calc(100vw - 40px), 45vw"
  width="1400"
  height="1050"
  loading="lazy"
  decoding="async"
  alt="KAG team manufacturing rechargeable lights inside the factory"
/>
```

---

## Accessibility requirements

- Use one semantic `<section>` with a descriptive `aria-label`.
- Use a real `<h2>` for each story headline.
- Decorative stacked copies of inactive images should have empty alt text or
  `aria-hidden="true"`.
- Do not rely on colour alone for scene progress.
- Keep body text contrast at WCAG AA level.
- Counter animation must respect reduced-motion preference.
- The final value must exist as readable text and not only as an animation.

---

## Final acceptance checklist

Claude must verify all of the following before handing back the implementation:

- [ ] Existing hero remains unchanged.
- [ ] Both founders are clearly visible on desktop.
- [ ] Both founders are clearly visible on mobile.
- [ ] No person’s face or body is accidentally cut by `object-fit: cover`.
- [ ] Factory photograph is sharp and manufacturing activity is easy to see.
- [ ] Farmer and red Champion torch remain visible in the mobile crop.
- [ ] Counter starts only when the farmer scene becomes active.
- [ ] Counter runs once and finishes at the verified number.
- [ ] The site does not say “happy farmers” unless KAG has evidence for it.
- [ ] Scroll animation works with touch scrolling.
- [ ] Reduced-motion mode is usable.
- [ ] No text overlaps photographs or statistics at common widths:
  `360px`, `390px`, `768px`, `1024px`, `1440px`.
- [ ] No new heavy animation library has been introduced.

---

## Final instruction to Claude

First inspect the existing project structure and its current styles. Integrate
this section using the project’s existing framework and naming conventions.
Treat the code above as a complete implementation reference, not a reason to
replace working site architecture.

Before finalising, show screenshots or a local preview at:

- desktop `1440 × 900`;
- mobile `390 × 844`.

If the actual founder photograph still crops either person, fix the image
container or art direction before adjusting unrelated typography.
