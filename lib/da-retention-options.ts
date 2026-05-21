import type { QuickReply } from "./chat-types";
import type { RetentionUiAction } from "./da-retention-panel";

const tab = (t: RetentionUiAction["setTab"]): RetentionUiAction => ({ setTab: t });
const part = (p: 1 | 2 | 3): RetentionUiAction => ({ setPart: p });

export const DA_INTRO_OPTIONS: QuickReply[] = [
    { id: "d1", label: "Xem brief", action: "da:brief", uiAction: tab("brief") },
    { id: "d2", label: "Xem dữ liệu", action: "da:data", uiAction: tab("data") },
    { id: "d3", label: "Bắt đầu Phần 1", action: "da:part1", uiAction: part(1) },
    { id: "d4", label: "Xem tiêu chí chấm", action: "da:criteria", uiAction: tab("evaluation") },
];

export function daPart1Options(): QuickReply[] {
    return [
        { id: "p1a", label: "Xem câu hỏi SQL", action: "da:sql", uiAction: tab("sqlResults") },
        { id: "p1b", label: "Dùng kết quả mẫu", action: "da:mock-sql" },
        { id: "p1c", label: "Sang Phần 2", action: "da:part2", uiAction: part(2) },
        { id: "d2", label: "Xem dữ liệu", action: "da:data", uiAction: tab("data") },
    ];
}

export function daPart2Options(): QuickReply[] {
    return [
        { id: "p2a", label: "Xem kết quả Phần 1", action: "da:sql-results", uiAction: tab("sqlResults") },
        { id: "p2b", label: "Dùng insight mẫu", action: "da:sample-insight" },
        { id: "p2c", label: "Sang Phần 3", action: "da:part3", uiAction: part(3) },
    ];
}

export function daPart3Options(): QuickReply[] {
    return [
        { id: "p3a", label: "Xem yêu cầu dashboard", action: "da:dash-req", uiAction: tab("dashboard") },
        { id: "p3b", label: "Upload dashboard", action: "da:dash-upload", uiAction: tab("dashboard") },
        { id: "p3c", label: "Hoàn thành interview", action: "da:complete" },
    ];
}

export function daDoneOptions(): QuickReply[] {
    return [
        { id: "done1", label: "Xem đáp án tham khảo", action: "da:reference", uiAction: tab("reference") },
        { id: "done2", label: "Xem đánh giá", action: "da:eval", uiAction: tab("evaluation") },
    ];
}
