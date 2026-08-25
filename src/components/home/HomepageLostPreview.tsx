import Image from "next/image";

import {
  lostAnimalStatusLabels,
  speciesLabels,
} from "@/lib/animal-labels";
import type { LostAnimalRecord } from "@/types/lost-animal";

interface HomepageLostPreviewProps {
  readonly animal: LostAnimalRecord;
}

export function HomepageLostPreview({ animal }: HomepageLostPreviewProps) {
  return (
    <article className="home-lost-card" data-status={animal.status}>
      <div className="home-lost-card__media">
        {animal.image ? (
          <Image
            src={animal.image.src}
            alt={animal.image.alt}
            fill
            sizes="(max-width: 47.99rem) 7rem, 9rem"
          />
        ) : (
          <div className="home-lost-card__placeholder" aria-hidden="true">
            <span>{speciesLabels[animal.species]}</span>
            <small>İlan görseli alanı</small>
          </div>
        )}
      </div>

      <div className="home-lost-card__content">
        <div className="home-preview__badges">
          {animal.isDemo ? <span className="demo-badge">Demo ilan</span> : null}
          <span className="status-badge" data-status={animal.status}>
            {lostAnimalStatusLabels[animal.status]}
          </span>
        </div>
        <p className="home-lost-card__meta">{speciesLabels[animal.species]}</p>
        <h3>{animal.name}</h3>
        <p>{animal.location} · {animal.lostDate ?? "Tarih belirtilmedi"}</p>
      </div>
    </article>
  );
}
