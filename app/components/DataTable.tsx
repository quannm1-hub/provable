"use client";

import { useMemo } from "react";

export type DataTableProps = {
    rows: Record<string, unknown>[];
    columns?: string[];
    emptyMessage?: string;
    maxHeight?: string;
    highlightRows?: (row: Record<string, unknown>) => boolean;
    variant?: "default" | "result" | "updatePreview" | "deletePreview";
};

const NUMERIC_KEYS = /^(id|salary|quantity|stock|price|spend|leads|conversions|total_amount|assessment_score|years_experience)$/i;

function inferColumns(rows: Record<string, unknown>[], provided?: string[]): string[] {
    if (provided?.length) return provided;
    if (rows.length === 0) return [];
    return Object.keys(rows[0]);
}

function formatCell(value: unknown): string {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}

function isNumericColumn(col: string): boolean {
    return NUMERIC_KEYS.test(col);
}

const variantContainer: Record<NonNullable<DataTableProps["variant"]>, string> = {
    default: "border-slate-200 dark:border-zinc-700",
    result: "border-slate-200 dark:border-zinc-700",
    updatePreview: "border-amber-200 dark:border-amber-900/50",
    deletePreview: "border-red-200 dark:border-red-900/50",
};

export default function DataTable({
    rows,
    columns: columnsProp,
    emptyMessage = "Không có dữ liệu để hiển thị.",
    maxHeight = "max-h-64",
    highlightRows,
    variant = "default",
}: DataTableProps) {
    const columns = useMemo(
        () => inferColumns(rows, columnsProp),
        [rows, columnsProp],
    );

    if (rows.length === 0 || columns.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-500">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div
            className={`overflow-hidden rounded-lg border ${variantContainer[variant]}`}
        >
            <div className={`scrollbar-none overflow-auto ${maxHeight}`}>
                <table className="w-full min-w-full border-collapse text-left text-xs">
                    <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-zinc-800">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className={`whitespace-nowrap border-b border-slate-200 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-slate-700 dark:border-zinc-700 dark:text-zinc-200 ${
                                        isNumericColumn(col) ? "text-right" : "text-left"
                                    }`}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-950">
                        {rows.map((row, i) => {
                            const highlighted = highlightRows?.(row);
                            return (
                                <tr
                                    key={String(row.id ?? i)}
                                    className={`border-b border-slate-100 transition-colors last:border-b-0 dark:border-zinc-800/80 ${
                                        highlighted
                                            ? "bg-amber-50 dark:bg-amber-950/20"
                                            : i % 2 === 1
                                              ? "bg-slate-50/60 dark:bg-zinc-900/40"
                                              : ""
                                    } hover:bg-slate-50 dark:hover:bg-zinc-800/60`}
                                >
                                    {columns.map((col) => {
                                        const val = formatCell(row[col]);
                                        return (
                                            <td
                                                key={col}
                                                title={val.length > 28 ? val : undefined}
                                                className={`max-w-[180px] truncate px-3 py-2 text-slate-900 dark:text-zinc-100 ${
                                                    isNumericColumn(col)
                                                        ? "text-right font-mono tabular-nums"
                                                        : "text-left"
                                                }`}
                                            >
                                                {val}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
