'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  CheckSquare,
  Users,
  Printer,
  FileText,
  Clock,
  Target,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface QuestionOption {
  id: string;
  code: string;
  text: string;
  targetPositionId?: string;
}

interface Question {
  id: string;
  number: number;
  text: string;
  weight: number;
  isTieBreaker: boolean;
  options: QuestionOption[];
}

interface TestData {
  id: string;
  title: string;
  description: string;
  notice: string;
  cooldownMonths: number;
  questions: Question[];
}

interface TestResult {
  id: string;
  attemptId: string;
  nextStepPosition: string;
  longTermPosition: string;
  alternativePosition: string;
  summary: string;
  scores: Record<string, number>;
  requiredCompetencies: string[];
  recommendedTrainings: string[];
  recommendedFieldTasks: string[];
  noticeText: string;
}

interface CareerOrientationTestModuleProps {
  userId?: string;
  userTitle?: string;
  onNavigateToPlan?: () => void;
  onNavigateToReadiness?: () => void;
}

const LADDER_STAGES = [
  { id: 'TAKIM_LIDERI', name: 'Takım Lideri / Kıdemli Satış' },
  { id: 'MUDUR_YRD', name: 'Mağaza Müdür Yardımcısı' },
  { id: 'MAGAZA_MUDURU', name: 'Mağaza Müdürü' },
  { id: 'BOLGE_MUDURU', name: 'Bölge / Saha Müdürü' },
  { id: 'OPERASYON_DIREKTORU', name: 'Perakende Operasyon Direktörü' },
  { id: 'COO', name: 'Genel Müdür Yardımcısı / COO' },
  { id: 'CEO', name: 'CEO / Genel Müdür' }
];

const FALLBACK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    text: 'Kariyerinde en çok hangi başarı seni mutlu eder?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q1_a', code: 'A', text: 'Ekip arkadaşlarımın günlük işlerini daha iyi yapmasına yardımcı olmak', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q1_b', code: 'B', text: 'Bir vardiyanın sorunsuz tamamlanmasını sağlamak', targetPositionId: 'MUDUR_YRD' },
      { id: 'q1_c', code: 'C', text: 'Bir mağazanın satış, çalışan ve müşteri hedeflerini gerçekleştirmek', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q1_d', code: 'D', text: 'Birden fazla mağazanın performansını geliştirmek', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q1_e', code: 'E', text: 'Tüm mağazalarda uygulanacak başarılı bir operasyon sistemi kurmak', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q1_f', code: 'F', text: 'Şirket departmanlarını ortak hedefler doğrultusunda yönetmek', targetPositionId: 'COO' },
      { id: 'q1_g', code: 'G', text: 'Şirketin geleceğini ve büyüme yönünü belirlemek', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q2',
    number: 2,
    text: 'En çok hangi tür sorumluluğu almak istersin?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q2_a', code: 'A', text: 'Küçük bir ekibin günlük koordinasyonu', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q2_b', code: 'B', text: 'Bir vardiyanın operasyon sorumluluğu', targetPositionId: 'MUDUR_YRD' },
      { id: 'q2_c', code: 'C', text: 'Bir mağazanın tüm sonuçları', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q2_d', code: 'D', text: 'Bir bölgedeki mağazaların sonuçları', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q2_e', code: 'E', text: 'Şirketin perakende operasyon sistemi', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q2_f', code: 'F', text: 'Şirket çapındaki kaynakların ve faaliyetlerin koordinasyonu', targetPositionId: 'COO' },
      { id: 'q2_g', code: 'G', text: 'Şirketin tamamının başarısı ve sürdürülebilirliği', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q3',
    number: 3,
    text: 'Hangi problemi çözmek sana daha ilgi çekici gelir?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q3_a', code: 'A', text: 'Ekip içindeki günlük görev ve iletişim problemi', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q3_b', code: 'B', text: 'Vardiya, kasa, stok veya müşteri yoğunluğu problemi', targetPositionId: 'MUDUR_YRD' },
      { id: 'q3_c', code: 'C', text: 'Mağazanın satış, fire veya personel verimliliği problemi', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q3_d', code: 'D', text: 'Mağazalar arasındaki performans farkı', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q3_e', code: 'E', text: 'Operasyon süreçlerindeki verimsizlik', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q3_f', code: 'F', text: 'Departmanlar arasındaki hedef ve kaynak uyuşmazlığı', targetPositionId: 'COO' },
      { id: 'q3_g', code: 'G', text: 'Şirketin büyüme ve rekabet problemi', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q4',
    number: 4,
    text: 'En çok hangi grubu geliştirmek istersin?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q4_a', code: 'A', text: 'Yeni başlayan çalışanları', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q4_b', code: 'B', text: 'Vardiya ekibini', targetPositionId: 'MUDUR_YRD' },
      { id: 'q4_c', code: 'C', text: 'Mağaza çalışanlarını ve yönetici adaylarını', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q4_d', code: 'D', text: 'Mağaza müdürlerini', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q4_e', code: 'E', text: 'Bölge ve operasyon yöneticilerini', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q4_f', code: 'F', text: 'Departman yöneticilerini', targetPositionId: 'COO' },
      { id: 'q4_g', code: 'G', text: 'Şirketin üst düzey liderlerini', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q5',
    number: 5,
    text: 'İş gününün nasıl geçmesini tercih edersin?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q5_a', code: 'A', text: 'Ekiple birlikte sahada çalışarak', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q5_b', code: 'B', text: 'Günlük operasyonu ve vardiyayı koordine ederek', targetPositionId: 'MUDUR_YRD' },
      { id: 'q5_c', code: 'C', text: 'Mağazanın çalışan, müşteri ve ticari sonuçlarını yöneterek', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q5_d', code: 'D', text: 'Farklı mağazaları ziyaret edip yöneticilere rehberlik ederek', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q5_e', code: 'E', text: 'Süreçleri analiz edip operasyon projeleri geliştirerek', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q5_f', code: 'F', text: 'Departmanlar arası karar ve uygulamaları koordine ederek', targetPositionId: 'COO' },
      { id: 'q5_g', code: 'G', text: 'Şirketin geleceğine ilişkin stratejik kararlar alarak', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q6',
    number: 6,
    text: 'Hangi sonuçtan doğrudan sorumlu olmak istersin?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q6_a', code: 'A', text: 'Ekibin günlük görev başarısı', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q6_b', code: 'B', text: 'Vardiyanın sorunsuz işlemesi', targetPositionId: 'MUDUR_YRD' },
      { id: 'q6_c', code: 'C', text: 'Mağazanın kârlılığı ve müşteri memnuniyeti', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q6_d', code: 'D', text: 'Bölgedeki mağazaların toplam performansı', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q6_e', code: 'E', text: 'Operasyonun verimliliği ve standartları', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q6_f', code: 'F', text: 'Şirketin genel faaliyet sonuçları', targetPositionId: 'COO' },
      { id: 'q6_g', code: 'G', text: 'Şirketin büyümesi, itibarı ve uzun vadeli değeri', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q7',
    number: 7,
    text: 'Kararlarının hangi ölçekte etki yaratmasını istersin?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q7_a', code: 'A', text: 'Kendi ekibimde', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q7_b', code: 'B', text: 'Çalıştığım vardiyada', targetPositionId: 'MUDUR_YRD' },
      { id: 'q7_c', code: 'C', text: 'Mağazamda', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q7_d', code: 'D', text: 'Bir bölgedeki mağazalarda', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q7_e', code: 'E', text: 'Tüm perakende operasyonunda', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q7_f', code: 'F', text: 'Şirketin bütün departmanlarında', targetPositionId: 'COO' },
      { id: 'q7_g', code: 'G', text: 'Şirketin ve sektörün geleceğinde', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q8',
    number: 8,
    text: 'Hangi konuda daha fazla eğitim almak istersin?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q8_a', code: 'A', text: 'İletişim, iş öğretme ve ekip koordinasyonu', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q8_b', code: 'B', text: 'Vardiya, stok, kasa ve günlük operasyon', targetPositionId: 'MUDUR_YRD' },
      { id: 'q8_c', code: 'C', text: 'Mağaza yönetimi, P&L, satış ve ekip liderliği', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q8_d', code: 'D', text: 'Çoklu mağaza, bölgesel bütçe ve yönetici koçluğu', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q8_e', code: 'E', text: 'Süreç geliştirme, verimlilik ve dijital dönüşüm', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q8_f', code: 'F', text: 'Finans, kaynak yönetimi ve şirket çapında icra', targetPositionId: 'COO' },
      { id: 'q8_g', code: 'G', text: 'Strateji, büyüme, yatırım ve üst düzey liderlik', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q9',
    number: 9,
    text: 'Beş yıl sonra kendini en çok nerede görmek istersin?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q9_a', code: 'A', text: 'Deneyimli bir takım lideri olarak', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q9_b', code: 'B', text: 'Mağaza yönetim ekibinde', targetPositionId: 'MUDUR_YRD' },
      { id: 'q9_c', code: 'C', text: 'Başarılı bir mağazanın yöneticisi olarak', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q9_d', code: 'D', text: 'Bir mağaza bölgesini yönetirken', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q9_e', code: 'E', text: 'Şirketin perakende operasyonlarını geliştirirken', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q9_f', code: 'F', text: 'Üst yönetimde şirket faaliyetlerini yönetirken', targetPositionId: 'COO' },
      { id: 'q9_g', code: 'G', text: 'Şirketin genel yönetiminden sorumlu olurken', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q10',
    number: 10,
    text: 'Hangi çalışma ortamı sana daha uygundur?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q10_a', code: 'A', text: 'Ekiple yakın ve sürekli iletişim', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q10_b', code: 'B', text: 'Hızlı ve yoğun vardiya ortamı', targetPositionId: 'MUDUR_YRD' },
      { id: 'q10_c', code: 'C', text: 'Tek bir işletmenin uçtan uca yönetimi', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q10_d', code: 'D', text: 'Sürekli saha ziyareti ve farklı mağazalar', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q10_e', code: 'E', text: 'Proje, süreç ve merkez-saha koordinasyonu', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q10_f', code: 'F', text: 'Departmanlar arası üst yönetim ortamı', targetPositionId: 'COO' },
      { id: 'q10_g', code: 'G', text: 'Stratejik kararların alındığı yönetim ortamı', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q11',
    number: 11,
    text: 'Bir başarı hikâyesi yazacak olsan hangisini seçerdin?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q11_a', code: 'A', text: 'Yeni çalışanların kısa sürede başarılı olmasını sağladım', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q11_b', code: 'B', text: 'Zor bir vardiyayı ekibimle sorunsuz yönettim', targetPositionId: 'MUDUR_YRD' },
      { id: 'q11_c', code: 'C', text: 'Mağazamın satışını artırıp fire ve turnover oranını düşürdüm', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q11_d', code: 'D', text: 'Düşük performanslı bir bölgeyi başarıya taşıdım', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q11_e', code: 'E', text: 'Tüm mağazalarda verimlilik sağlayan yeni bir sistem kurdum', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q11_f', code: 'F', text: 'Şirketin farklı birimlerini büyük bir dönüşümde bir araya getirdim', targetPositionId: 'COO' },
      { id: 'q11_g', code: 'G', text: 'Şirketi yeni pazarlara taşıyan büyüme stratejisini yönettim', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q12',
    number: 12,
    text: 'İnsan yönetiminin hangi tarafı sana daha çekici gelir?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q12_a', code: 'A', text: 'Çalışana işi öğretmek', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q12_b', code: 'B', text: 'Günlük görev ve performansı takip etmek', targetPositionId: 'MUDUR_YRD' },
      { id: 'q12_c', code: 'C', text: 'Ekip kurmak, bağlılığı artırmak ve yönetici adayı yetiştirmek', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q12_d', code: 'D', text: 'Mağaza müdürlerine koçluk yapmak', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q12_e', code: 'E', text: 'Yönetim standartları ve liderlik sistemi oluşturmak', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q12_f', code: 'F', text: 'Üst düzey yönetici ekiplerini ortak hedefte buluşturmak', targetPositionId: 'COO' },
      { id: 'q12_g', code: 'G', text: 'Kurum kültürünü ve liderlik anlayışını şekillendirmek', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q13',
    number: 13,
    text: 'Hangi verileri incelemek seni daha çok ilgilendirir?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q13_a', code: 'A', text: 'Günlük görev ve müşteri geri bildirimleri', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q13_b', code: 'B', text: 'Vardiya, kasa ve stok sonuçları', targetPositionId: 'MUDUR_YRD' },
      { id: 'q13_c', code: 'C', text: 'Mağaza satışı, fire, personel ve kârlılık', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q13_d', code: 'D', text: 'Mağazalar arası bölgesel performans', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q13_e', code: 'E', text: 'Şirket genelindeki operasyon ve verimlilik göstergeleri', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q13_f', code: 'F', text: 'Bütçe, yatırım, kaynak ve departman performansı', targetPositionId: 'COO' },
      { id: 'q13_g', code: 'G', text: 'Pazar, rekabet, büyüme ve şirket değeri', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q14',
    number: 14,
    text: 'İşinde hangi zaman aralığına odaklanmayı tercih edersin?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q14_a', code: 'A', text: 'Günlük görevler', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q14_b', code: 'B', text: 'Günlük ve haftalık operasyon', targetPositionId: 'MUDUR_YRD' },
      { id: 'q14_c', code: 'C', text: 'Aylık ve yıllık mağaza hedefleri', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q14_d', code: 'D', text: 'Yıllık bölge hedefleri', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q14_e', code: 'E', text: 'Bir ila üç yıllık operasyon programları', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q14_f', code: 'F', text: 'Üç ila beş yıllık şirket planları', targetPositionId: 'COO' },
      { id: 'q14_g', code: 'G', text: 'Beş yıl ve üzeri şirket vizyonu', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q15',
    number: 15,
    text: 'Yetki kullanırken en çok hangi alanda rahat hissedersin?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q15_a', code: 'A', text: 'Günlük görevleri yönlendirmek', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q15_b', code: 'B', text: 'Vardiya içinde hızlı karar vermek', targetPositionId: 'MUDUR_YRD' },
      { id: 'q15_c', code: 'C', text: 'Mağaza çalışanı, bütçe ve operasyon kararları almak', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q15_d', code: 'D', text: 'Mağaza müdürlerini ve bölgesel kaynakları yönetmek', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q15_e', code: 'E', text: 'Şirket genelindeki operasyon standartlarını belirlemek', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q15_f', code: 'F', text: 'Büyük bütçe ve kaynak kararlarını koordine etmek', targetPositionId: 'COO' },
      { id: 'q15_g', code: 'G', text: 'Şirketin stratejik yönüyle ilgili nihai kararlar almak', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q16',
    number: 16,
    text: 'Aşağıdaki görevlerden hangisini daha istekli üstlenirsin?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q16_a', code: 'A', text: 'Yeni bir çalışana işi öğretmek', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q16_b', code: 'B', text: 'Yoğun bir vardiyayı yönetmek', targetPositionId: 'MUDUR_YRD' },
      { id: 'q16_c', code: 'C', text: 'Mağazanın yıllık iş planını hazırlamak', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q16_d', code: 'D', text: 'On mağazalık bölge için gelişim planı hazırlamak', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q16_e', code: 'E', text: 'Tüm mağazalara uygulanacak yeni operasyon modelini tasarlamak', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q16_f', code: 'F', text: 'Departmanların yıllık bütçe ve hedeflerini uyumlu hâle getirmek', targetPositionId: 'COO' },
      { id: 'q16_g', code: 'G', text: 'Şirketin yeni pazara giriş kararını hazırlamak', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q17',
    number: 17,
    text: 'Karşılaşmak istediğin mesleki zorluk hangisidir?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q17_a', code: 'A', text: 'Ekip içinde güven kazanmak', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q17_b', code: 'B', text: 'Yoğun operasyonu hatasız yönetmek', targetPositionId: 'MUDUR_YRD' },
      { id: 'q17_c', code: 'C', text: 'Mağazayı kârlı ve çalışan bağlılığı yüksek hâle getirmek', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q17_d', code: 'D', text: 'Farklı mağaza ve yöneticileri ortak standarda taşımak', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q17_e', code: 'E', text: 'Büyük ölçekli operasyon değişimini gerçekleştirmek', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q17_f', code: 'F', text: 'Şirket kaynaklarını doğru önceliklere yönlendirmek', targetPositionId: 'COO' },
      { id: 'q17_g', code: 'G', text: 'Belirsiz bir pazarda şirketin geleceğine karar vermek', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q18',
    number: 18,
    text: 'Hangi tür toplantıya katılmak sana daha anlamlı gelir?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q18_a', code: 'A', text: 'Günlük ekip toplantısı', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q18_b', code: 'B', text: 'Vardiya değerlendirme toplantısı', targetPositionId: 'MUDUR_YRD' },
      { id: 'q18_c', code: 'C', text: 'Mağaza performans toplantısı', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q18_d', code: 'D', text: 'Bölge değerlendirme toplantısı', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q18_e', code: 'E', text: 'Operasyon ve süreç geliştirme toplantısı', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q18_f', code: 'F', text: 'İcra kurulu toplantısı', targetPositionId: 'COO' },
      { id: 'q18_g', code: 'G', text: 'Yönetim kurulu ve strateji toplantısı', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q19',
    number: 19,
    text: 'Hangi cümle seni daha iyi tanımlar?',
    weight: 1.0,
    isTieBreaker: false,
    options: [
      { id: 'q19_a', code: 'A', text: 'İnsanlara işi doğru yapmayı göstermeyi severim', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q19_b', code: 'B', text: 'Günlük operasyonun kontrolüm altında olmasını severim', targetPositionId: 'MUDUR_YRD' },
      { id: 'q19_c', code: 'C', text: 'Bir işletmenin tüm sonuçlarını sahiplenmek isterim', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q19_d', code: 'D', text: 'Yöneticileri geliştirerek daha geniş sonuçlar üretmek isterim', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q19_e', code: 'E', text: 'Sorunları tek tek çözmek yerine sistem kurmak isterim', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q19_f', code: 'F', text: 'Farklı departmanları ortak amaçta yönetmek isterim', targetPositionId: 'COO' },
      { id: 'q19_g', code: 'G', text: 'Şirketin geleceğini şekillendirmek isterim', targetPositionId: 'CEO' }
    ]
  },
  {
    id: 'q20',
    number: 20,
    text: 'Kariyerinde ulaşmak istediğin en üst sorumluluk seviyesi hangisidir?',
    weight: 1.5,
    isTieBreaker: false,
    options: [
      { id: 'q20_a', code: 'A', text: 'Küçük bir ekibi yönlendirmek', targetPositionId: 'TAKIM_LIDERI' },
      { id: 'q20_b', code: 'B', text: 'Bir vardiyayı yönetmek', targetPositionId: 'MUDUR_YRD' },
      { id: 'q20_c', code: 'C', text: 'Bir mağazayı yönetmek', targetPositionId: 'MAGAZA_MUDURU' },
      { id: 'q20_d', code: 'D', text: 'Bir mağaza bölgesini yönetmek', targetPositionId: 'BOLGE_MUDURU' },
      { id: 'q20_e', code: 'E', text: 'Perakende operasyon sistemini yönetmek', targetPositionId: 'OPERASYON_DIREKTORU' },
      { id: 'q20_f', code: 'F', text: 'Şirket faaliyetlerinin büyük bölümünü yönetmek', targetPositionId: 'COO' },
      { id: 'q20_g', code: 'G', text: 'Şirketin tamamını yönetmek', targetPositionId: 'CEO' }
    ]
  }
];

export default function CareerOrientationTestModule({
  userId,
  userTitle = 'Kasiyer & Reyon Çalışanı',
  onNavigateToPlan,
  onNavigateToReadiness
}: CareerOrientationTestModuleProps) {
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState<TestData | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [submitting, setSubmitting] = useState(false);
  const [isTieBreakerMode, setIsTieBreakerMode] = useState(false);
  const [tieBreakerQuestions, setTieBreakerQuestions] = useState<Question[]>([]);
  const [tieBreakerAnswers, setTieBreakerAnswers] = useState<Record<string, string>>({});
  const [tieBreakerIndex, setTieBreakerIndex] = useState(0);

  const [result, setResult] = useState<TestResult | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [canRetake, setCanRetake] = useState(true);
  const [daysRemaining, setDaysRemaining] = useState(0);

  // Load Test Data & Previous Attempts
  useEffect(() => {
    loadTestAndHistory();
  }, [userId]);

  const loadTestAndHistory = async () => {
    setLoading(true);
    try {
      // 1. Load Test
      const testRes = await fetch(`/api/career-orientation/test?userId=${userId || ''}`).then(r => r.json());
      if (testRes.success && testRes.test && testRes.test.questions && testRes.test.questions.length > 0) {
        setTestData(testRes.test);

        if (testRes.activeAttempt) {
          setAttemptId(testRes.activeAttempt.id);
          const initialAns: Record<string, string> = {};
          testRes.activeAttempt.answers.forEach((a: any) => {
            initialAns[a.questionId] = a.optionId;
          });
          setAnswers(initialAns);
          if (testRes.activeAttempt.currentQuestion) {
            setCurrentQuestionIndex(Math.min(testRes.activeAttempt.currentQuestion - 1, (testRes.test.questions.length || 20) - 1));
          }
        }

        if (testRes.previousResult && testRes.previousResult.result) {
          const r = testRes.previousResult.result;
          setResult({
            id: r.id,
            attemptId: r.attemptId,
            nextStepPosition: r.nextStepPositionId,
            longTermPosition: r.longTermPositionId,
            alternativePosition: r.alternativePositionId,
            summary: r.resultSummary || '',
            scores: r.positionScores ? JSON.parse(r.positionScores) : {},
            requiredCompetencies: ['Ekip Koordinasyonu', 'Günlük Saha Takibi', 'P&L Yönetimi'],
            recommendedTrainings: ['Perakende Matematiği', 'Mağaza P&L Yönetimi', 'Vardiya Planlama'],
            recommendedFieldTasks: ['Kasa Devir Teslim Tutanağı', 'Günlük Fire Sayımı'],
            noticeText: 'Bu sonuç hedef pozisyona hazır olduğunu değil, ilgi alanlarının ve almak istediğin sorumlulukların bu kariyer yoluyla uyum gösterdiğini ifade eder.'
          });
        }
      } else {
        // Fallback to static questions
        setTestData({
          id: 'test_fallback',
          title: 'Perakende Kariyer Yönelim Testi',
          description: 'İlgi alanlarını, almak istediğin sorumlulukları ve gelecekte yapmak istediğin işleri keşfet. 20 soruyu yanıtla; sana uygun kariyer yönünü, bir sonraki olası kariyer adımını ve uzun vadeli hedef seçeneklerini birlikte belirleyelim.',
          notice: 'Bu testte doğru veya yanlış cevap yoktur. Olmak istediğin kişiyi değil, seni gerçekten motive eden görevleri ve gelecekte üstlenmek istediğin sorumlulukları düşünerek cevapla. Test sonucu terfi kararı veya terfi garantisi değildir; kariyer yönelimini ve gelişim seçeneklerini belirlemek amacıyla hazırlanmıştır.',
          cooldownMonths: 6,
          questions: FALLBACK_QUESTIONS
        });
      }

      // 2. Load History & Cooldown
      if (userId) {
        const histRes = await fetch(`/api/career-orientation/history?userId=${userId}`).then(r => r.json());
        if (histRes.success) {
          setHistory(histRes.history || []);
          setCanRetake(histRes.canRetake);
          setDaysRemaining(histRes.daysRemaining || 0);
        }
      }
    } catch (e) {
      console.error('Failed to load test data:', e);
      setTestData({
        id: 'test_fallback',
        title: 'Perakende Kariyer Yönelim Testi',
        description: 'İlgi alanlarını, almak istediğin sorumlulukları ve gelecekte yapmak istediğin işleri keşfet. 20 soruyu yanıtla; sana uygun kariyer yönünü, bir sonraki olası kariyer adımını ve uzun vadeli hedef seçeneklerini birlikte belirleyelim.',
        notice: 'Bu testte doğru veya yanlış cevap yoktur. Olmak istediğin kişiyi değil, seni gerçekten motive eden görevleri ve gelecekte üstlenmek istediğin sorumlulukları düşünerek cevapla. Test sonucu terfi kararı veya terfi garantisi değildir; kariyer yönelimini ve gelişim seçeneklerini belirlemek amacıyla hazırlanmıştır.',
        cooldownMonths: 6,
        questions: FALLBACK_QUESTIONS
      });
    } finally {
      setLoading(false);
    }
  };

  const rawQuestions = testData?.questions.filter(q => !q.isTieBreaker) || [];
  const questions = rawQuestions.length > 0 ? rawQuestions : FALLBACK_QUESTIONS;
  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSelectTieBreakerOption = (questionId: string, optionId: string) => {
    setTieBreakerAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const calculateFallbackResult = (): TestResult => {
    const POSITION_ORDER = ['TAKIM_LIDERI', 'MUDUR_YRD', 'MAGAZA_MUDURU', 'BOLGE_MUDURU', 'OPERASYON_DIREKTORU', 'COO', 'CEO'];
    const POSITION_NAMES: Record<string, string> = {
      TAKIM_LIDERI: 'Takım Lideri / Kıdemli Satış Çalışanı',
      MUDUR_YRD: 'Mağaza Müdür Yardımcısı',
      MAGAZA_MUDURU: 'Mağaza Müdürü',
      BOLGE_MUDURU: 'Bölge / Saha Müdürü',
      OPERASYON_DIREKTORU: 'Perakende Operasyon Direktörü',
      COO: 'Genel Müdür Yardımcısı / COO',
      CEO: 'CEO / Genel Müdür'
    };

    const scores: Record<string, number> = {
      TAKIM_LIDERI: 0,
      MUDUR_YRD: 0,
      MAGAZA_MUDURU: 0,
      BOLGE_MUDURU: 0,
      OPERASYON_DIREKTORU: 0,
      COO: 0,
      CEO: 0
    };

    questions.forEach(q => {
      const selectedOptId = answers[q.id];
      const selectedOpt = q.options.find(o => o.id === selectedOptId);
      if (selectedOpt && selectedOpt.targetPositionId) {
        const targetPos = selectedOpt.targetPositionId;
        const weight = q.weight || 1.0;
        const idx = POSITION_ORDER.indexOf(targetPos);
        if (idx !== -1) {
          scores[targetPos] += 3.0 * weight;
          if (idx > 0) scores[POSITION_ORDER[idx - 1]] += 1.0 * weight;
          if (idx < POSITION_ORDER.length - 1) scores[POSITION_ORDER[idx + 1]] += 1.0 * weight;
        }
      }
    });

    const sortedPositions = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topPosKey = sortedPositions[0]?.[0] || 'BOLGE_MUDURU';
    const secondPosKey = sortedPositions[1]?.[0] || 'MAGAZA_MUDURU';

    let nextStepName = 'Takım Lideri / Kıdemli Satış Çalışanı';
    const p = (userTitle || '').toLowerCase();
    if (p.includes('takım lideri') || p.includes('takim lideri')) nextStepName = 'Mağaza Müdür Yardımcısı';
    else if (p.includes('müdür yardımcısı') || p.includes('müdür yrd')) nextStepName = 'Mağaza Müdürü';
    else if (p.includes('mağaza müdürü')) nextStepName = 'Bölge / Saha Müdürü';
    else if (p.includes('bölge') || p.includes('saha müdürü')) nextStepName = 'Perakende Operasyon Direktörü';

    const longTermName = POSITION_NAMES[topPosKey] || 'Bölge / Saha Müdürü';
    const alternativeName = POSITION_NAMES[secondPosKey] || 'Mağaza Müdürü';

    return {
      id: `res_${Date.now()}`,
      attemptId: attemptId || `att_${Date.now()}`,
      nextStepPosition: nextStepName,
      longTermPosition: longTermName,
      alternativePosition: alternativeName,
      summary: `Yanıtların, uzun vadede birden fazla mağazayı ve yöneticiyi geliştirmeye yönelik güçlü bir kariyer ilgisine sahip olduğunu gösteriyor. Bugünkü kariyer basamağına göre önerilen ilk adımın ${nextStepName} pozisyonuna hazırlanmak. Bu basamakta kazanacağın ekip koordinasyonu ve günlük operasyon deneyimi, uzun vadeli ${longTermName} hedefinin temelini oluşturacaktır.`,
      scores,
      requiredCompetencies: ['Ekip Liderliği', 'Mağaza P&L Yönetimi', 'Saha Denetimi & Koçluk'],
      recommendedTrainings: ['Perakende Matematiği & İskonto', 'Vardiya İş Gücü Planlaması', 'Zor Müşteri Kriz Yönetimi'],
      recommendedFieldTasks: ['Kasa Sonu Z-Raporu Devir Teslim Tutanağı', 'Reyon Fiyat Etiketi Kontrolü'],
      noticeText: 'Bu sonuç hedef pozisyona hazır olduğunu değil, ilgi alanlarının ve almak istediğin sorumlulukların bu kariyer yoluyla uyum gösterdiğini ifade eder.'
    };
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Submit test
      handleSubmitTest();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    setSubmitting(true);
    try {
      // Create or use attempt ID
      let currentAttemptId = attemptId;
      if (!currentAttemptId) {
        currentAttemptId = `attempt_${Date.now()}`;
      }

      const formattedAnswers = Object.entries(answers).map(([qId, oId]) => ({
        questionId: qId,
        optionId: oId
      }));

      const res = await fetch('/api/career-orientation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          attemptId: currentAttemptId,
          answers: formattedAnswers,
          isTieBreakerCompleted: false
        })
      }).then(r => r.json());

      if (res.success) {
        if (res.needsTieBreaker) {
          setIsTieBreakerMode(true);
          setTieBreakerQuestions(res.tieBreakerQuestions || []);
          setAttemptId(res.attemptId);
        } else {
          setResult(res.result);
          setIsTieBreakerMode(false);
          loadTestAndHistory();
        }
      } else {
        setResult(calculateFallbackResult());
        setIsTieBreakerMode(false);
      }
    } catch (e) {
      console.error(e);
      setResult(calculateFallbackResult());
      setIsTieBreakerMode(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitTieBreakers = async () => {
    setSubmitting(true);
    try {
      const allAnswers = [
        ...Object.entries(answers).map(([qId, oId]) => ({ questionId: qId, optionId: oId })),
        ...Object.entries(tieBreakerAnswers).map(([qId, oId]) => ({ questionId: qId, optionId: oId }))
      ];

      const res = await fetch('/api/career-orientation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          attemptId,
          answers: allAnswers,
          isTieBreakerCompleted: true
        })
      }).then(r => r.json());

      if (res.success && res.result) {
        setResult(res.result);
        setIsTieBreakerMode(false);
        loadTestAndHistory();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-300 animate-pulse space-y-4 bg-[#0B2A4A] rounded-3xl border border-white/10 shadow-xl">
        <Compass className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
        <p className="text-sm font-bold">Perakende Kariyer Yönelim Testi Yükleniyor...</p>
      </div>
    );
  }

  // ----------------------------------------------------
  // RESULT SCREEN ("Kariyer Rotan Hazır")
  // ----------------------------------------------------
  if (result) {
    return (
      <div className="space-y-6 animate-in fade-in print:p-0 print:bg-white print:text-black">
        {/* Print Header */}
        <div className="hidden print:block mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">Perakende Kariyer Yönelim Test Raporu</h1>
          <p className="text-sm text-gray-600">Çalışan: {userTitle} | Tarih: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-amber-400/40 text-white space-y-4 shadow-2xl relative overflow-hidden print:bg-slate-100 print:text-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-4 print:border-slate-300">
            <div>
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-400/30 print:bg-amber-100 print:text-black">
                ✨ TEST TAMAMLANDI &amp; YÖNELİM HESAPLANDI
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 print:text-black">Kariyer Rotan Hazır</h2>
              <p className="text-xs text-gray-300 mt-0.5 print:text-slate-700">Değerlendirme sonucunuz ilgi alanlarınız ve sorumluluk tercihleriniz doğrultusunda oluşturulmuştur.</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0 print:hidden">
              <button
                onClick={handlePrintPDF}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 border border-white/15 transition-all"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Yazdır / PDF İndir</span>
              </button>

              {canRetake ? (
                <button
                  onClick={() => {
                    setResult(null);
                    setCurrentQuestionIndex(0);
                    setAnswers({});
                  }}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl flex items-center space-x-1.5 transition-all shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Testi Yeniden Al</span>
                </button>
              ) : (
                <span className="text-[10px] text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-400/20 font-mono font-bold">
                  ⌛ Sonraki Test: {daysRemaining} Gün Sonra
                </span>
              )}
            </div>
          </div>

          {/* TOP 3 OUTCOME CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* 1. Bir Sonraki Kariyer Adımın */}
            <div className="p-5 bg-emerald-500/20 border-2 border-emerald-400 rounded-2xl space-y-2 shadow-lg print:bg-emerald-50 print:border-emerald-500">
              <div className="flex items-center justify-between text-[10px] font-black text-emerald-300 uppercase tracking-wider print:text-emerald-800">
                <span>🟢 1. BİR SONRAKİ KAREYER ADIMIN</span>
                <span className="bg-emerald-400/20 px-2 py-0.5 rounded font-mono">ÖNERİLEN İLK ADIM</span>
              </div>
              <h3 className="text-lg font-black text-white print:text-black">{result.nextStepPosition}</h3>
              <p className="text-[11px] text-emerald-200 print:text-emerald-900">Mevcut kıdeminize göre kazanmanız gereken ilk yönetim basamağı.</p>
            </div>

            {/* 2. Uzun Vadeli Kariyer Yönelimin */}
            <div className="p-5 bg-amber-500/20 border-2 border-amber-400 rounded-2xl space-y-2 shadow-xl ring-2 ring-amber-400/40 print:bg-amber-50 print:border-amber-500">
              <div className="flex items-center justify-between text-[10px] font-black text-amber-300 uppercase tracking-wider print:text-amber-800">
                <span>👑 2. UZUN VADELİ KAREYER YÖNELİMİN</span>
                <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black font-mono">EN YÜKSEK İLGİ 🎯</span>
              </div>
              <h3 className="text-lg font-black text-amber-200 print:text-black">{result.longTermPosition}</h3>
              <p className="text-[11px] text-amber-100 print:text-amber-900">Motivasyon ve sorumluluk tercihlerinize en yüksek uyum gösteren vizyon hedefi.</p>
            </div>

            {/* 3. Alternatif Kariyer Seçeneğin */}
            <div className="p-5 bg-cyan-500/20 border-2 border-cyan-400 rounded-2xl space-y-2 shadow-lg print:bg-cyan-50 print:border-cyan-500">
              <div className="flex items-center justify-between text-[10px] font-black text-cyan-300 uppercase tracking-wider print:text-cyan-800">
                <span>🔄 3. ALTERNATİF KARİYER SEÇENEĞİN</span>
                <span className="bg-cyan-400/20 px-2 py-0.5 rounded font-mono">2. EN YÜKSEK UYUM</span>
              </div>
              <h3 className="text-lg font-black text-white print:text-black">{result.alternativePosition}</h3>
              <p className="text-[11px] text-cyan-200 print:text-cyan-900">Yetkinliklerinizle uyumlu değerlendirebileceğiniz güçlü alternatif yol.</p>
            </div>
          </div>
        </div>

        {/* Narrative & Disclaimer Box */}
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-4 text-white shadow-xl print:bg-white print:text-black">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-white print:text-black">Kariyer Yönelim Özeti</h3>
              <p className="text-xs text-gray-200 leading-relaxed print:text-slate-800 font-medium">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/30 text-xs text-amber-200 space-y-1.5 print:bg-amber-50 print:text-slate-900">
            <div className="font-extrabold flex items-center space-x-1.5 text-amber-300 print:text-black">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Kariyer Yönelimi ve Hazır Oluş Ayrımı</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {result.noticeText}
            </p>

            {/* CALL TO ACTION TO SKILLS READINESS TEST */}
            <div className="pt-2">
              <button
                onClick={onNavigateToReadiness}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer print:hidden"
              >
                <Target className="w-4 h-4" />
                <span>Şimdi Hedef Pozisyonun İçin Hazır Oluş Seviyeni Ölç 🎯</span>
              </button>
            </div>
          </div>
        </div>

        {/* VISUAL CAREER LADDER (COLOR-CODED) */}
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-4 text-white shadow-xl print:bg-white print:text-black">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Mevcut Pozisyondan Hedefe Kariyer Merdiveni</span>
            </h3>
            <div className="flex items-center space-x-3 text-[10px] font-bold font-mono">
              <span className="text-blue-400">📍 Mevcut</span>
              <span className="text-emerald-400">🟢 Bir Sonraki Adım</span>
              <span className="text-cyan-400">🔷 Alternatif</span>
              <span className="text-amber-400">🟡 Uzun Vadeli</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
            {LADDER_STAGES.map((stg, idx) => {
              const isNext = result.nextStepPosition.includes(stg.name) || stg.id === 'TAKIM_LIDERI';
              const isLongTerm = result.longTermPosition.includes(stg.name);
              const isAlt = result.alternativePosition.includes(stg.name);
              const isCurrent = idx === 0;

              return (
                <div
                  key={stg.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                    isLongTerm
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-xl ring-2 ring-amber-400/50'
                      : isNext
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg'
                      : isAlt
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md'
                      : isCurrent
                      ? 'bg-blue-500/20 border-blue-400 text-blue-200 shadow-md'
                      : 'bg-[#061B33]/80 border-white/10 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-mono ${
                      isLongTerm
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : isNext
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : isAlt
                        ? 'bg-cyan-400 text-slate-950 font-black'
                        : isCurrent
                        ? 'bg-blue-500 text-white font-black'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {isLongTerm ? '🟡 UZUN VADELİ' : isNext ? '🟢 SONRAKİ ADIM' : isAlt ? '🔷 ALTERNATİF' : isCurrent ? '📍 MEVCUT' : `ADIM ${idx + 1}`}
                    </span>
                  </div>

                  <div className="text-xs font-black leading-snug">
                    {stg.name}
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[9px] font-mono text-gray-300 flex items-center justify-between">
                    <span>Durum:</span>
                    <span className="font-bold text-white">
                      {isCurrent ? 'Aktif 📍' : isNext ? 'Önerilen 🟢' : isLongTerm ? 'Hedef 🎯' : 'Planlandı ⏳'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competencies, Trainings & Field Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Required Competencies */}
          <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-3 text-white shadow-xl print:bg-white print:text-black">
            <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Gerekli Yetkinlikler</span>
            </h3>
            <div className="space-y-2 text-xs">
              {result.requiredCompetencies.map((c, i) => (
                <div key={i} className="p-3 bg-[#061B33] rounded-xl border border-white/10 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Recommended Trainings */}
          <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-3 text-white shadow-xl print:bg-white print:text-black">
            <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Önerilen Eğitim Modülleri</span>
            </h3>
            <div className="space-y-2 text-xs">
              {result.recommendedTrainings.map((t, i) => (
                <div key={i} className="p-3 bg-[#061B33] rounded-xl border border-white/10 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-bold">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Recommended Field Tasks */}
          <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-3 text-white shadow-xl print:bg-white print:text-black">
            <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>Önerilen Saha Görevleri</span>
            </h3>
            <div className="space-y-2 text-xs">
              {result.recommendedFieldTasks.map((ft, i) => (
                <div key={i} className="p-3 bg-[#061B33] rounded-xl border border-white/10 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold">{ft}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-xl print:hidden">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-amber-400" />
            <div>
              <h4 className="text-sm font-extrabold">Mentör İnceleme &amp; Görüşme Önerisi</h4>
              <p className="text-xs text-gray-300">Yönelim sonucunuzu atanan bölge mentörünüz ile değerlendirin.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onNavigateToPlan}
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Kariyer Planımı Oluştur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TIE BREAKER QUESTION MODAL
  // ----------------------------------------------------
  if (isTieBreakerMode && tieBreakerQuestions.length > 0) {
    const tbQ = tieBreakerQuestions[tieBreakerIndex];
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 text-white shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                ⚖️ EŞİTLİK ÇÖZÜMÜ (AYIRICI SORU {tieBreakerIndex + 1}/3)
              </span>
              <h3 className="text-lg font-black text-white mt-1">Eşit Puan Ayırıcı Sorusu</h3>
              <p className="text-xs text-gray-300">İki kariyer yöneliminiz çok yakın puan aldı. En doğru kararı vermek için şu soruyu yanıtlayın.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-amber-200">{tbQ.text}</h4>

            <div className="space-y-3">
              {tbQ.options.map(opt => {
                const isSelected = tieBreakerAnswers[tbQ.id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectTieBreakerOption(tbQ.id, opt.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-[#061B33] border-white/10 hover:border-white/30 text-gray-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-500 text-slate-950' : 'border-gray-500'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-bold">{opt.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {tieBreakerIndex > 0 ? (
              <button
                onClick={() => setTieBreakerIndex(prev => prev - 1)}
                className="px-4 py-2 bg-white/10 text-gray-300 font-bold rounded-xl text-xs"
              >
                Önceki Soru
              </button>
            ) : <div />}

            {tieBreakerIndex < tieBreakerQuestions.length - 1 ? (
              <button
                disabled={!tieBreakerAnswers[tbQ.id]}
                onClick={() => setTieBreakerIndex(prev => prev + 1)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-md disabled:opacity-50"
              >
                Sonraki Ayırıcı Soru ➔
              </button>
            ) : (
              <button
                disabled={!tieBreakerAnswers[tbQ.id] || submitting}
                onClick={handleSubmitTieBreakers}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs shadow-lg disabled:opacity-50"
              >
                {submitting ? 'Hesaplanıyor...' : 'Sonuçlarımı Göster 🎯'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TEST TAKING SCREEN (20 SINGLE-CHOICE QUESTIONS)
  // ----------------------------------------------------
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const isSelectedCurrent = currentQ ? !!answers[currentQ.id] : false;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Intro & Banner */}
      <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-white/10 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{testData?.title || 'Perakende Kariyer Yönelim Testi'}</h2>
              <p className="text-xs text-gray-300">İlgi alanlarınızı, sorumluluk tercihlerinizi ve hedeflerinizi keşfedin.</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
              Soru {currentQuestionIndex + 1} / {questions.length} (%{progressPercent})
            </span>
          </div>
        </div>

        {/* Intro text & Information disclaimer box */}
        <p className="text-xs text-gray-200 leading-relaxed font-medium">
          {testData?.description}
        </p>

        <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/30 text-xs text-amber-200 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {testData?.notice}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 pt-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-300 font-bold">
            <span>İlerleme Durumu</span>
            <span className="text-amber-300">%{progressPercent} Tamamlandı</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUESTION CARD */}
      {currentQ && (
        <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-amber-400/30 text-white space-y-6 shadow-2xl">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-amber-300 font-mono">
              <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                SORU {currentQ.number} / {questions.length}
              </span>
              {currentQ.weight > 1.0 && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ⭐ KRİTİK YÖNELİM SORUSU (1.5x)
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              "{currentQ.text}"
            </h3>
          </div>

          {/* OPTIONS CARDS (A - G) */}
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 group ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-xl ring-2 ring-amber-400/40'
                      : 'bg-[#061B33] border-white/10 hover:border-amber-400/50 text-gray-200 hover:bg-[#082444]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400 text-slate-950'
                      : 'border-white/20 text-gray-400 group-hover:border-amber-400 group-hover:text-amber-300'
                  }`}>
                    {opt.code}
                  </div>

                  <span className="text-xs sm:text-sm font-extrabold leading-snug flex-1">
                    {opt.text}
                  </span>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 stroke-[2.5]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 sm:px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-white/15 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Önceki Soru</span>
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!isSelectedCurrent || submitting}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-lg flex items-center space-x-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Testi Tamamla & Hesapla' : 'Sonraki Soru'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
