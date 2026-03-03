# Supabase Database Setup — E-Africa Services

Three SQL scripts to be executed **in order** against your Supabase project.

## Execution Order

| # | File | Purpose |
|---|------|---------|
| 1 | `01_schema.sql` | Enums, tables, indexes, triggers, seed data |
| 2 | `02_rls_policies.sql` | Row Level Security for all tables |
| 3 | `03_storage.sql` | Storage buckets and object policies |

**How to run:**
1. Open **Supabase Dashboard → SQL Editor**
2. Paste the contents of each file in sequence
3. Click **Run** after each script before proceeding to the next

---

## Database Overview

### Form Capture Tables (user-facing)
| Table | Purpose |
|-------|---------|
| `contact_submissions` | "Get In Touch" contact form submissions |
| `talent_applications` | "Join Our Talent Pool" applicant submissions |

### CMS Content Tables (admin-managed)
| Table | Purpose |
|-------|---------|
| `testimonials` | Scrolling testimonial cards (2 rows) |
| `faqs` | FAQ accordion items |
| `pricing_plans` | Pricing tier cards |
| `pricing_plan_features` | Feature bullets per pricing plan |
| `client_logos` | LogoCloud marquee entries |
| `site_stats` | StatsBar headline numbers |
| `impact_items` | "Our Impact" section cards |
| `profiles` | Admin/staff user profiles |

---

## Storage Buckets

| Bucket | Type | Max Size | Formats | Purpose |
|--------|------|----------|---------|---------|
| `media-assets` | Public | 10 MB | jpg, png, gif, webp, svg | Hero images, team photos, client logos |
| `talent-cvs` | Private | 5 MB | pdf, doc, docx | Applicant CV/resume uploads |
| `talent-intro-videos` | Private | 100 MB | mp4, webm, mov, avi | Applicant face-intro video uploads |

---

## Security Summary

| Operation | Anonymous | Authenticated |
|-----------|-----------|---------------|
| Submit contact form | ✅ INSERT | ✅ Full CRUD |
| Submit talent application | ✅ INSERT | ✅ Full CRUD |
| Read CMS content (active) | ✅ SELECT | ✅ SELECT all |
| Manage CMS content | ❌ | ✅ Full CRUD |
| Upload CV | ⚠️ INSERT (UUID-path enforced — see note) | ✅ Full CRUD |
| Read CV | ❌ | ✅ SELECT (signed URL) |
| Upload intro video | ❌ | ✅ INSERT (authenticated only) |
| Read intro video | ❌ | ✅ SELECT (signed URL) |
| Upload media assets | ❌ | ✅ INSERT/UPDATE/DELETE |
| Read media assets | ✅ SELECT | ✅ SELECT |

> **⚠️ Anonymous CV upload — active mitigations:**
> The `talent-cvs` bucket permits anonymous INSERT because CVs are submitted
> as part of the unauthenticated application form flow (5 MB cap enforced by
> the bucket). The following controls are in place or recommended:
> - **Path enforcement** — the storage policy rejects any upload whose object
>   name does not start with a UUID-shaped prefix (`<uuid>/filename`), making
>   paths unpredictable and preventing root-level or collision uploads.
> - **File-type allowlist** — bucket `allowed_mime_types` restricts to
>   `application/pdf`, `application/msword`, and `.docx` only.
> - **Size cap** — 5 MB hard limit on the bucket prevents bulk-storage abuse.
> - **Recommended additions** (implement at the edge/middleware layer):
>   rate-limit upload requests per IP, add CAPTCHA verification on the
>   application form, enable Supabase Storage audit logs and alert on
>   abnormal upload volume, and run server-side virus/malware scanning
>   (e.g. ClamAV via a Supabase Edge Function) before linking the path
>   to a `talent_applications` row.

---

## File Upload Path Conventions

Always namespace uploads by a UUID prefix to prevent collisions and
prevent enumeration of other applicants' files:

```
talent-cvs/
  └── <uuid>/<original-filename.pdf>     (anonymous upload, UUID path required by policy)

talent-intro-videos/
  └── <uuid>/<original-filename.mp4>     (authenticated upload only — session token required)

media-assets/
  ├── hero/
  ├── team/
  └── logos/
```

Generate signed URLs for private files (never expose permanently):
```ts
const { data } = await supabase.storage
  .from('talent-cvs')
  .createSignedUrl(storagePath, 3600); // 1 hour expiry
```
