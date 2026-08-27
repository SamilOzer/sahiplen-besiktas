import type { HomepageEditorialItem } from "@/types/homepage";

interface MunicipalImpactSectionProps {
  readonly items: readonly HomepageEditorialItem[];
}

export function MunicipalImpactSection({
  items,
}: MunicipalImpactSectionProps) {
  return (
    <section
      className="home-impact home-section"
      aria-labelledby="home-impact-title"
    >
      <div className="container">
        <div className="home-section-heading">
          <div>
            <p className="home-section-index" aria-hidden="true">06 / KAMU</p>
            <p className="eyebrow">Belediye ve kamu değeri</p>
            <h2 id="home-impact-title">Kamusal hizmet, açık bilgiyle güçlenir.</h2>
          </div>
          <p>
            Hizmet kapsamını resmî kaynaklardan inceleyin; ziyaret ve başvuru
            öncesinde güncel bilgiyi ilgili birimle teyit edin.
          </p>
        </div>

        <ol className="home-impact__list">
          {items.map((item) => (
            <li className="home-impact__item" key={item.number}>
              <span className="home-impact__number">{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              {item.status ? <span className="home-content-status">{item.status}</span> : null}
              {item.href ? <a href={item.href}>Resmî bilgi</a> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
