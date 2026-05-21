"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type DragAxis = "vertical" | "horizontal" | null;

type Props = {
    chat: ReactNode;
    editor: ReactNode;
    data: ReactNode;
    dataFooter?: ReactNode;
};

const CHAT_MIN = 25;
const CHAT_MAX = 50;
const EDITOR_MIN = 35;
const EDITOR_MAX = 70;

export default function WorkspaceLayout({ chat, editor, data, dataFooter }: Props) {
    const [chatWidthPct, setChatWidthPct] = useState(36);
    const [editorHeightPct, setEditorHeightPct] = useState(50);
    const dragRef = useRef<DragAxis>(null);
    const layoutRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const onMove = useCallback((e: MouseEvent) => {
        if (!dragRef.current || !layoutRef.current) return;

        if (dragRef.current === "vertical") {
            const rect = layoutRef.current.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setChatWidthPct(Math.min(CHAT_MAX, Math.max(CHAT_MIN, pct)));
        }

        if (dragRef.current === "horizontal" && rightRef.current) {
            const rect = rightRef.current.getBoundingClientRect();
            const pct = ((e.clientY - rect.top) / rect.height) * 100;
            setEditorHeightPct(Math.min(EDITOR_MAX, Math.max(EDITOR_MIN, pct)));
        }
    }, []);

    const onUp = useCallback(() => {
        dragRef.current = null;
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, [onMove, onUp]);

    return (
        <>
            {/* Desktop: chat | (editor / data) */}
            <div
                ref={layoutRef}
                className="hidden min-h-0 flex-1 lg:flex"
                style={{ userSelect: dragRef.current ? "none" : undefined }}
            >
                <div
                    className="flex min-h-0 min-w-[320px] flex-col overflow-hidden"
                    style={{ width: `${chatWidthPct}%` }}
                >
                    {chat}
                </div>

                <div
                    role="separator"
                    aria-orientation="vertical"
                    onMouseDown={() => {
                        dragRef.current = "vertical";
                    }}
                    className="group w-1.5 shrink-0 cursor-col-resize bg-slate-200 hover:bg-violet-400/50 active:bg-violet-500/60 dark:bg-zinc-900 dark:hover:bg-indigo-600/40 dark:active:bg-indigo-600/60"
                />

                <div
                    ref={rightRef}
                    className="flex min-h-0 min-w-[520px] flex-1 flex-col overflow-hidden"
                >
                    <div
                        className="flex min-h-0 flex-col overflow-hidden"
                        style={{ height: `${editorHeightPct}%`, minHeight: 260 }}
                    >
                        {editor}
                    </div>

                    <div
                        role="separator"
                        aria-orientation="horizontal"
                        onMouseDown={() => {
                            dragRef.current = "horizontal";
                        }}
                        className="h-1.5 shrink-0 cursor-row-resize bg-slate-200 hover:bg-violet-400/50 active:bg-violet-500/60 dark:bg-zinc-900 dark:hover:bg-indigo-600/40 dark:active:bg-indigo-600/60"
                    />

                    <div
                        className="flex min-h-0 flex-1 flex-col overflow-hidden"
                        style={{ minHeight: 220 }}
                    >
                        <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto">
                            {data}
                        </div>
                        {dataFooter}
                    </div>
                </div>
            </div>

            {/* Mobile: stacked */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:hidden">
                <div className="flex max-h-[42vh] min-h-[280px] shrink-0 flex-col overflow-hidden border-b border-slate-200 dark:border-zinc-800">
                    {chat}
                </div>
                <div className="flex min-h-[260px] shrink-0 flex-col border-b border-slate-200 dark:border-zinc-800">
                    {editor}
                </div>
                <div className="flex min-h-[220px] flex-col">
                    {data}
                    {dataFooter}
                </div>
            </div>
        </>
    );
}
