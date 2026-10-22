import type { Metadata } from "next";
import "./globals.css";
import { Footer, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "AfterOfficeClub — The work behind the job title", template: "%s — AfterOfficeClub" },
  description: "Learn how careers and businesses actually work from people doing the work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><Footer /></body></html>;
}
