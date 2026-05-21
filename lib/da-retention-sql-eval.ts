export type SqlQuestionId = "q1-cohort" | "q2-behavior" | "q3-first-txn";

export function evaluateRetentionSql(
    query: string,
    questionId: SqlQuestionId,
): { score: number; feedback: string; passed: boolean } {
    const q = query.toLowerCase();
    let score = 0;
    const checks: string[] = [];

    if (q.includes("select")) {
        score += 15;
        checks.push("Có SELECT");
    }
    if (q.includes("from")) {
        score += 10;
        checks.push("Có FROM");
    }
    if (q.includes("users")) {
        score += 10;
    }
    if (q.includes("events")) {
        score += 10;
    }
    if (q.includes("transactions")) {
        score += 10;
    }
    if (q.includes("join")) {
        score += 15;
        checks.push("Có JOIN");
    }
    if (q.includes("group by")) {
        score += 15;
        checks.push("Có GROUP BY");
    }
    if (q.includes("cohort")) {
        score += 10;
    }
    if (q.includes("retention") || q.includes("retained")) {
        score += 10;
    }

    if (questionId === "q1-cohort") {
        if (q.includes("cohort_month") || q.includes("cohort")) score += 10;
        if (q.includes("7") || q.includes("d7")) score += 5;
        if (q.includes("30") || q.includes("d30")) score += 5;
    }
    if (questionId === "q2-behavior") {
        if (q.includes("event_name") || q.includes("feature")) score += 10;
        if (q.includes("rank") || q.includes("top")) score += 5;
    }
    if (questionId === "q3-first-txn") {
        if (q.includes("amount") || q.includes("500")) score += 10;
        if (q.includes("min") || q.includes("first")) score += 5;
    }

    score = Math.min(100, score);
    const passed = score >= 55;
    const feedback = passed
        ? `Query có cấu trúc phù hợp cho câu hỏi này. ${checks.length ? checks.join(" · ") : ""}`
        : "Query còn thiếu JOIN/GROUP BY hoặc chưa đề cập bảng users/events/transactions. Bạn có thể dùng kết quả mẫu để tiếp tục.";
    return { score, feedback, passed };
}
