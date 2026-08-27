import { HomepageAnimalPreview } from "@/components/home/HomepageAnimalPreview";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { AnimalRecord } from "@/types/animal";

interface AnimalDiscoverySectionProps {
  readonly animals: readonly AnimalRecord[];
}

export function AnimalDiscoverySection({
  animals,
}: AnimalDiscoverySectionProps) {
  return (
    <section
      className="home-discovery home-section"
      aria-labelledby="home-discovery-title"
    >
      <div className="container">
        <div className="home-discovery__layout">
          <div className="home-discovery__heading">
          <div>
            <p className="home-section-index" aria-hidden="true">04 / ARŞİV</p>
            <p className="eyebrow">Hayvanları keşfet</p>
            <h2 id="home-discovery-title">Bakışın ardındaki karakteri tanıyın.</h2>
          </div>
          <ButtonLink href="/sahiplendirme" variant="text">
            Tüm hayvanları gör
          </ButtonLink>
          <p className="home-data-note">
            Tanışmadan önce günlük ihtiyaçları, bakım sorumluluklarını ve güncel sahiplendirme durumunu inceleyin.
          </p>
          </div>

          <div className="home-discovery__grid">
            {animals.map((animal) => (
              <HomepageAnimalPreview animal={animal} key={animal.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
