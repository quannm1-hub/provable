/** Assessment review pipeline — rule-based, no backend */

export type AssessmentCheckStatus = "passed" | "warning" | "failed";

export type AssessmentCheck = {
    id: string;
    label: string;
    status: AssessmentCheckStatus;
    score: number;
    message: string;
    details?: string[];
    suggestions?: string[];
};

export type AssessmentDecision = "Strong Pass" | "Pass" | "Needs Review" | "Reject";

export type AssessmentEvaluationResult = {
    overallScore: number;
    decision: AssessmentDecision;
    checks: AssessmentCheck[];
    riskFlags: string[];
    similarity: {
        templateSimilarity: number;
        plagiarismSimilarity: number;
        matchedSource: string;
        riskLevel: "low" | "medium" | "high";
    };
    spellCheck: {
        issueCount: number;
        warnings: string[];
    };
    wordCount: number;
    llmReview: {
        summary: string;
        strengths: string[];
        weaknesses: string[];
        recommendations: string[];
        reviewerDecision: AssessmentDecision;
    };
    preCheckOnly?: boolean;
};

export type EvaluateOptions = {
    simulateLate?: boolean;
    preCheckOnly?: boolean;
    submittedAt?: Date;
};

export const ASSESSMENT_DEADLINE = "2026-05-21T23:59:00+07:00";
export const MAX_FILE_BYTES = 20 * 1024 * 1024;

const ACCEPTED_EXT = [".zip", ".tar.gz", ".md", ".txt"];
const WARN_EXT = [".pdf", ".docx"];

const PLACEHOLDER_TOKENS = [
    "todo",
    "lorem ipsum",
    "fill here",
    "insert text",
    "coming soon",
    "placeholder",
    "tbd",
    "n/a",
];

const AI_SPAM_PHRASES = [
    "as an ai language model",
    "in conclusion",
    "it is important to note",
    "comprehensive solution",
    "leverage best practices",
    "cutting-edge",
    "robust and scalable",
];

const SECTION_KEYWORDS: { key: string; patterns: RegExp[] }[] = [
    { key: "readme", patterns: [/readme/i, /# readme/i] },
    {
        key: "problem",
        patterns: [/problem understanding/i, /hiểu bài toán/i, /bối cảnh/i],
    },
    {
        key: "approach",
        patterns: [/approach/i, /phương pháp/i, /solution design/i, /thiết kế/i],
    },
    {
        key: "setup",
        patterns: [/setup/i, /cài đặt/i, /prerequisites/i],
    },
    {
        key: "run",
        patterns: [/how to run/i, /cách chạy/i, /run instructions/i],
    },
    {
        key: "assumptions",
        patterns: [/assumptions/i, /giả định/i],
    },
    {
        key: "output",
        patterns: [/output/i, /kết quả/i, /expected result/i],
    },
    {
        key: "limitations",
        patterns: [/limitations/i, /trade-?offs/i, /hạn chế/i],
    },
];

export const DEMO_FILE_HINTS: { name: string; outcome: string }[] = [
    { name: "final_complete_pass.zip", outcome: "Strong Pass" },
    { name: "no-readme.zip", outcome: "Reject / Thiếu README" },
    { name: "template-only.zip", outcome: "Reject / Copy template" },
    { name: "broken-not-run.zip", outcome: "Needs Review / Không chạy được" },
    { name: "late-final.zip", outcome: "Pass + cảnh báo deadline" },
    { name: "ai-spam-draft.md", outcome: "Needs Review / AI spam risk" },
    { name: "empty-placeholder.txt", outcome: "Reject / Placeholder" },
    { name: "too-short.md", outcome: "Reject / Word count thấp" },
];

function lower(s: string) {
    return s.toLowerCase();
}

function fileExt(name: string): string {
    const n = lower(name);
    if (n.endsWith(".tar.gz")) return ".tar.gz";
    const i = n.lastIndexOf(".");
    return i >= 0 ? n.slice(i) : "";
}

function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasKeyword(text: string, patterns: RegExp[]): boolean {
    return patterns.some((p) => p.test(text));
}

function detectSections(content: string): Record<string, boolean> {
    const out: Record<string, boolean> = {};
    for (const s of SECTION_KEYWORDS) {
        out[s.key] = hasKeyword(content, s.patterns);
    }
    return out;
}

function filenameSignals(name: string) {
    const n = lower(name);
    return {
        good: /complete|final|pass/.test(n),
        broken: /broken|fail|not-run/.test(n),
        noReadme: /no-readme/.test(n),
        template: /template/.test(n),
        empty: /empty/.test(n),
        spam: /ai-spam|spam/.test(n),
        late: /late/.test(n),
        short: /too-short|short/.test(n),
        placeholder: /placeholder/.test(n),
    };
}

export function evaluateFormat(file: File | null): AssessmentCheck {
    if (!file) {
        return {
            id: "format",
            label: "Kiểm tra format",
            status: "failed",
            score: 0,
            message: "Không tìm thấy file nộp.",
            suggestions: ["Upload package bài làm trước khi chấm."],
        };
    }
    const ext = fileExt(file.name);
    const sig = filenameSignals(file.name);
    const details: string[] = [];
    let status: AssessmentCheckStatus = "passed";
    let score = 100;
    let message = "Format file hợp lệ.";

    if (file.name.includes("template-only")) {
        status = "failed";
        score = 20;
        message = "Tên file gợi ý chỉ là template, chưa phải bài hoàn chỉnh.";
    }

    if (!ACCEPTED_EXT.includes(ext) && !WARN_EXT.includes(ext)) {
        return {
            id: "format",
            label: "Kiểm tra format",
            status: "failed",
            score: 0,
            message:
                "Format không được hỗ trợ. Hãy nộp .zip, .tar.gz, .md hoặc .txt.",
            suggestions: ["Ưu tiên .zip chứa README và code."],
        };
    }

    if (WARN_EXT.includes(ext)) {
        status = "warning";
        score = 70;
        message =
            "Bạn nộp .pdf/.docx. Hệ thống vẫn nhận, nhưng assessment kỹ thuật thường nên nộp package code hoặc README.";
        details.push("Khuyến nghị: .zip với README.md + source code.");
    } else if (ext !== ".zip" && ext !== ".tar.gz") {
        status = "warning";
        score = 85;
        message = "Đã nhận file text. Khuyến nghị nộp .zip đầy đủ package.";
    }

    if (file.size > MAX_FILE_BYTES) {
        status = "failed";
        score = 30;
        message = "File vượt giới hạn 20MB.";
    } else if (file.size < 200 && !sig.good) {
        status = "warning";
        score = Math.min(score, 50);
        message = "File quá nhỏ — có thể chưa chứa nội dung đầy đủ.";
        details.push(`Kích thước: ${file.size} bytes`);
    }

    if (sig.good) {
        details.push("Tên file gợi ý bài hoàn chỉnh.");
    }

    return {
        id: "format",
        label: "Kiểm tra format",
        status,
        score,
        message,
        details: details.length ? details : undefined,
    };
}

export function evaluateDeadline(
    submittedAt: Date,
    simulateLate?: boolean,
): AssessmentCheck {
    const deadline = new Date(ASSESSMENT_DEADLINE);
    const late = simulateLate || submittedAt > deadline;
    if (late) {
        return {
            id: "deadline",
            label: "Kiểm tra deadline",
            status: "failed",
            score: 40,
            message:
                "Bài nộp quá deadline. Trong quy trình thật, bài có thể bị loại hoặc bị trừ điểm.",
            suggestions: ["Nộp lại trước deadline hoặc giải thích delay cho reviewer."],
        };
    }
    return {
        id: "deadline",
        label: "Kiểm tra deadline",
        status: "passed",
        score: 100,
        message: "Bài nộp đúng hạn.",
    };
}

export function evaluateRequiredSections(
    content: string,
    fileName: string,
): AssessmentCheck {
    const sig = filenameSignals(fileName);
    const sections = detectSections(content);
    const present = Object.values(sections).filter(Boolean).length;

    if (sig.noReadme) {
        return {
            id: "required_sections",
            label: "Thiếu phần bắt buộc",
            status: "failed",
            score: 25,
            message: "Thiếu README hoặc phần giải thích cách chạy.",
            details: ["README", "Setup", "Run instructions"],
            suggestions: ["Thêm README.md với đủ section bắt buộc."],
        };
    }

    if (sig.good && present >= 5) {
        return {
            id: "required_sections",
            label: "Thiếu phần bắt buộc",
            status: "passed",
            score: 95,
            message: "Các phần bắt buộc có vẻ đầy đủ.",
        };
    }

    const missing: string[] = [];
    if (!sections.readme) missing.push("README");
    if (!sections.approach) missing.push("Approach / Solution design");
    if (!sections.run) missing.push("Run instructions");
    if (!sections.assumptions) missing.push("Assumptions");
    if (!sections.output) missing.push("Output / result");

    if (present >= 6) {
        return {
            id: "required_sections",
            label: "Thiếu phần bắt buộc",
            status: "passed",
            score: 90,
            message: "Đủ phần bắt buộc.",
        };
    }
    if (present >= 4) {
        return {
            id: "required_sections",
            label: "Thiếu phần bắt buộc",
            status: "warning",
            score: 65,
            message: "Một số phần bắt buộc còn mỏng.",
            details: missing.length ? missing : ["Một vài section chưa rõ"],
            suggestions: ["Bổ sung assumptions và mô tả output."],
        };
    }
    return {
        id: "required_sections",
        label: "Thiếu phần bắt buộc",
        status: "failed",
        score: 35,
        message: "Thiếu nhiều phần bắt buộc trong submission.",
        details: missing,
        suggestions: ["Hoàn thiện README theo checklist assessment."],
    };
}

export function evaluateReadme(content: string, fileName: string): AssessmentCheck {
    const sig = filenameSignals(fileName);
    if (sig.noReadme) {
        return {
            id: "readme",
            label: "Thiếu README / explanation",
            status: "failed",
            score: 0,
            message:
                "Thiếu README / explanation. Đây là phần bắt buộc để reviewer hiểu cách chạy và cách bạn tiếp cận bài toán.",
        };
    }

    const checks = [
        /readme/i.test(content) || /\.md$/i.test(fileName),
        /how to run|cách chạy/i.test(content),
        /approach|phương pháp/i.test(content),
        /assumptions|giả định/i.test(content),
        /output|kết quả/i.test(content),
    ];
    const hit = checks.filter(Boolean).length;

    if (hit >= 4) {
        return {
            id: "readme",
            label: "Thiếu README / explanation",
            status: "passed",
            score: 95,
            message: "README / explanation đủ các mục chính.",
        };
    }
    if (hit >= 2) {
        return {
            id: "readme",
            label: "Thiếu README / explanation",
            status: "warning",
            score: 60,
            message: "README có nhưng còn thiếu hướng dẫn chạy hoặc assumptions.",
            suggestions: ["Bổ sung How to run và Output explanation."],
        };
    }
    return {
        id: "readme",
        label: "Thiếu README / explanation",
        status: "failed",
        score: 20,
        message: "Thiếu README hoặc phần giải thích cách chạy.",
    };
}

export function evaluatePlaceholderContent(content: string): AssessmentCheck {
    const c = lower(content);
    let hits = 0;
    for (const t of PLACEHOLDER_TOKENS) {
        if (c.includes(t)) hits++;
    }
    if (/\.\.\./g.test(content)) hits++;
    if ((c.match(/\bn\/a\b/g) || []).length >= 3) hits += 2;

    if (hits >= 4) {
        return {
            id: "placeholder",
            label: "Nội dung rỗng / placeholder",
            status: "failed",
            score: 25,
            message: "Bài làm còn chứa placeholder/TODO.",
            details: ["TODO", "placeholder", "TBD", "..."],
        };
    }
    if (hits >= 2) {
        return {
            id: "placeholder",
            label: "Nội dung rỗng / placeholder",
            status: "warning",
            score: 60,
            message: "Một số phần có tiêu đề nhưng chưa có nội dung thực tế.",
        };
    }
    return {
        id: "placeholder",
        label: "Nội dung rỗng / placeholder",
        status: "passed",
        score: 100,
        message: "Không phát hiện placeholder nghiêm trọng.",
    };
}

export function evaluateTemplateSimilarity(
    content: string,
    fileName: string,
): { check: AssessmentCheck; score: number } {
    const sig = filenameSignals(fileName);
    const wc = countWords(content);
    const sections = detectSections(content);
    const headingCount = Object.values(sections).filter(Boolean).length;

    let similarity = 40;
    if (sig.template || fileName.includes("template-only")) similarity = 92;
    else if (sig.good) similarity = 18;
    else if (headingCount >= 5 && wc < 400) similarity = 78;
    else if (headingCount >= 4 && wc < 250) similarity = 88;
    else if (wc < 150) similarity = 75;

    let status: AssessmentCheckStatus = "passed";
    let score = 100 - similarity * 0.5;
    let message = "Không có dấu hiệu copy template nguyên bản.";

    if (similarity > 85) {
        status = "failed";
        score = 15;
        message =
            "Bài làm có vẻ vẫn là template gốc, chưa được hoàn thiện.";
    } else if (similarity >= 60) {
        status = "warning";
        score = 55;
        message =
            "Bạn đã giữ cấu trúc template nhưng cần bổ sung nội dung cụ thể.";
    }

    return {
        score: similarity,
        check: {
            id: "template_copy",
            label: "Copy template nguyên bản",
            status,
            score,
            message,
            details: [`Độ trùng template: ${similarity}%`],
        },
    };
}

export function evaluatePlagiarismSimilarity(
    content: string,
    fileName: string,
): {
    check: AssessmentCheck;
    plagiarismSimilarity: number;
    matchedSource: string;
    riskLevel: "low" | "medium" | "high";
} {
    const sig = filenameSignals(fileName);
    let plagiarism = 25;
    let matchedSource = "previous_submission_pool";
    if (sig.good) {
        plagiarism = 12;
        matchedSource = "none_significant";
    } else if (sig.spam) {
        plagiarism = 55;
        matchedSource = "public_internet_mock";
    } else if (/sample|reference|answer/.test(lower(fileName))) {
        plagiarism = 78;
        matchedSource = "sample_reference_solution";
    } else if (countWords(content) < 200) {
        plagiarism = 45;
    }

    let riskLevel: "low" | "medium" | "high" = "low";
    if (plagiarism >= 71) riskLevel = "high";
    else if (plagiarism >= 31) riskLevel = "medium";

    let status: AssessmentCheckStatus = "passed";
    let score = 100 - plagiarism * 0.6;
    let message =
        "Không phát hiện rủi ro sao chép đáng kể.";

    if (riskLevel === "high") {
        status = "failed";
        score = 30;
        message =
            "Nội dung có độ tương đồng cao với bài mẫu. Hãy đảm bảo bạn diễn giải bằng hiểu biết của mình.";
    } else if (riskLevel === "medium") {
        status = "warning";
        score = 65;
        message =
            "Similarity ở mức trung bình. Nên bổ sung reasoning riêng và trade-offs.";
    }

    return {
        plagiarismSimilarity: plagiarism,
        matchedSource,
        riskLevel,
        check: {
            id: "similarity",
            label: "Chống copy / sao chép",
            status,
            score,
            message,
            details: [
                `Độ tương đồng tối đa: ${plagiarism}%`,
                `Nguồn: ${matchedSource}`,
            ],
        },
    };
}

export function evaluateSpellCheck(content: string): {
    check: AssessmentCheck;
    issueCount: number;
    warnings: string[];
} {
    const warnings: string[] = [];
    const words = content.split(/\s+/);
    const caps = words.filter((w) => w.length > 4 && w === w.toUpperCase()).length;
    if (caps > 8) warnings.push("Một số từ viết hoa liên tục — khó đọc.");
    const longSentences = content.split(/[.!?]/).filter((s) => s.split(/\s+/).length > 45);
    if (longSentences.length >= 2) {
        warnings.push("Có một số câu quá dài, nên tách nhỏ để dễ đọc.");
    }
    if (/teh |recieve |occured /i.test(content)) {
        warnings.push("Một số từ có vẻ sai chính tả hoặc thiếu dấu câu.");
    }

    const issueCount = warnings.length;
    const status: AssessmentCheckStatus =
        issueCount >= 3 ? "warning" : issueCount > 0 ? "warning" : "passed";

    return {
        issueCount,
        warnings,
        check: {
            id: "spell_check",
            label: "Kiểm tra chính tả",
            status,
            score: issueCount === 0 ? 100 : Math.max(70, 100 - issueCount * 10),
            message:
                issueCount === 0
                    ? "Không phát hiện lỗi chính tả nghiêm trọng."
                    : warnings[0] ?? "Có vài cảnh báo clarity.",
            details: warnings,
        },
    };
}

export function evaluateWordCount(content: string): AssessmentCheck {
    const wc = countWords(content);
    if (wc < 300) {
        return {
            id: "word_count",
            label: "Word count",
            status: "failed",
            score: 30,
            message: "Word count quá thấp, bài chưa đủ giải thích.",
            details: [`${wc} từ (tối thiểu: 300)`],
        };
    }
    if (wc < 600) {
        return {
            id: "word_count",
            label: "Word count",
            status: "warning",
            score: 70,
            message: "Word count hơi thấp — nên bổ sung approach và assumptions.",
            details: [`${wc} từ`],
        };
    }
    if (wc <= 1500) {
        return {
            id: "word_count",
            label: "Word count",
            status: "passed",
            score: 100,
            message: "Độ dài hợp lý cho một assessment submission.",
            details: [`${wc} từ`],
        };
    }
    if (wc <= 2500) {
        return {
            id: "word_count",
            label: "Word count",
            status: "warning",
            score: 75,
            message: "Word count hơi cao, nên cô đọng lại phần quan trọng.",
            details: [`${wc} từ`],
        };
    }
    return {
        id: "word_count",
        label: "Word count",
        status: "warning",
        score: 60,
        message: "Word count quá cao — có thể lan man.",
        details: [`${wc} từ`],
    };
}

export function evaluateCodeRun(
    fileName: string,
    content: string,
): AssessmentCheck {
    const sig = filenameSignals(fileName);
    const n = lower(fileName);
    const hasCodeRef =
        /main\.py|pipeline\.py|solution\.sql|\.ipynb/i.test(n) ||
        /main\.py|pipeline\.py|solution\.sql/i.test(content);
    const hasRun = /how to run|cách chạy|python main|npm run/i.test(content);

    if (sig.broken) {
        return {
            id: "code_run",
            label: "Không chạy được",
            status: "failed",
            score: 20,
            message: "Chạy thất bại: package không chạy được.",
            details: ["Không đủ thông tin để verify solution."],
            suggestions: [
                "Thêm entry point (main.py, pipeline.py, solution.sql).",
                "Bổ sung dependency instructions trong README.",
            ],
        };
    }

    if (sig.good && hasRun) {
        return {
            id: "code_run",
            label: "Không chạy được",
            status: "passed",
            score: 95,
            message: "Package chạy được.",
            details: ["Log: OK — dependencies declared in README."],
        };
    }

    if (!hasCodeRef) {
        return {
            id: "code_run",
            label: "Không chạy được",
            status: "warning",
            score: 50,
            message: "Không tìm thấy entry point như main.py, pipeline.py hoặc solution.sql.",
            suggestions: ["Đính kèm file code hoặc ghi rõ trong README."],
        };
    }
    if (!hasRun) {
        return {
            id: "code_run",
            label: "Không chạy được",
            status: "warning",
            score: 55,
            message: "Không tìm thấy hướng dẫn chạy trong README.",
            suggestions: ['Thêm section "How to run" / "Cách chạy".'],
        };
    }

    return {
        id: "code_run",
        label: "Không chạy được",
        status: "passed",
        score: 85,
        message: "Package có vẻ chạy được (heuristic).",
    };
}

export function evaluateAiSpam(content: string, fileName: string): AssessmentCheck {
    const sig = filenameSignals(fileName);
    const c = lower(content);
    let signals = 0;
    for (const p of AI_SPAM_PHRASES) {
        if (c.includes(p)) signals++;
    }
    const wc = countWords(content);
    const sections = detectSections(content);
    const keywordCoverage =
        Object.values(sections).filter(Boolean).length / SECTION_KEYWORDS.length;
    if (wc > 1200 && keywordCoverage < 0.35) signals += 2;
    if (sig.spam) signals += 4;

    let risk: "low" | "medium" | "high" = "low";
    if (signals >= 5) risk = "high";
    else if (signals >= 2) risk = "medium";

    if (risk === "high") {
        return {
            id: "ai_spam",
            label: "AI-generated obvious spam",
            status: "failed",
            score: 25,
            message:
                "Có dấu hiệu AI-generated obvious spam như lặp ý, nhiều câu generic và ít liên hệ với bài toán.",
            details: [`Risk level: ${risk}`],
        };
    }
    if (risk === "medium") {
        return {
            id: "ai_spam",
            label: "AI-generated obvious spam",
            status: "warning",
            score: 60,
            message:
                "Nội dung có dấu hiệu quá chung chung, thiếu chi tiết triển khai cụ thể.",
            details: [`Risk level: ${risk}`],
        };
    }
    return {
        id: "ai_spam",
        label: "AI-generated obvious spam",
        status: "passed",
        score: 95,
        message: "Không phát hiện dấu hiệu spam rõ ràng.",
    };
}

export function generateLlmReview(
    checks: AssessmentCheck[],
    riskFlags: string[],
    similarity: AssessmentEvaluationResult["similarity"],
    wordCount: number,
): AssessmentEvaluationResult["llmReview"] {
    const byId = Object.fromEntries(checks.map((c) => [c.id, c]));
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    if (byId.readme?.status === "passed") strengths.push("README / explanation rõ ràng.");
    if (byId.code_run?.status === "passed") strengths.push("Có hướng dẫn chạy và package có vẻ runnable.");
    if (similarity.riskLevel === "low") strengths.push("Rủi ro similarity thấp.");
    if (byId.required_sections?.status === "passed")
        strengths.push("Cấu trúc submission khá đầy đủ.");

    if (byId.readme?.status === "failed") {
        weaknesses.push("Thiếu README — reviewer khó hiểu approach.");
        recommendations.push("Thêm README.md với problem, approach, setup, run, output.");
    }
    if (byId.code_run?.status === "failed") {
        weaknesses.push("Code không chạy được — không verify được solution.");
        recommendations.push("Bổ sung entry point và dependency instructions.");
    }
    if (similarity.riskLevel !== "low") {
        weaknesses.push("Similarity / template risk cần reviewer xem thêm.");
        recommendations.push("Viết lại phần approach bằng ngôn ngữ riêng, thêm trade-offs.");
    }
    if (byId.placeholder?.status !== "passed") {
        weaknesses.push("Còn placeholder hoặc section rỗng.");
        recommendations.push("Hoàn thiện từng section trước khi nộp lại.");
    }
    if (wordCount < 300) {
        weaknesses.push("Word count quá thấp.");
        recommendations.push("Mở rộng assumptions, output explanation và limitations.");
    }
    if (byId.ai_spam?.status !== "passed") {
        weaknesses.push("Giải thích hơi generic — cần chi tiết triển khai.");
    }

    if (strengths.length === 0) strengths.push("Submission đã được upload để review.");
    if (weaknesses.length === 0) weaknesses.push("Không có blocker lớn.");
    if (recommendations.length === 0)
        recommendations.push("Giữ cấu trúc hiện tại và polish clarity trước khi nộp thật.");

    const failed = checks.filter((c) => c.status === "failed").length;
    const warnings = checks.filter((c) => c.status === "warning").length;

    let reviewerDecision: AssessmentDecision = "Pass";
    if (failed >= 2 || byId.readme?.status === "failed" || byId.format?.status === "failed") {
        reviewerDecision = "Reject";
    } else if (failed >= 1 || warnings >= 3 || similarity.riskLevel === "high") {
        reviewerDecision = "Needs Review";
    } else if (
        failed === 0 &&
        warnings <= 1 &&
        checks.every((c) => c.score >= 80)
    ) {
        reviewerDecision = "Strong Pass";
    }

    const summary =
        reviewerDecision === "Strong Pass"
            ? "Submission có cấu trúc khá đầy đủ, README và hướng dẫn chạy ổn. Rủi ro similarity thấp."
            : reviewerDecision === "Pass"
              ? "Bài đủ điều kiện pass, nhưng vẫn có điểm nên cải thiện."
              : reviewerDecision === "Needs Review"
                ? "Bài chưa đủ mạnh. Reviewer có thể cần xem thêm vì có cảnh báo về README, similarity hoặc khả năng chạy."
                : "Bài có lỗi nghiêm trọng như thiếu README, format sai hoặc nội dung quá rỗng.";

    if (riskFlags.length) {
        weaknesses.push(...riskFlags.slice(0, 2));
    }

    return {
        summary,
        strengths,
        weaknesses,
        recommendations,
        reviewerDecision,
    };
}

function aggregateScore(checks: AssessmentCheck[]): number {
    const weights: Record<string, number> = {
        format: 0.05,
        deadline: 0.05,
        required_sections: 0.1,
        readme: 0.1,
        code_run: 0.2,
        template_copy: 0.1,
        similarity: 0.1,
        placeholder: 0.05,
        word_count: 0.05,
        spell_check: 0.05,
        ai_spam: 0.05,
    };
    let total = 0;
    let w = 0;
    for (const c of checks) {
        const weight = weights[c.id] ?? 0.05;
        total += c.score * weight;
        w += weight;
    }
    const llmBoost =
        checks.filter((c) => c.status === "passed").length / Math.max(checks.length, 1);
    return Math.round(Math.min(100, total / w + llmBoost * 10));
}

function capScore(
    score: number,
    decision: AssessmentDecision,
    checks: AssessmentCheck[],
    plagiarism: number,
    simulateLate: boolean,
): { score: number; decision: AssessmentDecision } {
    const byId = Object.fromEntries(checks.map((c) => [c.id, c]));
    let s = score;
    let d = decision;

    const hardFail =
        !byId.format ||
        byId.format.status === "failed" ||
        byId.readme?.status === "failed" ||
        byId.placeholder?.status === "failed" ||
        (byId.template_copy?.status === "failed" &&
            byId.template_copy.details?.[0]?.includes("92"));

    if (hardFail) s = Math.min(s, 50);

    if (plagiarism > 85) {
        s = Math.min(s, 60);
        if (d === "Strong Pass" || d === "Pass") d = "Needs Review";
    }

    if (simulateLate) s = Math.min(s, 80);

    if (byId.code_run?.status === "failed" && byId.readme?.status === "failed") {
        s = Math.min(s, 45);
        d = "Reject";
    }

    if (s >= 90) d = "Strong Pass";
    else if (s >= 75) d = d === "Reject" ? "Reject" : d === "Needs Review" ? "Needs Review" : "Pass";
    else if (s >= 55) d = d === "Reject" ? "Reject" : "Needs Review";
    else d = "Reject";

    return { score: s, decision: d };
}

export function evaluateAssessmentSubmission(
    file: File | null,
    content: string,
    options: EvaluateOptions = {},
): AssessmentEvaluationResult {
    const submittedAt = options.submittedAt ?? new Date();
    const preCheckOnly = options.preCheckOnly ?? false;
    const simulateLate = options.simulateLate ?? false;

    const format = evaluateFormat(file);
    const deadline = evaluateDeadline(submittedAt, simulateLate);
    const required = evaluateRequiredSections(content, file?.name ?? "");
    const readme = evaluateReadme(content, file?.name ?? "");
    const placeholder = evaluatePlaceholderContent(content);
    const wordCountCheck = evaluateWordCount(content);
    const wc = countWords(content);

    const checks: AssessmentCheck[] = [
        format,
        deadline,
        required,
        readme,
        placeholder,
        wordCountCheck,
    ];

    if (preCheckOnly) {
        return {
            overallScore: aggregateScore(checks),
            decision: "Needs Review",
            checks,
            riskFlags: simulateLate ? ["Nộp trễ"] : [],
            similarity: {
                templateSimilarity: 0,
                plagiarismSimilarity: 0,
                matchedSource: "—",
                riskLevel: "low",
            },
            spellCheck: { issueCount: 0, warnings: [] },
            wordCount: wc,
            llmReview: {
                summary: "Pre-check hoàn tất. Chạy Chấm bài để xem similarity, code run và LLM review.",
                strengths: [],
                weaknesses: checks
                    .filter((c) => c.status === "failed")
                    .map((c) => c.message),
                recommendations: checks
                    .flatMap((c) => c.suggestions ?? [])
                    .slice(0, 4),
                reviewerDecision: "Needs Review",
            },
            preCheckOnly: true,
        };
    }

    const template = evaluateTemplateSimilarity(content, file?.name ?? "");
    const plag = evaluatePlagiarismSimilarity(content, file?.name ?? "");
    const spell = evaluateSpellCheck(content);
    const codeRun = evaluateCodeRun(file?.name ?? "", content);
    const aiSpam = evaluateAiSpam(content, file?.name ?? "");

    checks.push(
        template.check,
        plag.check,
        spell.check,
        codeRun,
        aiSpam,
    );

    const riskFlags: string[] = [];
    if (simulateLate) riskFlags.push("Không đúng deadline");
    if (plag.riskLevel === "high") riskFlags.push("Similarity cao — cần manual review");
    if (readme.status === "failed") riskFlags.push("Thiếu README / explanation");
    if (codeRun.status === "failed") riskFlags.push("Package không chạy được");
    if (aiSpam.status === "failed") riskFlags.push("Rủi ro AI spam");

    let overallScore = aggregateScore(checks);
    let decision: AssessmentDecision = "Pass";
    const failed = checks.filter((c) => c.status === "failed").length;
    if (failed >= 3) decision = "Reject";
    else if (failed >= 1) decision = "Needs Review";
    else if (overallScore >= 90) decision = "Strong Pass";

    const capped = capScore(
        overallScore,
        decision,
        checks,
        plag.plagiarismSimilarity,
        simulateLate,
    );
    overallScore = capped.score;
    decision = capped.decision;

    const llmReview = generateLlmReview(
        checks,
        riskFlags,
        {
            templateSimilarity: template.score,
            plagiarismSimilarity: plag.plagiarismSimilarity,
            matchedSource: plag.matchedSource,
            riskLevel: plag.riskLevel,
        },
        wc,
    );

    if (llmReview.reviewerDecision === "Reject" && decision !== "Reject") {
        decision = "Needs Review";
    }

    return {
        overallScore,
        decision,
        checks,
        riskFlags,
        similarity: {
            templateSimilarity: template.score,
            plagiarismSimilarity: plag.plagiarismSimilarity,
            matchedSource: plag.matchedSource,
            riskLevel: plag.riskLevel,
        },
        spellCheck: {
            issueCount: spell.issueCount,
            warnings: spell.warnings,
        },
        wordCount: wc,
        llmReview: { ...llmReview, reviewerDecision: decision },
    };
}

export async function readSubmissionText(file: File): Promise<string> {
    const ext = fileExt(file.name);
    if (ext === ".md" || ext === ".txt") {
        return file.text();
    }
    if (ext === ".zip" || ext === ".tar.gz" || ext === ".pdf" || ext === ".docx") {
        return mockZipContentFromFilename(file.name);
    }
    return "";
}

function mockZipContentFromFilename(name: string): string {
    const sig = filenameSignals(name);
    if (sig.noReadme) {
        return "# Submission\n\n## Approach\nSome approach.\n\n## Setup\npip install -r requirements.txt\n";
    }
    if (sig.empty || name.includes("empty-placeholder")) {
        return "# README\n\nTODO\n\n## Approach\nfill here\n\n## Setup\nTBD\n";
    }
    if (sig.short || name.includes("too-short")) {
        return "# README\n\nShort submission only.";
    }
    if (sig.spam || name.includes("ai-spam")) {
        return `# README\n\nAs an AI language model, this is a comprehensive solution leveraging best practices.\nIt is important to note that we provide robust and scalable architecture.\nIn conclusion, cutting-edge pipeline.\n${"Generic paragraph. ".repeat(40)}`;
    }
    if (sig.template || name.includes("template-only")) {
        return `# README Template\n\n## Problem understanding\n\n## Approach\n\n## Setup instructions\n\n## Run instructions\n\n## Assumptions\n\n## Output\n\n## Limitations\n`;
    }
    if (sig.broken) {
        return `# README\n\n## Problem understanding\nData pipeline intern assessment.\n\n## Approach\nETL design.\n\n## Setup\nnpm install\n`;
    }
    if (sig.good || /complete|final|pass/.test(lower(name))) {
        return `# README — DE Intern Assessment

## Problem understanding
Build a mock data pipeline for e-commerce orders.

## Approach
Batch ETL with Python; validate with SQL checks.

## Setup instructions
pip install -r requirements.txt

## How to run
python main.py --input data/orders.csv

## Assumptions
CSV schema matches sample; timezone UTC.

## Output
Parquet files in out/ with row counts logged.

## Limitations / trade-offs
No streaming; single-machine prototype only.
`;
    }
    return `# README\n\n## Problem understanding\nIntern assessment practice.\n\n## Approach\nPipeline sketch.\n\n## Setup\nInstall deps.\n\n## How to run\npython main.py\n\n## Assumptions\nSample data.\n`;
}
