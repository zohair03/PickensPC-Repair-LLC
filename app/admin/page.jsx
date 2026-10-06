import Link from 'next/link';
import { createServiceClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export const metadata = { title: 'Admin Dashboard' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createServiceClient();

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });

  const all = appointments || [];
  const confirmed = all.filter((a) => a.status === 'confirmed');
  const rescheduled = all.filter((a) => a.status === 'rescheduled');
  const cancelled = all.filter((a) => a.status === 'cancelled');

  // Today
  const today = new Date().toISOString().split('T')[0];
  const todayAppts = all.filter((a) => a.appointment_date === today && a.status !== 'cancelled');

  // Upcoming (non-cancelled, from today onwards)
  const upcoming = all
    .filter((a) => a.appointment_date >= today && a.status !== 'cancelled')
    .slice(0, 5);

  const stats = [
    { label: 'Total Appointments', value: all.length, color: 'bg-blue-50 text-blue-700 border border-blue-100' },
    { label: 'Confirmed', value: confirmed.length, color: 'bg-green-50 text-green-700 border border-green-150' },
    { label: 'Rescheduled', value: rescheduled.length, color: 'bg-yellow-50 text-yellow-700 border border-yellow-150' },
    { label: 'Cancelled', value: cancelled.length, color: 'bg-red-50 text-red-700 border border-red-150' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">Overview of your appointments status and upcoming schedule.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between h-24">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-bold text-gray-800">{value}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${color}`}>Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">
          Today's Appointments ({todayAppts.length})
        </h2>
        {todayAppts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400 shadow-sm">
            No appointments scheduled for today.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden shadow-sm">
            {todayAppts.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between px-5 py-4 gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{appt.user_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{appt.user_email} · {appt.user_phone}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200/50">{appt.appointment_time}</span>
                  <Badge status={appt.status} />
                  <Link
                    href={`/admin/appointments/${appt.id}`}
                    className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100/50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming appointments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Upcoming Appointments</h2>
          <Link href="/admin/appointments" className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100/50 transition-all">View All</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400 shadow-sm">
            No upcoming appointments.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden shadow-sm">
            {upcoming.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between px-5 py-4 gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{appt.user_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(appt.appointment_date)} · {appt.appointment_time}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <Badge status={appt.status} />
                  <Link
                    href={`/admin/appointments/${appt.id}`}
                    className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100/50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}