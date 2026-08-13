import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Calendar, Clock, MapPin, Users, ArrowRight, BookOpen } from 'lucide-react';

export const revalidate = 3600; // Cache for 1 hour

export default async function CalendarPage() {
  let sessions: any[] = [];
  try {
    sessions = await prisma.trainingSession.findMany({
      where: {
        date: {
          gte: new Date() // Future sessions
        }
      },
      orderBy: { date: 'asc' },
      include: {
        training: {
          select: { title: true, slug: true, duration: true, level: true }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching calendar sessions:', error);
  }

  // Fallback data if no sessions in database
  if (sessions.length === 0) {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const inTwoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const inThreeWeeks = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);

    sessions = [
      {
        id: '1',
        date: nextWeek,
        time: '14:00 - 17:00',
        format: 'ONLINE',
        location: 'Zoom / Uzaktan Canlı Sınıf',
        capacity: 50,
        remainingCapacity: 12,
        status: 'ACIK',
        training: {
          title: 'Perakende Analitiği ve Metrik Hesaplama - Seviye 3',
          slug: 'sefe-genel- Tesco Kipa İletişim Araçları - G-01', // Example slug from seeded database
          duration: 16,
          level: 'YONETICI'
        }
      },
      {
        id: '2',
        date: inTwoWeeks,
        time: '10:00 - 16:00',
        format: 'YUZ_YUZE',
        location: 'Perakende Mühendisi Eğitim Salonu, Şişli',
        capacity: 25,
        remainingCapacity: 5,
        status: 'ACIK',
        training: {
          title: 'Mağaza Müdürü Liderliği ve Ekip Yönetimi',
          slug: 'magaza-muduru-liderligi-ve-ekip-yonetimi',
          duration: 24,
          level: 'YONETICI'
        }
      },
      {
        id: '3',
        date: inThreeWeeks,
        time: '19:00 - 21:30',
        format: 'ONLINE',
        location: 'Microsoft Teams / Canlı Webinar',
        capacity: 100,
        remainingCapacity: 64,
        status: 'ACIK',
        training: {
          title: 'Kasiyer Müşteri İlişkileri ve Ödeme Süreçleri',
          slug: 'kasa-hatti-kasiyer-musteri-iliskileri',
          duration: 8,
          level: 'GOREV'
        }
      }
    ];
  }

  return (
    <div className="bg-light-bg py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-navy">
            Eğitim Takvimi
          </h1>
          <div className="h-1 w-20 bg-turquoise-accent mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-secondary-text text-sm sm:text-base font-light">
            Planlanmış canlı eğitimleri, online webinarları ve sınıf içi uygulamalı perakende atölyelerini takip edin, kontenjan dolmadan kaydolun.
          </p>
        </div>

        {/* Sessions list */}
        <div className="max-w-4xl mx-auto space-y-6">
          {sessions.map((session) => {
            const isOnline = session.format === 'ONLINE';
            const isFull = session.remainingCapacity === 0;
            const sessionDate = new Date(session.date);

            return (
              <div
                key={session.id}
                className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Date Badge (Left) */}
                <div className="flex md:flex-col items-center justify-center bg-light-blue text-corporate-blue p-4 rounded-xl text-center shrink-0 w-full md:w-24 gap-2 md:gap-0">
                  <span className="text-2xl font-bold font-mono">
                    {sessionDate.getDate()}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider block mt-0.5">
                    {sessionDate.toLocaleDateString('tr-TR', { month: 'short' })}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono block">
                    {sessionDate.toLocaleDateString('tr-TR', { weekday: 'short' })}
                  </span>
                </div>

                {/* Session Details (Middle) */}
                <div className="space-y-2 grow">
                  <span className={`inline-flex px-2 py-0.5 text-[9px] font-bold rounded-full uppercase ${
                    isOnline ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {isOnline ? 'Online / Canlı Sınıf' : 'Sınıf İçi / Yüz Yüze'}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-primary-navy">
                    {session.training?.title || 'Genel Perakende Eğitimi'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                      <span>{session.time || '10:00 - 13:00'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                      <span className="truncate">{session.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Users className="h-4 w-4 text-gray-400 shrink-0" />
                      <span>Kontenjan: <strong className="text-gray-700">{session.remainingCapacity} / {session.capacity}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Action (Right) */}
                <div className="w-full md:w-fit pt-4 md:pt-0 border-t md:border-t-0 border-gray-50 shrink-0">
                  {isFull ? (
                    <span className="w-full md:w-auto px-5 py-2.5 bg-gray-100 text-gray-400 rounded-lg text-xs font-semibold flex items-center justify-center cursor-not-allowed">
                      Kontenjan Dolu
                    </span>
                  ) : (
                    <Link
                      href={`/talep-olustur?training=${encodeURIComponent(session.training?.title || '')}`}
                      className="w-full md:w-auto px-5 py-2.5 bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Başvur</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
