import type { Metadata } from "next";
import { siteConfig, siteOrigin } from "@/config/site";

export function createPageMetadata(title: string, description: string, path?: string): Metadata {
  const url = siteOrigin && path ? new URL(path, siteOrigin).toString() : undefined;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: siteOrigin ? undefined : { index: false, follow: false },
    openGraph: {
      title,
      description,
      locale: "tr_TR",
      type: "website",
      siteName: siteConfig.shortName,
      url,
      images: siteOrigin ? [{ url: `${siteOrigin}/assets/animals/human-dog-bond.webp`, alt: "İnsan ve hayvan arasındaki bağı anlatan temsilî fotoğraf" }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
