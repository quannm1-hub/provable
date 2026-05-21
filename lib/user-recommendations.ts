export type UserRecommendationType = "learn" | "simulation" | "review" | "profile";

export type UserRecommendation = {
    id: string;
    type: UserRecommendationType;
    title: string;
    description: string;
    actionLabel: string;
    targetView: string;
    targetId?: string;
    href?: string;
    priority: "high" | "medium" | "low";
};

export const userRecommendations: UserRecommendation[] = [
    {
        id: "rec-001",
        type: "learn",
        title: "Ôn AND / OR",
        description:
            "Bạn sẽ cần AND / OR cho task tìm nhân sự Engineering đang active.",
        actionLabel: "Ôn ngay",
        targetView: "learn-module",
        targetId: "and-or",
        href: "/learn/sql?module=and-or",
        priority: "high",
    },
    {
        id: "rec-002",
        type: "simulation",
        title: "Tiếp tục Cốc Cốc",
        description: "Bạn đã hoàn thành 3/6 task trong mô phỏng Data Operations.",
        actionLabel: "Tiếp tục task",
        targetView: "internship-workspace",
        targetId: "novatech-active-high-salary",
        href: "/internships/coccoc?task=novatech-active-high-salary",
        priority: "medium",
    },
    {
        id: "rec-003",
        type: "review",
        title: "Xem lại bài nộp UPDATE",
        description: "Một bài nộp gần đây thiếu WHERE. Nên ôn phần UPDATE an toàn.",
        actionLabel: "Xem bài nộp",
        targetView: "user-submissions",
        targetId: "sub-003",
        href: "/profile/submissions?highlight=sub-003",
        priority: "high",
    },
];

export function navigateRecommendation(rec: UserRecommendation) {
    if (rec.href) {
        window.location.href = rec.href;
        return;
    }
    if (rec.targetView === "user-profile") window.location.href = "/profile";
    else if (rec.targetView === "user-submissions")
        window.location.href = "/profile/submissions";
    else if (rec.targetView === "user-settings") window.location.href = "/profile/settings";
}
