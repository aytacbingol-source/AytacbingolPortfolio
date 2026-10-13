import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({ t }: { t: Dict }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><a className="hover:text-ink" href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a className="hover:text-ink" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a className="hover:text-ink" href={site.bimgoal} target="_blank" rel="noreferrer">BIMGoal</a></li>
        </ul>
      </div>
    </footer>
  );
}
