"use client";

type Props = {
    score: number;
    decision: string;
    riskFlags?: string[];
    summary?: string;
    passedLabel?: string;
    failedLabel?: string;
};

export default function EvaluationResultCard({
    score,
    decision,
    riskFlags = [],
    summary,
    passedLabel = "Bài nộp đạt yêu cầu",
    failedLabel = "Bài nộp cần cải thiện",
}: Props) {
    const pass =
        decision === "Strong Pass" ||
        decision === "Pass" ||
        decision === "passed" ||
        decision === "Đạt";

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold">Kết quả chấm bài</h3>
            <div className="mt-4 flex flex-wrap items-end gap-4">
                <div>
                    <p className="text-xs text-slate-500">Điểm tổng</p>
                    <p className="text-4xl font-bold text-emerald-600">{score}%</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Quyết định reviewer</p>
                    <p
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                            pass
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                    >
                        {decision}
                    </p>
                </div>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-zinc-300">
                {pass ? passedLabel : failedLabel}
            </p>
            {summary && (
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">{summary}</p>
            )}
            {riskFlags.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-amber-800 dark:text-amber-300">
                    {riskFlags.map((r) => (
                        <li key={r}>⚠ {r}</li>
                    ))}
                </ul>
            )}
        </section>
    );
}
