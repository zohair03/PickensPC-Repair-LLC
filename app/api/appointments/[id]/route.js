import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/mailer';
import {
  rescheduledUser, rescheduledAdmin,
  cancelledUser, cancelledAdmin,
} from '@/lib/email/templates';

// GET /api/appointments/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH /api/appointments/[id] — reschedule or cancel
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, appointment_date, appointment_time, cancellation_reason } = body;

    const supabase = createServiceClient();

    // Fetch existing appointment
    const { data: existing, error: fetchErr } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (existing.status === 'cancelled') {
      return NextResponse.json({ error: 'Cannot modify a cancelled appointment.' }, { status: 409 });
    }

    let updatePayload = {};

    if (action === 'reschedule') {
      if (!appointment_date || !appointment_time) {
        return NextResponse.json({ error: 'New date and time are required.' }, { status: 400 });
      }

      // Check new slot availability
      const { data: conflict } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointment_date', appointment_date)
        .eq('appointment_time', appointment_time)
        .neq('status', 'cancelled')
        .neq('id', id);

      if (conflict && conflict.length >= 1) {
        return NextResponse.json({ error: 'New time slot is not available.' }, { status: 409 });
      }

      updatePayload = { status: 'rescheduled', appointment_date, appointment_time };
    } else if (action === 'cancel') {
      updatePayload = { status: 'cancelled', cancellation_reason: cancellation_reason || '' };
    } else {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('appointments')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Send emails
    const adminEmail = process.env.ADMIN_EMAIL;
    try {
      if (action === 'reschedule') {
        await sendEmail({ to: data.user_email, ...rescheduledUser(data) });
        if (adminEmail) await sendEmail({ to: adminEmail, ...rescheduledAdmin(data) });
      } else if (action === 'cancel') {
        await sendEmail({ to: data.user_email, ...cancelledUser(data) });
        if (adminEmail) await sendEmail({ to: adminEmail, ...cancelledAdmin(data) });
      }
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
