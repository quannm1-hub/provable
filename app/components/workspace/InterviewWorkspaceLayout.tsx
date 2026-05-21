"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
    editor: ReactNode;
    data: ReactNode;
    dataFooter?: ReactNode;
};

const EDITOR_MIN = 35;
const EDITOR_MAX = 70;

/** Task workspace + data panel only (no mentor chat). Used for interview simulations. */
export default function InterviewWorkspaceLayout({ editor, data, dataFooter }: Props) {
    const [editorHeightPct, setEditorHeightPct] = useState(52);
    const dragging = useRef(false);
    const rightRef = useRef<HTMLDivElement>(null);

    const onMove = useCallback((e: MouseEvent) => {
        if (!dragging.current || !rightRef.current) return;
        const rect = rightRef.current.getBoundingClientRect();
        const pct = ((e.clientY - rect.top) / rect.height) * 100;
        setEditorHeightPct(Math.min(EDITOR_MAX, Math.max(EDITOR_MIN, pct)));
    }, []);

    const onUp = useCallback(() => {
        dragging.current = false;
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
        <div
            ref={rightRef}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
            style={{ userSelect: dragging.current ? "none" : undefined }}
        >
            <div
                className="flex min-h-0 flex-col overflow-hidden"
                style={{ height: `${editorHeightPct}%`, minHeight: 280 }}
            >
                {editor}
            </div>

            <div
                role="separator"
                aria-orientation="horizontal"
                onMouseDown={() => {
                    dragging.current = true;
                }}
                className="h-1.5 shrink-0 cursor-row-resize bg-slate-200 hover:bg-violet-400/50 active:bg-violet-500/60 dark:bg-zinc-900 dark:hover:bg-indigo-600/40 dark:active:bg-indigo-600/60"
            />

            <div
                className="flex min-h-0 flex-1 flex-col overflow-hidden"
                style={{ minHeight: 240 }}
            >
                <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto">{data}</div>
                {dataFooter ? (
                    <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950">
                        {dataFooter}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
