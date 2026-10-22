"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    if (!supabase) { setMessage("Authentication is not configured."); setBusy(false); return; }
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    setMessage("Password updated. You can continue.");
    setTimeout(() => router.push("/"), 800);
  }
  return <section className="section"><div className="container" style={{ maxWidth: 620 }}><span className="eyebrow">Account security</span><h1>Choose a new password.</h1><form className="form" onSubmit={submit}><div className="form-field"><label htmlFor="new-password">New password</label><input id="new-password" type="password" minLength={8} required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /></div>{message && <p className="notice" role="status">{message}</p>}<button className="button button-dark" disabled={busy} type="submit">{busy ? "Updating…" : "Update password"}</button></form></div></section>;
}
