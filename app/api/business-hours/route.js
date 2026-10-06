import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

// GET /api/business-hours — returns all 7 days config
export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('business_hours')
      .select('*')
      .order('day_of_week', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/business-hours — saves full 7-day config
// Body: [{ day_of_week, is_open, open_time, close_time, slot_interval }]
export async function PUT(request) {
  try {
    const body = await request.json();
    const { schedule } = body; // array of 7 day configs

    if (!Array.isArray(schedule) || schedule.length !== 7) {
      return NextResponse.json({ error: 'schedule must be an array of 7 day configs.' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Upsert all 7 days at once
    const { data, error } = await supabase
      .from('business_hours')
      .upsert(
        schedule.map(({ day_of_week, is_open, open_time, close_time, slot_interval }) => ({
          day_of_week,
          is_open,
          open_time,
          close_time,
          slot_interval: slot_interval ?? 30,
        })),
        { onConflict: 'day_of_week' }
      )
      .select();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
