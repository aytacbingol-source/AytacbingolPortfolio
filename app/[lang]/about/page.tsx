import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { education, experience, software } from "@/lib/content";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "tr").about.title };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  const timeline = (title: string, rows: typeof experience) => (
    <div>
      <h2 className="text-sm text-muted">{title}</h2>
      <ol className="mt-4 border-t border-ink">
        {rows.map((r) => (
          <li key={r.period + r.place} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
            <span className="text-sm tabular-nums text-muted">{r.period}</span>
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
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 md:px-10 md:pt-24">
        <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl">{t.about.title}</h1>

        <div className="mt-14 grid gap-12 md:grid-cols-4">
          {/* Profil fotoğrafı: /public/profile.jpg ekleyip buraya next/image koyabilirsin */}
          <div className="aspect-[3/4] bg-surface md:col-span-1" aria-hidden="true" />
          <div className="space-y-6 md:col-span-2 md:col-start-3">
            {t.about.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "text-2xl leading-snug tracking-tight md:text-3xl" : "text-lg leading-relaxed text-muted"}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-14 md:grid-cols-3">
          {timeline(t.about.experience, experience)}
          {timeline(t.about.education, education)}
          <div>
            <h2 className="text-sm text-muted">{t.about.software}</h2>
            <ul className="mt-4 border-t border-ink">
              {software.map((s) => (
                <li key={s} className="border-b border-line py-4">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Contact t={t} />
    </>
  );
}
