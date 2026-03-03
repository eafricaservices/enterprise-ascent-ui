-- ============================================================
-- E-Africa Services — Supabase Row Level Security Policies
-- Script 02: RLS Enablement & Policies
--
-- Execution order: Run AFTER 01_schema.sql.
--
-- Security model:
--   • Anonymous visitors  → can INSERT contact forms & applications,
--                           can SELECT public/active CMS content.
--   • Authenticated users → full CRUD for admin/staff operations.
--                           (Supabase auth.role() = 'authenticated')
--
-- Run via: Supabase Dashboard → SQL Editor → paste & execute
-- ============================================================


-- ============================================================
-- SECTION 1: ENABLE RLS ON ALL TABLES
-- RLS must be explicitly enabled; Supabase does not enable it
-- by default on tables created via SQL.
-- ============================================================

ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_applications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plan_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_items          ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- SECTION 2: PROFILES POLICIES
-- Only the owning user can view/edit their own profile.
-- Authenticated users (admins viewing staff list) can SELECT all.
-- ============================================================

-- Users can read their own profile
CREATE POLICY "profiles: owner can select"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles: owner can update"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Authenticated users (admin) may view all profiles
CREATE POLICY "profiles: authenticated users can select all"
  ON public.profiles
  FOR SELECT
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 3: CONTACT SUBMISSIONS POLICIES
-- • Anonymous users can INSERT (submit the contact form).
-- • Authenticated admin/staff users have full access.
-- ============================================================

-- Allow any visitor to submit the contact form
CREATE POLICY "contact_submissions: public insert"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (TRUE);

-- Authenticated users (admin panel) can read all submissions
CREATE POLICY "contact_submissions: authenticated select"
  ON public.contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can update (e.g., change status, add notes)
CREATE POLICY "contact_submissions: authenticated update"
  ON public.contact_submissions
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can delete (e.g., remove spam)
CREATE POLICY "contact_submissions: authenticated delete"
  ON public.contact_submissions
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 4: TALENT APPLICATIONS POLICIES
-- • Anonymous users can INSERT (submit the application form).
-- • Anonymous users CANNOT read back applications (privacy).
-- • Authenticated admin/staff have full access.
-- ============================================================

-- Allow any visitor to submit an application
CREATE POLICY "talent_applications: public insert"
  ON public.talent_applications
  FOR INSERT
  WITH CHECK (TRUE);

-- Authenticated users (recruitment team) can view the pipeline
CREATE POLICY "talent_applications: authenticated select"
  ON public.talent_applications
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can update status, add interview notes, etc.
CREATE POLICY "talent_applications: authenticated update"
  ON public.talent_applications
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can delete (e.g., GDPR erasure requests)
CREATE POLICY "talent_applications: authenticated delete"
  ON public.talent_applications
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 5: TESTIMONIALS POLICIES
-- • Public can read active testimonials for the marketing page.
-- • Authenticated users have full CRUD for CMS management.
-- ============================================================

-- Anyone can view active testimonials (marketing page)
CREATE POLICY "testimonials: public select active"
  ON public.testimonials
  FOR SELECT
  USING (is_active = TRUE);

-- Authenticated users can read all (including drafts/inactive)
CREATE POLICY "testimonials: authenticated select all"
  ON public.testimonials
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can create new testimonials
CREATE POLICY "testimonials: authenticated insert"
  ON public.testimonials
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can edit testimonials
CREATE POLICY "testimonials: authenticated update"
  ON public.testimonials
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can delete testimonials
CREATE POLICY "testimonials: authenticated delete"
  ON public.testimonials
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 6: FAQs POLICIES
-- • Public can read active FAQs for the marketing page.
-- • Authenticated users have full CRUD for CMS management.
-- ============================================================

CREATE POLICY "faqs: public select active"
  ON public.faqs
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "faqs: authenticated select all"
  ON public.faqs
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "faqs: authenticated insert"
  ON public.faqs
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "faqs: authenticated update"
  ON public.faqs
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "faqs: authenticated delete"
  ON public.faqs
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 7: PRICING PLANS POLICIES
-- • Public can read active pricing plans.
-- • Authenticated users have full CRUD.
-- ============================================================

CREATE POLICY "pricing_plans: public select active"
  ON public.pricing_plans
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "pricing_plans: authenticated select all"
  ON public.pricing_plans
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "pricing_plans: authenticated insert"
  ON public.pricing_plans
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "pricing_plans: authenticated update"
  ON public.pricing_plans
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "pricing_plans: authenticated delete"
  ON public.pricing_plans
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 8: PRICING PLAN FEATURES POLICIES
-- • Public can read features for active plans (JOIN-safe).
-- • Authenticated users have full CRUD.
-- ============================================================

-- Public reads features only for active plans
CREATE POLICY "pricing_plan_features: public select for active plans"
  ON public.pricing_plan_features
  FOR SELECT
  USING (
    is_active = TRUE
    AND EXISTS (
      SELECT 1
      FROM public.pricing_plans pp
      WHERE pp.id = plan_id
        AND pp.is_active = TRUE
    )
  );

CREATE POLICY "pricing_plan_features: authenticated select all"
  ON public.pricing_plan_features
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "pricing_plan_features: authenticated insert"
  ON public.pricing_plan_features
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "pricing_plan_features: authenticated update"
  ON public.pricing_plan_features
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "pricing_plan_features: authenticated delete"
  ON public.pricing_plan_features
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 9: CLIENT LOGOS POLICIES
-- • Public can read active logos for the marquee.
-- • Authenticated users have full CRUD.
-- ============================================================

CREATE POLICY "client_logos: public select active"
  ON public.client_logos
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "client_logos: authenticated select all"
  ON public.client_logos
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "client_logos: authenticated insert"
  ON public.client_logos
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "client_logos: authenticated update"
  ON public.client_logos
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "client_logos: authenticated delete"
  ON public.client_logos
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 10: SITE STATS POLICIES
-- • Public can read active stats for the StatsBar.
-- • Authenticated users have full CRUD.
-- ============================================================

CREATE POLICY "site_stats: public select active"
  ON public.site_stats
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "site_stats: authenticated select all"
  ON public.site_stats
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "site_stats: authenticated insert"
  ON public.site_stats
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "site_stats: authenticated update"
  ON public.site_stats
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "site_stats: authenticated delete"
  ON public.site_stats
  FOR DELETE
  USING (auth.role() = 'authenticated');


-- ============================================================
-- SECTION 11: IMPACT ITEMS POLICIES
-- • Public can read active impact items.
-- • Authenticated users have full CRUD.
-- ============================================================

CREATE POLICY "impact_items: public select active"
  ON public.impact_items
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "impact_items: authenticated select all"
  ON public.impact_items
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "impact_items: authenticated insert"
  ON public.impact_items
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "impact_items: authenticated update"
  ON public.impact_items
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "impact_items: authenticated delete"
  ON public.impact_items
  FOR DELETE
  USING (auth.role() = 'authenticated');
