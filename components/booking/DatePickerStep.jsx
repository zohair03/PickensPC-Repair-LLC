'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, isToday, isBefore, startOfDay, addMonths, subMonths } from 'date-fns';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function DatePickerStep({ selectedDate, onDateSelect, onNext, onBack }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableDates(currentMonth);
  }, [currentMonth]);

  async function fetchAvailableDates(month) {
    setLoading(true);
    try {
      const start = format(startOfMonth(month), 'yyyy-MM-dd');
      const end = format(endOfMonth(month), 'yyyy-MM-dd');
      const res = await fetch(`/api/slots`);
      const { data } = await res.json();
      if (data) {
        const dates = new Set(
          data
            .filter((s) => s.slot_date >= start && s.slot_date <= end)
            .map((s) => s.slot_date)
        );
        setAvailableDates(dates);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const today = startOfDay(new Date());

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm transition-colors"
          aria-label="Previous month"
        >
          ←
        </button>
        <span className="font-semibold text-gray-800 text-sm">{format(currentMonth, 'MMMM yyyy')}</span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm transition-colors"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      {/* Calendar grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {dayNames.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-400">
              {d}
            </div>
          ))}
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-40 text-xs text-gray-400">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isPast = isBefore(day, today);
              const hasSlots = availableDates.has(dateStr);
              const isSelected = selectedDate === dateStr;
              const isSelectable = isCurrentMonth && !isPast && hasSlots;

              return (
                <button
                  key={dateStr}
                  disabled={!isSelectable}
                  onClick={() => isSelectable && onDateSelect(dateStr)}
                  className={cn(
                    'py-2.5 text-xs text-center transition-colors relative rounded-lg m-0.5',
                    !isCurrentMonth && 'text-gray-200',
                    isCurrentMonth && isPast && 'text-gray-300 cursor-not-allowed',
                    isCurrentMonth && !isPast && !hasSlots && 'text-gray-300 cursor-not-allowed',
                    isSelectable && !isSelected && 'hover:bg-blue-50 text-gray-700 cursor-pointer font-medium',
                    isSelected && 'bg-blue-600 text-white font-semibold',
                    isToday(day) && !isSelected && isCurrentMonth && 'font-bold text-blue-600'
                  )}
                >
                  {format(day, 'd')}
                  {hasSlots && isCurrentMonth && !isPast && (
                    <span className={cn(
                      'absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                      isSelected ? 'bg-white' : 'bg-blue-400'
                    )} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full" />
        Dates with available slots
      </div>

      {selectedDate && (
        <p className="text-xs text-blue-600 bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl font-semibold">
          Selected: {format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMMM d, yyyy')}
        </p>
      )}

      <div className="flex justify-between pt-2 gap-2">
        <Button variant="outline" className="flex-1" onClick={onBack}>← Back</Button>
        <Button className="flex-1" onClick={onNext} disabled={!selectedDate}>Next →</Button>
      </div>
    </div>
  );
}
