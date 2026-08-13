import React from 'react';
import KPISimulator from '@/components/KPISimulator';

export default function SimulatorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-primary-navy">
          Market KPI Simülatörü
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Haftalık mağaza siparişlerini, personel sayısını, fiyat politikasını ve pazarlama bütçesini ayarlayarak kârlılık, memnuniyet ve stok getiri sonuçlarını simüle edin.
        </p>
      </div>
      <KPISimulator />
    </div>
  );
}
