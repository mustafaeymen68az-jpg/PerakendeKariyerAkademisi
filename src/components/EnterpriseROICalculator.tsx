'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  DollarSign, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2,
  Building2,
  AlertCircle
} from 'lucide-react';

export default function EnterpriseROICalculator() {
  const [employeeCount, setEmployeeCount] = useState<number>(250);
  const [turnoverRate, setTurnoverRate] = useState<number>(35); // 35%
  const [replacementCost, setReplacementCost] = useState<number>(45000); // 45.000 TL avg
  const [yearlyHires, setYearlyHires] = useState<number>(85);

  // Math Calculations:
  // Annual Turnover Employees = employeeCount * (turnoverRate / 100)
  const annualTurnoverCount = Math.round(employeeCount * (turnoverRate / 100));
  
  // Total Annual Turnover Cost = annualTurnoverCount * replacementCost
  const totalTurnoverCost = annualTurnoverCount * replacementCost;

  // Savings if Turnover drops by 5%
  const countReduced5 = Math.round(employeeCount * 0.05);
  const savings5 = countReduced5 * replacementCost;

  // Savings if Turnover drops by 10%
  const countReduced10 = Math.round(employeeCount * 0.10);
  const savings10 = countReduced10 * replacementCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="roi-hesaplayici">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <Calculator className="h-4 w-4 text-[#087F96]" />
            <span>Finansal İş Sonuçları Simülasyonu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            İnsan Kaynağı ROI Hesaplayıcı
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Çalışan turnover (kayıp) oranını azaltmanın ve geleceğin yöneticilerini içeriden yetiştirmenin şirketinize kazandıracağı finansal tasarrufu hesaplayın.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="bg-[#0B2A4A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#087F96]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Form Inputs (Left) */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold text-[#DDF4F7] uppercase tracking-wider flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-[#087F96]" />
              Şirket Parametrelerinizi Girin
            </h3>

            {/* Field 1: Employee Count */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <label className="text-gray-200">Toplam Mağaza / Saha Çalışanı Sayısı:</label>
                <span className="text-emerald-400 font-extrabold">{employeeCount} Çalışan</span>
              </div>
              <input
                type="range"
                min="30"
                max="5000"
                step="10"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#087F96]"
              />
            </div>

            {/* Field 2: Turnover Rate % */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <label className="text-gray-200">Mevcut Yıllık Turnover (Ayrılma) Oranı (%):</label>
                <span className="text-amber-400 font-extrabold">%{turnoverRate}</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={turnoverRate}
                onChange={(e) => setTurnoverRate(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Field 3: Replacement Cost per Employee */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <label className="text-gray-200">Ortalama Bir Çalışanın İşe Alım & Adaptasyon Maliyeti (₺):</label>
                <span className="text-[#DDF4F7] font-extrabold">{formatCurrency(replacementCost)}</span>
              </div>
              <input
                type="range"
                min="15000"
                max="150000"
                step="5000"
                value={replacementCost}
                onChange={(e) => setReplacementCost(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#087F96]"
              />
            </div>

            {/* Info note */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-[#087F96] flex-shrink-0" />
              <span>*Hesaplama; işe alım ilan, mülakat, oryantasyon, verimsizlik ve eğitimsiz çalışan kaynaklı kayıpların tahmini maliyetini baz alır.</span>
            </div>
          </div>

          {/* Results Output (Right) */}
          <div className="lg:col-span-6 bg-[#061B33] p-6 sm:p-8 rounded-2xl border border-[#087F96]/40 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold">
              <span>Mevcut Tahmini Yıllık Kayıp</span>
            </div>

            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase">Tahmini Yıllık Turnover Maliyeti</div>
              <div className="text-3xl sm:text-4xl font-black text-red-400 mt-1">
                {formatCurrency(totalTurnoverCost)}
              </div>
              <div className="text-xs text-gray-300 mt-1">
                (Yılda yaklaşık <span className="font-bold text-white">{annualTurnoverCount} çalışan</span> işten ayrılıyor)
              </div>
            </div>

            {/* Savings Scenarios */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                PKA Yapılandırılmış Gelişim Sistemi İle Tahmini Tasarruf
              </h4>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-left">
                <div>
                  <div className="font-bold text-sm text-emerald-300">Turnover Oranı %5 Azalırsa:</div>
                  <div className="text-xs text-gray-300">{countReduced5} daha az çalışan kaybı</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-400">+{formatCurrency(savings5)}</div>
                  <div className="text-[10px] text-emerald-300 font-bold">Net Tasarruf</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-center justify-between text-left">
                <div>
                  <div className="font-bold text-sm text-emerald-300">Turnover Oranı %10 Azalırsa:</div>
                  <div className="text-xs text-gray-300">{countReduced10} daha az çalışan kaybı</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-300">+{formatCurrency(savings10)}</div>
                  <div className="text-[10px] text-emerald-300 font-bold">Net Tasarruf</div>
                </div>
              </div>
            </div>

            {/* Explicit Disclaimer */}
            <div className="text-[11px] text-gray-400 italic pt-2">
              ⚠️ Not: Yukarıdaki sonuçlar girilen parametrelere dayalı **"Tahmini Senaryo"** modellemesidir.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
