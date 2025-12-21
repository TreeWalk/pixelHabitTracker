'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PixelCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  highlightedDates?: Date[];
}

export function PixelCalendar({ selectedDate, onDateSelect, highlightedDates = [] }: PixelCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isHighlighted = (day: number) => {
    return highlightedDates.some(date =>
      day === date.getDate() &&
      currentMonth.getMonth() === date.getMonth() &&
      currentMonth.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(date);
  };

  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dayNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return (
    <div className="pixel-calendar retro-border bg-white p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b-2" style={{ borderColor: 'var(--pixel-accent)' }}>
        <button
          onClick={previousMonth}
          className="w-8 h-8 flex items-center justify-center border-2 hover:bg-amber-100 transition-colors"
          style={{ borderColor: 'var(--pixel-border)' }}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={3} />
        </button>
        <div className="font-bold text-xl tracking-wider" style={{ color: 'var(--pixel-border)' }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center border-2 hover:bg-amber-100 transition-colors"
          style={{ borderColor: 'var(--pixel-border)' }}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div
            key={day}
            className="text-center text-xs font-bold py-1"
            style={{ color: 'var(--pixel-accent)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const highlighted = isHighlighted(day);
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square flex items-center justify-center text-sm font-bold
                border-2 transition-all
                ${selected ? 'bg-amber-200 border-[var(--pixel-border)] scale-95' : 'border-transparent'}
                ${today && !selected ? 'border-[var(--pixel-green)]' : ''}
                ${highlighted && !selected ? 'bg-green-100' : ''}
                ${!selected && !highlighted ? 'hover:bg-amber-50' : ''}
              `}
              style={{
                color: selected ? 'var(--pixel-border)' : highlighted ? 'var(--pixel-green)' : 'var(--pixel-border)'
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 pt-2 border-t-2 flex flex-wrap gap-2 text-xs" style={{ borderColor: 'var(--pixel-accent)' }}>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 border-2" style={{ borderColor: 'var(--pixel-green)' }} />
          <span style={{ color: 'var(--pixel-accent)' }}>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-100" />
          <span style={{ color: 'var(--pixel-accent)' }}>Has Logs</span>
        </div>
      </div>
    </div>
  );
}
