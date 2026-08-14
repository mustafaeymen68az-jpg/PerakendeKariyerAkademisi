'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  UserCheck, 
  ShoppingCart, 
  Apple, 
  Utensils, 
  Beef, 
  Cookie, 
  Cake, 
  ShieldAlert, 
  Truck, 
  Calculator, 
  Cpu, 
  BarChart3, 
  Users, 
  Globe, 
  Headphones, 
  Wrench, 
  Sparkles, 
  Crown, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Award,
  BookOpen
} from 'lucide-react';
import { DEPARTMENTS_DATA, DepartmentItem } from '@/data/departmentsData';

export type { DepartmentItem };
export { DEPARTMENTS_DATA };

export default function DepartmentGrid() {
  const [selectedDept, setSelectedDept] = useState<DepartmentItem | null>(null);

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart': return <ShoppingCart className="h-6 w-6" />;
      case 'UserCheck': return <UserCheck className="h-6 w-6" />;
      case 'Apple': return <Apple className="h-6 w-6" />;
      case 'Utensils': return <Utensils className="h-6 w-6" />;
      case 'Beef': return <Beef className="h-6 w-6" />;
      case 'Cookie': return <Cookie className="h-6 w-6" />;
      case 'Cake': return <Cake className="h-6 w-6" />;
      case 'ShieldAlert': return <ShieldAlert className="h-6 w-6" />;
      case 'Truck': return <Truck className="h-6 w-6" />;
      case 'Calculator': return <Calculator className="h-6 w-6" />;
      case 'Cpu': return <Cpu className="h-6 w-6" />;
      case 'BarChart3': return <BarChart3 className="h-6 w-6" />;
      case 'Users': return <Users className="h-6 w-6" />;
      case 'Globe': return <Globe className="h-6 w-6" />;
      case 'Headphones': return <Headphones className="h-6 w-6" />;
      case 'Wrench': return <Wrench className="h-6 w-6" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6" />;
      case 'Crown': return <Crown className="h-6 w-6" />;
      default: return <Building2 className="h-6 w-6" />;
    }
  };

  return (
    <div>
      {/* 26 Department Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {DEPARTMENTS_DATA.map((dept) => (
          <div
            key={dept.id}
            onClick={() => setSelectedDept(dept)}
            className="bg-white hover:bg-[#DDF4F7]/20 border border-gray-200 hover:border-[#087F96] rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="bg-[#DDF4F7] p-2.5 rounded-lg text-[#087F96] group-hover:bg-[#087F96] group-hover:text-white transition-colors">
                  {getDepartmentIcon(dept.iconName)}
                </div>
                <span className="text-[11px] font-bold text-[#087F96] bg-[#DDF4F7]/60 px-2 py-0.5 rounded-full">
                  {dept.category}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight">
                {dept.name}
              </h3>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                {dept.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">
                {dept.totalCourses} Modül • {dept.totalHours} Saat
              </span>
              <span className="text-[#087F96] font-bold flex items-center group-hover:translate-x-1 transition-transform">
                Detay <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup for Selected Department */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative p-6 sm:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDept(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4 border-b border-gray-100 pb-5">
              <div className="bg-[#087F96] text-white p-3.5 rounded-xl shadow-md shrink-0">
                {getDepartmentIcon(selectedDept.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-1 rounded-full uppercase">
                  {selectedDept.category}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#0B2A4A] mt-1">
                  {selectedDept.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {selectedDept.description}
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center bg-[#F4F7F9] p-4 rounded-xl border border-gray-200/60">
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Toplam Modül</span>
                <span className="text-lg font-extrabold text-[#0B2A4A] font-mono">{selectedDept.totalCourses} Eğitim</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Eğitim Süresi</span>
                <span className="text-lg font-extrabold text-[#087F96] font-mono">{selectedDept.totalHours} Saat</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Yetkinlik</span>
                <span className="text-xs font-bold text-[#056B80] mt-1 block">{selectedDept.competencyLevel}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Kariyer Hedefi</span>
                <span className="text-xs font-bold text-[#34A853] mt-1 block">{selectedDept.careerGoal}</span>
              </div>
            </div>

            {/* 2-Year Curriculum Breakdown */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-[#087F96]" />
                <span>2 Yıllık Eğitim Yolculuğu Müfredatı</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Year 1 */}
                <div className="bg-[#F4F7F9] border border-[#087F96]/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#087F96]/20 pb-2">
                    <span className="font-display font-bold text-sm text-[#0B2A4A] flex items-center space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#087F96] text-white text-xs font-bold flex items-center justify-center">1</span>
                      <span>1. YIL: Temel Yetkinlik</span>
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {selectedDept.year1Courses.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0 pt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-semibold text-[#056B80] bg-[#DDF4F7] p-2 rounded-lg italic">
                    "İşini doğru, bağımsız ve standartlara uygun yönet."
                  </div>
                </div>

                {/* Year 2 */}
                <div className="bg-[#061B33] text-white rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-display font-bold text-sm text-white flex items-center space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#087F96] text-white text-xs font-bold flex items-center justify-center">2</span>
                      <span>2. YIL: İleri Yetkinlik</span>
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {selectedDept.year2Courses.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 pt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-semibold text-[#DDF4F7] bg-white/10 p-2 rounded-lg italic">
                    "Sonuç üret, süreç geliştir ve bir üst kariyer seviyesine hazırlan."
                  </div>
                </div>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedDept(null)}
                className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Kapat
              </button>
              <Link
                href={`/egitimler?dept=${selectedDept.id}`}
                onClick={() => setSelectedDept(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Bu Departmanın Tüm Eğitimlerini Gör</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
