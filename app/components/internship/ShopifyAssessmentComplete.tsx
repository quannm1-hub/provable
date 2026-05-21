"use client";

import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import { COCCOC_DE_ASSESSMENT_PROGRAM } from "@/lib/coccoc-de-assessment";
import type { AssessmentDecision } from "@/lib/assessment-evaluator";

type Props = {
    score: number;
    decision: AssessmentDecision;
    fileName: string;
    onRestart: () => void;
    onDashboard: () => void;
};

export default function ShopifyAssessmentComplete({
    score,
    decision,
    fileName,
    onRestart,
    onDashboard,
}: Props) {
    const p = COCCOC_DE_ASSESSMENT_PROGRAM;
    const passed = decision === "Strong Pass" || decision === "Pass";
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <CheckCircle2
                    className={`mx-auto h-16 w-16 ${passed ? "text-emerald-500" : "text-amber-500"}`}
                />
                <h1 className="mt-6 text-2xl font-bold">Hoàn thành assessment review</h1>
                <p className="mt-2 text-slate-600">
                    File: <span className="font-mono text-sm">{fileName}</span>
                </p>
                <p className="mt-4 text-3xl font-bold text-emerald-600">{score}%</p>
                <p className="text-sm font-medium">Quyết định reviewer: {decision}</p>
                {passed && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-amber-600">
                        <Award className="h-6 w-6" />
                        <span className="font-semibold">{p.badge}</span>
                    </div>
                )}
                <div className="mt-8 flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={onRestart}
                        className="rounded-xl border px-4 py-2 text-sm"
                    >
                        Làm lại
                    </button>
                    <button
                        type="button"
                        onClick={onDashboard}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white"
                    >
                        Quay về Dashboard
                    </button>
                </div>
                <Link
                    href="/profile/submissions"
                    className="mt-4 inline-block text-sm text-violet-600"
                >
                    Xem bài nộp →
                </Link>
            </main>
        </div>
    );
}
