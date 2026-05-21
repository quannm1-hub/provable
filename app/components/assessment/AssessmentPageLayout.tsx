"use client";

import type { ReactNode } from "react";

type Props = {
    header: ReactNode;
    stepper?: ReactNode;
    sidebar?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    wide?: boolean;
};

export default function AssessmentPageLayout({
    header,
    stepper,
    sidebar,
    children,
    footer,
    wide = false,
}: Props) {
    const contentMax = sidebar ? "max-w-3xl" : wide ? "max-w-6xl" : "max-w-4xl";

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-zinc-950">
            {header}
            {stepper}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
                {sidebar}
                <main className="scrollbar-none min-h-0 min-w-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-zinc-950">
                    <div className={`mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 ${contentMax}`}>
                        <div className="space-y-4">{children}</div>
                    </div>
                </main>
            </div>
            {footer}
        </div>
    );
}
