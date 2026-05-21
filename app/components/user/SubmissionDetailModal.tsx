"use client";

import { X } from "lucide-react";
import Link from "next/link";
import type { UserSubmission } from "@/lib/user-submissions";
import { buildLearnUrl } from "@/lib/skill-navigation";
import { getLearnModuleForSkill, type SkillId } from "@/lib/sql-skill-map";

const skillToId: Record<string, SkillId | undefined> = {
    SELECT: "sql-select",
    WHERE: "sql-where",
    "AND / OR": "sql-and-or",
    "UPDATE an toàn": "sql-update",
    "DELETE an toàn": "sql-delete",
};

type Props = {
    submission: UserSubmission | null;
    onClose: () => void;
};

export default function SubmissionDetailModal({ submission, onClose }: Props) {
    if (!submission) return null;
    const statusLabel =
        submission.status === "passed"
            ? "Đạt"
            : submission.status === "needs_review"
              ? "Cần xem lại"
              : "Chưa đạt";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs text-slate-500">{submission.company}</p>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {submission.taskTitle}
                        </h2>
                        <p className="text-xs text-slate-500">{submission.submittedAt}</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Đóng">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                        {statusLabel}
                    </span>
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800 dark:bg-indigo-950/50 dark:text-indigo-300">
                        Điểm: {submission.score}
                    </span>
                    {submission.skills.map((s) => (
                        <span
                            key={s}
                            className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                        >
                            {s}
                        </span>
                    ))}
                </div>
                <div className="mt-4 space-y-3">
                    <div>
                        <p className="text-xs font-medium text-slate-500">Truy vấn đã nộp</p>
                        <pre className="mt-1 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                            {submission.query}
                        </pre>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">Đáp án mẫu</p>
                        <pre className="mt-1 overflow-x-auto rounded-lg bg-slate-800 p-3 text-xs text-slate-200">
                            {submission.modelAnswer}
                        </pre>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                        <p className="text-xs font-medium">Phản hồi mentor</p>
                        <p className="mt-1">{submission.feedback}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-xs font-medium text-slate-500">Module học liên quan</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                        {submission.skills.map((label) => {
                            const sid = skillToId[label];
                            const mod = sid ? getLearnModuleForSkill(sid) : undefined;
                            if (!mod) return null;
                            return (
                                <Link
                                    key={label}
                                    href={buildLearnUrl(mod.id)}
                                    className="text-sm text-violet-600 hover:underline dark:text-indigo-400"
                                >
                                    {mod.title}
                                </Link>
                            );
                        })}
                    </ul>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full rounded-lg border border-slate-200 py-2 text-sm dark:border-zinc-700"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}
