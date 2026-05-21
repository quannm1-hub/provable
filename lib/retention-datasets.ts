/** Mock datasets for NovaPay retention interview case */

export const RETENTION_USERS = [
    { user_id: "u001", signup_date: "2026-01-03", cohort_month: "2026-01", tier: "free", acquisition_channel: "organic", country: "VN" },
    { user_id: "u002", signup_date: "2026-01-08", cohort_month: "2026-01", tier: "premium", acquisition_channel: "paid_ads", country: "VN" },
    { user_id: "u003", signup_date: "2026-01-15", cohort_month: "2026-01", tier: "free", acquisition_channel: "referral", country: "VN" },
    { user_id: "u004", signup_date: "2026-02-02", cohort_month: "2026-02", tier: "free", acquisition_channel: "organic", country: "VN" },
    { user_id: "u005", signup_date: "2026-02-09", cohort_month: "2026-02", tier: "premium", acquisition_channel: "paid_ads", country: "VN" },
    { user_id: "u006", signup_date: "2026-02-18", cohort_month: "2026-02", tier: "free", acquisition_channel: "referral", country: "VN" },
    { user_id: "u007", signup_date: "2026-03-04", cohort_month: "2026-03", tier: "free", acquisition_channel: "organic", country: "VN" },
    { user_id: "u008", signup_date: "2026-03-10", cohort_month: "2026-03", tier: "premium", acquisition_channel: "referral", country: "VN" },
    { user_id: "u009", signup_date: "2026-03-15", cohort_month: "2026-03", tier: "free", acquisition_channel: "paid_ads", country: "VN" },
    { user_id: "u010", signup_date: "2026-03-21", cohort_month: "2026-03", tier: "free", acquisition_channel: "organic", country: "VN" },
];

export const RETENTION_TRANSACTIONS = [
    { transaction_id: "t001", user_id: "u001", transaction_date: "2026-01-04", transaction_type: "top_up", amount_vnd: 200000 },
    { transaction_id: "t002", user_id: "u001", transaction_date: "2026-01-09", transaction_type: "bill_payment", amount_vnd: 150000 },
    { transaction_id: "t003", user_id: "u002", transaction_date: "2026-01-09", transaction_type: "top_up", amount_vnd: 700000 },
    { transaction_id: "t004", user_id: "u002", transaction_date: "2026-01-20", transaction_type: "transfer", amount_vnd: 300000 },
    { transaction_id: "t005", user_id: "u003", transaction_date: "2026-01-16", transaction_type: "top_up", amount_vnd: 100000 },
    { transaction_id: "t006", user_id: "u004", transaction_date: "2026-02-03", transaction_type: "top_up", amount_vnd: 600000 },
    { transaction_id: "t007", user_id: "u004", transaction_date: "2026-02-10", transaction_type: "bill_payment", amount_vnd: 220000 },
    { transaction_id: "t008", user_id: "u005", transaction_date: "2026-02-10", transaction_type: "transfer", amount_vnd: 800000 },
    { transaction_id: "t009", user_id: "u006", transaction_date: "2026-02-20", transaction_type: "top_up", amount_vnd: 50000 },
    { transaction_id: "t010", user_id: "u007", transaction_date: "2026-03-05", transaction_type: "top_up", amount_vnd: 120000 },
    { transaction_id: "t011", user_id: "u008", transaction_date: "2026-03-11", transaction_type: "top_up", amount_vnd: 900000 },
    { transaction_id: "t012", user_id: "u008", transaction_date: "2026-03-25", transaction_type: "transfer", amount_vnd: 400000 },
    { transaction_id: "t013", user_id: "u009", transaction_date: "2026-03-16", transaction_type: "top_up", amount_vnd: 300000 },
    { transaction_id: "t014", user_id: "u010", transaction_date: "2026-03-22", transaction_type: "top_up", amount_vnd: 550000 },
];

export const RETENTION_EVENTS = [
    { event_id: "e001", user_id: "u001", event_date: "2026-01-03", event_name: "app_open", feature_name: "home" },
    { event_id: "e002", user_id: "u001", event_date: "2026-01-04", event_name: "feature_view", feature_name: "wallet" },
    { event_id: "e003", user_id: "u001", event_date: "2026-01-09", event_name: "transaction_success", feature_name: "bill_payment" },
    { event_id: "e004", user_id: "u002", event_date: "2026-01-08", event_name: "app_open", feature_name: "home" },
    { event_id: "e005", user_id: "u002", event_date: "2026-01-09", event_name: "transaction_success", feature_name: "wallet" },
    { event_id: "e006", user_id: "u002", event_date: "2026-02-10", event_name: "app_open", feature_name: "home" },
    { event_id: "e007", user_id: "u003", event_date: "2026-01-15", event_name: "app_open", feature_name: "home" },
    { event_id: "e008", user_id: "u003", event_date: "2026-01-16", event_name: "feature_view", feature_name: "rewards" },
    { event_id: "e009", user_id: "u004", event_date: "2026-02-02", event_name: "app_open", feature_name: "home" },
    { event_id: "e010", user_id: "u004", event_date: "2026-02-03", event_name: "transaction_success", feature_name: "wallet" },
    { event_id: "e011", user_id: "u004", event_date: "2026-03-05", event_name: "app_open", feature_name: "home" },
    { event_id: "e012", user_id: "u005", event_date: "2026-02-09", event_name: "app_open", feature_name: "home" },
    { event_id: "e013", user_id: "u005", event_date: "2026-02-10", event_name: "transaction_success", feature_name: "transfer" },
    { event_id: "e014", user_id: "u006", event_date: "2026-02-18", event_name: "app_open", feature_name: "home" },
    { event_id: "e015", user_id: "u006", event_date: "2026-02-19", event_name: "feature_view", feature_name: "profile" },
    { event_id: "e016", user_id: "u007", event_date: "2026-03-04", event_name: "app_open", feature_name: "home" },
    { event_id: "e017", user_id: "u007", event_date: "2026-03-05", event_name: "feature_view", feature_name: "wallet" },
    { event_id: "e018", user_id: "u008", event_date: "2026-03-10", event_name: "app_open", feature_name: "home" },
    { event_id: "e019", user_id: "u008", event_date: "2026-03-11", event_name: "transaction_success", feature_name: "wallet" },
    { event_id: "e020", user_id: "u008", event_date: "2026-04-12", event_name: "app_open", feature_name: "home" },
    { event_id: "e021", user_id: "u009", event_date: "2026-03-15", event_name: "app_open", feature_name: "home" },
    { event_id: "e022", user_id: "u009", event_date: "2026-03-16", event_name: "feature_view", feature_name: "rewards" },
    { event_id: "e023", user_id: "u010", event_date: "2026-03-21", event_name: "app_open", feature_name: "home" },
    { event_id: "e024", user_id: "u010", event_date: "2026-03-22", event_name: "transaction_success", feature_name: "wallet" },
];

export type RetentionDatasetKey = "users" | "transactions" | "events";

export const RETENTION_DATASET_META: Record<
    RetentionDatasetKey,
    { label: string; tableName: string; description: string }
> = {
    users: {
        label: "users",
        tableName: "users",
        description: "Thông tin đăng ký, cohort tháng, tier và kênh acquisition.",
    },
    transactions: {
        label: "transactions",
        tableName: "transactions",
        description: "Lịch sử giao dịch như nạp tiền, chuyển khoản, thanh toán hóa đơn.",
    },
    events: {
        label: "events",
        tableName: "events",
        description: "Log hành vi trong app như mở app, xem tính năng, giao dịch thành công.",
    },
};

export function getRetentionDatasetRows(
    key: RetentionDatasetKey,
): Record<string, string | number>[] {
    switch (key) {
        case "users":
            return RETENTION_USERS.map((r) => ({ ...r }));
        case "transactions":
            return RETENTION_TRANSACTIONS.map((r) => ({ ...r }));
        case "events":
            return RETENTION_EVENTS.map((r) => ({ ...r }));
    }
}
