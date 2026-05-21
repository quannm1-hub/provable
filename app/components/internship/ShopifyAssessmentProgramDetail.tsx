"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    Clock,
    FileArchive,
    Play,
    Upload,
} from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import CoccocDeProgramContextTabs from "@/app/components/internship/CoccocDeProgramContextTabs";
import {
    COCCOC_DE_ACCEPTED_FORMATS,
    COCCOC_DE_ASSESSMENT_PROGRAM,
    COCCOC_DE_EXPECTED_PACKAGE,
    COCCOC_DE_PASS_CRITERIA,
    COCCOC_DE_PIPELINE_STEPS,
    COCCOC_DE_TASK,
} from "@/lib/coccoc-de-assessment";
import { DEMO_FILE_HINTS } from "@/lib/assessment-evaluator";

type Props = {
    onBack: () => void;
    onStart: () => void;
};

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
            {children}
        </h3>
    );
}

export default function ShopifyAssessmentProgramDetail({ onBack, onStart }: Props) {
    const p = COCCOC_DE_ASSESSMENT_PROGRAM;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-6xl px-4 py-6 pb-10">
                <div className="flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh mục
                    </button>
                    <ThemeToggle compact />
                </div>

                {/* Hero */}
                <header className="mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div className="min-w-0">
                            <Link
                                href="/companies/coccoc"
                                className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                            >
                                {p.company}
                            </Link>
                            <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                                {p.vietnameseTitle}
                            </h1>
                            <p className="mt-1 text-xs text-slate-400">{p.programTitleEn}</p>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                                {p.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                                    {p.role}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                                    <Clock className="h-3 w-3" />
                                    {p.estimatedTime}
                                </span>
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                                    {p.difficulty}
                                </span>
                            </div>
                        </div>
                        <div className="flex shrink-0 flex-col gap-3 sm:min-w-[220px]">
                            <button
                                type="button"
                                onClick={onStart}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 dark:shadow-emerald-900/30"
                            >
                                <Play className="h-4 w-4" />
                                Bắt đầu
                            </button>
                            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-950/50">
                                <div>
                                    <dt className="text-slate-400">Team</dt>
                                    <dd className="font-medium text-slate-700 dark:text-zinc-300">
                                        {p.team}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400">Hình thức</dt>
                                    <dd className="font-medium text-slate-700 dark:text-zinc-300">
                                        Upload · Review
                                    </dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="text-slate-400">Ngưỡng đạt</dt>
                                    <dd className="font-medium text-emerald-700 dark:text-emerald-400">
                                        ≥ {p.passThreshold}%
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </header>

                {/* Giới thiệu */}
                <div className="mt-5">
                    <CoccocDeProgramContextTabs />
                </div>

                {/* Hướng dẫn nộp bài — một khối, bố cục 2 cột */}
                

                <div className="mt-5 flex justify-center lg:hidden">
                    <button
                        type="button"
                        onClick={onStart}
                        className="flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
                    >
                        <Play className="h-4 w-4" />
                        Bắt đầu chấm thử
                    </button>
                </div>
            </main>
        </div>
    );
}
