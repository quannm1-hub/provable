import type { SkillId } from "./sql-skill-map";
import {
    courseIndexForLearnModule,
    getLearnModule,
    getLearnModuleForSkill,
    getSkill,
    SQL_LEARN_MODULES,
} from "./sql-skill-map";
import { getSkillProgress } from "./learner-skill-progress";
import {
    getCatalogTask,
    getTasksUsingSkill,
    INTERNSHIP_TASKS_CATALOG,
    type InternshipTaskCatalogItem,
} from "./internship-tasks-catalog";

const RETURN_KEY = "provable-return-context";
const SIMULATION_RESUME_KEY = "provable-simulation-resume";

export type InternshipReturnContext = {
    from: "internship";
    internshipId: string;
    taskId: string;
    taskTitle: string;
    targetSkillId?: SkillId;
};

export type CompanyLearnReturnContext = {
    from: "company-profile";
    companyId: string;
    companyName: string;
    targetSkillId?: SkillId;
};

export type SimulationResumeContext = {
    from: "simulation";
    internshipId: string;
    programHref: string;
    taskId: string;
    activeTab?: string;
    sqlInput?: string;
};

export type LearnReturnContext = InternshipReturnContext | CompanyLearnReturnContext;

export function saveReturnContext(ctx: LearnReturnContext) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(RETURN_KEY, JSON.stringify(ctx));
}

export function loadReturnContext(): LearnReturnContext | null {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as LearnReturnContext;
    } catch {
        return null;
    }
}

export function clearReturnContext() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(RETURN_KEY);
}

export function buildLearnUrl(
    learnModuleId: string,
    returnContext?: LearnReturnContext,
): string {
    if (returnContext?.from === "company-profile") {
        const params = new URLSearchParams({
            from: "company-profile",
            companyId: returnContext.companyId,
            companyName: returnContext.companyName,
        });
        const skillId =
            returnContext.targetSkillId ??
            getLearnModule(learnModuleId)?.skillId;
        if (skillId) params.set("skillId", skillId);
        return `/learn/sql?${params.toString()}`;
    }
    if (returnContext?.from === "internship") {
        const params = new URLSearchParams({
            from: "internship",
            internshipId: returnContext.internshipId,
            taskId: returnContext.taskId,
            taskTitle: returnContext.taskTitle,
        });
        const skillId =
            returnContext.targetSkillId ??
            getLearnModule(learnModuleId)?.skillId;
        if (skillId) params.set("skillId", skillId);
        return `/learn/sql?${params.toString()}`;
    }
    return `/learn/sql?module=${encodeURIComponent(learnModuleId)}`;
}

export function buildCompanyReturnUrl(companyId: string): string {
    return `/companies/${companyId}`;
}

export function parseCompanyLearnFromSearchParams(
    searchParams: URLSearchParams,
): CompanyLearnReturnContext | null {
    if (searchParams.get("from") !== "company-profile") return null;
    const companyId = searchParams.get("companyId");
    const companyName = searchParams.get("companyName");
    if (!companyId || !companyName) return null;
    const skillId = searchParams.get("skillId") as SkillId | null;
    return {
        from: "company-profile",
        companyId,
        companyName,
        targetSkillId: skillId ?? undefined,
    };
}

export function saveSimulationResume(ctx: SimulationResumeContext) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(SIMULATION_RESUME_KEY, JSON.stringify(ctx));
}

export function loadSimulationResume(): SimulationResumeContext | null {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(SIMULATION_RESUME_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as SimulationResumeContext;
    } catch {
        return null;
    }
}

export function clearSimulationResume() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(SIMULATION_RESUME_KEY);
}

export function buildSimulationReturnUrl(ctx: SimulationResumeContext): string {
    const params = new URLSearchParams({ task: ctx.taskId });
    return `${ctx.programHref}?${params.toString()}`;
}

export function buildInternshipReturnUrl(ctx: InternshipReturnContext): string {
    const params = new URLSearchParams({
        task: ctx.taskId,
    });
    return `/internships/novatech?${params.toString()}`;
}

export function parseReturnFromSearchParams(
    searchParams: URLSearchParams,
): InternshipReturnContext | null {
    if (searchParams.get("from") !== "internship") return null;
    const taskId = searchParams.get("taskId");
    const taskTitle = searchParams.get("taskTitle");
    const internshipId = searchParams.get("internshipId") ?? "novatech-data-ops";
    if (!taskId || !taskTitle) return null;
    const skillId = searchParams.get("skillId") as SkillId | null;
    return {
        from: "internship",
        internshipId,
        taskId,
        taskTitle,
        targetSkillId: skillId ?? undefined,
    };
}

export function goToLearnModule(
    learnModuleId: string,
    returnContext?: LearnReturnContext,
) {
    const ctx = returnContext
        ? {
              ...returnContext,
              targetSkillId:
                  returnContext.targetSkillId ??
                  getLearnModule(learnModuleId)?.skillId,
          }
        : undefined;
    if (ctx) saveReturnContext(ctx);
    window.location.href = buildLearnUrl(learnModuleId, ctx);
}

export function goToInternshipTask(internshipId: string, taskId: string) {
    clearReturnContext();
    if (internshipId === "novatech-data-ops") {
        window.location.href = `/internships/novatech?task=${taskId}`;
    } else {
        window.location.href = "/internships";
    }
}

export function getSkillsForTask(taskId: string): SkillId[] {
    const cat = getCatalogTask(taskId);
    return cat?.requiredSkills ?? [];
}

export function getLearnModuleForSkillId(skillId: SkillId) {
    return getLearnModuleForSkill(skillId);
}

export type ReadinessResult = {
    percent: number;
    label: "Sẵn sàng" | "Nên ôn nhanh" | "Nên học trước";
    skills: {
        skillId: SkillId;
        title: string;
        progress: number;
        chipLabel: string;
    }[];
};

export function calculateTaskReadiness(requiredSkills: SkillId[]): ReadinessResult {
    if (requiredSkills.length === 0) {
        return { percent: 100, label: "Sẵn sàng", skills: [] };
    }
    const skills = requiredSkills.map((skillId) => {
        const skill = getSkill(skillId);
        const prog = getSkillProgress(skillId);
        let chipLabel = "Cần luyện thêm";
        if (prog.progress >= 80) chipLabel = "Đã vững";
        else if (prog.progress < 30) chipLabel = "Chưa học";
        return {
            skillId,
            title: skill?.title ?? skillId,
            progress: prog.progress,
            chipLabel,
        };
    });
    const percent = Math.round(
        skills.reduce((s, x) => s + x.progress, 0) / skills.length,
    );
    let label: ReadinessResult["label"] = "Nên học trước";
    if (percent >= 80) label = "Sẵn sàng";
    else if (percent >= 40) label = "Nên ôn nhanh";
    return { percent, label, skills };
}

/** Map playable internship task id → index in internshipTasks array */
export const NOVATECH_TASK_INDEX: Record<string, number> = {
    "novatech-briefing": 0,
    briefing: 0,
    "novatech-inspect-employees": 1,
    "inspect-data": 1,
    "novatech-active-engineering": 2,
    "active-engineering": 2,
    "novatech-active-high-salary": 3,
    "salary-review": 3,
    "novatech-sort-by-salary": 4,
    "order-by-salary": 4,
    "novatech-safe-update": 5,
    "safe-update": 5,
    "novatech-safe-delete": 6,
    "safe-delete": 6,
};

export function aggregateProgramSkills(programId: string): SkillId[] {
    const tasks = INTERNSHIP_TASKS_CATALOG.filter((t) => t.programId === programId);
    const set = new Set<SkillId>();
    tasks.forEach((t) => t.requiredSkills.forEach((s) => set.add(s)));
    return [...set];
}

export function getProgramSkillSummaries(programId: string) {
    return aggregateProgramSkills(programId).map((skillId) => {
        const skill = getSkill(skillId);
        const prog = getSkillProgress(skillId);
        const taskCount = INTERNSHIP_TASKS_CATALOG.filter(
            (t) => t.programId === programId && t.requiredSkills.includes(skillId),
        ).length;
        return {
            skillId,
            title: skill?.title ?? skillId,
            learnModuleId: skill?.learnModuleId ?? "",
            progress: prog.progress,
            status: prog.status,
            taskCount,
        };
    });
}

export { getTasksUsingSkill, getCatalogTask, getLearnModule, courseIndexForLearnModule, SQL_LEARN_MODULES };
export type { InternshipTaskCatalogItem };
