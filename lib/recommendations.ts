import type { SkillId } from "./sql-skill-map";
import { getSkill, getLearnModule } from "./sql-skill-map";
import { getSkillProgress } from "./learner-skill-progress";
import { getCatalogTask, INTERNSHIP_TASKS_CATALOG } from "./internship-tasks-catalog";
import {
    buildLearnUrl,
    calculateTaskReadiness,
    type InternshipReturnContext,
} from "./skill-navigation";

export type Recommendation = {
    id: string;
    message: string;
    href?: string;
    actionLabel?: string;
    learnModuleId?: string;
    returnContext?: InternshipReturnContext;
};

export function getDashboardRecommendations(): Recommendation[] {
    const recs: Recommendation[] = [];
    const eng = getCatalogTask("novatech-active-engineering");
    if (eng) {
        const r = calculateTaskReadiness(eng.requiredSkills);
        if (r.percent < 50) {
            recs.push({
                id: "dash-and-or",
                message: `Ôn AND / OR để làm tốt task "${eng.title}" trong NovaTech.`,
                href: buildLearnUrl("and-or"),
                actionLabel: "Ôn AND / OR",
            });
        }
    }
    const inspect = getCatalogTask("novatech-inspect-employees");
    if (inspect) {
        const r = calculateTaskReadiness(inspect.requiredSkills);
        if (r.percent >= 80) {
            recs.push({
                id: "dash-inspect-ready",
                message: `Bạn đã sẵn sàng cho task "${inspect.title}".`,
                href: "/internships/novatech",
                actionLabel: "Bắt đầu mô phỏng",
            });
        }
    }
    const updateProg = getSkillProgress("sql-update");
    if (updateProg.progress < 40) {
        recs.push({
            id: "dash-update",
            message:
                "UPDATE an toàn còn yếu — nên học trước khi làm task cập nhật dữ liệu NovaTech.",
            href: buildLearnUrl("update-safety"),
            actionLabel: "Học UPDATE an toàn",
        });
    }
    const selectProg = getSkillProgress("sql-select");
    if (selectProg.progress >= 100) {
        recs.push({
            id: "dash-select-done",
            message: "Bạn đã học SELECT. Hãy thử task Kiểm tra dữ liệu nhân sự trong NovaTech.",
            href: "/internships/novatech",
            actionLabel: "Xem NovaTech",
        });
    }
    return recs.slice(0, 4);
}

export function getLearnModuleRecommendation(learnModuleId: string): string | null {
    const task = INTERNSHIP_TASKS_CATALOG.find((t) =>
        t.relatedLearnModules.includes(learnModuleId),
    );
    if (!task) return null;
    const mod = getLearnModule(learnModuleId);
    const title = mod?.title ?? learnModuleId;
    return `${title} sẽ được dùng trong task "${task.title}" tại ${task.company}.`;
}

export function getFailureRecommendation(
    taskId: string,
    failReason: "missing_where" | "missing_and" | "dangerous_update" | "dangerous_delete" | "generic",
): { message: string; skillId?: SkillId; quickLabel?: string } {
    switch (failReason) {
        case "missing_where":
            return {
                message:
                    "Bạn đang thiếu WHERE. Task này cần lọc dữ liệu theo điều kiện. Bạn có thể ôn nhanh phần WHERE nếu muốn.",
                skillId: "sql-where",
                quickLabel: "Ôn WHERE",
            };
        case "missing_and":
            return {
                message:
                    "Task này cần kết hợp nhiều điều kiện cùng lúc, nên bạn cần AND. Bạn có thể ôn phần AND / OR.",
                skillId: "sql-and-or",
                quickLabel: "Ôn AND / OR",
            };
        case "dangerous_update":
            return {
                message:
                    "Query UPDATE của bạn thiếu WHERE. Đây là lỗi rất nguy hiểm trong công việc thật. Bạn nên ôn phần UPDATE an toàn.",
                skillId: "sql-update",
                quickLabel: "Ôn UPDATE an toàn",
            };
        case "dangerous_delete":
            return {
                message:
                    "Query DELETE thiếu WHERE. Nếu chạy thật, nó có thể xóa toàn bộ bảng. Bạn nên ôn phần DELETE an toàn.",
                skillId: "sql-delete",
                quickLabel: "Ôn DELETE an toàn",
            };
        default: {
            const task = getCatalogTask(taskId);
            if (task) {
                const weak = task.requiredSkills.find(
                    (s) => getSkillProgress(s).progress < 40,
                );
                if (weak) {
                    const sk = getSkill(weak);
                    return {
                        message: `Mình đề xuất ôn nhanh phần ${sk?.title ?? weak} trong vài phút.`,
                        skillId: weak,
                        quickLabel: `Ôn ${sk?.title ?? weak}`,
                    };
                }
            }
            return {
                message: "Hãy đối chiếu lại yêu cầu nghiệp vụ trong tab Brief.",
            };
        }
    }
}

export function getTaskStartRecommendation(taskId: string): string | null {
    const task = getCatalogTask(taskId);
    if (!task) return null;
    const r = calculateTaskReadiness(task.requiredSkills);
    if (r.percent >= 80) return `Bạn đã sẵn sàng cho task "${task.title}".`;
    if (r.percent >= 40)
        return `Mức sẵn sàng của bạn là ${r.percent}%. Nên ôn nhanh trước khi làm task này — nhưng bạn vẫn có thể bắt đầu ngay.`;
    return `Mức sẵn sàng của bạn là ${r.percent}%. Nên ôn các phần liên quan trước — hoặc thử task và học khi gặp vướng.`;
}

export function inferFailReason(
    feedback: string,
    sql: string,
    taskId: string,
): "missing_where" | "missing_and" | "dangerous_update" | "dangerous_delete" | "generic" {
    const n = sql.toLowerCase();
    if (n.startsWith("update") && !n.includes("where")) return "dangerous_update";
    if (n.startsWith("delete") && !n.includes("where")) return "dangerous_delete";
    const fb = feedback.toLowerCase();
    if (fb.includes("and") || fb.includes("status") || taskId.includes("engineering"))
        return "missing_and";
    if (fb.includes("where") || fb.includes("điều kiện")) return "missing_where";
    return "generic";
}
