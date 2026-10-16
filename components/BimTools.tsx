import { bimgoalTools, toolCategories, toolCategoryText, type ToolCategory } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// BIMGoal araç grupları: başlık, kısa açıklama ve gruptaki araçların adları
export function BimTools({ lang }: { lang: Locale }) {
  const groups = Object.keys(toolCategories) as ToolCategory[];
  return (
    <div className="border-t border-ink">
      {groups.map((g) => {
        const names = bimgoalTools.filter((x) => x.category === g).map((x) => x.name);
        return (
          <div key={g} className="grid gap-3 border-b border-line py-7 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
            <h3 className="text-lg font-medium tracking-tight">
              {toolCategories[g][lang]}
              <span className="ml-2 text-sm font-normal text-muted tabular-nums">{names.length}</span>
            </h3>
            <div>
              <p className="max-w-[56ch] leading-relaxed text-muted">{toolCategoryText[g][lang]}</p>
              <p className="mt-4 text-sm">{names.join(", ")}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
