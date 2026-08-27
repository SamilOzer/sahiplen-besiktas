import type {
  LostAnimalFilters,
  LostAnimalRecord,
} from "@/types/lost-animal";

/**
 * Development fixtures only. These entries are not public lost-animal reports.
 */
const lostAnimals = [
  {
    id: "demo-lost-cat-001",
    slug: "demo-kayip-kedi-kaydi",
    name: "Demo kayıp kedi kaydı",
    species: "cat",
    gender: "unknown",
    lostDate: null,
    location: "Demo konum alanı",
    distinguishingFeatures:
      "Ayırt edici özellik alanı için demo içerik; gerçek bir ihbar değildir.",
    status: "missing",
    image: {
      src: "/resimler/kayıp-hayvan-7.jpg",
      alt: "Demo kayıp ilanı için kullanılan temsilî tekir kedi portresi",
      width: 1920,
      height: 1280,
    },
    isDemo: true,
  },
  {
    id: "demo-lost-dog-001",
    slug: "demo-bulunan-kopek-kaydi",
    name: "Demo bulunan köpek kaydı",
    species: "dog",
    gender: "female",
    lostDate: null,
    location: "Demo konum alanı",
    distinguishingFeatures:
      "Liste durumlarını sınamak için demo içerik; gerçek bir ihbar değildir.",
    status: "found",
    image: {
      src: "/resimler/kayıp-hayvan-4.jpg",
      alt: "Demo bulunan ilanı için kullanılan temsilî koşan köpek fotoğrafı",
      width: 1920,
      height: 1280,
    },
    isDemo: true,
  },
] as const satisfies readonly LostAnimalRecord[];

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("tr-TR");
}

export function getMockLostAnimals(
  filters: LostAnimalFilters = {},
): readonly LostAnimalRecord[] {
  const query = filters.query ? normalize(filters.query) : "";
  const location = filters.location ? normalize(filters.location) : "";

  return lostAnimals.filter((animal) => {
    if (filters.species && animal.species !== filters.species) return false;
    if (filters.status && animal.status !== filters.status) return false;
    if (location && !normalize(animal.location).includes(location)) return false;

    if (query) {
      const searchableText = normalize(
        `${animal.name} ${animal.location} ${animal.distinguishingFeatures}`,
      );

      if (!searchableText.includes(query)) return false;
    }

    return true;
  });
}
