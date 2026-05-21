"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Award,
    ArrowLeft,
    CheckCircle2,
    Clock,
    Lock,
    Play,
    Target,
} from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import KnowledgeMapModal from "@/app/components/skills/KnowledgeMapModal";
import { goToLearnModule, getProgramSkillSummaries } from "@/lib/skill-navigation";
import { getSkillProgress } from "@/lib/learner-skill-progress";
import {
    HOW_IT_WORKS,
    NOVATECH_PROGRAM,
    PROGRAM_OVERVIEW,
    PROGRAM_VALUE_PROPS,
    getTaskTimeline,
} from "@/lib/internship-detail";
import { vi } from "@/lib/vi";

type Props = {
    onBack: () => void;
    onStart: () => void;
};

export default function InternshipProgramDetail({ onBack, onStart }: Props) {
    const [mapOpen, setMapOpen] = useState(false);
    const timeline = getTaskTimeline();
    const p = NOVATECH_PROGRAM;
    const programSkills = getProgramSkillSummaries("coccoc-data-ops");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-5xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
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
                                    href="/companies/coccoc"
                                    className="text-sm text-slate-500 hover:text-violet-600 hover:underline dark:text-zinc-500 dark:hover:text-indigo-400"
                                >
                                    {p.company}
                                </Link>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {p.programTitle}
                                </h1>
                                <p className="text-xs text-slate-400 dark:text-zinc-600">
                                    {p.programTitleEn}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm font-medium text-violet-600 dark:text-indigo-400">
                            {p.role}
                        </p>
                        <p className="mt-4 max-w-xl text-slate-600 dark:text-zinc-400">
                            {p.description}
                        </p>
                        <button
                            type="button"
                            onClick={onStart}
                            className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 dark:bg-emerald-700"
                        >
                            <Play className="h-4 w-4" />
                            {vi.internship.startSimulation}
                        </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                            Tóm tắt chương trình
                        </p>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div>
                                <dt className="text-slate-500 dark:text-zinc-500">Thời lượng</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">
                                    {p.estimatedTime}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-zinc-500">Số task</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">
                                    {p.taskCount}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-zinc-500">Cấp độ</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">
                                    {p.difficulty}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-zinc-500">Hình thức</dt>
                                <dd className="font-medium text-slate-900 dark:text-white">
                                    Tự học
                                </dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-zinc-500">Kết quả</dt>
                                <dd className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
                                    <Award className="h-4 w-4" />
                                    Badge hoàn thành
                                </dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-zinc-500">
                                    {vi.data.datasetLabel}
                                </dt>
                                <dd className="font-mono text-xs text-slate-800 dark:text-zinc-200">
                                    {p.dataset}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PROGRAM_VALUE_PROPS.map((v) => (
                        <div
                            key={v.title}
                            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {v.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">{v.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {PROGRAM_OVERVIEW.map((o) => (
                        <div
                            key={o.title}
                            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <Target className="mb-2 h-5 w-5 text-violet-600 dark:text-indigo-400" />
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {o.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                                {o.body}
                            </p>
                        </div>
                    ))}
                </div>

                <section className="mt-12">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Cách hoạt động
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {HOW_IT_WORKS.map((s) => (
                            <div
                                key={s.step}
                                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                                    {s.step}
                                </span>
                                <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                                    {s.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {vi.links.prereqSkills}
                        </h2>
                        <button
                            type="button"
                            onClick={() => setMapOpen(true)}
                            className="text-xs font-medium text-violet-600 hover:underline dark:text-indigo-400"
                        >
                            {vi.links.viewKnowledgeMap}
                        </button>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {programSkills.map((s) => {
                            const prog = getSkillProgress(s.skillId);
                            const btnLabel =
                                prog.progress >= 80
                                    ? vi.links.solid
                                    : prog.progress >= 30
                                      ? vi.links.reviewAgain
                                      : vi.links.learn;
                            return (
                                <div
                                    key={s.skillId}
                                    className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {s.title}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {s.taskCount} task · {prog.progress}%
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => goToLearnModule(s.learnModuleId)}
                                        className="mt-2 text-xs font-medium text-violet-600 hover:underline dark:text-indigo-400"
                                    >
                                        {btnLabel}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Danh sách task
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
                        Task mô phỏng công việc thực tế — tự học theo tốc độ cá nhân
                    </p>
                    <ol className="mt-6 space-y-0">
                        {timeline.map((t, i) => (
                            <li key={t.id} className="relative flex gap-4 pb-8 last:pb-0">
                                {i < timeline.length - 1 && (
                                    <span
                                        className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-slate-200 dark:bg-zinc-800"
                                        aria-hidden
                                    />
                                )}
                                <div
                                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                        t.locked
                                            ? "bg-slate-100 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600"
                                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                    }`}
                                >
                                    {t.locked ? (
                                        <Lock className="h-3.5 w-3.5" />
                                    ) : (
                                        t.number
                                    )}
                                </div>
                                <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {t.title}
                                        </h3>
                                        <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-600">
                                            <Clock className="h-3 w-3" />
                                            {t.estimatedMin}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                        {t.shortDesc}
                                    </p>
                                    {t.skillChips.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {t.skillChips.map((s) => (
                                                <span
                                                    key={s.title}
                                                    className="rounded border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-[10px] text-violet-800 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-300"
                                                >
                                                    {s.title} · {s.progress}%
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {t.skills.map((s) => (
                                            <span
                                                key={s}
                                                className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500 dark:border-zinc-700 dark:text-zinc-500"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    {!t.locked && (
                                        <p className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Sẵn sàng khi bắt đầu mô phỏng
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <div className="mt-10 flex justify-center pb-8">
                    <button
                        type="button"
                        onClick={onStart}
                        className="rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                        {vi.internship.startSimulation}
                    </button>
                </div>
            </main>
            <KnowledgeMapModal open={mapOpen} onClose={() => setMapOpen(false)} />
        </div>
    );
}
