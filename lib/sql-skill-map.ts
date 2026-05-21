/** SQL skills ↔ learn modules ↔ internship tasks */

export type SkillId =
    | "sql-select"
    | "sql-select-columns"
    | "sql-where"
    | "sql-comparison"
    | "sql-and-or"
    | "sql-order-by"
    | "sql-limit"
    | "sql-update"
    | "sql-delete";

export type SqlSkill = {
    skillId: SkillId;
    title: string;
    learnModuleId: string;
    description: string;
    route: string;
};

export const SQL_SKILL_MAP: SqlSkill[] = [
    {
        skillId: "sql-select",
        title: "SELECT",
        learnModuleId: "select-basic",
        description: "Đọc dữ liệu từ bảng.",
        route: "/learn/sql?module=select-basic",
    },
    {
        skillId: "sql-select-columns",
        title: "Chọn cột cụ thể",
        learnModuleId: "select-columns",
        description: "Chỉ lấy những cột cần thiết thay vì SELECT *.",
        route: "/learn/sql?module=select-columns",
    },
    {
        skillId: "sql-where",
        title: "WHERE",
        learnModuleId: "where-basic",
        description: "Lọc dòng dữ liệu theo điều kiện.",
        route: "/learn/sql?module=where-basic",
    },
    {
        skillId: "sql-comparison",
        title: "Toán tử so sánh",
        learnModuleId: "comparison-operators",
        description: "Dùng =, >, <, >=, <= để so sánh dữ liệu.",
        route: "/learn/sql?module=comparison-operators",
    },
    {
        skillId: "sql-and-or",
        title: "AND / OR",
        learnModuleId: "and-or",
        description: "Kết hợp nhiều điều kiện lọc.",
        route: "/learn/sql?module=and-or",
    },
    {
        skillId: "sql-order-by",
        title: "ORDER BY",
        learnModuleId: "order-by",
        description: "Sắp xếp kết quả truy vấn.",
        route: "/learn/sql?module=order-by",
    },
    {
        skillId: "sql-limit",
        title: "LIMIT",
        learnModuleId: "limit",
        description: "Giới hạn số dòng kết quả.",
        route: "/learn/sql?module=limit",
    },
    {
        skillId: "sql-update",
        title: "UPDATE an toàn",
        learnModuleId: "update-safety",
        description: "Cập nhật dữ liệu có kiểm soát, tránh thay đổi nhầm toàn bộ bảng.",
        route: "/learn/sql?module=update-safety",
    },
    {
        skillId: "sql-delete",
        title: "DELETE an toàn",
        learnModuleId: "delete-safety",
        description: "Xóa dữ liệu có kiểm soát, tránh xóa nhầm toàn bộ bảng.",
        route: "/learn/sql?module=delete-safety",
    },
];

export type LearnModuleMeta = {
    id: string;
    skillId: SkillId;
    title: string;
    description: string;
    estimatedTime: string;
    difficulty: string;
    prerequisites: SkillId[];
    relatedInternshipTasks: string[];
    status: "available" | "preview" | "coming_soon";
    progress: number;
    /** Playable index in courseModules, if any */
    courseModuleId?: string;
};

export const SQL_LEARN_MODULES: LearnModuleMeta[] = [
    {
        id: "select-basic",
        skillId: "sql-select",
        title: "SELECT cơ bản",
        description: "Đọc dữ liệu từ bảng.",
        estimatedTime: "8 phút",
        difficulty: "Cơ bản",
        prerequisites: [],
        relatedInternshipTasks: [
            "novatech-inspect-employees",
            "brighthire-inspect-candidates",
            "cloudcart-completed-orders",
        ],
        status: "available",
        progress: 100,
        courseModuleId: "select",
    },
    {
        id: "select-columns",
        skillId: "sql-select-columns",
        title: "SELECT cột cụ thể",
        description: "Chọn đúng cột thay vì SELECT *.",
        estimatedTime: "6 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-select"],
        relatedInternshipTasks: [],
        status: "available",
        progress: 70,
        courseModuleId: "select",
    },
    {
        id: "where-basic",
        skillId: "sql-where",
        title: "WHERE",
        description: "Lọc dòng dữ liệu theo điều kiện.",
        estimatedTime: "8 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-select"],
        relatedInternshipTasks: [
            "novatech-active-engineering",
            "brighthire-high-score-candidates",
            "cloudcart-completed-orders",
            "growthlab-active-campaigns",
        ],
        status: "available",
        progress: 45,
        courseModuleId: "where",
    },
    {
        id: "comparison-operators",
        skillId: "sql-comparison",
        title: "Toán tử so sánh",
        description: "=, >, <, >=, <= trong WHERE.",
        estimatedTime: "7 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-where"],
        relatedInternshipTasks: [
            "novatech-active-high-salary",
            "brighthire-high-score-candidates",
            "cloudcart-high-value-orders",
        ],
        status: "preview",
        progress: 20,
        courseModuleId: "where",
    },
    {
        id: "and-or",
        skillId: "sql-and-or",
        title: "AND / OR",
        description: "Kết hợp nhiều điều kiện lọc.",
        estimatedTime: "8 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-where"],
        relatedInternshipTasks: [
            "novatech-active-engineering",
            "novatech-active-high-salary",
            "novatech-safe-delete",
            "brighthire-linkedin-interview-offer",
        ],
        status: "available",
        progress: 0,
        courseModuleId: "and_or",
    },
    {
        id: "order-by",
        skillId: "sql-order-by",
        title: "ORDER BY",
        description: "Sắp xếp kết quả truy vấn.",
        estimatedTime: "6 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-select", "sql-where"],
        relatedInternshipTasks: [
            "novatech-sort-by-salary",
            "growthlab-sort-by-spend",
        ],
        status: "preview",
        progress: 0,
        courseModuleId: "where",
    },
    {
        id: "limit",
        skillId: "sql-limit",
        title: "LIMIT",
        description: "Giới hạn số dòng trả về.",
        estimatedTime: "5 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-select"],
        relatedInternshipTasks: [],
        status: "preview",
        progress: 0,
    },
    {
        id: "update-safety",
        skillId: "sql-update",
        title: "UPDATE an toàn",
        description: "Cập nhật dữ liệu có kiểm soát.",
        estimatedTime: "10 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-select", "sql-where"],
        relatedInternshipTasks: ["novatech-safe-update"],
        status: "available",
        progress: 10,
        courseModuleId: "update",
    },
    {
        id: "delete-safety",
        skillId: "sql-delete",
        title: "DELETE an toàn",
        description: "Xóa dữ liệu có kiểm soát.",
        estimatedTime: "10 phút",
        difficulty: "Cơ bản",
        prerequisites: ["sql-select", "sql-where"],
        relatedInternshipTasks: ["novatech-safe-delete"],
        status: "available",
        progress: 0,
        courseModuleId: "delete",
    },
];

export function getSkill(skillId: SkillId): SqlSkill | undefined {
    return SQL_SKILL_MAP.find((s) => s.skillId === skillId);
}

export function getLearnModule(moduleId: string): LearnModuleMeta | undefined {
    return SQL_LEARN_MODULES.find((m) => m.id === moduleId);
}

export function getLearnModuleForSkill(skillId: SkillId): LearnModuleMeta | undefined {
    return SQL_LEARN_MODULES.find((m) => m.skillId === skillId);
}

export function courseIndexForLearnModule(moduleId: string): number | null {
    const mod = getLearnModule(moduleId);
    if (!mod?.courseModuleId) return null;
    const ids = ["select", "where", "and_or", "update", "delete"];
    const idx = ids.indexOf(mod.courseModuleId);
    return idx >= 0 ? idx : null;
}
