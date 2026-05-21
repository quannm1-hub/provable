"use client";

import type { ReactNode } from "react";

type Props = {
    header: ReactNode;
    stepper?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
};

export default function AssessmentPageLayout({ header, stepper, children, footer }: Props) {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-zinc-950">
            {header}
            {stepper}
            <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto">
                <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">{children}</div>
            </main>
        </div>
    );
}
