import type { KnowledgeArticle } from "@/types/academy";

export const knowledgeArticles: readonly KnowledgeArticle[] = [
  {
    slug: "sahiplenmeden-once",
    title: "Sahiplenmeden önce kendinize sorun.",
    category: "Sahiplenme",
    description: "Zamanınızı, evinizi ve uzun vadeli sorumlulukları birlikte değerlendirmek için bir başlangıç rehberi.",
    updatedAt: "2026-08-27",
    sections: [
      {
        id: "gunluk-yasam", title: "Günlük yaşamınızda yer açın.",
        body: "Sahiplenme kararını yalnızca bir fotoğrafa göre vermeyin. Hayvanın ihtiyacı ile evinizin düzenini birlikte değerlendirin. Günlük ilgi, hareket, oyun ve bakım için ayırabileceğiniz zamanı gerçekçi biçimde düşünün.",
        checklist: ["Evdeki herkes bu sorumluluğa hazır mı?", "İş ve seyahat günlerinde bakımı kim üstlenecek?", "Yaşam alanı hayvanın ihtiyaçlarına uygun ve güvenli mi?"],
      },
      {
        id: "uzun-vade", title: "Sadece ilk günü değil, yılları planlayın.",
        body: "Beslenme, ekipman ve düzenli veteriner takibinin yanında beklenmedik ihtiyaçlar için de bütçe ayırın. Bakımı paylaşacağınız kişilerle görevleri önceden konuşun. Taşınma ya da çalışma düzeni değişikliği gibi durumlarda da sürdürebileceğiniz bir plan kurun.",
      },
      {
        id: "tanisma", title: "Tanışırken soru sorun.",
        body: "Sahiplendirme ekibiyle hayvanın bilinen alışkanlıklarını, geçmişini, sağlık ve eğitim bilgilerini görüşün. Her hayvanın uyumu farklıdır. Bireysel bakım ve sağlık kararlarını veteriner hekimle değerlendirin; bu rehber kişiye özel veteriner önerisi değildir.",
      },
    ],
    sources: [{ title: "RSPCA · Sahiplenme kararına hazırlanmak (İngilizce)", url: "https://www.rspca.org.uk/findapet/advice/getting-a-pet" }],
  },
  {
    slug: "besiktasta-sahiplenme",
    title: "Beşiktaş’ta sahiplenme yolculuğu.",
    category: "Sahiplenme",
    description: "Belediyenin sahiplendirme hizmetine ulaşmak ve bir sonraki adımı öğrenmek için kısa yol haritası.",
    updatedAt: "2026-08-27",
    sections: [
      { id: "bilgi", title: "Önce güncel bilgiyi alın.", body: "Beşiktaş Belediyesi sahiplendirme hizmeti hakkında 444 44 55 üzerinden bilgi alabilirsiniz. Ziyaret edeceğiniz birimi, zamanı ve başvuru için istenen belgeleri gitmeden önce teyit edin." },
      { id: "ziyaret", title: "Tanışmak için ziyaret edin.", body: "Belediyenin resmî hizmet sayfası; rehabilitasyon merkezi, Engelli Kedi Ünitesi ve geçici bakımevindeki hayvanlarla tanışmak için birimlerin ziyaret edilebileceğini belirtiyor. Görüşmede hayvanın ihtiyaçlarını ve sizin yaşam düzeninizi birlikte ele alın." },
      { id: "basvuru", title: "Başvuru adımlarını birimle tamamlayın.", body: "Resmî sayfada, belediyenin verdiği form ile İlçe Tarım Müdürlüğü’ne müracaat edilerek işlemlerin tamamlandığı açıklanıyor. Güncel uygulama ve gerekli belgeler için ilgili birimin yönlendirmesini esas alın. Bu sitedeki bir kaydı incelemek başvuru veya rezervasyon oluşturmaz." },
    ],
    sources: [{ title: "Beşiktaş Belediyesi · Sahiplendirme Hizmetleri", url: "https://besiktas.bel.tr/hizmetler/veteriner-hizmetleri/sahiplendirme_hizmetleri/" }],
  },
  {
    slug: "bulunan-kopek-icin-ilk-adimlar",
    title: "Bir köpek bulduğunuzda ilk adımlar.",
    category: "Kayıp ve bulunanlar",
    description: "Güvenliği koruyarak bilgi toplamak ve doğru iletişim kanalına ulaşmak için kısa rehber.",
    updatedAt: "2026-08-27",
    sections: [
      { id: "guvenlik", title: "Önce güvenli mesafeyi koruyun.", body: "Dışarıda tek başına görülen bir köpek kaybolmuş olabilir. Sakin değilse yaklaşmayın; kovalamayın, köşeye sıkıştırmayın ve zorla yakalamaya çalışmayın. Kendinizin, çevredekilerin ve hayvanın güvenliğini önceliklendirin." },
      { id: "bilgi-toplama", title: "Gözlemlediğiniz bilgileri not edin.", body: "Güvenli biçimde görülebiliyorsa tasma veya künyeyi kontrol edin. Fotoğraf, görüldüğü yer ve saat eşleştirmeye yardımcı olur. Mikroçip kontrolü için bir veteriner hekimden veya belediye biriminden yönlendirme isteyin; yalnızca dış görünüşle sahiplik konusunda kesin sonuca varmayın.", checklist: ["Konum ve görülme zamanı", "Renk, tasma ve ayırt edici özellikler", "Güvenli mesafeden çekilmiş net bir fotoğraf"] },
      { id: "bildirim", title: "Yerel birime bilgi verin.", body: "Beşiktaş’ta belediyenin Çözüm Merkezi ile görüşerek durumu ve konumu aktarabilirsiniz. Sağlık veya müdahale gerektiren durumlarda uzmanın yönlendirmesini izleyin. İnternette açık kimlik bilgileri paylaşmayın." },
    ],
    sources: [
      { title: "RSPCA · Bulunan köpekler için rehber (İngilizce; yerel kurallar farklıdır)", url: "https://www.rspca.org.uk/en/adviceandwelfare/pets/lost/dog" },
      { title: "Beşiktaş Belediyesi · İletişim", url: "https://besiktas.bel.tr/iletisim/" },
    ],
  },
  {
    slug: "mobivet-iletisim",
    title: "MOBİVET’e nasıl ulaşılır?",
    category: "Belediye hizmetleri",
    description: "Acil hayvan ambulansı talebinde doğru kanala ve bilgiye hızlı erişim.",
    updatedAt: "2026-08-27",
    sections: [
      { id: "ulasim", title: "Çözüm Merkezi’ni arayın.", body: "Belediyenin resmî MOBİVET sayfasına göre acil hayvan ambulansı talebi için 444 44 55 aranır. Acil durumlarda 2 tuşlanarak destek istenir. Diğer talepler Çözüm Merkezi üzerinden iletilebilir." },
      { id: "hazirlik", title: "Konumu açık anlatın.", body: "Mahalle, sokak ve yakın bir işaret noktası ile hayvanın gözlemlediğiniz durumunu aktarın. Arama sırasında görevlinin sorularını yanıtlayın ve yönlendirmesini izleyin. Teşhis koymaya veya müdahale yöntemini kendiniz belirlemeye çalışmayın." },
      { id: "kanal", title: "Acil durumda yazışmayı beklemeyin.", body: "E-posta taslağı veya internet üzerinden bilgi arama, acil çağrının yerine geçmez. Bu sitedeki iletişim aracı ambulans sevk etmez ve talebe müdahale süresi taahhüt etmez." },
    ],
    sources: [{ title: "Beşiktaş Belediyesi · MOBİVET", url: "https://besiktas.bel.tr/projeler/mobivet/" }],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}

export function searchKnowledge(query = "", category = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  return knowledgeArticles.filter((article) =>
    (!category || article.category === category) &&
    (!normalizedQuery || `${article.title} ${article.description} ${article.sections.map((section) => `${section.title} ${section.body}`).join(" ")}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery)),
  );
}
