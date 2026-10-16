import { bimgoalTools, toolCategories, type ToolCategory } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

// BIMGoal araçları: iki grup başlığı altında kartlar. Kart numaraları bimgoal.tools'taki sırayla aynı.
export function BimTools({ lang, t }: { lang: Locale; t: Dict["bim"] }) {
  const groups = Object.keys(toolCategories) as ToolCategory[];
  return (
    <div className="space-y-14">
      {groups.map((g) => {
        const items = bimgoalTools.map((tool, i) => ({ ...tool, no: i + 1 })).filter((x) => x.category === g);
        return (
          <div key={g}>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
              <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{toolCategories[g][lang]}</h3>
              <span className="font-mono text-xs text-muted tabular-nums">{pad(items.length)}</span>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tool) => (
                <li key={tool.name}>
                  <a
                    href={site.bimgoal}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${tool.name}: ${t.open}`}
                    className="tool-card group relative flex h-full min-h-[11rem] flex-col overflow-hidden border border-line bg-paper p-5"
                  >
                    <div className="relative flex items-center justify-between font-mono text-[11px] text-muted">
                      <span className="tabular-nums transition-colors group-hover:text-accent">
                        {pad(tool.no)} / {pad(bimgoalTools.length)}
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <path d="M5 11 L11 5 M6 5 H11 V10" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </div>
                    <div className="relative mt-10">
                      <p className="text-2xl font-medium tracking-[-0.03em] transition-colors group-hover:text-accent">{tool.name}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{tool.text[lang]}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
