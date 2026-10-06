import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { addDays, format, getDay } from 'date-fns';

// Helper: parse "09:00 AM" to minutes since midnight
function parseTime12h(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(' ');
  const [hourStr, minStr] = parts[0].split(':');
  const period = parts[1];
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minStr, 10);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// Helper: convert minutes since midnight to "09:00 AM"
function formatTime12h(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

// POST /api/slots/generate
// Generates slots for the next N days based on saved business hours
// Body: { days_ahead?: number } (default 14)
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const daysAhead = body.days_ahead ?? 14;

    const supabase = createServiceClient();

    // 1. Fetch saved business hours
    const { data: businessHours, error: bhError } = await supabase
      .from('business_hours')
      .select('*')
      .order('day_of_week', { ascending: true });

    if (bhError) throw bhError;
    if (!businessHours || businessHours.length === 0) {
      return NextResponse.json({ error: 'No business hours configured.' }, { status: 400 });
    }

    // Build a map: day_of_week -> config
    const hoursByDay = {};
    for (const bh of businessHours) {
      hoursByDay[bh.day_of_week] = bh;
    }

    // 2. Get all existing dates that have booked appointments (so we skip those days if re-generating)
    // We only overwrite slots on days with NO bookings at all
    const { data: bookedDates } = await supabase
      .from('appointments')
      .select('appointment_date')
      .neq('status', 'cancelled');

    const datesWithBookings = new Set((bookedDates || []).map((a) => a.appointment_date));

    // 3. Generate slots for the next N days starting from tomorrow
    const today = new Date();
    const slotsToInsert = [];
    const skippedDates = [];

    for (let i = 1; i <= daysAhead; i++) {
      const date = addDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayOfWeek = getDay(date); // 0=Sun, 6=Sat

      const config = hoursByDay[dayOfWeek];
      if (!config || !config.is_open) continue; // closed day

      // Skip if there are already bookings on this date (avoid disruption)
      if (datesWithBookings.has(dateStr)) {
        skippedDates.push(dateStr);
        continue;
      }

      const openMinutes = parseTime12h(config.open_time);
      const closeMinutes = parseTime12h(config.close_time);
      const interval = config.slot_interval ?? 30;

      if (openMinutes >= closeMinutes) continue;

      for (let t = openMinutes; t <= closeMinutes; t += interval) {
        slotsToInsert.push({
          slot_date: dateStr,
          slot_time: formatTime12h(t),
          is_blocked: false,
        });
      }
    }

    // 4. Bulk upsert slots
    let inserted = 0;
    if (slotsToInsert.length > 0) {
      // Delete existing unbooked slots for the dates we're generating, then insert fresh
      const datesToGenerate = [...new Set(slotsToInsert.map((s) => s.slot_date))];

      // Only delete slots that don't have bookings
      for (const dateStr of datesToGenerate) {
        await supabase
          .from('available_slots')
          .delete()
          .eq('slot_date', dateStr)
          .not('slot_time', 'in', `(${
            // Don't delete booked slots
            (await supabase
              .from('appointments')
              .select('appointment_time')
              .eq('appointment_date', dateStr)
              .neq('status', 'cancelled')
              .then(({ data }) => (data || []).map((a) => `"${a.appointment_time}"`).join(','))
            ) || '"__none__"'
          })`);
      }

      const { data: upserted, error: upsertErr } = await supabase
        .from('available_slots')
        .upsert(slotsToInsert, { onConflict: 'slot_date,slot_time' })
        .select();

      if (upsertErr) throw upsertErr;
      inserted = upserted?.length ?? 0;
    }

    return NextResponse.json({
      success: true,
      inserted,
      skipped_dates: skippedDates,
      message: `Generated ${inserted} slots across ${[...new Set(slotsToInsert.map(s => s.slot_date))].length} days.`,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
