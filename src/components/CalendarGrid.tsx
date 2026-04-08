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
    <div className="w-full h-full flex flex-col pb-6 px-4 md:px-8">
      <div className="grid grid-cols-7 flex-1 border-t border-l border-border/50 shadow-sm bg-[#121418] rounded-b-lg overflow-hidden">
        {weekDays.map(day => (
          <div key={day} className="text-[10px] md:text-xs font-bold text-textSecondary uppercase tracking-widest text-center py-2 border-r border-b border-border/50 bg-[#0A0C0F]">
            {day}
          </div>
        ))}
        {days.map((day) => {
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
              className={cn(
                "relative flex flex-col items-center sm:items-end justify-center sm:justify-start p-1 sm:p-2 border-r border-b border-border/50 transition-colors focus:outline-none min-h-[3.5rem] group z-10 overflow-hidden",
                !isCurrentMonth ? "bg-[#121418] text-textSecondary/40" : "hover:bg-surfaceHover bg-[#1A1C20] text-textPrimary"
              )}
            >
              {/* Range Background */}
              {isBetween && (
                <div className="absolute inset-0 bg-accent/20 z-0" />
              )}
              {isSelectedStart && selectedStart && selectedEnd && !isSameDay(selectedStart, selectedEnd) && (
                 <div className={cn(
                   "absolute inset-y-0 w-1/2 z-0 bg-accent/20",
                   isBefore(selectedStart, selectedEnd) ? "right-0" : "left-0"
                 )} />
              )}
              {isSelectedEnd && selectedStart && selectedEnd && !isSameDay(selectedStart, selectedEnd) && (
                 <div className={cn(
                   "absolute inset-y-0 w-1/2 z-0 bg-accent/20",
                   isAfter(selectedEnd, selectedStart) ? "left-0" : "right-0"
                 )} />
              )}

              {/* Day Number */}
              <div className={cn(
                "relative px-2 py-0.5 flex items-center justify-center rounded-sm text-xs sm:text-sm transition-all z-10 shrink-0",
                isSelectedStart || isSelectedEnd ? "bg-accent text-white font-bold" : ""
              )}>
                {format(day, 'd')}
              </div>
              
              {/* Notes content preview or dot */}
              {hasNotes && (
                 <div className="relative z-10 w-full mt-auto mb-1 flex justify-center sm:justify-end pr-1">
                    <span className={cn(
                      "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[2px]",
                      allCompleted ? "bg-[#22C55E]" : "bg-accent"
                    )} />
                 </div>
              )}
              
            </button>
          );
        })}
      </div>
    </div>
  );
}
