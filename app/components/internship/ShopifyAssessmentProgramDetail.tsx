"use client";

import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import {
    COCCOC_DE_ACCEPTED_FORMATS,
    COCCOC_DE_ASSESSMENT_PROGRAM,
    COCCOC_DE_EXPECTED_PACKAGE,
    COCCOC_DE_PASS_CRITERIA,
    COCCOC_DE_TASK,
} from "@/lib/coccoc-de-assessment";
import { DEMO_FILE_HINTS } from "@/lib/assessment-evaluator";

type Props = {
    onBack: () => void;
    onStart: () => void;
};

export default function ShopifyAssessmentProgramDetail({ onBack, onStart }: Props) {
    const p = COCCOC_DE_ASSESSMENT_PROGRAM;
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-5xl px-4 py-8">
                <div className="mb-6 flex justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm text-slate-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh mục
                    </button>
                    <ThemeToggle compact />
                </div>

                <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
                    <div>
                        <Link
                            href="/companies/coccoc"
                            className="text-sm text-emerald-600 hover:underline"
                        >
                            {p.company}
                        </Link>
                        <h1 className="mt-2 text-2xl font-bold">{p.vietnameseTitle}</h1>
                        <p className="text-xs text-slate-400">{p.programTitleEn}</p>
                        <p className="mt-4 text-slate-600">{p.description}</p>
                        <button
                            type="button"
                            onClick={onStart}
                            className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
                        >
                            <Play className="h-4 w-4" />
                            Bắt đầu chấm thử
                        </button>
                    </div>
                    <div className="rounded-2xl border bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                        <dl className="space-y-2 text-sm">
                            <div>
                                <dt className="text-slate-500">Vai trò</dt>
                                <dd>{p.role}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Team</dt>
                                <dd>{p.team}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Thời lượng</dt>
                                <dd>{p.estimatedTime}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Hình thức</dt>
                                <dd>Upload package · review pipeline</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">{COCCOC_DE_TASK.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{COCCOC_DE_TASK.scenario}</p>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Package mong đợi</h2>
                    <ul className="mt-4 list-inside list-disc text-sm text-slate-600">
                        {COCCOC_DE_EXPECTED_PACKAGE.map((x) => (
                            <li key={x}>{x}</li>
                        ))}
                    </ul>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Format chấp nhận</h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        {COCCOC_DE_ACCEPTED_FORMATS.map((f) => (
                            <li key={f.ext}>
                                <code>{f.ext}</code> — {f.note}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Pipeline chấm bài</h2>
                    <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-600">
                        <li>Pre-check: format, deadline, README, word count</li>
                        <li>Similarity & template copy</li>
                        <li>Code run</li>
                        <li>Content review, spell check, AI spam</li>
                        <li>LLM model review & quyết định reviewer</li>
                    </ol>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Tiêu chí đạt</h2>
                    <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                        {COCCOC_DE_PASS_CRITERIA.map((x) => (
                            <li key={x}>{x}</li>
                        ))}
                    </ul>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Tên file mẫu</h2>
                    <ul className="mt-2 space-y-1 text-xs font-mono text-slate-600">
                        {DEMO_FILE_HINTS.map((h) => (
                            <li key={h.name}>
                                {h.name} → {h.outcome}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}
