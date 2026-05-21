import type { CoccocSqlQuestionId } from "./coccoc-home-test-eval";

export const COCCOC_HOME_TEST_PROGRAM = {
    id: "coccoc-da-intern-home-test",
    company: "Cốc Cốc",
    initials: "CC",
    title: "Cốc Cốc - Home Test Data Analyst Intern",
    vietnameseTitle: "Mô phỏng Home Test Data Analyst Intern tại Cốc Cốc",
    programTitleEn: "Cốc Cốc DA Intern Home Test Simulation",
    role: "Data Analyst Intern",
    team: "Data / Product Analytics",
    description:
        "Luyện tập bài home test Data Analyst Intern gồm logic, SQL, clickstream analysis, điều tra DAU giảm, mobile metrics và nhận xét trải nghiệm sản phẩm.",
    estimatedTime: "2-3 giờ",
    difficulty: "Intern / Entry-level",
    passThreshold: 80,
    badge: "Cốc Cốc DA Intern Practice",
    sourceNote: "Dựa trên tài liệu home test được cung cấp trong file upload.",
    skills: [
        "SQL",
        "Analytical Skill",
        "Clickstream Analysis",
        "DAU",
        "Product Metrics",
        "Business Insight",
    ],
    weights: {
        logic: 0.15,
        sql: 0.25,
        clickstream: 0.25,
        investigation: 0.15,
        mobile: 0.1,
        reflection: 0.1,
    },
};

export const COCCOC_PARTS = [
    {
        id: 1 as const,
        title: "Logic / Analytical Skill Test",
        short: "Logic",
        estimatedTime: "30 phút",
        description:
            "Kiểm tra tư duy logic, nhận diện quy luật và suy luận phân tích.",
    },
    {
        id: 2 as const,
        title: "SQL Test",
        short: "SQL",
        estimatedTime: "60 phút",
        description: "Truy vấn Employee và AnnualReviews theo yêu cầu bài test.",
    },
    {
        id: 3 as const,
        title: "Open Analysis: Clickstream Metrics",
        short: "Clickstream",
        estimatedTime: "45-60 phút",
        description: "DAU, Facebook DAU, traffic theo giờ, top 10 domain.",
    },
    {
        id: 4 as const,
        title: "Metric Drop Investigation",
        short: "DAU drop",
        estimatedTime: "30-45 phút",
        description: "Điều tra nguyên nhân DAU giảm và đề xuất metric, goal.",
    },
    {
        id: 5 as const,
        title: "Mobile Launch Metrics",
        short: "Mobile",
        estimatedTime: "20-30 phút",
        description: "Metric theo dõi khi launch Cốc Cốc Mobile.",
    },
    {
        id: 6 as const,
        title: "Product Experience Reflection",
        short: "Reflection",
        estimatedTime: "15-20 phút",
        description: "Trải nghiệm đầu tiên với Cốc Cốc và kỳ vọng tính năng.",
    },
];

export type LogicQuestion = {
    id: string;
    number: number;
    previewOnly?: boolean;
    prompt: string;
    options?: string[];
    correct?: string;
    explanation?: string;
};

export const LOGIC_QUESTIONS: LogicQuestion[] = [
    {
        id: "logic-1",
        number: 1,
        prompt: "Chuỗi số: 2, 4, 8, 16, ?",
        options: ["18", "24", "32", "64"],
        correct: "32",
        explanation: "Nhân đôi mỗi bước → 16 × 2 = 32.",
    },
    {
        id: "logic-2",
        number: 2,
        prompt: "Nếu tất cả A là B, và một số B là C, kết luận nào chắc chắn đúng?",
        options: [
            "Tất cả A là C",
            "Một số C là A",
            "Không có kết luận chắc chắn về quan hệ giữa A và C",
            "Tất cả C là A",
        ],
        correct: "Không có kết luận chắc chắn về quan hệ giữa A và C",
        explanation: "Chỉ có một phần B là C, không suy ra A–C.",
    },
    {
        id: "logic-3",
        number: 3,
        prompt: "Một metric tăng 20% rồi giảm 20%. Kết quả cuối so với ban đầu?",
        options: ["Không đổi", "Tăng 4%", "Giảm 4%", "Giảm 20%"],
        correct: "Giảm 4%",
        explanation: "1.2 × 0.8 = 0.96 → giảm 4%.",
    },
    ...Array.from({ length: 9 }, (_, i) => ({
        id: `logic-preview-${i + 4}`,
        number: i + 4,
        previewOnly: true,
        prompt: "Câu hỏi logic dạng hình ảnh / quy luật",
    })),
];

export type SqlQuestion = {
    id: CoccocSqlQuestionId;
    title: string;
    promptVi: string;
    hint: string;
    referenceSql: string;
};

export const COCCOC_SQL_QUESTIONS: SqlQuestion[] = [
    {
        id: "sql-q1",
        title: "Nhân viên Smith đang làm việc",
        promptVi:
            "Viết query trả về tất cả nhân viên vẫn đang làm việc, có LastName bắt đầu bằng 'Smith', sắp xếp theo LastName rồi FirstName.",
        hint: "TerminationDate IS NULL, LastName LIKE 'Smith%', ORDER BY.",
        referenceSql: `SELECT FirstName, LastName, ID, HireDate, Salary
FROM Employee
WHERE TerminationDate IS NULL
  AND LastName LIKE 'Smith%'
ORDER BY LastName, FirstName;`,
    },
    {
        id: "sql-q2",
        title: "Nhân viên chưa có review",
        promptVi:
            "Viết query trả về các nhân viên chưa từng có review, sắp xếp theo HireDate.",
        hint: "LEFT JOIN AnnualReviews, WHERE ar.EmpID IS NULL.",
        referenceSql: `SELECT e.*
FROM Employee e
LEFT JOIN AnnualReviews ar ON e.ID = ar.EmpID
WHERE ar.EmpID IS NULL
ORDER BY e.HireDate;`,
    },
    {
        id: "sql-q3",
        title: "Chênh lệch tenure active",
        promptVi:
            "Tính chênh lệch số ngày làm việc giữa nhân viên còn làm lâu nhất và ít lâu nhất.",
        hint: "Active: TerminationDate IS NULL, DATEDIFF(MAX/MIN HireDate).",
        referenceSql: `SELECT DATEDIFF(MAX(HireDate), MIN(HireDate)) AS tenure_diff_days
FROM Employee
WHERE TerminationDate IS NULL;`,
    },
    {
        id: "sql-q4",
        title: "Khoảng không tuyển/nghỉ",
        promptVi:
            "Tính khoảng thời gian dài nhất (ngày) mà công ty không tuyển mới hoặc cho nghỉ ai.",
        hint: "UNION HireDate + TerminationDate, LAG, MAX gap.",
        referenceSql: `WITH events AS (
  SELECT HireDate AS event_date FROM Employee
  UNION
  SELECT TerminationDate FROM Employee WHERE TerminationDate IS NOT NULL
)
SELECT MAX(DATEDIFF(event_date, previous_event_date)) AS longest_gap_days
FROM (...ordered_events...);`,
    },
    {
        id: "sql-q5",
        title: "Max concurrent employees",
        promptVi:
            "Với mỗi nhân viên, trả về số nhân viên lớn nhất từng làm cùng công ty trong tenure và ngày đầu đạt mức đó.",
        hint: "Event timeline, running count, window/self-join — không cần cursor.",
        referenceSql: `-- Dùng timeline hire/termination và running count theo ngày
-- Pseudo-SQL: overlap count per employee tenure interval`,
    },
];

export const CLICKSTREAM_TASKS = [
    { id: "cs-dau", title: "DAU", promptVi: "Tính số lượng user active trong ngày." },
    {
        id: "cs-fb",
        title: "Facebook DAU",
        promptVi: "Tính Facebook DAU (domain chứa facebook.com).",
    },
    {
        id: "cs-hour",
        title: "Traffic theo giờ",
        promptVi: "Tính phân bổ traffic theo giờ.",
    },
    {
        id: "cs-top",
        title: "Top 10 domain",
        promptVi: "Tìm top 10 domain theo traffic.",
    },
];

export const MOCK_DAU = [{ date: "2019-02-25", dau: 18 }];
export const MOCK_FB_DAU = [{ date: "2019-02-25", facebook_dau: 3 }];
export const MOCK_HOUR = [
    { hour: "00", event_count: 4, traffic_share: "8.0%" },
    { hour: "03", event_count: 2, traffic_share: "4.0%" },
    { hour: "11", event_count: 6, traffic_share: "12.0%" },
    { hour: "12", event_count: 5, traffic_share: "10.0%" },
    { hour: "14", event_count: 7, traffic_share: "14.0%" },
    { hour: "17", event_count: 5, traffic_share: "10.0%" },
    { hour: "19", event_count: 8, traffic_share: "16.0%" },
    { hour: "20", event_count: 6, traffic_share: "12.0%" },
];
export const MOCK_TOP_DOMAINS = [
    { domain: "www.youtube.com", event_count: 12, unique_users: 8, rank: 1 },
    { domain: "www.google.com", event_count: 10, unique_users: 7, rank: 2 },
    { domain: "coccoc.com", event_count: 8, unique_users: 6, rank: 3 },
    { domain: "www.facebook.com", event_count: 7, unique_users: 5, rank: 4 },
    { domain: "vn.yahoo.com", event_count: 5, unique_users: 4, rank: 5 },
];

export const SAMPLE_DAU_INVESTIGATION = `1. Xác nhận định nghĩa DAU và kiểm tra data quality (tracking, bot).
2. Segment theo platform, channel, cohort, region.
3. Tách data issue vs hành vi thật (seasonality, outage).
4. Phân tích funnel và feature usage (search, news, rewards).
5. So sánh retained vs dropped; clickstream + survey.
6. Cơ hội: cải thiện activation, default browser, mobile.
7. Metric: DAU recovery %, D7 retention, engagement depth; goal +8% DAU trong 8 tuần.`;

export const SAMPLE_MOBILE_METRICS = `Acquisition: installs, CPI. Activation: first search, default browser set.
Engagement: DAU/WAU, searches/user, pages/session.
Retention: D1/D7/D30. Quality: crash-free, load time.
Cross-device: desktop→mobile link rate. Feature: voice search, news feed adoption.`;

export const SAMPLE_REFLECTION = `Lần đầu dùng Cốc Cốc, tôi thích sidebar news và tìm kiếm nhanh cho tiếng Việt.
Tính năng hữ ích vì giảm bước chuyển tab. Kỳ vọng thêm sync bookmark desktop–mobile và dark mode nhất quán.`;

export const RELATED_LEARN = [
    { skill: "SELECT", status: "available" as const, href: "/learn/sql?module=select-basic" },
    { skill: "WHERE", status: "available" as const, href: "/learn/sql?module=where-basic" },
    { skill: "JOIN", status: "coming_soon" as const },
    { skill: "GROUP BY", status: "coming_soon" as const },
    { skill: "Window Functions", status: "coming_soon" as const },
    { skill: "Product Metrics", status: "coming_soon" as const },
];

export function computeCoccocOverallScore(scores: {
    logic: number;
    sql: number;
    clickstream: number;
    investigation: number;
    mobile: number;
    reflection: number;
}): number {
    const w = COCCOC_HOME_TEST_PROGRAM.weights;
    return Math.round(
        scores.logic * w.logic +
            scores.sql * w.sql +
            scores.clickstream * w.clickstream +
            scores.investigation * w.investigation +
            scores.mobile * w.mobile +
            scores.reflection * w.reflection,
    );
}

export function overallLabel(score: number): string {
    if (score >= 85) return "Mạnh";
    if (score >= 70) return "Đạt";
    if (score >= 50) return "Cần cải thiện";
    return "Chưa đạt";
}
