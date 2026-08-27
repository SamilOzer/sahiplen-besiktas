import Link from "next/link";

import { legalNavigation, primaryNavigation } from "@/config/navigation";
import { municipality } from "@/config/municipality";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__identity">
          <span className="site-footer__monogram" aria-hidden="true">B</span>
          <div>
            <p className="site-footer__institution">Beşiktaş Belediyesi</p>
            <p>Hayvan Sağlığı ve Sahiplendirme dijital hizmet platformu</p>
          </div>
        </div>

        <nav aria-label="Alt bilgi navigasyonu">
          <p className="site-footer__heading">Sayfalar</p>
          <ul className="site-footer__links">
            {primaryNavigation.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="site-footer__heading">Bilgilendirme</p>
          <ul className="site-footer__links">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <p className="site-footer__note">
            Çözüm Merkezi: <a href={municipality.phoneHref}>{municipality.phone}</a>
            <br />
            <a href={municipality.sources.contact}>Resmî iletişim kanalları</a>
          </p>
        </div>
      </div>

      <div className="container site-footer__base">
        <p>© {new Date().getFullYear()} Beşiktaş Belediyesi</p>
        <p>Hayvan Sağlığı ve Sahiplendirme dijital hizmeti</p>
      </div>
    </footer>
  );
}
