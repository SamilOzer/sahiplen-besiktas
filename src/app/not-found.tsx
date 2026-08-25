import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFoundPage() {
  return (
    <div className="section">
      <div className="container container--narrow not-found">
        <p className="eyebrow">404 · Sayfa bulunamadı</p>
        <h1>Aradığınız sayfaya ulaşılamıyor.</h1>
        <p>
          Bağlantı değişmiş veya sayfa henüz yayımlanmamış olabilir. Ana sayfadan
          hizmetlere yeniden ulaşabilirsiniz.
        </p>
        <div className="button-group">
          <ButtonLink href="/">Ana sayfaya dön</ButtonLink>
          <ButtonLink href="/iletisim" variant="secondary">
            İletişim sayfasına git
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
