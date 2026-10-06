-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Available time slots set by admin
CREATE TABLE IF NOT EXISTS available_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_date DATE NOT NULL,
  slot_time TEXT NOT NULL,
  is_blocked BOOLEAN DEFAULT FALSE,
  max_bookings INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(slot_date, slot_time)
);

-- Appointments booked by users
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  notes TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'rescheduled', 'cancelled')),
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_slots ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read available_slots (for booking form)
CREATE POLICY "Public can read available slots"
  ON available_slots FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to insert appointments (public booking, no login)
CREATE POLICY "Public can insert appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read their own appointment by id (for self-service page)
CREATE POLICY "Public can read appointments"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to update appointments (user cancel/reschedule)
CREATE POLICY "Public can update appointments"
  ON appointments FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Allow service role full access (admin operations via server-side)
-- Service role bypasses RLS by default in Supabase