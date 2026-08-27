import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig, siteOrigin } from "@/config/site";
import { bricolageGrotesque, manrope, newsreader } from "@/lib/fonts";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/components.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  robots: siteOrigin ? { index: true, follow: true } : { index: false, follow: false },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  category: "public service",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#790000",
  colorScheme: "light",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${newsreader.variable} ${bricolageGrotesque.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Ana içeriğe geç
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
