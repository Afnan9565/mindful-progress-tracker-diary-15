
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CountdownTracker from '@/components/CountdownTracker';
import SubjectTracker from '@/components/SubjectTracker';
import ProgressEntry from '@/components/ProgressEntry';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SubjectProvider } from '@/contexts/SubjectContext';

const Index = () => {
  return (
    <SubjectProvider>
      <div className="min-h-screen bg-background text-foreground dark:bg-gray-950 dark:text-gray-100 relative">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Exam Countdown Section */}
        <div id="countdown" className="bg-gray-50 dark:bg-gray-900 relative z-10">
          <CountdownTracker />
        </div>
        
        {/* Subject Tracker Section */}
        <div className="dark:bg-gray-950 relative z-10">
          <SubjectTracker />
        </div>
        
        {/* Progress Entry Section */}
        <div className="bg-gray-50 dark:bg-gray-900 relative z-10">
          <ProgressEntry />
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <div className="container mx-auto px-4">
            <p>Mindful Progress Tracker © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </SubjectProvider>
  );
};

export default Index;
