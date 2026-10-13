# aytacbingol.com

Mimar Aytaç Bingöl'ün kişisel portfolyosu. Next.js 16 + Tailwind CSS 4, Vercel'de yayınlanır.

- İki dil: `/tr` ve `/en` (sağ üstteki TR/EN düğmesi)
- Açık / koyu tema (tercih tarayıcıda saklanır, ilk açılışta sistem temasını izler)
- Tek sayfa, numaralı bölümler: Hakkımda, Deneyim & Eğitim, Seçilmiş Mimari İşler, BIM & Yazılım, Hizmetler, İletişim
- Monoton palet, Inter, sıfır köşe yuvarlaklığı

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # yayın öncesi kontrol
```

## İçerik nerede?

| Ne | Dosya |
|---|---|
| Projeler (başlık, künye, metin, görseller) ve ofisler | `lib/projects.ts` |
| Kategoriler (Eğitim Yapısı, Konut, Lojistik…) | `lib/projects.ts` → `categories` |
| BIM alanları, BIMGoal araçları, hizmetler, deneyim, eğitim, yazılımlar | `lib/content.ts` |
| Arayüz metinleri (TR/EN) ve biyografi | `lib/i18n.ts` |
| İsim, e-posta, LinkedIn, rakamlar, "yeni projelere açık" rozeti | `lib/site.ts` |
| Renkler | `app/globals.css` → `:root` ve `.dark` |

### Proje görseli eklemek

1. Görselleri `public/projects/<slug>/` klasörüne koy (ör. `public/projects/kiyi-oteli/01.jpg`).
2. `lib/projects.ts` içinde ilgili projenin `images` dizisine yolları ekle: `["/projects/kiyi-oteli/01.jpg", "/projects/kiyi-oteli/02.jpg"]`.
3. İlk üç görsel ana sayfadaki galeride görünür, fazlası "+N" olarak sayılır. Hepsi proje sayfasında listelenir. Görsel yoksa yer tutucu gösterilir.

Önerilen boyut: uzun kenar 2400 px, JPG, dosya başına 500 KB altı.

## Yapılacaklar

- [ ] Örnek projeleri gerçek projelerle değiştir (`lib/projects.ts`)
- [ ] Deneyim, eğitim ve yazılım listesini güncelle (`lib/content.ts`)
- [ ] E-posta ve kişisel LinkedIn adresini gir (`lib/site.ts`)
- [ ] Hero'daki rakamları gerçek değerlerle değiştir (`lib/site.ts`)
- [ ] Ofis adlarını ve dönemlerini gir (`lib/projects.ts` → `offices`)
- [ ] 2. aşama: projeleri Supabase'e taşı, iletişim formu ekle
