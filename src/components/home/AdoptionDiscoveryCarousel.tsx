"use client";

import NextImage, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import catImage from "../../../resimler/kedi.png";
import dogCatImage from "../../../resimler/köpek-kedi.png";
import dogImage from "../../../resimler/köpek.png";

const TRANSITION_DURATION = 650;
const MOBILE_BREAKPOINT = 640;

interface CarouselAnimal {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly label: string;
  readonly background: string;
  readonly panel: string;
}

const carouselAnimals: readonly CarouselAnimal[] = [
  {
    src: dogImage,
    alt: "Oturup kameraya bakan beyaz ve kahverengi bir köpek",
    label: "Köpek",
    background: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: catImage,
    alt: "Kameraya bakan gri bir kedi",
    label: "Kedi",
    background: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: dogCatImage,
    alt: "Yan yana oturan bir köpek ve kedi",
    label: "Köpek ve kedi",
    background: "#E882B4",
    panel: "#ED9DC4",
  },
] as const;

type CarouselDirection = "next" | "prev";
type CarouselRole = "center" | "left" | "right";

function getCarouselRole(index: number, activeIndex: number): CarouselRole {
  if (index === activeIndex) return "center";

  const previousIndex =
    (activeIndex + carouselAnimals.length - 1) % carouselAnimals.length;

  return index === previousIndex ? "left" : "right";
}

function getAnimalStyle(
  role: CarouselRole,
  isMobile: boolean,
  isViewportReady: boolean,
): CSSProperties {
  const transition = isViewportReady
    ? [
        `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        `filter ${TRANSITION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        `opacity ${TRANSITION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        `left ${TRANSITION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        `height ${TRANSITION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
        `bottom ${TRANSITION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
      ].join(", ")
    : "none";

  if (role === "center") {
    return {
      left: "50%",
      bottom: isMobile ? "22%" : 0,
      height: isMobile ? "60%" : "92%",
      zIndex: 20,
      opacity: 1,
      filter: "blur(0)",
      transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
      transition,
    };
  }

  return {
    left:
      role === "left"
        ? isMobile
          ? "20%"
          : "30%"
        : isMobile
          ? "80%"
          : "70%",
    bottom: isMobile ? "32%" : "12%",
    height: isMobile ? "16%" : "28%",
    zIndex: 10,
    opacity: 0.85,
    filter: "blur(2px)",
    transform: "translateX(-50%) scale(1)",
    transition,
  };
}

function ArrowIcon({ direction }: { readonly direction: CarouselDirection }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {direction === "prev" ? (
        <path d="M19 12H5m6 6-6-6 6-6" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

export function AdoptionDiscoveryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isViewportReady, setIsViewportReady] = useState(false);
  const animationTimer = useRef<number | undefined>(undefined);
  const isAnimationLocked = useRef(false);

  const navigate = useCallback((direction: CarouselDirection) => {
    if (isAnimationLocked.current) return;

    isAnimationLocked.current = true;
    setIsAnimating(true);
    setActiveIndex((currentIndex) => {
      const offset = direction === "next" ? 1 : -1;
      return (
        (currentIndex + offset + carouselAnimals.length) %
        carouselAnimals.length
      );
    });

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    animationTimer.current = window.setTimeout(
      () => {
        isAnimationLocked.current = false;
        setIsAnimating(false);
      },
      shouldReduceMotion ? 0 : TRANSITION_DURATION,
    );
  }, []);

  useEffect(() => {
    carouselAnimals.forEach(({ src }) => {
      const image = new window.Image();
      image.src = src.src;
    });

    const updateViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewport();
    const viewportReadyFrame = window.requestAnimationFrame(() => {
      setIsViewportReady(true);
    });

    window.addEventListener("resize", updateViewport, { passive: true });

    return () => {
      window.cancelAnimationFrame(viewportReadyFrame);
      window.removeEventListener("resize", updateViewport);
      if (animationTimer.current !== undefined) {
        window.clearTimeout(animationTimer.current);
      }
      isAnimationLocked.current = false;
    };
  }, []);

  const activeAnimal = carouselAnimals[activeIndex];

  return (
    <section
      aria-labelledby="adoption-discovery-title"
      aria-roledescription="karusel"
      className="adoption-carousel"
      data-viewport-ready={isViewportReady}
      style={
        {
          backgroundColor: activeAnimal.background,
          "--adoption-carousel-panel": activeAnimal.panel,
        } as CSSProperties
      }
    >
      <div className="adoption-carousel__stage">
        <div className="adoption-carousel__contrast" aria-hidden="true" />
        <div className="adoption-carousel__grain" aria-hidden="true" />

        <p className="adoption-carousel__ghost" aria-hidden="true">
          Sahiplen Beşiktaş
        </p>

        <p className="adoption-carousel__brand">Beşiktaş Belediyesi</p>

        <div className="adoption-carousel__animals">
          {carouselAnimals.map((animal, index) => {
            const role = getCarouselRole(index, activeIndex);
            const isFeatured = role === "center";

            return (
              <div
                aria-hidden={!isFeatured}
                className="adoption-carousel__animal"
                data-role={role}
                key={animal.label}
                style={getAnimalStyle(role, isMobile, isViewportReady)}
              >
                <NextImage
                  alt={isFeatured ? animal.alt : ""}
                  draggable={false}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 639px) 76vw, 58vw"
                      : "(max-width: 639px) 20vw, 18vw"
                  }
                  src={animal.src}
                  unoptimized
                />
              </div>
            );
          })}
        </div>

        <div className="adoption-carousel__copy">
          <h2 id="adoption-discovery-title">
            Sahiplenmek bir bağ kurmaktır
          </h2>
          <p>
            Birlikte yaşayacağınız dostunuzu keşfedin. Karakterini, hikâyesini
            ve ihtiyaçlarını tanıyın; size en uygun hayvanla yeni bir hayatın
            kapısını aralayın.
          </p>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {activeAnimal.label}, {activeIndex + 1} / {carouselAnimals.length}
          </p>

          <div
            aria-label="Öne çıkan hayvanı değiştir"
            className="adoption-carousel__controls"
            role="group"
          >
            <button
              aria-label="Önceki hayvan"
              disabled={isAnimating}
              onClick={() => navigate("prev")}
              type="button"
            >
              <ArrowIcon direction="prev" />
            </button>
            <button
              aria-label="Sonraki hayvan"
              disabled={isAnimating}
              onClick={() => navigate("next")}
              type="button"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>

        <Link className="adoption-carousel__cta" href="/sahiplendirme">
          Hayvanları keşfet
          <ArrowIcon direction="next" />
        </Link>
      </div>
    </section>
  );
}
