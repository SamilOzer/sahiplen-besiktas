import type { Metadata } from "next";
import Image from "next/image";

import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Akademi",
  "Sorumlu hayvan bakımı, sahiplendirme ve kayıp hayvanlar hakkında onaylı içerikler için tasarlanan bilgi merkezi.",
);

const categories = [
  "Sahiplenme",
  "Birlikte yaşam",
  "Bakım",
  "Sağlık",
  "Davranış",
  "Kayıp hayvanlar",
] as const;

const articleSlots = [
  {
    category: "Birlikte yaşam",
    title: "Yeni bir yaşam düzenine hazırlanmak",
    description: "Uyum sürecinin temel başlıkları için uzman onaylı içerik alanı.",
  },
  {
    category: "Kayıp hayvanlar",
    title: "Kayıp durumunda ilk adımlar",
    description: "Hızlı ve doğru yönlendirme sunacak içerik dosyası.",
  },
  {
    category: "Bakım",
    title: "Günlük bakımın ortak dili",
    description: "Sorumlu bakım pratikleri için doğrulanmış yayın alanı.",
  },
  {
    category: "Davranış",
    title: "Davranışı anlamaya giriş",
    description: "Uzman değerlendirmesi sonrası yayımlanacak bilgi alanı.",
  },
] as const;

export default function AcademyPage() {
  return (
    <div className="page page--academy">
      <div className="container section">
        <PageHeader
          eyebrow="Akademi"
          title="Bilgi, birlikte yaşamın en güçlü altyapısıdır."
          description="Akademi; uzman ve kurum onaylı içerikleri güçlü bir yayın hiyerarşisiyle sunacak ölçeklenebilir bir bilgi merkezi olarak tasarlandı."
          context="Bilgi merkezi / Editoryal yayın"
        />

        <nav className="academy-categories" aria-label="Akademi kategorileri">
          <span className="academy-categories__label">Konular</span>
          <ul>
            {categories.map((category) => <li key={category}>{category}</li>)}
          </ul>
        </nav>

        <Notice title="İçerik taslağı">
          <p>
            Bu sayfadaki yayın başlıkları yalnızca bilgi mimarisi örnekleridir. Henüz sağlık veya bakım tavsiyesi yayımlanmamaktadır.
          </p>
        </Notice>

        <section className="academy-feature" aria-labelledby="academy-feature-title">
          <figure className="academy-feature__media">
            <Image
              src="/assets/animals/adoption-cat.webp"
              alt="Temsilî gri çizgili kedi portresi"
              fill
              sizes="(max-width: 63.99rem) 100vw, 55vw"
            />
            <figcaption>Temsilî fotoğraf · Yayın görseli değildir</figcaption>
          </figure>
          <article className="academy-feature__story">
            <p className="article-kicker">Öne çıkan dosya · Yayın bekleniyor</p>
            <h2 id="academy-feature-title">Sahiplenme kararından önce düşünülmesi gerekenler</h2>
            <p>
              Sorumluluk, yaşam düzeni ve uzun vadeli uyum başlıklarını bir araya getirecek rehber için ayrılmış editoryal alan.
            </p>
            <span className="card-link-disabled" aria-disabled="true">İçerik onayı bekleniyor</span>
          </article>
        </section>

        <section className="academy-archive" aria-labelledby="academy-archive-title">
          <div className="academy-archive__header">
            <div>
              <p className="eyebrow">Yayın arşivi</p>
              <h2 id="academy-archive-title">Bilgi dosyaları</h2>
            </div>
            <p>İlk yayınlar uzman ve kurum onayından sonra erişime açılacaktır.</p>
          </div>
          <div className="article-grid">
            {articleSlots.map((article, index) => (
              <article className="article-card" key={article.title}>
                <span className="article-card__number">{String(index + 1).padStart(2, "0")}</span>
                <p className="article-kicker">{article.category}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span className="demo-badge">İçerik bekleniyor</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
