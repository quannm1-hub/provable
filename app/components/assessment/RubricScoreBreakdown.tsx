"use client";

export type RubricItem = {
    label: string;
    score: number;
    max?: number;
    note?: string;
};

type Props = {
    title?: string;
    items: RubricItem[];
    totalScore: number;
    statusLabel?: string;
    message?: string;
    strengths?: string[];
    missing?: string[];
    recommendations?: string[];
};

export default function RubricScoreBreakdown({
    title = "Kết quả chấm bài",
    items,
    totalScore,
    statusLabel,
    message,
    strengths = [],
    missing = [],
    recommendations = [],
}: Props) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-emerald-600">{totalScore}%</span>
                {statusLabel && (
                    <span className="text-sm font-medium text-slate-600">{statusLabel}</span>
                )}
            </div>
            {message && (
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">{message}</p>
            )}
            <ul className="mt-4 space-y-2">
                {items.map((item) => (
                    <li
                        key={item.label}
                        className="flex justify-between gap-2 text-xs border-b border-slate-100 pb-2 dark:border-zinc-800"
                    >
                        <span>{item.label}</span>
                        <span className="font-medium">
                            {item.score}
                            {item.max != null ? ` / ${item.max}` : "%"}
                        </span>
                    </li>
                ))}
            </ul>
            {strengths.length > 0 && (
                <div className="mt-3">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">Điểm mạnh</p>
                    <ul className="mt-1 list-inside list-disc text-xs">
                        {strengths.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
            {missing.length > 0 && (
                <div className="mt-3">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">Thiếu</p>
                    <ul className="mt-1 list-inside list-disc text-xs text-amber-700">
                        {missing.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
            {recommendations.length > 0 && (
                <div className="mt-3">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">
                        Khuyến nghị cải thiện
                    </p>
                    <ul className="mt-1 list-inside list-disc text-xs text-violet-700 dark:text-indigo-400">
                        {recommendations.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
