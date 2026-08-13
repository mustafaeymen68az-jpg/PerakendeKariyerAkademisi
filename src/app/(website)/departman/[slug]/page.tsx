import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Clock, BookOpen, ArrowLeft, ChevronRight, BarChart3, Award } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DepartmentDetailPage({ params }: Props) {
  const { slug } = await params;

  let department: any = null;
  let trainings: any[] = [];
  let levelCounts: Record<string, number> = { GOREV: 0, YONETICI: 0, ILERI_YONETIM: 0 };
  let totalHours = 0;

  try {
    department = await prisma.department.findUnique({
      where: { slug },
      include: {
        trainings: {
          where: { published: true },
          include: { category: true }
        }
      }
    });

    if (department) {
      trainings = department.trainings;
      
      // Calculate levels and total hours
      trainings.forEach((t) => {
        totalHours += t.duration;
        if (levelCounts[t.level] !== undefined) {
          levelCounts[t.level]++;
        } else {
          levelCounts[t.level] = 1;
        }
      });
    }
  } catch (error) {
    console.error('Error fetching department details:', error);
  }

  if (!department) {
    notFound();
  }

  return (
    <div className="bg-light-bg py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/departmanlar"
            className="inline-flex items-center text-sm font-semibold text-corporate-blue hover:text-primary-navy transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span>Tüm Departmanlara Dön</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-8 mb-8">
          <span className="text-[10px] text-turquoise-accent uppercase tracking-widest font-bold block mb-1">
            Departman Uzmanlık Alanı
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary-navy leading-tight">
            {department.name}
          </h1>
          <p className="text-secondary-text text-sm sm:text-base mt-2 max-w-4xl font-light leading-relaxed">
            {department.description || 'Bu departman kapsamında operasyonel standartları yükseltmeye, hataları minimize etmeye ve yetkinliği geliştirmeye yönelik eğitim modülleri sunulmaktadır.'}
          </p>

          {/* Department Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-center sm:text-left">
            <div className="p-3 bg-light-bg rounded-xl">
              <span className="text-xs text-gray-500 block">Toplam Modül</span>
              <span className="text-xl font-extrabold text-corporate-blue font-mono mt-0.5 block">{trainings.length} Adet</span>
            </div>
            <div className="p-3 bg-light-bg rounded-xl">
              <span className="text-xs text-gray-500 block">Toplam Eğitim Süresi</span>
              <span className="text-xl font-extrabold text-corporate-blue font-mono mt-0.5 block">{totalHours} Saat</span>
            </div>
            <div className="p-3 bg-light-bg rounded-xl">
              <span className="text-xs text-gray-500 block">Görev Yetkinliği</span>
              <span className="text-xl font-extrabold text-corporate-blue font-mono mt-0.5 block">{levelCounts.GOREV} Modül</span>
            </div>
            <div className="p-3 bg-light-bg rounded-xl">
              <span className="text-xs text-gray-500 block">Yönetici Modülleri</span>
              <span className="text-xl font-extrabold text-corporate-blue font-mono mt-0.5 block">{levelCounts.YONETICI + levelCounts.ILERI_YONETIM} Modül</span>
            </div>
          </div>
        </div>

        {/* Trainings List Header */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-lg text-primary-navy">
            Bu Departmana Ait Eğitimler ({trainings.length})
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Departman çalışanlarının alması planlanan veya serbest seçmeli eğitim listesi.
          </p>
        </div>

        {/* Trainings Grid */}
        {trainings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trainings.slice(0, 100).map((course) => ( // Cap at 100 on subpage for performance
              <div
                key={course.id}
                className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mb-2">
                    <span className="bg-light-blue text-corporate-blue px-2 py-0.5 rounded uppercase">
                      {course.category?.name || 'Genel'}
                    </span>
                    <span className="flex items-center text-gray-400">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {course.duration} Saat
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-primary-navy hover:text-corporate-blue transition-colors line-clamp-2 min-h-[44px]">
                    <Link href={`/egitim/${course.slug}`}>
                      {course.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-secondary-text mt-2 line-clamp-3 font-light leading-relaxed">
                    {course.description || course.objectives}
                  </p>
                </div>
                <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-secondary-text">
                    Seviye: <span className="font-bold text-primary-navy">{course.level === 'YONETICI' ? 'Yönetici' : course.level === 'GOREV' ? 'Görev' : 'İleri'}</span>
                  </span>
                  <Link
                    href={`/egitim/${course.slug}`}
                    className="text-xs font-bold text-corporate-blue hover:text-primary-navy transition-colors flex items-center"
                  >
                    <span>Detayları Gör</span>
                    <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-primary-navy">
              Bu Departmanda Eğitim Bulunmamaktadır
            </h3>
            <p className="text-secondary-text text-sm mt-1">
              Bu departman için eğitimler henüz planlanma aşamasındadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
