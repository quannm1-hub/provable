import type { RecentActivity } from "@/lib/recent-activities";
import {
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
} from "lucide-react";

const iconFor: Record<RecentActivity["type"], typeof BookOpen> = {
    lesson_completed: BookOpen,
    practice_completed: CheckCircle2,
    simulation_task_submitted: Briefcase,
    badge_earned: Award,
    simulation_started: Briefcase,
};

type Props = {
    activities: RecentActivity[];
    limit?: number;
    compact?: boolean;
};

export default function ActivityTimeline({ activities, limit, compact }: Props) {
    const list = limit ? activities.slice(0, limit) : activities;
    return (
        <ul className={compact ? "space-y-2" : "space-y-3"}>
            {list.map((a) => {
                const Icon = iconFor[a.type] ?? BookOpen;
                return (
                    <li key={a.id} className="flex gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                            <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p
                                className={`text-slate-800 dark:text-zinc-200 ${compact ? "text-xs" : "text-sm"}`}
                            >
                                {a.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-zinc-500">{a.time}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
