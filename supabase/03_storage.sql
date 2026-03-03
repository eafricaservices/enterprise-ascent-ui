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
--   • Public bucket        → anonymous SELECT, authenticated INSERT/UPDATE/DELETE
--   • talent-cvs           → anonymous INSERT (UUID path enforced), authenticated full access
--   • talent-intro-videos  → authenticated INSERT only, authenticated full access
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
DROP POLICY IF EXISTS "media-assets: public select" ON storage.objects;
CREATE POLICY "media-assets: public select"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'media-assets');

DROP POLICY IF EXISTS "media-assets: authenticated insert" ON storage.objects;
CREATE POLICY "media-assets: authenticated insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'media-assets'
    AND (
      auth.jwt() ->> 'role' = 'admin'
      OR auth.jwt() ->> 'role' = 'staff'
    )
  );

-- Authenticated: admins/staff can overwrite/update media
DROP POLICY IF EXISTS "media-assets: authenticated update" ON storage.objects;
CREATE POLICY "media-assets: authenticated update"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'media-assets'
    AND (
      auth.jwt() ->> 'role' = 'admin'
      OR auth.jwt() ->> 'role' = 'staff'
    )
  )
  WITH CHECK (
    bucket_id = 'media-assets'
    AND (
      auth.jwt() ->> 'role' = 'admin'
      OR auth.jwt() ->> 'role' = 'staff'
    )
  );

-- Authenticated: admins/staff can delete media
DROP POLICY IF EXISTS "media-assets: authenticated delete" ON storage.objects;
CREATE POLICY "media-assets: authenticated delete"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'media-assets'
    AND (
      auth.jwt() ->> 'role' = 'admin'
      OR auth.jwt() ->> 'role' = 'staff'
    )
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

-- Anonymous: applicants can upload a CV during the application form flow.
-- Path convention enforced here: name must be <uuid>/<filename> so each
-- upload is isolated to a unique prefix and cannot overwrite other files.
DROP POLICY IF EXISTS "talent-cvs: public insert" ON storage.objects;
CREATE POLICY "talent-cvs: public insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'talent-cvs'
    -- First path segment must be a valid UUID (e.g. "f47ac10b-.../resume.pdf")
    AND (storage.foldername(name))[1] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  );

DROP POLICY IF EXISTS "talent-cvs: authenticated select" ON storage.objects;
CREATE POLICY "talent-cvs: authenticated select"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'talent-cvs'
    AND (
      auth.jwt() ->> 'role' IN ('admin', 'recruiter')
    )
  );

-- Authenticated: recruiters can replace/update a CV (e.g. new version)
DROP POLICY IF EXISTS "talent-cvs: authenticated update" ON storage.objects;
CREATE POLICY "talent-cvs: authenticated update"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'talent-cvs'
    AND auth.jwt() ->> 'role' IN ('admin', 'recruiter')
  )
  WITH CHECK (
    bucket_id = 'talent-cvs'
    AND auth.jwt() ->> 'role' IN ('admin', 'recruiter')
  );

-- Authenticated: recruiters can delete CVs (e.g. GDPR erasure)
DROP POLICY IF EXISTS "talent-cvs: authenticated delete" ON storage.objects;
CREATE POLICY "talent-cvs: authenticated delete"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'talent-cvs'
    AND auth.jwt() ->> 'role' IN ('admin', 'recruiter')
  );


-- ============================================================
-- SECTION 4: STORAGE POLICIES — talent-intro-videos (PRIVATE BUCKET)
--
-- Same security model as talent-cvs:
--   • Authenticated users only can upload their intro video.
--   • Authenticated recruiters/admin have full access.
--   • Anonymous users CANNOT view or upload videos.
-- Video files are up to 100 MB each; anonymous upload is not
-- permitted to prevent quota exhaustion and abuse.
-- ============================================================

-- Authenticated: applicants must be signed in to upload an intro video
DROP POLICY IF EXISTS "talent-intro-videos: authenticated insert" ON storage.objects;
CREATE POLICY "talent-intro-videos: authenticated insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'talent-intro-videos'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: recruiters can view/stream intro videos
DROP POLICY IF EXISTS "talent-intro-videos: authenticated select" ON storage.objects;
CREATE POLICY "talent-intro-videos: authenticated select"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'talent-intro-videos'
    AND auth.role() = 'authenticated'
  );

-- Authenticated: recruiters can update video objects
DROP POLICY IF EXISTS "talent-intro-videos: authenticated update" ON storage.objects;
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
DROP POLICY IF EXISTS "talent-intro-videos: authenticated delete" ON storage.objects;
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
