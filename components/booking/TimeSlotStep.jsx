'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function TimeSlotStep({ selectedDate, selectedTime, onTimeSelect, onNext, onBack }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    setError('');
    fetch(`/api/slots?date=${selectedDate}`)
      .then((r) => r.json())
      .then(({ data, error }) => {
        if (error) setError(error);
        else setSlots(data || []);
      })
      .catch(() => setError('Failed to load slots.'))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Available hours for {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      {!loading && !error && slots.length === 0 && (
        <div className="py-8 text-center text-xs text-gray-400 border border-gray-200 rounded-xl bg-gray-50/50">
          No slots available for this date.<br />
          Please pick another date.
        </div>
      )}

      {!loading && slots.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.is_available}
              onClick={() => slot.is_available && onTimeSelect(slot.slot_time)}
              className={cn(
                'py-2 px-1 text-xs rounded-xl border text-center transition-all duration-150',
                !slot.is_available && 'bg-gray-50/50 text-gray-300 cursor-not-allowed line-through border-gray-100',
                slot.is_available && selectedTime !== slot.slot_time && 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50 font-medium',
                selectedTime === slot.slot_time && 'bg-blue-600 text-white border-blue-600 font-semibold'
              )}
            >
              {slot.slot_time}
            </button>
          ))}
        </div>
      )}

      <p className="text-[10px] text-gray-400">
        <span className="line-through mr-1">10:00 AM</span> = Already booked
      </p>

      <div className="flex justify-between pt-2 gap-2">
        <Button variant="outline" className="flex-1" onClick={onBack}>← Back</Button>
        <Button className="flex-1" onClick={onNext} disabled={!selectedTime}>Next →</Button>
      </div>
    </div>
  );
}
