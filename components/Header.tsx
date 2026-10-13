"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const links = (["about", "experience", "projects", "bim", "services", "contact"] as const).map((id) => ({
    href: `/${lang}#${id}`,
    label: t.nav[id],
  }));

  const isActive = (href: string) => href.endsWith("#projects") && pathname.startsWith(`/${lang}/projects`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <Link href={`/${lang}`} className="flex items-baseline gap-2 text-sm">
          <span className="font-semibold tracking-tight">{site.name}</span>
          <span className="text-muted">{t.role}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm xl:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`underline-offset-[6px] hover:underline ${isActive(l.href) ? "underline" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle lang={lang} label={t.langSwitch} />
          <ThemeToggle labels={t.theme} />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center border border-line xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              {open ? (
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 6 H17 M3 14 H17" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line xl:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line px-5 py-4 text-2xl tracking-tight"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
