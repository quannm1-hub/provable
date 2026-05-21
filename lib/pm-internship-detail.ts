import { documentTasks } from "./document-tasks";

export const PM_INTERVIEW_PROGRAM = {
    id: "novatech-pm-interview",
    company: "NovaTech",
    initials: "NT",
    programTitleEn: "Associate Product Manager Interview Simulation",
    programTitle: "Mô phỏng phỏng vấn Associate Product Manager",
    role: "Associate Product Manager",
    team: "Product Platform Team",
    description:
        "Hoàn thành một PRD cho tính năng Provable Coach dựa trên brief sản phẩm — tải template, điền ngoài app, upload và nhận đánh giá mock.",
    estimatedTime: "30-45 phút",
    taskCount: 1,
    difficulty: "Cơ bản",
    format: "Tự học theo tốc độ cá nhân",
    skills: [
        "Product Thinking",
        "PRD Writing",
        "Requirement Analysis",
        "User Flow",
        "Success Metrics",
    ],
};

export const PM_TASK_TIMELINE = [
    {
        number: 1,
        title: "Đọc product brief",
        desc: "Hiểu bối cảnh Provable Coach và yêu cầu nghiệp vụ.",
    },
    {
        number: 2,
        title: "Tải template PRD",
        desc: "Tải file provable-coach-prd-template.md.",
    },
    {
        number: 3,
        title: "Hoàn thiện tài liệu",
        desc: "Điền PRD ngoài app (Word, Notion, hoặc editor markdown).",
    },
    {
        number: 4,
        title: "Upload bài làm",
        desc: "Nộp file .md, .txt, .pdf hoặc .docx (mock).",
    },
    {
        number: 5,
        title: "Nhận đánh giá",
        desc: "So sánh với đáp án tham khảo — pass từ 90%.",
    },
];

export const PM_HOW_IT_WORKS = [
    { step: 1, title: "Đọc brief", desc: "Nắm bối cảnh và mục tiêu tính năng Provable Coach." },
    { step: 2, title: "Tải template", desc: "Dùng khung PRD chuẩn 12 mục." },
    { step: 3, title: "Hoàn thiện & upload", desc: "Làm việc ngoài app rồi nộp file." },
    { step: 4, title: "Chấm & đối chiếu", desc: "Xem điểm trùng khớp và mở đáp án tham khảo." },
];

export const PM_VALUE_PROPS = [
    {
        title: "Task không phải SQL",
        desc: "Mô phỏng công việc PM: viết PRD thay vì viết query.",
    },
    {
        title: "Upload & chấm mock",
        desc: "Demo workflow nộp tài liệu và so sánh đáp án tham khảo.",
    },
    {
        title: "Tiêu chí rõ ràng",
        desc: "Pass khi độ trùng khớp ≥ 90% (rule-based trong prototype).",
    },
    {
        title: "Phù hợp demo 3–5 phút",
        desc: "Tải template → upload file mẫu → chấm → pass.",
    },
];

export const PM_DOCUMENT_TASK = documentTasks[0]!;
