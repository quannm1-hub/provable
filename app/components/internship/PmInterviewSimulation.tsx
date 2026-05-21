"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    appendCoachTurn,
    coachMsg,
    stripUnresolvedQuickAnswers,
    type ChatMessage,
    type QuickReply,
} from "@/lib/chat-types";
import { isQuickAnswerSelectable, trySelectQuickAnswer } from "@/lib/chat-actions";
import type { DocumentHighlightTarget, DocumentTab } from "@/lib/document-panel";
import { downloadPrdTemplate } from "@/lib/document-tasks";
import {
    evaluatePrdUpload,
    type PrdEvaluationResult,
} from "@/lib/prd-evaluation";
import { PM_DOCUMENT_TASK } from "@/lib/pm-internship-detail";
import {
    PRD_FAILED_OPTIONS,
    PRD_INTRO_OPTIONS,
    PRD_PASSED_OPTIONS,
    PRD_UPLOADED_OPTIONS,
} from "@/lib/pm-internship-options";
import ChatCoach from "@/app/components/workspace/ChatCoach";
import WorkspaceLayout from "@/app/components/workspace/WorkspaceLayout";
import DocumentReviewPanel from "./DocumentReviewPanel";
import DocumentTaskWorkspace, {
    type UploadPhase,
} from "./DocumentTaskWorkspace";
import PmSimulationHeader from "./PmSimulationHeader";

type Props = {
    onComplete: () => void;
    onBackToProgram: () => void;
    onDashboard: () => void;
};

const TASK = PM_DOCUMENT_TASK;

function mentorMsg(content: string) {
    return coachMsg(content);
}

export default function PmInterviewSimulation({
    onComplete,
    onBackToProgram,
    onDashboard,
}: Props) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState<DocumentTab>("brief");
    const [highlight, setHighlight] = useState<DocumentHighlightTarget>(null);
    const [file, setFile] = useState<File | null>(null);
    const [phase, setPhase] = useState<UploadPhase>("idle");
    const [evaluation, setEvaluation] = useState<PrdEvaluationResult | null>(null);
    const [modelUnlocked, setModelUnlocked] = useState(false);
    const [taskPassed, setTaskPassed] = useState(false);
    const booted = useRef(false);

    const respond = useCallback(
        (build: () => ChatMessage[], options: QuickReply[] = [], delay = 450) => {
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
        setActiveTab("brief");
        setMessages(
            appendCoachTurn(
                [],
                [
                    mentorMsg(
                        "Chào bạn. Đây là task mô phỏng phỏng vấn cho vai trò Associate Product Manager.",
                    ),
                    mentorMsg(
                        "Bạn sẽ viết một tài liệu Product Requirement Documentation cho tính năng Provable Coach.",
                    ),
                    mentorMsg(
                        "Đây là task phỏng vấn mô phỏng. Bạn cần hoàn thành tài liệu PRD dựa trên brief bên dưới. Hãy tải template, điền nội dung, sau đó upload lại file để hệ thống đánh giá.",
                    ),
                ],
                PRD_INTRO_OPTIONS,
            ),
        );
    }, []);

    function applyDocUi(uiAction: QuickReply["uiAction"], unlocked: boolean): boolean {
        const ui = uiAction as
            | {
                  setTab?: DocumentTab;
                  highlight?: DocumentHighlightTarget;
                  requiresModelUnlocked?: boolean;
              }
            | undefined;
        if (!ui) return true;
        if (ui.requiresModelUnlocked && !unlocked) {
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        mentorMsg(
                            "Đáp án tham khảo sẽ mở sau khi bạn nộp bài hoặc hệ thống chấm xong.",
                        ),
                    ],
                    optionsForState(),
                ),
            );
            return false;
        }
        if (ui.setTab) setActiveTab(ui.setTab);
        if (ui.highlight) setHighlight(ui.highlight);
        return true;
    }

    function optionsForState(): QuickReply[] {
        if (taskPassed) return PRD_PASSED_OPTIONS;
        if (evaluation) {
            return evaluation.status === "passed"
                ? PRD_PASSED_OPTIONS
                : PRD_FAILED_OPTIONS;
        }
        if (file) return PRD_UPLOADED_OPTIONS;
        return PRD_INTRO_OPTIONS;
    }

    function handleDownloadTemplate() {
        downloadPrdTemplate();
        setActiveTab("template");
        setMessages((prev) =>
            appendCoachTurn(
                prev,
                [
                    mentorMsg(
                        "Template đã được tải xuống. Hãy hoàn thiện tài liệu rồi upload lại file ở khu vực nộp bài.",
                    ),
                ],
                optionsForState(),
            ),
        );
    }

    function handleFileSelect(f: File | null) {
        setFile(f);
        setEvaluation(null);
        setPhase(f ? "uploaded" : "idle");
        if (f) {
            setActiveTab("submit");
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        mentorMsg(
                            "File đã được upload. Bấm **Chấm tài liệu** để hệ thống so sánh với đáp án tham khảo.",
                        ),
                    ],
                    PRD_UPLOADED_OPTIONS,
                ),
            );
        }
    }

    async function handleEvaluate() {
        if (!file) return;
        setPhase("evaluating");
        setActiveTab("evaluation");
        setHighlight("evaluation");

        await new Promise((r) => setTimeout(r, 1200));

        const result = await evaluatePrdUpload(file, TASK);
        setEvaluation(result);
        setPhase("evaluated");
        setModelUnlocked(true);

        if (result.status === "passed") {
            setTaskPassed(true);
            setActiveTab("modelAnswer");
            respond(
                () => [
                    mentorMsg(
                        "Bạn đã pass task. Tài liệu có độ bao phủ tốt so với đáp án tham khảo.",
                    ),
                ],
                PRD_PASSED_OPTIONS,
            );
        } else {
            respond(
                () => [
                    mentorMsg(
                        `Tài liệu chưa đạt ${TASK.passThreshold}% (hiện ${result.score}%). Bạn nên bổ sung các phần còn thiếu rồi upload lại.`,
                    ),
                ],
                PRD_FAILED_OPTIONS,
            );
        }
    }

    function pickQuickReply(messageId: string, option: QuickReply) {
        if (isTyping) return;
        const { action, label, uiAction } = option;
        if (!isQuickAnswerSelectable(messages, messageId)) return;
        setMessages((prev) => trySelectQuickAnswer(prev, messageId, label));

        if (uiAction && !applyDocUi(uiAction, modelUnlocked)) return;

        if (action === "prd:brief") {
            setActiveTab("brief");
            return;
        }
        if (action === "prd:template") {
            handleDownloadTemplate();
            return;
        }
        if (action === "prd:criteria") {
            setActiveTab("evaluation");
            setMessages((prev) =>
                appendCoachTurn(
                    prev,
                    [
                        mentorMsg(
                            `Task pass khi tài liệu đạt mức trùng khớp từ ${TASK.passThreshold}% trở lên với đáp án tham khảo.`,
                        ),
                    ],
                    optionsForState(),
                ),
            );
            return;
        }
        if (action === "prd:resources") {
            setActiveTab("resources");
            return;
        }
        if (action === "prd:sample") {
            setActiveTab("modelAnswer");
            return;
        }
        if (action === "prd:evaluation") {
            setActiveTab("evaluation");
            return;
        }
        if (action === "prd:reupload") {
            setFile(null);
            setEvaluation(null);
            setPhase("idle");
            setActiveTab("submit");
            return;
        }
        if (action === "prd:complete") {
            onComplete();
        }
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-zinc-950">
            <PmSimulationHeader
                onBack={onBackToProgram}
                taskTitle={TASK.title}
                passed={taskPassed}
            />
            <WorkspaceLayout
                chat={
                    <ChatCoach
                        messages={messages}
                        isTyping={isTyping}
                        onQuickReply={pickQuickReply}
                        coachName="Mentor NovaTech"
                        coachSubtitle="Product Platform · Interview mock"
                        mode="simulation"
                        avatarInitials="NT"
                    />
                }
                editor={
                    <DocumentTaskWorkspace
                        task={TASK}
                        file={file}
                        phase={phase}
                        evaluation={evaluation}
                        onFileSelect={handleFileSelect}
                        onEvaluate={handleEvaluate}
                        onDownloadTemplate={handleDownloadTemplate}
                    />
                }
                data={
                    <DocumentReviewPanel
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        highlight={highlight}
                        task={TASK}
                        uploadedFile={file}
                        evaluation={evaluation}
                        modelUnlocked={modelUnlocked}
                        onDownloadTemplate={handleDownloadTemplate}
                    />
                }
            />
            {taskPassed && (
                <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950">
                    <button
                        type="button"
                        onClick={onDashboard}
                        className="text-xs text-slate-500 hover:underline"
                    >
                        Quay về Bảng điều khiển
                    </button>
                </div>
            )}
        </div>
    );
}
