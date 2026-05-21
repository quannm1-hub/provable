export type ModelComparison = {
    good: string;
    improve: string;
    whyModel: string;
};

const COMPARISONS: Record<string, ModelComparison> = {
    "novatech-active-engineering": {
        good: "Bạn đã lọc đúng phòng ban Engineering.",
        improve:
            "Task yêu cầu nhân sự Engineering **đang active** — cần thêm điều kiện status.",
        whyModel:
            "Đáp án mẫu bổ sung `status = 'active'` để khớp đầy đủ yêu cầu nghiệp vụ từ quản lý.",
    },
    "inspect-data": {
        good: "Bạn đã đọc toàn bộ bảng employees — bước kiểm tra quan trọng.",
        improve: "Có thể chọn cột cụ thể nếu báo cáo không cần mọi cột.",
        whyModel: "SELECT * phù hợp khi khám phá dữ liệu lần đầu.",
    },
};

export function getModelComparison(taskId: string): ModelComparison | null {
    return COMPARISONS[taskId] ?? {
        good: "Truy vấn của bạn đáp ứng đúng yêu cầu task.",
        improve: "So sánh thêm với đáp án mẫu để thấy chi tiết tối ưu.",
        whyModel: "Đáp án mẫu phản ánh cách team NovaTech xử lý task tương tự.",
    };
}
