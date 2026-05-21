import { COCCOC_DE_ASSESSMENT_PROGRAM } from "@/lib/coccoc-de-assessment";

type Props = {
    className?: string;
};

export default function CoccocDeProgramOverview({ className = "" }: Props) {
    const p = COCCOC_DE_ASSESSMENT_PROGRAM;

    return (
        <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                    Your role
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                    {p.yourRole}
                </p>
            </div>
            <div className="rounded-xl border border-violet-200/80 bg-violet-50/50 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-violet-800 dark:text-indigo-300">
                    Your goal
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                    {p.yourGoal}
                </p>
            </div>
        </div>
    );
}
