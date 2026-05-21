export type TopicStatus = "available" | "coming_soon" | "locked";

export type LearningTopic = {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedTime: string;
    tags: string[];
    status: TopicStatus;
    progress: number;
    moduleCount: number;
    href?: string;
    previewModules?: string[];
};

export type InternshipStatus = "available" | "preview" | "coming_soon" | "locked";

export type InternshipCategory =
    | "data"
    | "software"
    | "business"
    | "marketing"
    | "all";

export type InternshipProgram = {
    id: string;
    companyId: string;
    title: string;
    programTitleEn?: string;
    company: string;
    initials: string;
    role: string;
    description: string;
    dataset: string;
    skills: string[];
    estimatedTime: string;
    difficulty: string;
    taskCount: number;
    format?: string;
    category: InternshipCategory;
    status: InternshipStatus;
    href?: string;
    previewTasks?: string[];
    /** Subtitle on catalog card (e.g. Retention Case · Product Analytics) */
    catalogSubtitle?: string;
    /** Extra badges on interview catalog cards */
    catalogBadges?: string[];
    /** Show "Xem chương trình" + secondary start CTA */
    dualInterviewCta?: boolean;
    /** Label for secondary CTA when dualInterviewCta (default: Bắt đầu interview) */
    simulationCtaLabel?: string;
};

export const LEARNING_TOPICS: LearningTopic[] = [
    {
        id: "sql-fundamentals",
        title: "SQL cơ bản",
        description:
            "Học cách đọc, lọc và chỉnh sửa dữ liệu bằng SQL thông qua bài tập tương tác.",
        difficulty: "Dành cho người mới",
        estimatedTime: "45-60 phút",
        tags: ["SQL", "Database", "Data"],
        status: "available",
        progress: 35,
        moduleCount: 10,
        href: "/learn/sql",
        previewModules: [
            "SELECT cơ bản",
            "SELECT cột cụ thể",
            "WHERE",
            "AND / OR",
            "ORDER BY",
            "LIMIT",
            "UPDATE an toàn",
            "DELETE an toàn",
        ],
    },
    {
        id: "javascript-basics",
        title: "JavaScript cơ bản",
        description:
            "Làm quen với biến, hàm, array, object và xử lý logic trong JavaScript.",
        difficulty: "Dành cho người mới",
        estimatedTime: "60-90 phút",
        tags: ["JavaScript", "Frontend", "Logic"],
        status: "coming_soon",
        progress: 0,
        moduleCount: 10,
        previewModules: [
            "Biến và kiểu dữ liệu",
            "Hàm",
            "Array",
            "Object",
            "Điều kiện",
            "Vòng lặp",
        ],
    },
    {
        id: "react-basics",
        title: "React cơ bản",
        description: "Hiểu component, props, state, event và cách xây dựng UI tương tác.",
        difficulty: "Cơ bản",
        estimatedTime: "90-120 phút",
        tags: ["React", "Frontend", "UI"],
        status: "coming_soon",
        progress: 0,
        moduleCount: 9,
        previewModules: ["Component", "Props", "State", "Event", "List rendering"],
    },
    {
        id: "typescript-basics",
        title: "TypeScript cơ bản",
        description: "Thêm kiểu dữ liệu và an toàn hơn cho JavaScript.",
        difficulty: "Cơ bản",
        estimatedTime: "60-90 phút",
        tags: ["TypeScript", "Types", "Frontend"],
        status: "coming_soon",
        progress: 0,
        moduleCount: 8,
        previewModules: ["Kiểu cơ bản", "Interface", "Union types"],
    },
    {
        id: "git-teamwork",
        title: "Git và làm việc nhóm",
        description: "Học commit, branch, merge, pull request và quy trình làm việc nhóm.",
        difficulty: "Cơ bản",
        estimatedTime: "45-60 phút",
        tags: ["Git", "Teamwork", "Workflow"],
        status: "coming_soon",
        progress: 0,
        moduleCount: 7,
        previewModules: ["Commit", "Branch", "Merge", "Pull request"],
    },
    {
        id: "data-analysis",
        title: "Phân tích dữ liệu cơ bản",
        description: "Khám phá, lọc và tóm tắt dữ liệu để ra quyết định.",
        difficulty: "Cơ bản",
        estimatedTime: "50-70 phút",
        tags: ["Data", "Analysis", "Metrics"],
        status: "coming_soon",
        progress: 0,
        moduleCount: 8,
        previewModules: ["Đọc bảng", "Lọc", "Tổng hợp", "Insight"],
    },
    {
        id: "algorithms",
        title: "Tư duy thuật toán",
        description: "Luyện tư duy giải bài toán và độ phức tạp cơ bản.",
        difficulty: "Trung cấp",
        estimatedTime: "60-90 phút",
        tags: ["Algorithms", "Logic"],
        status: "locked",
        progress: 0,
        moduleCount: 12,
        previewModules: ["Mảng", "Chuỗi", "Tìm kiếm", "Sắp xếp"],
    },
    {
        id: "backend-api",
        title: "Backend API cơ bản",
        description: "Hiểu REST API, request/response và làm việc với dữ liệu.",
        difficulty: "Cơ bản",
        estimatedTime: "70-90 phút",
        tags: ["API", "Backend", "HTTP"],
        status: "locked",
        progress: 0,
        moduleCount: 9,
        previewModules: ["HTTP", "REST", "JSON", "CRUD"],
    },
    {
        id: "ui-ux-dev",
        title: "UI/UX cho lập trình viên",
        description: "Nguyên tắc giao diện và trải nghiệm cho dev frontend.",
        difficulty: "Cơ bản",
        estimatedTime: "40-60 phút",
        tags: ["UI", "UX", "Design"],
        status: "locked",
        progress: 0,
        moduleCount: 6,
        previewModules: ["Layout", "Typography", "Accessibility"],
    },
];

export const INTERNSHIP_PROGRAMS: InternshipProgram[] = [
    {
        id: "novatech-pm-interview",
        companyId: "novatech",
        title: "Mô phỏng phỏng vấn Associate Product Manager",
        programTitleEn: "Associate Product Manager Interview Simulation",
        company: "NovaTech",
        initials: "NT",
        role: "Associate Product Manager",
        description:
            "Hoàn thành một PRD cho tính năng Provable Coach dựa trên brief sản phẩm — tải template, upload và nhận đánh giá.",
        dataset: "document",
        skills: [
            "Product Thinking",
            "PRD Writing",
            "Requirement Analysis",
            "User Flow",
            "Success Metrics",
        ],
        estimatedTime: "30-45 phút",
        difficulty: "Cơ bản",
        taskCount: 1,
        format: "Tự học theo tốc độ cá nhân",
        category: "business",
        status: "available",
        href: "/internships/novatech-pm",
        previewTasks: [
            "Đọc product brief",
            "Tải template PRD",
            "Upload & chấm tài liệu",
        ],
    },
    {
        id: "novatech-da-retention-interview",
        companyId: "novatech",
        title: "Mô phỏng phỏng vấn Data Analyst Intern",
        programTitleEn: "Data Analyst Intern Retention Interview",
        catalogSubtitle: "Retention Case · Product Analytics",
        company: "NovaTech",
        initials: "NT",
        role: "Data Analyst Intern",
        description:
            "Phân tích retention người dùng từ dữ liệu users, transactions và events. Sau đó trình bày insight và thiết kế dashboard một trang cho PM.",
        dataset: "users · transactions · events",
        skills: [
            "SQL",
            "Retention",
            "Dashboard",
            "Data Storytelling",
        ],
        catalogBadges: [
            "SQL",
            "Retention",
            "Dashboard",
            "Data Storytelling",
            "45-60 phút",
        ],
        estimatedTime: "45-60 phút",
        difficulty: "Cơ bản đến trung bình",
        taskCount: 3,
        format: "Interview Simulation",
        category: "data",
        status: "available",
        href: "/internships/novatech-da-retention",
        dualInterviewCta: true,
        previewTasks: [
            "SQL retention & behavior",
            "Insight cho PM",
            "dashboard một trang",
        ],
    },
    {
        id: "coccoc-data-ops",
        companyId: "coccoc",
        title: "Thực tập ảo Data Operations",
        programTitleEn: "Data Operations Virtual Internship",
        company: "Cốc Cốc",
        initials: "CC",
        role: "Thực tập sinh Data Operations",
        description:
            "Thực hiện các task SQL để kiểm tra, lọc và chuẩn bị dữ liệu nhân sự cho báo cáo nội bộ.",
        dataset: "employees",
        skills: ["SQL", "Data Cleaning", "Query Safety", "Business Reasoning"],
        estimatedTime: "20-30 phút",
        difficulty: "Dành cho người mới",
        taskCount: 6,
        format: "Tự học theo tốc độ cá nhân",
        category: "data",
        status: "available",
        href: "/internships/coccoc",
        previewTasks: [
            "Kiểm tra dữ liệu nhân sự",
            "Tìm nhân sự Engineering đang active",
            "Rà soát lương",
            "UPDATE / DELETE an toàn",
        ],
    },
    {
        id: "coccoc-de-intern-assessment",
        companyId: "coccoc",
        title: "Cốc Cốc · DE Intern Assessment",
        programTitleEn: "Cốc Cốc · DE Intern Assessment",
        catalogSubtitle: "Chấm bài · Upload package · Review pipeline",
        company: "Cốc Cốc",
        initials: "CC",
        role: "Data Engineering Intern",
        description:
            "Upload bài làm assessment và xem hệ thống chấm lỗi format, similarity, README, deadline, khả năng chạy, chất lượng giải thích và LLM review.",
        dataset: "Submission package",
        skills: [
            "Data Engineering",
            "README Writing",
            "Submission Quality",
            "Code Review",
            "Data Pipeline Reasoning",
        ],
        catalogBadges: [
            "Review pipeline",
            "Similarity check",
            "LLM review",
            "DE Intern",
        ],
        estimatedTime: "3 ngày",
        difficulty: "Intern / Entry-level",
        taskCount: 1,
        format: "Assessment review · Upload",
        category: "data",
        status: "available",
        href: "/internships/coccoc-de-assessment",
        dualInterviewCta: true,
        simulationCtaLabel: "Bắt đầu chấm thử",
        previewTasks: [
            "Upload .zip / .md package",
            "Pre-check format & README",
            "Similarity & code run",
            "LLM reviewer decision",
        ],
    },
    {
        id: "fpt-data-ops",
        companyId: "fpt-software",
        title: "Thực tập ảo Data Operations",
        programTitleEn: "Data Operations Virtual Internship",
        company: "FPT Software",
        initials: "FPT",
        role: "Thực tập sinh Data Operations",
        description:
            "Chương trình Data Operations tại FPT Software — sắp ra mắt.",
        dataset: "employees",
        skills: ["SQL", "Data Cleaning", "Query Safety"],
        estimatedTime: "20-30 phút",
        difficulty: "Dành cho người mới",
        taskCount: 6,
        format: "Tự học theo tốc độ cá nhân",
        category: "data",
        status: "preview",
        previewTasks: [
            "Kiểm tra dữ liệu nhân sự",
            "Lọc theo phòng ban",
            "UPDATE / DELETE an toàn",
        ],
    },
    {
        id: "vng-talent-analytics",
        companyId: "vng",
        title: "Mô phỏng Talent Analytics",
        programTitleEn: "Talent Analytics Virtual Internship",
        company: "VNG",
        initials: "VNG",
        role: "Thực tập sinh Talent Analyst",
        description:
            "Phân tích phễu ứng viên và tìm ứng viên tiềm năng từ dữ liệu tuyển dụng.",
        dataset: "candidate_funnel",
        skills: ["SQL", "Filtering", "Hiring Funnel", "Analytics"],
        estimatedTime: "25-35 phút",
        difficulty: "Cơ bản",
        taskCount: 5,
        format: "Tự học theo tốc độ cá nhân",
        category: "data",
        status: "preview",
        previewTasks: [
            "Kiểm tra dữ liệu ứng viên",
            "Tìm ứng viên assessment_score >= 80",
            "Ứng viên LinkedIn ở vòng Interview hoặc Offer",
            "Xác định nguồn ứng viên chất lượng",
            "Đề xuất cho team tuyển dụng",
        ],
    },
];

export const INTERNSHIP_FILTERS: { id: string; label: string; match?: (p: InternshipProgram) => boolean }[] = [
    { id: "all", label: "Tất cả" },
    { id: "data", label: "Dữ liệu", match: (p) => p.category === "data" },
    { id: "software", label: "Kỹ thuật phần mềm", match: (p) => p.category === "software" },
    { id: "business", label: "Kinh doanh", match: (p) => p.category === "business" },
    { id: "marketing", label: "Marketing", match: (p) => p.category === "marketing" },
    {
        id: "beginner",
        label: "Dành cho người mới",
        match: (p) => p.difficulty.includes("mới"),
    },
    {
        id: "short",
        label: "Dưới 60 phút",
        match: (p) => {
            const m = p.estimatedTime.match(/(\d+)/);
            return m ? parseInt(m[1], 10) < 60 : true;
        },
    },
];

export function topicBadge(status: TopicStatus): string {
    if (status === "available") return "Có sẵn";
    if (status === "coming_soon") return "Sắp ra mắt";
    return "Đang khóa";
}

export function internshipBadge(status: InternshipStatus): string {
    if (status === "available") return "Có sẵn";
    if (status === "preview") return "Xem trước";
    if (status === "coming_soon") return "Sắp ra mắt";
    return "Đang khóa";
}
