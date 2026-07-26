"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(active: boolean, target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  // Only latches once the animation actually completes — not when it merely
  // starts — so React 18 Strict Mode's dev-only mount→cleanup→remount replay
  // (which cancels the first, never-painted attempt) doesn't get blocked out
  // of the real run by a flag set before anything actually finished.
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doneRef.current = true;
      setValue(target);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        doneRef.current = true;
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}
