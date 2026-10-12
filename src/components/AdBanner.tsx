'use client';

import React from 'react';

interface AdBannerProps {
  format?: 'leaderboard' | 'rectangle' | 'in-article';
  className?: string;
  adSlot?: string;
}

export default function AdBanner({
  format = 'leaderboard',
  className = '',
  adSlot = 'default-slot',
}: AdBannerProps) {
  // Read AdSense Client ID if provided in env
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <aside 
      aria-label="Sponsored advertisement"
      className={`ad-slot-container my-8 w-full flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-full flex items-center justify-center mb-1.5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-medium">
          Advertisement
        </span>
      </div>

      <div
        className={`w-full bg-slate-100/80 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center p-4 transition-colors ${
          format === 'rectangle'
            ? 'max-w-[320px] min-h-[250px]'
            : format === 'in-article'
            ? 'max-w-3xl min-h-[140px]'
            : 'max-w-4xl min-h-[90px]'
        }`}
      >
        {adClientId ? (
          // Production AdSense script container
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={adClientId}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          // Pre-approval high-trust placeholder matching Google Better Ads Standards
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500">
              Sponsored Placement Space
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Google AdSense Container ({format})
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
