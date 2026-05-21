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
    feedback: string;
    skills: string[];
    type?:
        | "sql"
        | "document"
        | "sql_case"
        | "text_insight"
        | "dashboard_upload"
        | "assessment_review";
    role?: string;
    decision?: string;
    riskFlags?: string[];
    checksSummary?: string;
    llmReviewSummary?: string;
    submissionLabel?: string;
    query?: string;
    modelAnswer?: string;
    fileName?: string;
    matchedSections?: string[];
    missingSections?: string[];
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
    {
        id: "sub-prd-001",
        programId: "novatech-pm-interview",
        taskId: "novatech-prd-provable-coach",
        taskTitle: "Viết PRD cho tính năng Provable Coach",
        company: "NovaTech",
        submittedAt: "Hôm qua · 14:20",
        status: "needs_review",
        score: 76,
        type: "document",
        fileName: "provable-coach-prd-draft.md",
        feedback:
            "Tài liệu đã có cấu trúc cơ bản nhưng chưa đủ chi tiết để pass (cần ≥ 90%).",
        skills: ["PRD Writing", "Product Thinking"],
        matchedSections: ["Bối cảnh", "Vấn đề cần giải quyết", "Yêu cầu chức năng"],
        missingSections: ["User flow", "Yêu cầu phi chức năng", "Tiêu chí thành công"],
        query: "",
        modelAnswer: "",
    },
    {
        id: "sub-da-sql-001",
        programId: "novatech-da-retention-interview",
        taskId: "retention-sql-part",
        taskTitle: "Retention Case · Data Analyst Intern — SQL",
        submissionLabel: "Retention Case · Data Analyst Intern",
        company: "NovaTech",
        submittedAt: "Hôm nay · 09:15",
        status: "passed",
        score: 82,
        type: "sql_case",
        query: "SELECT cohort_month, COUNT(*) ... retention D7/D30",
        modelAnswer: "WITH cohort_users AS (SELECT ...)",
        feedback: "Query có cấu trúc cohort + retention phù hợp yêu cầu.",
        skills: ["SQL", "Cohort Analysis", "Retention Analysis"],
    },
    {
        id: "sub-da-insight-001",
        programId: "novatech-da-retention-interview",
        taskId: "retention-insight-part",
        taskTitle: "Retention Case · Insight cho PM",
        submissionLabel: "Retention Case · Data Analyst Intern",
        company: "NovaTech",
        submittedAt: "Hôm nay · 09:42",
        status: "passed",
        score: 88,
        type: "text_insight",
        query: "",
        modelAnswer: "",
        feedback:
            "Insight kết nối retention, hành vi sớm và first transaction với action onboarding.",
        skills: ["Insight Storytelling", "Product Analytics"],
    },
    {
        id: "sub-da-dash-001",
        programId: "novatech-da-retention-interview",
        taskId: "retention-dashboard-part",
        taskTitle: "Retention Case · dashboard một trang",
        submissionLabel: "Retention Case · Data Analyst Intern",
        company: "NovaTech",
        submittedAt: "Hôm nay · 10:05",
        status: "passed",
        score: 85,
        type: "dashboard_upload",
        fileName: "novapay-retention-dashboard-final.png",
        query: "",
        modelAnswer: "",
        feedback:
            "Dashboard đáp ứng north star và chart retention.",
        skills: ["Dashboard Communication", "Data Storytelling"],
    },
    {
        id: "sub-coccoc-de-review-001",
        programId: "coccoc-de-intern-assessment",
        taskId: "de-intern-package",
        taskTitle: "Cốc Cốc · DE Intern Assessment",
        submissionLabel: "Cốc Cốc · DE Intern Assessment",
        company: "Cốc Cốc",
        role: "Data Engineering Intern",
        submittedAt: "Hôm nay · 11:00",
        status: "passed",
        score: 92,
        type: "assessment_review",
        fileName: "final_complete_pass.zip",
        decision: "Strong Pass",
        riskFlags: [],
        checksSummary: "Format, README, code run, similarity — đạt",
        llmReviewSummary:
            "Submission có cấu trúc đầy đủ; rủi ro similarity thấp.",
        feedback: "Strong Pass. README và hướng dẫn chạy ổn.",
        skills: ["Data Engineering", "README Writing"],
    },
    {
        id: "sub-coccoc-de-review-002",
        programId: "coccoc-de-intern-assessment",
        taskId: "de-intern-package",
        taskTitle: "Cốc Cốc · DE Intern Assessment",
        submissionLabel: "Cốc Cốc · DE Intern Assessment",
        company: "Cốc Cốc",
        role: "Data Engineering Intern",
        submittedAt: "Hôm qua · 18:40",
        status: "failed",
        score: 38,
        type: "assessment_review",
        fileName: "no-readme.zip",
        decision: "Reject",
        riskFlags: ["Thiếu README / explanation"],
        checksSummary: "README failed · Code run warning",
        llmReviewSummary:
            "Thiếu README — reviewer khó hiểu approach. Cần bổ sung trước khi nộp lại.",
        feedback:
            "Reject. Thiếu README và phần giải thích cách chạy.",
        skills: ["Submission Quality"],
    },
];
