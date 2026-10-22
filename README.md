# AfterOfficeClub

AfterOfficeClub is an editorial career-reality library: **real work, real people, no guesswork**.

## Run locally (PowerShell)

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without Supabase variables, the app runs in safe static/editorial demo mode and authenticated features fail closed. With Supabase configured, signup, email confirmation, password recovery and pending contribution persistence are enabled. Empty sessions, opportunities and community integrations are intentional until real records and configuration exist.

## Checks

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

Review `.env.example` for configuration. Supabase variables are placeholders for a future authenticated production mode; no admin bypass or default password exists. See `IMPLEMENTATION_STATUS.md` and `docs/` for limitations, architecture, security, content policy and legal review requirements.

See [DEPLOYMENT_READINESS.md](./DEPLOYMENT_READINESS.md) for the exact Supabase dashboard setup, migration and administrator provisioning procedure.
