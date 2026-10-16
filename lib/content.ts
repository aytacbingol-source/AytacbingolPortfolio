import type { Localized } from "./i18n";

export const bimAreas: { title: string; text: Localized }[] = [
  {
    title: "Revit API",
    text: {
      tr: "C# ile Revit için eklentiler ve komutlar. Modelden veri okuma, yazma ve toplu düzenleme.",
      en: "Revit add-ins and commands in C#. Reading, writing and batch-editing model data.",
    },
  },
  {
    title: "BIM Automation",
    text: {
      tr: "Pafta, mahal listesi ve metraj gibi tekrar eden işlerin otomasyonu.",
      en: "Automating repetitive work such as sheets, room schedules and quantities.",
    },
  },
  {
    title: "Digital Workflows in AEC",
    text: {
      tr: "CAD, Revit ve tablolar arasında veri kaybı olmadan akan iş akışları.",
      en: "Workflows where data moves between CAD, Revit and spreadsheets without loss.",
    },
  },
];

export const toolCategories = {
  modeling: { tr: "Modelleme araçları", en: "Modeling tools" },
  docs: { tr: "Dokümantasyon araçları", en: "Documentation tools" },
} satisfies Record<string, Localized>;

export type ToolCategory = keyof typeof toolCategories;

// Her grup için kısa genel açıklama
export const toolCategoryText: Record<ToolCategory, Localized> = {
  modeling: {
    tr: "CAD'den gelen odaları Revit'e aktarır; döşeme, duvar, tavan ve süpürgelik kaplamalarını oda bilgisine göre tek seferde modeller. Parametre bazlı filtrelerle modeli toplu düzenler.",
    en: "Brings rooms from CAD into Revit and models floor, wall, ceiling and skirting finishes from room data in one go. Parameter-based filters let you edit the model in bulk.",
  },
  docs: {
    tr: "Metraj cetvellerini, Excel çıktılarını, görünümleri ve paftaları otomatik hazırlar. Yüzlerce pafta ve görünümü satır bazlı ayarlarla tek seferde oluşturur.",
    en: "Prepares quantity schedules, Excel exports, views and sheets automatically. Creates hundreds of sheets and views at once, set up row by row.",
  },
};

// BIMGoal paketindeki 12 araç (bimgoal.tools ile aynı sıra ve adlar)
export const bimgoalTools: { name: string; text: Localized; category: ToolCategory }[] = [
  {
    name: "CAD to Room",
    category: "modeling",
    text: {
      tr: "CSV'den yüzlerce odayı koordinat ve parametrelerle birlikte tek adımda oluşturur.",
      en: "Creates hundreds of rooms from a CSV in one step, with coordinates and parameters.",
    },
  },
  {
    name: "Floor Finish",
    category: "modeling",
    text: {
      tr: "Oda parametrelerine göre her odada otomatik döşeme kaplaması. Kapı eşikleri birleşir.",
      en: "Automatic floor finishes in every room from room parameters. Door thresholds are joined.",
    },
  },
  {
    name: "Ceiling Finish",
    category: "modeling",
    text: {
      tr: "Oda bazlı tavan kaplaması. 3 farklı yükseklik hesaplama yöntemi.",
      en: "Room-based ceiling finishes with 3 ways to calculate height.",
    },
  },
  {
    name: "Wall Finish",
    category: "modeling",
    text: {
      tr: "Linkli modellerde çalışan akıllı duvar kaplama ve void sistemi.",
      en: "Smart wall finishes and voids that also work with linked models.",
    },
  },
  {
    name: "Skirting",
    category: "modeling",
    text: {
      tr: "Odaların çevresine süpürgelik. Kapı kasa genişlikleri otomatik hesaplanır.",
      en: "Skirting around every room, with door frame widths calculated automatically.",
    },
  },
  {
    name: "Element Filter",
    category: "modeling",
    text: {
      tr: "Parametre bazlı filtreler, toplu düzenleme, Excel export-import.",
      en: "Parameter-based filters, bulk editing and Excel export-import.",
    },
  },
  {
    name: "Quantity Takeoff",
    category: "docs",
    text: {
      tr: "BIMGoal ile oluşturulan elemanlar için hassas metraj cetvelleri.",
      en: "Precise quantity schedules for elements created with BIMGoal.",
    },
  },
  {
    name: "Non-Quantified",
    category: "docs",
    text: {
      tr: "Hiçbir metraja girmeyen elementleri izole eden 3D görünüm.",
      en: "A 3D view that isolates elements missing from every quantity schedule.",
    },
  },
  {
    name: "Schedules Export",
    category: "docs",
    text: {
      tr: "Tüm schedule verilerini profesyonel biçimli Excel'e toplu olarak aktarır.",
      en: "Exports all schedule data to professionally formatted Excel in one go.",
    },
  },
  {
    name: "View Duplicator",
    category: "docs",
    text: {
      tr: "Bir görünümden yüzlerce kopya: isim, template ve scope box satır bazında.",
      en: "Hundreds of copies from one view, with name, template and scope box set per row.",
    },
  },
  {
    name: "Sheet Creator",
    category: "docs",
    text: {
      tr: "Yüzlerce paftayı tek seferde, satır bazlı ince ayarlarla.",
      en: "Hundreds of sheets at once, fine-tuned row by row.",
    },
  },
  {
    name: "View to Sheet",
    category: "docs",
    text: {
      tr: "Bir paftadaki viewport konumunu tüm paftalara aynı şekilde uygular.",
      en: "Applies a viewport's position on one sheet to every other sheet.",
    },
  },
];

export const services: { title: Localized; text: Localized }[] = [
  {
    title: { tr: "Mimari tasarım", en: "Architectural design" },
    text: {
      tr: "Konseptten uygulama projesine kadar, tüm aşamaları BIM ile yürütülen mimari tasarım.",
      en: "Architectural design from concept to construction documents, with every stage run in BIM.",
    },
  },
  {
    title: { tr: "BIM koordinasyonu", en: "BIM coordination" },
    text: {
      tr: "Model kurulumu, ofis standartları, disiplinler arası koordinasyon ve çakışma kontrolü.",
      en: "Model setup, office standards, cross-discipline coordination and clash checking.",
    },
  },
  {
    title: { tr: "Revit otomasyonu", en: "Revit automation" },
    text: {
      tr: "Ekibinizin tekrar eden işleri için BIMGoal araçları ve Revit API ile geliştirilen özel çözümler.",
      en: "BIMGoal tools and custom Revit API solutions for your team's repetitive tasks.",
    },
  },
  {
    title: { tr: "Eğitim ve danışmanlık", en: "Training and consulting" },
    text: {
      tr: "Revit ve BIM süreçlerine geçiş yapan ekipler için eğitim ve iş akışı danışmanlığı.",
      en: "Training and workflow consulting for teams moving to Revit and BIM.",
    },
  },
];

// ÖRNEK İÇERİK: kendi deneyim ve eğitim bilgilerinle değiştir.
export const experience: { period: string; title: Localized; place: string }[] = [
  { period: "2023 –", title: { tr: "Kurucu", en: "Founder" }, place: "BIMGoal" },
  { period: "2023 – 2026", title: { tr: "BIM Koordinatörü", en: "BIM Coordinator" }, place: "Ofis A (örnek)" },
  { period: "2019 – 2023", title: { tr: "Mimar", en: "Architect" }, place: "Ofis B (örnek)" },
];

export const education: { period: string; title: Localized; place: string }[] = [
  { period: "2014 – 2019", title: { tr: "Mimarlık Lisans", en: "B.Arch." }, place: "Üniversite (örnek)" },
];

export const software = ["Revit", "Revit API (C#)", "BIMGoal", "pyRevit", "Dynamo", "AutoCAD", "Navisworks"];
