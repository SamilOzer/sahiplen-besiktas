import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { GenderNeuter } from "@phosphor-icons/react/dist/ssr/GenderNeuter";
import { GenderIntersex } from "@phosphor-icons/react/dist/ssr/GenderIntersex";
import { Heartbeat } from "@phosphor-icons/react/dist/ssr/Heartbeat";
import { Info } from "@phosphor-icons/react/dist/ssr/Info";
import { ListBullets } from "@phosphor-icons/react/dist/ssr/ListBullets";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { PawPrint } from "@phosphor-icons/react/dist/ssr/PawPrint";

import { AgeRangeFilter } from "@/components/animals/AgeRangeFilter";
import { AnimalCard } from "@/components/animals/AnimalCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMockAnimals } from "@/data/mock/animals";
import { createPageMetadata } from "@/lib/metadata";
import { getQueryValue, type QueryValue } from "@/lib/query";
import type {
  AnimalFilters,
  AnimalGender,
  AnimalHealthStatus,
  AnimalSpecies,
  AnimalSterilizationStatus,
} from "@/types/animal";

export const metadata: Metadata = createPageMetadata(
  "Yuva Ol",
  "Sahiplendirilebilir hayvan kayıtlarını tür, cinsiyet, yaş, kısırlaştırma ve sağlık durumu ölçütleriyle incelemek için hazırlanan sayfa.",
);

type SearchParams = Record<string, QueryValue>;

interface AdoptionPageProps {
  readonly searchParams: Promise<SearchParams>;
}

function valueFrom<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

function numberFrom(value: string, min: number, max: number): number | undefined {
  const number = Number(value);
  return Number.isInteger(number) && number >= min && number <= max
    ? number
    : undefined;
}

export default async function AdoptionPage({ searchParams }: AdoptionPageProps) {
  const params = await searchParams;
  const speciesValue = getQueryValue(params.tur);
  const ageValue = getQueryValue(params.yas);
  const genderValue = getQueryValue(params.cinsiyet);
  const sterilizationValue = getQueryValue(params.kisir);
  const healthValue = getQueryValue(params.durum);
  const selectedAge = numberFrom(ageValue, -1, 50) ?? -1;

  const filters: AnimalFilters = {
    species: valueFrom<AnimalSpecies>(speciesValue, ["cat", "dog"]),
    gender: valueFrom<AnimalGender>(genderValue, ["female", "male"]),
    age: selectedAge === -1 ? undefined : selectedAge,
    sterilizationStatus: valueFrom<AnimalSterilizationStatus>(
      sterilizationValue,
      ["sterilized", "not_sterilized"],
    ),
    healthStatus: valueFrom<AnimalHealthStatus>(healthValue, [
      "balance_issue",
      "disabled",
      "healthy",
    ]),
  };
  const animals = getMockAnimals(filters);

  return (
    <div className="page page--adoption">
      <section className="adoption-hero" aria-labelledby="adoption-title">
        <Image
          alt=""
          aria-hidden="true"
          className="adoption-hero__image"
          fill
          priority
          sizes="100vw"
          src="/assets/animals/yuva-ol-hero.webp"
        />

        <div className="container adoption-hero__inner">
          <div className="adoption-hero__copy">
            <p className="adoption-hero__eyebrow">Yuva Ol</p>
            <h1 id="adoption-title">
              <span>Yeni bir başlangıca</span>
              <span>yuva olun.</span>
            </h1>
            <p>
              Sahiplenmeye hazır hayvanları tür, cinsiyet, yaş, kısırlaştırma ve
              sağlık durumu bilgileriyle tarayın. Kayıtlar bu aşamada yalnızca
              arayüz yapısını gösteren demo içeriklerdir.
            </p>
          </div>

          <section
            aria-label="Hayvan kayıtlarını filtreleyin"
            className="adoption-filter-panel"
          >
            <form className="adoption-filter-form" method="get">
              <div className="form-field adoption-filter-field">
                <label htmlFor="species">Tür</label>
                <div className="adoption-filter-control">
                  <PawPrint aria-hidden="true" size={19} />
                  <select id="species" name="tur" defaultValue={speciesValue}>
                    <option value="">Tümü</option>
                    <option value="cat">Kedi</option>
                    <option value="dog">Köpek</option>
                  </select>
                </div>
              </div>

              <div className="form-field adoption-filter-field">
                <label htmlFor="gender">Cinsiyet</label>
                <div className="adoption-filter-control">
                  <GenderIntersex aria-hidden="true" size={19} />
                  <select id="gender" name="cinsiyet" defaultValue={genderValue}>
                    <option value="">Tümü</option>
                    <option value="female">Dişi</option>
                    <option value="male">Erkek</option>
                  </select>
                </div>
              </div>

              <AgeRangeFilter defaultValue={selectedAge} />

              <div className="form-field adoption-filter-field">
                <label htmlFor="sterilization-status">Kısırlaştırma</label>
                <div className="adoption-filter-control">
                  <GenderNeuter aria-hidden="true" size={19} />
                  <select
                    id="sterilization-status"
                    name="kisir"
                    defaultValue={sterilizationValue}
                  >
                    <option value="">Tümü</option>
                    <option value="sterilized">Kısırlaştırılmış</option>
                    <option value="not_sterilized">Kısırlaştırılmamış</option>
                  </select>
                </div>
              </div>

              <div className="form-field adoption-filter-field">
                <label htmlFor="health-status">Durum</label>
                <div className="adoption-filter-control">
                  <Heartbeat aria-hidden="true" size={19} />
                  <select
                    id="health-status"
                    name="durum"
                    defaultValue={healthValue}
                  >
                    <option value="">Tümü</option>
                    <option value="balance_issue">Denge problemli</option>
                    <option value="disabled">Engelli</option>
                    <option value="healthy">Sağlıklı</option>
                  </select>
                </div>
              </div>

              <Link className="adoption-filter-reset" href="/sahiplendirme">
                <span>Temizle</span>
                <ArrowCounterClockwise aria-hidden="true" size={18} />
              </Link>

              <button
                className="button button--primary adoption-filter-submit"
                type="submit"
              >
                <span>Sonuçları göster</span>
                <MagnifyingGlass aria-hidden="true" size={19} weight="bold" />
              </button>
            </form>
          </section>
        </div>
      </section>

      <section
        className="container adoption-results"
        aria-labelledby="adoption-results-title"
      >
        <div className="adoption-results__heading">
          <div>
            <ListBullets aria-hidden="true" size={28} />
            <h2 id="adoption-results-title">Demo kayıtlar</h2>
          </div>
          <p aria-live="polite">{animals.length} demo kayıt gösteriliyor</p>
        </div>

        <aside className="adoption-demo-note" aria-label="Demo veri uyarısı">
          <Info aria-hidden="true" size={18} weight="fill" />
          <p>
            <strong>Demo veri uyarısı:</strong> Bu sayfadaki hiçbir kayıt gerçek bir
            hayvanı temsil etmez. Üretim verisi sağlandığında aynı tipli veri
            katmanına bağlanacaktır.
          </p>
        </aside>

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
  );
}
