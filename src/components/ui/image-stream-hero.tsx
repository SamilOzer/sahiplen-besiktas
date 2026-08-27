"use client";

/* eslint-disable @next/next/no-img-element -- Preserves the supplied ImageStreamHero rendering architecture. */

import {
  type HTMLAttributes,
  type ReactNode,
  useId,
  useMemo,
} from "react";

import { cn } from "@/lib/utils";

type ImageStreamItem = {
  src: string;
  alt?: string;
};

type CorridorPath = {
  perspective: number;
  cardWidth: number;
  cardHeight: number;
  cardRadius: number;
  birthHeight: number;
  exitHeight: number;
  railBirth: number;
  railExit: number;
  fan: number;
  turnBirth: number;
  turnExit: number;
  stops: number;
};

type ImageStreamHeroProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  images: readonly ImageStreamItem[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: Partial<CorridorPath>;
  children?: ReactNode;
};

const DEFAULT_CORRIDOR_PATH: CorridorPath = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

function generateKeyframes(
  direction: number,
  animationName: string,
  path: CorridorPath,
) {
  const frames: string[] = [];

  for (let index = 0; index <= path.stops; index += 1) {
    const progress = index / path.stops;
    const scale =
      (path.birthHeight / path.cardHeight) *
      Math.pow(path.exitHeight / path.birthHeight, progress);
    const depth = path.perspective * (1 - 1 / scale);
    const rail =
      path.railExit -
      (path.railExit - path.railBirth) *
        Math.pow(1 - progress, path.fan);
    const turn =
      path.turnBirth + (path.turnExit - path.turnBirth) * progress;

    frames.push(
      `${(progress * 100).toFixed(2)}%{transform:translate3d(${(
        direction * rail
      ).toFixed(2)}cqw,0,${depth.toFixed(2)}cqw) rotateY(${(
        -direction * turn
      ).toFixed(2)}deg)}`,
    );
  }

  return `@keyframes ${animationName}{${frames.join("")}}`;
}

function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className,
  ...props
}: ImageStreamHeroProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rightAnimation = `ish-r-${id}`;
  const leftAnimation = `ish-l-${id}`;
  const cardClassName = `ish-c-${id}`;
  const corridorPath = useMemo(
    () => ({ ...DEFAULT_CORRIDOR_PATH, ...path }),
    [path],
  );
  const generatedKeyframes = useMemo(
    () =>
      `${generateKeyframes(1, rightAnimation, corridorPath)}` +
      `${generateKeyframes(-1, leftAnimation, corridorPath)}` +
      `@media(prefers-reduced-motion:reduce){.${cardClassName}{animation-play-state:paused}}`,
    [cardClassName, corridorPath, leftAnimation, rightAnimation],
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{generatedKeyframes}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${corridorPath.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[rightAnimation, leftAnimation].map((animationName) =>
            Array.from({ length: cards }, (_, index) => {
              const image = images[index % Math.max(images.length, 1)];

              return (
                <div
                  className={cn(cardClassName, "absolute overflow-hidden")}
                  key={`${animationName}-${index}`}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${corridorPath.cardWidth}cqw`,
                    height: `${corridorPath.cardHeight}cqw`,
                    marginLeft: `${-corridorPath.cardWidth / 2}cqw`,
                    marginTop: `${-corridorPath.cardHeight / 2}cqw`,
                    borderRadius: `${corridorPath.cardRadius}cqw`,
                    animation: `${animationName} ${speed}s linear infinite`,
                    animationDelay: `${-(index * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {image ? (
                    <img
                      alt={image.alt ?? ""}
                      className="h-full w-full object-cover"
                      decoding="async"
                      draggable={false}
                      loading="lazy"
                      src={image.src}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export { ImageStreamHero };
export type { CorridorPath, ImageStreamHeroProps, ImageStreamItem };
