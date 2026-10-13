import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Hero, Revit'teki aks sistemiyle çerçevelenir: 1–5 dikey akslar, A–B yatay akslar.
// Yatay akslar içerik bloğunun üstüne ve altına oturur, böylece yazının üstünden geçmez.
const vAxes = [0, 25, 50, 75, 100];

function Bubble({ label, className, style }: { label: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`round anim-appear absolute grid h-7 w-7 place-items-center border border-axis bg-paper text-[11px] tabular-nums text-muted ${className ?? ""}`}
      style={style}
    >
      {label}
    </span>
  );
}

function HAxis({ label, className, delay }: { label: string; className: string; delay: number }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute -left-5 -right-5 md:-left-10 md:-right-10 ${className}`}>
      <div className="axis-h anim-draw-right ml-9 md:ml-14" style={{ animationDelay: `${delay}ms` }} />
      <Bubble label={label} className="left-1 top-0 -translate-y-1/2 md:left-3" style={{ animationDelay: `${delay + 200}ms` }} />
    </div>
  );
}

export function AxisHero({ lang, t }: { lang: Locale; t: Dict }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Dikey akslar */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-5 right-5 md:left-10 md:right-10">
          {vAxes.map((x, i) => (
            <div key={x} className={`absolute inset-y-0 ${i % 2 === 1 ? "hidden md:block" : ""}`} style={{ left: `${x}%` }}>
              <Bubble label={String(i + 1)} className="top-5 -translate-x-1/2" style={{ animationDelay: `${150 + i * 80}ms` }} />
              <div className="axis-v anim-draw-down absolute bottom-0 top-12" style={{ animationDelay: `${i * 80}ms` }} />
            </div>
          ))}
        </div>

        <div className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-8 pt-20">
          <div className="relative py-12 md:py-16">
            <HAxis label="A" className="top-0" delay={300} />
            <HAxis label="B" className="bottom-0" delay={420} />

            <h1
              className="anim-appear text-[clamp(3.5rem,12vw,11rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
              style={{ animationDelay: "650ms" }}
            >
              Aytaç
              <br />
              Bingöl
            </h1>
            <div className="anim-appear mt-10 grid gap-6 md:grid-cols-4" style={{ animationDelay: "850ms" }}>
              <p className="text-sm text-muted">
                {t.role}
                <br />
                {site.domain}
              </p>
              <div className="md:col-span-2 md:col-start-3">
                <p className="max-w-[34ch] text-xl leading-snug tracking-tight md:text-2xl">{t.hero.intro}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted">{site.focus.join(" | ")}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href={`/${lang}/projects`}
              className="anim-appear relative border border-ink bg-paper px-5 py-3 text-sm hover:bg-ink hover:text-paper"
              style={{ animationDelay: "1000ms" }}
            >
              {t.hero.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
