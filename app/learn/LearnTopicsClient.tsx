"use client";

import { useState } from "react";
import AppNav from "@/app/components/layout/AppNav";
import PreviewModal from "@/app/components/PreviewModal";
import SqlModuleRoadmap from "@/app/components/learn/SqlModuleRoadmap";
import TopicCard from "@/app/components/learn/TopicCard";
import { LEARNING_TOPICS, type LearningTopic } from "@/lib/catalog";
import { vi } from "@/lib/vi";

export default function LearnTopicsClient() {
    const [preview, setPreview] = useState<LearningTopic | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {vi.learn.pageTitle}
                </h1>
                <p className="mt-2 max-w-2xl text-slate-600 dark:text-zinc-400">
                    {vi.learn.pageSubtitle}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-zinc-600">
                    {LEARNING_TOPICS.length} chủ đề · 1 chủ đề có thể học đầy đủ trong bản demo
                </p>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {LEARNING_TOPICS.map((topic) => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                    onPreview={setPreview}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <SqlModuleRoadmap />
                    </div>
                </div>
            </main>

            <PreviewModal
                open={!!preview}
                onClose={() => setPreview(null)}
                title={preview?.title ?? ""}
                subtitle="Xem trước lộ trình"
                description={preview?.description ?? ""}
                difficulty={preview?.difficulty}
                estimatedTime={preview?.estimatedTime}
                tags={preview?.tags}
                modulesOrTasks={preview?.previewModules}
                modulesLabel="Các phần dự kiến"
            />
        </div>
    );
}
