import type { QuickReply } from "./chat-types";
import type { SimulationUiAction } from "./simulation-panel";

const brief = (highlight: SimulationUiAction["highlight"]): SimulationUiAction => ({
    setTab: "brief",
    highlight,
});

export const BRIEFING_OPTIONS: QuickReply[] = [
    {
        id: "b1",
        label: "Tôi sẵn sàng làm task",
        action: "intern:start",
        uiAction: brief("deliverable"),
    },
    {
        id: "b2",
        label: "Xem bối cảnh",
        action: "intern:context",
        uiAction: brief("businessContext"),
    },
    {
        id: "b3",
        label: "Xem yêu cầu đầu ra",
        action: "intern:deliverable",
        uiAction: brief("deliverable"),
    },
];

export const WORKING_OPTIONS: QuickReply[] = [
    {
        id: "w1",
        label: "Xem bối cảnh",
        action: "intern:business",
        uiAction: brief("businessContext"),
    },
    {
        id: "w2",
        label: "Xem yêu cầu đầu ra",
        action: "intern:deliverable",
        uiAction: brief("deliverable"),
    },
    {
        id: "w3",
        label: "Xem dữ liệu",
        action: "intern:data",
        uiAction: { setTab: "data", highlight: "dataset" },
    },
    {
        id: "w4",
        label: "Xem tài nguyên",
        action: "intern:resources",
        uiAction: { setTab: "resources" },
    },
    {
        id: "w5",
        label: "Xem gợi ý",
        action: "intern:hint",
        uiAction: { setTab: "brief", highlight: "instruction" },
    },
    {
        id: "w6",
        label: "Tôi sẵn sàng làm task",
        action: "intern:ready",
        uiAction: brief("deliverable"),
    },
    {
        id: "w7",
        label: "Giải thích vì sao task này quan trọng",
        action: "intern:why",
        uiAction: brief("businessContext"),
    },
];

export const WORKING_WITH_MODEL: QuickReply[] = [
    ...WORKING_OPTIONS,
    {
        id: "w8",
        label: "Mở đáp án mẫu",
        action: "intern:model",
        uiAction: {
            setTab: "modelAnswer",
            highlight: "modelAnswer",
            requiresModelAnswerUnlocked: true,
        },
    },
    {
        id: "w9",
        label: "Task tiếp theo",
        action: "intern:next",
        uiAction: { setTab: "brief" },
    },
];

export const SUBMITTED_OPTIONS: QuickReply[] = [
    {
        id: "s0",
        label: "Xem vì sao đúng",
        action: "intern:why-correct",
        uiAction: { setTab: "modelAnswer", highlight: "modelAnswer" },
    },
    {
        id: "s1",
        label: "Xem đáp án mẫu",
        action: "intern:model",
        uiAction: {
            setTab: "modelAnswer",
            highlight: "modelAnswer",
            requiresModelAnswerUnlocked: true,
        },
    },
    {
        id: "s2",
        label: "Xem lại kết quả",
        action: "intern:review",
        uiAction: { setTab: "result", highlight: "result" },
    },
    {
        id: "s3",
        label: "Task tiếp theo",
        action: "intern:next",
        uiAction: { setTab: "brief" },
    },
    {
        id: "s4",
        label: "Ôn kỹ năng liên quan",
        action: "intern:review-skills",
        uiAction: { setTab: "brief", highlight: "relatedSkills" },
    },
];

export const MODEL_OPTIONS: QuickReply[] = [
    {
        id: "m1",
        label: "Trả lời câu phản tư",
        action: "intern:reflect",
    },
    {
        id: "s2",
        label: "Xem lại kết quả",
        action: "intern:review",
        uiAction: { setTab: "result", highlight: "result" },
    },
    {
        id: "m2",
        label: "Xem đáp án mẫu",
        action: "intern:model",
        uiAction: {
            setTab: "modelAnswer",
            highlight: "modelAnswer",
            requiresModelAnswerUnlocked: true,
        },
    },
];

export const REFLECTION_NEXT: QuickReply[] = [
    {
        id: "n1",
        label: "Task tiếp theo",
        action: "intern:next",
        uiAction: { setTab: "brief" },
    },
];

export const COMPLETE_OPTIONS: QuickReply[] = [
    { id: "c1", label: "Xem lại đáp án mẫu", action: "intern:reviewAll" },
    { id: "c2", label: "Làm lại mô phỏng", action: "intern:restart" },
    { id: "c3", label: "Quay về Bảng điều khiển", action: "intern:dashboard" },
];
