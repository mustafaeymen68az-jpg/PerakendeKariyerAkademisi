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
    const profitMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : 0;
    const grossMarginPercent = sellingPrice > 0 ? (((sellingPrice - costOfProduct) / sellingPrice) * 100).toFixed(1) : 0;
    const stockoutRate = demand > 0 ? (((demand - sales) / demand) * 100).toFixed(1) : 0;
    const wasteRate = orderLevel > 0 ? (Math.max(0, ((orderLevel - sales) / orderLevel) * 100)).toFixed(1) : 0;
    
    // GMROI = Gross Profit / Average Inventory Investment
    const inventoryInvestment = orderLevel * costOfProduct;
    const gmroi = inventoryInvestment > 0 ? ((grossProfit / inventoryInvestment) * 100).toFixed(0) : 0;
    
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
      trafficPerStaff: Math.round(trafficPerStaff)
    };
  }, [pricing, orderLevel, staffing, marketing]);

  return (
    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #fff 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
          Perakende KPI Simülatörü
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Kararları değiştirin, metrikleri eşzamanlı izleyin. Bir perakende mühendisi gibi fiyatlandırma, tedarik, İK ve pazarlama entegrasyonunu yönetin.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Decision Sliders */}
        <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play size={18} /> Karar Giriş Paneli
          </h3>

          {/* Pricing Slider */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Fiyatlandırma Çarpanı (Maliyet: $10.00)</span>
              <span className="slider-value" style={{ color: pricing > 1.25 ? 'var(--color-warning)' : pricing < 0.95 ? 'var(--color-accent)' : 'var(--color-success)' }}>
                {pricing.toFixed(2)}x (${(10 * pricing).toFixed(2)})
              </span>
            </div>
            <input 
              type="range" 
              min="0.8" 
              max="1.6" 
              step="0.05" 
              value={pricing} 
              onChange={(e) => setPricing(parseFloat(e.target.value))} 
              className="slider-input" 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Düşük fiyat hacmi artırır ancak marjı düşürür. Yüksek fiyat marjı artırır ancak talebi azaltır.</span>
          </div>

          {/* Order Quantity Slider */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Haftalık Sipariş Seviyesi (Stok)</span>
              <span className="slider-value">{orderLevel} Adet</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="1000" 
              step="25" 
              value={orderLevel} 
              onChange={(e) => setOrderLevel(parseInt(e.target.value))} 
              className="slider-input" 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Az stok yok satmaya (stoksuzluk) neden olur. Çok stok depolama maliyetini ve atık oranını artırır.</span>
          </div>

          {/* Staffing Slider */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Çalışan Personel Sayısı</span>
              <span className="slider-value">{staffing} Kişi</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="15" 
              step="1" 
              value={staffing} 
              onChange={(e) => setStaffing(parseInt(e.target.value))} 
              className="slider-input" 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Yetersiz personel uzun kuyruklara ve düşük müşteri memnuniyetine yol açar. Fazla personel iş gücü maliyetini şişirir.</span>
          </div>

          {/* Marketing Budget Slider */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Haftalık Pazarlama Bütçesi</span>
              <span className="slider-value">${marketing.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="250" 
              value={marketing} 
              onChange={(e) => setMarketing(parseInt(e.target.value))} 
              className="slider-input" 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reklam harcamaları mağaza trafiğini artırır, ancak belirli bir eşikten sonra verim azalır (azalan verimler kanunu).</span>
          </div>
        </div>

        {/* Right Column: Dynamic KPIs Display */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Key Financial Indicator */}
          <div className="glass-card" style={{ 
            padding: '1.5rem', 
            background: metrics.netProfit >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: metrics.netProfit >= 0 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600' }}>Haftalık Net Kar</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: metrics.netProfit >= 0 ? '#10b981' : '#ef4444', marginTop: '0.25rem' }}>
                {metrics.netProfit < 0 ? '-' : ''}${Math.abs(metrics.netProfit).toLocaleString()}
              </h2>
            </div>
            <div style={{ 
              background: metrics.netProfit >= 0 ? 'var(--color-success)' : 'var(--color-error)',
              color: '#fff',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={24} />
            </div>
          </div>

          {/* Primary KPIs Grid */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Ciro</div>
              <div className="metric-value" style={{ color: '#fff' }}>${metrics.revenue.toLocaleString()}</div>
              <div className="metric-trend" style={{ color: 'var(--text-secondary)' }}>Satış: {metrics.sales} ad.</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Stok Getirisi (GMROI)</div>
              <div className="metric-value" style={{ color: metrics.gmroi > 150 ? 'var(--color-success)' : 'var(--text-primary)' }}>{metrics.gmroi}%</div>
              <div className="metric-trend" style={{ color: metrics.gmroi > 150 ? 'var(--color-success)' : 'var(--text-muted)' }}>
                {metrics.gmroi > 150 ? 'Mükemmel Yatırım' : 'Orta Verimlilik'}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Müşteri CSAT</div>
              <div className="metric-value" style={{ color: metrics.csat > 75 ? 'var(--color-success)' : metrics.csat > 50 ? 'var(--color-warning)' : 'var(--color-error)' }}>
                {metrics.csat}%
              </div>
              <div className="metric-trend" style={{ color: 'var(--text-secondary)' }}>Trafik: {metrics.traffic} kişi</div>
            </div>
          </div>

          {/* Secondary Operational KPIs Grid */}
          <div className="metrics-grid">
            <div className="metric-card" style={{ borderColor: parseFloat(metrics.stockoutRate) > 10 ? 'rgba(245, 158, 11, 0.3)' : 'var(--color-card-border)' }}>
              <div className="metric-label">Stoksuzluk Oranı</div>
              <div className="metric-value" style={{ color: parseFloat(metrics.stockoutRate) > 10 ? 'var(--color-warning)' : 'var(--text-primary)' }}>
                {metrics.stockoutRate}%
              </div>
              <div className="metric-trend" style={{ color: 'var(--text-secondary)' }}>Talep: {metrics.demand} ad.</div>
            </div>

            <div className="metric-card" style={{ borderColor: parseFloat(metrics.wasteRate) > 25 ? 'rgba(239, 68, 68, 0.3)' : 'var(--color-card-border)' }}>
              <div className="metric-label">Atık / Elde Kalan</div>
              <div className="metric-value" style={{ color: parseFloat(metrics.wasteRate) > 25 ? 'var(--color-error)' : 'var(--text-primary)' }}>
                {metrics.wasteRate}%
              </div>
              <div className="metric-trend" style={{ color: 'var(--text-secondary)' }}>Elde Kalan: {Math.max(0, orderLevel - metrics.sales)} ad.</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Çalışan Yükü</div>
              <div className="metric-value" style={{ color: metrics.trafficPerStaff > 350 ? 'var(--color-error)' : 'var(--text-primary)' }}>
                {metrics.trafficPerStaff}
              </div>
              <div className="metric-trend" style={{ color: 'var(--text-secondary)' }}>Kişi Başı Müşteri</div>
            </div>
          </div>

          {/* Alert Alerts for Operational Issues */}
          {parseFloat(metrics.stockoutRate) > 15 && (
            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertTriangle style={{ color: 'var(--color-warning)' }} />
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: 'var(--color-warning)' }}>Yüksek Stoksuzluk Riski:</strong> Talep, stok seviyenizin çok üzerinde! Sipariş miktarını artırarak kaçan satış cirosunu yakalayabilirsiniz.
              </div>
            </div>
          )}

          {parseFloat(metrics.wasteRate) > 35 && (
            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldAlert style={{ color: 'var(--color-error)' }} />
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: 'var(--color-error)' }}>Yüksek Depolama & Atık Maliyeti:</strong> Sipariş ettiğiniz envanter satılamadan stokta bekliyor. Siparişi düşürün ya da fiyat kırıp pazarlamayı artırın.
              </div>
            </div>
          )}

          {metrics.trafficPerStaff > 400 && (
            <div className="glass-card" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Users style={{ color: 'var(--color-error)' }} />
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: 'var(--color-error)' }}>Personel Yetersizliği:</strong> Çalışan başına düşen trafik kritik seviyede. Kuyruklar uzuyor, dönüşüm oranınız ve müşteri memnuniyetiniz baltalanıyor.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Financial Structure SVG Bar Chart */}
      <div className="glass-card" style={{ marginTop: '2.5rem', background: 'var(--bg-secondary)', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={18} style={{ color: 'var(--color-success)' }} /> Haftalık Mali Yapı Analizi (Gider & Gelir Dağılımı)
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          {/* SVG Canvas */}
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <svg width="100%" height="240" viewBox="0 0 450 240" style={{ maxWidth: '450px' }}>
              {/* Grid Lines */}
              <line x1="50" y1="30" x2="420" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="50" y1="80" x2="420" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="50" y1="130" x2="420" y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="50" y1="180" x2="420" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              
              {/* Dynamic Bars for Expenditures & Profit */}
              {/* Maximum possible value scale around $25000 */}
              {(() => {
                const maxVal = Math.max(15000, metrics.revenue, metrics.totalExpenses + (metrics.revenue - metrics.totalExpenses > 0 ? metrics.revenue - metrics.totalExpenses : 0));
                const getH = (val) => Math.max(5, Math.min(150, (val / maxVal) * 150));
                
                const cogsH = getH(metrics.sales * 10);
                const holdingH = getH(metrics.holdingCost);
                const laborH = getH(metrics.laborCost);
                const marketingH = getH(marketing);
                const profitH = getH(Math.max(0, metrics.netProfit));
                const lossH = getH(metrics.netProfit < 0 ? Math.abs(metrics.netProfit) : 0);

                return (
                  <>
                    {/* Bar 1: Revenue (Sales + Net Profit Stack) */}
                    <text x="110" y="210" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">Ciro ve Net Kar</text>
                    {/* Revenue Bar */}
                    <rect x="85" y={180 - getH(metrics.revenue)} width="50" height={getH(metrics.revenue)} fill="url(#blue-grad)" rx="4" />
                    {metrics.netProfit > 0 && (
                      <rect x="85" y={180 - getH(metrics.revenue)} width="50" height={profitH} fill="url(#green-grad)" rx="4" />
                    )}

                    {/* Bar 2: Costs Split Stack */}
                    <text x="310" y="210" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">Maliyet Kırılımı</text>
                    {/* Stacked cost bars */}
                    {/* Segment 1: COGS */}
                    <rect x="285" y={180 - cogsH} width="50" height={cogsH} fill="#3b82f6" rx="2" />
                    {/* Segment 2: Labor */}
                    <rect x="285" y={180 - cogsH - laborH} width="50" height={laborH} fill="#8b5cf6" rx="2" />
                    {/* Segment 3: Holding */}
                    <rect x="285" y={180 - cogsH - laborH - holdingH} width="50" height={holdingH} fill="#f59e0b" rx="2" />
                    {/* Segment 4: Marketing */}
                    <rect x="285" y={180 - cogsH - laborH - holdingH - marketingH} width="50" height={marketingH} fill="#ec4899" rx="2" />

                    {/* Deficit / Loss Highlight */}
                    {metrics.netProfit < 0 && (
                      <rect x="85" y="180" width="50" height={lossH} fill="url(#red-grad)" rx="4" />
                    )}
                  </>
                );
              })()}

              {/* Y Axis line */}
              <line x1="50" y1="20" x2="50" y2="185" stroke="var(--color-card-border)" />
              {/* X Axis line */}
              <line x1="45" y1="185" x2="420" y2="185" stroke="var(--color-card-border)" />

              {/* Legends & Gradients */}
              <defs>
                <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="red-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Chart Explanations */}
          <div style={{ flex: '1 1 300px' }}>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.75rem' }}>Bütçe Dağılım Kalemleri</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '3px' }} />
                <span>Ürün Maliyeti (COGS): ${(metrics.sales * 10).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '3px' }} />
                <span>Personel Gideri: ${metrics.laborCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '3px' }} />
                <span>Stok Depolama: ${metrics.holdingCost.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#ec4899', borderRadius: '3px' }} />
                <span>Reklam Harcaması: ${marketing.toLocaleString()}</span>
              </div>
              {metrics.netProfit > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: 'span 2' }}>
                  <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px' }} />
                  <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>Net Kar Payı: ${metrics.netProfit.toLocaleString()}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: 'span 2' }}>
                  <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '3px' }} />
                  <span style={{ color: 'var(--color-error)', fontWeight: '600' }}>Zarar/Açık: ${Math.abs(metrics.netProfit).toLocaleString()}</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--color-card-border)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <HelpCircle size={14} style={{ flexShrink: 0 }} />
                <span><strong>Mühendislik İpucu:</strong> GMROI değeri %150 üzerindeyse stok yatırımını verimli kullanıyorsunuz demektir. Kar marjınızı ve stok devrini dengede tutun!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
