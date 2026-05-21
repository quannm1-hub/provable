"use client";

import {
    Award,
    Copy,
    FileText,
    Home,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { INTERNSHIP_META } from "@/lib/internship";
import { NOVATECH_PROGRAM } from "@/lib/internship-detail";
import { vi } from "@/lib/vi";

type Props = {
    scores: {
        sqlFundamentals: number;
        querySafety: number;
        businessUnderstanding: number;
        overall: number;
    };
    onReview: () => void;
    onRestart: () => void;
    onDashboard: () => void;
    onExplore?: () => void;
};

function ScoreBar({ label, value }: { label: string; value: number }) {
    return (
        <div>
            <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400">{label}</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{value}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 dark:from-indigo-600 dark:to-emerald-500"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

export default function InternshipComplete({
    scores,
    onReview,
    onRestart,
    onDashboard,
    onExplore,
}: Props) {
    const p = NOVATECH_PROGRAM;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6 dark:from-zinc-950 dark:to-zinc-900">
            <div className="mx-auto max-w-2xl">
                <p className="text-center text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {vi.internship.complete.title}
                </p>
                <h1 className="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white">
                    {vi.internship.complete.subtitle}
                </h1>
                <div className="relative mt-10 overflow-hidden rounded-2xl border-2 border-amber-200/80 bg-white p-8 shadow-xl dark:border-amber-800/40 dark:bg-zinc-900">
                    <div className="absolute right-4 top-4 opacity-20">
                        <Sparkles className="h-16 w-16 text-amber-400" />
                    </div>
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Provable
                    </p>
                    <p className="mt-2 text-center text-lg font-bold text-slate-900 dark:text-white">
                        {p.company} {p.programTitleEn}
                    </p>
                    <div className="mt-6 space-y-2 border-t border-b border-slate-100 py-4 text-sm dark:border-zinc-800">
                        <div className="flex justify-between">
                            <span className="text-slate-500">{vi.internship.complete.learner}</span>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {vi.internship.complete.learnerName}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">{vi.internship.complete.role}</span>
                            <span className="font-medium text-slate-900 dark:text-white">{p.role}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">{vi.internship.complete.status}</span>
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                {vi.internship.complete.statusDone}
                            </span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="shrink-0 text-slate-500">
                                {vi.internship.complete.skills}
                            </span>
                            <span className="text-right font-medium text-slate-900 dark:text-white">
                                SQL, Data Inspection, Filtering, Query Safety, Business Reasoning
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-950/20">
                        <Award className="h-6 w-6 text-amber-500" />
                        <span className="font-semibold text-amber-800 dark:text-amber-200">
                            {INTERNSHIP_META.badge}
                        </span>
                    </div>
                </div>

                <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/80">
                    <ScoreBar label={vi.internship.complete.sqlScore} value={scores.sqlFundamentals} />
                    <ScoreBar label={vi.internship.complete.safetyScore} value={scores.querySafety} />
                    <ScoreBar
                        label={vi.internship.complete.businessScore}
                        value={scores.businessUnderstanding}
                    />
                    <ScoreBar label={vi.internship.complete.readiness} value={scores.overall} />
                    <p className="text-center text-xs text-slate-500 dark:text-zinc-500">
                        {vi.internship.complete.readinessLevel}
                    </p>
                </div>

                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <p className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        <Copy className="h-3.5 w-3.5" />
                        {vi.internship.complete.cvHint}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                        {vi.internship.complete.cvText}
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={onReview}
                        className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                    >
                        <FileText className="h-4 w-4" />
                        {vi.internship.complete.reviewModels}
                    </button>
                    <button
                        type="button"
                        onClick={onRestart}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300"
                    >
                        <RotateCcw className="h-4 w-4" />
                        {vi.internship.complete.reviewTasks}
                    </button>
                    <button
                        type="button"
                        onClick={onDashboard}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300"
                    >
                        <Home className="h-4 w-4" />
                        {vi.internship.complete.backDashboard}
                    </button>
                    {onExplore && (
                        <button
                            type="button"
                            onClick={onExplore}
                            className="text-center text-sm text-violet-600 hover:underline dark:text-indigo-400"
                        >
                            {vi.internship.complete.exploreMore}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
