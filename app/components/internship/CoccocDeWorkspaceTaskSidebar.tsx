"use client";

import CoccocDeForageTaskSidebar from "@/app/components/internship/CoccocDeForageTaskSidebar";

const WORKSPACE_TASKS = [
    {
        step: 1,
        title: "Task 1",
        summary:
            "Viết truy vấn sql/task1.sql trên dataset starter, đóng gói README + code và nộp để chấm.",
        duration: "45–90 phút",
    },
    {
        step: 2,
        title: "Task 2",
        summary: "sql/task2.sql — truy vấn và phân tích dữ liệu theo yêu cầu README.",
        duration: "30–60 phút",
        disabled: true,
        disabledReason: "Chưa hỗ trợ",
    },
    {
        step: 3,
        title: "Task 3",
        summary: "sql/task3.sql — hoàn thiện metric tổng hợp hoặc so sánh theo nhóm.",
        duration: "30–60 phút",
        disabled: true,
        disabledReason: "Chưa hỗ trợ",
    },
];

/** Sidebar làm bài — Task 1 active; Task 2–3 disabled */
export default function CoccocDeWorkspaceTaskSidebar() {
    return (
        <CoccocDeForageTaskSidebar tasks={WORKSPACE_TASKS} activeStep={1} />
    );
}
