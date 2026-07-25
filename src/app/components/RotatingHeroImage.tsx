"use client";

import Image from "next/image";
import Link from "next/link";
import { useImageRotator } from "./useImageRotator";

interface RotatingProduct {
  slug: string;
  name: string;
  image: string;
}

export default function RotatingHeroImage({
  products,
  className = "",
  sizes = "220px",
}: {
  products: RotatingProduct[];
  className?: string;
  sizes?: string;
}) {
  const { index, reducedMotion, pause, resume } = useImageRotator(products.length);
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
