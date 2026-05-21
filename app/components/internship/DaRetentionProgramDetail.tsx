"use client";

import Link from "next/link";
import { ArrowLeft, Play, Target } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import {
    DA_HOW_IT_WORKS,
    DA_PARTS,
    DA_RETENTION_PROGRAM,
    RELATED_LEARN,
} from "@/lib/da-retention-interview";

type Props = {
    onBack: () => void;
    onStart: () => void;
};

export default function DaRetentionProgramDetail({ onBack, onStart }: Props) {
    const p = DA_RETENTION_PROGRAM;
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-5xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh mục
                    </button>
                    <ThemeToggle compact />
                </div>

                <section className="grid gap-8 lg:grid-cols-[1fr_280px]">
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-xl font-bold text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                {p.initials}
                            </div>
                            <div>
                                <Link
                                    href="/companies/novatech"
                                    className="text-sm text-slate-500 hover:underline dark:text-indigo-400"
                                >
                                    {p.company}
                                </Link>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {p.programTitle}
                                </h1>
                                <p className="text-xs text-slate-400">{p.programTitleEn}</p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm font-medium text-violet-600 dark:text-indigo-400">
                            {p.role} · {p.team}
                        </p>
                        <p className="mt-4 max-w-xl text-slate-600 dark:text-zinc-400">
                            {p.heroDescription}
                        </p>
                        <button
                            type="button"
                            onClick={onStart}
                            className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white dark:bg-indigo-600"
                        >
                            <Play className="h-4 w-4" />
                            Bắt đầu interview
                        </button>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-xs font-semibold uppercase text-slate-500">Tóm tắt</p>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div>
                                <dt className="text-slate-500">Thời lượng</dt>
                                <dd>{p.estimatedTime}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Độ khó</dt>
                                <dd>{p.difficulty}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Ngưỡng pass</dt>
                                <dd>≥ {p.passThreshold}% tổng điểm</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-lg font-bold">Cấu trúc chương trình</h2>
                    <ol className="mt-4 space-y-3">
                        {DA_PARTS.map((s) => (
                            <li
                                key={s.id}
                                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                                    {s.id}
                                </span>
                                <div>
                                    <p className="font-medium">{s.title}</p>
                                    <p className="text-xs text-slate-500">{s.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="mt-12">
                    <h2 className="text-lg font-bold">Cách hoạt động</h2>
                    <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                        {DA_HOW_IT_WORKS.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                </section>

                <section className="mt-12">
                    <h2 className="text-lg font-bold">Kiến thức liên quan</h2>
                    <ul className="mt-4 space-y-2">
                        {RELATED_LEARN.map((l) => (
                            <li
                                key={l.skill}
                                className="flex justify-between rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-zinc-800"
                            >
                                <span>{l.skill}</span>
                                {l.status === "available" && l.href ? (
                                    <Link
                                        href={l.href}
                                        className="text-violet-600 hover:underline dark:text-indigo-400"
                                    >
                                        Ôn lại
                                    </Link>
                                ) : (
                                    <span className="text-slate-400">Sắp ra mắt</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-xs text-slate-500">
                        Bạn vẫn có thể làm interview bằng kết quả mẫu nếu chưa học đủ SQL
                        nâng cao.
                    </p>
                </section>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {p.skills.slice(0, 6).map((s) => (
                        <div
                            key={s}
                            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <Target className="mb-2 h-5 w-5 text-violet-600 dark:text-indigo-400" />
                            <p className="text-sm font-medium">{s}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
