"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// Dil değişince (TR ↔ EN) sayfanın kökü yeniden kurulur ve <html> üzerindeki tema sınıfı kaybolur.
// Bu bileşen her sayfa geçişinde kayıtlı temayı (yoksa sistem temasını) yeniden uygular.
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
  }, [pathname]);
  return null;
}
