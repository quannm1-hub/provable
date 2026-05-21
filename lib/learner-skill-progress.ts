import type { SkillId } from "./sql-skill-map";

export type SkillProgressStatus =
    | "completed"
    | "in_progress"
    | "needs_practice"
    | "not_started";

export type SkillProgressEntry = {
    progress: number;
    status: SkillProgressStatus;
    completedTasks: number;
    lastPracticedAt: string;
};

export const LEARNER_SKILL_PROGRESS: Record<SkillId, SkillProgressEntry> = {
    "sql-select": {
        progress: 100,
        status: "completed",
        completedTasks: 4,
        lastPracticedAt: "Hôm nay",
    },
    "sql-select-columns": {
        progress: 70,
        status: "in_progress",
        completedTasks: 2,
        lastPracticedAt: "Hôm qua",
    },
    "sql-where": {
        progress: 45,
        status: "in_progress",
        completedTasks: 2,
        lastPracticedAt: "Hôm nay",
    },
    "sql-comparison": {
        progress: 20,
        status: "needs_practice",
        completedTasks: 1,
        lastPracticedAt: "Chưa luyện nhiều",
    },
    "sql-and-or": {
        progress: 0,
        status: "not_started",
        completedTasks: 0,
        lastPracticedAt: "Chưa học",
    },
    "sql-order-by": {
        progress: 0,
        status: "not_started",
        completedTasks: 0,
        lastPracticedAt: "Chưa học",
    },
    "sql-limit": {
        progress: 0,
        status: "not_started",
        completedTasks: 0,
        lastPracticedAt: "Chưa học",
    },
    "sql-update": {
        progress: 10,
        status: "needs_practice",
        completedTasks: 0,
        lastPracticedAt: "Chưa học kỹ",
    },
    "sql-delete": {
        progress: 0,
        status: "not_started",
        completedTasks: 0,
        lastPracticedAt: "Chưa học",
    },
};

export function getSkillProgress(skillId: SkillId): SkillProgressEntry {
    return (
        LEARNER_SKILL_PROGRESS[skillId] ?? {
            progress: 0,
            status: "not_started",
            completedTasks: 0,
            lastPracticedAt: "Chưa học",
        }
    );
}
