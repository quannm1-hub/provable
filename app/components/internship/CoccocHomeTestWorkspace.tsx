"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "@/app/components/ui/Button";
import DataTable from "@/app/components/DataTable";
import {
    CLICKSTREAM_TASKS,
    COCCOC_PARTS,
    COCCOC_SQL_QUESTIONS,
    LOGIC_QUESTIONS,
    MOCK_DAU,
    MOCK_FB_DAU,
    MOCK_HOUR,
    MOCK_TOP_DOMAINS,
    SAMPLE_DAU_INVESTIGATION,
    SAMPLE_MOBILE_METRICS,
    SAMPLE_REFLECTION,
} from "@/lib/coccoc-home-test";
import {
    evaluateCoccocSql,
    type CoccocSqlQuestionId,
} from "@/lib/coccoc-home-test-eval";

export type SqlQState = {
    query: string;
    submitted: boolean;
    mockUsed: boolean;
    score: number | null;
    feedback: string;
};

type Props = {
    activePart: 1 | 2 | 3 | 4 | 5 | 6;
    logicAnswers: Record<string, string>;
    onLogicAnswer: (id: string, value: string) => void;
    onSubmitLogic: () => void;
    logicSubmitted: boolean;
    logicScore: number | null;
    sqlStates: Record<CoccocSqlQuestionId, SqlQState>;
    activeSqlId: CoccocSqlQuestionId;
    onSqlIdChange: (id: CoccocSqlQuestionId) => void;
    onSqlChange: (id: CoccocSqlQuestionId, patch: Partial<SqlQState>) => void;
    onUseAllMockSql: () => void;
    clickstreamQuery: string;
    onClickstreamQuery: (q: string) => void;
    onSubmitClickstream: () => void;
    onUseMockClickstream: () => void;
    clickstreamDone: boolean;
    clickstreamScore: number | null;
    clickstreamFeedback: string;
    investigationText: string;
    onInvestigation: (t: string) => void;
    onSubmitInvestigation: () => void;
    onSampleInvestigation: () => void;
    investigationScore: number | null;
    investigationMessage: string;
    mobileText: string;
    onMobile: (t: string) => void;
    onSubmitMobile: () => void;
    onSampleMobile: () => void;
    mobileScore: number | null;
    mobileMessage: string;
    reflectionText: string;
    onReflection: (t: string) => void;
    onSubmitReflection: () => void;
    onSampleReflection: () => void;
    reflectionScore: number | null;
    reflectionMessage: string;
    evaluating: boolean;
};

export default function CoccocHomeTestWorkspace(props: Props) {
    const meta = COCCOC_PARTS[props.activePart - 1]!;
    return (
        <section className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="border-b border-slate-100 px-5 py-3 dark:border-zinc-800">
                <h2 className="text-sm font-semibold">
                    Phần {props.activePart} — {meta.title}
                </h2>
                <p className="text-xs text-slate-500">{meta.description}</p>
            </div>
            <div className="p-5">
                {props.activePart === 1 && (
                    <LogicPart
                        answers={props.logicAnswers}
                        onAnswer={props.onLogicAnswer}
                        onSubmit={props.onSubmitLogic}
                        submitted={props.logicSubmitted}
                        score={props.logicScore}
                    />
                )}
                {props.activePart === 2 && (
                    <SqlPart
                        states={props.sqlStates}
                        activeId={props.activeSqlId}
                        onActiveId={props.onSqlIdChange}
                        onChange={props.onSqlChange}
                        onUseAllMock={props.onUseAllMockSql}
                    />
                )}
                {props.activePart === 3 && (
                    <ClickstreamPart
                        query={props.clickstreamQuery}
                        onQuery={props.onClickstreamQuery}
                        onSubmit={props.onSubmitClickstream}
                        onMock={props.onUseMockClickstream}
                        done={props.clickstreamDone}
                        score={props.clickstreamScore}
                        feedback={props.clickstreamFeedback}
                    />
                )}
                {props.activePart === 4 && (
                    <TextPart
                        title="Điều tra DAU giảm"
                        prompt="Một metric quan trọng như DAU giảm. Bạn có clickstream, log feature, survey... Làm sao điều tra nguyên nhân, cơ hội phục hồi, metric và goal?"
                        text={props.investigationText}
                        onChange={props.onInvestigation}
                        minChars={500}
                        onSubmit={props.onSubmitInvestigation}
                        onSample={props.onSampleInvestigation}
                        sampleLabel="Dùng câu trả lời mẫu"
                        evaluating={props.evaluating}
                        score={props.investigationScore}
                        resultMessage={props.investigationMessage}
                    />
                )}
                {props.activePart === 5 && (
                    <TextPart
                        title="Metrics cho Cốc Cốc Mobile"
                        prompt="Đã có Browser Desktop, đang launch Mobile — nên theo dõi metric nào?"
                        text={props.mobileText}
                        onChange={props.onMobile}
                        minChars={300}
                        onSubmit={props.onSubmitMobile}
                        onSample={props.onSampleMobile}
                        sampleLabel="Dùng câu trả lời mẫu"
                        evaluating={props.evaluating}
                        score={props.mobileScore}
                        resultMessage={props.mobileMessage}
                    />
                )}
                {props.activePart === 6 && (
                    <TextPart
                        title="Trải nghiệm sản phẩm"
                        prompt="Trải nghiệm đầu tiên với Cốc Cốc — thích feature nào, kỳ vọng thêm gì?"
                        text={props.reflectionText}
                        onChange={props.onReflection}
                        minChars={200}
                        onSubmit={props.onSubmitReflection}
                        onSample={props.onSampleReflection}
                        sampleLabel="Dùng reflection mẫu"
                        evaluating={props.evaluating}
                        score={props.reflectionScore}
                        resultMessage={props.reflectionMessage}
                    />
                )}
            </div>
        </section>
    );
}

function LogicPart({
    answers,
    onAnswer,
    onSubmit,
    submitted,
    score,
}: {
    answers: Record<string, string>;
    onAnswer: (id: string, v: string) => void;
    onSubmit: () => void;
    submitted: boolean;
    score: number | null;
}) {
    return (
        <div className="space-y-4">
            {LOGIC_QUESTIONS.map((q) => (
                <div
                    key={q.id}
                    className={`rounded-xl border p-4 dark:border-zinc-800 ${
                        q.previewOnly ? "opacity-70 bg-slate-50 dark:bg-zinc-900/30" : ""
                    }`}
                >
                    <p className="text-xs font-semibold text-violet-600">
                        Câu {q.number}
                        {q.previewOnly && " · Preview"}
                    </p>
                    <p className="mt-1 text-sm">{q.prompt}</p>
                    {q.previewOnly ? (
                        <p className="mt-2 text-[10px] text-slate-500">
                            Preview. Có thể thay bằng ảnh/câu hỏi gốc từ file
                            analytical test.
                        </p>
                    ) : (
                        <div className="mt-3 space-y-2">
                            {q.options?.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex cursor-pointer items-center gap-2 text-sm"
                                >
                                    <input
                                        type="radio"
                                        name={q.id}
                                        checked={answers[q.id] === opt}
                                        onChange={() => onAnswer(q.id, opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                            {submitted && q.correct && answers[q.id] && (
                                <p
                                    className={`text-xs ${
                                        answers[q.id] === q.correct
                                            ? "text-emerald-600"
                                            : "text-amber-600"
                                    }`}
                                >
                                    {answers[q.id] === q.correct ? "Đúng" : "Chưa đúng"} —{" "}
                                    {q.explanation}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
            <Button variant="primary" size="sm" onClick={onSubmit}>
                Nộp Phần 1
            </Button>
            {score != null && (
                <p className="text-sm font-medium text-violet-600">Điểm Logic: {score}%</p>
            )}
        </div>
    );
}

function SqlPart({
    states,
    activeId,
    onActiveId,
    onChange,
    onUseAllMock,
}: {
    states: Record<CoccocSqlQuestionId, SqlQState>;
    activeId: CoccocSqlQuestionId;
    onActiveId: (id: CoccocSqlQuestionId) => void;
    onChange: (id: CoccocSqlQuestionId, p: Partial<SqlQState>) => void;
    onUseAllMock: () => void;
}) {
    const q = COCCOC_SQL_QUESTIONS.find((x) => x.id === activeId)!;
    const st = states[activeId];
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {COCCOC_SQL_QUESTIONS.map((sq) => (
                    <button
                        key={sq.id}
                        type="button"
                        onClick={() => onActiveId(sq.id)}
                        className={`rounded-lg border px-2 py-1 text-xs ${
                            activeId === sq.id
                                ? "border-violet-500 bg-violet-50 dark:bg-indigo-950/40"
                                : ""
                        }`}
                    >
                        {sq.title}
                        {(states[sq.id].submitted || states[sq.id].mockUsed) && " ✓"}
                    </button>
                ))}
            </div>
            <p className="text-sm">{q.promptVi}</p>
            <p className="text-xs text-slate-500">{q.hint}</p>
            <textarea
                value={st.query}
                onChange={(e) => onChange(activeId, { query: e.target.value })}
                rows={8}
                className="w-full rounded-lg border p-3 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="SELECT ..."
            />
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        const r = evaluateCoccocSql(st.query, activeId);
                        onChange(activeId, { feedback: r.feedback });
                    }}
                >
                    Chạy thử
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                        const r = evaluateCoccocSql(st.query, activeId);
                        onChange(activeId, {
                            submitted: true,
                            score: r.score,
                            feedback: r.feedback,
                        });
                    }}
                >
                    Nộp câu trả lời
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        onChange(activeId, {
                            mockUsed: true,
                            submitted: true,
                            score: 80,
                            feedback: "Đã dùng kết quả mẫu.",
                        })
                    }
                >
                    Dùng kết quả mẫu
                </Button>
            </div>
            {st.feedback && <p className="text-xs text-slate-500">{st.feedback}</p>}
            {st.score != null && (
                <p className="text-sm font-semibold text-emerald-700">Điểm: {st.score}%</p>
            )}
            <Button variant="secondary" size="sm" onClick={onUseAllMock}>
                Dùng kết quả mẫu (tất cả câu SQL)
            </Button>
        </div>
    );
}

function ClickstreamPart({
    query,
    onQuery,
    onSubmit,
    onMock,
    done,
    score,
    feedback,
}: {
    query: string;
    onQuery: (q: string) => void;
    onSubmit: () => void;
    onMock: () => void;
    done: boolean;
    score: number | null;
    feedback: string;
}) {
    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600">
                Tính DAU, Facebook DAU, traffic theo giờ, top 10 domain từ clickstream sample.
            </p>
            <ul className="list-inside list-disc text-xs text-slate-500">
                {CLICKSTREAM_TASKS.map((t) => (
                    <li key={t.id}>{t.promptVi}</li>
                ))}
            </ul>
            <textarea
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                rows={8}
                className="w-full rounded-lg border p-3 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="SELECT date, COUNT(DISTINCT user_id) ..."
            />
            <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={onSubmit}>
                    Nộp phân tích
                </Button>
                <Button variant="ghost" size="sm" onClick={onMock}>
                    Dùng kết quả mẫu
                </Button>
            </div>
            {done && score != null && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50">
                    <h4 className="text-sm font-semibold">Kết quả chấm bài</h4>
                    <p className="mt-1 text-2xl font-bold">{score}%</p>
                    {feedback && <p className="mt-2 text-xs">{feedback}</p>}
                </div>
            )}
            {done && (
                <div className="space-y-4">
                    <p className="text-xs font-medium text-slate-500">Bảng kết quả</p>
                    <DataTable rows={MOCK_DAU} />
                    <DataTable rows={MOCK_FB_DAU} />
                    <DataTable rows={MOCK_HOUR} />
                    <DataTable rows={MOCK_TOP_DOMAINS} />
                </div>
            )}
        </div>
    );
}

function TextPart({
    title,
    prompt,
    text,
    onChange,
    minChars,
    onSubmit,
    onSample,
    sampleLabel,
    evaluating,
    score,
    resultMessage,
}: {
    title: string;
    prompt: string;
    text: string;
    onChange: (t: string) => void;
    minChars: number;
    onSubmit: () => void;
    onSample: () => void;
    sampleLabel: string;
    evaluating: boolean;
    score: number | null;
    resultMessage: string;
}) {
    return (
        <div className="space-y-4">
            <p className="font-medium text-sm">{title}</p>
            <p className="text-sm text-slate-600 dark:text-zinc-400">{prompt}</p>
            <textarea
                value={text}
                onChange={(e) => onChange(e.target.value)}
                rows={12}
                className="w-full rounded-lg border p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <p className="text-[10px] text-slate-500">
                {text.length} / {minChars} ký tự tối thiểu
            </p>
            <div className="flex gap-2">
                <Button variant="primary" size="sm" disabled={evaluating} onClick={onSubmit}>
                    {evaluating ? (
                        <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang chấm…
                        </>
                    ) : (
                        "Nộp câu trả lời"
                    )}
                </Button>
                <Button variant="ghost" size="sm" onClick={onSample}>
                    {sampleLabel}
                </Button>
            </div>
            {score != null && !evaluating && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-zinc-700">
                    <h4 className="text-sm font-semibold">Kết quả chấm bài</h4>
                    <p className="mt-1 text-2xl font-bold">{score}%</p>
                    {resultMessage && <p className="mt-2 text-xs">{resultMessage}</p>}
                </div>
            )}
        </div>
    );
}
