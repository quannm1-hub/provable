"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import { PM_INTERVIEW_PROGRAM } from "@/lib/pm-internship-detail";
import { vi } from "@/lib/vi";

type Props = {
    onBack: () => void;
    taskTitle: string;
    passed?: boolean;
};

export default function PmSimulationHeader({ onBack, taskTitle, passed }: Props) {
    const p = PM_INTERVIEW_PROGRAM;
    return (
        <header className="shrink-0 border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-14 items-center justify-between gap-4 px-4">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {vi.internship.backToProgram}
                    </button>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                        {p.initials}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-xs text-slate-500">
                            <Link
                                href="/companies/novatech"
                                className="font-medium text-violet-700 hover:underline dark:text-indigo-300"
                            >
                                {p.company}
                            </Link>
                            <span> · Interview Simulation</span>
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {p.role}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {passed && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                            Đã pass
                        </span>
                    )}
                    <ThemeToggle compact />
                </div>
            </div>
            <p className="border-t border-slate-100 px-4 py-1.5 text-xs text-violet-700 dark:border-zinc-900 dark:text-indigo-300">
                {taskTitle}
            </p>
        </header>
    );
}
