# Claude Implementation Brief — KAG Tiger Typography-Squeeze Hero

Use this brief to replace only the first/hero section of the existing KAG website. Do not rebuild or redesign unrelated sections.

## Reference

Working reference demo:

https://kag-tiger-type-crush.amankag.chatgpt.site

Open the reference on both desktop and mobile and scroll slowly through the complete hero before implementing it.

## Product image

Use the exact transparent Tiger KB-81 product image supplied with this brief.

Preferred project path:

```text
public/tiger-kb81.png
```

If the existing project already contains the uploaded image under another filename, reuse it and update the image path in the component. Do not regenerate, redraw, recolour, crop into the torch, or replace the product with a similar model.

The source image is approximately `1122 × 1402`, RGBA PNG with transparent background.

## Objective

Create a premium, editorial, scroll-controlled hero on a warm-white background. A large Tiger torch begins inside oversized typography, grows toward the viewer and forces the words apart, producing a convincing 3D layering effect. At the end, the background typography fades and the product introduction becomes clean and readable.

This is not an autoplay carousel and not a normal entrance animation. The entire sequence must be controlled by the visitor’s scroll position and must reverse naturally when the visitor scrolls upward.

## Final visual direction

- Warm industrial white background: `#f4f1e9`
- Primary text: `#11120f`
- Tiger orange accent: `#ff7900`
- Fine border lines: `#cec9bd`
- Very subtle warm paper grain
- Large, tightly spaced, heavy sans-serif typography
- Clean editorial advertising style
- No dark hero background
- No gradients that make it look like a generic AI landing page
- No glassmorphism
- No floating cards
- No particles
- No video, WebGL, Three.js or 3D product model

## Hero structure

The hero should occupy approximately:

```css
height: 330vh; /* desktop */
height: 300vh; /* mobile */
```

Inside it, create a viewport-height sticky stage:

```css
position: sticky;
top: 0;
height: 100svh;
overflow: hidden;
```

The sticky stage remains visible while scroll progress moves from `0` to `1`. After the sequence completes, release naturally into the existing next section.

## Navigation

At the top of the sticky hero:

- KAG logo on the left
- `RECHARGEABLE TORCHES · INDORE` centred on desktop
- Circular menu button on the right
- Thin grey divider underneath
- On mobile, hide the centred descriptor and retain the logo and menu

Add a small label below the navigation:

```text
01  ───  TIGER SERIES
```

## Main typography

Use these exact words:

```text
BUILT FOR
LONG NIGHTS.
```

Desktop:

- Display in two very large horizontal rows.
- `BUILT` and `NIGHTS.` are near-black.
- `FOR` and `LONG` are orange.
- Use approximately `15vw`, capped near `230px`.
- Use heavy weight, very tight tracking around `-0.095em`, and tight line height around `0.76`.

Mobile:

- Stack the words vertically to preserve impact:

```text
BUILT
FOR
LONG
NIGHTS.
```

- Use approximately `23vw`, with a practical clamp.
- On screens under `380px`, reduce it to approximately `21.5vw`.

## Scroll calculation

Use one scroll-progress value from `0` to `1`.

Suggested React logic:

```js
const rect = heroElement.getBoundingClientRect();
const travel = heroElement.offsetHeight - window.innerHeight;
const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
```

Update through `requestAnimationFrame` from passive scroll and resize listeners. Clean up listeners and the pending animation frame when the component unmounts.

Expose progress to CSS:

```jsx
style={{ "--p": progress }}
```

Use three display phases:

```js
phase 1: progress < 0.28
phase 2: progress >= 0.28 && progress < 0.68
phase 3: progress >= 0.68
```

## Animation sequence

### Phase 1 — Initial composition

- Oversized words dominate the viewport.
- Torch is relatively small, sitting in the centre of the headline.
- Torch begins around `-8deg` on desktop and `-9deg` on mobile.
- Add the instruction `SCROLL TO MAKE ROOM`.
- Counter displays `01 / 03`.

The product must already be visible in the first viewport. Do not make the first screen empty.

### Phase 2 — Typography squeeze

As progress increases:

- Torch scales up smoothly toward the viewer.
- Torch rotates toward `0deg`.
- `BUILT` moves left.
- `FOR` moves right.
- `LONG` moves left.
- `NIGHTS.` moves right.
- On mobile, the upper text group also moves upward and the lower group moves downward.
- Torch overlaps the text.
- Add a soft, realistic contact/drop shadow.
- Add a restrained white reflector highlight after roughly 42% progress.
- Instruction changes to `KEEP PUSHING`.
- Counter changes to `02 / 03`.

The movement should feel like the physical product is forcing the typography apart—not like four unrelated words drifting randomly.

### Phase 3 — Product reveal

Desktop:

- Move the torch toward the left.
- Keep it large and visually dominant.
- Fade the oversized background typography away.
- Reveal the product name, headline and CTA on the right.

Mobile:

- Do not push the torch out to the left.
- Keep it horizontally centred.
- Move it upward to create a clear lower text area.
- Keep the final torch scale smaller than desktop, approximately `0.84` relative to its mobile wrapper.
- Fade the oversized typography away before the final product copy becomes fully visible.

Final copy:

```text
TIGER KB-81

Heavy-duty light,
built to keep going.

[ Explore Tiger ↗ ]
```

Instruction changes to `MEET TIGER`.
Counter changes to `03 / 03`.

The product copy must not sit on top of the oversized background words. Fade the background typography near the final stage:

```css
opacity: clamp(0, calc((0.92 - var(--p)) * 5), 1);
```

Reveal the product information only near the final stage:

```css
opacity: clamp(0, calc((var(--p) - 0.7) * 5), 1);
```

Disable pointer interaction on the hidden CTA and enable it only in phase 3.

## Desktop product movement

Use the transparent PNG inside a positioned product wrapper. The reference behaviour is approximately:

```css
left: 50%;
top: 50%;
width: min(59vw, 820px);
transform:
  translate(
    calc(-50% - max(0px, (var(--p) - 0.7) * 55vw)),
    calc(-24% - var(--p) * 24%)
  )
  rotate(calc(-8deg + var(--p) * 8deg))
  scale(calc(0.58 + var(--p) * 0.49));
```

Adjust only if required to match the project’s actual header height or font metrics.

## Mobile product movement

For widths up to `700px`, use a separate movement path:

```css
top: 49%;
width: 112vw;
transform:
  translate(-50%, calc(-13% - var(--p) * 46%))
  rotate(calc(-9deg + var(--p) * 9deg))
  scale(calc(0.48 + var(--p) * 0.36));
```

For widths below `380px`, increase the product wrapper only if required, up to approximately `118vw`, while reducing headline size.

The final mobile layout should place:

- Product in the upper/middle part of the screen
- Product name and headline in the lower part
- CTA above the bottom progress instruction
- No overlap with browser controls, navigation or the next section

## 3D layering

Create depth through normal HTML/CSS layering:

1. Oversized typography: lower z-index
2. Product and product shadow: middle z-index
3. Optional clipped outline fragment of `NIGHTS.`: above product on desktop only
4. Final product information and CTA: highest content z-index

The optional front text fragment should be a subtle outlined/clipped slice. Do not place a full duplicate word over the product. Hide this effect on mobile.

## Product treatment

- Keep the transparent product image sharp and colour accurate.
- Use `object-fit: contain`.
- Define explicit image width and height to prevent layout shift.
- Disable dragging and text selection on the image.
- Use a restrained drop shadow that increases slightly with progress.
- Add a soft blurred elliptical shadow underneath.
- Add a subtle white reflector flare; do not make the torch look switched on with an unrealistic giant beam.

## Bottom controls

Bottom left:

```text
────  SCROLL TO MAKE ROOM
```

The short line contains a small orange indicator sliding horizontally.

Bottom right:

```text
01 / 03
```

Update this label by phase.

On mobile, reduce spacing and font size but keep both elements visible.

## Responsive requirements

Test at:

- `320 × 568`
- `360 × 800`
- `375 × 812`
- `390 × 844`
- `430 × 932`
- `768 × 1024`
- `1366 × 768`
- `1440 × 900`

Check all three scroll phases at every important mobile width.

Required:

- No horizontal scrollbar
- No clipped menu
- No headline covering final product copy
- No CTA behind the product
- No product moving off-screen on mobile
- No jump when browser UI changes viewport height
- Use `100svh` rather than only `100vh`
- Preserve desktop behaviour while adjusting mobile

## Performance requirements

- Do not add animation libraries solely for this hero.
- Use CSS transforms and opacity.
- Update scroll state through `requestAnimationFrame`.
- Use passive scroll listeners.
- Define intrinsic image dimensions.
- Keep only one product image.
- Do not animate large blur filters continuously.
- Avoid React state beyond scroll progress and derived phase.
- Respect `prefers-reduced-motion`.

For reduced motion, retain the composition and content but remove the repeating instruction-line animation and avoid unnecessary smooth scrolling.

## Accessibility

- Hero section label: `Tiger KB-81 product introduction`
- Product alt text: `Orange KAG Tiger KB-81 rechargeable torch`
- Menu must be a real button with an accessible label.
- KAG logo must be a real link.
- CTA must be a real link.
- Decorative duplicate typography, shadows and flare must be `aria-hidden`.
- Hidden final CTA must not be interactable until visible.

## Integration rules

1. Inspect the existing project structure before editing.
2. Replace only the existing hero/first-page experience.
3. Preserve the existing product catalogue and later sections.
4. Reuse the project’s existing navigation destinations and real CTA URL.
5. Reuse the project’s logo asset if available; otherwise retain the text logo temporarily.
6. Do not add a second navigation bar.
7. Remove old hero carousel timers, old rotating-square styles and obsolete event listeners only after confirming they are no longer used.
8. Do not duplicate scroll listeners.
9. Keep desktop and mobile styles in the same maintainable component/style system.
10. If the project is not React, reproduce the same calculation using the existing framework rather than migrating the site.

## Verification checklist

Before returning the files:

- Confirm the first state shows the product inside the typography.
- Confirm scrolling enlarges and rotates the torch.
- Confirm the four headline words move apart coherently.
- Confirm scrolling backward reverses the complete sequence.
- Confirm the final desktop state has product left and copy right.
- Confirm the final mobile state has product centred/upward and copy below.
- Confirm the final background typography fades sufficiently for readability.
- Confirm the CTA works.
- Confirm the hero releases naturally into the existing next section.
- Confirm there are no console errors from the implementation.
- Confirm no unrelated sections were changed.

After implementation, report:

- Files changed
- Old hero code removed
- Responsive breakpoints used
- How the scroll progress is calculated
- Any assumptions about the product image path or CTA destination

