"use client";

import Link from "next/link";
import { Award, BookOpen, Briefcase, Home } from "lucide-react";
import {
    buildCompanyReturnUrl,
    buildInternshipReturnUrl,
} from "@/lib/skill-navigation";
import type { LearnReturnContext } from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

type Props = {
    readiness: number;
    modulesCompleted: number;
    returnContext?: LearnReturnContext | null;
};

export default function LearningComplete({
    readiness,
    modulesCompleted,
    returnContext,
}: Props) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 dark:bg-zinc-950">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-zinc-800 dark:bg-zinc-900/80">
                <Award className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                    {vi.learn.complete.title}
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                    {vi.learn.complete.subtitle}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
                        <p className="text-xs text-slate-500 dark:text-zinc-500">
                            {vi.learn.complete.modulesDone}
                        </p>
                        <p className="text-xl font-semibold text-slate-900 dark:text-white">
                            {modulesCompleted}
                        </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
                        <p className="text-xs text-slate-500 dark:text-zinc-500">
                            {vi.learn.complete.score}
                        </p>
                        <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                            {readiness}%
                        </p>
                    </div>
                </div>

                <p className="mt-6 rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-900 dark:border-indigo-800/40 dark:bg-indigo-950/30 dark:text-indigo-200">
                    {vi.learn.complete.nextStep}
                </p>

                <div className="mt-8 flex flex-col gap-2">
                    {returnContext && (
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href =
                                    returnContext.from === "company-profile"
                                        ? buildCompanyReturnUrl(returnContext.companyId)
                                        : buildInternshipReturnUrl(returnContext);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
                        >
                            <Briefcase className="h-4 w-4" />
                            {returnContext.from === "company-profile"
                                ? `Quay lại ${returnContext.companyName}`
                                : vi.links.backToTask}
                        </button>
                    )}
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    >
                        <Home className="h-4 w-4" />
                        {vi.learn.complete.backDashboard}
                    </Link>
                    <Link
                        href="/internships"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        <Briefcase className="h-4 w-4" />
                        {vi.learn.complete.exploreInternships}
                    </Link>
                    <Link
                        href="/learn/sql"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        <BookOpen className="h-4 w-4" />
                        {vi.learn.complete.reviewSql}
                    </Link>
                </div>
            </div>
        </div>
    );
}
