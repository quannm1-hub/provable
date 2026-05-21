"use client";

import { useEffect } from "react";

/** Redirect legacy route to Cốc Cốc DE assessment */
export default function CoccocHomeTestRedirectPage() {
    useEffect(() => {
        window.location.replace("/internships/coccoc-de-assessment");
    }, []);
    return (
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
            Đang chuyển sang Cốc Cốc · DE Intern Assessment…
        </div>
    );
}
