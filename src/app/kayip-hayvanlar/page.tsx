import type { Metadata } from "next";
import Link from "next/link";

import { LostAnimalCard } from "@/components/animals/LostAnimalCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { getMockLostAnimals } from "@/data/mock/lost-animals";
import { createPageMetadata } from "@/lib/metadata";
import { getQueryValue, type QueryValue } from "@/lib/query";
import type { AnimalSpecies } from "@/types/animal";
import type {
  LostAnimalFilters,
  LostAnimalStatus,
} from "@/types/lost-animal";

export const metadata: Metadata = createPageMetadata(
  "Kayıp hayvanlar",
  "Kayıp ve bulunan hayvan ilanlarını anahtar kelime, konum, tür ve durum ölçütleriyle aramak için hazırlanan sayfa.",
);

type SearchParams = Record<string, QueryValue>;

interface LostAnimalsPageProps {
  readonly searchParams: Promise<SearchParams>;
}

function valueFrom<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

export default async function LostAnimalsPage({
  searchParams,
}: LostAnimalsPageProps) {
  const params = await searchParams;
  const queryValue = getQueryValue(params.q);
  const locationValue = getQueryValue(params.konum);
  const speciesValue = getQueryValue(params.tur);
  const statusValue = getQueryValue(params.durum);

  const filters: LostAnimalFilters = {
    query: queryValue || undefined,
    location: locationValue || undefined,
    species: valueFrom<AnimalSpecies>(speciesValue, ["cat", "dog"]),
    status: valueFrom<LostAnimalStatus>(statusValue, [
      "missing",
      "found",
      "closed",
    ]),
  };
  const animals = getMockLostAnimals(filters);

  return (
    <div className="page page--lost section">
      <div className="container">
        <PageHeader
          eyebrow="Kayıp hayvanlar"
          title="Hızlı tarayın. Doğru izi görün."
          description="Anahtar kelime, konum, tür ve ilan durumuyla arama yapın. Bu aşamadaki ilanlar yalnızca işlevsel yapıyı göstermek için hazırlanmış demo kayıtlardır."
          context="İlan arşivi / Hızlı arama"
        />

        <Notice title="Gerçek ihbar içermez">
          <p>
            Bu sayfadaki ilanlar gerçek kayıp veya bulunan hayvan bildirimleri değildir.
            İletişim bilgileri özellikle eklenmemiştir.
          </p>
        </Notice>

        <section className="filter-panel" aria-labelledby="lost-filter-title">
          <div className="filter-panel__heading">
            <div>
              <p className="filter-panel__label">Hızlı arama</p>
              <h2 id="lost-filter-title">İlanları filtreleyin</h2>
            </div>
            <Link className="text-link" href="/kayip-hayvanlar">
              Filtreleri temizle
            </Link>
          </div>

          <form className="filter-form filter-form--search" method="get" role="search">
            <div className="form-field form-field--wide">
              <label htmlFor="keyword">Anahtar kelime</label>
              <input
                id="keyword"
                name="q"
                type="search"
                defaultValue={queryValue}
                placeholder="İsim veya ayırt edici özellik"
              />
            </div>
            <div className="form-field">
              <label htmlFor="location">Konum</label>
              <input
                id="location"
                name="konum"
                type="search"
                defaultValue={locationValue}
                placeholder="Mahalle veya bölge"
              />
            </div>
            <div className="form-field">
              <label htmlFor="lost-species">Tür</label>
              <select id="lost-species" name="tur" defaultValue={speciesValue}>
                <option value="">Tümü</option>
                <option value="cat">Kedi</option>
                <option value="dog">Köpek</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="listing-status">İlan durumu</label>
              <select id="listing-status" name="durum" defaultValue={statusValue}>
                <option value="">Tümü</option>
                <option value="missing">Aranıyor</option>
                <option value="found">Bulundu</option>
                <option value="closed">İlan kapatıldı</option>
              </select>
            </div>
            <button className="button button--primary" type="submit">
              İlanlarda ara
            </button>
          </form>
        </section>

        <section className="results-section" aria-labelledby="lost-results-title">
          <div className="results-section__heading">
            <div>
              <p className="eyebrow">Aktif arşiv görünümü</p>
              <h2 id="lost-results-title">Demo ilanlar</h2>
            </div>
            <p aria-live="polite">{animals.length} sonuç gösteriliyor</p>
          </div>
          {animals.length > 0 ? (
            <div className="lost-animal-list">
              {animals.map((animal) => (
                <LostAnimalCard animal={animal} key={animal.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Eşleşen demo ilan bulunamadı"
              description="Arama ifadenizi değiştirin veya filtreleri temizleyerek tüm demo ilanları görüntüleyin."
            />
          )}
        </section>
      </div>
    </div>
  );
}
