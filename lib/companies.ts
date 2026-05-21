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
    disclaimer?: string;
};

export const COMPANIES: CompanyProfile[] = [
    {
        id: "novatech",
        name: "NovaTech",
        logoInitials: "NT",
        industry: "Công nghệ · Nền tảng học tập",
        size: "200+ nhân sự",
        location: "TP.HCM · Việt Nam",
        shortDescription:
            "Mô phỏng phỏng vấn và thực tập sản phẩm — viết PRD, phân tích yêu cầu và làm việc với team Product Platform.",
        longDescription:
            "NovaTech xây dựng Provable — nền tảng học kỹ năng và mô phỏng công việc. Trong mô phỏng PM, bạn hoàn thiện tài liệu PRD cho tính năng Provable Coach dựa trên brief thực tế.",
        mission: "Giúp người học chứng minh năng lực qua task giống công việc thật.",
        businessContext:
            "Team Product Platform cần PRD rõ ràng trước khi Design và Engineering triển khai Provable Coach.",
        teams: [
            {
                name: "Product Platform Team",
                description: "Định nghĩa yêu cầu sản phẩm cho học tập và mô phỏng.",
            },
            {
                name: "Design & Engineering",
                description: "Triển khai trải nghiệm coach, panel và luồng học.",
            },
        ],
        datasets: [],
        skills: [
            "Product Thinking",
            "PRD Writing",
            "Requirement Analysis",
            "User Flow",
        ],
        availablePrograms: [
            "novatech-pm-interview",
            "novatech-da-retention-interview",
        ],
        values: ["Rõ ràng", "Lấy người học làm trung tâm", "Đo lường được"],
        status: "available",
    },
    {
        id: "fpt-software",
        name: "FPT Software",
        logoInitials: "FPT",
        industry: "Phần mềm & Dịch vụ CNTT",
        size: "10.000+ nhân sự",
        location: "Hà Nội · TP.HCM · Toàn cầu",
        shortDescription:
            "Mô phỏng môi trường FPT Software — công ty phần mềm lớn tại Việt Nam, nơi team vận hành dữ liệu hỗ trợ báo cáo nội bộ.",
        longDescription:
            "Trong mô phỏng này, bạn đóng vai thực tập sinh Data Operations tại bối cảnh giống FPT Software. Team People Operations cần dữ liệu nhân sự chính xác để chuẩn bị báo cáo hàng tháng, theo dõi headcount và đảm bảo truy vấn SQL an toàn.",
        mission: "Mang lại giải pháp công nghệ chất lượng cao, vận hành dựa trên dữ liệu rõ ràng.",
        businessContext:
            "Team vận hành dữ liệu đang chuẩn bị báo cáo nhân sự cho leadership. Người học sẽ kiểm tra, lọc, cập nhật và chuẩn bị dữ liệu bằng SQL.",
        teams: [
            {
                name: "People Operations",
                description:
                    "Quản lý dữ liệu nhân sự, headcount và trạng thái nhân viên phục vụ báo cáo nội bộ.",
            },
            {
                name: "Data Operations",
                description:
                    "Kiểm tra chất lượng dữ liệu, chuẩn hóa bảng và viết truy vấn phục vụ báo cáo.",
            },
        ],
        datasets: ["employees"],
        skills: ["SQL", "Data Inspection", "Filtering", "Query Safety", "Business Reasoning"],
        availablePrograms: [],
        values: ["Chất lượng", "An toàn dữ liệu", "Học hỏi liên tục"],
        status: "preview",
    },
    {
        id: "vng",
        name: "VNG",
        logoInitials: "VNG",
        industry: "Công nghệ · Game & Nền tảng số",
        size: "3.000+ nhân sự",
        location: "TP.HCM · Việt Nam",
        shortDescription:
            "Mô phỏng bối cảnh VNG — tập đoàn công nghệ Việt Nam, tập trung phân tích dữ liệu người dùng và sản phẩm số.",
        longDescription:
            "Trong mô phỏng, team Product Analytics tại VNG cần đọc dữ liệu phễu người dùng và ứng viên nội bộ để hỗ trợ quyết định sản phẩm. Người học luyện SQL với bảng dữ liệu mẫu candidate_funnel.",
        mission: "Tạo sản phẩm số mang lại trải nghiệm tốt cho người dùng Việt Nam.",
        businessContext:
            "Team tuyển dụng & phân tích cần xác định nguồn ứng viên chất lượng và tiến độ qua các vòng phỏng vấn.",
        teams: [
            {
                name: "Product Analytics",
                description: "Phân tích hành vi người dùng và hiệu quả sản phẩm.",
            },
            {
                name: "Talent Analytics",
                description: "Theo dõi phễu tuyển dụng và chất lượng nguồn ứng viên.",
            },
        ],
        datasets: ["candidate_funnel"],
        skills: ["SQL", "Filtering", "Hiring Funnel", "Analytics"],
        availablePrograms: ["vng-talent-analytics"],
        values: ["Sáng tạo", "Dữ liệu làm căn cứ", "Tốc độ thử nghiệm"],
        status: "preview",
    },
    {
        id: "coccoc",
        name: "Cốc Cốc",
        logoInitials: "CC",
        industry: "Browser / Search / Consumer Technology",
        size: "Tech company",
        location: "Việt Nam",
        shortDescription:
            "Công ty công nghệ Việt Nam — thực tập Data Operations và chấm bài DE Intern Assessment.",
        longDescription:
            "Luyện SQL với dữ liệu nhân sự trong chương trình Data Operations, hoặc nộp package DE Intern Assessment để xem review pipeline (format, similarity, code run, LLM review).",
        mission: "Xây dựng các sản phẩm công nghệ phục vụ người dùng Internet tại Việt Nam.",
        businessContext:
            "Team Data/Product cần phân tích hành vi người dùng trên trình duyệt, traffic, domain usage, DAU và các chỉ số liên quan đến tăng trưởng sản phẩm.",
        teams: [
            {
                name: "Data Analytics",
                description:
                    "Phân tích dữ liệu người dùng, clickstream, traffic và các chỉ số sản phẩm.",
            },
            {
                name: "Product Analytics",
                description:
                    "Hỗ trợ Product Manager hiểu hành vi người dùng, vấn đề retention và cơ hội tăng trưởng.",
            },
        ],
        datasets: ["employees"],
        skills: [
            "SQL",
            "Data Engineering",
            "Analytical Thinking",
            "Clickstream Analysis",
            "README Writing",
            "Submission Quality",
        ],
        availablePrograms: ["coccoc-data-ops", "coccoc-de-intern-assessment"],
        values: ["Data-informed", "User understanding", "Product thinking"],
        status: "available",
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
    "FPT Software": "fpt-software",
    VNG: "vng",
    "Cốc Cốc": "coccoc",
};

export function getCompanyIdForProgram(program: { company: string; id: string }): string {
    return COMPANY_ID_BY_NAME[program.company] ?? program.id.split("-")[0];
}
