"use client";

import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import { DA_RETENTION_PROGRAM } from "@/lib/da-retention-interview";

type Props = {
    sqlScore: number;
    insightScore: number;
    dashboardScore: number;
    overallScore: number;
    passed: boolean;
    onRestart: () => void;
    onDashboard: () => void;
    onViewReference: () => void;
    onReviewSubmission: () => void;
};

export default function DaRetentionComplete({
    sqlScore,
    insightScore,
    dashboardScore,
    overallScore,
    passed,
    onRestart,
    onDashboard,
    onViewReference,
    onReviewSubmission,
}: Props) {
    const p = DA_RETENTION_PROGRAM;
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <CheckCircle2
                    className={`mx-auto h-16 w-16 ${passed ? "text-emerald-500" : "text-amber-500"}`}
                />
                <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Hoàn thành mô phỏng phỏng vấn Data Analyst Intern
                </h1>
                <p className="mt-2 text-slate-600 dark:text-zinc-400">
                    Bạn đã hoàn thành retention case cho team Product Analytics.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
                    <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <dt>SQL / Data Wrangling</dt>
                            <dd className="font-semibold">{sqlScore}%</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Insight & Business Thinking</dt>
                            <dd className="font-semibold">{insightScore}%</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Dashboard Communication</dt>
                            <dd className="font-semibold">{dashboardScore}%</dd>
                        </div>
                        <div className="flex justify-between border-t border-slate-100 pt-2 dark:border-zinc-800">
                            <dt className="font-semibold">Overall</dt>
                            <dd className="font-bold text-violet-600 dark:text-indigo-400">
                                {overallScore}%
                            </dd>
                        </div>
                    </dl>
                    <p className="mt-4 text-center text-sm font-semibold">
                        Kết quả: {passed ? "Đạt" : "Cần cải thiện"}
                    </p>
                </div>

                {passed && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                        <Award className="h-6 w-6" />
                        <span className="font-semibold">{p.badge}</span>
                    </div>
                )}

                <ul className="mt-6 space-y-2 text-left text-xs text-slate-600 dark:text-zinc-400">
                    <li>
                        • Bạn đã biết cách chia vấn đề retention thành cohort, behavior và
                        transaction analysis.
                    </li>
                    <li>
                        • Phần insight có liên hệ tốt giữa dữ liệu và đề xuất product action.
                    </li>
                    <li>
                        • Dashboard nên tiếp tục cải thiện bằng cách làm rõ north star metric và
                        labels.
                    </li>
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                    <button
                        type="button"
                        onClick={onViewReference}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-zinc-700"
                    >
                        Xem đáp án tham khảo
                    </button>
                    <button
                        type="button"
                        onClick={onReviewSubmission}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-zinc-700"
                    >
                        Xem lại bài nộp
                    </button>
                    <button
                        type="button"
                        onClick={onRestart}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-zinc-700"
                    >
                        Làm lại interview
                    </button>
                    <button
                        type="button"
                        onClick={onDashboard}
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm text-white dark:bg-indigo-600"
                    >
                        Quay về Dashboard
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
