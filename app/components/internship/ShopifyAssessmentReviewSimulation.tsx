"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AssessmentPageLayout from "@/app/components/assessment/AssessmentPageLayout";
import EvaluationPipeline, {
    checkStatusToPipeline,
    type PipelineStep,
} from "@/app/components/assessment/EvaluationPipeline";
import EvaluationResultCard from "@/app/components/assessment/EvaluationResultCard";
import InlineLLMReview from "@/app/components/assessment/InlineLLMReview";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import Button from "@/app/components/ui/Button";
import {
    evaluateAssessmentSubmission,
    readSubmissionText,
    type AssessmentCheck,
    type AssessmentDecision,
    type AssessmentEvaluationResult,
} from "@/lib/assessment-evaluator";
import {
    COCCOC_DE_ACCEPTED_FORMATS,
    COCCOC_DE_ASSESSMENT_PROGRAM,
    COCCOC_DE_EXPECTED_PACKAGE,
    COCCOC_DE_PASS_CRITERIA,
    COCCOC_DE_TASK,
} from "@/lib/coccoc-de-assessment";
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

const FULL_PIPELINE_LABELS: { id: string; label: string }[] = [
    { id: "format", label: "Kiểm tra file và format" },
    { id: "deadline", label: "Kiểm tra deadline" },
    { id: "readme", label: "Kiểm tra README / explanation" },
    { id: "placeholder", label: "Kiểm tra nội dung rỗng / placeholder" },
    { id: "similarity", label: "Kiểm tra similarity / chống sao chép" },
    { id: "template_copy", label: "Copy template nguyên bản" },
    { id: "code_run", label: "Kiểm tra khả năng chạy" },
    { id: "spell_check", label: "Spell check" },
    { id: "word_count", label: "Word count" },
    { id: "ai_spam", label: "AI-generated obvious spam" },
    { id: "llm", label: "LLM model review" },
    { id: "result", label: "Tổng hợp kết quả" },
];

function buildPipelineSteps(
    evaluation: AssessmentEvaluationResult | null,
    running: boolean,
    full: boolean,
): PipelineStep[] {
    const labels = full
        ? FULL_PIPELINE_LABELS
        : FULL_PIPELINE_LABELS.filter((s) =>
              ["format", "deadline", "readme", "word_count", "result"].includes(s.id),
          );

    if (!evaluation && !running) {
        return labels.map((s) => ({
            id: s.id,
            label: s.label,
            status: "pending" as const,
        }));
    }

    const checkMap = Object.fromEntries(evaluation?.checks.map((c) => [c.id, c]) ?? []);

    return labels.map((s) => {
        if (s.id === "llm") {
            if (running) return { ...s, status: "running" as const, message: "Đang tổng hợp…" };
            if (evaluation && !evaluation.preCheckOnly)
                return {
                    ...s,
                    status: "passed" as const,
                    message: evaluation.llmReview.summary.slice(0, 120),
                };
            return { ...s, status: "pending" as const };
        }
        if (s.id === "result") {
            if (running) return { ...s, status: "running" as const };
            if (evaluation)
                return {
                    ...s,
                    status:
                        evaluation.decision === "Reject"
                            ? ("failed" as const)
                            : evaluation.decision === "Needs Review"
                              ? ("warning" as const)
                              : ("passed" as const),
                    message: `${evaluation.overallScore}% · ${evaluation.decision}`,
                    score: evaluation.overallScore,
                };
            return { ...s, status: "pending" as const };
        }
        const check: AssessmentCheck | undefined =
            checkMap[s.id] ??
            (s.id === "similarity" ? checkMap.similarity : undefined) ??
            (s.id === "readme" ? checkMap.readme : undefined);

        if (!check) {
            if (s.id === "similarity" && full) {
                const tpl = checkMap.template_copy;
                if (tpl && running)
                    return { ...s, status: "running" as const, message: "Đang so khớp…" };
            }
            return {
                ...s,
                status: running ? ("running" as const) : ("pending" as const),
            };
        }
        return {
            id: s.id,
            label: s.label,
            status: checkStatusToPipeline(check.status, running),
            message: check.message,
            score: check.score,
        };
    });
}

export default function ShopifyAssessmentReviewSimulation({
    onComplete,
    onBackToProgram,
}: Props) {
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
    }

    function handleReupload() {
        setSubmission(null);
        setEvaluation(null);
        setMode("none");
        setContentCache("");
    }

    const pipelineSteps = buildPipelineSteps(
        evaluation,
        running,
        mode === "full",
    );

    const showFullResult = evaluation && mode === "full" && !evaluation.preCheckOnly;

    return (
        <AssessmentPageLayout
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
                            <p className="truncate text-xs font-semibold">
                                <Link href="/companies/coccoc" className="text-emerald-600">
                                    {p.company}
                                </Link>{" "}
                                · {p.title}
                            </p>
                            <p className="text-[10px] text-slate-500">{p.role} · Practice only</p>
                        </div>
                    </div>
                    <ThemeToggle compact />
                </div>
            }
            footer={
                showFullResult ? (
                    <div className="flex flex-wrap gap-2">
                        <Button variant="ghost" size="sm" onClick={handleReupload}>
                            Upload lại
                        </Button>
                        <Button variant="secondary" size="sm" onClick={onBackToProgram}>
                            Quay về chương trình
                        </Button>
                        {(evaluation.decision === "Strong Pass" ||
                            evaluation.decision === "Pass") && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() =>
                                    onComplete({
                                        score: evaluation.overallScore,
                                        decision: evaluation.decision,
                                        fileName: submission!.file.name,
                                        evaluation,
                                    })
                                }
                            >
                                Lưu vào bài nộp
                            </Button>
                        )}
                    </div>
                ) : undefined
            }
        >
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="text-base font-bold">Brief</h2>
                <p className="mt-2 text-sm text-slate-600">{COCCOC_DE_TASK.scenario}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-500">
                            Package mong đợi
                        </p>
                        <ul className="mt-1 list-inside list-disc text-xs">
                            {COCCOC_DE_EXPECTED_PACKAGE.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-500">
                            Format chấp nhận
                        </p>
                        <ul className="mt-1 text-xs">
                            {COCCOC_DE_ACCEPTED_FORMATS.map((f) => (
                                <li key={f.ext}>
                                    {f.ext} — {f.note}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase text-slate-500">
                    Tiêu chí chấm
                </p>
                <ul className="mt-1 list-inside list-disc text-xs text-slate-600">
                    {COCCOC_DE_PASS_CRITERIA.map((x) => (
                        <li key={x}>{x}</li>
                    ))}
                </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="text-base font-bold">Nộp bài làm</h2>
                <p className="mt-1 text-xs text-slate-500">
                    Bạn có thể chạy pre-check để kiểm tra format, README và deadline trước khi
                    chấm toàn bộ bài.
                </p>
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
                        if (meta) void loadContent(meta.file);
                    }}
                    evaluation={null}
                    evaluating={evaluating}
                    preChecking={preChecking}
                    onPreCheck={() => void runPreCheck()}
                    onGrade={() => void runGrade()}
                />
            </section>

            {(running || evaluation) && (
                <div ref={processRef}>
                    <EvaluationPipeline steps={pipelineSteps} />
                </div>
            )}

            {showFullResult && evaluation && (
                <>
                    <EvaluationResultCard
                        score={evaluation.overallScore}
                        decision={evaluation.decision}
                        riskFlags={evaluation.riskFlags}
                        summary={evaluation.llmReview.summary}
                    />
                    <InlineLLMReview
                        review={evaluation.llmReview}
                        riskFlags={evaluation.riskFlags}
                    />
                    {evaluation.decision !== "Strong Pass" &&
                        evaluation.decision !== "Pass" && (
                            <section className="rounded-2xl border border-violet-200 bg-violet-50/40 p-4 dark:border-indigo-900/50">
                                <h3 className="text-sm font-semibold">Khuyến nghị cải thiện</h3>
                                <ul className="mt-2 list-inside list-disc text-xs text-violet-800 dark:text-indigo-300">
                                    {evaluation.llmReview.recommendations.map((r) => (
                                        <li key={r}>{r}</li>
                                    ))}
                                </ul>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="mt-3"
                                    onClick={handleReupload}
                                >
                                    Xem cách cải thiện — Upload lại
                                </Button>
                            </section>
                        )}
                </>
            )}
        </AssessmentPageLayout>
    );
}
