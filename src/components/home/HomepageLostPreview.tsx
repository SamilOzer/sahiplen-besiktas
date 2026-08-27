import Image from "next/image";
import Link from "next/link";
import { formatListingDate } from "@/lib/animal-filters";

import {
  lostAnimalStatusLabels,
  speciesLabels,
} from "@/lib/animal-labels";
import type { LostAnimalRecord } from "@/types/lost-animal";

interface HomepageLostPreviewProps {
  readonly animal: LostAnimalRecord;
}

export function HomepageLostPreview({ animal }: HomepageLostPreviewProps) {
  if (animal.isDemo) return null;
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
            <small>Görsel paylaşılmadı</small>
          </div>
        )}
      </div>

      <div className="home-lost-card__content">
        <div className="home-preview__badges">
          <span className="status-badge" data-status={animal.status}>
            {lostAnimalStatusLabels[animal.status]}
          </span>
        </div>
        <p className="home-lost-card__meta">{speciesLabels[animal.species]}</p>
        <h3><Link href={`/kayip-hayvanlar/${animal.slug}`}>{animal.name}</Link></h3>
        <p>{animal.location} · {formatListingDate(animal.lostDate)}</p>
      </div>
    </article>
  );
}
