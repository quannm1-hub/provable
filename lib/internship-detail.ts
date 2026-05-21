import { getSkillProgress } from "./learner-skill-progress";
import { getSkill } from "./sql-skill-map";
import type { SkillId } from "./sql-skill-map";
import { INTERNSHIP_META, internshipTasks, PROGRESS_STEPS } from "./internship";

/** Playable SQL internship program (Cốc Cốc). */
export const COCCOC_PROGRAM = {
    id: "coccoc-data-ops",
    company: "Cốc Cốc",
    initials: "CC",
    programTitleEn: "Data Operations Virtual Internship",
    programTitle: "Thực tập ảo Data Operations",
    role: "Thực tập sinh Data Operations",
    description:
        "Thực hiện các task SQL để kiểm tra, lọc và chuẩn bị dữ liệu nhân sự cho báo cáo nhân sự hàng tháng.",
    dataset: "employees",
    estimatedTime: "20-30 phút",
    taskCount: internshipTasks.filter((t) => !t.isBriefing).length,
    difficulty: "Dành cho người mới",
    format: "Tự học theo tốc độ cá nhân",
    outcome: "Badge hoàn thành",
    category: "data" as const,
    skills: ["SQL", "Data Cleaning", "Query Safety", "Business Reasoning"],
};

/** @deprecated Use COCCOC_PROGRAM */
export const NOVATECH_PROGRAM = COCCOC_PROGRAM;

export const PROGRAM_VALUE_PROPS = [
    {
        title: "Tự học theo tốc độ cá nhân",
        desc: "Không cần ứng tuyển — bắt đầu khi bạn sẵn sàng.",
    },
    {
        title: "Task mô phỏng công việc thực tế",
        desc: "Đọc yêu cầu, viết SQL, nộp bài và nhận phản hồi như trong team Data Operations.",
    },
    {
        title: "So sánh với đáp án mẫu",
        desc: "Mở khóa đáp án mẫu sau khi nộp đúng để học từ chuyên gia.",
    },
    {
        title: "Nhận badge sau khi hoàn thành",
        desc: "Chứng nhận hoàn thành chương trình mô phỏng trên Provable.",
    },
];

export const PROGRAM_OVERVIEW = [
    {
        title: "Bạn sẽ làm gì?",
        body: "Hoàn thành các task giống công việc của một thực tập sinh Data Operations — đọc brief, viết SQL, nộp và đối chiếu kết quả.",
    },
    {
        title: "Bạn sẽ luyện kỹ năng nào?",
        body: "SQL, lọc dữ liệu, kiểm tra dữ liệu, viết truy vấn an toàn, giải thích quyết định nghiệp vụ.",
    },
    {
        title: "Bạn sẽ nhận được gì?",
        body: "Phản hồi mentor, đáp án mẫu, điểm năng lực và badge hoàn thành chương trình mô phỏng.",
    },
];

export const HOW_IT_WORKS = [
    { step: 1, title: "Đọc brief công việc", desc: "Hiểu bối cảnh và yêu cầu từ quản lý." },
    { step: 2, title: "Hoàn thành task", desc: "Viết SQL, chạy thử và nộp bài." },
    { step: 3, title: "So sánh với đáp án mẫu", desc: "Xem đáp án mẫu và nhận xét từ mentor." },
    { step: 4, title: "Nhận badge hoàn thành", desc: "Hoàn thành chương trình và nhận chứng nhận mô phỏng." },
];

export type TaskSkillChip = {
    title: string;
    progress: number;
};

export type TaskTimelineItem = {
    number: number;
    id: string;
    title: string;
    shortDesc: string;
    estimatedMin: string;
    skills: string[];
    skillChips: TaskSkillChip[];
    locked: boolean;
};

function skillChipsForTask(requiredSkills: SkillId[]): TaskSkillChip[] {
    return requiredSkills.map((id) => {
        const skill = getSkill(id);
        const prog = getSkillProgress(id);
        return {
            title: skill?.title ?? id,
            progress: prog.progress,
        };
    });
}

export function getTaskTimeline(): TaskTimelineItem[] {
    const items = internshipTasks.map((t, i) => ({
        number: i + 1,
        id: t.id,
        title: t.title,
        shortDesc: t.isBriefing
            ? "Nhận brief từ quản lý và làm quen phạm vi dự án."
            : t.instruction.slice(0, 80) + (t.instruction.length > 80 ? "…" : ""),
        estimatedMin: t.isBriefing ? "3 phút" : "4-6 phút",
        skills: t.skillTags,
        skillChips: skillChipsForTask(t.requiredSkills),
        locked: false,
    }));
    items.push({
        number: items.length + 1,
        id: "summary",
        title: "Tổng kết năng lực",
        shortDesc: "Nhận điểm năng lực, badge hoàn thành và gợi ý mô tả cho CV.",
        estimatedMin: "2 phút",
        skills: ["Reflection", "Completion"],
        skillChips: [],
        locked: false,
    });
    return items;
}

export { INTERNSHIP_META, PROGRESS_STEPS };
