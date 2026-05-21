"use client";

import { Table2 } from "lucide-react";
import DataTable from "@/app/components/DataTable";
import type { DatasetId } from "@/lib/datasets";
import { DATASET_META } from "@/lib/datasets";
import { getCompanyDatasetMeta } from "@/lib/company-datasets";

type Props = {
    datasetId: DatasetId;
    rows: Record<string, string | number>[];
    title?: string;
    description?: string;
    maxHeight?: string;
};

export default function DatasetTableSection({
    datasetId,
    rows,
    title,
    description,
    maxHeight = "max-h-72",
}: Props) {
    const meta = DATASET_META[datasetId];
    const companyMeta = getCompanyDatasetMeta(datasetId);

    return (
        <div>
            <p className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-zinc-300">
                <Table2 className="h-3.5 w-3.5 text-violet-600 dark:text-indigo-400" />
                {title ?? `Bảng ${meta.tableName}`}
            </p>
            <p className="mb-2 text-xs text-slate-500 dark:text-zinc-500">
                {description ?? companyMeta.description}
            </p>
            <p className="mb-3 text-[10px] text-slate-400 dark:text-zinc-600">
                {rows.length} dòng · {meta.columns.length} cột
            </p>
            <DataTable
                rows={rows as Record<string, unknown>[]}
                columns={meta.columns}
                variant="default"
                maxHeight={maxHeight}
            />
        </div>
    );
}
