"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, FileText, Sparkles } from "lucide-react";
import DatasetTableSection from "@/app/components/DatasetTableSection";
import DataTable from "@/app/components/DataTable";
import QueryResultView from "@/app/components/QueryResultView";
import {
    DATASET_META,
    type DatasetId,
    getDatasetRows,
} from "@/lib/datasets";
import { getModelComparison } from "@/lib/internship-comparison";
import { getResourcesForTask, type ResourceItem } from "@/lib/internship-resources";
import type { InternshipTask } from "@/lib/internship";
import {
    highlightSectionClass,
    SIMULATION_TAB_LABELS,
    type HighlightTarget,
    type SimulationTab,
} from "@/lib/simulation-panel";
import { runSql } from "@/lib/sql-runner";
import type { RunResult } from "@/lib/types";
import type { Employee } from "@/lib/types";
import PreviewModal from "@/app/components/PreviewModal";
import RelatedKnowledgeSection from "@/app/components/skills/RelatedKnowledgeSection";
import TaskReadinessIndicator from "@/app/components/skills/TaskReadinessIndicator";
import type { InternshipReturnContext } from "@/lib/skill-navigation";
import { vi } from "@/lib/vi";

type SubmissionStatus = "not_submitted" | "checking" | "submitted" | "model_unlocked";

type Props = {
    activeTab: SimulationTab;
    onTabChange: (tab: SimulationTab) => void;
    highlightTarget: HighlightTarget;
    task: InternshipTask | null;
    datasetId?: DatasetId;
    rows?: Record<string, string | number>[];
    runResult: RunResult | null;
    submitOk: boolean | null;
    submissionStatus: SubmissionStatus;
    yourQuery?: string;
    modelUnlocked?: boolean;
    modelUnlockFlash?: boolean;
    returnContext?: InternshipReturnContext;
};

function BriefSection({
    title,
    children,
    highlight,
    activeHighlight,
    sectionRef,
}: {
    title: string;
    children: React.ReactNode;
    highlight: HighlightTarget;
    activeHighlight: HighlightTarget;
    sectionRef?: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <div
            ref={sectionRef}
            className={`p-2 ${highlightSectionClass(highlight, activeHighlight)}`}
        >
            <p className="text-[10px] font-semibold uppercase text-slate-500 dark:text-zinc-500">
                {title}
            </p>
            <div className="mt-1">{children}</div>
        </div>
    );
}

export default function SimulationDataPanel({
    activeTab,
    onTabChange,
    highlightTarget,
    task,
    datasetId = "employees",
    rows: rowsProp,
    runResult,
    submitOk,
    submissionStatus,
    yourQuery,
    modelUnlocked,
    modelUnlockFlash,
    returnContext,
}: Props) {
    const meta = DATASET_META[datasetId];
    const rows = rowsProp ?? getDatasetRows(datasetId);
    const [resourcePreview, setResourcePreview] = useState<ResourceItem | null>(null);
    const deliverableRef = useRef<HTMLDivElement>(null);
    const contextRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    const resources = task ? getResourcesForTask(task.id) : [];
    const comparison = task && modelUnlocked ? getModelComparison(task.id) : null;

    const statusLabel = {
        not_submitted: vi.internship.submission.notSubmitted,
        checking: vi.internship.submission.checking,
        submitted: vi.internship.submission.submitted,
        model_unlocked: vi.internship.submission.modelUnlocked,
    }[submissionStatus];

    const tabOrder: SimulationTab[] = [
        "brief",
        "data",
        "result",
        "resources",
        "modelAnswer",
        "summary",
    ];

    useEffect(() => {
        const ref =
            highlightTarget === "deliverable"
                ? deliverableRef
                : highlightTarget === "businessContext"
                  ? contextRef
                  : highlightTarget === "relatedSkills"
                    ? skillsRef
                    : null;
        ref?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [highlightTarget, activeTab]);

    const modelExpectedResult = useMemo(() => {
        if (!task?.modelAnswer || task.isBriefing) return null;
        const q = task.modelAnswer.trim().toLowerCase();
        if (!q.startsWith("select")) return null;
        try {
            return runSql(task.modelAnswer, rows as unknown as Employee[]);
        } catch {
            return null;
        }
    }, [task, rows]);

    return (
        <>
            <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-50 dark:bg-zinc-900/30">
                {modelUnlockFlash && (
                    <div className="flex shrink-0 items-center gap-2 border-b border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 animate-pulse dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <Sparkles className="h-4 w-4 shrink-0" />
                        Đáp án mẫu đã được mở khóa
                    </div>
                )}
                <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-2 py-2 dark:border-zinc-800">
                    <div className="flex flex-wrap gap-1">
                        {tabOrder.map((id) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => onTabChange(id)}
                                disabled={id === "modelAnswer" && !modelUnlocked}
                                className={`rounded-md px-2 py-1 text-xs transition ${
                                    activeTab === id
                                        ? "bg-slate-200 text-slate-900 dark:bg-zinc-800 dark:text-white"
                                        : "text-slate-500 hover:text-slate-800 disabled:opacity-40 dark:text-zinc-500"
                                }`}
                            >
                                {SIMULATION_TAB_LABELS[id]}
                            </button>
                        ))}
                    </div>
                    <span className="shrink-0 rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 dark:border-zinc-700 dark:text-zinc-500">
                        {statusLabel}
                    </span>
                </div>

                <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto p-3">
                    {activeTab === "brief" && task && (
                        <div className="space-y-3 text-sm">
                            <BriefSection
                                title="Bối cảnh công việc"
                                highlight="businessContext"
                                activeHighlight={highlightTarget}
                                sectionRef={contextRef}
                            >
                                <p className="text-slate-700 dark:text-zinc-300">
                                    {task.workplaceContext}
                                </p>
                            </BriefSection>
                            <BriefSection
                                title="Yêu cầu task"
                                highlight="instruction"
                                activeHighlight={highlightTarget}
                            >
                                <p className="text-slate-700 dark:text-zinc-300">
                                    {task.instruction}
                                </p>
                            </BriefSection>
                            <BriefSection
                                title="Kết quả cần nộp"
                                highlight="deliverable"
                                activeHighlight={highlightTarget}
                                sectionRef={deliverableRef}
                            >
                                <p className="text-slate-700 dark:text-zinc-300">
                                    {task.expectedDeliverable}
                                </p>
                            </BriefSection>
                            <BriefSection
                                title="Dataset sử dụng"
                                highlight="dataset"
                                activeHighlight={highlightTarget}
                            >
                                <p className="font-mono text-xs text-emerald-700 dark:text-emerald-400">
                                    {meta.tableName}
                                </p>
                            </BriefSection>
                            {!task.isBriefing && task.requiredSkills.length > 0 && (
                                <div
                                    ref={skillsRef}
                                    className={`space-y-3 p-2 ${highlightSectionClass("relatedSkills", highlightTarget)}`}
                                >
                                    <TaskReadinessIndicator
                                        requiredSkills={task.requiredSkills}
                                    />
                                    <RelatedKnowledgeSection
                                        requiredSkills={task.requiredSkills}
                                        returnContext={returnContext}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "data" && (
                        <div
                            className={`${highlightSectionClass("dataset", highlightTarget)}`}
                        >
                            <DatasetTableSection
                                datasetId={datasetId}
                                rows={rows}
                            />
                        </div>
                    )}

                    {activeTab === "result" && (
                        <div
                            className={`text-xs ${highlightSectionClass("result", highlightTarget)} p-2`}
                        >
                            <QueryResultView
                                runResult={runResult}
                                submitOk={submitOk}
                                submissionChecking={submissionStatus === "checking"}
                            />
                            {submitOk === false && runResult?.ok && (
                                <p className="mt-2 text-red-600 dark:text-red-400">
                                    Chưa đạt — xem phản hồi mentor và thử lại.
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "resources" && (
                        <div className="space-y-2">
                            <p className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-zinc-400">
                                <BookOpen className="h-3.5 w-3.5" />
                                Tài nguyên hỗ trợ
                            </p>
                            {resources.map((r) => (
                                <div
                                    key={r.id}
                                    className="rounded-lg border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
                                >
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {r.title}
                                    </p>
                                    <p className="mt-1 text-[10px] text-slate-400">
                                        {r.type} · {r.estimatedTime}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
                                        {r.summary}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setResourcePreview(r)}
                                        className="mt-2 text-xs font-medium text-violet-600 hover:underline dark:text-indigo-400"
                                    >
                                        Xem nhanh
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "modelAnswer" && modelUnlocked && task && (
                        <div
                            className={`space-y-4 text-xs ${highlightSectionClass("modelAnswer", highlightTarget)} p-1`}
                        >
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-zinc-300">
                                        Bài làm của bạn
                                    </p>
                                    <pre className="mt-1 overflow-x-auto rounded bg-slate-100 p-2 font-mono text-[10px] text-emerald-800 dark:bg-zinc-950 dark:text-emerald-300">
                                        {yourQuery ?? "—"}
                                    </pre>
                                    {runResult?.ok &&
                                        runResult.rows &&
                                        runResult.rows.length > 0 && (
                                            <div className="mt-2">
                                                <p className="mb-1 text-[10px] text-slate-500">
                                                    Kết quả bài làm
                                                </p>
                                                <DataTable
                                                    rows={
                                                        runResult.rows as Record<
                                                            string,
                                                            unknown
                                                        >[]
                                                    }
                                                    columns={runResult.columns}
                                                    variant="result"
                                                    maxHeight="max-h-40"
                                                />
                                            </div>
                                        )}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-zinc-300">
                                        Đáp án mẫu
                                    </p>
                                    <pre className="mt-1 overflow-x-auto rounded border border-violet-200 bg-violet-50 p-2 font-mono text-[10px] text-violet-900 dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-200">
                                        {task.modelAnswer}
                                    </pre>
                                </div>
                            </div>
                            {modelExpectedResult?.ok &&
                                modelExpectedResult.rows &&
                                modelExpectedResult.rows.length > 0 && (
                                    <div>
                                        <p className="mb-2 font-semibold text-slate-700 dark:text-zinc-300">
                                            Kết quả mong đợi
                                        </p>
                                        <DataTable
                                            rows={
                                                modelExpectedResult.rows as Record<
                                                    string,
                                                    unknown
                                                >[]
                                            }
                                            columns={modelExpectedResult.columns}
                                            variant="result"
                                            maxHeight="max-h-48"
                                        />
                                    </div>
                                )}
                            {comparison && (
                                <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                                    <p className="flex items-center gap-1 font-semibold text-slate-800 dark:text-zinc-200">
                                        <FileText className="h-3.5 w-3.5" />
                                        Nhận xét từ mentor
                                    </p>
                                    <p className="mt-2 text-slate-600 dark:text-zinc-400">
                                        <strong>Điểm làm tốt:</strong> {comparison.good}
                                    </p>
                                    <p className="mt-2 text-slate-600 dark:text-zinc-400">
                                        <strong>Có thể cải thiện:</strong>{" "}
                                        {comparison.improve}
                                    </p>
                                    <p className="mt-2 text-slate-600 dark:text-zinc-400">
                                        <strong>Vì sao đáp án mẫu phù hợp:</strong>{" "}
                                        {comparison.whyModel}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "modelAnswer" && !modelUnlocked && (
                        <p className="text-xs text-slate-400 dark:text-zinc-600">
                            Nộp task đúng (hoặc thử đủ 3 lần) để mở khóa đáp án mẫu.
                        </p>
                    )}

                    {activeTab === "summary" && task && (
                        <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400">
                            <p className="font-semibold text-slate-800 dark:text-zinc-200">
                                Tổng kết task
                            </p>
                            <p>
                                <strong>Task:</strong> {task.title}
                            </p>
                            <p>
                                <strong>Trạng thái nộp:</strong> {statusLabel}
                            </p>
                            {modelUnlocked && (
                                <p className="text-emerald-600 dark:text-emerald-400">
                                    Đáp án mẫu đã mở — xem tab Đáp án mẫu để so sánh.
                                </p>
                            )}
                            <p className="text-slate-500">{task.successFeedback}</p>
                        </div>
                    )}
                </div>
            </div>

            <PreviewModal
                open={!!resourcePreview}
                onClose={() => setResourcePreview(null)}
                title={resourcePreview?.title ?? ""}
                subtitle={resourcePreview?.type}
                description={resourcePreview?.body ?? ""}
                estimatedTime={resourcePreview?.estimatedTime}
            />
        </>
    );
}
