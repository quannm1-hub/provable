/** Document / PRD interview task panel tabs */

export type DocumentTab =
    | "brief"
    | "template"
    | "submit"
    | "evaluation"
    | "modelAnswer"
    | "resources";

export type DocumentHighlightTarget =
    | "brief"
    | "criteria"
    | "upload"
    | "evaluation"
    | null;

export type DocumentUiAction = {
    setTab?: DocumentTab;
    highlight?: DocumentHighlightTarget;
    requiresModelUnlocked?: boolean;
};

export const DOCUMENT_TAB_LABELS: Record<DocumentTab, string> = {
    brief: "Brief",
    template: "Template",
    submit: "Nộp bài",
    evaluation: "Kết quả đánh giá",
    modelAnswer: "Đáp án tham khảo",
    resources: "Tài nguyên",
};

export function documentHighlightClass(
    section: DocumentHighlightTarget,
    active: DocumentHighlightTarget | null,
): string {
    if (!active || section !== active) return "";
    return "rounded-lg ring-2 ring-violet-400/80 bg-violet-50/90 transition-all duration-300 dark:ring-indigo-500/60 dark:bg-indigo-950/40";
}
