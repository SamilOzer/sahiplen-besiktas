import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { Binoculars } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { Info } from "@phosphor-icons/react/dist/ssr/Info";
import { ListMagnifyingGlass } from "@phosphor-icons/react/dist/ssr/ListMagnifyingGlass";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { PawPrint } from "@phosphor-icons/react/dist/ssr/PawPrint";

import { LostAnimalCard } from "@/components/animals/LostAnimalCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getLostAnimals } from "@/data/records";
import { municipality } from "@/config/municipality";
import { parseListingDate } from "@/lib/animal-filters";
import { createPageMetadata } from "@/lib/metadata";
import { getQueryValue, type QueryValue } from "@/lib/query";
import type { AnimalSpecies } from "@/types/animal";
import type {
  LostAnimalFilters,
  LostAnimalStatus,
} from "@/types/lost-animal";

export const metadata: Metadata = createPageMetadata(
  "Kayıp Can Dostlarımız",
  "Kayıp ve bulunan hayvan ilanlarını tür, konum ve tarihe göre arayın; olası eşleşmeler ve bildirim için iletişim kanallarına ulaşın.",
  "/kayip-hayvanlar",
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
  const queryValue = getQueryValue(params.q).slice(0, 200);
  const locationValue = getQueryValue(params.konum).slice(0, 120);
  const speciesValue = getQueryValue(params.tur);
  const statusValue = getQueryValue(params.durum);
  const dateFrom = parseListingDate(getQueryValue(params.baslangic));
  const dateTo = parseListingDate(getQueryValue(params.bitis));
  const invalidDateRange = Boolean(dateFrom && dateTo && dateFrom > dateTo);

  const filters: LostAnimalFilters = {
    query: queryValue || undefined,
    location: locationValue || undefined,
    species: valueFrom<AnimalSpecies>(speciesValue, ["cat", "dog"]),
    status: valueFrom<LostAnimalStatus>(statusValue, [
      "missing",
      "found",
      "closed",
    ]),
    dateFrom,
    dateTo,
  };
  const animals = invalidDateRange ? [] : getLostAnimals(filters);
  const hasPublishedAnimals = getLostAnimals().length > 0;

  return (
    <div className="page page--lost">
      <section className="lost-page-hero" aria-labelledby="lost-page-title">
        <div className="container lost-page-hero__grid">
          <div className="lost-page-hero__copy">
            <p className="lost-page-hero__eyebrow">
              <span aria-hidden="true" />
              Beşiktaş Belediyesi hayvan hizmetleri
            </p>
            <h1 id="lost-page-title">
              <span>Kayıp</span>
              <em>Can Dostlarımız</em>
            </h1>
            <p className="lost-page-hero__lead">
              Bir fotoğraf, bir konum ya da küçük bir ayrıntı eve dönüşün
              başlangıcı olabilir. İlanları hızla tarayın, benzer kayıtları
              karşılaştırın.
            </p>

            <div className="lost-page-hero__actions">
              <a className="lost-page-hero__button" href="#lost-search">
                <span>İlanlarda ara</span>
                <ArrowDown aria-hidden="true" size={18} weight="bold" />
              </a>
              <p>Arama · filtreleme · hızlı karşılaştırma</p>
            </div>
          </div>

          <figure className="lost-page-hero__media">
            <Image
              alt="Bir insan eliyle bir köpeğin patisinin yan yana olduğu temsilî fotoğraf"
              className="lost-page-hero__image"
              fill
              priority
              sizes="(max-width: 47.99rem) 100vw, 50vw"
              src="/resimler/kayıp-hayvan-3.jpg"
            />
            <figcaption>Temsilî fotoğraf</figcaption>
          </figure>
        </div>
      </section>

      <section
        className="lost-search-section"
        id="lost-search"
        aria-labelledby="lost-search-title"
      >
        <div className="container">
          <div className="lost-search-shell">
            <div className="lost-search-shell__heading">
              <div>
                <p className="lost-section-label">Hızlı eşleştirme</p>
                <h2 id="lost-search-title">İzi daraltın.</h2>
                <p>
                  İsim, ayırt edici özellik, konum, tür veya ilan durumuyla
                  arama alanını küçültün.
                </p>
              </div>

              <aside className="lost-report-callout" aria-label="Bildirim için iletişim">
                <Info aria-hidden="true" size={18} weight="fill" />
                <p>
                  <strong>Bir dostunuzu mu arıyorsunuz?</strong>
                  Bildirim ve yönlendirme için <Link href="/iletisim">belediye ile iletişime geçin.</Link>
                </p>
              </aside>
            </div>

            <form className="lost-search-form" method="get" role="search">
              <div className="form-field lost-search-field lost-search-field--wide">
                <label htmlFor="keyword">Anahtar kelime</label>
                <div className="lost-search-control">
                  <MagnifyingGlass aria-hidden="true" size={19} />
                  <input
                    id="keyword"
                    name="q"
                    type="search"
                    defaultValue={queryValue}
                    placeholder="İsim veya ayırt edici özellik"
                    maxLength={200}
                  />
                </div>
              </div>

              <div className="form-field lost-search-field">
                <label htmlFor="location">Konum</label>
                <div className="lost-search-control">
                  <MapPin aria-hidden="true" size={19} />
                  <input
                    id="location"
                    name="konum"
                    type="search"
                    defaultValue={locationValue}
                    placeholder="Mahalle veya bölge"
                    maxLength={120}
                  />
                </div>
              </div>

              <div className="form-field lost-search-field">
                <label htmlFor="lost-species">Tür</label>
                <div className="lost-search-control">
                  <PawPrint aria-hidden="true" size={19} />
                  <select id="lost-species" name="tur" defaultValue={speciesValue}>
                    <option value="">Tümü</option>
                    <option value="cat">Kedi</option>
                    <option value="dog">Köpek</option>
                  </select>
                </div>
              </div>

              <div className="form-field lost-search-field">
                <label htmlFor="listing-status">İlan durumu</label>
                <div className="lost-search-control">
                  <ListMagnifyingGlass aria-hidden="true" size={19} />
                  <select
                    id="listing-status"
                    name="durum"
                    defaultValue={statusValue}
                  >
                    <option value="">Tümü</option>
                    <option value="missing">Aranıyor</option>
                    <option value="found">Bulundu</option>
                    <option value="closed">İlan kapatıldı</option>
                  </select>
                </div>
              </div>

              <fieldset className="lost-search-dates">
                <legend>Tarih aralığı <span>(isteğe bağlı)</span></legend>
                <div className="form-field"><label htmlFor="lost-date-from">Başlangıç</label><input id="lost-date-from" name="baslangic" type="date" defaultValue={dateFrom} aria-invalid={invalidDateRange} aria-describedby={invalidDateRange ? "lost-date-error" : undefined} /></div>
                <div className="form-field"><label htmlFor="lost-date-to">Bitiş</label><input id="lost-date-to" name="bitis" type="date" defaultValue={dateTo} aria-invalid={invalidDateRange} aria-describedby={invalidDateRange ? "lost-date-error" : undefined} /></div>
                {invalidDateRange ? <p className="field-error" id="lost-date-error" role="alert">Bitiş tarihi başlangıç tarihinden önce olamaz.</p> : null}
              </fieldset>

              <div className="lost-search-form__actions">
                <Link className="lost-search-reset" href="/kayip-hayvanlar">
                  <ArrowCounterClockwise aria-hidden="true" size={18} />
                  <span>Temizle</span>
                </Link>
                <button className="lost-search-submit" type="submit">
                  <span>İlanlarda ara</span>
                  <MagnifyingGlass aria-hidden="true" size={19} weight="bold" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="lost-results" aria-labelledby="lost-results-title">
        <div className="container">
          <div className="lost-results__heading">
            <div>
              <p className="lost-section-label">Kayıp ve bulunanlar</p>
              <h2 id="lost-results-title">İzleri karşılaştırın.</h2>
            </div>
            <p aria-live="polite">{animals.length} sonuç gösteriliyor</p>
          </div>

          <div className="lost-results__layout">
            <aside className="lost-scan-guide" aria-labelledby="scan-guide-title">
              <Binoculars aria-hidden="true" size={28} />
              <p className="lost-scan-guide__eyebrow">Hızlı kontrol</p>
              <h3 id="scan-guide-title">Bir eşleşmeyi değerlendirirken</h3>
              <ol>
                <li>
                  <span>01</span>
                  <p><strong>Görseli</strong> ve ayırt edici özellikleri karşılaştırın.</p>
                </li>
                <li>
                  <span>02</span>
                  <p><strong>Konum</strong> ve tarih bilgisini birlikte kontrol edin.</p>
                </li>
                <li>
                  <span>03</span>
                  <p><strong>İlan durumunun</strong> hâlâ güncel olduğundan emin olun.</p>
                </li>
              </ol>
              <p className="lost-scan-guide__note">
                Acil müdahale gerekiyorsa yazılı yanıtı beklemeyin. <a href={municipality.phoneHref}>{municipality.phone}</a> üzerinden Çözüm Merkezi’ni arayın.
              </p>
            </aside>

            <div>
              {animals.length > 0 ? (
                <div className="lost-animal-list">
                  {animals.map((animal) => (
                    <LostAnimalCard animal={animal} key={animal.id} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={invalidDateRange ? "Tarih aralığını kontrol edin." : hasPublishedAnimals ? "Eşleşen ilan bulunamadı." : "Bu sitede henüz ilan yayımlanmadı."}
                  description={invalidDateRange ? "Başlangıç tarihini bitiş tarihinden önce olacak şekilde düzenleyin." : hasPublishedAnimals ? "Arama ifadenizi sadeleştirin veya filtreleri temizleyin." : "Burada kayıt bulunmaması, kayıp hayvan bildirimi olmadığı anlamına gelmez. Son görülme konumu, tarih ve ayırt edici bilgilerle belediyeye ulaşabilirsiniz."}
                  action={invalidDateRange || hasPublishedAnimals ? { href: "/kayip-hayvanlar", label: "Filtreleri temizle" } : { href: "/iletisim", label: "Bildirim için iletişim" }}
                />
              )}
            </div>
          </div>
          <section className="service-callout" aria-labelledby="lost-next-title"><div><p className="eyebrow">Bir hayvan bulduğunuzda</p><h2 id="lost-next-title">Güvenliği koruyun, bilgiyi paylaşın.</h2><p>Görüldüğü yer, zaman ve ayırt edici özellikleri not edin. Müdahale gerektiren durumlarda uzman yönlendirmesi alın.</p></div><Link className="button button--secondary" href="/akademi/bulunan-kopek-icin-ilk-adimlar">İlk adımlar rehberi</Link></section>
        </div>
      </section>
    </div>
  );
}
