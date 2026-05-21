"use client";

type TabItem<T extends string> = { id: T; label: string; disabled?: boolean };

type Props<T extends string> = {
    tabs: TabItem<T>[];
    active: T;
    onChange: (id: T) => void;
};

export default function PanelTabs<T extends string>({ tabs, active, onChange }: Props<T>) {
    return (
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 px-2 py-2 dark:border-zinc-800">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    disabled={t.disabled}
                    onClick={() => onChange(t.id)}
                    className={`shrink-0 rounded-md px-2.5 py-1 text-xs transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        active === t.id
                            ? "bg-slate-200 text-slate-900 dark:bg-zinc-800 dark:text-white"
                            : "text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300"
                    }`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
