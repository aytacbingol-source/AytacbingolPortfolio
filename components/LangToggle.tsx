"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { saveScrollForLangSwitch } from "@/lib/langScroll";

export function LangToggle({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() || `/${lang}`;
  const other: Locale = lang === "tr" ? "en" : "tr";
  const href = pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${other}`);

  return (
    <div className="flex h-9 border border-line text-xs font-medium" role="group" aria-label="Language">
      {(["tr", "en"] as const).map((l) =>
        l === lang ? (
          <span key={l} aria-current="true" className="grid w-9 place-items-center bg-ink text-paper">
            {l.toUpperCase()}
          </span>
        ) : (
          <Link
            key={l}
            href={href}
            hrefLang={l}
            scroll={false}
            onClick={() => saveScrollForLangSwitch(href)}
            aria-label={label}
            className="grid w-9 place-items-center text-muted hover:text-ink"
          >
            {l.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
