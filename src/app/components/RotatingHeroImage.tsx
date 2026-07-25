"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface RotatingProduct {
  slug: string;
  name: string;
  image: string;
}

const ROTATE_MS = 3500;
const RESUME_DELAY_MS = 600;

export default function RotatingHeroImage({
  products,
  className = "",
  sizes = "220px",
}: {
  products: RotatingProduct[];
  className?: string;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || products.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % products.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reducedMotion, products.length]);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const resume = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  };

  const current = products[index];
  if (!current) return null;

  return (
    <Link
      href={`/products/${current.slug}`}
      aria-label={`View ${current.name}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onFocus={pause}
      onBlur={resume}
      className={`relative block overflow-hidden ${className}`}
    >
      {products.map((p, i) => (
        <Image
          key={p.slug}
          src={p.image}
          alt={p.name}
          fill
          priority={i === 0}
          className={`object-contain mix-blend-multiply ${
            reducedMotion ? "" : "transition-opacity duration-[600ms] ease-in-out"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
          sizes={sizes}
        />
      ))}
    </Link>
  );
}
