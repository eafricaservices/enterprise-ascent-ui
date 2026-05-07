# process-notifications (Manual Studio Upload)

This function reads pending rows from `public.admin_notifications`, sends email via SendGrid, and marks each row as `sent` or `failed`.

## 1) Create the function in Supabase Studio

1. Open your Supabase project.
2. Go to **Edge Functions**.
3. Click **Create function**.
4. Name it `process-notifications`.
5. In the editor, paste the contents of local file:
   - `supabase/functions/process-notifications/index.ts`
6. Save/Deploy the function.

## 2) Add required secrets

In Supabase Studio, go to **Project Settings** -> **Edge Functions** -> **Secrets** and add:

- `SENDGRID_API_KEY` = your SendGrid API key
- `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
- `ADMIN_EMAIL` = `eafrica.ng@gmail.com`

Notes:
- `SUPABASE_URL` is available in Supabase runtime automatically.
- Your SendGrid sender email must be verified (the function uses `no-reply@eafricaservices.com`).

## 3) Run a quick test

1. Insert a test row into `public.admin_notifications` with `status = 'pending'`.
2. In Studio, open the deployed function and click **Invoke** (POST).
3. Confirm the row changes to `sent` (or `failed` with `metadata.send_error`).

## 4) Schedule automatic processing

Set a schedule to invoke this function every 1 minute (via Supabase Scheduled Functions or your external scheduler).

Recommended:
- Frequency: every 1 minute
- Method: `POST`
- Target: your `process-notifications` function endpoint

## 5) Troubleshooting

- If status becomes `failed`, inspect `metadata.send_error` in `admin_notifications`.
- If mail is not delivered, verify SendGrid API key permissions and sender/domain verification.
- If no rows are processed, confirm rows are `status = 'pending'`.
