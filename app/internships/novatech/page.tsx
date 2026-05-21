"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InternshipComplete from "@/app/components/internship/InternshipComplete";
import InternshipProgramDetail from "@/app/components/internship/InternshipProgramDetail";
import InternshipSimulation from "@/app/components/internship/InternshipSimulation";
import ModelAnswersReview from "@/app/components/internship/ModelAnswersReview";
import { initialScores, type SubmittedTaskRecord } from "@/lib/internship";

type View = "detail" | "simulation" | "complete" | "review";

function NovaTechContent() {
    const searchParams = useSearchParams();
    const taskParam = searchParams.get("task");
    const [view, setView] = useState<View>(taskParam ? "simulation" : "detail");
    const [submittedRecords, setSubmittedRecords] = useState<SubmittedTaskRecord[]>([]);
    const [scores, setScores] = useState(initialScores);

    if (view === "detail") {
        return (
            <InternshipProgramDetail
                onBack={() => {
                    window.location.href = "/internships";
                }}
                onStart={() => setView("simulation")}
            />
        );
    }

    if (view === "simulation") {
        return (
            <InternshipSimulation
                initialTaskId={taskParam}
                onComplete={(records, s) => {
                    setSubmittedRecords(records);
                    setScores(s);
                    setView("complete");
                }}
                onBackToProgram={() => setView("detail")}
                onDashboard={() => {
                    window.location.href = "/";
                }}
            />
        );
    }

    if (view === "complete") {
        return (
            <InternshipComplete
                scores={scores}
                onReview={() => setView("review")}
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

    return (
        <ModelAnswersReview
            records={submittedRecords}
            onBack={() => setView("complete")}
        />
    );
}

export default function NovaTechInternshipPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
                    Đang tải chương trình…
                </div>
            }
        >
            <NovaTechContent />
        </Suspense>
    );
}
