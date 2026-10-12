'use client';

import React, { useState } from 'react';

interface DataPoint {
  label: string | number;
  value: number;
  secondaryValue?: number;
}

interface SvgLineChartProps {
  data: DataPoint[];
  title?: string;
  valuePrefix?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: number;
}

export default function SvgLineChart({
  data,
  title,
  valuePrefix = '$',
  primaryLabel = 'Portfolio Value',
  secondaryLabel,
  height = 240,
}: SvgLineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="text-gray-400 text-sm py-8 text-center">No projection data available</div>;
  }

  const values = data.map((d) => d.value);
  if (secondaryLabel) {
    values.push(...data.map((d) => d.secondaryValue || 0));
  }

  const maxValue = Math.max(...values, 100);
  const minValue = 0;
  const paddingX = 40;
  const paddingY = 25;
  const width = 600;

  const pointsPrimary = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.value - minValue) / (maxValue - minValue)) * (height - paddingY * 2);
    return { x, y, data: d };
  });

  const pathPrimary = pointsPrimary.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  let pathSecondary = '';
  if (secondaryLabel) {
    const pointsSecondary = data.map((d, index) => {
      const x = paddingX + (index / (data.length - 1 || 1)) * (width - paddingX * 2);
      const val = d.secondaryValue || 0;
      const y = height - paddingY - ((val - minValue) / (maxValue - minValue)) * (height - paddingY * 2);
      return { x, y };
    });
    pathSecondary = pointsSecondary.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }

  // Format large numbers for Y-axis
  const formatCompact = (val: number) => {
    if (val >= 1000000) return `${valuePrefix}${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${valuePrefix}${(val / 1000).toFixed(0)}k`;
    return `${valuePrefix}${Math.round(val)}`;
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-inner">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400">{title}</h4>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 inline-block"></span>
              {primaryLabel}
            </span>
            {secondaryLabel && (
              <span className="flex items-center text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-1.5 inline-block"></span>
                {secondaryLabel}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);
            const val = minValue + ratio * (maxValue - minValue);
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="4 4"
                  strokeWidth="0.8"
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px]"
                >
                  {formatCompact(val)}
                </text>
              </g>
            );
          })}

          {/* Area fill for primary */}
          {pointsPrimary.length > 0 && (
            <path
              d={`${pathPrimary} L ${pointsPrimary[pointsPrimary.length - 1].x} ${height - paddingY} L ${pointsPrimary[0].x} ${height - paddingY} Z`}
              fill="url(#primaryGradient)"
              opacity="0.25"
            />
          )}

          <defs>
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Secondary Line */}
          {pathSecondary && (
            <path
              d={pathSecondary}
              fill="none"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          )}

          {/* Primary Line */}
          <path
            d={pathPrimary}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Points */}
          {pointsPrimary.map((pt, i) => (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIndex === i ? 6 : 3}
                fill={hoverIndex === i ? '#ffffff' : '#10b981'}
                stroke="#047857"
                strokeWidth="2"
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverIndex !== null && pointsPrimary[hoverIndex] && (
          <div
            className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 shadow-xl transition-all"
            style={{
              left: `${(pointsPrimary[hoverIndex].x / width) * 100}%`,
              top: `${(pointsPrimary[hoverIndex].y / height) * 100 - 4}%`,
            }}
          >
            <div className="font-medium text-slate-300">
              {data[hoverIndex].label}
            </div>
            <div className="font-bold text-emerald-400">
              {valuePrefix}{data[hoverIndex].value.toLocaleString()}
            </div>
            {secondaryLabel && data[hoverIndex].secondaryValue !== undefined && (
              <div className="font-semibold text-indigo-300 text-[11px]">
                Target: {valuePrefix}{data[hoverIndex].secondaryValue?.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* X Axis bottom markers */}
      <div className="flex justify-between text-[11px] text-slate-400 mt-2 px-6">
        <span>{data[0]?.label}</span>
        {data.length > 2 && <span>{data[Math.floor(data.length / 2)]?.label}</span>}
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}
