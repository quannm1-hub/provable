"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cloneEmployees } from "@/lib/employees";
import {
    appendCoachTurn,
    coachMsg,
    stripUnresolvedQuickAnswers,
    type ChatMessage,
    type QuickReply,
} from "@/lib/chat-types";
import {
    BRIEFING_OPTIONS,
    MODEL_OPTIONS,
    REFLECTION_NEXT,
    SUBMITTED_OPTIONS,
    WORKING_OPTIONS,
    WORKING_WITH_MODEL,
} from "@/lib/internship-options";
import {
    initialScores,
    INTERNSHIP_META,
    internshipTasks,
    progressIndexForTask,
    scoreForTask,
    type SimulationSubStep,
    type SubmittedTaskRecord,
} from "@/lib/internship";
import { NOVATECH_PROGRAM } from "@/lib/internship-detail";
import {
    getFailureRecommendation,
    inferFailReason,
} from "@/lib/recommendations";
import type { SkillId } from "@/lib/sql-skill-map";
import { getSkill } from "@/lib/sql-skill-map";
import {
    goToLearnModule,
    loadReturnContext,
    loadSimulationResume,
    clearSimulationResume,
    NOVATECH_TASK_INDEX,
    type InternshipReturnContext,
} from "@/lib/skill-navigation";
import type { SimulationTab } from "@/lib/simulation-panel";
import { isQuickAnswerSelectable, trySelectQuickAnswer } from "@/lib/chat-actions";
import type { HighlightTarget } from "@/lib/simulation-panel";
import { normalizeSql } from "@/lib/sql-normalize";
import { runSql } from "@/lib/sql-runner";
import type { RunResult } from "@/lib/types";
import ChatCoach from "@/app/components/workspace/ChatCoach";
import SqlEditor from "@/app/components/workspace/SqlEditor";
import WorkspaceLayout from "@/app/components/workspace/WorkspaceLayout";
import { vi } from "@/lib/vi";
import InternshipProgress from "./InternshipProgress";
import SimulationDataPanel from "./SimulationDataPanel";
import SimulationHeader from "./SimulationHeader";

type Scores = {
    sqlFundamentals: number;
    querySafety: number;
    businessUnderstanding: number;
    overall: number;
};

type SubmissionStatus = "not_submitted" | "checking" | "submitted" | "model_unlocked";

type Props = {
    onComplete: (records: SubmittedTaskRecord[], scores: Scores) => void;
    onBackToProgram: () => void;
    onDashboard: () => void;
    initialTaskId?: string | null;
};

function mentorMsg(content: string, opts?: { type?: ChatMessage["type"] }) {
    return coachMsg(content, opts);
}

function makeReturnContext(task: (typeof internshipTasks)[0]): InternshipReturnContext {
    return {
        from: "internship",
        internshipId: "coccoc-data-ops",
        taskId: task.id,
        taskTitle: task.title,
    };
}

export default function InternshipSimulation({
    onComplete,
    onBackToProgram,
    initialTaskId,
}: Props) {
    const [taskIndex, setTaskIndex] = useState(0);
    const [subStep, setSubStep] = useState<SimulationSubStep>("briefing");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sql, setSql] = useState("");
    const [runResult, setRunResult] = useState<RunResult | null>(null);
    const [submitOk, setSubmitOk] = useState<boolean | null>(null);
    const [submissionStatus, setSubmissionStatus] =
        useState<SubmissionStatus>("not_submitted");
    const [modelUnlocked, setModelUnlocked] = useState(false);
    const [failCount, setFailCount] = useState(0);
    const [employees] = useState(() => cloneEmployees());
    const [submittedRecords, setSubmittedRecords] = useState<SubmittedTaskRecord[]>([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [scores, setScores] = useState(initialScores);
    const recordsRef = useRef<SubmittedTaskRecord[]>([]);
    const booted = useRef(false);
    const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [activeTab, setActiveTab] = useState<SimulationTab>("brief");
    const [highlightTarget, setHighlightTarget] = useState<HighlightTarget>(null);
    const [modelUnlockFlash, setModelUnlockFlash] = useState(false);

    const pulseHighlight = useCallback((target: HighlightTarget) => {
        if (highlightTimer.current) clearTimeout(highlightTimer.current);
        setHighlightTarget(target);
        highlightTimer.current = setTimeout(() => setHighlightTarget(null), 1500);
    }, []);

    const applyPanelUi = useCallback(
        (uiAction: QuickReply["uiAction"], unlocked: boolean): boolean => {
            const ui = uiAction as
                | {
                      setTab?: SimulationTab;
                      highlight?: HighlightTarget;
                      requiresModelAnswerUnlocked?: boolean;
                  }
                | undefined;
            if (!ui?.setTab && !ui?.highlight && !ui?.requiresModelAnswerUnlocked) {
                return true;
            }
            if (ui.requiresModelAnswerUnlocked && !unlocked) return false;
            if (ui.setTab) setActiveTab(ui.setTab);
            if (ui.highlight) pulseHighlight(ui.highlight);
            return true;
        },
        [pulseHighlight],
    );

    const task = internshipTasks[taskIndex];
    const sqlTask = task && !task.isBriefing ? task : internshipTasks[1];
    const progressStep = task?.isBriefing
        ? 0
        : progressIndexForTask(task?.stepIndex ?? 0);
    const totalSqlTasks = internshipTasks.filter((t) => !t.isBriefing).length;

    const respond = useCallback(
        (build: () => ChatMessage[], options: QuickReply[] = [], delay = 500) => {
            setIsTyping(true);
            setMessages((prev) => stripUnresolvedQuickAnswers(prev));
            setTimeout(() => {
                setMessages((prev) => appendCoachTurn(prev, build(), options));
                setIsTyping(false);
            }, delay);
        },
        [],
    );

    useEffect(() => {
        if (booted.current) return;
        booted.current = true;
        const simResume = loadSimulationResume();
        const taskFromUrl = initialTaskId ?? simResume?.taskId;
        const resumeIdx =
            taskFromUrl != null ? NOVATECH_TASK_INDEX[taskFromUrl] : undefined;
        if (resumeIdx != null && resumeIdx > 0) {
            const t = internshipTasks[resumeIdx];
            if (t && !t.isBriefing) {
                setTaskIndex(resumeIdx);
                setSubStep("working");
                setSql(simResume?.sqlInput ?? t.starterQuery);
                setCompletedCount(resumeIdx);
                const tab = simResume?.activeTab as SimulationTab | undefined;
                setActiveTab(tab && tab !== "brief" ? tab : "brief");
                if (simResume) clearSimulationResume();
                const ctx = loadReturnContext();
                if (ctx?.targetSkillId) {
                    pulseHighlight("relatedSkills");
                }
                setMessages(
                    appendCoachTurn(
                        [],
                        [
                            mentorMsg(
                                ctx?.targetSkillId
                                    ? `Bạn đã quay lại task. Phần kiến thức liên quan đang được đánh dấu để bạn tiếp tục.\n\n**${t.title}:** ${t.instruction}`
                                    : `Bạn quay lại task **${t.title}**. ${t.workplaceContext}\n\n${t.instruction}`,
                            ),
                        ],
                        WORKING_OPTIONS,
                    ),
                );
                return;
            }
        }
        setActiveTab("brief");
        setMessages(
            appendCoachTurn(
                [],
                [mentorMsg(INTERNSHIP_META.intro)],
                BRIEFING_OPTIONS,
            ),
        );
    }, [initialTaskId, pulseHighlight]);

    function resetTaskState() {
        setRunResult(null);
        setSubmitOk(null);
        setSubmissionStatus("not_submitted");
        setModelUnlocked(false);
        setModelUnlockFlash(false);
        setFailCount(0);
    }

    function startFirstSqlTask() {
        const t = internshipTasks[1];
        setTaskIndex(1);
        setSubStep("working");
        setSql(t.starterQuery);
        resetTaskState();
        setActiveTab("brief");
        respond(
            () => [
                mentorMsg(
                    `Đây là brief từ quản lý của bạn.\n\n**Task 2 — ${t.title}:** ${t.instruction}\n\nBạn cần nộp một truy vấn SQL đáp ứng yêu cầu nghiệp vụ. Sau khi nộp đúng, bạn sẽ mở khóa đáp án mẫu để so sánh.`,
                ),
            ],
            WORKING_OPTIONS,
        );
    }

    function loadTask(idx: number) {
        const t = internshipTasks[idx];
        if (!t || t.isBriefing) return;
        setTaskIndex(idx);
        setSubStep("working");
        setSql(t.starterQuery);
        resetTaskState();
        setActiveTab("brief");
        const stepNum = t.stepIndex;
        respond(
            () => [
                mentorMsg(
                    `**Task ${stepNum} / ${totalSqlTasks} — ${t.title}**\n\n${t.workplaceContext}\n\n${t.instruction}`,
                ),
            ],
            WORKING_OPTIONS,
        );
    }

    function dangerCheck(): string | null {
        const n = normalizeSql(sql);
        if (n.startsWith("update") && !n.includes("where")) {
            return vi.internship.dangerousUpdate;
        }
        if (n.startsWith("delete") && !n.includes("where")) {
            return vi.internship.dangerousDelete;
        }
        return null;
    }

    function handleRun() {
        if (!sql.trim()) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [mentorMsg(vi.sqlRunner.enterQuery, { type: "feedback" })],
                    optionsForSubStep(),
                ),
            );
            return;
        }
        const result = runSql(sql, employees);
        setRunResult(result);
        setSubmitOk(null);
        setActiveTab("result");
        pulseHighlight("result");
        setMessages((prev) =>
            appendCoachTurn(
                prev,
                [
                    mentorMsg(
                        result.ok
                            ? "Kết quả chạy thử ổn. Xem tab **Kết quả** — khi sẵn sàng hãy **Nộp task**."
                            : result.message,
                        { type: "feedback" },
                    ),
                ],
                WORKING_OPTIONS,
            ),
        );
    }

    function handleSubmit() {
        if (!sqlTask || sqlTask.isBriefing) return;
        const danger = dangerCheck();
        if (danger) {
            setSubmitOk(false);
            setSubmissionStatus("not_submitted");
            setActiveTab("result");
            setMessages((prev) =>
                appendCoachTurn(prev, [mentorMsg(danger, { type: "feedback" })], WORKING_OPTIONS),
            );
            return;
        }

        setSubmissionStatus("checking");
        setActiveTab("result");
        const result = sqlTask.validate(sql);

        setTimeout(() => {
            if (!result.ok) {
                const nextFails = failCount + 1;
                setFailCount(nextFails);
                setSubmitOk(false);
                setSubmissionStatus("not_submitted");
                const unlockHint =
                    nextFails >= 3
                        ? "\n\nBạn đã thử 3 lần — có thể **Mở đáp án mẫu** để học trước khi nộp lại."
                        : "";
                const failRec = getFailureRecommendation(
                    sqlTask.id,
                    inferFailReason(result.feedback, sql, sqlTask.id),
                );
                const failOptions: QuickReply[] = [
                    { id: "retry", label: "Thử lại", action: "intern:ready" },
                    { id: "hint", label: "Xem gợi ý task", action: "intern:hint" },
                ];
                if (failRec.skillId && failRec.quickLabel) {
                    failOptions.unshift({
                        id: "learn-fail",
                        label: failRec.quickLabel,
                        action: `intern:learn:${failRec.skillId}`,
                    });
                }
                if (nextFails >= 3) {
                    failOptions.push({
                        id: "model",
                        label: "Mở đáp án mẫu",
                        action: "intern:model",
                    });
                }
                setMessages((prev) =>
                    appendCoachTurn(
                        prev,
                        [
                            mentorMsg(failRec.message, { type: "feedback" }),
                            mentorMsg(result.feedback + unlockHint, { type: "feedback" }),
                            mentorMsg(`${vi.sql.hint}: ${sqlTask.hint}`, { type: "hint" }),
                        ],
                        failOptions,
                    ),
                );
                if (nextFails >= 3) {
                    setModelUnlocked(true);
                    setSubmissionStatus("model_unlocked");
                }
                return;
            }

            setSubmitOk(true);
            setSubmissionStatus("submitted");
            setRunResult(runSql(sql, employees));
            setActiveTab("modelAnswer");
            setModelUnlockFlash(true);
            setTimeout(() => setModelUnlockFlash(false), 3000);
            const isMod =
                sqlTask.id.includes("update") || sqlTask.id.includes("delete");
            const pts = scoreForTask(sqlTask, isMod);
            setScores((s) => ({
                sqlFundamentals: Math.min(100, s.sqlFundamentals + pts.sql),
                querySafety: Math.min(100, s.querySafety + pts.safety),
                businessUnderstanding: Math.min(
                    100,
                    s.businessUnderstanding + pts.business,
                ),
                overall: Math.min(100, s.overall + Math.round(pts.total * 0.8)),
            }));
            setSubmittedRecords((prev) => {
                const next = [
                    ...prev,
                    {
                        taskId: sqlTask.title,
                        query: sql,
                        modelAnswer: sqlTask.modelAnswer,
                        feedback: sqlTask.successFeedback,
                        skillTags: sqlTask.skillTags,
                    },
                ];
                recordsRef.current = next;
                return next;
            });
            setSubStep("submitted");
            setModelUnlocked(true);
            setSubmissionStatus("model_unlocked");
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        mentorMsg(sqlTask.successFeedback, { type: "feedback" }),
                        mentorMsg(
                            "Đáp án mẫu đã mở khóa. Bạn muốn xem vì sao đáp án này phù hợp không?",
                            { type: "feedback" },
                        ),
                    ],
                    SUBMITTED_OPTIONS,
                ),
            );
            pulseHighlight("modelAnswer");
        }, 600);
    }

    function showModelAnswer() {
        if (!sqlTask || sqlTask.isBriefing) return;
        setSubStep("modelAnswer");
        setModelUnlocked(true);
        setSubmissionStatus("model_unlocked");
        setActiveTab("modelAnswer");
        pulseHighlight("modelAnswer");
        setMessages((prev) =>
            appendCoachTurn(
                prev,
                [
                    mentorMsg(vi.internship.modelAnswerIntro),
                    mentorMsg(sqlTask.modelAnswer, { type: "code" }),
                ],
                [
                    { id: "m1", label: "Trả lời câu phản tư", action: "intern:reflect" },
                    ...SUBMITTED_OPTIONS.filter((o) => o.action === "intern:review"),
                ],
            ),
        );
    }

    function showReflection() {
        if (!sqlTask || sqlTask.isBriefing) return;
        setSubStep("reflection");
        setMessages((prev) =>
            appendCoachTurn(
                prev,
                [mentorMsg(`**Câu hỏi phản tư:** ${sqlTask.reflectionQuestion}`, { type: "quiz" })],
                sqlTask.reflectionOptions,
            ),
        );
    }

    function optionsForSubStep(): QuickReply[] {
        if (subStep === "submitted") return SUBMITTED_OPTIONS;
        if (subStep === "modelAnswer") return MODEL_OPTIONS;
        if (modelUnlocked) return WORKING_WITH_MODEL;
        return WORKING_OPTIONS;
    }

    function finishTaskAndAdvance() {
        setCompletedCount((c) => c + 1);
        const nextIdx = taskIndex + 1;
        if (nextIdx >= internshipTasks.length) {
            setMessages((prev) => stripUnresolvedQuickAnswers(prev));
            onComplete(recordsRef.current, scores);
            return;
        }
        loadTask(nextIdx);
    }

    function pickQuickReply(messageId: string, option: QuickReply) {
        if (isTyping) return;
        const { action, label, uiAction } = option;
        if (!isQuickAnswerSelectable(messages, messageId)) return;
        setMessages((prev) => trySelectQuickAnswer(prev, messageId, label));

        if (uiAction && !applyPanelUi(uiAction, modelUnlocked)) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        mentorMsg(
                            "Bạn cần nộp task đúng hoặc thử đủ số lần trước khi mở đáp án mẫu.",
                            { type: "feedback" },
                        ),
                    ],
                    optionsForSubStep(),
                ),
            );
            return;
        }

        if (action === "intern:start") {
            setCompletedCount(1);
            startFirstSqlTask();
            return;
        }
        if (action === "intern:context") {
            respond(
                () => [
                    mentorMsg(
                        "Team People Operations dùng dữ liệu nhân sự để chuẩn bị báo cáo hàng tháng. Mỗi task yêu cầu một truy vấn SQL cụ thể — đọc brief trước khi viết.",
                    ),
                ],
                BRIEFING_OPTIONS,
            );
            return;
        }
        if (action === "intern:skills") {
            respond(
                () => [mentorMsg(`Kỹ năng trong chương trình: ${NOVATECH_PROGRAM.skills.join(", ")}.`)],
                BRIEFING_OPTIONS,
            );
            return;
        }
        if (action === "intern:business" && sqlTask) {
            respond(() => [mentorMsg(sqlTask.workplaceContext)], optionsForSubStep(), 350);
            return;
        }
        if (action === "intern:deliverable" && sqlTask) {
            respond(
                () => [mentorMsg(`Kết quả cần nộp: ${sqlTask.expectedDeliverable}`)],
                optionsForSubStep(),
                350,
            );
            return;
        }
        if (action === "intern:hint" && sqlTask) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [mentorMsg(`${vi.sql.hint}: ${sqlTask.hint}`, { type: "hint" })],
                    optionsForSubStep(),
                ),
            );
            return;
        }
        if (action === "intern:ready") {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        mentorMsg(
                            "Tốt. Hãy đọc lại yêu cầu đầu ra trong tab Tổng quan task, sau đó viết SQL ở khung bên trên. Khi xong, bấm **Chạy thử**.",
                        ),
                    ],
                    optionsForSubStep(),
                ),
            );
            return;
        }
        if (action === "intern:data") {
            respond(
                () => [mentorMsg("Dữ liệu bảng employees — dùng tab **Dữ liệu** bên phải.")],
                optionsForSubStep(),
                300,
            );
            return;
        }
        if (action === "intern:resources") {
            respond(
                () => [mentorMsg("Tài nguyên hỗ trợ có trong tab **Tài nguyên**.")],
                optionsForSubStep(),
                300,
            );
            return;
        }
        if (action === "intern:why-correct") {
            showModelAnswer();
            respond(
                () => [
                    mentorMsg(
                        "So sánh **Bài làm của bạn** và **Đáp án mẫu** trong tab Đáp án mẫu — mentor đã ghi nhận điểm làm tốt và phần có thể cải thiện.",
                    ),
                ],
                SUBMITTED_OPTIONS,
                350,
            );
            return;
        }
        if (action === "intern:review-skills") {
            respond(
                () => [
                    mentorMsg(
                        "Các kỹ năng liên quan nằm trong tab Tổng quan task — bạn có thể **Ôn lại** hoặc **Học nhanh** từng phần.",
                    ),
                ],
                optionsForSubStep(),
                350,
            );
            return;
        }
        if (action === "intern:why" && sqlTask) {
            respond(
                () => [
                    mentorMsg(
                        `Task này quan trọng vì lãnh đạo dựa vào ${INTERNSHIP_META.project} chính xác. Sai lệch SQL có thể làm sai headcount hoặc báo cáo lương.`,
                    ),
                ],
                optionsForSubStep(),
                350,
            );
            return;
        }
        if (action === "intern:review") {
            const summary = runResult?.ok
                ? runResult.message
                : vi.internship.runFirst;
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [mentorMsg(vi.internship.resultReview(summary), { type: "feedback" })],
                    optionsForSubStep(),
                ),
            );
            return;
        }
        if (action === "intern:model") {
            showModelAnswer();
            return;
        }
        if (action === "intern:reflect") {
            showReflection();
            return;
        }
        if (action.startsWith("reflect:")) {
            if (!sqlTask) return;
            if (action === sqlTask.correctReflectionAction) {
                respond(
                    () => [mentorMsg(vi.internship.reflectionCorrect, { type: "feedback" })],
                    taskIndex + 1 >= internshipTasks.length - 1 ? [] : REFLECTION_NEXT,
                    400,
                );
                if (taskIndex >= internshipTasks.length - 1) {
                    setTimeout(() => onComplete(recordsRef.current, scores), 1200);
                }
            } else {
                respond(
                    () => [
                        mentorMsg(vi.internship.reflectionWrong, { type: "feedback" }),
                        mentorMsg(`**Câu hỏi phản tư:** ${sqlTask.reflectionQuestion}`, {
                            type: "quiz",
                        }),
                    ],
                    sqlTask.reflectionOptions,
                );
            }
            return;
        }
        if (action === "intern:next") {
            finishTaskAndAdvance();
            return;
        }
        if (action.startsWith("intern:learn:") && sqlTask) {
            const skillId = action.replace("intern:learn:", "") as SkillId;
            const skill = getSkill(skillId);
            if (skill) {
                goToLearnModule(
                    skill.learnModuleId,
                    { ...makeReturnContext(sqlTask), targetSkillId: skillId },
                );
            }
        }
    }

    const returnCtx =
        task && !task.isBriefing ? makeReturnContext(task) : undefined;

    const sqlStepNum = task?.isBriefing ? 1 : (task?.stepIndex ?? 1);
    const taskProgress = task?.isBriefing
        ? `Task 1: ${task.title}`
        : `Task ${sqlStepNum} / ${totalSqlTasks}: ${task?.title ?? ""}`;

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-zinc-950">
            <SimulationHeader
                taskTitle={task?.title ?? ""}
                taskProgress={taskProgress}
                completedTasks={completedCount}
                totalTasks={totalSqlTasks + 1}
                onBack={onBackToProgram}
                taskId={task?.id}
                activeTab={activeTab}
                sqlInput={sql}
            />
            <InternshipProgress
                currentStep={progressStep}
                completedThrough={completedCount}
            />
            <WorkspaceLayout
                chat={
                    <ChatCoach
                        messages={messages}
                        isTyping={isTyping}
                        onQuickReply={pickQuickReply}
                        mode="simulation"
                        avatarInitials="CC"
                        coachName={vi.internship.mentorName}
                        coachSubtitle={vi.internship.mentorSubtitle}
                    />
                }
                editor={
                    sqlTask && !sqlTask.isBriefing ? (
                        <SqlEditor
                            sql={sql}
                            onChange={setSql}
                            onRun={handleRun}
                            onSubmit={handleSubmit}
                            onReset={() => {
                                setSql(sqlTask.starterQuery);
                                resetTaskState();
                                setActiveTab("brief");
                                setMessages((prev) =>
                                    appendCoachTurn(
                                        prev,
                                        [
                                            mentorMsg(
                                                "Mình đã reset bài làm. Hãy xem lại brief rồi thử lại.",
                                            ),
                                        ],
                                        WORKING_OPTIONS,
                                    ),
                                );
                            }}
                            onShowHint={() =>
                                setMessages((prev) =>
                                    appendCoachTurn(
                                        prev,
                                        [
                                            mentorMsg(`${vi.sql.hint}: ${sqlTask.hint}`, {
                                                type: "hint",
                                            }),
                                        ],
                                        optionsForSubStep(),
                                    ),
                                )
                            }
                            hintVisible={false}
                            canShowHintButton={false}
                            variant="simulation"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-zinc-500">
                            {vi.internship.unlockSql}
                        </div>
                    )
                }
                data={
                    <SimulationDataPanel
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        highlightTarget={highlightTarget}
                        task={sqlTask && !sqlTask.isBriefing ? sqlTask : task}
                        datasetId="employees"
                        rows={employees.map((e) => ({ ...e }))}
                        runResult={runResult}
                        submitOk={submitOk}
                        submissionStatus={submissionStatus}
                        yourQuery={sql}
                        modelUnlocked={modelUnlocked}
                        modelUnlockFlash={modelUnlockFlash}
                        returnContext={returnCtx}
                    />
                }
            />
        </div>
    );
}
