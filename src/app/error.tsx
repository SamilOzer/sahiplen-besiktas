"use client";

import Link from "next/link";

export default function ErrorPage({ retry }: { readonly error: Error & { digest?: string }; readonly retry: () => void }) {
  return (
    <div className="container container--narrow section not-found" role="alert">
      <p className="eyebrow">Geçici bir sorun oluştu</p><h1>Bu sayfayı şu anda gösteremiyoruz.</h1>
      <p>Tekrar deneyebilir veya iletişim kanallarından destek alabilirsiniz. İşlem yapıldı ya da başvuru alındı olarak kabul etmeyin.</p>
      <div className="button-group"><button className="button button--primary" type="button" onClick={retry}>Tekrar dene</button><Link className="button button--secondary" href="/iletisim">İletişime geç</Link></div>
    </div>
  );
}
