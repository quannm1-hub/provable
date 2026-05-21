"use client";

import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Briefcase,
    FileText,
    Flame,
    Target,
} from "lucide-react";
import UserAvatar from "@/app/components/user/UserAvatar";
import RecommendationCard from "@/app/components/user/RecommendationCard";
import ActivityTimeline from "@/app/components/user/ActivityTimeline";
import { getFirstName, mockUser } from "@/lib/mock-user";
import { userLearningProgress } from "@/lib/user-learning-progress";
import { userSimulationProgress } from "@/lib/user-simulation-progress";
import { userRecommendations } from "@/lib/user-recommendations";
import { recentActivities } from "@/lib/recent-activities";
import { buildLearnUrl } from "@/lib/skill-navigation";

const activeSim = userSimulationProgress.simulations.find(
    (s) => s.status === "in_progress",
);
const activeTopic = userLearningProgress.topics.find((t) => t.status === "in_progress");

export default function DashboardWelcome() {
    const firstName = getFirstName(mockUser.name);
    return (
        <section className="mt-8">
            <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50/30 p-6 dark:border-indigo-800/40 dark:from-indigo-950/40 dark:via-zinc-900/50 dark:to-zinc-950">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <UserAvatar size="md" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Chào {firstName}, hôm nay bạn muốn học hay thực hành mô phỏng?
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                {mockUser.headline}
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/profile"
                        className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline dark:text-indigo-300"
                    >
                        Hồ sơ học viên
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <StatChip
                        icon={Flame}
                        label="Chuỗi ngày học"
                        value={`${userLearningProgress.currentStreak} ngày`}
                    />
                    <StatChip
                        icon={Target}
                        label="Mức sẵn sàng"
                        value={`${userLearningProgress.readinessScore}%`}
                    />
                    <StatChip
                        icon={BookOpen}
                        label="Chủ đề hiện tại"
                        value={activeTopic?.title ?? "—"}
                    />
                    <StatChip
                        icon={Briefcase}
                        label="Mô phỏng"
                        value={activeSim?.company ?? "—"}
                    />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {activeTopic?.nextModuleId && (
                        <QuickCard
                            href={buildLearnUrl(activeTopic.nextModuleId)}
                            title="Tiếp tục SQL cơ bản"
                            subtitle={activeTopic.nextModuleTitle ?? activeTopic.title}
                        />
                    )}
                    {activeSim?.href && (
                        <QuickCard
                            href={`${activeSim.href}?task=${activeSim.currentTaskId ?? ""}`}
                            title="Tiếp tục mô phỏng Cốc Cốc"
                            subtitle={activeSim.currentTaskTitle ?? activeSim.title}
                        />
                    )}
                    <QuickCard
                        href="/profile#skills"
                        title="Ôn kỹ năng còn yếu"
                        subtitle="AND / OR · UPDATE an toàn"
                    />
                    <QuickCard
                        href="/profile/submissions"
                        title="Xem bài nộp gần đây"
                        subtitle="3 bài nộp gần nhất"
                        icon={FileText}
                    />
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Gợi ý dành cho bạn
                    </h3>
                    <div className="mt-3 space-y-3">
                        {userRecommendations.map((rec) => (
                            <RecommendationCard key={rec.id} rec={rec} compact />
                        ))}
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Hoạt động gần đây
                    </h3>
                    <div className="mt-3">
                        <ActivityTimeline activities={recentActivities} limit={4} compact />
                    </div>
                    <Link
                        href="/profile"
                        className="mt-3 inline-block text-xs text-violet-600 hover:underline dark:text-indigo-400"
                    >
                        Xem hồ sơ đầy đủ →
                    </Link>
                </div>
            </div>
        </section>
    );
}

function StatChip({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Flame;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 dark:border-zinc-700/50 dark:bg-zinc-900/60">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-500">
                <Icon className="h-3.5 w-3.5" />
                {label}
            </div>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-white">
                {value}
            </p>
        </div>
    );
}

function QuickCard({
    href,
    title,
    subtitle,
    icon: Icon = ArrowRight,
}: {
    href: string;
    title: string;
    subtitle: string;
    icon?: typeof ArrowRight;
}) {
    return (
        <Link
            href={href}
            className="group rounded-xl border border-slate-200 bg-white p-3 transition hover:border-violet-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:hover:border-indigo-700"
        >
            <p className="text-sm font-medium text-slate-900 group-hover:text-violet-700 dark:text-white dark:group-hover:text-indigo-300">
                {title}
            </p>
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-zinc-500">
                {subtitle}
            </p>
            <Icon className="mt-2 h-4 w-4 text-violet-500 opacity-0 transition group-hover:opacity-100 dark:text-indigo-400" />
        </Link>
    );
}
