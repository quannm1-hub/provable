"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AssessmentPageLayout from "@/app/components/assessment/AssessmentPageLayout";
import EvaluationResultCard from "@/app/components/assessment/EvaluationResultCard";
import ReferenceAnswerBlock from "@/app/components/assessment/ReferenceAnswerBlock";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import Button from "@/app/components/ui/Button";
import {
    computeOverallScore,
    DA_RETENTION_PROGRAM,
    REFERENCE_SQL_Q1,
    RETENTION_BRIEF,
} from "@/lib/da-retention-interview";
import {
    evaluateInsight,
    getSampleInsight,
    type InsightEvalResult,
} from "@/lib/da-retention-insight-eval";
import {
    evaluateDashboardUpload,
    type DashboardEvalResult,
} from "@/lib/da-retention-dashboard-eval";
import type { SqlQuestionId } from "@/lib/da-retention-sql-eval";
import RetentionStepper, { type PartStatus } from "./RetentionStepper";
import RetentionMixedWorkspace, {
    type SqlQuestionState,
} from "./RetentionMixedWorkspace";

type Props = {
    onComplete: (scores: {
        sql: number;
        insight: number;
        dashboard: number;
        overall: number;
        passed: boolean;
    }) => void;
    onBackToProgram: () => void;
};

const SQL_IDS: SqlQuestionId[] = ["q1-cohort", "q2-behavior", "q3-first-txn"];

function initialSqlStates(): Record<SqlQuestionId, SqlQuestionState> {
    return {
        "q1-cohort": {
            query: "",
            submitted: false,
            mockUsed: false,
            score: null,
            feedback: "",
        },
        "q2-behavior": {
            query: "",
            submitted: false,
            mockUsed: false,
            score: null,
            feedback: "",
        },
        "q3-first-txn": {
            query: "",
            submitted: false,
            mockUsed: false,
            score: null,
            feedback: "",
        },
    };
}

export default function DaRetentionSimulation({ onComplete, onBackToProgram }: Props) {
    const [activePart, setActivePart] = useState<1 | 2 | 3>(1);
    const [activeSqlId, setActiveSqlId] = useState<SqlQuestionId>("q1-cohort");
    const [sqlStates, setSqlStates] = useState(initialSqlStates);
    const [insightText, setInsightText] = useState("");
    const [insightEval, setInsightEval] = useState<InsightEvalResult | null>(null);
    const [insightEvaluating, setInsightEvaluating] = useState(false);
    const [dashboardFile, setDashboardFile] = useState<File | null>(null);
    const [dashboardEval, setDashboardEval] = useState<DashboardEvalResult | null>(null);
    const [dashboardEvaluating, setDashboardEvaluating] = useState(false);

    const sqlPartComplete = SQL_IDS.every(
        (id) => sqlStates[id].submitted || sqlStates[id].mockUsed,
    );

    const sqlPartScore = useMemo(() => {
        const scores = SQL_IDS.map((id) => sqlStates[id].score).filter(
            (s): s is number => s != null,
        );
        if (!sqlPartComplete || scores.length === 0) return null;
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }, [sqlStates, sqlPartComplete]);

    const overallScore = useMemo(() => {
        if (sqlPartScore == null || !insightEval || !dashboardEval) return null;
        return computeOverallScore(sqlPartScore, insightEval.score, dashboardEval.score);
    }, [sqlPartScore, insightEval, dashboardEval]);

    const allPartsDone =
        sqlPartComplete && insightEval != null && dashboardEval != null;

    const passed =
        overallScore != null && overallScore >= DA_RETENTION_PROGRAM.passThreshold;

    const unlockedParts: Record<1 | 2 | 3, boolean> = {
        1: true,
        2: sqlPartComplete,
        3: insightEval != null,
    };

    useEffect(() => {
        if (activePart === 2 && !sqlPartComplete) setActivePart(1);
        if (activePart === 3 && !insightEval) {
            setActivePart(sqlPartComplete ? 2 : 1);
        }
    }, [activePart, sqlPartComplete, insightEval]);

    function partStatus(part: 1 | 2 | 3): PartStatus {
        if (part === 1) {
            if (!sqlPartComplete) {
                return SQL_IDS.some(
                    (id) => sqlStates[id].query || sqlStates[id].submitted,
                )
                    ? "in_progress"
                    : "not_started";
            }
            if (sqlPartScore == null) return "submitted";
            return sqlPartScore >= 80
                ? "passed"
                : sqlPartScore >= 60
                  ? "needs_improvement"
                  : "submitted";
        }
        if (part === 2) {
            if (!insightEval) return insightText ? "in_progress" : "not_started";
            return insightEval.passed
                ? "passed"
                : insightEval.score >= 60
                  ? "needs_improvement"
                  : "submitted";
        }
        if (!dashboardEval) return dashboardFile ? "in_progress" : "not_started";
        return dashboardEval.passed
            ? "passed"
            : dashboardEval.score >= 60
              ? "needs_improvement"
              : "submitted";
    }

    const statuses: Record<1 | 2 | 3, PartStatus> = {
        1: partStatus(1),
        2: partStatus(2),
        3: partStatus(3),
    };

    const scores: Record<1 | 2 | 3, number | null> = {
        1: sqlPartScore,
        2: insightEval?.score ?? null,
        3: dashboardEval?.score ?? null,
    };

    function patchSql(id: SqlQuestionId, patch: Partial<SqlQuestionState>) {
        setSqlStates((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
    }

    function useAllMockSql() {
        const next = { ...sqlStates };
        SQL_IDS.forEach((id) => {
            next[id] = {
                ...next[id],
                mockUsed: true,
                submitted: true,
                score: 85,
                feedback:
                    "Nếu chưa viết được query, bạn có thể dùng kết quả mẫu để tiếp tục phần insight.",
            };
        });
        setSqlStates(next);
        setActivePart(2);
    }

    function handleSubmitInsight() {
        setInsightEvaluating(true);
        setTimeout(() => {
            setInsightEval(evaluateInsight(insightText));
            setInsightEvaluating(false);
            if (sqlPartComplete) setActivePart(3);
        }, 600);
    }

    async function handleEvaluateDashboard() {
        if (!dashboardFile) return;
        setDashboardEvaluating(true);
        const result = await evaluateDashboardUpload(dashboardFile);
        setDashboardEval(result);
        setDashboardEvaluating(false);
    }

    function goToPart(part: 1 | 2 | 3) {
        if (!unlockedParts[part]) return;
        setActivePart(part);
    }

    const p = DA_RETENTION_PROGRAM;

    return (
        <AssessmentPageLayout
            header={
                <div className="border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={onBackToProgram}
                                className="flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-xs"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Quay lại
                            </button>
                            <div className="min-w-0">
                                <p className="truncate text-xs text-slate-500">
                                    <Link
                                        href="/companies/novatech"
                                        className="font-medium text-violet-700 dark:text-indigo-300"
                                    >
                                        {p.company}
                                    </Link>{" "}
                                    · Retention Case
                                </p>
                                <p className="truncate text-sm font-semibold">{p.role}</p>
                            </div>
                        </div>
                        <ThemeToggle compact />
                    </div>
                    <div className="mx-auto max-w-4xl px-4 pb-3">
                        <RetentionStepper
                            activePart={activePart}
                            onPartChange={goToPart}
                            statuses={statuses}
                            scores={scores}
                            unlockedParts={unlockedParts}
                            complete={allPartsDone && passed}
                        />
                    </div>
                </div>
            }
            footer={
                allPartsDone && overallScore != null ? (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                            onComplete({
                                sql: sqlPartScore!,
                                insight: insightEval!.score,
                                dashboard: dashboardEval!.score,
                                overall: overallScore,
                                passed,
                            })
                        }
                    >
                        Hoàn thành interview
                    </Button>
                ) : undefined
            }
        >
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="text-base font-bold">{RETENTION_BRIEF.title}</h2>
                <p className="mt-2 text-xs text-slate-600">{RETENTION_BRIEF.context}</p>
                <p className="mt-2 text-xs font-medium">{RETENTION_BRIEF.businessQuestion}</p>
            </section>

            <RetentionMixedWorkspace
                activePart={activePart}
                sqlStates={sqlStates}
                activeSqlId={activeSqlId}
                onSqlIdChange={setActiveSqlId}
                onSqlChange={patchSql}
                onUseAllMockSql={useAllMockSql}
                insightText={insightText}
                onInsightChange={setInsightText}
                onSubmitInsight={handleSubmitInsight}
                onUseSampleInsight={() => setInsightText(getSampleInsight())}
                insightEvaluating={insightEvaluating}
                insightEval={insightEval}
                dashboardFile={dashboardFile}
                onDashboardFile={setDashboardFile}
                onEvaluateDashboard={handleEvaluateDashboard}
                dashboardEvaluating={dashboardEvaluating}
                dashboardEval={dashboardEval}
                sqlPartComplete={sqlPartComplete}
                sqlPartScore={sqlPartScore}
                part2Unlocked={unlockedParts[2]}
                part3Unlocked={unlockedParts[3]}
                onGoToPart2={() => goToPart(2)}
                onGoToPart3={() => goToPart(3)}
                insightSubmitted={insightEval != null}
            />

            {allPartsDone && overallScore != null && (
                <EvaluationResultCard
                    score={overallScore}
                    decision={passed ? "Pass" : "Needs Review"}
                    summary={`SQL ${sqlPartScore}% · Insight ${insightEval!.score}% · Dashboard ${dashboardEval!.score}%`}
                    passedLabel="Đủ điều kiện pass interview"
                    failedLabel="Cần cải thiện trước khi nộp thật"
                />
            )}

            {allPartsDone && (
                <ReferenceAnswerBlock
                    title="Đáp án tham khảo SQL (Q1)"
                    content={REFERENCE_SQL_Q1}
                    format="text"
                />
            )}
        </AssessmentPageLayout>
    );
}
