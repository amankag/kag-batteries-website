"use client";

import { useEffect, useState } from "react";

export function useOverHero() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const heroEl = document.getElementById("tiger-hero");
    if (!heroEl) {
      setOverHero(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), { threshold: 0 });
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return overHero;
}
