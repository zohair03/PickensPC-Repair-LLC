'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

const STATUS_FILTERS = ['all', 'confirmed', 'rescheduled', 'cancelled'];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (dateFilter) params.set('date', dateFilter);
      const res = await fetch(`/api/appointments?${params}`);
      const { data } = await res.json();
      setAppointments(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateFilter]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const filtered = appointments.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.user_name?.toLowerCase().includes(q) ||
      a.user_email?.toLowerCase().includes(q) ||
      a.user_phone?.includes(q)
    );
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">All Appointments</h1>
        <p className="text-xs text-gray-500 mt-0.5">Search, filter, and manage your customer appointments details.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            placeholder="Search name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          {(dateFilter || statusFilter !== 'all' || search) && (
            <Button variant="outline" size="sm" onClick={() => { setDateFilter(''); setStatusFilter('all'); setSearch(''); }}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-sm text-gray-400 shadow-sm flex items-center justify-center gap-2">
          <div className="animate-spin text-blue-600 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          Loading appointments...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-sm text-gray-400 shadow-sm">
          No appointments found matching your search.
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-150">
                <tr>
                  {['Name', 'Contact details', 'Appointment Date', 'Time Slot', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800">{appt.user_name}</td>
                    <td className="px-4 py-4 text-gray-500">
                      <div className="text-xs font-medium text-gray-600">{appt.user_email}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{appt.user_phone}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 font-medium">{formatDate(appt.appointment_date)}</td>
                    <td className="px-4 py-4 text-gray-600">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200/50 px-2 py-0.5 rounded-md">
                        {appt.appointment_time}
                      </span>
                    </td>
                    <td className="px-4 py-4"><Badge status={appt.status} /></td>
                    <td className="px-4 py-4 text-right">
                      <Link href={`/admin/appointments/${appt.id}`} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100/50 px-3 py-1.5 rounded-lg transition-colors">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-2">
            {filtered.map((appt) => (
              <div key={appt.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{appt.user_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{appt.user_email}</p>
                    <p className="text-xs text-gray-400">{appt.user_phone}</p>
                  </div>
                  <Badge status={appt.status} />
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">{formatDate(appt.appointment_date)} at {appt.appointment_time}</span>
                  <Link href={`/admin/appointments/${appt.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Manage →</Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-right font-medium">{filtered.length} appointment{filtered.length !== 1 ? 's' : ''} found</p>
        </>
      )}
    </div>
  );
}
