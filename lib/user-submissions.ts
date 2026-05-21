export type SubmissionStatus = "passed" | "needs_review" | "failed";

export type UserSubmission = {
    id: string;
    programId: string;
    taskId: string;
    taskTitle: string;
    company: string;
    submittedAt: string;
    status: SubmissionStatus;
    score: number;
    query: string;
    modelAnswer: string;
    feedback: string;
    skills: string[];
};

export const userSubmissions: UserSubmission[] = [
    {
        id: "sub-001",
        programId: "coccoc-data-ops",
        taskId: "novatech-inspect-employees",
        taskTitle: "Kiểm tra dữ liệu nhân sự",
        company: "Cốc Cốc",
        submittedAt: "Hôm nay · 10:24",
        status: "passed",
        score: 95,
        query: "SELECT * FROM employees;",
        modelAnswer: "SELECT * FROM employees;",
        feedback:
            "Bạn đã kiểm tra toàn bộ bảng trước khi xử lý dữ liệu. Đây là bước tốt trong công việc thực tế.",
        skills: ["SELECT"],
    },
    {
        id: "sub-002",
        programId: "coccoc-data-ops",
        taskId: "novatech-active-engineering",
        taskTitle: "Tìm nhân sự Engineering đang active",
        company: "Cốc Cốc",
        submittedAt: "Hôm nay · 10:31",
        status: "passed",
        score: 88,
        query:
            "SELECT * FROM employees WHERE department = 'Engineering' AND status = 'active';",
        modelAnswer:
            "SELECT * FROM employees\nWHERE department = 'Engineering' AND status = 'active';",
        feedback:
            "Truy vấn đúng yêu cầu nghiệp vụ và kết hợp điều kiện hợp lý bằng AND.",
        skills: ["WHERE", "AND / OR"],
    },
    {
        id: "sub-003",
        programId: "coccoc-data-ops",
        taskId: "novatech-safe-update",
        taskTitle: "Chuẩn bị UPDATE an toàn cho Minh Vo",
        company: "Cốc Cốc",
        submittedAt: "Hôm qua · 16:08",
        status: "needs_review",
        score: 62,
        query: "UPDATE employees SET status = 'active';",
        modelAnswer:
            "UPDATE employees\nSET status = 'active'\nWHERE name = 'Minh Vo';",
        feedback:
            "Query thiếu WHERE nên có nguy cơ cập nhật toàn bộ bảng. Cần ôn phần UPDATE an toàn.",
        skills: ["UPDATE an toàn", "WHERE"],
    },
];
