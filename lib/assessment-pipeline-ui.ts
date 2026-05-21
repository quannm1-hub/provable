import { checkStatusToPipeline, type PipelineStep } from "@/app/components/assessment/EvaluationPipeline";
import type { AssessmentCheck, AssessmentEvaluationResult } from "@/lib/assessment-evaluator";

export const FULL_PIPELINE_LABELS: { id: string; label: string }[] = [
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

export function buildPipelineSteps(
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
