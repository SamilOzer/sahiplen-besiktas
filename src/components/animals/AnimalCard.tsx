"use client";

import { PawPrint } from "@phosphor-icons/react/PawPrint";
import Image from "next/image";
import Link from "next/link";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
} from "react";

import {
  genderLabels,
  healthStatusLabels,
  speciesLabels,
  sterilizationStatusLabels,
} from "@/lib/animal-labels";
import type { AnimalRecord } from "@/types/animal";
import { useFavorite } from "@/components/animals/useFavorite";

interface AnimalCardProps {
  readonly animal: AnimalRecord;
}

interface PointerPosition {
  readonly localX: number;
  readonly localY: number;
  readonly ratioX: number;
  readonly ratioY: number;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const pendingPointerRef = useRef<PointerPosition | null>(null);
  const [isFavorite, toggleFavorite] = useFavorite(animal.id);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  function applyPointerPosition() {
    const card = cardRef.current;
    const position = pendingPointerRef.current;

    frameRef.current = null;
    if (!card || !position) return;

    card.style.setProperty("--pointer-x", `${position.localX}px`);
    card.style.setProperty("--pointer-y", `${position.localY}px`);
    card.style.setProperty(
      "--card-rotate-x",
      `${(0.5 - position.ratioY) * -4.5}deg`,
    );
    card.style.setProperty(
      "--card-rotate-y",
      `${(position.ratioX - 0.5) * 4.5}deg`,
    );
  }

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;

    pendingPointerRef.current = {
      localX,
      localY,
      ratioX: localX / bounds.width,
      ratioY: localY / bounds.height,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(applyPointerPosition);
    }
  }

  function resetPointer() {
    const card = cardRef.current;
    if (!card) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    pendingPointerRef.current = null;
    card.removeAttribute("data-pressed");
    card.removeAttribute("data-favorite-hover");
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  }

  const identityTags = [
    { key: "species", label: speciesLabels[animal.species], tone: "rose" },
    { key: "breed", label: animal.breed, tone: "rose" },
    { key: "gender", label: genderLabels[animal.gender], tone: "rose" },
    { key: "age", label: `${animal.age} yaş`, tone: "rose" },
    {
      key: "sterilization",
      label: sterilizationStatusLabels[animal.sterilizationStatus],
      tone: "mint",
    },
    {
      key: "health",
      label: healthStatusLabels[animal.healthStatus],
      tone: animal.healthStatus === "healthy" ? "mint" : "rose",
    },
  ];

  const accessibleSummary = [
    animal.name,
    speciesLabels[animal.species],
    animal.breed,
    genderLabels[animal.gender],
    `${animal.age} yaş`,
    sterilizationStatusLabels[animal.sterilizationStatus],
    healthStatusLabels[animal.healthStatus],
  ].join(", ");

  if (animal.isDemo) return null;

  return (
    <article
      aria-label={accessibleSummary}
      className="animal-card"
      data-species={animal.species}
      data-status={animal.adoptionStatus}
      onMouseLeave={resetPointer}
      onMouseMove={handleMouseMove}
      onPointerCancel={resetPointer}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch") {
          event.currentTarget.setAttribute("data-pressed", "true");
        }
      }}
      onPointerUp={(event) => event.currentTarget.removeAttribute("data-pressed")}
      ref={cardRef}
    >
      <div className="animal-card__surface">
        <div className="animal-card__media">
          {animal.image ? (
            <Image
              alt={animal.image.alt}
              fill
              sizes="(max-width: 39.99rem) calc(100vw - 2rem), (max-width: 74.99rem) 45vw, 30rem"
              src={animal.image.src}
            />
          ) : (
            <div className="animal-card__placeholder">
              <span>{speciesLabels[animal.species]}</span>
              <small>Görsel paylaşılmadı</small>
            </div>
          )}
        </div>

        <div aria-hidden="true" className="animal-card__top-scrim" />
        <div aria-hidden="true" className="animal-card__hover-layer">
          {animal.image ? (
            <Image
              alt=""
              className="animal-card__blur-image"
              fill
              sizes="(max-width: 39.99rem) calc(100vw - 2rem), (max-width: 74.99rem) 45vw, 30rem"
              src={animal.image.src}
            />
          ) : null}
        </div>

        <h3 className="animal-card__name">
          <span>{animal.name}</span>
          <span className="animal-card__species">
            {" — "}
            {speciesLabels[animal.species]}
          </span>
        </h3>
        <Link className="animal-card__detail-link" href={`/sahiplendirme/${animal.slug}`} aria-label={`${animal.name} hakkında bilgi alın`} />

        <button
          aria-label={
            isFavorite
              ? `${animal.name} favorilerden çıkar`
              : `${animal.name} favorilere ekle`
          }
          aria-pressed={isFavorite}
          className="animal-card__favorite"
          onClick={toggleFavorite}
          onMouseEnter={() =>
            cardRef.current?.setAttribute("data-favorite-hover", "true")
          }
          onMouseLeave={() =>
            cardRef.current?.removeAttribute("data-favorite-hover")
          }
          type="button"
        >
          <PawPrint aria-hidden="true" weight={isFavorite ? "fill" : "regular"} />
        </button>

        <ul aria-label={`${animal.name} özellikleri`} className="animal-card__tags">
          {identityTags.map((tag) => (
            <li data-tone={tag.tone} key={tag.key}>
              {tag.label}
            </li>
          ))}
        </ul>
      </div>

      <span aria-hidden="true" className="animal-card__custom-cursor">
        Yuva Ol
      </span>
    </article>
  );
}
