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
  monthIndex: number; // 0 to 11
}

export default function HeroImage({ monthIndex }: HeroImageProps) {
  const imageUrl = IMAGES[monthIndex % 12];
  const quote = QUOTES[monthIndex % 12];

  return (
    <div className="relative w-full h-[120px] md:h-[160px] border-b border-border flex items-center justify-center text-center shrink-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={quote}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={imageUrl}
            alt="Motivational Coding"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/80 via-[#0F1115]/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-lg md:text-2xl font-bold text-white drop-shadow-lg tracking-wide z-10 w-full px-4">
              <span className="text-accent text-3xl align-top select-none mr-2">"</span>
              {quote}
              <span className="text-accent text-3xl align-top select-none ml-2">"</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
