-- ============================================================
-- Migration: Add portfolio_url column to talent_applications
-- ============================================================

-- Add the portfolio_url column if it doesn't exist
ALTER TABLE public.talent_applications
ADD COLUMN IF NOT EXISTS portfolio_url TEXT;

COMMENT ON COLUMN public.talent_applications.portfolio_url IS
  'Optional link to the applicant''s portfolio or work samples.';
