'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import DatePickerStep from '@/components/booking/DatePickerStep';
import TimeSlotStep from '@/components/booking/TimeSlotStep';
import { formatDate } from '@/lib/utils';

export default function AdminAppointmentDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cancel
  const [showCancel, setShowCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  // Reschedule
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleStep, setRescheduleStep] = useState(1);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduling, setRescheduling] = useState(false);

  const [actionError, setActionError] = useState('');

  useEffect(() => {
    fetch(`/api/appointments/${id}`)
      .then((r) => r.json())
      .then(({ data, error }) => {
        if (error || !data) setError('Appointment not found.');
        else setAppt(data);
      })
      .catch(() => setError('Failed to load.'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleCancel() {
    setCancelling(true);
    setActionError('');
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', cancellation_reason: cancelReason }),
      });
      const json = await res.json();
      if (!res.ok) { setActionError(json.error || 'Failed to cancel.'); return; }
      setAppt(json.data);
      setShowCancel(false);
    } catch { setActionError('Network error.'); }
    finally { setCancelling(false); }
  }

  async function handleReschedule() {
    if (!newDate || !newTime) return;
    setRescheduling(true);
    setActionError('');
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reschedule', appointment_date: newDate, appointment_time: newTime }),
      });
      const json = await res.json();
      if (!res.ok) { setActionError(json.error || 'Failed to reschedule.'); return; }
      setAppt(json.data);
      setShowReschedule(false);
      setNewDate(''); setNewTime(''); setRescheduleStep(1);
    } catch { setActionError('Network error.'); }
    finally { setRescheduling(false); }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-400 gap-2">
        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading details...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center p-8 bg-white border border-gray-200 rounded-2xl max-w-sm mx-auto shadow-sm">
        <p className="text-red-650 text-sm font-semibold mb-4">{error}</p>
        <Link href="/admin/appointments" className="text-xs font-semibold text-blue-600 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
          ← Back to Appointments
        </Link>
      </div>
    );
  }

  const isCancelled = appt.status === 'cancelled';
  const bookedAt = new Date(appt.created_at).toLocaleString();
  const updatedAt = new Date(appt.updated_at).toLocaleString();

  return (
    <div className="space-y-5 max-w-xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <Link href="/admin/appointments" className="hover:text-gray-700 transition-colors">Appointments</Link>
        <span>/</span>
        <span className="text-gray-600">{appt.user_name}</span>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
        <div>
          <h1 className="text-base font-bold text-gray-800">Appointment Detail</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5 font-medium">Manage specific booking configuration</p>
        </div>
        <Badge status={appt.status} className="scale-105" />
      </div>

      {/* Details card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
        {[
          { label: 'Name', value: appt.user_name },
          { label: 'Email', value: appt.user_email },
          { label: 'Phone', value: appt.user_phone },
          { label: 'Date', value: formatDate(appt.appointment_date) },
          { label: 'Time', value: appt.appointment_time },
          ...(appt.notes ? [{ label: 'Notes', value: appt.notes }] : []),
          ...(isCancelled && appt.cancellation_reason ? [{ label: 'Cancel Reason', value: appt.cancellation_reason }] : []),
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50/20 transition-colors">
            <span className="text-[10px] font-semibold text-gray-450 uppercase tracking-wider w-24 shrink-0 pt-0.5">{label}</span>
            <span className="text-sm text-gray-800 font-semibold flex-1 leading-normal">{value}</span>
          </div>
        ))}
      </div>

      {/* Timestamps */}
      <div className="flex justify-between items-center px-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
        <span>Booked: {bookedAt}</span>
        <span>Updated: {updatedAt}</span>
      </div>

      {/* Actions */}
      {!isCancelled && (
        <div className="flex gap-3 bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
          <Button className="flex-1" onClick={() => { setShowReschedule(true); setActionError(''); }}>
            Reschedule
          </Button>
          <Button variant="danger" className="flex-1" onClick={() => { setShowCancel(true); setActionError(''); }}>
            Cancel Appointment
          </Button>
        </div>
      )}

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        title="Cancel Appointment"
        footer={
          <>
            <Button variant="outline" size="sm" className="px-4" onClick={() => setShowCancel(false)} disabled={cancelling}>Keep</Button>
            <Button variant="danger" size="sm" className="px-4" onClick={handleCancel} loading={cancelling}>
              Confirm Cancel
            </Button>
          </>
        }
      >
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Are you sure you want to cancel the appointment for <strong className="text-gray-800">{appt.user_name}</strong> on <strong className="text-gray-800">{formatDate(appt.appointment_date)}</strong> at <strong className="text-gray-800">{appt.appointment_time}</strong>?
        </p>
        <Input
          id="admin-cancel-reason"
          label="Cancellation Reason (optional)"
          placeholder="e.g. Host unavailable, client request"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
        {actionError && <p className="mt-3 text-xs text-red-500 font-medium">{actionError}</p>}
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        isOpen={showReschedule}
        onClose={() => { setShowReschedule(false); setRescheduleStep(1); setNewDate(''); setNewTime(''); }}
        title="Reschedule Appointment"
      >
        {rescheduleStep === 1 && (
          <DatePickerStep
            selectedDate={newDate}
            onDateSelect={setNewDate}
            onNext={() => setRescheduleStep(2)}
            onBack={() => setShowReschedule(false)}
          />
        )}
        {rescheduleStep === 2 && (
          <div>
            <TimeSlotStep
              selectedDate={newDate}
              selectedTime={newTime}
              onTimeSelect={setNewTime}
              onNext={handleReschedule}
              onBack={() => setRescheduleStep(1)}
            />
            {actionError && <p className="mt-3 text-xs text-red-500 font-medium">{actionError}</p>}
            {rescheduling && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 justify-center">
                <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Rescheduling...
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
