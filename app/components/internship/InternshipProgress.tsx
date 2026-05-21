import { Check } from "lucide-react";
import { PROGRESS_STEPS } from "@/lib/internship";

type Props = {
    currentStep: number;
    completedThrough: number;
};

export default function InternshipProgress({ currentStep, completedThrough }: Props) {
    return (
        <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950">
            {PROGRESS_STEPS.map((label, i) => {
                const done = i < completedThrough;
                const active = i === currentStep;
                return (
                    <div
                        key={label}
                        className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                            done
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                : active
                                  ? "bg-violet-100 text-violet-700 ring-1 ring-violet-300 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-700"
                                  : "text-slate-400 dark:text-zinc-600"
                        }`}
                    >
                        {done && <Check className="h-3 w-3" />}
                        <span>{label}</span>
                    </div>
                );
            })}
        </div>
    );
}
