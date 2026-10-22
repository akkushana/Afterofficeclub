import Link from "next/link";
import { requireModerator } from "@/lib/supabase/auth";
import { updateSubmission } from "./actions";

export default async function AdminPage() {
  const { supabase } = await requireModerator();
  const { data: submissions, error } = await supabase.from("contribution_submissions").select("id, kind, name, message, status, created_at").order("created_at", { ascending: true });
  if (error) throw new Error("Unable to load moderation queue.");
  return <section className="section"><div className="container"><span className="eyebrow">Moderation</span><h1>Submission review</h1><p className="muted">Pending submissions stay private until an authorized moderator changes their status.</p>{submissions.length === 0 ? <div className="empty-state"><h3>The queue is clear.</h3><p>No contribution submissions are waiting for review.</p></div> : <div className="role-grid">{submissions.map((submission) => <article className="role-card" key={submission.id}><span className="eyebrow">{submission.kind} · {submission.status}</span><h3>{submission.name}</h3><p>{submission.message}</p><form action={updateSubmission} className="filter-row"><input type="hidden" name="id" value={submission.id} /><button className="button button-dark" name="status" value="in_review">Review</button><button className="button button-lime" name="status" value="approved">Approve</button><button className="button button-outline" name="status" value="rejected">Reject</button></form></article>)}</div>}<Link className="button button-dark" href="/">Return home ↗</Link></div></section>;
}
