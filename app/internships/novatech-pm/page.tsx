"use client";

import { Suspense, useState } from "react";
import PmInterviewComplete from "@/app/components/internship/PmInterviewComplete";
import PmInterviewProgramDetail from "@/app/components/internship/PmInterviewProgramDetail";
import PmInterviewSimulation from "@/app/components/internship/PmInterviewSimulation";

type View = "detail" | "simulation" | "complete";

function PmInterviewContent() {
    const [view, setView] = useState<View>("detail");

    if (view === "detail") {
        return (
            <PmInterviewProgramDetail
                onBack={() => {
                    window.location.href = "/internships";
                }}
                onStart={() => setView("simulation")}
            />
        );
    }

    if (view === "simulation") {
        return (
            <PmInterviewSimulation
                onComplete={() => setView("complete")}
                onBackToProgram={() => setView("detail")}
                onDashboard={() => {
                    window.location.href = "/";
                }}
            />
        );
    }

    return (
        <PmInterviewComplete
            onRestart={() => setView("detail")}
            onDashboard={() => {
                window.location.href = "/";
            }}
            onExplore={() => {
                window.location.href = "/internships";
            }}
        />
    );
}

export default function NovaTechPmInterviewPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
                    Đang tải chương trình…
                </div>
            }
        >
            <PmInterviewContent />
        </Suspense>
    );
}
