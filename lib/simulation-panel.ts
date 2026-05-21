/** Simulation workspace panel tab + highlight coordination */

export type SimulationTab =
    | "brief"
    | "data"
    | "result"
    | "resources"
    | "modelAnswer"
    | "summary";

export type HighlightTarget =
    | "businessContext"
    | "deliverable"
    | "instruction"
    | "relatedSkills"
    | "dataset"
    | "result"
    | "modelAnswer"
    | null;

export type SimulationUiAction = {
    setTab?: SimulationTab;
    highlight?: HighlightTarget;
    requiresModelAnswerUnlocked?: boolean;
};

export const SIMULATION_TAB_LABELS: Record<SimulationTab, string> = {
    brief: "Brief",
    data: "Dữ liệu",
    result: "Kết quả",
    resources: "Tài nguyên",
    modelAnswer: "Đáp án mẫu",
    summary: "Tổng kết",
};

export function highlightSectionClass(
    section: HighlightTarget,
    active: HighlightTarget | null,
): string {
    if (!active || section !== active) return "";
    return "rounded-lg ring-2 ring-violet-400/80 bg-violet-50/90 transition-all duration-300 dark:ring-indigo-500/60 dark:bg-indigo-950/40";
}
