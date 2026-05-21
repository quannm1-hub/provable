export type TopicProgressStatus = "in_progress" | "preview" | "not_started" | "completed";

export type UserTopicProgress = {
    topicId: string;
    title: string;
    progress: number;
    status: TopicProgressStatus;
    completedModules: number;
    totalModules: number;
    lastActivity: string;
    nextModuleId?: string;
    nextModuleTitle?: string;
};

export const userLearningProgress = {
    activeTopics: 3,
    completedTopics: 0,
    completedModules: 4,
    completedPracticeTasks: 12,
    totalLearningMinutes: 95,
    currentStreak: 5,
    readinessScore: 68,
    topics: [
        {
            topicId: "sql-fundamentals",
            title: "SQL cơ bản",
            progress: 45,
            status: "in_progress" as const,
            completedModules: 4,
            totalModules: 10,
            lastActivity: "Hôm nay",
            nextModuleId: "and-or",
            nextModuleTitle: "AND / OR",
        },
        {
            topicId: "javascript-basics",
            title: "JavaScript cơ bản",
            progress: 10,
            status: "preview" as const,
            completedModules: 1,
            totalModules: 10,
            lastActivity: "2 ngày trước",
            nextModuleTitle: "Array và Object",
        },
        {
            topicId: "git-teamwork",
            title: "Git và làm việc nhóm",
            progress: 0,
            status: "not_started" as const,
            completedModules: 0,
            totalModules: 7,
            lastActivity: "Chưa bắt đầu",
        },
    ] satisfies UserTopicProgress[],
};
