"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { categories, type Category, type Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter({
  projects,
  lang,
  labels,
}: {
  projects: Project[];
  lang: Locale;
  labels: { all: string; empty: string };
}) {
  const [active, setActive] = useState<Category | "all">("all");
  const list = active === "all" ? projects : projects.filter((p) => p.category === active);
  const count = (c: Category) => projects.filter((p) => p.category === c).length;

  const options: { key: Category | "all"; label: string; n: number }[] = [
    { key: "all", label: labels.all, n: projects.length },
    ...(Object.keys(categories) as Category[]).map((c) => ({ key: c, label: categories[c][lang], n: count(c) })),
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
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

      {list.length === 0 ? (
        <p className="mt-16 text-muted">{labels.empty}</p>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} p={p} lang={lang} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
