import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Hakkımızda",
  "Beşiktaş Belediyesi hayvan hizmetleri platformunun amacı, kapsamı ve içerik yaklaşımı hakkında bilgi.",
);

const principles = [
  {
    number: "01",
    title: "Açık yönlendirme",
    description: "Kritik bilgi, gereksiz etkileşimlerin arkasına saklanmadan sunulur.",
  },
  {
    number: "02",
    title: "Sorumlu temsil",
    description: "Hayvanlar birer kayıt değil, ihtiyaçları ve karakterleri olan bireyler olarak ele alınır.",
  },
  {
    number: "03",
    title: "Doğrulanmış içerik",
    description: "Kurumsal bilgi ve yönlendirmeler yalnızca onaylı kaynaklarla yayımlanır.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="page page--about">
      <div className="container section">
        <PageHeader
          eyebrow="Hakkımızda"
          title="Birlikte yaşam için tasarlanmış kamusal bir platform."
          description="Sahiplendirme, kayıp hayvan ilanları ve güvenilir bilgiye erişimi tek, anlaşılır ve erişilebilir bir dijital hizmette bir araya getiriyoruz."
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
            <p className="eyebrow">Platformun amacı</p>
            <h2 id="about-purpose">Daha az adım, daha açık bilgi, daha doğru karşılaşmalar.</h2>
            <p>
              Tasarımın görevi yalnızca güzel görünmek değil; vatandaşın doğru içeriğe hızlıca ulaşmasını, bir hayvanı sorumlu biçimde tanımasını ve sonraki adımı güvenle anlayabilmesini sağlamaktır.
            </p>
            <ButtonLink href="/sahiplendirme" variant="text">Sahiplendirmeyi keşfet</ButtonLink>
          </div>
        </section>

        <section className="about-principles" aria-labelledby="about-principles">
          <div className="about-principles__intro">
            <p className="eyebrow">Çalışma ilkeleri</p>
            <h2 id="about-principles">Her ekranda aynı kamusal sorumluluk.</h2>
          </div>
          <ol className="about-principles__list">
            {principles.map((principle) => (
              <li key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-process" aria-labelledby="about-process">
          <div>
            <p className="eyebrow">İçerik süreci</p>
            <h2 id="about-process">Tasarım hazır; kurumsal anlatı doğrulamayla tamamlanacak.</h2>
          </div>
          <div className="about-process__steps">
            <p><span>01</span> Kurum içeriğinin sağlanması</p>
            <p><span>02</span> Kaynak ve kapsam kontrolü</p>
            <p><span>03</span> Erişilebilir dijital yayın</p>
          </div>
        </section>

        <Notice title="İçerik onayı bekleniyor">
          <p>
            Belediyenin birimleri, çalışmaları, hizmet kapsamı ve kurumsal anlatısı onaylı içerik sağlandıktan sonra eklenecektir. Burada doğrulanmamış kurumsal bilgi veya istatistik kullanılmamıştır.
          </p>
        </Notice>
      </div>
    </div>
  );
}
