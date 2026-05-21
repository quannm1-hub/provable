import type { ValidationResult } from "./types";
import { normalizeSql } from "./sql-normalize";

function fail(feedback: string, missing?: string[]): ValidationResult {
    return { ok: false, feedback, missing };
}

function pass(feedback = "Chính xác. Truy vấn của bạn đáp ứng đúng yêu cầu."): ValidationResult {
    return { ok: true, feedback };
}

export function checkSelectAll(query: string): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("select"))
        return fail("Truy vấn của bạn cần có SELECT vì bạn đang muốn đọc dữ liệu.");
    if (!n.includes("from employees"))
        return fail("Bạn cần FROM employees để SQL biết phải đọc dữ liệu từ bảng nào.");
    if (!n.includes("*") && !n.match(/select\s+\*/))
        return fail("Task này yêu cầu tất cả cột. Hãy thử SELECT * FROM employees;");
    return pass();
}

export function checkSelectColumns(query: string, cols: string[]): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("select"))
        return fail("Truy vấn của bạn cần có SELECT vì bạn đang muốn đọc dữ liệu.");
    if (!n.includes("from employees"))
        return fail("Bạn cần FROM employees để SQL biết phải đọc dữ liệu từ bảng nào.");
    for (const c of cols) {
        if (!n.includes(c.toLowerCase()))
            return fail(`Hãy thêm cột: ${c}`);
    }
    return pass();
}

export function checkWhere(query: string, checks: string[]): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("select")) return fail("Truy vấn cần có SELECT.");
    if (!n.includes("from employees")) return fail("Hãy thêm FROM employees.");
    if (!n.includes("where"))
        return fail("Gần đúng rồi, nhưng task này cần WHERE để lọc đúng dòng dữ liệu.");
    for (const c of checks) {
        if (!n.includes(c.toLowerCase())) return fail(`Thiếu điều kiện: ${c}`);
    }
    return pass();
}

export function checkAndOr(
    query: string,
    opts: { and?: boolean; or?: boolean; extras?: string[] },
): ValidationResult {
    const n = normalizeSql(query);
    const base = checkWhere(query, opts.extras ?? []);
    if (!base.ok && !n.includes("where")) return base;
    if (opts.and && !n.includes(" and "))
        return fail("Task yêu cầu kết hợp nhiều điều kiện cùng lúc, nên bạn cần dùng AND.");
    if (opts.or && !n.includes(" or "))
        return fail("Task này cần lấy dữ liệu thỏa mãn một trong nhiều điều kiện, nên bạn cần dùng OR.");
    if (!n.includes("where"))
        return fail("Gần đúng rồi, nhưng task này cần WHERE để lọc đúng dòng dữ liệu.");
    return pass();
}

export function checkUpdate(query: string, checks: string[]): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("update employees"))
        return fail("Dùng UPDATE employees để thay đổi dòng đã có.");
    if (!n.includes("set")) return fail("UPDATE cần SET để chỉ định cột thay đổi.");
    if (!n.includes("where"))
        return fail(
            "Truy vấn nguy hiểm. UPDATE không có WHERE có thể thay đổi toàn bộ dòng trong bảng.",
        );
    for (const c of checks) {
        if (!n.includes(c.toLowerCase())) return fail(`Thiếu: ${c}`);
    }
    return pass();
}

export function checkOrderBy(query: string, direction: "desc" | "asc" = "desc"): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("select")) return fail("Truy vấn cần có SELECT.");
    if (!n.includes("from employees")) return fail("Hãy thêm FROM employees.");
    if (!n.includes("order by"))
        return fail("Task yêu cầu sắp xếp dữ liệu, nên bạn cần ORDER BY.");
    if (direction === "desc" && !n.includes("desc"))
        return fail("Task yêu cầu sắp xếp giảm dần — dùng ORDER BY ... DESC.");
    if (direction === "asc" && !n.includes("asc"))
        return fail("Task yêu cầu sắp xếp tăng dần — dùng ORDER BY ... ASC.");
    if (!n.includes("salary")) return fail("Hãy sắp xếp theo cột salary.");
    return pass();
}

export function checkLimit(query: string, limitNum?: number): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("select")) return fail("Truy vấn cần có SELECT.");
    if (!n.includes("from employees")) return fail("Hãy thêm FROM employees.");
    if (!n.includes("limit"))
        return fail("Task yêu cầu giới hạn số dòng, nên bạn cần LIMIT.");
    if (limitNum && !n.includes(String(limitNum)))
        return fail(`Task yêu cầu LIMIT ${limitNum}.`);
    return pass();
}

export function checkDelete(query: string, checks: string[]): ValidationResult {
    const n = normalizeSql(query);
    if (!n.includes("delete from employees"))
        return fail("Dùng DELETE FROM employees để xóa dòng.");
    if (!n.includes("where"))
        return fail(
            "Truy vấn nguy hiểm. DELETE không có WHERE có thể xóa toàn bộ dữ liệu trong bảng.",
        );
    for (const c of checks) {
        if (!n.includes(c.toLowerCase())) return fail(`Thiếu: ${c}`);
    }
    return pass();
}

export function diagnoseQuery(query: string, kind: "select" | "update" | "delete"): string[] {
    const n = normalizeSql(query);
    const issues: string[] = [];
    if (kind === "select") {
        if (!n.includes("select")) issues.push("SELECT");
        if (!n.includes("from employees")) issues.push("FROM employees");
        if (!n.includes("where")) issues.push("WHERE (có thể bắt buộc)");
    }
    if (kind === "update") {
        if (!n.includes("update")) issues.push("UPDATE employees");
        if (!n.includes("set")) issues.push("SET");
        if (!n.includes("where")) issues.push("WHERE");
    }
    if (kind === "delete") {
        if (!n.includes("delete")) issues.push("DELETE FROM employees");
        if (!n.includes("where")) issues.push("WHERE");
    }
    return issues;
}
