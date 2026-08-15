'use client';

import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'white-bg';
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
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24'
  };

  const isDarkBg = variant === 'dark';

  return (
    <div className={`inline-flex items-center group transition-transform hover:scale-[1.02] ${className}`}>
      <div className={`relative flex items-center justify-center rounded-2xl transition-all ${
        isDarkBg 
          ? 'bg-white p-1.5 sm:p-2 shadow-md border border-white/20' 
          : 'bg-transparent p-0.5'
      }`}>
        <img
          src="/images/logo.png"
          alt="Perakende Kariyer Akademisi - Perakendecilikte Kariyer Yolculuğunuzun Adresi"
          className={`${heightMap[size]} w-auto object-contain shrink-0 rounded-xl`}
        />
      </div>
    </div>
  );
}
