import React from 'react';
import CareerPlannerWizard from '@/components/CareerPlannerWizard';

export const metadata = {
  title: 'Kariyerimi Planla | Perakende Kariyer Akademisi',
  description: 'Mevcut pozisyonunuzu ve hedef kariyerinizi seçin. Yol haritanızı, tahmini eğitim sürenizi ve almanız gereken eğitim modüllerini anında listeleyin.'
};

export default function PlanCareerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] py-8">
      <CareerPlannerWizard />
    </div>
  );
}
