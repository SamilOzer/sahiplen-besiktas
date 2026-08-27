import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { municipality } from "@/config/municipality";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Gizlilik politikası",
  "Site kullanımı, arama bilgileri, cihazda saklanan tercihler ve resmî kişisel veri başvuru kanalları hakkında bilgi.",
  "/gizlilik-politikasi",
);

export default function PrivacyPolicyPage() {
  return (
    <div className="page page--legal legal-page">
      <div className="container section">
        <PageHeader
          eyebrow="Yasal bilgilendirme"
          title="Gizlilik politikası"
          description="Bu sitedeki veri akışını, cihazınızda saklanan tercihleri ve resmî kişisel veri bilgilendirmesine nasıl ulaşacağınızı öğrenin."
          context="Gizlilik / Veri kullanımı"
        />

        <div className="legal-layout">
          <aside className="legal-status" aria-label="İçerik bilgisi">
            <span>Son güncelleme</span>
            <strong><time dateTime="2026-08-27">27 Ağustos 2026</time></strong>
            <p>Bu açıklama sitenin mevcut kullanım biçimini anlatır. Belediyenin resmî aydınlatma metnine aşağıdan ulaşabilirsiniz.</p>
          </aside>

          <div className="legal-content">
            <div className="prose">
              <section aria-labelledby="privacy-status">
                <h2 id="privacy-status">Siteyi kullanırken</h2>
                <p>Bu sitede hesap açma, ödeme veya doğrudan ilan gönderme işlemi yoktur. Sayfa ve görsel istekleri barındırma ortamı tarafından işlenir; IP adresi, istek zamanı ve teknik hata bilgileri sunucu günlüklerinde yer alabilir. Nihai barındırma ortamına ilişkin koşullar ayrıca değerlendirilmelidir.</p>
              </section>
              <section aria-labelledby="privacy-requirements">
                <h2 id="privacy-requirements">Arama ve filtreler</h2>
                <p>Arama kelimeleri ve filtreler sayfa adresinde yer alır; sayfanın sunucuya iletilmesi ve tarayıcı geçmişi kapsamında işlenebilir. Paylaştığınız bağlantıyı açan kişiler bu alanları görebilir. Arama kutularına kimlik numarası, özel iletişim bilgisi veya başka hassas bilgi yazmayın.</p>
              </section>
              <section aria-labelledby="privacy-contact">
                <h2 id="privacy-contact">İletişim taslağı</h2>
                <p>İletişim aracına yazılan ad, e-posta ve mesaj bilgisi tarayıcınızda bir e-posta taslağı hazırlamak için kullanılır. Bu alanlar uygulamanın sunucusuna gönderilmez veya burada saklanmaz. E-posta bağlantısını açıp mesajı gönderdiğinizde e-posta sağlayıcınızın ve alıcı kurumun veri işleme koşulları geçerlidir. “Metni kopyala” işlemi seçtiğinizde taslak cihazınızın panosuna aktarılır.</p>
              </section>
              <section aria-labelledby="privacy-device">
                <h2 id="privacy-device">Cihazda saklanan tercihler</h2>
                <p>Favoriye aldığınız hayvanların kayıt numaraları, tercihlerinizi aynı tarayıcıda korumak için cihazınızın yerel depolama alanında tutulur. Bu işlev için adınız veya e-posta adresiniz istenmez. Tarayıcınızdan bu siteye ait verileri temizleyerek favorilerinizi silebilirsiniz. Yerel depolama kapalıysa seçimler kalıcı olmayabilir.</p>
                <p>Uygulama kodunda reklam veya üçüncü taraf ziyaretçi analitiği kurulmamıştır. Dış bağlantılara tıkladığınızda ilgili sitenin koşulları uygulanır. Resmî kurum sayfaları ve kaynak bağlantıları uygulamaya gömülü izleyici olarak yüklenmez.</p>
              </section>
              <section aria-labelledby="privacy-versioning">
                <h2 id="privacy-versioning">Resmî aydınlatma ve başvuru</h2>
                <p>Beşiktaş Belediyesi’nin veri sorumlusu bilgileri, kişisel veri işleme açıklamaları ve ilgili kişi başvuru yöntemleri için <a href={municipality.sources.privacy}>resmî KVKK aydınlatma metnini</a> esas alın. Bu sayfa, kurumun resmî metninin yerine geçmez.</p>
                <p>İletişim bilgilerine <a href={municipality.sources.contact}>belediyenin resmî iletişim sayfasından</a> ulaşabilirsiniz. Yeni bir veri toplama veya entegrasyon işlevi devreye alındığında bu açıklama da güncellenmelidir.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
