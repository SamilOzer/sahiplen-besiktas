import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { knowledgeArticles, searchKnowledge } from "@/data/academy";
import { createPageMetadata } from "@/lib/metadata";
import { getQueryValue, type QueryValue } from "@/lib/query";

export const metadata: Metadata = createPageMetadata(
  "Akademi",
  "Sahiplenme, kayıp ve bulunan hayvanlar ile belediye hizmetleri için kaynaklı, erişilebilir rehberler.",
  "/akademi",
);

const categories = [...new Set(knowledgeArticles.map((article) => article.category))];

export default async function AcademyPage({ searchParams }: { readonly searchParams: Promise<Record<string, QueryValue>> }) {
  const params = await searchParams;
  const query = getQueryValue(params.q).slice(0, 200);
  const categoryValue = getQueryValue(params.kategori);
  const category = categories.includes(categoryValue) ? categoryValue : "";
  const articles = searchKnowledge(query, category);
  const featured = knowledgeArticles[0];
  return (
    <div className="page page--academy">
      <div className="container section">
        <PageHeader
          eyebrow="Akademi"
          title="Bilgi, birlikte yaşamın en güçlü altyapısıdır."
          description="Sahiplenme kararından doğru iletişim kanalına: günlük ihtiyaçlara yanıt veren kısa, kaynaklı ve anlaşılır rehberler."
          context="Bilgi merkezi / Editoryal yayın"
        />

        <nav className="academy-categories" aria-label="Akademi kategorileri">
          <span className="academy-categories__label">Konular</span>
          <ul>
            <li><Link href="/akademi" aria-current={!category ? "page" : undefined}>Tüm konular</Link></li>
            {categories.map((item) => <li key={item}><Link href={`/akademi?kategori=${encodeURIComponent(item)}`} aria-current={category === item ? "page" : undefined}>{item}</Link></li>)}
          </ul>
        </nav>

        <form className="knowledge-search" role="search" method="get" aria-label="Rehberlerde ara">
          <div className="form-field"><label htmlFor="knowledge-query">Rehberlerde ara</label><input id="knowledge-query" name="q" type="search" defaultValue={query} maxLength={200} placeholder="Konu veya anahtar kelime" /></div>
          <input type="hidden" name="kategori" value={category} />
          <button className="button button--primary" type="submit">Ara</button>
          {query || category ? <Link className="button button--text" href="/akademi">Filtreleri temizle</Link> : null}
        </form>

        {!query && !category ? <section className="academy-feature" aria-labelledby="academy-feature-title">
          <figure className="academy-feature__media">
            <Image
              src="/assets/animals/adoption-cat.webp"
              alt="Temsilî gri çizgili kedi portresi"
              fill
              sizes="(max-width: 63.99rem) 100vw, 55vw"
            />
            <figcaption>Birlikte yaşama hazırlanmak</figcaption>
          </figure>
          <article className="academy-feature__story">
            <p className="article-kicker">Öne çıkan rehber · {featured.category}</p>
            <h2 id="academy-feature-title">{featured.title}</h2>
            <p>{featured.description}</p>
            <Link className="button button--text" href={`/akademi/${featured.slug}`}>Rehberi oku</Link>
          </article>
        </section> : null}

        <section className="academy-archive" aria-labelledby="academy-archive-title">
          <div className="academy-archive__header">
            <div>
              <p className="eyebrow">Yayın arşivi</p>
              <h2 id="academy-archive-title">Bilgi dosyaları</h2>
            </div>
            <p role="status">{articles.length} rehber gösteriliyor</p>
          </div>
          <div className="article-grid">
            {articles.map((article, index) => (
              <article className="article-card" key={article.title}>
                <span className="article-card__number">{String(index + 1).padStart(2, "0")}</span>
                <p className="article-kicker">{article.category}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <Link className="button button--text" href={`/akademi/${article.slug}`} aria-label={`${article.title} rehberini oku`}>Rehberi oku</Link>
              </article>
            ))}
          </div>
          {articles.length === 0 ? <EmptyState title="Bu aramayla eşleşen rehber bulunamadı." description="Daha kısa bir arama deneyin veya tüm konulara dönün." action={{ href: "/akademi", label: "Tüm rehberler" }} /> : null}
          <p className="source-note">Rehberlerin kaynakları her yazının sonunda belirtilmiştir. İçerikler genel bilgilendirmedir; kişiye özel veteriner muayenesi veya hukuki değerlendirme yerine geçmez.</p>
        </section>
      </div>
    </div>
  );
}
