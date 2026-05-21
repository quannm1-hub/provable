import type { CourseModule, SimulationTask } from "./types";
import {
    checkAndOr,
    checkDelete,
    checkSelectAll,
    checkSelectColumns,
    checkUpdate,
    checkWhere,
} from "./sql-validator";

/** Playable modules in demo SQL learning path */
export const MODULE_COUNT = 5;

export const courseModules: CourseModule[] = [
    {
        id: "select",
        index: 1,
        title: "SELECT",
        confidenceQuestion:
            "Bạn đã từng dùng SELECT để đọc dữ liệu từ một bảng chưa?",
        detailedExplanation:
            "SELECT dùng để chọn những cột bạn muốn đọc từ bảng. Nếu dùng SELECT *, nghĩa là bạn muốn lấy tất cả các cột.",
        shortRecap:
            "SELECT chọn cột. SELECT * trả về mọi cột từ bảng.",
        example: "SELECT * FROM employees;",
        miniQuestion: {
            prompt: "SELECT * có nghĩa là gì?",
            options: [
                { id: "A", label: "Chọn một cột" },
                { id: "B", label: "Chọn tất cả cột" },
                { id: "C", label: "Xóa tất cả dòng" },
                { id: "D", label: "Cập nhật tất cả dòng" },
            ],
            correctId: "B",
            wrongFeedback: {
                A: "SELECT * không giới hạn một cột.",
                C: "SELECT đọc dữ liệu; không xóa.",
                D: "SELECT đọc dữ liệu; UPDATE mới thay đổi dữ liệu.",
            },
            correctFeedback: "Đúng. SELECT * nghĩa là lấy tất cả các cột từ bảng.",
        },
        exercises: {
            beginner: {
                level: "beginner",
                prompt: "Hiển thị toàn bộ dữ liệu trong bảng employees.",
                starterCode: "SELECT \nFROM employees;",
                hint: "Dùng SELECT * FROM employees;",
                scaffold: "SELECT * FROM employees;",
                validate: checkSelectAll,
            },
            medium: {
                level: "medium",
                prompt: "Hiển thị chỉ cột name và department từ employees.",
                starterCode: "SELECT \nFROM employees;",
                hint: "SELECT name, department FROM employees;",
                scaffold: "SELECT name, department FROM employees;",
                validate: (q) => checkSelectColumns(q, ["name", "department"]),
            },
            advanced: {
                level: "advanced",
                prompt: "Hiển thị name, role và salary từ employees.",
                starterCode: "SELECT \nFROM employees;",
                hint: "SELECT name, role, salary FROM employees;",
                scaffold: "SELECT name, role, salary FROM employees;",
                validate: (q) => checkSelectColumns(q, ["name", "role", "salary"]),
            },
        },
    },
    {
        id: "where",
        index: 2,
        title: "WHERE",
        confidenceQuestion:
            "Bạn đã hiểu cách dùng WHERE để lọc dòng dữ liệu chưa?",
        detailedExplanation:
            "WHERE dùng để lọc các dòng thỏa mãn điều kiện. Nếu không có WHERE, truy vấn thường trả về toàn bộ dữ liệu. Nếu có WHERE, SQL chỉ trả về các dòng khớp với điều kiện.",
        shortRecap:
            "WHERE lọc dòng sau FROM. Chỉ các dòng khớp mới được trả về.",
        example: "SELECT * FROM employees\nWHERE department = 'Engineering';",
        miniQuestion: {
            prompt: "WHERE department = 'Engineering' có tác dụng gì?",
            options: [
                { id: "A", label: "Đổi toàn bộ phòng ban thành Engineering" },
                { id: "B", label: "Chỉ lấy nhân sự thuộc phòng Engineering" },
                { id: "C", label: "Xóa nhân sự Engineering" },
                { id: "D", label: "Sắp xếp theo phòng ban" },
            ],
            correctId: "B",
            wrongFeedback: {
                A: "WHERE lọc; không đổi giá trị đã lưu.",
                C: "WHERE không xóa dòng.",
                D: "ORDER BY mới sắp xếp; WHERE lọc.",
            },
            correctFeedback: "Đúng. WHERE chỉ giữ các dòng khớp điều kiện.",
        },
        exercises: {
            beginner: {
                level: "beginner",
                prompt: "Lọc tất cả nhân sự có status = 'active'.",
                starterCode: "SELECT * FROM employees\n",
                hint: "Thêm WHERE status = 'active'",
                scaffold: "SELECT * FROM employees\nWHERE ______ = 'active';",
                validate: (q) => checkWhere(q, ["status", "active"]),
            },
            medium: {
                level: "medium",
                prompt: "Lọc tất cả nhân sự thuộc phòng Engineering.",
                starterCode: "SELECT * FROM employees\n",
                hint: "WHERE department = 'Engineering'",
                scaffold: "SELECT * FROM employees\nWHERE department = 'Engineering';",
                validate: (q) => checkWhere(q, ["department", "engineering"]),
            },
            advanced: {
                level: "advanced",
                prompt: "Lọc nhân sự có salary lớn hơn 1000.",
                starterCode: "SELECT * FROM employees\n",
                hint: "WHERE salary > 1000",
                scaffold: "SELECT * FROM employees\nWHERE salary > 1000;",
                validate: (q) => checkWhere(q, ["salary", ">"]),
            },
        },
    },
    {
        id: "and_or",
        index: 3,
        title: "AND / OR",
        confidenceQuestion:
            "Bạn đã biết cách kết hợp nhiều điều kiện bằng AND và OR chưa?",
        detailedExplanation:
            "AND nghĩa là tất cả điều kiện phải đúng. OR nghĩa là chỉ cần ít nhất một điều kiện đúng.",
        shortRecap:
            "Dùng AND khi mọi điều kiện phải khớp. Dùng OR khi chỉ cần một điều kiện khớp.",
        example: "SELECT * FROM employees\nWHERE department = 'Engineering' AND status = 'active';",
        miniQuestion: {
            prompt: "Khác nhau chính giữa AND và OR là gì?",
            options: [
                {
                    id: "A",
                    label: "AND yêu cầu tất cả điều kiện đúng, OR chỉ cần một điều kiện đúng",
                },
                { id: "B", label: "AND và OR giống hệt nhau" },
                {
                    id: "C",
                    label: "OR yêu cầu tất cả điều kiện, AND chỉ cần một",
                },
                { id: "D", label: "Không dùng được với WHERE" },
            ],
            correctId: "A",
            wrongFeedback: {
                B: "Chúng khác nhau khi kết hợp điều kiện.",
                C: "Bạn đã đảo AND và OR — thử lại.",
                D: "Cả hai đều thường dùng với WHERE.",
            },
            correctFeedback: "Đúng. AND = tất cả đúng, OR = ít nhất một đúng.",
        },
        exercises: {
            beginner: {
                level: "beginner",
                prompt: "Lọc các nhân sự đang active và thuộc phòng Engineering.",
                starterCode: "SELECT * FROM employees\nWHERE ",
                hint: "department = 'Engineering' AND status = 'active'",
                scaffold:
                    "SELECT * FROM employees\nWHERE department = 'Engineering' AND status = 'active';",
                validate: (q) =>
                    checkAndOr(q, {
                        and: true,
                        extras: ["department", "engineering", "status", "active"],
                    }),
            },
            medium: {
                level: "medium",
                prompt: "Lọc nhân sự thuộc Engineering hoặc HR.",
                starterCode: "SELECT * FROM employees\nWHERE ",
                hint: "department = 'Engineering' OR department = 'HR'",
                scaffold:
                    "SELECT * FROM employees\nWHERE department = 'Engineering' OR department = 'HR';",
                validate: (q) =>
                    checkAndOr(q, { or: true, extras: ["department", "engineering", "hr"] }),
            },
            advanced: {
                level: "advanced",
                prompt: "Lọc nhân sự active thuộc Engineering hoặc HR.",
                starterCode: "SELECT * FROM employees\nWHERE ",
                hint: "status = 'active' AND (department = 'Engineering' OR department = 'HR')",
                scaffold:
                    "SELECT * FROM employees\nWHERE status = 'active' AND (department = 'Engineering' OR department = 'HR');",
                validate: (q) =>
                    checkAndOr(q, {
                        and: true,
                        or: true,
                        extras: ["status", "active", "engineering", "hr"],
                    }),
            },
        },
    },
    {
        id: "update",
        index: 4,
        title: "UPDATE",
        confidenceQuestion:
            "Bạn đã hiểu cách UPDATE thay đổi dữ liệu có sẵn chưa?",
        detailedExplanation:
            "UPDATE dùng để thay đổi dữ liệu trong các dòng đã tồn tại. Trong công việc thật, UPDATE không có WHERE có thể cập nhật nhầm toàn bộ bảng. Đây là loại lỗi khiến cả team im lặng rất lâu.",
        shortRecap:
            "UPDATE bảng SET cột = giá trị WHERE điều kiện. Luôn lọc bằng WHERE.",
        example: "UPDATE employees\nSET status = 'active'\nWHERE id = 4;",
        miniQuestion: {
            prompt: "Vì sao WHERE quan trọng khi dùng UPDATE?",
            options: [
                { id: "A", label: "Chỉ làm truy vấn chạy nhanh hơn" },
                { id: "B", label: "Nó giới hạn những dòng sẽ bị thay đổi" },
                { id: "C", label: "Nó xóa dòng inactive" },
                { id: "D", label: "Nó tự tạo bảng mới" },
            ],
            correctId: "B",
            wrongFeedback: {
                A: "Hiệu năng không phải lý do an toàn chính ở đây.",
                C: "DELETE mới xóa; UPDATE thay đổi.",
                D: "UPDATE sửa dòng; không tạo bảng mới.",
            },
            correctFeedback: "Đúng. WHERE giới hạn dòng nào được cập nhật.",
        },
        exercises: {
            beginner: {
                level: "beginner",
                prompt: "Viết truy vấn cập nhật status của nhân sự có id = 4 thành 'active'.",
                starterCode: "UPDATE employees\nSET \n",
                hint: "SET status = 'active' WHERE id = 4",
                scaffold: "UPDATE employees\nSET status = 'active'\nWHERE id = 4;",
                validate: (q) => checkUpdate(q, ["status", "active", "id", "4"]),
            },
            medium: {
                level: "medium",
                prompt: "Cập nhật status của Minh Vo thành active.",
                starterCode: "UPDATE employees\nSET \n",
                hint: "WHERE name = 'Minh Vo'",
                scaffold: "UPDATE employees\nSET status = 'active'\nWHERE name = 'Minh Vo';",
                validate: (q) => checkUpdate(q, ["status", "active", "minh vo"]),
            },
            advanced: {
                level: "advanced",
                prompt: "Tăng salary lên 1500 cho Backend Developer.",
                starterCode: "UPDATE employees\nSET \n",
                hint: "SET salary = 1500 WHERE role = 'Backend Developer'",
                scaffold:
                    "UPDATE employees\nSET salary = 1500\nWHERE role = 'Backend Developer';",
                validate: (q) =>
                    checkUpdate(q, ["salary", "1500", "backend developer"]),
            },
        },
    },
    {
        id: "delete",
        index: 5,
        title: "DELETE",
        confidenceQuestion:
            "Bạn đã hiểu cách DELETE xóa dòng dữ liệu chưa?",
        detailedExplanation:
            "DELETE dùng để xóa dòng khỏi bảng. DELETE không có WHERE có thể xóa toàn bộ bảng. Trong công việc thật, trước khi DELETE nên kiểm tra kỹ những dòng sẽ bị ảnh hưởng.",
        shortRecap:
            "DELETE FROM bảng WHERE điều kiện. Không DELETE thiếu WHERE trừ khi bạn cố ý.",
        example: "DELETE FROM employees\nWHERE id = 6;",
        miniQuestion: {
            prompt: "Điều gì có thể xảy ra nếu chạy DELETE FROM employees mà không có WHERE?",
            options: [
                { id: "A", label: "Có thể xóa toàn bộ dòng trong bảng" },
                { id: "B", label: "Chỉ xóa một dòng ngẫu nhiên" },
                { id: "C", label: "Tự tạo bản sao lưu" },
                { id: "D", label: "Chỉ hiển thị dữ liệu" },
            ],
            correctId: "A",
            wrongFeedback: {
                B: "Không có WHERE thì mọi dòng đều có thể bị xóa.",
                C: "DELETE không tự tạo backup.",
                D: "DELETE xóa dữ liệu; SELECT mới hiển thị.",
            },
            correctFeedback: "Đúng. Không có WHERE có thể xóa mọi dòng.",
        },
        exercises: {
            beginner: {
                level: "beginner",
                prompt: "Xóa nhân sự inactive có id = 6.",
                starterCode: "DELETE FROM employees\n",
                hint: "WHERE id = 6",
                scaffold: "DELETE FROM employees\nWHERE id = 6;",
                validate: (q) => checkDelete(q, ["id", "6"]),
            },
            medium: {
                level: "medium",
                prompt: "Xóa nhân sự có status là inactive.",
                starterCode: "DELETE FROM employees\n",
                hint: "WHERE status = 'inactive'",
                scaffold: "DELETE FROM employees\nWHERE status = 'inactive';",
                validate: (q) => checkDelete(q, ["status", "inactive"]),
            },
            advanced: {
                level: "advanced",
                prompt: "Xóa nhân sự inactive thuộc phòng Sales.",
                starterCode: "DELETE FROM employees\n",
                hint: "WHERE status = 'inactive' AND department = 'Sales'",
                scaffold:
                    "DELETE FROM employees\nWHERE status = 'inactive' AND department = 'Sales';",
                validate: (q) =>
                    checkDelete(q, ["status", "inactive", "department", "sales"]),
            },
        },
    },
];

export const simulationIntro = {
    company: "Cốc Cốc",
    role: "Thực tập sinh Data Operations",
    mission:
        "Bạn gia nhập mô phỏng Cốc Cốc với vai trò thực tập sinh. Quản lý yêu cầu kiểm tra và làm sạch dữ liệu nhân sự trước báo cáo hàng tháng.",
};

export const simulationTasks: SimulationTask[] = [
    {
        id: "sim-1",
        title: "Task SELECT",
        prompt: "Hiển thị name, department và role của tất cả nhân sự.",
        starterCode: "SELECT \nFROM employees;",
        hint: "SELECT name, department, role FROM employees;",
        validate: (q) => checkSelectColumns(q, ["name", "department", "role"]),
    },
    {
        id: "sim-2",
        title: "Task WHERE",
        prompt: "Lọc nhân sự Engineering đang active.",
        starterCode: "SELECT * FROM employees\nWHERE ",
        hint: "department = 'Engineering' AND status = 'active'",
        validate: (q) =>
            checkAndOr(q, {
                and: true,
                extras: ["department", "engineering", "status", "active"],
            }),
    },
    {
        id: "sim-3",
        title: "Task UPDATE",
        prompt: "Chuẩn bị truy vấn đổi nhân sự Engineering inactive thành active.",
        starterCode: "UPDATE employees\nSET \nWHERE ",
        hint: "SET status = 'active' WHERE department = 'Engineering' AND status = 'inactive'",
        validate: (q) =>
            checkUpdate(q, [
                "status",
                "active",
                "department",
                "engineering",
                "inactive",
            ]),
    },
    {
        id: "sim-4",
        title: "Task DELETE",
        prompt: "Chuẩn bị truy vấn xóa nhân sự Sales inactive.",
        starterCode: "DELETE FROM employees\nWHERE ",
        hint: "status = 'inactive' AND department = 'Sales'",
        validate: (q) =>
            checkDelete(q, ["status", "inactive", "department", "sales"]),
    },
];

export function exerciseForConfidence(
    mod: CourseModule,
    confidence: import("./types").Confidence,
) {
    if (confidence === "none") return mod.exercises.beginner;
    if (confidence === "little") return mod.exercises.medium;
    return mod.exercises.advanced;
}
