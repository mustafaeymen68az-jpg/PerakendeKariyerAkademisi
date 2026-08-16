'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROLE_LABELS, SystemRoleType } from '@/lib/rbac';
import { ShieldCheck, ChevronDown, Check, GraduationCap, UserCheck, Building2, ShieldAlert } from 'lucide-react';

interface RoleSwitcherProps {
  activeRole: SystemRoleType;
  availableRoles: SystemRoleType[];
}

const ROLE_ICONS: Record<SystemRoleType, React.ReactNode> = {
  'STUDENT': <GraduationCap className="w-4 h-4 text-blue-600" />,
  'INSTRUCTOR': <UserCheck className="w-4 h-4 text-emerald-600" />,
  'ORGANIZATION_ADMIN': <Building2 className="w-4 h-4 text-purple-600" />,
  'PLATFORM_ADMIN': <ShieldAlert className="w-4 h-4 text-amber-600" />
};

export default function RoleSwitcher({ activeRole, availableRoles }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();

  if (!availableRoles || availableRoles.length <= 1) {
    // Single role user - show clean static badge
    return (
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
        {ROLE_ICONS[activeRole] || <ShieldCheck className="w-4 h-4 text-blue-600" />}
        <span>{ROLE_LABELS[activeRole] || activeRole}</span>
      </div>
    );
  }

  const handleRoleSelect = async (role: SystemRoleType) => {
    if (role === activeRole || isChanging) return;
    setIsChanging(true);
    setIsOpen(false);

    try {
      const res = await fetch('/api/user/active-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: role })
      });
      const data = await res.json();
      if (data.success && data.redirectUrl) {
        router.push(data.redirectUrl);
        router.refresh();
      }
    } catch (e) {
      console.error('Role switch failed:', e);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-full text-xs font-black text-slate-800 transition-all shadow-2xs cursor-pointer active:scale-95"
      >
        {ROLE_ICONS[activeRole]}
        <span>{ROLE_LABELS[activeRole] || activeRole}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in zoom-in-95">
          <div className="px-4 py-2 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            Aktif Görünüm Değiştir
          </div>
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role)}
              className={`w-full px-4 py-2.5 text-xs font-bold text-left transition-colors flex items-center justify-between cursor-pointer ${
                role === activeRole ? 'bg-blue-50/80 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                {ROLE_ICONS[role]}
                <span>{ROLE_LABELS[role] || role}</span>
              </div>
              {role === activeRole && <Check className="w-4 h-4 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
