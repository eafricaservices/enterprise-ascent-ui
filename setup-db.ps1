# ─────────────────────────────────────────────────────────────
# Run all SQL migration files against your remote Supabase DB
# Prerequisites:
#   npx supabase login
#   npx supabase link --project-ref gmxrqablzbhpkxslppot
# Usage: .\setup-db.ps1
# ─────────────────────────────────────────────────────────────

$sqlFiles = @(
    "supabase/01_schema.sql",
    "supabase/02_rls_policies.sql",
    "supabase/03_storage.sql",
    "supabase/04_company_form_notifications.sql",
    "supabase/05_cv_scoring.sql"
)

foreach ($file in $sqlFiles) {
    if (!(Test-Path $file)) {
        Write-Host "SKIP: $file not found" -ForegroundColor Yellow
        continue
    }
    Write-Host "`nRunning $file ..." -ForegroundColor Cyan
    npx supabase db query --linked -f $file 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK" -ForegroundColor Green
    } else {
        Write-Host "  FAILED (exit code $LASTEXITCODE)" -ForegroundColor Red
        $continue = Read-Host "Continue with next file? (y/n)"
        if ($continue -ne "y") { exit 1 }
    }
}

Write-Host "`nAll done!" -ForegroundColor Green
