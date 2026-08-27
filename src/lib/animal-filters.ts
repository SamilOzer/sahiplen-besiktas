import type { AnimalFilters, AnimalRecord } from "@/types/animal";
import type { LostAnimalFilters, LostAnimalRecord } from "@/types/lost-animal";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

export function parseListingDate(value: string): string | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : undefined;
}

export function formatListingDate(value: string | null): string {
  if (!value || !parseListingDate(value)) return "Belirtilmedi";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function filterAnimals(records: readonly AnimalRecord[], filters: AnimalFilters = {}) {
  return records.filter((animal) =>
    (!filters.species || animal.species === filters.species) &&
    (!filters.gender || animal.gender === filters.gender) &&
    (filters.maxAge === undefined || animal.age <= filters.maxAge) &&
    (!filters.sterilizationStatus || animal.sterilizationStatus === filters.sterilizationStatus) &&
    (!filters.healthStatus || animal.healthStatus === filters.healthStatus) &&
    (!filters.adoptionStatus || animal.adoptionStatus === filters.adoptionStatus),
  );
}

export function filterLostAnimals(records: readonly LostAnimalRecord[], filters: LostAnimalFilters = {}) {
  const query = normalize(filters.query ?? "");
  const location = normalize(filters.location ?? "");
  return records.filter((animal) => {
    if (filters.species && animal.species !== filters.species) return false;
    if (filters.status && animal.status !== filters.status) return false;
    if (location && !normalize(animal.location).includes(location)) return false;
    if (query && !normalize(`${animal.name} ${animal.location} ${animal.distinguishingFeatures}`).includes(query)) return false;
    if (filters.dateFrom || filters.dateTo) {
      if (!animal.lostDate || !parseListingDate(animal.lostDate)) return false;
      if (filters.dateFrom && animal.lostDate < filters.dateFrom) return false;
      if (filters.dateTo && animal.lostDate > filters.dateTo) return false;
    }
    return true;
  });
}
