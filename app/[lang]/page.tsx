import { notFound } from "next/navigation";
import { BimTools } from "@/components/BimTools";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SectionHead } from "@/components/SectionHead";
import { bimAreas, education, experience, services, software } from "@/lib/content";
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
            <ProjectsSection projects={projects} lang={lang} t={t.projects} />
          </div>
        </div>
      </section>

      {/* 04 BIM & Yazılım */}
      <section id="bim" className="scroll-mt-20 border-t border-line bg-surface">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionHead no="04" title={t.bim.label} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div>
              <p className="text-5xl font-semibold tracking-[-0.045em] md:text-7xl">BIMGoal</p>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">{t.bim.lead}</p>
              <a
                href={site.bimgoal}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-paper"
              >
                {t.bim.visit}
              </a>
              <h3 className="mt-12 text-sm text-muted">{t.bim.areas}</h3>
              <ul className="mt-3 border-t border-ink">
                {bimAreas.map((a) => (
                  <li key={a.title} className="border-b border-line py-4">
                    <span className="font-medium">{a.title}</span>
                    <span className="mt-1 block text-sm text-muted">{a.text[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm text-muted">{t.bim.tools}</h3>
              <BimTools lang={lang} allLabel={t.bim.all} />
            </div>
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
