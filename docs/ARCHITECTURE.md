# Architecture

Next.js App Router with strict TypeScript and CSS design tokens. Public pages use server components where possible; explorer, auth and contribution use client state for interaction. Static typed content is the safe fallback mode. Supabase SSR clients use cookie-backed sessions; server routes re-check authentication and database RLS remains authoritative.

Public content is rendered from local reviewed starter data. Authenticated contributions are inserted as pending rows and never published automatically. Admin access is guarded by a database-backed profile role on the server.
