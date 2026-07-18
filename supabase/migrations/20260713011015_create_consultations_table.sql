/*
# Create consultations table for PC build intake forms

1. New Tables
- `consultations`
  - `id` (uuid, primary key)
  - `name` (text, not null) — customer's full name
  - `email` (text, not null) — customer's email address
  - `tier` (text, not null) — selected PC tier (office, gaming, elite)
  - `budget` (text, not null) — customer's budget range
  - `custom_requests` (text) — optional custom requirements / preferences
  - `payment_status` (text, default 'pending') — tracks consultation payment state
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `consultations`.
- This is a no-auth public intake form, so allow anon + authenticated INSERT only.
- No SELECT/UPDATE/DELETE for anon — submissions are write-only from the frontend.
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  tier text NOT NULL,
  budget text NOT NULL,
  custom_requests text,
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_consultations" ON consultations;
CREATE POLICY "anon_insert_consultations"
ON consultations FOR INSERT
TO anon, authenticated
WITH CHECK (true);