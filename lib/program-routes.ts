import type { InternshipProgram } from "./catalog";
import { INTERNSHIP_PROGRAMS } from "./catalog";

/** Playable program detail / simulation entry URLs */
export function getProgramHref(programId: string): string | undefined {
    if (programId === "coccoc-data-ops") return "/internships/coccoc";
    if (programId === "fpt-data-ops") return "/internships/coccoc";
    return undefined;
}

export function getProgramsForCompany(companyId: string): InternshipProgram[] {
    return INTERNSHIP_PROGRAMS.filter((p) => p.companyId === companyId);
}
