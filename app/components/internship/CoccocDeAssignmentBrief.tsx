import { ExternalLink } from "lucide-react";
import {
    COCCOC_DE_ASSIGNMENT,
    COCCOC_DE_GITHUB_URL,
} from "@/lib/coccoc-de-assessment";

type Props = {
    compact?: boolean;
};

export default function CoccocDeAssignmentBrief({ compact = false }: Props) {
    const a = COCCOC_DE_ASSIGNMENT;

    return (
        <section
            className={
                compact
                    ? ""
                    : "rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
            }
        >
            <h2 className={compact ? "text-base font-bold" : "text-lg font-bold"}>Đề bài</h2>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                {a.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {a.intro}
            </p>

            <a
                href={COCCOC_DE_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
                <ExternalLink className="h-4 w-4 shrink-0" />
                eng-intern-assessment-data (GitHub)
            </a>

            <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Dataset
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">{a.dataset}</p>
            </div>

            <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Hướng dẫn làm bài
                </h3>
                <ol className="mt-2 list-inside list-decimal space-y-1.5 text-sm text-slate-600 dark:text-zinc-400">
                    {a.steps.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </div>

            <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Lưu ý
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-zinc-400">
                    {a.notes.map((note) => (
                        <li key={note}>{note}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
