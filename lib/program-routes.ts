import type { InternshipProgram } from "./catalog";
import { INTERNSHIP_PROGRAMS } from "./catalog";

/** Playable program detail / simulation entry URLs */
export function getProgramHref(programId: string): string | undefined {
    if (programId === "novatech-data-ops") return "/internships/novatech";
    return undefined;
}

export function getProgramsForCompany(companyId: string): InternshipProgram[] {
    return INTERNSHIP_PROGRAMS.filter((p) => p.companyId === companyId);
}
