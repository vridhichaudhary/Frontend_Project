import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Plus, Check, Trash2, CalendarDays } from 'lucide-react';

export interface Note {
  id: string;
  text: string;
  completed: boolean;
}

interface NotesSidebarProps {
  selectedDate: Date | null;
  selectedEndDate: Date | null;
  notes: Record<string, Note[]>;
  onAddNote: (dateStr: string, text: string) => void;
  onToggleNote: (dateStr: string, noteId: string) => void;
  onDeleteNote: (dateStr: string, noteId: string) => void;
}

export default function NotesSidebar({
  selectedDate,
  selectedEndDate,
  notes,
  onAddNote,
  onToggleNote,
  onDeleteNote,
}: NotesSidebarProps) {
  const [inputValue, setInputValue] = useState('');

  // Use the start date for saving notes if it's a range.
  // We attach notes primarily to the selected start date for simplicity.
  const activeDate = selectedDate || new Date(); 
  const dateKey = format(activeDate, 'yyyy-MM-dd');
  const activeNotes = notes[dateKey] || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddNote(dateKey, inputValue.trim());
    setInputValue('');
  };

  const isRange = selectedDate && selectedEndDate && !isSameDay(selectedDate, selectedEndDate);
  const title = isRange 
    ? `${format(selectedDate, 'MMM d')} - ${format(selectedEndDate, 'MMM d')}` 
    : selectedDate 
      ? format(selectedDate, 'MMMM d, yyyy') 
      : 'Select a Date';

  return (
    <div className="bg-surface rounded-2xl shadow-lg border border-border p-6 flex flex-col h-full lg:overflow-hidden">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border text-accent shrink-0">
        <CalendarDays className="w-6 h-6" />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-6 scrollbar-thin scrollbar-thumb-surfaceHover scrollbar-track-transparent">
        {activeNotes.length === 0 ? (
          <div className="text-textSecondary text-center italic mt-10">
            No tasks found. Add a note or doable task below!
          </div>
        ) : (
          activeNotes.map(note => (
            <div 
              key={note.id} 
              className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                note.completed ? 'bg-surfaceHover border-surfaceHover text-textSecondary' : 'bg-[#22252A] border-border text-white'
              }`}
            >
              <div 
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => onToggleNote(dateKey, note.id)}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-colors ${
                  note.completed ? 'bg-accent border-accent text-white' : 'border-textSecondary'
                }`}>
                  {note.completed && <Check className="w-3 h-3" strokeWidth={3} />}
                </div>
                <span className={`text-sm ${note.completed ? 'line-through' : ''}`}>
                  {note.text}
                </span>
              </div>
              <button 
                onClick={() => onDeleteNote(dateKey, note.id)}
                className="text-textSecondary hover:text-red-400 p-2 opacity-50 hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAdd} className="mt-auto pt-4 relative border-t border-border focus-within:border-accent transition-colors">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-transparent text-white placeholder-textSecondary text-sm p-3 pr-12 focus:outline-none"
        />
        <button 
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
