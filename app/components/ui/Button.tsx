"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    children: ReactNode;
};

const variantClass: Record<Variant, string> = {
    primary:
        "bg-violet-600 text-white hover:bg-violet-500 dark:bg-indigo-600 dark:hover:bg-indigo-500",
    secondary:
        "border border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
    ghost:
        "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900",
    danger:
        "border border-red-200 bg-red-50 text-red-800 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
    success:
        "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600",
};

const sizeClass: Record<Size, string> = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
};

export default function Button({
    variant = "secondary",
    size = "sm",
    className = "",
    disabled,
    children,
    ...rest
}: Props) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-md font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${sizeClass[size]} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}
