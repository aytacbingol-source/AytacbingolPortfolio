"use client";

import { useCallback, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";
import { ProjectViewer, imageCount } from "./ProjectViewer";

// Proje detay sayfasındaki kapak görseli ve galeri; tıklayınca görüntüleyici açılır.
export function DetailMedia({ slug, lang, dict, part }: { slug: string; lang: Locale; dict: Dict; part: "cover" | "gallery" }) {
  const index = projects.findIndex((x) => x.slug === slug);
  const p = projects[index];
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const count = imageCount(p);

  const viewer =
    open !== null ? (
      <ProjectViewer projects={projects} start={{ project: index, image: open }} lang={lang} t={dict} onClose={close} />
    ) : null;

  if (part === "cover") {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(0)}
          aria-label={`${dict.viewer.open}: ${p.title[lang]}`}
          className="relative mt-12 block aspect-[16/10] w-full cursor-zoom-in overflow-hidden md:aspect-[21/9]"
        >
          <ProjectImage src={p.images[0]} seed={`${p.slug}-0`} alt={p.title[lang]} priority sizes="100vw" />
        </button>
        {viewer}
      </>
    );
  }

  const rest = Array.from({ length: Math.max(0, count - 1) }, (_, i) => i + 1);
  if (!rest.length) return null;
  return (
    <>
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 pb-24 md:grid-cols-2 md:px-10">
        {rest.map((i, k) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${dict.viewer.open}: ${p.title[lang]} ${i + 1}`}
            className={`relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-surface ${k % 3 === 0 ? "md:col-span-2 md:aspect-[21/9]" : ""}`}
          >
            <ProjectImage
              src={p.images[i]}
              seed={`${p.slug}-${i}`}
              tone={i % 3 === 1 ? "mid" : "light"}
              alt={`${p.title[lang]} ${i + 1}`}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </button>
        ))}
      </div>
      {viewer}
    </>
  );
}
