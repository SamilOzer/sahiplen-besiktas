"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const chapters = [
  {
    number: "01",
    eyebrow: "Bekleyiş",
    title: "Her hikâye sessizlikle başlar.",
    copy: "Aynı yerde, aynı sabahı bekleyen iki ayrı hayat.",
  },
  {
    number: "02",
    eyebrow: "Karşılaşma",
    title: "Bazen tek gereken, küçük bir bakıştır.",
    copy: "Güven büyük bir anda değil, birbirini fark etmekle geri gelir.",
  },
  {
    number: "03",
    eyebrow: "Güven",
    title: "Sonra yol, birlikte yürünür.",
    copy: "Yan yana atılan her adım, yeni bir başlangıca yaklaşır.",
  },
  {
    number: "04",
    eyebrow: "Yeni başlangıç",
    title: "Hikâyenin devamı, sizin eviniz olabilir.",
    copy: "Beşiktaş’ta yuva arayanlarla tanışın.",
  },
] as const;

const connectorPaths = [
  "M 8 30 H 30 C 38 30 38 44 48 48",
  "M 92 28 H 72 C 64 28 63 40 54 45",
  "M 8 72 H 30 C 38 72 39 61 48 57",
  "M 92 70 H 72 C 64 70 63 59 54 55",
] as const;

export function HomepageExperience() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const rootElement = root.current;
    const videoNode = video.current;
    if (!rootElement || !videoNode) return;

    const element: HTMLDivElement = rootElement;
    const videoElement: HTMLVideoElement = videoNode;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let cleanup: (() => void) | undefined;
    let isCancelled = false;
    let hasBuilt = false;
    let mediaFailed = false;

    function showStaticFrame() {
      cleanup?.();
      cleanup = undefined;
      hasBuilt = false;
      element.dataset.motion = "static";
    }

    async function buildStory() {
      if (hasBuilt || isCancelled) return;
      hasBuilt = true;

      if (prefersReducedMotion.matches || mediaFailed) {
        showStaticFrame();
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) return;
      if (prefersReducedMotion.matches || mediaFailed) {
        showStaticFrame();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      element.dataset.motion = "ready";

      const context = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]");
        const markers = gsap.utils.toArray<HTMLElement>("[data-story-marker]");
        const connectors = gsap.utils.toArray<SVGGElement>(
          "[data-connector-group]",
        );
        const paths = gsap.utils.toArray<SVGPathElement>(
          "[data-connector-path]",
        );

        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        gsap.set(panels.slice(1), { autoAlpha: 0, y: 22 });
        gsap.set(markers.slice(1), { autoAlpha: 0, y: 8 });
        gsap.set(connectors.slice(1), { autoAlpha: 0 });
        gsap.set("[data-story-action]", { autoAlpha: 0, y: 14 });

        const videoEndTime = Math.max(videoElement.duration - 0.08, 0);
        const syncVideoToScroll = (progress: number) => {
          const targetTime = progress * videoEndTime;

          if (Math.abs(videoElement.currentTime - targetTime) > 1 / 60) {
            videoElement.currentTime = targetTime;
          }
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: (self) => syncVideoToScroll(self.progress),
            onUpdate: (self) => syncVideoToScroll(self.progress),
          },
        });

        timeline
          .to("[data-progress-fill]", { scale: 1, duration: 1 }, 0)
          .to("[data-scroll-hint]", { autoAlpha: 0, duration: 0.07 }, 0.08);

        const starts = [0, 0.24, 0.49, 0.74];
        const ends = [0.21, 0.46, 0.71, 1];

        panels.forEach((panel, index) => {
          const start = starts[index];
          const end = ends[index];
          const connector = connectors[index];
          const path = paths[index];
          const marker = markers[index];

          if (index === 0) {
            timeline.to(path, { strokeDashoffset: 0, duration: 0.09 }, 0.01);
          } else {
            timeline
              .to(
                panel,
                { autoAlpha: 1, duration: 0.07, ease: "power2.out", y: 0 },
                start,
              )
              .to(connector, { autoAlpha: 1, duration: 0.04 }, start)
              .to(path, { strokeDashoffset: 0, duration: 0.08 }, start + 0.01)
              .to(
                marker,
                { autoAlpha: 1, duration: 0.04, ease: "power2.out", y: 0 },
                start,
              );
          }

          if (index < panels.length - 1) {
            timeline
              .to(
                panel,
                { autoAlpha: 0, duration: 0.05, ease: "power1.in", y: -14 },
                end,
              )
              .to(connector, { autoAlpha: 0, duration: 0.04 }, end)
              .to(marker, { autoAlpha: 0, duration: 0.04, y: -8 }, end);
          }
        });

        timeline.to(
          "[data-story-action]",
          { autoAlpha: 1, duration: 0.08, ease: "power2.out", y: 0 },
          0.84,
        );
      }, element);

      const refresh = () => { if (!isCancelled && element.dataset.motion === "ready") ScrollTrigger.refresh(); };
      document.fonts.ready.then(refresh).catch(() => undefined);
      cleanup = () => context.revert();
    }

    function requestStory() {
      void buildStory().catch(() => { if (!isCancelled) showStaticFrame(); });
    }

    function handleMediaError() {
      mediaFailed = true;
      showStaticFrame();
    }

    function handleMotionChange() {
      if (prefersReducedMotion.matches) showStaticFrame();
      else if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) requestStory();
    }

    videoElement.addEventListener("error", handleMediaError);
    videoElement.addEventListener("loadedmetadata", requestStory);
    prefersReducedMotion.addEventListener("change", handleMotionChange);
    if (prefersReducedMotion.matches) showStaticFrame();
    else if (videoElement.error) handleMediaError();
    else if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) requestStory();

    return () => {
      isCancelled = true;
      videoElement.removeEventListener("loadedmetadata", requestStory);
      videoElement.removeEventListener("error", handleMediaError);
      prefersReducedMotion.removeEventListener("change", handleMotionChange);
      cleanup?.();
    };
  }, []);

  return (
    <div className="scroll-story" ref={root} data-motion="loading">
      <div className="scroll-story__stage">
        <video
          aria-hidden="true"
          className="scroll-story__video"
          muted
          playsInline
          preload="metadata"
          poster="/assets/animals/human-dog-bond.webp"
          ref={video}
          src="/assets/video/adoption-story-scroll.mp4"
        />
        <noscript><style>{`.scroll-story{height:auto!important;min-height:0!important;margin-top:var(--header-height)}.scroll-story__annotation:not(:last-child),.scroll-story__connectors,.scroll-story__scroll-hint,.scroll-story__meta,.scroll-story__progress{display:none!important}.scroll-story__annotation:last-child,.scroll-story__action{visibility:visible!important;opacity:1!important;transform:none!important}`}</style></noscript>
        <div className="scroll-story__scrim" aria-hidden="true" />
        <div className="scroll-story__noise" aria-hidden="true" />

        <div className="sr-only">
          <h1>Birlikte yazılan bir sahiplendirme hikâyesi</h1>
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.number}>
                <strong>{chapter.title}</strong> {chapter.copy}
              </li>
            ))}
          </ol>
        </div>

        <div className="scroll-story__annotations" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <article
              className={`scroll-story__annotation scroll-story__annotation--${index + 1}`}
              data-story-panel
              key={chapter.number}
            >
              <p className="scroll-story__eyebrow">
                {chapter.number} — {chapter.eyebrow}
              </p>
              <p className="scroll-story__title">{chapter.title}</p>
              <p className="scroll-story__copy">{chapter.copy}</p>
            </article>
          ))}
        </div>

        <svg
          aria-hidden="true"
          className="scroll-story__connectors"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {connectorPaths.map((path, index) => (
            <g data-connector-group key={path}>
              <path d={path} data-connector-path />
              <circle cx={index % 2 === 0 ? 48 : 54} cy={index < 2 ? 48 - index * 3 : 57 - (index - 2) * 2} r="0.5" />
            </g>
          ))}
        </svg>

        <div className="scroll-story__meta" aria-hidden="true">
          <span className="scroll-story__marker-window">
            {chapters.map((chapter) => (
              <span data-story-marker key={chapter.number}>
                {chapter.number}
              </span>
            ))}
          </span>
          <span>/ 04</span>
        </div>

        <div className="scroll-story__progress" aria-hidden="true">
          <span className="scroll-story__progress-track">
            <span data-progress-fill />
          </span>
        </div>

        <p className="scroll-story__scroll-hint" data-scroll-hint>
          Hikâyeyi kaydır
          <span aria-hidden="true" />
        </p>

        <Link
          className="scroll-story__action"
          data-story-action
          href="/sahiplendirme"
        >
          Yuva arayanlarla tanış
          <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
