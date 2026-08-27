import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { GenderNeuter } from "@phosphor-icons/react/dist/ssr/GenderNeuter";
import { GenderIntersex } from "@phosphor-icons/react/dist/ssr/GenderIntersex";
import { Heartbeat } from "@phosphor-icons/react/dist/ssr/Heartbeat";
import { ListBullets } from "@phosphor-icons/react/dist/ssr/ListBullets";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { PawPrint } from "@phosphor-icons/react/dist/ssr/PawPrint";

import { AgeRangeFilter } from "@/components/animals/AgeRangeFilter";
import { AnimalCard } from "@/components/animals/AnimalCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAnimals } from "@/data/records";
import { municipality } from "@/config/municipality";
import { createPageMetadata } from "@/lib/metadata";
import { getQueryValue, type QueryValue } from "@/lib/query";
import type {
  AnimalFilters,
  AnimalGender,
  AnimalHealthStatus,
  AnimalSpecies,
  AnimalSterilizationStatus,
  AdoptionStatus,
} from "@/types/animal";

export const metadata: Metadata = createPageMetadata(
  "Yuva Ol",
  "Hayvan kayıtlarını tür, cinsiyet, yaş ve sahiplendirme durumuna göre inceleyin; Beşiktaş Belediyesi sahiplendirme hizmetine ulaşın.",
  "/sahiplendirme",
);

type SearchParams = Record<string, QueryValue>;

interface AdoptionPageProps {
  readonly searchParams: Promise<SearchParams>;
}

const MAX_FILTER_AGE = 50;

function valueFrom<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

function numberFrom(value: string, min: number, max: number): number | undefined {
  if (value.trim() === "") return undefined;

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
  const adoptionValue = getQueryValue(params.sahiplendirme);
  const selectedMaxAge =
    numberFrom(ageValue, 0, MAX_FILTER_AGE) ?? MAX_FILTER_AGE;

  const filters: AnimalFilters = {
    species: valueFrom<AnimalSpecies>(speciesValue, ["cat", "dog"]),
    gender: valueFrom<AnimalGender>(genderValue, ["female", "male"]),
    maxAge: ageValue.trim() === "" ? undefined : selectedMaxAge,
    sterilizationStatus: valueFrom<AnimalSterilizationStatus>(
      sterilizationValue,
      ["sterilized", "not_sterilized"],
    ),
    healthStatus: valueFrom<AnimalHealthStatus>(healthValue, [
      "balance_issue",
      "disabled",
      "healthy",
    ]),
    adoptionStatus: valueFrom<AdoptionStatus>(adoptionValue, ["available", "reserved", "adopted"]),
  };
  const animals = getAnimals(filters);
  const hasPublishedAnimals = getAnimals().length > 0;

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
              sağlık durumu bilgileriyle tanıyın. Yaşamınıza uygun bir dostla
              tanışmak için sahiplenme sürecini öğrenin.
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

              <AgeRangeFilter
                defaultValue={selectedMaxAge}
                max={MAX_FILTER_AGE}
              />

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
                <label htmlFor="health-status">Sağlık durumu</label>
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

              <div className="form-field adoption-filter-field">
                <label htmlFor="adoption-status">Sahiplendirme durumu</label>
                <div className="adoption-filter-control">
                  <ListBullets aria-hidden="true" size={19} />
                  <select id="adoption-status" name="sahiplendirme" defaultValue={adoptionValue}>
                    <option value="">Tümü</option><option value="available">Yuva arıyor</option><option value="reserved">Görüşme aşamasında</option><option value="adopted">Sahiplendirildi</option>
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
            <h2 id="adoption-results-title">Yuva arayan dostlarımız</h2>
          </div>
          <p aria-live="polite">{animals.length} kayıt gösteriliyor</p>
        </div>

        {animals.length > 0 ? (
          <div className="animal-grid">
            {animals.map((animal) => (
              <AnimalCard animal={animal} key={animal.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={hasPublishedAnimals ? "Bu filtrelerle eşleşen kayıt bulunamadı." : "Bu sitede henüz hayvan kaydı yayımlanmadı."}
            description={hasPublishedAnimals ? "Daha geniş bir yaş aralığı seçin veya filtreleri temizleyin." : "Bu durum, belediyede sahiplenilebilecek hayvan olmadığı anlamına gelmez. Güncel bilgi ve tanışma için Çözüm Merkezi ile görüşebilirsiniz."}
            action={hasPublishedAnimals ? { href: "/sahiplendirme", label: "Filtreleri temizle" } : { href: "/iletisim", label: "Sahiplenme için iletişime geçin" }}
          />
        )}
        <section className="service-callout" aria-labelledby="adoption-process-title">
          <div><p className="eyebrow">Bir sonraki adım</p><h2 id="adoption-process-title">Tanışmaya hazırlanmakla başlayın.</h2><p>Yaşam düzeninizi ve bakım sorumluluklarını değerlendirin. Ziyaret ve başvuru için güncel bilgiyi belediyenin ilgili biriminden alın.</p></div>
          <div className="button-group"><Link className="button button--primary" href="/akademi/besiktasta-sahiplenme">Sahiplenme rehberi</Link><a className="button button--secondary" href={municipality.phoneHref}>{municipality.phone} · Ara</a></div>
        </section>
      </section>
    </div>
  );
}
