import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectFilter } from "@/components/ProjectFilter";
import { getDict, isLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "tr").projects.title };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-32 pt-16 md:px-10 md:pt-24">
      <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl">{t.projects.title}</h1>
      <div className="mt-12 md:mt-16">
        <ProjectFilter projects={projects} lang={lang} labels={{ all: t.projects.all, empty: t.projects.empty }} />
      </div>
    </div>
  );
}
