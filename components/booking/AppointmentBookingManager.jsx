'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, isToday, isBefore, startOfDay, addMonths, subMonths, addDays } from 'date-fns';

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner({ size = 'md' }) {
  const s = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';
  return (
    <svg className={cn('animate-spin text-blue-600', s)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

// ─── Step Indicator (inline, minimal) ─────────────────────────────────────────
const BOOK_STEPS = ['Personal Info', 'Pick Date', 'Pick Time', 'Review'];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center w-full mb-6">
      {BOOK_STEPS.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;
        return (
          <div key={stepNum} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200',
                isCompleted ? 'bg-blue-600 border-blue-600 text-white' :
                isCurrent ? 'border-blue-600 text-blue-600 bg-white' :
                'border-gray-300 text-gray-400 bg-white'
              )}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <span className={cn('text-xs mt-1 whitespace-nowrap', isCurrent ? 'text-blue-600 font-medium' : 'text-gray-400')}>
                {label}
              </span>
            </div>
            {index < BOOK_STEPS.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-2 mb-4 transition-colors duration-200', isCompleted ? 'bg-blue-600' : 'bg-gray-200')} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared Panel Header ───────────────────────────────────────────────────────
function PanelHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Shared Detail Row ─────────────────────────────────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 px-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-400 w-14 shrink-0 pt-0.5 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-gray-800 font-medium flex-1">{value}</span>
    </div>
  );
}

// ─── Shared Btn ───────────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', className = '', disabled, onClick, type = 'button', loading }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
  };
  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={cn(base, variants[variant], className)}>
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────────
function Field({ label, error, className, id, textarea, rows = 3, ...props }) {
  const inputClass = cn(
    'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
    error ? 'border-red-400' : 'border-gray-200',
    className
  );
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="text-xs font-medium text-gray-600">{label}</label>}
      {textarea
        ? <textarea id={id} rows={rows} className={cn(inputClass, 'resize-none')} {...props} />
        : <input id={id} className={inputClass} {...props} />
      }
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Screen: Personal Info ────────────────────────────────────────────────────
function PersonalInfoScreen({ data, onChange, onNext }) {
  function handleSubmit(e) {
    e.preventDefault();
    onNext();
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <StepIndicator currentStep={1} />
      <PanelHeader title="Your Information" subtitle="We'll use this to confirm your appointment." />
      <div className="flex-1 overflow-y-auto space-y-3 px-1">
        <Field id="user_name" label="Full Name *" type="text" placeholder="John Doe" value={data.user_name} onChange={(e) => onChange('user_name', e.target.value)} required />
        <Field id="user_email" label="Email Address *" type="email" placeholder="john@example.com" value={data.user_email} onChange={(e) => onChange('user_email', e.target.value)} required />
        <Field id="user_phone" label="Phone Number *" type="tel" placeholder="+1 (555) 000-0000" value={data.user_phone} onChange={(e) => onChange('user_phone', e.target.value)} required />
        <Field id="notes" label="Notes (optional)" textarea placeholder="Any special requests or information..." value={data.notes} onChange={(e) => onChange('notes', e.target.value)} rows={2} />
      </div>
      <div className="pt-4 flex justify-end">
        <Btn type="submit">Next →</Btn>
      </div>
    </form>
  );
}

// ─── Screen: Date Picker ───────────────────────────────────────────────────────
function DatePickerScreen({ selectedDate, onDateSelect, onNext, onBack, title = 'Select a Date', showStepIndicator = true }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDates(currentMonth); }, [currentMonth]);

  async function fetchDates(month) {
    setLoading(true);
    try {
      const start = format(startOfMonth(month), 'yyyy-MM-dd');
      const end = format(endOfMonth(month), 'yyyy-MM-dd');
      const res = await fetch('/api/slots');
      const { data } = await res.json();
      if (data) {
        const dates = new Set(data.filter((s) => s.slot_date >= start && s.slot_date <= end).map((s) => s.slot_date));
        setAvailableDates(dates);
      }
    } catch {}
    finally { setLoading(false); }
  }

  const days = eachDayOfInterval({ start: startOfWeek(startOfMonth(currentMonth)), end: endOfWeek(endOfMonth(currentMonth)) });
  const today = startOfDay(new Date());
  // Prevent navigating past the month that contains today + 14 days
  const maxNavigableMonth = startOfMonth(addDays(today, 14));
  const canGoForward = isBefore(currentMonth, maxNavigableMonth);
  const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="flex flex-col h-full">
      {showStepIndicator && <StepIndicator currentStep={2} />}
      <PanelHeader title={title} />
      <div className="flex-1 overflow-y-auto">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 rounded hover:bg-gray-100 text-gray-600 text-sm">←</button>
          <span className="text-sm font-semibold text-gray-700">{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={() => canGoForward && setCurrentMonth(addMonths(currentMonth, 1))} disabled={!canGoForward} className="p-1 rounded hover:bg-gray-100 text-gray-600 text-sm disabled:opacity-30 disabled:cursor-not-allowed">→</button>
        </div>
        {/* Calendar */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {DAY_NAMES.map((d) => <div key={d} className="py-1.5 text-center text-xs font-medium text-gray-400">{d}</div>)}
          </div>
          {loading
            ? <div className="flex items-center justify-center h-36"><Spinner /></div>
            : <div className="grid grid-cols-7">
                {days.map((day) => {
                  const ds = format(day, 'yyyy-MM-dd');
                  const inMonth = isSameMonth(day, currentMonth);
                  const isPast = isBefore(day, today);
                  const hasSlots = availableDates.has(ds);
                  const isSelected = selectedDate === ds;
                  const selectable = inMonth && !isPast && hasSlots;
                  return (
                    <button key={ds} disabled={!selectable} onClick={() => selectable && onDateSelect(ds)}
                      className={cn(
                        'py-1.5 text-xs text-center transition-colors relative',
                        !inMonth && 'text-gray-200',
                        inMonth && isPast && 'text-gray-300 cursor-not-allowed',
                        inMonth && !isPast && !hasSlots && 'text-gray-300 cursor-not-allowed',
                        selectable && !isSelected && 'hover:bg-blue-50 text-gray-700 cursor-pointer',
                        isSelected && 'bg-blue-600 text-white font-semibold',
                        isToday(day) && !isSelected && inMonth && 'font-bold text-blue-600'
                      )}>
                      {format(day, 'd')}
                      {hasSlots && inMonth && !isPast && !isSelected && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
          }
        </div>
        {selectedDate && (
          <p className="text-xs text-blue-600 font-medium mt-2">
            Selected: {format(new Date(selectedDate + 'T00:00:00'), 'MMMM d, yyyy')}
          </p>
        )}
      </div>
      <div className="pt-4 flex justify-between">
        <Btn variant="outline" onClick={onBack}>← Back</Btn>
        <Btn onClick={onNext} disabled={!selectedDate}>Next →</Btn>
      </div>
    </div>
  );
}

// ─── Screen: Time Slot ─────────────────────────────────────────────────────────
function TimeSlotScreen({ selectedDate, selectedTime, onTimeSelect, onNext, onBack, nextLabel = 'Next →', loadingNext, header }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    setError('');
    fetch(`/api/slots?date=${selectedDate}`)
      .then((r) => r.json())
      .then(({ data, error }) => { if (error) setError(error); else setSlots(data || []); })
      .catch(() => setError('Failed to load slots.'))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  return (
    <div className="flex flex-col h-full">
      {header ?? (
        <PanelHeader
          title="Select a Time"
          subtitle={selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        {loading && <div className="flex items-center justify-center h-24"><Spinner /></div>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && !error && slots.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-400 border rounded-lg">
            No slots available for this date. Go back and pick another.
          </div>
        )}
        {!loading && slots.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => (
              <button key={slot.id} disabled={!slot.is_available} onClick={() => slot.is_available && onTimeSelect(slot.slot_time)}
                className={cn(
                  'py-2 text-xs rounded-lg border text-center transition-all',
                  !slot.is_available && 'bg-gray-50 text-gray-300 cursor-not-allowed line-through border-gray-100',
                  slot.is_available && selectedTime !== slot.slot_time && 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50',
                  selectedTime === slot.slot_time && 'bg-blue-600 text-white border-blue-600 font-medium'
                )}>
                {slot.slot_time}
              </button>
            ))}
          </div>
        )}
        {!loading && slots.some(s => !s.is_available) && (
          <p className="text-xs text-gray-300 mt-2"><span className="line-through">10:00 AM</span> = Already booked</p>
        )}
      </div>
      <div className="pt-4 flex justify-between">
        <Btn variant="outline" onClick={onBack}>← Back</Btn>
        <Btn onClick={onNext} disabled={!selectedTime} loading={loadingNext}>{nextLabel}</Btn>
      </div>
    </div>
  );
}

// ─── Screen: Review ────────────────────────────────────────────────────────────
function ReviewScreen({ data, onSubmit, onBack, submitting, error }) {
  const rows = [
    { label: 'Name', value: data.user_name },
    { label: 'Email', value: data.user_email },
    { label: 'Phone', value: data.user_phone },
    { label: 'Date', value: data.appointment_date ? new Date(data.appointment_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '' },
    { label: 'Time', value: data.appointment_time },
    ...(data.notes ? [{ label: 'Notes', value: data.notes }] : []),
  ];
  return (
    <div className="flex flex-col h-full">
      <StepIndicator currentStep={4} />
      <PanelHeader title="Review & Confirm" subtitle="Double-check your details before submitting." />
      <div className="flex-1 overflow-y-auto border border-gray-100 divide-y divide-gray-100">
        {rows.map(({ label, value }) => <DetailRow key={label} label={label} value={value} />)}
      </div>
      {error && <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">{error}</div>}
      <div className="pt-4 flex justify-between">
        <Btn variant="outline" onClick={onBack} disabled={submitting}>← Back</Btn>
        <Btn onClick={onSubmit} loading={submitting}>{submitting ? 'Booking…' : 'Confirm Booking'}</Btn>
      </div>
    </div>
  );
}

// ─── Screen: Confirm (success) ─────────────────────────────────────────────────
function ConfirmScreen({ appt, onManage, onNewBooking }) {
  return (
    <div className="flex flex-col h-full">
      {/* Success icon */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Booking Confirmed!</h2>
        <p className="text-xs text-gray-500 mt-1">A confirmation email has been sent to <strong className="text-gray-700">{appt.user_email}</strong></p>
      </div>
      <div className="flex-1 overflow-y-auto border border-gray-100 divide-y divide-gray-100">
        {[
          { label: 'Name', value: appt.user_name },
          { label: 'Date', value: formatDate(appt.appointment_date) },
          { label: 'Time', value: appt.appointment_time },
          { label: 'Phone', value: appt.user_phone },
          ...(appt.notes ? [{ label: 'Notes', value: appt.notes }] : []),
        ].map(({ label, value }) => <DetailRow key={label} label={label} value={value} />)}
      </div>
      <div className="pt-4 flex flex-col gap-2">
        <Btn className="w-full" onClick={onManage}>Manage My Appointment</Btn>
        <Btn variant="outline" className="w-full" onClick={onNewBooking}>Book Another Appointment</Btn>
      </div>
    </div>
  );
}

// ─── Screen: Manage ────────────────────────────────────────────────────────────
function ManageScreen({ appt, onReschedule, onCancel, onBack, onNewBooking }) {
  const isCancelled = appt.status === 'cancelled';
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">My Appointment</h2>
        <Badge status={appt.status} />
      </div>
      <div className="flex-1 overflow-y-auto border border-gray-100 divide-y divide-gray-100">
        {[
          { label: 'Name', value: appt.user_name },
          { label: 'Email', value: appt.user_email },
          { label: 'Phone', value: appt.user_phone },
          { label: 'Date', value: formatDate(appt.appointment_date) },
          { label: 'Time', value: appt.appointment_time },
          ...(appt.notes ? [{ label: 'Notes', value: appt.notes }] : []),
          ...(isCancelled && appt.cancellation_reason ? [{ label: 'Reason', value: appt.cancellation_reason }] : []),
        ].map(({ label, value }) => <DetailRow key={label} label={label} value={value} />)}
      </div>
      <div className="pt-4 flex flex-col gap-2">
        {!isCancelled && (
          <div className="flex gap-2">
            <Btn variant="outline" className="flex-1" onClick={onReschedule}>Reschedule</Btn>
            <Btn variant="danger" className="flex-1" onClick={onCancel}>Cancel</Btn>
          </div>
        )}
        {isCancelled && (
          <Btn className="w-full" onClick={onNewBooking}>Book a New Appointment</Btn>
        )}
        {onBack && (
          <Btn variant="ghost" className="w-full text-xs" onClick={onBack}>← Back to Confirmation</Btn>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Cancel Confirm ───────────────────────────────────────────────────
function CancelScreen({ appt, onConfirm, onBack, cancelling }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  async function handleConfirm() {
    await onConfirm(reason, setError);
  }
  return (
    <div className="flex flex-col h-full">
      <PanelHeader title="Cancel Appointment" subtitle="This action cannot be undone." />
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-gray-700">
          Are you sure you want to cancel your appointment on{' '}
          <strong>{formatDate(appt.appointment_date)}</strong> at{' '}
          <strong>{appt.appointment_time}</strong>?
        </div>
        <Field
          id="cancel-reason"
          label="Reason (optional)"
          placeholder="e.g. Scheduling conflict"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="pt-4 flex gap-2">
        <Btn variant="outline" className="flex-1" onClick={onBack} disabled={cancelling}>← Keep</Btn>
        <Btn variant="danger" className="flex-1" onClick={handleConfirm} loading={cancelling}>Yes, Cancel</Btn>
      </div>
    </div>
  );
}

// ─── Screen: Reschedule (date) ─────────────────────────────────────────────────
// Uses DatePickerScreen (step 2) with a custom header

// ─── Main Component ────────────────────────────────────────────────────────────

const INITIAL_DATA = { user_name: '', user_email: '', user_phone: '', notes: '', appointment_date: '', appointment_time: '' };

// All possible screens:
// 'book1' | 'book2' | 'book3' | 'book4' | 'confirm' | 'manage' | 'cancel' | 'reschedule_date' | 'reschedule_time'

import { useEffect as useReactEffect } from 'react';

export default function AppointmentBookingManager({ initialAppointment = null, initialScreen = 'book1' }) {
  const [screen, setScreen] = useState(initialScreen);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [appt, setAppt] = useState(initialAppointment);
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState('');

  // Reschedule data
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduling, setRescheduling] = useState(false);

  // Cancel data
  const [cancelling, setCancelling] = useState(false);

  useReactEffect(() => {
    if (initialAppointment) {
      setAppt(initialAppointment);
      setScreen(initialScreen);
    }
  }, [initialAppointment, initialScreen]);

  function handleFormChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleBookSubmit() {
    setSubmitting(true);
    setBookError('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) { setBookError(json.error || 'Something went wrong.'); return; }
      setAppt(json.data);
      setScreen('confirm');
    } catch {
      setBookError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancel(reason, setError) {
    if (!appt?.id) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', cancellation_reason: reason }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Failed to cancel.'); return; }
      setAppt(json.data);
      setScreen('manage');
    } catch {
      setError('Network error.');
    } finally {
      setCancelling(false);
    }
  }

  async function handleReschedule() {
    if (!appt?.id || !newDate || !newTime) return;
    setRescheduling(true);
    try {
      const res = await fetch(`/api/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reschedule', appointment_date: newDate, appointment_time: newTime }),
      });
      const json = await res.json();
      if (!res.ok) return;
      setAppt(json.data);
      setNewDate('');
      setNewTime('');
      setScreen('manage');
    } catch {}
    finally { setRescheduling(false); }
  }

  function startNewBooking() {
    setFormData(INITIAL_DATA);
    setAppt(null);
    setScreen('book1');
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Fixed-size card */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden" style={{ height: 560 }}>
        <div className="h-full px-5 py-5 flex flex-col">

          {screen === 'book1' && (
            <PersonalInfoScreen
              data={formData}
              onChange={handleFormChange}
              onNext={() => setScreen('book2')}
            />
          )}

          {screen === 'book2' && (
            <DatePickerScreen
              selectedDate={formData.appointment_date}
              onDateSelect={(d) => handleFormChange('appointment_date', d)}
              onNext={() => setScreen('book3')}
              onBack={() => setScreen('book1')}
            />
          )}

          {screen === 'book3' && (
            <TimeSlotScreen
              selectedDate={formData.appointment_date}
              selectedTime={formData.appointment_time}
              onTimeSelect={(t) => handleFormChange('appointment_time', t)}
              onNext={() => setScreen('book4')}
              onBack={() => setScreen('book2')}
              header={
                <>
                  <StepIndicator currentStep={3} />
                  <PanelHeader
                    title="Select a Time"
                    subtitle={formData.appointment_date ? new Date(formData.appointment_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''}
                  />
                </>
              }
            />
          )}

          {screen === 'book4' && (
            <ReviewScreen
              data={formData}
              onSubmit={handleBookSubmit}
              onBack={() => setScreen('book3')}
              submitting={submitting}
              error={bookError}
            />
          )}

          {screen === 'confirm' && appt && (
            <ConfirmScreen
              appt={appt}
              onManage={() => setScreen('manage')}
              onNewBooking={startNewBooking}
            />
          )}

          {screen === 'manage' && appt && (
            <ManageScreen
              appt={appt}
              onReschedule={() => { setNewDate(''); setNewTime(''); setScreen('reschedule_date'); }}
              onCancel={() => setScreen('cancel')}
              onBack={() => setScreen('confirm')}
              onNewBooking={startNewBooking}
            />
          )}

          {screen === 'cancel' && appt && (
            <CancelScreen
              appt={appt}
              onConfirm={handleCancel}
              onBack={() => setScreen('manage')}
              cancelling={cancelling}
            />
          )}

          {screen === 'reschedule_date' && (
            <DatePickerScreen
              selectedDate={newDate}
              onDateSelect={setNewDate}
              onNext={() => setScreen('reschedule_time')}
              onBack={() => setScreen('manage')}
              title="Pick a New Date"
              showStepIndicator={false}
            />
          )}

          {screen === 'reschedule_time' && (
            <TimeSlotScreen
              selectedDate={newDate}
              selectedTime={newTime}
              onTimeSelect={setNewTime}
              onNext={handleReschedule}
              onBack={() => setScreen('reschedule_date')}
              nextLabel="Confirm Reschedule"
              loadingNext={rescheduling}
              header={<PanelHeader title="New Time Slot" subtitle={newDate ? format(new Date(newDate + 'T00:00:00'), 'MMMM d, yyyy') : ''} />}
            />
          )}

        </div>
      </div>
    </div>
  );
}
