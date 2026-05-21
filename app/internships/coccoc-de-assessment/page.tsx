"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShopifyAssessmentComplete from "@/app/components/internship/ShopifyAssessmentComplete";
import ShopifyAssessmentProgramDetail from "@/app/components/internship/ShopifyAssessmentProgramDetail";
import ShopifyAssessmentReviewSimulation from "@/app/components/internship/ShopifyAssessmentReviewSimulation";
import type { AssessmentEvaluationResult } from "@/lib/assessment-evaluator";

type View = "detail" | "simulation" | "complete";

type CompleteState = {
    score: number;
    decision: AssessmentEvaluationResult["decision"];
    fileName: string;
};

function CoccocDeAssessmentContent() {
    const searchParams = useSearchParams();
    const startNow = searchParams.get("start") === "simulation";
    const [view, setView] = useState<View>(startNow ? "simulation" : "detail");
    const [complete, setComplete] = useState<CompleteState | null>(null);

    if (view === "detail") {
        return (
            <ShopifyAssessmentProgramDetail
                onBack={() => {
                    window.location.href = "/internships";
                }}
                onStart={() => setView("simulation")}
            />
        );
    }

    if (view === "simulation") {
        return (
            <ShopifyAssessmentReviewSimulation
                onBackToProgram={() => setView("detail")}
                onComplete={(payload) => {
                    setComplete({
                        score: payload.score,
                        decision: payload.decision,
                        fileName: payload.fileName,
                    });
                    setView("complete");
                }}
            />
        );
    }

    if (!complete) {
        return (
            <ShopifyAssessmentProgramDetail
                onBack={() => {
                    window.location.href = "/internships";
                }}
                onStart={() => setView("simulation")}
            />
        );
    }

    return (
        <ShopifyAssessmentComplete
            score={complete.score}
            decision={complete.decision}
            fileName={complete.fileName}
            onRestart={() => {
                setComplete(null);
                setView("detail");
            }}
            onDashboard={() => {
                window.location.href = "/";
            }}
        />
    );
}

export default function CoccocDeAssessmentPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
                    Đang tải…
                </div>
            }
        >
            <CoccocDeAssessmentContent />
        </Suspense>
    );
}
