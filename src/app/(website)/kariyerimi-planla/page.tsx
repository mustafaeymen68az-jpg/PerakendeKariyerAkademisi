import React from 'react';
import CareerPlannerWizard from '@/components/CareerPlannerWizard';
import CareerMapInteractive from '@/components/CareerMapInteractive';

export const metadata = {
  title: 'Kariyerimi Planlıyorum | Perakende Kariyer Akademisi',
  description: 'Mevcut pozisyonunuzu ve hedef kariyerinizi seçin. Yol haritanızı, tahmini eğitim sürenizi ve almanız gereken eğitim modüllerini anında listeleyin.'
};

export default function PlanCareerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] py-8 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CareerPlannerWizard />
      <CareerMapInteractive />
    </div>
  );
}
