
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CountdownTracker from '@/components/CountdownTracker';
import SubjectTracker from '@/components/SubjectTracker';
import ProgressEntry from '@/components/ProgressEntry';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Exam Countdown Section */}
      <CountdownTracker />
      
      {/* Subject Tracker Section */}
      <SubjectTracker />
      
      {/* Progress Entry Section */}
      <ProgressEntry />
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>Mindful Progress Tracker © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
