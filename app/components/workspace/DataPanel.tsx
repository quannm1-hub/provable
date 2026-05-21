"use client";

import { useState } from "react";
import DatasetTableSection from "@/app/components/DatasetTableSection";
import QueryResultView, { QueryPreviewPanel } from "@/app/components/QueryResultView";
import {
    DATASET_META,
    type DatasetId,
    getDatasetRows,
} from "@/lib/datasets";
import { LEARNING_TAB_LABELS, type LearningTab } from "@/lib/learning-panel";
import type { RunResult } from "@/lib/types";
import { vi } from "@/lib/vi";

type Tab = "dataset" | "result" | "preview" | "summary" | "lesson" | "hint";

function learningTabToPanelTab(t: LearningTab): Tab {
    return t === "data" ? "dataset" : t;
}

function panelTabToLearningTab(t: Tab): LearningTab {
    return t === "dataset" ? "data" : (t as LearningTab);
}

type Props = {
    datasetId?: DatasetId;
    rows?: Record<string, string | number>[];
    runResult: RunResult | null;
    submitOk: boolean | null;
    showComparison?: boolean;
    yourQuery?: string;
    modelAnswer?: string;
    mode?: "default" | "learning";
    activeLearningTab?: LearningTab;
    onLearningTabChange?: (tab: LearningTab) => void;
    lessonTitle?: string;
    lessonBody?: string;
    hintText?: string;
};

export default function DataPanel({
    datasetId = "employees",
    rows: rowsProp,
    runResult,
    submitOk,
    showComparison,
    yourQuery,
    modelAnswer,
    mode = "default",
    activeLearningTab = "lesson",
    onLearningTabChange,
    lessonTitle,
    lessonBody,
    hintText,
}: Props) {
    const meta = DATASET_META[datasetId];
    const rows = rowsProp ?? getDatasetRows(datasetId);
    const [internalTab, setInternalTab] = useState<Tab>("dataset");
    const isLearning = mode === "learning";
    const tab: Tab = isLearning ? learningTabToPanelTab(activeLearningTab) : internalTab;
    const setTab = (t: Tab) => {
        if (isLearning && onLearningTabChange) {
            onLearningTabChange(panelTabToLearningTab(t));
        } else {
            setInternalTab(t);
        }
    };

    const hasPreview =
        runResult?.preview &&
        (runResult.kind === "update" || runResult.kind === "delete");

    const tabs: { id: Tab; label: string }[] = isLearning
        ? [
              { id: "lesson", label: LEARNING_TAB_LABELS.lesson },
              { id: "dataset", label: LEARNING_TAB_LABELS.data },
              { id: "result", label: LEARNING_TAB_LABELS.result },
              { id: "hint", label: LEARNING_TAB_LABELS.hint },
          ]
        : [
              { id: "dataset", label: vi.data.table },
              { id: "result", label: vi.data.queryResult },
              ...(hasPreview
            ? [
                  {
                      id: "preview" as Tab,
                      label:
                          runResult?.kind === "update"
                              ? vi.data.updatePreview
                              : vi.data.deletePreview,
                  },
              ]
            : []),
              ...(showComparison
                  ? [{ id: "summary" as Tab, label: "So sánh đáp án" }]
                  : []),
          ];

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-50 dark:bg-zinc-900/30">
            <div className="flex shrink-0 gap-1 border-b border-slate-200 px-2 py-2 dark:border-zinc-800">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`rounded-md px-2.5 py-1 text-xs transition ${
                            tab === t.id
                                ? "bg-slate-200 text-slate-900 dark:bg-zinc-800 dark:text-white"
                                : "text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto p-3">
                {tab === "lesson" && isLearning && (
                    <div className="space-y-3 text-sm">
                        {lessonTitle && (
                            <p className="font-semibold text-slate-900 dark:text-white">
                                {lessonTitle}
                            </p>
                        )}
                        <p className="leading-relaxed text-slate-700 dark:text-zinc-300 whitespace-pre-wrap">
                            {lessonBody ?? "Nội dung bài học sẽ hiển thị khi coach giải thích."}
                        </p>
                    </div>
                )}

                {tab === "hint" && isLearning && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                        {hintText ?? "Chọn **Hiện gợi ý** trong chat hoặc bài tập để xem gợi ý SQL."}
                    </div>
                )}

                {tab === "dataset" && (
                    <DatasetTableSection
                        datasetId={datasetId}
                        rows={rows}
                        title={`Bảng ${meta.tableName}`}
                        description={meta.description}
                    />
                )}

                {tab === "result" && (
                    <QueryResultView runResult={runResult} submitOk={submitOk} />
                )}

                {tab === "preview" && runResult && (
                    <QueryPreviewPanel runResult={runResult} />
                )}

                {tab === "summary" && showComparison && (
                    <div className="space-y-3 text-xs">
                        <div>
                            <p className="font-medium text-slate-700 dark:text-zinc-300">
                                {vi.internship.complete.yourSubmission}
                            </p>
                            <pre className="mt-1 overflow-x-auto rounded bg-slate-100 p-2 font-mono text-[10px] text-emerald-800 dark:bg-zinc-950 dark:text-emerald-300">
                                {yourQuery ?? "—"}
                            </pre>
                        </div>
                        <div>
                            <p className="font-medium text-slate-700 dark:text-zinc-300">
                                {vi.internship.complete.modelAnswer}
                            </p>
                            <pre className="mt-1 overflow-x-auto rounded border border-violet-200 bg-violet-50 p-2 font-mono text-[10px] text-violet-900 dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-200">
                                {modelAnswer ?? "—"}
                            </pre>
                        </div>
                        <p className="text-slate-500 dark:text-zinc-500">
                            {vi.data.comparisonNote}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
