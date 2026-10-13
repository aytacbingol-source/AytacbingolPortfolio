"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ labels }: { labels: { toLight: string; toDark: string } }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  const label = dark ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center border border-line hover:border-ink"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        {/* Yarısı dolu daire: iki tema tek işarette */}
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 3 A7 7 0 0 1 10 17 Z" fill="currentColor" />
      </svg>
    </button>
  );
}
