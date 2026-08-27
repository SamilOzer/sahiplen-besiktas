import type { Metadata } from "next";

import { ContactComposer } from "@/components/contact/ContactComposer";
import { PageHeader } from "@/components/ui/PageHeader";
import { municipality } from "@/config/municipality";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "İletişim",
  "Beşiktaş Belediyesi Çözüm Merkezi, hayvan hizmetleri ve yazılı iletişim kanallarına ulaşın.",
  "/iletisim",
);

export default function ContactPage() {
  return (
    <div className="page page--contact">
      <div className="container section">
        <PageHeader
          eyebrow="İletişim"
          title="Doğru konu, doğru kanal, açık bir sonraki adım."
          description="Sahiplendirme, kayıp veya bulunan hayvan bildirimi ve diğer hizmet talepleri için belediyenin iletişim kanallarına doğrudan ulaşın."
          context="İletişim / Hizmet yönlendirmesi"
        />

        <div className="contact-stage">
          <section className="contact-panel" aria-labelledby="contact-channels-title">
            <div className="contact-panel__intro">
              <p className="eyebrow">İletişim kanalları</p>
              <h2 id="contact-channels-title">Bir telefonla doğru birime ulaşın.</h2>
              <p>Hayvan hizmetleri hakkında bilgi ve talepleriniz için Çözüm Merkezi ile görüşün. Acil hayvan ambulansı için 2’yi tuşlayarak MOBİVET desteği isteyebilirsiniz.</p>
            </div>
            <address className="contact-list">
              <div><span>Çözüm Merkezi</span><a href={municipality.phoneHref}>{municipality.phone}</a></div>
              <div><span>Belediye genel talep e-postası</span><a href={`mailto:${municipality.email}`}>{municipality.email}</a></div>
              <div><span>Levent Hizmet Binası · Belediye genel adresi</span><strong>{municipality.address}</strong></div>
            </address>
            <div className="contact-context" aria-hidden="true">
              <span>01 Sahiplendirme</span>
              <span>02 Kayıp hayvan</span>
              <span>03 Diğer hizmetler</span>
            </div>
          </section>

          <ContactComposer />
        </div>

        <section className="service-callout" aria-labelledby="urgent-contact-title">
          <div><p className="eyebrow">Acil durumda</p><h2 id="urgent-contact-title">Yazılı yanıtı beklemeyin.</h2>
            <p>MOBİVET için Çözüm Merkezi’ni arayın; hayvanın konumunu ve gözlemlediğiniz durumu aktarın. Yazılı iletişim acil müdahale kanalı değildir.</p></div>
          <a className="button button--primary" href={municipality.phoneHref}>{municipality.phone} · Ara</a>
        </section>
        <p className="source-note">Kaynaklar: <a href={municipality.sources.contact}>Belediye iletişim bilgileri</a> ve <a href={municipality.sources.ambulance}>MOBİVET</a>. Kontrol: 27 Ağustos 2026. Ziyaret öncesinde ilgili birimi arayarak güncel bilgiyi teyit edin.</p>
      </div>
    </div>
  );
}
