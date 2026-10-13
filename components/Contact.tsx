import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { CopyEmail } from "./CopyEmail";
import { SectionHead } from "./SectionHead";

export function Contact({ t, lang, no }: { t: Dict; lang: Locale; no: string }) {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead no={no} title={t.contact.label} />
        <div className="mt-10 grid gap-10 md:grid-cols-[5rem_1fr_1fr]">
          <div className="hidden md:block" />
          <div>
            <p className="max-w-[18ch] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">{t.contact.title}</p>
            <p className="mt-6 max-w-[44ch] text-lg text-muted">{t.contact.text}</p>
          </div>
          <dl className="space-y-6 md:pt-2">
            <div>
              <dt className="text-sm text-muted">{t.contact.email}</dt>
              <dd className="mt-2"><CopyEmail email={site.email} labels={t.contact} /></dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.contact.location}</dt>
              <dd className="mt-1 text-lg">{site.location[lang]}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t.contact.links}</dt>
              <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-lg">
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">LinkedIn</a>
                <a href={site.bimgoal} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">bimgoal.tools</a>
                <a href={site.bimgoalLinkedin} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">BIMGoal LinkedIn</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
