"use client";

import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import {
    COCCOC_HOME_TEST_PROGRAM,
    COCCOC_PARTS,
    RELATED_LEARN,
} from "@/lib/coccoc-home-test";

type Props = {
    onBack: () => void;
    onStart: () => void;
};

export default function CoccocHomeTestProgramDetail({ onBack, onStart }: Props) {
    const p = COCCOC_HOME_TEST_PROGRAM;
    const w = p.weights;
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

                <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
                    <div>
                        <Link
                            href="/companies/coccoc"
                            className="text-sm text-violet-600 hover:underline"
                        >
                            {p.company}
                        </Link>
                        <h1 className="mt-2 text-2xl font-bold">{p.vietnameseTitle}</h1>
                        <p className="text-xs text-slate-400">{p.programTitleEn}</p>
                        <p className="mt-2 text-sm text-violet-600">
                            {p.role} · {p.team}
                        </p>
                        <p className="mt-4 text-slate-600">{p.description}</p>
                        <p className="mt-2 text-xs text-slate-500">{p.sourceNote}</p>
                        <button
                            type="button"
                            onClick={onStart}
                            className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
                        >
                            <Play className="h-4 w-4" />
                            Bắt đầu test
                        </button>
                    </div>
                    <div className="rounded-2xl border bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                        <dl className="space-y-2 text-sm">
                            <div>
                                <dt className="text-slate-500">Thời lượng</dt>
                                <dd>{p.estimatedTime}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Độ khó</dt>
                                <dd>{p.difficulty}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Số phần</dt>
                                <dd>6</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Cấu trúc bài test</h2>
                    <ol className="mt-4 space-y-3">
                        {COCCOC_PARTS.map((part) => (
                            <li
                                key={part.id}
                                className="rounded-xl border bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <p className="font-medium">
                                    Phần {part.id}: {part.title}
                                </p>
                                <p className="text-xs text-slate-500">{part.estimatedTime}</p>
                                <p className="mt-1 text-xs">{part.description}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Trọng số chấm điểm</h2>
                    <ul className="mt-3 list-inside list-disc text-sm text-slate-600">
                        <li>Logic: {w.logic * 100}%</li>
                        <li>SQL: {w.sql * 100}%</li>
                        <li>Clickstream: {w.clickstream * 100}%</li>
                        <li>Investigation: {w.investigation * 100}%</li>
                        <li>Mobile: {w.mobile * 100}%</li>
                        <li>Reflection: {w.reflection * 100}%</li>
                    </ul>
                    <p className="mt-2 text-xs">Pass: ≥ {p.passThreshold}%</p>
                </section>

                <section className="mt-10">
                    <h2 className="text-lg font-bold">Kiến thức liên quan</h2>
                    <ul className="mt-3 space-y-2">
                        {RELATED_LEARN.map((l) => (
                            <li
                                key={l.skill}
                                className="flex justify-between rounded-lg border px-3 py-2 text-sm dark:border-zinc-800"
                            >
                                <span>{l.skill}</span>
                                {l.status === "available" && l.href ? (
                                    <Link href={l.href} className="text-violet-600">
                                        Ôn lại
                                    </Link>
                                ) : (
                                    <span className="text-slate-400">Sắp ra mắt</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}
