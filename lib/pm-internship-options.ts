import type { QuickReply } from "./chat-types";
import type { DocumentUiAction } from "./document-panel";

const tab = (t: DocumentUiAction["setTab"]): DocumentUiAction => ({ setTab: t });

/** PRD interview — no “Tôi sẵn sàng làm task”. */
export const PRD_INTRO_OPTIONS: QuickReply[] = [
    {
        id: "p1",
        label: "Xem brief",
        action: "prd:brief",
        uiAction: tab("brief"),
    },
    {
        id: "p2",
        label: "Tải template",
        action: "prd:template",
        uiAction: tab("template"),
    },
    {
        id: "p3",
        label: "Xem tiêu chí chấm",
        action: "prd:criteria",
        uiAction: tab("evaluation"),
    },
    {
        id: "p4",
        label: "Xem tài nguyên",
        action: "prd:resources",
        uiAction: tab("resources"),
    },
];

export const PRD_UPLOADED_OPTIONS: QuickReply[] = [
    {
        id: "u1",
        label: "Xem brief",
        action: "prd:brief",
        uiAction: tab("brief"),
    },
    {
        id: "u2",
        label: "Xem tiêu chí chấm",
        action: "prd:criteria",
        uiAction: tab("evaluation"),
    },
    ...PRD_INTRO_OPTIONS.filter((o) => o.id !== "p1"),
];

export const PRD_PASSED_OPTIONS: QuickReply[] = [
    {
        id: "pass1",
        label: "Xem đáp án tham khảo",
        action: "prd:sample",
        uiAction: { setTab: "modelAnswer", requiresModelUnlocked: true },
    },
    {
        id: "pass2",
        label: "Xem nhận xét chi tiết",
        action: "prd:evaluation",
        uiAction: tab("evaluation"),
    },
    {
        id: "pass3",
        label: "Hoàn thành task",
        action: "prd:complete",
    },
];

export const PRD_FAILED_OPTIONS: QuickReply[] = [
    {
        id: "f1",
        label: "Xem phần còn thiếu",
        action: "prd:evaluation",
        uiAction: tab("evaluation"),
    },
    {
        id: "f2",
        label: "Xem tài nguyên",
        action: "prd:resources",
        uiAction: tab("resources"),
    },
    {
        id: "f3",
        label: "Upload lại",
        action: "prd:reupload",
        uiAction: tab("submit"),
    },
    {
        id: "f4",
        label: "Xem template",
        action: "prd:template",
        uiAction: tab("template"),
    },
];
