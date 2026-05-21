"use client";

import type { RadarAxis } from "@/lib/assessment-report-analytics";

type Props = {
    axes: RadarAxis[];
    size?: number;
};

const GRID_LEVELS = [20, 40, 60, 80, 100];

export default function AssessmentRadarChart({ axes, size = 280 }: Props) {
    const n = axes.length;
    if (n < 3) return null;

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.32;
    const startAngle = -Math.PI / 2;
    const step = (2 * Math.PI) / n;

    function polar(i: number, valuePct: number) {
        const angle = startAngle + i * step;
        const r = (Math.min(100, Math.max(0, valuePct)) / 100) * maxR;
        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle),
        };
    }

    function gridRing(pct: number) {
        const pts = Array.from({ length: n }, (_, i) => {
            const p = polar(i, pct);
            return `${p.x},${p.y}`;
        });
        return pts.join(" ");
    }

    const dataPoints = axes.map((_, i) => polar(i, axes[i]!.score));
    const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

    const labelOffset = maxR + 36;

    return (
        <div className="flex flex-col items-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="overflow-visible"
                role="img"
                aria-label="Biểu đồ radar điểm theo nhóm"
            >
                {GRID_LEVELS.map((level) => (
                    <polygon
                        key={level}
                        points={gridRing(level)}
                        fill="none"
                        stroke="currentColor"
                        className="text-slate-200 dark:text-zinc-700"
                        strokeWidth={level === 100 ? 1.2 : 0.8}
                    />
                ))}

                {axes.map((_, i) => {
                    const outer = polar(i, 100);
                    return (
                        <line
                            key={i}
                            x1={cx}
                            y1={cy}
                            x2={outer.x}
                            y2={outer.y}
                            className="stroke-slate-200 dark:stroke-zinc-700"
                            strokeWidth={0.8}
                        />
                    );
                })}

                <polygon
                    points={dataPolygon}
                    fill="rgba(5, 150, 105, 0.28)"
                    stroke="#047857"
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                />

                {dataPoints.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={5}
                        fill="#047857"
                        stroke="#fff"
                        strokeWidth={2}
                        className="dark:stroke-zinc-900"
                    />
                ))}

                {axes.map((axis, i) => {
                    const angle = startAngle + i * step;
                    const lx = cx + labelOffset * Math.cos(angle);
                    const ly = cy + labelOffset * Math.sin(angle);
                    const anchor =
                        Math.abs(Math.cos(angle)) < 0.15
                            ? "middle"
                            : Math.cos(angle) > 0
                              ? "start"
                              : "end";

                    return (
                        <g key={axis.label}>
                            <rect
                                x={lx - (anchor === "middle" ? 5 : anchor === "start" ? 0 : 10)}
                                y={ly - 5}
                                width={10}
                                height={10}
                                rx={2}
                                fill={axis.color}
                            />
                            <text
                                x={lx + (anchor === "start" ? 14 : anchor === "end" ? -14 : 0)}
                                y={ly + 4}
                                textAnchor={anchor}
                                className="fill-slate-600 text-[11px] font-medium dark:fill-zinc-400"
                            >
                                {axis.label}
                            </text>
                            <text
                                x={lx + (anchor === "start" ? 14 : anchor === "end" ? -14 : 0)}
                                y={ly + 18}
                                textAnchor={anchor}
                                className="fill-slate-400 text-[10px] tabular-nums dark:fill-zinc-500"
                            >
                                {axis.score}%
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
