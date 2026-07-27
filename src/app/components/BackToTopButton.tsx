"use client";

import { useEffect, useRef, useState } from "react";
import { useOverHero } from "./useOverHero";
import { useIsMobile } from "./useIsMobile";

export default function BackToTopButton() {
  const [pastThreshold, setPastThreshold] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const lastY = useRef(0);

  const overHero = useOverHero();
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setPastThreshold(y > window.innerHeight * 1.1);
      setScrollingUp((prev) => (y < lastY.current - 2 ? true : y > lastY.current + 2 ? false : prev));
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On mobile, this button only makes sense once the hero (and its own
  // floating WhatsApp button) has been scrolled past — it then takes over
  // WhatsApp's old bottom-right slot instead of stacking above it.
  const mobileTookOver = isMobile && !overHero;
  const hiddenInHero = isMobile && overHero;
  const visible = pastThreshold && scrollingUp && !hiddenInHero;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#11120f]/15 bg-white/90 text-[#11120f] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#ff7900] hover:text-white active:scale-95 ${
        mobileTookOver ? "bottom-6" : "bottom-24"
      } ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
