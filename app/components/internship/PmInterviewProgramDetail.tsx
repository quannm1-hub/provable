"use client";

import Link from "next/link";
import { ArrowLeft, Play, Target } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import {
    PM_DOCUMENT_TASK,
    PM_HOW_IT_WORKS,
    PM_INTERVIEW_PROGRAM,
    PM_TASK_TIMELINE,
    PM_VALUE_PROPS,
} from "@/lib/pm-internship-detail";

type Props = {
    onBack: () => void;
    onStart: () => void;
};

export default function PmInterviewProgramDetail({ onBack, onStart }: Props) {
    const p = PM_INTERVIEW_PROGRAM;
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
                            {p.description}
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
                        <p className="text-xs font-semibold uppercase text-slate-500">
                            Tóm tắt
                        </p>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div>
                                <dt className="text-slate-500">Thời lượng</dt>
                                <dd>{p.estimatedTime}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Loại task</dt>
                                <dd>Product Requirement Documentation</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Ngưỡng pass</dt>
                                <dd>≥ 90% trùng khớp</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PM_VALUE_PROPS.map((v) => (
                        <div
                            key={v.title}
                            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <p className="font-semibold text-slate-900 dark:text-white">
                                {v.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">{v.desc}</p>
                        </div>
                    ))}
                </div>

                <section className="mt-12">
                    <h2 className="text-lg font-bold">Lộ trình task</h2>
                    <ol className="mt-4 space-y-3">
                        {PM_TASK_TIMELINE.map((s) => (
                            <li
                                key={s.number}
                                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                                    {s.number}
                                </span>
                                <div>
                                    <p className="font-medium">{s.title}</p>
                                    <p className="text-xs text-slate-500">{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="mt-12">
                    <h2 className="text-lg font-bold">Task chính</h2>
                    <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50/50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/20">
                        <p className="font-semibold text-slate-900 dark:text-white">
                            {PM_DOCUMENT_TASK.title}
                        </p>
                        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                            {PM_DOCUMENT_TASK.scenario}
                        </p>
                    </div>
                </section>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PM_HOW_IT_WORKS.map((s) => (
                        <div
                            key={s.step}
                            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <Target className="mb-2 h-5 w-5 text-violet-600 dark:text-indigo-400" />
                            <p className="font-semibold">{s.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
