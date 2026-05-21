export type CoccocSqlQuestionId = "sql-q1" | "sql-q2" | "sql-q3" | "sql-q4" | "sql-q5";

export function evaluateLogicAnswers(
    answers: Record<string, string>,
): { score: number; correct: number; total: number } {
    const keys = ["logic-1", "logic-2", "logic-3"];
    const correctMap: Record<string, string> = {
        "logic-1": "32",
        "logic-2": "Không có kết luận chắc chắn về quan hệ giữa A và C",
        "logic-3": "Giảm 4%",
    };
    let correct = 0;
    keys.forEach((k) => {
        if (answers[k] === correctMap[k]) correct += 1;
    });
    const score = Math.round((correct / keys.length) * 100);
    return { score, correct, total: keys.length };
}

export function evaluateCoccocSql(
    query: string,
    questionId: CoccocSqlQuestionId,
): { score: number; feedback: string; passed: boolean } {
    const q = query.toLowerCase();
    let score = 0;

    if (q.includes("select")) score += 12;
    if (q.includes("from")) score += 8;
    if (q.includes("employee")) score += 10;
    if (q.includes("annualreviews") || q.includes("annual_reviews")) score += 8;

    if (questionId === "sql-q1") {
        if (q.includes("terminationdate") && q.includes("null")) score += 20;
        if (q.includes("smith")) score += 15;
        if (q.includes("order by")) score += 15;
    }
    if (questionId === "sql-q2") {
        if (q.includes("left join")) score += 20;
        if (q.includes("is null")) score += 15;
        if (q.includes("hiredate")) score += 10;
    }
    if (questionId === "sql-q3") {
        if (q.includes("datediff") || q.includes("max") || q.includes("min")) score += 25;
        if (q.includes("terminationdate")) score += 10;
    }
    if (questionId === "sql-q4") {
        if (q.includes("union")) score += 15;
        if (q.includes("lag") || q.includes("gap")) score += 15;
    }
    if (questionId === "sql-q5") {
        if (q.includes("count") || q.includes("window") || q.includes("over")) score += 20;
    }

    score = Math.min(100, score);
    const passed = score >= 50 || questionId === "sql-q4" || questionId === "sql-q5";
    return {
        score: questionId === "sql-q4" || questionId === "sql-q5" ? Math.max(score, 70) : score,
        feedback: passed
            ? "Query có hướng đúng cho câu hỏi này."
            : "Bổ sung điều kiện/JOIN hoặc dùng kết quả mẫu cho câu phức tạp.",
        passed,
    };
}

export function evaluateClickstreamQuery(query: string): {
    score: number;
    feedback: string;
} {
    const q = query.toLowerCase();
    let score = 40;
    if (/distinct|count|group by|dau|user_id/.test(q)) score += 25;
    if (/facebook|domain|hour|top/.test(q)) score += 20;
    if (/clickstream|from/.test(q)) score += 15;
    return {
        score: Math.min(100, score),
        feedback:
            score >= 70
                ? "Hướng phân tích clickstream phù hợp."
                : "Gợi ý: COUNT DISTINCT user_id, GROUP BY date/hour/domain.",
    };
}

export function evaluateInvestigation(text: string): {
    score: number;
    message: string;
    strengths: string[];
    missing: string[];
} {
    if (text.trim().length < 500) {
        return {
            score: 35,
            message: "Cần ít nhất 500 ký tự với lập luận và đề xuất metric.",
            strengths: [],
            missing: ["Độ dài", "Segmentation", "Recovery plan"],
        };
    }
    const t = text.toLowerCase();
    let score = 0;
    const strengths: string[] = [];
    const missing: string[] = [];

    if (/segment|cohort|platform|channel/.test(t)) {
        score += 15;
        strengths.push("Segmentation");
    } else missing.push("Phân khúc");
    if (/data quality|tracking|bot|season/.test(t)) {
        score += 15;
        strengths.push("Data vs thật");
    } else missing.push("Kiểm tra data quality");
    if (/funnel|feature|clickstream|retention|engagement/.test(t)) {
        score += 20;
        strengths.push("Phân tích hành vi");
    } else missing.push("Funnel/feature");
    if (/survey|interview|qualitative/.test(t)) {
        score += 10;
        strengths.push("Qualitative");
    }
    if (/metric|goal|kpi|đo lường/.test(t)) {
        score += 25;
        strengths.push("Metric & goal");
    } else missing.push("Metric và goal");
    if (/recovery|growth|cơ hội|đề xuất/.test(t)) {
        score += 15;
        strengths.push("Cơ hội phục hồi");
    }

    score = Math.min(100, score);
    return {
        score,
        message: score >= 70 ? "Phân tích có cấu trúc tốt." : "Bổ sung segment, metric và goal.",
        strengths,
        missing,
    };
}

export function evaluateMobileMetrics(text: string): {
    score: number;
    message: string;
} {
    if (text.trim().length < 300) {
        return { score: 40, message: "Cần ít nhất 300 ký tự." };
    }
    const t = text.toLowerCase();
    let score = 30;
    if (/install|acquisition|signup/.test(t)) score += 15;
    if (/retention|d1|d7|dau|wau/.test(t)) score += 20;
    if (/crash|performance|load/.test(t)) score += 15;
    if (/search|engagement|session/.test(t)) score += 15;
    if (/desktop|mobile|cross/.test(t)) score += 10;
    return {
        score: Math.min(100, score),
        message: score >= 70 ? "Bao phủ nhóm metric launch mobile." : "Thêm retention và engagement.",
    };
}

export function evaluateReflection(text: string): { score: number; message: string } {
    if (text.trim().length < 200) {
        return { score: 40, message: "Cần ít nhất 200 ký tự." };
    }
    const t = text.toLowerCase();
    let score = 40;
    if (/cốc cốc|coccoc|trình duyệt|browser/.test(t)) score += 15;
    if (/thích|feature|tính năng/.test(t)) score += 25;
    if (/kỳ vọng|mong|đề xuất|improve/.test(t)) score += 20;
    return {
        score: Math.min(100, score),
        message: score >= 70 ? "Reflection cụ thể và có giá trị user." : "Nêu rõ feature và lý do.",
    };
}
