"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    Clock,
    Database,
    MapPin,
    Play,
    Table2,
    Target,
    Users,
} from "lucide-react";
import AppNav from "@/app/components/layout/AppNav";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import DatasetSampleModal from "@/app/components/company/DatasetSampleModal";
import PreviewModal from "@/app/components/PreviewModal";
import { companyBadge, type CompanyProfile } from "@/lib/companies";
import {
    COMPANY_DATASET_META,
    getCompanyDatasetMeta,
    type CompanyDatasetMeta,
} from "@/lib/company-datasets";
import { buildCompanySkillCards } from "@/lib/company-skills";
import { internshipBadge } from "@/lib/catalog";
import type { InternshipProgram } from "@/lib/catalog";
import { getProgramHref, getProgramsForCompany } from "@/lib/program-routes";
import {
    buildSimulationReturnUrl,
    goToLearnModule,
    loadSimulationResume,
    type CompanyLearnReturnContext,
    type SimulationResumeContext,
} from "@/lib/skill-navigation";
import type { DatasetId } from "@/lib/datasets";

type Props = {
    company: CompanyProfile;
    simulationResume?: SimulationResumeContext | null;
};

export default function CompanyProfilePage({
    company,
    simulationResume,
}: Props) {
    const [datasetPreview, setDatasetPreview] = useState<CompanyDatasetMeta | null>(
        null,
    );
    const [programPreview, setProgramPreview] = useState<InternshipProgram | null>(
        null,
    );

    const programs = useMemo(
        () => getProgramsForCompany(company.id),
        [company.id],
    );
    const skillCards = useMemo(
        () => buildCompanySkillCards(company.skills),
        [company.skills],
    );

    const primaryProgram = programs.find((p) => p.status === "available");
    const heroHref = primaryProgram ? getProgramHref(primaryProgram.id) : undefined;

    const learnReturnBase: Omit<CompanyLearnReturnContext, "targetSkillId"> = {
        from: "company-profile",
        companyId: company.id,
        companyName: company.name,
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
            <AppNav />
            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/internships"
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh sách mô phỏng
                    </Link>
                    <ThemeToggle compact />
                </div>

                {simulationResume && (
                    <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 dark:border-indigo-900/50 dark:bg-indigo-950/40">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-violet-900 dark:text-indigo-200">
                                Bạn đang xem thông tin doanh nghiệp giữa chừng task mô phỏng.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    window.location.href =
                                        buildSimulationReturnUrl(simulationResume);
                                }}
                                className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                            >
                                Quay lại task đang làm
                            </button>
                        </div>
                    </div>
                )}

                {/* Hero */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="flex gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl font-bold text-violet-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                {company.logoInitials}
                            </div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                                    Thông tin doanh nghiệp
                                </p>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                                    {company.name}
                                </h1>
                                <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                    {company.industry}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {company.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5" />
                                        {company.size}
                                    </span>
                                </div>
                                <span
                                    className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        company.status === "available"
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                            : company.status === "preview"
                                              ? "bg-violet-100 text-violet-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                                              : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-500"
                                    }`}
                                >
                                    {companyBadge(company.status)}
                                </span>
                            </div>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:min-w-[200px]">
                            {company.status === "available" && heroHref ? (
                                <Link
                                    href={heroHref}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 dark:bg-emerald-700"
                                >
                                    <Play className="h-4 w-4" />
                                    Bắt đầu mô phỏng
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const p = programs[0];
                                        if (p) setProgramPreview(p);
                                    }}
                                    className="rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                                >
                                    Xem trước chương trình
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                        {company.shortDescription}
                    </p>
                    <p className="mt-3 text-[11px] italic text-slate-400 dark:text-zinc-600">
                        Đây là doanh nghiệp giả lập được tạo cho mục đích học tập. Không liên
                        kết với công ty thật.
                    </p>
                </section>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
                    {/* Left column */}
                    <div className="space-y-8">
                        <Section
                            icon={<Building2 className="h-4 w-4" />}
                            title="Tổng quan doanh nghiệp"
                        >
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                                {company.longDescription}
                            </p>
                            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-800/30">
                                <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
                                    Sứ mệnh
                                </p>
                                <p className="mt-1 text-sm text-slate-700 dark:text-zinc-300">
                                    {company.mission}
                                </p>
                            </div>
                        </Section>

                        <Section
                            icon={<Target className="h-4 w-4" />}
                            title="Bối cảnh mô phỏng"
                        >
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                                {company.businessContext}
                            </p>
                        </Section>

                        <Section
                            icon={<Users className="h-4 w-4" />}
                            title="Các team liên quan"
                        >
                            <div className="grid gap-3 sm:grid-cols-2">
                                {company.teams.map((team) => (
                                    <div
                                        key={team.name}
                                        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                                    >
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {team.name}
                                        </p>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                                            {team.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section
                            icon={<Database className="h-4 w-4" />}
                            title="Bộ dữ liệu sử dụng"
                        >
                            <div className="grid gap-3 sm:grid-cols-2">
                                {company.datasets.map((id) => {
                                    const meta = getCompanyDatasetMeta(id);
                                    return (
                                        <DatasetCard
                                            key={id}
                                            meta={meta}
                                            onPreview={() => setDatasetPreview(meta)}
                                        />
                                    );
                                })}
                            </div>
                        </Section>

                        <Section title="Giá trị mô phỏng">
                            <div className="flex flex-wrap gap-2">
                                {company.values.map((v) => (
                                    <span
                                        key={v}
                                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
                                    >
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    </div>

                    {/* Right column */}
                    <div className="space-y-8">
                        <Section title="Chương trình mô phỏng">
                            <div className="space-y-4">
                                {programs.map((program) => (
                                    <ProgramCard
                                        key={program.id}
                                        program={program}
                                        onPreview={() => setProgramPreview(program)}
                                    />
                                ))}
                                {programs.length === 0 && (
                                    <p className="text-sm text-slate-500">
                                        Chưa có chương trình cho doanh nghiệp này.
                                    </p>
                                )}
                            </div>
                        </Section>

                        <Section title="Kỹ năng được luyện tập">
                            <div className="space-y-4">
                                {skillCards.map((card) => (
                                    <div
                                        key={card.title}
                                        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                                    >
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {card.title}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
                                            {card.description}
                                        </p>
                                        {card.hasLearn && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {card.learnLinks.map((link) => (
                                                    <button
                                                        key={link.moduleId}
                                                        type="button"
                                                        onClick={() =>
                                                            goToLearnModule(link.moduleId, {
                                                                ...learnReturnBase,
                                                                targetSkillId: link.skillId,
                                                            })
                                                        }
                                                        className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-800 hover:bg-violet-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200"
                                                    >
                                                        {link.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {!card.hasLearn && (
                                            <p className="mt-2 text-[10px] text-slate-400 dark:text-zinc-600">
                                                Luyện trong bối cảnh mô phỏng
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </div>
                </div>
            </main>

            <DatasetSampleModal
                open={!!datasetPreview}
                onClose={() => setDatasetPreview(null)}
                meta={datasetPreview}
            />

            <PreviewModal
                open={!!programPreview}
                onClose={() => setProgramPreview(null)}
                title={programPreview?.title ?? ""}
                subtitle={`${programPreview?.company} · ${programPreview?.programTitleEn ?? ""}`}
                description={programPreview?.description ?? ""}
                difficulty={programPreview?.difficulty}
                estimatedTime={programPreview?.estimatedTime}
                tags={programPreview?.skills}
                modulesOrTasks={programPreview?.previewTasks}
                modulesLabel="Danh sách task mô phỏng"
            />
        </div>
    );
}

function Section({
    title,
    icon,
    children,
}: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                {icon}
                {title}
            </h2>
            {children}
        </section>
    );
}

function DatasetCard({
    meta,
    onPreview,
}: {
    meta: (typeof COMPANY_DATASET_META)[DatasetId];
    onPreview: () => void;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-start gap-2">
                <Table2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-indigo-400" />
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                        {meta.vietnameseName}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-600">
                        {meta.name}
                    </p>
                </div>
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">
                {meta.description}
            </p>
            <p className="mt-2 text-[10px] text-slate-500">
                {meta.rowCount} dòng · {meta.columns.slice(0, 4).join(", ")}
                {meta.columns.length > 4 ? "…" : ""}
            </p>
            <button
                type="button"
                onClick={onPreview}
                className="mt-3 text-xs font-medium text-violet-600 hover:text-violet-500 dark:text-indigo-400"
            >
                Xem mẫu dữ liệu
            </button>
        </div>
    );
}

function ProgramCard({
    program,
    onPreview,
}: {
    program: InternshipProgram;
    onPreview: () => void;
}) {
    const href = getProgramHref(program.id);
    const badge = internshipBadge(program.status);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {program.title}
                </h3>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {badge}
                </span>
            </div>
            <p className="mt-1 text-xs text-violet-600 dark:text-indigo-400">{program.role}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {program.estimatedTime}
                </span>
                <span>{program.taskCount} task</span>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                {program.status === "available" && href ? (
                    <Link
                        href={href}
                        className="rounded-lg bg-emerald-600 py-2 text-center text-xs font-medium text-white hover:bg-emerald-500"
                    >
                        Bắt đầu mô phỏng
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={onPreview}
                        className="rounded-lg bg-violet-600 py-2 text-xs font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                    >
                        Xem trước chương trình
                    </button>
                )}
            </div>
        </div>
    );
}
