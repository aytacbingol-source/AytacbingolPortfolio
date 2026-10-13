# aytacbingol.com

Mimar Aytaç Bingöl'ün kişisel portfolyosu. Next.js 16 + Tailwind CSS 4, Vercel'de yayınlanır.

- İki dil: `/tr` ve `/en` (sağ üstteki TR/EN düğmesi)
- Açık / koyu tema (tercih tarayıcıda saklanır, ilk açılışta sistem temasını izler)
- Monoton palet, Inter, sıfır köşe yuvarlaklığı; hero Revit aks sistemiyle çerçevelenir

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # yayın öncesi kontrol
```

## İçerik nerede?

| Ne | Dosya |
|---|---|
| Projeler (başlık, künye, metin, görseller) | `lib/projects.ts` |
| Kategoriler (Eğitim Yapısı, Konut, Lojistik…) | `lib/projects.ts` → `categories` |
| BIM alanları, BIMGoal araçları, deneyim, eğitim, yazılımlar | `lib/content.ts` |
| Arayüz metinleri (TR/EN) ve biyografi | `lib/i18n.ts` |
| İsim, e-posta, LinkedIn, BIMGoal linkleri | `lib/site.ts` |
| Renkler | `app/globals.css` → `:root` ve `.dark` |

### Proje görseli eklemek

1. Görselleri `public/projects/<slug>/` klasörüne koy (ör. `public/projects/kiyi-oteli/01.jpg`).
2. `lib/projects.ts` içinde ilgili projenin `images` dizisine yolları ekle: `["/projects/kiyi-oteli/01.jpg", "/projects/kiyi-oteli/02.jpg"]`.
3. İlk görsel kapak olur, diğerleri proje sayfasında galeri olarak çıkar. Görsel yoksa otomatik plan çizimi gösterilir.

Önerilen boyut: uzun kenar 2400 px, JPG, dosya başına 500 KB altı.

## Yapılacaklar

- [ ] Örnek projeleri gerçek projelerle değiştir (`lib/projects.ts`)
- [ ] Deneyim, eğitim ve yazılım listesini güncelle (`lib/content.ts`)
- [ ] E-posta ve kişisel LinkedIn adresini gir (`lib/site.ts`)
- [ ] Profil fotoğrafını ekle (`app/[lang]/about/page.tsx`)
- [ ] 2. aşama: projeleri Supabase'e taşı, iletişim formu ekle
