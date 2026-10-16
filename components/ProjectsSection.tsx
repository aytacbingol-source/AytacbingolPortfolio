"use client";

import { useCallback, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { categories, offices, type Category, type Project } from "@/lib/projects";
import { ProjectFacts } from "./ProjectFacts";
import { ProjectImage } from "./ProjectImage";
import { ProjectViewer, imageCount } from "./ProjectViewer";

function Gallery({ p, lang, label, onOpen }: { p: Project; lang: Locale; label: string; onOpen: (i: number) => void }) {
  const total = imageCount(p);
  const slots = [0, 1, 2].filter((i) => i < Math.max(total, 3));
  const more = total - 3;
  return (
    <div className="grid aspect-[2/1] grid-cols-[2fr_1fr] grid-rows-2 gap-1.5">
      {slots.map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`${label}: ${p.title[lang]} ${i + 1}`}
          className={`group relative cursor-zoom-in overflow-hidden bg-surface ${i === 0 ? "row-span-2" : ""}`}
        >
          <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
            <ProjectImage
              src={p.images[i]}
              seed={`${p.slug}-${i}`}
              tone={i === 1 ? "mid" : "light"}
              alt={`${p.title[lang]} ${i + 1}`}
              sizes={i === 0 ? "(min-width: 1024px) 40vw, 66vw" : "(min-width: 1024px) 20vw, 33vw"}
            />
          </span>
          {i === 2 && more > 0 && (
            <span className="absolute inset-0 grid place-items-center bg-black/55 text-lg font-medium text-white">+{more}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function ProjectsSection({ projects, lang, dict }: { projects: Project[]; lang: Locale; dict: Dict }) {
  const t = dict.projects;
  const [active, setActive] = useState<Category | "all">("all");
  const [viewer, setViewer] = useState<{ project: number; image: number } | null>(null);
  const closeViewer = useCallback(() => setViewer(null), []);
  const used = (Object.keys(categories) as Category[]).filter((c) => projects.some((p) => p.category === c));
  const list = active === "all" ? projects : projects.filter((p) => p.category === active);
  // Görüntüleyicide önceki/sonraki proje, sayfadaki sırayla (ofis grupları) gitsin
  const ordered = offices.flatMap((_, oi) => list.filter((p) => p.office === oi));

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
                  <h4 className="text-2xl font-medium tracking-[-0.025em]">
                    <button
                      type="button"
                      onClick={() => setViewer({ project: ordered.indexOf(p), image: 0 })}
                      className="text-left underline-offset-4 hover:underline"
                    >
                      {p.title[lang]}
                    </button>
                  </h4>
                  <div className="mt-4">
                    <ProjectFacts p={p} lang={lang} t={t} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewer({ project: ordered.indexOf(p), image: 0 })}
                    className="mt-5 inline-block text-sm underline underline-offset-4"
                  >
                    {t.view}
                  </button>
                </div>
                <Gallery
                  p={p}
                  lang={lang}
                  label={dict.viewer.open}
                  onOpen={(i) => setViewer({ project: ordered.indexOf(p), image: i })}
                />
              </article>
            ))}
          </div>
        );
      })}

      {viewer && <ProjectViewer projects={ordered} start={viewer} lang={lang} t={dict} onClose={closeViewer} />}
    </div>
  );
}
