"use client";

import { CheckCircle2, Lock } from "lucide-react";
import { DA_PARTS } from "@/lib/da-retention-interview";

export type PartStatus =
    | "not_started"
    | "in_progress"
    | "submitted"
    | "passed"
    | "needs_improvement";

type Props = {
    activePart: 1 | 2 | 3;
    onPartChange: (p: 1 | 2 | 3) => void;
    statuses: Record<1 | 2 | 3, PartStatus>;
    scores: Record<1 | 2 | 3, number | null>;
    /** Part accessible only after previous part is done */
    unlockedParts: Record<1 | 2 | 3, boolean>;
    complete?: boolean;
};

const statusLabel: Record<PartStatus, string> = {
    not_started: "Chưa bắt đầu",
    in_progress: "Đang làm",
    submitted: "Đã nộp",
    passed: "Đạt",
    needs_improvement: "Cần cải thiện",
};

export default function RetentionStepper({
    activePart,
    onPartChange,
    statuses,
    scores,
    unlockedParts,
    complete,
}: Props) {
    const steps = [...DA_PARTS, { id: 4 as const, title: "Hoàn thành", short: "Done" }];

    return (
        <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex flex-wrap items-center gap-2">
                {steps.map((s, i) => {
                    const isDone = s.id === 4;
                    const partId = s.id as 1 | 2 | 3 | 4;
                    const active = isDone ? !!complete : activePart === partId;
                    const status = isDone
                        ? complete
                            ? "passed"
                            : "not_started"
                        : statuses[partId as 1 | 2 | 3];
                    const score = !isDone && partId <= 3 ? scores[partId as 1 | 2 | 3] : null;
                    const locked =
                        !isDone &&
                        partId <= 3 &&
                        !unlockedParts[partId as 1 | 2 | 3];

                    return (
                        <div key={s.id} className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={isDone || locked}
                                title={
                                    locked
                                        ? `Hoàn thành Phần ${partId - 1} trước`
                                        : undefined
                                }
                                onClick={() => {
                                    if (!isDone && partId <= 3 && !locked) {
                                        onPartChange(partId as 1 | 2 | 3);
                                    }
                                }}
                                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                                    locked
                                        ? "cursor-not-allowed border-slate-100 text-slate-400 opacity-60 dark:border-zinc-800 dark:text-zinc-600"
                                        : active
                                          ? "border-violet-500 bg-violet-50 text-violet-800 dark:border-indigo-500 dark:bg-indigo-950/50 dark:text-indigo-200"
                                          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400"
                                }`}
                            >
                                <span
                                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                                        status === "passed"
                                            ? "bg-emerald-500 text-white"
                                            : active
                                              ? "bg-violet-600 text-white dark:bg-indigo-600"
                                              : "bg-slate-200 dark:bg-zinc-700"
                                    }`}
                                >
                                    {status === "passed" ? (
                                        <CheckCircle2 className="h-3 w-3" />
                                    ) : locked ? (
                                        <Lock className="h-3 w-3" />
                                    ) : (
                                        s.id
                                    )}
                                </span>
                                <span className="font-medium">
                                    {isDone ? "Hoàn thành" : `${s.id}. ${s.short}`}
                                </span>
                                {locked && (
                                    <span className="text-[10px] text-slate-400">Khóa</span>
                                )}
                                {score != null && (
                                    <span className="text-[10px] opacity-80">{score}%</span>
                                )}
                            </button>
                            {i < steps.length - 1 && (
                                <span className="text-slate-300 dark:text-zinc-600">→</span>
                            )}
                        </div>
                    );
                })}
            </div>
            {!complete && (
                <p className="mt-2 text-[10px] text-slate-500">
                    Phần {activePart}: {statusLabel[statuses[activePart]]}
                    {!unlockedParts[2] && " · Hoàn thành Phần 1 để mở Phần 2"}
                    {unlockedParts[2] && !unlockedParts[3] && activePart >= 2 &&
                        " · Nộp insight Phần 2 để mở Phần 3"}
                </p>
            )}
        </div>
    );
}
