'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  UserCheck, 
  Target,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface StudentResult {
  id: string;
  studentName: string;
  deptName: string;
  examTitle: string;
  score: number;
  passingScore: number;
  date: string;
  passed: boolean;
  certCode: string;
}

export default function SinavSonuclariPage() {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');

  const [results] = useState<StudentResult[]>([
    {
      id: 'res_1',
      studentName: 'Mehmet Yılmaz',
      deptName: 'Mağaza Müdürleri',
      examTitle: 'Mağaza P&L ve KPI Bitirme Değerlendirmesi',
      score: 90,
      passingScore: 80,
      date: '2026-08-14 14:30',
      passed: true,
      certCode: 'CERT-2026-MM90'
    },
    {
      id: 'res_2',
      studentName: 'Ayşe Demir',
      deptName: 'Kasiyer',
      examTitle: 'Kasiyer POS ve Güler Yüzlü İletişim Değerlendirmesi',
      score: 85,
      passingScore: 80,
      date: '2026-08-14 11:15',
      passed: true,
      certCode: 'CERT-2026-KAS85'
    },
    {
      id: 'res_3',
      studentName: 'Mustafa Eymen',
      deptName: 'Mağaza Müdürleri',
      examTitle: 'Stratejik Mağaza Bütçeleme ve Fire Minimizasyonu',
      score: 65,
      passingScore: 80,
      date: '2026-08-13 16:45',
      passed: false,
      certCode: '-'
    },
    {
      id: 'res_4',
      studentName: 'Zeynep Kaya',
      deptName: 'Kasap Reyonu Satış Elemanı',
      examTitle: 'Kasap Reyonu Karkas Et & Hijyen Standartları',
      score: 95,
      passingScore: 80,
      date: '2026-08-12 09:20',
      passed: true,
      certCode: 'CERT-2026-KSP95'
    },
    {
      id: 'res_5',
      studentName: 'Ali Can',
      deptName: 'Lojistik ve Depo Elemanı',
      examTitle: 'WMS Adresli Stok ve Mal Kabul Sınavı',
      score: 75,
      passingScore: 80,
      date: '2026-08-11 15:00',
      passed: false,
      certCode: '-'
    }
  ]);

  const filtered = results.filter((r) => {
    const matchesSearch = r.studentName.toLowerCase().includes(search.toLowerCase()) ||
                          r.examTitle.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === 'ALL' || r.deptName === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <Award className="h-3.5 w-3.5" />
            <span>Öğrenci Sınav Sonuçları & Başarı Notları</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Sınav Sonuçları Tablosu
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Sınava giren öğrencilerin aldığı notları, baraj durumunu (%80) ve sertifika detaylarını inceleyin.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Öğrenci adı veya sınav ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#087F96] w-full"
            />
          </div>

          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B2A4A] outline-none"
          >
            <option value="ALL">Tüm Kadrolar</option>
            {DEPARTMENTS_DATA.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono font-bold text-gray-500 bg-[#F4F7F9] px-3.5 py-2 rounded-xl border border-gray-200">
          Toplam Kayıt: <strong className="text-[#0B2A4A]">{filtered.length} Sonuç</strong>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2A4A] text-white font-bold">
              <tr>
                <th className="p-3.5">Öğrenci Adı</th>
                <th className="p-3.5">Departman / Kadro</th>
                <th className="p-3.5">Sınav Adı</th>
                <th className="p-3.5">Sınav Notu</th>
                <th className="p-3.5">Durum</th>
                <th className="p-3.5">Tarih</th>
                <th className="p-3.5 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3.5 font-bold text-[#0B2A4A] flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#087F96] text-white font-bold flex items-center justify-center text-[10px] font-mono shrink-0">
                      {r.studentName.slice(0, 2).toUpperCase()}
                    </div>
                    <span>{r.studentName}</span>
                  </td>
                  <td className="p-3.5 text-gray-600 font-semibold">{r.deptName}</td>
                  <td className="p-3.5 text-gray-800 font-medium max-w-xs truncate">{r.examTitle}</td>
                  <td className="p-3.5 font-mono font-bold text-sm text-[#0B2A4A]">
                    %{r.score}
                  </td>
                  <td className="p-3.5">
                    {r.passed ? (
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 w-fit">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        <span>GEÇTİ (%{r.passingScore} Barajı)</span>
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 w-fit">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>TEKRAR GEREKLİ</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono text-gray-400 text-[11px]">{r.date}</td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/egitmen/swot?student=${encodeURIComponent(r.studentName)}`}
                      className="text-[#087F96] hover:underline font-bold text-xs"
                    >
                      SWOT Değerlendir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
