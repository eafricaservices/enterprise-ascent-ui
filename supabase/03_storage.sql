-- ============================================================
-- E-Africa Services — Supabase Storage Setup
-- Script 03: Buckets & Storage Object Policies
--
-- Execution order: Run AFTER 01_schema.sql and 02_rls_policies.sql.
--
-- Buckets created:
--   1. media-assets        → PUBLIC  — website images & logos
--   2. talent-cvs          → PRIVATE — applicant CV/resume uploads
--   3. talent-intro-videos → PRIVATE — applicant intro video uploads
--
-- Storage policies are applied to storage.objects.
-- For each bucket the principle of least-privilege is followed:
--   • Public bucket  → anonymous SELECT, authenticated INSERT/UPDATE/DELETE
--   • Private bucket → anonymous INSERT only, authenticated full access
--
-- Run via: Supabase Dashboard → SQL Editor → paste & execute
-- ============================================================


-- ============================================================
-- SECTION 1: CREATE STORAGE BUCKETS
--
-- Supabase stores bucket config in storage.buckets.
-- The INSERT is idempotent via ON CONFLICT DO NOTHING.
-- ============================================================

-- 1a. MEDIA ASSETS — public read, used for hero images, team photos, logos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-assets',
  'media-assets',
  TRUE,                       -- Publicly readable without auth token
  10485760,                   -- 10 MB max file size
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]
)
ON CONFLICT (id) DO NOTHING;


-- 1b. TALENT CVs — private, applicants upload their resume/CV
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'talent-cvs',
  'talent-cvs',
  FALSE,                      -- Private: requires signed URL or auth to view
  5242880,                    -- 5 MB max file size
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;


-- 1c. TALENT INTRO VIDEOS — private, applicants upload their face-only intro video
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'talent-intro-videos',
  'talent-intro-videos',
  FALSE,                      -- Private: requires signed URL or auth to view
  104857600,                  -- 100 MB max file size
  ARRAY[
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo'
  ]
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SECTION 2: STORAGE POLICIES — media-assets (PUBLIC BUCKET)
--
-- Anyone on the internet can read files (required for <img> tags
-- to display hero images, logos, etc. without auth).
-- Only authenticated admin/staff can upload, modify, or delete.
-- ============================================================

-- Public: anyone can view/download media assets
CREATE POLICY "media-assets: public select"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media-assets');

-- Authenticated: admins/staff can upload new media
CREATE POLICY "media-assets: authenticated insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'media-assets'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: admins/staff can overwrite/update media
CREATE POLICY "media-assets: authenticated update"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'media-assets'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'media-assets'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: admins/staff can delete media
CREATE POLICY "media-assets: authenticated delete"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'media-assets'
    AND auth.role() = 'authenticated'
  );


-- ============================================================
-- SECTION 3: STORAGE POLICIES — talent-cvs (PRIVATE BUCKET)
--
-- Applicants (anonymous at time of submission) can upload their
-- own CV during the application form flow.
-- Files are namespaced by a per-upload unique path (e.g. UUID/filename)
-- to prevent collisions and enumeration.
-- Authenticated admin/recruiter can view, update, and delete.
-- Anonymous users CANNOT read other applicants' files.
-- ============================================================

-- Anonymous: anyone can upload a CV (application form upload step)
-- Path convention enforced in app code: <uuid>/<original_filename>
CREATE POLICY "talent-cvs: public insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'talent-cvs');

-- Authenticated: recruiters can read/download CVs for review
CREATE POLICY "talent-cvs: authenticated select"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'talent-cvs'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: recruiters can replace/update a CV (e.g. new version)
CREATE POLICY "talent-cvs: authenticated update"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'talent-cvs'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'talent-cvs'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: recruiters can delete CVs (e.g. GDPR erasure)
CREATE POLICY "talent-cvs: authenticated delete"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'talent-cvs'
    AND auth.role() = 'authenticated'
  );


-- ============================================================
-- SECTION 4: STORAGE POLICIES — talent-intro-videos (PRIVATE BUCKET)
--
-- Same security model as talent-cvs:
--   • Anonymous applicants can upload their intro video.
--   • Authenticated recruiters/admin have full access.
--   • Anonymous users CANNOT view other applicants' videos.
-- ============================================================

-- Anonymous: anyone can upload an intro video during application
CREATE POLICY "talent-intro-videos: public insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'talent-intro-videos');

-- Authenticated: recruiters can view/stream intro videos
CREATE POLICY "talent-intro-videos: authenticated select"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'talent-intro-videos'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: recruiters can update video objects
CREATE POLICY "talent-intro-videos: authenticated update"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'talent-intro-videos'
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'talent-intro-videos'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: recruiters can delete videos (e.g. GDPR erasure)
CREATE POLICY "talent-intro-videos: authenticated delete"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'talent-intro-videos'
    AND auth.role() = 'authenticated'
  );


-- ============================================================
-- SECTION 5: HELPER FUNCTION — Generate Signed CV URL
--
-- Convenience function callable from the admin panel to generate
-- a time-limited signed URL for downloading a private CV without
-- permanently exposing the bucket.
--
-- Usage (from app code via Supabase JS):
--   supabase.storage.from('talent-cvs').createSignedUrl(path, 3600)
--
-- The function below is a server-side reference example; signed
-- URL generation is typically handled via the Supabase client SDK
-- or the Storage API, not raw SQL functions.
-- This is documented here for completeness.
-- ============================================================

/*
  NOTE: Signed URL generation is NOT done in SQL.
  Use the Supabase client in your application:

  // Generate a 1-hour signed URL for a private CV
  const { data, error } = await supabase.storage
    .from('talent-cvs')
    .createSignedUrl(application.cv_storage_path, 3600);

  // Generate a 30-minute signed URL for a private video
  const { data, error } = await supabase.storage
    .from('talent-intro-videos')
    .createSignedUrl(application.intro_video_path, 1800);
*/
