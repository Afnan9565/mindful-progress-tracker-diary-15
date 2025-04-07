
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16 bg-gradient-to-b from-lavender-50 to-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold leading-tight gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Track Your Learning Journey
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Monitor your progress, track exam countdowns, and maintain a personal diary of your achievements as you improve each day.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button className="bg-lavender-500 hover:bg-lavender-600 text-white hero-button">
            Start Tracking
          </Button>
          <Button variant="outline" className="border-lavender-300 text-lavender-700 hover:bg-lavender-50 hero-button">
            Learn More
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-lavender-500"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection;
