"use client";

import { CheckCircle2, Circle, Loader2, XCircle, AlertTriangle } from "lucide-react";

export type PipelineStepStatus =
    | "pending"
    | "running"
    | "passed"
    | "warning"
    | "failed";

export type PipelineStep = {
    id: string;
    label: string;
    status: PipelineStepStatus;
    message?: string;
    score?: number;
};

const STATUS_LABEL: Record<PipelineStepStatus, string> = {
    pending: "Đang chờ",
    running: "Đang kiểm tra",
    passed: "Đạt",
    warning: "Cảnh báo",
    failed: "Không đạt",
};

function StepIcon({ status }: { status: PipelineStepStatus }) {
    if (status === "running") return <Loader2 className="h-4 w-4 animate-spin text-violet-600" />;
    if (status === "passed") return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
    if (status === "warning") return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    if (status === "failed") return <XCircle className="h-4 w-4 text-red-500" />;
    return <Circle className="h-4 w-4 text-slate-300" />;
}

type Props = {
    title?: string;
    steps: PipelineStep[];
};

export default function EvaluationPipeline({
    title = "Quá trình đánh giá",
    steps,
}: Props) {
    if (steps.length === 0) return null;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
            <ol className="mt-4 space-y-3">
                {steps.map((step, i) => (
                    <li key={step.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <StepIcon status={step.status} />
                            {i < steps.length - 1 && (
                                <div className="mt-1 w-px flex-1 bg-slate-200 dark:bg-zinc-700" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1 pb-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-medium text-slate-800 dark:text-zinc-200">
                                    {i + 1}. {step.label}
                                </span>
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                                    {STATUS_LABEL[step.status]}
                                </span>
                                {step.score != null && (
                                    <span className="text-[10px] text-slate-500">{step.score}%</span>
                                )}
                            </div>
                            {step.message && (
                                <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
                                    {step.message}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export function checkStatusToPipeline(
    status: "passed" | "warning" | "failed",
    running?: boolean,
): PipelineStepStatus {
    if (running) return "running";
    if (status === "passed") return "passed";
    if (status === "warning") return "warning";
    return "failed";
}
