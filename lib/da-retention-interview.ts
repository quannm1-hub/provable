import type { SqlQuestionId } from "./da-retention-sql-eval";

export const DA_RETENTION_PROGRAM = {
    id: "novatech-da-retention-interview",
    company: "NovaTech",
    initials: "NT",
    programTitle: "Mô phỏng phỏng vấn Data Analyst Intern: Retention Case",
    programTitleEn: "Data Analyst Intern Retention Interview",
    role: "Data Analyst Intern",
    team: "Product Analytics",
    catalogTitle: "Mô phỏng phỏng vấn Data Analyst Intern",
    catalogSubtitle: "Retention Case · Product Analytics",
    description:
        "Phân tích retention người dùng từ dữ liệu users, transactions và events. Sau đó trình bày insight và thiết kế dashboard một trang cho PM.",
    heroDescription:
        "Bạn đang phỏng vấn cho vị trí Data Analyst Intern trong team Product Analytics. Nhiệm vụ của bạn là phân tích retention người dùng, tìm hành vi liên quan đến việc user tiếp tục sử dụng app, và trình bày đề xuất cho Product Manager.",
    estimatedTime: "45-60 phút",
    difficulty: "Cơ bản đến trung bình",
    passThreshold: 80,
    badge: "Retention Analytics Starter",
    skills: [
        "SQL",
        "Data Wrangling",
        "Cohort Analysis",
        "Retention Analysis",
        "Product Analytics",
        "Insight Storytelling",
        "Dashboard Communication",
    ],
    weights: { sql: 0.4, insight: 0.35, dashboard: 0.25 },
};

export const DA_PARTS = [
    {
        id: 1 as const,
        title: "SQL / Data Wrangling",
        short: "SQL",
        description:
            "Viết query để tính retention, so sánh hành vi và phân tích giao dịch đầu tiên.",
    },
    {
        id: 2 as const,
        title: "Phân tích & Insight",
        short: "Insight",
        description:
            "Diễn giải kết quả như một DA intern và đề xuất 2-3 action giúp cải thiện retention.",
    },
    {
        id: 3 as const,
        title: "dashboard một trang",
        short: "Dashboard",
        description:
            "Upload bản phác thảo dashboard 1 trang cho PM theo dõi retention hàng tuần.",
    },
];

export const RETENTION_BRIEF = {
    title: "Retention Case cho app fintech NovaPay",
    context:
        "NovaTech đang vận hành app fintech NovaPay. Product Manager muốn hiểu vì sao một số user quay lại sử dụng app sau khi đăng ký, trong khi một số user rời bỏ rất sớm.",
    businessQuestion:
        "Những yếu tố nào trong 3 ngày đầu có liên quan đến retention sau 7 ngày và 30 ngày?",
    role: "Bạn là ứng viên Data Analyst Intern. Bạn cần phân tích dữ liệu, trình bày insight rõ ràng và đề xuất action có thể giúp cải thiện retention.",
    deliverables: [
        "SQL query / kết quả phân tích cho 3 câu hỏi kỹ thuật",
        "Insight summary cho Product Manager",
        "dashboard một trang 1 trang để theo dõi retention hàng tuần",
    ],
    evaluationNote:
        "Phần insight được đánh giá bằng cách kể chuyện bằng data, không chỉ đúng/sai.",
    weights: "SQL/Data Wrangling: 40% · Insight: 35% · Dashboard: 25%",
    pass: "Tổng điểm ≥ 80% và mỗi phần hoàn thành cơ bản",
};

export type SqlQuestion = {
    id: SqlQuestionId;
    title: string;
    prompt: string;
    hint: string;
    expectedColumns: string[];
    mockRows: Record<string, string | number>[];
};

export const SQL_QUESTIONS: SqlQuestion[] = [
    {
        id: "q1-cohort",
        title: "Retention theo cohort",
        prompt: "Tính retention rate sau 7 ngày và 30 ngày theo từng cohort tháng.",
        hint: "Dùng users + events, cohort_month, so sánh activity sau signup + 7 / + 30 ngày.",
        expectedColumns: [
            "cohort_month",
            "total_users",
            "retained_d7_users",
            "retention_d7_rate",
            "retained_d30_users",
            "retention_d30_rate",
        ],
        mockRows: [
            { cohort_month: "2026-01", total_users: 3, retained_d7_users: 2, retention_d7_rate: "66.7%", retained_d30_users: 1, retention_d30_rate: "33.3%" },
            { cohort_month: "2026-02", total_users: 3, retained_d7_users: 2, retention_d7_rate: "66.7%", retained_d30_users: 1, retention_d30_rate: "33.3%" },
            { cohort_month: "2026-03", total_users: 4, retained_d7_users: 2, retention_d7_rate: "50.0%", retained_d30_users: 1, retention_d30_rate: "25.0%" },
        ],
    },
    {
        id: "q2-behavior",
        title: "Hành vi 3 ngày đầu",
        prompt: "Tìm top 3 hành vi trong 3 ngày đầu, phân biệt user còn dùng vs user bỏ.",
        hint: "Retained = activity sau signup+7; Dropped = không có; group by event_name, rank.",
        expectedColumns: ["user_group", "event_name", "feature_name", "event_count", "rank"],
        mockRows: [
            { user_group: "retained", event_name: "transaction_success", feature_name: "wallet", event_count: 4, rank: 1 },
            { user_group: "retained", event_name: "app_open", feature_name: "home", event_count: 4, rank: 2 },
            { user_group: "retained", event_name: "feature_view", feature_name: "wallet", event_count: 2, rank: 3 },
            { user_group: "dropped", event_name: "app_open", feature_name: "home", event_count: 5, rank: 1 },
            { user_group: "dropped", event_name: "feature_view", feature_name: "rewards", event_count: 2, rank: 2 },
            { user_group: "dropped", event_name: "feature_view", feature_name: "profile", event_count: 1, rank: 3 },
        ],
    },
    {
        id: "q3-first-txn",
        title: "First transaction > 500k",
        prompt: "Những user có giao dịch đầu tiên > 500k VND có retention cao hơn không?",
        hint: "First transaction = MIN(transaction_date); so sánh retention theo nhóm amount.",
        expectedColumns: [
            "first_transaction_group",
            "total_users",
            "retained_d7_rate",
            "retained_d30_rate",
        ],
        mockRows: [
            { first_transaction_group: "> 500k VND", total_users: 4, retained_d7_rate: "75.0%", retained_d30_rate: "50.0%" },
            { first_transaction_group: "<= 500k VND", total_users: 6, retained_d7_rate: "50.0%", retained_d30_rate: "16.7%" },
        ],
    },
];

export const REFERENCE_SQL_Q1 = `WITH cohort_users AS (
  SELECT user_id, signup_date, cohort_month FROM users
),
activity AS (
  SELECT user_id, event_date FROM events WHERE event_name = 'app_open'
),
retention_flags AS (
  SELECT cu.user_id, cu.cohort_month,
    MAX(CASE WHEN a.event_date >= DATE_ADD(cu.signup_date, INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS retained_d7,
    MAX(CASE WHEN a.event_date >= DATE_ADD(cu.signup_date, INTERVAL 30 DAY) THEN 1 ELSE 0 END) AS retained_d30
  FROM cohort_users cu
  LEFT JOIN activity a ON cu.user_id = a.user_id
  GROUP BY cu.user_id, cu.cohort_month
)
SELECT cohort_month, COUNT(*) AS total_users, ...
FROM retention_flags GROUP BY cohort_month;`;

export const DA_RESOURCES = [
    { id: "r1", title: "Retention metric là gì?", time: "3 phút", content: "D7/D30 retention đo tỷ lệ user còn active sau 7 hoặc 30 ngày từ signup." },
    { id: "r2", title: "Cohort analysis", time: "5 phút", content: "Nhóm user theo tháng đăng ký để so sánh công bằng theo thời gian." },
    { id: "r3", title: "Kể chuyện với PM", time: "4 phút", content: "Insight nên có pattern → evidence → action, không chỉ số liệu rời." },
];

export const RELATED_LEARN = [
    { skill: "SELECT", status: "available" as const, href: "/learn/sql?module=select-basic" },
    { skill: "WHERE", status: "available" as const, href: "/learn/sql?module=where-basic" },
    { skill: "GROUP BY", status: "coming_soon" as const },
    { skill: "JOIN", status: "coming_soon" as const },
    { skill: "Cohort Analysis", status: "coming_soon" as const },
];

export const DA_HOW_IT_WORKS = [
    "Đọc brief",
    "Xem 3 bảng dữ liệu",
    "Làm phần SQL",
    "Viết insight",
    "Upload dashboard một trang",
    "Nhận đánh giá tổng hợp",
];

export function computeOverallScore(
    sql: number,
    insight: number,
    dashboard: number,
): number {
    const w = DA_RETENTION_PROGRAM.weights;
    return Math.round(sql * w.sql + insight * w.insight + dashboard * w.dashboard);
}
