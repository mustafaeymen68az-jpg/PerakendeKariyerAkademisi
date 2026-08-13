import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { BookOpen, ArrowRight, Layers, Layout, Users, FileText, ShoppingCart, Key, Truck, ShieldAlert } from 'lucide-react';

export const revalidate = 3600; // Cache for 1 hour

// Helper to return consistent Lucide icons for department categories
const getDeptIcon = (name: string) => {
  const nm = name.toLowerCase();
  if (nm.includes('kasiyer') || nm.includes('kasa')) return <ShoppingCart className="h-6 w-6" />;
  if (nm.includes('stok') || nm.includes('envanter')) return <Layers className="h-6 w-6" />;
  if (nm.includes('lojistik') || nm.includes('depo')) return <Truck className="h-6 w-6" />;
  if (nm.includes('insan kaynaklari') || nm.includes('ik')) return <Users className="h-6 w-6" />;
  if (nm.includes('müdür') || nm.includes('yonetim')) return <Layout className="h-6 w-6" />;
  if (nm.includes('gıda') || nm.includes('isg') || nm.includes('denetim')) return <ShieldAlert className="h-6 w-6" />;
  return <BookOpen className="h-6 w-6" />;
};

export default async function DepartmentsPage() {
  let departments: any[] = [];
  try {
    departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { trainings: true }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
  }

  // Fallback data
  if (departments.length === 0) {
    departments = [
      { name: "Mağaza Müdürleri", slug: "magaza-mudurleri", description: "Mağaza karlılığı, ekip liderliği, stok ve KPI yönetimi." },
      { name: "Kasiyer", slug: "kasiyer", description: "Kasa hattı operasyonları, ödeme sistemleri ve müşteri ilişkileri." },
      { name: "Stok Yönetimi", slug: "stok-yonetimi", description: "Sipariş planlama, emniyet stoku ve envanter optimizasyonu." },
      { name: "Taze Gıda ve Hizmet Reyonları", slug: "taze-gida", description: "Manav, kasap, şarküteri ve unlu mamuller operasyonları." }
    ];
  }

  return (
    <div className="bg-light-bg py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-navy">
            Eğitim Departmanları
          </h1>
          <div className="h-1 w-20 bg-turquoise-accent mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-secondary-text text-sm sm:text-base font-light">
            Market operasyonlarınızdaki her bir iş birimi ve unvan seviyesi için özel olarak gruplandırılmış uzmanlık modülleri.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id || dept.slug}
              className="bg-white border border-gray-150 hover:border-corporate-blue/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="bg-light-blue p-3.5 rounded-lg text-corporate-blue w-fit group-hover:bg-corporate-blue group-hover:text-white transition-all duration-300">
                  {getDeptIcon(dept.name)}
                </div>
                <h3 className="font-display font-bold text-lg text-primary-navy mt-4 group-hover:text-corporate-blue transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-secondary-text mt-2 font-light leading-relaxed min-h-[36px]">
                  {dept.description || 'Bu departmana özel uzmanlık eğitimleri ve KPI geliştirme modüllerini içermektedir.'}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-corporate-blue bg-light-blue/50 px-2.5 py-1 rounded-full">
                  {dept._count?.trainings || 0} Eğitim Modülü
                </span>
                <Link
                  href={`/egitimler?dept=${dept.slug}`}
                  className="text-xs font-semibold text-gray-400 group-hover:text-corporate-blue transition-colors flex items-center"
                >
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
