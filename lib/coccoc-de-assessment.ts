/** Cốc Cốc DE Intern Assessment — submission review practice */

export const COCCOC_DE_ASSESSMENT_PROGRAM = {
    id: "coccoc-de-intern-assessment",
    company: "Cốc Cốc",
    companyId: "coccoc",
    title: "Cốc Cốc · DE Intern Assessment",
    vietnameseTitle: "Cốc Cốc · Chấm bài DE Intern Assessment",
    programTitleEn: "Cốc Cốc · DE Intern Assessment",
    role: "Data Engineering Intern",
    team: "Data Platform",
    description:
        "Upload bài làm assessment và xem hệ thống chấm lỗi format, similarity, README, deadline, khả năng chạy, chất lượng giải thích và LLM review.",
    estimatedTime: "3 ngày",
    difficulty: "Intern / Entry-level",
    taskCount: 1,
    passThreshold: 75,
    badge: "Cốc Cốc · DE Assessment Review",
};

export const COCCOC_DE_TASK = {
    id: "de-intern-package",
    title: "Nộp bài DE Intern Assessment",
    scenario:
        "Bạn đang luyện tập một bài assessment cho vị trí Data Engineering Intern tại Cốc Cốc. Bạn cần nộp một package gồm code, README và phần giải thích cách chạy. Hệ thống Provable sẽ chấm bài theo review pipeline.",
};

export const COCCOC_DE_EXPECTED_PACKAGE = [
    "README.md",
    "Source code (main.py, pipeline.py, solution.sql, notebook.ipynb, …)",
    "Giải thích approach",
    "Setup / run instructions",
    "Assumptions",
    "Output sample hoặc expected result",
];

export const COCCOC_DE_ACCEPTED_FORMATS = [
    { ext: ".zip", note: "Ưu tiên" },
    { ext: ".tar.gz", note: "Chấp nhận" },
    { ext: ".md", note: "Văn bản" },
    { ext: ".txt", note: "Văn bản" },
    { ext: ".pdf", note: "Cảnh báo" },
    { ext: ".docx", note: "Cảnh báo" },
];

export const COCCOC_DE_PASS_CRITERIA = [
    "Package đúng format, đúng hạn",
    "README đủ: problem, approach, setup, run, assumptions, output",
    "Code có thể chạy hoặc hướng dẫn rõ",
    "Similarity / template risk thấp",
    "Không còn placeholder rỗng",
    "LLM review ≥ Pass",
];

export const COCCOC_DE_REQUIRED_SECTIONS = [
    "README",
    "Problem understanding",
    "Approach / Solution design",
    "Setup instructions",
    "Run instructions",
    "Assumptions",
    "Output / result explanation",
    "Limitations / trade-offs",
];

export const RELATED_LEARN_COCCOC_DE = [
    { label: "SQL JOIN", href: "/learn/sql?skill=sql-join" },
    { label: "Data reasoning", href: "/learn" },
];
