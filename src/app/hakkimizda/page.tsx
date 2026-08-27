import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { municipality } from "@/config/municipality";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Hakkımızda",
  "Beşiktaş Belediyesi hayvan hizmetleri platformunun amacı, kapsamı ve içerik yaklaşımı hakkında bilgi.",
  "/hakkimizda",
);

const principles = [
  {
    number: "01",
    title: "Sahiplendirme",
    description: "Hayvanlarla tanışma ve sahiplenme süreci için belediyenin ilgili birimlerinden bilgi alınabilir.",
    href: municipality.sources.adoption,
  },
  {
    number: "02",
    title: "Bakım ve rehabilitasyon",
    description: "Sokak Hayvanları Rehabilitasyon Merkezi’nde muayene, tedavi, kısırlaştırma ve koruyucu hekimlik hizmetleri sunulur.",
    href: municipality.sources.rehabilitation,
  },
  {
    number: "03",
    title: "Özel bakım ihtiyacı",
    description: "Engelli Kedi Ünitesi, sokakta yaşayan ve özel bakım ihtiyacı bulunan kedilere destek ve barınma sağlar.",
    href: municipality.sources.assistedCare,
  },
] as const;

export default function AboutPage() {
  return (
    <div className="page page--about">
      <div className="container section">
        <PageHeader
          eyebrow="Hakkımızda"
          title="Birlikte yaşam, ortak sorumluluk."
          description="Beşiktaş’ın hayvan hizmetlerine, sahiplenme bilgilerine ve doğru iletişim kanallarına anlaşılır ve erişilebilir bir yerden ulaşın."
        />

        <section className="about-feature" aria-labelledby="about-purpose">
          <figure className="about-feature__media">
            <Image
              src="/assets/animals/human-dog-bond.webp"
              alt="Bir insan elinin bir köpeğin patisini nazikçe tuttuğu yakın plan"
              fill
              sizes="(max-width: 63.99rem) 100vw, 58vw"
            />
            <figcaption>Temsilî fotoğraf · Kurumsal hizmet kaydı değildir</figcaption>
          </figure>
          <div className="about-feature__copy">
            <p className="eyebrow">İnsanı ve hayvanı birlikte düşünmek</p>
            <h2 id="about-purpose">Bir yuvadan fazlası: yaşam boyu bir bağ.</h2>
            <p>
              Sahiplenme, bir hayvanın ihtiyaçlarını anlamakla başlar. Bu platform; tanışma sürecine hazırlanmayı, kayıp ve bulunan hayvanlarla ilgili bilgiye erişmeyi ve belediye hizmetlerine doğru kanaldan ulaşmayı kolaylaştırır.
            </p>
            <ButtonLink href="/sahiplendirme" variant="text">Yuva Ol&apos;u keşfet</ButtonLink>
          </div>
        </section>

        <section className="about-principles" aria-labelledby="about-principles">
          <div className="about-principles__intro">
            <p className="eyebrow">Belediye hizmetleri</p>
            <h2 id="about-principles">Bakım, destek ve yeni başlangıçlar.</h2>
          </div>
          <ol className="about-principles__list">
            {principles.map((principle) => (
              <li key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                  <a className="source-note" href={principle.href}>Resmî hizmet bilgisini inceleyin ↗</a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-process" aria-labelledby="about-process">
          <div>
            <p className="eyebrow">Doğru adım, açık bilgi</p>
            <h2 id="about-process">İhtiyacınıza göre ilerleyin.</h2>
          </div>
          <div className="about-process__steps">
            <p><span>01</span> Sahiplenme öncesi rehberleri okuyun.</p>
            <p><span>02</span> Hayvanın ihtiyaçlarını ilgili birimle görüşün.</p>
            <p><span>03</span> Güncel hizmet ve başvuru koşullarını teyit edin.</p>
          </div>
        </section>

        <div className="button-group"><ButtonLink href="/akademi">Rehberleri okuyun</ButtonLink><ButtonLink href="/iletisim" variant="secondary">Belediyeye ulaşın</ButtonLink></div>
        <p className="source-note">Hizmet açıklamaları bağlantı verilen belediye kaynaklarından derlenmiştir. Son kontrol: 27 Ağustos 2026. Güncel kapsam ve ziyaret bilgisi için <a href={municipality.sources.services}>resmî veteriner hizmetleri sayfasını</a> inceleyin.</p>
      </div>
    </div>
  );
}
