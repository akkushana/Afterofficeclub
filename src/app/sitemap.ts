import type { MetadataRoute } from "next";
import { roles, library } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; return ["/", "/explore", "/sessions", "/library", "/opportunities", "/community", "/contribute", "/about", "/guidelines", "/privacy", "/terms", "/accessibility", ...roles.map((r) => `/roles/${r.slug}`), ...library.map((i) => `/library/${i.slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
