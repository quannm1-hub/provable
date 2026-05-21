"use client";

import { useState } from "react";
import { Award, Briefcase, Database, Shield } from "lucide-react";
import type { UserBadge } from "@/lib/user-badges";
import { userCertificate } from "@/lib/user-badges";
import { mockUser } from "@/lib/mock-user";
import UserAvatar from "@/app/components/user/UserAvatar";
import Button from "@/app/components/ui/Button";

const iconMap = {
    database: Database,
    shield: Shield,
    briefcase: Briefcase,
    award: Award,
};

type Props = {
    badges: UserBadge[];
    showCertificate?: boolean;
};

export default function BadgeGrid({ badges, showCertificate }: Props) {
    const [downloadMsg, setDownloadMsg] = useState(false);

    return (
        <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {badges.map((b) => {
                    const Icon = iconMap[b.icon ?? "award"];
                    const earned = b.status === "earned";
                    const locked = b.status === "locked";
                    return (
                        <div
                            key={b.id}
                            className={`rounded-xl border p-4 ${
                                earned
                                    ? "border-violet-200 bg-gradient-to-br from-violet-50 to-white dark:border-indigo-800/50 dark:from-indigo-950/40 dark:to-zinc-900/50"
                                    : locked
                                      ? "border-slate-200 bg-slate-50 opacity-75 dark:border-zinc-800 dark:bg-zinc-900/30"
                                      : "border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
                            }`}
                        >
                            <Icon
                                className={`h-8 w-8 ${earned ? "text-violet-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-600"}`}
                            />
                            <h4 className="mt-2 font-semibold text-slate-900 dark:text-white">
                                {b.title}
                            </h4>
                            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
                                {b.description}
                            </p>
                            {b.status === "in_progress" && b.progress != null && (
                                <div className="mt-3">
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>Đang tiến hành</span>
                                        <span>{b.progress}%</span>
                                    </div>
                                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                                        <div
                                            className="h-full rounded-full bg-amber-500"
                                            style={{ width: `${b.progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                            {b.earnedAt && (
                                <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                                    Nhận: {b.earnedAt}
                                </p>
                            )}
                            {locked && b.progress != null && (
                                <p className="mt-2 text-xs text-slate-500">
                                    Tiến độ mở khóa: {b.progress}%
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            {showCertificate && (
                <div className="rounded-2xl border-2 border-dashed border-violet-300 bg-gradient-to-br from-violet-50 via-white to-amber-50/50 p-6 dark:border-indigo-700 dark:from-indigo-950/30 dark:via-zinc-900 dark:to-amber-950/20">
                    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
                        <UserAvatar size="lg" />
                        <div className="flex-1">
                            <p className="text-xs uppercase tracking-wider text-violet-600 dark:text-indigo-400">
                                Chứng nhận mô phỏng
                            </p>
                            <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                {mockUser.name}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                {userCertificate.programTitle}
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                                Kỹ năng: {userCertificate.skills.join(" · ")}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Trạng thái:{" "}
                                {userCertificate.status === "completed"
                                    ? userCertificate.completionDate
                                    : "Đang hoàn thành mô phỏng"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <Button variant="secondary" size="sm" disabled>
                            Xem chứng nhận (sau khi hoàn thành)
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDownloadMsg(true)}
                        >
                            Tải xuống
                        </Button>
                    </div>
                </div>
            )}
            {downloadMsg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
                    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
                        <p className="text-sm text-slate-700 dark:text-zinc-300">
                            Tính năng tải chứng nhận đang được mock.
                        </p>
                        <button
                            type="button"
                            className="mt-4 w-full rounded-lg bg-violet-600 px-3 py-2 text-sm text-white"
                            onClick={() => setDownloadMsg(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
