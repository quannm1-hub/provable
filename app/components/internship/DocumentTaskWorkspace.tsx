"use client";

import { useCallback, useRef, useState, type DragEvent, type RefObject } from "react";
import {
    CheckCircle2,
    FileText,
    Loader2,
    Trash2,
    Upload,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import EvaluationPipeline, {
    checkStatusToPipeline,
    type PipelineStep,
} from "@/app/components/assessment/EvaluationPipeline";
import { PRD_BRIEF_SECTIONS, type DocumentTask } from "@/lib/document-tasks";
import type { PrdEvaluationResult } from "@/lib/prd-evaluation";

export type UploadPhase =
    | "idle"
    | "uploaded"
    | "evaluating"
    | "evaluated";

type Props = {
    task: DocumentTask;
    file: File | null;
    phase: UploadPhase;
    evaluation: PrdEvaluationResult | null;
    onFileSelect: (file: File | null) => void;
    onEvaluate: () => void;
    onDownloadTemplate: () => void;
    inlineLayout?: boolean;
    resultRef?: RefObject<HTMLDivElement | null>;
};

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentTaskWorkspace({
    task,
    file,
    phase,
    evaluation,
    onFileSelect,
    onEvaluate,
    onDownloadTemplate,
    inlineLayout,
    resultRef,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    const pickFile = useCallback(
        (f: File | null) => {
            if (!f) return;
            const max = 10 * 1024 * 1024;
            if (f.size > max) return;
            onFileSelect(f);
        },
        [onFileSelect],
    );

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f) pickFile(f);
    };

    const passed = evaluation?.status === "passed";
    const running = phase === "evaluating";

    const pipelineSteps: PipelineStep[] = [
        {
            id: "format",
            label: "Kiểm tra file và format",
            status: running ? "running" : file ? "passed" : "pending",
            message: file ? "File hợp lệ" : undefined,
        },
        {
            id: "similarity",
            label: "So khớp đáp án tham khảo",
            status: running
                ? "running"
                : evaluation
                  ? checkStatusToPipeline(
                        evaluation.status === "passed"
                            ? "passed"
                            : evaluation.status === "needs_improvement"
                              ? "warning"
                              : "failed",
                    )
                  : "pending",
            message: evaluation ? `${evaluation.score}% similarity` : undefined,
            score: evaluation?.score,
        },
        {
            id: "sections",
            label: "Kiểm tra section bắt buộc",
            status: running
                ? "running"
                : evaluation
                  ? evaluation.missingSections.length === 0
                      ? "passed"
                      : "warning"
                  : "pending",
        },
        {
            id: "result",
            label: "Tổng hợp kết quả",
            status: running
                ? "running"
                : evaluation
                  ? passed
                      ? "passed"
                      : "warning"
                  : "pending",
            message: evaluation?.statusLabel,
        },
    ];

    const content = (
        <div className={inlineLayout ? "space-y-6" : "scrollbar-none min-h-0 flex-1 space-y-4 overflow-y-auto p-4"}>
            {inlineLayout && (
                <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <h2 className="text-base font-bold">Brief</h2>
                    <p className="mt-2 text-xs text-slate-600">{task.scenario}</p>
                    <p className="mt-3 text-xs">{PRD_BRIEF_SECTIONS.businessContext}</p>
                    <p className="mt-2 text-xs font-medium">Tiêu chí chấm:</p>
                    <ul className="mt-1 list-inside list-disc text-xs text-slate-600">
                        {task.evaluationCriteria.map((c) => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                    <p className="mt-2 text-[10px] text-amber-700">
                        Đạt từ {task.passThreshold}% trở lên
                    </p>
                </section>
            )}

            {!inlineLayout && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">Mục tiêu</p>
                    <p className="mt-1 text-xs text-slate-700 dark:text-zinc-300">{task.objective}</p>
                    <p className="mt-2 text-[10px] text-slate-500">Đầu ra: {task.deliverable}</p>
                </div>
            )}

            <Button variant="secondary" size="md" onClick={onDownloadTemplate}>
                Tải template PRD
            </Button>

            <section className={inlineLayout ? "rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800" : ""}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Nộp tài liệu PRD
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                    Sau khi upload, bấm Chấm tài liệu để xem kết quả ngay bên dưới.
                </p>
                    {!file ? (
                        <div
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") inputRef.current?.click();
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={onDrop}
                            onClick={() => inputRef.current?.click()}
                            className={`mt-3 flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 transition ${
                                dragOver
                                    ? "border-violet-400 bg-violet-50 dark:border-indigo-500 dark:bg-indigo-950/40"
                                    : "border-slate-300 bg-slate-50/50 hover:border-violet-300 dark:border-zinc-600 dark:bg-zinc-900/30"
                            }`}
                        >
                            <Upload className="h-10 w-10 text-slate-400 dark:text-zinc-500" />
                            <p className="mt-3 text-center text-sm text-slate-700 dark:text-zinc-300">
                                Kéo thả file PRD vào đây hoặc bấm để chọn file
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                                Hỗ trợ: .docx, .pdf, .md, .txt
                            </p>
                            <p className="mt-1 text-[10px] text-slate-400">
                                Tối đa 10MB
                            </p>
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                accept=".docx,.pdf,.md,.txt,application/pdf,text/plain,text/markdown"
                                onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                            />
                        </div>
                    ) : (
                        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                            <div className="flex items-start gap-3">
                                <FileText className="h-8 w-8 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium text-slate-900 dark:text-white">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {file.type || "unknown"} · {formatSize(file.size)}
                                    </p>
                                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Đã upload
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onFileSelect(null)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Xóa file
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    disabled={phase === "evaluating"}
                                    onClick={onEvaluate}
                                >
                                    {phase === "evaluating" ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Đang chấm…
                                        </>
                                    ) : (
                                        "Chấm tài liệu"
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </section>

            {(running || evaluation) && (
                <EvaluationPipeline steps={pipelineSteps} />
            )}

            {evaluation && phase === "evaluated" && (
                <div ref={resultRef} className="space-y-4">
                    <section
                        className={`rounded-2xl border p-5 ${
                            passed
                                ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50"
                                : "border-amber-200 bg-amber-50/80 dark:border-amber-900/50"
                        }`}
                    >
                        <h3 className="text-sm font-semibold">Kết quả chấm bài</h3>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-lg font-bold">{evaluation.statusLabel}</span>
                            <span className="text-3xl font-bold">{evaluation.score}%</span>
                        </div>
                        <p className="mt-2 text-xs">{evaluation.message}</p>
                        {evaluation.matchedSections.length > 0 && (
                            <div className="mt-3">
                                <p className="text-xs font-medium">Phần đã khớp</p>
                                <p className="text-xs text-emerald-700">
                                    {evaluation.matchedSections.join(" · ")}
                                </p>
                            </div>
                        )}
                        {evaluation.missingSections.length > 0 && (
                            <div className="mt-2">
                                <p className="text-xs font-medium">Phần còn thiếu</p>
                                <p className="text-xs text-amber-800">
                                    {evaluation.missingSections.join(" · ")}
                                </p>
                            </div>
                        )}
                        {evaluation.recommendations.length > 0 && (
                            <ul className="mt-3 list-inside list-disc text-xs text-violet-700 dark:text-indigo-400">
                                {evaluation.recommendations.map((r) => (
                                    <li key={r}>{r}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            )}
        </div>
    );

    if (inlineLayout) return content;

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-zinc-950">
            <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-xs font-medium text-violet-600 dark:text-indigo-400">
                    Task Workspace
                </p>
                <h2 className="text-sm font-semibold">{task.title}</h2>
            </div>
            {content}
        </div>
    );
}
