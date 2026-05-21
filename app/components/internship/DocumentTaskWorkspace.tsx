"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import {
    CheckCircle2,
    FileText,
    Loader2,
    Trash2,
    Upload,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import type { DocumentTask } from "@/lib/document-tasks";
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

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-zinc-950">
            <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-zinc-800">
                <p className="text-xs font-medium text-violet-600 dark:text-indigo-400">
                    Task Workspace
                </p>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {task.title}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                    {task.company} · {task.role} · {task.team}
                </p>
            </div>

            <div className="scrollbar-none min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">
                        Mục tiêu
                    </p>
                    <p className="mt-1 text-xs text-slate-700 dark:text-zinc-300">
                        {task.objective}
                    </p>
                    <p className="mt-2 text-[10px] text-slate-500">
                        Đầu ra: {task.deliverable}
                    </p>
                </div>

                <Button variant="secondary" size="md" onClick={onDownloadTemplate}>
                    Tải template PRD
                </Button>

                <section>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Nộp tài liệu PRD
                    </h3>
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
                                Tối đa 10MB trong bản demo
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

                {phase === "evaluating" && (
                    <div className="flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm text-violet-800 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang so sánh với đáp án tham khảo…
                    </div>
                )}

                {evaluation && phase === "evaluated" && (
                    <div
                        className={`rounded-xl border p-4 ${
                            passed
                                ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/30"
                                : "border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/30"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">
                                {evaluation.statusLabel}
                            </span>
                            <span className="text-2xl font-bold">{evaluation.score}%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80 dark:bg-zinc-800">
                            <div
                                className={`h-full rounded-full ${
                                    passed ? "bg-emerald-500" : "bg-amber-500"
                                }`}
                                style={{ width: `${evaluation.score}%` }}
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">
                            {evaluation.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
