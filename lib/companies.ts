import type { DatasetId } from "./datasets";
import { internshipBadge, type InternshipStatus } from "./catalog";

export type CompanyStatus = "available" | "preview" | "coming_soon";

export type CompanyTeam = {
    name: string;
    description: string;
};

export type CompanyProfile = {
    id: string;
    name: string;
    logoInitials: string;
    industry: string;
    size: string;
    location: string;
    shortDescription: string;
    longDescription: string;
    mission: string;
    businessContext: string;
    teams: CompanyTeam[];
    datasets: DatasetId[];
    skills: string[];
    availablePrograms: string[];
    values: string[];
    status: CompanyStatus;
};

export const COMPANIES: CompanyProfile[] = [
    {
        id: "novatech",
        name: "NovaTech",
        logoInitials: "NT",
        industry: "HR Tech / People Operations",
        size: "250-500 nhân sự",
        location: "Remote-first · Việt Nam",
        shortDescription:
            "NovaTech là một công ty công nghệ giả lập chuyên xây dựng công cụ nội bộ cho quản trị nhân sự và vận hành dữ liệu.",
        longDescription:
            "Trong mô phỏng này, NovaTech đại diện cho một công ty công nghệ đang phát triển nhanh. Team People Operations cần dữ liệu chính xác để chuẩn bị báo cáo nhân sự hàng tháng, theo dõi nhân sự active và đảm bảo các thay đổi dữ liệu được thực hiện an toàn.",
        mission: "Giúp các team vận hành ra quyết định tốt hơn bằng dữ liệu sạch, rõ ràng và có thể kiểm chứng.",
        businessContext:
            "People Operations tại NovaTech đang chuẩn bị báo cáo nhân sự hàng tháng cho leadership. Người học sẽ đóng vai thực tập sinh Data Operations và hỗ trợ kiểm tra, lọc, cập nhật và chuẩn bị dữ liệu.",
        teams: [
            {
                name: "People Operations",
                description:
                    "Phụ trách dữ liệu nhân sự, headcount, trạng thái nhân viên và báo cáo nội bộ.",
            },
            {
                name: "Data Operations",
                description:
                    "Hỗ trợ kiểm tra dữ liệu, chuẩn hóa bảng dữ liệu và viết truy vấn phục vụ báo cáo.",
            },
        ],
        datasets: ["employees"],
        skills: ["SQL", "Data Inspection", "Filtering", "Query Safety", "Business Reasoning"],
        availablePrograms: ["novatech-data-ops"],
        values: ["Rõ ràng", "An toàn dữ liệu", "Ra quyết định dựa trên dữ liệu"],
        status: "available",
    },
    {
        id: "brighthire",
        name: "BrightHire",
        logoInitials: "BH",
        industry: "Recruiting Analytics",
        size: "100-250 nhân sự",
        location: "Hồ Chí Minh · Hybrid",
        shortDescription:
            "BrightHire là công ty giả lập cung cấp giải pháp phân tích phễu tuyển dụng.",
        longDescription:
            "BrightHire giúp team tuyển dụng theo dõi nguồn ứng viên, điểm đánh giá và tiến độ qua từng vòng tuyển dụng. Trong mô phỏng, người học phân tích dữ liệu candidate_funnel để tìm ứng viên tiềm năng.",
        mission: "Giúp doanh nghiệp tuyển dụng tốt hơn bằng dữ liệu ứng viên rõ ràng.",
        businessContext:
            "Team Recruiting Analytics cần xác định ứng viên chất lượng cao và nguồn tuyển dụng hiệu quả.",
        teams: [
            {
                name: "Recruiting Analytics",
                description: "Phân tích dữ liệu ứng viên và hiệu quả nguồn tuyển dụng.",
            },
        ],
        datasets: ["candidate_funnel"],
        skills: ["SQL", "Filtering", "Hiring Funnel", "Analytics"],
        availablePrograms: ["brighthire-recruiting"],
        values: ["Minh bạch", "Tối ưu quy trình", "Tập trung vào ứng viên"],
        status: "preview",
    },
    {
        id: "cloudcart",
        name: "CloudCart",
        logoInitials: "CC",
        industry: "E-commerce",
        size: "500+ nhân sự",
        location: "Việt Nam · Đông Nam Á",
        shortDescription:
            "CloudCart là nền tảng thương mại điện tử giả lập với dữ liệu đơn hàng và sản phẩm.",
        longDescription:
            "CloudCart mô phỏng một doanh nghiệp thương mại điện tử cần phân tích đơn hàng, sản phẩm, tồn kho và doanh thu để hỗ trợ quyết định kinh doanh.",
        mission: "Giúp cửa hàng online vận hành hiệu quả hơn bằng dữ liệu.",
        businessContext:
            "Team E-commerce Analytics cần phân tích đơn hàng completed, sản phẩm hết hàng và đơn hàng giá trị cao.",
        teams: [
            {
                name: "E-commerce Analytics",
                description: "Phân tích đơn hàng, sản phẩm, tồn kho và hiệu quả kinh doanh.",
            },
        ],
        datasets: ["orders", "products"],
        skills: ["SQL", "Orders", "Products", "Business Metrics"],
        availablePrograms: ["cloudcart-ecommerce"],
        values: ["Tốc độ", "Khách hàng", "Tối ưu vận hành"],
        status: "coming_soon",
    },
    {
        id: "growthlab",
        name: "GrowthLab",
        logoInitials: "GL",
        industry: "Marketing Analytics",
        size: "50-100 nhân sự",
        location: "Remote · APAC",
        shortDescription:
            "GrowthLab là agency giả lập chuyên phân tích hiệu quả chiến dịch marketing.",
        longDescription:
            "GrowthLab giúp khách hàng theo dõi spend, leads và conversions qua nhiều kênh marketing. Trong mô phỏng, người học đánh giá campaign nào đang hoạt động tốt.",
        mission: "Biến dữ liệu marketing thành quyết định tăng trưởng dễ hiểu.",
        businessContext:
            "Team Marketing Performance cần đánh giá campaign active, conversion cao và mức spend theo từng kênh.",
        teams: [
            {
                name: "Marketing Performance",
                description: "Theo dõi hiệu quả campaign, lead generation và conversion.",
            },
        ],
        datasets: ["marketing_performance"],
        skills: ["SQL", "Marketing Analytics", "Performance Analysis"],
        availablePrograms: ["growthlab-marketing"],
        values: ["Thử nghiệm", "Đo lường", "Tăng trưởng bền vững"],
        status: "coming_soon",
    },
];

export function getCompany(id: string): CompanyProfile | undefined {
    return COMPANIES.find((c) => c.id === id);
}

export function getCompanyByProgramId(programId: string): CompanyProfile | undefined {
    return COMPANIES.find((c) => c.availablePrograms.includes(programId));
}

export function companyBadge(status: CompanyStatus): string {
    return internshipBadge(status as InternshipStatus);
}

export function companyProfileHref(companyId: string, query?: Record<string, string>): string {
    const base = `/companies/${companyId}`;
    if (!query || Object.keys(query).length === 0) return base;
    const params = new URLSearchParams(query);
    return `${base}?${params.toString()}`;
}

/** Map program company display name → company id */
export const COMPANY_ID_BY_NAME: Record<string, string> = {
    NovaTech: "novatech",
    BrightHire: "brighthire",
    CloudCart: "cloudcart",
    GrowthLab: "growthlab",
    DevSync: "devsync",
};

export function getCompanyIdForProgram(program: { company: string; id: string }): string {
    return COMPANY_ID_BY_NAME[program.company] ?? program.id.split("-")[0];
}
