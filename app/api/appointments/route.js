import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/mailer';
import { bookingConfirmedUser, bookingConfirmedAdmin } from '@/lib/email/templates';

// GET /api/appointments — Admin: list all appointments (requires server auth check)
export async function GET(request) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    let query = supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true });

    if (status && status !== 'all') query = query.eq('status', status);
    if (date) query = query.eq('appointment_date', date);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/appointments — Public: create a new appointment
export async function POST(request) {
  try {
    const body = await request.json();
    const { user_name, user_email, user_phone, notes, appointment_date, appointment_time } = body;

    if (!user_name || !user_email || !user_phone || !appointment_date || !appointment_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Check slot is still available
    const { data: existing } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', appointment_date)
      .eq('appointment_time', appointment_time)
      .neq('status', 'cancelled');

    if (existing && existing.length >= 1) {
      return NextResponse.json({ error: 'This time slot is no longer available.' }, { status: 409 });
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert({ user_name, user_email, user_phone, notes, appointment_date, appointment_time, status: 'confirmed' })
      .select()
      .single();

    if (error) throw error;

    // Send emails
    const adminEmail = process.env.ADMIN_EMAIL;
    try {
      const userMail = bookingConfirmedUser(data);
      await sendEmail({ to: user_email, ...userMail });
      if (adminEmail) {
        const adminMail = bookingConfirmedAdmin(data);
        await sendEmail({ to: adminEmail, ...adminMail });
      }
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
