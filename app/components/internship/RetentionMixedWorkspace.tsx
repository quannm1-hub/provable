"use client";

import { useState } from "react";
import { FileText, Loader2, Trash2, Upload } from "lucide-react";
import RubricScoreBreakdown from "@/app/components/assessment/RubricScoreBreakdown";
import Button from "@/app/components/ui/Button";
import DataTable from "@/app/components/DataTable";
import { SQL_QUESTIONS, DA_PARTS } from "@/lib/da-retention-interview";
import {
    evaluateRetentionSql,
    type SqlQuestionId,
} from "@/lib/da-retention-sql-eval";
import { getSampleInsight, type InsightEvalResult } from "@/lib/da-retention-insight-eval";
import type { DashboardEvalResult } from "@/lib/da-retention-dashboard-eval";

export type SqlQuestionState = {
    query: string;
    submitted: boolean;
    mockUsed: boolean;
    score: number | null;
    feedback: string;
};

type Props = {
    activePart: 1 | 2 | 3;
    sqlStates: Record<SqlQuestionId, SqlQuestionState>;
    activeSqlId: SqlQuestionId;
    onSqlIdChange: (id: SqlQuestionId) => void;
    onSqlChange: (id: SqlQuestionId, patch: Partial<SqlQuestionState>) => void;
    onUseAllMockSql: () => void;
    insightText: string;
    onInsightChange: (t: string) => void;
    onSubmitInsight: () => void;
    onUseSampleInsight: () => void;
    insightEvaluating: boolean;
    insightEval: InsightEvalResult | null;
    sqlPartScore: number | null;
    dashboardFile: File | null;
    onDashboardFile: (f: File | null) => void;
    onEvaluateDashboard: () => void;
    dashboardEvaluating: boolean;
    dashboardEval: DashboardEvalResult | null;
    sqlPartComplete: boolean;
    part2Unlocked: boolean;
    part3Unlocked: boolean;
    onGoToPart2: () => void;
    onGoToPart3: () => void;
    insightSubmitted: boolean;
};

export default function RetentionMixedWorkspace(props: Props) {
    const partMeta = DA_PARTS[props.activePart - 1]!;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="border-b border-slate-100 px-5 py-3 dark:border-zinc-800">
                <h2 className="text-sm font-semibold">
                    Phần {props.activePart} — {partMeta.title}
                </h2>
                <p className="text-xs text-slate-500">{partMeta.description}</p>
            </div>
            <div className="p-5">
                {props.activePart === 1 && (
                    <SqlPartContent
                        states={props.sqlStates}
                        activeId={props.activeSqlId}
                        onActiveIdChange={props.onSqlIdChange}
                        onChange={props.onSqlChange}
                        onUseAllMock={props.onUseAllMockSql}
                        sqlPartComplete={props.sqlPartComplete}
                        onGoToPart2={props.onGoToPart2}
                    />
                )}
                {props.activePart === 2 &&
                    (props.part2Unlocked ? (
                        <InsightPartContent
                            text={props.insightText}
                            onChange={props.onInsightChange}
                            onSubmit={props.onSubmitInsight}
                            onSample={props.onUseSampleInsight}
                            evaluating={props.insightEvaluating}
                            insightEval={props.insightEval}
                            insightSubmitted={props.insightSubmitted}
                            onGoToPart3={props.onGoToPart3}
                        />
                    ) : (
                        <LockedPartBlock
                            part={2}
                            requirement="Hoàn thành Phần 1 — SQL / Data Wrangling (3 câu hỏi hoặc dùng kết quả mẫu)."
                        />
                    ))}
                {props.activePart === 3 &&
                    (props.part3Unlocked ? (
                        <DashboardPartContent
                            file={props.dashboardFile}
                            onFile={props.onDashboardFile}
                            onEvaluate={props.onEvaluateDashboard}
                            evaluating={props.dashboardEvaluating}
                            dashboardEval={props.dashboardEval}
                        />
                    ) : (
                        <LockedPartBlock
                            part={3}
                            requirement="Nộp insight ở Phần 2 trước khi làm dashboard một trang."
                        />
                    ))}
            </div>
        </section>
    );
}

function LockedPartBlock({
    part,
    requirement,
}: {
    part: number;
    requirement: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                Phần {part} chưa mở
            </p>
            <p className="mt-2 text-xs text-slate-500">{requirement}</p>
        </div>
    );
}

function SqlPartContent({
    states,
    activeId,
    onActiveIdChange,
    onChange,
    onUseAllMock,
    sqlPartComplete,
    onGoToPart2,
}: {
    states: Record<SqlQuestionId, SqlQuestionState>;
    activeId: SqlQuestionId;
    onActiveIdChange: (id: SqlQuestionId) => void;
    onChange: (id: SqlQuestionId, patch: Partial<SqlQuestionState>) => void;
    onUseAllMock: () => void;
    sqlPartComplete: boolean;
    onGoToPart2: () => void;
}) {
    const q = SQL_QUESTIONS.find((x) => x.id === activeId)!;
    const st = states[activeId];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {SQL_QUESTIONS.map((sq) => (
                    <button
                        key={sq.id}
                        type="button"
                        onClick={() => onActiveIdChange(sq.id)}
                        className={`rounded-lg border px-3 py-1.5 text-xs ${
                            activeId === sq.id
                                ? "border-violet-500 bg-violet-50 dark:border-indigo-500 dark:bg-indigo-950/40"
                                : "border-slate-200 dark:border-zinc-700"
                        }`}
                    >
                        {sq.title}
                        {states[sq.id].mockUsed || states[sq.id].submitted ? " ✓" : ""}
                    </button>
                ))}
            </div>
            <p className="text-sm font-medium text-slate-800 dark:text-zinc-200">{q.prompt}</p>
            <p className="text-xs text-slate-500">Gợi ý: {q.hint}</p>
            <textarea
                value={st.query}
                onChange={(e) => onChange(activeId, { query: e.target.value })}
                rows={8}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="SELECT ... FROM users ..."
            />
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        const r = evaluateRetentionSql(st.query, activeId);
                        onChange(activeId, { feedback: r.feedback });
                    }}
                >
                    Chạy thử
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                        const r = evaluateRetentionSql(st.query, activeId);
                        onChange(activeId, {
                            submitted: true,
                            score: r.score,
                            feedback: r.feedback,
                        });
                    }}
                >
                    Nộp câu trả lời
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        onChange(activeId, {
                            mockUsed: true,
                            submitted: true,
                            score: 85,
                            feedback: "Đã dùng kết quả mẫu cho câu hỏi này.",
                        });
                    }}
                >
                    Dùng kết quả mẫu (câu này)
                </Button>
            </div>
            {st.feedback && (
                <p className="text-xs text-slate-600 dark:text-zinc-400">{st.feedback}</p>
            )}
            {(st.mockUsed || st.submitted) && (
                <div className="space-y-3">
                    {st.score != null && (
                        <p className="text-sm font-semibold text-emerald-700">
                            Điểm câu này: {st.score}%
                        </p>
                    )}
                    <p className="text-xs font-medium text-slate-500">Kết quả mẫu</p>
                    <DataTable rows={q.mockRows} emptyMessage="Không có dữ liệu" />
                </div>
            )}
            <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900/40 dark:bg-amber-950/30">
                <p className="text-xs text-amber-900 dark:text-amber-200">
                    Nếu chưa viết được query, bấm{" "}
                    <strong>Dùng kết quả mẫu (tất cả)</strong> để tiếp tục Phần 2.
                </p>
                <Button variant="secondary" size="sm" className="mt-2" onClick={onUseAllMock}>
                    Dùng kết quả mẫu (tất cả)
                </Button>
            </div>
            {sqlPartComplete && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        Phần 1 hoàn thành. Bạn có thể sang Phần 2 — Phân tích & Insight.
                    </p>
                    <Button variant="primary" size="sm" className="mt-2" onClick={onGoToPart2}>
                        Sang Phần 2
                    </Button>
                </div>
            )}
        </div>
    );
}

function InsightPartContent({
    text,
    onChange,
    onSubmit,
    onSample,
    evaluating,
    insightEval,
    insightSubmitted,
    onGoToPart3,
}: {
    text: string;
    onChange: (t: string) => void;
    onSubmit: () => void;
    onSample: () => void;
    evaluating: boolean;
    insightEval: InsightEvalResult | null;
    insightSubmitted: boolean;
    onGoToPart3: () => void;
}) {
    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-700 dark:text-zinc-300">
                Dựa trên kết quả Phần 1, trình bày insight cho Product Manager và đề xuất 2–3
                action cải thiện retention.
            </p>
            <textarea
                value={text}
                onChange={(e) => onChange(e.target.value)}
                rows={12}
                className="w-full rounded-lg border border-slate-200 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="Ví dụ: D7 retention đang giảm từ 66.7% xuống 50.0% ở cohort 2026-03..."
            />
            <p className="text-[10px] text-slate-500">{text.length} / 300 ký tự tối thiểu</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm" disabled={evaluating} onClick={onSubmit}>
                    {evaluating ? (
                        <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang chấm…
                        </>
                    ) : (
                        "Nộp insight"
                    )}
                </Button>
                <Button variant="ghost" size="sm" onClick={onSample}>
                    Dùng insight mẫu
                </Button>
            </div>
            {insightSubmitted && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-900/40">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        Insight đã nộp. Sang Phần 3 để upload dashboard.
                    </p>
                    <Button variant="primary" size="sm" className="mt-2" onClick={onGoToPart3}>
                        Sang Phần 3
                    </Button>
                </div>
            )}
            {insightEval && (
                <RubricScoreBreakdown
                    title="Kết quả chấm bài — Insight"
                    totalScore={insightEval.score}
                    statusLabel={insightEval.statusLabel}
                    message={insightEval.message}
                    items={[
                        { label: "Retention trend", score: insightEval.passed ? 90 : 50 },
                        { label: "Behavior comparison", score: insightEval.passed ? 85 : 55 },
                        { label: "PM actions", score: insightEval.passed ? 88 : 45 },
                    ]}
                    strengths={insightEval.strengths}
                    missing={insightEval.missing}
                    recommendations={insightEval.recommendations}
                />
            )}
        </div>
    );
}

function DashboardPartContent({
    file,
    onFile,
    onEvaluate,
    evaluating,
    dashboardEval,
}: {
    file: File | null;
    onFile: (f: File | null) => void;
    onEvaluate: () => void;
    evaluating: boolean;
    dashboardEval: DashboardEvalResult | null;
}) {
    const inputId = "dash-upload";
    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-700 dark:text-zinc-300">
                Vẽ dashboard 1 trang cho PM: north star, ≥2 chart, label rõ. Upload ảnh hoặc file
                mô tả.
            </p>
            <ul className="list-inside list-disc text-xs text-slate-600 dark:text-zinc-400">
                <li>North star: Weekly Retained Active Users</li>
                <li>Chart: D7/D30 retention by cohort</li>
                <li>Chart: Top early behaviors retained vs dropped</li>
                <li>Filter: cohort month, tier, channel</li>
            </ul>
            {!file ? (
                <label
                    htmlFor={inputId}
                    className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 dark:border-zinc-600"
                >
                    <Upload className="h-10 w-10 text-slate-400" />
                    <p className="mt-2 text-sm">Kéo thả hoặc bấm chọn file</p>
                    <p className="text-xs text-slate-500">.png, .jpg, .pdf, .pptx, .md, .txt</p>
                    <input
                        id={inputId}
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf,.pptx,.md,.txt"
                        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                    />
                </label>
            ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-emerald-600" />
                        <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onFile(null)}>
                            <Trash2 className="h-3.5 w-3.5" /> Xóa file
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            disabled={evaluating}
                            onClick={onEvaluate}
                        >
                            {evaluating ? "Đang chấm…" : "Chấm dashboard"}
                        </Button>
                    </div>
                </div>
            )}
            <p className="text-[10px] text-slate-400">
                Hệ thống chưa phân tích hình ảnh — điểm được tính theo rubric.
            </p>
            {dashboardEval && (
                <RubricScoreBreakdown
                    title="Kết quả chấm bài — Dashboard"
                    totalScore={dashboardEval.score}
                    statusLabel={dashboardEval.statusLabel}
                    message={dashboardEval.message}
                    items={dashboardEval.checklist.map((c) => ({
                        label: c.label,
                        score: c.ok ? 100 : 40,
                    }))}
                />
            )}
        </div>
    );
}
