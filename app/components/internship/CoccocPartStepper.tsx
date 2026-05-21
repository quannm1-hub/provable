"use client";

import { CheckCircle2 } from "lucide-react";
import { COCCOC_PARTS } from "@/lib/coccoc-home-test";

export type CoccocPartStatus =
    | "not_started"
    | "in_progress"
    | "submitted"
    | "passed"
    | "needs_improvement";

type Props = {
    activePart: 1 | 2 | 3 | 4 | 5 | 6;
    onPartChange: (p: 1 | 2 | 3 | 4 | 5 | 6) => void;
    statuses: Record<1 | 2 | 3 | 4 | 5 | 6, CoccocPartStatus>;
    scores: Record<1 | 2 | 3 | 4 | 5 | 6, number | null>;
};

const statusLabel: Record<CoccocPartStatus, string> = {
    not_started: "Chưa bắt đầu",
    in_progress: "Đang làm",
    submitted: "Đã nộp",
    passed: "Đạt",
    needs_improvement: "Cần cải thiện",
};

export default function CoccocPartStepper({
    activePart,
    onPartChange,
    statuses,
    scores,
}: Props) {
    return (
        <div className="shrink-0 border-b border-slate-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex flex-wrap items-center gap-1.5">
                {COCCOC_PARTS.map((s, i) => {
                    const active = activePart === s.id;
                    const status = statuses[s.id];
                    const score = scores[s.id];
                    return (
                        <div key={s.id} className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => onPartChange(s.id)}
                                className={`flex max-w-[140px] items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] transition ${
                                    active
                                        ? "border-violet-500 bg-violet-50 text-violet-800 dark:border-indigo-500 dark:bg-indigo-950/50"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-zinc-700"
                                }`}
                            >
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                                        status === "passed"
                                            ? "bg-emerald-500 text-white"
                                            : active
                                              ? "bg-violet-600 text-white"
                                              : "bg-slate-200 dark:bg-zinc-700"
                                    }`}
                                >
                                    {status === "passed" ? (
                                        <CheckCircle2 className="h-2.5 w-2.5" />
                                    ) : (
                                        s.id
                                    )}
                                </span>
                                <span className="truncate font-medium">{s.short}</span>
                                {score != null && (
                                    <span className="opacity-70">{score}%</span>
                                )}
                            </button>
                            {i < COCCOC_PARTS.length - 1 && (
                                <span className="text-slate-300 dark:text-zinc-600">→</span>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-500">
                Phần {activePart}: {statusLabel[statuses[activePart]]} ·{" "}
                {COCCOC_PARTS[activePart - 1]?.estimatedTime}
            </p>
        </div>
    );
}
