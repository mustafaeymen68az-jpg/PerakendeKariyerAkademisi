import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Award, ShieldCheck, Calendar, FileText, Play } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ParticipantCertificatesPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie) {
    redirect('/giris');
  }

  let user: any = null;
  try {
    user = JSON.parse(sessionCookie.value);
  } catch (e) {
    redirect('/giris');
  }

  let certificates: any[] = [];
  try {
    certificates = await prisma.certificate.findMany({
      where: { userId: user.id },
      include: {
        training: {
          select: { title: true, duration: true }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching participant certificates:', error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-primary-navy">
          Sertifikalarım
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Başarıyla tamamladığınız eğitim modülleri sonrasında hak kazandığınız doğrulama kodlu başarı sertifikaları.
        </p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border-2 border-double border-amber-850 p-6 rounded-xl shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Award className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Doğrulanmış Başarı Belgesi</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {cert.code}
                  </span>
                </div>
                
                <h4 className="font-display font-bold text-base text-primary-navy">
                  {cert.training.title}
                </h4>
                <p className="text-xs text-secondary-text mt-1">
                  Eğitim Süresi: {cert.training.duration} Saat
                </p>

                <div className="flex items-center space-x-2 text-[10px] text-gray-400 mt-4">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Veriliş Tarihi: {new Date(cert.issueDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] text-green-600 font-bold flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-0.5" />
                  Sistemde Aktif
                </span>
                
                <Link
                  href={`/sertifikasyon?code=${cert.code}`}
                  className="px-3.5 py-1.5 bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded text-[11px] font-semibold transition-colors"
                >
                  Doğrulama Sayfası
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-150 rounded-xl p-8 max-w-xl mx-auto text-center space-y-4 shadow-sm">
          <Award className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="font-display font-bold text-lg text-primary-navy">
            Henüz Kazanılmış Sertifikanız Bulunmuyor
          </h3>
          <p className="text-xs text-secondary-text font-light leading-relaxed max-w-sm mx-auto">
            Atanan eğitimlerinizi tamamlayıp sınavdan 70 puan ve üzeri aldığınızda başarı sertifikanız otomatik olarak oluşturulacaktır.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/panel"
              className="px-4 py-2 bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-lg text-xs font-semibold shadow-md transition-colors flex items-center space-x-1"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Eğitimlerime Git</span>
            </Link>
            
            {/* Create Demo Cert Form / Button linking to api */}
            <form method="POST" action="/api/admin/create-demo-cert">
              <input type="hidden" name="userId" value={user.id} />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-50 hover:bg-light-blue/20 border border-gray-250 rounded-lg text-xs font-semibold text-primary-navy transition-colors cursor-pointer"
              >
                Demo Sertifikası Ekle
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
