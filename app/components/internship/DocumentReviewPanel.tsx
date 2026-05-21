"use client";

import { useState } from "react";
import { BookOpen, Lock } from "lucide-react";
import PanelTabs from "@/app/components/ui/PanelTabs";
import PreviewModal from "@/app/components/PreviewModal";
import {
    DOCUMENT_TAB_LABELS,
    documentHighlightClass,
    type DocumentHighlightTarget,
    type DocumentTab,
} from "@/lib/document-panel";
import {
    PRD_BRIEF_SECTIONS,
    PRD_RESOURCES,
    PRD_SAMPLE_ANSWER,
    PRD_TEMPLATE_MARKDOWN,
    type DocumentTask,
} from "@/lib/document-tasks";
import type { PrdEvaluationResult } from "@/lib/prd-evaluation";

type Props = {
    activeTab: DocumentTab;
    onTabChange: (tab: DocumentTab) => void;
    highlight: DocumentHighlightTarget;
    task: DocumentTask;
    uploadedFile: File | null;
    evaluation: PrdEvaluationResult | null;
    modelUnlocked: boolean;
    onDownloadTemplate: () => void;
};

export default function DocumentReviewPanel({
    activeTab,
    onTabChange,
    highlight,
    task,
    uploadedFile,
    evaluation,
    modelUnlocked,
    onDownloadTemplate,
}: Props) {
    const [resourcePreview, setResourcePreview] = useState<
        (typeof PRD_RESOURCES)[0] | null
    >(null);

    const tabs = (Object.keys(DOCUMENT_TAB_LABELS) as DocumentTab[]).map((id) => ({
        id,
        label: DOCUMENT_TAB_LABELS[id],
    }));

    return (
        <div className="flex h-full min-h-0 flex-col bg-white dark:bg-zinc-950">
            <PanelTabs tabs={tabs} active={activeTab} onChange={onTabChange} />
            <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto p-4 text-sm">
                {activeTab === "brief" && (
                    <div className="space-y-4">
                        <div className={documentHighlightClass("brief", highlight)}>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Task Brief: Product Requirement Documentation
                            </h3>
                            <p className="mt-2 text-xs text-violet-600 dark:text-indigo-400">
                                {task.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Loại: Product Requirement Documentation · {task.company} ·{" "}
                                {task.team}
                            </p>
                        </div>
                        <BriefBlock title="Bối cảnh" body={PRD_BRIEF_SECTIONS.businessContext} />
                        <BriefBlock
                            title="Vấn đề cần giải quyết"
                            body={PRD_BRIEF_SECTIONS.problemStatement}
                        />
                        <div>
                            <p className="text-[10px] font-semibold uppercase text-slate-500">
                                Người dùng mục tiêu
                            </p>
                            <ul className="mt-1 list-inside list-disc text-xs text-slate-700 dark:text-zinc-300">
                                {PRD_BRIEF_SECTIONS.targetUsers.map((u) => (
                                    <li key={u}>{u}</li>
                                ))}
                            </ul>
                        </div>
                        <BriefBlock title="Tính năng chính" body={PRD_BRIEF_SECTIONS.mainFeature} />
                        <div>
                            <p className="text-[10px] font-semibold uppercase text-slate-500">
                                Yêu cầu cốt lõi
                            </p>
                            <ul className="mt-1 list-inside list-disc text-xs text-slate-700 dark:text-zinc-300">
                                {PRD_BRIEF_SECTIONS.coreRequirements.map((r) => (
                                    <li key={r}>{r}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase text-slate-500">
                                Chỉ số thành công
                            </p>
                            <ul className="mt-1 list-inside list-disc text-xs text-slate-700 dark:text-zinc-300">
                                {PRD_BRIEF_SECTIONS.successMetrics.map((m) => (
                                    <li key={m}>{m}</li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-xs text-slate-500">
                            <strong>Kịch bản:</strong> {task.scenario}
                        </p>
                    </div>
                )}

                {activeTab === "template" && (
                    <div className="space-y-3">
                        <p className="text-xs text-slate-600 dark:text-zinc-400">
                            File: <code className="font-mono">{task.templateFileName}</code>
                        </p>
                        <button
                            type="button"
                            onClick={onDownloadTemplate}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white dark:bg-indigo-600"
                        >
                            Tải template PRD
                        </button>
                        <pre className="max-h-[50vh] overflow-auto rounded-lg bg-slate-900 p-3 text-[10px] leading-relaxed text-slate-200">
                            {PRD_TEMPLATE_MARKDOWN}
                        </pre>
                    </div>
                )}

                {activeTab === "submit" && (
                    <div
                        className={`space-y-3 ${documentHighlightClass("upload", highlight)}`}
                    >
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            Nộp tài liệu PRD
                        </h3>
                        {uploadedFile ? (
                            <dl className="space-y-2 text-xs">
                                <div>
                                    <dt className="text-slate-500">Tên file</dt>
                                    <dd className="font-medium">{uploadedFile.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Loại</dt>
                                    <dd>{uploadedFile.type || "—"}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Kích thước</dt>
                                    <dd>{(uploadedFile.size / 1024).toFixed(1)} KB</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Trạng thái</dt>
                                    <dd className="text-emerald-600 dark:text-emerald-400">
                                        Đã upload — bấm Chấm tài liệu ở Task Workspace
                                    </dd>
                                </div>
                            </dl>
                        ) : (
                            <p className="text-xs text-slate-500">
                                Chưa có file. Dùng khu vực upload bên trên (Task Workspace).
                            </p>
                        )}
                    </div>
                )}

                {activeTab === "evaluation" && (
                    <div
                        className={`space-y-4 ${documentHighlightClass("evaluation", highlight)}`}
                    >
                        <section>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                Tiêu chí chấm
                            </h3>
                            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                                Đạt từ {task.passThreshold}% trở lên
                            </p>
                            <ul className="mt-2 list-inside list-disc text-xs text-slate-600 dark:text-zinc-400">
                                {task.evaluationCriteria.map((c) => (
                                    <li key={c}>{c}</li>
                                ))}
                            </ul>
                            <p className="mt-3 text-[10px] text-slate-400">
                                Trong bản prototype, điểm đánh giá được mô phỏng bằng rule-based
                                keyword matching.
                            </p>
                        </section>

                        <section>
                            <p className="text-[10px] font-semibold uppercase text-slate-500">
                                Độ trùng khớp với đáp án tham khảo
                            </p>
                            {evaluation ? (
                                <>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                evaluation.status === "passed"
                                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                                                    : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                                            }`}
                                        >
                                            {evaluation.statusLabel}
                                        </span>
                                        <span className="text-xl font-bold">
                                            {evaluation.score}%
                                        </span>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-zinc-800">
                                        <div
                                            className="h-full rounded-full bg-violet-500 dark:bg-indigo-500"
                                            style={{ width: `${evaluation.score}%` }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs">{evaluation.message}</p>
                                    {evaluation.matchedSections.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-xs font-medium">Phần đã khớp</p>
                                            <ul className="mt-1 flex flex-wrap gap-1">
                                                {evaluation.matchedSections.map((s) => (
                                                    <li
                                                        key={s}
                                                        className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                                                    >
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {evaluation.missingSections.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-xs font-medium">Phần còn thiếu</p>
                                            <ul className="mt-1 flex flex-wrap gap-1">
                                                {evaluation.missingSections.map((s) => (
                                                    <li
                                                        key={s}
                                                        className="rounded bg-amber-50 px-2 py-0.5 text-[10px] text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                                                    >
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {evaluation.recommendations.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-xs font-medium">Gợi ý</p>
                                            <ul className="mt-1 list-inside list-disc text-xs text-slate-600 dark:text-zinc-400">
                                                {evaluation.recommendations.map((r) => (
                                                    <li key={r}>{r}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="mt-2 text-xs text-slate-500">
                                    Chưa chấm. Upload file và bấm Chấm tài liệu.
                                </p>
                            )}
                        </section>
                    </div>
                )}

                {activeTab === "modelAnswer" && (
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            Đáp án tham khảo
                        </h3>
                        {modelUnlocked ? (
                            <pre className="mt-3 max-h-[60vh] overflow-auto rounded-lg bg-slate-900 p-3 text-[10px] leading-relaxed text-slate-200 whitespace-pre-wrap">
                                {PRD_SAMPLE_ANSWER}
                            </pre>
                        ) : (
                            <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-slate-300 py-10 dark:border-zinc-700">
                                <Lock className="h-8 w-8 text-slate-400" />
                                <p className="mt-3 max-w-xs text-center text-xs text-slate-500">
                                    Đáp án tham khảo sẽ được mở sau khi bạn nộp bài hoặc sau
                                    khi hệ thống chấm xong.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "resources" && (
                    <ul className="space-y-3">
                        {PRD_RESOURCES.map((r) => (
                            <li
                                key={r.id}
                                className="rounded-xl border border-slate-200 p-3 dark:border-zinc-800"
                            >
                                <div className="flex items-start gap-2">
                                    <BookOpen className="h-4 w-4 shrink-0 text-violet-600 dark:text-indigo-400" />
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {r.title}
                                        </p>
                                        <p className="text-[10px] text-slate-500">
                                            {r.type} · {r.estimatedTime}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setResourcePreview(r)}
                                    className="mt-2 text-xs text-violet-600 hover:underline dark:text-indigo-400"
                                >
                                    Xem nhanh
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {resourcePreview && (
                <PreviewModal
                    open
                    onClose={() => setResourcePreview(null)}
                    title={resourcePreview.title}
                    subtitle={resourcePreview.type}
                    description={resourcePreview.content}
                    estimatedTime={resourcePreview.estimatedTime}
                />
            )}
        </div>
    );
}

function BriefBlock({ title, body }: { title: string; body: string }) {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase text-slate-500">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-zinc-300">
                {body}
            </p>
        </div>
    );
}
