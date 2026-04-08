import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MonthHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

export default function MonthHeader({ currentDate, onPrev, onNext }: MonthHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-border">
      <button 
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-surfaceHover transition-colors text-textSecondary hover:text-white"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="overflow-hidden relative w-48 h-10 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.h2
            key={currentDate.toISOString()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold tracking-wider absolute"
          >
            {format(currentDate, 'MMMM yyyy')}
          </motion.h2>
        </AnimatePresence>
      </div>

      <button 
        onClick={onNext}
        className="p-2 rounded-full hover:bg-surfaceHover transition-colors text-textSecondary hover:text-white"
        aria-label="Next month"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
