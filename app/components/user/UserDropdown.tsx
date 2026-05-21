"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    Award,
    FileText,
    LogOut,
    Settings,
    TrendingUp,
    User,
} from "lucide-react";
import UserAvatar from "@/app/components/user/UserAvatar";
import { mockUser } from "@/lib/mock-user";

const items = [
    { href: "/profile", label: "Hồ sơ của tôi", icon: User },
    { href: "/profile#progress", label: "Tiến độ học tập", icon: TrendingUp },
    { href: "/profile/submissions", label: "Bài nộp của tôi", icon: FileText },
    { href: "/profile#badges", label: "Chứng chỉ & badge", icon: Award },
    { href: "/profile/settings", label: "Cài đặt", icon: Settings },
] as const;

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const [logoutMsg, setLogoutMsg] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
        <div className="relative ml-2" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="rounded-full ring-2 ring-transparent transition hover:ring-violet-200 focus:outline-none focus:ring-violet-400 dark:hover:ring-indigo-800 dark:focus:ring-indigo-600"
                aria-expanded={open}
                aria-haspopup="menu"
                aria-label="Menu người dùng"
            >
                <UserAvatar size="sm" />
            </button>
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-[60] mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                >
                    <div className="border-b border-slate-100 px-3 py-2 dark:border-zinc-800">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                            {mockUser.name}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-zinc-500">
                            {mockUser.email}
                        </p>
                    </div>
                    {items.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            <Icon className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
                            {label}
                        </Link>
                    ))}
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            setOpen(false);
                            setLogoutMsg(true);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:text-zinc-500 dark:hover:bg-zinc-800"
                    >
                        <LogOut className="h-4 w-4" />
                        Đăng xuất
                    </button>
                </div>
            )}
            {logoutMsg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
                    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                        <p className="text-sm text-slate-700 dark:text-zinc-300">
                            Tính năng đăng xuất sẽ có trong phiên bản tiếp theo.
                        </p>
                        <button
                            type="button"
                            className="mt-4 w-full rounded-lg bg-violet-600 px-3 py-2 text-sm text-white dark:bg-indigo-600"
                            onClick={() => setLogoutMsg(false)}
                        >
                            Đã hiểu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
