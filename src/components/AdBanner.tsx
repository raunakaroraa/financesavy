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
  // Read AdSense Client ID from environment variables
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // IMPORTANT FOR ADSENSE APPROVAL:
  // Before approval, we intentionally render NOTHING (null).
  // Empty ad placeholders or dashed "Advertisement" boxes trigger automated bot rejections
  // for "Site Under Construction" or "Valuable Inventory: Template/Placeholders".
  // Only once approved and ca-pub-XXXXX is configured will ad slots render.
  if (!adClientId) {
    return null;
  }

  return (
    <aside 
      aria-label="Advertisement"
      className={`ad-slot-container my-8 w-full flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-full flex items-center justify-center mb-1.5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-medium">
          Advertisement
        </span>
      </div>

      <div
        className={`w-full overflow-hidden flex flex-col items-center justify-center text-center ${
          format === 'rectangle'
            ? 'max-w-[336px] min-h-[280px]'
            : format === 'in-article'
            ? 'max-w-3xl min-h-[120px]'
            : 'max-w-4xl min-h-[90px]'
        }`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={adClientId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
