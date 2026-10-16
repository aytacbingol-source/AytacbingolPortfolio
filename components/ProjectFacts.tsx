import type { Dict, Locale } from "@/lib/i18n";
import { categories, type Project } from "@/lib/projects";

export type FactRow = { k: string; v: string; long?: boolean };

// Her projede aynı sırayla gösterilen künye:
// İnşaat alanı, Konum, İşveren, Yıl, Kategori, Rol, Genel bakış
export function factRows(p: Project, lang: Locale, t: Dict["projects"]): FactRow[] {
  return [
    { k: t.area, v: p.area ?? "—" },
    { k: t.location, v: p.location[lang] },
    { k: t.client, v: p.client[lang] },
    { k: t.year, v: p.year },
    { k: t.category, v: categories[p.category][lang] },
    { k: t.role, v: p.role[lang] },
    { k: t.overview, v: p.summary[lang], long: true },
  ];
}

export function ProjectFacts({ p, lang, t }: { p: Project; lang: Locale; t: Dict["projects"] }) {
  return (
    <dl className="border-t border-ink">
      {factRows(p, lang, t).map((r) => (
        <div key={r.k} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 border-b border-line py-2.5 text-sm">
          <dt className="text-muted">{r.k}</dt>
          <dd className={r.long ? "leading-relaxed" : "tabular-nums"}>{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
