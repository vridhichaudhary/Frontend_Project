"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1548&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481482223217-3f3ce04da428?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508317469940-e3de49ba902e?q=80&w=1470&auto=format&fit=crop"
];

const QUOTES = [
  "Life has no remote. Get Up and change it yourself.",
  "It's not a bug. It's an undocumented feature.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "In order to be irreplaceable, one must always be different.",
  "Knowledge is power. Code is knowledge executing.",
  "Simplicity is the soul of efficiency.",
  "Make it work, make it right, make it fast.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "There are two ways to write error-free programs; only the third one works.",
  "Learning to write programs stretches your mind.",
  "The best way to predict the future is to implement it."
];

interface HeroImageProps {
  monthIndex: number; 
}

export default function HeroImage({ monthIndex }: HeroImageProps) {
  const imageUrl = IMAGES[monthIndex % 12];
  const quote = QUOTES[monthIndex % 12];

  return (
    <div className="relative w-full h-full border-b border-[#2D313A] overflow-hidden bg-black rounded-t-lg">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={quote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <img
            src={imageUrl}
            alt="Motivational Coding"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
             <p className="text-xl md:text-2xl font-bold text-white text-center leading-snug">
               “{quote}”
             </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
