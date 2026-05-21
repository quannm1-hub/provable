"use client";

import { useMemo, useState } from "react";
import AppNav from "@/app/components/layout/AppNav";
import InternshipCard from "@/app/components/internship/InternshipCard";
import PreviewModal from "@/app/components/PreviewModal";
import {
    INTERNSHIP_FILTERS,
    INTERNSHIP_PROGRAMS,
    type InternshipProgram,
} from "@/lib/catalog";
import { COMPANIES, companyBadge } from "@/lib/companies";
import { vi } from "@/lib/vi";
import Link from "next/link";

export default function InternshipsClient() {
    const [preview, setPreview] = useState<InternshipProgram | null>(null);
    const [filterId, setFilterId] = useState("all");

    const filtered = useMemo(() => {
        const f = INTERNSHIP_FILTERS.find((x) => x.id === filterId);
        if (!f?.match) return INTERNSHIP_PROGRAMS;
        return INTERNSHIP_PROGRAMS.filter(f.match);
    }, [filterId]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {vi.internship.pageTitle}
                </h1>
                <p className="mt-2 max-w-2xl text-slate-600 dark:text-zinc-400">
                    {vi.internship.pageSubtitle}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-zinc-600">
                    {INTERNSHIP_PROGRAMS.length} chương trình · Cốc Cốc (SQL) & NovaTech (PRD)
                </p>

                <section className="mt-10">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Doanh nghiệp mô phỏng
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                        Tìm hiểu bối cảnh doanh nghiệp giả lập trước khi bắt đầu chương trình.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {COMPANIES.map((c) => (
                            <div
                                key={c.id}
                                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                        {c.logoInitials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-slate-900 dark:text-white">
                                            {c.name}
                                        </p>
                                        <p className="truncate text-[10px] text-slate-500 dark:text-zinc-500">
                                            {c.industry}
                                        </p>
                                    </div>
                                </div>
                                <span className="mt-3 inline-block w-fit rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                                    {companyBadge(c.status)}
                                </span>
                                <Link
                                    href={`/companies/${c.id}`}
                                    className="mt-3 rounded-lg border border-slate-200 py-2 text-center text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                >
                                    Xem
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-10 flex flex-wrap gap-2">
                    {INTERNSHIP_FILTERS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => setFilterId(f.id)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                                filterId === f.id
                                    ? "bg-violet-600 text-white dark:bg-indigo-600"
                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                    {filtered.map((program) => (
                        <InternshipCard
                            key={program.id}
                            program={program}
                            variant="catalog"
                            onPreview={setPreview}
                        />
                    ))}
                </div>
            </main>

            <PreviewModal
                open={!!preview}
                onClose={() => setPreview(null)}
                title={preview?.title ?? ""}
                subtitle={`${preview?.company} · ${preview?.programTitleEn ?? ""}`}
                description={preview?.description ?? ""}
                difficulty={preview?.difficulty}
                estimatedTime={preview?.estimatedTime}
                tags={preview?.skills}
                modulesOrTasks={preview?.previewTasks}
                modulesLabel="Danh sách task mô phỏng"
            />
        </div>
    );
}
