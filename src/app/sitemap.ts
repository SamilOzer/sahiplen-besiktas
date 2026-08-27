import type { MetadataRoute } from "next";
import { siteOrigin } from "@/config/site";
import { knowledgeArticles } from "@/data/academy";
import { getAnimals, getLostAnimals } from "@/data/records";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  const paths = [
    "/", "/sahiplendirme", "/kayip-hayvanlar", "/hakkimizda", "/akademi", "/iletisim", "/gizlilik-politikasi",
    ...knowledgeArticles.map((article) => `/akademi/${article.slug}`),
    ...getAnimals().map((animal) => `/sahiplendirme/${animal.slug}`),
    ...getLostAnimals().map((animal) => `/kayip-hayvanlar/${animal.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, siteOrigin).toString() }));
}
