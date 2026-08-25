import type { Metadata } from "next";

import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "İletişim",
  "Beşiktaş Belediyesi hayvan hizmetleri için onaylı iletişim kanallarının sunulacağı iletişim sayfası.",
);

export default function ContactPage() {
  return (
    <div className="page page--contact">
      <div className="container section">
        <PageHeader
          eyebrow="İletişim"
          title="Doğru konu, doğru kanal, açık bir sonraki adım."
          description="Onaylı telefon, e-posta ve konum bilgileri kurum tarafından sağlandığında doğrudan erişilebilir biçimde burada yayımlanacaktır."
          context="İletişim / Hizmet yönlendirmesi"
        />

        <div className="contact-stage">
          <section className="contact-panel" aria-labelledby="contact-channels-title">
            <div className="contact-panel__intro">
              <p className="eyebrow">İletişim kanalları</p>
              <h2 id="contact-channels-title">Yardım istediğiniz konuyu açıkça yönlendireceğiz.</h2>
              <p>Temel kanallar doğrulandıktan sonra tek dokunuşla aranabilir ve erişilebilir olacaktır.</p>
            </div>
            <address className="contact-list">
              <div><span>Telefon</span><strong>Onaylı bilgi bekleniyor</strong></div>
              <div><span>E-posta</span><strong>Onaylı bilgi bekleniyor</strong></div>
              <div><span>Konum</span><strong>Onaylı bilgi bekleniyor</strong></div>
            </address>
            <div className="contact-context" aria-hidden="true">
              <span>01 Sahiplendirme</span>
              <span>02 Kayıp hayvan</span>
              <span>03 Diğer hizmetler</span>
            </div>
          </section>

          <section className="contact-form-panel" aria-labelledby="contact-form-title">
            <p className="article-kicker">Form altyapısı · Demo</p>
            <h2 id="contact-form-title">Mesajınızı hazırlayın</h2>
            <p id="contact-form-help" className="form-helper">
              Bu form yalnızca alan ve erişilebilirlik yapısını gösterir; veri göndermez.
            </p>
            <form className="contact-form" aria-describedby="contact-form-help">
              <div className="form-field">
                <label htmlFor="full-name">Ad soyad</label>
                <input id="full-name" name="fullName" type="text" autoComplete="name" />
              </div>
              <div className="form-field">
                <label htmlFor="email">E-posta</label>
                <input id="email" name="email" type="email" autoComplete="email" />
              </div>
              <div className="form-field">
                <label htmlFor="subject">Konu</label>
                <select id="subject" name="subject" defaultValue="">
                  <option value="" disabled>Konu seçin</option>
                  <option value="adoption">Sahiplendirme</option>
                  <option value="lost-animal">Kayıp hayvan</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              <div className="form-field form-field--message">
                <label htmlFor="message">Mesaj</label>
                <textarea id="message" name="message" rows={6} />
              </div>
              <button className="button button--primary" type="submit" disabled>
                Gönderim entegrasyonu bekleniyor
              </button>
            </form>
          </section>
        </div>

        <Notice title="İçerik ve entegrasyon onayı gerekli">
          <p>
            İletişim bilgileri, form alıcısı, kişisel veri metni ve gönderim iş akışı kurum tarafından doğrulanmadan etkinleştirilmeyecektir.
          </p>
        </Notice>
      </div>
    </div>
  );
}
