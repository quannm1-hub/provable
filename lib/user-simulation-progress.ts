export type SimulationProgressStatus =
    | "in_progress"
    | "previewed"
    | "not_started"
    | "completed";

export type UserSimulationEntry = {
    programId: string;
    title: string;
    company: string;
    status: SimulationProgressStatus;
    progress: number;
    completedTasks: number;
    totalTasks: number;
    currentTaskId?: string;
    currentTaskTitle?: string;
    lastActivity: string;
    readinessScore?: number;
    href?: string;
    certificateAvailable?: boolean;
};

export const userSimulationProgress = {
    startedSimulations: 2,
    completedSimulations: 0,
    totalSubmittedTasks: 7,
    simulations: [
        {
            programId: "coccoc-data-ops",
            title: "Thực tập ảo Data Operations",
            company: "Cốc Cốc",
            status: "in_progress",
            progress: 50,
            completedTasks: 3,
            totalTasks: 6,
            currentTaskId: "novatech-active-high-salary",
            currentTaskTitle: "Tìm nhân sự active có salary > 1000",
            lastActivity: "Hôm nay",
            readinessScore: 68,
            href: "/internships/coccoc",
        },
        {
            programId: "vng-talent-analytics",
            title: "Mô phỏng Talent Analytics",
            company: "VNG",
            status: "previewed",
            progress: 0,
            completedTasks: 0,
            totalTasks: 5,
            lastActivity: "Hôm qua",
            href: "/internships",
        },
        {
            programId: "fpt-data-ops",
            title: "Thực tập ảo Data Operations",
            company: "FPT Software",
            status: "not_started",
            progress: 0,
            completedTasks: 0,
            totalTasks: 6,
            lastActivity: "Xem trước",
            href: "/internships",
        },
    ] satisfies UserSimulationEntry[],
};
