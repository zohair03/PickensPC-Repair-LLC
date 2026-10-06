'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AppointmentBookingManager from '@/components/booking/AppointmentBookingManager';
import Link from 'next/link';

export default function AppointmentManagementPage() {
  const { id } = useParams();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/appointments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Appointment not found or expired.');
        }
        return res.json();
      })
      .then(({ data }) => {
        if (!data) {
          throw new Error('Appointment not found.');
        }
        setAppt(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-base font-bold text-gray-800 hover:opacity-80 transition-opacity">
            Appointment Booking
          </Link>
          <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-100/50">
            Customer Panel
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs text-gray-400 font-medium">Retrieving booking...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm max-w-sm w-full space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-650 rounded-full flex items-center justify-center mx-auto border border-red-100">
              ⚠️
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Booking Unretrievable</h2>
              <p className="text-xs text-gray-400 mt-1">{error}</p>
            </div>
            <Link
              href="/"
              className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-4 py-2 rounded-xl transition-all w-full"
            >
              Go to Booking Home
            </Link>
          </div>
        ) : (
          <AppointmentBookingManager initialAppointment={appt} initialScreen="manage" />
        )}
      </main>
    </div>
  );
}
