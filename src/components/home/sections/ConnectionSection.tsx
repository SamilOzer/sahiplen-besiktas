import Image from "next/image";

export function ConnectionSection() {
  return (
    <section
      className="home-connection home-section"
      aria-labelledby="home-connection-title"
    >
      <div className="container home-connection__grid">
        <figure className="home-connection__media">
          <div className="home-connection__image-frame">
            <Image
              src="/assets/animals/human-dog-bond.webp"
              alt="Bir insan elinin bir köpeğin patisini nazikçe tuttuğu yakın plan"
              fill
              sizes="(max-width: 47.99rem) 100vw, 50vw"
              data-bond-image
            />
          </div>
          <figcaption>Bağ, gündelik bir sorumlulukla başlar.</figcaption>
        </figure>

        <div className="home-connection__content">
          <p className="home-section-index" aria-hidden="true">02 / BAĞ</p>
          <p className="eyebrow">Birlikte yaşam</p>
          <h2 id="home-connection-title">Aynı kenti, aynı hayatı paylaşıyoruz.</h2>
          <p>
            Bağ, yalnızca bir duygu değil; açık bilgi, erişilebilir hizmet ve uzun vadeli sorumlulukla kurulan ortak bir yaşamdır.
          </p>
        </div>
      </div>
    </section>
  );
}
