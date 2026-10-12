import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDomain?: boolean;
}

export default function Logo({
  variant = 'light',
  size = 'md',
  className = '',
  showDomain = true,
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Bespoke Geometric SVG Emblem */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Subtle Outer Octagon/Shield Contour */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="url(#brandGrad)"
            stroke={isDark ? '#065f46' : '#047857'}
            strokeWidth="1.5"
          />

          {/* Precision Financial Geometry: Interlocking F & S with Ascending Arrow */}
          {/* Top Horizontal Bar (F arm) */}
          <path
            d="M13 14H35"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Mid Horizontal Bar */}
          <path
            d="M13 24H27"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Vertical Stem */}
          <path
            d="M13 14V34"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Dynamic Ascending Growth Chevron (Sovereign Wealth Path) */}
          <path
            d="M24 34L35 23M35 23H28M35 23V30"
            stroke="#34d399"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Accent Gold Spark / Precision Vertex */}
          <circle cx="35" cy="14" r="2.5" fill="#fbbf24" />

          {/* Linear Gradients */}
          <defs>
            <linearGradient
              id="brandGrad"
              x1="4"
              y1="4"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#047857" />
              <stop offset="1" stopColor="#064e3b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typographic Logotype */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span
            className={`font-extrabold tracking-tight ${textSizes[size]} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Finance<span className="text-emerald-600">Savy</span>
          </span>

          {showDomain && (
            <span
              className={`font-mono font-bold uppercase rounded-md tracking-wider ${badgeSizes[size]} ${
                isDark
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              .pro
            </span>
          )}
        </div>
        <span
          className={`text-[9px] uppercase tracking-widest font-semibold ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Decision Engine
        </span>
      </div>
    </div>
  );
}

