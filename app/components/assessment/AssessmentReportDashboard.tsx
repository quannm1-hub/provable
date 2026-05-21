"use client";

import { useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    ChevronRight,
    MinusCircle,
} from "lucide-react";
import AssessmentBenchmarkChart from "@/app/components/assessment/charts/AssessmentBenchmarkChart";
import AssessmentMetricsBarChart from "@/app/components/assessment/charts/AssessmentMetricsBarChart";
import AssessmentRadarChart from "@/app/components/assessment/charts/AssessmentRadarChart";
import type { AssessmentEvaluationResult } from "@/lib/assessment-evaluator";
import {
    buildAssessmentReport,
    SCORE_BAR_CLASS,
    SCORE_TONE_CLASS,
    scoreTone,
    type ReportCategory,
    type ReportMetric,
} from "@/lib/assessment-report-analytics";

type Props = {
    evaluation: AssessmentEvaluationResult;
};

function ScoreRing({
    score,
    size = 140,
    stroke = 10,
}: {
    score: number;
    size?: number;
    stroke?: number;
}) {
    const pct = Math.min(100, Math.max(0, score));
    const tone = scoreTone(score);
    const ringColor =
        tone === "good"
            ? "#059669"
            : tone === "mid"
              ? "#d97706"
              : "#dc2626";
    const inner = size - stroke * 2;

    return (
        <div
            className="relative shrink-0"
            style={{ width: size, height: size }}
            role="img"
            aria-label={`Điểm tổng ${score}%`}
        >
            <div
                className="h-full w-full rounded-full"
                style={{
                    background: `conic-gradient(${ringColor} ${pct * 3.6}deg, rgb(226 232 240) ${pct * 3.6}deg)`,
                }}
            />
            <div
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white dark:bg-zinc-900"
                style={{ width: inner, height: inner }}
            >
                <span
                    className={`text-3xl font-bold tabular-nums ${SCORE_TONE_CLASS[tone]}`}
                >
                    {score}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    / 100
                </span>
            </div>
        </div>
    );
}

function MetricBar({ metric }: { metric: ReportMetric }) {
    const tone = scoreTone(metric.score);
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-slate-700 dark:text-zinc-300">
                    {metric.label}
                </span>
                <span
                    className={`tabular-nums font-semibold ${SCORE_TONE_CLASS[tone]}`}
                >
                    {metric.score}%
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                <div
                    className={`h-full rounded-full transition-all ${SCORE_BAR_CLASS[tone]}`}
                    style={{ width: `${metric.score}%` }}
                />
            </div>
            <p className="text-[11px] leading-snug text-slate-500 dark:text-zinc-500">
                {metric.message}
            </p>
        </div>
    );
}

function StatusIcon({ status }: { status: ReportMetric["status"] }) {
    if (status === "passed")
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (status === "warning")
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    return <MinusCircle className="h-4 w-4 text-red-500" />;
}

function CategoryPanel({ category }: { category: ReportCategory }) {
    const tone = scoreTone(category.score);
    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {category.label}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-zinc-400">
                        {category.description}
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <span className="text-xs text-slate-500">Điểm nhóm</span>
                    <span
                        className={`text-2xl font-bold tabular-nums ${SCORE_TONE_CLASS[tone]}`}
                    >
                        {category.score}%
                    </span>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {category.metrics.map((m) => (
                    <div
                        key={m.id}
                        className="rounded-xl border border-slate-200/90 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <StatusIcon status={m.status} />
                            <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                {m.label}
                            </span>
                        </div>
                        <MetricBar metric={m} />
                        {m.suggestions && m.suggestions.length > 0 && (
                            <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-[11px] text-violet-700 dark:border-zinc-800 dark:text-indigo-300">
                                {m.suggestions.map((s) => (
                                    <li key={s} className="flex gap-1.5">
                                        <ChevronRight className="mt-0.5 h-3 w-3 shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AssessmentReportDashboard({ evaluation }: Props) {
    const report = buildAssessmentReport(evaluation);
    const [activeId, setActiveId] = useState("overview");
    const activeCategory =
        report.categories.find((c) => c.id === activeId) ?? report.categories[0];

    const pass =
        evaluation.decision === "Strong Pass" || evaluation.decision === "Pass";

    const categoryScores = report.categories.map((c) => ({
        label: c.label,
        score: c.score,
    }));

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-5 py-5 dark:border-zinc-800 dark:from-zinc-900/80 dark:to-zinc-900/30 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Báo cáo phân tích pipeline
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500">
                        {report.checkCount} tiêu chí · {report.wordCount.toLocaleString("vi-VN")}{" "}
                        từ · Ngưỡng {report.passThreshold}%
                    </p>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="flex flex-wrap items-center gap-5">
                        <ScoreRing score={report.overallScore} />
                        <div>
                            <p className="text-sm text-slate-500">Quyết định reviewer</p>
                            <p
                                className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                    pass
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                                        : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                                }`}
                            >
                                {report.decision}
                            </p>
                            <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                                {evaluation.llmReview.summary}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav sections — Content / Format / … */}
            <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-3 py-2 dark:border-zinc-800 sm:px-4">
                <button
                    type="button"
                    onClick={() => setActiveId("overview")}
                    className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                        activeId === "overview"
                            ? "bg-violet-100 text-violet-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                            : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                >
                    Tổng quan
                </button>
                {report.categories.map((c) => (
                    <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveId(c.id)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition ${
                            activeId === c.id
                                ? "bg-violet-100 text-violet-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                                : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        }`}
                    >
                        {c.label}
                        <span className="ml-1.5 tabular-nums opacity-70">
                            {c.score}
                        </span>
                    </button>
                ))}
            </div>

            <div className="p-5 sm:p-6">
                {activeId === "overview" ? (
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 dark:text-zinc-400">
                            Số liệu dưới đây được tính trực tiếp từ{" "}
                            <strong>{report.checkCount} bước</strong> pipeline chấm (format,
                            README, similarity, code run, LLM review…).
                        </p>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 p-4 dark:border-zinc-700">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                    So với ngưỡng đạt ({report.passThreshold}%)
                                </h4>
                                <p className="mt-1 text-[11px] text-slate-500">
                                    Đường tím = ngưỡng · Thanh = điểm thực tế từng nhóm
                                </p>
                                <div className="mt-4">
                                    <AssessmentBenchmarkChart
                                        categories={categoryScores}
                                        passThreshold={report.passThreshold}
                                        overallScore={report.overallScore}
                                    />
                                </div>
                            </div>
                            <div className="rounded-xl border border-slate-200 p-4 dark:border-zinc-700">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                    Điểm theo nhóm
                                </h4>
                                <p className="mt-1 text-[11px] text-slate-500">
                                    Radar chart — 5 chiều đánh giá từ pipeline
                                </p>
                                <div className="mt-2 flex justify-center">
                                    {report.radarAxes.length >= 3 && (
                                        <AssessmentRadarChart
                                            axes={report.radarAxes}
                                            size={280}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 dark:border-zinc-700">
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                Chi tiết từng tiêu chí pipeline
                            </h4>
                            <p className="mt-1 text-[11px] text-slate-500">
                                Mỗi thanh = điểm % của một bước kiểm tra trong pipeline
                                chấm bài.
                            </p>
                            <div className="mt-4 pr-1">
                                <AssessmentMetricsBarChart metrics={report.metricScores} />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {report.categories.map((c) => {
                                const tone = scoreTone(c.score);
                                return (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => setActiveId(c.id)}
                                        className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-violet-300 hover:shadow-sm dark:border-zinc-700 dark:hover:border-indigo-700"
                                    >
                                        <p className="text-xs font-medium text-slate-500">
                                            {c.label}
                                        </p>
                                        <p
                                            className={`mt-1 text-2xl font-bold tabular-nums ${SCORE_TONE_CLASS[tone]}`}
                                        >
                                            {c.score}%
                                        </p>
                                        <p className="mt-2 line-clamp-2 text-[11px] text-slate-500">
                                            {c.metrics.length} tiêu chí ·{" "}
                                            {
                                                c.metrics.filter(
                                                    (m) => m.status === "passed",
                                                ).length
                                            }{" "}
                                            đạt
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                        {evaluation.riskFlags.length > 0 && (
                            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                                    Cảnh báo rủi ro
                                </p>
                                <ul className="mt-2 space-y-1 text-xs text-amber-900/90 dark:text-amber-200/90">
                                    {evaluation.riskFlags.map((r) => (
                                        <li key={r}>• {r}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {evaluation.similarity && !evaluation.preCheckOnly && (
                            <div className="rounded-xl border border-slate-200 p-4 dark:border-zinc-700">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                    Phân tích similarity (pipeline)
                                </h4>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">
                                                Template match
                                            </span>
                                            <span className="font-bold tabular-nums">
                                                {evaluation.similarity.templateSimilarity}%
                                            </span>
                                        </div>
                                        <div className="mt-1 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                                            <div
                                                className="h-full rounded-full bg-amber-500"
                                                style={{
                                                    width: `${evaluation.similarity.templateSimilarity}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">
                                                Plagiarism signal
                                            </span>
                                            <span className="font-bold tabular-nums">
                                                {evaluation.similarity.plagiarismSimilarity}%
                                            </span>
                                        </div>
                                        <div className="mt-1 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                                            <div
                                                className="h-full rounded-full bg-red-500"
                                                style={{
                                                    width: `${evaluation.similarity.plagiarismSimilarity}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="mt-1 text-[10px] capitalize text-slate-400">
                                            Risk: {evaluation.similarity.riskLevel} ·{" "}
                                            {evaluation.similarity.matchedSource}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {evaluation.spellCheck.issueCount > 0 && (
                            <div className="rounded-xl border border-slate-200 p-4 dark:border-zinc-700">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                    Spell check
                                </h4>
                                <p className="mt-1 text-xs text-slate-500">
                                    {evaluation.spellCheck.issueCount} vấn đề phát hiện
                                </p>
                                <ul className="mt-2 space-y-1 text-[11px] text-slate-600 dark:text-zinc-400">
                                    {evaluation.spellCheck.warnings.slice(0, 4).map((w) => (
                                        <li key={w}>• {w}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : activeCategory ? (
                    <div className="space-y-6">
                        <CategoryPanel category={activeCategory} />
                        <div className="rounded-xl border border-dashed border-slate-200 p-4 dark:border-zinc-700">
                            <p className="text-xs font-semibold text-slate-500">
                                Tiêu chí trong nhóm «{activeCategory.label}»
                            </p>
                            <div className="mt-3">
                                <AssessmentMetricsBarChart
                                    metrics={activeCategory.metrics.map((m) => ({
                                        id: m.id,
                                        label: m.label,
                                        score: m.score,
                                        status: m.status,
                                    }))}
                                    maxItems={8}
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            <p className="border-t border-slate-100 px-5 py-3 text-[10px] text-slate-400 dark:border-zinc-800">
                Biểu đồ phản ánh kết quả rule-based + LLM review trên package đã upload — rà
                soát trước khi coi là quyết định chính thức từ Cốc Cốc.
            </p>
        </section>
    );
}
