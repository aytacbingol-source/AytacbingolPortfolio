import Link from "next/link";
import { notFound } from "next/navigation";
import { AxisHero } from "@/components/AxisHero";
import { Contact } from "@/components/Contact";
import { ProjectCard } from "@/components/ProjectCard";
import { bimAreas } from "@/lib/content";
import { getDict, isLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <AxisHero lang={lang} t={t} />

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{t.home.selected}</h2>
          <Link href={`/${lang}/projects`} className="shrink-0 text-sm underline underline-offset-4">
            {t.home.allProjects}
          </Link>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} p={p} lang={lang} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-4 md:px-10 md:py-32">
          <div className="md:col-span-2">
            <h2 className="max-w-[16ch] text-3xl font-semibold leading-[1] tracking-[-0.03em] md:text-5xl">
              {t.home.bimTitle}
            </h2>
            <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-muted">{t.home.bimText}</p>
            <Link
              href={`/${lang}/bim`}
              className="mt-10 inline-block border border-ink px-5 py-3 text-sm hover:bg-ink hover:text-paper"
            >
              {t.home.bimLink}
            </Link>
          </div>
          <ul className="border-t border-ink md:col-span-2">
            {bimAreas.map((a) => (
              <li key={a.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <span className="font-medium">{a.title}</span>
                <span className="text-muted">{a.text[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact t={t} />
    </>
  );
}
