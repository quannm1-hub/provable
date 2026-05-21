"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cloneEmployees } from "@/lib/employees";
import {
    CONFIDENCE_OPTIONS,
    EXERCISE_HELP_OPTIONS,
    FINAL_MODULE_OPTIONS,
    MODULE_COMPLETE_OPTIONS,
} from "@/lib/coach-options";
import {
    appendCoachTurn,
    coachMsg,
    stripUnresolvedQuickAnswers,
    type ChatMessage,
    type QuickReply,
} from "@/lib/chat-types";
import {
    courseModules,
    exerciseForConfidence,
    MODULE_COUNT,
} from "@/lib/course";
import { normalizeSql } from "@/lib/sql-normalize";
import { runSql } from "@/lib/sql-runner";
import type {
    Confidence,
    CourseModule,
    ExerciseDef,
    Phase,
    RunResult,
} from "@/lib/types";
import ChatCoach from "./ChatCoach";
import DataPanel from "./DataPanel";
import SqlEditor from "./SqlEditor";
import { vi } from "@/lib/vi";
import LearnReturnBanner from "@/app/components/skills/LearnReturnBanner";
import { getLearnModuleRecommendation } from "@/lib/recommendations";
import { isQuickAnswerSelectable, trySelectQuickAnswer } from "@/lib/chat-actions";
import type { LearningTab, LearningUiAction } from "@/lib/learning-panel";
import type { LearnReturnContext } from "@/lib/skill-navigation";
import TopBar from "./TopBar";
import WorkspaceLayout from "./WorkspaceLayout";

type Props = {
    onComplete: (readiness: number) => void;
    initialModuleIndex?: number;
    learnModuleId?: string;
    returnContext?: LearnReturnContext;
};

export default function LearningWorkspace({
    onComplete,
    initialModuleIndex = 0,
    learnModuleId,
    returnContext,
}: Props) {
    const [moduleIndex, setModuleIndex] = useState(initialModuleIndex);
    const [phase, setPhase] = useState<Phase>("confidence");
    const [confidence, setConfidence] = useState<Confidence | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sql, setSql] = useState("");
    const [sqlAttempts, setSqlAttempts] = useState(0);
    const [miniAttempts, setMiniAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [readiness, setReadiness] = useState(12);
    const [runResult, setRunResult] = useState<RunResult | null>(null);
    const [submitOk, setSubmitOk] = useState<boolean | null>(null);
    const [employees] = useState(() => cloneEmployees());
    const [useBeginnerOverride, setUseBeginnerOverride] = useState(false);
    const [learningTab, setLearningTab] = useState<LearningTab>("lesson");
    const booted = useRef(false);

    const applyLearningUi = (uiAction?: QuickReply["uiAction"]) => {
        const ui = uiAction as LearningUiAction | undefined;
        if (ui?.setTab) setLearningTab(ui.setTab);
    };

    const module: CourseModule = courseModules[moduleIndex];

    const currentExercise: ExerciseDef | null = useMemo(() => {
        if (!module || !confidence) return null;
        if (useBeginnerOverride) return module.exercises.beginner;
        return exerciseForConfidence(module, confidence);
    }, [module, confidence, useBeginnerOverride]);

    const moduleLabel = vi.learn.moduleLabel(module.index, MODULE_COUNT, module.title);

    const append = useCallback((msgs: ChatMessage | ChatMessage[]) => {
        const list = Array.isArray(msgs) ? msgs : [msgs];
        setMessages((prev) => [...prev, ...list]);
    }, []);

    const coachRespond = useCallback(
        (build: () => ChatMessage[], options: QuickReply[] = [], delay = 550) => {
            setIsTyping(true);
            setMessages((prev) => stripUnresolvedQuickAnswers(prev));
            setTimeout(() => {
                setMessages((prev) => appendCoachTurn(prev, build(), options));
                setIsTyping(false);
            }, delay);
        },
        [],
    );

    const bumpReadiness = (pts: number) =>
        setReadiness((r) => Math.min(100, r + pts));

    const resetExercise = useCallback((ex: ExerciseDef, showHints = false) => {
        setSql(ex.starterCode);
        setSqlAttempts(0);
        setShowHint(showHints);
        setRunResult(null);
        setSubmitOk(null);
        setPhase("exercise");
    }, []);

    const quizOptions = useCallback(
        (mod: CourseModule): QuickReply[] =>
            mod.miniQuestion.options.map((o) => ({
                id: `q-${o.id}`,
                label: o.label,
                action: `quiz:${o.id}`,
            })),
        [],
    );

    const startModuleChat = useCallback((mod: CourseModule) => {
        setMessages(
            appendCoachTurn(
                [],
                [
                    coachMsg(vi.learn.welcome(mod.title, mod.confidenceQuestion)),
                ],
                CONFIDENCE_OPTIONS,
            ),
        );
        setPhase("confidence");
        setConfidence(null);
    }, []);

    const pushExerciseTask = useCallback(
        (ex: ExerciseDef, extra?: string) => {
            const hintNote =
                confidence === "none" ? vi.learn.hintAvailable : vi.learn.quickHelp;
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        coachMsg(
                            `${extra ?? vi.learn.tryInEditor}\n\n**${ex.prompt}**${hintNote}`,
                        ),
                    ],
                    EXERCISE_HELP_OPTIONS,
                ),
            );
            resetExercise(ex, confidence === "none");
        },
        [confidence, resetExercise],
    );

    const pushModuleComplete = useCallback(
        (mod: CourseModule) => {
            const next = courseModules[mod.index];
            const isLast = !next;
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        coachMsg(
                            isLast
                                ? vi.learn.moduleCompleteLast(mod.title)
                                : vi.learn.moduleComplete(mod.title, next?.title ?? "phần tiếp theo"),
                        ),
                    ],
                    isLast ? FINAL_MODULE_OPTIONS : MODULE_COMPLETE_OPTIONS(mod.title),
                ),
            );
            setPhase("module_complete");
        },
        [],
    );

    useEffect(() => {
        if (booted.current) return;
        booted.current = true;
        const idx = Math.min(
            Math.max(0, initialModuleIndex),
            courseModules.length - 1,
        );
        const mod = courseModules[idx];
        if (mod) {
            setModuleIndex(idx);
            const rec =
                learnModuleId && getLearnModuleRecommendation(learnModuleId);
            setMessages(
                appendCoachTurn(
                    [],
                    [
                        coachMsg(
                            rec
                                ? `${vi.learn.welcome(mod.title, mod.confidenceQuestion)}\n\n${rec}`
                                : vi.learn.welcome(mod.title, mod.confidenceQuestion),
                        ),
                    ],
                    CONFIDENCE_OPTIONS,
                ),
            );
            setPhase("confidence");
            setConfidence(null);
        }
    }, [initialModuleIndex, learnModuleId]);

    function handleConfidence(c: Confidence) {
        if (!module) return;
        setConfidence(c);
        setMiniAttempts(0);
        setUseBeginnerOverride(false);
        bumpReadiness(3);

        if (c === "master") {
            const ex = module.exercises.advanced;
            coachRespond(
                () => [
                    coachMsg(vi.learn.skipLecture(ex.prompt)),
                ],
                EXERCISE_HELP_OPTIONS,
            );
            resetExercise(ex, false);
            bumpReadiness(4);
            return;
        }

        const explanation =
            c === "none" ? module.detailedExplanation : module.shortRecap;

        coachRespond(
            () => [
                coachMsg(explanation),
                coachMsg(module.example, { type: "code" }),
                coachMsg(`Kiểm tra nhanh: **${module.miniQuestion.prompt}**`, {
                    type: "quiz",
                }),
            ],
            quizOptions(module),
        );
        setPhase("mini_quiz");
    }

    function handleMiniAnswer(optionId: string) {
        if (!module || !confidence) return;
        const mq = module.miniQuestion;

        if (optionId === mq.correctId) {
            bumpReadiness(8);
            const ex = useBeginnerOverride
                ? module.exercises.beginner
                : exerciseForConfidence(module, confidence);
            coachRespond(
                () => [
                    coachMsg(`${vi.learn.correctPrefix} ${mq.correctFeedback}`, {
                        type: "feedback",
                    }),
                    coachMsg(`${vi.learn.tryInEditor}\n\n**${ex.prompt}**`),
                ],
                EXERCISE_HELP_OPTIONS,
            );
            resetExercise(ex, confidence === "none");
        } else {
            setMiniAttempts((a) => a + 1);
            const wrong =
                mq.wrongFeedback[optionId] ??
                vi.learn.notQuite;
            coachRespond(
                () => {
                    const msgs: ChatMessage[] = [
                        coachMsg(
                            `${wrong}\n\n${vi.learn.selectReads}`,
                            { type: "feedback" },
                        ),
                    ];
                    if (miniAttempts >= 1) {
                        msgs.push(coachMsg(module.detailedExplanation));
                        msgs.push(coachMsg(module.example, { type: "code" }));
                    }
                    msgs.push(coachMsg(vi.learn.tryAgainQuiz(mq.prompt), { type: "quiz" }));
                    return msgs;
                },
                quizOptions(module),
            );
        }
    }

    function coachRunFeedback(result: RunResult): ChatMessage {
        const norm = normalizeSql(sql);
        if (
            (norm.startsWith("update") || norm.startsWith("delete")) &&
            !norm.includes("where")
        ) {
            return coachMsg(vi.learn.dangerousNoWhere, { type: "feedback" });
        }
        if (!result.ok) return coachMsg(result.message, { type: "feedback" });
        if (result.kind === "select") {
            return coachMsg(vi.learn.runOkSelect(result.message), { type: "feedback" });
        }
        return coachMsg(result.message, { type: "feedback" });
    }

    function pushHintMessages(ex: ExerciseDef, attempts: number) {
        const msgs: ChatMessage[] = [];
        if (attempts >= 2) {
            msgs.push(coachMsg(`${vi.learn.hintPrefix}: ${ex.hint}`, { type: "hint" }));
            setShowHint(true);
        }
        if (attempts >= 3) {
            msgs.push(coachMsg(`${vi.learn.tryStructure}\n${ex.scaffold}`, { type: "code" }));
        }
        if (msgs.length) {
            setMessages((prev) => appendCoachTurn(prev, msgs, EXERCISE_HELP_OPTIONS));
        }
    }

    function handleRun() {
        if (!sql.trim()) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [coachMsg(vi.sqlRunner.enterQuery, { type: "feedback" })],
                    phase === "exercise" ? EXERCISE_HELP_OPTIONS : [],
                ),
            );
            return;
        }
        const result = runSql(sql, employees);
        setRunResult(result);
        setSubmitOk(null);
        setLearningTab("result");
        const feedback = coachRunFeedback(result);
        setMessages((prev) =>
            appendCoachTurn(
                prev,
                [feedback],
                phase === "exercise" ? EXERCISE_HELP_OPTIONS : [],
            ),
        );
    }

    function handleSubmit() {
        if (!currentExercise) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [coachMsg(vi.sql.submitNeedsExercise, { type: "feedback" })],
                    [],
                ),
            );
            return;
        }
        if (!sql.trim()) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [coachMsg(vi.sqlRunner.enterQuery, { type: "feedback" })],
                    EXERCISE_HELP_OPTIONS,
                ),
            );
            return;
        }
        setLearningTab("result");
        const result = currentExercise.validate(sql);
        if (result.ok) {
            setSubmitOk(true);
            setRunResult(runSql(sql, employees));
            bumpReadiness(10);
            append(coachMsg(result.feedback, { type: "feedback" }));
            if (module) pushModuleComplete(module);
            return;
        }

        const attempts = sqlAttempts + 1;
        setSqlAttempts(attempts);
        setSubmitOk(false);
        setMessages((prev) =>
            appendCoachTurn(prev, [coachMsg(result.feedback, { type: "feedback" })], []),
        );
        pushHintMessages(currentExercise, attempts);
        if (confidence === "master" && attempts >= 2) setShowHint(true);
    }

    function goNextModule() {
        if (moduleIndex + 1 >= courseModules.length) {
            onComplete(readiness);
            return;
        }
        const nextIdx = moduleIndex + 1;
        const next = courseModules[nextIdx];
        setModuleIndex(nextIdx);
        setSqlAttempts(0);
        setMiniAttempts(0);
        setShowHint(false);
        setUseBeginnerOverride(false);
        setConfidence(null);
        coachRespond(
            () => [
                coachMsg(vi.learn.welcome(next.title, next.confidenceQuestion)),
            ],
            CONFIDENCE_OPTIONS,
        );
        setPhase("confidence");
    }

    function handleExplainAgain() {
        if (!module) return;
        setLearningTab("lesson");
        coachRespond(
            () => [
                coachMsg(vi.learn.explainAgain(module.title)),
                coachMsg(module.detailedExplanation),
                coachMsg(module.example, { type: "code" }),
                coachMsg(`**${module.miniQuestion.prompt}**`, { type: "quiz" }),
            ],
            quizOptions(module),
        );
        setPhase("mini_quiz");
    }

    function handleEasierExample() {
        if (!module) return;
        const alt =
            module.id === "select"
                ? "SELECT name, department FROM employees WHERE status = 'active';"
                : module.id === "where"
                  ? "SELECT * FROM employees WHERE salary > 1000;"
                  : module.example;
        coachRespond(
            () => [
                coachMsg(vi.learn.easierExample),
                coachMsg(alt, { type: "code" }),
            ],
            EXERCISE_HELP_OPTIONS,
        );
    }

    function handleAnotherTask() {
        if (!module || !confidence) return;
        const levels = ["beginner", "medium", "advanced"] as const;
        const ex = module.exercises[levels[Math.floor(Math.random() * 3)]];
        coachRespond(
            () => [coachMsg(vi.learn.anotherTask)],
            EXERCISE_HELP_OPTIONS,
            400,
        );
        pushExerciseTask(ex, vi.learn.practiceRound);
    }

    function handleShowHint() {
        if (!currentExercise) return;
        setLearningTab("hint");
        setMessages((prev) =>
            appendCoachTurn(
                prev,
                [coachMsg(`${vi.learn.hintPrefix}: ${currentExercise.hint}`, { type: "hint" })],
                EXERCISE_HELP_OPTIONS,
            ),
        );
        setShowHint(true);
    }

    function pickQuickReply(messageId: string, option: QuickReply) {
        if (isTyping) return;
        const { action, label, uiAction } = option;
        if (!isQuickAnswerSelectable(messages, messageId)) return;
        setMessages((prev) => trySelectQuickAnswer(prev, messageId, label));
        applyLearningUi(uiAction);

        if (action === "learn:data") {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [coachMsg("Dữ liệu mẫu — xem tab **Dữ liệu** bên phải.")],
                    EXERCISE_HELP_OPTIONS,
                ),
            );
            return;
        }

        if (action.startsWith("confidence:")) {
            handleConfidence(action.split(":")[1] as Confidence);
            return;
        }
        if (action.startsWith("quiz:")) {
            handleMiniAnswer(action.split(":")[1]);
            return;
        }
        if (action === "module:continue") {
            goNextModule();
            return;
        }
        if (action === "module:practice") {
            if (!module || !confidence) return;
            pushExerciseTask(
                exerciseForConfidence(module, confidence),
                vi.learn.practiceRound,
            );
            setPhase("exercise");
            return;
        }
        if (action === "module:explain") {
            handleExplainAgain();
            return;
        }
        if (action === "help:explain") {
            handleExplainAgain();
            return;
        }
        if (action === "help:example") {
            handleEasierExample();
            return;
        }
        if (action === "help:practice") {
            handleAnotherTask();
            return;
        }
        if (action === "help:hint") {
            handleShowHint();
            return;
        }
        if (action === "learn:finish") {
            onComplete(readiness);
        }
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-zinc-950">
            {returnContext && <LearnReturnBanner context={returnContext} />}
            <TopBar moduleLabel={moduleLabel} readiness={readiness} />
            <WorkspaceLayout
                chat={
                    <ChatCoach
                        messages={messages}
                        isTyping={isTyping}
                        onQuickReply={pickQuickReply}
                        coachName={vi.learn.coachName}
                        coachSubtitle={vi.learn.coachSubtitle}
                    />
                }
                editor={
                    <SqlEditor
                        sql={sql}
                        onChange={setSql}
                        onRun={handleRun}
                        onSubmit={handleSubmit}
                        onReset={() =>
                            currentExercise && resetExercise(currentExercise, showHint)
                        }
                        onShowHint={handleShowHint}
                        hintVisible={showHint}
                        canShowHintButton={confidence !== "none" && phase === "exercise"}
                        submitDisabled={phase !== "exercise"}
                        submitDisabledReason={vi.sql.submitNeedsExercise}
                    />
                }
                data={
                    <DataPanel
                        mode="learning"
                        activeLearningTab={learningTab}
                        onLearningTabChange={setLearningTab}
                        lessonTitle={module.title}
                        lessonBody={`${module.shortRecap}\n\n${module.example}`}
                        hintText={currentExercise?.hint}
                        datasetId="employees"
                        rows={employees.map((e) => ({ ...e }))}
                        runResult={runResult}
                        submitOk={submitOk}
                    />
                }
            />
        </div>
    );
}
