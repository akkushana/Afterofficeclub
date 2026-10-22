"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function ContributePage() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const supabase = createClient();
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contributions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: form.get("kind"), name: form.get("name"), message: form.get("message"), consent: form.get("consent") === "on", honeypot: form.get("website") ?? "" }) });
    const result = await response.json() as { error?: string };
    setBusy(false);
    if (!response.ok) { setMessage(result.error ?? "We could not save this submission."); return; }
    setSent(true);
  }
  return <><section className="page-hero"><div className="container"><span className="eyebrow">Share what you know</span><h1>No guru theatre required.</h1><p>Contribute a working perspective, nominate someone, or suggest a role we should explore.</p></div></section><section className="section"><div className="container content-grid"><div>{!supabase && <div className="notice" role="status">Demo mode: authentication and persistence are not configured. Sign-in and submissions are disabled until Supabase is connected.</div>}{supabase && !sent && <form className="form" onSubmit={submit}><div className="form-field"><label htmlFor="kind">I want to…</label><select id="kind" name="kind" defaultValue="topic"><option value="topic">Suggest a topic</option><option value="experience">Share working experience</option><option value="nomination">Nominate someone</option><option value="correction">Report a correction</option></select></div><div className="form-field"><label htmlFor="name">Your name or preferred label</label><input id="name" name="name" required maxLength={80} /></div><div className="form-field"><label htmlFor="message">What should we know?</label><textarea id="message" name="message" required minLength={10} maxLength={2000} /><span className="muted">Do not include private contact details, confidential company information or credentials.</span></div><div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div><label><input type="checkbox" name="consent" required /> I understand that participation consent is separate from recording or publication consent.</label>{message && <p className="notice" role="alert">{message}</p>}<button className="button button-dark" disabled={busy} type="submit">{busy ? "Saving…" : "Submit for moderation ↗"}</button></form>}{supabase && sent && <div className="empty-state" role="status"><h3>Submitted for moderation.</h3><p>Your contribution was saved as pending. It will not become public content automatically.</p><Link className="button button-dark" href="/explore">Continue exploring ↗</Link></div>}{!supabase && <Link className="button button-dark" href="/login">Sign-in setup ↗</Link>}</div><aside className="side-card"><span className="eyebrow">Before you share</span><h3>Protect people and context.</h3><p className="muted">We label firsthand experience, editorial summaries and public sources separately. No claim is treated as universal by default.</p></aside></div></section></>;
}
