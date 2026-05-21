"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import DaRetentionComplete from "@/app/components/internship/DaRetentionComplete";
import DaRetentionProgramDetail from "@/app/components/internship/DaRetentionProgramDetail";
import DaRetentionSimulation from "@/app/components/internship/DaRetentionSimulation";

type View = "detail" | "simulation" | "complete";

type Scores = {
    sql: number;
    insight: number;
    dashboard: number;
    overall: number;
    passed: boolean;
};

function DaRetentionContent() {
    const searchParams = useSearchParams();
    const startSim = searchParams.get("start") === "simulation";
    const [view, setView] = useState<View>(startSim ? "simulation" : "detail");
    const [scores, setScores] = useState<Scores | null>(null);
    const [reviewMode, setReviewMode] = useState(false);

    if (view === "detail") {
        return (
            <DaRetentionProgramDetail
                onBack={() => {
                    window.location.href = "/internships";
                }}
                onStart={() => setView("simulation")}
            />
        );
    }

    if (view === "simulation" && !reviewMode) {
        return (
            <DaRetentionSimulation
                onBackToProgram={() => setView("detail")}
                onComplete={(s) => {
                    setScores(s);
                    setView("complete");
                }}
            />
        );
    }

    if (view === "simulation" && reviewMode && scores) {
        return (
            <DaRetentionSimulation
                onBackToProgram={() => {
                    setReviewMode(false);
                    setView("complete");
                }}
                onComplete={(s) => {
                    setScores(s);
                    setView("complete");
                }}
            />
        );
    }

    if (!scores) {
        return (
            <DaRetentionProgramDetail
                onBack={() => {
                    window.location.href = "/internships";
                }}
                onStart={() => setView("simulation")}
            />
        );
    }

    return (
        <DaRetentionComplete
            sqlScore={scores.sql}
            insightScore={scores.insight}
            dashboardScore={scores.dashboard}
            overallScore={scores.overall}
            passed={scores.passed}
            onRestart={() => {
                setScores(null);
                setReviewMode(false);
                setView("detail");
            }}
            onDashboard={() => {
                window.location.href = "/";
            }}
            onViewReference={() => {
                setReviewMode(true);
                setView("simulation");
            }}
            onReviewSubmission={() => {
                setReviewMode(true);
                setView("simulation");
            }}
        />
    );
}

export default function NovaTechDaRetentionPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
                    Đang tải chương trình…
                </div>
            }
        >
            <DaRetentionContent />
        </Suspense>
    );
}
