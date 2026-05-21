import type { SkillId } from "./sql-skill-map";

export type InternshipTaskCatalogItem = {
    id: string;
    title: string;
    company: string;
    programId: string;
    dataset: string;
    shortDescription: string;
    requiredSkills: SkillId[];
    relatedLearnModules: string[];
    status: "available" | "preview" | "coming_soon";
    href?: string;
};

export const INTERNSHIP_TASKS_CATALOG: InternshipTaskCatalogItem[] = [
    {
        id: "novatech-inspect-employees",
        title: "Kiểm tra dữ liệu nhân sự",
        company: "Cốc Cốc",
        programId: "coccoc-data-ops",
        dataset: "employees",
        shortDescription: "Đọc toàn bộ bảng employees trước khi lọc hoặc chỉnh sửa.",
        requiredSkills: ["sql-select"],
        relatedLearnModules: ["select-basic"],
        status: "available",
        href: "/internships/coccoc",
    },
    {
        id: "novatech-active-engineering",
        title: "Tìm nhân sự Engineering đang active",
        company: "Cốc Cốc",
        programId: "coccoc-data-ops",
        dataset: "employees",
        shortDescription:
            "Lọc department = Engineering và status = active cho báo cáo nhân sự.",
        requiredSkills: ["sql-select", "sql-where", "sql-and-or"],
        relatedLearnModules: ["select-basic", "where-basic", "and-or"],
        status: "available",
        href: "/internships/coccoc",
    },
    {
        id: "novatech-active-high-salary",
        title: "Tìm nhân sự active có salary > 1000",
        company: "Cốc Cốc",
        programId: "coccoc-data-ops",
        dataset: "employees",
        shortDescription: "Danh sách nhân sự active có lương trên 1000.",
        requiredSkills: ["sql-select", "sql-where", "sql-comparison", "sql-and-or"],
        relatedLearnModules: [
            "select-basic",
            "where-basic",
            "comparison-operators",
            "and-or",
        ],
        status: "available",
        href: "/internships/coccoc",
    },
    {
        id: "novatech-sort-by-salary",
        title: "Sắp xếp nhân sự theo salary giảm dần",
        company: "Cốc Cốc",
        programId: "coccoc-data-ops",
        dataset: "employees",
        shortDescription: "ORDER BY salary DESC cho nhân sự active.",
        requiredSkills: ["sql-select", "sql-order-by"],
        relatedLearnModules: ["select-basic", "order-by"],
        status: "available",
        href: "/internships/coccoc",
    },
    {
        id: "novatech-safe-update",
        title: "Chuẩn bị UPDATE an toàn cho Minh Vo",
        company: "Cốc Cốc",
        programId: "coccoc-data-ops",
        dataset: "employees",
        shortDescription: "UPDATE status = active với WHERE rõ ràng.",
        requiredSkills: ["sql-update", "sql-where"],
        relatedLearnModules: ["update-safety", "where-basic"],
        status: "available",
        href: "/internships/coccoc",
    },
    {
        id: "novatech-safe-delete",
        title: "Chuẩn bị DELETE an toàn cho nhân sự inactive thuộc Sales",
        company: "Cốc Cốc",
        programId: "coccoc-data-ops",
        dataset: "employees",
        shortDescription: "DELETE có WHERE status và department.",
        requiredSkills: ["sql-delete", "sql-where", "sql-and-or"],
        relatedLearnModules: ["delete-safety", "where-basic", "and-or"],
        status: "available",
        href: "/internships/coccoc",
    },
    {
        id: "vng-inspect-candidates",
        title: "Kiểm tra dữ liệu ứng viên",
        company: "VNG",
        programId: "vng-talent-analytics",
        dataset: "candidate_funnel",
        shortDescription: "Khám phá bảng candidate_funnel.",
        requiredSkills: ["sql-select"],
        relatedLearnModules: ["select-basic"],
        status: "preview",
    },
    {
        id: "vng-high-score-candidates",
        title: "Tìm ứng viên có assessment_score >= 80",
        company: "VNG",
        programId: "vng-talent-analytics",
        dataset: "candidate_funnel",
        shortDescription: "Lọc ứng viên điểm cao.",
        requiredSkills: ["sql-select", "sql-where", "sql-comparison"],
        relatedLearnModules: ["select-basic", "where-basic", "comparison-operators"],
        status: "preview",
    },
    {
        id: "vng-linkedin-interview-offer",
        title: "Tìm ứng viên LinkedIn ở vòng Interview hoặc Offer",
        company: "VNG",
        programId: "vng-talent-analytics",
        dataset: "candidate_funnel",
        shortDescription: "Kết hợp nguồn và giai đoạn phễu.",
        requiredSkills: ["sql-select", "sql-where", "sql-and-or"],
        relatedLearnModules: ["select-basic", "where-basic", "and-or"],
        status: "preview",
    },
    {
        id: "coccoc-active-campaigns",
        title: "Tìm campaign đang active",
        company: "Cốc Cốc",
        programId: "coccoc-marketing",
        dataset: "marketing_performance",
        shortDescription: "Chiến dịch đang chạy.",
        requiredSkills: ["sql-select", "sql-where"],
        relatedLearnModules: ["select-basic", "where-basic"],
        status: "coming_soon",
    },
    {
        id: "coccoc-high-conversion",
        title: "Tìm campaign có conversions >= 30",
        company: "Cốc Cốc",
        programId: "coccoc-marketing",
        dataset: "marketing_performance",
        shortDescription: "Hiệu quả chuyển đổi cao.",
        requiredSkills: ["sql-select", "sql-where", "sql-comparison"],
        relatedLearnModules: ["select-basic", "where-basic", "comparison-operators"],
        status: "coming_soon",
    },
    {
        id: "coccoc-sort-by-spend",
        title: "Sắp xếp campaign theo spend giảm dần",
        company: "Cốc Cốc",
        programId: "coccoc-marketing",
        dataset: "marketing_performance",
        shortDescription: "ORDER BY spend DESC.",
        requiredSkills: ["sql-select", "sql-order-by"],
        relatedLearnModules: ["select-basic", "order-by"],
        status: "coming_soon",
    },
];

export function getCatalogTask(taskId: string): InternshipTaskCatalogItem | undefined {
    return INTERNSHIP_TASKS_CATALOG.find((t) => t.id === taskId);
}

export function getTasksUsingSkill(skillId: SkillId): InternshipTaskCatalogItem[] {
    return INTERNSHIP_TASKS_CATALOG.filter((t) => t.requiredSkills.includes(skillId));
}
