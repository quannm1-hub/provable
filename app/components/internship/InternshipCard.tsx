"use client";

import Link from "next/link";
import { Building2, Clock, Lock } from "lucide-react";
import type { InternshipProgram } from "@/lib/catalog";
import { internshipBadge } from "@/lib/catalog";
import { vi } from "@/lib/vi";

type Props = {
    program: InternshipProgram;
    variant?: "default" | "catalog";
    onPreview: (program: InternshipProgram) => void;
};

export default function InternshipCard({
    program,
    variant = "catalog",
    onPreview,
}: Props) {
    const locked = program.status !== "available";
    const badge = internshipBadge(program.status);
    const isCatalog = variant === "catalog";

    const cta =
        program.status === "available"
            ? { label: vi.internship.startProgram, href: program.href }
            : program.status === "preview"
              ? { label: vi.internship.previewProgram, onClick: () => onPreview(program) }
              : { label: vi.internship.previewProgram, onClick: () => onPreview(program) };

    return (
        <article
            className={`group flex flex-col overflow-hidden rounded-2xl border transition hover:shadow-lg ${
                isCatalog
                    ? "border-slate-200 bg-white hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    : program.status === "available"
                      ? "border-emerald-200 bg-white dark:border-emerald-800/40 dark:bg-zinc-900/50"
                      : "border-slate-200 bg-slate-50/80 dark:border-zinc-800 dark:bg-zinc-900/30"
            }`}
        >
            <div
                className={`border-b px-6 py-5 ${
                    isCatalog
                        ? "border-slate-100 bg-gradient-to-br from-slate-50 to-white dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
                        : ""
                }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                            {program.initials}
                        </div>
                        <div>
                            <Link
                                href={`/companies/${program.companyId}`}
                                className="text-xs font-medium text-slate-500 hover:text-violet-600 hover:underline dark:text-zinc-500 dark:hover:text-indigo-400"
                            >
                                {program.company}
                            </Link>
                            <h2 className="text-lg font-semibold leading-snug text-slate-900 dark:text-white">
                                {program.title}
                            </h2>
                            {program.programTitleEn && (
                                <p className="mt-0.5 text-[11px] text-slate-400 dark:text-zinc-600">
                                    {program.programTitleEn}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                program.status === "available"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                    : program.status === "preview"
                                      ? "bg-violet-100 text-violet-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                                      : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-500"
                            }`}
                        >
                            {badge}
                        </span>
                        {locked && (
                            <Lock className="h-4 w-4 text-slate-400 dark:text-zinc-600" />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col px-6 py-5">
                <p className="text-xs font-medium text-violet-600 dark:text-indigo-400">
                    {program.role}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {program.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                    {program.skills.map((s) => (
                        <li
                            key={s}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                        >
                            {s}
                        </li>
                    ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-zinc-500">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {program.estimatedTime}
                    </span>
                    <span>{vi.internship.tasksLabel(program.taskCount)}</span>
                    <span>{program.difficulty}</span>
                </div>
                {program.format && (
                    <p className="mt-1 text-[11px] text-slate-400 dark:text-zinc-600">
                        {program.format}
                    </p>
                )}
                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-600">
                    <Building2 className="h-3 w-3" />
                    Dataset: {program.dataset}
                </p>

                <div className="mt-6 flex flex-col gap-2">
                    <Link
                        href={`/companies/${program.companyId}`}
                        className="block rounded-lg border border-slate-200 py-2.5 text-center text-sm text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                        Xem doanh nghiệp
                    </Link>
                    {program.status === "available" && program.href ? (
                        <Link
                            href={program.href}
                            className="block rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-500 dark:bg-emerald-700"
                        >
                            {vi.internship.startProgram}
                        </Link>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={cta.onClick}
                                className="rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                            >
                                {cta.label}
                            </button>
                            {program.status !== "preview" && (
                                <button
                                    type="button"
                                    disabled
                                    className="cursor-not-allowed rounded-lg border border-slate-200 py-2.5 text-sm text-slate-400 dark:border-zinc-800"
                                >
                                    Sắp ra mắt
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </article>
    );
}
