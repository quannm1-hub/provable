"use client";

type LlmReview = {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    reviewerDecision: string;
};

type Props = {
    review: LlmReview;
    riskFlags?: string[];
};

export default function InlineLLMReview({ review, riskFlags = [] }: Props) {
    return (
        <section className="rounded-2xl border border-violet-200 bg-violet-50/30 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <h3 className="text-sm font-semibold">LLM model review</h3>

            <div className="mt-4 space-y-4 text-sm">
                <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500">
                        Tóm tắt bài nộp
                    </h4>
                    <p className="mt-1 text-slate-700 dark:text-zinc-300">{review.summary}</p>
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500">Điểm mạnh</h4>
                    <ul className="mt-1 list-inside list-disc text-xs text-slate-600 dark:text-zinc-400">
                        {review.strengths.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500">Điểm yếu</h4>
                    <ul className="mt-1 list-inside list-disc text-xs text-slate-600 dark:text-zinc-400">
                        {review.weaknesses.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500">
                        Rủi ro reviewer cần chú ý
                    </h4>
                    <ul className="mt-1 list-inside list-disc text-xs text-amber-800 dark:text-amber-300">
                        {(riskFlags.length ? riskFlags : ["Không có risk flag lớn"]).map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500">
                        Khuyến nghị sửa
                    </h4>
                    <ul className="mt-1 list-inside list-disc text-xs text-violet-700 dark:text-indigo-400">
                        {review.recommendations.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-lg border border-violet-300/50 bg-white/60 p-3 dark:bg-zinc-900/50">
                    <h4 className="text-xs font-semibold">Quyết định đề xuất</h4>
                    <p className="mt-1 text-lg font-bold">{review.reviewerDecision}</p>
                </div>
            </div>
        </section>
    );
}
