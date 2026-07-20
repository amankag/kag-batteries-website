"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteMotion() {
  useGSAP(() => {
    const context = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        y: 42,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 48, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((element) => {
        gsap.fromTo(element, { scale: 0.8, opacity: 0.2, filter: "grayscale(1)" }, {
          scale: 1,
          opacity: 1,
          filter: "grayscale(0)",
          ease: "none",
          scrollTrigger: { trigger: element, start: "top 92%", end: "top 24%", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-word-reveal]").forEach((element) => {
        const words = element.textContent?.split(" ") ?? [];
        element.innerHTML = words.map((word) => `<span class="inline-block" style="opacity:.12">${word}&nbsp;</span>`).join("");
        gsap.to(element.querySelectorAll("span"), {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top 78%", end: "bottom 42%", scrub: true },
        });
      });

      const story = document.querySelector<HTMLElement>("[data-pin-story]");
      const title = document.querySelector<HTMLElement>("[data-pin-title]");
      if (story && title) {
        ScrollTrigger.create({ trigger: story, pin: title, start: "top top+=120", end: "bottom bottom-=120", pinSpacing: false });
      }
    });

    return () => context.revert();
  }, []);

  return null;
}
