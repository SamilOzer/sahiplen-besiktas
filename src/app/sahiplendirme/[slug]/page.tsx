import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAnimal } from "@/data/records";
import { municipality } from "@/config/municipality";
import { adoptionStatusLabels, genderLabels, healthStatusLabels, speciesLabels, sterilizationStatusLabels } from "@/lib/animal-labels";
import { createPageMetadata } from "@/lib/metadata";

type Props = { readonly params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const animal = getAnimal((await params).slug);
  if (!animal) notFound();
  return createPageMetadata(animal.name, animal.personalitySummary, `/sahiplendirme/${animal.slug}`);
}

export default async function AnimalDetailPage({ params }: Props) {
  const animal = getAnimal((await params).slug);
  if (!animal) notFound();
  return (
    <div className="page"><div className="container section">
      <nav className="breadcrumbs" aria-label="İçerik yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><Link href="/sahiplendirme">Yuva Ol</Link><span aria-hidden="true">/</span><span aria-current="page">{animal.name}</span></nav>
      <article className="record-detail">
        <div className="record-detail__media">{animal.image ? <Image src={animal.image.src} alt={animal.image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" priority /> : <p>Bu kayıt için görsel paylaşılmadı.</p>}</div>
        <div className="record-detail__content">
          <p className="eyebrow">{speciesLabels[animal.species]} · {adoptionStatusLabels[animal.adoptionStatus]}</p>
          <h1>{animal.name}</h1><p className="record-detail__lead">{animal.personalitySummary}</p>
          <dl className="record-detail__facts">
            <div><dt>Yaş</dt><dd>{animal.age} yaş</dd></div><div><dt>Cinsiyet</dt><dd>{genderLabels[animal.gender]}</dd></div><div><dt>Irk</dt><dd>{animal.breed}</dd></div><div><dt>Kısırlaştırma</dt><dd>{sterilizationStatusLabels[animal.sterilizationStatus]}</dd></div><div><dt>Sağlık bilgisi</dt><dd>{healthStatusLabels[animal.healthStatus]}</dd></div>
          </dl>
          <h2>Eğitim ve birlikte yaşam</h2><p>{animal.trainingNotes ?? "Eğitim bilgisi paylaşılmadı. Günlük ihtiyaçları ve uyum sürecini ilgili birimle görüşebilirsiniz."}</p>
          <h2>Bir sonraki adım</h2><p>{animal.adoptionStatus === "adopted" ? "Bu hayvan sahiplendirildi. Yuva arayan diğer dostlarımızı inceleyebilirsiniz." : "Güncel durum ve tanışma için belediyeyle görüşürken kayıt numarasını paylaşın. Bu sayfayı incelemek veya favoriye eklemek başvuru oluşturmaz."}</p>
          <p className="source-note">Kayıt numarası: {animal.id}</p>
          <div className="button-group">{animal.adoptionStatus !== "adopted" ? <a className="button button--primary" href={municipality.phoneHref}>{municipality.phone} · Bilgi alın</a> : null}<Link className="button button--secondary" href="/sahiplendirme">Tüm kayıtlar</Link></div>
        </div>
      </article>
    </div></div>
  );
}
