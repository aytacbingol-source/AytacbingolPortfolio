"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { factRows } from "./ProjectFacts";

export function imageCount(p: Project) {
  return p.images.length || p.sampleCount || 3;
}

const pad = (n: number) => String(n).padStart(2, "0");

// Tam ekran proje görüntüleyicisi: büyük görsel, sayaç, sağda künye, altta önceki/sonraki proje.
// Klavye: ← → görsel, Alt + ← → proje, ESC kapat. Tarayıcının geri tuşu da kapatır.
export function ProjectViewer({
  projects,
  start,
  lang,
  t,
  onClose,
}: {
  projects: Project[];
  start: { project: number; image: number };
  lang: Locale;
  t: Dict;
  onClose: () => void;
}) {
  const [pi, setPi] = useState(start.project);
  const [ii, setIi] = useState(start.image);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pushed = useRef(false);

  const p = projects[pi];
  const count = imageCount(p);
  const prevP = projects[(pi - 1 + projects.length) % projects.length];
  const nextP = projects[(pi + 1) % projects.length];

  const close = useCallback(() => {
    if (pushed.current) history.back();
    else onClose();
  }, [onClose]);

  const goImage = useCallback((d: number) => setIi((i) => (i + d + count) % count), [count]);
  const goProject = useCallback(
    (d: number) => {
      setPi((i) => (i + d + projects.length) % projects.length);
      setIi(0);
    },
    [projects.length],
  );

  // Geri tuşu ile kapanma, sayfa kaydırmasını kilitleme, odak yönetimi
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    try {
      history.pushState({ viewer: true }, "");
      pushed.current = true;
    } catch {}
    const onPop = () => {
      pushed.current = false;
      onClose();
    };
    addEventListener("popstate", onPop);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      removeEventListener("popstate", onPop);
      html.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (e.altKey) goProject(1);
        else goImage(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (e.altKey) goProject(-1);
        else goImage(-1);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [close, goImage, goProject]);

  const src = p.images[ii];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title[lang]}
      className="viewer fixed inset-0 z-[60] overflow-y-auto bg-[#070707] text-white lg:overflow-hidden"
    >
      <div className="viewer-bg pointer-events-none fixed inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-full max-w-[1600px] grid-rows-[auto_1fr_auto] gap-6 px-5 py-6 md:px-10 lg:h-full">
        {/* Üst: başlık ve kapat */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">{t.viewer.label}</p>
            <h2 key={p.slug} className="viewer-in mt-1 truncate text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              {p.title[lang]}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden font-mono text-[10px] tracking-[0.3em] text-white/45 sm:inline">ESC</span>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label={t.viewer.close}
              className="grid h-10 w-10 place-items-center border border-white/20 hover:border-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Orta: görsel ve künye */}
        <div className="grid min-h-0 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="flex min-h-0 flex-col gap-3">
            <div className="group relative aspect-[16/10] w-full border border-white/15 bg-black lg:aspect-auto lg:min-h-0 lg:flex-1">
              <div key={`${p.slug}-${ii}`} className="viewer-in absolute inset-0">
                {src ? (
                  <Image src={src} alt={`${p.title[lang]} ${ii + 1}`} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-contain" priority />
                ) : (
                  <PhotoPlaceholder seed={`${p.slug}-${ii}`} tone={ii % 3 === 1 ? "mid" : "light"} />
                )}
              </div>
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goImage(-1)}
                    aria-label={t.viewer.prevImage}
                    className="absolute inset-y-0 left-0 grid w-16 place-items-center bg-gradient-to-r from-black/40 to-transparent opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <svg viewBox="0 0 20 20" className="h-6 w-6" aria-hidden="true">
                      <path d="M12 4 L6 10 L12 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => goImage(1)}
                    aria-label={t.viewer.nextImage}
                    className="absolute inset-y-0 right-0 grid w-16 place-items-center bg-gradient-to-l from-black/40 to-transparent opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    <svg viewBox="0 0 20 20" className="h-6 w-6" aria-hidden="true">
                      <path d="M8 4 L14 10 L8 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center justify-center gap-4">
              <p className="font-mono text-xs tracking-[0.3em] text-white/70 tabular-nums" aria-live="polite">
                {pad(ii + 1)} / {pad(count)}
              </p>
            </div>
          </div>

          <aside className="min-h-0 lg:overflow-y-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">{t.viewer.info}</p>
            <ol key={p.slug} className="viewer-in mt-5 space-y-5">
              {factRows(p, lang, t.projects).map((r, i) => (
                <li key={r.k} className="grid grid-cols-[1.75rem_minmax(0,1fr)] border-l border-white/15 pl-3">
                  <span className="pt-0.5 font-mono text-[10px] text-white/40 tabular-nums">{pad(i + 1)}</span>
                  <div>
                    <p className="font-mono text-[11px] tracking-wide text-white/50">{r.k}</p>
                    <p className={`mt-0.5 text-sm ${r.long ? "leading-relaxed text-white/85" : "text-white"}`}>{r.v}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href={`/${lang}/projects/${p.slug}`}
              className="mt-8 inline-block border border-white/25 px-4 py-2.5 text-sm hover:border-white"
            >
              {t.viewer.details}
            </Link>
          </aside>
        </div>

        {/* Alt: önceki / sonraki proje ve kısayollar */}
        <div className="grid grid-cols-2 items-end gap-4 border-t border-white/10 pt-5 md:grid-cols-[1fr_auto_1fr]">
          <button type="button" onClick={() => goProject(-1)} className="group min-w-0 text-left">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">← {t.viewer.prev}</span>
            <span className="mt-1 block truncate text-lg text-white/80 group-hover:text-white md:text-xl">{prevP.title[lang]}</span>
          </button>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 md:block">
            {t.viewer.hints.join("  ·  ")}
          </p>
          <button type="button" onClick={() => goProject(1)} className="group min-w-0 text-right">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">{t.viewer.next} →</span>
            <span className="mt-1 block truncate text-lg text-white/80 group-hover:text-white md:text-xl">{nextP.title[lang]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
