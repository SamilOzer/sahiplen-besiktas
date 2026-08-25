export type AnimalSpecies = "cat" | "dog";
export type AnimalGender = "female" | "male" | "unknown";
export type AnimalAgeGroup = "young" | "adult" | "senior" | "unknown";
export type AdoptionStatus = "available" | "reserved" | "adopted";

export interface AnimalImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface AnimalRecord {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly species: AnimalSpecies;
  readonly gender: AnimalGender;
  readonly ageGroup: AnimalAgeGroup;
  readonly adoptionStatus: AdoptionStatus;
  readonly personalitySummary: string;
  readonly trainingNotes: string | null;
  readonly image: AnimalImage | null;
  readonly isDemo: boolean;
}

export interface AnimalFilters {
  readonly species?: AnimalSpecies;
  readonly gender?: AnimalGender;
  readonly ageGroup?: AnimalAgeGroup;
  readonly adoptionStatus?: AdoptionStatus;
}
