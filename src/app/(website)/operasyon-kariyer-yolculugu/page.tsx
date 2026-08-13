import React from 'react';
import { Metadata } from 'next';
import OperationCareerJourney from '@/components/CareerJourney/OperationCareerJourney';

export const metadata: Metadata = {
  title: 'Kasadan CEO Koltuğuna 15 Basamaklı Kariyer Yolculuğu | Perakende Kariyer Akademisi',
  description: 'Kasiyerlikten CEO Koltuğuna 15 basamaklı perakende operasyon kariyer haritası, sonraki seviye eğitim motoru, yetkinlik matrisi ve terfi sistemi.'
};

export default function OperasyonKariyerYolculuguPage() {
  return <OperationCareerJourney />;
}
