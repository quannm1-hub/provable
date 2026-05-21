import { Play, RotateCcw, Send } from "lucide-react";
import { vi } from "@/lib/vi";

type Props = {
    sql: string;
    onChange: (v: string) => void;
    onRun: () => void;
    onSubmit: () => void;
    onReset: () => void;
    onShowHint: () => void;
    hintVisible: boolean;
    canShowHintButton: boolean;
    variant?: "learning" | "simulation";
};

export default function SqlEditor({
    sql,
    onChange,
    onRun,
    onSubmit,
    onReset,
    onShowHint,
    hintVisible,
    canShowHintButton,
    variant = "learning",
}: Props) {
    const isSimulation = variant === "simulation";
    return (
        <div className="flex h-full flex-col bg-white dark:bg-zinc-950">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-zinc-800">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                    {vi.sql.editor}
                </span>
                <div className="flex flex-wrap gap-2">
                    {canShowHintButton && !hintVisible && (
                        <button
                            type="button"
                            onClick={onShowHint}
                            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
                        >
                            {vi.sql.showHint}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    >
                        <RotateCcw className="h-3 w-3" />
                        {vi.sql.reset}
                    </button>
                    <button
                        type="button"
                        onClick={onRun}
                        className="flex items-center gap-1 rounded-md border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-800 hover:bg-slate-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                        <Play className="h-3 w-3" />
                        {isSimulation ? vi.sql.runTrial : vi.sql.run}
                    </button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="flex items-center gap-1 rounded-md bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    >
                        <Send className="h-3 w-3" />
                        {isSimulation ? vi.sql.submitTask : vi.sql.submit}
                    </button>
                </div>
            </div>
            <textarea
                value={sql}
                onChange={(e) => onChange(e.target.value)}
                spellCheck={false}
                className="min-h-[280px] flex-1 resize-none bg-slate-50 p-4 font-mono text-sm leading-relaxed text-emerald-800 focus:outline-none dark:bg-zinc-950 dark:text-emerald-300"
                placeholder={vi.sql.placeholder}
            />
        </div>
    );
}
