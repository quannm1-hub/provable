"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AssessmentPageLayout from "@/app/components/assessment/AssessmentPageLayout";
import ReferenceAnswerBlock from "@/app/components/assessment/ReferenceAnswerBlock";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import { downloadPrdTemplate } from "@/lib/document-tasks";
import { evaluatePrdUpload, type PrdEvaluationResult } from "@/lib/prd-evaluation";
import { PM_DOCUMENT_TASK } from "@/lib/pm-internship-detail";
import { PRD_SAMPLE_ANSWER } from "@/lib/document-tasks";
import DocumentTaskWorkspace, { type UploadPhase } from "./DocumentTaskWorkspace";

type Props = {
    onComplete: () => void;
    onBackToProgram: () => void;
    onDashboard: () => void;
};

const TASK = PM_DOCUMENT_TASK;

export default function PmInterviewSimulation({
    onComplete,
    onBackToProgram,
    onDashboard,
}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [phase, setPhase] = useState<UploadPhase>("idle");
    const [evaluation, setEvaluation] = useState<PrdEvaluationResult | null>(null);
    const [modelUnlocked, setModelUnlocked] = useState(false);
    const [taskPassed, setTaskPassed] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    function handleFileSelect(f: File | null) {
        setFile(f);
        setEvaluation(null);
        setPhase(f ? "uploaded" : "idle");
        setModelUnlocked(false);
        setTaskPassed(false);
    }

    async function handleEvaluate() {
        if (!file) return;
        setPhase("evaluating");
        await new Promise((r) => setTimeout(r, 1200));
        const result = await evaluatePrdUpload(file, TASK);
        setEvaluation(result);
        setPhase("evaluated");
        setModelUnlocked(true);
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (result.status === "passed") setTaskPassed(true);
    }

    return (
        <AssessmentPageLayout
            header={
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onBackToProgram}
                            className="flex items-center gap-1 rounded border px-2 py-1 text-xs"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Quay lại
                        </button>
                        <div>
                            <p className="text-xs font-semibold">
                                <Link href="/companies/novatech" className="text-violet-600">
                                    NovaTech
                                </Link>{" "}
                                · PM PRD Interview
                            </p>
                            <p className="text-[10px] text-slate-500">{TASK.title}</p>
                        </div>
                    </div>
                    <ThemeToggle compact />
                </div>
            }
            footer={
                taskPassed ? (
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={onComplete}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white dark:bg-indigo-600"
                        >
                            Hoàn thành interview
                        </button>
                        <button
                            type="button"
                            onClick={onDashboard}
                            className="text-xs text-slate-500 hover:underline"
                        >
                            Quay về Bảng điều khiển
                        </button>
                    </div>
                ) : undefined
            }
        >
            <DocumentTaskWorkspace
                inlineLayout
                task={TASK}
                file={file}
                phase={phase}
                evaluation={evaluation}
                onFileSelect={handleFileSelect}
                onEvaluate={handleEvaluate}
                onDownloadTemplate={downloadPrdTemplate}
                resultRef={resultRef}
            />
            {modelUnlocked && evaluation && (
                <ReferenceAnswerBlock
                    title="Đáp án tham khảo (mẫu PRD)"
                    content={PRD_SAMPLE_ANSWER}
                    format="markdown"
                />
            )}
        </AssessmentPageLayout>
    );
}
