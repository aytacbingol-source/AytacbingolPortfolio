import { notFound } from "next/navigation";
import { BimTools } from "@/components/BimTools";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SectionHead } from "@/components/SectionHead";
import { bimgoalSteps, education, experience, services, software } from "@/lib/content";
import { getDict, isLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";
const offset = "md:grid md:grid-cols-[5rem_1fr]";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  const timeline = (title: string, rows: typeof experience) => (
    <div>
      <h3 className="text-sm text-muted">{title}</h3>
      <ol className="mt-3 border-t border-ink">
        {rows.map((r) => (
          <li key={r.period + r.place} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
            <span className="font-mono text-xs text-muted tabular-nums">{r.period}</span>
            <span>
              {r.title[lang]}
              <span className="block text-sm text-muted">{r.place}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <Hero lang={lang} t={t} />

      {/* 01 Hakkımda */}
      <section id="about" className="scroll-mt-20">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionHead no="01" title={t.about.label} />
          <div className={`mt-10 ${offset}`}>
            <div className="hidden md:block" />
            <div className="grid gap-10 lg:grid-cols-2">
              <p className="max-w-[22ch] text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-4xl">{t.about.title}</p>
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                {t.about.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
                <p className="text-sm">{site.focus.join(" | ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Deneyim & Eğitim */}
      <section id="experience" className="scroll-mt-20 bg-surface">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionHead no="02" title={t.experience.label} />
          <div className={`mt-10 ${offset}`}>
            <div className="hidden md:block" />
            <div className="grid gap-12 md:grid-cols-3">
              {timeline(t.experience.work, experience)}
              {timeline(t.experience.education, education)}
              <div>
                <h3 className="text-sm text-muted">{t.experience.software}</h3>
                <ul className="mt-3 border-t border-ink">
                  {software.map((s) => (
                    <li key={s} className="border-b border-line py-4">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Projeler */}
      <section id="projects" className="scroll-mt-20">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionHead no="03" title={t.projects.label} aside={`(${String(projects.length).padStart(2, "0")})`} />
          <div className="mt-8">
            <ProjectsSection projects={projects} lang={lang} dict={t} />
          </div>
        </div>
      </section>

      {/* 04 BIM & Yazılım */}
      <section id="bim" className="scroll-mt-20 border-t border-line bg-surface">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionHead no="04" title={t.bim.label} />

          <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="flex items-center gap-4 text-6xl font-semibold tracking-[-0.05em] md:text-8xl">
                BIMGoal
                <span className="mt-3 inline-block h-3 w-3 bg-accent md:h-4 md:w-4" aria-hidden="true" />
              </p>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">{t.bim.lead}</p>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
                {[
                  ["12", t.bim.statTools],
                  ["2020–2024", t.bim.statRevit],
                  ["TR · EN", t.bim.statLang],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-3xl font-medium leading-none tracking-[-0.03em] tabular-nums">{v}</dd>
                    <dd className="mt-1.5 text-xs text-muted">{l}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={site.bimgoal}
                target="_blank"
                rel="noreferrer"
                className="accent-btn mt-10 inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium"
              >
                {t.bim.visit}
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M5 11 L11 5 M6 5 H11 V10" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{t.bim.how}</h3>
              <ol className="mt-6">
                {bimgoalSteps.map((st, i) => (
                  <li key={st.title.en} className="relative grid grid-cols-[3rem_minmax(0,1fr)] pb-8 last:pb-0">
                    {i < bimgoalSteps.length - 1 && (
                      <span className="absolute left-[0.6875rem] top-7 bottom-1 w-px bg-line" aria-hidden="true" />
                    )}
                    <span className="relative grid h-6 w-6 place-items-center border border-accent font-mono text-[10px] text-accent tabular-nums">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-lg font-medium leading-6 tracking-[-0.015em]">{st.title[lang]}</p>
                      <p className="mt-1 text-sm text-muted">{st.text[lang]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-20">
            <BimTools lang={lang} t={t.bim} />
          </div>
        </div>
      </section>

      {/* 05 Hizmetler */}
      <section id="services" className="scroll-mt-20">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionHead no="05" title={t.services.label} />
          <div className={`mt-10 ${offset}`}>
            <div className="hidden md:block" />
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.title.en} className="bg-paper p-6 md:p-8">
                  <h3 className="text-xl font-medium tracking-tight">{s.title[lang]}</h3>
                  <p className="mt-3 max-w-[44ch] text-muted">{s.text[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t border-line" />
      <Contact t={t} lang={lang} no="06" />
    </>
  );
}
