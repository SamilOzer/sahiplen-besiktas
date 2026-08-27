export const siteConfig = {
  name: "Beşiktaş Belediyesi Hayvan Sağlığı ve Sahiplendirme",
  shortName: "Hayvan Sağlığı ve Sahiplendirme",
  description:
    "Hayvan sahiplendirme, kayıp hayvan ilanları ve Beşiktaş Belediyesi hayvan hizmetleri için dijital bilgi ve yönlendirme platformu.",
} as const;

/** Canonical origin is deliberately unset until the owner provides a deployment URL. */
function configuredOrigin(): string | undefined {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export const siteOrigin = configuredOrigin();
