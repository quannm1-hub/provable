export function normalizeSql(query: string): string {
    return query
        .replace(/--.*$/gm, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

export function hasAll(norm: string, parts: string[]) {
    return parts.every((p) => norm.includes(p));
}

export function hasAny(norm: string, parts: string[]) {
    return parts.some((p) => norm.includes(p));
}
