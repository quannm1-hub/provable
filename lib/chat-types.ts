export type ChatSender = "coach" | "user" | "system";

export type ChatMessageType =
    | "text"
    | "code"
    | "quiz"
    | "feedback"
    | "hint"
    | "coach_text"
    | "coach_code"
    | "coach_feedback"
    | "coach_hint"
    | "user_text"
    | "quick_answers";

import type { DocumentUiAction } from "./document-panel";
import type { RetentionUiAction } from "./da-retention-panel";
import type { HomeTestUiAction } from "./coccoc-home-test-panel";
import type { LearningUiAction } from "./learning-panel";
import type { SimulationUiAction } from "./simulation-panel";

export type QuickReply = {
    id: string;
    label: string;
    action: string;
    uiAction?:
        | SimulationUiAction
        | LearningUiAction
        | DocumentUiAction
        | RetentionUiAction
        | HomeTestUiAction;
};

export type ChatMessage = {
    id: string;
    sender: ChatSender;
    type: ChatMessageType;
    content: string;
    options?: QuickReply[];
    active?: boolean;
    timestamp: number;
};

export function chatId() {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Remove unanswered quick-answer bubbles before a new coach turn. */
export function stripUnresolvedQuickAnswers(messages: ChatMessage[]): ChatMessage[] {
    return messages.filter((m) => m.type !== "quick_answers");
}

export function resolveQuickAnswerSelection(
    messages: ChatMessage[],
    messageId: string,
    label: string,
): ChatMessage[] {
    return messages.map((m) =>
        m.id === messageId && m.type === "quick_answers"
            ? {
                  id: m.id,
                  sender: "user",
                  type: "user_text",
                  content: label,
                  timestamp: m.timestamp,
              }
            : m,
    );
}

export function coachMsg(
    content: string,
    opts?: Partial<Pick<ChatMessage, "type">>,
): ChatMessage {
    const t = opts?.type ?? "text";
    const mapped: ChatMessageType =
        t === "code"
            ? "coach_code"
            : t === "feedback"
              ? "coach_feedback"
              : t === "hint"
                ? "coach_hint"
                : "coach_text";
    return {
        id: chatId(),
        sender: "coach",
        type: mapped,
        content,
        timestamp: Date.now(),
    };
}

export function userMsg(content: string): ChatMessage {
    return {
        id: chatId(),
        sender: "user",
        type: "user_text",
        content,
        timestamp: Date.now(),
    };
}

export function quickAnswersMsg(
    options: QuickReply[],
    active = true,
    content = "Chọn câu trả lời",
): ChatMessage {
    return {
        id: chatId(),
        sender: "user",
        type: "quick_answers",
        content,
        options,
        active,
        timestamp: Date.now(),
    };
}

export function systemMsg(content: string): ChatMessage {
    return {
        id: chatId(),
        sender: "system",
        type: "text",
        content,
        timestamp: Date.now(),
    };
}

export function appendCoachTurn(
    prev: ChatMessage[],
    coachMessages: ChatMessage[],
    options: QuickReply[] = [],
): ChatMessage[] {
    const base = [...stripUnresolvedQuickAnswers(prev), ...coachMessages];
    if (options.length === 0) return base;
    return [...base, quickAnswersMsg(options, true)];
}
