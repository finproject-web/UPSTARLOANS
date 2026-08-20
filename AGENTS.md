# UpStart Loans - Project Notes

## Repository
This is the correct, real repository for the admin/customer portal:
`https://github.com/finproject-web/UPSTARLOANS.git` (branch `main`)

Do NOT confuse this with `finproject-web/upstartsloans` (or the `Downloads\upstartsloans-main` folder)
which is a completely different, unrelated marketing landing-page-only project.

## Live site
Production URL: `https://upstarloans.vercel.app` (note spelling: "upstarloans", not "upstartloan")
Deployed automatically by Vercel on every push to `main`.

## Supabase project
Project ref: `yxseqkbwlxxwxkhslnog`
Edge Functions: `admin-login`, `admin-customers`, `customer-login`, `get-customers`,
`submit-application`, `submit-to-sheets`

### IMPORTANT: ALLOWED_ORIGIN secret
All edge functions check the request's `Origin` header against the `ALLOWED_ORIGIN` secret
(see `supabase/functions/_shared/cors.ts`). If this doesn't *exactly* match the live domain,
every request fails with `403 Forbidden: invalid origin` (looks like "login failed" or a
network error to the user, with no other symptom).

Current value should include the live domain:
```
https://upstarloans.vercel.app
```

If you ever see login/submission suddenly fail with no other explanation, check this secret first:
```
npx supabase secrets set ALLOWED_ORIGIN=https://upstarloans.vercel.app
```
(comma-separate multiple allowed origins if needed, e.g. for local dev)

**After changing ANY file under `supabase/functions/`, you must redeploy that specific function**
(pushing to GitHub only updates the frontend via Vercel, it does NOT deploy Supabase functions):
```
npx supabase link --project-ref yxseqkbwlxxwxkhslnog
npx supabase functions deploy <function-name>
```

**Automatic deployment is now configured.** A GitHub Action in `.github/workflows/deploy-supabase-functions.yml`
redeploys **all** Edge Functions automatically whenever `supabase/functions/**` is changed on `main`.
To enable it, add these secrets in GitHub (Settings > Secrets and variables > Actions):
- `SUPABASE_ACCESS_TOKEN` — from `https://supabase.com/dashboard/account/tokens`
- `SUPABASE_PROJECT_ID` — `yxseqkbwlxxwxkhslnog`

The CORS code also contains a hardcoded fallback list of production domains
(`upstarloans.vercel.app`, `upstartloan.vercel.app`, `upstarsloans.com`, localhost),
so the live site keeps working even if the `ALLOWED_ORIGIN` secret is accidentally
overwritten.

## Google Apps Script (email notifications on new applications)
The actual live email/notification script is **not** any of the `.gs` files in this repo
(those are old/unused reference copies). The real one lives at:
`https://script.google.com` (Apps Script project bound to spreadsheet ID
`15brmPz6wLd1sSIGneOsqvoBi656cbFUuBLtkQUz5jwU`), deployed as a Web App.

- `submit-application` edge function POSTs to this script's deployment URL
  (stored in the `CUSTOMER_SERVICE_SCRIPT_URL` Supabase secret) to save a row to the sheet
  and send email notifications.
- Admin notification email currently goes to: `finnfoxpersonalloan@gmail.com`
- After editing the script in the Apps Script editor, you MUST create a new deployment version
  (Deploy > Manage deployments > pencil icon > New version > Deploy) - saving alone does not
  update the live URL.

## Database gotchas
The `customers` table has UNIQUE constraints on both `email` and `user_id`. Testing loan
application submissions with an already-used email or User ID will fail with a `500` and a
`duplicate key value violates unique constraint` error - this is expected behavior, not a bug.
Always use a fresh email + fresh User ID when testing submissions.

New application emails are stored in lowercase. Customer login and insurance-review lookups
use case-insensitive matching, so mixed-case emails copied from the admin dashboard still work.

## admin_notes field naming
`customers.admin_notes` (text column, admin free-text notes) is different from the
`admin_notes` table (individual notification records, e.g. insurance review triggers).
The `customer-login` edge function returns the notification records as `admin_note_records`
(NOT `admin_notes`) specifically to avoid colliding with the free-text column - overwriting
`admin_notes` with an array previously caused a React crash (blank customer dashboard).
