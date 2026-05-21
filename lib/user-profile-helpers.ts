import type { SkillProgressStatus } from "./learner-skill-progress";
import { getSkillProgress } from "./learner-skill-progress";
import { getSkill, getLearnModuleForSkill, SQL_SKILL_MAP, type SkillId } from "./sql-skill-map";
import { getTasksUsingSkill } from "./internship-tasks-catalog";

export function skillStatusLabelVi(status: SkillProgressStatus): string {
    switch (status) {
        case "completed":
            return "Đã vững";
        case "in_progress":
            return "Đang học";
        case "needs_practice":
            return "Cần luyện thêm";
        default:
            return "Chưa học";
    }
}

export function getProfileSkills() {
    const showcase: SkillId[] = [
        "sql-select",
        "sql-where",
        "sql-and-or",
        "sql-comparison",
        "sql-order-by",
        "sql-update",
        "sql-delete",
    ];
    return showcase.map((skillId) => {
        const skill = getSkill(skillId);
        const prog = getSkillProgress(skillId);
        const mod = getLearnModuleForSkill(skillId);
        const taskCount = getTasksUsingSkill(skillId).length;
        return {
            skillId,
            title: skill?.title ?? skillId,
            progress: prog.progress,
            status: prog.status,
            statusLabel: skillStatusLabelVi(prog.status),
            lastPracticed: prog.lastPracticedAt,
            taskCount,
            learnModuleId: mod?.id,
        };
    });
}

export const PROFILE_SKILL_IDS = SQL_SKILL_MAP.map((s) => s.skillId);
