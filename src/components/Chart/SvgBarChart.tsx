'use client';

import React from 'react';

interface BarData {
  label: string;
  value: number;
  color?: string;
  secondaryValue?: number;
  secondaryLabel?: string;
}

interface SvgBarChartProps {
  data: BarData[];
  title?: string;
  valuePrefix?: string;
  height?: number;
}

export default function SvgBarChart({
  data,
  title,
  valuePrefix = '$',
  height = 200,
}: SvgBarChartProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => Math.max(d.value, d.secondaryValue || 0)), 100);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
      {title && (
        <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-4">
          {title}
        </h4>
      )}

      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const pct = Math.min(100, Math.max(4, (item.value / maxValue) * 100));
          const secPct = item.secondaryValue
            ? Math.min(100, Math.max(4, (item.secondaryValue / maxValue) * 100))
            : 0;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-medium text-slate-300">{item.label}</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {valuePrefix}
                  {item.value.toLocaleString()}
                </span>
              </div>

              {/* Primary Bar */}
              <div className="w-full bg-slate-800 rounded-md h-3 overflow-hidden flex">
                <div
                  className="h-full rounded-md transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: item.color || '#10b981',
                  }}
                />
              </div>

              {/* Secondary comparison bar if present */}
              {item.secondaryValue !== undefined && (
                <div className="pt-0.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{item.secondaryLabel || 'Alternative'}</span>
                    <span className="font-mono text-amber-400">
                      {valuePrefix}
                      {item.secondaryValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-md h-2 overflow-hidden mt-0.5">
                    <div
                      className="h-full bg-amber-500 rounded-md transition-all duration-500"
                      style={{ width: `${secPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
