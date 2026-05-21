"use client";

import { CheckCircle2, Clock } from "lucide-react";

export type ForageSidebarTask = {
    step: number;
    title: string;
    summary: string;
    /** e.g. "45–90 phút" */
    duration?: string;
    /** Task chưa mở — hiển thị mờ, không click được */
    disabled?: boolean;
    disabledReason?: string;
};

type Props = {
    tasks: ForageSidebarTask[];
    activeStep: number;
    onTaskSelect?: (step: number) => void;
    /** Steps đã hoàn thành (hiển thị check) */
    completedSteps?: number[];
};

function DifficultyDots({ muted = false }: { muted?: boolean }) {
    return (
        <span className="flex items-center gap-1" aria-hidden>
            {[1, 2, 3].map((i) => (
                <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                        muted
                            ? "bg-slate-300 dark:bg-zinc-600"
                            : i <= 2
                              ? "bg-emerald-500 dark:bg-emerald-400"
                              : "bg-slate-300 dark:bg-zinc-600"
                    }`}
                />
            ))}
        </span>
    );
}

type RowProps = {
    task: ForageSidebarTask;
    active: boolean;
    done: boolean;
    disabled: boolean;
    isLast: boolean;
    onSelect?: () => void;
};

function TaskRow({ task, active, done, disabled, isLast, onSelect }: RowProps) {
    const selected = active && !disabled;

    const circle = (
        <span
            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                disabled
                    ? "border-2 border-slate-200 bg-slate-100 text-slate-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                    : done
                      ? "bg-emerald-500 text-white shadow-sm"
                      : selected
                        ? "bg-emerald-600 text-white shadow-md ring-4 ring-emerald-100 dark:ring-emerald-900/50"
                        : "border-2 border-emerald-500/70 bg-transparent text-emerald-600 dark:border-emerald-500 dark:text-emerald-400"
            }`}
        >
            {done ? <CheckCircle2 className="h-4 w-4" /> : task.step}
        </span>
    );

    const body = (
        <>
            <div className="flex flex-wrap items-center gap-2">
                <h3
                    className={`text-sm font-semibold leading-snug ${
                        disabled
                            ? "text-slate-400 dark:text-zinc-500"
                            : selected
                              ? "text-emerald-900 dark:text-emerald-100"
                              : "text-slate-600 dark:text-zinc-400"
                    }`}
                >
                    {task.title}
                </h3>
                {disabled && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-zinc-800 dark:text-zinc-500">
                        {task.disabledReason ?? "Chưa hỗ trợ"}
                    </span>
                )}
            </div>
            <p
                className={`mt-1.5 text-xs leading-relaxed ${
                    disabled
                        ? "text-slate-400/90 dark:text-zinc-600"
                        : selected
                          ? "text-slate-600 dark:text-zinc-300"
                          : "text-slate-500 dark:text-zinc-500"
                }`}
            >
                {task.summary}
            </p>
            <div
                className={`mt-2.5 flex flex-wrap items-center gap-3 text-[11px] ${
                    disabled
                        ? "text-slate-400 dark:text-zinc-600"
                        : "text-slate-400 dark:text-zinc-500"
                }`}
            >
                <DifficultyDots muted={disabled} />
                {task.duration && (
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        {task.duration}
                    </span>
                )}
            </div>
        </>
    );

    const rowInner = (
        <div className="flex gap-3">
            <div className="flex w-8 shrink-0 flex-col items-center">
                <div
                    aria-current={selected ? "step" : undefined}
                    aria-disabled={disabled || undefined}
                >
                    {circle}
                </div>
                {!isLast && (
                    <div
                        className={`mt-1 w-0.5 min-h-[4.5rem] flex-1 rounded-full ${
                            disabled
                                ? "bg-slate-200 dark:bg-zinc-800"
                                : done || selected
                                  ? "bg-emerald-500 dark:bg-emerald-600"
                                  : "bg-slate-200 dark:bg-zinc-700"
                        }`}
                        aria-hidden
                    />
                )}
            </div>
            <div className={`min-w-0 flex-1 ${isLast ? "pb-2" : "pb-6"}`}>{body}</div>
        </div>
    );

    return (
        <div
            className={`relative rounded-xl transition-all ${
                selected
                    ? "-mx-2 border border-emerald-200/90 bg-emerald-50/90 px-3 py-3 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/50"
                    : disabled
                      ? "mx-0 cursor-not-allowed opacity-60"
                      : "mx-0 px-0 py-1"
            } ${isLast ? "" : "mb-2"}`}
        >
            {onSelect && !disabled ? (
                <button
                    type="button"
                    onClick={onSelect}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-xl"
                >
                    {rowInner}
                </button>
            ) : (
                rowInner
            )}
        </div>
    );
}

export default function CoccocDeForageTaskSidebar({
    tasks,
    activeStep,
    onTaskSelect,
    completedSteps = [],
}: Props) {
    const activeTask = tasks.find((t) => t.step === activeStep) ?? tasks[0];

    return (
        <>
            {/* Mobile */}
            <nav
                className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 lg:hidden"
                aria-label="Nhiệm vụ"
            >
                {activeTask && (
                    <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50/90 px-3 py-2.5 dark:border-emerald-800/60 dark:bg-emerald-950/40">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white ring-4 ring-emerald-100 dark:ring-emerald-900/50">
                            {activeTask.step}
                        </span>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                                {activeTask.title}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-xs text-slate-600 dark:text-zinc-400">
                                {activeTask.summary}
                            </p>
                        </div>
                    </div>
                )}
            </nav>

            {/* Desktop — cột trái kiểu Forage (~25% chiều rộng) */}
            <aside
                className="hidden h-full w-[280px] shrink-0 flex-col border-r border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:flex xl:w-[300px]"
                aria-label="Nhiệm vụ"
            >
                <div className="scrollbar-none flex-1 overflow-y-auto px-5 py-6">
                    {tasks.map((task, index) => {
                        const isLast = index === tasks.length - 1;
                        const active = task.step === activeStep;
                        const done = completedSteps.includes(task.step);
                        const disabled = Boolean(task.disabled);

                        return (
                            <TaskRow
                                key={task.step}
                                task={task}
                                active={active}
                                done={done}
                                disabled={disabled}
                                isLast={isLast}
                                onSelect={
                                    onTaskSelect && !disabled
                                        ? () => onTaskSelect(task.step)
                                        : undefined
                                }
                            />
                        );
                    })}
                </div>
            </aside>
        </>
    );
}
