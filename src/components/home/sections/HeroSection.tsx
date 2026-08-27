import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";

export function HeroSection() {
  return (
    <section
      className="home-hero"
      aria-labelledby="home-hero-title"
    >
      <div className="container home-hero__grid">
        <div className="home-hero__content">
          <p className="home-hero__edition" aria-hidden="true" data-hero-copy>Kamusal hizmet / 2026</p>
          <p className="eyebrow" data-hero-copy>
            Beşiktaş Belediyesi dijital hizmeti
          </p>
          <h1 id="home-hero-title">
            <span className="home-hero__line-mask">
              <span data-hero-line>Doğru karşılaşma.</span>
            </span>
            <span className="home-hero__line-mask home-hero__line-mask--accent">
              <span data-hero-line>Yeni bir hayat.</span>
            </span>
          </h1>
          <p className="home-hero__lead" data-hero-copy>
            Sahiplenmeye hazır hayvanları keşfedin; kayıp hayvan ilanlarına ve
            güvenilir bilgiye tek bir kamusal hizmet üzerinden ulaşın.
          </p>
          <div className="button-group" data-hero-copy>
            <ButtonLink href="/sahiplendirme">Yuva Ol&apos;u keşfet</ButtonLink>
            <ButtonLink href="/kayip-hayvanlar" variant="secondary">
              Kayıp hayvan ara
            </ButtonLink>
          </div>
          <div className="home-hero__utility" data-hero-copy>
            <span>Sahiplendirme</span>
            <span>Kayıp hayvanlar</span>
            <span>Bilgi merkezi</span>
          </div>
        </div>

        <figure className="home-hero__media" data-hero-media>
          <Image
            src="/assets/animals/hero-dog.webp"
            alt="Doğrudan kameraya bakan kahverengi bir köpeğin yakın portresi"
            fill
            priority
            sizes="(max-width: 47.99rem) 100vw, 62vw"
          />
          <span className="home-hero__media-mark" aria-hidden="true">
            01 / KARŞILAŞMA
          </span>
          <figcaption>
            Temsilî fotoğraf · Sahiplendirme kaydı değildir
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
