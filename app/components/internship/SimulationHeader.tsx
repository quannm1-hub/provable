"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import { companyProfileHref } from "@/lib/companies";
import { NOVATECH_PROGRAM } from "@/lib/internship-detail";
import { saveSimulationResume } from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

type Props = {
    taskTitle: string;
    taskProgress: string;
    completedTasks: number;
    totalTasks: number;
    onBack: () => void;
    companyId?: string;
    taskId?: string;
    activeTab?: string;
    sqlInput?: string;
};

export default function SimulationHeader({
    taskTitle,
    taskProgress,
    completedTasks,
    totalTasks,
    onBack,
    companyId = "coccoc",
    taskId,
    activeTab,
    sqlInput,
}: Props) {
    const p = NOVATECH_PROGRAM;
    const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const companyHref =
        taskId != null
            ? companyProfileHref(companyId, {
                  from: "simulation",
                  task: taskId,
                  internshipId: p.id,
                  programHref: "/internships/coccoc",
                  ...(activeTab ? { activeTab } : {}),
              })
            : `/companies/${companyId}`;

    function handleCompanyNavigate() {
        if (taskId) {
            saveSimulationResume({
                from: "simulation",
                internshipId: p.id,
                programHref: "/internships/coccoc",
                taskId,
                activeTab,
                sqlInput,
            });
        }
    }

    return (
        <header className="shrink-0 border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-14 items-center justify-between gap-4 px-4">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {vi.internship.backToProgram}
                    </button>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                        {p.initials}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-xs text-slate-500 dark:text-zinc-500">
                            <Link
                                href={companyHref}
                                onClick={handleCompanyNavigate}
                                className="font-medium text-violet-700 hover:underline dark:text-indigo-300"
                            >
                                {p.company}
                            </Link>
                            <span> · {p.programTitleEn}</span>
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {taskProgress}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-[10px] text-slate-400 dark:text-zinc-600">Tiến độ</p>
                        <p className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                            {completedTasks}/{totalTasks} task · {pct}%
                        </p>
                    </div>
                    <ThemeToggle compact />
                </div>
            </div>
            <p className="border-t border-slate-100 px-4 py-1.5 text-xs text-violet-700 dark:border-zinc-900 dark:text-indigo-300">
                {taskTitle}
            </p>
        </header>
    );
}
