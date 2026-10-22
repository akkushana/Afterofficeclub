"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)} aria-label="AfterOfficeClub home">
          <span className="mark" aria-hidden="true"><i /><i /><i /></span>
          AfterOfficeClub
        </Link>
        <nav id="primary-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href="/contribute" className="nav-cta" onClick={() => setOpen(false)}>Join the community <span aria-hidden="true">↗</span></Link>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span><span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><Link href="/" className="wordmark"><span className="mark" aria-hidden="true"><i /><i /><i /></span>AfterOfficeClub</Link><p className="muted">The work behind the job title. Firsthand experience, clearly labelled.</p></div>
    <div><strong>Explore</strong><Link href="/explore">Career realities</Link><Link href="/sessions">Sessions</Link><Link href="/library">Library</Link></div>
    <div><strong>About</strong><Link href="/about">Our approach</Link><Link href="/guidelines">Guidelines</Link><Link href="/contribute">Contribute</Link></div>
    <div><strong>Read next</strong><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AfterOfficeClub</span><span>Demo content mode · No external integrations configured</span></div></footer>;
}

export function Badge({ children }: { children: React.ReactNode }) { return <span className="badge">{children}</span>; }
export function EmptyState({ title, children, href = "/contribute", link = "Suggest a topic" }: { title: string; children: React.ReactNode; href?: string; link?: string }) { return <div className="empty-state"><span className="eyebrow">Nothing published yet</span><h3>{title}</h3><p>{children}</p><Link href={href} className="button button-dark">{link} <span aria-hidden="true">↗</span></Link></div>; }
