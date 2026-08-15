import React from 'react';
import LeftSidebarNav from '@/components/LeftSidebarNav';
import Footer from '@/components/Footer';
import VisitorOnboardingModal from '@/components/VisitorOnboardingModal';
import UserProfileModal from '@/components/UserProfileModal';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col">
      {/* First-time Visitor Onboarding Entry Modal & User Profile Modal */}
      <VisitorOnboardingModal />
      <UserProfileModal />

      {/* Left Vertical Navigation Menu (Stacked Top to Bottom on Far Left) */}
      <LeftSidebarNav />

      {/* Main Content Area Shifted Right on Desktop */}
      <div className="flex-1 xl:pl-64 flex flex-col min-w-0 transition-all duration-300">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
