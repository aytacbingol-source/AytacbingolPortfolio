import type { Localized } from "./i18n";

export const categories = {
  education: { tr: "Eğitim Yapısı", en: "Education" },
  residential: { tr: "Konut", en: "Residential" },
  logistics: { tr: "Lojistik", en: "Logistics" },
  retail: { tr: "Mağaza", en: "Retail" },
  office: { tr: "Ofis", en: "Office" },
  hotel: { tr: "Otel", en: "Hotel" },
  restaurant: { tr: "Restoran", en: "Restaurant" },
  healthcare: { tr: "Sağlık Tesisi", en: "Healthcare" },
  competition: { tr: "Yarışma Projesi", en: "Competition" },
} satisfies Record<string, Localized>;

export type Category = keyof typeof categories;

export type Project = {
  slug: string;
  category: Category;
  title: Localized;
  year: string;
  location: Localized;
  /** İnşaat alanı, örn. "12.400 m²" */
  area?: string;
  /** İşveren */
  client: Localized;
  role: Localized;
  status: Localized;
  summary: Localized;
  body: Localized[];
  /** Projenin yapıldığı ofis: offices dizisindeki sıra numarası */
  office: number;
  /** /public altındaki görseller, ilk görsel kapak olur. Boşsa yer tutucu görsel gösterilir. */
  images: string[];
  /** Görsel yokken galeride gösterilecek örnek fotoğraf sayısı (yalnızca örnek içerik için) */
  sampleCount?: number;
  featured?: boolean;
};

// ÖRNEK: Çalıştığın ofisler. Projeler bu gruplara göre listelenir.
export const offices: { name: string; period: string }[] = [
  { name: "Ofis A (örnek)", period: "2023 – 2026" },
  { name: "Ofis B (örnek)", period: "2019 – 2023" },
];

// ÖRNEK İÇERİK: Aşağıdaki projeler yer tutucudur. Kendi projelerinle değiştir.
// Görselleri /public/projects/<slug>/ klasörüne koyup images dizisine "/projects/<slug>/01.jpg" gibi ekle.
export const projects: Project[] = [
  {
    slug: "ilkokul-kampusu",
    office: 0,
    sampleCount: 6,
    category: "education",
    title: { tr: "İlkokul Kampüsü", en: "Primary School Campus" },
    year: "2025",
    location: { tr: "İstanbul", en: "Istanbul" },
    area: "8.600 m²",
    client: { tr: "İl Milli Eğitim Müdürlüğü (örnek)", en: "Provincial Directorate of Education (sample)" },
    role: { tr: "Proje mimarı, BIM koordinasyonu", en: "Project architect, BIM coordination" },
    status: { tr: "Uygulama projesi", en: "Construction documents" },
    summary: {
      tr: "Avlular etrafında kurgulanan, 24 derslikli bir ilkokul.",
      en: "A 24-classroom primary school organised around courtyards.",
    },
    body: [
      {
        tr: "Derslik blokları iki avlunun çevresine yerleştirildi. Her derslik doğrudan bir açık alana bakıyor ve koridorlar aynı zamanda ortak çalışma alanı olarak kullanılıyor.",
        en: "Classroom wings wrap around two courtyards. Every classroom faces open space, and the corridors double as shared study areas.",
      },
      {
        tr: "Proje baştan sona Revit'te kurgulandı. Mahal listeleri ve kaplama bilgileri modelden otomatik üretildi.",
        en: "The project was built in Revit from start to finish. Room schedules and finish data were generated directly from the model.",
      },
    ],
    images: ["/projects/ilkokul-kampusu/01.jpg", "/projects/ilkokul-kampusu/02.jpg", "/projects/ilkokul-kampusu/03.jpg", "/projects/ilkokul-kampusu/04.jpg", "/projects/ilkokul-kampusu/05.jpg", "/projects/ilkokul-kampusu/06.jpg"],
    featured: true,
  },
  {
    slug: "bahce-konutlari",
    office: 0,
    sampleCount: 5,
    category: "residential",
    title: { tr: "Bahçe Konutları", en: "Garden Housing" },
    year: "2024",
    location: { tr: "Bursa", en: "Bursa" },
    area: "14.200 m²",
    client: { tr: "Özel konut geliştiricisi (örnek)", en: "Private housing developer (sample)" },
    role: { tr: "Tasarım ekibi", en: "Design team" },
    status: { tr: "Tamamlandı", en: "Completed" },
    summary: {
      tr: "Ortak bahçeye açılan, alçak yoğunluklu 64 konut.",
      en: "Sixty-four low-rise homes opening onto a shared garden.",
    },
    body: [
      {
        tr: "Bloklar arazinin eğimini takip ederek kademelendi. Her konutun en az iki yöne cephesi var.",
        en: "The blocks step down with the slope of the site. Every home has at least two aspects.",
      },
    ],
    images: ["/projects/bahce-konutlari/01.jpg", "/projects/bahce-konutlari/02.jpg", "/projects/bahce-konutlari/03.jpg", "/projects/bahce-konutlari/04.jpg", "/projects/bahce-konutlari/05.jpg"],
    featured: true,
  },
  {
    slug: "dagitim-merkezi",
    office: 1,
    sampleCount: 3,
    category: "logistics",
    title: { tr: "Bölgesel Dağıtım Merkezi", en: "Regional Distribution Centre" },
    year: "2023",
    location: { tr: "Kocaeli", en: "Kocaeli" },
    area: "42.000 m²",
    client: { tr: "Lojistik firması (örnek)", en: "Logistics company (sample)" },
    role: { tr: "BIM yöneticisi", en: "BIM manager" },
    status: { tr: "Tamamlandı", en: "Completed" },
    summary: {
      tr: "Modüler taşıyıcı sistemle tasarlanan depolama ve dağıtım tesisi.",
      en: "A storage and distribution facility designed on a modular structural grid.",
    },
    body: [
      {
        tr: "Tekrar eden aks sistemi sayesinde paftaların büyük kısmı modelden otomatik üretildi.",
        en: "Thanks to the repeating structural grid, most sheets were generated automatically from the model.",
      },
    ],
    images: [],
    featured: true,
  },
  {
    slug: "konsept-magaza",
    office: 1,
    sampleCount: 4,
    category: "retail",
    title: { tr: "Konsept Mağaza", en: "Concept Store" },
    year: "2024",
    location: { tr: "İstanbul", en: "Istanbul" },
    area: "650 m²",
    client: { tr: "Perakende markası (örnek)", en: "Retail brand (sample)" },
    role: { tr: "İç mimari tasarım", en: "Interior design" },
    status: { tr: "Tamamlandı", en: "Completed" },
    summary: {
      tr: "Tek bir malzeme diliyle kurgulanan sokak cepheli mağaza.",
      en: "A street-front store built from a single material language.",
    },
    body: [
      {
        tr: "Raf sistemi ve kaplamalar aynı modüle göre tasarlandı, böylece farklı şubelere uyarlanabiliyor.",
        en: "Shelving and finishes share one module, so the design can be adapted to other branches.",
      },
    ],
    images: [],
  },
  {
    slug: "teknoloji-ofisi",
    office: 0,
    sampleCount: 4,
    category: "office",
    title: { tr: "Teknoloji Ofisi", en: "Technology Office" },
    year: "2025",
    location: { tr: "Ankara", en: "Ankara" },
    area: "3.200 m²",
    client: { tr: "Yazılım şirketi (örnek)", en: "Software company (sample)" },
    role: { tr: "Proje mimarı", en: "Project architect" },
    status: { tr: "Devam ediyor", en: "In progress" },
    summary: {
      tr: "İki kata yayılan, esnek çalışma alanlarına sahip bir ofis.",
      en: "A two-floor office with flexible workspaces.",
    },
    body: [
      {
        tr: "Çalışma alanları ekiplerin büyüyüp küçülmesine göre yeniden düzenlenebilecek şekilde kurgulandı.",
        en: "Workspaces are planned so they can be rearranged as teams grow and shrink.",
      },
    ],
    images: [],
    featured: true,
  },
  {
    slug: "kiyi-oteli",
    office: 1,
    sampleCount: 7,
    category: "hotel",
    title: { tr: "Kıyı Oteli", en: "Coastal Hotel" },
    year: "2023",
    location: { tr: "Muğla", en: "Muğla" },
    area: "18.500 m²",
    client: { tr: "Otel yatırımcısı (örnek)", en: "Hotel investor (sample)" },
    role: { tr: "Tasarım ve BIM koordinasyonu", en: "Design and BIM coordination" },
    status: { tr: "Tamamlandı", en: "Completed" },
    summary: {
      tr: "Topoğrafyaya yerleşen, 120 odalı bir butik otel.",
      en: "A 120-room boutique hotel set into the topography.",
    },
    body: [
      {
        tr: "Oda blokları teraslar halinde denize doğru iniyor. Her odanın kendi açık alanı var.",
        en: "Room wings terrace down towards the sea, and every room has its own outdoor space.",
      },
    ],
    images: [],
    featured: true,
  },
  {
    slug: "avlu-restoran",
    office: 1,
    sampleCount: 3,
    category: "restaurant",
    title: { tr: "Avlu Restoran", en: "Courtyard Restaurant" },
    year: "2022",
    location: { tr: "İzmir", en: "Izmir" },
    area: "480 m²",
    client: { tr: "Restoran işletmesi (örnek)", en: "Restaurant operator (sample)" },
    role: { tr: "Tasarım", en: "Design" },
    status: { tr: "Tamamlandı", en: "Completed" },
    summary: {
      tr: "Eski bir yapının avlusuna yerleşen restoran.",
      en: "A restaurant set into the courtyard of an existing building.",
    },
    body: [
      {
        tr: "Mevcut duvarlar korunarak yeni strüktür bağımsız bir çelik çerçeve olarak tasarlandı.",
        en: "The existing walls were kept, and the new structure was designed as an independent steel frame.",
      },
    ],
    images: [],
  },
  {
    slug: "ilce-hastanesi",
    office: 0,
    sampleCount: 3,
    category: "healthcare",
    title: { tr: "İlçe Hastanesi", en: "District Hospital" },
    year: "2024",
    location: { tr: "Konya", en: "Konya" },
    area: "26.000 m²",
    client: { tr: "İl Sağlık Müdürlüğü (örnek)", en: "Provincial Health Directorate (sample)" },
    role: { tr: "BIM koordinatörü", en: "BIM coordinator" },
    status: { tr: "Uygulama projesi", en: "Construction documents" },
    summary: {
      tr: "150 yataklı, poliklinik ve acil birimleri olan bir hastane.",
      en: "A 150-bed hospital with outpatient and emergency departments.",
    },
    body: [
      {
        tr: "Hasta, personel ve malzeme akışları birbirinden ayrıldı. Mahal bazlı teknik gereksinimler doğrudan modelde tutuldu.",
        en: "Patient, staff and supply flows are kept apart. Room-level technical requirements are stored directly in the model.",
      },
    ],
    images: [],
  },
  {
    slug: "kent-meydani-yarismasi",
    office: 1,
    sampleCount: 4,
    category: "competition",
    title: { tr: "Kent Meydanı Yarışması", en: "City Square Competition" },
    year: "2022",
    location: { tr: "Eskişehir", en: "Eskişehir" },
    client: { tr: "Belediye, ulusal yarışma (örnek)", en: "Municipality, national competition (sample)" },
    role: { tr: "Ekip üyesi", en: "Team member" },
    status: { tr: "Yarışma önerisi", en: "Competition entry" },
    summary: {
      tr: "Meydanı bir dizi gölgeli avluya dönüştüren yarışma önerisi.",
      en: "A competition entry that turns the square into a series of shaded courts.",
    },
    body: [
      {
        tr: "Öneri, meydanı tek bir boşluk yerine farklı kullanımlara açık küçük avlulara bölüyor.",
        en: "Instead of one large void, the proposal divides the square into smaller courts open to different uses.",
      },
    ],
    images: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
