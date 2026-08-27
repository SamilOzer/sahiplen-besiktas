import Image from "next/image";
import Link from "next/link";

import {
  adoptionStatusLabels,
  ageGroupLabels,
  genderLabels,
  speciesLabels,
} from "@/lib/animal-labels";
import type { AnimalRecord } from "@/types/animal";

interface HomepageAnimalPreviewProps {
  readonly animal: AnimalRecord;
}

export function HomepageAnimalPreview({
  animal,
}: HomepageAnimalPreviewProps) {
  if (animal.isDemo) return null;
  return (
    <article
      className="home-animal-card"
      data-species={animal.species}
      data-status={animal.adoptionStatus}
      data-animal-preview
    >
      <div className="home-animal-card__media">
        {animal.image ? (
          <Image
            src={animal.image.src}
            alt={animal.image.alt}
            fill
            sizes="(max-width: 47.99rem) calc(100vw - 2rem), 42vw"
          />
        ) : (
          <div className="home-animal-card__placeholder" aria-hidden="true">
            <span>{speciesLabels[animal.species]}</span>
            <small>Görsel paylaşılmadı</small>
          </div>
        )}
      </div>

      <div className="home-animal-card__content">
        <div className="home-preview__badges">
          <span className="status-badge" data-status={animal.adoptionStatus}>
            {adoptionStatusLabels[animal.adoptionStatus]}
          </span>
        </div>
        <div className="home-animal-card__heading">
          <div>
            <p className="home-animal-card__meta">
              {speciesLabels[animal.species]} · {ageGroupLabels[animal.ageGroup]} · {genderLabels[animal.gender]}
            </p>
            <h3><Link href={`/sahiplendirme/${animal.slug}`}>{animal.name}</Link></h3>
          </div>
          <span aria-hidden="true">↗</span>
        </div>
        <p>{animal.personalitySummary}</p>
        <p className="home-animal-card__training">
          <strong>Eğitim bilgisi:</strong> {animal.trainingNotes ?? "Belirtilmedi"}
        </p>
      </div>
    </article>
  );
}
