// Dil değişince (TR ↔ EN) okuyucunun kaldığı yeri korumak için yardımcılar.
// TR ve EN metinlerinin uzunlukları farklı olduğu için piksel yerine
// "hangi bölümün kaçıncı pikselindeyim" bilgisini saklıyoruz.

const KEY = "lang-scroll";

type Saved = { path: string; id?: string; offset?: number; ratio?: number };

export function saveScrollForLangSwitch(targetPath: string) {
  try {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    let saved: Saved = { path: targetPath };
    if (sections.length) {
      // Ekranın üst kenarını geçmiş son bölüm
      let current = sections[0];
      for (const s of sections) if (s.getBoundingClientRect().top <= 1) current = s;
      saved = { path: targetPath, id: current.id, offset: -current.getBoundingClientRect().top };
    } else {
      const max = document.documentElement.scrollHeight - innerHeight;
      saved = { path: targetPath, ratio: max > 0 ? scrollY / max : 0 };
    }
    sessionStorage.setItem(KEY, JSON.stringify(saved));
  } catch {}
}

export function restoreScrollAfterLangSwitch(pathname: string) {
  let saved: Saved | null = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
    sessionStorage.removeItem(KEY);
  } catch {}
  if (!saved || saved.path !== pathname) return;

  const apply = () => {
    let y = 0;
    if (saved!.id) {
      const el = document.getElementById(saved!.id);
      if (!el) return;
      y = el.getBoundingClientRect().top + scrollY + (saved!.offset ?? 0);
    } else {
      const max = document.documentElement.scrollHeight - innerHeight;
      y = (saved!.ratio ?? 0) * max;
    }
    window.scrollTo({ top: Math.max(0, y), behavior: "instant" as ScrollBehavior });
  };
  apply();
  // Yazı tipleri ve görseller yerleşince bir kez daha düzelt
  requestAnimationFrame(() => requestAnimationFrame(apply));
  setTimeout(apply, 250);
}
