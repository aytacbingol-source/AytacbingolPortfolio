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

export const bimgoalTools: { name: Localized; text: Localized }[] = [
  {
    name: { tr: "CAD'den Revit'e mahal verisi", en: "CAD-to-Revit room data" },
    text: {
      tr: "CAD çizimindeki mahal bilgilerini Revit odalarına aktarır.",
      en: "Transfers room information from CAD drawings into Revit rooms.",
    },
  },
  {
    name: { tr: "Otomatik kaplama", en: "Automated finishes" },
    text: {
      tr: "Mahal bilgisine göre döşeme, duvar ve tavan kaplamalarını oluşturur.",
      en: "Creates floor, wall and ceiling finishes from room data.",
    },
  },
  {
    name: { tr: "Eleman filtreleme", en: "Element filtering" },
    text: {
      tr: "Modeldeki elemanları parametrelere göre hızlıca bulur ve seçer.",
      en: "Finds and selects model elements by their parameters.",
    },
  },
  {
    name: { tr: "Metraj", en: "Quantity takeoffs" },
    text: {
      tr: "Modelden metraj listelerini çıkarır.",
      en: "Extracts quantity lists from the model.",
    },
  },
  {
    name: { tr: "Pafta hazırlığı", en: "Sheet preparation" },
    text: {
      tr: "Paftaları ve görünüşleri toplu olarak hazırlar.",
      en: "Prepares sheets and views in batches.",
    },
  },
];

// ÖRNEK İÇERİK: kendi deneyim ve eğitim bilgilerinle değiştir.
export const experience: { period: string; title: Localized; place: string }[] = [
  { period: "2023 –", title: { tr: "Kurucu", en: "Founder" }, place: "BIMGoal" },
  { period: "2020 – 2023", title: { tr: "BIM Koordinatörü", en: "BIM Coordinator" }, place: "Mimarlık Ofisi" },
  { period: "2017 – 2020", title: { tr: "Mimar", en: "Architect" }, place: "Mimarlık Ofisi" },
];

export const education: { period: string; title: Localized; place: string }[] = [
  { period: "2012 – 2017", title: { tr: "Mimarlık Lisans", en: "B.Arch." }, place: "Üniversite" },
];

export const software = [
  "Revit",
  "Revit API (C#)",
  "pyRevit",
  "Dynamo",
  "AutoCAD",
  "Navisworks",
];
