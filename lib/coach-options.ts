import type { QuickReply } from "./chat-types";
import type { LearningUiAction } from "./learning-panel";

const lesson = (): LearningUiAction => ({ setTab: "lesson" });
const data = (): LearningUiAction => ({ setTab: "data" });
const result = (): LearningUiAction => ({ setTab: "result" });
const hint = (): LearningUiAction => ({ setTab: "hint" });

export const CONFIDENCE_OPTIONS: QuickReply[] = [
    { id: "c1", label: "Tôi chưa biết phần này", action: "confidence:none" },
    { id: "c2", label: "Tôi biết sơ qua", action: "confidence:little" },
    { id: "c3", label: "Tôi đã hiểu khá rõ", action: "confidence:master" },
];

export const EXERCISE_HELP_OPTIONS: QuickReply[] = [
    { id: "h1", label: "Giải thích lại", action: "help:explain", uiAction: lesson() },
    { id: "h2", label: "Cho ví dụ dễ hơn", action: "help:example", uiAction: lesson() },
    { id: "h3", label: "Cho bài tập khác", action: "help:practice", uiAction: lesson() },
    { id: "h4", label: "Hiện gợi ý", action: "help:hint", uiAction: hint() },
    { id: "h5", label: "Xem dữ liệu", action: "learn:data", uiAction: data() },
];

export const MODULE_COMPLETE_OPTIONS = (moduleTitle: string): QuickReply[] => [
    { id: "m1", label: "Sang phần tiếp theo", action: "module:continue" },
    { id: "m2", label: "Luyện thêm phần này", action: "module:practice" },
    { id: "m3", label: `Ôn lại ${moduleTitle}`, action: "module:explain" },
];

export const FINAL_MODULE_OPTIONS: QuickReply[] = [
    { id: "f1", label: "Hoàn thành SQL cơ bản", action: "learn:finish" },
    { id: "f2", label: "Ôn lại phần này", action: "module:explain" },
];

export const WRONG_RETRY_OPTIONS: QuickReply[] = [
    { id: "w1", label: "Giải thích ngắn gọn", action: "help:explain" },
    { id: "w2", label: "Cho ví dụ dễ hơn", action: "help:example" },
    { id: "w3", label: "Cho tôi thử lại", action: "help:retry" },
    { id: "w4", label: "Hiện đáp án mẫu", action: "help:scaffold" },
];

export const SUCCESS_NEXT_OPTIONS: QuickReply[] = [
    { id: "s1", label: "Sang phần tiếp theo", action: "module:continue" },
    { id: "s2", label: "Làm thêm bài tương tự", action: "module:practice" },
    { id: "s3", label: "Xem giải thích vì sao đúng", action: "help:why-correct" },
];

export const STUCK_WHERE_OPTIONS: QuickReply[] = [
    { id: "sw1", label: "Nhắc lại WHERE", action: "help:explain" },
    { id: "sw2", label: "Hiện gợi ý mạnh hơn", action: "help:hint" },
    { id: "sw3", label: "Cho query mẫu có chỗ trống", action: "help:scaffold" },
    { id: "sw4", label: "Đổi sang bài dễ hơn", action: "help:practice" },
];
