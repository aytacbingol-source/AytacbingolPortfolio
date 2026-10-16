import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectFacts } from "@/components/ProjectFacts";
import { DetailMedia } from "@/components/DetailMedia";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { getProject, projects } from "@/lib/projects";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!p || !isLocale(lang)) return {};
  return { title: p.title[lang], description: p.summary[lang] };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const p = getProject(slug);
  if (!p) notFound();
  const t = getDict(lang);

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];



  return (
    <article>
      <div className="mx-auto max-w-[1440px] px-5 pt-12 md:px-10 md:pt-20">
        <Link href={`/${lang}#projects`} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
          {t.projects.back}
        </Link>
        <h1 className="mt-6 max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
          {p.title[lang]}
        </h1>
      </div>

      <DetailMedia slug={p.slug} lang={lang} dict={t} part="cover" />

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-4 md:px-10 md:py-28">
        <div className="md:sticky md:top-24 md:col-span-2 md:self-start">
          <ProjectFacts p={p} lang={lang} t={t.projects} />
        </div>
        <div className="md:col-span-2 md:col-start-3">
          <div className="space-y-6 text-lg leading-relaxed text-muted [&>p:first-child]:text-xl [&>p:first-child]:text-ink">
            {p.body.map((b, i) => (
              <p key={i}>{b[lang]}</p>
            ))}
          </div>
        </div>
      </div>

      <DetailMedia slug={p.slug} lang={lang} dict={t} part="gallery" />

      <Link href={`/${lang}/projects/${next.slug}`} className="group block border-t border-line">
        <div className="mx-auto flex max-w-[1440px] items-baseline justify-between gap-6 px-5 py-12 md:px-10 md:py-16">
          <span className="text-sm text-muted">{t.projects.next}</span>
          <span className="text-right text-3xl font-semibold tracking-[-0.03em] underline-offset-8 group-hover:underline md:text-6xl">
            {next.title[lang]}
          </span>
        </div>
      </Link>
    </article>
  );
}
