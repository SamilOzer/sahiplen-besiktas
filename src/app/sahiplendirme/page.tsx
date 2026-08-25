import type { Metadata } from "next";
import Link from "next/link";

import { AnimalCard } from "@/components/animals/AnimalCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getMockAnimals } from "@/data/mock/animals";
import { createPageMetadata } from "@/lib/metadata";
import { getQueryValue, type QueryValue } from "@/lib/query";
import type {
  AdoptionStatus,
  AnimalAgeGroup,
  AnimalFilters,
  AnimalGender,
  AnimalSpecies,
} from "@/types/animal";

export const metadata: Metadata = createPageMetadata(
  "Sahiplendirme",
  "Sahiplendirilebilir hayvan kayıtlarını tür, yaş, cinsiyet ve durum ölçütleriyle incelemek için hazırlanan sayfa.",
);

type SearchParams = Record<string, QueryValue>;

interface AdoptionPageProps {
  readonly searchParams: Promise<SearchParams>;
}

function valueFrom<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

export default async function AdoptionPage({ searchParams }: AdoptionPageProps) {
  const params = await searchParams;
  const speciesValue = getQueryValue(params.tur);
  const ageValue = getQueryValue(params.yas);
  const genderValue = getQueryValue(params.cinsiyet);
  const statusValue = getQueryValue(params.durum);

  const filters: AnimalFilters = {
    species: valueFrom<AnimalSpecies>(speciesValue, ["cat", "dog"]),
    ageGroup: valueFrom<AnimalAgeGroup>(ageValue, [
      "young",
      "adult",
      "senior",
      "unknown",
    ]),
    gender: valueFrom<AnimalGender>(genderValue, ["female", "male", "unknown"]),
    adoptionStatus: valueFrom<AdoptionStatus>(statusValue, [
      "available",
      "reserved",
      "adopted",
    ]),
  };
  const animals = getMockAnimals(filters);

  return (
    <div className="page page--adoption section">
      <div className="container">
        <PageHeader
          eyebrow="Sahiplendirme"
          title="Karakterlerin ve yeni başlangıçların arşivi."
          description="Sahiplenmeye hazır hayvanları tür, yaş, cinsiyet ve durum bilgileriyle tarayın. Kayıtlar bu aşamada yalnızca arayüz yapısını gösteren demo içeriklerdir."
          context="Arşiv / Sahiplendirme"
        />

        <Notice title="Demo veri uyarısı">
          <p>
            Bu sayfadaki hiçbir kayıt gerçek bir hayvanı temsil etmez. Üretim verisi
            sağlandığında aynı tipli veri katmanına bağlanacaktır.
          </p>
        </Notice>

        <section className="filter-panel" aria-labelledby="adoption-filter-title">
          <div className="filter-panel__heading">
            <div>
              <p className="filter-panel__label">Arşiv araçları</p>
              <h2 id="adoption-filter-title">Kayıtları filtreleyin</h2>
            </div>
            <Link className="text-link" href="/sahiplendirme">
              Filtreleri temizle
            </Link>
          </div>

          <form className="filter-form" method="get">
            <div className="form-field">
              <label htmlFor="species">Tür</label>
              <select id="species" name="tur" defaultValue={speciesValue}>
                <option value="">Tümü</option>
                <option value="cat">Kedi</option>
                <option value="dog">Köpek</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="age">Yaş grubu</label>
              <select id="age" name="yas" defaultValue={ageValue}>
                <option value="">Tümü</option>
                <option value="young">Genç</option>
                <option value="adult">Yetişkin</option>
                <option value="senior">İleri yaş</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="gender">Cinsiyet</label>
              <select id="gender" name="cinsiyet" defaultValue={genderValue}>
                <option value="">Tümü</option>
                <option value="female">Dişi</option>
                <option value="male">Erkek</option>
                <option value="unknown">Belirtilmemiş</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="adoption-status">Durum</label>
              <select id="adoption-status" name="durum" defaultValue={statusValue}>
                <option value="">Tümü</option>
                <option value="available">Sahiplendirilebilir</option>
                <option value="reserved">Görüşme sürecinde</option>
                <option value="adopted">Sahiplendirildi</option>
              </select>
            </div>
            <button className="button button--primary" type="submit">
              Sonuçları göster
            </button>
          </form>
        </section>

        <section className="results-section" aria-labelledby="adoption-results-title">
          <div className="results-section__heading">
            <div>
              <p className="eyebrow">Küratörlü arşiv</p>
              <h2 id="adoption-results-title">Demo kayıtlar</h2>
            </div>
            <p aria-live="polite">{animals.length} sonuç gösteriliyor</p>
          </div>
          {animals.length > 0 ? (
            <div className="animal-grid">
              {animals.map((animal) => (
                <AnimalCard animal={animal} key={animal.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Bu filtrelerle demo kayıt bulunamadı"
              description="Filtreleri temizleyerek tüm geliştirme kayıtlarını yeniden görüntüleyebilirsiniz."
            />
          )}
        </section>
      </div>
    </div>
  );
}
