import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { bimAreas, bimgoalTools } from "@/lib/content";
import { getDict, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "tr").bim.title };
}

export default async function BimPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-24">
        <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl">{t.bim.title}</h1>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-4">
          <p className="text-sm text-muted">{site.focus.join(" | ")}</p>
          <p className="max-w-[40ch] text-2xl leading-snug tracking-tight md:col-span-2 md:col-start-3 md:text-3xl">
            {t.bim.lead}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <h2 className="text-sm text-muted">{t.bim.areas}</h2>
        <div className="mt-6 grid border-t border-ink md:grid-cols-3">
          {bimAreas.map((a) => (
            <div key={a.title} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
              <h3 className="text-2xl font-medium tracking-tight">{a.title}</h3>
              <p className="mt-4 max-w-[36ch] text-muted">{a.text[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-4 md:px-10 md:py-32">
          <div className="md:col-span-2">
            <h2 className="text-6xl font-semibold tracking-[-0.045em] md:text-9xl">{t.bim.bimgoalTitle}</h2>
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed opacity-70">{t.bim.bimgoalText}</p>
            <a
              href={site.bimgoal}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block border border-paper px-5 py-3 text-sm hover:bg-paper hover:text-ink"
            >
              {t.bim.visit}
            </a>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm opacity-60">{t.bim.tools}</h3>
            <ul className="mt-4 border-t border-paper">
              {bimgoalTools.map((tool) => (
                <li key={tool.name.en} className="grid gap-2 border-b border-paper/25 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <span className="font-medium">{tool.name[lang]}</span>
                  <span className="opacity-70">{tool.text[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact t={t} />
    </>
  );
}
