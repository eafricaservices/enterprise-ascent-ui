-- ============================================================
-- Migration: Add speed_test_url column to talent_applications
-- ============================================================

-- Add the speed_test_url column if it doesn't exist
ALTER TABLE public.talent_applications
ADD COLUMN IF NOT EXISTS speed_test_url TEXT;

COMMENT ON COLUMN public.talent_applications.speed_test_url IS
  'External Speedtest.net results URL showing internet connection speed.';
