import type {
  HomepageEditorialItem,
  HomepageKnowledgeItem,
} from "@/types/homepage";

/**
 * These are content-architecture slots, not claims about current municipal
 * operations. Approved institutional copy can replace them without changing
 * the homepage layout.
 */
export const municipalContentSlots = [
  {
    number: "01",
    title: "Hizmet kapsamı",
    description:
      "Onaylı hayvan hizmetleri ve ilgili birim bilgileri bu alanda yayımlanacaktır.",
    status: "Kurum onayı bekleniyor",
  },
  {
    number: "02",
    title: "Çalışma yaklaşımı",
    description:
      "Doğrulanmış süreç ve kamusal değer anlatısı kurum içeriği sağlandığında eklenecektir.",
    status: "Kurum onayı bekleniyor",
  },
  {
    number: "03",
    title: "Şeffaf bilgi",
    description:
      "Kaynaklı veriler ve güncel hizmet yönlendirmeleri hazır olduğunda burada sunulacaktır.",
    status: "Kaynaklı veri bekleniyor",
  },
] as const satisfies readonly HomepageEditorialItem[];

export const homepageKnowledgeItems = [
  {
    title: "Sahiplenme rehberi",
    description:
      "Sahiplenme öncesi hazırlık ve sorumluluklar için onaylı içerik alanı.",
  },
  {
    title: "Kayıp hayvan rehberi",
    description:
      "Kayıp önleme ve kayıp durumunda izlenecek adımlar için içerik alanı.",
  },
  {
    title: "Bakım ve birlikte yaşam",
    description:
      "Günlük bakım ve sorumlu birlikte yaşam konuları için uzman onaylı alan.",
  },
] as const satisfies readonly HomepageKnowledgeItem[];
