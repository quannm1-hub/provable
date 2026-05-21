"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import KnowledgeMapModal from "@/app/components/skills/KnowledgeMapModal";
import { buildLearnUrl } from "@/lib/skill-navigation";
import type { SkillId } from "@/lib/sql-skill-map";

export type ProfileSkillView = {
    skillId: SkillId;
    title: string;
    progress: number;
    statusLabel: string;
    lastPracticed: string;
    taskCount: number;
    learnModuleId?: string;
};

type Props = {
    skill: ProfileSkillView;
};

export default function SkillProfileCard({ skill }: Props) {
    const [mapOpen, setMapOpen] = useState(false);
    const learnHref = skill.learnModuleId
        ? buildLearnUrl(skill.learnModuleId)
        : "/learn/sql";

    const primaryAction =
        skill.progress >= 80
            ? { label: "Xem task liên quan", onClick: () => setMapOpen(true) }
            : skill.progress > 0
              ? { label: "Ôn lại", href: learnHref }
              : { label: "Học tiếp", href: learnHref };

    return (
        <>
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{skill.title}</h4>
                    <span className="text-sm font-bold text-violet-600 dark:text-indigo-400">
                        {skill.progress}%
                    </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-violet-500 transition-all dark:bg-indigo-500"
                        style={{ width: `${skill.progress}%` }}
                    />
                </div>
                <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    {skill.statusLabel}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-500">
                    {skill.progress >= 80 ? "Đã luyện " : ""}
                    {skill.lastPracticed}
                    {skill.taskCount > 0 && ` · ${skill.taskCount} task mô phỏng`}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {primaryAction.href ? (
                        <Link href={primaryAction.href}>
                            <Button variant="primary" size="sm">
                                {primaryAction.label}
                            </Button>
                        </Link>
                    ) : (
                        <Button variant="primary" size="sm" onClick={primaryAction.onClick}>
                            {primaryAction.label}
                        </Button>
                    )}
                    {skill.progress > 0 && skill.progress < 80 && (
                        <Button variant="ghost" size="sm" onClick={() => setMapOpen(true)}>
                            Xem task liên quan
                        </Button>
                    )}
                </div>
            </div>
            <KnowledgeMapModal open={mapOpen} onClose={() => setMapOpen(false)} />
        </>
    );
}
