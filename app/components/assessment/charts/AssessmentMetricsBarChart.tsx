"use client";

import type { MetricScoreRow } from "@/lib/assessment-report-analytics";
import { SCORE_BAR_CLASS, SCORE_TONE_CLASS, scoreTone } from "@/lib/assessment-report-analytics";

type Props = {
    metrics: MetricScoreRow[];
    maxItems?: number;
};

const STATUS_DOT = {
    passed: "bg-emerald-500",
    warning: "bg-amber-500",
    failed: "bg-red-500",
};

export default function AssessmentMetricsBarChart({
    metrics,
    maxItems = 12,
}: Props) {
    const rows = metrics.slice(0, maxItems);

    return (
        <div className="space-y-3">
            {rows.map((m) => {
                const tone = scoreTone(m.score);
                return (
                    <div key={m.id} className="group">
                        <div className="mb-1 flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[m.status]}`}
                                />
                                <span className="truncate text-[11px] font-medium text-slate-700 dark:text-zinc-300">
                                    {m.label}
                                </span>
                            </div>
                            <span
                                className={`shrink-0 text-[11px] font-bold tabular-nums ${SCORE_TONE_CLASS[tone]}`}
                            >
                                {m.score}
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                            <div
                                className={`h-full rounded-full transition-all ${SCORE_BAR_CLASS[tone]}`}
                                style={{ width: `${m.score}%` }}
                            />
                        </div>
                    </div>
                );
            })}
            {metrics.length > maxItems && (
                <p className="text-[10px] text-slate-400">
                    +{metrics.length - maxItems} tiêu chí khác trong pipeline
                </p>
            )}
        </div>
    );
}
