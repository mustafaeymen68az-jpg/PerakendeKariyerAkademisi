import { DEPARTMENTS_DATA } from './departmentsData';

export interface TalentCandidate {
  id: string;
  name: string;
  avatar: string;
  deptId: string;
  departmentName: string;
  targetPosition: string;
  currentCompany: string;
  city: string;
  experienceYears: number;
  competencyScore: number; // Always 80 to 98
  theoryExamScore: number;
  fieldAuditScore: number;
  leadershipScore: number;
  completedCourses: {
    title: string;
    duration: string;
    completedDate: string;
    grade: string;
  }[];
  certificates: {
    title: string;
    issueDate: string;
    credentialId: string;
    badgeColor: 'gold' | 'emerald' | 'blue' | 'purple';
  }[];
  biography: string;
}

const SAMPLE_NAMES = [
  'Ahmet Çelik', 'Zeynep Kaya', 'Dr. Mehmet Yılmaz', 'Ayşe Demir', 'Caner Şahin',
  'Merve Öztürk', 'Burak Kılıç', 'Elif Arslan', 'Mustafa Aydın', 'Seda Yılmaz',
  'Hakan Erdem', 'Gamze Tekin', 'Emre Aksoy', 'Deniz Korkmaz', 'Selin Özer',
  'Oğuzhan Kaya', 'Büşra Doğan', 'Alperen Çakır', 'Hazal Güneş', 'Tarık Yıldız'
];

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Uşak', 'Gaziantep', 'Konya', 'Kocaeli', 'Adana'];
const COMPANIES = ['Migros Grubu', 'BİM A.Ş.', 'A101 Marketler', 'ŞOK Marketler', 'CarrefourSA', 'Metro Grossmarket', 'File Market', 'Macrocenter'];

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400'
];

// Dynamically generate +80p candidates for all 26 retail positions
export const GENERATE_TALENT_POOL_DATA = (): TalentCandidate[] => {
  const candidates: TalentCandidate[] = [];
  let candidateCounter = 1;

  DEPARTMENTS_DATA.forEach((dept, deptIdx) => {
    // Generate 3 top candidates for each department
    for (let i = 0; i < 3; i++) {
      const nameIndex = (deptIdx * 3 + i) % SAMPLE_NAMES.length;
      const name = SAMPLE_NAMES[nameIndex];
      const city = CITIES[(deptIdx + i) % CITIES.length];
      const company = COMPANIES[(deptIdx * 2 + i) % COMPANIES.length];
      const avatar = AVATARS[(deptIdx + i) % AVATARS.length];

      // Competency scores always between 84 and 98
      const score = 84 + ((deptIdx * 7 + i * 5) % 15);
      const theory = Math.min(100, score + (i % 3) - 1);
      const field = Math.min(100, score + ((i + 1) % 4));
      const leadership = Math.min(100, score - 2 + (i % 2));

      // Build completed courses dynamically from department's year 1 and year 2 curriculum
      const y1Courses = dept.year1Courses.slice(0, 3).map((title, idx) => ({
        title,
        duration: `${12 + idx * 4} Saat`,
        completedDate: `2025-0${idx + 2}-15`,
        grade: `%${90 + idx * 3}`
      }));

      const y2Courses = dept.year2Courses.slice(0, 3).map((title, idx) => ({
        title,
        duration: `${20 + idx * 6} Saat`,
        completedDate: `2025-0${idx + 6}-20`,
        grade: `%${88 + idx * 4}`
      }));

      candidates.push({
        id: `cand_${dept.id}_${i + 1}`,
        name,
        avatar,
        deptId: dept.id,
        departmentName: dept.name,
        targetPosition: dept.name,
        currentCompany: company,
        city,
        experienceYears: 3 + i * 2,
        competencyScore: score,
        theoryExamScore: theory,
        fieldAuditScore: field,
        leadershipScore: leadership,
        completedCourses: [...y1Courses, ...y2Courses],
        certificates: [
          {
            title: `${dept.name} Uzmanlık Sertifikası`,
            issueDate: '2025-08-10',
            credentialId: `PKA-2025-${1000 + candidateCounter}`,
            badgeColor: 'gold'
          },
          {
            title: 'Perakende Yetkinlik Pasaportu (+80 Barajı)',
            issueDate: '2025-09-01',
            credentialId: `PASS-2025-${5000 + candidateCounter}`,
            badgeColor: 'emerald'
          },
          {
            title: 'Yapay Zekâ & Dijital Saha Uyum Rozeti',
            issueDate: '2025-10-15',
            credentialId: `AI-ROZET-${9000 + candidateCounter}`,
            badgeColor: 'blue'
          }
        ],
        biography: `${dept.name} kadrosunda ${3 + i * 2} yıllık saha tecrübesine sahip, Perakende Kariyer Akademisi +80 puan yetkinlik barajını başarıyla geçmiş nitelikli aday.`
      });

      candidateCounter++;
    }
  });

  return candidates;
};

export const TALENT_POOL_CANDIDATES = GENERATE_TALENT_POOL_DATA();
