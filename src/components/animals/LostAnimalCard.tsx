import Image from "next/image";
import Link from "next/link";

import { CalendarBlank } from "@phosphor-icons/react/dist/ssr/CalendarBlank";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";

import {
  genderLabels,
  lostAnimalStatusLabels,
  speciesLabels,
} from "@/lib/animal-labels";
import type { LostAnimalRecord } from "@/types/lost-animal";
import { formatListingDate } from "@/lib/animal-filters";

interface LostAnimalCardProps {
  readonly animal: LostAnimalRecord;
}

export function LostAnimalCard({ animal }: LostAnimalCardProps) {
  if (animal.isDemo) return null;
  const titleId = `lost-animal-${animal.id}`;

  return (
    <article
      className="lost-animal-card"
      data-species={animal.species}
      data-status={animal.status}
      aria-labelledby={titleId}
    >
      <div className="lost-animal-card__media">
        {animal.image ? (
          <Image
            src={animal.image.src}
            alt={animal.image.alt}
            fill
            sizes="(max-width: 47.99rem) calc(100vw - 2rem), (max-width: 63.99rem) 40vw, 24rem"
          />
        ) : (
          <div className="animal-card__placeholder">
            <span>{speciesLabels[animal.species]}</span>
            <small>Görsel paylaşılmadı</small>
          </div>
        )}

        <div className="lost-animal-card__badges">
          <span className="status-badge" data-status={animal.status}>
            {lostAnimalStatusLabels[animal.status]}
          </span>
        </div>
      </div>

      <div className="lost-animal-card__body">
        <div className="lost-animal-card__identity">
          <p className="lost-animal-card__kicker">
            {speciesLabels[animal.species]} · {genderLabels[animal.gender]}
          </p>
          <h3 id={titleId}>{animal.name}</h3>
        </div>

        <dl className="lost-animal-card__facts">
          <div>
            <dt><CalendarBlank aria-hidden="true" size={17} /> Tarih</dt>
            <dd>{formatListingDate(animal.lostDate)}</dd>
          </div>
          <div>
            <dt><MapPin aria-hidden="true" size={17} /> Konum</dt>
            <dd>{animal.location}</dd>
          </div>
        </dl>

        <div className="lost-animal-card__feature">
          <span>Ayırt edici özellik</span>
          <p>{animal.distinguishingFeatures}</p>
        </div>

        <Link className="button button--secondary lost-animal-card__detail" href={`/kayip-hayvanlar/${animal.slug}`} aria-label={`${animal.name} ilanını incele`}>İlanı incele</Link>
      </div>
    </article>
  );
}
