"use client";

import { ArrowLeft } from "lucide-react";
import type { SubmittedTaskRecord } from "@/lib/internship";
import { vi } from "@/lib/vi";

type Props = {
    records: SubmittedTaskRecord[];
    onBack: () => void;
};

export default function ModelAnswersReview({ records, onBack }: Props) {
    return (
        <div className="min-h-screen overflow-y-auto bg-slate-50 p-6 dark:bg-zinc-950">
            <button
                type="button"
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
            </button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Xem lại đáp án mẫu
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
                Đối chiếu truy vấn đã nộp với đáp án mẫu NovaTech.
            </p>
            <div className="mt-8 space-y-6">
                {records.map((r) => (
                    <article
                        key={r.taskId}
                        className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                        <div className="flex flex-wrap gap-2">
                            {r.skillTags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] text-violet-700 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:text-indigo-300"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <h2 className="mt-2 font-semibold text-slate-900 dark:text-white">
                            {r.taskId}
                        </h2>
                        <p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">
                            {vi.internship.complete.yourSubmission}
                        </p>
                        <pre className="mt-1 overflow-x-auto rounded-lg bg-slate-100 p-3 font-mono text-xs text-emerald-800 dark:bg-zinc-950 dark:text-emerald-300">
                            {r.query}
                        </pre>
                        <p className="mt-3 text-xs text-slate-500 dark:text-zinc-500">
                            {vi.internship.complete.modelAnswer}
                        </p>
                        <pre className="mt-1 overflow-x-auto rounded-lg border border-violet-200 bg-violet-50 p-3 font-mono text-xs text-violet-900 dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-200">
                            {r.modelAnswer}
                        </pre>
                        <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">{r.feedback}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}
