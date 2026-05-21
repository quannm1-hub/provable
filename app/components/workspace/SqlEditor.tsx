import { Play, RotateCcw, Send } from "lucide-react";
import Button from "@/app/components/ui/Button";
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
    submitDisabled?: boolean;
    submitDisabledReason?: string;
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
    submitDisabled = false,
    submitDisabledReason,
}: Props) {
    const isSimulation = variant === "simulation";
    const isEmpty = sql.trim().length === 0;
    const runDisabled = isEmpty;
    const submitBlocked = isEmpty || submitDisabled;

    return (
        <div className="flex h-full flex-col bg-white dark:bg-zinc-950">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-zinc-800">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                    {vi.sql.editor}
                </span>
                <div className="flex flex-wrap gap-2">
                    {canShowHintButton && !hintVisible && (
                        <Button variant="ghost" onClick={onShowHint}>
                            {vi.sql.showHint}
                        </Button>
                    )}
                    <Button variant="ghost" onClick={onReset}>
                        <RotateCcw className="h-3 w-3" />
                        {vi.sql.reset}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onRun}
                        disabled={runDisabled}
                        title={runDisabled ? vi.sql.emptyEditor : undefined}
                    >
                        <Play className="h-3 w-3" />
                        {isSimulation ? vi.sql.runTrial : vi.sql.run}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onSubmit}
                        disabled={submitBlocked}
                        title={
                            isEmpty
                                ? vi.sql.emptyEditor
                                : submitDisabledReason ?? undefined
                        }
                    >
                        <Send className="h-3 w-3" />
                        {isSimulation ? vi.sql.submitTask : vi.sql.submit}
                    </Button>
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
