"use client";

import { X } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    description: string;
    difficulty?: string;
    estimatedTime?: string;
    tags?: string[];
    modulesOrTasks?: string[];
    modulesLabel?: string;
    footerNote?: string;
    primaryAction?: { label: string; href?: string; onClick?: () => void };
};

export default function PreviewModal({
    open,
    onClose,
    title,
    subtitle,
    description,
    difficulty,
    estimatedTime,
    tags = [],
    modulesOrTasks = [],
    modulesLabel = "Nội dung dự kiến",
    footerNote = "Nội dung này đang được phát triển.",
    primaryAction,
}: Props) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        {subtitle && (
                            <p className="text-xs font-medium text-violet-600 dark:text-indigo-400">
                                {subtitle}
                            </p>
                        )}
                        <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {title}
                        </h2>
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

                <p className="mt-4 text-sm text-slate-600 dark:text-zinc-400">{description}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {difficulty && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {difficulty}
                        </span>
                    )}
                    {estimatedTime && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {estimatedTime}
                        </span>
                    )}
                </div>

                {tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                            <span
                                key={t}
                                className="rounded border border-violet-200 px-2 py-0.5 text-[10px] text-violet-700 dark:border-indigo-800 dark:text-indigo-300"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {modulesOrTasks.length > 0 && (
                    <div className="mt-6">
                        <p className="text-xs font-medium uppercase text-slate-500 dark:text-zinc-500">
                            {modulesLabel}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                            {modulesOrTasks.map((m, i) => (
                                <li
                                    key={m}
                                    className="flex gap-2 text-sm text-slate-700 dark:text-zinc-300"
                                >
                                    <span className="text-slate-400">{i + 1}.</span>
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                    {footerNote}
                </p>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    {primaryAction?.href ? (
                        <a
                            href={primaryAction.href}
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                        >
                            {primaryAction.label}
                        </a>
                    ) : primaryAction?.onClick ? (
                        <button
                            type="button"
                            onClick={primaryAction.onClick}
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                        >
                            {primaryAction.label}
                        </button>
                    ) : null}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}
