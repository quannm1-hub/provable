"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { vi } from "@/lib/vi";

export default function ThemeToggle({ compact }: { compact?: boolean }) {
    const { theme, toggleTheme } = useTheme();
    const label = theme === "dark" ? vi.nav.lightMode : vi.nav.darkMode;

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 ${
                compact ? "px-2 py-1.5" : "px-3 py-2"
            }`}
            aria-label={label}
        >
            {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
                <Moon className="h-3.5 w-3.5 text-violet-600" />
            )}
            {!compact && label}
        </button>
    );
}
