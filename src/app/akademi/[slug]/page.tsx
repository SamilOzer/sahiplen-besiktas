import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { knowledgeArticles, getKnowledgeArticle } from "@/data/academy";
import { createPageMetadata } from "@/lib/metadata";

type Props = { readonly params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return knowledgeArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getKnowledgeArticle((await params).slug);
  if (!article) notFound();
  return createPageMetadata(article.title, article.description, `/akademi/${article.slug}`);
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const article = getKnowledgeArticle((await params).slug);
  if (!article) notFound();
  return (
    <article className="page knowledge-detail">
      <div className="container section">
        <nav className="breadcrumbs" aria-label="İçerik yolu"><Link href="/">Ana sayfa</Link><span aria-hidden="true">/</span><Link href="/akademi">Akademi</Link><span aria-hidden="true">/</span><span>{article.category}</span></nav>
        <header className="knowledge-detail__header">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="knowledge-detail__lead">{article.description}</p>
          <p className="source-note">Son gözden geçirme: <time dateTime={article.updatedAt}>27 Ağustos 2026</time></p>
        </header>
        <div className="knowledge-detail__layout">
          <nav className="reading-index" aria-label="Bu rehberde"><h2>Bu rehberde</h2><ol>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
          <div className="prose knowledge-detail__body">
            {article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2><p>{section.body}</p>{section.checklist ? <ul>{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}
            <section id="kaynaklar"><h2>Kaynaklar ve kapsam</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ul><p>Bu yazı genel bilgilendirme amacı taşır. Bireysel bakım ve sağlık kararları için veteriner hekime; güncel hizmet koşulları için ilgili belediye birimine başvurun.</p></section>
            <div className="button-group"><Link className="button button--primary" href="/iletisim">İletişim kanalları</Link><Link className="button button--secondary" href="/akademi">Diğer rehberler</Link></div>
          </div>
        </div>
      </div>
    </article>
  );
}
