import type { SkillId } from "./sql-skill-map";
import { getLearnModuleForSkill, getSkill } from "./sql-skill-map";
import { getSkillProgress } from "./learner-skill-progress";

export type CompanySkillLearnLink = {
    skillId: SkillId;
    moduleId: string;
    label: string;
};

export type CompanySkillCard = {
    title: string;
    description: string;
    learnLinks: CompanySkillLearnLink[];
    hasLearn: boolean;
};

const SKILL_DEFINITIONS: Record<
    string,
    { description: string; skillIds: SkillId[] }
> = {
    SQL: {
        description: "Đọc và truy vấn dữ liệu bằng SELECT, FROM và các mệnh đề cơ bản.",
        skillIds: ["sql-select"],
    },
    "Data Inspection": {
        description: "Kiểm tra bảng dữ liệu, đếm dòng và xác nhận cấu trúc trước khi phân tích.",
        skillIds: ["sql-select", "sql-select-columns"],
    },
    Filtering: {
        description: "Dùng WHERE và AND / OR để lọc dữ liệu theo yêu cầu nghiệp vụ.",
        skillIds: ["sql-where", "sql-and-or"],
    },
    "Query Safety": {
        description: "UPDATE và DELETE có WHERE để tránh thay đổi nhầm toàn bộ bảng.",
        skillIds: ["sql-update", "sql-delete"],
    },
    "Business Reasoning": {
        description: "Giải thích vì sao truy vấn phù hợp với yêu cầu báo cáo và quyết định nghiệp vụ.",
        skillIds: [],
    },
    "Data Cleaning": {
        description: "Chuẩn hóa và kiểm tra dữ liệu trước khi đưa vào báo cáo.",
        skillIds: ["sql-where", "sql-select"],
    },
    "Hiring Funnel": {
        description: "Theo dõi ứng viên qua các vòng Applied, Interview, Offer và Rejected.",
        skillIds: ["sql-where", "sql-and-or"],
    },
    Analytics: {
        description: "Tổng hợp insight từ dữ liệu để hỗ trợ quyết định tuyển dụng.",
        skillIds: ["sql-where", "sql-order-by"],
    },
    Orders: {
        description: "Lọc và phân tích đơn hàng theo trạng thái, thành phố và giá trị.",
        skillIds: ["sql-where", "sql-comparison"],
    },
    Products: {
        description: "Truy vấn sản phẩm, tồn kho và trạng thái hết hàng.",
        skillIds: ["sql-where"],
    },
    "Business Metrics": {
        description: "Đọc số liệu kinh doanh từ dữ liệu đơn hàng và sản phẩm.",
        skillIds: ["sql-where", "sql-order-by"],
    },
    "Marketing Analytics": {
        description: "Đánh giá campaign theo spend, leads và conversions.",
        skillIds: ["sql-where", "sql-and-or"],
    },
    "Performance Analysis": {
        description: "So sánh hiệu quả kênh và campaign đang active.",
        skillIds: ["sql-where", "sql-order-by"],
    },
    Marketing: {
        description: "Phân tích dữ liệu chiến dịch marketing.",
        skillIds: ["sql-where"],
    },
};

export function buildCompanySkillCards(skillLabels: string[]): CompanySkillCard[] {
    return skillLabels.map((title) => {
        const def = SKILL_DEFINITIONS[title] ?? {
            description: `Luyện tập ${title} trong bối cảnh mô phỏng công việc.`,
            skillIds: [] as SkillId[],
        };
        const seen = new Set<string>();
        const learnLinks: CompanySkillLearnLink[] = [];
        for (const skillId of def.skillIds) {
            const mod = getLearnModuleForSkill(skillId);
            if (!mod || seen.has(mod.id)) continue;
            seen.add(mod.id);
            const skill = getSkill(skillId);
            learnLinks.push({
                skillId,
                moduleId: mod.id,
                label: `Ôn ${skill?.title ?? mod.title}`,
            });
        }
        return {
            title,
            description: def.description,
            learnLinks,
            hasLearn: learnLinks.length > 0,
        };
    });
}

export function skillChipProgress(skillId: SkillId): number {
    return getSkillProgress(skillId).progress;
}
