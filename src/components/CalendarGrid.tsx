import React from 'react';
import { 
  eachDayOfInterval, endOfMonth, endOfWeek, format, 
  isSameMonth, isSameDay, startOfMonth, startOfWeek, 
  isWithinInterval, isAfter, isBefore 
} from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Note } from './NotesSidebar';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CalendarGridProps {
  currentDate: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  notes: Record<string, Note[]>;
  onDateClick: (date: Date) => void;
}

export default function CalendarGrid({
  currentDate,
  selectedStart,
  selectedEnd,
  notes,
  onDateClick
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="w-full mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center items-center">
        {weekDays.map(day => (
          <div key={day} className="text-xs font-bold text-textSecondary uppercase tracking-widest pt-1 pb-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const hasNotes = notes[dateKey] && notes[dateKey].length > 0;
          const allCompleted = hasNotes && notes[dateKey].every(n => n.completed);

          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelectedStart = selectedStart ? isSameDay(day, selectedStart) : false;
          const isSelectedEnd = selectedEnd ? isSameDay(day, selectedEnd) : false;
          const isBetween = selectedStart && selectedEnd 
            ? isWithinInterval(day, { 
                start: isBefore(selectedStart, selectedEnd) ? selectedStart : selectedEnd, 
                end: isAfter(selectedEnd, selectedStart) ? selectedEnd : selectedStart 
              }) && !isSelectedStart && !isSelectedEnd
            : false;

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className="relative py-1 md:py-2 h-10 md:h-12 flex flex-col items-center justify-center focus:outline-none group"
            >
              {/* Range Background */}
              {isBetween && (
                <div className="absolute inset-y-1 inset-x-0 bg-accent/20" />
              )}
              {isSelectedStart && selectedStart && selectedEnd && !isSameDay(selectedStart, selectedEnd) && (
                 <div className={cn(
                   "absolute inset-y-1 w-1/2",
                   isBefore(selectedStart, selectedEnd) ? "right-0 bg-accent/20" : "left-0 bg-accent/20"
                 )} />
              )}
              {isSelectedEnd && selectedStart && selectedEnd && !isSameDay(selectedStart, selectedEnd) && (
                 <div className={cn(
                   "absolute inset-y-1 w-1/2",
                   isAfter(selectedEnd, selectedStart) ? "left-0 bg-accent/20" : "right-0 bg-accent/20"
                 )} />
              )}

              {/* Day Number */}
              <div className={cn(
                "relative w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all z-10",
                !isCurrentMonth ? "text-textSecondary/40" : "text-white hover:bg-surfaceHover",
                isSelectedStart || isSelectedEnd ? "bg-accent text-white font-bold shadow-lg shadow-accent/40" : "",
                hasNotes && !(isSelectedStart || isSelectedEnd) ? "bg-[#22252A] border border-border" : ""
              )}>
                {format(day, 'd')}
                
                {/* Note Indicator */}
                {hasNotes && (
                  <span className={cn(
                    "absolute -bottom-1 w-1.5 h-1.5 rounded-full",
                    allCompleted ? "bg-green-500" : "bg-accent"
                  )} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
