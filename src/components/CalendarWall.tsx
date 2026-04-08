"use client";

import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, isBefore, isAfter } from 'date-fns';
import HeroImage from './HeroImage';
import MonthHeader from './MonthHeader';
import CalendarGrid from './CalendarGrid';
import NotesSidebar, { Note } from './NotesSidebar';

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start overflow-hidden pb-4 lg:pb-0">
      
      {/* Calendar Area */}
      <div className="lg:col-span-8 flex flex-col h-full bg-surface rounded-2xl shadow-xl overflow-hidden border border-border">
        <HeroImage monthIndex={currentDate.getMonth()} />
        <MonthHeader 
          currentDate={currentDate} 
          onPrev={handlePrevMonth} 
          onNext={handleNextMonth} 
        />
        <div className="flex-1 flex flex-col justify-center py-2 px-2 bg-[#1A1C20]/50">
          <CalendarGrid 
            currentDate={currentDate}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            notes={notes}
            onDateClick={handleDateClick}
          />
        </div>
      </div>

      {/* integrated Notes Area */}
      <div className="lg:col-span-4 h-full flex flex-col lg:overflow-hidden">
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
