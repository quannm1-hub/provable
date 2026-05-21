import { cloneEmployees } from "./employees";
import { normalizeSql } from "./sql-normalize";
import type { Employee, RunResult } from "./types";
import { vi } from "./vi";

function parseSelectColumns(query: string): string[] | "*" {
    const m = query.match(/select\s+([\s\S]+?)\s+from/i);
    if (!m) return "*";
    const part = m[1].trim();
    if (part === "*") return "*";
    return part.split(",").map((c) => c.trim().toLowerCase());
}

function evalSimpleCondition(row: Employee, cond: string): boolean {
    const c = cond.trim().toLowerCase();
    const eq = c.match(/(\w+)\s*=\s*'([^']+)'/);
    if (eq) {
        const key = eq[1] as keyof Employee;
        return String(row[key]).toLowerCase() === eq[2];
    }
    const gt = c.match(/(\w+)\s*>\s*(\d+)/);
    if (gt) {
        const key = gt[1] as keyof Employee;
        return Number(row[key]) > Number(gt[2]);
    }
    const inP = c.match(/(\w+)\s+in\s*\(([^)]+)\)/);
    if (inP) {
        const key = inP[1] as keyof Employee;
        const vals = inP[2].split(",").map((v) => v.trim().replace(/'/g, ""));
        return vals.includes(String(row[key]));
    }
    return true;
}

function filterRows(rows: Employee[], whereClause: string): Employee[] {
    const parts = whereClause.split(/\s+and\s+/i);
    return rows.filter((row) =>
        parts.every((part) => {
            const orBits = part.split(/\s+or\s+/i);
            if (orBits.length > 1) {
                return orBits.some((o) => evalSimpleCondition(row, o.replace(/[()]/g, "")));
            }
            return evalSimpleCondition(row, part.replace(/[()]/g, ""));
        }),
    );
}

function projectRows(rows: Employee[], cols: string[] | "*"): Record<string, string | number>[] {
    if (cols === "*") return rows.map((r) => ({ ...r }));
    return rows.map((r) => {
        const out: Record<string, string | number> = {};
        for (const c of cols) {
            const key = c as keyof Employee;
            if (key in r && r[key] !== undefined) out[c] = r[key] as string | number;
        }
        return out;
    });
}

function inferColumnsFromRows(rows: Record<string, string | number>[]): string[] {
    if (rows.length === 0) return [];
    return Object.keys(rows[0]);
}

function errorResult(
    message: string,
    opts?: { danger?: boolean; errors?: string[]; rowCount?: number },
): RunResult {
    return {
        ok: false,
        kind: "error",
        resultType: opts?.danger ? "danger_warning" : "validation_error",
        message,
        rows: [],
        rowCount: opts?.rowCount ?? 0,
        errors: opts?.errors ?? [message],
        warnings: opts?.danger ? [message] : undefined,
    };
}

export function runSql(query: string, data: Employee[] = cloneEmployees()): RunResult {
    const norm = normalizeSql(query);
    if (!norm) {
        return errorResult(vi.sqlRunner.enterQuery);
    }

    if (norm.startsWith("select")) {
        if (!norm.includes("from employees")) {
            return errorResult(vi.sqlRunner.needFrom, {
                errors: ["Cần có FROM employees trong truy vấn SELECT."],
            });
        }
        let rows = [...data];
        const whereMatch = query.match(/where\s+([\s\S]+?)(?:;|$)/i);
        if (whereMatch) rows = filterRows(rows, whereMatch[1]);
        const cols = parseSelectColumns(query);
        const projected = projectRows(rows, cols);
        const columns = inferColumnsFromRows(projected);

        if (projected.length === 0) {
            return {
                ok: true,
                kind: "select",
                resultType: "empty_result",
                message: vi.data.emptyResult,
                rows: [],
                columns,
                rowCount: 0,
            };
        }

        return {
            ok: true,
            kind: "select",
            resultType: "select_result",
            message: "Query chạy thành công.",
            rows: projected,
            columns,
            rowCount: projected.length,
        };
    }

    if (norm.startsWith("update")) {
        if (!norm.includes("where")) {
            return errorResult(vi.sqlRunner.updateNoWhere, {
                danger: true,
                errors: [
                    "UPDATE không có WHERE có thể thay đổi toàn bộ bảng.",
                    "Hãy thêm điều kiện WHERE trước khi chạy.",
                ],
                rowCount: data.length,
            });
        }
        const whereMatch = query.match(/where\s+([\s\S]+?)(?:;|$)/i);
        const affected = whereMatch ? filterRows(data, whereMatch[1]) : [];
        const affectedRows = projectRows(affected, "*");
        const columns = inferColumnsFromRows(affectedRows);

        return {
            ok: true,
            kind: "update",
            resultType: "update_preview",
            message: vi.sqlRunner.updatePreview(affected.length),
            rowCount: affected.length,
            columns,
            affectedRows,
            preview: { action: "UPDATE preview", rows: affected },
        };
    }

    if (norm.startsWith("delete")) {
        if (!norm.includes("where")) {
            return errorResult(vi.sqlRunner.deleteNoWhere, {
                danger: true,
                errors: [
                    "DELETE không có WHERE có thể xóa toàn bộ bảng.",
                    "Hãy thêm điều kiện WHERE trước khi chạy.",
                ],
                rowCount: data.length,
            });
        }
        const whereMatch = query.match(/where\s+([\s\S]+?)(?:;|$)/i);
        const affected = whereMatch ? filterRows(data, whereMatch[1]) : [];
        const affectedRows = projectRows(affected, "*");
        const columns = inferColumnsFromRows(affectedRows);

        return {
            ok: true,
            kind: "delete",
            resultType: "delete_preview",
            message: vi.sqlRunner.deletePreview(affected.length),
            rowCount: affected.length,
            columns,
            affectedRows,
            preview: { action: "DELETE preview", rows: affected },
        };
    }

    return errorResult(vi.sqlRunner.unsupported, {
        errors: ["Chỉ hỗ trợ SELECT, UPDATE và DELETE trong phiên làm việc này."],
    });
}
