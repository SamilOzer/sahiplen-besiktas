import type { AnimalRecord } from "@/types/animal";
import type { LostAnimalRecord } from "@/types/lost-animal";

interface Publication {
  /** Public source URL or internal approval reference; never personal contact data. */
  readonly sourceReference: string;
  /** ISO calendar date of the last confirmation that the record may be published. */
  readonly verifiedAt: string;
}

export type PublishedAnimalRecord = AnimalRecord & { readonly isDemo: false; readonly publication: Publication };
export type PublishedLostAnimalRecord = LostAnimalRecord & { readonly isDemo: false; readonly publication: Publication };

// Only records supplied or approved by the municipality belong here.
// An empty inventory is intentional: development fixtures must never become public listings.
export const publishedAnimals: readonly PublishedAnimalRecord[] = [];
export const publishedLostAnimals: readonly PublishedLostAnimalRecord[] = [];
