"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import type { LearningTopic } from "@/lib/catalog";
import { topicBadge } from "@/lib/catalog";
import { vi } from "@/lib/vi";

type Props = {
    topic: LearningTopic;
    onPreview: (topic: LearningTopic) => void;
};

export default function TopicCard({ topic, onPreview }: Props) {
    const locked = topic.status !== "available";
    const badge = topicBadge(topic.status);

    return (
        <article
            className={`rounded-2xl border p-6 transition ${
                topic.status === "available"
                    ? "border-violet-200 bg-white dark:border-indigo-800/50 dark:bg-zinc-900/50"
                    : "border-slate-200 bg-slate-50/80 dark:border-zinc-800 dark:bg-zinc-900/30"
            } ${locked ? "opacity-90" : ""}`}
        >
            <div className="flex items-start justify-between gap-2">
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        topic.status === "available"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : topic.status === "locked"
                              ? "bg-slate-200 text-slate-500 dark:bg-zinc-800 dark:text-zinc-500"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                    }`}
                >
                    {badge}
                </span>
                {locked && <Lock className="h-4 w-4 text-slate-400 dark:text-zinc-600" />}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {topic.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">{topic.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
                {topic.tags.map((t) => (
                    <span
                        key={t}
                        className="rounded border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 dark:border-zinc-700 dark:text-zinc-400"
                    >
                        {t}
                    </span>
                ))}
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-zinc-500">
                {topic.difficulty} · {topic.estimatedTime} · {topic.moduleCount} phần
            </p>

            {topic.status === "available" && (
                <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Tiến độ</span>
                        <span>{topic.progress}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-violet-500 dark:bg-indigo-500"
                            style={{ width: `${topic.progress}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
                {topic.status === "available" && topic.href ? (
                    <Link
                        href={topic.href}
                        className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    >
                        {vi.learn.startLearning}
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-lg border border-slate-200 px-5 py-2.5 text-sm text-slate-400 dark:border-zinc-800 dark:text-zinc-600"
                    >
                        {topic.status === "locked" ? "Đang khóa" : "Sắp ra mắt"}
                    </button>
                )}
                {locked && (
                    <button
                        type="button"
                        onClick={() => onPreview(topic)}
                        className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        Xem trước nội dung
                    </button>
                )}
            </div>
        </article>
    );
}
