"use client";

import { mockUser } from "@/lib/mock-user";

type Props = {
    size?: "sm" | "md" | "lg";
    className?: string;
    initials?: string;
};

const sizeClass = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-xl",
};

export default function UserAvatar({
    size = "sm",
    className = "",
    initials = mockUser.avatarInitials,
}: Props) {
    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 font-semibold text-white shadow-sm ring-2 ring-white dark:ring-zinc-900 ${sizeClass[size]} ${className}`}
            aria-hidden
        >
            {initials}
        </span>
    );
}
