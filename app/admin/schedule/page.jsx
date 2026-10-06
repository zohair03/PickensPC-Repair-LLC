'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth,
  isBefore, startOfDay,
} from 'date-fns';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TIME_OPTIONS = [
  '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM',
];

const TIME_PRESETS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

const INTERVAL_OPTIONS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '60 min' },
];

const DEFAULT_SCHEDULE = Array.from({ length: 7 }, (_, i) => ({
  day_of_week: i,
  is_open: i >= 1 && i <= 5,
  open_time: '09:00 AM',
  close_time: '05:00 PM',
  slot_interval: 30,
}));

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner({ size = 'sm' }) {
  const s = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <svg className={cn('animate-spin text-blue-600', s)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer',
        checked ? 'bg-blue-600' : 'bg-gray-200'
      )}>
      <span className={cn(
        'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        checked ? 'translate-x-4' : 'translate-x-0'
      )} />
    </button>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-md transition-colors',
        active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
      )}>
      {children}
    </button>
  );
}

// ─── Business Hours Panel ──────────────────────────────────────────────────────
function BusinessHoursPanel() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/business-hours');
        const { data } = await res.json();
        if (data && data.length === 7) {
          setSchedule(data.sort((a, b) => a.day_of_week - b.day_of_week));
        }
      } catch {}
      finally { setLoading(false); }
    }
    load();
  }, []);

  function updateDay(dayIndex, field, value) {
    setSchedule((prev) => prev.map((d) =>
      d.day_of_week === dayIndex ? { ...d, [field]: value } : d
    ));
  }

  async function handleSave() {
    setResult(null);
    setSaving(true);
    try {
      const res = await fetch('/api/business-hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule }),
      });
      const json = await res.json();
      if (!res.ok) {
        setResult({ type: 'error', message: json.error || 'Failed to save.' });
      } else {
        setResult({ type: 'success', message: 'Business hours saved. Slots are now available for users to book automatically.' });
      }
    } catch {
      setResult({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-gray-800">Business Hours</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Set your weekly schedule. Slots within these hours are automatically available for customers to book — up to <strong>2 weeks in advance</strong>. No manual slot creation needed.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spinner size="md" /></div>
      ) : (
        <>
          <div className="hidden sm:block bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Day</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-10 text-center">Open</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-28 text-center">From</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-28 text-center">Until</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-20 text-center">Interval</span>
            </div>

            {schedule.map((day) => (
              <div key={day.day_of_week}
                className={cn(
                  'grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 transition-colors',
                  !day.is_open && 'bg-gray-50/50'
                )}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className={cn('text-sm font-medium', day.is_open ? 'text-gray-800' : 'text-gray-400')}>
                    {DAY_NAMES[day.day_of_week]}
                  </span>
                  {!day.is_open && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Closed</span>
                  )}
                </div>

                <div className="w-10 flex justify-center">
                  <Toggle checked={day.is_open} onChange={(val) => updateDay(day.day_of_week, 'is_open', val)} />
                </div>

                <select disabled={!day.is_open} value={day.open_time}
                  onChange={(e) => updateDay(day.day_of_week, 'open_time', e.target.value)}
                  className={cn('w-28 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    !day.is_open && 'opacity-40 cursor-not-allowed bg-gray-50')}>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                <select disabled={!day.is_open} value={day.close_time}
                  onChange={(e) => updateDay(day.day_of_week, 'close_time', e.target.value)}
                  className={cn('w-28 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    !day.is_open && 'opacity-40 cursor-not-allowed bg-gray-50')}>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                <select disabled={!day.is_open} value={day.slot_interval}
                  onChange={(e) => updateDay(day.day_of_week, 'slot_interval', Number(e.target.value))}
                  className={cn('w-20 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    !day.is_open && 'opacity-40 cursor-not-allowed bg-gray-50')}>
                  {INTERVAL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="sm:hidden bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Column headers — hide on mobile, the row layout speaks for itself there */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Day</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-10 text-center">Open</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-28 text-center">From</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-28 text-center">Until</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide w-20 text-center">Interval</span>
            </div>

            {schedule.map((day) => (
              <div key={day.day_of_week}
                className={cn(
                  'flex flex-wrap items-center gap-y-2 gap-x-3 px-4 py-3 border-b border-gray-100 last:border-0 transition-colors',
                  'sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto]',
                  !day.is_open && 'bg-gray-50/50'
                )}>

                {/* Day name + closed badge — own row on mobile */}
                <div className="flex items-center gap-2 min-w-0 basis-full sm:basis-auto order-1">
                  <span className={cn('text-sm font-medium', day.is_open ? 'text-gray-800' : 'text-gray-400')}>
                    {DAY_NAMES[day.day_of_week]}
                  </span>
                  {!day.is_open && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Closed</span>
                  )}
                </div>

                {/* Toggle */}
                <div className="w-10 flex justify-center order-2 sm:order-none">
                  <Toggle checked={day.is_open} onChange={(val) => updateDay(day.day_of_week, 'is_open', val)} />
                </div>

                {/* From */}
                <div className="flex flex-col gap-1 order-3 sm:order-none flex-1 sm:flex-none min-w-[110px] sm:w-28">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide sm:hidden">From</span>
                  <select disabled={!day.is_open} value={day.open_time}
                    onChange={(e) => updateDay(day.day_of_week, 'open_time', e.target.value)}
                    className={cn('w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                      !day.is_open && 'opacity-40 cursor-not-allowed bg-gray-50')}>
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Until */}
                <div className="flex flex-col gap-1 order-4 sm:order-none flex-1 sm:flex-none min-w-[110px] sm:w-28">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide sm:hidden">Until</span>
                  <select disabled={!day.is_open} value={day.close_time}
                    onChange={(e) => updateDay(day.day_of_week, 'close_time', e.target.value)}
                    className={cn('w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                      !day.is_open && 'opacity-40 cursor-not-allowed bg-gray-50')}>
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Interval */}
                <div className="flex flex-col gap-1 order-5 sm:order-none flex-1 sm:flex-none min-w-[90px] sm:w-20">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide sm:hidden">Interval</span>
                  <select disabled={!day.is_open} value={day.slot_interval}
                    onChange={(e) => updateDay(day.day_of_week, 'slot_interval', Number(e.target.value))}
                    className={cn('w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                      !day.is_open && 'opacity-40 cursor-not-allowed bg-gray-50')}>
                    {INTERVAL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {result && (
        <div className={cn(
          'flex items-start gap-2.5 p-3.5 rounded-xl text-sm border',
          result.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-700'
        )}>
          <span className="text-base leading-none mt-0.5">{result.type === 'success' ? '✓' : '⚠'}</span>
          <p className="font-medium">{result.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button onClick={handleSave} disabled={saving || loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {saving && <Spinner />}
          {saving ? 'Saving…' : 'Save Business Hours'}
        </button>
        <p className="text-xs text-gray-400">Changes take effect immediately for new bookings</p>
      </div>
    </div>
  );
}

// ─── Manual Override Panel ─────────────────────────────────────────────────────
function ManualOverridePanel() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeSlots, setActiveSlots] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [removing, setRemoving] = useState(null);   // slot_time being removed
  const [restoring, setRestoring] = useState(null); // slot_time being restored
  const [closingDay, setClosingDay] = useState(false);
  const [adding, setAdding] = useState(null);
  const [allDates, setAllDates] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [customTime, setCustomTime] = useState('');
  const [customError, setCustomError] = useState('');
  const [showBlocked, setShowBlocked] = useState(false);

  const today = startOfDay(new Date());

  // Fetch all available dates for calendar dots
  const fetchAllDates = useCallback(async () => {
    setLoadingAll(true);
    try {
      const res = await fetch('/api/slots');
      const { data } = await res.json();
      setAllDates(data || []);
    } finally { setLoadingAll(false); }
  }, []);

  useEffect(() => { fetchAllDates(); }, [fetchAllDates]);

  // Fetch slots for selected date (admin view — includes blocked)
  const fetchSlotsForDate = useCallback(async (date) => {
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/slots?date=${date}&admin=true`);
      const json = await res.json();
      setActiveSlots(json.data || []);
      setBlockedSlots(json.blocked || []);
    } finally { setLoadingSlots(false); }
  }, []);

  useEffect(() => {
    if (selectedDate) fetchSlotsForDate(selectedDate);
  }, [selectedDate, fetchSlotsForDate]);

  const datesWithSlots = new Set(allDates.map((s) => s.slot_date));

  // Remove a slot (block auto-generated, or delete manual addition)
  async function removeSlot(slot) {
    setRemoving(slot.slot_time);
    try {
      if (slot.is_auto) {
        // Block this auto-generated slot
        await fetch('/api/slots', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slot_date: slot.slot_date, slot_time: slot.slot_time, is_blocked: true }),
        });
      } else {
        // Delete the manual row
        await fetch('/api/slots', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: slot.id }),
        });
      }
      await fetchSlotsForDate(selectedDate);
      await fetchAllDates();
    } finally { setRemoving(null); }
  }

  // Restore a blocked slot (removes the block override)
  async function restoreSlot(slot) {
    setRestoring(slot.slot_time);
    try {
      await fetch('/api/slots', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot_date: slot.slot_date, slot_time: slot.slot_time }),
      });
      await fetchSlotsForDate(selectedDate);
      await fetchAllDates();
    } finally { setRestoring(null); }
  }

  // Close entire day: block all auto slots + delete all manual additions
  async function closeDay() {
    setClosingDay(true);
    try {
      for (const slot of activeSlots) {
        if (slot.is_auto) {
          await fetch('/api/slots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slot_date: slot.slot_date, slot_time: slot.slot_time, is_blocked: true }),
          });
        } else {
          await fetch('/api/slots', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: slot.id }),
          });
        }
      }
      await fetchSlotsForDate(selectedDate);
      await fetchAllDates();
    } finally { setClosingDay(false); }
  }

  // Add a manual slot
  async function addSlot(time) {
    if (!selectedDate) return;
    setAdding(time);
    try {
      const res = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot_date: selectedDate, slot_time: time, is_blocked: false }),
      });
      if (res.ok) {
        await fetchSlotsForDate(selectedDate);
        await fetchAllDates();
      }
    } finally { setAdding(null); }
  }

  async function addCustomTime() {
    setCustomError('');
    const trimmed = customTime.trim();
    if (!trimmed) { setCustomError('Enter a time.'); return; }
    await addSlot(trimmed);
    setCustomTime('');
  }

  // Calendar helpers
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) });
  const existingActiveTimes = new Set(activeSlots.map((s) => s.slot_time));

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-gray-800">Manual Override</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Pick any date within the next 2 weeks to close it for the day, remove individual slots, add extra times, or restore previously blocked slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Calendar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm">←</button>
            <span className="font-semibold text-gray-800 text-sm">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 text-sm">→</button>
          </div>

          <div className="grid grid-cols-7">
            {DAY_SHORT.map((d) => (
              <div key={d} className="py-1.5 text-center text-xs font-medium text-gray-400">{d}</div>
            ))}
            {days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isPast = isBefore(day, today);
              const hasSlots = datesWithSlots.has(dateStr);
              const isSelected = selectedDate === dateStr;

              return (
                <button key={dateStr} disabled={isPast || !isCurrentMonth}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    'relative py-2 text-sm text-center transition-colors rounded-lg',
                    !isCurrentMonth && 'text-gray-200 cursor-default',
                    isCurrentMonth && isPast && 'text-gray-300 cursor-not-allowed',
                    isCurrentMonth && !isPast && !isSelected && 'text-gray-700 hover:bg-blue-50 cursor-pointer',
                    isSelected && 'bg-blue-600 text-white font-semibold'
                  )}>
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

          <div className="flex items-center gap-1.5">
            {loadingAll ? <Spinner /> : <span className="inline-block w-2 h-2 bg-blue-400 rounded-full" />}
            <span className="text-xs text-gray-400">Dates with available slots</span>
          </div>
        </div>

        {/* Slot Manager */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
          {!selectedDate ? (
            <div className="text-center text-sm text-gray-400 py-12">
              <div className="text-2xl mb-2">📅</div>
              Select a date to manage its slots.
            </div>
          ) : (
            <>
              {/* Date header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMMM d')}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {loadingSlots ? 'Loading…' : `${activeSlots.length} active slot${activeSlots.length !== 1 ? 's' : ''}${blockedSlots.length > 0 ? ` · ${blockedSlots.length} blocked` : ''}`}
                  </p>
                </div>
                {activeSlots.length > 0 && (
                  <button onClick={closeDay} disabled={closingDay}
                    className="inline-flex items-center gap-1.5 text-xs text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50 shrink-0">
                    {closingDay ? <Spinner /> : '🚫'}
                    {closingDay ? 'Closing…' : 'Close This Day'}
                  </button>
                )}
              </div>

              {/* Active slots */}
              {loadingSlots ? (
                <div className="flex items-center justify-center py-6"><Spinner size="md" /></div>
              ) : activeSlots.length === 0 ? (
                <div className="text-center py-5 border border-dashed border-gray-200 rounded-xl">
                  <p className="text-sm text-gray-400">No active slots for this date.</p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {blockedSlots.length > 0 ? 'All slots are blocked — restore below.' : 'This day is outside business hours or all slots removed.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {activeSlots.map((slot) => (
                    <div key={slot.slot_time}
                      className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-800 font-medium">{slot.slot_time}</span>
                        <span className={cn(
                          'text-xs px-1.5 py-0.5 rounded-md border',
                          slot.is_auto
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : 'bg-green-50 text-green-700 border-green-100'
                        )}>
                          {slot.is_auto ? 'Auto' : 'Custom'}
                        </span>
                        {!slot.is_available && (
                          <span className="text-xs bg-red-50 text-red-500 border border-red-100 px-1.5 py-0.5 rounded-md">Booked</span>
                        )}
                      </div>
                      <button
                        onClick={() => removeSlot(slot)}
                        disabled={removing === slot.slot_time || !slot.is_available}
                        title={!slot.is_available ? 'Cannot remove a booked slot' : ''}
                        className="text-xs text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1">
                        {removing === slot.slot_time ? <Spinner /> : 'Remove'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Blocked slots (restorable) */}
              {blockedSlots.length > 0 && (
                <div>
                  <button onClick={() => setShowBlocked((v) => !v)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                    {showBlocked ? '▾' : '▸'} {blockedSlots.length} blocked slot{blockedSlots.length !== 1 ? 's' : ''} (click to {showBlocked ? 'hide' : 'restore'})
                  </button>
                  {showBlocked && (
                    <div className="mt-2 space-y-1.5">
                      {blockedSlots.map((slot) => (
                        <div key={slot.slot_time}
                          className="flex items-center justify-between px-3 py-2 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 line-through">{slot.slot_time}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-md">Blocked</span>
                          </div>
                          <button
                            onClick={() => restoreSlot(slot)}
                            disabled={restoring === slot.slot_time}
                            className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-40 transition-colors inline-flex items-center gap-1">
                            {restoring === slot.slot_time ? <Spinner /> : '↺ Restore'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Add from presets */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Add a custom slot</p>
                <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto">
                  {TIME_PRESETS.map((t) => {
                    const exists = existingActiveTimes.has(t);
                    return (
                      <button key={t} onClick={() => !exists && addSlot(t)}
                        disabled={exists || !!adding}
                        className={cn(
                          'py-1.5 text-xs rounded-lg border transition-all inline-flex items-center justify-center',
                          exists ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-default' : 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300',
                          adding === t && 'opacity-60'
                        )}>
                        {adding === t ? <Spinner /> : t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom time */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">Custom time</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="e.g. 06:00 PM" value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomTime()}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={addCustomTime} disabled={!!adding}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors inline-flex items-center gap-1.5">
                    {adding ? <Spinner /> : 'Add'}
                  </button>
                </div>
                {customError && <p className="text-xs text-red-500 mt-1">{customError}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminSchedulePage() {
  const [activeTab, setActiveTab] = useState('hours');

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Schedule Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Set your business hours — slots are automatically available for customers up to 2 weeks ahead. Use Manual Override for exceptions.
        </p>
      </div>

      <div className="flex items-center bg-gray-100 p-1 rounded-xl w-fit gap-1">
        <Tab active={activeTab === 'hours'} onClick={() => setActiveTab('hours')}>🕐 Business Hours</Tab>
        <Tab active={activeTab === 'manual'} onClick={() => setActiveTab('manual')}>📅 Manual Override</Tab>
      </div>

      {activeTab === 'hours' ? <BusinessHoursPanel /> : <ManualOverridePanel />}

      {activeTab === 'hours' && (
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 max-w-2xl">
          <span className="text-base shrink-0">💡</span>
          <div className="space-y-1">
            <p><strong>How it works:</strong> Once you save your business hours, customers can immediately book any open slot within the next 14 days — no manual slot creation required.</p>
            <p>Use the <strong>Manual Override</strong> tab to close a specific day, remove individual slots, add extra one-off times, or restore a slot you previously blocked.</p>
          </div>
        </div>
      )}
    </div>
  );
}
