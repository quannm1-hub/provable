import type {
    AssessmentCheck,
    AssessmentCheckStatus,
    AssessmentEvaluationResult,
} from "@/lib/assessment-evaluator";

export type ReportMetric = {
    id: string;
    label: string;
    score: number;
    status: AssessmentCheckStatus;
    message: string;
    suggestions?: string[];
};

export type ReportCategory = {
    id: string;
    label: string;
    description: string;
    score: number;
    metrics: ReportMetric[];
};

export type RadarAxis = {
    label: string;
    score: number;
    color: string;
};

export type MetricScoreRow = {
    id: string;
    label: string;
    score: number;
    status: AssessmentCheckStatus;
};

export type AssessmentReport = {
    overallScore: number;
    decision: string;
    categories: ReportCategory[];
    /** Trục radar — điểm nhóm từ pipeline thật */
    radarAxes: RadarAxis[];
    statusBreakdown: {
        passed: number;
        warning: number;
        failed: number;
        total: number;
    };
    /** Từng tiêu chí pipeline (bar chart chi tiết) */
    metricScores: MetricScoreRow[];
    passThreshold: number;
    wordCount: number;
    checkCount: number;
};

const CATEGORY_DEFS: {
    id: string;
    label: string;
    description: string;
    checkIds: string[];
}[] = [
    {
        id: "content",
        label: "Nội dung",
        description:
            "Đánh giá README, các phần bắt buộc, độ dài và chất lượng mô tả bài làm — giúp reviewer nắm approach và kết quả.",
        checkIds: ["readme", "required_sections", "word_count", "placeholder"],
    },
    {
        id: "format",
        label: "Định dạng",
        description:
            "Kiểm tra đúng format file, deadline và cấu trúc package nộp — tương thích pipeline chấm tự động.",
        checkIds: ["format", "deadline"],
    },
    {
        id: "integrity",
        label: "Tính toàn vẹn",
        description:
            "Phát hiện sao chép template, similarity và dấu hiệu nội dung AI/spam — giảm rủi ro gian lận.",
        checkIds: ["similarity", "template_copy", "ai_spam"],
    },
    {
        id: "technical",
        label: "Kỹ thuật",
        description:
            "Khả năng chạy code/SQL và chất lượng văn bản (spell check) — thể hiện bài nộp có thể reproduce.",
        checkIds: ["code_run", "spell_check"],
    },
];

function checkMap(checks: AssessmentCheck[]) {
    return Object.fromEntries(checks.map((c) => [c.id, c]));
}

function metricFromCheck(
    check: AssessmentCheck | undefined,
    id: string,
    fallbackLabel: string,
): ReportMetric | null {
    if (!check) return null;
    return {
        id,
        label: check.label || fallbackLabel,
        score: check.score,
        status: check.status,
        message: check.message,
        suggestions: check.suggestions,
    };
}

function avgScores(metrics: ReportMetric[]): number {
    if (metrics.length === 0) return 0;
    return Math.round(
        metrics.reduce((s, m) => s + m.score, 0) / metrics.length,
    );
}

function buildReviewCategory(evaluation: AssessmentEvaluationResult): ReportCategory {
    const { llmReview } = evaluation;
    const strengthScore = Math.min(100, 55 + llmReview.strengths.length * 12);
    const weaknessPenalty = llmReview.weaknesses.length * 10;
    const recPenalty = llmReview.recommendations.length * 6;
    const reviewScore = Math.max(
        0,
        Math.min(100, strengthScore - weaknessPenalty - recPenalty),
    );

    const metrics: ReportMetric[] = [
        {
            id: "ai_summary",
            label: "Tổng quan reviewer",
            score: reviewScore,
            status:
                reviewScore >= 75
                    ? "passed"
                    : reviewScore >= 50
                      ? "warning"
                      : "failed",
            message: llmReview.summary,
        },
        {
            id: "strengths",
            label: "Điểm mạnh",
            score: strengthScore,
            status: llmReview.strengths.length >= 2 ? "passed" : "warning",
            message:
                llmReview.strengths.length > 0
                    ? llmReview.strengths.join(" · ")
                    : "Chưa nêu rõ điểm mạnh trong bài.",
            suggestions:
                llmReview.strengths.length === 0
                    ? ["Bổ sung điểm mạnh cụ thể trong README"]
                    : undefined,
        },
        {
            id: "improvements",
            label: "Cần cải thiện",
            score: Math.max(0, 100 - weaknessPenalty - recPenalty),
            status:
                llmReview.weaknesses.length === 0
                    ? "passed"
                    : llmReview.weaknesses.length <= 2
                      ? "warning"
                      : "failed",
            message:
                llmReview.weaknesses.length > 0
                    ? llmReview.weaknesses.join(" · ")
                    : "Không phát hiện điểm yếu lớn.",
            suggestions: llmReview.recommendations.slice(0, 4),
        },
    ];

    return {
        id: "review",
        label: "Đánh giá AI",
        description:
            "Tổng hợp từ LLM review: điểm mạnh, điểm cần chỉnh và khuyến nghị hành động tiếp theo.",
        score: avgScores(metrics),
        metrics,
    };
}

/** Màu legend radar — tách biệt từng nhóm */
export const RADAR_AXIS_COLORS: Record<string, string> = {
    content: "#3b82f6",
    format: "#f97316",
    integrity: "#a855f7",
    technical: "#ef4444",
    review: "#14b8a6",
};

const PASS_THRESHOLD = 75;

export function buildAssessmentReport(
    evaluation: AssessmentEvaluationResult,
): AssessmentReport {
    const map = checkMap(evaluation.checks);
    const categories: ReportCategory[] = CATEGORY_DEFS.map((def) => {
        const metrics = def.checkIds
            .map((id) => metricFromCheck(map[id], id, id))
            .filter((m): m is ReportMetric => m !== null);

        return {
            id: def.id,
            label: def.label,
            description: def.description,
            score: avgScores(metrics),
            metrics,
        };
    });

    if (!evaluation.preCheckOnly) {
        categories.push(buildReviewCategory(evaluation));
    }

    const radarAxes: RadarAxis[] = categories.map((c) => ({
        label: c.label,
        score: c.score,
        color: RADAR_AXIS_COLORS[c.id] ?? "#059669",
    }));

    const statusBreakdown = evaluation.checks.reduce(
        (acc, c) => {
            if (c.status === "passed") acc.passed += 1;
            else if (c.status === "warning") acc.warning += 1;
            else acc.failed += 1;
            acc.total += 1;
            return acc;
        },
        { passed: 0, warning: 0, failed: 0, total: 0 },
    );

    const metricScores: MetricScoreRow[] = evaluation.checks.map((c) => ({
        id: c.id,
        label: c.label,
        score: c.score,
        status: c.status,
    }));

    return {
        overallScore: evaluation.overallScore,
        decision: evaluation.decision,
        categories,
        radarAxes,
        statusBreakdown,
        metricScores,
        passThreshold: PASS_THRESHOLD,
        wordCount: evaluation.wordCount,
        checkCount: evaluation.checks.length,
    };
}

export function scoreTone(score: number): "good" | "mid" | "low" {
    if (score >= 75) return "good";
    if (score >= 50) return "mid";
    return "low";
}

export const SCORE_TONE_CLASS = {
    good: "text-emerald-600 dark:text-emerald-400",
    mid: "text-amber-600 dark:text-amber-400",
    low: "text-red-600 dark:text-red-400",
} as const;

export const SCORE_BAR_CLASS = {
    good: "bg-emerald-500",
    mid: "bg-amber-500",
    low: "bg-red-500",
} as const;
