import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : "/";
  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(new URL("/login?error=auth-not-configured", url));
  if (!code) return NextResponse.redirect(new URL("/login?error=invalid-confirmation", url));
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login?error=invalid-confirmation", url));
  return NextResponse.redirect(new URL(safeNext, url));
}
