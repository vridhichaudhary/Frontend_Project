"use client";

import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, isBefore, isAfter } from 'date-fns';
import HeroImage from './HeroImage';
import MonthHeader from './MonthHeader';
import CalendarGrid from './CalendarGrid';
import NotesSidebar, { Note } from './NotesSidebar';
import SpiralBinding from './SpiralBinding';

export default function CalendarWall() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Default to Jan 2026
  
  const [selectedStart, setSelectedStart] = useState<Date | null>(new Date());
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  
  const [notes, setNotes] = useState<Record<string, Note[]>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from local storage
    const savedNotes = localStorage.getItem('tuf-calendar-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tuf-calendar-notes', JSON.stringify(notes));
    }
  }, [notes, isClient]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (day: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      // Start a new range
      setSelectedStart(day);
      setSelectedEnd(null);
    } else {
      // Finish the range
      if (isBefore(day, selectedStart)) {
        setSelectedEnd(selectedStart);
        setSelectedStart(day);
      } else {
        setSelectedEnd(day);
      }
    }
  };

  const handleAddNote = (dateStr: string, text: string) => {
    setNotes(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { id: Date.now().toString(), text, completed: false }]
    }));
  };

  const handleToggleNote = (dateStr: string, noteId: string) => {
    setNotes(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.map(note => 
        note.id === noteId ? { ...note, completed: !note.completed } : note
      ) || []
    }));
  };

  const handleDeleteNote = (dateStr: string, noteId: string) => {
    setNotes(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.filter(note => note.id !== noteId) || []
    }));
  };

  if (!isClient) return <div className="min-h-screen" />; // Wait for hydration

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-start overflow-y-auto lg:overflow-hidden pb-8 lg:pb-0 pt-4">
      
      {/* Calendar Area (The Physical Wall Calendar Frame) */}
      <div className="lg:col-span-8 flex flex-col h-[750px] lg:h-full relative mt-4">
        
        {/* Wall Calendar Body */}
        <div className="relative flex flex-col h-full bg-[#1A1C20] rounded-lg border border-border overflow-visible text-white md:mx-4">

          {/* Binding Component */}
          <SpiralBinding />

          {/* Wall Hanging Hole */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0F1115] rounded-full border border-border z-40" />

          {/* The Hero Image Graphic (Top Half of physical calendar) */}
          <div className="h-[40%] min-h-[220px] rounded-t-lg overflow-hidden mt-3 z-10 border-b border-border">
             <HeroImage monthIndex={currentDate.getMonth()} />
          </div>

          {/* The Date Grid (Bottom Half of physical printed calendar) */}
          <div className="flex-1 flex flex-col z-10 bg-[#1A1C20] rounded-b-lg overflow-hidden relative">
            <MonthHeader 
              currentDate={currentDate} 
              onPrev={handlePrevMonth} 
              onNext={handleNextMonth} 
            />
            <div className="flex-1 flex flex-col bg-gradient-to-b from-[#1A1C20] to-[#121418]">
              <CalendarGrid 
                currentDate={currentDate}
                selectedStart={selectedStart}
                selectedEnd={selectedEnd}
                notes={notes}
                onDateClick={handleDateClick}
              />
            </div>
          </div>

        </div>
      </div>

      {/* integrated Notes Area */}
      <div className="lg:col-span-4 h-[500px] lg:h-full flex flex-col mt-4 lg:mt-8 px-2 md:px-0 z-10">
        <NotesSidebar 
          selectedDate={selectedStart}
          selectedEndDate={selectedEnd}
          notes={notes}
          onAddNote={handleAddNote}
          onToggleNote={handleToggleNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
      
    </div>
  );
}
