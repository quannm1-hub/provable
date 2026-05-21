export type DatasetId =
    | "employees"
    | "orders"
    | "products"
    | "candidate_funnel"
    | "marketing_performance";

export type DatasetMeta = {
    id: DatasetId;
    label: string;
    tableName: string;
    description: string;
    columns: string[];
};

export const DATASET_META: Record<DatasetId, DatasetMeta> = {
    employees: {
        id: "employees",
        label: "Nhân sự",
        tableName: "employees",
        description: "Bảng employees chứa thông tin nhân sự mẫu.",
        columns: ["id", "name", "department", "role", "salary", "status", "location"],
    },
    orders: {
        id: "orders",
        label: "Đơn hàng",
        tableName: "orders",
        description: "Bảng orders chứa đơn hàng e-commerce mẫu.",
        columns: ["id", "customer_name", "product_id", "quantity", "total_amount", "status", "city"],
    },
    products: {
        id: "products",
        label: "Sản phẩm",
        tableName: "products",
        description: "Bảng products chứa danh mục sản phẩm.",
        columns: ["id", "name", "category", "price", "stock", "status"],
    },
    candidate_funnel: {
        id: "candidate_funnel",
        label: "Phễu ứng viên",
        tableName: "candidate_funnel",
        description: "Bảng candidate_funnel chứa dữ liệu tuyển dụng mẫu.",
        columns: [
            "id",
            "name",
            "source",
            "status",
            "assessment_score",
            "years_experience",
        ],
    },
    marketing_performance: {
        id: "marketing_performance",
        label: "Hiệu quả marketing",
        tableName: "marketing_performance",
        description: "Bảng marketing_performance chứa dữ liệu chiến dịch.",
        columns: ["id", "channel", "campaign", "spend", "leads", "conversions", "status"],
    },
};

export const EMPLOYEES_DATA = [
    { id: 1, name: "An Nguyen", department: "Engineering", role: "Frontend Developer", salary: 1200, status: "active", location: "Hanoi" },
    { id: 2, name: "Binh Tran", department: "Marketing", role: "Content Executive", salary: 900, status: "active", location: "Ho Chi Minh City" },
    { id: 3, name: "Chi Le", department: "Engineering", role: "Backend Developer", salary: 1400, status: "active", location: "Da Nang" },
    { id: 4, name: "Dung Pham", department: "Sales", role: "Sales Intern", salary: 600, status: "inactive", location: "Hanoi" },
    { id: 5, name: "Ha Do", department: "HR", role: "Recruiter", salary: 1000, status: "active", location: "Ho Chi Minh City" },
    { id: 6, name: "Minh Vo", department: "Engineering", role: "QA Engineer", salary: 1100, status: "inactive", location: "Da Nang" },
    { id: 7, name: "Linh Pham", department: "Finance", role: "Accountant", salary: 1050, status: "active", location: "Hanoi" },
    { id: 8, name: "Quan Le", department: "Sales", role: "Sales Executive", salary: 950, status: "active", location: "Can Tho" },
];

export const ORDERS_DATA = [
    { id: 101, customer_name: "Nguyen Van A", product_id: 1, quantity: 2, total_amount: 2400, status: "completed", city: "Hanoi" },
    { id: 102, customer_name: "Tran Thi B", product_id: 2, quantity: 1, total_amount: 1500, status: "pending", city: "Da Nang" },
    { id: 103, customer_name: "Le Van C", product_id: 3, quantity: 3, total_amount: 900, status: "cancelled", city: "Ho Chi Minh City" },
    { id: 104, customer_name: "Pham Thi D", product_id: 1, quantity: 1, total_amount: 1200, status: "completed", city: "Hanoi" },
    { id: 105, customer_name: "Hoang Van E", product_id: 4, quantity: 5, total_amount: 3500, status: "completed", city: "Can Tho" },
];

export const PRODUCTS_DATA = [
    { id: 1, name: "Laptop Pro 14", category: "Laptop", price: 1200, stock: 15, status: "active" },
    { id: 2, name: "Mechanical Keyboard", category: "Accessory", price: 150, stock: 40, status: "active" },
    { id: 3, name: "Wireless Mouse", category: "Accessory", price: 30, stock: 80, status: "active" },
    { id: 4, name: "Gaming Monitor", category: "Monitor", price: 700, stock: 12, status: "active" },
    { id: 5, name: "Old Office PC", category: "Desktop", price: 400, stock: 0, status: "inactive" },
];

export const CANDIDATE_FUNNEL_DATA = [
    { id: 1, name: "An Nguyen", source: "LinkedIn", status: "Applied", assessment_score: 65, years_experience: 0 },
    { id: 2, name: "Binh Tran", source: "LinkedIn", status: "Interview", assessment_score: 82, years_experience: 1 },
    { id: 3, name: "Chi Le", source: "Referral", status: "Offer", assessment_score: 88, years_experience: 2 },
    { id: 4, name: "Dung Pham", source: "Facebook", status: "Rejected", assessment_score: 45, years_experience: 0 },
    { id: 5, name: "Ha Do", source: "LinkedIn", status: "Offer", assessment_score: 91, years_experience: 1 },
    { id: 6, name: "Minh Vo", source: "Referral", status: "Applied", assessment_score: 73, years_experience: 0 },
    { id: 7, name: "Linh Pham", source: "LinkedIn", status: "Interview", assessment_score: 76, years_experience: 1 },
    { id: 8, name: "Quan Tran", source: "University", status: "Applied", assessment_score: 59, years_experience: 0 },
];

export const MARKETING_PERFORMANCE_DATA = [
    { id: 1, channel: "Facebook", campaign: "Summer Sale", spend: 1200, leads: 240, conversions: 36, status: "active" },
    { id: 2, channel: "Google", campaign: "Search Ads", spend: 2000, leads: 310, conversions: 62, status: "active" },
    { id: 3, channel: "TikTok", campaign: "Video Launch", spend: 900, leads: 180, conversions: 21, status: "paused" },
    { id: 4, channel: "LinkedIn", campaign: "B2B Leads", spend: 1500, leads: 90, conversions: 18, status: "active" },
    { id: 5, channel: "Email", campaign: "Reactivation", spend: 300, leads: 120, conversions: 28, status: "completed" },
];

export function getDatasetRows(id: DatasetId): Record<string, string | number>[] {
    switch (id) {
        case "employees":
            return EMPLOYEES_DATA.map((r) => ({ ...r }));
        case "orders":
            return ORDERS_DATA.map((r) => ({ ...r }));
        case "products":
            return PRODUCTS_DATA.map((r) => ({ ...r }));
        case "candidate_funnel":
            return CANDIDATE_FUNNEL_DATA.map((r) => ({ ...r }));
        case "marketing_performance":
            return MARKETING_PERFORMANCE_DATA.map((r) => ({ ...r }));
        default:
            return [];
    }
}
