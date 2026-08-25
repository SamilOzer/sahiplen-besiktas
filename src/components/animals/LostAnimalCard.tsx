import Image from "next/image";

import {
  genderLabels,
  lostAnimalStatusLabels,
  speciesLabels,
} from "@/lib/animal-labels";
import type { LostAnimalRecord } from "@/types/lost-animal";

interface LostAnimalCardProps {
  readonly animal: LostAnimalRecord;
}

export function LostAnimalCard({ animal }: LostAnimalCardProps) {
  return (
    <article
      className="lost-animal-card"
      data-species={animal.species}
      data-status={animal.status}
    >
      <div className="lost-animal-card__media">
        {animal.image ? (
          <Image
            src={animal.image.src}
            alt={animal.image.alt}
            fill
            sizes="(max-width: 39.99rem) calc(100vw - 2rem), (max-width: 74.99rem) 45vw, 30vw"
          />
        ) : (
          <div className="animal-card__placeholder">
            <span>{speciesLabels[animal.species]}</span>
            <small>Onaylı ilan görseli alanı</small>
          </div>
        )}
        <span className="status-badge" data-status={animal.status}>
          {lostAnimalStatusLabels[animal.status]}
        </span>
      </div>

      <div className="lost-animal-card__body">
        <div className="lost-animal-card__identity">
          <div>
            <p className="animal-card__meta">
              {speciesLabels[animal.species]} · {genderLabels[animal.gender]}
            </p>
            <h3>{animal.name}</h3>
          </div>
          {animal.isDemo ? <span className="demo-badge">Demo ilan</span> : null}
        </div>
        <dl className="lost-animal-card__facts">
          <div>
            <dt>Tarih</dt>
            <dd>{animal.lostDate ?? "Belirtilmedi"}</dd>
          </div>
          <div>
            <dt>Konum</dt>
            <dd>{animal.location}</dd>
          </div>
        </dl>
        <p className="lost-animal-card__feature">{animal.distinguishingFeatures}</p>
        <span className="card-link-disabled" aria-disabled="true">
          İletişim bilgisi üretim verisiyle açılacak
        </span>
      </div>
    </article>
  );
}
