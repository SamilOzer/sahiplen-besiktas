import { publishedAnimals, publishedLostAnimals } from "@/data/published-records";
import { filterAnimals, filterLostAnimals, parseListingDate } from "@/lib/animal-filters";
import type { AnimalFilters } from "@/types/animal";
import type { LostAnimalFilters } from "@/types/lost-animal";

function canPublish(record: { readonly isDemo: boolean; readonly slug: string; readonly publication: { readonly sourceReference: string; readonly verifiedAt: string } }) {
  return !record.isDemo && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug) &&
    Boolean(record.publication.sourceReference.trim()) && Boolean(parseListingDate(record.publication.verifiedAt));
}

function publicFields<T extends { readonly publication: unknown }>(record: T): Omit<T, "publication"> {
  const { publication, ...fields } = record;
  // Approval references are server-only and must not be serialized into client props.
  void publication;
  return fields;
}

export function getAnimals(filters: AnimalFilters = {}) {
  return filterAnimals(publishedAnimals.filter(canPublish).map(publicFields), filters);
}

export function getLostAnimals(filters: LostAnimalFilters = {}) {
  return filterLostAnimals(publishedLostAnimals.filter(canPublish).map(publicFields), filters);
}

export function getAnimal(slug: string) {
  return getAnimals().find((animal) => animal.slug === slug);
}

export function getLostAnimal(slug: string) {
  return getLostAnimals().find((animal) => animal.slug === slug);
}
