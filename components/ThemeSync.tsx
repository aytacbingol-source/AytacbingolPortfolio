"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { restoreScrollAfterLangSwitch } from "@/lib/langScroll";

// Dil değişince (TR ↔ EN) sayfanın kökü yeniden kurulur: <html> üzerindeki tema sınıfı kaybolur
// ve sayfa başa döner. Bu bileşen her sayfa geçişinde kayıtlı temayı (yoksa sistem temasını)
// yeniden uygular ve dil değişimiyle gelindiyse okuyucuyu kaldığı yere geri götürür.
export function ThemeSync() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    let dark = false;
    try {
      const saved = localStorage.getItem("theme");
      dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      dark = matchMedia("(prefers-color-scheme: dark)").matches;
    }
    document.documentElement.classList.toggle("dark", dark);
    restoreScrollAfterLangSwitch(pathname);
  }, [pathname]);
  return null;
}
