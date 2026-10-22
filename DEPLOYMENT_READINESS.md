# Deployment readiness

## Phase 2 status

The Supabase integration boundary is implemented but intentionally not configured in this workspace. The public app remains usable without credentials and fails closed for authenticated and moderation functions.

Implemented:

- Supabase SSR browser/server clients with cookie-based sessions.
- Middleware session refresh.
- Email/password login, signup with email confirmation, logout endpoint, password recovery and password reset.
- Secure confirmation callback with same-origin relative redirect validation.
- Authenticated contribution API with Zod validation, length limits, honeypot and pending status.
- PostgreSQL migration for profiles, contribution submissions, enum statuses, trigger-created member profiles and RLS.
- Moderator/admin server-side guard for `/admin`.
- Validation unit tests.

## Required environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: current Supabase publishable/anon browser key.
- `SUPABASE_SECRET_KEY`: not used by the public app; reserve for future server-only administrative jobs and never expose it.

## Supabase dashboard and migration steps

1. Create a Supabase project and configure the Auth email provider.
2. Add `http://localhost:3000/auth/callback` and the production callback URL to Auth redirect URLs.
3. Apply `supabase/migrations/20261022000000_initial.sql` using the Supabase SQL editor or Supabase CLI migration workflow.
4. Verify email confirmation and password recovery templates use the callback URL.
5. Provision the first administrator through a controlled owner-only SQL operation after confirming the account ID; never through public signup:

```sql
update public.profiles
set role = 'admin'
where id = '<owner-auth-user-uuid>';
```

6. Test RLS with anonymous, ordinary authenticated and moderator accounts before enabling public submissions.

## Outstanding risks

- No durable shared rate limiter is configured. The honeypot is only a low-friction signal, not a complete abuse control.
- Admin review queue and status mutation are implemented, but require a configured moderator/admin profile and real Supabase RLS verification.
- External Supabase behavior cannot be claimed as verified until a real project is configured.
- Legal/privacy review and operational monitoring remain required.
