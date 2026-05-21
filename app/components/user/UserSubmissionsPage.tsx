"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import Button from "@/app/components/ui/Button";
import SubmissionDetailModal from "@/app/components/user/SubmissionDetailModal";
import UserAvatar from "@/app/components/user/UserAvatar";
import {
    userSubmissions,
    type SubmissionStatus,
    type UserSubmission,
} from "@/lib/user-submissions";
import { buildLearnUrl } from "@/lib/skill-navigation";
import { getLearnModuleForSkill, type SkillId } from "@/lib/sql-skill-map";

type Filter = "all" | SubmissionStatus | "coccoc" | "novatech";

const skillToId: Record<string, SkillId | undefined> = {
    SELECT: "sql-select",
    WHERE: "sql-where",
    "AND / OR": "sql-and-or",
    "UPDATE an toàn": "sql-update",
};

export default function UserSubmissionsPage() {
    const [filter, setFilter] = useState<Filter>("all");
    const [detail, setDetail] = useState<UserSubmission | null>(null);

    const filtered = useMemo(() => {
        return userSubmissions.filter((s) => {
            if (filter === "all") return true;
            if (filter === "coccoc") return s.company.includes("Cốc Cốc");
            if (filter === "novatech") return s.company.includes("NovaTech");
            return s.status === filter;
        });
    }, [filter]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-4xl px-4 py-8">
                <div className="flex items-center gap-3">
                    <UserAvatar size="md" />
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Bài nộp của tôi
                        </h1>
                        <p className="text-sm text-slate-500">
                            Lịch sử nộp task trong mô phỏng (mock)
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {(
                        [
                            ["all", "Tất cả"],
                            ["passed", "Đạt"],
                            ["needs_review", "Cần xem lại"],
                            ["coccoc", "Cốc Cốc"],
                            ["novatech", "NovaTech"],
                        ] as const
                    ).map(([id, label]) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setFilter(id)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                filter === id
                                    ? "bg-violet-600 text-white dark:bg-indigo-600"
                                    : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <ul className="mt-6 space-y-4">
                    {filtered.map((sub) => (
                        <li
                            key={sub.id}
                            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        {sub.taskTitle}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {sub.company} · {sub.submittedAt}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                        sub.status === "passed"
                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                                    }`}
                                >
                                    {sub.status === "passed" ? "Đạt" : "Cần xem lại"} ·{" "}
                                    {sub.score}
                                </span>
                            </div>
                            {sub.type === "document" ? (
                                <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs dark:bg-zinc-800">
                                    📄 {sub.fileName} · Độ trùng khớp {sub.score}%
                                </p>
                            ) : (
                                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                                    {sub.query}
                                </pre>
                            )}
                            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 line-clamp-2">
                                {sub.feedback}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setDetail(sub)}
                                >
                                    Xem chi tiết
                                </Button>
                                {(() => {
                                    const sid = sub.skills[0]
                                        ? skillToId[sub.skills[0]]
                                        : undefined;
                                    const mod = sid ? getLearnModuleForSkill(sid) : undefined;
                                    if (!mod) return null;
                                    return (
                                    <Link href={buildLearnUrl(mod.id)}>
                                        <Button variant="secondary" size="sm">
                                            Ôn kỹ năng liên quan
                                        </Button>
                                    </Link>
                                    );
                                })()}
                                <Link
                                    href={
                                        sub.programId === "novatech-pm-interview"
                                            ? "/internships/novatech-pm"
                                            : `/internships/coccoc?task=${sub.taskId}`
                                    }
                                >
                                    <Button variant="ghost" size="sm">
                                        Làm lại task
                                    </Button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

                <Link
                    href="/profile"
                    className="mt-8 inline-flex items-center gap-1 text-sm text-violet-600 dark:text-indigo-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại hồ sơ
                </Link>
            </main>
            <SubmissionDetailModal submission={detail} onClose={() => setDetail(null)} />
        </div>
    );
}
