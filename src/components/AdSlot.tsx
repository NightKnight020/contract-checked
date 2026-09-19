'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface AdSlotProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

/**
 * AdSlot component for Google AdSense integration.
 * 
 * - Renders nothing when NEXT_PUBLIC_ADSENSE_CLIENT_ID is unset
 * - Loads AdSense script and renders ad units when client ID is configured
 * - Never invents fake publisher IDs or loads AdSense without proper config
 */
export function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  
  // Render nothing if client ID is not configured
  if (!clientId) {
    return null;
  }

  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className={`flex flex-col items-center ${className}`}>
        <p className="text-xs text-slate-400 font-medium mb-2">Advertisement</p>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '120px' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
