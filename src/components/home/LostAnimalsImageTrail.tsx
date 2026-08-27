"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ImageTrail } from "@/components/ui/image-trail";

const lostAnimalImages = [
  "/resimler/kayıp-hayvan-7.jpg",
  "/resimler/kayıp-hayvan-1.jpg",
  "/resimler/kayıp-hayvan-2.jpg",
  "/resimler/kayıp-hayvan-3.jpg",
  "/resimler/kayıp-hayvan-4.jpg",
  "/resimler/kayıp-hayvan-5.jpg",
  "/resimler/kayıp-hayvan-6.jpg",
] as const;

function LostAnimalsImageTrail() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      aria-labelledby="lost-animals-trail-title"
      className="lost-animals-image-trail relative flex w-full min-h-[600px] md:min-h-[720px] items-center justify-center overflow-hidden"
      id="kayip-hayvanlar-bolumu"
      ref={sectionRef}
    >
      <div className="lost-animals-image-trail__trail absolute inset-0 z-0" aria-hidden="true">
        <ImageTrail
          containerRef={sectionRef}
          interval={100}
          rotationRange={15}
        >
          {lostAnimalImages.map((url, index) => (
            <div
              className="lost-animals-image-trail__image relative h-28 w-28 md:h-36 md:w-36 overflow-hidden rounded-2xl shadow-xl"
              data-trail-order={index + 1}
              key={url}
            >
              <Image
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                fill
                sizes="(max-width: 767px) 7rem, 9rem"
                src={url}
              />
            </div>
          ))}
        </ImageTrail>
      </div>

      <div className="relative z-10 pointer-events-none max-w-5xl px-6 text-center">
        <h2
          className="lost-animals-image-trail__title text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight select-none"
          id="lost-animals-trail-title"
        >
          Kayıp can dostlarımızı birlikte bulalım
        </h2>
        <Link className="lost-animals-image-trail__cta" href="/kayip-hayvanlar">İlanları incele <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

export { LostAnimalsImageTrail };
