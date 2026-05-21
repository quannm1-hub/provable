/** Sample analytics rows for Cốc Cốc DE assessment schema preview */

export const COCCOC_DE_SAMPLE_EVENTS = [
    { event_id: 1, user_id: 1001, event_type: "page_view", event_date: "2024-03-01" },
    { event_id: 2, user_id: 1002, event_type: "search", event_date: "2024-03-01" },
];

export const COCCOC_DE_SAMPLE_DOMAINS = [
    { domain: "news.example.vn", visit_count: 1200, rank: 1 },
    { domain: "shop.example.vn", visit_count: 890, rank: 2 },
];

export const COCCOC_DE_SAMPLE_DAU = [
    { date: "2024-03-01", dau: 12500, platform: "desktop" },
    { date: "2024-03-01", dau: 8200, platform: "mobile" },
];

export const COCCOC_DE_SAMPLE_PIPELINES = [
    { pipeline_id: "clickstream_daily", owner: "data-platform", status: "active" },
    { pipeline_id: "dau_aggregate", owner: "data-platform", status: "active" },
];

export type CoccocDePreviewTable = "events" | "domains" | "dau" | "pipelines";

export function getCoccocDePreviewRows(
    table: CoccocDePreviewTable,
): Record<string, string | number>[] {
    switch (table) {
        case "events":
            return COCCOC_DE_SAMPLE_EVENTS.map((r) => ({ ...r }));
        case "domains":
            return COCCOC_DE_SAMPLE_DOMAINS.map((r) => ({ ...r }));
        case "dau":
            return COCCOC_DE_SAMPLE_DAU.map((r) => ({ ...r }));
        case "pipelines":
            return COCCOC_DE_SAMPLE_PIPELINES.map((r) => ({ ...r }));
    }
}
