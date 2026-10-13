import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Contact({ t }: { t: Dict }) {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-4 md:px-10 md:py-32">
        <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.03em] md:col-span-2 md:text-6xl">
          {t.contact.title}
        </h2>
        <div className="md:col-span-2 md:pt-2">
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{t.contact.text}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-2xl tracking-tight underline decoration-line underline-offset-8 hover:decoration-ink md:text-3xl"
          >
            {site.email}
          </a>
          <p className="mt-6 flex gap-6 text-sm">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">LinkedIn</a>
            <a href={site.bimgoalLinkedin} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">BIMGoal LinkedIn</a>
          </p>
        </div>
      </div>
    </section>
  );
}
