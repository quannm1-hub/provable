"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CompanyProfilePage from "@/app/components/company/CompanyProfilePage";
import { getCompany } from "@/lib/companies";
import {
    loadSimulationResume,
    type SimulationResumeContext,
} from "@/lib/skill-navigation";

function CompanyProfileContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const companyId = typeof params.companyId === "string" ? params.companyId : "";
    const company = getCompany(companyId);
    const [simResume, setSimResume] = useState<SimulationResumeContext | null>(null);

    useEffect(() => {
        const fromUrl = searchParams.get("from");
        const taskId = searchParams.get("task");
        if (fromUrl === "simulation" && taskId) {
            setSimResume({
                from: "simulation",
                internshipId: searchParams.get("internshipId") ?? "coccoc-data-ops",
                programHref: searchParams.get("programHref") ?? "/internships/coccoc",
                taskId,
                activeTab: searchParams.get("activeTab") ?? undefined,
                sqlInput: searchParams.get("sqlInput") ?? undefined,
            });
            return;
        }
        setSimResume(loadSimulationResume());
    }, [searchParams]);

    if (!company) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
                <p className="text-slate-600 dark:text-zinc-400">
                    Không tìm thấy doanh nghiệp mô phỏng.
                </p>
                <a
                    href="/internships"
                    className="text-sm text-violet-600 hover:underline dark:text-indigo-400"
                >
                    Quay lại danh sách mô phỏng
                </a>
            </div>
        );
    }

    return (
        <CompanyProfilePage company={company} simulationResume={simResume} />
    );
}

export default function CompanyPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
                    Đang tải thông tin doanh nghiệp…
                </div>
            }
        >
            <CompanyProfileContent />
        </Suspense>
    );
}
