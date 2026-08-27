import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLostAnimal } from "@/data/records";
import { municipality } from "@/config/municipality";
import { genderLabels, lostAnimalStatusLabels, speciesLabels } from "@/lib/animal-labels";
import { formatListingDate } from "@/lib/animal-filters";
import { createPageMetadata } from "@/lib/metadata";

type Props = { readonly params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const animal = getLostAnimal((await params).slug);
  if (!animal) notFound();
  return createPageMetadata(animal.name, animal.distinguishingFeatures, `/kayip-hayvanlar/${animal.slug}`);
}

export default async function LostAnimalDetailPage({ params }: Props) {
  const animal = getLostAnimal((await params).slug);
  if (!animal) notFound();
  return (
    <div className="page"><div className="container section">
      <nav className="breadcrumbs" aria-label="İçerik yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><Link href="/kayip-hayvanlar">Kayıp Can Dostlarımız</Link><span aria-hidden="true">/</span><span aria-current="page">{animal.name}</span></nav>
      <article className="record-detail">
        <div className="record-detail__media">{animal.image ? <Image src={animal.image.src} alt={animal.image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" priority /> : <p>Bu ilan için görsel paylaşılmadı.</p>}</div>
        <div className="record-detail__content">
          <p className="eyebrow">{speciesLabels[animal.species]} · {lostAnimalStatusLabels[animal.status]}</p>
          <h1>{animal.name}</h1>
          <dl className="record-detail__facts"><div><dt>Konum</dt><dd>{animal.location}</dd></div><div><dt>Tarih</dt><dd>{formatListingDate(animal.lostDate)}</dd></div><div><dt>Cinsiyet</dt><dd>{genderLabels[animal.gender]}</dd></div><div><dt>İlan durumu</dt><dd>{lostAnimalStatusLabels[animal.status]}</dd></div></dl>
          <h2>Ayırt edici özellikler</h2><p>{animal.distinguishingFeatures}</p>
          <h2>Bu ilanla ilgili bilginiz var mı?</h2><p>{animal.status === "closed" ? "Bu ilan kapatılmıştır. Diğer ilanları inceleyebilir veya yeni bir bilgi için belediyeye ulaşabilirsiniz." : "Görsel, konum ve tarih bilgilerini birlikte karşılaştırın. Olası eşleşme hakkında belediyeye ulaşırken ilan numarasını belirtin."}</p>
          <p className="source-note">İlan numarası: {animal.id}</p>
          <div className="button-group"><a className="button button--primary" href={municipality.phoneHref}>{municipality.phone} · İletişim</a><Link className="button button--secondary" href="/kayip-hayvanlar">Tüm ilanlar</Link></div>
        </div>
      </article>
    </div></div>
  );
}
