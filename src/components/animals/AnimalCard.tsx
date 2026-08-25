import Image from "next/image";

import {
  adoptionStatusLabels,
  ageGroupLabels,
  genderLabels,
  speciesLabels,
} from "@/lib/animal-labels";
import type { AnimalRecord } from "@/types/animal";

interface AnimalCardProps {
  readonly animal: AnimalRecord;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <article
      className="animal-card"
      data-species={animal.species}
      data-status={animal.adoptionStatus}
    >
      <div className="animal-card__media">
        {animal.image ? (
          <Image
            src={animal.image.src}
            alt={animal.image.alt}
            fill
            sizes="(max-width: 39.99rem) calc(100vw - 2rem), (max-width: 74.99rem) 45vw, 22vw"
          />
        ) : (
          <div className="animal-card__placeholder">
            <span>{speciesLabels[animal.species]}</span>
            <small>Onaylı görsel alanı</small>
          </div>
        )}
        <div className="animal-card__media-badges">
          {animal.isDemo ? <span className="demo-badge">Demo kayıt</span> : null}
          <span className="status-badge" data-status={animal.adoptionStatus}>
            {adoptionStatusLabels[animal.adoptionStatus]}
          </span>
        </div>
      </div>

      <div className="animal-card__body">
        <p className="animal-card__meta">
          {speciesLabels[animal.species]} · {ageGroupLabels[animal.ageGroup]} · {genderLabels[animal.gender]}
        </p>
        <h3>{animal.name}</h3>
        <p className="animal-card__summary">{animal.personalitySummary}</p>
        <div className="animal-card__footer">
          <span>{animal.trainingNotes ? "Eğitim bilgisi var" : "Eğitim bilgisi bekleniyor"}</span>
          <span className="card-link-disabled" aria-disabled="true">Detay yakında</span>
        </div>
      </div>
    </article>
  );
}
