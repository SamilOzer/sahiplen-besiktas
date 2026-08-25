# Tasarım Sistemi

## 1. Yön

Platformun görsel dili şu kesişimde konumlanır:

- premium editoryal yayın
- çağdaş hayvan markası duyarlılığı
- dijital art direction
- kamusal hizmet güvenilirliği

Premium etki büyüklükten değil; grid disiplini, tipografik kontrast, kontrollü crop, içerik yoğunluğu ve sakin etkileşimlerden doğar.

## 2. Renk sistemi

Dört resmî değer değiştirilemez:

| Token | Değer | Rol |
| --- | --- | --- |
| `--color-brand-primary` | `#FF2C55` | Yüksek etkili vurgu, aktif çizgi, seçim ve kritik marka anı |
| `--color-brand-dark` | `#790000` | Kurumsal derinlik, birincil aksiyon, seçili koyu yüzey |
| `--color-brand-accent` | `#00BECE` | Bilgi durumu, focus iç halkası, yardımcı vurgu |
| `--color-brand-warm` | `#F3EED9` | Editoryal yüzey, demo etiketi, sıcak geçiş |

Ana yüzeyler nötr `--color-canvas`, `--color-paper` ve `--color-paper-muted` tokenlarıdır. Pembe zemin rengi olarak tekrarlanmaz. Bordo yalnızca belirli kurumsal veya aksiyon alanlarında geniş yüzey olabilir. Turkuaz uzun gövde metni için kullanılmaz.

## 3. Tipografi

### Display

- Font: Newsreader Variable
- Rol: hero, sayfa başlığı, editoryal bölüm başlığı
- Ağırlık: çoğunlukla 560
- Optik boyut: tarayıcı tarafından otomatik
- Harf aralığı: `-0.035em` civarı; agresif sıkıştırma yapılmaz

### Body ve UI

- Font: Manrope Variable
- Body: 400
- UI/label: 560–740
- Form, navigasyon, metadata ve durum etiketlerinde Manrope kullanılır.

### Ölçek

| Token | Kullanım |
| --- | --- |
| `--text-display-xl` | Yalnızca özel hero/display anları |
| `--text-display-l` | Sayfa ve güçlü bölüm başlıkları |
| `--text-display-m` | İkincil bölüm başlıkları |
| `--text-heading` | Kart ve modül başlıkları |
| `--text-body-l` | Lead/açıklama metni |
| `--text-base` | Gövde |
| `--text-sm` | Yardımcı metin |
| `--text-xs`, `--text-micro` | Metadata ve label |

Başlıklar mobilde maksimum 3–4, masaüstünde çoğunlukla 2–3 satırda tutulur. Metin ile görsel çakıştırılmaz.

## 4. Grid

- Masaüstü (`>=1024px`): 12 kolon
- Tablet (`768–1023px`): 8 kolon
- Mobil (`<768px`): 4 kolon
- Maksimum içerik genişliği: `86rem`
- Kolon aralığı: `--grid-gap`
- Sayfa kenarı: `--container-gutter`

Tercih edilen masaüstü span kalıpları: 7/5, 8/4, 5/7, 9/3, 4/8. Her bölüm 50/50 kullanılmaz. Aynı grid raylarına bağlanan farklı modül genişlikleri süreklilik sağlar.

## 5. Spacing

Temel birim 4px’tir. Tokenlar `--space-1`–`--space-10` aralığındadır.

- Kontrol içi boşluk: 8–16px
- Kart içerik boşluğu: 16–24px
- Modül arası: 24–48px
- Bölüm arası: responsive 64–112px

En büyük boşluk tokenı her bölümde kullanılmaz. Yoğunluk akışı bilinçli değişir.

## 6. Görsel rolleri ve oranlar

| Rol | Temel oran/davranış |
| --- | --- |
| Hero portresi | Dikey veya 5:6; tek baskın özne, belirgin focal point |
| Editoryal feature | 4:3 veya geniş serbest crop |
| İkincil destek görseli | 3:2 ya da dar yatay |
| Sahiplendirme thumbnail | 4:5 |
| Kayıp ilanı thumbnail | 4:3 |
| Küçük belgesel görsel | Kompakt 1:1 / 4:3 |
| Detay galerisi | Gelecekte 4:5 ana portre + destek oranları |

Her `fill` görselinin parent’ı ölçülüdür ve `sizes` tanımlıdır. Hero görseli LCP için priority; diğerleri lazy varsayılanındadır. Fotoğraflar gerçek kayda bağlı değilse figcaption/demo etiketiyle belirtilir.

## 7. Kart sistemi

### Sahiplendirme kartı

- 4:5 fotoğraf
- isim, tür, yaş, cinsiyet, durum, kısa karakter özeti
- üretim verisi yoksa açık demo etiketi
- gölge yok; ince alt ayırıcı
- büyük buton yok; detay rotası gelene kadar pasif küçük durum metni
- grid: 4 / 3 / 2 / 1 responsive yoğunluk

### Kayıp hayvan kartı

- 4:3 fotoğraf
- belirgin ama alarmist olmayan durum etiketi
- ad, tür, cinsiyet, tarih, konum, ayırt edici özellik
- masaüstünde 4; orta masaüstünde 3; tablette 2; mobilde 1 kolon

### Yayın kartı

- metin öncelikli
- kategori, sıra, başlık, kısa açıklama, yayın durumu
- eşit SaaS kutuları yerine featured + secondary hiyerarşi

## 8. Butonlar ve linkler

- Köşe yarıçapı yoktur.
- Minimum hedef yüksekliği yaklaşık 46px’tir.
- Primary: bordo zemin, beyaz metin.
- Secondary: şeffaf zemin, güçlü nötr border.
- Text: sade metin, pembe alt çizgi.
- Yönlendirici aksiyonlarda `↗` göstergesi metne eşlik eder.
- Disabled durum yalnızca renk ile değil, metin ve `disabled`/`aria-disabled` ile belirtilir.

## 9. Navigasyon

- Header yüksekliği 68–72px.
- Marka işareti kompakt monogram + iki satır kurumsal kimliktir.
- Masaüstü navigasyonu küçük, sakin ve aktif pembe çizgiyle işaretlidir.
- Sahiplendirme linki dev CTA değildir; yalnızca ince bir ayırıcıyla öncelik kazanır.
- Mobil menü klavye ile açılır/kapanır, Escape ile kapanır ve route değişiminde ana içeriğe focus taşınır.

## 10. Sayfa girişleri ve section label

`PageHeader` üç parçadan oluşur:

1. bağlam rayı
2. eyebrow + editoryal başlık
3. kısa açıklama

Masaüstünde başlık 8, açıklama 4 kolon kullanır. İç sayfaların devam düzeni içerik türüne göre değişir; PageHeader bütün sayfaları aynı template’e zorlamaz.

Eyebrow; pembe kısa çizgi + uppercase küçük label’dır. Yalnızca bölüm yönlendirmesi için kullanılır, dekoratif olarak çoğaltılmaz.

## 11. Formlar ve filtreler

- Input/select yüksekliği yaklaşık 46px.
- Label her zaman görünürdür; placeholder label yerine geçmez.
- Focus, turkuaz iç ve bordo dış halkayla yüksek görünürlüktedir.
- Filtre paneli gölgesiz, ince üst/alt çizgili kompakt araç çubuğudur.
- URL tabanlı filtreleme ve açık “Filtreleri temizle” bağlantısı korunur.
- Boş sonuç durumu açıklama ve geri dönüş önerisi verir.

## 12. Responsive kurallar

### Mobil

- 4 kolon mantığı, tek kolon içerik akışı
- Hero statik; metin önce, görsel sonra
- Buton grupları gerektiğinde tam genişlik
- katalog 1 kolon
- minimum dokunma hedefi 44px+

### Tablet

- 8 kolon
- katalog 2 kolon
- hero metin/görsel iki alan olabilir, motion varsayılan olarak statik
- içerik açıklamaları gereksiz dar yan sütuna sıkıştırılmaz

### Masaüstü

- 12 kolon
- hero header hariç yaklaşık tek viewport ve maksimum 62rem yükseklik
- sahiplendirme 4, kayıp 3–4 kolon
- asimetrik page intro ve feature modülleri

## 13. Hareket

- Hareket progressive enhancement’tır; içerik onsuz eksiksiz görünür.
- GSAP yalnızca `>=1024px` masaüstü hero girişinde lazy yüklenir.
- Native scroll korunur; scroll hijacking, snapping ve smooth-scroll kütüphanesi yoktur.
- Sürekli floating, parçacık, fake 3D ve dekoratif parallax yoktur.
- `prefers-reduced-motion: reduce` tüm transform/reveal davranışlarını kaldırır.

## 14. Erişilebilirlik

- Semantik landmark ve ardışık heading sırası korunur.
- Tüm anlamlı görsellerde açıklayıcı alt metin bulunur.
- Durumlar yalnızca renkle aktarılmaz; okunur etiket içerir.
- Focus görünür, formlar etiketli, skip link erişilebilirdir.
- Gövde metni kontrastı WCAG AA hedefini karşılayacak nötr roller üzerinden kurulur.

