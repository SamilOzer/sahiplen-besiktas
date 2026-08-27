# Beşiktaş Hayvan Hizmetleri

Next.js App Router, React ve strict TypeScript ile geliştirilmiş belediye hayvan hizmetleri arayüzü.

## Çalıştırma

Node.js 22.18+ veya 24 LTS kullanın. Bağımlılıklar `package-lock.json` ile sabitlenir.

```sh
npm ci
npm run dev
```

Yerel adres: http://localhost:3000

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Çalışan yerel sunucuyu salt okunur HTTP testleriyle kontrol etmek için `npm run test:routes` komutunu kullanın. Varsayılan hedef `http://localhost:3000`; farklı yerel port için `TEST_BASE_URL` verilebilir. Bu testler gerçek tarayıcı etkileşimi veya görsel cihaz testi yerine geçmez.

## Sayfalar

Ana sayfa, Yuva Ol, Kayıp Can Dostlarımız, Hakkımızda, Akademi, İletişim ve Gizlilik sayfaları bulunur. Akademi rehberleri `/akademi/[slug]`, onaylı hayvan kayıtları `/sahiplendirme/[slug]`, kayıp/bulunan ilanları `/kayip-hayvanlar/[slug]` adreslerinden açılır. Bilinmeyen kayıtlar 404 döndürür.

## İçerik ve kayıt yayını

- Resmî iletişim kanalları ve kaynaklar: `src/config/municipality.ts`.
- Kaynaklı rehberler: `src/data/academy.ts`.
- Kamuya açık kayıtlar: `src/data/published-records.ts`.
- Filtreleme ve kayıt erişimi: `src/data/records.ts`, `src/lib/animal-filters.ts`.
- Geliştirme örnekleri: `src/data/mock/`. Bunlar yayına alınmaz ve ziyaretçi sayfaları tarafından içe aktarılmaz.

Gerçek kayıt sağlanmadığı için kamuya açık listeler şu anda boştur. Bu, belediyede hayvan veya kayıp bildirimi bulunmadığı anlamına gelmez. Arayüz bu ayrımı belirtir ve gerçek iletişim kanallarına yönlendirir.

Yeni kayıt; tipe uygun alanlar, benzersiz kimlik/slug, `isDemo: false` ve `publication: { sourceReference, verifiedAt }` içermelidir. `verifiedAt`, `YYYY-MM-DD` biçiminde olmalıdır. Yayın izni, güncellik, fotoğraf kullanım hakkı ve kaynak kurum tarafından doğrulanmadan kayıt eklemeyin. Kayıt metinlerinde kişisel iletişim bilgilerini veya iç onay belgelerini yayımlamayın. Onay referansı yalnızca veri katmanında tutulur.

## İletişim davranışı

İletişim aracı alanları doğrular, kullanıcıya e-posta taslağını gösterir ve kendi e-posta uygulamasında açmasını sağlar. Site e-posta göndermez, mesajı sunucuya kaydetmez, başvuru/rezervasyon oluşturmaz. Kullanıcı gönderimi kendi uygulamasından tamamlar. Sunucudan gönderim için kurumun onayladığı alıcı, servis ve erişim bilgileri ayrıca gereklidir.

Favoriler yalnızca cihazın tarayıcısında kayıt kimlikleri olarak saklanır; hesap veya cihazlar arası senkronizasyon yoktur.

## Yayına almadan önce

1. Kurumun onaylı hayvan/ilan verisini ve görsel kullanım izinlerini sağlayın.
2. Gerçek alan adını `SITE_URL` ortam değişkenine HTTPS origin olarak girip yeniden build alın. Değer boş/geçersizken robots ve sayfa metadatası indekslemeyi kapatır; sitemap boş kalır.
3. Barındırma, erişim logları ve kurumun veri işleme süreçleri doğrultusunda gizlilik açıklamasını yetkili kişiye inceletin. Mevcut sayfa uygulamanın teknik davranışını anlatır, kurumun resmî KVKK metni yerine geçmez.
4. Mevcut görsel/video varlıklarının yayın lisanslarını `ASSETS.md` ile birlikte teyit edin.
5. İletişim kanallarını ve hizmet bilgilerini resmî kaynaklardan yeniden kontrol edin.

Bu çalışma dış ortama otomatik yayın yapmaz; veri tabanı, kullanıcı girişi, yönetim paneli veya başvuru takip sistemi içermez.
