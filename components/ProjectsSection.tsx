"use client";

import { useCallback, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { categories, offices, type Category, type Project } from "@/lib/projects";
import { ProjectFacts } from "./ProjectFacts";
import { ProjectImage } from "./ProjectImage";
import { ProjectViewer, imageCount } from "./ProjectViewer";

// Kapak ve küçük resim şeridi: küçük resmin üzerine gelince kapak o görsele döner,
// kapağa ya da küçük resme tıklayınca tam ekran görüntüleyici açılır.
const MAX_THUMBS = 6;

function Gallery({ p, lang, label, onOpen }: { p: Project; lang: Locale; label: string; onOpen: (i: number) => void }) {
  const total = imageCount(p);
  const [cur, setCur] = useState(0);
  const all = Array.from({ length: total }, (_, i) => i);
  const overflow = total > MAX_THUMBS;
  const thumbs = overflow ? all.slice(0, MAX_THUMBS - 1) : all;
  const tone = (i: number) => (i % 3 === 1 ? "mid" : "light");

  return (
    <div>
      <button
        type="button"
        onClick={() => onOpen(cur)}
        aria-label={`${label}: ${p.title[lang]} ${cur + 1}`}
        className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-surface"
      >
        {all.map((i) => (
          <span
            key={i}
            aria-hidden={i !== cur}
            className={`absolute inset-0 transition-opacity duration-300 ${i === cur ? "opacity-100" : "opacity-0"}`}
          >
            <ProjectImage
              src={p.images[i]}
              seed={`${p.slug}-${i}`}
              tone={tone(i)}
              alt={`${p.title[lang]} ${i + 1}`}
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </span>
        ))}
      </button>

      {total > 1 && (
        <div className="mt-1.5 grid grid-cols-6 gap-1.5">
          {thumbs.map((i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setCur(i)}
              onFocus={() => setCur(i)}
              onClick={() => onOpen(i)}
              aria-label={`${label}: ${p.title[lang]} ${i + 1}`}
              className={`relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-surface ${
                i === cur ? "shadow-[inset_0_-2px_0_var(--ink)]" : ""
              }`}
            >
              <span
                className={`absolute inset-0 transition-[filter,opacity] duration-300 ${
                  i === cur ? "grayscale-0" : "opacity-80 grayscale"
                }`}
              >
                <ProjectImage src={p.images[i]} seed={`${p.slug}-${i}`} tone={tone(i)} alt="" sizes="10vw" />
              </span>
            </button>
          ))}
          {overflow && (
            <button
              type="button"
              onClick={() => onOpen(MAX_THUMBS - 1)}
              aria-label={`${label}: ${p.title[lang]}`}
              className="relative grid aspect-[4/3] cursor-zoom-in place-items-center overflow-hidden bg-surface"
            >
              <span className="absolute inset-0 opacity-50 grayscale">
                <ProjectImage src={p.images[MAX_THUMBS - 1]} seed={`${p.slug}-${MAX_THUMBS - 1}`} tone={tone(MAX_THUMBS - 1)} alt="" sizes="10vw" />
              </span>
              <span className="relative text-sm font-medium">+{total - (MAX_THUMBS - 1)}</span>
            </button>
          )}
        </div>
      )}
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
                  <div className="mt-3">
                    <ProjectFacts p={p} lang={lang} t={t} />
                  </div>
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
