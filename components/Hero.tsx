import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Hero({ lang, t }: { lang: Locale; t: Dict }) {
  const cvHref = `mailto:${site.email}?subject=${encodeURIComponent(t.hero.cvSubject)}`;
  return (
    <section id="top" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.0] tracking-[-0.045em]">
          {site.name}
        </h1>
        <p className="mt-4 text-base text-muted md:text-lg">
          {t.role} · {site.focus.slice(0, 3).join(" | ")}
        </p>
        <p className="mt-8 max-w-[36ch] text-xl leading-snug tracking-tight md:text-2xl">
          {t.hero.introLead} <span className="text-muted">{t.hero.introRest}</span>
        </p>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <dl className="flex flex-wrap gap-x-10 gap-y-4">
              {site.stats.map((s) => (
                <div key={s.value + s.label.en}>
                  <dt className="sr-only">{s.label[lang]}</dt>
                  <dd className="text-4xl font-medium leading-none tracking-[-0.03em] tabular-nums">{s.value}</dd>
                  <dd className="mt-1 text-xs text-muted">
                    {s.label[lang].includes("BIMGoal")
                      ? s.label[lang].split("BIMGoal").map((part, i) =>
                          i === 0 ? (
                            part
                          ) : (
                            <span key={i}>
                              <a
                                href={site.bimgoal}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-accent transition-opacity hover:opacity-75"
                              >
                                BIMGoal
                              </a>
                              {part}
                            </span>
                          ),
                        )
                      : s.label[lang]}
                  </dd>
                </div>
              ))}
            </dl>
            {site.available && (
              <p className="mt-6 inline-flex items-center gap-2 border border-line px-3 py-1.5 text-xs text-muted">
                <span className="round h-2 w-2 bg-[#22a35a]" aria-hidden="true" />
                {t.hero.available}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`/${lang}#contact`} className="border border-ink bg-ink px-5 py-3 text-sm text-paper hover:opacity-85">
              {t.hero.talk}
            </a>
            <a href={cvHref} className="border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-paper">
              {t.hero.cv}
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="border border-line px-5 py-3 text-sm hover:border-ink">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
