'use client';

import Button from '@/components/ui/Button';

export default function ReviewStep({ data, onSubmit, onBack, submitting, error }) {
  const rows = [
    { label: 'Name', value: data.user_name },
    { label: 'Email', value: data.user_email },
    { label: 'Phone', value: data.user_phone },
    {
      label: 'Date',
      value: data.appointment_date
        ? new Date(data.appointment_date + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })
        : '',
    },
    { label: 'Time', value: data.appointment_time },
    ...(data.notes ? [{ label: 'Notes', value: data.notes }] : []),
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Review & Confirm</h2>
      <p className="text-sm text-gray-500">Please confirm your appointment details before submitting.</p>

      <div className="border rounded-lg divide-y">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-4 px-4 py-3">
            <span className="text-sm text-gray-500 w-20 shrink-0">{label}</span>
            <span className="text-sm text-gray-800 font-medium">{value}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} disabled={submitting}>← Back</Button>
        <Button onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
}
