"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import UserAvatar from "@/app/components/user/UserAvatar";
import SkillProfileCard from "@/app/components/user/SkillProfileCard";
import BadgeGrid from "@/app/components/user/BadgeGrid";
import RecommendationCard from "@/app/components/user/RecommendationCard";
import ActivityTimeline from "@/app/components/user/ActivityTimeline";
import EditProfileModal from "@/app/components/user/EditProfileModal";
import Button from "@/app/components/ui/Button";
import { mockUser } from "@/lib/mock-user";
import { userLearningProgress } from "@/lib/user-learning-progress";
import { userSimulationProgress } from "@/lib/user-simulation-progress";
import { userBadges } from "@/lib/user-badges";
import { userRecommendations } from "@/lib/user-recommendations";
import { userSubmissions } from "@/lib/user-submissions";
import { recentActivities } from "@/lib/recent-activities";
import { getProfileSkills } from "@/lib/user-profile-helpers";
import { buildLearnUrl } from "@/lib/skill-navigation";

export default function UserProfilePage() {
    const [editOpen, setEditOpen] = useState(false);
    const skills = getProfileSkills();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-6xl px-4 py-8">
                <header className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                        <UserAvatar size="lg" />
                        <div className="flex-1">
                            <p className="text-sm text-violet-600 dark:text-indigo-400">
                                Hồ sơ học viên
                            </p>
                            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                                {mockUser.name}
                            </h1>
                            <p className="text-sm text-slate-500">{mockUser.email}</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                                {mockUser.headline}
                            </p>
                            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                                <div>
                                    <dt className="text-slate-500">Mục tiêu nghề nghiệp</dt>
                                    <dd className="font-medium text-slate-900 dark:text-white">
                                        {mockUser.roleGoal}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Trình độ hiện tại</dt>
                                    <dd className="font-medium">{mockUser.currentLevel}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Đã tham gia</dt>
                                    <dd>{mockUser.joinedAt}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Vị trí</dt>
                                    <dd>{mockUser.location}</dd>
                                </div>
                            </dl>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="secondary" onClick={() => setEditOpen(true)}>
                                    Chỉnh sửa hồ sơ
                                </Button>
                                <Link href="/learn">
                                    <Button variant="primary">Xem lộ trình đề xuất</Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="ghost">
                                        <ArrowLeft className="h-3.5 w-3.5" />
                                        Quay lại Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div
                    id="progress"
                    className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50 sm:grid-cols-2 lg:grid-cols-5"
                >
                    {[
                        { label: "Chủ đề đang học", value: userLearningProgress.activeTopics },
                        {
                            label: "Module đã hoàn thành",
                            value: userLearningProgress.completedModules,
                        },
                        {
                            label: "Bài tập đã làm",
                            value: userLearningProgress.completedPracticeTasks,
                        },
                        {
                            label: "Thời gian học",
                            value: `${userLearningProgress.totalLearningMinutes} phút`,
                        },
                        {
                            label: "Chuỗi ngày học",
                            value: `${userLearningProgress.currentStreak} ngày`,
                        },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-xs text-slate-500">{s.label}</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white">
                                {s.value}
                            </p>
                        </div>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-5 border-t border-slate-100 pt-3 dark:border-zinc-800">
                        <p className="text-xs text-slate-500">Mức sẵn sàng</p>
                        <p className="text-2xl font-bold text-violet-600 dark:text-indigo-400">
                            {userLearningProgress.readinessScore}%
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <section className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                Mục tiêu học tập
                            </h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                {mockUser.roleGoal} — {mockUser.currentLevel}
                            </p>
                        </section>

                        <section id="skills">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Hồ sơ kỹ năng
                            </h2>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {skills.map((s) => (
                                    <SkillProfileCard key={s.skillId} skill={s} />
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Tiến độ học tập
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {userLearningProgress.topics.map((t) => (
                                    <li
                                        key={t.topicId}
                                        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                                    >
                                        <div className="flex justify-between gap-2">
                                            <h3 className="font-medium text-slate-900 dark:text-white">
                                                {t.title}
                                            </h3>
                                            <span className="text-sm font-bold text-violet-600 dark:text-indigo-400">
                                                {t.progress}%
                                            </span>
                                        </div>
                                        <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800">
                                            <div
                                                className="h-full rounded-full bg-violet-500 dark:bg-indigo-500"
                                                style={{ width: `${t.progress}%` }}
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">
                                            {t.completedModules}/{t.totalModules} module ·{" "}
                                            {t.lastActivity}
                                        </p>
                                        {t.nextModuleId && (
                                            <Link
                                                href={buildLearnUrl(t.nextModuleId)}
                                                className="mt-2 inline-block text-sm text-violet-600 hover:underline dark:text-indigo-400"
                                            >
                                                Tiếp tục học →
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Mô phỏng công việc
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {userSimulationProgress.simulations.map((sim) => (
                                    <li
                                        key={sim.programId}
                                        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-medium text-slate-900 dark:text-white">
                                                    {sim.title}
                                                </h3>
                                                <p className="text-xs text-slate-500">
                                                    {sim.company}
                                                </p>
                                            </div>
                                            <span className="text-sm font-bold">
                                                {sim.progress}%
                                            </span>
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">
                                            {sim.completedTasks}/{sim.totalTasks} task ·{" "}
                                            {sim.lastActivity}
                                        </p>
                                        {sim.currentTaskTitle && (
                                            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
                                                Task hiện tại: {sim.currentTaskTitle}
                                            </p>
                                        )}
                                        <div className="mt-3 flex gap-2">
                                            {sim.status === "in_progress" && sim.href && (
                                                <Link
                                                    href={`${sim.href}?task=${sim.currentTaskId ?? ""}`}
                                                >
                                                    <Button variant="primary" size="sm">
                                                        Tiếp tục
                                                    </Button>
                                                </Link>
                                            )}
                                            {sim.href && (
                                                <Link href={sim.href}>
                                                    <Button variant="ghost" size="sm">
                                                        Xem chi tiết
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Bước tiếp theo nên làm
                            </h2>
                            <div className="mt-3 space-y-3">
                                {userRecommendations.map((rec) => (
                                    <RecommendationCard key={rec.id} rec={rec} compact />
                                ))}
                            </div>
                        </section>

                        <section id="badges">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Badge & chứng nhận
                            </h2>
                            <div className="mt-3">
                                <BadgeGrid badges={userBadges} showCertificate />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Hoạt động gần đây
                            </h2>
                            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                                <ActivityTimeline activities={recentActivities} />
                            </div>
                        </section>
                    </div>
                </div>

                <section className="mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Bài nộp gần đây
                        </h2>
                        <Link
                            href="/profile/submissions"
                            className="text-sm text-violet-600 hover:underline dark:text-indigo-400"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                    <ul className="mt-4 space-y-3">
                        {userSubmissions.slice(0, 2).map((sub) => (
                            <li
                                key={sub.id}
                                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                            >
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {sub.taskTitle}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {sub.company} · {sub.submittedAt} · Điểm {sub.score}
                                </p>
                                <pre className="mt-2 max-h-16 overflow-hidden rounded bg-slate-900 p-2 text-[10px] text-emerald-300">
                                    {sub.query}
                                </pre>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
        </div>
    );
}
