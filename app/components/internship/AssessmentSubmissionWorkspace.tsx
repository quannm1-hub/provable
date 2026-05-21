"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import {
    ChevronDown,
    FileArchive,
    FileText,
    Loader2,
    Trash2,
    Upload,
} from "lucide-react";
import Button from "@/app/components/ui/Button";
import {
    ASSESSMENT_DEADLINE,
    DEMO_FILE_HINTS,
    MAX_FILE_BYTES,
} from "@/lib/assessment-evaluator";
import { COCCOC_DE_ACCEPTED_FORMATS } from "@/lib/coccoc-de-assessment";
import type { AssessmentEvaluationResult } from "@/lib/assessment-evaluator";

export type SubmissionMeta = {
    file: File;
    uploadedAt: Date;
};

type Props = {
    embedded?: boolean;
    file: File | null;
    uploadedAt: Date | null;
    simulateLate: boolean;
    onSimulateLate: (v: boolean) => void;
    onFile: (meta: SubmissionMeta | null) => void;
    evaluation: AssessmentEvaluationResult | null;
    evaluating: boolean;
    preChecking: boolean;
    onPreCheck: () => void;
    onGrade: () => void;
    onComplete?: () => void;
};

function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileTypeLabel(name: string) {
    if (name.endsWith(".tar.gz")) return "tar.gz";
    const ext = name.slice(name.lastIndexOf(".") + 1);
    return ext || "unknown";
}

export default function AssessmentSubmissionWorkspace({
    embedded = false,
    file,
    uploadedAt,
    simulateLate,
    onSimulateLate,
    onFile,
    evaluation,
    evaluating,
    preChecking,
    onPreCheck,
    onGrade,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [demoOpen, setDemoOpen] = useState(false);

    const pickFile = useCallback(
        (f: File | null) => {
            if (!f) {
                onFile(null);
                return;
            }
            onFile({ file: f, uploadedAt: new Date() });
        },
        [onFile],
    );

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f) pickFile(f);
    };

    const deadline = new Date(ASSESSMENT_DEADLINE);
    const onTime =
        uploadedAt && !simulateLate ? uploadedAt <= deadline : !simulateLate;

    const body = (
        <div className={embedded ? "mt-4 space-y-4" : "scrollbar-none min-h-0 flex-1 overflow-y-auto p-4 space-y-5"}>
            <p className="text-xs text-slate-500">
                Tối đa 20MB · Deadline:{" "}
                {deadline.toLocaleString("vi-VN")}
            </p>

            {!file ? (
                <label
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 ${
                        dragOver
                            ? "border-emerald-400 bg-emerald-50/50"
                            : "border-slate-300 dark:border-zinc-600"
                    }`}
                >
                    <Upload className="h-9 w-9 text-slate-400" />
                    <p className="mt-2 text-sm font-medium">
                        Kéo thả file vào đây hoặc bấm để chọn file
                    </p>
                    <p className="mt-1 text-center text-xs text-slate-500">
                        {COCCOC_DE_ACCEPTED_FORMATS.map((f) => f.ext).join(", ")}
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".zip,.tar.gz,.md,.txt,.pdf,.docx,application/zip"
                        className="hidden"
                        onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    />
                    <Button
                        variant="secondary"
                        size="sm"
                        className="mt-4"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            inputRef.current?.click();
                        }}
                    >
                        Chọn file
                    </Button>
                </label>
            ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900/50">
                    <div className="flex items-start gap-3">
                        {file.name.endsWith(".zip") || file.name.endsWith(".tar.gz") ? (
                            <FileArchive className="h-8 w-8 text-emerald-600" />
                        ) : (
                            <FileText className="h-8 w-8 text-emerald-600" />
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-sm">{file.name}</p>
                            <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-zinc-400">
                                <dt>Loại file</dt>
                                <dd>{fileTypeLabel(file.name)}</dd>
                                <dt>Kích thước</dt>
                                <dd>
                                    {formatSize(file.size)}
                                    {file.size > MAX_FILE_BYTES && (
                                        <span className="text-amber-600"> · Quá 20MB</span>
                                    )}
                                </dd>
                                <dt>Thời gian nộp</dt>
                                <dd>{uploadedAt?.toLocaleString("vi-VN") ?? "—"}</dd>
                                <dt>Deadline</dt>
                                <dd className={onTime ? "text-emerald-600" : "text-amber-600"}>
                                    {onTime ? "Đúng hạn" : "Quá hạn"}
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={preChecking || evaluating}
                            onClick={onPreCheck}
                        >
                            {preChecking ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Pre-check…
                                </>
                            ) : (
                                "Chạy pre-check"
                            )}
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            disabled={evaluating || preChecking}
                            onClick={onGrade}
                        >
                            {evaluating ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Chấm bài…
                                </>
                            ) : (
                                "Chấm bài"
                            )}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => pickFile(null)}>
                            <Trash2 className="h-3.5 w-3.5" /> Xóa file
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => inputRef.current?.click()}
                        >
                            Upload lại
                        </Button>
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".zip,.tar.gz,.md,.txt,.pdf,.docx,application/zip"
                            className="hidden"
                            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                </div>
            )}

            <section className="rounded-xl border border-slate-200 p-3 dark:border-zinc-800">
                <button
                    type="button"
                    className="flex w-full items-center justify-between text-sm font-semibold"
                    onClick={() => setDemoOpen((o) => !o)}
                >
                    Tên file mẫu để thử nhanh
                    <ChevronDown
                        className={`h-4 w-4 transition ${demoOpen ? "rotate-180" : ""}`}
                    />
                </button>
                {demoOpen && (
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
                        {DEMO_FILE_HINTS.map((h) => (
                            <li key={h.name}>
                                <code className="rounded bg-slate-100 px-1 dark:bg-zinc-800">
                                    {h.name}
                                </code>{" "}
                                → {h.outcome}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );

    if (embedded) return body;

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-zinc-950">
            {body}
        </div>
    );
}
