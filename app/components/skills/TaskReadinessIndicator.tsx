"use client";

import type { SkillId } from "@/lib/sql-skill-map";
import { calculateTaskReadiness } from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

type Props = {
    requiredSkills: SkillId[];
};

export default function TaskReadinessIndicator({ requiredSkills }: Props) {
    const r = calculateTaskReadiness(requiredSkills);
    if (requiredSkills.length === 0) return null;

    const barColor =
        r.percent >= 80
            ? "bg-emerald-500"
            : r.percent >= 40
              ? "bg-amber-500"
              : "bg-violet-500";

    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-zinc-300">
                    {vi.links.readiness}: {r.percent}%
                </span>
                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        r.percent >= 80
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : r.percent >= 40
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                              : "bg-violet-100 text-violet-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                    }`}
                >
                    {r.label}
                </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${r.percent}%` }}
                />
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
                {r.skills.map((s) => (
                    <span
                        key={s.skillId}
                        className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600 dark:border-zinc-700 dark:text-zinc-400"
                    >
                        {s.title}: {s.chipLabel}
                    </span>
                ))}
            </div>
            <p className="mt-2 text-[10px] text-slate-500 dark:text-zinc-500">
                {vi.links.canStartAnyway}
            </p>
        </div>
    );
}
