'use client';

import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'white-bg'; // dark = for dark backgrounds (white text), light = for light backgrounds (navy text), white-bg = card container
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
  className?: string;
}

export default function Logo({
  variant = 'dark',
  size = 'md',
  showSubtext = true,
  className = ''
}: LogoProps) {
  // Size metrics
  const iconSizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const titleSizeMap = {
    sm: 'text-sm font-extrabold tracking-tight',
    md: 'text-base font-extrabold tracking-tight',
    lg: 'text-xl font-extrabold tracking-tight',
    xl: 'text-2xl font-black tracking-tight'
  };

  const subtitleSizeMap = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-[12px]'
  };

  const isDarkBg = variant === 'dark';

  return (
    <div className={`inline-flex items-center space-x-3 group ${className}`}>
      {/* SVG Mark */}
      <div className={`relative flex items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${
        variant === 'white-bg' ? 'bg-white shadow-sm border border-gray-100 p-1.5' : ''
      }`}>
        <svg
          className={`${iconSizeMap[size]} shrink-0`}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background shield/circle container */}
          <rect width="120" height="120" rx="24" fill="url(#logo_grad_bg)" />

          {/* Book Base (Educative foundation) */}
          <path
            d="M22 84C32 79 46 79 60 84C74 79 88 79 98 84V46C88 41 74 41 60 46C46 41 32 41 22 46V84Z"
            fill="#0B2A4A"
            stroke="#087F96"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M60 46V84"
            stroke="#DDF4F7"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Retail Shopping Cart Silhouette (Perakende) */}
          <path
            d="M32 42H36L42 62H74L80 46H40"
            stroke="#DDF4F7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <circle cx="46" cy="68" r="3" fill="#DDF4F7" />
          <circle cx="70" cy="68" r="3" fill="#DDF4F7" />

          {/* Ascending Career Steps / Rising Chart (Kariyer Basamakları) */}
          <rect x="42" y="34" width="7" height="10" rx="1.5" fill="#087F96" />
          <rect x="52" y="28" width="7" height="16" rx="1.5" fill="#087F96" />
          <rect x="62" y="22" width="7" height="22" rx="1.5" fill="#056B80" />
          <rect x="72" y="16" width="7" height="28" rx="1.5" fill="#DDF4F7" />

          {/* Trend Growth Arrow Line */}
          <path
            d="M38 38L52 27L64 21L78 12"
            stroke="#34A853"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M74 12H80V18"
            stroke="#34A853"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rising Human Figure (Yükselen İnsan Figürü) */}
          <circle cx="82" cy="18" r="4.5" fill="#FFFFFF" />
          <path
            d="M75 32C76 27 80 25 82 25C84 25 88 27 89 32"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Reaching arm up */}
          <path
            d="M84 25L92 16"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="logo_grad_bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B2A4A" />
              <stop offset="1" stopColor="#061B33" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-display tracking-tight leading-none ${titleSizeMap[size]} ${
          isDarkBg ? 'text-white' : 'text-[#0B2A4A]'
        }`}>
          PERAKENDE <span className="text-[#087F96]">KARİYER</span> AKADEMİSİ
        </div>
        {showSubtext && (
          <div className={`font-medium tracking-normal mt-1 ${subtitleSizeMap[size]} ${
            isDarkBg ? 'text-[#DDF4F7]/90' : 'text-[#056B80]'
          }`}>
            Perakendecilikte Kariyer Yolculuğunuzun Adresi
          </div>
        )}
      </div>
    </div>
  );
}
