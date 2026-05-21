import type { InternshipProgram } from "./catalog";
import { INTERNSHIP_PROGRAMS } from "./catalog";

/** Playable program detail / simulation entry URLs */
export function getProgramHref(programId: string): string | undefined {
    if (programId === "novatech-pm-interview") return "/internships/novatech-pm";
    if (programId === "novatech-da-retention-interview")
        return "/internships/novatech-da-retention";
    if (programId === "coccoc-de-intern-assessment")
        return "/internships/coccoc-de-assessment";
    if (programId === "shopify-de-intern-assessment")
        return "/internships/coccoc-de-assessment";
    if (programId === "coccoc-da-intern-home-test")
        return "/internships/coccoc-home-test";
    if (programId === "coccoc-data-ops") return "/internships/coccoc";
    if (programId === "fpt-data-ops") return "/internships/coccoc";
    return undefined;
}

export function getProgramsForCompany(companyId: string): InternshipProgram[] {
    return INTERNSHIP_PROGRAMS.filter((p) => p.companyId === companyId);
}
