export type ZipEvalResult = {
    score: number;
    statusLabel: string;
    passed: boolean;
    message: string;
    foundFiles: string[];
    missingFiles: string[];
    checklist: { label: string; ok: boolean }[];
};

const REQUIRED_FILES = ["task1.sql", "task2.sql", "task3.sql"];

export async function evaluateCoccocDeZipUpload(
    file: File,
    checklist: Record<string, boolean>,
): Promise<ZipEvalResult> {
    const name = file.name.toLowerCase();
    let score = 70;
    const foundFiles: string[] = [];
    const missingFiles: string[] = [];

    if (!name.endsWith(".zip")) {
        return {
            score: 0,
            statusLabel: "Chưa đạt",
            passed: false,
            message: "Vui lòng nộp file .zip.",
            foundFiles: [],
            missingFiles: REQUIRED_FILES,
            checklist: buildChecklist(checklist, false),
        };
    }

    if (/(coccoc|assessment|complete|final|pass)/.test(name)) score += 15;
    if (/(draft|partial)/.test(name)) score -= 15;

    REQUIRED_FILES.forEach((f) => {
        if (name.includes(f.replace(".sql", "")) || name.includes("sql")) {
            foundFiles.push(f);
        } else {
            missingFiles.push(f);
        }
    });

    if (checklist.cloned) score += 5;
    if (checklist.branch) score += 5;
    if (checklist.task1) score += 5;
    if (checklist.task2) score += 5;
    if (checklist.task3) score += 5;

    try {
        const buf = await file.arrayBuffer();
        const bytes = new Uint8Array(buf);
        const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, 8000));
        REQUIRED_FILES.forEach((f) => {
            if (text.includes(f) && !foundFiles.includes(f)) foundFiles.push(f);
        });
        if (text.includes("SELECT") || text.includes("select")) score += 10;
        if (text.includes("JOIN") || text.includes("join")) score += 5;
        if (text.includes("GROUP BY") || text.includes("group by")) score += 5;
    } catch {
        /* binary zip — rely on filename + checklist */
    }

    missingFiles.length = 0;
    REQUIRED_FILES.forEach((f) => {
        if (!foundFiles.includes(f)) missingFiles.push(f);
    });

    if (foundFiles.length === 3) score = Math.max(score, 88);
    if (missingFiles.length === 0 && checklist.task1 && checklist.task2 && checklist.task3) {
        score = Math.min(98, score + 8);
    }

    score = Math.min(100, Math.max(0, score));
    const passed = score >= 80;

    return {
        score,
        statusLabel: passed ? "Đạt" : score >= 60 ? "Cần cải thiện" : "Chưa đạt",
        passed,
        message: passed
            ? "Bài nộp zip đáp ứng yêu cầu (có đủ 3 file SQL hoặc nội dung tương đương)."
            : "Zip cần chứa sql/task1.sql, task2.sql, task3.sql. Kiểm tra checklist trước khi nộp lại.",
        foundFiles,
        missingFiles,
        checklist: buildChecklist(checklist, passed),
    };
}

function buildChecklist(
    c: Record<string, boolean>,
    passed: boolean,
): ZipEvalResult["checklist"] {
    return [
        { label: "Đã clone repository", ok: !!c.cloned },
        { label: "Đã tạo branch làm bài", ok: !!c.branch },
        { label: "task1.sql hoàn thành", ok: !!c.task1 },
        { label: "task2.sql hoàn thành", ok: !!c.task2 },
        { label: "task3.sql hoàn thành", ok: !!c.task3 },
        { label: "Zip đúng cấu trúc", ok: passed },
    ];
}
