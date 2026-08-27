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
    breed: "Tekir",
    gender: "female",
    age: 2,
    ageGroup: "adult",
    sterilizationStatus: "sterilized",
    healthStatus: "healthy",
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
    breed: "Melez",
    gender: "male",
    age: 3,
    ageGroup: "young",
    sterilizationStatus: "not_sterilized",
    healthStatus: "balance_issue",
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
  {
    id: "demo-animal-cat-002",
    slug: "demo-kedi-kaydi-002",
    name: "Demo kedi kaydı",
    species: "cat",
    breed: "Tuxedo",
    gender: "male",
    age: 1,
    ageGroup: "young",
    sterilizationStatus: "sterilized",
    healthStatus: "disabled",
    adoptionStatus: "available",
    personalitySummary:
      "Dört sütunlu kart düzenini test etmek için kullanılan örnek kayıttır; gerçek bir hayvanı temsil etmez.",
    trainingNotes: null,
    image: {
      src: "/assets/animals/adoption-cat-black.webp",
      alt: "Demo kayıt için kullanılan siyah beyaz kedi portresi",
      width: 900,
      height: 1200,
    },
    isDemo: true,
  },
  {
    id: "demo-animal-dog-002",
    slug: "demo-kopek-kaydi-002",
    name: "Demo köpek kaydı",
    species: "dog",
    breed: "Çoban köpeği",
    gender: "female",
    age: 4,
    ageGroup: "adult",
    sterilizationStatus: "sterilized",
    healthStatus: "healthy",
    adoptionStatus: "available",
    personalitySummary:
      "Filtreleme ve kart yerleşimini doğrulamak için kullanılan örnek kayıttır; gerçek bir hayvanı temsil etmez.",
    trainingNotes: null,
    image: {
      src: "/assets/animals/adoption-dog-shepherd.webp",
      alt: "Demo kayıt için kullanılan çoban köpeği portresi",
      width: 900,
      height: 1200,
    },
    isDemo: true,
  },
] as const satisfies readonly AnimalRecord[];

export function getMockAnimals(filters: AnimalFilters = {}): readonly AnimalRecord[] {
  return animals.filter((animal) => {
    if (filters.species && animal.species !== filters.species) return false;
    if (filters.gender && animal.gender !== filters.gender) return false;
    if (filters.maxAge !== undefined && animal.age > filters.maxAge) return false;
    if (
      filters.sterilizationStatus &&
      animal.sterilizationStatus !== filters.sterilizationStatus
    ) {
      return false;
    }
    if (filters.healthStatus && animal.healthStatus !== filters.healthStatus) {
      return false;
    }

    return true;
  });
}
