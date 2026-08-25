# Asset Registry

Bu dosya ana sayfada ve demo veri kayıtlarında kullanılan dış görsel varlıkların kaynağını, lisansını ve kullanım amacını kaydeder.

## Lisans

Tüm fotoğraflar [Pexels License](https://www.pexels.com/license/) kapsamında kullanılır. Lisans, fotoğrafların ücretsiz kullanılmasına, web sitesi ve uygulamalarda yayımlanmasına ve düzenlenmesine izin verir. Atıf zorunlu değildir; kaynak şeffaflığı için üreticiler aşağıda belirtilmiştir. Fotoğraflar belediye, proje veya sahiplendirilebilir gerçek bir hayvan tarafından onay verilmiş izlenimi oluşturacak şekilde kullanılmamalıdır.

## Kullanılan fotoğraflar

| Yerel dosya | Kaynak / üretici | Kullanım | İşleme |
| --- | --- | --- | --- |
| `public/assets/animals/hero-dog.webp` | [Close-up Portrait of a Mixed Breed Dog](https://www.pexels.com/photo/close-up-portrait-of-a-mixed-breed-dog-35511893/) — Helena Lopes | Ana sayfa açılış portresi; sahiplendirme kaydı değildir | 2200×1467 WebP, kalite 82 |
| `public/assets/animals/human-dog-bond.webp` | [Person Holding a Dog’s Paw](https://www.pexels.com/photo/close-up-of-a-person-holding-a-dogs-paw-18851068/) — Anastasia Lashkevich | İnsan-hayvan bağı bölümü | 1800×1200 WebP, kalite 80 |
| `public/assets/animals/adoption-dog.webp` | [Close-Up Shot of a Dog](https://www.pexels.com/photo/close-up-shot-of-a-dog-10674821/) — Neil Yonamine | Açıkça işaretlenmiş demo köpek kaydı | 1200×1500 WebP, kalite 80 |
| `public/assets/animals/adoption-cat.webp` | [Portrait of Cat](https://www.pexels.com/photo/portrait-of-cat-18299633/) — Chalta Phirta | Açıkça işaretlenmiş demo kedi kaydı | 1200×1800 WebP, kalite 80 |
| `public/assets/animals/lost-dog.webp` | [Black and White Stray Dog on Urban Street](https://www.pexels.com/photo/black-and-white-stray-dog-on-urban-street-34786591/) — Christopher Welsch Leveroni | Kayıp hayvan bölümünün belgesel tonlu anlatı görseli ve demo ilan | 1800×1198 WebP, kalite 80 |

## 3D araştırma kararı

Sketchfab ve benzeri ücretsiz model kaynaklarında indirilebilir hayvan taramaları araştırıldı. Bulunan uygun lisanslı adaylar ya yüksek poligonlu fotogrametri taramaları, ya rig/animasyon olmadan statik modeller, ya da projenin premium ve kurumsal tonuyla çelişen stilize çalışmalardı. Bu iterasyonda düşük kaliteli veya anlamsız bir 3D katman eklenmedi. Fotoğraf, tipografi ve kontrollü 2D derinlik efektleri ana sanat yönü olarak seçildi.

Gelecekte 3D kullanılacaksa model; açık ticari kullanım lisansına, doğrulanabilir kaynağa, optimize GLB/GLTF çıktısına, sıkıştırılmış dokulara ve mobil için açık bir performans bütçesine sahip olmalıdır.

## Tipografi varlıkları

- `src/assets/fonts/BricolageGrotesque-Variable.ttf` — Google Fonts deposundan Bricolage Grotesque değişken fontu; SIL Open Font License 1.1. Projede başlık ve vurgu tipografisi için self-host edilir.
- `src/assets/fonts/Manrope-Variable.ttf` — Google Fonts deposundan Manrope değişken fontu; SIL Open Font License 1.1. Projede gövde ve arayüz tipografisi için self-host edilir.
- Her iki fontun lisans metni aynı klasörde `OFL-*.txt` dosyalarıyla saklanır. Self-hosting, üretim derlemesini Google Fonts ağına bağımlı olmaktan çıkarır.
