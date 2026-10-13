export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const dict = {
  tr: {
    role: "Mimar",
    nav: { projects: "Projeler", bim: "BIM & Otomasyon", about: "Hakkımda", contact: "İletişim" },
    theme: { toLight: "Açık temaya geç", toDark: "Koyu temaya geç" },
    langSwitch: "Switch to English",
    menu: "Menü",
    close: "Kapat",
    hero: {
      intro:
        "Mimari tasarımı BIM ile kuruyor, tekrar eden işleri Revit API ile otomatikleştiriyorum.",
      cta: "Projeleri gör",
    },
    home: {
      selected: "Seçilmiş projeler",
      allProjects: "Tüm projeler",
      bimTitle: "Mimarlık ve yazılım aynı masada",
      bimText:
        "Projelerde karşılaştığım tekrar eden Revit işlerini araçlara dönüştürüyorum. Bu araçlar BIMGoal çatısı altında başka BIM ekiplerinin de kullanımına açık.",
      bimLink: "BIM çalışmalarını incele",
      aboutTitle: "Kısaca",
      aboutLink: "Hakkımda",
    },
    projects: {
      title: "Projeler",
      all: "Tümü",
      empty: "Bu kategoride henüz proje yok. Başka bir kategori seç.",
      year: "Yıl",
      location: "Konum",
      area: "Alan",
      role: "Rol",
      status: "Durum",
      category: "Tür",
      next: "Sonraki proje",
      back: "Tüm projelere dön",
    },
    bim: {
      title: "BIM & Otomasyon",
      lead:
        "Revit API ile mimari iş akışlarını hızlandıran araçlar geliştiriyorum. Amaç basit: tasarımcı modelle uğraşmak yerine tasarıma vakit ayırsın.",
      areas: "Çalışma alanları",
      bimgoalTitle: "BIMGoal",
      bimgoalText:
        "BIMGoal, BIM profesyonelleri için geliştirdiğim Revit eklenti paketi. CAD'den Revit'e veri aktarımından pafta hazırlığına kadar günlük işleri kısaltıyor.",
      tools: "Paketteki araçlar",
      visit: "bimgoal.tools'u ziyaret et",
    },
    about: {
      title: "Hakkımda",
      bio: [
        "Mimarım. Projelerimi BIM ile kurguluyor, modelin yalnızca bir çizim aracı değil, projenin ortak veri tabanı olması gerektiğine inanıyorum.",
        "Eğitim yapılarından sağlık tesislerine, lojistik binalarından otellere kadar farklı ölçeklerde çalıştım. Bu süreçte tekrar eden işleri Revit API ile otomatikleştirmeye başladım ve bu çalışmalar BIMGoal'e dönüştü.",
      ],
      experience: "Deneyim",
      education: "Eğitim",
      software: "Yazılımlar",
      placeholderNote: "Bu bölüm örnek içerikle dolduruldu.",
    },
    contact: {
      title: "Bir proje mi konuşalım?",
      text: "Mimari iş birlikleri, BIM danışmanlığı ya da otomasyon fikirleri için yazabilirsin.",
      email: "E-posta",
    },
    footer: { rights: "Tüm hakları saklıdır." },
    notFound: { title: "Sayfa bulunamadı", back: "Ana sayfaya dön" },
  },
  en: {
    role: "Architect",
    nav: { projects: "Projects", bim: "BIM & Automation", about: "About", contact: "Contact" },
    theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
    langSwitch: "Türkçeye geç",
    menu: "Menu",
    close: "Close",
    hero: {
      intro:
        "I design buildings in BIM and automate the repetitive parts of the work with the Revit API.",
      cta: "View projects",
    },
    home: {
      selected: "Selected projects",
      allProjects: "All projects",
      bimTitle: "Architecture and software at the same desk",
      bimText:
        "I turn the repetitive Revit tasks I meet on projects into tools. Under the BIMGoal name, those tools are available to other BIM teams too.",
      bimLink: "See the BIM work",
      aboutTitle: "In short",
      aboutLink: "About me",
    },
    projects: {
      title: "Projects",
      all: "All",
      empty: "No projects in this category yet. Pick another category.",
      year: "Year",
      location: "Location",
      area: "Area",
      role: "Role",
      status: "Status",
      category: "Type",
      next: "Next project",
      back: "Back to all projects",
    },
    bim: {
      title: "BIM & Automation",
      lead:
        "I build tools on the Revit API that speed up architectural workflows. The goal is simple: designers should spend their time on design, not on the model.",
      areas: "Areas of work",
      bimgoalTitle: "BIMGoal",
      bimgoalText:
        "BIMGoal is the Revit plugin suite I build for BIM professionals. It shortens everyday work, from moving CAD data into Revit to preparing sheets.",
      tools: "Tools in the suite",
      visit: "Visit bimgoal.tools",
    },
    about: {
      title: "About",
      bio: [
        "I'm an architect. I set up my projects in BIM, and I believe the model should be the project's shared database, not just a drawing tool.",
        "I have worked at many scales, from schools to healthcare facilities and from logistics buildings to hotels. Along the way I started automating repetitive tasks with the Revit API, and that work became BIMGoal.",
      ],
      experience: "Experience",
      education: "Education",
      software: "Software",
      placeholderNote: "This section is filled with sample content.",
    },
    contact: {
      title: "Have a project in mind?",
      text: "Write to me about architectural collaborations, BIM consulting or automation ideas.",
      email: "Email",
    },
    footer: { rights: "All rights reserved." },
    notFound: { title: "Page not found", back: "Back to home" },
  },
} satisfies Record<Locale, unknown>;

export type Dict = (typeof dict)["tr"];

export function getDict(locale: Locale): Dict {
  return dict[locale];
}
