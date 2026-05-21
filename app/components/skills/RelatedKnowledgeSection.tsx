"use client";

import type { SkillId } from "@/lib/sql-skill-map";
import { getSkill } from "@/lib/sql-skill-map";
import { getSkillProgress } from "@/lib/learner-skill-progress";
import {
    goToLearnModule,
    type InternshipReturnContext,
} from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

type Props = {
    requiredSkills: SkillId[];
    returnContext?: InternshipReturnContext;
    compact?: boolean;
};

export default function RelatedKnowledgeSection({
    requiredSkills,
    returnContext,
    compact = false,
}: Props) {
    if (requiredSkills.length === 0) return null;

    return (
        <section className={compact ? "" : "mt-4"}>
            <p className="text-[10px] font-semibold uppercase text-slate-500 dark:text-zinc-500">
                {vi.links.relatedKnowledge}
            </p>
            <div className={`mt-2 flex flex-wrap gap-2 ${compact ? "" : ""}`}>
                {requiredSkills.map((skillId) => {
                    const skill = getSkill(skillId);
                    const prog = getSkillProgress(skillId);
                    const learnModuleId = skill?.learnModuleId ?? "";
                    const review = prog.progress >= 30;
                    const label = review ? vi.links.reviewAgain : vi.links.learnQuick;

                    return (
                        <div
                            key={skillId}
                            className="flex min-w-[140px] flex-col rounded-lg border border-slate-200 bg-white px-2.5 py-2 dark:border-zinc-800 dark:bg-zinc-950"
                        >
                            <span className="text-xs font-medium text-slate-900 dark:text-white">
                                {skill?.title ?? skillId}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-zinc-500">
                                {prog.progress >= 80
                                    ? `${prog.progress}% · Đã vững`
                                    : prog.progress > 0
                                      ? `${prog.progress}%`
                                      : "Chưa học"}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    goToLearnModule(learnModuleId, returnContext
                                        ? { ...returnContext, targetSkillId: skillId }
                                        : undefined)
                                }
                                className="mt-1.5 text-left text-[10px] font-medium text-violet-600 hover:underline dark:text-indigo-400"
                            >
                                {label}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
