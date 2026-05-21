"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AssessmentPageLayout from "@/app/components/assessment/AssessmentPageLayout";
import EvaluationResultCard from "@/app/components/assessment/EvaluationResultCard";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import Button from "@/app/components/ui/Button";
import {
    computeCoccocOverallScore,
    COCCOC_HOME_TEST_PROGRAM,
    SAMPLE_DAU_INVESTIGATION,
    SAMPLE_MOBILE_METRICS,
    SAMPLE_REFLECTION,
} from "@/lib/coccoc-home-test";
import {
    evaluateClickstreamQuery,
    evaluateCoccocSql,
    evaluateInvestigation,
    evaluateLogicAnswers,
    evaluateMobileMetrics,
    evaluateReflection,
    type CoccocSqlQuestionId,
} from "@/lib/coccoc-home-test-eval";
import CoccocPartStepper, { type CoccocPartStatus } from "./CoccocPartStepper";
import CoccocHomeTestWorkspace, { type SqlQState } from "./CoccocHomeTestWorkspace";

const SQL_IDS: CoccocSqlQuestionId[] = [
    "sql-q1",
    "sql-q2",
    "sql-q3",
    "sql-q4",
    "sql-q5",
];

function initialSql(): Record<CoccocSqlQuestionId, SqlQState> {
    return Object.fromEntries(
        SQL_IDS.map((id) => [
            id,
            {
                query: "",
                submitted: false,
                mockUsed: false,
                score: null,
                feedback: "",
            },
        ]),
    ) as Record<CoccocSqlQuestionId, SqlQState>;
}

export type CoccocFinalScores = {
    logic: number;
    sql: number;
    clickstream: number;
    investigation: number;
    mobile: number;
    reflection: number;
    overall: number;
};

type Props = {
    onComplete: (payload: CoccocFinalScores) => void;
    onBackToProgram: () => void;
};

export default function CoccocHomeTestSimulation({ onComplete, onBackToProgram }: Props) {
    const [activePart, setActivePart] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
    const [evaluating, setEvaluating] = useState(false);

    const [logicAnswers, setLogicAnswers] = useState<Record<string, string>>({});
    const [logicSubmitted, setLogicSubmitted] = useState(false);
    const [logicScore, setLogicScore] = useState<number | null>(null);

    const [sqlStates, setSqlStates] = useState(initialSql);
    const [activeSqlId, setActiveSqlId] = useState<CoccocSqlQuestionId>("sql-q1");

    const [clickstreamQuery, setClickstreamQuery] = useState("");
    const [clickstreamDone, setClickstreamDone] = useState(false);
    const [clickstreamScore, setClickstreamScore] = useState<number | null>(null);
    const [clickstreamFeedback, setClickstreamFeedback] = useState("");

    const [investigationText, setInvestigationText] = useState("");
    const [investigationScore, setInvestigationScore] = useState<number | null>(null);
    const [investigationMessage, setInvestigationMessage] = useState("");

    const [mobileText, setMobileText] = useState("");
    const [mobileScore, setMobileScore] = useState<number | null>(null);
    const [mobileMessage, setMobileMessage] = useState("");

    const [reflectionText, setReflectionText] = useState("");
    const [reflectionScore, setReflectionScore] = useState<number | null>(null);
    const [reflectionMessage, setReflectionMessage] = useState("");

    const sqlPartScore = useMemo(() => {
        const s = SQL_IDS.map((id) => sqlStates[id].score).filter(
            (x): x is number => x != null,
        );
        if (s.length === 0) return null;
        return Math.round(s.reduce((a, b) => a + b, 0) / s.length);
    }, [sqlStates]);

    const sqlComplete = SQL_IDS.every(
        (id) => sqlStates[id].submitted || sqlStates[id].mockUsed,
    );

    const overallScore = useMemo(() => {
        if (
            logicScore == null ||
            sqlPartScore == null ||
            clickstreamScore == null ||
            investigationScore == null ||
            mobileScore == null ||
            reflectionScore == null
        ) {
            return null;
        }
        return computeCoccocOverallScore({
            logic: logicScore,
            sql: sqlPartScore,
            clickstream: clickstreamScore,
            investigation: investigationScore,
            mobile: mobileScore,
            reflection: reflectionScore,
        });
    }, [
        logicScore,
        sqlPartScore,
        clickstreamScore,
        investigationScore,
        mobileScore,
        reflectionScore,
    ]);

    const allDone =
        logicScore != null &&
        sqlComplete &&
        clickstreamScore != null &&
        investigationScore != null &&
        mobileScore != null &&
        reflectionScore != null;

    function partStatus(part: 1 | 2 | 3 | 4 | 5 | 6): CoccocPartStatus {
        const sc =
            part === 1
                ? logicScore
                : part === 2
                  ? sqlPartScore
                  : part === 3
                    ? clickstreamScore
                    : part === 4
                      ? investigationScore
                      : part === 5
                        ? mobileScore
                        : reflectionScore;
        if (sc == null) {
            if (part === 1 && Object.keys(logicAnswers).length) return "in_progress";
            if (part === 2 && SQL_IDS.some((id) => sqlStates[id].query)) return "in_progress";
            if (part === 3 && clickstreamQuery) return "in_progress";
            if (part === 4 && investigationText) return "in_progress";
            if (part === 5 && mobileText) return "in_progress";
            if (part === 6 && reflectionText) return "in_progress";
            return "not_started";
        }
        return sc >= 70 ? "passed" : sc >= 50 ? "needs_improvement" : "submitted";
    }

    const statuses = {
        1: partStatus(1),
        2: partStatus(2),
        3: partStatus(3),
        4: partStatus(4),
        5: partStatus(5),
        6: partStatus(6),
    } as Record<1 | 2 | 3 | 4 | 5 | 6, CoccocPartStatus>;

    const partScores = {
        1: logicScore,
        2: sqlPartScore,
        3: clickstreamScore,
        4: investigationScore,
        5: mobileScore,
        6: reflectionScore,
    };

    function submitLogic() {
        const r = evaluateLogicAnswers(logicAnswers);
        setLogicScore(r.score);
        setLogicSubmitted(true);
    }

    function useAllMockSql() {
        const next = { ...sqlStates };
        SQL_IDS.forEach((id) => {
            next[id] = {
                ...next[id],
                mockUsed: true,
                submitted: true,
                score: 80,
                feedback: "Kết quả mẫu.",
            };
        });
        setSqlStates(next);
    }

    function submitClickstream() {
        const r = evaluateClickstreamQuery(clickstreamQuery);
        setClickstreamScore(r.score);
        setClickstreamFeedback(r.feedback);
        setClickstreamDone(true);
    }

    function useMockClickstream() {
        setClickstreamScore(85);
        setClickstreamFeedback("Đã dùng bảng kết quả mẫu.");
        setClickstreamDone(true);
    }

    function submitInvestigation() {
        setEvaluating(true);
        setTimeout(() => {
            const r = evaluateInvestigation(investigationText);
            setInvestigationScore(r.score);
            setInvestigationMessage(r.message);
            setEvaluating(false);
        }, 500);
    }

    function submitMobile() {
        setEvaluating(true);
        setTimeout(() => {
            const r = evaluateMobileMetrics(mobileText);
            setMobileScore(r.score);
            setMobileMessage(r.message);
            setEvaluating(false);
        }, 500);
    }

    function submitReflection() {
        setEvaluating(true);
        setTimeout(() => {
            const r = evaluateReflection(reflectionText);
            setReflectionScore(r.score);
            setReflectionMessage(r.message);
            setEvaluating(false);
        }, 500);
    }

    function finishTest() {
        if (!allDone || overallScore == null) return;
        onComplete({
            logic: logicScore!,
            sql: sqlPartScore!,
            clickstream: clickstreamScore!,
            investigation: investigationScore!,
            mobile: mobileScore!,
            reflection: reflectionScore!,
            overall: overallScore,
        });
    }

    const p = COCCOC_HOME_TEST_PROGRAM;

    return (
        <AssessmentPageLayout
            header={
                <div className="border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onBackToProgram}
                                className="flex items-center gap-1 rounded border px-2 py-1 text-xs"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Quay lại
                            </button>
                            <span className="text-xs font-semibold">
                                <Link href="/companies/coccoc" className="text-violet-600">
                                    {p.company}
                                </Link>{" "}
                                · Home Test
                            </span>
                        </div>
                        <ThemeToggle compact />
                    </div>
                    <div className="mx-auto max-w-4xl px-4 pb-3">
                        <CoccocPartStepper
                            activePart={activePart}
                            onPartChange={setActivePart}
                            statuses={statuses}
                            scores={partScores}
                        />
                    </div>
                </div>
            }
            footer={
                allDone ? (
                    <Button variant="primary" size="sm" onClick={finishTest}>
                        Hoàn thành home test
                    </Button>
                ) : undefined
            }
        >
            <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs dark:border-amber-900/40">
                Làm từng phần,
                nộp bài và xem kết quả ngay bên dưới khu vực trả lời.
            </section>

            <CoccocHomeTestWorkspace
                activePart={activePart}
                logicAnswers={logicAnswers}
                onLogicAnswer={(id, v) =>
                    setLogicAnswers((prev) => ({ ...prev, [id]: v }))
                }
                onSubmitLogic={submitLogic}
                logicSubmitted={logicSubmitted}
                logicScore={logicScore}
                sqlStates={sqlStates}
                activeSqlId={activeSqlId}
                onSqlIdChange={setActiveSqlId}
                onSqlChange={(id, patch) =>
                    setSqlStates((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], ...patch },
                    }))
                }
                onUseAllMockSql={useAllMockSql}
                clickstreamQuery={clickstreamQuery}
                onClickstreamQuery={setClickstreamQuery}
                onSubmitClickstream={submitClickstream}
                onUseMockClickstream={useMockClickstream}
                clickstreamDone={clickstreamDone}
                clickstreamScore={clickstreamScore}
                clickstreamFeedback={clickstreamFeedback}
                investigationText={investigationText}
                onInvestigation={setInvestigationText}
                onSubmitInvestigation={submitInvestigation}
                onSampleInvestigation={() => setInvestigationText(SAMPLE_DAU_INVESTIGATION)}
                investigationScore={investigationScore}
                investigationMessage={investigationMessage}
                mobileText={mobileText}
                onMobile={setMobileText}
                onSubmitMobile={submitMobile}
                onSampleMobile={() => setMobileText(SAMPLE_MOBILE_METRICS)}
                mobileScore={mobileScore}
                mobileMessage={mobileMessage}
                reflectionText={reflectionText}
                onReflection={setReflectionText}
                onSubmitReflection={submitReflection}
                onSampleReflection={() => setReflectionText(SAMPLE_REFLECTION)}
                reflectionScore={reflectionScore}
                reflectionMessage={reflectionMessage}
                evaluating={evaluating}
            />

            {overallScore != null && (
                <EvaluationResultCard
                    score={overallScore}
                    decision={overallScore >= 70 ? "Pass" : "Needs Review"}
                    summary="Tổng hợp 6 phần home test"
                />
            )}
        </AssessmentPageLayout>
    );
}
