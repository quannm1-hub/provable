"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function RedirectContent() {
    const searchParams = useSearchParams();
    const task = searchParams.get("task");

    useEffect(() => {
        const dest = task
            ? `/internships/coccoc?task=${encodeURIComponent(task)}`
            : "/internships/coccoc";
        window.location.replace(dest);
    }, [task]);

    return (
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
            Đang chuyển đến Cốc Cốc…
        </div>
    );
}

export default function LegacyFptSoftwareRedirect() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
                    Đang chuyển…
                </div>
            }
        >
            <RedirectContent />
        </Suspense>
    );
}
