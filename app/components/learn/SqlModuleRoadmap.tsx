"use client";

import { useState } from "react";
import KnowledgeMapModal from "@/app/components/skills/KnowledgeMapModal";
import { SQL_LEARN_MODULES } from "@/lib/sql-skill-map";
import { getSkillProgress } from "@/lib/learner-skill-progress";
import { goToLearnModule } from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

export default function SqlModuleRoadmap() {
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase text-slate-500 dark:text-zinc-500">
                    Lộ trình SQL cơ bản · {SQL_LEARN_MODULES.length} phần
                </p>
                <button
                    type="button"
                    onClick={() => setMapOpen(true)}
                    className="text-[10px] font-medium text-violet-600 hover:underline dark:text-indigo-400"
                >
                    {vi.links.viewKnowledgeMap}
                </button>
            </div>
            <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                {SQL_LEARN_MODULES.map((m, i) => {
                    const prog = getSkillProgress(m.skillId);
                    return (
                        <li
                            key={m.id}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300"
                        >
                            <span className="w-4 shrink-0 text-slate-400">{i + 1}.</span>
                            <span className="flex-1">
                                <button
                                    type="button"
                                    onClick={() => goToLearnModule(m.id)}
                                    className="text-left font-medium hover:text-violet-600 dark:hover:text-indigo-400"
                                >
                                    {m.title}
                                </button>
                                <span className="ml-2 text-[10px] text-slate-400">
                                    {prog.progress}% ·{" "}
                                    {m.status === "available"
                                        ? "Có sẵn"
                                        : m.status === "preview"
                                          ? "Xem trước"
                                          : "Sắp ra mắt"}
                                </span>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <KnowledgeMapModal open={mapOpen} onClose={() => setMapOpen(false)} />
        </div>
    );
}
