import { bimgoalTools, toolCategories, type ToolCategory } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// BIMGoal araçları: iki küçük başlık altında sade kartlar
export function BimTools({ lang }: { lang: Locale }) {
  const groups = Object.keys(toolCategories) as ToolCategory[];
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div key={g}>
          <h3 className="text-sm text-muted">{toolCategories[g][lang]}</h3>
          <ul className="mt-4 grid border-l border-t border-line sm:grid-cols-2">
            {bimgoalTools
              .filter((x) => x.category === g)
              .map((tool) => (
                <li key={tool.name} className="flex flex-col gap-2 border-b border-r border-line bg-paper p-5">
                  <span className="text-lg font-medium tracking-tight">{tool.name}</span>
                  <span className="text-sm text-muted">{tool.text[lang]}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
