"use client";

import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import type { ChatMessage, QuickReply } from "@/lib/chat-types";
import { vi } from "@/lib/vi";

type Props = {
    messages: ChatMessage[];
    isTyping: boolean;
    onQuickReply: (messageId: string, option: QuickReply) => void;
    coachName?: string;
    coachSubtitle?: string;
    mode?: "learning" | "simulation";
    avatarInitials?: string;
};

function isCoachType(type: ChatMessage["type"]) {
    return (
        type.startsWith("coach_") ||
        type === "text" ||
        type === "code" ||
        type === "feedback" ||
        type === "hint" ||
        type === "quiz"
    );
}

function CoachBubble({
    message,
    avatarInitials,
}: {
    message: ChatMessage;
    avatarInitials?: string;
}) {
    const inner =
        message.type === "coach_code" || message.type === "code" ? (
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-emerald-700 dark:text-emerald-300">
                {message.content}
            </pre>
        ) : message.type === "coach_hint" || message.type === "hint" ? (
            <p className="text-sm text-amber-800 dark:text-amber-200">{message.content}</p>
        ) : (
            <p
                className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-zinc-200"
                dangerouslySetInnerHTML={{
                    __html: message.content.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='font-semibold text-slate-900 dark:text-white'>$1</strong>",
                    ),
                }}
            />
        );

    return (
        <div className="flex gap-2">
            <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    avatarInitials
                        ? "bg-violet-100 text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                        : "bg-slate-200 dark:bg-zinc-800"
                }`}
            >
                {avatarInitials ? (
                    avatarInitials
                ) : (
                    <Bot className="h-3.5 w-3.5 text-violet-600 dark:text-indigo-400" />
                )}
            </div>
            <div className="mr-4 max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
                {inner}
            </div>
        </div>
    );
}

function UserBubble({ message }: { message: ChatMessage }) {
    return (
        <div className="flex flex-row-reverse gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 dark:bg-indigo-500">
                <User className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="ml-4 max-w-[85%] rounded-2xl rounded-tr-sm bg-violet-600 px-3 py-2.5 text-sm text-white dark:bg-indigo-600">
                {message.content}
            </div>
        </div>
    );
}

function QuickAnswersBubble({
    message,
    onSelect,
}: {
    message: ChatMessage;
    onSelect: (messageId: string, option: QuickReply) => void;
}) {
    return (
        <div className="flex flex-row-reverse gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-200 dark:bg-indigo-500/30">
                <User className="h-3.5 w-3.5 text-violet-600 dark:text-indigo-300" />
            </div>
            <div className="ml-4 max-w-[90%] rounded-2xl rounded-tr-sm border border-violet-200 bg-violet-50 px-3 py-3 dark:border-indigo-500/50 dark:bg-indigo-950/40">
                <p className="text-[10px] font-medium uppercase tracking-wide text-violet-700 dark:text-indigo-300/90">
                    {message.content}
                </p>
                <div className="mt-2 flex flex-wrap justify-end gap-2">
                    {message.options?.map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onSelect(message.id, opt)}
                            className="rounded-full border border-violet-300 bg-violet-100 px-3 py-1.5 text-left text-xs text-violet-900 transition hover:border-violet-400 hover:bg-violet-200 dark:border-indigo-500/60 dark:bg-indigo-600/30 dark:text-indigo-100 dark:hover:border-indigo-400 dark:hover:bg-indigo-600/50"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ChatCoach({
    messages,
    isTyping,
    onQuickReply,
    coachName = vi.learn.coachName,
    coachSubtitle = vi.chat.chooseResponse,
    mode = "learning",
    avatarInitials,
}: Props) {
    const initials = mode === "simulation" ? (avatarInitials ?? "NT") : undefined;
    const bottomRef = useRef<HTMLDivElement>(null);

    const lastActiveQuickId = [...messages]
        .reverse()
        .find((m) => m.type === "quick_answers" && m.active !== false)?.id;

    useEffect(() => {
        const scroll = () => {
            bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
        };
        scroll();
        const id = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(id);
    }, [messages, isTyping]);

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-zinc-950">
            <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-zinc-800">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        initials
                            ? "bg-violet-100 text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                            : "bg-violet-100 dark:bg-indigo-600/20"
                    }`}
                >
                    {initials ?? (
                        <Bot className="h-4 w-4 text-violet-600 dark:text-indigo-400" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {coachName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500">{coachSubtitle}</p>
                </div>
            </div>

            <div className="scrollbar-none min-h-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden overscroll-y-contain px-3 py-4">
                {messages.map((m) => {
                    if (m.type === "quick_answers") {
                        const isActive =
                            !isTyping &&
                            m.id === lastActiveQuickId &&
                            m.active !== false;
                        if (!isActive) return null;
                        return (
                            <QuickAnswersBubble
                                key={m.id}
                                message={m}
                                onSelect={onQuickReply}
                            />
                        );
                    }
                    if (m.sender === "system") {
                        return (
                            <p
                                key={m.id}
                                className="text-center text-[10px] uppercase tracking-wide text-slate-400 dark:text-zinc-600"
                            >
                                {m.content}
                            </p>
                        );
                    }
                    if (isCoachType(m.type) || m.sender === "coach") {
                        return (
                            <CoachBubble
                                key={m.id}
                                message={m}
                                avatarInitials={initials}
                            />
                        );
                    }
                    if (m.sender === "user") {
                        return <UserBubble key={m.id} message={m} />;
                    }
                    return null;
                })}

                {isTyping && (
                    <div className="flex gap-2">
                        <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                                initials
                                    ? "bg-violet-100 text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                                    : "bg-slate-200 dark:bg-zinc-800"
                            }`}
                        >
                            {initials ?? (
                                <Bot className="h-3.5 w-3.5 text-violet-600 dark:text-indigo-400" />
                            )}
                        </div>
                        <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="mb-1.5 text-[10px] text-slate-400 dark:text-zinc-500">
                                {vi.chat.mentorThinking}
                            </p>
                            <div className="flex gap-1">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-zinc-500" />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms] dark:bg-zinc-500" />
                                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms] dark:bg-zinc-500" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} className="h-px shrink-0" aria-hidden />
            </div>
        </div>
    );
}
