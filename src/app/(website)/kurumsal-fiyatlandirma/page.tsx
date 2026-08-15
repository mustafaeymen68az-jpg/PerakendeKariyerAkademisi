import React from 'react';
import { Metadata } from 'next';
import KurumsalFiyatlandirmaClient from './KurumsalFiyatlandirmaClient';

export const metadata: Metadata = {
  title: 'Kurumsal Ücretlendirme & Paketler | Perakende Kariyer Akademisi',
  description: 'Çalışan sayınıza ve ihtiyaç duyduğunuz modüllere göre ölçeklenen kurumsal akademi, kariyer ve yetenek yönetimi paketleri ve fiyatlandırma modeli.',
};

export default function KurumsalFiyatlandirmaPage() {
  return <KurumsalFiyatlandirmaClient />;
}
