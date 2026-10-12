'use client';

import React from 'react';

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface SvgDonutChartProps {
  data: Segment[];
  title?: string;
  centerText?: string;
  centerSubtext?: string;
}

export default function SvgDonutChart({
  data,
  title,
  centerText,
  centerSubtext,
}: SvgDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col items-center">
      {title && (
        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-3 w-full text-left">
          {title}
        </h4>
      )}

      <div className="relative flex items-center justify-center my-2">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />

          {data.map((item, idx) => {
            const percent = item.value / total;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += percent;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>

        {(centerText || centerSubtext) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {centerText && (
              <span className="font-mono text-lg font-bold text-white tracking-tight">
                {centerText}
              </span>
            )}
            {centerSubtext && (
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
                {centerSubtext}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
        {data.map((item, idx) => {
          const pct = Math.round((item.value / total) * 100);
          return (
            <div key={idx} className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex flex-col min-w-0">
                <span className="text-slate-300 truncate text-[11px]">{item.label}</span>
                <span className="font-mono font-semibold text-slate-100 text-xs">
                  {pct}% <span className="text-slate-400 font-normal">(${item.value.toLocaleString()})</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
