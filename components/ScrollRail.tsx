"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

// Tarayıcının kaydırma çubuğu yerine soldaki çizgi göstergesi.
// Ana sayfada her çizgi bir bölümdür; diğer sayfalarda çizgiler okuma ilerlemesini gösterir.
export function ScrollRail({ items, progressLabel }: { items: Item[]; progressLabel: string }) {
  const pathname = usePathname();
  const [present, setPresent] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const found = items.filter((i) => document.getElementById(i.id));
    setPresent(found);

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
      if (!found.length) return;
      const line = innerHeight * 0.4;
      let idx = 0;
      found.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      if (max > 0 && scrollY >= max - 2) idx = found.length - 1;
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items, pathname]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
  };

  if (present.length) {
    return (
      <nav aria-label="Bölümler" className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {present.map((it, i) => (
          <button
            key={it.id}
            type="button"
            onClick={() => go(it.id)}
            aria-label={it.label}
            aria-current={i === active ? "true" : undefined}
            className="group relative flex h-7 w-5 items-center justify-center"
          >
            <span
              className={`block w-[2px] transition-all duration-300 ${
                i === active ? "h-7 bg-ink" : "h-5 bg-line group-hover:bg-muted"
              }`}
            />
            <span className="pointer-events-none absolute left-6 whitespace-nowrap border border-line bg-paper px-2 py-1 text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {it.label}
            </span>
          </button>
        ))}
      </nav>
    );
  }

  // Bölümü olmayan sayfalar: 8 çizgi, kaydırdıkça dolar
  const n = 8;
  const filled = Math.round(progress * n);
  return (
    <div
      role="progressbar"
      aria-label={progressLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
    >
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="flex h-7 w-5 items-center justify-center">
          <span className={`block h-5 w-[2px] transition-colors duration-300 ${i < Math.max(1, filled) ? "bg-ink" : "bg-line"}`} />
        </span>
      ))}
    </div>
  );
}
