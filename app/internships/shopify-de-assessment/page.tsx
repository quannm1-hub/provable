"use client";

import { useEffect } from "react";

/** Redirect legacy route */
export default function ShopifyDeAssessmentRedirectPage() {
    useEffect(() => {
        const qs = window.location.search;
        window.location.replace(`/internships/coccoc-de-assessment${qs}`);
    }, []);
    return (
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
            Đang chuyển sang Cốc Cốc · DE Intern Assessment…
        </div>
    );
}
