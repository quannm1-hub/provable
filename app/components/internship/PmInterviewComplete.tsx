"use client";

import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import { PM_INTERVIEW_PROGRAM } from "@/lib/pm-internship-detail";

type Props = {
    onRestart: () => void;
    onDashboard: () => void;
    onExplore: () => void;
};

export default function PmInterviewComplete({
    onRestart,
    onDashboard,
    onExplore,
}: Props) {
    const p = PM_INTERVIEW_PROGRAM;
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Hoàn thành mô phỏng phỏng vấn
                </h1>
                <p className="mt-2 text-slate-600 dark:text-zinc-400">
                    Bạn đã hoàn thành task PRD cho Provable Coach tại {p.company}.
                </p>
                <div className="mt-8 rounded-2xl border border-violet-200 bg-white p-6 text-left dark:border-indigo-900/50 dark:bg-zinc-900">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <Award className="h-5 w-5" />
                        <span className="text-sm font-semibold">Kỹ năng đã luyện</span>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {p.skills.map((s) => (
                            <li
                                key={s}
                                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={onRestart}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-zinc-700"
                    >
                        Làm lại
                    </button>
                    <button
                        type="button"
                        onClick={onExplore}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-zinc-700"
                    >
                        Khám phá mô phỏng khác
                    </button>
                    <button
                        type="button"
                        onClick={onDashboard}
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm text-white dark:bg-indigo-600"
                    >
                        Quay về Bảng điều khiển
                    </button>
                </div>
                <Link
                    href="/profile/submissions"
                    className="mt-6 inline-block text-sm text-violet-600 hover:underline dark:text-indigo-400"
                >
                    Xem bài nộp của tôi →
                </Link>
            </main>
        </div>
    );
}
