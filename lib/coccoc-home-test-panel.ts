export type HomeTestPanelTab =
    | "brief"
    | "data"
    | "questions"
    | "results"
    | "reference"
    | "resources"
    | "summary";

export type HomeTestUiAction = {
    setTab?: HomeTestPanelTab;
    setPart?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const HOME_TEST_PANEL_LABELS: Record<HomeTestPanelTab, string> = {
    brief: "Brief",
    data: "Dữ liệu",
    questions: "Câu hỏi",
    results: "Kết quả",
    reference: "Đáp án tham khảo",
    resources: "Tài nguyên",
    summary: "Tổng kết",
};
