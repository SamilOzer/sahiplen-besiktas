import { ButtonLink } from "@/components/ui/ButtonLink";

export function AdoptionSection() {
  return (
    <section
      className="home-adoption home-section"
      aria-labelledby="home-adoption-title"
    >
      <div className="container home-adoption__grid">
        <div>
          <p className="home-section-index" aria-hidden="true">03 / BİREY</p>
          <p className="eyebrow">Sahiplendirme</p>
          <h2 id="home-adoption-title">
            Her kayıt, kendine özgü bir karakter.
          </h2>
        </div>
        <div className="home-adoption__copy">
          <p>
            Her hayvanı kişiliği, yaşam bilgileri ve sahiplendirme durumuyla
            tanıyın. Doğru karşılaşmaya bilgiyle hazırlanın.
          </p>
          <ButtonLink href="/sahiplendirme">Yuva Ol sayfasına git</ButtonLink>
          <span className="home-adoption__note">Fotoğraf · kişilik · yaşam bilgisi · durum</span>
        </div>
      </div>
    </section>
  );
}
