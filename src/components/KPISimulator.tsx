'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Users, TrendingUp, AlertTriangle, Play, HelpCircle, ShieldAlert } from 'lucide-react';

export default function KPISimulator() {
  // Input States
  const [pricing, setPricing] = useState(1.15); // Pricing multiplier (0.8 - 1.5)
  const [orderLevel, setOrderLevel] = useState(450); // Order volume (100 - 1000)
  const [staffing, setStaffing] = useState(6); // Staff size (2 - 15)
  const [marketing, setMarketing] = useState(1500); // Marketing spend ($0 - $5000)

  // Calculations
  const metrics = useMemo(() => {
    const costOfProduct = 10.0;
    const baseTraffic = 2000;
    const priceMultiplier = pricing;
    
    // Marketing increases traffic
    const marketingImpact = 1.0 + (marketing / 1200) * 0.55;
    
    // Pricing reduces traffic if high, increases if low
    const pricingImpact = Math.max(0.1, 2.2 - priceMultiplier * 1.35);
    
    // Final Traffic
    const traffic = Math.round(baseTraffic * marketingImpact * pricingImpact);
    
    // Conversion Rate based on Staffing vs Traffic
    const baseConversion = 0.28;
    const trafficPerStaff = traffic / staffing;
    
    let staffingImpact = 1.0;
    if (trafficPerStaff < 150) {
      staffingImpact = 1.25; // Over-staffed, excellent conversion
    } else if (trafficPerStaff > 450) {
      staffingImpact = 0.65; // Under-staffed, long queues, customers walk away
    } else {
      staffingImpact = 1.2 - (trafficPerStaff - 150) * 0.0018;
    }
    
    const conversionRate = Math.max(0.08, Math.min(0.55, baseConversion * staffingImpact));
    const itemsPerBasket = 1.8;
    
    // Weekly demand
    const demand = Math.round(traffic * conversionRate * itemsPerBasket);
    
    // Sales quantity cannot exceed available stock
    const sales = Math.min(demand, orderLevel);
    
    // Prices
    const sellingPrice = costOfProduct * priceMultiplier;
    const revenue = Math.round(sales * sellingPrice);
    const costOfGoodsSold = Math.round(sales * costOfProduct);
    const grossProfit = revenue - costOfGoodsSold;
    
    // Expenses
    const holdingCost = Math.round(orderLevel * 0.22); // $0.22 per unit in stock
    const laborCost = staffing * 450; // $450 per employee/week
    const totalExpenses = holdingCost + laborCost + marketing;
    
    const netProfit = grossProfit - totalExpenses;
    
    // KPIs
    const profitMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : '0';
    const grossMarginPercent = sellingPrice > 0 ? (((sellingPrice - costOfProduct) / sellingPrice) * 100).toFixed(1) : '0';
    const stockoutRate = demand > 0 ? (((demand - sales) / demand) * 100).toFixed(1) : '0';
    const wasteRate = orderLevel > 0 ? (Math.max(0, ((orderLevel - sales) / orderLevel) * 100)).toFixed(1) : '0';
    
    // GMROI = Gross Profit / Average Inventory Investment
    const inventoryInvestment = orderLevel * costOfProduct;
    const gmroi = inventoryInvestment > 0 ? ((grossProfit / inventoryInvestment) * 100).toFixed(0) : '0';
    
    // Customer Satisfaction (CSAT)
    let csat = 85;
    // Lowered by stockouts
    csat -= parseFloat(stockoutRate) * 0.65;
    // Lowered by poor staffing service
    if (trafficPerStaff > 350) {
      csat -= (trafficPerStaff - 350) * 0.15;
    } else {
      csat += (350 - trafficPerStaff) * 0.04;
    }
    // Impacted by high prices
    if (priceMultiplier > 1.25) {
      csat -= (priceMultiplier - 1.25) * 80;
    } else if (priceMultiplier < 0.95) {
      csat += (0.95 - priceMultiplier) * 20;
    }
    csat = Math.round(Math.max(15, Math.min(100, csat)));

    // Warning signals
    const warnings: string[] = [];
    if (parseFloat(stockoutRate) > 15) {
      warnings.push('Yüksek Yok Satma Oranı: Sipariş miktarınız talebin çok gerisinde kalıyor, ciro kaybediyorsunuz.');
    }
    if (parseFloat(wasteRate) > 20) {
      warnings.push('Yüksek Envanter Firesi: İhtiyacınızdan fazla mal sipariş ettiniz, holding maliyetleriniz kârlılığı eritiyor.');
    }
    if (trafficPerStaff > 350) {
      warnings.push('Yetersiz Kadro: Müşteri başına düşen personel az. Kasa kuyrukları uzuyor ve CSAT düşüyor.');
    }
    if (netProfit < 0) {
      
      warnings.push('Zarar Ediyorsunuz: Brüt kârınız, operasyonel giderlerinizi (personel, envanter holding, pazarlama) karşılayamıyor.');
    }

    return {
      traffic,
      conversionRate: (conversionRate * 100).toFixed(1),
      demand,
      sales,
      revenue,
      grossMarginPercent,
      holdingCost,
      laborCost,
      totalExpenses,
      netProfit,
      profitMargin,
      stockoutRate,
      wasteRate,
      gmroi,
      csat,
      warnings,
      trafficPerStaff: Math.round(trafficPerStaff)
    };
  }, [pricing, orderLevel, staffing, marketing]);

  return (
    <div className="bg-white rounded-xl border border-gray-150 p-6 md:p-8 shadow-sm">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h3 className="font-display font-extrabold text-lg text-primary-navy flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-corporate-blue" />
          <span>Market Operasyonu KPI Simülatörü</span>
        </h3>
        <p className="text-xs text-secondary-text mt-1">
          Haftalık mağaza kararlarını ayarlayın ve fiyatlandırma, kadro, sipariş seviyesi ile pazarlamanın finansal performansa etkisini canlı simüle edin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (Left) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-5">
            <h4 className="font-display font-bold text-xs text-primary-navy uppercase tracking-wider">Haftalık Kararlar</h4>
            
            {/* Pricing Multiplier */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Fiyat Çarpanı (Maliyet x Y)</span>
                <span className="font-mono text-corporate-blue font-bold">{pricing.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.6"
                step="0.05"
                value={pricing}
                onChange={(e) => setPricing(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-corporate-blue"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0.80x (Zararına Satış)</span>
                <span>1.60x (Lüks Fiyat)</span>
              </div>
            </div>

            {/* Order Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Sipariş / Envanter Miktarı</span>
                <span className="font-mono text-corporate-blue font-bold">{orderLevel} Adet</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={orderLevel}
                onChange={(e) => setOrderLevel(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-corporate-blue"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>100 Adet</span>
                <span>1000 Adet</span>
              </div>
            </div>

            {/* Staffing level */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Kasa & Saha Kadrosu</span>
                <span className="font-mono text-corporate-blue font-bold">{staffing} Personel</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                step="1"
                value={staffing}
                onChange={(e) => setStaffing(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-corporate-blue"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>2 Personel</span>
                <span>15 Personel</span>
              </div>
            </div>

            {/* Marketing budget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Haftalık Pazarlama Bütçesi</span>
                <span className="font-mono text-corporate-blue font-bold">₺{marketing}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="250"
                value={marketing}
                onChange={(e) => setMarketing(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-corporate-blue"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₺0 (Tanıtımsız)</span>
                <span>₺5,000 (Yoğun Reklam)</span>
              </div>
            </div>
          </div>
          
          {/* Simulation instructions */}
          <div className="p-4 bg-light-blue/30 border border-corporate-blue/10 rounded-xl flex items-start space-x-2.5">
            <HelpCircle className="h-5 w-5 text-corporate-blue shrink-0 pt-0.5" />
            <p className="text-[11px] text-gray-600 leading-relaxed font-light">
              <strong>Simülatör Mantığı:</strong> Fiyatı artırmak ciro oranını yükseltir ancak gelen trafiği ve talebi düşürür. Pazarlama bütçesi trafiği artırır. Trafiğin artması kasalarda yoğunluk yaratır, yetersiz personel bulunması durumunda müşteriler kuyrukta beklemeyip mağazayı terk eder (düşük sepet dönüşüm oranı ve CSAT düşüşü). Sipariş miktarı talebin altındaysa "Yok Satma" oluşur, üstündeyse "Depolama holding maliyeti" artar.
            </p>
          </div>
        </div>

        {/* Dashboard Results Column (Right) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Financial Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0B1F3A] text-white rounded-xl text-center">
              <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Haftalık Ciro</span>
              <span className="text-lg font-extrabold block mt-1 font-mono">₺{metrics.revenue.toLocaleString()}</span>
            </div>
            
            <div className={`p-4 rounded-xl text-center text-white ${
              metrics.netProfit >= 0 ? 'bg-green-700' : 'bg-red-700'
            }`}>
              <span className="text-[10px] opacity-75 block uppercase font-bold tracking-wider">Net Kâr / Zarar</span>
              <span className="text-lg font-extrabold block mt-1 font-mono">
                {metrics.netProfit < 0 ? '-' : ''}₺{Math.abs(metrics.netProfit).toLocaleString()}
              </span>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl text-center">
              <span className="text-[10px] text-gray-500 block uppercase font-semibold">CSAT (Memnuniyet)</span>
              <span className={`text-lg font-extrabold block mt-1 font-mono ${
                metrics.csat > 75 ? 'text-green-600' : metrics.csat > 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>%{metrics.csat}</span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl text-center">
              <span className="text-[10px] text-gray-500 block uppercase font-semibold">GMROI (Stok Getirisi)</span>
              <span className="text-lg font-extrabold text-corporate-blue block mt-1 font-mono">%{metrics.gmroi}</span>
            </div>
          </div>

          {/* Operational Metrics breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-100 py-3 px-4 flex justify-between items-center">
              <h5 className="text-xs font-bold text-primary-navy">Detaylı Metrik Raporu</h5>
              <span className="text-[10px] font-semibold text-secondary-text">Haftalık Rapor</span>
            </div>
            
            <div className="divide-y divide-gray-150 px-4 text-xs font-light">
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Haftalık Müşteri Trafiği</span>
                <span className="font-semibold text-primary-navy font-mono">{metrics.traffic} Ziyaretçi</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Sepete Dönüşüm Oranı (Kuyruktan Kaçmayan)</span>
                <span className="font-semibold text-primary-navy font-mono">%{metrics.conversionRate}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Personel Başına Ziyaretçi Oranı</span>
                <span className="font-semibold text-primary-navy font-mono">{metrics.trafficPerStaff} Müşteri / Personel</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Sipariş Edilen / Talep Edilen</span>
                <span className="font-semibold text-primary-navy font-mono">{orderLevel} / {metrics.demand} Adet</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Kayıp / Yok Satma Oranı</span>
                <span className={`font-semibold font-mono ${parseFloat(metrics.stockoutRate) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  %{metrics.stockoutRate}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Elde Kalan / Atıl Stok Oranı</span>
                <span className={`font-semibold font-mono ${parseFloat(metrics.wasteRate) > 15 ? 'text-yellow-600' : 'text-gray-700'}`}>
                  %{metrics.wasteRate}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Operasyonel Giderler (Personel+Holding+Pazarlama)</span>
                <span className="font-semibold text-primary-navy font-mono">₺{metrics.totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Warning Messages box */}
          {metrics.warnings.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center space-x-1.5 text-warning-orange text-xs font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Simülasyon Uyarıları</span>
              </div>
              <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-1 font-light leading-relaxed">
                {metrics.warnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
