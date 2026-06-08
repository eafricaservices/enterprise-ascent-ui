-- ── LEADS TABLE ───────────────────────────────────────────────────────────
-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS public.leads (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name   TEXT        NOT NULL,
  last_name    TEXT        NOT NULL,
  email        TEXT        NOT NULL UNIQUE,
  status       TEXT        NOT NULL DEFAULT 'reserved',
  paid         BOOLEAN     NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anon can INSERT (handled via upsert_lead RPC below — no direct INSERT needed)
-- No SELECT / UPDATE / DELETE for anon (RPC uses SECURITY DEFINER)

-- ── RPC: upsert_lead ──────────────────────────────────────────────────────
-- Called by the frontend with the anon key.
-- Uses SECURITY DEFINER so it can write without a permissive UPDATE policy.
-- Paid leads are never overwritten.
CREATE OR REPLACE FUNCTION public.upsert_lead(
  p_first_name TEXT,
  p_last_name  TEXT,
  p_email      TEXT
)
RETURNS TABLE (
  id         UUID,
  first_name TEXT,
  last_name  TEXT,
  email      TEXT,
  status     TEXT,
  paid       BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.leads (first_name, last_name, email)
  VALUES (p_first_name, p_last_name, lower(p_email))
  ON CONFLICT (email) DO UPDATE
    SET first_name = EXCLUDED.first_name,
        last_name  = EXCLUDED.last_name,
        updated_at = now()
  WHERE public.leads.paid = false;   -- never overwrite a paid customer

  RETURN QUERY
    SELECT l.id, l.first_name, l.last_name, l.email,
           l.status, l.paid, l.created_at
    FROM   public.leads l
    WHERE  l.email = lower(p_email);
END;
$$;

-- Allow the anon role to call this function
GRANT EXECUTE ON FUNCTION public.upsert_lead(TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.upsert_lead(TEXT, TEXT, TEXT) TO authenticated;

-- ── PAYSTACK WEBHOOK RLS HELPER ───────────────────────────────────────────
-- The Edge Function uses the SERVICE ROLE key, which bypasses RLS entirely.
-- Nothing extra needed here for the webhook handler.
