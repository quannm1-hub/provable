"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import UserDropdown from "@/app/components/user/UserDropdown";
import { vi } from "@/lib/vi";

const links = [
    { href: "/learn", label: vi.nav.learn },
    { href: "/internships", label: vi.nav.internships },
    { href: "/", label: vi.nav.dashboard },
];

export default function AppNav() {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white dark:bg-indigo-600">
                        P
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {vi.app.title}
                    </span>
                </Link>
                <nav className="flex items-center gap-1">
                    {links.map(({ href, label }) => {
                        const active =
                            href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`rounded-lg px-3 py-2 text-sm transition ${
                                    active
                                        ? "bg-violet-100 text-violet-700 dark:bg-indigo-600/20 dark:text-indigo-300"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                    <div className="ml-2 flex items-center gap-1">
                        <ThemeToggle />
                        <UserDropdown />
                    </div>
                </nav>
            </div>
        </header>
    );
}
