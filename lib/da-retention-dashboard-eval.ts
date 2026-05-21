export type DashboardEvalResult = {
    score: number;
    statusLabel: string;
    passed: boolean;
    message: string;
    checklist: { label: string; ok: boolean }[];
};

async function readText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result ?? ""));
        r.onerror = () => reject(r.error);
        r.readAsText(file);
    });
}

export async function evaluateDashboardUpload(file: File): Promise<DashboardEvalResult> {
    const name = file.name.toLowerCase();
    let score = 80;
    if (/(dashboard|retention|final|pass)/.test(name)) score = 90;
    if (/(draft)/.test(name)) score = 72;

    const ext = name.split(".").pop() ?? "";
    if (ext === "md" || ext === "txt") {
        try {
            const text = (await readText(file)).toLowerCase();
            let kw = 0;
            const keywords = [
                "north star",
                "weekly retained",
                "d7",
                "d30",
                "cohort",
                "chart",
                "retention",
                "pm",
                "label",
            ];
            keywords.forEach((k) => {
                if (text.includes(k)) kw += 1;
            });
            score = Math.min(95, 60 + kw * 5);
        } catch {
            /* keep filename score */
        }
    }

    const checklist = [
        { label: "Ít nhất 2 chart", ok: score >= 75 },
        { label: "1 chỉ số north star", ok: score >= 70 },
        { label: "Label rõ ràng", ok: score >= 72 },
        { label: "Phù hợp theo dõi retention hàng tuần", ok: score >= 78 },
    ];

    const passed = score >= 80;
    return {
        score,
        statusLabel: passed ? "Đạt" : score >= 60 ? "Cần cải thiện" : "Chưa đạt",
        passed,
        message: passed
            ? "Dashboard đáp ứng yêu cầu."
            : "Cần bổ sung north star, chart retention và label rõ hơn.",
        checklist,
    };
}
