type Props = {
    title: string;
    description?: string;
};

export default function EmptyState({ title, description }: Props) {
    return (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
            <p className="text-xs font-medium text-slate-700 dark:text-zinc-300">{title}</p>
            {description && (
                <p className="mt-1 text-[11px] text-slate-500 dark:text-zinc-500">{description}</p>
            )}
        </div>
    );
}
