# KAG Product Range — Mobile Collision Fix

Give this file to Claude together with the current website project and the
mobile screenshot showing the problem.

## Objective

Correct the mobile rendering of the existing KAG product-range section without
redesigning the section.

The selected-product kicker currently reads:

`01 — TIGER SERIES · LONG-RANGE`

On mobile, that kicker occupies almost the same vertical position as the bottom
border of the product-tab strip. The border passes through the letters, making
the top of the section look broken and jagged.

This must be fixed on every product scene:

1. Tiger
2. Champion
3. Venus
4. Power House
5. Full Range

## Important diagnosis

The problem is not the text itself. It is caused by two independently
positioned elements overlapping:

- `.range-head` contains the horizontal product tabs and their bottom border.
- `.product-copy` uses `top: 20%` on mobile.

On a short mobile viewport, `20%` places `.product-copy` at approximately the
same height as the tab-strip divider. Do not fix this using a random margin,
negative translation, or a white rectangle over the line.

Create a clear vertical boundary between the navigation band and the product
content.

## Non-negotiable requirements

- Preserve the desktop layout.
- Preserve the existing scrolling product transitions.
- Keep the product tabs on one line.
- Keep the tabs horizontally scrollable and clickable.
- Keep the active tab automatically moving into view.
- Do not allow a tab label to wrap.
- The selected-product kicker must start at least `18px` below the tab divider.
- No border or decorative line may pass through any text.
- Keep the headline, CTA, background scene, product image and “Made for” chips.
- Maintain a visible gap between the CTA and the product image.
- Do not reintroduce the oversized background numerals.
- Catalogue-labelled links must continue to point to `/catalogue`.
- Test every product, not only Tiger.

---

## Recommended React correction

Make the kicker structure addressable so the repeated slide number can be
hidden on mobile. The tab above already identifies the product as `01`, `02`,
etc., so repeating the number in the kicker is unnecessary on a small screen.

Replace:

```tsx
<p>{product.id} — {product.eyebrow}</p>
```

with:

```tsx
<p className="product-kicker">
  <span className="product-kicker-index">{product.id} — </span>
  <span>{product.eyebrow}</span>
</p>
```

This preserves the full desktop label while allowing the mobile version to show
only:

```text
TIGER SERIES · LONG-RANGE
```

Do not remove the accessible product identity from the tabs.

---

## Recommended CSS correction

Keep the current desktop rules. Add or replace the relevant rules inside the
existing `@media (max-width: 760px)` block.

```css
@media (max-width: 760px) {
  /*
   * MOBILE VERTICAL ZONES
   *
   * Header:       0–64px
   * Range label:  79px onward
   * Tab divider:  approximately 132–138px
   * Product copy: starts at 158px
   *
   * Using a fixed mobile content boundary prevents short viewport heights
   * from moving the kicker back into the tab divider.
   */

  .range-head {
    top: 79px;
    left: 20px;
    right: 20px;
  }

  .range-head > span {
    margin-bottom: 11px;
    font-size: 8px;
  }

  .product-tabs {
    display: flex;
    gap: 0;
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x proximity;
    scroll-behavior: smooth;
    scrollbar-width: none;
    white-space: nowrap;

    -webkit-mask-image:
      linear-gradient(
        90deg,
        transparent 0,
        #000 16px,
        #000 calc(100% - 16px),
        transparent 100%
      );
    mask-image:
      linear-gradient(
        90deg,
        transparent 0,
        #000 16px,
        #000 calc(100% - 16px),
        transparent 100%
      );
  }

  .product-tabs::-webkit-scrollbar {
    display: none;
  }

  .product-tabs button {
    flex: 0 0 auto;
    min-width: 126px;
    min-height: 34px;
    padding-left: 9px;
    font-size: 7px;
    white-space: nowrap;
    scroll-snap-align: center;
  }

  .product-tabs button:first-child {
    padding-left: 0;
  }

  /*
   * IMPORTANT:
   * Do not use top: 20% here. A percentage changes with viewport height and
   * caused the collision seen in the screenshot.
   */
  .product-copy {
    top: 158px;
    left: 20px;
    right: 20px;
    width: auto;
  }

  .product-kicker {
    display: flex;
    align-items: center;
    max-width: 100%;
    margin: 0 0 11px;
    overflow: hidden;
    color: var(--accent);
    font-size: 8px;
    font-weight: 900;
    letter-spacing: 0.19em;
    line-height: 1.2;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .product-kicker-index {
    display: none;
  }

  .product-kicker > span:last-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-copy h1 {
    font-size: clamp(36px, 10.8vw, 48px);
    line-height: 0.86;
  }

  .product-copy > a {
    margin-top: 11px;
    padding: 9px 12px;
    font-size: 9px;
  }

  /*
   * Keep a physical gap below the copy and CTA.
   * Adjust only if Claude measures an overlap at a tested viewport.
   */
  .product-zone {
    top: 54%;
    left: 10%;
    right: 10%;
    width: auto;
    height: 23%;
  }
}
```

## Extra protection for short phones

Add this only after inspecting the normal mobile layout. It prevents crowding on
phones around `568–667px` tall without changing taller phones.

```css
@media (max-width: 760px) and (max-height: 680px) {
  .product-copy {
    top: 152px;
  }

  .product-copy h1 {
    font-size: clamp(34px, 10.2vw, 43px);
  }

  .product-copy > a {
    margin-top: 9px;
  }

  .product-zone {
    top: 55%;
    height: 21%;
  }

  .made-for {
    bottom: 7.5%;
  }
}
```

Do not move `.product-copy` above the tab divider to gain space. Reduce the
headline or product-zone size slightly on short screens instead.

---

## Preserve the active-tab auto-follow behaviour

The current implementation should retain this pattern:

```tsx
const tabsRef = useRef<HTMLDivElement>(null);
const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

useEffect(() => {
  const strip = tabsRef.current;
  const tab = tabRefs.current[active];

  if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;

  strip.scrollTo({
    left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
    behavior: "smooth",
  });
}, [active]);
```

Each tab button must keep its corresponding ref:

```tsx
ref={(node) => {
  tabRefs.current[index] = node;
}}
```

Do not use `scrollIntoView()` if it causes the entire page to move vertically.
Only scroll the horizontal tab container.

---

## Hover and touch behaviour for the Full Range torches

Keep the subtle desktop hover enlargement, but apply it only on devices that
actually support hover. Touch devices should not leave a torch stuck in a
hovered state.

```css
@media (hover: hover) and (pointer: fine) {
  .range-product:hover img,
  .range-product:focus-visible img {
    transform: translateY(-7px) scale(1.09);
    filter: drop-shadow(0 25px 18px rgba(0, 0, 0, 0.5));
  }
}

.range-product:focus-visible {
  z-index: 8;
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 14px;
}
```

The first four range torches should return to their showcase scenes. Models
without a dedicated scene should link to their catalogue anchors.

---

## Claude implementation instruction

Use this prompt with the project:

> Analyse the existing `page.tsx` and `globals.css` before editing. Fix the
> mobile collision shown in the attached screenshot where the selected-product
> kicker (`01 — TIGER SERIES · LONG-RANGE`) overlaps the product-tab divider.
> Treat the tab navigation and product copy as separate fixed mobile layout
> zones. Do not patch the problem with negative margins, transforms, line
> masking or an overlay. Preserve desktop, scroll animation, the horizontal
> auto-following tabs, product imagery, CTA links, full-range interactions and
> current visual style. Implement the React kicker markup and responsive CSS
> described in `KAG_PRODUCT_RANGE_MOBILE_FIX_FOR_CLAUDE.md`. Check the computed
> rectangles of the tab divider, kicker, headline, CTA and product image. There
> must be at least 18px between the tab divider and kicker and visible space
> between the CTA and product image. Test every product scene plus Full Range at
> widths 320, 360, 375, 390, 400 and 430px, including short 568–680px-high
> viewports. Correct any remaining overlap without changing the desktop design.

---

## Required QA checklist

Claude should not mark the task complete until all checks pass:

- [ ] Tiger kicker is fully below the tab divider.
- [ ] Champion kicker is fully below the tab divider.
- [ ] Venus kicker is fully below the tab divider.
- [ ] Power House kicker is fully below the tab divider.
- [ ] Full Range heading is below the navigation strip.
- [ ] No tab label wraps to a second line.
- [ ] Active tab scrolls into view horizontally.
- [ ] All tabs remain clickable/tappable.
- [ ] No CTA touches or overlaps a torch.
- [ ] No torch is hidden behind the catalogue CTA.
- [ ] “Made for” chips remain visible and do not collide with the scroll note.
- [ ] Desktop composition is unchanged.
- [ ] Catalogue links point to `/catalogue` or the appropriate catalogue anchor.
- [ ] Keyboard focus is visible on clickable range torches.
- [ ] Touch devices do not retain a false hover enlargement.
- [ ] No horizontal page overflow exists; only the tab strip may scroll.

## Preferred verification method

Claude should compare element rectangles, not rely only on a screenshot:

```js
const tabStrip = document.querySelector(".product-tabs");
const kicker = document.querySelector(".product-kicker");
const cta = document.querySelector(".product-copy > a");
const product = document.querySelector(".product-zone");

const tabBottom = tabStrip?.getBoundingClientRect().bottom ?? 0;
const kickerTop = kicker?.getBoundingClientRect().top ?? 0;
const ctaBottom = cta?.getBoundingClientRect().bottom ?? 0;
const productTop = product?.getBoundingClientRect().top ?? 0;

console.table({
  tabToKickerGap: kickerTop - tabBottom,
  ctaToProductGap: productTop - ctaBottom,
});
```

Passing minimums:

```text
tabToKickerGap >= 18px
ctaToProductGap >= 14px
```

If either value fails, adjust the mobile content zones and recheck every target
viewport. Do not compensate by hiding important content.
