import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCtaSection() {
  return (
    <section
      className="home-final home-section"
      aria-labelledby="home-final-title"
    >
      <div className="container home-final__grid">
        <div className="home-final__content">
          <p className="home-section-index" aria-hidden="true">08 / SONRAKİ ADIM</p>
          <p className="eyebrow">Sonraki adım</p>
          <h2 id="home-final-title">Doğru adım, bir hayatı değiştirebilir.</h2>
          <div className="home-final__actions">
            <ButtonLink href="/sahiplendirme">Yuva Ol&apos;u keşfet</ButtonLink>
            <ButtonLink href="/kayip-hayvanlar" variant="secondary">
              Kayıp can dostlarımız
            </ButtonLink>
            <ButtonLink href="/akademi" variant="text">Bilgi al</ButtonLink>
          </div>
        </div>
        <figure className="home-final__media">
          <Image
            src="/assets/animals/adoption-dog.webp"
            alt="Açık renkli bir köpeğin yakın portresi"
            fill
            sizes="(max-width: 47.99rem) 100vw, 42vw"
          />
          <figcaption>Temsilî fotoğraf</figcaption>
        </figure>
      </div>
    </section>
  );
}
