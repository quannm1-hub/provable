"use client";

import { X } from "lucide-react";
import { mockUser } from "@/lib/mock-user";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function EditProfileModal({ open, onClose }: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Chỉnh sửa hồ sơ
                    </h2>
                    <button type="button" onClick={onClose} aria-label="Đóng">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>
                <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                    Tính năng chỉnh sửa hồ sơ sẽ có trong phiên bản tiếp theo.
                </p>
                <div className="mt-4 space-y-3">
                    {[
                        { label: "Tên hiển thị", value: mockUser.name },
                        { label: "Mục tiêu nghề nghiệp", value: mockUser.roleGoal },
                        { label: "Trình độ hiện tại", value: mockUser.currentLevel },
                        { label: "Ngôn ngữ", value: "Tiếng Việt" },
                        { label: "Theme", value: mockUser.themePreference },
                    ].map((f) => (
                        <label key={f.label} className="block">
                            <span className="text-xs text-slate-500 dark:text-zinc-500">
                                {f.label}
                            </span>
                            <input
                                readOnly
                                value={f.value}
                                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                            />
                        </label>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full rounded-lg bg-violet-600 py-2 text-sm text-white dark:bg-indigo-600"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}
