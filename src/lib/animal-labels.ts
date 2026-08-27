import type {
  AdoptionStatus,
  AnimalAgeGroup,
  AnimalGender,
  AnimalHealthStatus,
  AnimalSpecies,
  AnimalSterilizationStatus,
} from "@/types/animal";
import type { LostAnimalStatus } from "@/types/lost-animal";

export const speciesLabels: Record<AnimalSpecies, string> = {
  cat: "Kedi",
  dog: "Köpek",
};

export const genderLabels: Record<AnimalGender, string> = {
  female: "Dişi",
  male: "Erkek",
  unknown: "Belirtilmemiş",
};

export const ageGroupLabels: Record<AnimalAgeGroup, string> = {
  young: "Genç",
  adult: "Yetişkin",
  senior: "İleri yaş",
  unknown: "Belirtilmemiş",
};

export const adoptionStatusLabels: Record<AdoptionStatus, string> = {
  available: "Sahiplendirilebilir",
  reserved: "Görüşme sürecinde",
  adopted: "Sahiplendirildi",
};

export const sterilizationStatusLabels: Record<
  AnimalSterilizationStatus,
  string
> = {
  sterilized: "Kısırlaştırılmış",
  not_sterilized: "Kısırlaştırılmamış",
};

export const healthStatusLabels: Record<AnimalHealthStatus, string> = {
  balance_issue: "Denge problemli",
  disabled: "Engelli",
  healthy: "Sağlıklı",
};

export const lostAnimalStatusLabels: Record<LostAnimalStatus, string> = {
  missing: "Aranıyor",
  found: "Bulundu",
  closed: "İlan kapatıldı",
};
