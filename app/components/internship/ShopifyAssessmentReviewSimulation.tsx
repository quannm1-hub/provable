"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ExternalLink } from "lucide-react";
import AssessmentPageLayout from "@/app/components/assessment/AssessmentPageLayout";
import EvaluationPipeline from "@/app/components/assessment/EvaluationPipeline";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import Button from "@/app/components/ui/Button";
import {
    evaluateAssessmentSubmission,
    readSubmissionText,
    type AssessmentDecision,
    type AssessmentEvaluationResult,
} from "@/lib/assessment-evaluator";
import { buildPipelineSteps } from "@/lib/assessment-pipeline-ui";
import {
    COCCOC_DE_ACCEPTED_FORMATS,
    COCCOC_DE_ASSESSMENT_PROGRAM,
    COCCOC_DE_ASSIGNMENT,
    COCCOC_DE_EXPECTED_PACKAGE,
    COCCOC_DE_GITHUB_URL,
    COCCOC_DE_PASS_CRITERIA,
    COCCOC_DE_TASK,
} from "@/lib/coccoc-de-assessment";
import CoccocDeWorkspaceTaskSidebar from "@/app/components/internship/CoccocDeWorkspaceTaskSidebar";
import ShopifyAssessmentReviewResults from "@/app/components/internship/ShopifyAssessmentReviewResults";
import AssessmentSubmissionWorkspace, {
    type SubmissionMeta,
} from "./AssessmentSubmissionWorkspace";

type Props = {
    onComplete: (payload: {
        score: number;
        decision: AssessmentDecision;
        fileName: string;
        evaluation: AssessmentEvaluationResult;
    }) => void;
    onBackToProgram: () => void;
};

type Screen = "workspace" | "results";

export default function ShopifyAssessmentReviewSimulation({
    onComplete,
    onBackToProgram,
}: Props) {
    const [screen, setScreen] = useState<Screen>("workspace");
    const [submission, setSubmission] = useState<SubmissionMeta | null>(null);
    const [simulateLate, setSimulateLate] = useState(false);
    const [evaluation, setEvaluation] = useState<AssessmentEvaluationResult | null>(null);
    const [evaluating, setEvaluating] = useState(false);
    const [preChecking, setPreChecking] = useState(false);
    const [contentCache, setContentCache] = useState("");
    const [mode, setMode] = useState<"none" | "precheck" | "full">("none");
    const processRef = useRef<HTMLDivElement>(null);

    const p = COCCOC_DE_ASSESSMENT_PROGRAM;
    const running = evaluating || preChecking;

    async function loadContent(file: File) {
        const text = await readSubmissionText(file);
        setContentCache(text);
        return text;
    }

    function scrollToProcess() {
        processRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function runPreCheck() {
        if (!submission) return;
        setMode("precheck");
        setPreChecking(true);
        scrollToProcess();
        const content = contentCache || (await loadContent(submission.file));
        await new Promise((r) => setTimeout(r, 700));
        const result = evaluateAssessmentSubmission(submission.file, content, {
            simulateLate,
            preCheckOnly: true,
            submittedAt: submission.uploadedAt,
        });
        setEvaluation(result);
        setPreChecking(false);
    }

    async function runGrade() {
        if (!submission) return;
        setMode("full");
        setEvaluating(true);
        scrollToProcess();
        const content = contentCache || (await loadContent(submission.file));
        await new Promise((r) => setTimeout(r, 1000));
        const result = evaluateAssessmentSubmission(submission.file, content, {
            simulateLate,
            preCheckOnly: false,
            submittedAt: submission.uploadedAt,
        });
        setEvaluation(result);
        setEvaluating(false);
        setScreen("results");
    }

    function handleReupload() {
        setSubmission(null);
        setEvaluation(null);
        setMode("none");
        setContentCache("");
        setScreen("workspace");
    }

    function handleBackToWorkspace() {
        setScreen("workspace");
    }

    if (
        screen === "results" &&
        evaluation &&
        submission &&
        mode === "full" &&
        !evaluation.preCheckOnly
    ) {
        return (
            <ShopifyAssessmentReviewResults
                evaluation={evaluation}
                fileName={submission.file.name}
                uploadedAt={submission.uploadedAt}
                onBackToWorkspace={handleBackToWorkspace}
                onBackToProgram={onBackToProgram}
                onReupload={handleReupload}
                onComplete={() =>
                    onComplete({
                        score: evaluation.overallScore,
                        decision: evaluation.decision,
                        fileName: submission.file.name,
                        evaluation,
                    })
                }
            />
        );
    }

    const pipelineSteps = buildPipelineSteps(evaluation, running, mode === "full");
    const hasFullResult = evaluation && mode === "full" && !evaluation.preCheckOnly;
    const showPrecheckPipeline =
        (running || evaluation) && screen === "workspace" && mode === "precheck";

    return (
        <AssessmentPageLayout
            wide
            sidebar={<CoccocDeWorkspaceTaskSidebar />}
            header={
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex min-w-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={onBackToProgram}
                            className="flex items-center gap-1 rounded border px-2 py-1 text-xs"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Quay lại chương trình
                        </button>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold">{p.title}</p>
                            <p className="text-[10px] text-slate-500">
                                <Link href="/companies/coccoc" className="text-emerald-600">
                                    {p.company}
                                </Link>{" "}
                                · {p.role}
                            </p>
                        </div>
                    </div>
                    <ThemeToggle compact />
                </div>
            }
        >
            <div className="space-y-4">
                <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                        Task 1
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        sql/task1.sql
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                        {COCCOC_DE_ASSIGNMENT.intro}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <a
                            href={COCCOC_DE_GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Repo starter
                        </a>
                        <span className="text-slate-300 dark:text-zinc-600">·</span>
                        <code className="rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                            sql/task1.sql
                        </code>
                    </div>

                    <details className="mt-4 rounded-lg border border-slate-100 dark:border-zinc-800">
                        <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 [&::-webkit-details-marker]:hidden dark:text-zinc-400">
                            Hướng dẫn nộp & tiêu chí chấm
                            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                        </summary>
                        <div className="space-y-3 border-t border-slate-100 px-3 py-3 text-xs text-slate-600 dark:border-zinc-800 dark:text-zinc-400">
                            <p>{COCCOC_DE_TASK.scenario}</p>
                            <p>
                                <span className="font-medium text-slate-700 dark:text-zinc-300">
                                    Package:
                                </span>{" "}
                                {COCCOC_DE_EXPECTED_PACKAGE.slice(0, 3).join(" · ")}…
                            </p>
                            <p>
                                <span className="font-medium text-slate-700 dark:text-zinc-300">
                                    Format:
                                </span>{" "}
                                {COCCOC_DE_ACCEPTED_FORMATS.map((f) => f.ext).join(", ")}
                            </p>
                            <ul className="list-inside list-disc space-y-0.5">
                                {COCCOC_DE_PASS_CRITERIA.slice(0, 4).map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>
                    </details>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-5">
                    <h3 className="text-sm font-bold">Nộp bài</h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Pre-check trước, sau đó <strong>Chấm bài</strong> để xem kết quả.
                    </p>
                    <div className="mt-3">
                        <AssessmentSubmissionWorkspace
                            embedded
                            file={submission?.file ?? null}
                            uploadedAt={submission?.uploadedAt ?? null}
                            simulateLate={simulateLate}
                            onSimulateLate={setSimulateLate}
                            onFile={(meta) => {
                                setSubmission(meta);
                                setEvaluation(null);
                                setMode("none");
                                setScreen("workspace");
                                if (meta) void loadContent(meta.file);
                            }}
                            evaluation={null}
                            evaluating={evaluating}
                            preChecking={preChecking}
                            onPreCheck={() => void runPreCheck()}
                            onGrade={() => void runGrade()}
                        />
                    </div>
                </section>

                {showPrecheckPipeline && (
                    <div ref={processRef}>
                        <p className="mb-2 text-xs font-medium text-slate-500">
                            Pre-check
                        </p>
                        <EvaluationPipeline steps={pipelineSteps} />
                    </div>
                )}

                {evaluating && (
                    <p className="text-center text-sm text-slate-500">
                        Đang chấm bài…
                    </p>
                )}

                {hasFullResult && screen === "workspace" && (
                    <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
                        <p className="text-sm text-slate-700 dark:text-zinc-300">
                            Điểm {evaluation.overallScore}% · {evaluation.decision}
                        </p>
                        <Button
                            variant="primary"
                            size="sm"
                            className="mt-3"
                            onClick={() => setScreen("results")}
                        >
                            Xem kết quả
                        </Button>
                    </section>
                )}
            </div>
        </AssessmentPageLayout>
    );
}
