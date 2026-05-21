export type RetentionPanelTab =
    | "brief"
    | "data"
    | "sqlResults"
    | "insight"
    | "dashboard"
    | "evaluation"
    | "reference"
    | "resources";

export type RetentionUiAction = {
    setTab?: RetentionPanelTab;
    setPart?: 1 | 2 | 3;
};

export const RETENTION_PANEL_LABELS: Record<RetentionPanelTab, string> = {
    brief: "Brief",
    data: "Dữ liệu",
    sqlResults: "Kết quả SQL",
    insight: "Insight",
    dashboard: "Dashboard",
    evaluation: "Đánh giá",
    reference: "Đáp án tham khảo",
    resources: "Tài nguyên",
};
