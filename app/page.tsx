import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Sparkles } from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import {
    INTERNSHIP_PROGRAMS,
    LEARNING_TOPICS,
    internshipBadge,
    topicBadge,
} from "@/lib/catalog";
import { MOCK_LEARNER_PROGRESS } from "@/lib/learner-progress";
import { vi } from "@/lib/vi";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-6xl px-4 py-10">
                <section className="text-center">
                    <p className="text-sm font-medium text-violet-600 dark:text-indigo-400">
                        {vi.app.title}
                    </p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {vi.app.subtitle}
                    </h1>
                </section>

                <section className="mt-12 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 dark:border-indigo-800/40 dark:from-indigo-950/40 dark:to-zinc-900/50">
                        <BookOpen className="h-8 w-8 text-violet-600 dark:text-indigo-400" />
                        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            {vi.home.learnSkill}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                            {vi.home.learnSkillDesc}
                        </p>
                        <Link
                            href="/learn"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-900 dark:text-indigo-300 dark:hover:text-indigo-200"
                        >
                            {vi.home.chooseTopic}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 dark:border-emerald-800/40 dark:from-emerald-950/30 dark:to-zinc-900/50">
                        <Briefcase className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                            {vi.home.internship}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                            {vi.home.internshipDesc}
                        </p>
                        <Link
                            href="/internships"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-200"
                        >
                            {vi.home.chooseInternship}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            label: "Chủ đề đang học",
                            value: String(MOCK_LEARNER_PROGRESS.topicsInProgress),
                        },
                        {
                            label: "Bài tập đã hoàn thành",
                            value: String(MOCK_LEARNER_PROGRESS.tasksCompleted),
                        },
                        {
                            label: "Mô phỏng đã mở",
                            value: String(MOCK_LEARNER_PROGRESS.simulationsUnlocked),
                        },
                        {
                            label: "Mức sẵn sàng",
                            value: `${MOCK_LEARNER_PROGRESS.readinessScore}%`,
                        },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                        >
                            <p className="text-xs text-slate-500 dark:text-zinc-500">{s.label}</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                                {s.value}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Hoạt động gần đây
                        </h3>
                        <ul className="mt-3 space-y-2">
                            {MOCK_LEARNER_PROGRESS.recentActivity.map((a) => (
                                <li
                                    key={a}
                                    className="text-xs text-slate-600 dark:text-zinc-400"
                                >
                                    · {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Gợi ý tiếp theo
                        </h3>
                        <ul className="mt-3 space-y-2">
                            {MOCK_LEARNER_PROGRESS.recommendedNext.map((r) => (
                                <li key={r.label}>
                                    <Link
                                        href={r.href}
                                        className="text-sm text-violet-600 hover:underline dark:text-indigo-400"
                                    >
                                        {r.actionLabel ? `${r.actionLabel}: ` : ""}
                                        {r.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mt-14">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {vi.home.topicsTitle}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
                                {vi.home.topicsSubtitle}
                            </p>
                        </div>
                        <Link
                            href="/learn"
                            className="hidden text-sm text-violet-600 hover:underline dark:text-indigo-400 sm:block"
                        >
                            {vi.home.viewAllTopics}
                        </Link>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {LEARNING_TOPICS.slice(0, 6).map((topic) => (
                            <TopicPreview key={topic.id} topic={topic} />
                        ))}
                    </div>
                </section>

                <section className="mt-14">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {vi.home.internshipsTitle}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
                                {vi.home.internshipsSubtitle}
                            </p>
                        </div>
                        <Link
                            href="/internships"
                            className="hidden text-sm text-violet-600 hover:underline dark:text-indigo-400 sm:block"
                        >
                            {vi.home.viewAllInternships}
                        </Link>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {INTERNSHIP_PROGRAMS.map((prog) => (
                            <InternshipPreview key={prog.id} program={prog} />
                        ))}
                    </div>
                </section>

                <p className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-zinc-600">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                    {vi.app.prototypeNote}
                </p>
            </main>
        </div>
    );
}

function TopicPreview({ topic }: { topic: (typeof LEARNING_TOPICS)[number] }) {
    const locked = topic.status !== "available";
    const badge = topicBadge(topic.status);
    const inner = (
        <div
            className={`rounded-xl border p-5 transition ${
                locked
                    ? "border-slate-200 bg-slate-100/80 dark:border-zinc-800/80 dark:bg-zinc-900/30"
                    : "border-slate-200 bg-white hover:border-violet-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-700"
            }`}
        >
            <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    topic.status === "available"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-500"
                }`}
            >
                {badge}
            </span>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{topic.title}</h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">{topic.description}</p>
            {topic.status === "available" && (
                <p className="mt-2 text-[10px] text-violet-600 dark:text-indigo-400">
                    Tiến độ {topic.progress}%
                </p>
            )}
            {locked ? (
                <p className="mt-4 text-xs text-slate-400 dark:text-zinc-600">
                    {vi.home.previewUnavailable}
                </p>
            ) : (
                <span className="mt-4 inline-block text-sm font-medium text-violet-600 dark:text-indigo-400">
                    {vi.home.startLearning} →
                </span>
            )}
        </div>
    );
    return locked ? inner : <Link href={topic.href!}>{inner}</Link>;
}

function InternshipPreview({
    program,
}: {
    program: (typeof INTERNSHIP_PROGRAMS)[number];
}) {
    const locked = program.status !== "available";
    const badge = internshipBadge(program.status);
    const inner = (
        <div
            className={`rounded-xl border p-5 ${
                locked
                    ? "border-slate-200 bg-slate-100/80 dark:border-zinc-800/80 dark:bg-zinc-900/30"
                    : "border-slate-200 bg-white hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-800/50"
            }`}
        >
            <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    program.status === "available"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-500"
                }`}
            >
                {badge}
            </span>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{program.company}</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-500">{program.role}</p>
            {locked ? (
                <p className="mt-4 text-xs text-slate-400 dark:text-zinc-600">
                    {program.status === "preview" ? "Xem trước trên trang Thực tập ảo" : vi.home.previewUnavailable}
                </p>
            ) : (
                <span className="mt-4 inline-block text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {vi.home.startInternship} →
                </span>
            )}
        </div>
    );
    return locked ? inner : <Link href={program.href!}>{inner}</Link>;
}
