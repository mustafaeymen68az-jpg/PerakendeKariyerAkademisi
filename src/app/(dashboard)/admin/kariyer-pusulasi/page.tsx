'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Layers,
  Plus,
  Edit3,
  CheckCircle2,
  Trash2,
  TrendingUp,
  Building2,
  BookOpen,
  Award,
  Sparkles,
  Search,
  ArrowLeft
} from 'lucide-react';

export default function AdminCareerPathsPage() {
  const [loading, setLoading] = useState(true);
  const [careerPaths, setCareerPaths] = useState<any[]>([]);
  const [competencies, setCompetencies] = useState<any[]>([]);
  const [fieldTasks, setFieldTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'paths' | 'competencies' | 'tasks'>('paths');

  // New item modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPathName, setNewPathName] = useState('');
  const [newPathCategory, setNewPathCategory] = useState('STORE_OPERATIONS');
  const [newPathDesc, setNewPathDesc] = useState('');

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/career-paths').then((r) => r.json());
      if (res.success) {
        setCareerPaths(res.careerPaths || []);
        setCompetencies(res.competencies || []);
        setFieldTasks(res.fieldTasks || []);
      }
    } catch (e) {
      console.error('Error loading admin career paths:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddPath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPathName) return;
    try {
      const res = await fetch('/api/admin/career-paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: 'CAREER_PATH',
          data: {
            name: newPathName,
            category: newPathCategory,
            description: newPathDesc
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Kariyer yolu başarıyla oluşturuldu!');
        setShowAddModal(false);
        setNewPathName('');
        setNewPathDesc('');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
      alert('Kayıt sırasında hata oluştu.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061B33] text-white p-12 text-center animate-pulse">
        Kariyer Pusulam Yönetim Paneli Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans p-6 sm:p-8 space-y-6">
      {/* Top Bar Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center space-x-3">
          <Link href="/admin" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Yönetim Paneli • Kariyer Pusulam Modül Yönetimi</h1>
            <p className="text-xs text-gray-300">Kariyer yolları, pozisyonlar, yetkinlik matrisi ve saha görev şablonları.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Kariyer Yolu Ekle</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('paths')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'paths' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            🗺️ Kariyer Yolları &amp; Pozisyonlar ({careerPaths.length})
          </button>
          <button
            onClick={() => setActiveTab('competencies')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'competencies' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            🎯 Yetkinlik Kütüphanesi ({competencies.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'tasks' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            📋 Saha Görevi Şablonları ({fieldTasks.length})
          </button>
        </div>

        {/* TAB 1: CAREER PATHS & POSITIONS */}
        {activeTab === 'paths' && (
          <div className="space-y-6">
            {careerPaths.map((cp) => (
              <div key={cp.id} className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-amber-300">{cp.name}</h3>
                    <p className="text-xs text-gray-300">{cp.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-mono text-[10px] font-bold border border-amber-500/40 uppercase">
                    {cp.category}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Pozisyon Sıralaması &amp; Geçiş Kuralları:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {(cp.positions || []).map((pos: any) => (
                      <div key={pos.id} className="p-3.5 bg-[#061B33] rounded-2xl border border-white/10 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-white">{pos.name}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-bold">
                            Level {pos.careerLevel}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-300">{pos.description}</p>
                        <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                          Yetkinlik Sayısı: {pos.requirements?.length || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: COMPETENCY LIBRARY */}
        {activeTab === 'competencies' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {competencies.map((c) => (
              <div key={c.id} className="p-4 bg-[#0B2A4A] rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm">{c.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                    {c.category}
                  </span>
                </div>
                <p className="text-gray-300 text-xs">{c.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: FIELD TASK TEMPLATES */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {fieldTasks.map((ft) => (
              <div key={ft.id} className="p-5 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-extrabold text-amber-300 text-sm">{ft.title}</h3>
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[9px] font-bold">
                    {ft.evaluatorRole}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{ft.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Path Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-white shadow-2xl animate-in fade-in">
            <h3 className="text-base font-extrabold text-amber-300">Yeni Kariyer Yolu Oluştur</h3>

            <form onSubmit={handleAddPath} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-bold">Kariyer Yolu Adı</label>
                <input
                  type="text"
                  value={newPathName}
                  onChange={(e) => setNewPathName(e.target.value)}
                  placeholder="Örn: E-Ticaret & Dijital Operasyonlar Kariyer Yolu"
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Kategori</label>
                <select
                  value={newPathCategory}
                  onChange={(e) => setNewPathCategory(e.target.value)}
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
                >
                  <option value="STORE_OPERATIONS">Mağaza Operasyonları</option>
                  <option value="FRESH_FOOD">Taze Gıda Yönetimi</option>
                  <option value="HEADQUARTERS">Genel Merkez & Satın Alma</option>
                  <option value="SPECIALIST">İK, Eğitim &amp; Uzmanlık</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Açıklama</label>
                <textarea
                  rows={3}
                  value={newPathDesc}
                  onChange={(e) => setNewPathDesc(e.target.value)}
                  placeholder="Kariyer yolunun amacı ve vizyonu..."
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/10 text-gray-300 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
                >
                  Kaydet &amp; Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
