"use client";

import { X } from "lucide-react";
import { SQL_SKILL_MAP } from "@/lib/sql-skill-map";
import { getSkillProgress } from "@/lib/learner-skill-progress";
import { getTasksUsingSkill } from "@/lib/internship-tasks-catalog";
import { goToLearnModule } from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function KnowledgeMapModal({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="scrollbar-none max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {vi.links.knowledgeMap}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="space-y-4 p-5">
                    {SQL_SKILL_MAP.map((skill) => {
                        const prog = getSkillProgress(skill.skillId);
                        const tasks = getTasksUsingSkill(skill.skillId);
                        return (
                            <div
                                key={skill.skillId}
                                className="rounded-xl border border-slate-200 p-4 dark:border-zinc-800"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {skill.title}
                                        </h3>
                                        <p className="text-xs text-slate-500">{skill.description}</p>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                        {prog.progress}%
                                    </span>
                                </div>
                                <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                                    <div
                                        className="h-full bg-violet-500"
                                        style={{ width: `${prog.progress}%` }}
                                    />
                                </div>
                                {tasks.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-[10px] font-medium uppercase text-slate-400">
                                            {vi.links.skillUsedIn}
                                        </p>
                                        <ul className="mt-1 space-y-1">
                                            {tasks.map((t) => (
                                                <li
                                                    key={t.id}
                                                    className="text-xs text-slate-600 dark:text-zinc-400"
                                                >
                                                    · {t.company}: {t.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => goToLearnModule(skill.learnModuleId)}
                                    className="mt-2 text-xs font-medium text-violet-600 hover:underline dark:text-indigo-400"
                                >
                                    {prog.progress >= 30 ? vi.links.reviewAgain : vi.links.learnQuick}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
