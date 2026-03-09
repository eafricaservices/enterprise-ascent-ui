-- ============================================================
-- E-Africa Services — Schema Update
-- Script: Add Company Name, RC Number, and Notification System
--
-- Run after 01_schema.sql, 02_rls_policies.sql, 03_storage.sql
-- ============================================================


-- ============================================================
-- SECTION 1: ADD NEW COLUMNS TO CONTACT_SUBMISSIONS
-- ============================================================

-- Add company_name column
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS company_name TEXT CHECK (char_length(company_name) <= 300);

COMMENT ON COLUMN public.contact_submissions.company_name IS
  'Name of the company/business submitting the inquiry.';

-- Add rc_number column (Registration Certificate number)
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS rc_number TEXT CHECK (char_length(rc_number) <= 50);

COMMENT ON COLUMN public.contact_submissions.rc_number IS
  'Company registration/RC number for verification purposes.';


-- ============================================================
-- SECTION 2: NOTIFICATION TABLE FOR BACKEND ALERTS
-- ============================================================

-- Notification types
DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM (
    'contact_form',         -- New contact form submission
    'talent_application',   -- New talent pool application
    'talent_profile_update' -- Talent updated their profile
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Notification status
DO $$ BEGIN
  CREATE TYPE notification_status AS ENUM (
    'pending',    -- Not yet processed
    'sent',       -- Email/notification sent
    'failed',     -- Failed to send
    'read'        -- Marked as read by admin
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Notifications table for admin alerts
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id               UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  type             notification_type   NOT NULL,
  status           notification_status NOT NULL DEFAULT 'pending',
  title            TEXT                NOT NULL,
  message          TEXT                NOT NULL,
  reference_id     UUID,               -- ID of the related record (contact_submission or talent_application)
  reference_table  TEXT,               -- Table name for the reference
  metadata         JSONB,              -- Additional data (email, name, etc.)
  created_at       TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  processed_at     TIMESTAMPTZ,
  read_at          TIMESTAMPTZ
);

COMMENT ON TABLE public.admin_notifications IS
  'Backend notification queue for alerting the E-Africa team of form submissions.';

-- Indexes for notifications
CREATE INDEX IF NOT EXISTS idx_admin_notifications_status ON public.admin_notifications (status);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_type ON public.admin_notifications (type);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created_at ON public.admin_notifications (created_at DESC);

-- Auto-update trigger
CREATE OR REPLACE TRIGGER admin_notifications_updated_at
  BEFORE UPDATE ON public.admin_notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- SECTION 3: NOTIFICATION TRIGGERS
-- ============================================================

-- Function to create notification when contact form is submitted
CREATE OR REPLACE FUNCTION public.notify_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_notifications (
    type,
    title,
    message,
    reference_id,
    reference_table,
    metadata
  ) VALUES (
    'contact_form',
    'New Contact Form Submission',
    'A new contact inquiry has been received from ' || NEW.name || ' (' || NEW.email || ')',
    NEW.id,
    'contact_submissions',
    jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'company_name', NEW.company_name,
      'rc_number', NEW.rc_number,
      'subject', NEW.subject
    )
  );
  RETURN NEW;
END;
$$;

-- Trigger for contact submissions
DROP TRIGGER IF EXISTS trigger_notify_contact_submission ON public.contact_submissions;
CREATE TRIGGER trigger_notify_contact_submission
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_contact_submission();


-- Function to create notification when talent application is submitted
CREATE OR REPLACE FUNCTION public.notify_talent_application()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.admin_notifications (
    type,
    title,
    message,
    reference_id,
    reference_table,
    metadata
  ) VALUES (
    'talent_application',
    'New Talent Pool Application',
    'A new talent application has been received from ' || NEW.full_name || ' (' || NEW.email || ') for ' || NEW.role_applied_for,
    NEW.id,
    'talent_applications',
    jsonb_build_object(
      'full_name', NEW.full_name,
      'email', NEW.email,
      'phone', NEW.phone,
      'country', NEW.country,
      'role_applied_for', NEW.role_applied_for,
      'years_experience', NEW.years_experience
    )
  );
  RETURN NEW;
END;
$$;

-- Trigger for talent applications
DROP TRIGGER IF EXISTS trigger_notify_talent_application ON public.talent_applications;
CREATE TRIGGER trigger_notify_talent_application
  AFTER INSERT ON public.talent_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_talent_application();


-- ============================================================
-- SECTION 4: RLS POLICIES FOR NOTIFICATIONS
-- ============================================================

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admins) can view notifications
CREATE POLICY "admin_notifications: authenticated select"
  ON public.admin_notifications
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update notification status
CREATE POLICY "admin_notifications: authenticated update"
  ON public.admin_notifications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ============================================================
-- SECTION 5: GRANTS
-- ============================================================

-- Allow the trigger functions to insert notifications
GRANT INSERT ON public.admin_notifications TO anon;
GRANT INSERT ON public.admin_notifications TO authenticated;
GRANT SELECT, UPDATE ON public.admin_notifications TO authenticated;
