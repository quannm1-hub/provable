"use client";

import { useState } from "react";
import {
    COCCOC_DE_PROGRAM_TABS,
    type CoccocDeProgramTabId,
} from "@/lib/coccoc-de-assessment";

const DEFAULT_TAB: CoccocDeProgramTabId = "overview";

export default function CoccocDeProgramContextTabs() {
    const [active, setActive] = useState<CoccocDeProgramTabId>(DEFAULT_TAB);
    const tab =
        COCCOC_DE_PROGRAM_TABS.find((t) => t.id === active) ?? COCCOC_DE_PROGRAM_TABS[0];

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50/90 via-white to-violet-50/40 px-5 py-5 dark:border-zinc-800 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-indigo-950/20">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    Giới thiệu
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                    Bắt đầu từ Giới thiệu chung, sau đó đọc các tab bối cảnh chi tiết
                </p>
            </div>

            <div
                className="flex gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50/80 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-950/50"
                role="tablist"
            >
                {COCCOC_DE_PROGRAM_TABS.map((t) => {
                    const isActive = active === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActive(t.id)}
                            className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                                isActive
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 dark:bg-emerald-600 dark:shadow-emerald-900/40"
                                    : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                            }`}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>

            <div
                className="bg-gradient-to-b from-slate-50/50 to-white p-5 dark:from-zinc-950/30 dark:to-zinc-900/50"
                role="tabpanel"
            >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {tab.label}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700 dark:text-zinc-300">
                    {tab.content}
                </p>

                {tab.sections && tab.sections.length > 0 && (
                    <div className="mt-5 space-y-4">
                        {tab.sections.map((section) => (
                            <div
                                key={section.title}
                                className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-zinc-700/80 dark:bg-zinc-800/40"
                            >
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {section.title}
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                                    {section.content}
                                </p>
                                {section.bullets && section.bullets.length > 0 && (
                                    <ul className="mt-3 space-y-2">
                                        {section.bullets.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-zinc-400"
                                            >
                                                <span
                                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                                                    aria-hidden
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {tab.bullets && tab.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3">
                        {tab.bullets.map((item) => (
                            <li
                                key={item}
                                className="flex gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-300"
                            >
                                <span
                                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                                    aria-hidden
                                />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
