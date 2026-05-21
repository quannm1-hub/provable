"use client";

type Props = {
    title?: string;
    content: string;
    format?: "text" | "markdown";
};

export default function ReferenceAnswerBlock({
    title = "Đáp án tham khảo",
    content,
    format = "text",
}: Props) {
    return (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                {title}
            </h3>
            {format === "markdown" ? (
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-white/80 p-3 text-xs dark:bg-zinc-900">
                    {content}
                </pre>
            ) : (
                <p className="mt-3 whitespace-pre-wrap text-xs text-slate-700 dark:text-zinc-300">
                    {content}
                </p>
            )}
        </section>
    );
}
