'use client';

import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Plus, 
  Building2, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search,
  Filter,
  Trash2
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface AssignmentRecord {
  id: string;
  deptName: string;
  courseTitle: string;
  studentName: string;
  dueDate: string;
  status: 'ATANDI' | 'DEVAM_EDIYOR' | 'TAMAMLANDI';
  createdAt: string;
  notes: string;
}

export default function EgitimAtamaPage() {
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS_DATA[0].id);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(DEPARTMENTS_DATA[0].year1Courses[0]);
  const [studentName, setStudentName] = useState('Tüm Kadro Öğrencileri');
  const [dueDate, setDueDate] = useState('2026-09-01');
  const [notes, setNotes] = useState('');

  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const allDeptCourses = [...activeDept.year1Courses, ...activeDept.year2Courses];

  const [assignments, setAssignments] = useState<AssignmentRecord[]>([
    {
      id: 'asg_1',
      deptName: 'Mağaza Müdürleri',
      courseTitle: 'Mağaza P&L Kar-Zarar Hesaplama Kılavuzu',
      studentName: 'Mehmet Yılmaz',
      dueDate: '2026-08-30',
      status: 'DEVAM_EDIYOR',
      createdAt: '2026-08-14',
      notes: 'P&L vaka analizinin 30 Ağustos tarihine kadar tamamlanması gerekmektedir.'
    },
    {
      id: 'asg_2',
      deptName: 'Kasiyer',
      courseTitle: 'Kasa POS Cihazı Kullanım ve Hız Standartları',
      studentName: 'Ayşe Demir',
      dueDate: '2026-08-25',
      status: 'ATANDI',
      createdAt: '2026-08-13',
      notes: 'Kasa hız standartları modülünün tamamlanması.'
    },
    {
      id: 'asg_3',
      deptName: 'Kasap Reyonu Satış Elemanı',
      courseTitle: 'Kasap Reyonu Karkas Et Parçalama ve Hijyen',
      studentName: 'Zeynep Kaya',
      dueDate: '2026-08-20',
      status: 'TAMAMLANDI',
      createdAt: '2026-08-10',
      notes: 'Bıçak hijyeni ve reyon sergileme pratik çalışması.'
    }
  ]);

  const handleDeptChange = (deptId: string) => {
    setSelectedDeptId(deptId);
    const dept = DEPARTMENTS_DATA.find((d) => d.id === deptId);
    if (dept && dept.year1Courses.length > 0) {
      setSelectedCourseTitle(dept.year1Courses[0]);
    }
  };

  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseTitle) return;

    const newAssignment: AssignmentRecord = {
      id: `asg_${Date.now()}`,
      deptName: activeDept.name,
      courseTitle: selectedCourseTitle,
      studentName,
      dueDate,
      status: 'ATANDI',
      createdAt: new Date().toISOString().split('T')[0],
      notes: notes || `${activeDept.name} kadrosuna atanan eğitim modülü.`
    };

    setAssignments([newAssignment, ...assignments]);
    setNotes('');
    alert(`"${selectedCourseTitle}" eğitimi ${studentName} için başarıyla atandı!`);
  };

  const handleDelete = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <BookOpenCheck className="h-3.5 w-3.5" />
            <span>Eğitmen Eğitim Atama & Takip Motoru</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Öğrenciye Eğitim Atama Paneli
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Eğitmen olarak dilediğiniz perakende kadrosundan eğitim seçip öğrencilere veya tüm kadro gruplarına atayabilirsiniz.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Assignment Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-[#087F96] text-white rounded-xl">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Yeni Eğitim Ataması Yap</h3>
              <p className="text-[11px] text-gray-500 font-light">Kadro, ders ve alıcı öğrenciyi seçin.</p>
            </div>
          </div>

          <form onSubmit={handleAssignCourse} className="space-y-4 text-xs font-medium">
            
            {/* Department Select */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Kadro / Departman Seçimi (26 Kadro):</label>
              <select
                value={selectedDeptId}
                onChange={(e) => handleDeptChange(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              >
                {DEPARTMENTS_DATA.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.year1Courses.length + d.year2Courses.length} Eğitim)
                  </option>
                ))}
              </select>
            </div>

            {/* Course Module Select */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Atanacak Eğitim Modülü:</label>
              <select
                value={selectedCourseTitle}
                onChange={(e) => setSelectedCourseTitle(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#087F96] focus:ring-2 focus:ring-[#087F96] outline-none"
              >
                {allDeptCourses.map((cName, idx) => (
                  <option key={idx} value={cName}>
                    {idx + 1}. {cName}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Student */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Atanacak Öğrenci (veya Tüm Kadro):</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Örn: Mehmet Yılmaz veya Tüm Kadro Öğrencileri"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              />
            </div>

            {/* Target Due Date */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Hedef Bitiş Tarihi (Deadline):</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              />
            </div>

            {/* Instructor Notes */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Eğitmen Özel Talimatı / Notu:</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Öğrencinin bu eğitimi tamamlarken dikkat etmesi gereken noktalar..."
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none resize-none font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <BookOpenCheck className="h-4 w-4" />
              <span>Eğitimi Öğrenciye Ata ve Yayınla</span>
            </button>
          </form>
        </div>

        {/* Right Column: Assigned Courses List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-[#0B2A4A]">Atanan Eğitimler Listesi ({assignments.length})</h3>
                <p className="text-xs text-gray-500 font-light">Eğitmen tarafından atanan aktif ders takibi.</p>
              </div>

              <span className="text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full">
                {assignments.length} Atama Aktif
              </span>
            </div>

            <div className="space-y-3">
              {assignments.map((asg) => (
                <div key={asg.id} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full inline-block mb-1">
                        {asg.deptName}
                      </span>
                      <h4 className="font-display font-bold text-sm text-[#0B2A4A]">
                        {asg.courseTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleDelete(asg.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Atamayı İptal Et"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 font-light">
                    Alıcı Öğrenci: <strong className="text-[#0B2A4A] font-bold">{asg.studentName}</strong>
                  </p>

                  {asg.notes && (
                    <p className="text-[11px] text-gray-500 font-light bg-white p-2.5 rounded-lg border border-gray-200">
                      📝 {asg.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200/60 font-mono">
                    <span>Son Tarih: <strong className="text-red-600">{asg.dueDate}</strong></span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      asg.status === 'TAMAMLANDI' ? 'bg-emerald-100 text-emerald-800' :
                      asg.status === 'DEVAM_EDIYOR' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {asg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
