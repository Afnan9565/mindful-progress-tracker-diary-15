
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CountdownTracker from '@/components/CountdownTracker';
import SubjectTracker from '@/components/SubjectTracker';
import ProgressEntry from '@/components/ProgressEntry';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Exam Countdown Section */}
      <div id="countdown">
        <CountdownTracker />
      </div>
      
      {/* Subject Tracker Section */}
      <SubjectTracker />
      
      {/* Progress Entry Section */}
      <ProgressEntry />
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="container mx-auto px-4">
          <p>Mindful Progress Tracker © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
