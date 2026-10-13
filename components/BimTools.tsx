"use client";

import { useState } from "react";
import { bimgoalTools, toolCategories, type ToolCategory } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function BimTools({ lang, allLabel }: { lang: Locale; allLabel: string }) {
  const [active, setActive] = useState<ToolCategory | "all">("all");
  const cats = Object.keys(toolCategories) as ToolCategory[];
  const list = active === "all" ? bimgoalTools : bimgoalTools.filter((x) => x.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="BIMGoal">
        {(["all", ...cats] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`border px-3 py-1.5 text-sm ${active === c ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
          >
            {c === "all" ? allLabel : toolCategories[c][lang]}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {list.map((tool) => (
          <li key={tool.name.en} className="flex flex-col gap-3 border-b border-r border-line bg-paper p-5">
            <span className="text-xs text-muted">{toolCategories[tool.category][lang]}</span>
            <span className="text-lg font-medium tracking-tight">{tool.name[lang]}</span>
            <span className="text-sm text-muted">{tool.text[lang]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
