export type MockUser = {
    id: string;
    name: string;
    email: string;
    avatarInitials: string;
    roleGoal: string;
    currentLevel: string;
    location: string;
    joinedAt: string;
    headline: string;
    preferredLanguage: string;
    themePreference: "light" | "dark";
};

export const mockUser: MockUser = {
    id: "user-demo-001",
    name: "Nguyễn Minh Quân",
    email: "demo@provable.vn",
    avatarInitials: "MQ",
    roleGoal: "Junior Data Analyst",
    currentLevel: "Beginner",
    location: "Việt Nam",
    joinedAt: "Tháng 5, 2026",
    headline: "Đang học SQL và luyện tập mô phỏng công việc Data Operations.",
    preferredLanguage: "vi",
    themePreference: "dark",
};

export function getFirstName(fullName: string): string {
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1] ?? fullName;
}
