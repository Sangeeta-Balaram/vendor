-- Paste this in Supabase SQL Editor (Project Dashboard → SQL Editor)
-- Run the ENTIRE file at once.

------------------- EXISTING TABLES (keep these) -------------------

CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  type TEXT DEFAULT 'contact',
  solution TEXT,
  plan TEXT,
  budget TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  solution TEXT,
  plan TEXT,
  budget TEXT
);

CREATE TABLE IF NOT EXISTS quotes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  solution TEXT NOT NULL,
  plan TEXT,
  plan_price TEXT,
  services TEXT,
  services_subtotal TEXT,
  discount TEXT,
  gst TEXT,
  total TEXT NOT NULL,
  proposal_pdf TEXT
);

CREATE TABLE IF NOT EXISTS price_overrides (
  id TEXT PRIMARY KEY,
  price INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

------------------- NEW TABLES -------------------

-- Client CRM (linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS clients (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company TEXT,
  notes TEXT
);

-- Negotiation tracking
CREATE TABLE IF NOT EXISTS negotiations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  client_id BIGINT REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  solution TEXT,
  plan TEXT,
  original_total INTEGER NOT NULL,
  negotiated_total INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected')),
  notes TEXT
);

-- Agreements
CREATE TABLE IF NOT EXISTS agreements (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  client_id BIGINT REFERENCES clients(id) ON DELETE SET NULL,
  quote_id BIGINT REFERENCES quotes(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  solution TEXT,
  plan TEXT,
  services TEXT,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','sent','signed','completed','cancelled')),
  signed_at TIMESTAMPTZ,
  pdf_url TEXT
);

-- Onboarding stages (master list)
CREATE TABLE IF NOT EXISTS onboarding_stages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Client onboarding progress
CREATE TABLE IF NOT EXISTS onboarding (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  client_id BIGINT REFERENCES clients(id) ON DELETE CASCADE,
  agreement_id BIGINT REFERENCES agreements(id) ON DELETE SET NULL,
  stage_id BIGINT REFERENCES onboarding_stages(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  notes TEXT
);

-- Page views for visitor tracking
DO $$ BEGIN
  CREATE TYPE page_type AS ENUM ('home', 'solution', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS page_views (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  page page_type NOT NULL,
  slug TEXT
);

-- Partner resource access tracking
CREATE TABLE IF NOT EXISTS resource_access (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  resource TEXT NOT NULL,
  partner_name TEXT DEFAULT ''
);

-- Admin-managed resources
CREATE TABLE IF NOT EXISTS resources (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Guide',
  body TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

------------------- ROW LEVEL SECURITY -------------------

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE negotiations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Anon access (public forms & price overrides)
DROP POLICY IF EXISTS "anon insert contacts" ON contacts;
CREATE POLICY "anon insert contacts" ON contacts FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon insert bookings" ON bookings;
CREATE POLICY "anon insert bookings" ON bookings FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon insert page_views" ON page_views;
CREATE POLICY "anon insert page_views" ON page_views FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon select price_overrides" ON price_overrides;
CREATE POLICY "anon select price_overrides" ON price_overrides FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "anon select page_views" ON page_views;
CREATE POLICY "anon select page_views" ON page_views FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "anon insert quotes" ON quotes;
CREATE POLICY "anon insert quotes" ON quotes FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon insert negotiations" ON negotiations;
CREATE POLICY "anon insert negotiations" ON negotiations FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "anon insert resource_access" ON resource_access;
CREATE POLICY "anon insert resource_access" ON resource_access FOR INSERT TO anon WITH CHECK (true);

-- Authenticated users can see their own client data
DROP POLICY IF EXISTS "auth select own client" ON clients;
CREATE POLICY "auth select own client" ON clients FOR SELECT TO authenticated USING (auth_id = auth.uid());
DROP POLICY IF EXISTS "auth select own negotiations" ON negotiations;
CREATE POLICY "auth select own negotiations" ON negotiations FOR SELECT TO authenticated USING (email = (SELECT email FROM clients WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "auth select own agreements" ON agreements;
CREATE POLICY "auth select own agreements" ON agreements FOR SELECT TO authenticated USING (email = (SELECT email FROM clients WHERE auth_id = auth.uid()));

-- Anon can read resources (public)
DROP POLICY IF EXISTS "anon select resources" ON resources;
CREATE POLICY "anon select resources" ON resources FOR SELECT TO anon USING (true);

-- Service account / anon can insert clients (from portal signup)
DROP POLICY IF EXISTS "anon insert clients" ON clients;
CREATE POLICY "anon insert clients" ON clients FOR INSERT TO anon WITH CHECK (true);

------------------- ONBOARDING STAGES (seed data) -------------------

INSERT INTO onboarding_stages (name, sort_order)
SELECT * FROM (VALUES
  ('Discovery Call', 1),
  ('Proposal Sent', 2),
  ('Agreement Signed', 3),
  ('Deposit Received', 4),
  ('Project Kickoff', 5),
  ('Milestone 1', 6),
  ('Milestone 2', 7),
  ('Milestone 3', 8),
  ('Client Review', 9),
  ('Final Delivery', 10),
  ('Project Complete', 11)
) AS v(name, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM onboarding_stages);

------------------- ADMIN USERS -------------------

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert admin user (username: admin, password: 2704290419)
-- Password is SHA-256 hashed
INSERT INTO admin_users (username, password_hash)
SELECT 'admin', '65f92298a3d404f7a615d53d922b17074dd1cc669d6b0c9ebad12241e0b2e25f'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- Only authenticated (by application logic) can read - we use service_role key via supabase client in admin API routes
