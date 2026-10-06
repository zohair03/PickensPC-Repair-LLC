import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { addDays, format, getDay, parseISO, startOfDay } from 'date-fns';

// ─── Time Helpers ─────────────────────────────────────────────────────────────
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

function formatTime12h(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

function generateSlotsFromConfig(config) {
  if (!config || !config.is_open) return [];
  const openMins = parseTime12h(config.open_time);
  const closeMins = parseTime12h(config.close_time);
  const interval = config.slot_interval ?? 30;
  const result = [];
  for (let t = openMins; t <= closeMins; t += interval) {
    result.push(formatTime12h(t));
  }
  return result;
}

// GET /api/slots?date=YYYY-MM-DD  — public/admin slot query
// GET /api/slots                  — returns dates that have available slots (next 14 days)
// GET /api/slots?date=X&admin=true — also returns blocked overrides for admin
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const isAdmin = searchParams.get('admin') === 'true';

    const supabase = createServiceClient();
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 14);
    const tomorrowStr = format(addDays(today, 1), 'yyyy-MM-dd');
    const maxDateStr = format(maxDate, 'yyyy-MM-dd');

    // Always fetch business hours (needed for dynamic slot generation)
    const { data: businessHours, error: bhError } = await supabase
      .from('business_hours')
      .select('*')
      .order('day_of_week');

    if (bhError) throw bhError;

    const hoursByDay = {};
    for (const bh of (businessHours || [])) {
      hoursByDay[bh.day_of_week] = bh;
    }

    // ── Single date query ──────────────────────────────────────────────────────
    if (date) {
      const requestedDate = parseISO(date + 'T00:00:00');
      const dayOfWeek = getDay(requestedDate);
      const config = hoursByDay[dayOfWeek];

      // Generate auto slots from business hours for this day
      const autoSlotTimes = generateSlotsFromConfig(config);

      // Fetch manual overrides (additions and blocks) for this date
      const { data: overrides } = await supabase
        .from('available_slots')
        .select('*')
        .eq('slot_date', date);

      const blockedTimes = new Set(
        (overrides || []).filter((s) => s.is_blocked).map((s) => s.slot_time)
      );
      const manualAdditions = (overrides || []).filter((s) => !s.is_blocked);
      const manualAddedTimes = new Set(manualAdditions.map((m) => m.slot_time));

      // Final active times: (auto − blocked) + manual additions not already in auto
      const finalTimes = [
        ...autoSlotTimes.filter((t) => !blockedTimes.has(t)),
        ...manualAdditions.map((m) => m.slot_time).filter((t) => !autoSlotTimes.includes(t)),
      ];
      finalTimes.sort((a, b) => parseTime12h(a) - parseTime12h(b));

      // Get booked appointments for this date
      const { data: booked } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', date)
        .neq('status', 'cancelled');

      const bookedTimes = new Set((booked || []).map((b) => b.appointment_time));

      // Build active slot objects
      const activeSlots = finalTimes.map((time) => {
        const manualRow = manualAdditions.find((m) => m.slot_time === time);
        return {
          // Use real DB id for manual rows, synthetic for auto-generated
          id: manualRow?.id ?? `bh_${date}_${time}`,
          slot_date: date,
          slot_time: time,
          is_blocked: false,
          is_available: !bookedTimes.has(time),
          is_auto: !manualRow, // true = from business hours, false = manually added
        };
      });

      if (isAdmin) {
        // Also return blocked overrides so the admin can see & restore them
        const blockedSlots = (overrides || [])
          .filter((s) => s.is_blocked)
          .map((s) => ({ ...s, is_available: false, is_auto: true }));
        return NextResponse.json({ data: activeSlots, blocked: blockedSlots });
      }

      return NextResponse.json({ data: activeSlots });
    }

    // ── No date: return dates that have available slots (for calendar dots) ────
    const { data: overrides } = await supabase
      .from('available_slots')
      .select('slot_date, slot_time, is_blocked')
      .gte('slot_date', tomorrowStr)
      .lte('slot_date', maxDateStr);

    // Group overrides by date
    const blockedByDate = {};
    const addedByDate = {};
    for (const o of (overrides || [])) {
      if (o.is_blocked) {
        if (!blockedByDate[o.slot_date]) blockedByDate[o.slot_date] = new Set();
        blockedByDate[o.slot_date].add(o.slot_time);
      } else {
        if (!addedByDate[o.slot_date]) addedByDate[o.slot_date] = [];
        addedByDate[o.slot_date].push(o.slot_time);
      }
    }

    // For each day in next 14 days, compute whether it has any available slots
    const availableDates = [];
    for (let i = 1; i <= 14; i++) {
      const d = addDays(today, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const dayOfWeek = getDay(d);
      const config = hoursByDay[dayOfWeek];
      const autoSlots = generateSlotsFromConfig(config);
      const blocked = blockedByDate[dateStr] || new Set();
      const manualAdded = addedByDate[dateStr] || [];

      const activeAutoCount = autoSlots.filter((t) => !blocked.has(t)).length;
      const manualCount = manualAdded.length;

      if (activeAutoCount + manualCount > 0) {
        availableDates.push({ slot_date: dateStr });
      }
    }

    return NextResponse.json({ data: availableDates });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/slots — admin: add a manual slot OR create a block override
// Body: { slot_date, slot_time, is_blocked? }
export async function POST(request) {
  try {
    const body = await request.json();
    const { slot_date, slot_time, is_blocked } = body;
    if (!slot_date || !slot_time) {
      return NextResponse.json({ error: 'slot_date and slot_time are required.' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('available_slots')
      .upsert(
        { slot_date, slot_time, is_blocked: is_blocked ?? false },
        { onConflict: 'slot_date,slot_time' }
      )
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/slots — admin: remove a manual slot OR restore a blocked slot
// Body: { id } for manual slots with real UUID
// Body: { slot_date, slot_time } for auto-generated blocks (removes the block row)
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id, slot_date, slot_time } = body;
    const supabase = createServiceClient();

    if (id && !id.startsWith('bh_')) {
      // Real DB row — delete by ID
      const { error } = await supabase.from('available_slots').delete().eq('id', id);
      if (error) throw error;
    } else if (slot_date && slot_time) {
      // Block override or auto slot — delete by date+time
      const { error } = await supabase
        .from('available_slots')
        .delete()
        .eq('slot_date', slot_date)
        .eq('slot_time', slot_time);
      if (error) throw error;
    } else {
      return NextResponse.json({ error: 'Provide id or (slot_date + slot_time).' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
