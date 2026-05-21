"use client";

import { SCORE_TONE_CLASS, scoreTone } from "@/lib/assessment-report-analytics";

type Props = {
    categories: { label: string; score: number }[];
    passThreshold: number;
    overallScore: number;
};

export default function AssessmentBenchmarkChart({
    categories,
    passThreshold,
    overallScore,
}: Props) {
    return (
        <div className="space-y-4">
            <div className="relative h-8 overflow-hidden rounded-lg bg-slate-100 dark:bg-zinc-800">
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-violet-500 z-10"
                    style={{ left: `${passThreshold}%` }}
                    title={`Ngưỡng đạt ${passThreshold}%`}
                />
                <div
                    className="h-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
                    style={{ width: `${overallScore}%` }}
                />
                <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow"
                >
                    {overallScore}%
                </span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
                <span>0</span>
                <span className="text-violet-600 dark:text-violet-400">
                    Ngưỡng {passThreshold}%
                </span>
                <span>100</span>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-zinc-800">
                {categories.map((c) => {
                    const tone = scoreTone(c.score);
                    const above = c.score >= passThreshold;
                    return (
                        <div key={c.label} className="flex items-center gap-2 text-xs">
                            <span className="w-28 shrink-0 truncate text-slate-600 dark:text-zinc-400">
                                {c.label}
                            </span>
                            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                                <div
                                    className={`absolute top-0 bottom-0 w-px ${above ? "bg-emerald-400" : "bg-amber-400"}`}
                                    style={{ left: `${passThreshold}%` }}
                                />
                                <div
                                    className={`h-full rounded-full ${above ? "bg-emerald-500" : "bg-amber-500"}`}
                                    style={{ width: `${c.score}%` }}
                                />
                            </div>
                            <span
                                className={`w-8 shrink-0 text-right font-bold tabular-nums ${SCORE_TONE_CLASS[tone]}`}
                            >
                                {c.score}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
