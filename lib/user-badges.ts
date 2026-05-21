export type BadgeStatus = "earned" | "in_progress" | "locked";

export type UserBadge = {
    id: string;
    title: string;
    description: string;
    earnedAt: string | null;
    status: BadgeStatus;
    progress?: number;
    icon?: "database" | "shield" | "briefcase" | "award";
};

export const userBadges: UserBadge[] = [
    {
        id: "sql-starter",
        title: "SQL Starter",
        description: "Hoàn thành các bài tập SELECT và WHERE cơ bản.",
        earnedAt: "Hôm nay",
        status: "earned",
        icon: "database",
    },
    {
        id: "query-safety",
        title: "Query Safety Mindset",
        description: "Biết nhận diện rủi ro khi dùng UPDATE hoặc DELETE thiếu WHERE.",
        earnedAt: null,
        status: "locked",
        progress: 60,
        icon: "shield",
    },
    {
        id: "workplace-starter",
        title: "SQL Workplace Starter",
        description: "Hoàn thành mô phỏng công việc SQL đầu tiên.",
        earnedAt: null,
        status: "in_progress",
        progress: 50,
        icon: "briefcase",
    },
];

export const userCertificate = {
    programTitle: "Thực tập ảo Data Operations tại Cốc Cốc",
    company: "Cốc Cốc",
    learnerName: "Nguyễn Minh Quân",
    completionDate: null as string | null,
    status: "in_progress" as "in_progress" | "completed",
    skills: ["SQL", "WHERE", "Data Inspection", "Query Safety"],
};
