# Security notes

The app has an explicit no-credentials mode and fails closed for `/admin`. When configured, Supabase SSR provides cookie-backed sessions, `getUser()` is checked server-side, and contribution writes require an authenticated user. No secrets are included. Headers cover content type sniffing, framing, referrer policy and permissions. Inputs use Zod validation, length limits and a honeypot. Durable shared rate limiting is not configured.

The migration enables RLS for profiles and submissions, prevents role self-promotion through a security-definer role function, and restricts moderation updates to moderator/admin profiles. Before production: test policies against real anonymous/member/moderator identities, add a shared rate limiter, complete admin review actions, add audit logs, perform dependency review and tighten CSP.
