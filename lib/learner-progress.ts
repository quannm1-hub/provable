/** Mock learner profile for prototype UI */

import { getDashboardRecommendations } from "./recommendations";

const dashRecs = getDashboardRecommendations();

export const MOCK_LEARNER_PROGRESS = {
    topicsInProgress: 3,
    tasksCompleted: 12,
    simulationsUnlocked: 2,
    readinessScore: 78,
    completedModules: ["select-basic", "where-basic"],
    confidenceByModule: {
        "select-basic": "medium",
        "where-basic": "beginner",
        "and-or": "beginner",
    } as Record<string, string>,
    hintsUsed: 3,
    badges: ["SQL Starter", "SQL Workplace Starter"],
    recentActivity: [
        "Đã hoàn thành SELECT cơ bản",
        "Đã luyện WHERE với bảng employees",
        "Đã xem trước mô phỏng BrightHire",
        "Đã đạt badge SQL Starter",
    ],
    recommendedNext: dashRecs.map((r) => ({
        label: r.message,
        href: r.href ?? "#",
        actionLabel: r.actionLabel,
    })),
};
