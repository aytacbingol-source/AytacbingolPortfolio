"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { categories, offices, type Category, type Project } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";

function Gallery({ p, lang }: { p: Project; lang: Locale }) {
  const total = p.images.length || p.sampleCount || 3;
  const slots = [0, 1, 2];
  const more = total - 3;
  return (
    <Link
      href={`/${lang}/projects/${p.slug}`}
      className="grid aspect-[2/1] grid-cols-[2fr_1fr] grid-rows-2 gap-1.5"
      aria-label={p.title[lang]}
    >
      {slots.map((i) => (
        <div key={i} className={`relative overflow-hidden bg-surface ${i === 0 ? "row-span-2" : ""}`}>
          <ProjectImage
            src={p.images[i]}
            seed={`${p.slug}-${i}`}
            tone={i === 1 ? "mid" : "light"}
            alt={`${p.title[lang]} ${i + 1}`}
            sizes={i === 0 ? "(min-width: 1024px) 40vw, 66vw" : "(min-width: 1024px) 20vw, 33vw"}
          />
          {i === 2 && more > 0 && (
            <span className="absolute inset-0 grid place-items-center bg-black/55 text-lg font-medium text-white">+{more}</span>
          )}
        </div>
      ))}
    </Link>
  );
}

export function ProjectsSection({ projects, lang, t }: { projects: Project[]; lang: Locale; t: Dict["projects"] }) {
  const [active, setActive] = useState<Category | "all">("all");
  const used = (Object.keys(categories) as Category[]).filter((c) => projects.some((p) => p.category === c));
  const list = active === "all" ? projects : projects.filter((p) => p.category === active);

  const options: { key: Category | "all"; label: string; n: number }[] = [
    { key: "all", label: t.all, n: projects.length },
    ...used.map((c) => ({ key: c, label: categories[c][lang], n: projects.filter((p) => p.category === c).length })),
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.category}>
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={active === o.key}
            onClick={() => setActive(o.key)}
            className={`border px-3 py-1.5 text-sm ${
              active === o.key ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
            }`}
          >
            {o.label} <span className="tabular-nums opacity-60">{o.n}</span>
          </button>
        ))}
      </div>

      {list.length === 0 && <p className="mt-12 text-muted">{t.empty}</p>}

      {offices.map((office, oi) => {
        const items = list.filter((p) => p.office === oi);
        if (!items.length) return null;
        return (
          <div key={office.name} className="mt-12">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
              <h3 className="font-semibold">{office.name}</h3>
              <span className="font-mono text-xs text-muted">{office.period}</span>
            </div>
            {items.map((p) => (
              <article key={p.slug} className="grid gap-6 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted">{p.year}</span>
                    <span className="border border-line px-2 py-0.5 text-xs">{categories[p.category][lang]}</span>
                  </div>
                  <h4 className="mt-3 text-2xl font-medium tracking-[-0.025em]">
                    <Link href={`/${lang}/projects/${p.slug}`} className="underline-offset-4 hover:underline">
                      {p.title[lang]}
                    </Link>
                  </h4>
                  <p className="mt-2 max-w-[42ch] text-muted">{p.summary[lang]}</p>
                  <p className="mt-4 text-sm text-muted">
                    {p.location[lang]}
                    {p.area ? `, ${p.area}` : ""} · {p.role[lang]}
                  </p>
                  <Link href={`/${lang}/projects/${p.slug}`} className="mt-5 inline-block text-sm underline underline-offset-4">
                    {t.view}
                  </Link>
                </div>
                <Gallery p={p} lang={lang} />
              </article>
            ))}
          </div>
        );
      })}
    </div>
  );
}
