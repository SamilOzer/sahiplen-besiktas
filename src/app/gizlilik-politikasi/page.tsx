import type { Metadata } from "next";

import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Gizlilik politikası",
  "Platformun onaylanmış gizlilik ve kişisel veri bilgilendirmesinin yayımlanacağı yasal bilgi sayfası.",
);

export default function PrivacyPolicyPage() {
  return (
    <div className="page page--legal legal-page">
      <div className="container section">
        <PageHeader
          eyebrow="Yasal bilgilendirme"
          title="Gizlilik politikası"
          description="Okunabilir, erişilebilir ve sürümlenebilir bir yasal metin alanı."
          context="Yasal / İçerik durumu"
        />

        <div className="legal-layout">
          <aside className="legal-status" aria-label="Belge durumu">
            <span>Belge durumu</span>
            <strong>Onay bekleniyor</strong>
            <p>Yürürlük ve güncelleme tarihleri nihai metinle eklenecektir.</p>
          </aside>

          <div className="legal-content">
            <Notice title="Hukuki metin değildir">
              <p>
                Bu ilk sürümde onaylanmış bir gizlilik politikası bulunmamaktadır. Aşağıdaki içerik yalnızca yayımlama gereksinimlerini belirtir.
              </p>
            </Notice>

            <div className="prose">
              <section aria-labelledby="privacy-status">
                <h2 id="privacy-status">Yayımlama durumu</h2>
                <p>Nihai metin, ilgili belediye birimleri ve hukuk değerlendirmesi tamamlandıktan sonra bu sayfaya eklenecektir.</p>
              </section>
              <section aria-labelledby="privacy-requirements">
                <h2 id="privacy-requirements">Onaylanması gereken içerikler</h2>
                <ul>
                  <li>Veri sorumlusu ve iletişim bilgileri</li>
                  <li>İşlenen veri kategorileri ve işleme amaçları</li>
                  <li>Hukuki sebepler, saklama süreleri ve aktarım koşulları</li>
                  <li>Başvuru yöntemleri ve ilgili kişi hakları</li>
                  <li>Çerezler ve üçüncü taraf hizmetleri hakkındaki bilgiler</li>
                </ul>
              </section>
              <section aria-labelledby="privacy-versioning">
                <h2 id="privacy-versioning">Sürüm ve güncelleme bilgisi</h2>
                <p>Üretim metninde yürürlük tarihi, son güncelleme tarihi ve değişikliklerin nasıl duyurulacağı açıkça belirtilecektir.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
