'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Building2, 
  BookOpen, 
  Award, 
  Clock, 
  Sparkles,
  ListOrdered
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface ExamQuestion {
  text: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
}

interface ExamItem {
  id: string;
  title: string;
  deptName: string;
  passingScore: number;
  questionCount: number;
  createdAt: string;
  questions: ExamQuestion[];
}

export default function SinavHazirlamaPage() {
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS_DATA[0].id);
  const [examTitle, setExamTitle] = useState('');
  const [passingScore, setPassingScore] = useState(80);
  
  // Question Builder State
  const [questions, setQuestions] = useState<ExamQuestion[]>([
    {
      text: 'Mağaza P&L tablosunda brüt marj hesaplanırken hangi formül kullanılır?',
      options: [
        { key: 'A', text: '(Net Satış - Satılan Malın Maliyeti) / Net Satış' },
        { key: 'B', text: 'Net Satış / Toplam Mağaza Gideri' },
        { key: 'C', text: 'Fire Tutarı * 100' },
        { key: 'D', text: 'Kasa Cirosu - Personel Maaşları' }
      ],
      correctAnswer: 'A'
    }
  ]);

  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctKey, setCorrectKey] = useState('A');

  // Existing Exams
  const [exams, setExams] = useState<ExamItem[]>([
    {
      id: 'exam_1',
      title: 'Mağaza Müdürleri Kar-Zarar P&L Bitirme Sınavı',
      deptName: 'Mağaza Müdürleri',
      passingScore: 80,
      questionCount: 10,
      createdAt: '2026-08-14',
      questions: []
    },
    {
      id: 'exam_2',
      title: 'Kasiyer POS ve Güler Yüzlü İletişim Değerlendirmesi',
      deptName: 'Kasiyer',
      passingScore: 80,
      questionCount: 8,
      createdAt: '2026-08-12',
      questions: []
    }
  ]);

  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const handleAddQuestion = () => {
    if (!newQuestionText || !optA || !optB) return;
    const q: ExamQuestion = {
      text: newQuestionText,
      options: [
        { key: 'A', text: optA },
        { key: 'B', text: optB },
        { key: 'C', text: optC || 'Diğer' },
        { key: 'D', text: optD || 'Hepsi' }
      ],
      correctAnswer: correctKey
    };
    setQuestions([...questions, q]);
    setNewQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle || questions.length === 0) return;

    const newExam: ExamItem = {
      id: `exam_${Date.now()}`,
      title: examTitle,
      deptName: activeDept.name,
      passingScore,
      questionCount: questions.length,
      createdAt: new Date().toISOString().split('T')[0],
      questions
    };

    setExams([newExam, ...exams]);
    setExamTitle('');
    setQuestions([]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Sınav Hazırlama & Soru Bankası Motoru</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Sınav Oluşturma Paneli
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Dersler için çoktan seçmeli sorular ekleyin, baraj puanı belirleyin ve sınav yayınlayın.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Exam & Question Builder */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-[#087F96] text-white rounded-xl">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Yeni Sınav Oluştur</h3>
              <p className="text-[11px] text-gray-500 font-light">Soru ekleyerek sınavı kaydedin.</p>
            </div>
          </div>

          <form onSubmit={handleSaveExam} className="space-y-6 text-xs font-medium">
            {/* Department Select */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Sınav Yapılacak Kadro / Departman:</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              >
                {DEPARTMENTS_DATA.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.year1Courses.length + dept.year2Courses.length} Eğitim)
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Title & Passing Score */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[#0B2A4A] font-bold mb-1">Sınav Adı / Başlığı:</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Mağaza P&L ve KPI Bitirme Değerlendirmesi"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Geçme Barajı (%):</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>
            </div>

            {/* Add Question Box */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-3">
              <h4 className="font-display font-bold text-xs text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
                <ListOrdered className="h-4 w-4 text-[#087F96]" />
                <span>Sınava Yeni Soru Ekle</span>
              </h4>

              <div>
                <input
                  type="text"
                  placeholder="Soru metnini buraya yazın..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#087F96]"
                />
              </div>

              {/* Options A, B, C, D */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-bold text-gray-600 block mb-0.5">A Şıkkı:</span>
                  <input
                    type="text"
                    placeholder="Şık A metni"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <span className="font-bold text-gray-600 block mb-0.5">B Şıkkı:</span>
                  <input
                    type="text"
                    placeholder="Şık B metni"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <span className="font-bold text-gray-600 block mb-0.5">C Şıkkı:</span>
                  <input
                    type="text"
                    placeholder="Şık C metni"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <span className="font-bold text-gray-600 block mb-0.5">D Şıkkı:</span>
                  <input
                    type="text"
                    placeholder="Şık D metni"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* Correct Option Select */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#0B2A4A]">Doğru Cevap Şıkkı:</span>
                  <select
                    value={correctKey}
                    onChange={(e) => setCorrectKey(e.target.value)}
                    className="p-1.5 bg-white border border-gray-300 rounded-md font-bold text-[#087F96]"
                  >
                    <option value="A">A Şıkkı</option>
                    <option value="B">B Şıkkı</option>
                    <option value="C">C Şıkkı</option>
                    <option value="D">D Şıkkı</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-[#0B2A4A] hover:bg-[#061B33] text-white rounded-lg font-bold text-xs transition-colors flex items-center space-x-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Soruyu Listeye Ekle</span>
                </button>
              </div>
            </div>

            {/* Questions List preview */}
            {questions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-[#0B2A4A]">Sınava Eklenen Sorular ({questions.length} Soru):</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {questions.map((q, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#0B2A4A]">Soru {idx + 1}: {q.text}</strong>
                        <span className="bg-[#DDF4F7] text-[#087F96] font-bold px-2 py-0.5 rounded text-[10px]">
                          Doğru: {q.correctAnswer}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={questions.length === 0}
              className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Sınavı Kaydet ve Öğrencilere Aç ({questions.length} Soru)</span>
            </button>
          </form>
        </div>

        {/* Right Column: Active Exams List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B2A4A] border-b border-gray-100 pb-3">
              Yayınlanan Sınavlar Listesi ({exams.length})
            </h3>

            <div className="space-y-3">
              {exams.map((ex) => (
                <div key={ex.id} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
                  <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full inline-block">
                    {ex.deptName}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#0B2A4A]">
                    {ex.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200/60 font-mono">
                    <span>{ex.questionCount} Soru • Baraj: %{ex.passingScore}</span>
                    <span className="text-emerald-600 font-bold">● Aktif</span>
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
