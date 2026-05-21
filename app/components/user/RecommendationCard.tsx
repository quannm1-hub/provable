"use client";

import { ArrowRight } from "lucide-react";
import type { UserRecommendation } from "@/lib/user-recommendations";
import { navigateRecommendation } from "@/lib/user-recommendations";

type Props = {
    rec: UserRecommendation;
    compact?: boolean;
};

const priorityRing: Record<UserRecommendation["priority"], string> = {
    high: "border-l-4 border-l-amber-500",
    medium: "border-l-4 border-l-violet-500 dark:border-l-indigo-500",
    low: "border-l-4 border-l-slate-300 dark:border-l-zinc-600",
};

export default function RecommendationCard({ rec, compact }: Props) {
    return (
        <div
            className={`rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 ${priorityRing[rec.priority]}`}
        >
            <h4
                className={`font-semibold text-slate-900 dark:text-white ${compact ? "text-sm" : ""}`}
            >
                {rec.title}
            </h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">{rec.description}</p>
            <button
                type="button"
                onClick={() => navigateRecommendation(rec)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
                {rec.actionLabel}
                <ArrowRight className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
