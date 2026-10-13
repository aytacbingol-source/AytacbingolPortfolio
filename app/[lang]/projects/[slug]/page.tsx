import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectImage } from "@/components/ProjectImage";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { categories, getProject, offices, projects } from "@/lib/projects";

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

  const facts = [
    { k: t.projects.category, v: categories[p.category][lang] },
    { k: t.projects.year, v: p.year },
    { k: t.projects.location, v: p.location[lang] },
    p.area ? { k: t.projects.area, v: p.area } : null,
    { k: t.projects.office, v: offices[p.office]?.name ?? "" },
    { k: t.projects.role, v: p.role[lang] },
    { k: t.projects.status, v: p.status[lang] },
  ].filter(Boolean) as { k: string; v: string }[];

  const gallery = p.images.slice(1);

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

      <div className="relative mt-12 aspect-[16/10] w-full md:aspect-[21/9]">
        <ProjectImage src={p.images[0]} seed={p.slug} alt={p.title[lang]} priority sizes="100vw" />
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-4 md:px-10 md:py-28">
        <dl className="border-t border-ink md:sticky md:top-24 md:self-start">
          {facts.map((f) => (
            <div key={f.k} className="flex justify-between gap-4 border-b border-line py-3 text-sm">
              <dt className="text-muted">{f.k}</dt>
              <dd className="text-right">{f.v}</dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-2 md:col-start-3">
          <p className="text-2xl leading-snug tracking-tight md:text-3xl">{p.summary[lang]}</p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
            {p.body.map((b, i) => (
              <p key={i}>{b[lang]}</p>
            ))}
          </div>
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 pb-24 md:grid-cols-2 md:px-10">
          {gallery.map((src, i) => (
            <div key={src} className={`relative aspect-[4/3] ${i % 3 === 0 ? "md:col-span-2 md:aspect-[21/9]" : ""}`}>
              <ProjectImage src={src} seed={`${p.slug}-${i}`} alt={`${p.title[lang]} ${i + 2}`} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      )}

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
