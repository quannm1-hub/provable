"use client";

import { X } from "lucide-react";
import DataTable from "@/app/components/DataTable";
import type { CompanyDatasetMeta } from "@/lib/company-datasets";
import { getDatasetPreviewRows } from "@/lib/company-datasets";

type Props = {
    open: boolean;
    onClose: () => void;
    meta: CompanyDatasetMeta | null;
};

export default function DatasetSampleModal({ open, onClose, meta }: Props) {
    if (!open || !meta) return null;

    const rows = getDatasetPreviewRows(meta.id, 5);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium text-violet-600 dark:text-indigo-400">
                            {meta.name}
                        </p>
                        <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {meta.vietnameseName}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                            {meta.description}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                            {meta.rowCount} dòng mẫu · {meta.columns.length} cột
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800"
                        aria-label="Đóng"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="mt-4 text-[11px] text-slate-400 dark:text-zinc-600">
                    Dữ liệu mẫu phục vụ luyện tập — không phải dữ liệu sản xuất của doanh nghiệp.
                </p>

                <div className="mt-4">
                    <DataTable
                        rows={rows as Record<string, unknown>[]}
                        columns={meta.columns}
                        variant="default"
                        maxHeight="max-h-64"
                    />
                </div>
            </div>
        </div>
    );
}
