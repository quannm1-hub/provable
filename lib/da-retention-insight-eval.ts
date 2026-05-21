export type InsightEvalResult = {
    score: number;
    statusLabel: string;
    passed: boolean;
    message: string;
    strengths: string[];
    missing: string[];
    recommendations: string[];
};

const SAMPLE_INSIGHT =
    "Retention D7 giảm từ 66.7% ở cohort tháng 1-2 xuống 50% ở cohort tháng 3, D30 cũng giảm còn 25%. Nhóm retained có nhiều transaction_success và xem wallet trong 3 ngày đầu, trong khi nhóm dropped chủ yếu chỉ app_open hoặc xem rewards/profile. Ngoài ra, user có giao dịch đầu tiên > 500k có D7/D30 retention cao hơn nhóm còn lại. Tôi sẽ đề xuất PM tập trung vào activation trong 3 ngày đầu: hướng user đến top-up hoặc transaction_success sớm hơn, cải thiện onboarding cho wallet, và tạo reminder/reward có điều kiện cho user chưa hoàn thành giao dịch đầu tiên.";

export function getSampleInsight() {
    return SAMPLE_INSIGHT;
}

export function evaluateInsight(text: string): InsightEvalResult {
    if (text.trim().length < 300) {
        return {
            score: 40,
            statusLabel: "Chưa đạt",
            passed: false,
            message:
                "Câu trả lời còn quá ngắn. Hãy nêu ít nhất 1 insight chính, 1 bằng chứng từ dữ liệu và 1 action đề xuất.",
            strengths: [],
            missing: ["Độ dài tối thiểu 300 ký tự"],
            recommendations: [
                "Nêu xu hướng retention D7/D30 theo cohort",
                "So sánh hành vi retained vs dropped",
                "Đề xuất 2-3 action cho PM",
            ],
        };
    }

    const t = text.toLowerCase();
    let score = 0;
    const strengths: string[] = [];
    const missing: string[] = [];

    if (/d7|7 ngày|retention/.test(t)) {
        score += 20;
        strengths.push("Đề cập retention");
    } else missing.push("Xu hướng retention");

    if (/cohort|tháng 0?3|2026-0/.test(t)) {
        score += 15;
        strengths.push("So sánh cohort");
    }

    if (/retained|dropped|hành vi|transaction_success|wallet/.test(t)) {
        score += 20;
        strengths.push("Phân tích hành vi sớm");
    } else missing.push("Hành vi 3 ngày đầu");

    if (/500|giao dịch đầu|first transaction/.test(t)) {
        score += 15;
        strengths.push("First transaction > 500k");
    } else missing.push("Ảnh hưởng giao dịch đầu tiên");

    if (/(đề xuất|action|onboarding|activation|reminder|reward|pm|product)/.test(t)) {
        score += 25;
        strengths.push("Action cụ thể cho PM");
    } else missing.push("2-3 action đề xuất");

    if (text.split(/\n+/).length >= 2 || text.length > 400) {
        score += 5;
        strengths.push("Cấu trúc dễ đọc");
    }

    score = Math.min(100, score);
    const passed = score >= 80;
    return {
        score,
        statusLabel: passed ? "Đạt" : score >= 60 ? "Cần cải thiện" : "Chưa đạt",
        passed,
        message: passed
            ? "Insight kể chuyện bằng data tốt và có action rõ cho PM."
            : "Insight cần bổ sung bằng chứng từ dữ liệu và đề xuất cụ thể hơn.",
        strengths,
        missing,
        recommendations: missing.length
            ? missing.map((m) => `Bổ sung: ${m}`)
            : ["Có thể làm rõ metric north star cho dashboard tuần"],
    };
}
