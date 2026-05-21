"use client";

import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import DataTable from "@/app/components/DataTable";
import EmptyState from "@/app/components/ui/EmptyState";
import type { RunResult } from "@/lib/types";
import { vi } from "@/lib/vi";

type Props = {
    runResult: RunResult | null;
    submitOk?: boolean | null;
    submissionChecking?: boolean;
};

function employeesToRows(
    rows: { id: number; name: string; department: string; role: string; salary: number; status: string; location?: string }[],
): Record<string, unknown>[] {
    return rows.map((r) => ({ ...r }));
}

export default function QueryResultView({
    runResult,
    submitOk,
    submissionChecking,
}: Props) {
    if (submissionChecking) {
        return (
            <p className="text-xs text-amber-600 dark:text-amber-400">
                {vi.internship.submission.checking}
            </p>
        );
    }

    if (!runResult) {
        return (
            <EmptyState
                title={vi.data.noResultYet}
                description={vi.data.runToSeeResult}
            />
        );
    }

    const resultType = runResult.resultType;
    const isDanger =
        resultType === "danger_warning" ||
        (!runResult.ok &&
            (runResult.message.includes("WHERE") ||
                runResult.message.includes("nguy hiểm")));

    if (!runResult.ok || resultType === "validation_error") {
        return (
            <div className="space-y-2">
                <div
                    className={`rounded-lg border p-3 ${
                        isDanger
                            ? "border-amber-300 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30"
                            : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30"
                    }`}
                >
                    <p
                        className={`flex items-center gap-2 text-xs font-medium ${
                            isDanger
                                ? "text-amber-900 dark:text-amber-200"
                                : "text-red-800 dark:text-red-200"
                        }`}
                    >
                        {isDanger ? (
                            <AlertTriangle className="h-4 w-4 shrink-0" />
                        ) : (
                            <AlertCircle className="h-4 w-4 shrink-0" />
                        )}
                        {isDanger ? "Cảnh báo" : vi.data.queryNeedsFix}
                    </p>
                    <p
                        className={`mt-1 text-xs ${
                            isDanger
                                ? "text-amber-800 dark:text-amber-300"
                                : "text-red-700 dark:text-red-300"
                        }`}
                    >
                        {runResult.message}
                    </p>
                    {runResult.errors && runResult.errors.length > 0 && (
                        <ul className="mt-2 list-inside list-disc text-xs text-red-700 dark:text-red-300">
                            {runResult.errors.map((e) => (
                                <li key={e}>{e}</li>
                            ))}
                        </ul>
                    )}
                    {runResult.warnings && runResult.warnings.length > 0 && (
                        <ul className="mt-2 list-inside list-disc text-xs text-amber-800 dark:text-amber-300">
                            {runResult.warnings.map((w) => (
                                <li key={w}>{w}</li>
                            ))}
                        </ul>
                    )}
                    {isDanger && runResult.rowCount != null && runResult.rowCount > 0 && (
                        <p className="mt-2 text-xs text-amber-800 dark:text-amber-300">
                            Số dòng có nguy cơ bị ảnh hưởng: {runResult.rowCount}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    const isEmpty =
        resultType === "empty_result" ||
        (runResult.kind === "select" && (runResult.rows?.length ?? 0) === 0);

    if (isEmpty) {
        return (
            <div className="space-y-2">
                <ResultSummary ok message={runResult.message} rowCount={0} />
                <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-xs text-slate-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                    {vi.data.emptyResult}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-zinc-500">
                    Hãy kiểm tra lại điều kiện WHERE.
                </p>
            </div>
        );
    }

    if (
        resultType === "update_preview" ||
        resultType === "delete_preview" ||
        runResult.kind === "update" ||
        runResult.kind === "delete"
    ) {
        const previewRows = runResult.affectedRows?.length
            ? runResult.affectedRows
            : runResult.preview
              ? employeesToRows(runResult.preview.rows)
              : [];
        const isDelete = runResult.kind === "delete" || resultType === "delete_preview";

        return (
            <div className="space-y-3">
                <ResultSummary ok message={runResult.message} rowCount={previewRows.length} />
                <div
                    className={`rounded-lg border p-3 ${
                        isDelete
                            ? "border-red-200 bg-red-50/80 dark:border-red-900/40 dark:bg-red-950/20"
                            : "border-amber-200 bg-amber-50/80 dark:border-amber-900/40 dark:bg-amber-950/20"
                    }`}
                >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                            {isDelete ? vi.data.deletePreview : vi.data.updatePreview}
                        </p>
                        <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                            Chỉ là bản xem trước
                        </span>
                    </div>
                    <p className="mb-3 text-[11px] text-slate-600 dark:text-zinc-400">
                        {isDelete ? vi.data.deletePreviewHint : vi.data.updatePreviewHint}
                    </p>
                    <DataTable
                        rows={previewRows}
                        columns={runResult.columns}
                        variant={isDelete ? "deletePreview" : "updatePreview"}
                        emptyMessage={
                            isDelete
                                ? "Không có dòng nào sẽ bị xóa."
                                : "Không có dòng nào sẽ được cập nhật."
                        }
                        maxHeight="max-h-48"
                    />
                    <p className="mt-2 text-[10px] text-slate-500 dark:text-zinc-500">
                        {vi.data.notPermanent}
                    </p>
                </div>
            </div>
        );
    }

    const tableRows = (runResult.rows ?? []) as Record<string, unknown>[];

    return (
        <div className="space-y-3">
            <ResultSummary
                ok
                message={runResult.message}
                rowCount={runResult.rowCount ?? tableRows.length}
            />
            {submitOk === true && (
                <p className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    {vi.data.submittedOk}
                </p>
            )}
            {submitOk === false && (
                <p className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {vi.data.notCorrect}
                </p>
            )}
            <DataTable
                rows={tableRows}
                columns={runResult.columns}
                variant="result"
                emptyMessage={vi.data.emptyResult}
                maxHeight="max-h-72"
            />
        </div>
    );
}

function ResultSummary({
    ok,
    message,
    rowCount,
}: {
    ok: boolean;
    message: string;
    rowCount: number;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    ok
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300"
                }`}
            >
                {ok ? "Thành công" : "Lỗi"}
            </span>
            {rowCount > 0 && (
                <span className="text-xs text-slate-600 dark:text-zinc-400">
                    {vi.data.rowsReturned(rowCount)}
                </span>
            )}
            <span className="text-xs text-slate-500 dark:text-zinc-500">{message}</span>
        </div>
    );
}

/** Preview tab content for UPDATE/DELETE when shown separately */
export function QueryPreviewPanel({ runResult }: { runResult: RunResult }) {
    if (!runResult.preview && !runResult.affectedRows?.length) return null;
    const isDelete = runResult.kind === "delete";
    const previewRows = runResult.affectedRows?.length
        ? runResult.affectedRows
        : employeesToRows(runResult.preview!.rows);

    return (
        <div
            className={`rounded-lg border p-3 ${
                isDelete
                    ? "border-red-200 bg-red-50/80 dark:border-red-900/40 dark:bg-red-950/20"
                    : "border-amber-200 bg-amber-50/80 dark:border-amber-900/40 dark:bg-amber-950/20"
            }`}
        >
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                    {isDelete ? vi.data.deletePreview : vi.data.updatePreview}
                </p>
                <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Chỉ là bản xem trước
                </span>
            </div>
            <p className="mb-3 text-[11px] text-slate-600 dark:text-zinc-400">
                {isDelete ? vi.data.deletePreviewHint : vi.data.updatePreviewHint}
            </p>
            <DataTable
                rows={previewRows as Record<string, unknown>[]}
                columns={runResult.columns}
                variant={isDelete ? "deletePreview" : "updatePreview"}
                maxHeight="max-h-56"
            />
            <p className="mt-2 text-[10px] text-slate-500 dark:text-zinc-500">
                {vi.data.notPermanent}
            </p>
        </div>
    );
}
