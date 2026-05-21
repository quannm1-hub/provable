"use client";

import type { AssessmentCheck } from "@/lib/assessment-evaluator";

const BADGE: Record<AssessmentCheck["status"], { label: string; className: string }> = {
    passed: {
        label: "Đạt",
        className:
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    warning: {
        label: "Cảnh báo",
        className:
            "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
    },
    failed: {
        label: "Không đạt",
        className: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400",
    },
};

type Props = {
    title?: string;
    checks: AssessmentCheck[];
};

export default function EvaluationCheckList({
    title = "Chi tiết lỗi",
    checks,
}: Props) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold">{title}</h3>
            <ul className="mt-3 space-y-2">
                {checks.map((c) => {
                    const b = BADGE[c.status];
                    return (
                        <li
                            key={c.id}
                            className="rounded-lg border border-slate-100 p-3 dark:border-zinc-800"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-sm font-medium">{c.label}</span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${b.className}`}
                                >
                                    {b.label} · {c.score}%
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
                                {c.message}
                            </p>
                            {c.suggestions?.map((s) => (
                                <p
                                    key={s}
                                    className="mt-1 text-xs text-violet-600 dark:text-indigo-400"
                                >
                                    → {s}
                                </p>
                            ))}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
