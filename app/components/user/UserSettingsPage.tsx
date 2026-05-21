"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import UserAvatar from "@/app/components/user/UserAvatar";
import { mockUser } from "@/lib/mock-user";

export default function UserSettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-2xl px-4 py-8">
                <div className="flex items-center gap-3">
                    <UserAvatar size="md" />
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Cài đặt
                        </h1>
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                            Đây là bản mock giao diện cài đặt. Một số thay đổi chưa được lưu thật.
                        </p>
                    </div>
                </div>

                <div className="mt-8 space-y-8">
                    <SettingsSection title="Hồ sơ">
                        <MockField label="Tên hiển thị" value={mockUser.name} />
                        <MockField label="Mục tiêu nghề nghiệp" value={mockUser.roleGoal} />
                        <MockField label="Trình độ hiện tại" value={mockUser.currentLevel} />
                    </SettingsSection>

                    <SettingsSection title="Giao diện">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-zinc-400">
                                Theme: Sáng / Tối
                            </span>
                            <ThemeToggle />
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Mục tiêu học tập">
                        <MockField label="Mục tiêu học mỗi ngày" value="30 phút" />
                        <MockField label="Ngôn ngữ" value="Tiếng Việt" />
                    </SettingsSection>

                    <SettingsSection title="Thông báo">
                        <MockField label="Nhắc học hàng ngày" value="Bật (mock)" />
                        <MockField label="Thông báo task mô phỏng" value="Bật (mock)" />
                    </SettingsSection>

                    <SettingsSection title="Dữ liệu demo">
                        <p className="text-sm text-slate-600 dark:text-zinc-400">
                            ID học viên: {mockUser.id}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Dữ liệu tiến độ, bài nộp và badge là mock cố định cho demo.
                        </p>
                    </SettingsSection>
                </div>

                <Link
                    href="/profile"
                    className="mt-8 inline-flex items-center gap-1 text-sm text-violet-600 dark:text-indigo-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại hồ sơ
                </Link>
            </main>
        </div>
    );
}

function SettingsSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
            <div className="mt-4 space-y-3">{children}</div>
        </section>
    );
}

function MockField({ label, value }: { label: string; value: string }) {
    return (
        <label className="block">
            <span className="text-xs text-slate-500">{label}</span>
            <input
                readOnly
                value={value}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
        </label>
    );
}
