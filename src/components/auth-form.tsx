"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

type Mode = "login" | "signup" | "recovery";

export function AuthForm({ initialError }: { initialError?: string }) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(initialError ?? "");
  const [busy, setBusy] = useState(false);
  const client = createClient();
  const router = useRouter();
  if (!client) return <div className="notice" role="status">Authentication is not configured. Add the Supabase variables from <code>.env.example</code> and restart the server.</div>;
  const authenticatedClient = client;

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const redirectTo = `${window.location.origin}/auth/callback`;
    const result = mode === "login"
      ? await authenticatedClient.auth.signInWithPassword({ email, password })
      : mode === "signup"
        ? await authenticatedClient.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
        : await authenticatedClient.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (mode === "login") router.push("/");
    else setMessage(mode === "signup" ? "Check your email to confirm your account before signing in." : "If that email exists, a password reset link has been sent.");
  }

  return <div><form className="form" onSubmit={submit}><div className="form-field"><label htmlFor="auth-email">Email</label><input id="auth-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>{mode !== "recovery" && <div className="form-field"><label htmlFor="auth-password">Password</label><input id="auth-password" type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} /></div>}{message && <p className="notice" role="alert">{message}</p>}<button className="button button-dark" disabled={busy} type="submit">{busy ? "Working…" : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}</button></form><div className="filter-row" style={{ marginTop: 18 }}>{mode !== "login" && <button className="button button-outline" type="button" onClick={() => setMode("login")}>Back to sign in</button>}{mode === "login" && <><button className="button button-outline" type="button" onClick={() => setMode("signup")}>Create account</button><button className="button button-outline" type="button" onClick={() => setMode("recovery")}>Forgot password?</button></>}</div></div>;
}
