import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Provable — Học SQL tương tác",
    description:
        "Bài học SQL thích ứng, thực hành có hướng dẫn và mô phỏng công việc cho người mới.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="vi"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem("provable-theme");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(t==="light"?"light":"dark");}catch(e){document.documentElement.classList.add("dark");}})();`,
                    }}
                />
            </head>
            <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
