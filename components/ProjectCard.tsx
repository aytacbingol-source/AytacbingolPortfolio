import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { categories, type Project } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";

export function ProjectCard({ p, lang, priority }: { p: Project; lang: Locale; priority?: boolean }) {
  return (
    <Link href={`/${lang}/projects/${p.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectImage src={p.images[0]} seed={p.slug} alt={p.title[lang]} priority={priority} />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight underline-offset-4 group-hover:underline">
          {p.title[lang]}
        </h3>
        <span className="shrink-0 text-sm tabular-nums text-muted">{p.year}</span>
      </div>
      <p className="mt-1 text-sm text-muted">
        {categories[p.category][lang]}, {p.location[lang]}
      </p>
    </Link>
  );
}
