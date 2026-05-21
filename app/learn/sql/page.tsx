"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import LearningComplete from "@/app/components/learn/LearningComplete";
import LearningWorkspace from "@/app/components/workspace/LearningWorkspace";
import { MODULE_COUNT } from "@/lib/course";
import {
    courseIndexForLearnModule,
    parseCompanyLearnFromSearchParams,
    parseReturnFromSearchParams,
    saveReturnContext,
    type LearnReturnContext,
} from "@/lib/skill-navigation";
import type { SkillId } from "@/lib/sql-skill-map";
import { getLearnModule, getLearnModuleForSkill } from "@/lib/sql-skill-map";

function SqlLearnContent() {
    const searchParams = useSearchParams();
    const [completed, setCompleted] = useState(false);
    const [finalReadiness, setFinalReadiness] = useState(0);

    const internshipReturn = parseReturnFromSearchParams(searchParams);
    const companyReturn = parseCompanyLearnFromSearchParams(searchParams);
    const returnContext: LearnReturnContext | null =
        internshipReturn ?? companyReturn;
    if (returnContext) saveReturnContext(returnContext as LearnReturnContext);

    const moduleParam = returnContext ? null : searchParams.get("module");
    const skillFromUrl = searchParams.get("skillId") as SkillId | null;
    const resolvedSkillId = returnContext?.targetSkillId ?? skillFromUrl;

    let learnModuleId = moduleParam ?? undefined;
    if (returnContext && resolvedSkillId) {
        learnModuleId = getLearnModuleForSkill(resolvedSkillId)?.id;
    }

    const learnMeta = learnModuleId ? getLearnModule(learnModuleId) : undefined;
    const initialModuleIndex =
        learnModuleId != null ? courseIndexForLearnModule(learnModuleId) : null;

    if (completed) {
        return (
            <LearningComplete
                readiness={finalReadiness}
                modulesCompleted={MODULE_COUNT}
                returnContext={returnContext}
            />
        );
    }

    return (
        <LearningWorkspace
            initialModuleIndex={initialModuleIndex ?? undefined}
            learnModuleId={learnModuleId ?? learnMeta?.id}
            returnContext={returnContext ?? undefined}
            onComplete={(readiness) => {
                setFinalReadiness(readiness);
                setCompleted(true);
            }}
        />
    );
}

export default function SqlLearnPage() {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center text-sm text-slate-500">
                    Đang tải…
                </div>
            }
        >
            <SqlLearnContent />
        </Suspense>
    );
}
