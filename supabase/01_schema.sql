-- ============================================================
-- E-Africa Services — Supabase Database Schema
-- Script 01: Tables, Enums, Indexes, Triggers
--
-- Execution order: Run this script FIRST.
-- Required dependency: auth.users (built-in Supabase table)
--
-- Run via: Supabase Dashboard → SQL Editor → paste & execute
-- ============================================================


-- ============================================================
-- SECTION 1: EXTENSIONS
-- ============================================================

-- Enable UUID generation (already enabled on most Supabase projects,
-- but included here for completeness)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ============================================================
-- SECTION 2: ENUM TYPES
-- ============================================================

-- Status lifecycle for inbound contact form submissions
CREATE TYPE contact_status AS ENUM (
  'new',         -- Just received, not yet reviewed
  'in_review',   -- Being handled by an agent
  'responded',   -- A reply has been sent
  'closed'       -- No further action needed
);

-- Status lifecycle for talent pool applications
CREATE TYPE application_status AS ENUM (
  'submitted',   -- Application received
  'screening',   -- Initial screening underway
  'interview',   -- Moving to interview stage
  'pooled',      -- Added to the active talent pool
  'placed',      -- Placed with a client company
  'rejected',    -- Did not meet criteria
  'withdrawn'    -- Candidate withdrew
);

-- Pricing plan tier type
CREATE TYPE pricing_tier AS ENUM (
  'pay_as_you_go',
  'build_my_team',
  'scale_large_team'
);


-- ============================================================
-- SECTION 3: SHARED HELPER FUNCTION (updated_at trigger)
-- ============================================================

-- Reusable trigger function to auto-update the updated_at column
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


-- ============================================================
-- SECTION 4: ADMIN PROFILES
-- Mirrors auth.users for storing admin/staff metadata.
-- One row per authenticated Supabase user.
-- ============================================================

CREATE TABLE public.profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT        NOT NULL DEFAULT 'admin'
                          CHECK (role IN ('admin', 'staff')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS
  'Admin/staff user profiles linked to Supabase auth.users.';

-- Auto-insert a profile row when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 5: CONTACT SUBMISSIONS
-- Stores inbound messages from the "Get In Touch" contact form.
-- Fields mirror the Contact.tsx form: name, email, subject, message.
-- ============================================================

CREATE TABLE public.contact_submissions (
  id         UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT           NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email      TEXT           NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject    TEXT           NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 500),
  message    TEXT           NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  status     contact_status NOT NULL DEFAULT 'new',
  ip_address INET,                             -- Optional: for spam detection
  user_agent TEXT,                             -- Optional: for spam detection
  notes      TEXT,                             -- Internal admin notes
  created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.contact_submissions IS
  'Inbound contact form submissions from the website landing page.';
COMMENT ON COLUMN public.contact_submissions.ip_address IS
  'Submitter IP address captured server-side for spam/abuse tracking.';
COMMENT ON COLUMN public.contact_submissions.notes IS
  'Internal admin-only notes about this submission.';

-- Indexes for admin dashboard queries
CREATE INDEX idx_contact_submissions_status     ON public.contact_submissions (status);
CREATE INDEX idx_contact_submissions_email      ON public.contact_submissions (email);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);

CREATE TRIGGER contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 6: TALENT APPLICATIONS
-- Stores job-seeker applications from the "Join Our Talent Pool" section.
-- Steps defined in TalentPool.tsx: Apply Online → Loom Video → Interview.
-- ============================================================

CREATE TABLE public.talent_applications (
  id               UUID               PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal details
  full_name        TEXT               NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 200),
  email            TEXT               NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone            TEXT               CHECK (char_length(phone) <= 30),
  country          TEXT               NOT NULL CHECK (char_length(country) BETWEEN 1 AND 100),
  city             TEXT               CHECK (char_length(city) <= 100),

  -- Professional details
  role_applied_for TEXT               NOT NULL CHECK (char_length(role_applied_for) BETWEEN 1 AND 200),
  years_experience SMALLINT           CHECK (years_experience >= 0 AND years_experience <= 50),
  skills           TEXT[],            -- Array of skill tags
  languages        TEXT[],            -- Spoken/written languages

  -- Supporting documents (storage object paths)
  cv_storage_path  TEXT,              -- Path to CV in talent-cvs bucket
  loom_video_url   TEXT,              -- URL to the Loom intro video (external URL)
  intro_video_path TEXT,              -- Path to uploaded video in talent-intro-videos bucket

  -- Process & compliance
  terms_accepted   BOOLEAN            NOT NULL DEFAULT FALSE,
  terms_accepted_at TIMESTAMPTZ,

  -- Workflow status
  status           application_status NOT NULL DEFAULT 'submitted',
  interview_notes  TEXT,              -- Internal interviewer notes
  placed_company   TEXT,              -- Name of client company if placed
  placed_at        TIMESTAMPTZ,       -- When they were placed

  -- Spam / deduplication control
  ip_address       INET,
  user_agent       TEXT,

  created_at       TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.talent_applications IS
  'Job-seeker applications from the Join Our Talent Pool section.';
COMMENT ON COLUMN public.talent_applications.cv_storage_path IS
  'Storage object path inside the talent-cvs Supabase Storage bucket.';
COMMENT ON COLUMN public.talent_applications.loom_video_url IS
  'External Loom video URL recorded by the applicant.';
COMMENT ON COLUMN public.talent_applications.intro_video_path IS
  'Storage object path inside the talent-intro-videos Supabase Storage bucket.';
COMMENT ON COLUMN public.talent_applications.skills IS
  'Denormalised array of skill tags for flexible querying.';

-- Indexes for pipeline/recruitment queries
CREATE INDEX idx_talent_applications_status      ON public.talent_applications (status);
CREATE INDEX idx_talent_applications_email       ON public.talent_applications (email);
CREATE INDEX idx_talent_applications_country     ON public.talent_applications (country);
CREATE INDEX idx_talent_applications_created_at  ON public.talent_applications (created_at DESC);
CREATE INDEX idx_talent_applications_skills      ON public.talent_applications USING GIN (skills);
CREATE INDEX idx_talent_applications_languages   ON public.talent_applications USING GIN (languages);

-- Ensure the same email cannot submit duplicate applications in 'submitted' state
CREATE UNIQUE INDEX idx_talent_applications_email_submitted
  ON public.talent_applications (email)
  WHERE status = 'submitted';

CREATE TRIGGER talent_applications_updated_at
  BEFORE UPDATE ON public.talent_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 7: TESTIMONIALS (CMS)
-- Manages the scrolling testimonial cards shown in Testimonials.tsx.
-- Supports two display rows (row_group = 1 or 2).
-- ============================================================

CREATE TABLE public.testimonials (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  quote       TEXT        NOT NULL CHECK (char_length(quote) BETWEEN 10 AND 1000),
  author_name TEXT        NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 200),
  author_title TEXT       NOT NULL CHECK (char_length(author_title) BETWEEN 1 AND 300),
  avatar_url  TEXT,                    -- Optional avatar image URL
  row_group   SMALLINT    NOT NULL DEFAULT 1
                          CHECK (row_group IN (1, 2)), -- 1 = top row, 2 = bottom row
  sort_order  SMALLINT    NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.testimonials IS
  'CMS-managed testimonial cards displayed on the landing page.';
COMMENT ON COLUMN public.testimonials.row_group IS
  '1 = top marquee row, 2 = bottom marquee row, matching Testimonials.tsx layout.';

CREATE INDEX idx_testimonials_active_row ON public.testimonials (is_active, row_group, sort_order);

CREATE TRIGGER testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 8: FAQs (CMS)
-- Manages the accordion FAQ items shown in FAQ.tsx.
-- ============================================================

CREATE TABLE public.faqs (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  question   TEXT        NOT NULL CHECK (char_length(question) BETWEEN 5 AND 500),
  answer     TEXT        NOT NULL CHECK (char_length(answer) BETWEEN 5 AND 2000),
  sort_order SMALLINT    NOT NULL DEFAULT 0,
  is_active  BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.faqs IS
  'CMS-managed FAQ accordion items shown on the landing page.';

CREATE INDEX idx_faqs_active_order ON public.faqs (is_active, sort_order);

CREATE TRIGGER faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 9: PRICING PLANS (CMS)
-- Manages pricing tier cards shown in Pricing.tsx.
-- ============================================================

CREATE TABLE public.pricing_plans (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  tier          pricing_tier NOT NULL UNIQUE,
  name          TEXT         NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  price_display TEXT         NOT NULL CHECK (char_length(price_display) BETWEEN 1 AND 50),
  price_unit    TEXT         NOT NULL CHECK (char_length(price_unit) BETWEEN 1 AND 100),
  description   TEXT         NOT NULL CHECK (char_length(description) BETWEEN 1 AND 500),
  cta_label     TEXT         NOT NULL DEFAULT 'Get Started',
  is_featured   BOOLEAN      NOT NULL DEFAULT FALSE,
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  sort_order    SMALLINT     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.pricing_plans IS
  'CMS-managed pricing plan cards. Mirrors the plans array in Pricing.tsx.';

-- Only one plan may be featured at a time
CREATE UNIQUE INDEX idx_pricing_plans_one_featured
  ON public.pricing_plans (is_featured)
  WHERE is_featured = TRUE;

CREATE INDEX idx_pricing_plans_active_order ON public.pricing_plans (is_active, sort_order);

CREATE TRIGGER pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 10: PRICING PLAN FEATURES (CMS)
-- Child table for the feature bullet-point lists in each plan card.
-- Foreign key references pricing_plans.
-- ============================================================

CREATE TABLE public.pricing_plan_features (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id      UUID        NOT NULL REFERENCES public.pricing_plans(id) ON DELETE CASCADE,
  feature_text TEXT        NOT NULL CHECK (char_length(feature_text) BETWEEN 1 AND 300),
  sort_order   SMALLINT    NOT NULL DEFAULT 0,
  is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.pricing_plan_features IS
  'Feature bullet points belonging to a pricing plan card.';

CREATE INDEX idx_pricing_plan_features_plan ON public.pricing_plan_features (plan_id, sort_order);


-- ============================================================
-- SECTION 11: CLIENT LOGOS (CMS)
-- Manages the company logos shown in the LogoCloud marquee (LogoCloud.tsx).
-- ============================================================

CREATE TABLE public.client_logos (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT        NOT NULL CHECK (char_length(company_name) BETWEEN 1 AND 200),
  logo_url     TEXT,                    -- Optional: URL to logo image in media-assets bucket
  website_url  TEXT,                    -- Optional: company website
  sort_order   SMALLINT    NOT NULL DEFAULT 0,
  is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.client_logos IS
  'CMS-managed client/partner logos shown in the marquee carousel section.';

CREATE INDEX idx_client_logos_active_order ON public.client_logos (is_active, sort_order);

CREATE TRIGGER client_logos_updated_at
  BEFORE UPDATE ON public.client_logos
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 12: SITE STATS (CMS)
-- Manages the headline statistics shown in StatsBar.tsx.
-- e.g. "500+ Professionals Placed", "100+ Companies Partnered"
-- ============================================================

CREATE TABLE public.site_stats (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  value_display TEXT        NOT NULL CHECK (char_length(value_display) BETWEEN 1 AND 50),
  label         TEXT        NOT NULL CHECK (char_length(label) BETWEEN 1 AND 200),
  sort_order    SMALLINT    NOT NULL DEFAULT 0,
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.site_stats IS
  'CMS-managed headline statistics displayed in the StatsBar section.';

CREATE INDEX idx_site_stats_active_order ON public.site_stats (is_active, sort_order);

CREATE TRIGGER site_stats_updated_at
  BEFORE UPDATE ON public.site_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 13: IMPACT ITEMS (CMS)
-- Manages the impact cards shown in the Impact.tsx section.
-- ============================================================

CREATE TABLE public.impact_items (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name   TEXT        NOT NULL CHECK (char_length(icon_name) BETWEEN 1 AND 100),
  -- Lucide icon name, e.g. 'Heart', 'Globe', 'Briefcase'
  title       TEXT        NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  description TEXT        NOT NULL CHECK (char_length(description) BETWEEN 1 AND 500),
  sort_order  SMALLINT    NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.impact_items IS
  'CMS-managed impact cards displayed in the Our Impact section.';
COMMENT ON COLUMN public.impact_items.icon_name IS
  'Lucide React icon name as a string, e.g. Heart, Globe, Briefcase.';

CREATE INDEX idx_impact_items_active_order ON public.impact_items (is_active, sort_order);

CREATE TRIGGER impact_items_updated_at
  BEFORE UPDATE ON public.impact_items
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 14: SEED DATA
-- Initial content matching the static arrays in the codebase.
-- Safe to re-run; uses INSERT ... ON CONFLICT DO NOTHING.
-- ============================================================

-- Seed: Pricing Plans
INSERT INTO public.pricing_plans (tier, name, price_display, price_unit, description, cta_label, is_featured, sort_order)
VALUES
  ('pay_as_you_go',    'Pay-As-You-Go',     '$13',       'per team member / hour', 'Ideal for companies needing flexible, on-demand remote talent.',                                                   'Start Hiring',            FALSE, 1),
  ('build_my_team',    'Build My Team',     'Custom',    'tailored pricing',       'Custom-built remote teams with tailored skill combinations and structured departments.',                           'Get a Quote',             TRUE,  2),
  ('scale_large_team', 'Scale Large Team',  'Enterprise','100–1000+ members',      'For companies hiring at scale with full infrastructure deployment.',                                               'Schedule Strategic Call', FALSE, 3)
ON CONFLICT (tier) DO NOTHING;

-- Seed: Pricing Plan Features (Pay-As-You-Go)
WITH plan AS (SELECT id FROM public.pricing_plans WHERE tier = 'pay_as_you_go')
INSERT INTO public.pricing_plan_features (plan_id, feature_text, sort_order)
SELECT plan.id, feat.feature_text, feat.sort_order FROM plan,
(VALUES
  ('Customer Service & Virtual Assistants', 1),
  ('Data Entry, Coding & Bookkeeping',       2),
  ('Dedicated Client Success Manager',       3),
  ('Home Office Certification',              4),
  ('US Hours Availability',                  5),
  ('Payroll & Compliance Management',        6),
  ('English Assessment & Interview Screening', 7)
) AS feat(feature_text, sort_order)
ON CONFLICT DO NOTHING;

-- Seed: Pricing Plan Features (Build My Team)
WITH plan AS (SELECT id FROM public.pricing_plans WHERE tier = 'build_my_team')
INSERT INTO public.pricing_plan_features (plan_id, feature_text, sort_order)
SELECT plan.id, feat.feature_text, feat.sort_order FROM plan,
(VALUES
  ('Custom team structure design',      1),
  ('Assigned dashboards & workflows',   2),
  ('Dedicated management layer',        3),
  ('Payroll & compliance handled',      4),
  ('Skill-matched professionals',       5),
  ('Ongoing performance tracking',      6)
) AS feat(feature_text, sort_order)
ON CONFLICT DO NOTHING;

-- Seed: Pricing Plan Features (Scale Large Team)
WITH plan AS (SELECT id FROM public.pricing_plans WHERE tier = 'scale_large_team')
INSERT INTO public.pricing_plan_features (plan_id, feature_text, sort_order)
SELECT plan.id, feat.feature_text, feat.sort_order FROM plan,
(VALUES
  ('Infrastructure deployment',   1),
  ('Management layer setup',      2),
  ('CRM integrations',            3),
  ('Workforce analytics',         4),
  ('Strategic account oversight', 5),
  ('Dedicated scaling partner',   6)
) AS feat(feature_text, sort_order)
ON CONFLICT DO NOTHING;

-- Seed: FAQs
INSERT INTO public.faqs (question, answer, sort_order)
VALUES
  ('How do you handle payments?',             'We manage cross-border payroll through secure global payment systems. Clients pay E-Africa. We pay contractors.',                                                       1),
  ('Who handles taxes and legal compliance?', 'Contractors manage their own tax obligations. We handle structured contracts and compliance alignment.',                                                                2),
  ('Can I interview the talent myself?',      'Yes. You may join final interviews and select from shortlisted candidates.',                                                                                           3),
  ('How do I know your talent is qualified?', 'We use a multi-stage vetting system including English testing, structured interviews, and senior partner evaluation.',                                                 4),
  ('What about power and internet reliability?', 'We prioritize professionals with stable internet and backup power systems.',                                                                                        5),
  ('What if I need to scale quickly?',        'Our infrastructure supports rapid deployment of structured teams — from 10 to 1,000+ members.',                                                                        6),
  ('What makes you different from LinkedIn hiring?', 'LinkedIn gives you profiles. We give you performance-ready professionals with structure, payroll, and management systems included.',                            7)
ON CONFLICT DO NOTHING;

-- Seed: Site Stats
INSERT INTO public.site_stats (value_display, label, sort_order)
VALUES
  ('500+', 'Professionals Placed',  1),
  ('100+', 'Companies Partnered',   2),
  ('25+',  'African Countries',     3),
  ('6',    'Languages Supported',   4)
ON CONFLICT DO NOTHING;

-- Seed: Impact Items
INSERT INTO public.impact_items (icon_name, title, description, sort_order)
VALUES
  ('Heart',     'Families Empowered',      'Families across Africa better support themselves through stable remote employment.',                1),
  ('Briefcase', 'Global Careers',          'Young professionals build global careers without leaving their communities.',                      2),
  ('Globe',     'Multilingual Placement',  'Multilingual talent finds rightful placement in international companies.',                         3),
  ('TrendingUp','GDP Growth',              'Contributing to GDP growth across multiple African nations.',                                      4),
  ('Shield',    'Ethical Employment',      'Structured, ethical remote employment with full compliance.',                                      5),
  ('Users',     'Community Impact',        'Creating borderless economic opportunity through trusted remote work.',                            6)
ON CONFLICT DO NOTHING;

-- Seed: Client Logos
INSERT INTO public.client_logos (company_name, sort_order)
VALUES
  ('TechCorp Africa',    1),
  ('Global Solutions',   2),
  ('Innovation Hub',     3),
  ('Digital Ventures',   4),
  ('Enterprise Systems', 5),
  ('Future Tech',        6),
  ('Excellence Group',   7)
ON CONFLICT DO NOTHING;

-- Seed: Testimonials (Row 1)
INSERT INTO public.testimonials (quote, author_name, author_title, row_group, sort_order)
VALUES
  ('We tried hiring independently through LinkedIn and Upwork. It was inconsistent. E-Africa delivered structured, reliable professionals who integrated seamlessly.',
   'Sarah Mitchell',  'VP of Operations, TechScale Inc.',   1, 1),
  ('We planned to scale slowly. With E-Africa, we scaled twice as fast with better performance.',
   'James Okonkwo',   'CEO, AfriGrowth Partners',           1, 2),
  ('The difference wasn''t just talent — it was infrastructure. Payroll, compliance, management — all handled.',
   'Linda Chen',      'HR Director, GlobalReach',           1, 3),
  ('E-Africa''s vetting process is thorough. Every candidate we received was interview-ready and exceeded expectations.',
   'David Mensah',    'Founder, NovaStack',                 1, 4)
ON CONFLICT DO NOTHING;

-- Seed: Testimonials (Row 2)
INSERT INTO public.testimonials (quote, author_name, author_title, row_group, sort_order)
VALUES
  ('Within two weeks of submitting our hiring request, we had a full customer success team operational. The speed was remarkable.',
   'Patricia Adeyemi', 'COO, FinBridge Africa',            2, 1),
  ('As a startup, we couldn''t afford hiring mistakes. E-Africa eliminated the risk entirely. Our remote team feels like an in-house extension.',
   'Michael Torres',  'CTO, Launchpad Digital',            2, 2),
  ('The multilingual capabilities were a game-changer. We needed French and English speakers — E-Africa delivered perfectly.',
   'Isabelle Dubois',  'Expansion Lead, EuroConnect',      2, 3),
  ('I joined E-Africa''s talent pool and within a month was placed at a US company. The process was professional from start to finish.',
   'Chidinma Okafor',  'Remote Customer Success Manager',  2, 4)
ON CONFLICT DO NOTHING;
