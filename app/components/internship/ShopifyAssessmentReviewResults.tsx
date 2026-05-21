"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import AssessmentPageLayout from "@/app/components/assessment/AssessmentPageLayout";
import AssessmentReportDashboard from "@/app/components/assessment/AssessmentReportDashboard";
import EvaluationPipeline from "@/app/components/assessment/EvaluationPipeline";
import InlineLLMReview from "@/app/components/assessment/InlineLLMReview";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import Button from "@/app/components/ui/Button";
import type { AssessmentDecision, AssessmentEvaluationResult } from "@/lib/assessment-evaluator";
import { buildPipelineSteps } from "@/lib/assessment-pipeline-ui";
import { COCCOC_DE_ASSESSMENT_PROGRAM, COCCOC_DE_GITHUB_URL } from "@/lib/coccoc-de-assessment";

type Props = {
    evaluation: AssessmentEvaluationResult;
    fileName: string;
    uploadedAt: Date | null;
    onBackToWorkspace: () => void;
    onBackToProgram: () => void;
    onReupload: () => void;
    onComplete: () => void;
};

export default function ShopifyAssessmentReviewResults({
    evaluation,
    fileName,
    uploadedAt,
    onBackToWorkspace,
    onBackToProgram,
    onReupload,
    onComplete,
}: Props) {
    const p = COCCOC_DE_ASSESSMENT_PROGRAM;
    const pipelineSteps = buildPipelineSteps(evaluation, false, true);
    const canSave =
        evaluation.decision === "Strong Pass" || evaluation.decision === "Pass";
    const needsImprovement = !canSave;

    return (
        <AssessmentPageLayout
            header={
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex min-w-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={onBackToWorkspace}
                            className="flex items-center gap-1 rounded border px-2 py-1 text-xs"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Quay lại nộp bài
                        </button>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold">Kết quả chấm bài</p>
                            <p className="text-[10px] text-slate-500">
                                <Link href="/companies/coccoc" className="text-emerald-600">
                                    {p.company}
                                </Link>{" "}
                                · {p.title}
                            </p>
                        </div>
                    </div>
                    <ThemeToggle compact />
                </div>
            }
            footer={
                <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={onReupload}>
                        Upload lại
                    </Button>
                    <Button variant="secondary" size="sm" onClick={onBackToWorkspace}>
                        Chỉnh sửa & chấm lại
                    </Button>
                    <Button variant="secondary" size="sm" onClick={onBackToProgram}>
                        Quay về chương trình
                    </Button>
                    {canSave && (
                        <Button variant="primary" size="sm" onClick={onComplete}>
                            Lưu vào bài nộp
                        </Button>
                    )}
                </div>
            }
        >
            <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 px-4 py-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium text-slate-800 dark:text-zinc-200">
                        {fileName}
                    </span>
                    {uploadedAt && (
                        <span className="text-xs text-slate-500">
                            Nộp lúc {uploadedAt.toLocaleString("vi-VN")}
                        </span>
                    )}
                </div>
            </section>

            <AssessmentReportDashboard evaluation={evaluation} />

            <details className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                    Chi tiết pipeline chấm
                </summary>
                <div className="border-t border-slate-100 px-4 py-4 dark:border-zinc-800">
                    <EvaluationPipeline steps={pipelineSteps} />
                </div>
            </details>

            <InlineLLMReview
                review={evaluation.llmReview}
                riskFlags={evaluation.riskFlags}
            />

            {needsImprovement && (
                <section className="rounded-2xl border border-violet-200 bg-violet-50/40 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
                    <h3 className="text-sm font-semibold">Đáp án tham khảo</h3>
                    <a
                        href={COCCOC_DE_GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                        <ExternalLink className="h-4 w-4" />
                        eng-intern-assessment-data (GitHub)
                    </a>
                    {/* import more sample case prototype */}
                </section>
            )}
        </AssessmentPageLayout>
    );
}
