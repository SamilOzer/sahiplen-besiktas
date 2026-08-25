import type { AnimalFilters, AnimalRecord } from "@/types/animal";

/**
 * Development fixtures only. Every record is visibly marked as demo content
 * and must be replaced by an approved production data source before launch.
 */
const animals = [
  {
    id: "demo-animal-cat-001",
    slug: "demo-kedi-kaydi",
    name: "Demo kedi kaydı",
    species: "cat",
    gender: "female",
    ageGroup: "adult",
    adoptionStatus: "available",
    personalitySummary:
      "Arayüz geliştirme amacıyla hazırlanmış örnek kayıttır; gerçek bir hayvanı temsil etmez.",
    trainingNotes: "Demo eğitim alanı — üretim verisi değildir.",
    image: {
      src: "/assets/animals/adoption-cat.webp",
      alt: "Demo kayıt için kullanılan gri çizgili kedi portresi",
      width: 1200,
      height: 1800,
    },
    isDemo: true,
  },
  {
    id: "demo-animal-dog-001",
    slug: "demo-kopek-kaydi",
    name: "Demo köpek kaydı",
    species: "dog",
    gender: "male",
    ageGroup: "young",
    adoptionStatus: "reserved",
    personalitySummary:
      "Kart düzenini test etmek için kullanılan örnek kayıttır; gerçek bir hayvanı temsil etmez.",
    trainingNotes: null,
    image: {
      src: "/assets/animals/adoption-dog.webp",
      alt: "Demo kayıt için kullanılan açık renkli köpek portresi",
      width: 1200,
      height: 1500,
    },
    isDemo: true,
  },
] as const satisfies readonly AnimalRecord[];

export function getMockAnimals(filters: AnimalFilters = {}): readonly AnimalRecord[] {
  return animals.filter((animal) => {
    if (filters.species && animal.species !== filters.species) return false;
    if (filters.gender && animal.gender !== filters.gender) return false;
    if (filters.ageGroup && animal.ageGroup !== filters.ageGroup) return false;
    if (
      filters.adoptionStatus &&
      animal.adoptionStatus !== filters.adoptionStatus
    ) {
      return false;
    }

    return true;
  });
}
