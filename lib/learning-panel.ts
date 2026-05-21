/** Learning workspace panel tab coordination */

export type LearningTab = "lesson" | "data" | "result" | "hint";

export type LearningUiAction = {
    setTab?: LearningTab;
};

export const LEARNING_TAB_LABELS: Record<LearningTab, string> = {
    lesson: "Bài học",
    data: "Dữ liệu",
    result: "Kết quả",
    hint: "Gợi ý",
};
