import type {
  HomepageEditorialItem,
  HomepageKnowledgeItem,
} from "@/types/homepage";
import { municipality } from "@/config/municipality";
import { knowledgeArticles } from "@/data/academy";

/** Source-backed summaries for the reusable homepage service section. */
export const municipalContentSlots = [
  {
    number: "01",
    title: "Sahiplendirme",
    description:
      "Tanışma, ziyaret ve sahiplendirme süreci için belediyenin güncel hizmet bilgisini inceleyin.",
    href: municipality.sources.adoption,
  },
  {
    number: "02",
    title: "Veteriner hizmetleri",
    description:
      "Muayene, tedavi ve koruyucu hizmetlerin kapsamına resmî hizmet sayfasından ulaşın.",
    href: municipality.sources.rehabilitation,
  },
  {
    number: "03",
    title: "Doğru iletişim",
    description:
      "Hayvan hizmetlerine ilişkin bilgi ve taleplerinizi Çözüm Merkezi’ne iletin.",
    href: municipality.sources.contact,
  },
] as const satisfies readonly HomepageEditorialItem[];

export const homepageKnowledgeItems: readonly HomepageKnowledgeItem[] = knowledgeArticles.slice(0, 3).map((article) => ({
  title: article.title,
  description: article.description,
  href: `/akademi/${article.slug}`,
}));
