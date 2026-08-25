import { ButtonLink } from "@/components/ui/ButtonLink";
import type { HomepageKnowledgeItem } from "@/types/homepage";

interface AcademySectionProps {
  readonly items: readonly HomepageKnowledgeItem[];
}

export function AcademySection({ items }: AcademySectionProps) {
  return (
    <section
      className="home-academy home-section"
      aria-labelledby="home-academy-title"
    >
      <div className="container">
        <div className="home-section-heading home-section-heading--academy">
          <div>
            <p className="home-section-index" aria-hidden="true">07 / BİLGİ</p>
            <p className="eyebrow">Akademi</p>
            <h2 id="home-academy-title">Bilgi, birlikte yaşamın altyapısıdır.</h2>
          </div>
          <ButtonLink href="/akademi" variant="text">
            Akademiye git
          </ButtonLink>
        </div>

        <ol className="home-academy__list">
          {items.map((item, index) => (
            <li className="home-academy__item" key={item.title}>
              <span className="home-academy__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className="demo-badge">Onaylı içerik bekleniyor</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
