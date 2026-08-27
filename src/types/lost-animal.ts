import type { AnimalGender, AnimalImage, AnimalSpecies } from "@/types/animal";

export type LostAnimalStatus = "missing" | "found" | "closed";

export interface LostAnimalRecord {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly species: AnimalSpecies;
  readonly gender: AnimalGender;
  readonly lostDate: string | null;
  readonly location: string;
  readonly distinguishingFeatures: string;
  readonly status: LostAnimalStatus;
  readonly image: AnimalImage | null;
  readonly isDemo: boolean;
}

export interface LostAnimalFilters {
  readonly query?: string;
  readonly species?: AnimalSpecies;
  readonly location?: string;
  readonly status?: LostAnimalStatus;
  readonly dateFrom?: string;
  readonly dateTo?: string;
}
