"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface HomepageMotionProps {
  readonly children: ReactNode;
}

export function HomepageMotion({ children }: HomepageMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const motionCapableViewport = window.matchMedia("(min-width: 64rem)");

    if (reducedMotion.matches || !motionCapableViewport.matches) {
      element.dataset.motion = reducedMotion.matches ? "reduced" : "static";
      return;
    }

    let cleanup: (() => void) | undefined;
    let isCancelled = false;

    async function enhanceMotion() {
      const { gsap } = await import("gsap");

      if (isCancelled || !element) return;

      element.dataset.motion = "ready";

      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        media.add("(min-width: 64rem)", () => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from("[data-hero-media]", {
              clipPath: "inset(0 0 0 10%)",
              duration: 1.05,
            })
            .from(
              "[data-hero-line]",
              { yPercent: 105, duration: 0.78, stagger: 0.07 },
              "-=0.9",
            )
            .from(
              "[data-hero-copy]",
              { autoAlpha: 0, y: 18, duration: 0.58, stagger: 0.06 },
              "-=0.55",
            );
        });
      }, element);

      cleanup = () => {
        media.revert();
        context.revert();
      };
    }

    void enhanceMotion();

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="home-experience" ref={root} data-motion="static">
      {children}
    </div>
  );
}
