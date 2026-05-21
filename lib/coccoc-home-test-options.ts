import type { QuickReply } from "./chat-types";
import type { HomeTestUiAction } from "./coccoc-home-test-panel";

const tab = (t: HomeTestUiAction["setTab"]): HomeTestUiAction => ({ setTab: t });
const part = (p: 1 | 2 | 3 | 4 | 5 | 6): HomeTestUiAction => ({ setPart: p });

export const COCCOC_HOME_INTRO_OPTIONS: QuickReply[] = [
    { id: "c1", label: "Xem cấu trúc bài test", action: "cc:structure", uiAction: tab("brief") },
    { id: "c2", label: "Xem dữ liệu", action: "cc:data", uiAction: tab("data") },
    { id: "c3", label: "Bắt đầu Phần 1", action: "cc:part1", uiAction: part(1) },
    { id: "c4", label: "Xem tiêu chí chấm", action: "cc:criteria", uiAction: tab("summary") },
];

export function coccocPartOptions(activePart: number): QuickReply[] {
    const next = Math.min(6, activePart + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    const opts: QuickReply[] = [
        { id: "cq", label: "Xem câu hỏi", action: "cc:questions", uiAction: tab("questions") },
        { id: "cr", label: "Xem kết quả", action: "cc:results", uiAction: tab("results") },
    ];
    if (activePart < 6) {
        opts.push({
            id: "cn",
            label: `Sang Phần ${next}`,
            action: `cc:part${next}`,
            uiAction: part(next),
        });
    }
    return opts;
}

export const COCCOC_HOME_DONE_OPTIONS: QuickReply[] = [
    { id: "cref", label: "Đáp án tham khảo", action: "cc:reference", uiAction: tab("reference") },
    { id: "csum", label: "Tổng kết", action: "cc:summary", uiAction: tab("summary") },
];
