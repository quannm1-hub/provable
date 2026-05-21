"use client";

import { ArrowLeft, BookOpen } from "lucide-react";
import {
    buildCompanyReturnUrl,
    buildInternshipReturnUrl,
    type LearnReturnContext,
} from "@/lib/skill-navigation";
import { getSkill } from "@/lib/sql-skill-map";
import { vi } from "@/lib/vi";

type Props = {
    context: LearnReturnContext;
    skillTitle?: string;
};

export default function LearnReturnBanner({ context, skillTitle }: Props) {
    const skill =
        skillTitle ??
        (context.targetSkillId
            ? getSkill(context.targetSkillId)?.title
            : undefined) ??
        "phần này";

    const isCompany = context.from === "company-profile";

    const message = isCompany
        ? `Bạn đang ôn ${skill} từ trang doanh nghiệp ${context.companyName}.`
        : vi.links.reviewingForTask(skill, context.taskTitle);

    const backLabel = isCompany
        ? `Quay lại ${context.companyName}`
        : vi.links.backToTask;

    const backHref = isCompany
        ? buildCompanyReturnUrl(context.companyId)
        : buildInternshipReturnUrl(context);

    return (
        <div className="shrink-0 border-b border-violet-200 bg-violet-50 px-4 py-3 dark:border-indigo-900/50 dark:bg-indigo-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-start gap-2 text-xs text-violet-900 dark:text-indigo-200">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{message}</span>
                </p>
                <button
                    type="button"
                    onClick={() => {
                        window.location.href = backHref;
                    }}
                    className="flex shrink-0 items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500 dark:bg-indigo-600"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {backLabel}
                </button>
            </div>
        </div>
    );
}
