import type { QuickReply } from "./chat-types";
import type { SkillId } from "./sql-skill-map";
import {
    checkAndOr,
    checkDelete,
    checkOrderBy,
    checkSelectAll,
    checkUpdate,
    checkWhere,
} from "./sql-validator";
import type { ValidationResult } from "./types";

export const INTERNSHIP_META = {
    programTitle: "Thực tập ảo Data Operations tại NovaTech",
    featureName: "Mô phỏng thực tập doanh nghiệp",
    company: "NovaTech",
    role: "Thực tập sinh Data Operations",
    roleSubtitle: "Junior Data Operations Intern",
    department: "People Operations",
    manager: "Linh Pham",
    managerTitle: "Quản lý People Operations",
    project: "Báo cáo nhân sự hàng tháng",
    duration: "Thời gian ước tính: 20-30 phút",
    difficulty: "Dành cho người mới",
    taskCount: 7,
    badge: "SQL Workplace Starter",
    disclaimer:
        "Mô phỏng tự học — không phải thực tập hay việc làm thật. Luyện task giống công việc và đối chiếu với đáp án mẫu.",
    intro:
        "Chào mừng đến chương trình mô phỏng Data Operations tại NovaTech. Đây là brief từ quản lý của bạn: team People Operations cần bạn hỗ trợ rà soát dữ liệu nhân sự trước báo cáo hàng tháng. Bạn cần nộp từng truy vấn SQL đáp ứng yêu cầu nghiệp vụ — sau khi nộp đúng, bạn sẽ mở khóa đáp án mẫu để so sánh.",
    skills: [
        "Đọc dữ liệu dạng bảng",
        "Chọn cột liên quan",
        "Lọc dòng bằng WHERE",
        "Kết hợp điều kiện AND / OR",
        "Viết UPDATE an toàn",
        "Viết DELETE an toàn",
        "Giải thích tư duy nghiệp vụ",
    ],
    managerMessage:
        "Trước khi báo cáo gửi lãnh đạo, team cần kiểm tra headcount active, nhân sự Engineering và các thay đổi dữ liệu không an toàn. Hoàn thành các task SQL bên dưới và đối chiếu với đáp án mẫu.",
};

export type SimulationSubStep =
    | "briefing"
    | "working"
    | "submitted"
    | "modelAnswer"
    | "reflection";

export type InternshipTask = {
    id: string;
    stepIndex: number;
    stepLabel: string;
    title: string;
    workplaceContext: string;
    instruction: string;
    expectedDeliverable: string;
    starterQuery: string;
    modelAnswer: string;
    hint: string;
    skillTags: string[];
    requiredSkills: SkillId[];
    relatedLearnModules: string[];
    validate: (query: string) => ValidationResult;
    successFeedback: string;
    reflectionQuestion: string;
    reflectionOptions: QuickReply[];
    correctReflectionAction: string;
    isBriefing?: boolean;
};

export const PROGRESS_STEPS = [
    "Brief",
    "Kiểm tra",
    "Lọc",
    "Lương",
    "Cập nhật",
    "Xóa",
    "Hoàn thành",
];

/** Maps task stepIndex to progress bar index (order-by shares Salary Review slot). */
export function progressIndexForTask(stepIndex: number): number {
    if (stepIndex <= 0) return 0;
    if (stepIndex <= 3) return stepIndex;
    if (stepIndex === 4) return 3;
    if (stepIndex === 5) return 4;
    if (stepIndex === 6) return 5;
    return 6;
}

export const internshipTasks: InternshipTask[] = [
    {
        id: "novatech-briefing",
        stepIndex: 0,
        stepLabel: "Giới thiệu dự án",
        title: "Nhận brief dự án",
        workplaceContext: INTERNSHIP_META.project,
        instruction:
            "Xem tóm tắt thực tập và chuẩn bị hỗ trợ báo cáo nhân sự hàng tháng.",
        expectedDeliverable: "Xác nhận bạn hiểu phạm vi dự án.",
        starterQuery: "",
        modelAnswer: "",
        hint: "",
        skillTags: ["Onboarding"],
        requiredSkills: [],
        relatedLearnModules: [],
        validate: () => ({ ok: true, feedback: "" }),
        successFeedback: "",
        reflectionQuestion: "",
        reflectionOptions: [],
        correctReflectionAction: "",
        isBriefing: true,
    },
    {
        id: "novatech-inspect-employees",
        stepIndex: 1,
        stepLabel: "Kiểm tra dữ liệu",
        title: "Kiểm tra dữ liệu nhân sự",
        workplaceContext:
            "Quản lý muốn xem nhanh dữ liệu hiện có trước khi team thực hiện các bước lọc hoặc chỉnh sửa.",
        instruction:
            "Viết truy vấn SQL để hiển thị toàn bộ dữ liệu trong bảng employees.",
        expectedDeliverable: "Một câu truy vấn SQL trả về toàn bộ bảng employees.",
        starterQuery: "SELECT \nFROM employees;",
        modelAnswer: "SELECT * FROM employees;",
        hint: "Bắt đầu với SELECT * FROM employees;",
        skillTags: ["SELECT", "Kiểm tra dữ liệu"],
        requiredSkills: ["sql-select"],
        relatedLearnModules: ["select-basic"],
        validate: checkSelectAll,
        successFeedback:
            "Tốt. Bạn đã kiểm tra dữ liệu trước khi đưa ra quyết định. Trong công việc thật, đây là bước nên làm trước khi lọc, cập nhật hoặc xóa dữ liệu.",
        reflectionQuestion: "Vì sao nên xem dữ liệu trước khi viết truy vấn cụ thể hơn?",
        reflectionOptions: [
            {
                id: "r1",
                label: "Để hiểu các cột và giá trị có sẵn",
                action: "reflect:inspect:correct",
            },
            {
                id: "r2",
                label: "Để xóa dữ liệu xấu ngay lập tức",
                action: "reflect:inspect:wrong",
            },
            {
                id: "r3",
                label: "Để cập nhật mọi dòng nhanh hơn",
                action: "reflect:inspect:wrong2",
            },
        ],
        correctReflectionAction: "reflect:inspect:correct",
    },
    {
        id: "novatech-active-engineering",
        stepIndex: 2,
        stepLabel: "Lọc nhân sự",
        title: "Tìm nhân sự Engineering đang active",
        workplaceContext:
            "Quản lý Linh Pham cần danh sách nhân sự Engineering đang active để chuẩn bị báo cáo nhân sự hàng tháng.",
        instruction:
            "Viết truy vấn SQL lọc nhân sự có department là Engineering và status là active.",
        expectedDeliverable:
            "Một truy vấn SQL chỉ trả về nhân sự Engineering đang active.",
        starterQuery: "SELECT * FROM employees\nWHERE ",
        modelAnswer:
            "SELECT * FROM employees\nWHERE department = 'Engineering' AND status = 'active';",
        hint: "Dùng WHERE department = 'Engineering' AND status = 'active'",
        skillTags: ["WHERE", "AND", "Lọc nghiệp vụ"],
        requiredSkills: ["sql-select", "sql-where", "sql-and-or"],
        relatedLearnModules: ["select-basic", "where-basic", "and-or"],
        validate: (q) =>
            checkAndOr(q, {
                and: true,
                extras: ["department", "engineering", "status", "active"],
            }),
        successFeedback:
            "Tốt. Truy vấn trả lời rõ câu hỏi nghiệp vụ bằng cách kết hợp phòng ban và trạng thái.",
        reflectionQuestion: "Vì sao dùng AND ở đây thay vì OR?",
        reflectionOptions: [
            {
                id: "r1",
                label: "Vì cả hai điều kiện phải đúng",
                action: "reflect:eng:correct",
            },
            {
                id: "r2",
                label: "Vì chỉ cần một điều kiện đúng",
                action: "reflect:eng:wrong",
            },
            {
                id: "r3",
                label: "Vì AND tự cập nhật dữ liệu",
                action: "reflect:eng:wrong2",
            },
        ],
        correctReflectionAction: "reflect:eng:correct",
    },
    {
        id: "novatech-active-high-salary",
        stepIndex: 3,
        stepLabel: "Rà soát lương",
        title: "Xác định nhân sự cần rà soát lương",
        workplaceContext:
            "Tài chính cần danh sách nhân sự active có salary lớn hơn 1000 để rà soát lương.",
        instruction:
            "Viết truy vấn SQL tìm nhân sự active có salary lớn hơn 1000.",
        expectedDeliverable:
            "Một truy vấn SQL liệt kê nhân sự active có lương trên 1000.",
        starterQuery: "SELECT * FROM employees\nWHERE ",
        modelAnswer:
            "SELECT * FROM employees\nWHERE status = 'active' AND salary > 1000;",
        hint: "WHERE status = 'active' AND salary > 1000",
        skillTags: ["WHERE", "AND", "Lọc số"],
        requiredSkills: ["sql-select", "sql-where", "sql-comparison", "sql-and-or"],
        relatedLearnModules: [
            "select-basic",
            "where-basic",
            "comparison-operators",
            "and-or",
        ],
        validate: (q) => checkWhere(q, ["status", "active", "salary", ">"]),
        successFeedback:
            "Tốt. Bạn kết hợp điều kiện nghiệp vụ với ngưỡng số — đây là task báo cáo rất phổ biến.",
        reflectionQuestion: "salary > 1000 có nghĩa là gì?",
        reflectionOptions: [
            {
                id: "r1",
                label: "Lương lớn hơn 1000",
                action: "reflect:salary:correct",
            },
            {
                id: "r2",
                label: "Lương bằng đúng 1000",
                action: "reflect:salary:wrong",
            },
            {
                id: "r3",
                label: "Lương nhỏ hơn 1000",
                action: "reflect:salary:wrong2",
            },
        ],
        correctReflectionAction: "reflect:salary:correct",
    },
    {
        id: "novatech-sort-by-salary",
        stepIndex: 4,
        stepLabel: "Sắp xếp",
        title: "Sắp xếp nhân sự theo lương",
        workplaceContext:
            "HR muốn xem danh sách nhân sự active sắp theo lương từ cao xuống thấp để chuẩn bị báo cáo.",
        instruction:
            "Viết truy vấn SQL lọc nhân sự active và sắp xếp theo salary giảm dần (ORDER BY salary DESC).",
        expectedDeliverable: "Truy vấn SELECT có WHERE status = 'active' và ORDER BY salary DESC.",
        starterQuery: "SELECT * FROM employees\nWHERE status = 'active'\nORDER BY ",
        modelAnswer:
            "SELECT * FROM employees\nWHERE status = 'active'\nORDER BY salary DESC;",
        hint: "ORDER BY salary DESC sau mệnh đề WHERE",
        skillTags: ["ORDER BY", "Sorting"],
        requiredSkills: ["sql-select", "sql-order-by"],
        relatedLearnModules: ["select-basic", "order-by"],
        validate: (q) => {
            const w = checkWhere(q, ["status", "active"]);
            if (!w.ok) return w;
            return checkOrderBy(q, "desc");
        },
        successFeedback:
            "Tốt. Bạn đã kết hợp lọc và sắp xếp — kỹ năng quan trọng khi làm báo cáo nhân sự.",
        reflectionQuestion: "ORDER BY DESC có nghĩa là gì?",
        reflectionOptions: [
            {
                id: "r1",
                label: "Sắp xếp từ giá trị lớn đến nhỏ",
                action: "reflect:order:correct",
            },
            {
                id: "r2",
                label: "Sắp xếp từ nhỏ đến lớn",
                action: "reflect:order:wrong",
            },
            {
                id: "r3",
                label: "Xóa dòng có salary cao",
                action: "reflect:order:wrong2",
            },
        ],
        correctReflectionAction: "reflect:order:correct",
    },
    {
        id: "novatech-safe-update",
        stepIndex: 5,
        stepLabel: "Cập nhật an toàn",
        title: "Chuẩn bị cập nhật status an toàn",
        workplaceContext:
            "Quản lý nói Minh Vo đã quay lại làm việc. Bạn cần chuẩn bị truy vấn cập nhật status của Minh Vo.",
        instruction:
            "Viết truy vấn UPDATE an toàn để đặt status của Minh Vo thành active.",
        expectedDeliverable: "Một truy vấn UPDATE có mệnh đề WHERE.",
        starterQuery: "UPDATE employees\nSET \nWHERE ",
        modelAnswer:
            "UPDATE employees\nSET status = 'active'\nWHERE name = 'Minh Vo';",
        hint: "SET status = 'active' WHERE name = 'Minh Vo'",
        skillTags: ["UPDATE", "An toàn truy vấn"],
        requiredSkills: ["sql-update", "sql-where"],
        relatedLearnModules: ["update-safety", "where-basic"],
        validate: (q) => checkUpdate(q, ["status", "active", "name", "minh vo"]),
        successFeedback:
            "Tốt. Bạn dùng WHERE để chỉ nhắm Minh Vo — an toàn hơn là cập nhật cả bảng.",
        reflectionQuestion: "Vì sao WHERE quan trọng trong UPDATE?",
        reflectionOptions: [
            {
                id: "r1",
                label: "Nó giới hạn những dòng sẽ bị thay đổi",
                action: "reflect:update:correct",
            },
            {
                id: "r2",
                label: "Nó xóa dòng cũ",
                action: "reflect:update:wrong",
            },
            {
                id: "r3",
                label: "Nó làm SELECT không bắt buộc",
                action: "reflect:update:wrong2",
            },
        ],
        correctReflectionAction: "reflect:update:correct",
    },
    {
        id: "novatech-safe-delete",
        stepIndex: 6,
        stepLabel: "Xóa an toàn",
        title: "Chuẩn bị truy vấn xóa an toàn",
        workplaceContext:
            "Team People Operations muốn loại bỏ bản ghi intern Sales inactive khỏi tập dữ liệu báo cáo này.",
        instruction:
            "Viết truy vấn DELETE an toàn để xóa nhân sự inactive thuộc phòng Sales.",
        expectedDeliverable: "Một truy vấn DELETE có mệnh đề WHERE.",
        starterQuery: "DELETE FROM employees\nWHERE ",
        modelAnswer:
            "DELETE FROM employees\nWHERE status = 'inactive' AND department = 'Sales';",
        hint: "WHERE status = 'inactive' AND department = 'Sales'",
        skillTags: ["DELETE", "An toàn truy vấn"],
        requiredSkills: ["sql-delete", "sql-where", "sql-and-or"],
        relatedLearnModules: ["delete-safety", "where-basic", "and-or"],
        validate: (q) =>
            checkDelete(q, ["status", "inactive", "department", "sales"]),
        successFeedback:
            "Tốt. Bạn viết DELETE có mục tiêu rõ. Trong công việc thật, xem trước dòng bị ảnh hưởng trước khi xóa là thói quen rất quan trọng.",
        reflectionQuestion:
            "Trước khi chạy DELETE trong công việc thật, bạn nên làm gì?",
        reflectionOptions: [
            {
                id: "r1",
                label: "Xem trước các dòng sẽ bị ảnh hưởng",
                action: "reflect:delete:correct",
            },
            {
                id: "r2",
                label: "Bỏ WHERE để xóa nhanh hơn",
                action: "reflect:delete:wrong",
            },
            {
                id: "r3",
                label: "Chạy luôn không cần kiểm tra",
                action: "reflect:delete:wrong2",
            },
        ],
        correctReflectionAction: "reflect:delete:correct",
    },
];

export type SubmittedTaskRecord = {
    taskId: string;
    query: string;
    modelAnswer: string;
    feedback: string;
    skillTags: string[];
};

export function initialScores() {
    return {
        sqlFundamentals: 40,
        querySafety: 40,
        businessUnderstanding: 35,
        overall: 40,
    };
}

export function scoreForTask(task: InternshipTask, isUpdateOrDelete: boolean) {
    const sql = 15;
    const business = 10;
    const safety = isUpdateOrDelete ? 10 : 0;
    return { sql, business, safety, total: sql + business + safety };
}
