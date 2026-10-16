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

// Proje kartındaki künye: başlığın altında yıl · kategori · konum satırı,
// ardından genel bakış metni, en altta inşaat alanı, işveren ve rol.
export function ProjectFacts({ p, lang, t }: { p: Project; lang: Locale; t: Dict["projects"] }) {
  const meta = [p.year, categories[p.category][lang], p.location[lang]];
  const rows = [
    { k: t.area, v: p.area ?? "—" },
    { k: t.client, v: p.client[lang] },
    { k: t.role, v: p.role[lang] },
  ];
  return (
    <div>
      <p className="flex flex-wrap items-center gap-y-1 text-sm text-muted">
        {meta.map((m, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="mx-3 inline-block h-3 w-px bg-line" aria-hidden="true" />}
            <span className={i === 0 ? "text-ink tabular-nums" : ""}>{m}</span>
          </span>
        ))}
      </p>
      <p className="mt-5 max-w-[44ch] text-base leading-relaxed">{p.summary[lang]}</p>
      <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 text-[13px]">
        {rows.map((r) => (
          <div key={r.k} className="contents">
            <dt className="text-muted">{r.k}</dt>
            <dd className="tabular-nums">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
