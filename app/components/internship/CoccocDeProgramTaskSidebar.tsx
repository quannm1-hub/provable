"use client";

import CoccocDeForageTaskSidebar from "@/app/components/internship/CoccocDeForageTaskSidebar";
import {
    COCCOC_DE_ASSESSMENT_PROGRAM,
    COCCOC_DE_PROGRAM_TASKS,
    type CoccocDeProgramTaskId,
} from "@/lib/coccoc-de-assessment";

export type ProgramTaskStatus = "pending" | "active" | "done";

type Props = {
    activeTask: CoccocDeProgramTaskId;
    onTaskChange: (id: CoccocDeProgramTaskId) => void;
    taskStatus?: Partial<Record<CoccocDeProgramTaskId, ProgramTaskStatus>>;
};

const forageTasks = COCCOC_DE_PROGRAM_TASKS.map((t) => ({
    step: t.step,
    title: t.label,
    summary: t.summary,
    duration:
        t.id === "submit"
            ? "10–20 phút"
            : t.id.startsWith("sql")
              ? "30–60 phút"
              : COCCOC_DE_ASSESSMENT_PROGRAM.estimatedTime,
}));

export default function CoccocDeProgramTaskSidebar({
    activeTask,
    onTaskChange,
    taskStatus = {},
}: Props) {
    const active = COCCOC_DE_PROGRAM_TASKS.find((t) => t.id === activeTask);
    const completedSteps = COCCOC_DE_PROGRAM_TASKS.filter(
        (t) => taskStatus[t.id] === "done",
    ).map((t) => t.step);

    return (
        <CoccocDeForageTaskSidebar
            tasks={forageTasks}
            activeStep={active?.step ?? 1}
            completedSteps={completedSteps}
            onTaskSelect={(step) => {
                const task = COCCOC_DE_PROGRAM_TASKS.find((t) => t.step === step);
                if (task) onTaskChange(task.id);
            }}
        />
    );
}
