"use client";

import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import {
    COCCOC_HOME_TEST_PROGRAM,
    overallLabel,
} from "@/lib/coccoc-home-test";

type Props = {
    logic: number;
    sql: number;
    clickstream: number;
    investigation: number;
    mobile: number;
    reflection: number;
    overall: number;
    onRestart: () => void;
    onDashboard: () => void;
    onReview: () => void;
    onReference: () => void;
};

export default function CoccocHomeTestComplete({
    logic,
    sql,
    clickstream,
    investigation,
    mobile,
    reflection,
    overall,
    onRestart,
    onDashboard,
    onReview,
    onReference,
}: Props) {
    const p = COCCOC_HOME_TEST_PROGRAM;
    const label = overallLabel(overall);
    const passed = overall >= p.passThreshold;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <CheckCircle2
                    className={`mx-auto h-16 w-16 ${passed ? "text-emerald-500" : "text-amber-500"}`}
                />
                <h1 className="mt-6 text-2xl font-bold">
                    Hoàn thành mô phỏng Home Test Data Analyst Intern tại Cốc Cốc
                </h1>
                <p className="mt-2 text-sm text-slate-500">{label}</p>

                <div className="mt-8 rounded-2xl border bg-white p-6 text-left text-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <dl className="space-y-2">
                        <Row label="Logic" value={logic} />
                        <Row label="SQL" value={sql} />
                        <Row label="Clickstream" value={clickstream} />
                        <Row label="Product analysis (P4+P5+P6 avg)" value={Math.round((investigation + mobile + reflection) / 3)} />
                        <Row label="Investigation" value={investigation} />
                        <Row label="Mobile metrics" value={mobile} />
                        <Row label="Reflection" value={reflection} />
                        <div className="border-t pt-2 font-bold text-violet-600">
                            Overall: {overall}%
                        </div>
                    </dl>
                </div>

                {passed && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-amber-600">
                        <Award className="h-6 w-6" />
                        <span className="font-semibold">{p.badge}</span>
                    </div>
                )}

                <ul className="mt-6 space-y-2 text-left text-xs text-slate-600">
                    <li>• Bạn đã luyện logic, SQL và clickstream theo format home test thực tế.</li>
                    <li>• Phần mở rộng thể hiện tư duy product và metric design.</li>
                    <li>• Tiếp tục ôn JOIN, window functions và cohort analysis.</li>
                </ul>

                <div className="mt-8 flex flex-col gap-2">
                    <button type="button" onClick={onReference} className="rounded-xl border px-4 py-2 text-sm">
                        Xem đáp án tham khảo
                    </button>
                    <button type="button" onClick={onReview} className="rounded-xl border px-4 py-2 text-sm">
                        Xem lại bài làm
                    </button>
                    <button type="button" onClick={onRestart} className="rounded-xl border px-4 py-2 text-sm">
                        Làm lại test
                    </button>
                    <button
                        type="button"
                        onClick={onDashboard}
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm text-white"
                    >
                        Quay về Dashboard
                    </button>
                </div>
                <Link href="/profile/submissions" className="mt-4 inline-block text-sm text-violet-600">
                    Xem bài nộp →
                </Link>
            </main>
        </div>
    );
}

function Row({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex justify-between">
            <dt>{label}</dt>
            <dd>{value}%</dd>
        </div>
    );
}
