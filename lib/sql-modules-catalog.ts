/** Full SQL module roadmap (display + preview; not all are playable) */

export type SqlModuleStatus = "available" | "preview" | "coming_soon";

export type SqlModuleCatalogItem = {
    id: string;
    title: string;
    shortDescription: string;
    skillTags: string[];
    status: SqlModuleStatus;
    confidenceQuestion?: string;
};

export const SQL_MODULES_CATALOG: SqlModuleCatalogItem[] = [
    {
        id: "select-basic",
        title: "SELECT cơ bản",
        shortDescription: "Đọc dữ liệu từ bảng.",
        skillTags: ["SELECT", "FROM"],
        status: "available",
        confidenceQuestion: "Bạn đã từng dùng SELECT để đọc dữ liệu từ bảng chưa?",
    },
    {
        id: "select-columns",
        title: "SELECT cột cụ thể",
        shortDescription: "Chọn đúng cột cần thiết thay vì SELECT *.",
        skillTags: ["SELECT", "Columns"],
        status: "available",
    },
    {
        id: "where-basic",
        title: "WHERE",
        shortDescription: "Lọc dòng theo điều kiện.",
        skillTags: ["WHERE", "Filtering"],
        status: "available",
    },
    {
        id: "comparison",
        title: "Toán tử so sánh",
        shortDescription: "=, >, <, >=, <= trong WHERE.",
        skillTags: ["WHERE", "Operators"],
        status: "preview",
    },
    {
        id: "and-or",
        title: "AND / OR",
        shortDescription: "Kết hợp nhiều điều kiện.",
        skillTags: ["AND", "OR"],
        status: "available",
    },
    {
        id: "order-by",
        title: "ORDER BY",
        shortDescription: "Sắp xếp kết quả truy vấn.",
        skillTags: ["ORDER BY", "Sorting"],
        status: "preview",
    },
    {
        id: "limit",
        title: "LIMIT",
        shortDescription: "Giới hạn số dòng trả về.",
        skillTags: ["LIMIT"],
        status: "preview",
    },
    {
        id: "update-safety",
        title: "UPDATE an toàn",
        shortDescription: "Cập nhật dữ liệu có kiểm soát.",
        skillTags: ["UPDATE", "Safety"],
        status: "available",
    },
    {
        id: "delete-safety",
        title: "DELETE an toàn",
        shortDescription: "Xóa dòng có kiểm soát.",
        skillTags: ["DELETE", "Safety"],
        status: "available",
    },
    {
        id: "mini-project",
        title: "Mini project",
        shortDescription: "Tổng hợp SELECT, WHERE, UPDATE, DELETE.",
        skillTags: ["Project", "SQL"],
        status: "coming_soon",
    },
];
