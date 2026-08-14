import React from 'react';
import CareerLevelAssessmentQuiz from '@/components/CareerLevelAssessmentQuiz';

export const metadata = {
  title: 'Kariyer Seviyeni Öğren Testi | Perakende Kariyer Akademisi',
  description: 'Departmanınıza özel 15 detaylı yetkinlik sorusunu yanıtlayın. Mevcut kariyer seviyenizi, yetkinlik puanınızı ve almanız gereken eğitim modüllerini anında öğrenin.'
};

export default function CareerLevelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] py-8">
      <CareerLevelAssessmentQuiz />
    </div>
  );
}
