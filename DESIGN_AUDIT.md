# Tasarım Denetimi

## Kapsam

Bu denetim; ana sayfanın sekiz bölümü, iç sayfalar, tipografi, tasarım tokenları, ızgara, header/footer, kartlar, filtreler, responsive kurallar ve GSAP hareket katmanı incelenerek hazırlanmıştır. Referans siteler yüzeysel stil için değil; kompozisyon, odak, ritim ve etkileşim disiplinlerini anlamak için değerlendirilmiştir.

## A. Mevcut durumda yanlış olanlar

### 1. Kompozisyon ve ana sayfa ritmi

- Hero, mobilde önce büyük görsel sonra büyük metin olacak şekilde iki ayrı blok gibi davranıyor; masaüstünde ise metin ve görsel aynı sahneye ait görünse de başlık ölçeği kompozisyonu sıkıştırıyor.
- Birçok bölüm `min-height`, çok büyük başlık ve çok uzun görsel kullanıyor. Bu nedenle sayfa tek bir editoryal akıştan çok art arda dizilmiş bağımsız landing-page blokları gibi algılanıyor.
- Görsel rolleri ayrışmıyor. Hero, bağ, kayıp ve final görselleri farklı içerik görevleri üstlense de benzer büyük dikdörtgenler ve benzer kaplama mantığıyla kullanılıyor.
- Bölüm numaraları, eyebrow çizgileri ve büyük başlıklar sürekli tekrar ediyor; tekrar süreklilik kurmak yerine kalıba dönüşüyor.

### 2. Tipografi

- Bricolage Grotesque; çok dar varyasyon, agresif negatif harf aralığı ve çok büyük ölçülerle birlikte Türkçe başlıklarda sıkışma ve görsel çarpışma yaratıyor.
- `--text-display` 10rem'e, ana sayfa başlıkları 8.75rem'e kadar çıkıyor. Premium etki kompozisyon yerine ölçek üzerinden kurulmaya çalışılıyor.
- Header kimliği, display font ve sıkı harf aralığı nedeniyle küçük ölçüde bile gereğinden fazla karakterli; navigasyon ile rekabet ediyor.
- Başlık, gövde ve UI ölçekleri arasında daha kontrollü bir ara kademe yok; büyük display’den doğrudan standart gövde metnine geçiliyor.

### 3. Izgara ve boşluk

- 12 kolon yalnızca bazı ana sayfa alanlarında yerel olarak kullanılıyor. İç sayfalarda gerçek bir ortak grid sistemi yok.
- Bölümlerin çoğu 50/50 veya tek geniş kolon düzenine yaslanıyor; asimetrik span ve offset dili yeterince kullanılmıyor.
- Dikey boşluk tokenları düzenli olsa da uygulamada sürekli en büyük değerlerin kullanılması içerik yoğunluğunu düşürüyor.

### 4. Header ve footer

- Header’daki iki renkli sinyal, üst pembe çizgi, kalın CTA ve aktif alt çizgi aynı anda dikkat istiyor.
- Marka metni ve navigasyonun ağırlığı birbirine yakın; sakin, kurumsal bir hiyerarşi oluşmuyor.
- Footer işlevsel ancak büyük bordo yüzey ve üç eşit bilgi bloğu nedeniyle ana sayfanın daha rafine editoryal diline bağlanmıyor.

### 5. Kataloglar ve filtreler

- Sahiplendirme masaüstünde iki kolonla sınırlı; yüzlerce kayıt için tarama yoğunluğu yetersiz.
- `AnimalCard` typed görsel verisini kullanmıyor ve gerçek fotoğraf yerine dekoratif placeholder gösteriyor.
- Kartlar büyük gölge, uzun detay listesi ve tam genişlikte pasif butonla ürün kartı hissine yaklaşıyor.
- Kayıp hayvan kartları masaüstünde geniş yatay iki kolonlu bloklar; hızlı tarama için gereken 3–4 kolon yoğunluğunu sağlamıyor.
- Filtre paneli gölge, kalın üst çizgi, büyük iç boşluk ve ayrı başlık alanıyla sonuçlardan fazla dikkat çekiyor.

### 6. İç sayfalar

- Hakkımızda ve Gizlilik sayfaları büyük ölçüde `başlık → paragraf → başlık → paragraf` akışında.
- Akademi altı eşit karttan oluşuyor; öne çıkan içerik, kategori gezinmesi ve editoryal yayın hiyerarşisi yok.
- İletişim erişilebilir ve açık olsa da standart iki kolonlu form paneli gibi görünüyor; hizmet bağlamı ve görsel odak zayıf.
- Ortak `PageHeader` her sayfada aynı geniş, tek kolonlu başlangıcı üretiyor; sayfa türleri arasında karakter farkı oluşmuyor.

### 7. Hareket

- Hareket katmanı progressive enhancement ve reduced-motion açısından doğru kurulmuş.
- Buna karşın hareket, zaten fazla büyük olan görselleri parallax/scale ile daha baskın hale getiriyor. Kompozisyonu düzeltmeden animasyon eklemek yapısal sorunu büyütüyor.

## B. Neden yanlış

- Referanslardaki büyük görseller, belirli bir odak noktasına, grid rayına ve kontrollü negatif alana bağlı. Mevcut uygulamada büyüklük çoğu zaman tek başına vurgu aracı.
- Premium algı; yalnızca ölçekten değil, ölçülü tipografik kontrast, hassas crop, bilgi yoğunluğu değişimi, tekrar eden hizalama ankrajları ve net etkileşim önceliğinden doğar.
- Belediye hizmeti güvenilir görünmek için sakin ve okunaklı olmalı; çok sayıda rekabet eden marka işareti ve büyük CTA bu güveni zayıflatıyor.
- Katalogların gerçek ürün ölçeği yüzlerce kayıt. İki kolonlu, uzun kart yapısı hem tarama süresini hem sayfa uzunluğunu gereksiz artırır.
- İç sayfaların yalnızca metin bloklarından oluşması, ana sayfadaki deneyim ile işlevsel sayfalar arasında marka kopukluğu yaratır.

## C. Gerekli yapısal değişiklikler

### Görsel sistem

- Masaüstünde 12, tablette 8, mobilde 4 kolon mantığını paylaşan gerçek bir editoryal grid kurulacak.
- Display font; Türkçe desteği güçlü, editoryal bir serif ile değiştirilecek. Manrope gövde ve UI için korunacak.
- Display ölçeği düşürülecek; tasarlanmış satır kırımları, ölçülü max-width ve daha rahat satır yüksekliği kullanılacak.
- Hero header hariç yaklaşık tek viewport içinde tamamlanan 5/7 veya 4/8 kompozisyona dönüşecek.
- Görseller hero portresi, editoryal yatay/kare, katalog 4:5, kayıp 4:3 ve küçük belgesel görsel rollerine ayrılacak.
- Nötr alan ana zemin olacak; pembe yalnızca yüksek etkili vurgu, bordo kurumsal derinlik, turkuaz bilgi durumu, krem editoryal yüzey olarak kullanılacak.

### Bileşenler

- Header sıfırdan daha kompakt ve sessiz bir kurumsal çerçeve olarak düzenlenecek.
- Ortak `PageHeader`, asimetrik bir `PageIntro` davranışına evrilecek; sayfalar kendi içerik tiplerine göre farklı devam modülleri kullanacak.
- Sahiplendirme arşivi ≥1200px’te dört, orta masaüstünde üç, tablette iki, küçük mobilde bir kolona geçecek.
- Hayvan kartları fotoğraf, ad, temel kimlik, kısa karakter ve durum bilgisine indirgenecek; gölge ve büyük pasif CTA kaldırılacak.
- Kayıp kartları daha kompakt 3–4 kolon tarama kartlarına dönüşecek.
- Filtreler sonuçların önünde duran büyük panel yerine kompakt bir araç çubuğu olacak.
- Hakkımızda; açılış bildirisi, görsel anlatı, hizmet ilkeleri, süreç ve CTA modülleri alacak.
- Akademi; öne çıkan yayın, kategori rayı ve ikincil yayın gridine ayrılacak.
- İletişim; kurum/hizmet bağlamı, erişim kanalları, form ve bağlamsal görsel modülle art-directed bir düzen kazanacak.
- Gizlilik; deneysel modül eklenmeden yeni tipografi, grid ve içerik genişliğini kullanacak.

### Hareket

- GSAP yalnızca masaüstünde kısa hero reveal, seçili image reveal ve hafif crop hareketi için kalacak.
- İçerik ve görseller animasyon olmadan eksiksiz görünecek; reduced-motion ve mobil varsayılanı statik olacak.

## D. Korunması gerekenler

- Next.js App Router, strict TypeScript ve mevcut route yapısı.
- Typed hayvan/kayıp hayvan modelleri ve UI’dan ayrılmış mock veri katmanı.
- URL tabanlı filtreleme, temizleme bağlantıları ve boş sonuç durumları.
- Demo içeriklerin açıkça işaretlenmesi; sahte belediye, iletişim, istatistik veya hayvan bilgisi üretilmemesi.
- Semantik HTML, heading sırası, klavye navigasyonu, skip link, görünür focus ve `prefers-reduced-motion` desteği.
- Next Image, SEO metadata ve mevcut performans odaklı lazy/dynamic yaklaşım.
- Dört resmî kurumsal rengin değişmeyen değerleri: `#FF2C55`, `#790000`, `#00BECE`, `#F3EED9`.
- Mevcut rota geçişinde ana içeriğe focus taşıma davranışı.

## Referanslardan çıkarılan sistem kuralları

- **Voldog:** Tek baskın özne, güçlü tipografik arka plan ve çevreye dağıtılmış az sayıda kontrol aynı sahneye bağlanıyor. Kopyalanacak yüzey değil; tek odak ve kenar ankrajı disiplini.
- **Igloo:** Monokrom görsel alan, derinliği renk kalabalığı yerine ışık, doku ve boşlukla kuruyor. Bizde WebGL değil; kontrollü ton ve tek odak yaklaşımı kullanılacak.
- **Don’t Board Me:** Bir ekran, tek mesaj ve tek amaç. Etkileşim dikkat çekiyor çünkü geri kalan her şey sessiz. Zorunlu oyunlaştırma kopyalanmayacak.
- **Phopet:** Görsel çeşitlilik güçlü bir galeri ritmi üretiyor; ancak doygun renk, maskot ve satış katmanları kamusal hizmet için uygun değil. Biz yalnızca değişen crop/ölçek ritmini alacağız.
- **Benpetto:** Amaç 3–5 saniyede anlaşılır; metin, ürün ekranı ve hayvan kümesi tek hikâyede birleşir. Mor gradient, uygulama vitrini ve kalabalık hayvan kolajı kopyalanmayacak.

