export type ActivityType =
    | "lesson_completed"
    | "practice_completed"
    | "simulation_task_submitted"
    | "badge_earned"
    | "simulation_started";

export type RecentActivity = {
    id: string;
    type: ActivityType;
    title: string;
    time: string;
};

export const recentActivities: RecentActivity[] = [
    {
        id: "act-001",
        type: "lesson_completed",
        title: "Hoàn thành SELECT cơ bản",
        time: "Hôm nay · 09:45",
    },
    {
        id: "act-002",
        type: "practice_completed",
        title: "Làm đúng bài WHERE với bảng employees",
        time: "Hôm nay · 10:02",
    },
    {
        id: "act-003",
        type: "simulation_task_submitted",
        title: "Nộp task Cốc Cốc: Tìm nhân sự Engineering đang active",
        time: "Hôm nay · 10:31",
    },
    {
        id: "act-004",
        type: "badge_earned",
        title: "Nhận badge SQL Starter",
        time: "Hôm nay · 10:40",
    },
];
