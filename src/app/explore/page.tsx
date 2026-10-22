"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, roles } from "@/lib/content";
import { Badge } from "@/components/site-shell";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All fields");
  const filtered = useMemo(() => roles.filter((role) => {
    const text = `${role.title} ${role.category} ${role.summary} ${role.skills.join(" ")} ${role.tasks.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All fields" || role.category === category);
  }), [query, category]);
  return <><section className="page-hero"><div className="container"><span className="eyebrow">Role and topic explorer</span><h1>Start where your question is.</h1><p>Search across roles, skills and tasks. These are starter guides, not universal job descriptions—work varies by team and company.</p><div className="search-bar"><label className="sr-only" htmlFor="role-search">Search roles</label><input id="role-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “SQL”, “customer”, or “what does…”" /><button className="button button-lime" type="button" onClick={() => setQuery("")}>Clear</button></div></div></section><section className="section"><div className="container"><div className="filter-row"><label className="sr-only" htmlFor="category">Filter by field</label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)}><option>All fields</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><span className="muted">{filtered.length} role guides</span></div>{filtered.length ? <div className="role-grid" style={{ marginTop: 32 }}>{filtered.map((role) => <Link className="role-card" href={`/roles/${role.slug}`} key={role.slug}><Badge>{role.evidence}</Badge><h3>{role.title} ↗</h3><p>{role.summary}</p></Link>)}</div> : <div style={{ marginTop: 30 }}><div className="empty-state"><h3>No role guides match that yet.</h3><p>Try a broader search or suggest the role you want to understand. We do not invent results.</p><Link className="button button-dark" href="/contribute">Suggest a topic ↗</Link></div></div>}</div></section></>;
}
