import {
    resolveQuickAnswerSelection,
    type ChatMessage,
} from "./chat-types";

/** Whether this quick-answer bubble can still be selected (sync check before setState). */
export function isQuickAnswerSelectable(
    messages: ChatMessage[],
    messageId: string,
): boolean {
    const target = messages.find((m) => m.id === messageId);
    return target?.type === "quick_answers" && target.active !== false;
}

/** Returns same array if quick answer already resolved — prevents double-click actions. */
export function trySelectQuickAnswer(
    messages: ChatMessage[],
    messageId: string,
    label: string,
): ChatMessage[] {
    const target = messages.find((m) => m.id === messageId);
    if (target?.type !== "quick_answers" || target.active === false) {
        return messages;
    }
    return resolveQuickAnswerSelection(messages, messageId, label);
}
