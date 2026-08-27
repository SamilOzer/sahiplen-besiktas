import Link from "next/link";

import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const adoptionImages = [
  {
    src: "/resimler/iletişim2.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim3.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim4.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim5.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim6.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim7.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim8.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim9.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim10.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim11.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
  {
    src: "/resimler/iletişim1.avif",
    alt: "Sahiplendirilmeyi bekleyen hayvan",
  },
] as const;

function AdoptionImageStreamSection() {
  return (
    <section
      aria-labelledby="adoption-stream-title"
      className="adoption-image-stream w-full overflow-hidden bg-[var(--color-ink-1000)]"
      id="sahiplenme-hikayesi"
    >
      <ImageStreamHero
        className="h-[min(45rem,calc(100svh_-_var(--header-height)))] min-h-[37.5rem] w-full overflow-hidden border-y border-white/15 bg-[var(--color-ink-1000)]"
        images={adoptionImages}
      >
        <div className="relative z-10 h-full text-center text-[var(--color-brand-warm)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(23,18,20,0.82)_0%,rgba(23,18,20,0.06)_34%,rgba(23,18,20,0.08)_62%,rgba(23,18,20,0.9)_100%)]"
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-between gap-10 px-6 pt-[calc(var(--header-height)+1.5rem)] pb-12 sm:px-10 sm:pt-[calc(var(--header-height)+2rem)] sm:pb-14">
            <h2
              className="adoption-image-stream__title max-w-3xl text-balance text-4xl font-medium tracking-tight text-[var(--color-brand-warm)] sm:text-5xl md:text-6xl"
              id="adoption-stream-title"
            >
              Bir yuva,
              <br />
              bir hayat değiştirir.
            </h2>

            <div className="flex max-w-md flex-col items-center gap-5">
              <p className="text-balance text-base leading-relaxed text-white/[0.82]">
                Seni bekleyen dostlarımızla tanış, bir canın hayatına dokun.
              </p>

              <Link
                className="adoption-image-stream__cta group relative inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(236,72,153,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(236,72,153,0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink-1000)] motion-reduce:transform-none motion-reduce:transition-none"
                href="/sahiplendirme"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-pink-500/40 opacity-75 blur-xl transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                />
                Sahiplen
              </Link>
            </div>
          </div>
        </div>
      </ImageStreamHero>
    </section>
  );
}

export { AdoptionImageStreamSection };
