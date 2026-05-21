import Link from "next/link";
import { Shield } from "lucide-react";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import { vi } from "@/lib/vi";

type Props = {
    moduleLabel: string;
    readiness: number;
};

export default function TopBar({ moduleLabel, readiness }: Props) {
    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white dark:bg-indigo-600">
                        P
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {vi.app.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-zinc-500">
                            {vi.learn.coachSubtitle}
                        </p>
                    </div>
                </Link>
            </div>
            <p className="hidden text-sm text-slate-700 dark:text-zinc-300 sm:block">{moduleLabel}</p>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-zinc-500">{vi.learn.readiness}</p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {readiness}%
                    </p>
                </div>
                <div className="h-8 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 transition-all dark:from-indigo-600 dark:to-emerald-500"
                        style={{ width: `${readiness}%` }}
                    />
                </div>
                <Shield className="h-5 w-5 text-violet-500 dark:text-indigo-400" />
                <ThemeToggle compact />
            </div>
        </header>
    );
}
