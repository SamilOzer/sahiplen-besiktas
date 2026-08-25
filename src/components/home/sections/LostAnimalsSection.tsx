import Image from "next/image";

import { HomepageLostPreview } from "@/components/home/HomepageLostPreview";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { LostAnimalRecord } from "@/types/lost-animal";

interface LostAnimalsSectionProps {
  readonly animals: readonly LostAnimalRecord[];
}

export function LostAnimalsSection({ animals }: LostAnimalsSectionProps) {
  return (
    <section
      className="home-lost home-section"
      aria-labelledby="home-lost-title"
    >
      <div className="container home-lost__grid">
        <figure className="home-lost__media">
          <Image
            src="/assets/animals/lost-dog.webp"
            alt="Kentsel bir sokakta yürüyen köpeğin siyah beyaz fotoğrafı"
            fill
            sizes="(max-width: 47.99rem) 100vw, 50vw"
            data-lost-image
          />
          <figcaption>Temsilî fotoğraf · Gerçek kayıp ilanı değildir</figcaption>
        </figure>

        <div className="home-lost__content">
          <div className="home-lost__intro">
            <p className="home-section-index" aria-hidden="true">05 / İZ</p>
            <p className="eyebrow">Kayıp hayvanlar</p>
            <h2 id="home-lost-title">Bir iz, eve dönüşün başlangıcı olabilir.</h2>
            <p>
              Kayıp ve bulunan hayvan ilanlarını tür, konum ve durum bilgileriyle
              hızla tarayın.
            </p>
            <ButtonLink href="/kayip-hayvanlar">Kayıp hayvanları gör</ButtonLink>
          </div>

          <div className="home-lost__previews" aria-label="Demo ilan önizlemeleri">
            {animals.map((animal) => (
              <HomepageLostPreview animal={animal} key={animal.id} />
            ))}
          </div>
          <p className="home-data-note home-data-note--inverse">
            Gösterilen ilanlar demo verisidir; gerçek ihbar veya iletişim bilgisi
            içermez.
          </p>
        </div>
      </div>
    </section>
  );
}
