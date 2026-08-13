import React from 'react';
import AITutor from '@/components/AITutor';

export default function MentorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-primary-navy">
          Yapay Zeka Destekli Mentor
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Perakende matematiği, envanter yönetimi, raf verimlilik formülleri ve İK planlama konularında sorularınızı yanıtlayan dijital danışmanınız.
        </p>
      </div>
      <AITutor />
    </div>
  );
}
