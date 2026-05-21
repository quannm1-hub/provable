export type ResourceItem = {
    id: string;
    title: string;
    type: "Hướng dẫn" | "Checklist" | "Ví dụ";
    estimatedTime: string;
    summary: string;
    body: string;
};

const DEFAULT_RESOURCES: ResourceItem[] = [
    {
        id: "r-sql-basics",
        title: "Đọc bảng trước khi sửa",
        type: "Checklist",
        estimatedTime: "2 phút",
        summary: "Luôn SELECT trước khi UPDATE hoặc DELETE.",
        body: "Trong công việc thật, team thường chạy SELECT với cùng điều kiện WHERE trước khi thay đổi dữ liệu.",
    },
];

const BY_TASK: Record<string, ResourceItem[]> = {
    "novatech-briefing": [
        {
            id: "b1",
            title: "Cấu trúc chương trình mô phỏng",
            type: "Hướng dẫn",
            estimatedTime: "3 phút",
            summary: "Cách đi từ brief đến nộp task.",
            body: "1. Đọc brief\n2. Viết SQL\n3. Chạy thử\n4. Nộp task\n5. Mở đáp án mẫu\n6. Task tiếp theo",
        },
    ],
    "novatech-inspect-employees": [
        {
            id: "s1",
            title: "SQL SELECT là gì?",
            type: "Hướng dẫn",
            estimatedTime: "3 phút",
            summary: "SELECT dùng để đọc dữ liệu từ bảng.",
            body: "SELECT chọn cột. FROM chỉ định bảng. SELECT * lấy tất cả cột.",
        },
        {
            id: "s2",
            title: "Cách đọc toàn bộ bảng",
            type: "Ví dụ",
            estimatedTime: "2 phút",
            summary: "SELECT * FROM employees;",
            body: "Dùng khi cần xem toàn bộ dữ liệu trước khi lọc hoặc chỉnh sửa.",
        },
        {
            id: "s3",
            title: "Khi nào nên dùng SELECT *?",
            type: "Hướng dẫn",
            estimatedTime: "2 phút",
            summary: "Khi khám phá dữ liệu lần đầu.",
            body: "Sau khi hiểu cấu trúc, nên chọn cột cụ thể cho báo cáo.",
        },
    ],
    "salary-review": [
        {
            id: "sal1",
            title: "So sánh số với ngưỡng",
            type: "Hướng dẫn",
            estimatedTime: "2 phút",
            summary: "salary > 1000 nghĩa là lớn hơn 1000.",
            body: "Kết hợp status = 'active' với điều kiện lương khi báo cáo tài chính yêu cầu.",
        },
    ],
    "novatech-active-engineering": [
        {
            id: "w1",
            title: "Kết hợp điều kiện với AND",
            type: "Hướng dẫn",
            estimatedTime: "3 phút",
            summary: "Nhiều điều kiện cùng lúc dùng AND.",
            body: "WHERE department = 'Engineering' AND status = 'active'",
        },
        {
            id: "w2",
            title: "Đọc yêu cầu nghiệp vụ trước",
            type: "Checklist",
            estimatedTime: "2 phút",
            summary: "Xác nhận từng điều kiện trong brief.",
            body: "Phòng ban? Trạng thái? Ngưỡng lương? Ghi ra trước khi viết SQL.",
        },
    ],
    "novatech-safe-update": [
        {
            id: "u1",
            title: "Vì sao UPDATE cần WHERE?",
            type: "Hướng dẫn",
            estimatedTime: "3 phút",
            summary: "WHERE giới hạn dòng bị thay đổi.",
            body: "UPDATE không có WHERE có thể cập nhật cả bảng — rủi ro cao trong production.",
        },
        {
            id: "u2",
            title: "Checklist trước khi cập nhật",
            type: "Checklist",
            estimatedTime: "2 phút",
            summary: "SELECT → xác nhận → UPDATE.",
            body: "1. Viết SELECT với cùng WHERE\n2. Kiểm tra số dòng\n3. Viết UPDATE an toàn",
        },
    ],
    "novatech-safe-delete": [
        {
            id: "d1",
            title: "DELETE không WHERE nguy hiểm thế nào?",
            type: "Hướng dẫn",
            estimatedTime: "3 phút",
            summary: "Có thể xóa toàn bộ bảng.",
            body: "Luôn preview bằng SELECT trước khi DELETE.",
        },
        {
            id: "d2",
            title: "Cách viết DELETE an toàn",
            type: "Checklist",
            estimatedTime: "2 phút",
            summary: "WHERE rõ ràng, preview trước.",
            body: "DELETE FROM employees WHERE status = 'inactive' AND department = 'Sales';",
        },
    ],
};

export function getResourcesForTask(taskId: string): ResourceItem[] {
    return BY_TASK[taskId] ?? DEFAULT_RESOURCES;
}
